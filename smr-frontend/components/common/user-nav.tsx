"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon, Notification01Icon } from "@hugeicons/core-free-icons";

import { ImageAssets } from "@/assets";

export default function UserNav() {
  // Hard-coded placeholders
  const links = [
    { name: "Dashboard", href: "#" },
    { name: "Trips", href: "#" },
    { name: "Payments", href: "#" },
  ];

  const userName = "John Doe";
  const userEmail = "john.doe@example.com";
  const userAvatar = "";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        {/* Desktop Logo */}
        <div className="hidden md:flex items-center">
          <Link href="#" className="flex items-center">
            <img
              src={ImageAssets.SMRFullTextLogoBlack.src}
              alt="ShareMyRide"
              height={28}
              className="block dark:hidden h-7"
            />
            <img
              src={ImageAssets.SMRFullTextLogoWhite.src}
              alt="ShareMyRide"
              height={28}
              className="hidden dark:block h-7"
            />
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <HugeiconsIcon icon={Menu01Icon} className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>
                  <img
                    src={ImageAssets.SMRFullTextLogoBlack.src}
                    alt="ShareMyRide"
                    height={28}
                    className="block dark:hidden h-7"
                  />
                  <img
                    src={ImageAssets.SMRFullTextLogoWhite.src}
                    alt="ShareMyRide"
                    height={28}
                    className="hidden dark:block h-7"
                  />
                </SheetTitle>
              </SheetHeader>

              <nav className="mt-8 flex flex-col gap-4">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    href="#"
                    className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="mt-4">
                  <Button className="w-full">Action</Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {links.map((link, index) => (
            <Link
              key={link.name}
              href="#"
              className={`transition-colors ${
                index === 0
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <HugeiconsIcon icon={Notification01Icon} className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback>
                    {userName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{userName}</span>
                  <span className="text-xs text-muted-foreground">
                    {userEmail}
                  </span>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Link href="#">Profile</Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="text-destructive">
                <Button variant="ghost">Logout</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
