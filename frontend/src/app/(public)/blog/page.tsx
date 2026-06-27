import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";
import SectionHeading from "@/components/public/ui/heading";

export default function BlogPage() {
  return (
    <Section>
      <Container>
        <SectionHeading
          badge="Blog"
          title="Dubai Real Estate Insights"
          description="Market updates, investment guides, community insights and property trends."
        />
      </Container>
    </Section>
  );
}