import { cookies } from "next/headers";

export function setSessionCookie(userId) {
  cookies().set({
    name: "session",
    value: userId,
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export function clearSessionCookie() {
  cookies().set("session", "", { maxAge: 0 });
}

export function getSession() {
  return cookies().get("session")?.value || null;
}
