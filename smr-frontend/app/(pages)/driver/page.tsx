import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Dollar01Icon,
  MapPinIcon,
  UserMultiple02Icon,
} from "@hugeicons/core-free-icons";

export const metadata: Metadata = {
  title: "Driver Dashboard",
  description: "Manage your trips and earnings",
};

// --- Mock Data ---
const bookingRequests = [
  {
    id: 1,
    name: "Sophia",
    passengers: 1,
    from: "Downtown",
    to: "Airport",
  },
  {
    id: 2,
    name: "Ethan",
    passengers: 2,
    from: "University",
    to: "City Center",
  },
  {
    id: 3,
    name: "Olivia",
    passengers: 1,
    from: "Suburbia",
    to: "Concert Hall",
  },
];

const upcomingTrips = [
  { id: 1, to: "Airport, 10/26", seats: "2 seats available" },
  { id: 2, to: "City Center, 10/27", seats: "1 seat available" },
  { id: 3, to: "Suburbia, 10/28", seats: "3 seats available" },
];

export default function DriverHomePage() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* LEFT COLUMN */}
      <div className="space-y-6 lg:col-span-2">
        {/* Hero */}
        <Card>
          <CardContent className="flex flex-col gap-6 p-6 md:flex-row">
            <div className="flex-1 space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight">
                Ready for your next trip?
              </h2>
              <p className="text-muted-foreground">
                Offer a ride to passengers nearby.
              </p>
              <Button className="mt-2 w-fit">Offer a ride</Button>
            </div>

            <div className="hidden md:flex flex-1 items-center justify-center rounded-lg bg-muted">
              <HugeiconsIcon
                icon={MapPinIcon}
                className="h-16 w-16 text-muted-foreground"
              />
            </div>
          </CardContent>
        </Card>

        {/* Booking Requests */}
        <div>
          <h3 className="mb-4 text-xl font-semibold">New booking requests</h3>

          <div className="space-y-4">
            {bookingRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>
                        {request.name.slice(0, 1)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="font-medium">{request.name}</p>

                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <HugeiconsIcon
                          icon={UserMultiple02Icon}
                          className="h-3 w-3"
                        />
                        {request.passengers} passenger
                        {request.passengers > 1 ? "s" : ""}
                      </div>

                      <p className="mt-1 text-xs text-muted-foreground">
                        From{" "}
                        <span className="text-foreground font-medium">
                          {request.from}
                        </span>{" "}
                        to{" "}
                        <span className="text-foreground font-medium">
                          {request.to}
                        </span>
                      </p>
                    </div>
                  </div>

                  <Button variant="secondary">View</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="space-y-6 lg:col-span-1">
        {/* Earnings */}
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h3 className="font-semibold">Earnings</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Last ride: $25
              </p>
              <Button variant="outline" size="sm" className="mt-3">
                View reports
              </Button>
            </div>

            <HugeiconsIcon
              icon={Dollar01Icon}
              className="h-10 w-10 text-muted-foreground"
            />
          </CardContent>
        </Card>

        {/* Upcoming Trips */}
        <div>
          <h3 className="mb-4 text-xl font-semibold">Upcoming trips</h3>

          <div className="space-y-3">
            {upcomingTrips.map((trip) => (
              <Card key={trip.id}>
                <CardContent className="flex items-start gap-4 p-4">
                  <div className="rounded-md bg-muted p-2">
                    <HugeiconsIcon
                      icon={MapPinIcon}
                      className="h-5 w-5 text-muted-foreground"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium">To: {trip.to}</p>
                    <p className="text-xs text-muted-foreground">
                      {trip.seats}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
