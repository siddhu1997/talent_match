import AdminHeader from "./components/Header";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />
      <main className="p-6">{children}</main>
    </div>
  );
}
