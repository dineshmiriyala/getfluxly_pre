"use client";

import { useEffect } from "react";

const createSessionId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `sess_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
};

export default function Tracker() {
  useEffect(() => {
    // Persistent session ID for the user
    let session_id = localStorage.getItem("fluxly_session");
    if (!session_id) {
      session_id = createSessionId();
      localStorage.setItem("fluxly_session", session_id);
    }

    const track = async () => {
      const data = {
        user_agent: navigator.userAgent,
        pathname: window.location.pathname,
        referrer: document.referrer || null,
        user_language: navigator.language,
        session_id,
        browser: navigator.userAgent,
        os: navigator.platform,
        device:
          /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
            ? "mobile"
            : "desktop",
      };

      await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    };

    const schedule = window.requestIdleCallback
      ? (cb) => window.requestIdleCallback(cb, { timeout: 2000 })
      : (cb) => window.setTimeout(cb, 1200);

    schedule(() => {
      track();
    });
  }, []);

  return null;
}
