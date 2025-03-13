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
    name: "Leave Dashboard",
    icon: <Home size={20} />,
    url: "/leave",
    role: ["STUDENT", "TEACHER", "ADMIN"],
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
