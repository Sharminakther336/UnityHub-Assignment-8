
"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import { getAllEvents, type Event } from "@/services/eventService";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvents = async () => {
      try {
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

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f5f7f5] px-5 py-12">
        <section className="mx-auto max-w-6xl">
          <h1 className="mb-3 text-4xl font-bold text-gray-900">
            Discover Events
          </h1>

          <p className="mb-10 text-gray-600">
            Find exciting events and connect with your community.
          </p>

          {loading && <p>Loading events...</p>}

          {error && <p className="text-red-600">{error}</p>}

          {!loading && !error && events.length === 0 && (
            <p className="text-gray-600">No events found.</p>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event._id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm"
              >
                <img
                  src={event.thumbnail}
                  alt={event.title}
                  className="h-52 w-full object-cover"
                />

                <div className="p-5">
                  <span className="text-sm font-semibold text-emerald-700">
                    {event.eventType}
                  </span>

                  <h2 className="mt-2 text-xl font-bold text-gray-900">
                    {event.title}
                  </h2>

                  <p className="mt-2 text-sm text-gray-600">
                    {event.description}
                  </p>

                  <p className="mt-4 text-sm text-gray-700">
                    📍 {event.location}
                  </p>

                  <p className="mt-2 text-sm text-gray-700">
                    📅 {new Date(event.date).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
