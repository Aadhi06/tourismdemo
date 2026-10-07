import { getDestinations, getTours } from "@/lib/data";
import { getSiteUrl } from "@/lib/site";

export default function sitemap() {
  const siteUrl = getSiteUrl();
  const now = new Date();
  const staticRoutes = ["", "/about", "/tours", "/destinations", "/gallery", "/reviews", "/contact"];

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteUrl}${path || "/"}`,
      lastModified: now,
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.7,
    })),
    ...getTours().map((tour) => ({
      url: `${siteUrl}/tours/${tour.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    ...getDestinations().map((destination) => ({
      url: `${siteUrl}/destinations/${destination.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];
}
