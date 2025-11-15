"use client";

import { useEffect, useRef, useState } from "react";

const heroHighlights = [
  "Deliverability diagnostics surface ISP issues before launches.",
  "Inbox placement clarity across Primary, Promotions, Updates, and spam folders.",
  "Automation ready signals that flow into workflows, nudges, and testing."
];

const featureCards = [
  {
    title: "Deep Deliverability Analytics",
    description:
      "True opens, click quality, device mix, Apple MPP avoidance, and webhook ingestion so every decision is backed by signal."
  },
  {
    title: "Inbox Placement and Spam Checks",
    description:
      "Seed monitoring shows whether Gmail, Outlook, or Yahoo throttles you so you can respond before KPIs slip."
  },
  {
    title: "Reader Journey Mapping",
    description:
      "See how long subscribers dwell, when they skim, and which modules convert so creative work stays data informed."
  },
  {
    title: "Automation Ready Alerts",
    description:
      "Trigger journeys whenever engagement drops, reputation shifts, or authentication drifts out of spec."
  },
  {
    title: "Authentication and Presend Reviews",
    description:
      "Continuous SPF, DKIM, DMARC, and BIMI monitoring plus presend reviews to keep infrastructure clean."
  },
  {
    title: "Partner Friendly Reporting",
    description:
      "Share live views or embed analytics inside your own dashboards without buying more seats."
  }
];

const quietTrackingNotes = [
  "Fluxly still captures anonymous engagement telemetry so history is ready when you want native dashboards.",
  "Google Analytics and Vercel analytics remain your macro view while Fluxly watches deliverability deep dives.",
  "Historical datasets stay hydrated which keeps experimentation fast when you flip the switch."
];

const socials = [
  {
    label: "Email",
    href: "mailto:hello@getfluxly.com",
    display: "hello@getfluxly.com"
  },
  {
    label: "Twitter",
    href: "https://twitter.com/madeByMD2",
    display: "@madeByMD2",
    external: true
  }
];

export default function AnalyticsLanding() {
  const glowRef = useRef(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleMove = (e) => {
      if (!glowRef.current) return;
      glowRef.current.style.left = `${e.clientX}px`;
      glowRef.current.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const submitWaitlist = async (e) => {
    e.preventDefault();
    if (!email || loading) return;

    setLoading(true);
    setSubmitted(false);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      if (res.ok) {
        setSubmitted(true);
        setEmail("");
      } else {
        alert("Something went wrong. Try again.");
      }
    } catch (err) {
      alert("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20 relative overflow-hidden">
      <div
        ref={glowRef}
        id="cursor-glow"
        className="pointer-events-none fixed w-64 h-64 bg-green-400/25 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 z-0"
      ></div>

      <div className="absolute inset-0 pointer-events-none animate-pulse">
        <div className="w-80 h-80 bg-green-500/20 blur-3xl rounded-full absolute -top-20 -left-10"></div>
        <div className="w-96 h-96 bg-green-600/10 blur-[110px] rounded-full absolute bottom-10 right-0"></div>
      </div>

      <section className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        <p className="text-xs uppercase tracking-[0.4em] text-green-400 animate-shimmer">
          GetFluxly
        </p>
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-green-400 via-green-500 to-green-700 text-transparent bg-clip-text leading-tight animate-floatUp">
          Deliverability Intelligence, Always On
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto animate-fadeIn">
          Fluxly analytics makes email performance actionable. Even though Google Analytics and Vercel cover your dashboards today, we keep recording advanced telemetry so future experiments start with a warm dataset.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          {heroHighlights.map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg transition transform hover:-translate-y-1 hover:border-white/40 animate-softBounce"
            >
              <p className="text-sm text-gray-200">{item}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <a
            href="/"
            className="bg-gradient-to-r from-green-500 to-green-700 px-6 py-3 rounded-full font-semibold shadow-lg shadow-green-500/30 hover:scale-105 transition"
          >
            Back to Home
          </a>
          <a
            href="mailto:hey@getfluxly.com"
            className="px-6 py-3 rounded-full border border-white/20 hover:border-white/60 transition"
          >
            Talk to Us
          </a>
        </div>
      </section>

      <section className="relative z-10 max-w-6xl mx-auto mt-24">
        <div className="text-center mb-12">
          <p className="text-green-400 uppercase tracking-[0.3em] text-xs">
            What is inside
          </p>
          <h2 className="text-4xl font-bold mt-3">Analytics Feature Set</h2>
          <p className="text-gray-400 mt-4 max-w-3xl mx-auto">
            Everything promised on the home page already runs quietly. When you want the UI, no ramp up is required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-lg hover:border-white/40 transition animate-floatUp"
            >
              <h3 className="text-2xl font-semibold mb-3">{card.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 max-w-4xl mx-auto mt-24 bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl">
        <p className="text-green-400 uppercase tracking-[0.3em] text-xs mb-4">
          Quiet Logging
        </p>
        <h2 className="text-3xl font-semibold mb-6">We still keep score.</h2>
        <ul className="space-y-4 text-gray-200">
          {quietTrackingNotes.map((note) => (
            <li key={note} className="leading-relaxed">
              {note}
            </li>
          ))}
        </ul>
      </section>

      <section className="relative z-10 max-w-5xl mx-auto mt-24 bg-gradient-to-r from-white/10 to-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl text-center">
        <p className="text-green-400 uppercase tracking-[0.4em] text-xs mb-4">
          Join the waitlist
        </p>
        <h2 className="text-4xl font-bold mb-4">Stay close to the signal.</h2>
        <p className="text-gray-300 mb-8">
          We will tap you first when the native analytics UI opens up. No spam, just meaningful updates.
        </p>
        {!submitted ? (
          <form
            onSubmit={submitWaitlist}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="px-3 py-3 rounded-xl w-full sm:w-80 bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-green-500 to-green-700 hover:opacity-90 px-5 py-3 rounded-xl font-semibold text-white shadow-lg disabled:opacity-60 transition"
            >
              {loading ? "Sending..." : "Join Waitlist"}
            </button>
          </form>
        ) : (
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold animate-successPulse">
            <span>Thanks for joining the signal list.</span>
          </div>
        )}

      </section>

      <footer className="relative z-10 mt-24 border-t border-white/10 pt-8 text-center text-sm text-gray-400 flex flex-col items-center gap-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.external ? "_blank" : undefined}
              rel={social.external ? "noreferrer" : undefined}
              className="flex items-center gap-2 hover:text-green-400 transition"
            >
              {social.label === "Email" ? (
                <>
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16v16H4z" />
                    <path d="M4 7l8 6 8-6" />
                  </svg>
                  {social.display}
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                    <path d="M13.47 10.58 19.94 3h-1.53l-5.64 6.63L8.3 3H3.07l6.78 9.86L3.07 21h1.53l6-7.05L15.7 21h5.23l-7.47-10.42Zm-2.12 2.5-.7-.99L5.7 4.3h2.43l4.49 6.3.7.99 5.35 7.51h-2.43l-4.89-6.02Z" />
                  </svg>
                  {social.display}
                </>
              )}
            </a>
          ))}
        </div>
        <p>© {new Date().getFullYear()} GetFluxly. All rights reserved.</p>
      </footer>
    </main>
  );
}
