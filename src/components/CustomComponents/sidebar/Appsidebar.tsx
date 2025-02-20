import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import AppSidebarHeader from "./AppSidebarHeader";
import AppSideBarGroup1 from "./AppSideBarGroup1";
import { Home } from "lucide-react";

const group1 = [
  {
    name: "Dashboard",
    icon: <Home size={20} />,
    url: "/dashboard",
    role: ["ADMIN", "STUDENT", "TEACHER"],
  },
  {
    name: "Apply Leave",
    icon: <Home size={20} />,
    url: "/apply-leave",
    role: ["STUDENT", "TEACHER"],
  },
  {
    name: "Leave Request",
    icon: <Home size={20} />,
    url: "/leave-request",
    role: ["ADMIN", "TEACHER"],
  },
  {
    name: "Verify User",
    icon: <Home size={20} />,
    url: "/verify-user",
    role: ["ADMIN"],
  },
  {
    name: "Users",
    icon: <Home size={20} />,
    url: "/users",
    role: ["ADMIN"],
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <AppSidebarHeader />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroupContent>
          <SidebarGroupLabel>Links</SidebarGroupLabel>
          <AppSideBarGroup1 values={group1} />
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
