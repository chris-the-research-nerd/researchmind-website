import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE = "https://www.researchmindconsulting.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/services`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/team`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/contact`, lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE}/agents`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  ];
}
