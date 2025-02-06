import {
  timestamp,
  varchar,
  boolean,
  pgTable,
  pgEnum,
  integer,
  decimal,
} from "drizzle-orm/pg-core";

// ------------------------------
// User Model
// ------------------------------

// Remove this if "UserRole" already exists in your database
export const userRole = pgEnum("user_role", ["STUDENT", "TEACHER", "ADMIN"]);

export const users = pgTable("users", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  gender: varchar("gender", { length: 255 }),
  profileImage: varchar("profile", { length: 255 }).default(""),
  phone: varchar("phone", { length: 255 }).default(""),
  department: varchar("department", { length: 255 }).default(""),
  class: varchar("class", { length: 255 }).default(""),
  role: userRole("role").notNull().default("STUDENT"),
  address: varchar("address", { length: 255 }).default(""),
  isVerified: boolean("is_verified").notNull().default(false),
  onboardingCompleted: boolean("onboarding_completed").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ------------------------------
// Leave Request Model
// ------------------------------

export const leaveType = pgEnum("leave_type", [
  "FIRST_HALF",
  "SECOND_HALF",
  "FULL_DAY",
]);
export const leaveStatus = pgEnum("leave_status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
]);

export const leaveRequests = pgTable("leave_requests", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  requestToId: varchar("request_to_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  leaveType: leaveType("leave_type").notNull(),
  reason: varchar("reason", { length: 500 }).notNull(),
  status: leaveStatus("status").notNull().default("PENDING"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ------------------------------
// User Leave Model
// ------------------------------

export const userLeaves = pgTable("user_leaves", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  totalLeave: integer("total_leave").notNull(),
  availableLeave: integer("available_leave").notNull(),
  usedLeave: integer("used_leave").notNull(),
  academicYear: varchar("academic_year", { length: 20 }).notNull(),
  totalWorkingDays: integer("total_working_days").notNull(),
  attendancePercentage: decimal("attendance_percentage", {
    precision: 5,
    scale: 2,
  }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
