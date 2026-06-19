"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function getBedroomLabel(project: any) {
  const typicalUnits = project?.typicalUnits || [];

  if (Array.isArray(typicalUnits) && typicalUnits.length > 0) {
    const bedrooms = typicalUnits
      .map((unit: any) => unit.bedrooms)
      .filter((value: any) => value !== null && value !== undefined);

    if (bedrooms.length > 0) {
      const min = Math.min(...bedrooms);
      const max = Math.max(...bedrooms);

      if (min === 0 && max === 0) return "Studio";
      if (min === max) return min === 0 ? "Studio" : `${min} BR`;

      const minLabel = min === 0 ? "Studio" : `${min} BR`;
      const maxLabel = `${max} BR`;

      return `${minLabel} - ${maxLabel}`;
    }
  }

  const bedroomGroups = project?.unitSummary?.bedroomGroups || [];

  if (!Array.isArray(bedroomGroups) || bedroomGroups.length === 0) {
    return "";
  }

  const bedrooms = bedroomGroups
    .map((group: any) => group.bedrooms)
    .filter((value: any) => value !== null && value !== undefined);

  if (bedrooms.length === 0) return "";

  const min = Math.min(...bedrooms);
  const max = Math.max(...bedrooms);

  if (min === 0 && max === 0) return "Studio";
  if (min === max) return min === 0 ? "Studio" : `${min} BR`;

  const minLabel = min === 0 ? "Studio" : `${min} BR`;
  const maxLabel = `${max} BR`;

  return `${minLabel} - ${maxLabel}`;
}

function getPropertyType(project: any) {
  const unitType =
    project?.unitSummary?.bedroomGroups?.[0]?.unitType ||
    project?.typicalUnits?.[0]?.unitType ||
    "";

  return unitType || "Apartment";
}

function getGalleryImages(project: any) {
  const images = project?.galleryImages || [];

  if (!Array.isArray(images)) return [];

  return images
    .sort((a: any, b: any) => {
      const orderA = Number(a.displayOrder || 0);
      const orderB = Number(b.displayOrder || 0);
      return orderA - orderB;
    })
    .map((image: any) => ({
      url: image.imageFallbackUrl || image.imageUrl,
      alt: image.category || null,
      order: Number(image.displayOrder || 0),
    }))
    .filter((image: any) => Boolean(image.url));
}

function getPrice(project: any) {
  const typicalUnits = project?.typicalUnits || [];

  if (Array.isArray(typicalUnits) && typicalUnits.length > 0) {
    const prices = typicalUnits
      .map((unit: any) => Number(unit.price || 0))
      .filter((price: number) => price > 0);

    if (prices.length > 0) {
      return Math.min(...prices);
    }
  }

  return Number(project.minPrice || project.pricing?.minPrice?.aed || 0) || 0;
}

