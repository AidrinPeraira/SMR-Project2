import SidebarLayout from "@/components/common/sidebar-layout";
import { Car01Icon, Chart01Icon, User02Icon } from "@hugeicons/core-free-icons";

const adminDashSections = [
  { path: "/admin", title: "Dashboard", icon: Chart01Icon },
  { path: "/admin/users", title: "Users", icon: User02Icon },
  { path: "/admin/applications", title: "Applications", icon: Car01Icon },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarLayout
      sections={adminDashSections}
      userName="Admin User"
      avatar="/avatars/01.png"
    >
      {children}
    </SidebarLayout>
  );
}
