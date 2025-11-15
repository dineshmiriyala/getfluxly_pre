"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [ctaEmail, setCtaEmail] = useState("");
  const [ctaSubmitted, setCtaSubmitted] = useState(false);
  const featuresRef = useRef(null);

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

  const features = [
    {
      title: "Bring Your Own Infra",
      desc: "Plug in SES, SendGrid, Mailjet, Postmark, or any SMTP stack and see exactly how much you save on infra versus the usual black-box ESP markups.",
      icon: "/bring-your-own-infra.png",
    },
    {
      title: "Deep Deliverability Analytics",
      desc: "Accurate open rates, click tracking, intelligent Apple MPP avoidance, reader time tracking, device/browser insights, and full webhook ingestion.",
      icon: "/deep-analytics.png",
      cta: {
        label: "Learn more about analytics",
        href: "/analytics",
      },
    },
    {
      title: "Spam Placement Testing",
      desc: "Know exactly where your emails land. Primary, Promotions, Updates, Spam — across providers.",
      icon: "/spam.png",
    },
    {
      title: "Drag & Drop Builder",
      desc: "Intelligent builder that learns your brand templates, suggests layouts, and can draft content with AI so campaigns stay on-brand and fast.",
      icon: "/drag-and-drop.png",
    },
    {
      title: "Automation Engine",
      desc: "Create workflows based on triggers such as webhook events, user actions, segment updates, and more.",
      icon: "/automation.png",
    },
    {
      title: "Segmentation",
      desc: "Create dynamic segments based on behavior, activity, metadata, tags, and custom rules.",
      icon: "/segmentation.png",
    },
    {
      title: "A/B Testing",
      desc: "Test subject lines, content, CTAs, from-names, sending times, and measure true performance.",
      icon: "/ab-testing.png",
    },
    {
      title: "Presend Checks",
      desc: "Automatic presend deliverability checks, seed tests, and authentication validation so every campaign starts with inbox confidence.",
      icon: "/presend-checks.png",
    },
    {
      title: "And Many More Coming",
      desc: "Inbox previews, native SMTP sending, advanced compliance tooling, and deep partner integrations are on the roadmap.",
      icon: "/more.png",
    },
  ];

  return (
    <main className="min-h-screen text-gray-900 dark:text-white px-6 py-20 relative overflow-visible bg-white bg-[radial-gradient(circle_at_top,_#ffffff,_#e9ffe9)] dark:bg-black dark:bg-none">
      <div
        id="cursor-glow"
        className="pointer-events-none fixed w-56 h-56 bg-[radial-gradient(circle,_rgba(253,230,138,0.9),_rgba(251,191,36,0.35),_transparent)] dark:bg-[radial-gradient(circle,_rgba(74,222,128,0.45),_rgba(16,185,129,0.1),_transparent)] rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 z-0 opacity-90 dark:opacity-100 mix-blend-multiply dark:mix-blend-screen"
      ></div>

      <section className="min-h-screen flex flex-col justify-between items-center text-center pt-28 pb-16 gap-8 relative">
        <div className="max-w-2xl text-black dark:text-white animate-floatUp px-4">
          <h1 className="text-6xl font-bold font-hero mb-4 leading-tight bg-gradient-to-r from-green-400 via-green-500 to-green-700 text-transparent bg-clip-text animate-shimmer animate-sparkle relative z-20">
            GetFluxly
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Analytics-first email platform with deep deliverability insights and
            real-time metrics: powered by SES or your own infra.
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
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold animate-successPulse animate-greenGlow shadow-lg">
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

          <p className="text-sm text-gray-600 mt-10">
            Zero spam. Only useful updates.
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 mb-10 md:mb-16">
          <button
            type="button"
            onClick={() =>
              featuresRef.current?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-green-400 hover:text-green-300 transition p-2 magnetic-btn"
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
        <div className="max-w-5xl mx-auto animate-floatUp relative z-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 text-center bg-gradient-to-r from-green-400 via-green-500 to-green-700 text-transparent bg-clip-text drop-shadow-lg leading-tight">
            Built for modern senders
          </h2>

          <p className="text-gray-500 dark:text-gray-400 text-center max-w-2xl mx-auto mb-16 text-lg">
            The next generation analytics-first email platform: built for speed,
            clarity, and precision.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-floatUp">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl p-6 bg-gradient-to-br from-white to-gray-100 text-gray-700 border border-gray-300 shadow-lg dark:from-gray-800/40 dark:to-gray-900/50 dark:text-gray-300 dark:border-white/10 backdrop-blur-xl hover:scale-[1.03] transition-all duration-300 flex flex-col h-full"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x =
                    (e.clientX - rect.left - rect.width / 2) / 20;
                  const y =
                    (e.clientY - rect.top - rect.height / 2) / 20;
                  e.currentTarget.style.transform = `rotateX(${-y}deg) rotateY(${x}deg) scale(1.03)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "rotateX(0deg) rotateY(0deg) scale(1)";
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-green-500 to-green-700 flex items-center justify-center text-white shadow-md">
                    <Image
                      src={f.icon}
                      alt={`${f.title} icon`}
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-bold">{f.title}</h3>
                </div>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
                  {f.desc}
                </p>
                {f.cta && (
                  <a
                    href={f.cta.href}
                    className="mt-4 inline-flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-semibold"
                  >
                    {f.cta.label}
                    <svg
                      viewBox="0 0 24 24"
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 6h12v12" />
                      <path d="M6 18 18 6" />
                    </svg>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-20 max-w-xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-600 text-transparent bg-clip-text">
          Interested? Join the List
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
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
            className="px-4 py-3 rounded-xl bg-white border border-gray-300 text-black placeholder-gray-500 dark:bg-gray-900 dark:border-white/10 dark:text-white focus:outline-none w-full sm:w-72"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-700 font-semibold shadow-lg hover:opacity-90 transition w-full sm:w-auto magnetic-btn"
          >
            Join Waitlist
          </button>
        </form>
        {ctaSubmitted && (
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold animate-successPulse animate-greenGlow shadow-lg">
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

      <footer className="mt-24 border-t border-white/10 pt-8 text-center text-sm text-gray-500 dark:text-gray-400 flex flex-col items-center gap-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href="mailto:hello@getfluxly.com"
            className="flex items-center gap-2 hover:text-green-500 transition"
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
            className="flex items-center gap-2 hover:text-green-500 transition"
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