function getSize(project: any) {
  const typicalUnits = project?.typicalUnits || [];

  if (Array.isArray(typicalUnits) && typicalUnits.length > 0) {
    const areas = typicalUnits
      .map((unit: any) => Number(unit.area || 0))
      .filter((area: number) => area > 0);

    if (areas.length > 0) {
      return Math.min(...areas);
    }
  }

  return Number(project.minSize || project.units?.minArea?.sqft || 0) || 0;
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

function getPropertyStatus(project: any) {
  const saleStatus = String(project.saleStatus || "").toLowerCase();

  if (saleStatus.includes("sold") || saleStatus.includes("out of stock")) {
    return "SOLD";
  }

  if (saleStatus.includes("limited")) {
    return "LIMITED";
  }

  return "AVAILABLE";
}

export async function syncCrmPropertiesAction() {
  const tenantId = process.env.LEADRAT_TENANT_ID;
  const apiKey = process.env.LEADRAT_API_KEY;

  if (!tenantId || !apiKey) {
    throw new Error("LeadRat CRM credentials are missing in .env");
  }

  const response = await fetch(
    `https://projectsapi.leadrat.com/api/public/listings?tenantId=${tenantId}&apiKey=${apiKey}`,
    {
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok || data?.error) {
    throw new Error(data?.error || "Failed to fetch LeadRat CRM listings");
  }

  const projects = Array.isArray(data)
    ? data
    : data?.projects || data?.data || [];

  if (!Array.isArray(projects)) {
    throw new Error("Invalid CRM response format");
  }

  for (const project of projects) {
    const crmId = String(project.id || project.externalId || "");

    if (!crmId) continue;

    const title = String(project.name || "Untitled CRM Project");

    const developerName = String(
      project.developer?.name || project.developerName || "Unknown Developer"
    );

    const developerSlug = createSlug(developerName);

    const developer = await prisma.developer.upsert({
      where: {
        name: developerName,
      },
      update: {
        logo: project.developer?.logoUrl || null,
        description: project.developer?.description || null,
        website: project.developer?.website || null,
      },
      create: {
        name: developerName,
        slug: `${developerSlug}-${Date.now()}`,
        logo: project.developer?.logoUrl || null,
        description: project.developer?.description || null,
        website: project.developer?.website || null,
      },
    });

    const galleryImages = getGalleryImages(project);

    const featuredImage =
      project.coverImageFallbackUrl ||
      project.coverImageUrl ||
      galleryImages[0]?.url ||
      "";

    const contact = getFirstDeveloperContact(project);

    const price = getPrice(project);
    const size = getSize(project);

    const property = await prisma.property.upsert({
      where: {
        crmId,
      },
      update: {
        title,
        description: project.description || "",
        category: "OFFPLAN",
        status: getPropertyStatus(project) as any,
        approvalStatus: "APPROVED",

        price,
        bedrooms: getBedroomLabel(project),
        bathrooms: 0,
        size,

        emirate: project.region || "Dubai",
        district: project.district || project.sector || "",
        type: getPropertyType(project),

        featuredImage,
        developerId: developer.id,
        isFromCRM: true,

        completionDate: project.completionDate || null,
        constructionStatus: project.constructionStatus || null,

        latitude:
          project.latitude !== null && project.latitude !== undefined
            ? Number(project.latitude)
            : null,

        longitude:
          project.longitude !== null && project.longitude !== undefined
            ? Number(project.longitude)
            : null,

        fullAddress: project.fullAddress || null,
        sector: project.sector || null,

        videoReviewUrl: project.videoReviewUrl || null,
        generalPlanUrl: project.generalPlanUrl || null,

        serviceCharge:
          project.serviceCharge !== null && project.serviceCharge !== undefined
            ? String(project.serviceCharge)
            : null,

        furnishing: project.furnishing || null,

        buildingCount:
          project.buildingCount !== null && project.buildingCount !== undefined
            ? Number(project.buildingCount)
            : null,

        unitCount:
          project.unitCount !== null && project.unitCount !== undefined
            ? Number(project.unitCount)
            : null,

        developerContactName: contact?.displayName || contact?.name || null,
        developerContactPhone: contact?.phone || null,
        developerWhatsapp: contact?.whatsApp || null,

        paymentPlans: project.paymentPlans || [],
        amenities: project.amenities || [],
        typicalUnits: project.typicalUnits || [],
        documents: project.documents || [],

        crmRawData: project,
      },
      create: {
        title,
        slug: `${createSlug(title)}-${Date.now()}`,
        description: project.description || "",
        category: "OFFPLAN",
        status: getPropertyStatus(project) as any,
        approvalStatus: "APPROVED",

        price,
        bedrooms: getBedroomLabel(project),
        bathrooms: 0,
        size,

        emirate: project.region || "Dubai",
        district: project.district || project.sector || "",
        type: getPropertyType(project),

        featuredImage,
        developerId: developer.id,
        crmId,
        isFromCRM: true,

        completionDate: project.completionDate || null,
        constructionStatus: project.constructionStatus || null,

        latitude:
          project.latitude !== null && project.latitude !== undefined
            ? Number(project.latitude)
            : null,

        longitude:
          project.longitude !== null && project.longitude !== undefined
            ? Number(project.longitude)
            : null,

        fullAddress: project.fullAddress || null,
        sector: project.sector || null,

        videoReviewUrl: project.videoReviewUrl || null,
        generalPlanUrl: project.generalPlanUrl || null,

        serviceCharge:
          project.serviceCharge !== null && project.serviceCharge !== undefined
            ? String(project.serviceCharge)
            : null,

        furnishing: project.furnishing || null,

        buildingCount:
          project.buildingCount !== null && project.buildingCount !== undefined
            ? Number(project.buildingCount)
            : null,

        unitCount:
          project.unitCount !== null && project.unitCount !== undefined
            ? Number(project.unitCount)
            : null,

        developerContactName: contact?.displayName || contact?.name || null,
        developerContactPhone: contact?.phone || null,
        developerWhatsapp: contact?.whatsApp || null,

        paymentPlans: project.paymentPlans || [],
        amenities: project.amenities || [],
        typicalUnits: project.typicalUnits || [],
        documents: project.documents || [],

        crmRawData: project,
      },
    });

    await prisma.propertyImage.deleteMany({
      where: {
        propertyId: property.id,
      },
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
      where: {
        propertyId: property.id,
      },
    });

    if (Array.isArray(project.amenities) && project.amenities.length > 0) {
      await prisma.propertyAmenity.createMany({
        data: project.amenities.map((amenity: any, index: number) => ({
          propertyId: property.id,
          name: String(amenity.name || "Amenity"),
          iconUrl: amenity.iconUrl || null,
          displayOrder: Number(amenity.displayOrder || index),
        })),
      });
    }

    await prisma.propertyDocument.deleteMany({
      where: {
        propertyId: property.id,
      },
    });

    if (Array.isArray(project.documents) && project.documents.length > 0) {
      await prisma.propertyDocument.createMany({
        data: project.documents
          .map((document: any) => ({
            propertyId: property.id,
            name: String(document.name || "Document"),
            url: document.fallbackUrl || document.url || "",
            type: document.type || null,
          }))
          .filter((document: any) => Boolean(document.url)),
      });
    }

    await prisma.propertyUnit.deleteMany({
      where: {
        propertyId: property.id,
      },
    });

    if (Array.isArray(project.typicalUnits) && project.typicalUnits.length > 0) {
      await prisma.propertyUnit.createMany({
        data: project.typicalUnits.map((unit: any) => ({
          propertyId: property.id,
          bedrooms:
            unit.bedrooms !== null && unit.bedrooms !== undefined
              ? Number(unit.bedrooms)
              : null,
          area:
            unit.area !== null && unit.area !== undefined
              ? Number(unit.area)
              : null,
          price:
            unit.price !== null && unit.price !== undefined
              ? Number(unit.price)
              : null,
        })),
      });
    }
  }

  revalidatePath("/administrator/properties");
  revalidatePath("/administrator/developers");
  revalidatePath("/administrator/crm-sync");

  redirect("/administrator/properties");
}