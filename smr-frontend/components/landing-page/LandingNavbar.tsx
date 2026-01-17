import React from "react";
import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import Image from "next/image";
import { ImageAssets } from "@/assets";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const navItems = [
  {
    path: "/",
    name: "Features",
  },
  {
    path: "/",
    name: "Testimonials",
  },
  {
    path: "/",
    name: "FAQ",
  },
];

function LandingNavbar() {
  return (
    <>
      <div className=" left-0 z-50  border-border sticky">
        <Menubar className="relative flex justify-between items-center p-8 shadow-md border-border">
          <MenubarMenu>
            <Image
              src={ImageAssets.SMRFullTextLogoBlack}
              alt="website full logo"
              height={30}
              className="block dark:hidden"
            />
            <Image
              src={ImageAssets.SMRFullTextLogoWhite}
              alt="website full logo"
              height={30}
              className="hidden dark:block"
            />
          </MenubarMenu>

          {/* this is the nav bar for bigger screens (Centered Links) */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-6 items-center">
            {navItems.map((item) => (
              <a key={item.name} href={`#${item.name.toLowerCase()}`}>
                {item.name}
              </a>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center gap-3 align-middle ">
            <Button asChild>
              <Link href="/signup" replace>
                Signup
              </Link>
            </Button>

            <Button asChild variant="secondary">
              <Link href="/login" replace>
                Login
              </Link>
            </Button>
          </div>

          {/* This is the side nav for screens smaller than md */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger>
                {/* <Menu /> */}
                <Menu />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="pt-10 gap-3 backdrop-blur-5 w-full"
              >
                <SheetHeader>
                  <SheetTitle className="text-left m-1">
                    <Image
                      src={ImageAssets.SMRFullTextLogoBlack}
                      alt="website full logo"
                      height={100}
                      className="block dark:hidden"
                    />
                    <Image
                      src={ImageAssets.SMRFullTextLogoWhite}
                      alt="website full logo"
                      height={100}
                      className="hidden dark:block"
                    />
                  </SheetTitle>
                </SheetHeader>
                <div className=" flex flex-col items-center justify-center align-middle m-2 p-2 gap-3">
                  {navItems.map((item) => (
                    <a key={item.name} href={`#${item.name.toLowerCase()}`}>
                      {item.name}
                    </a>
                  ))}
                  <Button asChild className="w-full shadow-sm m-1">
                    <Link href={"/signup"} replace>
                      Signup
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full shadow-sm m-1"
                    variant="secondary"
                  >
                    <Link href={"/login"} replace>
                      Login
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </Menubar>
      </div>
    </>
  );
}

export default LandingNavbar;
