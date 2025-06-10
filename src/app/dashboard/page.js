import dbConnect from "@lib/db";
import User from "@models/User";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import EmployeeDashboard from "./employee/view";
import AdminDashboard from "./admin/view";

export default async function DashboardPage() {
  const session = cookies().get("session")?.value;
  if (!session) redirect("/login");

  await dbConnect();
  const user = await User.findById(session);

  if (!user) redirect("/login");

  return (
    <>
      {user.role === "admin" ? (
        <AdminDashboard user={user} />
      ) : (
        <EmployeeDashboard user={user} />
      )}
    </>
  );
}
