import BrokerBanner from "@/components/BrokerBanner";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import MobileCTA from "@/components/MobileCTA";
import Testimonials from "@/components/Testimonials";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pb-20 sm:pb-0">
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <BrokerBanner />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
