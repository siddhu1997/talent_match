"use client";

import { useEffect, useRef, useState } from "react";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { FiTrash2, FiUpload, FiShare2 } from "react-icons/fi";

export default function ResumeList({ refreshKey }) {
  const { user } = useUser();
  const [resumes, setResumes] = useState([]);
  const fileInputRef = useRef();
  const updateTargetRef = useRef(null);

  const loadResumes = async () => {
    if (!user?._id) return;
    const res = await fetch(`/api/resume/list?userId=${user._id}`);
    const data = await res.json();
    setResumes(data.files || []);
  };

  useEffect(() => {
    loadResumes();
  }, [user, refreshKey]);

  const deleteResume = async (filename) => {
    const res = await fetch("/api/resume/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user._id, filename }),
    });

    if (res.ok) {
      toast.success("Deleted successfully");
      loadResumes();
    } else {
      toast.error("Failed to delete resume");
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    const target = updateTargetRef.current;
    if (!file || !target) return;

    await deleteResume(target);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("userId", user._id);

    const res = await fetch("/api/resume/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      toast.success("Resume updated");
      loadResumes();
    } else {
      toast.error("Update failed");
    }

    updateTargetRef.current = null;
  };

  const handleUpdate = (filename) => {
    updateTargetRef.current = filename;
    fileInputRef.current.click();
  };

  const getIcon = (filename) => {
    const ext = filename.split(".").pop().toLowerCase();
    switch (ext) {
      case "pdf":
        return "📄";
      case "doc":
        return "📝";
      case "docx":
        return "📃";
      default:
        return "📁";
    }
  };

  const truncate = (name) =>
    name.length > 10 ? name.slice(0, 10) + "..." : name;

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold text-black mb-4">My Resumes</h2>

      {resumes.length === 0 ? (
        <p className="text-sm text-gray-500">No resumes uploaded.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {resumes.map((file, i) => (
            <div
              key={i}
              className="border border-gray-200 shadow-sm rounded-lg p-4 flex flex-col items-center text-center"
            >
              <div className="text-4xl">{getIcon(file)}</div>
              <div className="mt-2 text-sm text-black font-medium relative group cursor-default">
                <span>{truncate(file)}</span>
                <div className="absolute z-10 bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition">
                  {file}
                </div>
              </div>
              <div className="flex gap-3 mt-3 text-gray-500">
                <a
                  href={`/uploads/resumes/${user._id}/${file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Share"
                  className="hover:text-blue-600"
                >
                  <FiShare2 />
                </a>
                <button
                  onClick={() => handleUpdate(file)}
                  title="Update"
                  className="hover:text-green-600"
                >
                  <FiUpload />
                </button>
                <button
                  onClick={() => deleteResume(file)}
                  title="Delete"
                  className="hover:text-red-600"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
