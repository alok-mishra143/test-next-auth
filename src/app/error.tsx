/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { GetSession, SignOutAction } from "@/action/Useraction";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ErrorPage = ({ error }: { error: Error }) => {
  const router = useRouter();
  const [session, setSession] = useState<any>(null); // Store session state

  useEffect(() => {
    const checkSession = async () => {
      try {
        const userSession = await GetSession();
        setSession(userSession);

        if (userSession) {
          await SignOutAction(); // Remove session if error occurs
          router.push("/login"); // Redirect to login
        }
      } catch (err) {
        console.error("Session error:", err);
      }
    };

    checkSession();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-red-800 p-6">
      <div className="shadow-lg rounded-lg p-6 max-w-md text-center border border-red-400">
        <h1 className="text-2xl font-bold mb-4">Something went wrong!</h1>
        <p className="text-lg">{error.message}</p>
        <Button onClick={() => router.push("/login")}>Retry</Button>
      </div>
    </div>
  );
};

export default ErrorPage;
