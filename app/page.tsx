
"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Banner from "@/components/home/Banner";
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

      <main className="min-h-screen bg-[#f5f9f5]">
        <Banner />

        <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12">
          <div className="mb-10">
            <span className="font-semibold text-[#087D45]">
              DISCOVER YOUR COMMUNITY
            </span>

            <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Upcoming Community Events
            </h2>

            <p className="mt-3 text-gray-600">
              Find exciting events and connect with your community.
            </p>
          </div>

          {loading && (
            <p className="text-gray-600">Loading events...</p>
          )}

          {error && (
            <p className="text-red-600">{error}</p>
          )}

          {!loading && !error && events.length === 0 && (
            <p className="text-gray-600">No events found.</p>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event._id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
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
