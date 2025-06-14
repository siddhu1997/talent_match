"use client";
import { useState } from "react";
import { Mail, BadgeInfo, Briefcase, X } from "lucide-react";

export default function ChatProfileCard({ employee, content }) {
  const [showModal, setShowModal] = useState(false);
  const { name, mailID, empID, jobLevel, dpURL } = employee;

  return (
    <>
      <div
        className="cursor-pointer border rounded-lg p-4 flex flex-col items-center text-center bg-white shadow hover:shadow-md transition-all"
        onClick={() => setShowModal(true)}
      >
        <img
          src={dpURL || "/user-avatar.png"}
          alt={name}
          className="w-20 h-20 rounded-full object-cover mb-2"
        />
        <h3 className="font-bold text-base text-black">{name}</h3>
        <p className="text-gray-500 text-sm truncate">{mailID}</p>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm relative shadow-lg">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center">
              <img
                src={dpURL || "/user-avatar.png"}
                alt={name}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h2 className="text-xl font-bold mb-2 text-black">{name}</h2>

              <div className="space-y-2 text-sm text-gray-700 w-full text-left mb-4">
                <p className="flex items-center gap-2">
                  <Mail size={16} /> {mailID}
                </p>
                <p className="flex items-center gap-2">
                  <BadgeInfo size={16} /> {empID}
                </p>
                <p className="flex items-center gap-2">
                  <Briefcase size={16} /> Job Level - {jobLevel}
                </p>
              </div>

              {/* 📦 Content Section */}
              <div className="w-full border-t pt-4 text-sm text-gray-800 prose max-w-none">
                {content || <p>No additional content available.</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
