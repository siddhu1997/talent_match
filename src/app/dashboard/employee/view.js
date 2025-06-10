export default function EmployeeDashboard({ user }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-black mb-4">
        Welcome, {user.username} 👋
      </h2>
      <p className="text-black">
        This is your personalised employee dashboard.
      </p>
      <p className="text-black mt-2">
        Use the sidebar to navigate to your repository, skills, or access the
        TalentMatcher chatbot.
      </p>
    </div>
  );
}