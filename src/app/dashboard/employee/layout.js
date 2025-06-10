import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export default function EmployeeLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6 bg-slate-50 flex-1">{children}</main>
      </div>
    </div>
  );
}
