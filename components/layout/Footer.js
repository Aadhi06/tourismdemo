import Link from "next/link";
import { ContactChannels } from "@/components/shared/ContactChannels";
import { Container } from "@/components/shared/Container";

export function Footer({ settings, tours, channels }) {
  return (
    <footer className="dark-surface bg-forest text-ivory">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <p className="font-display text-4xl leading-none">{settings.brand}</p>
          <p className="mt-4 max-w-sm text-lg leading-relaxed text-ivory/85">{settings.positioning}</p>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-ivory/75">
            Private journeys through Sri Lanka, planned around the people travelling — not a marketplace of hotels and flights.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex min-h-12 items-center rounded-lg bg-white px-5 font-semibold text-leaf transition-colors duration-200 hover:bg-ivory"
          >
            Plan My Trip
          </Link>
        </div>

        <div className="lg:col-span-2">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-ivory/70">Explore</p>
          <ul className="mt-4 grid gap-2">
            {[
              ["Home", "/"],
              ["About", "/about"],
              ["Tours", "/tours"],
              ["Destinations", "/destinations"],
              ["Gallery", "/gallery"],
              ["Reviews", "/reviews"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="inline-flex min-h-11 items-center text-ivory/90 hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-ivory/70">Journeys</p>
          <ul className="mt-4 grid gap-2">
            {tours.map((tour) => (
              <li key={tour.slug}>
                <Link
                  href={`/tours/${tour.slug}`}
                  className="inline-flex min-h-11 items-center text-ivory/90 hover:text-white"
                >
                  {tour.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-ivory/70">Contact</p>
          <p className="mt-4 text-base text-ivory/85">{settings.baseLabel}</p>
          <div className="mt-4">
            <ContactChannels channels={channels} tone="dark" />
          </div>
        </div>
      </Container>
      <Container className="flex flex-col gap-3 border-t border-white/15 pt-6 pb-24 text-sm text-ivory/70 sm:flex-row sm:items-center sm:justify-between lg:pr-24 lg:pb-6">
        <p>{settings.previewLabel}. Traveller stories, the guide profile, and itineraries are sample material.</p>
        <p>© {new Date().getFullYear()} {settings.brand}</p>
      </Container>
    </footer>
  );
}
