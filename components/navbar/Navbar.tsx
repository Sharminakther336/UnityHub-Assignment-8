
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Upcoming Events", href: "/upcoming-events" },
  { name: "Create Event", href: "/dashboard/create-event" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = search.trim();

    if (query) {
      setMenuOpen(false);
      router.push(`/upcoming-events?search=${encodeURIComponent(query)}`);
    }
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 py-4 lg:px-10">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex shrink-0 items-center gap-2"
        >
          <svg viewBox="0 0 64 64" className="h-12 w-12">
            <g fill="#087D45">
              <circle cx="32" cy="13" r="7" />
              <circle cx="13" cy="20" r="6" />
              <circle cx="51" cy="20" r="6" />
              <path d="M20 49V38c0-9 5-15 12-15s12 6 12 15v11h-8V38h-8v11z" />
              <path d="M3 47V36c0-7 4-12 10-12 4 0 7 2 9 6-3 4-4 8-4 13v4z" />
              <path d="M61 47V36c0-7-4-12-10-12-4 0-7 2-9 6 3 4 4 8 4 13v4z" />
            </g>
          </svg>

          <div className="leading-tight">
            <span className="block text-2xl font-extrabold tracking-tight text-[#087D45]">
              UnityHub
            </span>
            <span className="whitespace-nowrap text-xs font-medium text-gray-600">
              A Community Event Platform
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-3 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`whitespace-nowrap rounded-full px-3 py-3 text-[15px] font-semibold transition ${
                isActive(link.href)
                  ? "bg-[#E8F5E9] text-[#087D45]"
                  : "text-gray-800 hover:bg-[#E8F5E9] hover:text-[#087D45]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          <form
            onSubmit={handleSearch}
            className="flex h-12 w-64 items-center gap-3 rounded-full border border-gray-200 px-4 focus-within:border-[#087D45] focus-within:ring-2 focus-within:ring-[#087D45]/10"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 shrink-0 text-gray-600">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M16 16L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events..."
              className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-500"
            />
          </form>

          <Link
            href="/login"
            className="whitespace-nowrap rounded-full border border-[#087D45] px-6 py-3 font-semibold text-[#087D45] transition hover:bg-[#E8F5E9]"
          >
            Log In
          </Link>

          <Link
            href="/register"
            className="whitespace-nowrap rounded-full bg-[#087D45] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#056337]"
          >
            Join Community
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="rounded-lg p-2 text-2xl text-[#087D45] xl:hidden"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-6 py-5 xl:hidden">
          <form
            onSubmit={handleSearch}
            className="mb-5 flex h-11 items-center gap-3 rounded-full border border-gray-200 px-4"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M16 16L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </form>

          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`rounded-lg px-3 py-2 font-medium transition ${
                  isActive(link.href)
                    ? "bg-[#E8F5E9] text-[#087D45]"
                    : "text-gray-800 hover:bg-[#E8F5E9] hover:text-[#087D45]"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="rounded-full border border-[#087D45] px-5 py-3 text-center font-semibold text-[#087D45]"
            >
              Log In
            </Link>

            <Link
              href="/register"
              onClick={() => setMenuOpen(false)}
              className="rounded-full bg-[#087D45] px-5 py-3 text-center font-semibold text-white"
            >
              Join Community
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}


