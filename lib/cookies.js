import { cookies } from "next/headers";

export function setSessionCookie(userId) {
  /* @next-codemod-ignore */
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

export async function clearSessionCookie() {
  (await cookies()).set("session", "", { maxAge: 0 });
}

export async function getSession() {
  return (
    (await cookies()).get("session")?.value || null
  );
}
