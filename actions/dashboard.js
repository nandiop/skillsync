"use server";
require("dotenv").config(); // Load environment variables
import { db } from "../lib/prisma";
import { auth } from "@clerk/nextjs";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Validate API key format
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in environment variables");
}
if (!GEMINI_API_KEY.startsWith("AIza")) {
  throw new Error("Invalid GEMINI_API_KEY format. It should start with 'AIza'");
}

// Initialize Gemini with safety settings
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateAIInsights = async (industry) => {
  if (!industry) {
    throw new Error("Industry parameter is required");
  }

  const prompt = `
    Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
    {
      "salaryRanges": [
        { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
      ],
      "growthRate": number,
      "demandLevel": "HIGH" | "MEDIUM" | "LOW",
      "topSkills": ["skill1", "skill2"],
      "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
      "keyTrends": ["trend1", "trend2"],
      "recommendedSkills": ["skill1", "skill2"]
    }
    
    IMPORTANT: 
    - Return ONLY the JSON. No additional text, notes, or markdown formatting.
    - Include at least 5 common roles for salary ranges.
    - Growth rate should be a percentage.
    - Include at least 5 skills and trends.
    - Use UPPERCASE for demandLevel and marketOutlook values.
    - Ensure all values match the exact format specified.
  `;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

  return JSON.parse(cleanedText);
};

export async function getIndustryInsights() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { isOnboarded: false };
    }

    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      include: {
        industryInsight: true
      }
    });

    if (!user) {
      return { isOnboarded: false };
    }

    if (!user.industry) {
      return { isOnboarded: false };
    }

    // If user has industry insights, return them
    if (user.industryInsight) {
      return {
        isOnboarded: true,
        insights: user.industryInsight
      };
    }

    // If no insights exist, generate new ones
    console.log("Generating new insights for user:", userId);
    const insights = await generateAIInsights(user.industry);
    console.log("Created insights:", insights);
    
    const now = new Date();
    const industryInsights = await db.industryInsight.create({
      data: {
        industry: user.industry,
        ...insights,
        lastUpdated: now,
        nextUpdate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    // Update user with the new insights
    await db.user.update({
      where: { id: user.id },
      data: { industryInsight: { connect: { id: industryInsights.id } } }
    });

    return {
      isOnboarded: true,
      insights: industryInsights
    };
  } catch (error) {
    console.error("Error in getIndustryInsights:", error);
    return { isOnboarded: false };
  }
}
