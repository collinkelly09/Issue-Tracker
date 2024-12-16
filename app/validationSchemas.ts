import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required").max(65535),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(65535)
    .optional(),
  assignedId: z
    .string()
    .min(1, "assignedId is required")
    .max(255)
    .optional()
    .nullable(),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).optional(),
});

// export const userSchema = z
//   .object({
//     firstName: z.string().min(2, "First name is required"),
//     lastName: z.string().min(1, "Last name is required"),
//     email: z.string().email("Email is required"),
//     password: z
//       .string()
//       .min(8, "Password must be at least 8 characters")
//       .max(30, "Password cannot exceed 30 characters")
//       .regex(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-_])[A-Za-z\d@$!%*?&-_]+$/,
//         "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
//       ),
//     confirmPassword: z.string().min(1, "Please confirm password"),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

export const commentSchema = z.object({
  comment: z.string().min(2, "Cannot post empty comment"),
  userId: z.string().min(1, "userId is required").max(255),
  issueId: z.number(),
});

export const commentFormSchema = z.object({
  comment: z.string().min(2, "Cannot post empty comment"),
});
