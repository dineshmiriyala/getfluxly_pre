"use client";

import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Tracker() {
  useEffect(() => {
    // Persistent session ID for the user
    let session_id = localStorage.getItem("fluxly_session");
    if (!session_id) {
      session_id = uuidv4();
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

    track();
  }, []);

  return null;
}