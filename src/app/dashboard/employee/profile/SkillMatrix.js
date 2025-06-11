export default function SkillMatrix() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-black mb-1">
        Skill Proficiency Matrix
      </h2>
      <p className="text-sm text-gray-600 mb-3">
        Once your repositories and resume are analyzed, your skill proficiency
        matrix will be displayed here.
      </p>
      <div className="flex flex-col items-center gap-4">
        <img
          src="/matrix-placeholder.png"
          alt="No Data"
          className="rounded-lg w-64"
        />
        <p className="font-bold text-black">No Data Available</p>
        <p className="text-sm text-gray-600 max-w-md text-center">
          Please upload your resume/CV and select repositories to generate your
          skill proficiency matrix.
        </p>
        <button className="bg-slate-100 px-4 py-2 rounded text-sm font-semibold hover:bg-slate-200 transition">
          Analyze Skills
        </button>
      </div>
    </div>
  );
}
