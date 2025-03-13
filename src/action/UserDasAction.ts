"use server";
import { users } from "@/server/db/schema";
import { db } from "@/server/db";
import { asc, desc, eq, like } from "drizzle-orm";

type UserColumns = keyof typeof users._.columns;

interface GetAllUsersProps {
  search: string;
  page: number;
  sort: { value: UserColumns; sort: string };
  Filters?: {
    roles: string[];
    verified: string[];
  };
}

export const GetAllUsers = async (values: GetAllUsersProps) => {
  const { search, page, Filters, sort } = values;
  const { roles, verified } = Filters || { roles: [], verified: [] };

  try {
    console.log(sort);

    let query = db
      .select({})
      .from(users)
      .where(like(users.name, `%${search}%`))
      .limit(page);

    if (sort?.value && sort?.sort && users[sort.value]) {
      query = query.orderBy(
        sort.sort === "asc" ? asc(users[sort.value]) : desc(users[sort.value])
      );
    }

    const result = await query;
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
