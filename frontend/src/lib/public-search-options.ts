import { prisma } from "@/lib/prisma";

function cleanOptions(values: (string | null)[]) {
  return Array.from(new Set(values.filter(Boolean) as string[]))
    .sort((a, b) => a.localeCompare(b))
    .map((value) => ({
      label: value,
      value,
    }));
}

export async function getOffPlanSearchOptions() {
  const [emiratesRaw, districtsRaw, typesRaw, bedroomsRaw, developers] =
    await Promise.all([
      prisma.property.findMany({
        where: {
          category: "OFFPLAN",
          approvalStatus: "APPROVED",
          emirate: {
            not: null,
          },
        },
        distinct: ["emirate"],
        select: {
          emirate: true,
        },
        orderBy: {
          emirate: "asc",
        },
      }),

      prisma.property.findMany({
        where: {
          category: "OFFPLAN",
          approvalStatus: "APPROVED",
          district: {
            not: null,
          },
        },
        distinct: ["district"],
        select: {
          district: true,
        },
        orderBy: {
          district: "asc",
        },
      }),

      prisma.property.findMany({
        where: {
          category: "OFFPLAN",
          approvalStatus: "APPROVED",
          type: {
            not: null,
          },
        },
        distinct: ["type"],
        select: {
          type: true,
        },
        orderBy: {
          type: "asc",
        },
      }),

      prisma.property.findMany({
        where: {
          category: "OFFPLAN",
          approvalStatus: "APPROVED",
          bedrooms: {
            not: null,
          },
        },
        distinct: ["bedrooms"],
        select: {
          bedrooms: true,
        },
        orderBy: {
          bedrooms: "asc",
        },
      }),

      prisma.developer.findMany({
        where: {
          properties: {
            some: {
              category: "OFFPLAN",
              approvalStatus: "APPROVED",
            },
          },
        },
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          name: "asc",
        },
      }),
    ]);

  return {
    emirates: cleanOptions(emiratesRaw.map((item) => item.emirate)),
    districts: cleanOptions(districtsRaw.map((item) => item.district)),
    types: cleanOptions(typesRaw.map((item) => item.type)),
    bedrooms: cleanOptions(bedroomsRaw.map((item) => item.bedrooms)),
    developers: developers.map((developer) => ({
      label: developer.name,
      value: developer.id,
    })),
  };
}