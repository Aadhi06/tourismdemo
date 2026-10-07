import Link from "next/link";
import { notFound } from "next/navigation";
import { MobileEnquiryBar } from "@/components/layout/MobileEnquiryBar";
import { Accordion } from "@/components/shared/Accordion";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Container } from "@/components/shared/Container";
import { ButtonLink } from "@/components/shared/Links";
import { SiteImage } from "@/components/shared/SiteImage";
import { TourCard } from "@/components/shared/TourCard";
import { getRelatedTours, getSiteSettings, getTourBySlug, getTours } from "@/lib/data";

export function generateStaticParams() {
  return getTours().map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return { title: "Journey not found" };
  return {
    title: tour.title,
    description: tour.summary,
    openGraph: {
      title: `${tour.title} · Ceylon Journeys`,
      description: tour.summary,
      images: tour.image ? [{ url: tour.image.src, alt: tour.image.alt }] : undefined,
    },
  };
}

export default async function TourPage({ params }) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  const settings = getSiteSettings();
  const related = getRelatedTours(tour.slug);
  const enquiryHref = `/contact?tour=${tour.slug}`;
  const place = tour.destinationNames.length ? tour.destinationNames.join(", ") : tour.region;

  return (
    <>
      <section className="relative min-h-[22rem] bg-forest text-ivory sm:min-h-[28rem] lg:min-h-[34rem]">
        <SiteImage image={tour.image} alt={tour.image?.alt} sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/25" />
        <Container className="relative flex min-h-[22rem] flex-col justify-end py-10 sm:min-h-[28rem] lg:min-h-[34rem]">
          <Breadcrumbs
            tone="inverse"
            items={[
              { href: "/", label: "Home" },
              { href: "/tours", label: "Tours" },
              { label: tour.title },
            ]}
          />
          <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-ivory/85">{tour.categoryLabel}</p>
          <h1 className="mt-2 max-w-3xl font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.98] font-medium">
            {tour.title}
          </h1>
        </Container>
      </section>

      <Container className="py-10 lg:py-14">
        <dl className="grid gap-4 border-y border-sand py-5 sm:grid-cols-3">
          <Fact term="Duration" value={tour.durationLabel} />
          <Fact term="Region" value={tour.region} />
          <Fact term="Format" value={settings.formatLabel} />
        </dl>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
          <div>
            <div className="max-w-3xl">
              {tour.overview.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-lg leading-relaxed first:mt-0">
                  {paragraph}
                </p>
              ))}
            </div>
            <p className="mt-6 max-w-3xl rounded-lg bg-sand/70 px-4 py-3 text-sm leading-relaxed text-ink">
              {settings.indicativeNotice}
            </p>

            <h2 className="mt-12 font-display text-4xl font-medium">Highlights</h2>
            <ul className="mt-4 grid gap-3">
              {tour.highlights.map((item) => (
                <li key={item} className="border-t border-sand pt-3 text-base">
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="mt-12 font-display text-4xl font-medium">
              {tour.itineraryStyle === "days" ? "A suggested week, day by day" : "A suggested shape for the day"}
            </h2>
            <ol className="mt-6 grid gap-6">
              {tour.itinerary.map((stop) => (
                <li key={stop.label} className="grid gap-2 border-t border-sand pt-5 sm:grid-cols-[7rem_1fr]">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-forest">{stop.label}</p>
                  <div>
                    <h3 className="text-xl font-semibold">{stop.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{stop.detail}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-12 grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="font-display text-3xl font-medium">Indicative inclusions</h2>
                <ul className="mt-4 grid gap-2">
                  {tour.inclusions.map((item) => (
                    <li key={item} className="leading-relaxed">{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-display text-3xl font-medium">Not included here</h2>
                <ul className="mt-4 grid gap-2">
                  {tour.exclusions.map((item) => (
                    <li key={item} className="leading-relaxed text-muted">{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {tour.galleryImages.length ? (
              <div className="mt-12">
                <h2 className="font-display text-4xl font-medium">Along the way</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {tour.galleryImages.map((image) => (
                    <li key={image.src} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-sand">
                      <SiteImage image={image} alt={image.alt} sizes="(min-width: 1024px) 30vw, 100vw" />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <h2 className="mt-12 font-display text-4xl font-medium">Questions about this journey</h2>
            <div className="mt-4">
              <Accordion items={tour.faqs} />
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-32 rounded-xl border border-sand bg-white p-6">
              <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-forest">{settings.formatLabel}</p>
              <p className="mt-3 font-display text-4xl leading-none">{tour.priceLabel}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {tour.durationLabel} · {place}. Tell us how you like to travel and this journey can be reshaped.
              </p>
              <ButtonLink href={enquiryHref} className="mt-6 w-full">
                Enquire About This Tour
              </ButtonLink>
              <p className="mt-4 text-sm leading-relaxed text-muted">{settings.indicativeNotice}</p>
            </div>
          </aside>
        </div>
      </Container>

      {related.length ? (
        <section className="bg-white py-16">
          <Container>
            <h2 className="font-display text-4xl font-medium">Other journeys nearby</h2>
            <ul className="mt-8 grid gap-10 md:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <TourCard tour={item} />
                </li>
              ))}
            </ul>
            <Link href="/tours" className="mt-8 inline-flex min-h-12 items-center font-semibold text-forest">
              Browse all tours
            </Link>
          </Container>
        </section>
      ) : null}

      <MobileEnquiryBar href={enquiryHref} price={tour.priceLabel} />
    </>
  );
}

function Fact({ term, value }) {
  return (
    <div>
      <dt className="text-[13px] font-semibold uppercase tracking-[0.14em] text-muted">{term}</dt>
      <dd className="mt-1 text-lg">{value}</dd>
    </div>
  );
}
