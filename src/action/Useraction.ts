/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { SignUpSchema } from "@/lib/zod";
import { auth, signIn, signOut } from "@/server/auth/auth";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const SignupAction = async (values: SignupProps) => {
  const { name, email, password, confirmPassword, role } =
    await SignUpSchema.parseAsync(values);
  try {
    const trimmedEmail = email.trim().toLowerCase();

    // Check if the email is already registered
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, trimmedEmail))
      .then((result) => result[0]);

    console.log("existingUser", existingUser);

    if (existingUser) throw new Error("Email already registered");

    // Create the new user
    const result = await db
      .insert(users)
      .values({
        name: name.trim(),
        email: trimmedEmail,
        password: password,
        role: role,
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error("Signup error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to create account"
    );
  }
};

export const LoginAction = async ({ email, password }: LoginProps) => {
  let trimEmail: string;
  try {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    trimEmail = email.trim().toLocaleLowerCase();
  } catch (error) {
    console.error(error);
    throw error;
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, trimEmail))
    .then((result) => result[0]);

  if (user && !user.password) {
    console.error("Account not properly configured from LoginAction");
    throw new Error("Account not properly configured");
  }
  if (!user) {
    console.error("User not found from LoginAction");
    throw new Error("User not found");
  }

  if (!user.password || user.password !== password) {
    console.error("Invalid password from LoginAction");
    throw new Error("Invalid password");
  }
  console.log("user", user);
  return {
    id: user.id,
    email: user.email,
    password: user.password,
    role: user.role,
  };
};

export const GetSession = async () => {
  const session = await auth();
  return session;
};

export const SignOutAction = async () => {
  await signOut();
};

export const UserLogin = async ({ email, password }: LoginUserProps) => {
  try {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      // Handle specific error messages from your backend
      return {
        error: "Invalid credentials. Please check your email and password.",
      };
    }

    return result;
  } catch (error) {
    console.error("User login error:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
};

export const GetUserById = async ({ userid }: GetUserByIdProps) => {
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userid))
      .then((result) => result[0]);

    if (!user) throw new Error("User not found");

    const { password, isVerified, createdAt, updatedAt, ...userData } = user;

    return userData;
  } catch (error) {
    console.error("Get user by id error:", error);
    throw new Error("User Not found");
  }
};

export const OnBoardingSubmit = async ({
  id,
  UserData,
}: {
  id: string;
  UserData: OnBoardingProps;
}) => {
  try {
    const findNumber = await db
      .select()
      .from(users)
      .where(eq(users.phone, UserData.phone))
      .then((result) => result[0]);

    if (findNumber) {
      throw new Error("Phone number already registered");
    }

    const result = await db
      .update(users)
      .set(UserData)
      .where(eq(users.id, id))
      .returning();

    return result[0];
  } catch (error) {
    console.error("Onboarding error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to update user data"
    );
  }
};
