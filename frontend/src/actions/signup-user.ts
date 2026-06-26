"use server";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { sendSignupOtpEmail } from "@/lib/email";
import { isValidPhoneNumber } from "libphonenumber-js";

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function signupUserAction(formData: FormData) {
  const firstName = String(formData.get("firstName") || "").trim();
  const lastName = String(formData.get("lastName") || "").trim();
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const phone = String(formData.get("phone") || "").trim();
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");

  if (!firstName || !lastName || !email || !password) {
    return { error: "Please fill all required fields." };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=])[A-Za-z\d@$!%*?&#^()_\-+=]{8,}$/;

  if (!passwordRegex.test(password)) {
    return {
      error:
        "Password must be at least 8 characters and include uppercase, lowercase, number and special character.",
    };
  }
  if (!phone) {
    return { error: "Phone number is required." };
  }

  if (!isValidPhoneNumber(phone)) {
    return { error: "Please enter a valid phone number." };
  }
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "This email is already registered." };
  }

  const otp = generateOtp();
  const hashedPassword = await bcrypt.hash(password, 10);
  const hashedOtp = await bcrypt.hash(otp, 10);

  await prisma.signupOtp.upsert({
    where: { email },
    update: {
      firstName,
      lastName,
      phone,
      password: hashedPassword,
      otp: hashedOtp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      attempts: 0,
    },
    create: {
      email,
      firstName,
      lastName,
      phone,
      password: hashedPassword,
      otp: hashedOtp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      attempts: 0,
    },
  });

  await sendSignupOtpEmail({
    to: email,
    name: `${firstName} ${lastName}`,
    otp,
  });

  return {
    success: true,
    email,
  };
}
