import { render } from "@react-email/render";

import { resend, emailFrom } from "@/lib/email/resend";
import OtpEmail from "@/lib/email/templates/otp";

export async function sendSignupOtpEmail({
  to,
  name,
  otp,
}: {
  to: string;
  name: string;
  otp: string;
}) {
  const html = await render(
    <OtpEmail name={name} otp={otp} expiryMinutes={10} />
  );

  await resend.emails.send({
    from: emailFrom,
    to,
    subject: "Verify your Burney Real Estate account",
    html,
  });
}