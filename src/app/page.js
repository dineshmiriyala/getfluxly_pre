"use client";
import { useState, useRef } from "react";

const codeSamples = {
  template: [
    '<span class="token tag">&lt;layout&gt;</span>',
    '  <span class="token tag">&lt;hero</span> <span class="token attr-name">title</span>=<span class="token string">"Welcome to Fluxly"</span> <span class="token attr-name">cta</span>=<span class="token string">"Start tracking"</span> <span class="token punctuation">/&gt;</span>',
    '  <span class="token tag">&lt;p&gt;</span>Hi <span class="token punctuation">{{</span><span class="token variable">user.name</span><span class="token punctuation">}}</span>,<span class="token tag">&lt;/p&gt;</span>',
    '  <span class="token tag">&lt;p&gt;</span>We noticed <span class="token punctuation">{{</span><span class="token variable">event.last_page</span><span class="token punctuation">}}</span>.<span class="token tag">&lt;/p&gt;</span>',
    '  <span class="token tag">&lt;cta</span> <span class="token attr-name">href</span>=<span class="token string">"{{cta.url}}"</span><span class="token tag">&gt;</span>Finish setup<span class="token tag">&lt;/cta&gt;</span>',
    '<span class="token tag">&lt;/layout&gt;</span>',
  ].join("\n"),
  sdkInstall: [
    '<span class="token comment">&lt;!-- Fluxly Analytics --&gt;</span>',
    '<span class="token tag">&lt;script</span> <span class="token attr-name">src</span>=<span class="token string">"https://cdn.getfluxly.com/sdk.js"</span> <span class="token attr-name">async</span><span class="token tag">&gt;&lt;/script&gt;</span>',
    '<span class="token tag">&lt;script&gt;</span>',
    '  <span class="token variable">window</span>.<span class="token property">fluxly</span> <span class="token operator">=</span> <span class="token variable">window</span>.<span class="token property">fluxly</span> <span class="token operator">||</span> <span class="token punctuation">[]</span><span class="token punctuation">;</span>',
    "",
    '  <span class="token variable">fluxly</span>.<span class="token method">push</span><span class="token punctuation">([</span><span class="token string">"init"</span><span class="token punctuation">, {</span>',
    '    <span class="token property">projectId</span><span class="token punctuation">:</span> <span class="token string">"demo-project-id"</span><span class="token punctuation">,</span>',
    '    <span class="token property">apiKey</span><span class="token punctuation">:</span> <span class="token string">"pk_live_xxxxx"</span>',
    '  <span class="token punctuation">}]);</span>',
    "",
    '  <span class="token comment">// Auto page view</span>',
    '  <span class="token variable">fluxly</span>.<span class="token method">push</span><span class="token punctuation">([</span><span class="token string">"page"</span><span class="token punctuation">]);</span>',
    '<span class="token tag">&lt;/script&gt;</span>',
  ].join("\n"),
  sdkTrack: [
    '<span class="token comment">// Track events anywhere</span>',
    '<span class="token variable">fluxly</span>.<span class="token method">track</span><span class="token punctuation">(</span><span class="token string">"button_click"</span><span class="token punctuation">, {</span>',
    '  <span class="token property">button_id</span><span class="token punctuation">:</span> <span class="token string">"subscribe_cta"</span><span class="token punctuation">,</span>',
    '  <span class="token property">page</span><span class="token punctuation">:</span> <span class="token string">"/pricing"</span>',
    '<span class="token punctuation">});</span>',
    "",
    '<span class="token comment">// Identify users and create profiles</span>',
    '<span class="token variable">fluxly</span>.<span class="token method">identify</span><span class="token punctuation">(</span><span class="token string">"user_123"</span><span class="token punctuation">, {</span>',
    '  <span class="token property">email</span><span class="token punctuation">:</span> <span class="token string">"user@example.com"</span><span class="token punctuation">,</span>',
    '  <span class="token property">name</span><span class="token punctuation">:</span> <span class="token string">"Dinesh"</span>',
    '<span class="token punctuation">});</span>',
  ].join("\n"),
  httpPost: [
    '<span class="token keyword">import</span> <span class="token builtin">requests</span>',
    "",
    '<span class="token builtin">requests</span>.<span class="token method">post</span><span class="token punctuation">(</span>',
    '    <span class="token string">"https://api.getfluxly.com/v1/events"</span><span class="token punctuation">,</span>',
    '    <span class="token property">headers</span><span class="token punctuation">=</span><span class="token punctuation">{</span>',
    '        <span class="token string">"Content-Type"</span><span class="token punctuation">:</span> <span class="token string">"application/json"</span><span class="token punctuation">,</span>',
    '        <span class="token string">"X-API-Key"</span><span class="token punctuation">:</span> <span class="token string">"pk_live_xxxxx"</span><span class="token punctuation">,</span>',
    '    <span class="token punctuation">},</span>',
    '    <span class="token property">json</span><span class="token punctuation">=</span><span class="token punctuation">{</span>',
    '        <span class="token string">"event"</span><span class="token punctuation">:</span> <span class="token string">"subscription_created"</span><span class="token punctuation">,</span>',
    '        <span class="token string">"profile_id"</span><span class="token punctuation">:</span> <span class="token string">"user_123"</span><span class="token punctuation">,</span>',
    '        <span class="token string">"properties"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>',
    '            <span class="token string">"plan"</span><span class="token punctuation">:</span> <span class="token string">"starter"</span><span class="token punctuation">,</span>',
    '            <span class="token string">"amount"</span><span class="token punctuation">:</span> <span class="token number">2900</span><span class="token punctuation">,</span>',
    '            <span class="token string">"currency"</span><span class="token punctuation">:</span> <span class="token string">"USD"</span><span class="token punctuation">,</span>',
    '        <span class="token punctuation">},</span>',
    '        <span class="token string">"context"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>',
    '            <span class="token string">"source"</span><span class="token punctuation">:</span> <span class="token string">"django_backend"</span><span class="token punctuation">,</span>',
    '        <span class="token punctuation">},</span>',
    '    <span class="token punctuation">},</span>',
    '    <span class="token property">timeout</span><span class="token punctuation">=</span><span class="token number">2</span><span class="token punctuation">,</span>',
    '<span class="token punctuation">)</span>',
  ].join("\n"),
  httpHandler: [
    '<span class="token keyword">def</span> <span class="token function">handle_stripe_payment</span><span class="token punctuation">(</span><span class="token variable">event</span><span class="token punctuation">):</span>',
    '    <span class="token variable">user_id</span> <span class="token operator">=</span> <span class="token variable">event</span><span class="token punctuation">[</span><span class="token string">"data"</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">"object"</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">"customer"</span><span class="token punctuation">]</span>',
    "",
    '    <span class="token builtin">requests</span>.<span class="token method">post</span><span class="token punctuation">(</span>',
    '        <span class="token string">"https://api.getfluxly.com/v1/events"</span><span class="token punctuation">,</span>',
    '        <span class="token property">headers</span><span class="token punctuation">=</span><span class="token punctuation">{</span><span class="token string">"X-API-Key"</span><span class="token punctuation">:</span> <span class="token string">"pk_live_xxxxx"</span><span class="token punctuation">},</span>',
    '        <span class="token property">json</span><span class="token punctuation">=</span><span class="token punctuation">{</span>',
    '            <span class="token string">"event"</span><span class="token punctuation">:</span> <span class="token string">"payment_succeeded"</span><span class="token punctuation">,</span>',
    '            <span class="token string">"profile_id"</span><span class="token punctuation">:</span> <span class="token variable">user_id</span><span class="token punctuation">,</span>',
    '            <span class="token string">"properties"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>',
    '                <span class="token string">"amount"</span><span class="token punctuation">:</span> <span class="token variable">event</span><span class="token punctuation">[</span><span class="token string">"data"</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">"object"</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">"amount"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>',
    '                <span class="token string">"currency"</span><span class="token punctuation">:</span> <span class="token string">"USD"</span><span class="token punctuation">,</span>',
    '            <span class="token punctuation">},</span>',
    '        <span class="token punctuation">},</span>',
    '    <span class="token punctuation">)</span>',
  ].join("\n"),
};

