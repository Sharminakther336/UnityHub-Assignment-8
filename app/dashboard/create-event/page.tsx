
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import { useSession } from "@/lib/auth-client";

export default function CreateEventPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventType: "",
    thumbnail: "",
    location: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!session?.user?.email) {
      router.push("/login");
      return;
    }

    if (new Date(formData.date) <= new Date()) {
      setError("Please select a future event date.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          creatorEmail: session.user.email,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create event.");
      }

      setSuccess("Event created successfully!");

      setTimeout(() => {
        router.push("/upcoming-events");
      }, 1200);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-gray-700">
            Please log in to create an event.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="rounded-lg bg-[#087D45] px-6 py-3 font-semibold text-white"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F5FAF6] px-5 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <span className="font-bold tracking-wider text-[#087D45]">
              UNITYHUB COMMUNITY
            </span>

            <h1 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Create a New Event
            </h1>

            <p className="mt-3 text-gray-600">
              Share an opportunity and bring your community together.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10"
          >
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Event Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter event title"
                required
                minLength={5}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 outline-none focus:border-[#087D45] focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Event Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your event..."
                required
                minLength={10}
                rows={5}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 outline-none focus:border-[#087D45] focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Event Type
              </label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 outline-none focus:border-[#087D45]"
              >
                <option value="">Select event category</option>
                <option value="Cleanup">Cleanup</option>
                <option value="Plantation">Plantation</option>
                <option value="Donation">Donation</option>
                <option value="Food Distribution">Food Distribution</option>
                <option value="Medical Support">Medical Support</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Thumbnail Image URL
              </label>
              <input
                type="url"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 outline-none focus:border-[#087D45] focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Event Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter event location"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 outline-none focus:border-[#087D45] focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Event Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .slice(0, 10)}
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 outline-none focus:border-[#087D45] focus:ring-2 focus:ring-green-100"
              />
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
                {error}
              </p>
            )}

            {success && (
              <p className="rounded-xl bg-green-50 p-4 text-sm text-green-700">
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#087D45] px-6 py-4 font-bold text-white transition hover:bg-[#056337] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Event..." : "Create Event"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
