"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

const LEADRAT_BASE_URL = "https://projectsapi.leadrat.com/api/public/listings";

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function pick(...values: any[]) {
  return values.find(
    (value) => value !== undefined && value !== null && value !== "",
  );
}

function toNumber(value: any) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function getTitle(project: any) {
  return String(
    pick(
      project.name,
      project.projectName,
      project.title,
      project.displayName,
      "Untitled CRM Project",
    ),
  );
}

function getDeveloperName(project: any) {
  return String(
    pick(
      project.developer?.name,
      project.developerName,
      project.developer,
      "Unknown Developer",
    ),
  );
}

function getGalleryImages(project: any) {
  const images = pick(
    project.galleryImages,
    project.gallery,
    project.images,
    project.media,
    [],
  );

  if (!Array.isArray(images)) return [];

  return images
    .map((image: any, index: number) => ({
      url: pick(
        image.imageFallbackUrl,
        image.imageUrl,
        image.fallbackUrl,
        image.url,
        image.src,
      ),
      alt: pick(image.category, image.alt, image.name, null),
      order: Number(pick(image.displayOrder, image.order, index)),
    }))
    .filter((image: any) => Boolean(image.url));
}

function getFeaturedImage(project: any, galleryImages: any[]) {
  return String(
    pick(
      project.coverImageFallbackUrl,
      project.coverImageUrl,
      project.coverImage,
      project.mainImage,
      project.image,
      project.thumbnail,
      galleryImages[0]?.url,
      "",
    ),
  );
}

function getPrice(project: any) {
  const directPrice = toNumber(
    pick(
      project.minPrice,
      project.price,
      project.startingPrice,
      project.priceFrom,
      project.pricing?.minPrice?.aed,
      project.pricing?.minPrice,
      project.priceRange?.min,
    ),
  );

  if (directPrice && directPrice > 0) return directPrice;

  const typicalUnits = pick(project.typicalUnits, project.units, []);

  if (Array.isArray(typicalUnits)) {
    const prices: number[] = typicalUnits
      .map((unit: any) =>
        toNumber(pick(unit.price, unit.minPrice, unit.priceFrom)),
      )
      .filter((price: number | null): price is number => {
        return price !== null && price > 0;
      });

    if (prices.length > 0) return Math.min(...prices);
  }

  const bedroomGroups = project.unitSummary?.bedroomGroups || [];

  if (Array.isArray(bedroomGroups)) {
    const prices: number[] = bedroomGroups
      .map((group: any) => toNumber(pick(group.minPrice, group.price)))
      .filter((price: number | null): price is number => {
        return price !== null && price > 0;
      });

    if (prices.length > 0) return Math.min(...prices);
  }

  return null;
}

function getSize(project: any) {
  const directSize = toNumber(
    pick(
      project.minSize,
      project.size,
      project.area,
      project.units?.minArea?.sqft,
      project.areaRange?.min,
    ),
  );

  if (directSize && directSize > 0) return directSize;

  const typicalUnits = pick(project.typicalUnits, project.units, []);

  if (Array.isArray(typicalUnits)) {
    const areas: number[] = typicalUnits
      .map((unit: any) => toNumber(pick(unit.area, unit.size, unit.sqft)))
      .filter((area: number | null): area is number => {
        return area !== null && area > 0;
      });

    if (areas.length > 0) return Math.min(...areas);
  }

  return null;
}

