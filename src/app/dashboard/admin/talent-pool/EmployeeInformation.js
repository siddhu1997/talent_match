"use client";

export default function EmployeeInformation({ user, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
        <h2 className="text-lg font-bold text-black mb-2">{user.fullName}</h2>
        <p className="text-gray-600">{user.position}</p>
        <p className="text-gray-500">{user.experience} years of experience</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}
