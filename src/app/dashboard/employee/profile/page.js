"use client";

import { useState } from "react";
import ProfileCard from "./ProfileCard";
import RepositorySelector from "./RepositorySelector";
import ResumeList from "./ResumeList";
import ResumeUpload from "./ResumeUpload";
import SkillMatrix from "./SkillMatrix";

export default function EmployeeProfilePage() {
  const [resumeRefreshTrigger, setResumeRefreshTrigger] = useState(0);

  const refreshResumes = () => {
    setResumeRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-black">Employee Profile</h1>
      <p className="text-gray-600 text-sm">Manage your profile and skills</p>

      <ProfileCard />
      <RepositorySelector />
      <ResumeUpload onUploadSuccess={refreshResumes} />
      <ResumeList refreshKey={resumeRefreshTrigger} />
      <SkillMatrix />
    </div>
  );
}
