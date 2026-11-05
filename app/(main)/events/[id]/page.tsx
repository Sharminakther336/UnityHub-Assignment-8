
"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import { getAllEvents, type Event } from "@/services/eventService";
import { useSession } from "@/lib/auth-client";

function EventDetailsContent() {
  const params = useParams<{ id: string }>();
  const eventId = params.id;
  const router = useRouter();

  const { data: session, isPending } = useSession();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const events = await getAllEvents();
        const selectedEvent = events.find(
          (item) => item._id === eventId
        );

        if (!selectedEvent) {
          setError("Event not found.");
          return;
        }

        setEvent(selectedEvent);
      } catch {
        setError("Unable to load event. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) loadEvent();
  }, [eventId]);

  const handleJoinEvent = async () => {
    if (!session?.user?.email) {
      router.push("/login");
      return;
    }

    try {
      setJoining(true);
      setMessage("");
      setError("");

      const response = await fetch("http://localhost:5000/api/joins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId,
          userEmail: session.user.email,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Unable to join event.");
        return;
      }

      setMessage("You have successfully joined this event!");
    } catch {
      setError("Server connection failed. Please try again.");
    } finally {
      setJoining(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F5FAF6] px-5 py-12">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/upcoming-events"
            className="mb-7 inline-block font-semibold text-[#087D45] hover:underline"
          >
            ← Back to Upcoming Events
          </Link>

          {loading && (
            <p className="py-20 text-center text-gray-600">
              Loading event details...
            </p>
          )}

          {!loading && error && !event && (
            <div className="rounded-2xl bg-white p-10 text-center text-red-600 shadow">
              {error}
            </div>
          )}

          {!loading && event && (
            <article className="overflow-hidden rounded-3xl bg-white shadow-lg">
              <img
                src={event.thumbnail}
                alt={event.title}
                className="h-72 w-full object-cover sm:h-96"
              />

              <div className="p-6 sm:p-10">
                <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-bold text-[#087D45]">
                  {event.eventType}
                </span>

                <h1 className="mt-5 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  {event.title}
                </h1>

                <p className="mt-5 text-base leading-8 text-gray-600">
                  {event.description}
                </p>

                <div className="mt-8 grid gap-5 rounded-2xl bg-[#F5FAF6] p-6 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-gray-500">Event Date</p>
                    <p className="mt-2 font-bold text-gray-900">
                      {new Date(event.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="mt-2 font-bold text-gray-900">
                      {event.location}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Organized By</p>
                    <p className="mt-2 font-bold text-gray-900">
                      {event.creatorEmail}
                    </p>
                  </div>
                </div>

                {message && (
                  <p className="mt-5 rounded-xl bg-green-50 p-4 text-green-700">
                    {message}
                  </p>
                )}

                {error && event && (
                  <p className="mt-5 rounded-xl bg-red-50 p-4 text-red-600">
                    {error}
                  </p>
                )}

                <button
                  onClick={handleJoinEvent}
                  disabled={joining || isPending || !!message}
                  className="mt-8 w-full rounded-xl bg-[#087D45] px-8 py-4 font-bold text-white transition hover:bg-[#056337] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {isPending
                    ? "Checking Login..."
                    : joining
                      ? "Joining..."
                      : message
                        ? "Joined Successfully"
                        : "Join Event"}
                </button>

                {!session?.user && !isPending && (
                  <p className="mt-3 text-sm text-gray-500">
                    Please log in to join this event.
                  </p>
                )}
              </div>
            </article>
          )}
        </div>
      </main>
    </>
  );
}

export default function EventDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#F5FAF6]">
          Loading event details...
        </div>
      }
    >
      <EventDetailsContent />
    </Suspense>
  );
}
