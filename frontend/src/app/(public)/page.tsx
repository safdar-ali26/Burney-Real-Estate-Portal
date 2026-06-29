import HeroSection from "@/components/public/home/hero-section";
import FeaturedProjects from "@/components/public/home/featured-projects";
import FeaturedDevelopers from "@/components/public/home/featured-developers";
import ExploreCommunities from "@/components/public/home/explore-communities";
import WhyBurney from "@/components/public/home/why-burney";
import HomeCTA from "@/components/public/home/home-cta";
import InvestmentCalculator from "@/components/public/home/investment-calculator";
import Testimonials from "@/components/public/home/testimonials";
import Consultation from "@/components/public/home/consultation";
import Services from "@/components/public/home/services";
import LatestLaunches from "@/components/public/home/latest-launches";
import FAQSection from "@/components/public/home/faq-section";
import TrustAwards from "@/components/public/home/trust-awards";
import Statistics from "@/components/public/home/statistics";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyBurney />
      <Statistics />
      <FeaturedProjects />
      <InvestmentCalculator />
      <FeaturedDevelopers />
      <Services />
      <ExploreCommunities />
      <LatestLaunches />
      <TrustAwards />
      <Testimonials />
      <FAQSection />
      <HomeCTA />
      <Consultation />
    </>
  );
}