CREATE TYPE "public"."leave_status" AS ENUM('PENDING', 'APPROVED', 'REJECTED');--> statement-breakpoint
CREATE TYPE "public"."leave_type" AS ENUM('FIRST_HALF', 'SECOND_HALF', 'FULL_DAY');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('STUDENT', 'TEACHER', 'ADMIN');--> statement-breakpoint
CREATE TABLE "leave_requests" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"request_to_id" varchar(255) NOT NULL,
	"leave_type" "leave_type" NOT NULL,
	"reason" varchar(500) NOT NULL,
	"status" "leave_status" DEFAULT 'PENDING' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_leaves" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"total_leave" integer NOT NULL,
	"available_leave" integer NOT NULL,
	"used_leave" integer NOT NULL,
	"academic_year" varchar(20) NOT NULL,
	"total_working_days" integer NOT NULL,
	"attendance_percentage" numeric(5, 2) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"gender" varchar(255),
	"profile" varchar(255) DEFAULT '',
	"phone" varchar(255) DEFAULT '',
	"department" varchar(255) DEFAULT '',
	"class" varchar(255) DEFAULT '',
	"role" "user_role" DEFAULT 'STUDENT' NOT NULL,
	"address" varchar(255) DEFAULT '',
	"is_verified" boolean DEFAULT false NOT NULL,
	"onboarding_completed" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "leave_requests" ADD CONSTRAINT "leave_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leave_requests" ADD CONSTRAINT "leave_requests_request_to_id_users_id_fk" FOREIGN KEY ("request_to_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_leaves" ADD CONSTRAINT "user_leaves_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;