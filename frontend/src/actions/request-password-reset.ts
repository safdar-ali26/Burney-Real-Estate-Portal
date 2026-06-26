"use server";

import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { appUrl } from "@/lib/email";
import { sendForgotPasswordEmail } from "@/lib/email";

export async function requestPasswordResetAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();

  if (!email) {
    return { error: "Email is required." };
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  // Security: email exists na bhi ho to generic success do
  if (!user) {
    return { success: true };
  }

  const token = crypto.randomBytes(32).toString("hex");

  await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    },
  });

  const resetUrl = `${appUrl}/reset-password?token=${token}`;

  await sendForgotPasswordEmail({
    to: email,
    name: user.name || "there",
    resetUrl,
  });

  return { success: true };
}