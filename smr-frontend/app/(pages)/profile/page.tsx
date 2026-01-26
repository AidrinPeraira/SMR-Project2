"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Edit01Icon,
  Shield01Icon,
  StarIcon,
  User02Icon,
  Car01Icon,
  PlusMinus01Icon,
} from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  const user = {
    name: "Aidrin Peraira",
    email: "aidrin.peraira@yahoo.com",
    phone: "+91 9876543210",
    joined: "Jan 2026",
    avatar: "/profile-placeholder.webp",
    rating: 4.8,
    reviews: 23,
  };

  const isDriver = false;

  const driver = {
    licenseNumber: "KL1320210001235",
    licenseExpiry: "31 Dec 2030",
    isVerified: true,
  };

  const vehicles = [
    {
      vehicleId: "VEH00002",
      brand: "Toyota",
      model: "Innova Hycross",
      registrationNumber: "KL07CC1235",
      image:
        "https://res.cloudinary.com/sharemyride/image/upload/v1/vehicles/innova_front.jpg",
    },
  ];

  return (
    <div className="container mx-auto max-w-5xl py-8 px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Joined in {user.joined}
            </p>
            <h2 className="text-4xl font-bold mb-2">{user.name}</h2>

            <div className="flex items-center gap-2 mb-4">
              <span className="flex items-center font-bold text-primary">
                {user.rating}
                <HugeiconsIcon
                  icon={StarIcon}
                  className="w-4 h-4 ml-1 fill-current"
                />
              </span>
              <span className="text-muted-foreground">
                ({user.reviews} reviews)
              </span>
            </div>

            <Button variant="secondary">Edit Profile</Button>
          </div>

          <Separator />

          <section className="space-y-6">
            <h3 className="text-xl font-bold">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-muted-foreground">Name</Label>
                <div className="font-medium text-lg">{user.name}</div>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Email</Label>
                <div className="font-medium text-lg">{user.email}</div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground">Phone</Label>
              <div className="font-medium text-lg">{user.phone}</div>
            </div>
          </section>

          <Separator />

          <section className="space-y-6">
            <h3 className="text-xl font-bold">Driver Profile</h3>

            {isDriver ? (
              <div className="rounded-xl border bg-card p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary">
                    <HugeiconsIcon icon={Shield01Icon} className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">Licensed Driver</p>
                    <p className="text-sm text-muted-foreground">
                      License verified
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">
                      License Number
                    </Label>
                    <div className="font-medium">{driver.licenseNumber}</div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">
                      License Expiry
                    </Label>
                    <div className="font-medium">{driver.licenseExpiry}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border bg-card p-6 flex items-center justify-between">
                <div>
                  <p className="font-medium">Not a driver yet</p>
                  <p className="text-sm text-muted-foreground">
                    Apply to start offering rides
                  </p>
                </div>
                <Button>Apply to become a driver</Button>
              </div>
            )}
          </section>

          {isDriver && (
            <>
              <Separator />

              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">My Vehicles</h3>
                  <Button className="flex items-center gap-2">
                    <HugeiconsIcon icon={PlusMinus01Icon} className="w-4 h-4" />
                    Add Vehicle
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {vehicles.map((vehicle) => (
                    <Card key={vehicle.vehicleId} className="overflow-hidden">
                      <img
                        src={vehicle.image}
                        alt={vehicle.model}
                        className="h-40 w-full object-cover"
                      />
                      <div className="p-4 space-y-1">
                        <div className="flex items-center gap-2">
                          <HugeiconsIcon
                            icon={Car01Icon}
                            className="w-4 h-4 text-muted-foreground"
                          />
                          <span className="font-medium">
                            {vehicle.brand} {vehicle.model}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Reg. No: {vehicle.registrationNumber}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card className="overflow-hidden border shadow-sm bg-card h-full max-h-[400px] relative group">
            <div className="relative w-full h-full flex items-end justify-center pt-10">
              <div className="relative w-64 h-64">
                <Avatar className="w-full h-full rounded-none">
                  <AvatarImage
                    src={user.avatar}
                    className="object-cover drop-shadow-xl"
                  />
                  <AvatarFallback>
                    <HugeiconsIcon
                      icon={User02Icon}
                      className="w-32 h-32 text-muted-foreground"
                    />
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/60 transition-colors flex items-center justify-center">
              <div className="bg-popover text-popover-foreground px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                <span className="text-sm font-bold flex items-center gap-2">
                  <HugeiconsIcon icon={Edit01Icon} className="w-3 h-3" />
                  Change Photo
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
