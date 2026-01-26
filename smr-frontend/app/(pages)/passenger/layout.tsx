import { RoleSwitcher } from "@/components/common/role-switcher";
import UserNav from "@/components/common/user-nav";

export default function PassengerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <UserNav
      // links={[
      //   { name: "Home", href: "#" },
      //   { name: "My rides", href: "#" },
      //   { name: "Invite friends", href: "#" },
      // ]}
      // userName="Jane Passenger"
      // userEmail="jane.passenger@example.com"
      // userAvatar="/avatars/01.png"
      // actionButton={<RoleSwitcher />}
      />

      <main className="flex-1">{children}</main>
    </div>
  );
}
