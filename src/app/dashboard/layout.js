export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow p-4 text-black font-bold">
        TalentMatch Dashboard
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
