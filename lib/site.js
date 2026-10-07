const FALLBACK_SITE_URL = "https://tourismdemo.vercel.app";

export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (production) return `https://${production.replace(/^https?:\/\//, "")}`;

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "")}`;

  return FALLBACK_SITE_URL;
}

export const shareImage = {
  url: "/images/og.jpg",
  width: 1200,
  height: 630,
  alt: "Sigiriya rock rising above the forest in Sri Lanka",
};
