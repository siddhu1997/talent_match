"use client";

import { useState } from "react";
import EmployeeInformation from "./EmployeeInformation";

const dummyProfiles = [
  {
    name: "John Doe",
    position: "Frontend Engineer",
    experience: 5,
    avatar: "/avatar.png",
  },
  {
    name: "Jane Smith",
    position: "Backend Developer",
    experience: 4,
    avatar: "/avatar.png",
  },
];

export default function TalentPool() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-black">Top Talent</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {dummyProfiles.map((user, i) => (
          <div
            key={i}
            className="border p-4 rounded-lg shadow-sm hover:bg-slate-100 cursor-pointer"
            onClick={() => setSelectedUser(user)}
          >
            <img
              src={user.avatar}
              alt={user.fullName}
              className="w-16 h-16 rounded-full mb-2"
            />
            <h3 className="text-black font-semibold">{user.fullName}</h3>
            <p className="text-sm text-gray-600">{user.position}</p>
            <p className="text-sm text-gray-500">
              {user.experience} yrs experience
            </p>
          </div>
        ))}
      </div>

      {selectedUser && (
        <EmployeeInformation
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}
