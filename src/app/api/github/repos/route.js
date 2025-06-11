import { NextResponse } from "next/server";
import dbConnect from "@lib/db";
import User from "@models/User";
import axios from "axios";

export async function GET(request) {
  const session = request.cookies.get("session")?.value;
  if (!session)
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  await dbConnect();
  const user = await User.findById(session);

  if (!user?.github?.accessToken) {
    return NextResponse.json({ repos: [] });
  }

  try {
    const res = await axios.get("https://api.github.com/user/repos", {
      headers: { Authorization: `token ${user.github.accessToken}` },
      params: { visibility: "all", per_page: 100 },
    });

    const repos = res.data.map((repo) => ({
      name: repo.name,
      url: repo.html_url,
    }));

    return NextResponse.json({ repos });
  } catch (error) {
    console.error("GitHub repo fetch error:", error.message);
    return NextResponse.json({ repos: [] });
  }
}
