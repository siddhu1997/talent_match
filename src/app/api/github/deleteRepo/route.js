import { NextResponse } from "next/server";
import dbConnect from "@lib/db";
import User from "@models/User";

export async function POST(request) {
  const body = await request.json();
  const session = request.cookies.get("session")?.value;
  if (!session)
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  await dbConnect();

  const { url } = body;

  const updated = await User.findByIdAndUpdate(
    session,
    { $pull: { repositories: { url } } },
    { new: true }
  );

  return NextResponse.json({
    success: true,
    repositories: updated.repositories,
  });
}
