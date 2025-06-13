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
  const updated = await User.findByIdAndUpdate(
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
  });

  return NextResponse.json({
    success: true,
    repositories: updated.repositories,
  });
}