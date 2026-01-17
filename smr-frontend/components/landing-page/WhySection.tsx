import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function WhySection() {
  return (
    <section className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Why ShareMyRide?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Designed for everyday commuters who want reliable, affordable, and
            sustainable travel.
          </p>
        </div>

        {/* Features */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Lower Travel Costs</CardTitle>
              <CardDescription>
                Share fuel expenses and reduce your daily commute costs without
                compromising convenience.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trusted Community</CardTitle>
              <CardDescription>
                Verified users, clear profiles, and transparent ride details
                help build trust between passengers and drivers.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Smarter Commutes</CardTitle>
              <CardDescription>
                Fewer vehicles on the road means less traffic, shorter travel
                times, and a smoother commute.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Eco-Friendly Choice</CardTitle>
              <CardDescription>
                Reduce carbon emissions by sharing rides and contributing to a
                more sustainable future.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Flexible Roles</CardTitle>
              <CardDescription>
                Be a passenger today, a driver tomorrow. Switch roles easily
                based on your needs.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Built for Scale</CardTitle>
              <CardDescription>
                Designed from the ground up to support growing cities and
                increasing numbers of daily commuters.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
