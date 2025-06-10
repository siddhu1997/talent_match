"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction } from "./actions";
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
        "Sign in"
      )}
    </Button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(loginAction, { error: "" });

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <form
        action={formAction}
        className="text-black w-full max-w-md space-y-4 bg-white shadow p-8 rounded-xl"
      >
        <h1 className="text-2xl text-center font-black">Welcome back</h1>
        {state?.error && (
          <p className="text-red-500 text-sm text-center">{state.error}</p>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            required
            className="w-full h-12 px-4 border rounded-xl focus:outline-none focus:ring-1 border-gray-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            required
            className="w-full h-12 px-4 border rounded-xl focus:outline-none focus:ring-1 border-gray-300"
          />
        </div>
        <SubmitButton />
        <p className="text-center text-sm text-black m-4 p-1">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
