"use client";
import { useEffect, useState } from "react";

export default function Details() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

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

  // Cursor torch follow (dark mode only)
  useEffect(() => {
    const glow = document.getElementById("cursor-glow-details");

    const handleMove = (e) => {
      if (!glow) return;
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Magnetic buttons
  useEffect(() => {
    const buttons = document.querySelectorAll(".magnetic-btn");
    const strength = 25;

    const handleMove = (e, btn) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
    };

    const reset = (btn) => {
      btn.style.transform = "translate(0,0)";
    };

    buttons.forEach((btn) => {
      const move = (e) => handleMove(e, btn);
      const leave = () => reset(btn);

      btn.addEventListener("mousemove", move);
      btn.addEventListener("mouseleave", leave);

      btn._move = move;
      btn._leave = leave;
    });

    return () => {
      buttons.forEach((btn) => {
        btn.removeEventListener("mousemove", btn._move);
        btn.removeEventListener("mouseleave", btn._leave);
      });
    };
  }, []);

  const features = [
    {
      title: "Use Your Own Infra",
      desc: "Bring your own email infrastructure: SES, SendGrid, Mailjet, Elastic Email, Postmark or any SMTP. We simply make it powerful.",
    },
    {
      title: "Deep Deliverability Analytics",
      desc: "Accurate open rates, click tracking, intelligent Apple MPP avoidance, reader time tracking, device/browser insights, and full webhook ingestion.",
    },
    {
      title: "Spam Placement Testing",
      desc: "Know exactly where your emails land. Primary, Promotions, Updates, Spam — across providers.",
    },
    {
      title: "Drag & Drop Email Builder",
      desc: "Pixel-perfect editor with blocks, layouts, reusable components, custom HTML, and responsive preview.",
    },
    {
      title: "Automation Engine",
      desc: "Create workflows based on triggers such as webhook events, user actions, segment updates, and more.",
    },
    {
      title: "Segmentation",
      desc: "Create dynamic segments based on behavior, activity, metadata, tags, and custom rules.",
    },
    {
      title: "A/B Testing",
      desc: "Test subject lines, content, CTAs, from-names, sending times, and measure true performance.",
    },
    {
      title: "And Many More Coming",
      desc: "This is just the beginning inbox previews, Support with many cross platforms, Native SMTP sending, and more are on the roadmap.",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-200 text-black dark:bg-gradient-to-b dark:from-black dark:via-gray-900 dark:to-gray-950 dark:text-white px-6 py-20 relative overflow-visible">
      <div
        id="cursor-glow-details"
        className="pointer-events-none fixed w-56 h-56 hidden dark:block bg-green-400/25 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 z-0"
      ></div>
      <div className="max-w-5xl mx-auto animate-floatUp relative z-20">
        <h1 className="text-6xl font-extrabold mb-6 text-center bg-gradient-to-r from-green-400 via-green-500 to-green-700 text-transparent bg-clip-text drop-shadow-lg leading-tight">
          GetFluxly Features
        </h1>

        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16 text-lg animate-floatUp">
          The next generation analytics first email platform: built for speed, clarity, and precision.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 animate-floatUp">
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 bg-gradient-to-br from-white to-gray-100 text-gray-700 border border-gray-300 shadow-lg dark:from-gray-800/40 dark:to-gray-900/50 dark:text-gray-300 dark:border-white/10 backdrop-blur-xl hover:scale-[1.03] transition-all duration-300"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) / 20;
                const y = (e.clientY - rect.top - rect.height / 2) / 20;
                e.currentTarget.style.transform = `rotateX(${ -y }deg) rotateY(${ x }deg) scale(1.03)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-green-700 flex items-center justify-center text-xl font-bold shadow-md">
                  {i + 1}
                </div>
                <h2 className="text-2xl font-bold">{f.title}</h2>
              </div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Subscribe CTA */}
        <div className="mt-20 max-w-xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-600 text-transparent bg-clip-text">
            Interested? Join the List
          </h3>
          <p className="text-gray-400 mb-6">
            Be the first to get updates, private beta access, and early founder perks.
          </p>

          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white border border-gray-300 text-black placeholder-gray-500 dark:bg-gray-900 dark:border-white/10 dark:text-white focus:outline-none w-full sm:w-72"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-700 font-semibold shadow-lg hover:opacity-90 transition w-full sm:w-auto magnetic-btn"
            >
              Join Waitlist
            </button>
          </form>
          {submitted && (
            <p className="text-green-500 mt-4">You're on the list!</p>
          )}
        </div>

        <div className="text-center mt-20">
          <a
            href="/"
            className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-700 font-semibold shadow-lg hover:opacity-90 transition magnetic-btn"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}