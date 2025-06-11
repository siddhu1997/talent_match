"use client";

import Link from "next/link";

export default function AdminHeader() {
  return (
    <header className="sticky top-0 flex justify-between items-center px-10 py-4 border-b bg-white shadow-sm z-10">
      <h1 className="text-lg font-bold text-black">TalentMatcher</h1>
      <nav className="flex gap-6 text-sm font-medium text-gray-700">
        <Link href="/dashboard/admin/home">Home</Link>
        <Link href="/dashboard/admin/talent-pool">Talent Pool</Link>
      </nav>
    </header>
  );
}
