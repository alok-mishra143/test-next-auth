"use server";
import { users } from "@/server/db/schema";
import { db } from "@/server/db";
import { eq, like } from "drizzle-orm";

export const GetAllUsers = async (search: string) => {
  try {
    const result = await db
      .select()
      .from(users)
      .where((user) => like(user.name, `%${search}%`))
      .orderBy(users.name)
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

export const updateProfile = async ({
  id,
  data,
}: {
  id: string;
  data: UpdateUser;
}) => {
  try {
    const res = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
