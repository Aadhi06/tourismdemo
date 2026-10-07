import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { SiteImage } from "@/components/shared/SiteImage";
import { getDestinations } from "@/lib/data";

export const metadata = {
  title: "Destinations",
  description:
    "Sigiriya, Kandy, Ella, Yala, and the southern coast — five places that shape private journeys in Sri Lanka.",
};

export default function DestinationsPage() {
  const destinations = getDestinations();

  return (
    <Container className="py-12 md:py-16">
      <div className="max-w-3xl">
        <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-forest">Places</p>
        <h1 className="mt-3 font-display text-[clamp(2.8rem,6vw,5rem)] leading-[0.96] font-medium">
          Five places, and the journeys that meet them.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          A short introduction to the landscapes used in this preview. Open a place to see what a visit can hold, and which sample tours pass through it.
        </p>
      </div>
      <ul className="mt-12 grid gap-8 md:grid-cols-2">
        {destinations.map((destination, index) => (
          <li key={destination.slug} className={index === 0 ? "md:col-span-2" : ""}>
            <Link href={`/destinations/${destination.slug}`} className="group block">
              <span className={`relative block overflow-hidden rounded-xl bg-sand ${index === 0 ? "aspect-[16/8]" : "aspect-[4/3]"}`}>
                <SiteImage
                  image={destination.image}
                  alt={destination.image?.alt}
                  sizes={index === 0 ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                />
              </span>
              <span className="mt-4 block text-[13px] font-semibold uppercase tracking-[0.16em] text-forest">
                {destination.region}
              </span>
              <span className="mt-1 block font-display text-4xl leading-tight group-hover:text-forest">
                {destination.name}
              </span>
              <span className="mt-2 block max-w-xl leading-relaxed text-muted">{destination.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
