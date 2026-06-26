import { render } from "@react-email/render";

import { emailFrom, resend } from "@/lib/email/resend";
import LeadAlertEmail from "@/lib/email/templates/lead-alert";

export async function sendLeadAlertEmail({
  to,
  agentName,
  leadName,
  leadPhone,
  leadEmail,
  propertyTitle,
  source,
  message,
}: {
  to: string;
  agentName?: string;
  leadName: string;
  leadPhone: string;
  leadEmail?: string;
  propertyTitle?: string;
  source?: string;
  message?: string;
}) {
  const html = await render(
    <LeadAlertEmail
      agentName={agentName}
      leadName={leadName}
      leadPhone={leadPhone}
      leadEmail={leadEmail}
      propertyTitle={propertyTitle}
      source={source}
      message={message}
    />
  );

  await resend.emails.send({
    from: emailFrom,
    to,
    subject: "New lead assigned - Burney Real Estate",
    html,
  });
}