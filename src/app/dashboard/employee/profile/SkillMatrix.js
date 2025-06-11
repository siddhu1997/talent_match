"use client";

import { useUser } from "@/context/UserContext";
import { FaStar, FaRegStar } from "react-icons/fa";
import Link from "next/link";

export default function SkillMatrix() {
  const { user } = useUser();
  const skills = user?.skills || [];

  const topSkills = skills.slice(0, 5);

  return (
    <div className="w-full mt-10">
      <h2 className="text-xl font-semibold text-black mb-4">
        Skill Proficiency Matrix
      </h2>

      {topSkills.length === 0 ? (
        <p className="text-sm text-gray-500">No skills available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3 text-sm font-semibold text-gray-700">
                  Skill
                </th>
                <th className="text-left p-3 text-sm font-semibold text-gray-700">
                  Proficiency
                </th>
              </tr>
            </thead>
            <tbody>
              {topSkills.map((skill, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3 text-black text-sm">{skill.name}</td>
                  <td className="p-3 flex gap-1">
                    {[...Array(5)].map((_, j) =>
                      j < skill.rating ? (
                        <FaStar key={j} className="text-yellow-400" />
                      ) : (
                        <FaRegStar key={j} className="text-gray-300" />
                      )
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {skills.length > 5 && (
        <div className="mt-4 text-sm">
          <Link
            href="/dashboard/employee/skills"
            className="text-blue-600 font-medium hover:underline"
          >
            View full skills →
          </Link>
        </div>
      )}
    </div>
  );
}
