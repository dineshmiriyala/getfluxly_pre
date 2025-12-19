export const metadata = {
  title: "Fluxly Analytics | Unified product analytics, messaging, and activation",
  description:
    "Fluxly brings product analytics, customer messaging, and data activation into one place—combining what you expect from Customer.io and PostHog with higher data fluidity, accuracy, and speed to insight.",
  keywords: [
    "Fluxly analytics",
    "product analytics",
    "customer messaging",
    "data activation",
    "SaaS analytics",
    "SMB growth",
    "developer analytics platform",
    "Customer.io alternative",
    "PostHog alternative",
    "CDP",
    "behavioral email",
    "analytics setup",
    "event tracking",
    "US analytics platform",
    "EU GDPR-friendly analytics",
    "Australia data platform",
  ],
  alternates: {
    canonical: "/analytics",
  },
};

const featureColumns = [
  {
    title: "End-to-end analytics",
    summary:
      "Track product usage, build cohorts, and push campaigns without shuttling data between tools. Events, profiles, and messaging all live in one interface.",
    bullets: [
      "SDK + HTTP ingestion with automatic page views and traits",
      "Timeline view for every profile with events and email outcomes (built for SaaS and SMB growth teams)",
      "Audience builder that understands behaviour, traits, and deliverability signals for US/EU/AUS users",
    ],
  },
  {
    title: "Messaging with data trust",
    summary:
      "All the lifecycle power you expect from Customer.io, but backed by the same event stream that powers analytics—no sync lag, no mismatched IDs.",
    bullets: [
      "Send on your own SMTP (SES, Mailgun, SMTP2GO, or custom)",
      "Trigger emails from real-time product milestones and journeys",
      "Deliverability and engagement signals feed back into segments instantly",
    ],
  },
  {
    title: "Deeper product intelligence",
    summary:
      "PostHog-grade funnels, retention, and paths—plus messaging performance in the same dashboards so you can correlate product intent with conversions.",
    bullets: [
      "Funnels that mix product events and message interactions for SaaS plans and roles",
      "Retention curves across plans, roles, and geographies (US, EU, AUS ready)",
      "Pathing that highlights drop-offs and downstream revenue impact for subscription journeys",
    ],
  },
];

const useCases = [
  {
    title: "Activation and onboarding",
    description:
      "Map onboarding journeys to actual product actions. Trigger nudges when a user stalls, and measure how those nudges change activation and time-to-value.",
  },
  {
    title: "Revenue and expansion",
    description:
      "Follow the path from first touch to expansion. Attribute revenue to features, segments, and messages, then prioritize the experiences that move ARR.",
  },
  {
    title: "Customer health and retention",
    description:
      "Blend product usage, email engagement, and deliverability signals to forecast churn risk. Automate win-back plays directly from those signals.",
  },
  {
    title: "Platform observability",
    description:
      "Detect data drift, broken events, or unexpected drops in conversions. Fluxly keeps collection, governance, and delivery aligned in one place.",
  },
];

const setupSteps = [
  {
    title: "Install the SDK",
    detail:
      "Drop in the Fluxly JS SDK to capture page views, custom events, and identify calls. Server-side HTTP endpoints are ready for back-end and batch use.",
  },
  {
    title: "Model profiles and traits",
    detail:
      "Unify IDs across web, back end, and email. Profiles stay fresh because the same stream powers product analytics and lifecycle messaging.",
  },
  {
    title: "Activate anywhere",
    detail:
      "Build audiences, journeys, and alerts from one UI. Ship emails through your existing SMTP and pipe clean data to warehouses or destinations without lag.",
  },
];

