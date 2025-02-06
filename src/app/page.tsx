"use client";

import { GetSession, GetUserById, SignOutAction } from "@/action/Useraction";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await SignOutAction();
    } catch (error) {
      console.error("Signout error:", error);
    }
  };

  useEffect(() => {
    const getSession = async () => {
      try {
        const session = await GetSession();
        if (!session) {
          router.push("/login");
        }
        if (session?.user.id) {
          const userData = await GetUserById({ userid: session?.user.id });
          if (!userData) {
            router.push("/login");
          } else if (userData.onboardingCompleted === false) {
            router.push(`/onboarding/${session?.user.id}`);
          }
        }
        console.log(session);
      } catch (error) {
        console.error("Session error:", error);
      }
    };
    getSession();
  });

  return (
    <div>
      <button onClick={handleSignOut}>Sigin Out</button>
    </div>
  );
}
