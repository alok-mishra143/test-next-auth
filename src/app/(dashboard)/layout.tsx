import { AppSidebar } from "@/components/CustomComponents/sidebar/Appsidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface ILayout {
  children: React.ReactNode;
}

const layout = ({ children }: ILayout) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />

        {children}
      </main>
    </SidebarProvider>
  );
};

export default layout;
