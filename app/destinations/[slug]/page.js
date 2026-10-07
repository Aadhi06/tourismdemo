import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Container } from "@/components/shared/Container";
import { ButtonLink } from "@/components/shared/Links";
import { SiteImage } from "@/components/shared/SiteImage";
import { TourCard } from "@/components/shared/TourCard";
import { getDestinationBySlug, getDestinations } from "@/lib/data";

export function generateStaticParams() {
  return getDestinations().map((destination) => ({ slug: destination.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) return { title: "Destination not found" };
  return {
    title: destination.name,
    description: destination.summary,
    openGraph: {
      title: `${destination.name} · Ceylon Journeys`,
      description: destination.summary,
      images: destination.image ? [{ url: destination.image.src, alt: destination.image.alt }] : undefined,
    },
  };
}

export default async function DestinationPage({ params }) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) notFound();

  return (
    <>
      <section className="relative min-h-[22rem] bg-forest text-ivory sm:min-h-[28rem]">
        <SiteImage image={destination.image} alt={destination.image?.alt} sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
        <Container className="relative flex min-h-[22rem] flex-col justify-end py-10 sm:min-h-[28rem]">
          <Breadcrumbs
            tone="inverse"
            items={[
              { href: "/", label: "Home" },
              { href: "/destinations", label: "Destinations" },
              { label: destination.name },
            ]}
          />
          <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-ivory/85">{destination.region}</p>
          <h1 className="mt-2 font-display text-[clamp(2.8rem,6vw,5rem)] leading-[0.96] font-medium">
            {destination.name}
          </h1>
        </Container>
      </section>

      <Container className="grid gap-12 py-12 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-7">
          <p className="text-lg leading-relaxed">{destination.introduction}</p>
          <h2 className="mt-10 font-display text-4xl font-medium">Things to experience</h2>
          <ul className="mt-4 grid gap-3">
            {destination.experiences.map((item) => (
              <li key={item} className="border-t border-sand pt-3 leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
          <h2 className="mt-10 font-display text-4xl font-medium">Practical notes</h2>
          <ul className="mt-4 grid gap-3">
            {destination.practicalNotes.map((item) => (
              <li key={item} className="leading-relaxed text-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <aside className="lg:col-span-5">
          <div className="rounded-xl border border-sand bg-white p-6">
            <h2 className="font-display text-3xl font-medium">Plan a trip here</h2>
            <p className="mt-3 leading-relaxed text-muted">
              An enquiry can start from {destination.name}. The form will carry that context, and you can change it.
            </p>
            <ButtonLink href={`/contact?destination=${destination.slug}`} className="mt-6">
              Plan a trip here
            </ButtonLink>
          </div>
          <ul className="mt-4 grid gap-3">
            {destination.galleryImages.slice(0, 2).map((image) => (
              <li key={image.src} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-sand">
                <SiteImage image={image} alt={image.alt} sizes="(min-width: 1024px) 30vw, 100vw" />
              </li>
            ))}
          </ul>
        </aside>
      </Container>

      <section className="bg-white py-14">
        <Container>
          <h2 className="font-display text-4xl font-medium">Journeys that include {destination.name}</h2>
          {destination.tours.length ? (
            <ul className="mt-8 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {destination.tours.map((tour) => (
                <li key={tour.slug}>
                  <TourCard tour={tour} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 max-w-xl text-muted">
              No sample tour is linked to this place yet. You can still enquire and describe the time you would like here.
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
