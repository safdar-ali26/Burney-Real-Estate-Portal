import "dotenv/config";

async function testLeadRat() {
  const tenantId = process.env.LEADRAT_TENANT_ID;
  const apiKey = process.env.LEADRAT_API_KEY;

  const response = await fetch(
    `https://projectsapi.leadrat.com/api/public/listings?tenantId=${tenantId}&apiKey=${apiKey}`
  );

  const data = await response.json();

  console.log("FULL RESPONSE:");
  console.dir(data, { depth: 4 });

  console.log("FIRST ITEM:");
  const firstItem = Array.isArray(data) ? data[0] : data?.projects?.[0] || data?.data?.[0];
  console.dir(firstItem, { depth: 4 });
}

testLeadRat();