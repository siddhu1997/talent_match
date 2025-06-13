"use server";

import dbConnect from "@lib/db";
import User from "@models/User";
import { redirect } from "next/navigation";

export async function signupAction(_prevState, formData) {
  await dbConnect();

  const username = formData.get("username");
  const password = formData.get("password");
  const empID = formData.get("empID");
  const mailID = formData.get("mailID");
  const fullName = formData.get("name");
  const jobLevel = formData.get("jobLevel");
  const role_category = formData.get("role_category");

  const existing = await User.findOne({ username });
  if (existing) return { error: "User already exists" };

  const role = role_category === "Admin" ? "admin" : "employee";
  const user = new User({ username, password, role, empID, mailID, fullName, jobLevel, role_category });

  await user.save();

  redirect("/dashboard");
}