export default function AnalyticsPage() {
  return (
    <div className="page-shell">
      <main className="max-width px-4 sm:px-6 lg:px-10">
        <section className="section pb-6">
          <div className="badge mb-4">Analytics & Lifecycle</div>
          <div className="grid-2 items-center gap-10">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                Fluxly Analytics: all your product insights and lifecycle messaging in one flow
              </h1>
              <p className="lead max-w-2xl">
                Fluxly combines the product analytics depth of PostHog with the lifecycle sophistication of Customer.io—powered by one
                clean event stream for higher data fluidity, accuracy, and SEO-ready documentation your team can share.
              </p>
              <p className="text-sm text-[#e8ecf2]">
                Built for SaaS owners, SMB growth teams, and developers in the US, EU, and Australia who need compliant, reliable analytics without juggling
                multiple tools.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="pill">Unified events + messaging</span>
                <span className="pill">Own your SMTP</span>
                <span className="pill">Funnels, cohorts, and journeys</span>
              </div>
            </div>
            <div className="surface p-6">
              <p className="badge mb-3">Flux — meaning flow</p>
              <h3 className="text-2xl font-semibold text-white mb-2">The name says what it does</h3>
              <p className="lead">
                Flux is short for <span className="accent font-semibold">flow</span>. In Fluxly, data flows seamlessly from collection to activation:
                events stream into profiles, profiles trigger journeys, and every message feeds new insights back into analytics. Nothing gets stuck between
                tools, and every team sees the same truth.
              </p>
            </div>
          </div>
        </section>

        <section className="section-narrow">
          <h2 className="text-3xl font-bold text-white mb-6">Built for analytics depth and delivery precision</h2>
          <div className="grid-3">
            {featureColumns.map((feature) => (
              <article key={feature.title} className="surface p-5">
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="lead mb-4">{feature.summary}</p>
                <ul className="list-disc list-inside text-sm text-[#e8ecf2] space-y-2">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="grid-2 items-start gap-8">
            <div>
              <div className="badge mb-3">Why teams choose Fluxly</div>
              <h2 className="text-3xl font-bold text-white mb-3">One-stop analytics and lifecycle HQ</h2>
              <p className="lead mb-5">
                Instead of syncing Customer.io and PostHog (and wrestling with identity, latency, and drift), Fluxly keeps analytics, messaging, and
                activation in one system. That means faster experiments, fewer maintenance hours, and dashboards that tie product behaviour directly to revenue.
              </p>
              <div className="card-muted">
                <h4 className="text-lg font-semibold text-white mb-2">Data fluidity, not fragile plumbing</h4>
                <p className="text-sm text-[#e8ecf2]">
                  Events, traits, deliverability, and engagement all flow through the same pipeline. You get consistent IDs, real-time updates, and analytics that
                  reflect what you actually ship—no more stale exports or patchwork ETL.
                </p>
              </div>
            </div>
            <div className="surface p-5 space-y-4">
              <h3 className="text-xl font-semibold text-white">Deep-dive feature highlights</h3>
              <div className="grid-2 gap-4">
                {[
                  {
                    title: "Journey intelligence",
                    detail: "Trigger emails, in-app nudges, and alerts from the same event stream that powers funnels and retention.",
                  },
                  {
                    title: "Profiles without drift",
                    detail: "Every profile shows product timelines, deliverability status, and message engagement in one place.",
                  },
                  {
                    title: "Governance built in",
                    detail: "Schema validation, identity resolution, and observability stop bad data before it hits experiments or campaigns.",
                  },
                  {
                    title: "SEO-ready docs mode",
                    detail: "Analytics stories render as fast, indexable pages so your technical content improves discoverability.",
                  },
                ].map((item) => (
                  <div key={item.title} className="card-muted">
                    <h4 className="text-base font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-[#e8ecf2]">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-narrow">
          <h2 className="text-3xl font-bold text-white mb-5">High-intent use cases</h2>
          <div className="grid-2 gap-4">
            {useCases.map((useCase) => (
              <article key={useCase.title} className="surface p-4">
                <h3 className="text-xl font-semibold text-white mb-2">{useCase.title}</h3>
                <p className="text-sm text-[#e8ecf2]">{useCase.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="badge mb-3">Fast setup</div>
          <h2 className="text-3xl font-bold text-white mb-6">Three steps to production-ready analytics</h2>
          <div className="grid-3">
            {setupSteps.map((step, idx) => (
              <article key={step.title} className="surface p-5">
                <div className="pill mb-3">
                  <span className="pill-dot" />
                  Step {idx + 1}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-[#e8ecf2] leading-relaxed">{step.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
