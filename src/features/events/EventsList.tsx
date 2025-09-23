// src/features/events/EventsList.tsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../app/apiClient";

type EventItem = {
  id: string;
  title: string;
  startDateTime: string;
  endDateTime: string;
};

async function fetchEvents(): Promise<EventItem[]> {
  const r = await api.get("/organizer/events");
  return r.data;
}

export default function EventsList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  if (isLoading) return <div>Loading events…</div>;
  if (isError) return <div>Error loading events</div>;

  if (!Array.isArray(data)) {
    return <div>No events found</div>;
  }

  return (
    <ul className="mt-4 space-y-2">
      {data.map((e) => (
        <li
          key={e.id}
          className="p-3 border rounded bg-white shadow-sm"
        >
          <div className="font-semibold">{e.title}</div>
          <div className="text-xs text-gray-500">
            {new Date(e.startDateTime).toLocaleString()}
          </div>
        </li>
      ))}
    </ul>
  );
}
