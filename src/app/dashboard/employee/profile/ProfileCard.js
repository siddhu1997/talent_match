"use client";

import { useUser } from "@/context/UserContext";
import { FaUserCircle } from "react-icons/fa";

export default function ProfileCard({ employee }) {
  const { user } = useUser();

  if (employee) {
    return (
      <div className="w-full border rounded-lg shadow-sm p-6 bg-white flex items-center gap-4">
        {/* Profile Picture */}
        {employee?.dpURL ? (
          <img
            src={employee.dpURL}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover border"
          />
        ) : (
          <FaUserCircle className="w-16 h-16 text-gray-400" />
        )}

        {/* Name and Date */}
        <div>
          <h2 className="text-lg font-semibold text-black">
            {employee?.fullName || "Infy User"}
          </h2>
          <p className="text-sm text-gray-600">
            {employee.mailID || `user@example.com`}
          </p>
        </div>
      </div>
    );
  }
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
          {user?.fullName || "Infy User"}
        </h2>
        <p className="text-sm text-gray-600">
          {user.mailID || `user@example.com`}
        </p>
      </div>
    </div>
  );
}
