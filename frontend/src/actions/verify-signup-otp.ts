"use server";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { sendWelcomeEmail } from "@/lib/email";

export async function verifySignupOtpAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const otp = String(formData.get("otp") || "").trim();

  if (!email || !otp) {
    return { error: "Email and OTP are required." };
  }

  const pendingSignup = await prisma.signupOtp.findUnique({
    where: { email },
  });

  if (!pendingSignup) {
    return { error: "OTP request not found. Please signup again." };
  }

  if (pendingSignup.expiresAt < new Date()) {
    await prisma.signupOtp.delete({
      where: { email },
    });

    return { error: "OTP expired. Please signup again." };
  }

  if (pendingSignup.attempts >= 5) {
    await prisma.signupOtp.delete({
      where: { email },
    });

    return { error: "Too many failed attempts. Please signup again." };
  }

  const isOtpValid = await bcrypt.compare(otp, pendingSignup.otp);

  if (!isOtpValid) {
    await prisma.signupOtp.update({
      where: { email },
      data: {
        attempts: {
          increment: 1,
        },
      },
    });

    return { error: "Invalid OTP. Please try again." };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    await prisma.signupOtp.delete({
      where: { email },
    });

    return { error: "This email is already registered. Please login." };
  }

  const name = `${pendingSignup.firstName} ${pendingSignup.lastName}`;

  await prisma.user.create({
    data: {
      name,
      email: pendingSignup.email,
      phone: pendingSignup.phone,
      password: pendingSignup.password,
      role: "USER",
      isActive: true,
    },
  });

  await prisma.signupOtp.delete({
    where: { email },
  });

  await sendWelcomeEmail({
    to: email,
    name,
  });

  return {
    success: true,
    email,
  };
}