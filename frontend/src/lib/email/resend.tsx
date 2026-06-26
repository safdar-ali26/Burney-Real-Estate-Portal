import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is missing in .env");
}

export const resend = new Resend(process.env.RESEND_API_KEY);

export const emailFrom =
  process.env.EMAIL_FROM || "Burney Real Estate <info@burneyrealestate.com>";

export const appUrl =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";