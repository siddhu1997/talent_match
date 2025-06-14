import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@lib/db";
import User from "@models/User";
import { triggerWebhook } from "@lib/webhook";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("resume");
  const session = cookies().get("session")?.value;

  if (!file || !session) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  await dbConnect();
  const user = await User.findById(session);
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadsDir = path.join(
    process.cwd(),
    "public",
    "uploads",
    "resumes",
    user._id.toString()
  );

  await mkdir(uploadsDir, { recursive: true });
  const filePath = path.join(uploadsDir, file.name);

  await writeFile(filePath, buffer);
  const fileLocation = `/uploads/resumes/${user._id}/${file.name}`;
  await User.findByIdAndUpdate(user._id, {
    resume: {
      url: fileLocation,
      filename: file.name,
    },
  });
  await triggerWebhook("resume_uploaded", {
    userId: session,
    fileLocation,
    repositories: user.repositories,
    empID: user.empID,
    mailID: user.mailID,
    fullName: user.fullName,
    jobLevel: user.jobLevel,
    role_category: user.role_category,
    github_username: user.github?.username,
  });


  return NextResponse.json({ success: true, filename: file.name });
}
