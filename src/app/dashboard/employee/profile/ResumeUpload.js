"use client";

import { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { FiUpload } from "react-icons/fi";

export default function ResumeUpload({ onUploadSuccess }) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file) => {
    if (!file || !user?._id) {
      toast.error("No file selected or user not authenticated");
      return;
    };

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large. Max size is 5MB.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("userId", user._id);

    setLoading(true);
    const res = await fetch("/api/resume/upload", {
      method: "POST",
      body: formData,
    });
    setLoading(false);

    if (res.ok) {
      toast.success("Resume uploaded successfully");
      onUploadSuccess?.();
    } else {
      toast.error("Upload failed");
    }
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handleUpload(acceptedFiles[0]);
      } else {
        toast.error("No valid file selected");
      }
    },
    [user]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: 5 * 1024 * 1024,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
  });

  return (
    <div className="w-full mt-6">
      <h2 className="text-xl font-semibold text-black mb-1">Resume/CV</h2>
      <p className="text-sm text-gray-600 mb-4">
        Upload your resume or CV to provide additional information about your
        skills and experience.
      </p>

      <div
        {...getRootProps()}
        className={`w-full border-2 border-dashed rounded-lg py-12 px-6 text-center transition cursor-pointer ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        <FiUpload className="mx-auto mb-2 text-gray-500" size={24} />
        <p className="font-semibold text-black mb-1">Upload Resume/CV</p>
        <p className="text-sm text-gray-500 mb-4">
          Drag and drop or click anywere to browse your resume.
        </p>
      </div>
    </div>
  );
}
