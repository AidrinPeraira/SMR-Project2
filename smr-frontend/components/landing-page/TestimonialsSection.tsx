import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ImageAssets } from "@/assets";

function TestimonialsSection() {
  return (
    <section className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            What our customers say?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Testimonials that are an ode to our philosphy. Ride More! Save More!
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid gap-6 justify-items-center sm:grid-cols-1 lg:grid-cols-3">
          <Card className="w-96">
            <CardHeader>
              <CardTitle className="flex items-center align-middle justify-center">
                <Image
                  src={ImageAssets.PersonOneImage}
                  alt="image of a person"
                  width={400}
                />
              </CardTitle>
              <CardDescription className="mt-4">
                <h3 className="scroll-m-20 mt-4 text-m font-medium tracking-tight md:text-lg text-card-foreground">
                  ShareMyRide has transformend my daily coimmute. It&apos;s
                  reliable, affordable and I&apos;ve met some great people along
                  the way!
                </h3>
              </CardDescription>
            </CardHeader>
            <CardContent>Sophia Carter, Kerala</CardContent>
          </Card>

          <Card className="w-96">
            <CardHeader>
              <CardTitle className="flex items-center align-middle justify-center">
                <Image
                  src={ImageAssets.PersonThreeImage}
                  alt="image of a person"
                  width={400}
                />
              </CardTitle>
              <CardDescription className="mt-4">
                <h3 className="scroll-m-20 mt-4 text-m font-medium tracking-tight md:text-lg text-card-foreground">
                  ShareMyRide has transformend my daily coimmute. It&apos;s
                  reliable, affordable and I&apos;ve met some great people along
                  the way!
                </h3>
              </CardDescription>
            </CardHeader>
            <CardContent>Sophia Carter, Kerala</CardContent>
          </Card>
          <Card className="w-96">
            <CardHeader>
              <CardTitle className="flex items-center align-middle justify-center">
                <Image
                  src={ImageAssets.PersonTwoImage}
                  alt="image of a person"
                  width={400}
                />
              </CardTitle>
              <CardDescription className="mt-4">
                <h3 className="scroll-m-20 mt-4 text-m font-medium tracking-tight md:text-lg text-card-foreground">
                  ShareMyRide has transformend my daily coimmute. It&apos;s
                  reliable, affordable and I&apos;ve met some great people along
                  the way!
                </h3>
              </CardDescription>
            </CardHeader>
            <CardContent>Sophia Carter, Kerala</CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
