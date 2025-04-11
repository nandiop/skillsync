import { inngest } from "./client";
import { db } from "../prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Create the function with proper configuration
export const generateIndustryInsights = inngest.createFunction(
    { 
        name: "Generate Industry Insights",
        id: "generate-industry-insights",
        metadata: {
            description: "Generates industry insights for all industries in the system"
        }
    },
    { 
        cron: "0 0 * * 0",
        retries: 3
    },
    async ({ event, step }) => {
        try {
            // Get all unique industries from users
            const industries = await step.run("Fetch Industries", async () => {
                const users = await db.user.findMany({
                    where: {
                        industry: { not: null }
                    },
                    select: { industry: true },
                    distinct: ['industry']
                });
                return users.map(user => user.industry);
            });

            console.log("Found industries:", industries);

            for (const industry of industries) {
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

                const res = await step.run("Generate Insights", async () => {
                    const result = await model.generateContent(prompt);
                    const response = result.response;
                    const text = response.text();
                    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
                    return JSON.parse(cleanedText);
                });

                console.log("Generated insights for industry:", industry, res);

                await step.run("Save Industry Insights", async () => {
                    const now = new Date();
                    // Try to update first, if it doesn't exist, create it
                    try {
                        await db.industryInsight.update({
                            where: { industry },
                            data: {
                                ...res,
                                lastUpdated: now,
                                nextUpdate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
                            },
                        });
                    } catch (error) {
                        if (error.code === 'P2025') { // Record not found
                            await db.industryInsight.create({
                                data: {
                                    industry,
                                    ...res,
                                    lastUpdated: now,
                                    nextUpdate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
                                },
                            });
                        } else {
                            throw error;
                        }
                    }
                });
            }

            return { success: true };
        } catch (error) {
            console.error("Error in generateIndustryInsights:", error);
            throw error;
        }
    }
);
