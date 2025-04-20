"use server";
import auth from "@clerk/nextjs/server"
import { db } from "../lib/prisma";
import { revalidatePath } from "next/cache";
import { GoogleGenerativeAI } from "@google/generative-ai";


const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in environment variables");
}
if (!GEMINI_API_KEY.startsWith("AIza")) {
  throw new Error("Invalid GEMINI_API_KEY format. It should start with 'AIza'");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function saveResume(content)
{
    const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");
      
        const user = await db.user.findUnique({
          where: { clerkUserId: userId },
          select: {
            industry: true,
            skills: true,
          },
        });
      
        if (!user) throw new Error("User not found");

        try {
            const resume = await db.resume.upsert({
                where: {
                    userId: user.id,


                },
                update :{
                    content,
                },
                create :{
                    userId: user.id,
                    content,
                },
            });

            revalidatePath("/resume")
            return resume
        } catch (error) {
            ConnectorInSerializer.log("Error saving resume:",error.message)
            throw new Error("Failed to save resume")
            
        }

}

export async function getResume()
{
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
  
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: {
        industry: true,
        skills: true,
      },
    });
  
    if (!user) throw new Error("User not found");

    return await db.resume.findUnique({
        where:{
            userId: user.id,

        },
    });

}

export async function improveWithAI({ current, type }) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
  
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      include: {
        industryInsight: true,
      },
    });
  
    if (!user) throw new Error("User not found");


    const prompt = `As an expert resume writer, improve the following ${type} description for a ${user.industry} professional.
    Make it more impactful, quantifiable, and aligned with industry standards.
    Current content: "${current}"

    Requirements:
    1. Use action verbs
    2. Include metrics and results where possible
    3. Highlight relevant technical skills
    4. Keep it concise but detailed
    5. Focus on achievements over responsibilities
    6. Use industry-specific keywords
    
    Format the response as a single paragraph without any additional text or explanations.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const improveContent = response.text().trim();
    return improveContent;
  } catch (error) {
    console.log("Error improving content", error);
    throw new Error("Failed to improve content");
  }
}