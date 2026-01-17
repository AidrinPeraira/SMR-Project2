import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

const FAQSection = () => {
  return (
    <section className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Frequently asked questions.
          </h2>
        </div>

        {/* FAQs */}
        <div className="grid gap-6 justify-items-center sm:grid-cols-1 lg:grid-cols-1">
          <Accordion
            type="single"
            collapsible
            className="w-full p-5 flex flex-col gap-2"
          >
            <AccordionItem
              value="item-1"
              className="px-4 text-foreground bg-background rounded-xl shadow-sm"
            >
              <AccordionTrigger>
                <h1 className="scroll-m-20 text-lg font-bold tracking-tight md:text-lg text-card-foreground">
                  How does ShareMyRide work?
                </h1>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <h3 className="scroll-m-20 text-lg tracking-wide mx-4 md:text-lg text-secondary-foreground">
                  ShareMyRide connects drivers with empty seats to riders
                  heading in the same direction. Simply create an account,
                  search for rides, or offer your own. Our platform handles
                  payment and communication, making carpooling seamless.
                </h3>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-2"
              className="px-4 text-foreground bg-background rounded-xl shadow-sm"
            >
              <AccordionTrigger>
                <h1 className="scroll-m-20 text-lg font-bold tracking-tight md:text-lg text-card-foreground">
                  Is it safe to carpool with strangers?
                </h1>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <h3 className="scroll-m-20 text-lg tracking-wide mx-4 md:text-lg text-secondary-foreground">
                  SharMyRide verifies all documents related to the driver and
                  the vehicle. Allowing the users to travel stress free.
                </h3>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-3"
              className="px-4 text-foreground bg-background rounded-xl shadow-sm"
            >
              <AccordionTrigger>
                <h1 className="scroll-m-20 text-lg font-bold tracking-tight md:text-lg text-card-foreground">
                  How do i get paid as a driver?
                </h1>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <h3 className="scroll-m-20 text-lg tracking-wide mx-4 md:text-lg text-secondary-foreground">
                  ShareMyRide collects payments from passngers based on rates
                  predetermined. Once the ride is complete the amount credits
                  into the drivers account.
                </h3>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
