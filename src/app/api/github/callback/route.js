import { NextResponse } from "next/server";
import axios from "axios";
import dbConnect from "@lib/db";
import User from "@models/User";

export async function GET(request) {
  const code = new URL(request.url).searchParams.get("code");

  if (!code) return NextResponse.redirect("/dashboard/employee/profile");

  // Exchange code for access token
  const res = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: process.env.GITHUB_REDIRECT_URI,
    },
    { headers: { Accept: "application/json" } }
  );

  const accessToken = res.data.access_token;

  // Get user's GitHub username
  const userRes = await axios.get("https://api.github.com/user", {
    headers: { Authorization: `token ${accessToken}` },
  });

  const githubUsername = userRes.data.login;

  await dbConnect();
  const session = request.cookies.get("session")?.value;
  if (!session) return NextResponse.redirect("/login");

  await User.findByIdAndUpdate(session, {
    github: {
      accessToken,
      username: githubUsername,
      connected: true,
    },
  });

 const url = new URL("/dashboard/employee/profile", request.url);
 return NextResponse.redirect(url);
}
