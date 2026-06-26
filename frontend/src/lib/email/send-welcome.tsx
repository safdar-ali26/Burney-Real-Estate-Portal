import { render } from "@react-email/render";

import { appUrl, emailFrom, resend } from "@/lib/email/resend";
import WelcomeEmail from "@/lib/email/templates/welcome";

export async function sendWelcomeEmail({
  to,
  name,
}: {
  to: string;
  name: string;
}) {
  const html = await render(
    <WelcomeEmail name={name} dashboardUrl={`${appUrl}/dashboard`} />
  );

  await resend.emails.send({
    from: emailFrom,
    to,
    subject: "Welcome to Burney Real Estate",
    html,
  });
}