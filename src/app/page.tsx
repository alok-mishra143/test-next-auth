import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="flex items-center justify-center gap-4 min-h-screen">
      <Button
        asChild
        className="px-6 py-3 rounded-xl shadow-md hover:scale-105 transition-transform"
      >
        <Link href="/login">Login</Link>
      </Button>
      <Button
        asChild
        variant="outline"
        className="px-6 py-3 rounded-xl shadow-md hover:scale-105 transition-transform"
      >
        <Link href="/signup">Register</Link>
      </Button>
    </div>
  );
};

export default Home;
