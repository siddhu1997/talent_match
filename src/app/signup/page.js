"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signupAction } from "./actions";
import { Button, CircularProgress } from "@mui/material";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="contained"
      fullWidth
      disabled={pending}
      sx={{ height: 40, borderRadius: "9999px", textTransform: "none" }}
    >
      {pending ? (
        <CircularProgress size={22} sx={{ color: "white" }} />
      ) : (
        "Sign up"
      )}
    </Button>
  );
}

export default function SignupPage() {
  const [state, formAction] = useActionState(signupAction, { error: "" });

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <form
        action={formAction}
        className="w-full max-w-md space-y-4 bg-white shadow p-8 rounded-xl text-black font-bold"
      >
        <h1 className="text-2xl text-center font-black">Create your account</h1>
        {state?.error && (
          <p className="text-red-600 text-sm text-center">{state.error}</p>
        )}

        {/* Username */}
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            required
            className="w-full h-12 px-4 border rounded-xl focus:outline-none focus:ring-1 border-gray-300 text-black"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            required
            className="w-full h-12 px-4 border rounded-xl focus:outline-none focus:ring-1 border-gray-300 text-black"
          />
        </div>

        {/* empID */}
        <div>
          <label className="block text-sm font-medium mb-1">Employee ID</label>
          <input
            type="text"
            name="empID"
            required
            className="w-full h-12 px-4 border rounded-xl focus:outline-none focus:ring-1 border-gray-300 text-black"
          />
        </div>

        {/* name */}
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full h-12 px-4 border rounded-xl focus:outline-none focus:ring-1 border-gray-300 text-black"
          />
        </div>

        {/* mailID */}
        <div>
          <label className="block text-sm font-medium mb-1">Email ID</label>
          <input
            type="email"
            name="mailID"
            required
            className="w-full h-12 px-4 border rounded-xl focus:outline-none focus:ring-1 border-gray-300 text-black"
          />
        </div>

        {/* jobLevel */}
        <div>
          <label className="block text-sm font-medium mb-1">Job Level</label>
          <input
            type="number"
            name="jobLevel"
            min="1"
            max="10"
            required
            className="w-full h-12 px-4 border rounded-xl focus:outline-none focus:ring-1 border-gray-300 text-black"
          />
        </div>

        {/* role_category */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Role Category
          </label>
          <select
            name="role_category"
            required
            className="w-full h-12 px-4 border rounded-xl focus:outline-none focus:ring-1 border-gray-300 text-black"
          >
            <option value="">Select a role</option>
            {[
              "Developer",
              "Support",
              "Admin",
              "Architect",
              "Tester",
              "Domain Consultant",
              "Business Analyst",
              "Data Analyst",
              "Manager",
            ].map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <SubmitButton />

        <p className="text-center text-sm text-black m-4 p-2">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 underline">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}
