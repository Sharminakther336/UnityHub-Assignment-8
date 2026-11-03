
"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Upcoming Events", href: "/upcoming-events" },
  { name: "Our Impact", href: "/impact" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 lg:px-12">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#087D62]">
            <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9">
              <path
                d="M24 39C12 31 8 20 14 10C21 12 25 17 24 25C27 15 34 12 39 14C40 26 33 34 24 39Z"
                fill="#FFFFFF"
              />
              <path
                d="M24 39V22M24 29C19 22 17 18 14 10M24 28C29 20 34 17 39 14"
                stroke="#087D62"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <span className="text-2xl font-extrabold tracking-tight text-[#102D28]">
            UnityHub
          </span>
        </Link>

        <div className="hidden items-center gap-7 xl:flex">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              className={`whitespace-nowrap py-2 text-[15px] font-medium transition-colors hover:text-[#087D62] ${
                index === 0
                  ? "border-b-[3px] border-[#087D62] text-[#087D62]"
                  : "text-[#263C38]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          <button
            aria-label="Search"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F7F8F5] text-[#183B34] transition hover:bg-[#E7F3EC]"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M16 16L21 21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <button
            aria-label="Theme toggle"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F7F8F5] text-xl text-[#183B34] transition hover:bg-[#E7F3EC]"
          >
            ☀️
          </button>

          <Link
            href="/login"
            className="rounded-full border border-[#087D62] px-6 py-3 font-semibold text-[#087D62] transition hover:bg-[#EAF5EF]"
          >
            Log In
          </Link>

          <Link
            href="/register"
            className="rounded-full bg-[#076B52] px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-[#055640]"
          >
            Join Community
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="rounded-lg p-2 text-2xl text-[#087D62] xl:hidden"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-6 py-5 xl:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-medium text-[#263C38] hover:text-[#087D62]"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="rounded-full border border-[#087D62] px-5 py-3 text-center font-semibold text-[#087D62]"
            >
              Log In
            </Link>

            <Link
              href="/register"
              onClick={() => setMenuOpen(false)}
              className="rounded-full bg-[#076B52] px-5 py-3 text-center font-semibold text-white"
            >
              Join Community
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

