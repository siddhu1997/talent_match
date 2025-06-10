export default function AdminDashboard({ user }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-black">
        Welcome, {user.username} 👋
      </h1>
      <p className="text-black">You're logged into Talent Acquisition.</p>
    </div>
  );
}
