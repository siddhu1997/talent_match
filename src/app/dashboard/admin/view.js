export default function AdminDashboard({ user }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white text-center mt-6 mb-4">
        Welcome, {user.username} 👋
      </h1>
      <p className="text-white">You're logged into Talent Acquisition.</p>
    </div>
  );
}
