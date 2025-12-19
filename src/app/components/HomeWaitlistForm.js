"use client";

import { useState } from "react";

export default function HomeWaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="card-muted flex items-center gap-3">
        <div className="timeline-dot" />
        <div>
          <p className="font-semibold text-white">Thanks for joining!</p>
          <p className="text-xs text-[#b1bdcf]">We’ll reach out with early access details.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="px-4 py-3 rounded-xl bg-[#0d1324] border border-white/10 text-white placeholder-[#b1bdcf] focus:outline-none w-full"
        />
        <button type="submit" className="cta-primary w-full justify-center" disabled={status === "submitting"}>
          {status === "submitting" ? "Joining..." : "Join waitlist"}
        </button>
      </form>
      {status === "error" && (
        <p className="text-xs text-red-400 mt-3">Something went wrong. Please try again.</p>
      )}
    </>
  );
}
