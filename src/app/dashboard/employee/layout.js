import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r z-50">
        <Sidebar />
      </div>

      {/* Main Content shifted right */}
      <div className="ml-64 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
