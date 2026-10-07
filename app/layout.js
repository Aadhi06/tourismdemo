import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MainOffset } from "@/components/layout/MainOffset";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { buildContactChannels } from "@/lib/contacts";
import { getNavigation, getSiteSettings, getTours } from "@/lib/data";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ceylon Journeys — Private tours of Sri Lanka",
    template: "%s · Ceylon Journeys",
  },
  description:
    "Private journeys through Sri Lanka with a local guide. Culture, hill country, wildlife, and the south coast, planned around you.",
  robots: { index: false, follow: false },
  openGraph: {
    siteName: "Ceylon Journeys",
    type: "website",
    locale: "en",
    images: [
      {
        url: "/images/sigiriya-hero.jpg",
        alt: "Sigiriya rock above the forest in Sri Lanka",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  const settings = getSiteSettings();
  const channels = buildContactChannels(settings.contacts);
  const whatsapp = channels.find((channel) => channel.id === "whatsapp");
  const tours = getTours({ sort: "name" });

  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-white font-sans text-base leading-relaxed text-ink antialiased">
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <Header brand={settings.brand} previewLabel={settings.previewLabel} links={getNavigation()} />
        <MainOffset>{children}</MainOffset>
        <Footer settings={settings} tours={tours} channels={channels} />
        <WhatsAppFloat href={whatsapp.href} available={whatsapp.available} />
      </body>
    </html>
  );
}
