import { useState } from "react";
import { supabase } from "../supabaseClient";
import Spinner from "./Spinner";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      setMessage(error.message);
      setGoogleLoading(false);
    }
  };

  const handleEmailSignUp = async () => {
    setEmailLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });
    if (error) setMessage(error.message);
    else setMessage("Check your email for confirmation link!");
    setEmailLoading(false);
  };

  const handleEmailSignIn = async () => {
    setEmailLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setMessage(error.message);
    else setMessage("Logged in!");
    setEmailLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Create an Account
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {/* Sign up button */}
        <button
          onClick={handleEmailSignUp}
          disabled={emailLoading || googleLoading}
          className={`mb-4 w-full rounded-md px-4 py-2 transition 
              ${
                googleLoading || emailLoading
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "text-white  bg-amber-600 hover:bg-amber-700"
              }`}
        >
          {/* {<div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />} */}
          {emailLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner color="text-white" />
              Processing...
            </span>
          ) : (
            "Sign Up"
          )}
        </button>

        {/* Google button */}
        <button
          onClick={handleGoogleLogin}
          disabled={emailLoading || googleLoading}
          className={`mb-6 w-full rounded-md border border-gray-300 bg-white px-4 py-2 transition 
          ${
            googleLoading || emailLoading
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {googleLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner color="text-gray-600" />
              Processing...
            </span>
          ) : (
            "Continue with Google"
          )}
        </button>

        {/* Separator */}
        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">or</span>
          </div>
        </div>

        {/* Already a member */}
        <p className="text-center text-sm text-gray-600">
          Already a member?{" "}
          <button
            onClick={handleEmailSignIn}
            className="font-medium text-blue-600 hover:underline"
          >
            Log In
          </button>
        </p>

        {/* Message */}
        {message && (
          <p className="mt-4 text-center text-sm text-red-500">{message}</p>
        )}
      </div>
    </div>
  );
}
