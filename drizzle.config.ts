import { type Config } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  console.log("🔴 can`t find the databse");
} else {
  console.log("🟢 db connected");
  console.log(process.env.DATABASE_URL);
}

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,

  tablesFilter: ["next_auth_*"],
} satisfies Config;
