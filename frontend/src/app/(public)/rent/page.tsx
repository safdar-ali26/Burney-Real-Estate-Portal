import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";
import SectionHeading from "@/components/public/ui/heading";

export default function RentPage() {
  return (
    <Section>
      <Container>
        <SectionHeading
          badge="Rent"
          title="Properties for Rent"
          description="Explore ready-to-move Dubai rental properties for families, professionals and investors."
        />
      </Container>
    </Section>
  );
}