import { z } from "zod";

export const onboardingSchema = z.object({
    industry: z.string({
        required_error: "Please select an industry",
    }),
    subIndustry: z.string({
        required_error: "Please select a sub-industry",
    }),
    bio: z.string().max(500).optional(),
    experience: z.union([
        z.string().transform((value) => parseInt(value, 10)),
        z.number()
    ]).pipe(
        z.number()
        .min(0, "Experience must be at least 0 years")
        .max(30, "Experience must not be greater than 30 years")
    ),
    skills: z.union([
        z.string().transform((value) => value ? value.split(",").map((skill) => skill.trim()).filter(Boolean) : []),
        z.array(z.string())
    ]).default([]),
});
