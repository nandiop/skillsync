import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";
import { Prisma } from "@prisma/client";

/**
 * Checks and synchronizes the current user between Clerk and the database
 * @returns {Promise<Object|null>} The user object or null if not authenticated
 */
export const checkUser = async () => {
  try {
    // Get the authenticated user from Clerk
    const user = await currentUser();
    
    // If no user is authenticated, return null
    if (!user?.id) {
      return null;
    }

    // Get primary email and ensure it exists
    const primaryEmail = user.emailAddresses?.find(
      email => email.id === user.primaryEmailAddressId
    )?.emailAddress;

    if (!primaryEmail) {
      console.warn('User has no primary email:', user.id);
      return null;
    }

    // Prepare user data
    const userData = {
      clerkUserId: user.id,
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || null,
      email: primaryEmail,
      imageUrl: user.imageUrl || null,
    };

    try {
      // Try to find existing user
      const existingUser = await db.user.findUnique({
        where: {
          clerkUserId: user.id,
        },
      });

      // If user exists, check if we need to update any fields
      if (existingUser) {
        // Check if any user data has changed
        const hasChanged = 
          userData.name !== existingUser.name || 
          userData.email !== existingUser.email || 
          userData.imageUrl !== existingUser.imageUrl;

        if (hasChanged) {
          // Update user with new information
          return await db.user.update({
            where: { clerkUserId: user.id },
            data: {
              ...userData,
              updatedAt: new Date(),
            },
          });
        }

        return existingUser;
      }

      // Create new user if they don't exist
      return await db.user.create({
        data: {
          ...userData,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle known Prisma errors
        if (error.code === 'P2002') {
          console.error('Unique constraint violation:', error.meta?.target);
        }
      }
      throw error; // Re-throw to be caught by outer try-catch
    }
  } catch (error) {
    console.error('Error in checkUser:', error);
    // Return null instead of throwing to prevent layout errors
    return null;
  } finally {
    // Ensure we handle any pending operations
    await db.$disconnect();
  }
};