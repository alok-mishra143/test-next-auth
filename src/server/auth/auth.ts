/* eslint-disable @typescript-eslint/no-explicit-any */
import { signInSchema } from "./../../lib/zod";
import NextAuth, { CredentialsSignin } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "../db";
import Credentials from "next-auth/providers/credentials";
import { LoginAction } from "@/action/Useraction";

declare module "next-auth" {
  interface User {
    id?: string;
    role?: string;
  }
  interface Session {
    user: {
      id: string;
      email?: string;
      role?: string;
    };
  }
}

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );
          const result = await LoginAction({ email, password });

          if (!result) {
            throw new InvalidLoginError();
          }

          return {
            id: String(result.id),
            email: result.email,
            role: result.role,
          };
        } catch (error) {
          console.error(error);
          throw new InvalidLoginError();
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 Day
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 1 Day
  },

  callbacks: {
    async jwt({ token, user }) {
      // Persist user data in token
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      // Add custom fields to session
      if (token?.id) {
        session.user.id = token.id as string;
      }
      if (token?.email) {
        session.user.email = token.email as string;
      }
      if (token?.role) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
