import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";
import SectionHeading from "@/components/public/ui/heading";
import PublicButton from "@/components/public/ui/button";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-black pb-28 pt-44">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(235,203,76,0.18),transparent_35%)]" />

        <Container className="relative z-10">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#EBCB4C]">
              Burney Real Estate LLC
            </p>

            <h1 className="mt-6 text-5xl font-black leading-tight text-white md:text-7xl">
              Discover Premium Dubai Real Estate
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/60">
              Buy, rent and invest in Dubai’s most sought-after properties with
              Burney Real Estate.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <PublicButton href="/buy">Buy Property</PublicButton>
              <PublicButton href="/off-plan" variant="outline">
                Explore Off Plan
              </PublicButton>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <SectionHeading
            badge="Coming Next"
            title="Premium Home Page Sections"
            description="Hero search, featured properties, developers, services and CTAs will be added here."
          />
        </Container>
      </Section>
    </>
  );
}