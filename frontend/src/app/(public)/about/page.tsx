import AboutCTA from "@/components/public/about/about-cta";
import AboutHero from "@/components/public/about/about-hero";
import CompanyIntro from "@/components/public/about/company-intro";
import CompanyTimeline from "@/components/public/about/company-timeline";
import MeetAgents from "@/components/public/about/meet-agents";
import OfficeExperience from "@/components/public/about/office-experience";
import OurProcess from "@/components/public/about/our-process";
import TrustedDevelopers from "@/components/public/about/trusted-developers";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <CompanyIntro />
      <CompanyTimeline />
      <MeetAgents />
      <OurProcess />
      <TrustedDevelopers />
      <OfficeExperience />
      <AboutCTA />
    </>
  );
}
