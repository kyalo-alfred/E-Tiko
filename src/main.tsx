// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./app/queryClient";

if (import.meta.env.VITE_USE_MOCKS === "true") {
  // dynamic import so MSW code is excluded from production build
  const { worker } = await import("./mocks/browser");
  await worker.start({
    onUnhandledRequest: "warn",
    serviceWorker: { url: "/mockServiceWorker.js" }
  });
  console.info("MSW worker started (DEV)");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
