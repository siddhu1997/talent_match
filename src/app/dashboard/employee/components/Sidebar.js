"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Code, Folder, Settings } from "lucide-react";

const navItems = [
  {
    name: "Profile",
    href: "/dashboard/employee/profile",
    icon: User,
    enabled: true,
  },
  {
    name: "Skills",
    href: "/dashboard/employee/skills",
    icon: Code,
    enabled: true,
  },
  {
    name: "Projects",
    href: "/dashboard/employee/repository",
    icon: Folder,
    enabled: false,
  },
  {
    name: "Settings",
    href: "/dashboard/employee/settings",
    icon: Settings,
    enabled: false,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-full w-full px-4 py-6 overflow-y-auto">
      <h1 className="text-l font-bold text-black mb-8 pl-2">My Menu</h1>

      <nav className="space-y-2">
        {navItems.filter(item => item.enabled).map(({ name, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link key={href} href={href} className="block">
              <div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                } transition`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{name}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
