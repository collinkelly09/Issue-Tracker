import { z } from "zod";

export const issueSchema = z.object({
    title: z.string().min(1, "Title is required").max(255),
    description: z.string().min(1, "Description is required"),
});

export const issueStatusSchema = z.object({
    status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]),
});

export const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(30, "Password cannot exceed 30 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
        ),
    confirmPassword: z.string().min(8).max(30),
});
