import SidebarLayout from "@/components/common/sidebar-layout";
import { User02Icon } from "@hugeicons/core-free-icons";

const profileDashSections = [
  { path: "/profile", title: "Profile", icon: User02Icon },
];

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarLayout
      sections={profileDashSections}
      userName="John Doe"
      avatar="/avatars/01.png"
    >
      {children}
    </SidebarLayout>
  );
}
