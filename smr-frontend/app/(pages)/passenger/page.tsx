import { Metadata } from "next";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import { MapPinIcon, Search01Icon } from "@hugeicons/core-free-icons";

export const metadata: Metadata = {
  title: "Plan your ride",
  description: "Where are you going today?",
};

export default function PassengerHomePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 p-6">
      {/* Hero */}
      <div className="mx-auto mt-8 w-full max-w-2xl space-y-6 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">
          Where are you going today?
        </h1>

        <div className="relative">
          <HugeiconsIcon
            icon={Search01Icon}
            className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground"
          />
          <Input
            placeholder="Enter your destination"
            className="h-12 pl-12 text-lg bg-background"
          />
        </div>
      </div>

      {/* Map */}
      <Card className="relative h-[500px] overflow-hidden bg-muted">
        <CardContent className="relative h-full p-0">
          {/* Grid / Map texture */}
          <div className="pointer-events-none absolute inset-0 opacity-30">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <pattern
                id="grid"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 100 0 L 0 0 0 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Map content */}
          <div className="relative flex h-full items-center justify-center">
            {/* Abstract land shapes */}

            {/* City label */}
            <div className="z-10 flex flex-col items-center gap-1">
              <h2 className="text-3xl font-semibold text-foreground/90">
                San Francisco
              </h2>
              <div className="flex items-center gap-1 rounded-full border bg-card px-2 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                <HugeiconsIcon icon={MapPinIcon} className="h-3 w-3" />
                Map view
              </div>
            </div>

            {/* Floating labels */}
            <div className="absolute left-1/4 top-1/4 flex items-center rounded-lg border bg-card px-2 py-1 text-xs font-medium shadow-sm">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
              Golden Gate Park
            </div>

            <div className="absolute bottom-1/3 right-1/4 flex items-center rounded-lg border bg-card px-2 py-1 text-xs font-medium shadow-sm">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
              India Basin
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
