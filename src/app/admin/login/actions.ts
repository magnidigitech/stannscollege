'use strict';

import { login } from "@/lib/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  'use server';

  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Missing fields" };
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: { username }
    });

    if (!admin) {
      return { error: "Invalid credentials" };
    }

    const isValid = await bcrypt.compare(password, admin.password);

    if (!isValid) {
      return { error: "Invalid credentials" };
    }

    await login(username);
  } catch (e) {
    return { error: "Something went wrong" };
  }

  redirect("/admin");
}
