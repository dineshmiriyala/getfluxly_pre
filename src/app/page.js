"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // (We will wire analytics later)
  useEffect(() => {
    // placeholder
  }, []);

  // Cursor-follow glow and ring
  useEffect(() => {
    const glow = document.getElementById("cursor-glow");
    const handleMove = (e) => {
      if (glow) {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Magnetic buttons effect
  useEffect(() => {
    const buttons = document.querySelectorAll(".magnetic-btn");
    buttons.forEach((btn) => {
      const strength = 25;
      const handleMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
      };
      const reset = () => {
        btn.style.transform = "translate(0,0)";
      };
      btn.addEventListener("mousemove", handleMove);
      btn.addEventListener("mouseleave", reset);
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setSubmitted(false);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubmitted(true);
        setEmail("");
      } else {
        alert("Something went wrong. Try again.");
      }
    } catch (err) {
      alert("Network error. Try again.");
    }
  };

  return (
    <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white flex items-center justify-center px-6 relative overflow-visible">
      

      <div
        id="cursor-glow"
        className="pointer-events-none fixed w-56 h-56 hidden dark:block bg-green-400/25 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 z-0"
      ></div>

      <div className="max-w-2xl text-center text-black dark:text-white animate-floatUp relative z-20">
        <h1 className="text-6xl font-bold mb-4 leading-tight bg-gradient-to-r from-green-400 via-green-500 to-green-700 text-transparent bg-clip-text animate-shimmer animate-sparkle relative z-20">GetFluxly</h1>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Analytics-first email platform with deep deliverability insights and
          real-time metrics: powered by SES or your own infra.
        </p>

        {!submitted ? (
          <form onSubmit={submit} className="flex gap-2 justify-center">
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-3 py-2 rounded-lg w-64 sm:w-72 md:w-96 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 border border-gray-300 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-600 dark:border-gray-700 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-green-700 hover:opacity-90 px-4 py-2 rounded-lg font-semibold text-sm sm:text-base text-white shadow-lg animate-softBounce animate-greenGlow magnetic-btn"
            >
              Join Waitlist
            </button>
          </form>
        ) : (
          <p className="text-green-400 font-medium mt-6">
            You're on the waitlist ✔
          </p>
        )}

        <div className="mt-6">
          <a
            href="/details"
            className="inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold shadow-lg hover:opacity-90 transition text-sm sm:text-base animate-softBounce animate-greenGlow magnetic-btn"
          >
            More Details →
          </a>
        </div>

        <p className="text-sm text-gray-600 mt-10">
          Zero spam. Only useful updates.
        </p>
      </div>
    </main>
  );
}