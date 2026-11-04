
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (result.error) {
        setError(result.error.message || "Login failed. Please try again.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (result.error) {
        setError(result.error.message || "Google login failed.");
        setLoading(false);
      }
    } catch {
      setError("Google login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5FAF6] px-5 py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-[#E5EFE7] bg-white shadow-lg md:grid-cols-2">
        <div className="hidden flex-col justify-center bg-[#E1F2E6] p-10 text-[#174D30] md:flex">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl font-bold text-[#347C52] shadow-sm">
              U
            </div>
            <span className="text-2xl font-bold">UnityHub</span>
          </div>

          <h1 className="text-3xl font-bold leading-tight">
            Welcome Back to Your Community!
          </h1>

          <p className="mt-5 text-base leading-8 text-[#456B52]">
            Connect with people, discover exciting events and make a
            positive difference in your community.
          </p>

          <div className="mt-10 rounded-2xl border border-white/70 bg-white/60 p-6">
            <p className="text-lg font-semibold text-[#245D3A]">
              Together We Build Stronger Communities.
            </p>
            <p className="mt-2 text-sm text-[#456B52]">
              Discover. Connect. Participate.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center px-7 py-10 sm:px-12">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-3xl font-bold text-[#14211E]">
              Welcome Back!
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Please enter your details to sign in.
            </p>
          </div>

          {error && (
            <p className="mb-5 rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#79B58C] focus:ring-2 focus:ring-[#79B58C]/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="h-12 w-full rounded-xl border border-gray-200 px-4 pr-16 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#79B58C] focus:ring-2 focus:ring-[#79B58C]/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#347C52]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-xl bg-[#347C52] text-sm font-bold text-white transition hover:bg-[#286640] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Please wait..." : "Log In"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">OR</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#E2EAE4] bg-white text-sm font-semibold text-gray-700 transition hover:bg-[#F5FAF6] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="text-lg font-bold text-[#4285F4]">G</span>
            Continue with Google
          </button>

          <p className="mt-7 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-[#347C52] hover:underline"
            >
              Register Now
            </Link>
          </p>

          <Link
            href="/"
            className="mt-5 text-center text-sm font-medium text-gray-500 hover:text-[#347C52]"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

