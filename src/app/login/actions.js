"use server";

import dbConnect from "@lib/db";
import User from "@models/User";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { setSessionCookie } from "@lib/cookies";

export async function loginAction(_prevState, formData) {
  await dbConnect();

  const username = formData.get("username");
  const password = formData.get("password");

  const user = await User.findOne({ username });
  if (!user) return { error: "Account not found!" };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return { error: "Invalid credentials!" };

  setSessionCookie(user._id.toString());
  redirect(user.role === "employee" ? "/dashboard/employee/profile" : "/dashboard/admin/home");
}
