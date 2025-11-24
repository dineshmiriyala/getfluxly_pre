"use client";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [ctaEmail, setCtaEmail] = useState("");
  const [ctaSubmitted, setCtaSubmitted] = useState(false);
  const featuresRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

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

  useEffect(() => {
    const detect = () =>
      setIsTouch(
        typeof window !== "undefined" &&
          (window.matchMedia("(pointer: coarse)").matches ||
            "ontouchstart" in window)
      );
    detect();
    window.addEventListener("resize", detect);
    return () => window.removeEventListener("resize", detect);
  }, []);

  const submitWaitlist = async (
    e,
    emailValue,
    setEmailValue,
    setFlagValue
  ) => {
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

  const analyticsNodes = [
    {
      label: "Funnels",
      desc: "Understand where your users are coming from and where they fall off.",
    },
    {
      label: "Usage",
      desc: "Feature adoption, depth of engagement, and the steps that predict expansion.",
    },
    {
      label: "Churn",
      desc: "Quiet logins, billing pauses, and risk markers surfaced before they leave.",
    },
    {
      label: "Segments",
      desc: "Build cohorts from behavior, traits, and lifecycle stage that auto-refresh.",
    },
  ];

  const lifecycleNodes = [
    {
      label: "Signals",
      desc: "Send emails according to signals, segments, and milestones the moment they happen.",
    },
    {
      label: "Guardrails",
      desc: "Keep audiences clean with exclusions, rate limits, and journeys that respect fatigue.",
    },
    {
      label: "Builder",
      desc: "Branching journeys with delays, conditions, A/B splits, and webhooks in minutes.",
    },
  ];

  const timelineNodes = [
    {
      label: "Events",
      desc: "Every event from product, billing, and support lives in one shared stream.",
    },
    {
      label: "Messages",
      desc: "All triggered and bulk sends line up next to the user actions that caused them.",
    },
    {
      label: "Health",
      desc: "Delivery, opens, clicks, and status roll into the same view for faster answers.",
    },
  ];

  const BranchBlock = ({
    eyebrow,
    title,
    caption,
    nodes,
    variant = "primary",
    isTouchDevice,
  }) => {
    const [openDetail, setOpenDetail] = useState(false);
    const [titleHovered, setTitleHovered] = useState(false);
    const [activeNode, setActiveNode] = useState(null);

    const showDetail = openDetail || (!isTouchDevice && titleHovered);

    const baseBg =
      variant === "timeline"
        ? "bg-gradient-to-b from-[#111827]/80 to-[#0b1120]/90"
        : "bg-gradient-to-b from-[#0f172a]/80 to-[#0b1120]/90";

    return (
      <div className="relative group">
        <div className="hidden lg:block absolute left-1/2 -top-8 w-px h-8 -translate-x-1/2 bg-gradient-to-b from-[#FCA311]/60 via-[#14213D]/40 to-transparent"></div>
        <div
          className={`rounded-xl p-4 border border-white/10 shadow-xl backdrop-blur-xl h-full flex flex-col items-center gap-3 ${baseBg}`}
        >
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#FCA311] font-semibold">
            {eyebrow}
          </div>
          <button
            type="button"
            onClick={() => (isTouchDevice ? setOpenDetail((prev) => !prev) : null)}
            onMouseEnter={() => (!isTouchDevice ? setTitleHovered(true) : null)}
            onMouseLeave={() => (!isTouchDevice ? setTitleHovered(false) : null)}
            className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm font-semibold shadow-sm text-center hover:border-[#FCA311]/50 transition"
          >
            {title}
          </button>
          <div
            className={`text-gray-300 mt-1 text-xs text-center px-3 transition ${
              showDetail ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
            }`}
          >
            {caption}
          </div>
          <div className="hidden lg:block w-px h-5 bg-gradient-to-b from-[#FCA311]/60 via-[#14213D]/40 to-transparent"></div>

          <div className="relative w-full pt-4">
            <div className="hidden md:block absolute left-[8%] right-[8%] top-2 h-px bg-gradient-to-r from-transparent via-[#FCA311]/40 to-transparent"></div>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {nodes.map((node) => (
                <div
                  key={node.label}
                  className="group relative flex flex-col items-center"
                  onMouseEnter={() =>
                    !isTouchDevice ? setActiveNode(node.label) : null
                  }
                  onMouseLeave={() =>
                    !isTouchDevice ? setActiveNode(null) : null
                  }
                >
                  <div className="hidden md:block absolute -top-3 h-4 w-px bg-gradient-to-b from-[#FCA311]/50 via-[#14213D]/30 to-transparent"></div>
                  <button
                    type="button"
                    onClick={() =>
                      isTouchDevice
                        ? setActiveNode((prev) =>
                            prev === node.label ? null : node.label
                          )
                        : null
                    }
                    className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs shadow-sm cursor-default hover:border-[#FCA311]/50 transition"
                  >
                    {node.label}
                  </button>
                  {activeNode === node.label &&
                    (isTouchDevice ? (
                      <div className="fixed inset-0 z-50 flex items-center justify-center px-6 py-10 bg-black/40 backdrop-blur-sm">
                        <div className="relative w-full max-w-sm rounded-xl bg-[#0f1628] border border-white/15 shadow-2xl p-4 text-xs text-gray-200 text-left">
                          <button
                            type="button"
                            onClick={() => setActiveNode(null)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-white text-sm"
                            aria-label="Close detail"
                          >
                            ×
                          </button>
                          <p className="font-semibold text-white mb-1">{node.label}</p>
                          {node.desc}
                        </div>
                      </div>
                    ) : (
                      <div className="absolute left-1/2 top-[calc(100%+10px)] w-56 -translate-x-1/2 z-50 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1 transition">
                        <div className="relative rounded-lg bg-[#0f1628] border border-white/10 shadow-2xl p-3 text-xs text-gray-200 text-left">
                          {node.desc}
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen text-[#E5E5E5] px-6 py-20 relative overflow-visible bg-gradient-to-b from-[#0b0e18] via-[#0f1628] to-[#000000]">
      <div className="fixed top-6 left-6 z-50">
        <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[#FCA311] font-semibold">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FCA311] animate-pulse shadow-[0_0_0_6px_rgba(252,163,17,0.2)]"></span>
          GetFluxly
        </div>
      </div>
      <div
        id="cursor-glow"
        className="pointer-events-none fixed w-64 h-64 bg-[radial-gradient(circle,_rgba(252,163,17,0.35),_rgba(20,33,61,0.05),_transparent)] rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 z-0 opacity-80 mix-blend-screen"
      ></div>

      <section className="min-h-[85vh] flex flex-col justify-between items-center text-center pt-20 pb-14 gap-8 relative">
        <div className="max-w-2xl text-white animate-floatUp px-4">
          <h1 className="text-4xl sm:text-5xl font-bold font-hero mb-3 leading-tight bg-gradient-to-r from-[#FCA311] via-[#ffd166] to-[#FCA311] text-transparent bg-clip-text animate-shimmer animate-sparkle relative z-20 drop-shadow-[0_12px_45px_rgba(252,163,17,0.35)]">
            The all in one customer lifecycle platform for modern SaaS
          </h1>

          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.24em] text-[#FCA311] mb-3">
            Track. Segment. Automate. Deliver.
          </p>

          <p className="text-lg text-gray-300 mb-3">
            Track user behaviour, build segments, send automated messages, and monitor deliverability — all in one simple, affordable tool.
          </p>
          <p className="text-sm text-gray-400 mb-8">
            No bloated dashboards, no complex setups, no expensive ESP lock in. Analytics, segmentation, messaging, deliverability — in one unified platform.
          </p>

          {!submitted ? (
            <form
              onSubmit={(e) =>
                submitWaitlist(e, email, setEmail, setSubmitted)
              }
              className="flex gap-2 justify-center"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-3 py-2 rounded-lg w-64 sm:w-72 md:w-96 bg-[#0d1324] text-white placeholder-gray-500 border border-white/10 focus:ring-2 focus:ring-[#FCA311] focus:outline-none shadow-inner shadow-black/30"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-[#FCA311] to-[#ffbe45] hover:opacity-90 px-4 py-2 rounded-lg font-semibold text-sm sm:text-base text-black shadow-lg animate-softBounce animate-greenGlow magnetic-btn"
              >
                Join Waitlist
              </button>
            </form>
          ) : (
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#FCA311] to-[#ffbe45] text-black font-semibold animate-successPulse animate-greenGlow shadow-lg">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Thank you for joining us!
            </div>
          )}

          <p className="text-sm text-gray-400 mt-10">
            Zero spam. Only useful updates.
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 mb-10 md:mb-16">
          <button
            type="button"
            onClick={() =>
              featuresRef.current?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-[#FCA311] hover:text-white transition p-2 magnetic-btn"
            aria-label="Scroll to more details"
          >
            <svg
              className="w-8 h-8 animate-bounce drop-shadow-lg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
      </section>

      <section className="mt-24" ref={featuresRef}>
        <div className="max-w-6xl mx-auto animate-floatUp relative z-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 text-center bg-gradient-to-r from-[#FCA311] via-[#ffd166] to-white text-transparent bg-clip-text drop-shadow-[0_10px_40px_rgba(252,163,17,0.35)] leading-tight">
            See the lifecycle as one graph
          </h2>

          <p className="text-gray-300 text-center max-w-3xl mx-auto mb-16 text-lg">
            User activity fans into analytics and lifecycle marketing, then rejoins into one unified timeline. Modern branching visuals so teams can track, segment, automate, and deliver without hopping tools.
          </p>

          <div className="relative mt-12">
            <div className="pointer-events-none absolute -inset-6 bg-[radial-gradient(circle_at_center,_rgba(252,163,17,0.14),_transparent_50%)] blur-3xl"></div>

            <div className="flex flex-col items-center gap-3">
              <div className="rounded-full px-5 py-2 bg-white/5 border border-white/10 text-white font-semibold shadow-lg backdrop-blur">
                User activity
              </div>
              <div className="hidden lg:block w-px h-8 bg-gradient-to-b from-[#FCA311]/60 via-[#14213D]/40 to-transparent"></div>
              <div className="hidden lg:block relative w-full lg:w-4/5 h-12">
                <div className="absolute left-[12%] right-[12%] top-6 h-px bg-gradient-to-r from-transparent via-[#FCA311]/60 to-transparent"></div>
                <div className="absolute left-[22%] top-0 h-6 w-px bg-gradient-to-b from-[#FCA311]/60 via-[#14213D]/40 to-transparent"></div>
                <div className="absolute left-1/2 top-0 h-6 w-px -translate-x-1/2 bg-gradient-to-b from-[#FCA311]/60 via-[#14213D]/40 to-transparent"></div>
                <div className="absolute right-[22%] top-0 h-6 w-px bg-gradient-to-b from-[#FCA311]/60 via-[#14213D]/40 to-transparent"></div>
              </div>
            </div>

            <div className="relative mt-6">
              <div className="hidden lg:block absolute left-[10%] right-[10%] top-6 h-px bg-gradient-to-r from-transparent via-[#FCA311]/55 to-transparent"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10 -mt-1 lg:-mt-2">
                <BranchBlock
                  eyebrow="Analytics"
                  title="Product view"
                  caption="All your product analytics in one place."
                  nodes={analyticsNodes}
                  isTouchDevice={isTouch}
                />
                <BranchBlock
                  eyebrow="Lifecycle"
                  title="Messaging view"
                  caption="All your lifecycle automations in one place."
                  nodes={lifecycleNodes}
                  isTouchDevice={isTouch}
                />
                <BranchBlock
                  eyebrow="Timeline"
                  title="Unified view"
                  caption="All customer events, messages, and health in one place."
                  nodes={timelineNodes}
                  variant="timeline"
                  isTouchDevice={isTouch}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20 max-w-xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#FCA311] via-[#ffd166] to-white text-transparent bg-clip-text drop-shadow-[0_10px_30px_rgba(252,163,17,0.3)]">
          Interested? Join the List
        </h3>
        <p className="text-gray-300 mb-6">
          Be the first to get updates, private beta access, and early founder
          perks.
        </p>

        <form
          onSubmit={(e) =>
            submitWaitlist(e, ctaEmail, setCtaEmail, setCtaSubmitted)
          }
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={ctaEmail}
            onChange={(e) => setCtaEmail(e.target.value)}
            className="px-4 py-3 rounded-xl bg-[#0d1324] border border-white/10 text-white placeholder-gray-500 focus:outline-none w-full sm:w-72 shadow-inner shadow-black/30"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FCA311] to-[#ffbe45] font-semibold shadow-lg hover:opacity-90 transition w-full sm:w-auto text-black magnetic-btn"
          >
            Join Waitlist
          </button>
        </form>
        {ctaSubmitted && (
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#FCA311] to-[#ffbe45] text-black font-semibold animate-successPulse animate-greenGlow shadow-lg">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Thank you for joining us!
          </div>
        )}
      </section>

      <footer className="mt-24 border-t border-white/10 pt-8 text-center text-sm text-gray-400 flex flex-col items-center gap-4">
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
