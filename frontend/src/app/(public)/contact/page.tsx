import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";
import SectionHeading from "@/components/public/ui/heading";

export default function ContactPage() {
  return (
    <Section>
      <Container>
        <SectionHeading
          badge="Contact"
          title="Speak With Burney Real Estate"
          description="Visit our Business Bay office or contact our team for property assistance."
        />
      </Container>
    </Section>
  );
}