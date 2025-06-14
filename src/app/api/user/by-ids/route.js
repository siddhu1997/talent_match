// app/api/employees/by-ids/route.js
import dbConnect from "@lib/db";
import User from "@models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  const { empIDs } = await req.json();
  const users = await User.find({ empID: { $in: empIDs } }).lean();
  return NextResponse.json(users);
}
