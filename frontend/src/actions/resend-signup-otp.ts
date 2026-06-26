"use server";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { sendSignupOtpEmail } from "@/lib/email";

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function resendSignupOtpAction(email: string) {
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail) {
    return { error: "Email is required." };
  }

  const pendingSignup = await prisma.signupOtp.findUnique({
    where: { email: cleanEmail },
  });

  if (!pendingSignup) {
    return { error: "Signup request not found. Please signup again." };
  }

  if (pendingSignup.attempts >= 5) {
    return {
      error: "Resend limit reached. Please signup again with this email.",
    };
  }

  const otp = generateOtp();
  const hashedOtp = await bcrypt.hash(otp, 10);

  await prisma.signupOtp.update({
    where: { email: cleanEmail },
    data: {
      otp: hashedOtp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      attempts: {
        increment: 1,
      },
    },
  });

  await sendSignupOtpEmail({
    to: cleanEmail,
    name: `${pendingSignup.firstName} ${pendingSignup.lastName}`,
    otp,
  });

  return {
    success: true,
  };
}