import { is } from "drizzle-orm";
import { object, z } from "zod";

export const signInSchema = object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .max(32, "Password must be less than 32 characters"),
});

export const SignUpSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .min(2, "Name must be at least 2 characters"),

    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email"),
    role: z.enum(["STUDENT", "TEACHER", "ADMIN"]).default("STUDENT"),

    password: z
      .string({ required_error: "Password is required" })
      .min(1, "Password is required")
      .max(32, "Password must be less than 32 characters"),

    confirmPassword: z
      .string({ required_error: "Confirm password is required" })
      .min(1, "Confirm password is required")
      .max(32, "Password must be less than 32 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const onboardingValidationSchema = z.object({
  gender: z.enum(["MALE", "FEMALE", "OTHERS"]).default("MALE"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .nonempty("Phone is required"),
  address: z
    .string()
    .min(10, "Address must be provided")
    .nonempty("Address is required"),

  department: z.string().optional(),
  class: z.string().optional(),
});

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  gender: z.enum(["MALE", "FEMALE", "OTHERS"]),
  isVerified: z.boolean(),
  department: z.string().optional(),
  class: z.string().optional(),
  role: z.enum(["STUDENT", "TEACHER", "ADMIN"]).default("STUDENT"),
});
