import { Facebook, Instagram, Twitter } from "lucide-react";

export default function LandingFooter() {
  const footerLinks = [
    {
      title: "Company",
      links: ["About Us", "Careers", "Contact"],
    },
    {
      title: "For Riders",
      links: ["Find a Ride", "How It Works", "Safety Tips"],
    },
    {
      title: "For Drivers",
      links: ["Offer a Ride", "Driver Requirements", "Earnings"],
    },
    {
      title: "Legal",
      links: ["Terms of Service", "Privacy Policy"],
    },
  ];

  return (
    <footer className="bg-background border-t border-border w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-foreground font-semibold mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-6 mb-8">
          <a
            href="#"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
            aria-label="Twitter"
          >
            <Twitter className="w-6 h-6" />
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
            aria-label="Facebook"
          >
            <Facebook className="w-6 h-6" />
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
            aria-label="Instagram"
          >
            <Instagram className="w-6 h-6" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            © 2023 ShareMyRide. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
