import FAQSection from "@/components/landing-page/FAQSection";
import { HeroSection } from "@/components/landing-page/HeroSection";
import LandingFooter from "@/components/landing-page/LandingFooter";
import LandingNavbar from "@/components/landing-page/LandingNavbar";
import TestimonialsSection from "@/components/landing-page/TestimonialsSection";
import { WhySection } from "@/components/landing-page/WhySection";

type Props = {};

function LandingPage({}: Props) {
  return (
    <>
      <LandingNavbar />

      <HeroSection />

      <section id="features" className="scroll-mt-24">
        <WhySection />
      </section>

      <section id="testimonials" className="scroll-mt-24">
        <TestimonialsSection />
      </section>

      <section id="faq" className="scroll-mt-24">
        <FAQSection />
      </section>

      <LandingFooter />
    </>
  );
}

export default LandingPage;