function getBedroomLabel(project: any) {
  const directBedrooms = pick(
    project.bedrooms,
    project.bedroom,
    project.bedroomCount,
  );

  if (directBedrooms) return String(directBedrooms);

  const typicalUnits = pick(project.typicalUnits, []);

  if (Array.isArray(typicalUnits) && typicalUnits.length > 0) {
    const bedrooms: number[] = typicalUnits
      .map((unit: any) => toNumber(unit.bedrooms))
      .filter((value: number | null): value is number => value !== null);

    if (bedrooms.length > 0) {
      const min = Math.min(...bedrooms);
      const max = Math.max(...bedrooms);

      if (min === 0 && max === 0) return "Studio";
      if (min === max) return min === 0 ? "Studio" : `${min} BR`;

      return `${min === 0 ? "Studio" : `${min} BR`} - ${max} BR`;
    }
  }

  const bedroomGroups = project.unitSummary?.bedroomGroups || [];

  if (Array.isArray(bedroomGroups) && bedroomGroups.length > 0) {
    const bedrooms: number[] = bedroomGroups
      .map((group: any) => toNumber(group.bedrooms))
      .filter((value: number | null): value is number => value !== null);

    if (bedrooms.length > 0) {
      const min = Math.min(...bedrooms);
      const max = Math.max(...bedrooms);

      if (min === 0 && max === 0) return "Studio";
      if (min === max) return min === 0 ? "Studio" : `${min} BR`;

      return `${min === 0 ? "Studio" : `${min} BR`} - ${max} BR`;
    }
  }

  return "";
}

function normalizeEmirate(value: any) {
  const emirate = String(value || "").toLowerCase();

  if (emirate.includes("dubai")) return "Dubai";
  if (emirate.includes("abu dhabi")) return "Abu Dhabi";
  if (emirate.includes("sharjah")) return "Sharjah";
  if (emirate.includes("ajman")) return "Ajman";
  if (emirate.includes("ras al khaimah")) return "Ras Al Khaimah";
  if (emirate.includes("fujairah")) return "Fujairah";
  if (emirate.includes("umm al quwain")) return "Umm Al Quwain";

  return "Dubai";
}

function getPropertyType(project: any) {
  return String(
    pick(
      project.unitType,
      project.propertyType,
      project.type,
      project.unitSummary?.bedroomGroups?.[0]?.unitType,
      project.typicalUnits?.[0]?.unitType,
      project.unitSummary?.bedroomGroups?.[0]?.unitType,
      "Apartment",
    ),
  );
}

function getPropertyStatus(project: any) {
  const saleStatus = String(
    pick(project.saleStatus, project.unitStatus, project.status, ""),
  ).toLowerCase();

  if (saleStatus.includes("sold") || saleStatus.includes("out")) {
    return "SOLD";
  }

  if (saleStatus.includes("limited")) {
    return "LIMITED";
  }

  return "AVAILABLE";
}

function getFirstDeveloperContact(project: any) {
  const offices = project?.developer?.offices || [];
  if (!Array.isArray(offices)) return null;

  for (const office of offices) {
    const contacts = office?.contacts || [];
    if (Array.isArray(contacts) && contacts.length > 0) {
      return contacts[0];
    }
  }

  return null;
}

async function fetchLeadRatJson(url: string) {
  const response = await fetch(url, { cache: "no-store" });

  let data: any = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message =
      data?.error ||
      data?.message ||
      `LeadRat API failed with status ${response.status}`;

    throw new Error(message);
  }

  return data;
}

async function fetchAllLeadRatListings(apiKey: string) {
  const pageSize = 100;
  let page = 1;
  let allProjects: any[] = [];
  let totalPages = 1;

  do {
    const url = `${LEADRAT_BASE_URL}?apiKey=${encodeURIComponent(
      apiKey,
    )}&page=${page}&pageSize=${pageSize}`;

    const data = await fetchLeadRatJson(url);

    const results = Array.isArray(data?.results)
      ? data.results
      : Array.isArray(data)
        ? data
        : [];

    allProjects = [...allProjects, ...results];

    totalPages = Number(data?.totalPages || 1);
    page++;
  } while (page <= totalPages);

  return allProjects;
}

async function fetchLeadRatListingDetail(apiKey: string, projectId: string) {
  const url = `${LEADRAT_BASE_URL}/${projectId}?apiKey=${encodeURIComponent(apiKey)}`;

  try {
    return await fetchLeadRatJson(url);
  } catch {
    return null;
  }
}

function normalizeLeadRatProject(summary: any, detail: any) {
  const detailData =
    detail?.project ||
    detail?.listing ||
    detail?.data ||
    detail?.result ||
    detail;

  if (!detailData || Array.isArray(detailData)) {
    return summary;
  }

  return {
    ...summary,
    ...detailData,
  };
}

