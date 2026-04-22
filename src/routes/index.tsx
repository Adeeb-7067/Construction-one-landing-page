import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/landing/Hero";
import { AboutPlatform } from "@/components/landing/AboutPlatform";
import { WhyChoose } from "@/components/landing/WhyChoose";
import { Categories } from "@/components/landing/Categories";
import { Workflow } from "@/components/landing/Workflow";
import { Marketplace } from "@/components/landing/Marketplace";
import { Stats } from "@/components/landing/Stats";
import { VendorSignup } from "@/components/landing/VendorSignup";
import { Testimonials } from "@/components/landing/Testimonials";
import { Contact } from "@/components/landing/Contact";
import { FloatingAI } from "@/components/landing/FloatingAI";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Construction One — India's marketplace for construction materials" },
      {
        name: "description",
        content:
          "Order cement, TMT steel, bricks, sand, tiles & more from verified vendors — best price, on-site delivery. India's trusted marketplace for construction materials.",
      },
      { property: "og:title", content: "Construction One — Construction materials, delivered." },
      {
        property: "og:description",
        content:
          "India's trusted marketplace for cement, steel, bricks, sand and more — from verified vendors, delivered to your site.",
      },
      { property: "og:type", content: "website" },
      {
        name: "keywords",
        content:
          "construction materials India, buy cement online, TMT steel price, bricks online, building material marketplace, vendor signup, construction supplies",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative overflow-hidden">
      <Hero />
      <AboutPlatform />
      <WhyChoose />
      <Categories />
      <Workflow />
      <Marketplace />
      <Stats />
      <VendorSignup />
      <Testimonials />
      <Contact />
      <Footer />
      <FloatingAI />
    </main>
  );
}
