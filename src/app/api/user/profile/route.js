import dbConnect from "@lib/db";
import User from "@models/User";
import { NextResponse } from "next/server";

export async function GET(request) {
  const session = request.cookies.get("session")?.value;
  if (!session)
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  await dbConnect();
  const user = await User.findById(session);

  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  console.log(user);

  return NextResponse.json({
    _id: user._id,
    dpURL: user.dpURL,
    name: user.name,
    doj: user.doj,
    username: user.username,
    github: user.github,
    repositories: user.repositories,
  });
}
