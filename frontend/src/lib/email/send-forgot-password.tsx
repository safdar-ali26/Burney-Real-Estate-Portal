import { render } from "@react-email/render";

import { emailFrom, resend } from "@/lib/email/resend";
import ForgotPasswordEmail from "@/lib/email/templates/forgot-password";

export async function sendForgotPasswordEmail({
  to,
  name,
  resetUrl,
}: {
  to: string;
  name: string;
  resetUrl: string;
}) {
  const html = await render(
    <ForgotPasswordEmail
      name={name}
      resetUrl={resetUrl}
      expiryMinutes={15}
    />
  );

  await resend.emails.send({
    from: emailFrom,
    to,
    subject: "Reset your Burney Real Estate password",
    html,
  });
}