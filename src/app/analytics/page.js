import Link from "next/link";
import AnalyticsWaitlistForm from "./WaitlistForm";
import CodeTabs from "./CodeTabs";

export const metadata = {
  title: "Analytics with Fluxly: Product analytics for SaaS and SMB teams",
  description:
    "Learn how Fluxly gives SaaS founders, SMB owners, and product teams in the US and EU product analytics, unified customer profiles, and lifecycle messaging in one tool, combining what you get from PostHog and Customer.io with better data flow.",
};

export default function AnalyticsPage() {
  return (
    <main className="page-shell px-6">
      <header className="max-width py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="pill">
          <span className="pill-dot" />
          GetFluxly
        </Link>
        <div className="text-xs text-[#b1bdcf] flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="badge">Docs</span>
            <span>/</span>
            <span>Analytics</span>
          </div>
          <span className="badge">JS SDK + HTTP</span>
          <span className="badge">BYO SMTP</span>
        </div>
      </header>

      <div className="max-width section flex flex-col lg:flex-row gap-10">
        <aside className="w-full lg:w-64 lg:pt-4 border-b lg:border-b-0 lg:border-r border-white/10 pb-4 lg:pb-0">
          <nav className="text-sm text-[#b1bdcf] space-y-2" aria-label="On this page">
            <p className="uppercase tracking-[0.18em] text-[11px] text-[#b1bdcf] mb-2">
              On this page
            </p>
            <a href="#overview" className="block hover:text-white">
              Overview
            </a>
            <a href="#flux-meaning" className="block hover:text-white">
              Flux · meaning
            </a>
            <a href="#setup" className="block hover:text-white">
              Setup (JS SDK & HTTP)
            </a>
            <a href="#features" className="block hover:text-white">
              Analytics features
            </a>
            <a href="#use-cases" className="block hover:text-white">
              Use cases
            </a>
            <a href="#comparison" className="block hover:text-white">
              PostHog & Customer.io
            </a>
            <a href="#seo-footnote" className="block hover:text-white">
              Who this is for
            </a>
          </nav>
        </aside>

        <article className="flex-1 prose prose-invert prose-headings:font-semibold prose-a:underline-offset-4 max-w-none">
          <header id="overview" className="mb-10">
            <p className="badge mb-3">Documentation · Analytics</p>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
              Analytics in Fluxly: product analytics, profiles, and messaging in one tool
            </h1>
            <p className="lead max-w-3xl">
              Fluxly is a modern analytics layer for SaaS and subscription businesses. It combines the best
              of <span className="accent">PostHog</span> (event analytics and product insight) and{" "}
              <span className="accent">Customer.io</span> (messaging and journeys) in a single place with
              more fluid, accurate customer data.
            </p>
          </header>

          <section aria-labelledby="flux-meaning" className="section-narrow">
          <div className="surface p-6 grid-2 gap-10 items-start">
            <div>
              <h2 id="flux-meaning" className="text-2xl font-semibold mb-3">
                Flux · meaning
              </h2>
              <p className="lead mb-3">
                In physics and systems, <span className="accent">flux</span> means flow. In Fluxly, it
                means the continuous, lossless flow of customer data across analytics, profiles, and
                messaging.
              </p>
              <p className="text-sm text-[#b1bdcf]">
                Events and traits are not trapped in separate tools. They move as one stream so every
                chart, segment, and campaign sees the same truth.
              </p>
            </div>
            <div className="card-muted">
              <p className="badge mb-2">Why this matters</p>
              <ul className="list-disc list-inside text-sm text-[#e8ecf2] space-y-2">
                <li>No more tedious connections between separate analytics and email tools.</li>
                <li>One profile per user across web, product, and billing.</li>
                <li>Everything from events to profiles to automations lives in one tool.</li>
              </ul>
            </div>
          </div>
          </section>

          <section aria-labelledby="setup" className="section">
            <h2 id="setup" className="text-3xl font-semibold mb-4">
              Easy setup: JS SDK and HTTP API
            </h2>
            <p className="lead mb-4 max-w-3xl">
              Fluxly is designed for technical teams. You can start sending data in minutes using the
              browser SDK or plain HTTP requests from any backend or worker.
            </p>

            <div className="grid-2 gap-10 items-start">
              <div>
                <h3 className="text-xl font-semibold mb-2">Choose your example</h3>
                <p className="text-sm text-[#e8ecf2] mb-2">
                  Under the hood, Fluxly normalizes SDK and HTTP payloads into the same event schema,
                  enriches them with context, and stitches everything into a single profile timeline.
                </p>
                <p className="text-sm text-[#b1bdcf]">
                  That means funnels, segments, and lifecycle metrics always read from one source of
                  truth: no drift between product analytics and messaging data.
                </p>
              </div>
              <div>
                <CodeTabs />
              </div>
            </div>
          </section>

          <section aria-labelledby="features" className="section">
          <h2 id="features" className="text-3xl font-semibold mb-4">
            Analytics features: one place for product and lifecycle insight
          </h2>
          <p className="lead mb-6 max-w-3xl">
            Fluxly works like a focused analytics and customer data platform tailored to SaaS and SMB
            software businesses. You get event tracking, funnels, retention, and user journeys alongside
            messaging performance, all on top of a unified profile model.
          </p>

          <div className="grid-3 gap-6">
            <div className="card-muted">
              <h3 className="text-lg font-semibold mb-2">Event analytics and funnels</h3>
              <ul className="list-disc list-inside text-sm text-[#e8ecf2] space-y-2">
                <li>Track page views and custom events from web and backend.</li>
                <li>Build funnels to see where users drop during onboarding or checkout.</li>
                <li>Analyze which sources and campaigns produce the most revenue.</li>
              </ul>
            </div>
            <div className="card-muted">
              <h3 className="text-lg font-semibold mb-2">Unified customer profiles</h3>
              <ul className="list-disc list-inside text-sm text-[#e8ecf2] space-y-2">
                <li>Each profile has a complete timeline of events and messages.</li>
                <li>Attach traits from product, billing, and support systems.</li>
                <li>Build segments from behaviour, traits, and lifecycle stage.</li>
              </ul>
            </div>
            <div className="card-muted">
              <h3 className="text-lg font-semibold mb-2">Lifecycle messaging analytics</h3>
              <ul className="list-disc list-inside text-sm text-[#e8ecf2] space-y-2">
                <li>Connect SES, Mailgun, SMTP2GO, or any SMTP provider.</li>
                <li>Measure deliverability, opens, clicks, and revenue per flow.</li>
                <li>Attribute message performance back to concrete user behaviour.</li>
              </ul>
            </div>
          </div>
          </section>

          <section aria-labelledby="use-cases" className="section">
          <h2 id="use-cases" className="text-3xl font-semibold mb-4">
            Example use cases with Fluxly analytics
          </h2>
          <p className="lead mb-6 max-w-3xl">
            Because analytics, profiles, and messaging share the same data model, you can ship flows that
            usually require stitching multiple tools together.
          </p>

          <div className="grid-3 gap-6">
            <div className="card-muted">
              <h3 className="text-lg font-semibold mb-2">Onboarding activation</h3>
              <p className="text-sm text-[#e8ecf2] mb-2">
                Track feature usage and trigger education emails when users stall.
              </p>
              <ul className="list-disc list-inside text-xs text-[#b1bdcf] space-y-1">
                <li>Event: <code>project_created</code>, <code>integration_connected</code>.</li>
                <li>Measure: time to first value and activation rate.</li>
                <li>Act: send targeted nudges based on missing steps.</li>
              </ul>
            </div>
            <div className="card-muted">
              <h3 className="text-lg font-semibold mb-2">Revenue cohort analysis</h3>
              <p className="text-sm text-[#e8ecf2] mb-2">
                Combine payment events with product behaviour to see which cohorts expand.
              </p>
              <ul className="list-disc list-inside text-xs text-[#b1bdcf] space-y-1">
                <li>Event: <code>subscription_created</code>, <code>seat_added</code>.</li>
                <li>Dimension: source, plan, team size, industry.</li>
                <li>Outcome: focus marketing spend on high-ROI sources.</li>
              </ul>
            </div>
            <div className="card-muted">
              <h3 className="text-lg font-semibold mb-2">Churn prevention and win-back</h3>
              <p className="text-sm text-[#e8ecf2] mb-2">
                Detect drop-offs early using a mix of usage and billing signals, then react automatically.
              </p>
              <ul className="list-disc list-inside text-xs text-[#b1bdcf] space-y-1">
                <li>Signals: fewer logins, failed invoices, feature decay.</li>
                <li>Segment: “churn risk” profiles in the last 30 days.</li>
                <li>Flow: send helpful interventions, not just discounts.</li>
              </ul>
            </div>
          </div>
          </section>

          <section aria-labelledby="comparison" className="section">
          <h2 id="comparison" className="text-3xl font-semibold mb-4">
            How Fluxly compares to PostHog and Customer.io
          </h2>
          <p className="lead mb-6 max-w-3xl">
            Fluxly is not a generic ESP or a generic analytics platform. It is a focused tool for SaaS
            founders, SMB owners, and product-led teams that want the strengths of PostHog and Customer.io
            in one place, with shared profiles and less integration work.
          </p>

          <div className="grid-3 gap-6">
            <div className="card-muted">
              <h3 className="text-lg font-semibold mb-2">Versus PostHog</h3>
              <ul className="list-disc list-inside text-sm text-[#e8ecf2] space-y-2">
                <li>Similar: event analytics, funnels, and product insights.</li>
                <li>Different: built-in lifecycle messaging on the same profiles.</li>
                <li>Benefit: no separate messaging stack to wire on top.</li>
              </ul>
            </div>
            <div className="card-muted">
              <h3 className="text-lg font-semibold mb-2">Versus Customer.io</h3>
              <ul className="list-disc list-inside text-sm text-[#e8ecf2] space-y-2">
                <li>Similar: event-based messaging and journeys.</li>
                <li>Different: product analytics and funnels using the same events.</li>
                <li>Benefit: fewer discrepancies between “marketing data” and “product data”.</li>
              </ul>
            </div>
            <div className="card-muted">
              <h3 className="text-lg font-semibold mb-2">One stop for analytics needs</h3>
              <ul className="list-disc list-inside text-sm text-[#e8ecf2] space-y-2">
                <li>Product teams see usage and outcomes in one interface.</li>
                <li>Growth teams see source, revenue, and lifecycle metrics together.</li>
                <li>Engineering owns one integration instead of three.</li>
              </ul>
            </div>
          </div>
          </section>

          <section aria-labelledby="seo-footnote" className="section-narrow">
          <h2 id="seo-footnote" className="text-2xl font-semibold mb-3">
            Designed as documentation, useful as a decision guide
          </h2>
          <p className="lead mb-3 max-w-3xl">
            This analytics page is written as a technical document so search engines and human readers can
            understand what Fluxly does: event analytics, customer data, and lifecycle messaging on your
            own email infrastructure for SaaS and SMB products.
          </p>
          <p className="text-sm text-[#b1bdcf] max-w-3xl">
            If you are exploring alternatives to product analytics tools like PostHog or messaging tools
            like Customer.io, Fluxly is a good fit when you want a single, accurate source of truth for
            user behaviour and messaging performance, especially if you run a SaaS or subscription
            business targeting US or EU customers.
          </p>
          </section>

          <section className="section-narrow border-t border-white/10 mt-10 pt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="max-w-md">
              <p className="badge mb-2">Next step</p>
              <p className="lead">
                Join the waitlist to use Fluxly for product analytics and lifecycle messaging.
              </p>
            </div>
            <AnalyticsWaitlistForm />
          </section>
        </article>
      </div>

      <footer className="section-narrow">
        <div className="max-width flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#b1bdcf]">
          <div className="flex items-center gap-2">
            <span className="pill-dot" />
            Built for teams who own their stack.
          </div>
          <div className="flex items-center gap-4">
            <a href="/analytics" className="cta-secondary text-xs">Docs</a>
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
