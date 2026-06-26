import { render } from "@react-email/render";

import { emailFrom, resend } from "@/lib/email/resend";
import PropertyAlertEmail from "@/lib/email/templates/property-alert";

export async function sendPropertyAlertEmail({
  to,
  name,
  propertyTitle,
  propertyLocation,
  propertyPrice,
  propertyType,
  bedrooms,
  propertyUrl,
}: {
  to: string;
  name?: string;
  propertyTitle: string;
  propertyLocation?: string;
  propertyPrice?: string;
  propertyType?: string;
  bedrooms?: string;
  propertyUrl?: string;
}) {
  const html = await render(
    <PropertyAlertEmail
      name={name}
      propertyTitle={propertyTitle}
      propertyLocation={propertyLocation}
      propertyPrice={propertyPrice}
      propertyType={propertyType}
      bedrooms={bedrooms}
      propertyUrl={propertyUrl}
    />
  );

  await resend.emails.send({
    from: emailFrom,
    to,
    subject: "New property match - Burney Real Estate",
    html,
  });
}