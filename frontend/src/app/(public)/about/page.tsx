import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";
import SectionHeading from "@/components/public/ui/heading";

export default function AboutPage() {
  return (
    <Section>
      <Container>
        <SectionHeading
          badge="About Burney"
          title="Dubai Real Estate Built Around Trust"
          description="Burney Real Estate LLC connects buyers, sellers, landlords, tenants and investors with premium Dubai property opportunities."
        />
      </Container>
    </Section>
  );
}