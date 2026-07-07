import BrokerBanner from "@/components/BrokerBanner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <BrokerBanner />
      </main>
      <Footer />
    </>
  );
}
