"use client";

import { useUser } from "@/context/UserContext";
import { format } from "date-fns";
import { FaUserCircle } from "react-icons/fa";

export default function ProfileCard() {
  const { user } = useUser();

  const formattedDate = user?.doj
    ? format(new Date(user.doj), "do MMM yyyy")
    : null;

  return (
    <div className="w-full border rounded-lg shadow-sm p-6 bg-white flex items-center gap-4">
      {/* Profile Picture */}
      {user?.dpURL ? (
        <img
          src={user.dpURL}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover border"
        />
      ) : (
        <FaUserCircle className="w-16 h-16 text-gray-400" />
      )}

      {/* Name and Date */}
      <div>
        <h2 className="text-lg font-semibold text-black">
          {user?.name || "Platform User"}
        </h2>
        <p className="text-sm text-gray-600">Joined: {formattedDate || "—"}</p>
      </div>
    </div>
  );
}
