"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Menu01Icon,
  Logout01Icon,
  User02Icon,
} from "@hugeicons/core-free-icons";

type Section = {
  path: string;
  title: string;
  icon: any;
};

interface SidebarLayoutProps {
  sections: Section[];
  children: React.ReactNode;
  userName?: string;
  userEmail?: string;
  avatar?: string;
}

function SidebarNav({
  sections,
  pathname,
}: {
  sections: Section[];
  pathname: string;
}) {
  return (
    <nav className="flex flex-col gap-1">
      {sections.map((item) => {
        const active = pathname === item.path;

        return (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <HugeiconsIcon icon={item.icon} className="h-4 w-4 shrink-0" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}

function ProfileMenu({
  userName,
  userEmail,
  avatar,
}: {
  userName: string;
  userEmail?: string;
  avatar?: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex w-full items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-muted transition-colors text-left">
          <div
            className="h-10 w-10 rounded-full bg-muted bg-cover bg-center"
            style={{
              backgroundImage: `url(${avatar ?? "https://via.placeholder.com/40"})`,
            }}
          />
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{userName}</p>
            {userEmail && (
              <p className="text-xs text-muted-foreground truncate">
                {userEmail}
              </p>
            )}
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuItem className="flex items-center gap-2 text-destructive">
          <HugeiconsIcon icon={Logout01Icon} className="h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function SidebarLayout({
  sections,
  children,
  userName = "User",
  userEmail = "user@example.com",
  avatar,
}: SidebarLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <aside className="hidden border-r bg-muted/40 md:flex md:w-64 md:flex-col">
        <div className="flex flex-col gap-6 p-4">
          <ProfileMenu
            userName={userName}
            userEmail={userEmail}
            avatar={avatar}
          />

          <SidebarNav sections={sections} pathname={pathname} />
        </div>
      </aside>

      <div className="flex w-full flex-col md:hidden">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h1 className="text-lg font-semibold">Menu</h1>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <HugeiconsIcon icon={Menu01Icon} className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="p-4">
              <div className="flex flex-col gap-6">
                <ProfileMenu
                  userName={userName}
                  userEmail={userEmail}
                  avatar={avatar}
                />

                <SidebarNav sections={sections} pathname={pathname} />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <main className="flex-1 p-4">{children}</main>
      </div>

      <main className="hidden flex-1 p-6 md:block">{children}</main>
    </div>
  );
}
