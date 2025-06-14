"use client";
import { useEffect, useState } from "react";
import ChatProfileCard from "./ChatProfileCard"; // Custom modal-integrated card
import { toast } from "sonner";

export default function EmployeeCardGrid({ empIDs }) {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/user/by-ids", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ empIDs }),
        });
        const data = await res.json();
        setEmployees(data);
      } catch (e) {
        toast.error("Error fetching employee profiles.");
      }
    }
    fetchData();
  }, [empIDs]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {employees.map((emp) => (
        <ChatProfileCard key={emp._id} employee={emp} />
      ))}
    </div>
  );
}
