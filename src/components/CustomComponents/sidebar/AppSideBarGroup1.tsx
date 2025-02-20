import { GetSession } from "@/action/Useraction";
import { SidebarGroup } from "@/components/ui/sidebar";
import Link from "next/link";
import React from "react";

interface IAppSideBarGroup1 {
  name: string;
  icon: React.ReactNode;
  url: string;
  role: string[];
}

interface AppSideBarGroup1Props {
  values: IAppSideBarGroup1[];
}

const AppSideBarGroup1 = async ({ values }: AppSideBarGroup1Props) => {
  const session = await GetSession();
  const role = session?.user.role || "STUDENT";
  if (!session || !session.user) {
    return <div>Loading...</div>;
  }

  const filteredValues = values.filter((value) => value.role.includes(role));
  return (
    <SidebarGroup>
      {filteredValues.map((value, index) => (
        <Link key={index} href={value.url}>
          <div className="flex cursor-pointer gap-2 items-center p-2 hover:bg-secondary">
            {value.icon}
            {value.name}
          </div>
        </Link>
      ))}
    </SidebarGroup>
  );
};

export default AppSideBarGroup1;