export async function syncCrmPropertiesAction() {
  const apiKey = process.env.LEADRAT_API_KEY;

  if (!apiKey) {
    throw new Error("LEADRAT_API_KEY is missing in .env");
  }

  const summaries = await fetchAllLeadRatListings(apiKey);

  if (!Array.isArray(summaries)) {
    throw new Error("Invalid LeadRat response format.");
  }

  for (const summary of summaries) {
    const crmId = String(
      pick(summary.id, summary.projectId, summary.externalId, ""),
    );

    if (!crmId) continue;

    const detail = await fetchLeadRatListingDetail(apiKey, crmId);
    const project = normalizeLeadRatProject(summary, detail);

    const title = getTitle(project);
    const developerName = getDeveloperName(project);
    const developerSlug = createSlug(developerName) || "developer";

    const developer = await prisma.developer.upsert({
      where: {
        name: developerName,
      },
      update: {
        logo: pick(project.developerLogo, project.developer?.logoUrl, null),
        description: pick(
          project.developer?.description,
          project.developerDescription,
          null,
        ),
        website: pick(
          project.developer?.website,
          project.developerWebsite,
          null,
        ),
      },
      create: {
        name: developerName,
        slug: `${developerSlug}-${Date.now()}`,
        logo: pick(project.developerLogo, project.developer?.logoUrl, null),
        description: pick(
          project.developer?.description,
          project.developerDescription,
          null,
        ),
        website: pick(
          project.developer?.website,
          project.developerWebsite,
          null,
        ),
      },
    });

    const galleryImages = getGalleryImages(project);
    const featuredImage = getFeaturedImage(project, galleryImages);
    const contact = getFirstDeveloperContact(project);

    const price = getPrice(project);
    const size = getSize(project);

    const property = await prisma.property.upsert({
      where: {
        crmId,
      },
      update: {
        title,
        description: String(pick(project.description, project.overview, "")),
        category: "OFFPLAN",
        status: getPropertyStatus(project) as any,
        approvalStatus: "APPROVED",

        price,
        bedrooms: getBedroomLabel(project),
        bathrooms: 0,
        size,

        emirate: normalizeEmirate(pick(project.region, project.emirate, project.district, "Dubai")),
        district: String(
          pick(
            project.district,
            project.location,
            project.area,
            project.sector,
            "",
          ),
        ),
        type: getPropertyType(project),

        featuredImage,
        developerId: developer.id,
        isFromCRM: true,

        completionDate: pick(
          project.completionQuarter,
          project.completionDate,
          project.handover,
          project.handoverDate,
          project.handoverQuarter,
          null,
        ),
        constructionStatus: pick(project.constructionStatus, null),

        latitude: toNumber(project.latitude),
        longitude: toNumber(project.longitude),

        fullAddress: pick(project.fullAddress, project.address, null),
        sector: pick(project.sector, null),

        videoReviewUrl: pick(project.videoReviewUrl, project.videoUrl, null),
        generalPlanUrl: pick(
          project.generalPlanUrl,
          project.masterPlanUrl,
          null,
        ),

        serviceCharge:
          pick(project.serviceCharge, null) !== null
            ? String(project.serviceCharge)
            : null,

        furnishing: pick(project.furnishing, null),

        buildingCount: toNumber(project.buildingCount),
        unitCount: toNumber(project.unitCount),

        developerContactName: pick(contact?.displayName, contact?.name, null),
        developerContactPhone: pick(contact?.phone, null),
        developerWhatsapp: pick(contact?.whatsApp, contact?.whatsapp, null),

        paymentPlans: pick(project.paymentPlans, project.paymentPlan, []),
        amenities: pick(project.amenities, []),
        typicalUnits: pick(project.typicalUnits, project.units, []),
        documents: pick(project.documents, project.files, []),

        crmRawData: project,
      },
      create: {
        title,
        slug: `${createSlug(title) || "crm-project"}-${Date.now()}`,
        description: String(pick(project.description, project.overview, "")),
        category: "OFFPLAN",
        status: getPropertyStatus(project) as any,
        approvalStatus: "APPROVED",

        price,
        bedrooms: getBedroomLabel(project),
        bathrooms: 0,
        size,

        emirate: normalizeEmirate(pick(project.region, project.emirate, project.district, "Dubai")),
        district: String(
          pick(
            project.district,
            project.location,
            project.area,
            project.sector,
            "",
          ),
        ),
        type: getPropertyType(project),

        featuredImage,
        developerId: developer.id,
        crmId,
        isFromCRM: true,

        completionDate: pick(
          project.completionQuarter,
          project.completionDate,
          project.handover,
          project.handoverDate,
          project.handoverQuarter,
          null,
        ),
        constructionStatus: pick(project.constructionStatus, null),

        latitude: toNumber(project.latitude),
        longitude: toNumber(project.longitude),

        fullAddress: pick(project.fullAddress, project.address, null),
        sector: pick(project.sector, null),

        videoReviewUrl: pick(project.videoReviewUrl, project.videoUrl, null),
        generalPlanUrl: pick(
          project.generalPlanUrl,
          project.masterPlanUrl,
          null,
        ),

        serviceCharge:
          pick(project.serviceCharge, null) !== null
            ? String(project.serviceCharge)
            : null,

        furnishing: pick(project.furnishing, null),

        buildingCount: toNumber(project.buildingCount),
        unitCount: toNumber(project.unitCount),

        developerContactName: pick(contact?.displayName, contact?.name, null),
        developerContactPhone: pick(contact?.phone, null),
        developerWhatsapp: pick(contact?.whatsApp, contact?.whatsapp, null),

        paymentPlans: pick(project.paymentPlans, project.paymentPlan, []),
        amenities: pick(project.amenities, []),
        typicalUnits: pick(project.typicalUnits, project.units, []),
        documents: pick(project.documents, project.files, []),

        crmRawData: project,
      },
    });

    await prisma.propertyImage.deleteMany({
      where: { propertyId: property.id },
    });

    if (galleryImages.length > 0) {
      await prisma.propertyImage.createMany({
        data: galleryImages.slice(0, 25).map((image: any, index: number) => ({
          url: image.url,
          alt: image.alt,
          order: image.order || index,
          propertyId: property.id,
        })),
      });
    }

    await prisma.propertyAmenity.deleteMany({
      where: { propertyId: property.id },
    });

    const amenities = pick(project.amenities, []);

    if (Array.isArray(amenities) && amenities.length > 0) {
      await prisma.propertyAmenity.createMany({
        data: amenities.map((amenity: any, index: number) => ({
          propertyId: property.id,
          name: String(pick(amenity.name, amenity.title, amenity, "Amenity")),
          iconUrl: pick(amenity.iconUrl, amenity.icon, null),
          displayOrder: Number(
            pick(amenity.displayOrder, amenity.order, index),
          ),
        })),
      });
    }

    await prisma.propertyDocument.deleteMany({
      where: { propertyId: property.id },
    });

    const documents = pick(project.documents, project.files, []);

    if (Array.isArray(documents) && documents.length > 0) {
      await prisma.propertyDocument.createMany({
        data: documents
          .map((document: any) => ({
            propertyId: property.id,
            name: String(pick(document.name, document.title, "Document")),
            url: String(
              pick(document.fallbackUrl, document.url, document.fileUrl, ""),
            ),
            type: pick(document.type, document.category, null),
          }))
          .filter((document: any) => Boolean(document.url)),
      });
    }

    await prisma.propertyUnit.deleteMany({
      where: { propertyId: property.id },
    });

    const units = pick(project.typicalUnits, project.units, []);

    if (Array.isArray(units) && units.length > 0) {
      await prisma.propertyUnit.createMany({
        data: units.map((unit: any) => ({
          propertyId: property.id,
          bedrooms: toNumber(unit.bedrooms),
          area: toNumber(pick(unit.area, unit.size, unit.sqft)),
          price: toNumber(pick(unit.price, unit.minPrice, unit.priceFrom)),
        })),
      });
    }
  }

  revalidatePath("/administrator/properties");
  revalidatePath("/administrator/developers");
  revalidatePath("/administrator/crm-sync");

  redirect("/administrator/properties");
}
