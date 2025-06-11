import { readdir } from "fs/promises";
import path from "path";
import { cookies } from "next/headers";
import dbConnect from "@lib/db";
import User from "@models/User";
import { NextResponse } from "next/server";

export async function GET() {
  const session = cookies().get("session")?.value;
  if (!session)
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  await dbConnect();
  const user = await User.findById(session);
  const userDir = path.join(
    process.cwd(),
    "public",
    "uploads",
    "resumes",
    user._id.toString()
  );

  try {
    const files = await readdir(userDir);
    return NextResponse.json({ files });
  } catch (err) {
    return NextResponse.json({ files: [] }); // No files
  }
}
