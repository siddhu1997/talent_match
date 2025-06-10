// src/app/seed/page.js (TEMPORARY)
"use server";
import dbConnect from "@lib/db";
import User from "@models/User";

export default async function SeedPage() {
  await dbConnect();

  const exists = await User.findOne({ username: "testuser" });
  if (!exists) {
    const newUser = new User({ username: "testuser", password: "test123" });
    await newUser.save();
    return <div>User seeded: testuser / test123</div>;
  }

  return <div>User already exists</div>;
}
