import { getRecentProjects } from "@/actions/project";
import { onAuthenticateUser } from "@/actions/user";
import AppSideBar from "@/components/global/app-sidebar/App-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const checkUser = await onAuthenticateUser();
  const recentProjects = await getRecentProjects();

  if (!checkUser.user) {
    redirect("/sign-in");
  }

  return (
    <SidebarProvider>
      <AppSideBar
        user={checkUser.user}
        recentProjects={recentProjects.data ?? []}
      />
      {children}
    </SidebarProvider>
  );
};

export default Layout;
