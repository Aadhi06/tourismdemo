import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MainOffset } from "@/components/layout/MainOffset";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { buildContactChannels } from "@/lib/contacts";
import { getNavigation, getSiteSettings, getTours } from "@/lib/data";
import { getSiteUrl, shareImage } from "@/lib/site";
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

const siteUrl = getSiteUrl();
const description =
  "Private journeys through Sri Lanka with a local guide. Culture, hill country, wildlife, and the south coast, planned around you.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ceylon Journeys — Private tours of Sri Lanka",
    template: "%s · Ceylon Journeys",
  },
  description,
  robots: { index: true, follow: true },
  openGraph: {
    siteName: "Ceylon Journeys",
    type: "website",
    locale: "en_LK",
    title: "Ceylon Journeys — Private tours of Sri Lanka",
    description,
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ceylon Journeys — Private tours of Sri Lanka",
    description,
    images: [shareImage.url],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "Ceylon Journeys",
              url: siteUrl,
              image: `${siteUrl}${shareImage.url}`,
              description,
              areaServed: { "@type": "Country", name: "Sri Lanka" },
            }),
          }}
        />
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <Header brand={settings.brand} links={getNavigation()} />
        <MainOffset>{children}</MainOffset>
        <Footer settings={settings} tours={tours} channels={channels} />
        <WhatsAppFloat href={whatsapp.href} available={whatsapp.available} />
      </body>
    </html>
  );
}
