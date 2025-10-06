// src/App.tsx
import React from "react";
import EventsList from "./features/events/EventsList";

export default function App() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Organizer Dashboard (Dev)</h1>
      <p className="mt-2 text-sm text-gray-600">Mocks: {import.meta.env.VITE_USE_MOCKS}</p>
      <div className="mt-4">
        <EventsList />
      </div>
    </div>
  );
}
