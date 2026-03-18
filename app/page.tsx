import CallToAction from "@/components/landing/CallToAction";
import CVTemplates from "@/components/landing/CVTemplates";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <HowItWorks />
      <CVTemplates />
      <Features />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
}
