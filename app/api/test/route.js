import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Test user creation
    const user = await prisma.user.create({
      data: {
        clerkUserId: 'test_' + Date.now(),
        email: `test${Date.now()}@example.com`,
        name: 'Test User',
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
} 