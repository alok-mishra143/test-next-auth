import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { GetSession } from "./action/Useraction";

// Define valid role types
type UserRole = "STUDENT" | "TEACHER" | "ADMIN";

const allowedRoutes = {
  STUDENT: ["/dashboard", "/apply-leave"],
  TEACHER: ["/dashboard", "/apply-leave", "/student"],
  ADMIN: [
    "/dashboard",
    "/apply-leave",
    "/leave-request",
    "/verify-user",
    "/users",
  ],
};

export async function middleware(req: NextRequest) {
  const session = await GetSession();

  if (!session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const userRole = (session.user?.role || "STUDENT") as UserRole;

  const path = req.nextUrl
    .pathname as keyof (typeof allowedRoutes)[UserRole][number];

  if (!allowedRoutes[userRole]?.includes(path.toString())) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/apply-leave",
    "/leave-request",
    "/verify-user",
    "/student",
    "/users",
  ],
};
