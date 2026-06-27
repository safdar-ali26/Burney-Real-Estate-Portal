import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";
import SectionHeading from "@/components/public/ui/heading";

export default function DevelopersPage() {
  return (
    <Section>
      <Container>
        <SectionHeading
          badge="Developers"
          title="Dubai’s Leading Property Developers"
          description="Explore projects from premium developers across Dubai."
        />
      </Container>
    </Section>
  );
}