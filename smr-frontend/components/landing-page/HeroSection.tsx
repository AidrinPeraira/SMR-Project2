import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImageAssets } from "@/assets";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Text */}
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Share rides.
              <br />
              <span className="text-primary">Save money. Travel smarter.</span>
            </h1>

            <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
              ShareMyRide helps passengers and drivers connect for daily
              commutes. Reduce costs, cut emissions, and make your journey more
              social.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/signup" replace>
                  Get started
                </Link>
              </Button>

              <Button size="lg" variant="outline" asChild>
                <Link href="/login" replace>
                  Log in
                </Link>
              </Button>
            </div>
          </div>

          {/* Right: Visual */}
          <Card className="relative overflow-hidden border-none bg-muted/40">
            <div className="aspect-4/3 w-full">
              <Image
                src={ImageAssets.LandingPageHeroCar}
                alt="Car pooling illustration"
                fill
                className="object-cover"
                priority
              />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
