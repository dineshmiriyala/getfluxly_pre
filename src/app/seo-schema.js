export default function SeoSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "GetFluxly",
    "url": "https://getfluxly.com",
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