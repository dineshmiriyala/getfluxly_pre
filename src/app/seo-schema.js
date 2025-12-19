export default function SeoSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "GetFluxly",
    "url": "https://www.getfluxly.com",
    "image": "https://www.getfluxly.com/opengraph-image",
    "description": "Dev-friendly product analytics, event tracking, and lifecycle email that runs on your own SMTP providers (SES, Mailgun, SMTP2GO, any SMTP) with JS SDK + HTTP ingest and unified customer profiles.",
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "Product analytics and lifecycle email",
    "operatingSystem": "Web",
    "inLanguage": "en",
    "provider": {
      "@type": "Organization",
      "name": "GetFluxly",
      "url": "https://www.getfluxly.com",
      "sameAs": [
        "https://twitter.com/madeByMD2"
      ]
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/PreOrder",
      "price": "0",
      "priceCurrency": "USD"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "SaaS founders and product teams"
    },
    "featureList": [
      "JS SDK + HTTP event tracking",
      "Unified customer profiles",
      "Bring your own SMTP (SES, Mailgun, SMTP2GO)",
      "Lifecycle automation and segmentation",
      "Deliverability-aware reporting"
    ],
    "keywords": "product analytics, event tracking, customer data platform, CDP, lifecycle email, email automation, SMTP, deliverability",
    "knowsAbout": [
      "Product analytics",
      "Event tracking",
      "JS SDK analytics",
      "HTTP API event tracking",
      "Customer data platform",
      "Bring your own SMTP",
      "SES email",
      "Mailgun email",
      "SMTP2GO email",
      "Lifecycle automation",
      "Email automation",
      "Deliverability monitoring",
      "Transactional email"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  );
}
