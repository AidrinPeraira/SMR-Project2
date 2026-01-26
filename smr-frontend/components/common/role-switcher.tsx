"use client";

import { Button } from "@/components/ui/button";
``;
export function RoleSwitcher() {
  return (
    <>
      <Button className="min-w-[140px]">Switch to Driver</Button>

      {/* Modal included for layout consistency, kept closed */}
      {/* <BecomeDriverModal open={false} onOpenChange={() => {}} /> */}
    </>
  );
}
