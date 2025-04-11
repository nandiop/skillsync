"use server";

import { db } from "../lib/prisma";
import { auth } from "@clerk/nextjs";
import { generateAIInsights } from "./dashboard";
import { onboardingSchema } from "../app/lib/schema";

export async function updateUser(data) {
    try {
        const { userId } = await auth();
        if (!userId) {
            throw new Error("Unauthorised");
        }

        // Validate the input data
        const validatedData = onboardingSchema.parse(data);
        console.log("Validated data:", validatedData);

        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId,
            },
        });
        if (!user) throw new Error("User not found");

        // Format the industry string to match the schema
        const formattedIndustry = `${validatedData.industry}-${validatedData.subIndustry
            .toLowerCase()
            .replace(/ /g, "-")}`;

        // First, check if industry insights exist
        let industryInsights = await db.industryInsight.findUnique({
            where: {
                industry: formattedIndustry,
            },
        });

        // If not, try to generate new insights
        if (!industryInsights) {
          
                const insights = await generateAIInsights(formattedIndustry);
                industryInsights = await db.industryInsight.create({
                    data: {
                        industry: formattedIndustry,
                        ...insights,
                        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    },
                });
            
                
           
        }

        // Update user profile
        const updatedUser = await db.user.update({
            where: {
                id: user.id,
            },
            data: {
                industry: formattedIndustry,
                experience: validatedData.experience,
                bio: validatedData.bio || "",
                skills: validatedData.skills || [],
            },
        });

        console.log("User updated successfully:", updatedUser);
        return { success: true, updatedUser, industryInsights };
    } catch (error) {
        console.error("Error updating user and industry:", error);
        throw new Error(error.message || "Failed to update new profile");
    }
}

export async function getOnboardingStatus() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return { isOnboarded: false };
        }

        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId,
            },
            select: {
                industry: true,
            },
        });

        return {
            isOnboarded: !!user?.industry,
        };
    } catch (error) {
        console.log("Error checking onboarding status", error.message);
        return { isOnboarded: false };
    }
}