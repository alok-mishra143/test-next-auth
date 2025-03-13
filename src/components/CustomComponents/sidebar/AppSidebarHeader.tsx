import { GetSession } from "@/action/Useraction";
import React from "react";
import { NavUser } from "./Navuser";

const AppSidebarHeader = async () => {
  const session = await GetSession();

  // Check if session exists and pass to NavUser
  if (!session || !session.user) {
    return <div>Loading...</div>; // Handle loading or error state
  }

  const { email, id, role, name } = session.user;
  const user = {
    name: name ?? "default User", // You can modify this if you have a separate name field in your session
    email: email ?? "default@example.com",
    avatar: `https://avatar.vercel.sh/rauchg?rounded=60`, // Generate a placeholder avatar
    role: role ?? "user",
  };

  return <NavUser user={user} />;
};

export default AppSidebarHeader;
