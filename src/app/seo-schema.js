export default function SeoSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "GetFluxly",
    "url": "https://getfluxly.com",
    "description": "Dev-friendly analytics and lifecycle email that runs on your own SMTP providers (SES, Mailgun, SMTP2GO, any SMTP) with JS SDK + HTTP ingest and unified customer profiles.",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "provider": {
      "@type": "Organization",
      "name": "GetFluxly"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/PreOrder",
      "price": "0",
      "priceCurrency": "USD"
    },
    "knowsAbout": [
      "JS SDK analytics",
      "HTTP API event tracking",
      "Bring your own SMTP",
      "SES email",
      "Mailgun email",
      "SMTP2GO email",
      "Customer data platform",
      "Lifecycle automation"
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