import { MetadataRoute } from "next";

const baseUrl =
  (process.env.NEXT_PUBLIC_SITE_URL &&
    process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")) ||
  "https://getfluxly.com";

const staticRoutes = ["/", "/analytics"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return staticRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: "daily",
    priority: 1,
  }));
}
