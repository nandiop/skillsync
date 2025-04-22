import { auth } from "@clerk/nextjs/server";
import { db } from "../lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

// === Initialize Gemini Model ===
let model;
try {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY is not set in environment variables");

  const genAI = new GoogleGenerativeAI(key);
  model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
} catch (err) {
  console.error("❌ Gemini initialization error:", err);
}

// === Save Resume with ATS Score ===
export async function saveResumeWithScore(resumeText) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  // Prompt with correct format
  const prompt = `
You are an AI-powered Applicant Tracking System (ATS).
Review the following resume content and assign an ATS-friendliness score out of 100.
Then, explain your reasoning in 2-3 sentences.

Resume content:
"""
${resumeText}
"""

Respond ONLY in this JSON format:

{
  "atsScore": [
    {
      "score": 70,
      "explanation": "Your resume highlights relevant skills and experience, and is formatted in a clear, concise manner."
    }
  ]
}
`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    console.log("Raw AI Response:", responseText); // Log the raw response

    // Try to match valid JSON format
    const jsonMatch = responseText.match(/\{[\s\S]*\}/); // match anything inside {}

    if (!jsonMatch) {
      throw new Error("Failed to extract JSON from AI response");
    }

    // Parse the matched JSON part
    const parsed = JSON.parse(jsonMatch[0]);
    const scoreObj = parsed?.atsScore?.[0];

    if (!scoreObj || typeof scoreObj.score !== "number" || !scoreObj.explanation) {
      throw new Error("Invalid AI response format");
    }

    const atsScore = Math.min(Math.max(scoreObj.score, 0), 100);
    const explanation = scoreObj.explanation;

    // Save the resume and ATS score in the database
    const resume = await db.resume.upsert({
      where: { userId: user.id },
      update: {
        content: resumeText,
        atsScore,
      },
      create: {
        userId: user.id,
        content: resumeText,
        atsScore,
      },
    });

    revalidatePath("/resume");

    return { resume, explanation };
  } catch (err) {
    console.error("❌ Failed to generate ATS score or parse response:", err);
    throw new Error("Failed to generate ATS score");
  }
}
