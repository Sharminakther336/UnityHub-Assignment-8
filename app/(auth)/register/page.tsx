
"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!hasUppercase || !hasLowercase || !hasMinLength) {
      return;
    }

    alert("Registration authentication will be connected next.");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5FAF6] px-5 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-[#E5EFE7] bg-white shadow-lg md:grid-cols-2">
        <div className="hidden flex-col justify-center bg-[#E1F2E6] p-10 text-[#174D30] md:flex">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl font-bold text-[#347C52] shadow-sm">
              U
            </div>
            <span className="text-2xl font-bold">UnityHub</span>
          </div>

          <h1 className="text-3xl font-bold leading-tight">
            Join Our Growing Community!
          </h1>

          <p className="mt-5 text-base leading-8 text-[#456B52]">
            Create your account and start connecting with people,
            discovering events and making a positive difference.
          </p>

          <div className="mt-10 rounded-2xl border border-white/70 bg-white/60 p-6">
            <p className="text-lg font-semibold text-[#245D3A]">
              Be Part of Something Meaningful.
            </p>
            <p className="mt-2 text-sm text-[#456B52]">
              Discover. Connect. Participate.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center px-7 py-10 sm:px-12">
          <div className="mb-7 text-center md:text-left">
            <h2 className="text-3xl font-bold text-[#14211E]">
              Create Account
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Join UnityHub and start making a difference.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#79B58C] focus:ring-2 focus:ring-[#79B58C]/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#79B58C] focus:ring-2 focus:ring-[#79B58C]/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Profile Photo URL
              </label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#79B58C] focus:ring-2 focus:ring-[#79B58C]/20"
              />
              <p className="mt-1 text-xs text-gray-400">
                Optional: Leave empty for default avatar.
              </p>
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
                  placeholder="Create a password"
                  required
                  className="h-11 w-full rounded-xl border border-gray-200 px-4 pr-16 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#79B58C] focus:ring-2 focus:ring-[#79B58C]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#347C52]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <div className="mt-3 space-y-1 text-xs">
                <p className={hasUppercase ? "text-green-600" : "text-gray-500"}>
                  {hasUppercase ? "✓" : "○"} At least one uppercase letter (A-Z)
                </p>
                <p className={hasLowercase ? "text-green-600" : "text-gray-500"}>
                  {hasLowercase ? "✓" : "○"} At least one lowercase letter (a-z)
                </p>
                <p className={hasMinLength ? "text-green-600" : "text-gray-500"}>
                  {hasMinLength ? "✓" : "○"} Minimum 6 characters length
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={!name.trim() || !email.trim() || !hasUppercase || !hasLowercase || !hasMinLength}
              className="h-12 w-full rounded-xl bg-[#347C52] text-sm font-bold text-white transition hover:bg-[#286640] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Create Account →
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-[#347C52] hover:underline"
            >
              Login here
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
