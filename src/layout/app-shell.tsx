import { Outlet } from "react-router";
import MainLayout from "./main-layout";

export default function AppShell() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