const CodeBlock = ({ language, code }) => (
  <pre className={`code-block code-block--${language}`} data-lang={language}>
    <code dangerouslySetInnerHTML={{ __html: code }} />
  </pre>
);

const ArchitectureDiagram = () => (
  <div className="diagram">
    <svg viewBox="0 0 900 320" className="w-full" role="img" aria-label="Fluxly architecture diagram">
      <defs>
        <linearGradient id="edge" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="rgba(252,163,17,0.25)" />
          <stop offset="100%" stopColor="rgba(255,190,69,0.65)" />
        </linearGradient>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="rgba(252,163,17,0.8)" />
        </marker>
      </defs>
      <rect x="40" y="70" width="160" height="80" rx="16" fill="#0d1324" stroke="rgba(255,255,255,0.16)" />
      <text x="120" y="110" fill="#e8ecf2" fontSize="16" fontWeight="600" textAnchor="middle">
        Your App
      </text>
      <text x="120" y="132" fill="#9da8ba" fontSize="12" textAnchor="middle">
        web & backend
      </text>

      <rect x="260" y="40" width="180" height="80" rx="16" fill="#0d1324" stroke="rgba(255,255,255,0.16)" />
      <text x="350" y="82" fill="#e8ecf2" fontSize="16" fontWeight="600" textAnchor="middle">
        JS SDK
      </text>
      <text x="350" y="104" fill="#9da8ba" fontSize="12" textAnchor="middle">
        drop-in front-end
      </text>

      <rect x="260" y="170" width="180" height="80" rx="16" fill="#0d1324" stroke="rgba(255,255,255,0.16)" />
      <text x="350" y="212" fill="#e8ecf2" fontSize="16" fontWeight="600" textAnchor="middle">
        HTTP POST
      </text>
      <text x="350" y="234" fill="#9da8ba" fontSize="12" textAnchor="middle">
        server-to-server
      </text>

      <rect x="510" y="95" width="190" height="130" rx="18" fill="#0f1628" stroke="rgba(255,255,255,0.2)" />
      <text x="605" y="150" fill="#e8ecf2" fontSize="16" fontWeight="700" textAnchor="middle">
        Events & Profiles
      </text>
      <text x="605" y="172" fill="#9da8ba" fontSize="12" textAnchor="middle">
        timelines, traits, segments
      </text>

      <rect x="760" y="60" width="110" height="60" rx="12" fill="#0d1324" stroke="rgba(255,255,255,0.16)" />
      <text x="815" y="95" fill="#e8ecf2" fontSize="13" fontWeight="700" textAnchor="middle">
        SES
      </text>
      <rect x="760" y="135" width="110" height="60" rx="12" fill="#0d1324" stroke="rgba(255,255,255,0.16)" />
      <text x="815" y="170" fill="#e8ecf2" fontSize="13" fontWeight="700" textAnchor="middle">
        Mailgun
      </text>
      <rect x="760" y="210" width="110" height="60" rx="12" fill="#0d1324" stroke="rgba(255,255,255,0.16)" />
      <text x="815" y="245" fill="#e8ecf2" fontSize="13" fontWeight="700" textAnchor="middle">
        SMTP2GO
      </text>

      <path d="M200 110 L260 80" stroke="url(#edge)" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" />
      <path d="M200 110 L260 200" stroke="url(#edge)" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" />
      <path d="M440 80 L510 150" stroke="url(#edge)" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" />
      <path d="M440 210 L510 170" stroke="url(#edge)" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" />
      <path d="M700 150 L760 90" stroke="url(#edge)" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" />
      <path d="M700 160 L760 160" stroke="url(#edge)" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" />
      <path d="M700 170 L760 230" stroke="url(#edge)" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" />
    </svg>
  </div>
);

