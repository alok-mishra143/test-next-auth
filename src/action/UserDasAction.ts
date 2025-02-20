"use server";
import { users } from "@/server/db/schema";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";

export const GetAllUsers = async () => {
  try {
    const result = await db
      .select()
      .from(users)
      .then((result) => result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const DeleteUser = async (id: string) => {
  try {
    const result = await db.delete(users).where(eq(users.id, id)).returning();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
