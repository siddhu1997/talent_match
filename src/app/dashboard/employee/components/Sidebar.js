"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Repository", href: "/dashboard/employee/repository" },
  { name: "Skills", href: "/dashboard/employee/skills" },
  { name: "Chatbot", href: "/dashboard/employee/chatbot" },
  { name: "Top 10 Matches", href: "/dashboard/employee/top10" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-white border-r h-full p-4">
      <nav className="space-y-3">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <p
              className={`block font-medium ${
                pathname === item.href ? "text-blue-600" : "text-black"
              } hover:underline`}
            >
              {item.name}
            </p>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
