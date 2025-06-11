import { NextResponse } from "next/server";
import dbConnect from "@lib/db";
import User from "@models/User";

export async function GET(request) {
  await dbConnect();
  const session = request.cookies.get("session")?.value;
  const user = await User.findById(session);

  if (user?.github?.connected) {
    return NextResponse.json({
      connected: true,
      username: user.github.username,
    });
  }

  return NextResponse.json({ connected: false });
}
