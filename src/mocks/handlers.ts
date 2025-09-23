// src/mocks/handlers.ts
import { http, HttpResponse } from "msw";

type LoginBody = {
  username: string;
  password: string;
};

const mockEvents = [
  {
    id: "1",
    title: "Tech Conference",
    startDateTime: "2025-10-10T09:00:00Z",
    endDateTime: "2025-10-10T17:00:00Z",
  },
  {
    id: "2",
    title: "Music Festival",
    startDateTime: "2025-11-01T15:00:00Z",
    endDateTime: "2025-11-01T23:00:00Z",
  },
];

export const handlers = [
  // Mock organizer events (both possible paths)
  http.get("/organizer/events", () => HttpResponse.json(mockEvents)),
  http.get("/api/v1/organizer/events", () => HttpResponse.json(mockEvents)),

  // Mock login (both possible paths too)
  http.post("/api/login", async ({ request }) => {
    const body = (await request.json()) as LoginBody;
    if (body?.username === "admin" && body?.password === "password") {
      return HttpResponse.json({ token: "fake-jwt-token", role: "admin" });
    }
    return HttpResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }),

  http.post("/api/v1/login", async ({ request }) => {
    const body = (await request.json()) as LoginBody;
    if (body?.username === "admin" && body?.password === "password") {
      return HttpResponse.json({ token: "fake-jwt-token", role: "admin" });
    }
    return HttpResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }),
];
