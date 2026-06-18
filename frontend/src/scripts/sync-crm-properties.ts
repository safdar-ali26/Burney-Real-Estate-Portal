import "dotenv/config";

import { prisma } from "../lib/prisma";

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function getBedroomLabel(project: any) {
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
    .map((image: any) => image.imageFallbackUrl || image.imageUrl)
    .filter(Boolean);
}

async function syncCrmProperties() {
  const tenantId = process.env.LEADRAT_TENANT_ID;
  const apiKey = process.env.LEADRAT_API_KEY;

  if (!tenantId || !apiKey) {
    throw new Error("LeadRat CRM credentials are missing in .env");
  }

  console.log("⏳ Fetching CRM listings...");

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

  console.log(`✅ Found ${projects.length} CRM projects`);

  let syncedCount = 0;
  let skippedCount = 0;

  for (const project of projects) {
    const crmId = String(project.id || project.externalId || "");

    if (!crmId) {
      skippedCount++;
      continue;
    }

    const title = String(project.name || "Untitled CRM Project");

    console.log(`⏳ Syncing: ${title}`);

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
      galleryImages[0] ||
      "";

    const price =
      Number(project.minPrice || project.pricing?.minPrice?.aed || 0) || 0;

    const size =
      Number(project.minSize || project.units?.minArea?.sqft || 0) || 0;

    const property = await prisma.property.upsert({
      where: {
        crmId,
      },
      update: {
        title,
        description: project.description || "",
        category: "OFFPLAN",
        status: project.saleStatus === "Sold Out" ? "SOLD" : "AVAILABLE",
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
      },
      create: {
        title,
        slug: `${createSlug(title)}-${Date.now()}`,
        description: project.description || "",
        category: "OFFPLAN",
        status: project.saleStatus === "Sold Out" ? "SOLD" : "AVAILABLE",
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
      },
    });

    await prisma.propertyImage.deleteMany({
      where: {
        propertyId: property.id,
      },
    });

    if (galleryImages.length > 0) {
      await prisma.propertyImage.createMany({
        data: galleryImages.slice(0, 8).map((url: string, index: number) => ({
          url,
          order: index,
          propertyId: property.id,
        })),
      });
    }

    syncedCount++;
    console.log(`✅ Synced: ${title}`);
  }

  console.log("━━━━━━━━━━━━━━━━━━━━━━");
  console.log("✅ CRM sync completed");
  console.log(`✅ Synced: ${syncedCount}`);
  console.log(`⚠️ Skipped: ${skippedCount}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━");
}

syncCrmProperties()
  .catch((error) => {
    console.error("❌ CRM sync failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });