"use client";

import { GetSession, SignOutAction } from "@/action/Useraction";
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
