import { prisma } from "@/lib/prisma";

import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";
import SectionHeading from "@/components/public/ui/heading";
import FeaturedProjectsCarousel from "./featured-projects-carousel";

export default async function FeaturedProjects() {
  const properties = await prisma.property.findMany({
    where: {
      category: "OFFPLAN",
      approvalStatus: "APPROVED",
    },
    include: {
      developer: true,
      images: {
        orderBy: {
          order: "asc",
        },
        take: 1,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 9,
  });

  const formattedProperties = properties.map((property) => ({
    id: property.id,
    slug: property.slug,
    title: property.title,
    price: property.price,
    bedrooms: property.bedrooms,
    size: property.size,
    emirate: property.emirate,
    district: property.district,
    type: property.type,
    status: property.status,
    completionDate: property.completionDate,
    featuredImage: property.featuredImage,
    imageUrl: property.images[0]?.url,
    developer: property.developer
      ? {
          name: property.developer.name,
          logo: property.developer.logo,
        }
      : null,
  }));

  return (
    <Section className="bg-[#050505]">
      <Container>
        <SectionHeading
          badge="Featured Projects"
          title="Discover Dubai's Finest Off Plan Projects"
          description="Hand-picked investment opportunities from Dubai's leading developers."
        />

        <FeaturedProjectsCarousel properties={formattedProperties} />
      </Container>
    </Section>
  );
}