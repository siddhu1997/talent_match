import { NextResponse } from "next/server";
import dbConnect from "@lib/db";
import User from "@models/User";
import { triggerWebhook } from "@lib/webhook";

export async function POST(request) {
  const body = await request.json();
  const session = request.cookies.get("session")?.value;

  if (!session)
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  await dbConnect();

  const { repositories } = body;

  if (!Array.isArray(repositories) || repositories.length === 0) {
    return NextResponse.json(
      { error: "Invalid or empty repositories list" },
      { status: 400 }
    );
  }

  // Add each repo uniquely
  const updatedUser = await User.findByIdAndUpdate(
    session,
    {
      $addToSet: {
        repositories: { $each: repositories },
      },
    },
    { new: true }
  );

  await triggerWebhook("repo_added", {
    userId: session,
    repositories: repositories.map((r) => ({ name: r.name, url: r.url })),
    resume: updatedUser.resume,
    empID: updatedUser.empID,
    mailID: updatedUser.mailID,
    fullName: updatedUser.fullName,
    jobLevel: updatedUser.jobLevel,
    role_category: updatedUser.role_category,
    github_username: updatedUser.github?.username,
  });

  return NextResponse.json({
    success: true,
    repositories: updatedUser.repositories,
  });
}