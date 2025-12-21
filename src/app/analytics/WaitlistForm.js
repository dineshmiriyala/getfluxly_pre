"use client";

import { useState } from "react";
import { getStoredUtmParams } from "@/app/lib/utm.js";

export default function AnalyticsWaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");

    try {
      const utmParams = getStoredUtmParams();
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, ...utmParams }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className="px-4 py-3 rounded-xl bg-[#0d1324] border border-white/10 text-white placeholder-[#b1bdcf] focus:outline-none w-full sm:w-72"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="cta-primary whitespace-nowrap flex-shrink-0"
      >
        {status === "submitting" ? "Joining..." : "Join waitlist"}
      </button>
      {status === "success" && (
        <p className="text-xs text-[#b1bdcf] sm:ml-2">Thanks — we&apos;ll be in touch soon.</p>
      )}
      {status === "error" && (
        <p className="text-xs text-red-400 sm:ml-2">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
