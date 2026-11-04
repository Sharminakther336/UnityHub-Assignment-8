
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import { getAllEvents, type Event } from "@/services/eventService";

export default function UpcomingEventsPage() {
  const searchParams = useSearchParams();

  const [events, setEvents] = useState<Event[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAllEvents();
        setEvents(data);
      } catch {
        setError("Events load করা যায়নি। Backend চালু আছে কি না দেখো।");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const categories = useMemo(() => {
    return ["All", ...new Set(events.map((event) => event.eventType))];
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        const searchText = search.toLowerCase().trim();

        const matchesSearch =
          !searchText ||
          event.title.toLowerCase().includes(searchText) ||
          event.description.toLowerCase().includes(searchText) ||
          event.location.toLowerCase().includes(searchText);

        const matchesCategory =
          category === "All" || event.eventType === category;

        return matchesSearch && matchesCategory;
      })
      .sort(
        (a, b) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );
  }, [events, search, category]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F5FAF6]">
        <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12">
          <div className="text-center">
            <span className="text-sm font-bold tracking-wider text-[#087D45]">
              DISCOVER YOUR COMMUNITY
            </span>

            <h1 className="mt-3 text-3xl font-extrabold text-[#14211E] sm:text-4xl">
              Upcoming Community Events
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-gray-600">
              Discover exciting events, meet new people and make a
              positive difference in your community.
            </p>
          </div>

          <div className="mx-auto mt-9 flex max-w-3xl flex-col gap-4 sm:flex-row">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events by name or location..."
              className="h-12 flex-1 rounded-xl border border-gray-200 bg-white px-5 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition focus:border-[#087D45] focus:ring-2 focus:ring-[#087D45]/10"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-12 rounded-xl border border-gray-200 bg-white px-5 text-sm text-gray-800 outline-none focus:border-[#087D45]"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All Categories" : item}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-10 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#14211E]">
              Explore Events
            </h2>

            <span className="text-sm font-medium text-gray-500">
              {filteredEvents.length} Events Found
            </span>
          </div>

          {loading && (
            <div className="py-20 text-center text-gray-600">
              Loading events...
            </div>
          )}

          {!loading && error && (
            <div className="mt-8 rounded-xl bg-red-50 p-6 text-center text-red-600">
              {error}
            </div>
          )}

          {!loading && !error && filteredEvents.length === 0 && (
            <div className="mt-8 rounded-2xl border border-gray-100 bg-white px-5 py-16 text-center">
              <div className="text-4xl">📅</div>

              <h3 className="mt-4 text-xl font-bold text-gray-800">
                No Events Found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Try another search term or select a different category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="mt-5 rounded-full bg-[#087D45] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#056337]"
              >
                Clear Filters
              </button>
            </div>
          )}

          {!loading && !error && filteredEvents.length > 0 && (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <article
                  key={event._id}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative">
                    <img
                      src={event.thumbnail}
                      alt={event.title}
                      className="h-56 w-full object-cover"
                    />

                    <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#087D45] shadow-sm">
                      {event.eventType}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900">
                      {event.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                      {event.description}
                    </p>

                    <div className="mt-5 space-y-3 border-t border-gray-100 pt-4 text-sm text-gray-600">
                      <p>
                        <span className="mr-2">📅</span>
                        {new Date(event.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>

                      <p>
                        <span className="mr-2">📍</span>
                        {event.location}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
