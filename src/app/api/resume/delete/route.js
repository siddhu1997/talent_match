import { unlink } from "fs/promises";
import path from "path";
import { cookies } from "next/headers";
import dbConnect from "@lib/db";
import User from "@models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { filename } = await req.json();
  const session = cookies().get("session")?.value;

  await dbConnect();
  const user = await User.findById(session);
  const filePath = path.join(
    process.cwd(),
    "public",
    "uploads",
    "resumes",
    user._id.toString(),
    filename
  );

  try {
    await unlink(filePath);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
