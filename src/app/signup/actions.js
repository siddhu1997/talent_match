"use server";

import dbConnect from "@lib/db";
import User from "@models/User";
import { redirect } from "next/navigation";

export async function signupAction(_prevState, formData) {
  await dbConnect();

  const username = formData.get("username");
  const password = formData.get("password");

  const existing = await User.findOne({ username });
  if (existing) return { error: "User already exists" };

  const role = "employee";
  const user = new User({ username, password, role });

  await user.save();

  redirect("/dashboard");
}
