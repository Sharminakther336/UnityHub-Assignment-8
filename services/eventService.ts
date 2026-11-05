const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/events?limit=6`;

export interface Event {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  date: string;
  creatorEmail: string;
  createdAt: string;
}

export const getAllEvents = async (): Promise<Event[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  return response.json();
};