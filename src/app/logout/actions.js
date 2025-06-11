"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function logoutAction() {
  // Clear the session cookie
  cookies().set("session", "", {
    path: "/",
    maxAge: 0,
  });

  redirect("/login");
}