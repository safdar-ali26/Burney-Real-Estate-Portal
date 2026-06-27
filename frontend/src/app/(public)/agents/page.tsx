import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";
import SectionHeading from "@/components/public/ui/heading";

export default function AgentsPage() {
  return (
    <Section>
      <Container>
        <SectionHeading
          badge="Agents"
          title="Meet Our Property Consultants"
          description="Connect with Burney Real Estate consultants for buying, selling, renting and investment advisory."
        />
      </Container>
    </Section>
  );
}