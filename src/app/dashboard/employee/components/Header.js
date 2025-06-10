"use client";

import { logoutAction } from "@/app/logout/actions";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-3 border-b bg-white">
      <h1 className="text-xl font-bold text-black">TalentMatch</h1>
      <form action={logoutAction}>
        <button
          className="text-sm text-blue-600 font-semibold underline"
          type="submit"
        >
          Logout
        </button>
      </form>
    </header>
  );
}