const ProfileDiagram = () => (
  <div className="diagram">
    <div className="grid-2 items-start">
      <div className="card-muted">
        <div className="flex items-center gap-10 mb-6">
          <div>
            <div className="pill">
              <span className="pill-dot" />
              Customer profile
            </div>
            <h4 className="text-xl font-semibold mt-3">Ava, CTO @Northwind</h4>
            <p className="text-sm text-[#9da8ba]">ava@northwind.dev</p>
            <p className="text-xs text-[#9da8ba] mt-1">Plan: Growth · Org ID: nw-1987</p>
          </div>
        </div>
        <div className="divider mb-4" />
        <div className="flex flex-col gap-4">
          {[
            { label: "Identified", desc: "identify('ava@northwind.dev', { plan: 'growth' })" },
            { label: "Page view", desc: "GET /docs/webhooks" },
            { label: "Custom event", desc: "track('workspace_invited', { seats: 3 })" },
            { label: "Email sent", desc: "Onboarding step 2 via SES" },
            { label: "Email opened", desc: "Latency guardrails article" },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <div className="timeline-dot" />
              <div>
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <p className="text-xs text-[#9da8ba]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card-muted">
        <p className="badge mb-3">Insights</p>
        <h4 className="text-xl font-semibold mb-3">Segment ready</h4>
        <p className="lead mb-4">
          Every web event and email outcome rolls into one profile. Build audiences on behaviour, traits, and message engagement without stitching tools.
        </p>
        <ul className="list-disc list-inside text-sm text-[#e8ecf2] space-y-2">
          <li>Lifecycle cohorts (onboarding, activation, churn-risk)</li>
          <li>Deliverability + engagement signals together</li>
          <li>API-first: fetch or sync profiles anywhere</li>
        </ul>
      </div>
    </div>
  </div>
);

const EditorSketch = () => (
  <div className="diagram">
    <div className="grid-2 items-center">
      <div>
        <div className="badge mb-3">Template editor</div>
        <h4 className="text-xl font-semibold mb-2">Code-grade templates</h4>
        <p className="lead">
          Build emails like product—partials, variables, and version-friendly snippets. Works whether you ship from SES, Mailgun, SMTP2GO, or your own SMTP.
        </p>
      </div>
      <div className="card-muted">
        <div className="flex gap-2 mb-3">
          <span className="badge">HTML</span>
          <span className="badge">Handlebars</span>
          <span className="badge">MJML</span>
        </div>
        <CodeBlock language="html" code={codeSamples.template} />
      </div>
    </div>
  </div>
);

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [ctaEmail, setCtaEmail] = useState("");
  const [ctaSubmitted, setCtaSubmitted] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState("sdk");
  const codeRef = useRef(null);

  const submitWaitlist = async (e, emailValue, setEmailValue, setFlagValue) => {
    e.preventDefault();
    setFlagValue(false);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  const reasons = [
    { title: "Unified stack", desc: "Analytics, messaging, and deliverability live together so teams act faster." },
    { title: "Keep your sending", desc: "Connect SES, Mailgun, SMTP2GO, or any SMTP and keep your reputation." },
    { title: "Single customer view", desc: "Events and email outcomes meet in one profile with a clear timeline." },
  ];

  const lifecycleFlows = [
    { name: "Onboarding drip", detail: "Page view + event triggers; branch by integration completed." },
    { name: "Trial expiry", detail: "Detect idle users, send reminders via your SMTP provider, suppress fatigued segments." },
    { name: "Churn win back", detail: "Re-engage on inactivity + missed invoices; include product usage context." },
  ];

    return (
    <main className="page-shell px-6">
      <header className="max-width py-8 flex items-center justify-between">
        <div className="pill">
          <span className="pill-dot" />
          GetFluxly
          </div>
        <div className="flex items-center gap-3 text-sm text-[#9da8ba]">
          <span className="hidden sm:inline">Built for technical founders</span>
          <div className="badge">JS SDK + HTTP</div>
          <div className="badge">BYO SMTP</div>
          </div>
      </header>

      <section className="section">
        <div className="max-width grid-2 items-center gap-12">
          <div>
            <p className="badge mb-4">Customer analytics and messaging on your infra</p>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
              Paste a few lines of code, track everything, unify profiles, elevate lifecycle marketing.
            </h1>
            <p className="lead mb-6">
              Fluxly gives you product analytics and event tracking, unified customer profiles (a lightweight CDP), and lifecycle email that runs on the SMTP provider you already trust (SES, Mailgun, SMTP2GO, or any SMTP).
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
                  <button
                className="cta-primary"
                    type="button"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("waitlist-main")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Join waitlist
                  </button>
                          <button
                className="cta-secondary"
                            type="button"
                onClick={() => codeRef.current?.scrollIntoView({ behavior: "smooth" })}
                          >
                View sample SDK
                          </button>
            </div>
            <p className="text-xs text-[#9da8ba]">
              Dev-friendly. No vendor lock. Use the providers you already have.
            </p>
          </div>
          <div className="surface p-6">
            <ArchitectureDiagram />
          </div>
        </div>
      </section>

      <section className="section-narrow">
        <div className="max-width surface p-6 grid-2 gap-10 items-center">
          <div>
            <p className="badge mb-2">5-minute install</p>
            <h3 className="text-2xl font-semibold mb-3">Paste, track, ship</h3>
            <p className="lead mb-3">
              Drop the SDK or HTTP calls and you immediately see page views, events, and profiles. No dashboards to wire before data flows.
            </p>
            <ul className="list-disc list-inside text-sm text-[#e8ecf2] space-y-2">
              <li>Paste the script or import via npm and init with your key.</li>
              <li>Track events from front-end or backend with one function.</li>
              <li>Identify users to merge sessions into unified profiles.</li>
            </ul>
          </div>
          <div className="card-muted">
            <p className="badge mb-2">What you get instantly</p>
            <p className="lead">Auto page views, event stream, unified profiles, provider-ready email sends.</p>
            <p className="text-sm text-[#e8ecf2] mt-3">
              Track which sources drive revenue and traffic so you double down on what matters.
            </p>
          </div>
        </div>
      </section>

      <section className="section-narrow">
        <div className="max-width">
          <div className="mb-8">
            <p className="badge mb-3">Why choose us</p>
            <h3 className="text-2xl font-semibold mb-2">Keep control and move fast</h3>
            <p className="lead">
              Fluxly gives you a clear path to analytics and lifecycle email while you keep ownership of data and sending.
            </p>
          </div>
          <div className="grid-3">
            {reasons.map((reason) => (
              <div key={reason.title} className="card-muted h-full">
                <p className="badge mb-3">{reason.title}</p>
                <p className="lead">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="architecture">
        <div className="max-width grid-2 items-start gap-10">
          <div>
            <p className="badge mb-3">How Fluxly fits your stack</p>
            <h2 className="text-3xl font-semibold mb-3">Analytics, profiles, and email on your infra</h2>
            <p className="lead mb-4">
              Ingest via JS SDK or HTTP POST. Fluxly unifies every user into a single profile with page views, custom events, and email outcomes, then sends through SES, Mailgun, SMTP2GO, or any SMTP you already use.
            </p>
            <ul className="list-disc list-inside text-sm text-[#e8ecf2] space-y-2">
              <li>Ingest: <span className="accent">SDK</span> for web, <span className="accent">HTTP</span> for backends.</li>
              <li>Profile: timelines, traits, and segments ready for automation and reporting.</li>
              <li>Send: plug in credentials for SES, Mailgun, SMTP2GO, or your own SMTP and keep deliverability ownership.</li>
            </ul>
          </div>
          <div className="surface p-6 card-muted">
            <p className="badge mb-2">Bring your own email</p>
            <p className="lead mb-3">
              Fluxly connects to your existing providers instead of forcing yet another ESP.
            </p>
            <ul className="list-disc list-inside text-sm text-[#e8ecf2] space-y-1">
              <li>SES for high-volume transactional</li>
              <li>Mailgun for marketing or product updates</li>
              <li>SMTP2GO or any SMTP for regional or legacy setups</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section" ref={codeRef} id="sdk">
        <div className="max-width grid-2 items-start gap-10">
          <div>
            <p className="badge mb-3">Developer quickstart</p>
            <h3 className="text-3xl font-semibold mb-3">SDK or simple HTTP</h3>
            <p className="lead mb-4">
              Add 2–3 lines to start tracking product analytics and email events. No lock-in; switch providers without touching code.
            </p>
          </div>
          <div className="surface p-5">
            <div className="code-tabs" role="tablist" aria-label="SDK code samples">
              <button
                type="button"
                className={`code-tab ${activeCodeTab === "sdk" ? "is-active" : ""}`}
                onClick={() => setActiveCodeTab("sdk")}
                aria-pressed={activeCodeTab === "sdk"}
              >
                JS SDK
              </button>
              <button
                type="button"
                className={`code-tab ${activeCodeTab === "http" ? "is-active" : ""}`}
                onClick={() => setActiveCodeTab("http")}
                aria-pressed={activeCodeTab === "http"}
              >
                HTTP API
              </button>
            </div>
            {activeCodeTab === "sdk" ? (
              <div className="code-stack">
                <p className="code-meta">Install script</p>
                <CodeBlock language="html" code={codeSamples.sdkInstall} />
                <p className="code-meta">Track and identify</p>
                <CodeBlock language="js" code={codeSamples.sdkTrack} />
              </div>
            ) : (
              <div className="code-stack">
                <p className="code-meta">Send events</p>
                <CodeBlock language="python" code={codeSamples.httpPost} />
                <p className="code-meta">Capture payments</p>
                <CodeBlock language="python" code={codeSamples.httpHandler} />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-width grid-2 items-center gap-10">
          <div className="surface p-6">
            <EditorSketch />
          </div>
          <div>
            <p className="badge mb-3">Templates & campaigns</p>
            <h3 className="text-3xl font-semibold mb-3">Treat emails like code</h3>
            <p className="lead mb-4">
              Compose emails with reusable blocks, variables, and code-friendly structure. Ship updates without fighting ESP-specific builders.
            </p>
            <ul className="list-disc list-inside text-sm text-[#e8ecf2] space-y-2">
              <li>Reusable partials and layouts</li>
              <li>Dynamic variables from profile traits & events</li>
              <li>Preview deliverability per provider</li>
            </ul>
                        </div>
                      </div>
      </section>

      <section className="section">
        <div className="max-width grid-2 items-center gap-10">
          <div>
            <p className="badge mb-3">Unified customer profile</p>
            <h3 className="text-3xl font-semibold mb-3">One timeline per user</h3>
            <p className="lead mb-4">
              Every behavioural event and every email outcome lands in the same profile. Build segments on reality, not guesses.
            </p>
          </div>
          <div className="surface p-6">
            <ProfileDiagram />
                        </div>
                      </div>
      </section>

      <section className="section-narrow">
        <div className="max-width grid-2 gap-10">
          <div>
            <p className="badge mb-2">Lifecycle automations</p>
            <h3 className="text-2xl font-semibold mb-3">Real-world flows</h3>
            <p className="lead mb-4">
              Trigger on behaviour, profile traits, and deliverability signals. Use your own SMTP provider so you keep reputation and logs.
            </p>
          </div>
          <div className="card-muted">
            <div className="flex flex-col gap-4">
              {lifecycleFlows.map((flow) => (
                <div key={flow.name}>
                  <p className="text-sm font-semibold text-white">{flow.name}</p>
                  <p className="text-xs text-[#9da8ba]">{flow.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-narrow">
        <div className="max-width surface p-6">
          <div className="grid-3">
            <div>
              <p className="badge mb-2">Deliverability first</p>
              <p className="lead">Own the SMTP layer; Fluxly orchestrates without taking over your sending reputation.</p>
            </div>
            <div>
              <p className="badge mb-2">API-first</p>
              <p className="lead">SDK + HTTP for ingest; REST for exporting profiles, events, and journeys.</p>
            </div>
            <div>
              <p className="badge mb-2">Privacy aware</p>
              <p className="lead">No third-party pixels here. You control where data lives and what is sent.</p>
        </div>
            <div>
              <p className="badge mb-2">Growth clarity</p>
              <p className="lead">See which sources drive revenue and traffic so you focus on what matters most.</p>
            </div>
      </div>
        </div>
      </section>

      <section className="section" id="waitlist-main">
        <div className="max-width surface p-8">
          <div className="grid-2 items-center gap-8">
            <div>
              <p className="badge mb-2">Launch waitlist</p>
              <h3 className="text-3xl font-semibold mb-3">Get early access</h3>
              <p className="lead">
                We’re onboarding teams that want analytics + lifecycle email without handing over their sending infra. Join the list—no spam, just product updates.
              </p>
            </div>
            <div>
          {!submitted ? (
            <form
                  onSubmit={(e) => submitWaitlist(e, email, setEmail, setSubmitted)}
                  className="flex flex-col gap-3"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                    className="px-4 py-3 rounded-xl bg-[#0d1324] border border-white/10 text-white placeholder-gray-500 focus:outline-none w-full"
                  />
                  <button type="submit" className="cta-primary w-full justify-center">
                    Join waitlist
              </button>
            </form>
          ) : (
                <div className="card-muted flex items-center gap-3">
                  <div className="timeline-dot" />
                  <div>
                    <p className="font-semibold text-white">Thanks for joining!</p>
                    <p className="text-xs text-[#9da8ba]">We’ll reach out with early access details.</p>
                  </div>
            </div>
          )}
              <p className="text-xs text-[#9da8ba] mt-3">
                Prefer to talk infra? Email <a className="accent" href="mailto:hello@getfluxly.com">hello@getfluxly.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="section-narrow">
        <div className="max-width flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#9da8ba]">
          <div className="flex items-center gap-2">
            <span className="pill-dot" />
            Built for teams who own their stack.
          </div>
          <div className="flex items-center gap-4">
            <a href="mailto:hello@getfluxly.com" className="hover:text-white">hello@getfluxly.com</a>
            <a href="https://twitter.com/madeByMD2" target="_blank" rel="noreferrer" className="hover:text-white">
            @madeByMD2
          </a>
            <span>© {new Date().getFullYear()} GetFluxly</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
