import * as z from "zod";

export const signInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const registerSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character."
      ),
    confirmPassword: z.string().min(8, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const humanSchema = z.object({
  _id: z.string().optional(),
  characterType: z.literal("human"),
  name: z.string().min(1, "Name is required"),
  age: z.union([
    z.string().min(1, "Age is required"),
    z.number()
  ]),
  gender: z.string().min(1, "Gender is required"),
  ethnicity: z.string().min(1, "Ethnicity is required"),
  hairColor: z.string().min(1, "Hair Color is required"),
  hairLength: z.string().min(1, "Hair Length is required"),
  characterAttributes: z.string().min(1, "Character attributes are required"),
  characterImage: z.string().optional(),
});

export const animalSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  characterType: z.enum(["dog", "cat", "bird"]),
  breed: z.string().min(1, "Breed is required"),
  characterAttributes: z.string().min(1, "Character attributes are required"),
  characterImage: z.string().optional(),
});

export const otherSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  characterType: z.enum(["", "other"]),
  characterAttributes: z.string().min(1, "Character attributes are required"),
  characterImage: z.string().optional(),
});

export const characterSchema = z.discriminatedUnion("characterType", [
  humanSchema,
  animalSchema,
  otherSchema,
]);

export const storySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  message: z.string().optional(),
  rhyming: z.boolean().default(false),
  characters: z.array(characterSchema).optional()
});
