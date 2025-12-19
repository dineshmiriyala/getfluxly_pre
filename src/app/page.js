"use client";
import { useEffect, useState } from "react";

const CodeBlock = ({ label, code }) => (
  <div className="rounded-2xl border border-white/10 bg-[#0c1324]/80 shadow-2xl p-4 text-left">
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs uppercase tracking-[0.22em] text-[#FCA311] font-semibold">
        {label}
      </span>
      <span className="text-[11px] text-gray-400">copy-paste ready</span>
    </div>
    <pre className="text-sm leading-6 text-gray-200 overflow-x-auto whitespace-pre-wrap">
      <code>{code}</code>
    </pre>
  </div>
);

const TimelineDiagram = () => (
  <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#0d1324]/90 to-[#080b16]/90 p-6 shadow-2xl">
    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
      <span className="uppercase tracking-[0.22em] text-[#FCA311] font-semibold">Unified profile</span>
      <span>live updates</span>
    </div>
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#FCA311] via-white/20 to-transparent"></div>
      {["Sign up", "Project created", "Email sent", "Clicked CTA", "Billing upgraded"].map((item) => (
        <div key={item} className="flex items-start gap-4 mb-4">
          <div className="relative w-4 h-4 mt-1">
            <span className="absolute inset-0 rounded-full bg-[#FCA311] shadow-[0_0_0_6px_rgba(252,163,17,0.2)]"></span>
          </div>
          <div className="flex-1">
            <div className="text-white font-semibold text-sm">{item}</div>
            <div className="text-xs text-gray-400">Captured, stitched, and ready for triggers.</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const instrumentationPaths = [
  {
    title: "JS SDK",
    detail: "Install one snippet, auto-capture identity, traits, and events from the browser or Node runtimes.",
  },
  {
    title: "HTTP ingest",
    detail: "Post raw events from anywhere — backends, queues, CLIs — without extra dependencies.",
  },
  {
    title: "Schemas that stay clean",
    detail: "Typed payload hints, replay protection, and automatic enrichment keep data trustworthy.",
  },
];

const connectors = [
  {
    name: "Amazon SES",
    note: "Verified senders, templated emails, and bounce handling ready on day one.",
  },
  {
    name: "Mailgun",
    note: "Bring domains, keep deliverability settings, and mirror events back into profiles.",
  },
  {
    name: "SMTP2GO",
    note: "Connect credentials securely, monitor throughput, and respect rate limits automatically.",
  },
  {
    name: "Your SMTP",
    note: "Stay in control with your own infra while Fluxly orchestrates retries and fallbacks.",
  },
];

const analytics = [
  {
    title: "Real-time funnels",
    desc: "Track adoption by feature and stage without creating new dashboards for every question.",
  },
  {
    title: "Lifecycle intelligence",
    desc: "Spot churn risk, expansion signals, and activation gaps directly from customer journeys.",
  },
  {
    title: "Customer profiles",
    desc: "Every event, trait, email, and delivery status is stitched into a single living record.",
  },
  {
    title: "Team-friendly",
    desc: "Product, GTM, and support share the same truth — no exports, no vendor lock-in.",
  },
];

const automationNodes = [
  { label: "Event", detail: "List created" },
  { label: "Condition", detail: "Plan = Growth" },
  { label: "Action", detail: "Send onboarding" },
  { label: "Delay", detail: "Wait 3 hours" },
  { label: "Branch", detail: "Opened?" },
  { label: "Action", detail: "Send follow-up" },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [ctaEmail, setCtaEmail] = useState("");
  const [ctaSubmitted, setCtaSubmitted] = useState(false);

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

  useEffect(() => {
    const buttons = document.querySelectorAll(".magnetic-btn");
    const listeners = [];
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
      listeners.push([btn, handleMove, reset]);
    });
    return () =>
      listeners.forEach(([btn, handleMove, reset]) => {
        btn.removeEventListener("mousemove", handleMove);
        btn.removeEventListener("mouseleave", reset);
      });
  }, []);

  const submitWaitlist = async (e, emailValue, setEmailValue, setFlagValue) => {
    e.preventDefault();
    setFlagValue(false);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailValue }),
      });

      if (res.ok) {
        setFlagValue(true);
        setEmailValue("");
      } else {
        alert("Something went wrong. Try again.");
      }
    } catch (err) {
      alert("Network error. Try again.");
    }
  };

  return (
    <main className="min-h-screen text-[#E5E5E5] px-6 py-16 sm:py-20 relative overflow-hidden bg-gradient-to-b from-[#060910] via-[#0b1427] to-[#020305]">
      <div className="fixed top-6 left-6 z-50">
        <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[#FCA311] font-semibold">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FCA311] animate-pulse shadow-[0_0_0_6px_rgba(252,163,17,0.2)]"></span>
          GetFluxly
        </div>
      </div>

      <div
        id="cursor-glow"
        className="pointer-events-none fixed w-72 h-72 bg-[radial-gradient(circle,_rgba(252,163,17,0.25),_rgba(20,33,61,0.08),_transparent)] rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 z-0 opacity-70 mix-blend-screen"
      ></div>

      <div className="absolute -left-24 -top-24 w-80 h-80 bg-[#FCA311]/10 rounded-full blur-[140px]"></div>
      <div className="absolute -right-24 top-32 w-96 h-96 bg-[#14213D]/30 rounded-full blur-[180px]"></div>

      <section className="relative max-w-6xl mx-auto text-center pt-16 pb-12 flex flex-col gap-10">
        <div className="inline-flex items-center gap-2 mx-auto px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-[0.24em] text-[#FCA311]">
          Product analytics + messaging + deliverability
        </div>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-hero leading-tight mb-4 bg-gradient-to-r from-[#FCA311] via-[#ffd166] to-white text-transparent bg-clip-text animate-shimmer">
            Instrument once. Understand users. Send with your own infrastructure.
          </h1>
          <p className="text-lg text-gray-300 mb-4">
            Drop a few lines of code and Fluxly builds a universal customer profile, web analytics, and lifecycle messaging — powered by the email providers you already trust.
          </p>
          <p className="text-sm text-gray-400">
            JavaScript SDK and HTTP ingest for product events. Email delivery through SES, Mailgun, SMTP2GO, or your own SMTP with live analytics stitched back to every user.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          {!submitted ? (
            <form
              onSubmit={(e) => submitWaitlist(e, email, setEmail, setSubmitted)}
              className="flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Work email"
                className="px-4 py-3 rounded-xl w-72 sm:w-80 bg-[#0d1324] text-white placeholder-gray-500 border border-white/10 focus:ring-2 focus:ring-[#FCA311] focus:outline-none shadow-inner shadow-black/30"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-[#FCA311] to-[#ffbe45] hover:opacity-90 px-5 py-3 rounded-xl font-semibold text-base text-black shadow-lg animate-greenGlow magnetic-btn"
              >
                Join the waitlist
              </button>
            </form>
          ) : (
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#FCA311] to-[#ffbe45] text-black font-semibold animate-successPulse animate-greenGlow shadow-lg">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              You&apos;re on the list
            </div>
          )}
          <div className="text-xs text-gray-400">No spam. Shipping updates only.</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left mt-6">
          {[
            {
              label: "Events to email",
              text: "Every tracked event can trigger journeys, experiments, or a single send in minutes.",
            },
            {
              label: "Bring your infra",
              text: "Connect SES, Mailgun, SMTP2GO, or your SMTP — Fluxly handles routing and failovers.",
            },
            {
              label: "Designed for teams",
              text: "Product, marketing, and support see the same profile, metrics, and delivery health.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur flex gap-3"
            >
              <div className="mt-1 w-2 h-8 rounded-full bg-gradient-to-b from-[#FCA311] to-[#14213D]"></div>
              <div>
                <div className="text-white font-semibold">{item.label}</div>
                <div className="text-sm text-gray-300">{item.text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative max-w-6xl mx-auto mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#FCA311] via-[#ffd166] to-white text-transparent bg-clip-text">
            Instrumentation that respects your stack
          </h2>
          <p className="text-gray-300">
            Use the JavaScript SDK for instant web analytics or post events directly from your services. Fluxly normalizes traits, deduplicates users, and keeps journeys in sync without brittle ETL work.
          </p>
          <div className="grid grid-cols-1 gap-3">
            {instrumentationPaths.map((item) => (
              <div key={item.title} className="flex gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-full bg-[#FCA311]/15 flex items-center justify-center text-[#FCA311] font-bold text-sm">{item.title[0]}</div>
                <div>
                  <div className="text-white font-semibold">{item.title}</div>
                  <div className="text-sm text-gray-300">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <CodeBlock
            label="JavaScript SDK"
            code={`import { initFluxly } from "@getfluxly/sdk"\n\nconst fluxly = initFluxly({ projectId: "demo_123" });\nfluxly.identify({ id: "user_42", email: "ana@acme.dev", plan: "Growth" });\nfluxly.track("Project created", { source: "onboarding", region: "us-east" });`}
          />
          <CodeBlock
            label="HTTP POST"
            code={`POST https://api.getfluxly.com/events\nAuthorization: Bearer <key>\n\n{\n  "user_id": "user_42",\n  "event": "Email opened",\n  "properties": { "campaign": "onboarding", "device": "mobile" }\n}`}
          />
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#0f172a] to-[#0b1322] p-4 shadow-xl">
            <div className="flex items-center justify-between text-sm text-gray-300">
              <span className="font-semibold text-white">Data flow</span>
              <span className="text-xs text-gray-400">diagram</span>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 text-xs text-gray-200">
              {[
                "SDK / HTTP",
                "Event pipeline",
                "Universal profile",
                "Analytics",
                "Journeys",
              ].map((step, idx, arr) => (
                <div key={step} className="flex items-center gap-2 flex-1">
                  <div className="relative w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[11px] text-center px-1">
                    <span className="text-[#FCA311] font-semibold">{idx + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white text-sm">{step}</div>
                    <div className="text-[11px] text-gray-400">real-time</div>
                  </div>
                  {idx !== arr.length - 1 && (
                    <div className="flex-1 h-px bg-gradient-to-r from-[#FCA311]/50 to-transparent"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#0d1324] to-[#0a0f1d] p-6 shadow-2xl space-y-4">
          <div className="text-xs uppercase tracking-[0.24em] text-[#FCA311] font-semibold">Email infrastructure</div>
          <h3 className="text-3xl font-bold text-white">Send through SES, Mailgun, SMTP2GO, or your own SMTP</h3>
          <p className="text-gray-300">
            Fluxly connects to your preferred provider, manages credentials securely, and feeds delivery metrics back into user profiles and journeys.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {connectors.map((connector) => (
              <div key={connector.name} className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold">{connector.name}</span>
                  <span className="text-[10px] text-[#FCA311] px-2 py-1 rounded-full bg-[#FCA311]/10">connected</span>
                </div>
                <div className="text-sm text-gray-300 mt-1">{connector.note}</div>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-dashed border-[#FCA311]/40 p-4 bg-white/5 text-sm text-gray-200">
            <div className="font-semibold text-white mb-2">Template studio</div>
            <p className="text-gray-300">Compose transactional and lifecycle emails with a built-in code editor. Reuse variables, preview states, and ship without leaving the data graph.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#0b1322] to-[#050912] p-6 shadow-2xl">
          <div className="flex items-center justify-between text-sm text-gray-300">
            <span className="font-semibold text-white">Delivery diagram</span>
            <span className="text-xs text-gray-400">live analytics</span>
          </div>
          <svg viewBox="0 0 420 260" className="w-full mt-4" role="img" aria-label="Email delivery flow diagram">
            <defs>
              <linearGradient id="diagGradient" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#FCA311" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#14213D" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <rect x="10" y="10" width="400" height="240" rx="18" fill="url(#diagGradient)" opacity="0.12" />
            <g stroke="#FCA311" strokeWidth="2" strokeLinecap="round" fill="none">
              <path d="M70 80 L200 80" />
              <path d="M200 80 C240 80 240 130 200 130 L120 130" />
              <path d="M200 130 C270 130 270 190 200 190 L150 190" />
            </g>
            <g>
              <circle cx="70" cy="80" r="22" fill="#0d1324" stroke="#FCA311" strokeWidth="2" />
              <text x="70" y="85" textAnchor="middle" fill="#FCA311" fontSize="12" fontWeight="bold">SDK</text>
              <circle cx="200" cy="80" r="22" fill="#0d1324" stroke="#FCA311" strokeWidth="2" />
              <text x="200" y="85" textAnchor="middle" fill="#FCA311" fontSize="12" fontWeight="bold">Profile</text>
              <circle cx="120" cy="130" r="22" fill="#0d1324" stroke="#FCA311" strokeWidth="2" />
              <text x="120" y="135" textAnchor="middle" fill="#FCA311" fontSize="12" fontWeight="bold">SES</text>
              <circle cx="200" cy="130" r="22" fill="#0d1324" stroke="#FCA311" strokeWidth="2" />
              <text x="200" y="135" textAnchor="middle" fill="#FCA311" fontSize="12" fontWeight="bold">Rules</text>
              <circle cx="150" cy="190" r="22" fill="#0d1324" stroke="#FCA311" strokeWidth="2" />
              <text x="150" y="195" textAnchor="middle" fill="#FCA311" fontSize="12" fontWeight="bold">Reports</text>
            </g>
            <g fill="#E5E5E5" fontSize="11" textAnchor="start">
              <text x="95" y="75">identify()</text>
              <text x="225" y="75">dedupe + enrich</text>
              <text x="230" y="135">routing + limits</text>
              <text x="180" y="200">opens, clicks, bounces</text>
            </g>
          </svg>
          <p className="text-sm text-gray-300 mt-4">
            Every email event is stitched back to the customer record so you can audit deliverability, automate journeys, and troubleshoot fast.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {analytics.map((item) => (
          <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur">
            <div className="text-xs uppercase tracking-[0.24em] text-[#FCA311] font-semibold mb-2">{item.title}</div>
            <div className="text-sm text-gray-300">{item.desc}</div>
          </div>
        ))}
        <TimelineDiagram />
      </section>

      <section className="max-w-6xl mx-auto mt-16 rounded-2xl border border-white/10 bg-gradient-to-r from-[#0d1324] via-[#0b1220] to-[#070b16] p-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
          <div className="lg:w-1/3 space-y-3">
            <div className="text-xs uppercase tracking-[0.24em] text-[#FCA311] font-semibold">Journeys</div>
            <h3 className="text-3xl font-bold text-white">Automate with confidence</h3>
            <p className="text-gray-300">
              Build branching journeys with guardrails, delays, and audience definitions that respect fatigue. Everything runs on top of the same data graph that powers analytics.
            </p>
          </div>
          <div className="lg:flex-1 w-full overflow-x-auto">
            <div className="min-w-[520px] grid grid-cols-3 gap-4">
              {automationNodes.map((node, idx) => (
                <div key={`${node.label}-${idx}`} className="relative p-4 rounded-xl bg-white/5 border border-white/10 shadow-lg">
                  <div className="text-xs text-[#FCA311] font-semibold">{node.label}</div>
                  <div className="text-sm text-white font-semibold">{node.detail}</div>
                  {idx !== automationNodes.length - 1 && (
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-px bg-gradient-to-r from-[#FCA311]/60 to-transparent"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 max-w-4xl mx-auto text-center">
        <div className="text-xs uppercase tracking-[0.24em] text-[#FCA311] font-semibold">Join the launch list</div>
        <h4 className="text-3xl font-bold text-white mt-2 mb-3">Be first to ship with Fluxly</h4>
        <p className="text-gray-300 mb-6">
          Get early access, shared templates, and migration help for SES, Mailgun, or your SMTP stack.
        </p>
        <form
          onSubmit={(e) => submitWaitlist(e, ctaEmail, setCtaEmail, setCtaSubmitted)}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <input
            type="email"
            placeholder="Work email"
            value={ctaEmail}
            onChange={(e) => setCtaEmail(e.target.value)}
            className="px-4 py-3 rounded-xl bg-[#0d1324] border border-white/10 text-white placeholder-gray-500 focus:outline-none w-full sm:w-72 shadow-inner shadow-black/30"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FCA311] to-[#ffbe45] font-semibold shadow-lg hover:opacity-90 transition w-full sm:w-auto text-black magnetic-btn"
          >
            Join waitlist
          </button>
        </form>
        {ctaSubmitted && (
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#FCA311] to-[#ffbe45] text-black font-semibold animate-successPulse animate-greenGlow shadow-lg">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Thank you for joining us!
          </div>
        )}
      </section>

      <footer className="mt-16 border-t border-white/10 pt-8 text-center text-sm text-gray-400 flex flex-col items-center gap-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href="mailto:hello@getfluxly.com"
            className="flex items-center gap-2 hover:text-[#FCA311] transition"
          >
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
            hello@getfluxly.com
          </a>
          <a
            href="https://twitter.com/madeByMD2"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-[#FCA311] transition"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M13.47 10.58 19.94 3h-1.53l-5.64 6.63L8.3 3H3.07l6.78 9.86L3.07 21h1.53l6-7.05L15.7 21h5.23l-7.47-10.42Zm-2.12 2.5-.7-.99L5.7 4.3h2.43l4.49 6.3.7.99 5.35 7.51h-2.43l-4.89-6.02Z" />
            </svg>
            @madeByMD2
          </a>
        </div>
        <p>© {new Date().getFullYear()} GetFluxly. All rights reserved.</p>
      </footer>
    </main>
  );
}
