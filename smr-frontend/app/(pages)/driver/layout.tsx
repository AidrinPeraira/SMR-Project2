import UserNav from "@/components/common/user-nav";
import { Button } from "@/components/ui/button";

export default function DriverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950/50">
      <UserNav
      // links={[
      //   { name: "Home", href: "#" },
      //   { name: "My rides", href: "#" },
      //   { name: "Invite friends", href: "#" },
      // ]}
      // userName="John Driver"
      // userAvatar="/avatars/02.png"
      // actionButton={
      //   <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium shadow-sm">
      //     Switch to Passenger
      //   </Button>
      // }
      />

      <main className="flex-1 container py-6 px-4 md:px-8 mx-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}
