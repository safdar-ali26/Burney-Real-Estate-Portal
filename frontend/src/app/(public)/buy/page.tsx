import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";
import SectionHeading from "@/components/public/ui/heading";

export default function BuyPage() {
  return (
    <Section>
      <Container>
        <SectionHeading
          badge="Buy"
          title="Properties for Sale"
          description="Browse premium Dubai apartments, villas, townhouses and investment properties available for sale."
        />
      </Container>
    </Section>
  );
}