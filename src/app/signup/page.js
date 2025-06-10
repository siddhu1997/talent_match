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

        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            required
            className="w-full h-12 px-4 border rounded-xl focus:outline-none focus:ring-1 border-gray-300 text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            required
            className="w-full h-12 px-4 border rounded-xl focus:outline-none focus:ring-1 border-gray-300 text-black"
          />
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
