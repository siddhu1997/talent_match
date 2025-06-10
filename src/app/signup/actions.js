"use server";

import dbConnect from "@lib/db";
import User from "@models/User";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function signupAction(_prevState, formData) {
  await dbConnect();

  const username = formData.get("username");
  const password = formData.get("password");

  const existing = await User.findOne({ username });
  if (existing) return { error: "User already exists" };

  const role = "employee";

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed, role });

  await user.save();

  redirect("/dashboard");
}
