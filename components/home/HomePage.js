import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroLocationCaption, HeroLocations } from "@/components/home/HeroLocations";
import { MomentGrid } from "@/components/home/MomentGrid";
import { Accordion } from "@/components/shared/Accordion";
import { Container } from "@/components/shared/Container";
import { ButtonLink } from "@/components/shared/Links";
import { SiteImage } from "@/components/shared/SiteImage";
import { TourCard } from "@/components/shared/TourCard";
import {
  getDestinations,
  getDurationFilters,
  getFeaturedTours,
  getGallery,
  getGuide,
  getHomeFaqs,
  getReviews,
  getTourCategories,
} from "@/lib/data";

const signature = [
  {
    key: "g-kandy-temple",
    href: "/tours?category=culture",
    className: "sig-culture min-h-[22rem]",
    kicker: "Culture & Heritage",
    title: "Courts, caves, and a living temple",
  },
  {
    key: "g-ella-tea",
    href: "/tours?category=hill-country",
    className: "sig-hill min-h-[16rem]",
    kicker: "Hill Country",
    title: "Tea slopes in the mist",
  },
  {
    key: "g-elephants",
    href: "/tours?category=wildlife",
    className: "sig-wild min-h-[16rem]",
    kicker: "Wildlife & Nature",
    title: "Patient days in the dry zone",
  },
  {
    key: "g-stilts",
    href: "/tours?category=coastal",
    className: "sig-coast min-h-[16rem]",
    kicker: "Coastal Escapes",
    title: "The fort and the southern sea",
  },
];

const momentIds = ["g-sigiriya-plains", "g-ella-bridge", "g-leopard", "g-mirissa", "g-falls"];

const destinationClasses = [
  "dest-sigiriya min-h-[24rem]",
  "min-h-[16rem]",
  "min-h-[16rem]",
  "min-h-[16rem]",
  "min-h-[16rem]",
];

export function HomePage() {
  const guide = getGuide();
  const tours = getFeaturedTours();
  const destinations = getDestinations();
  const reviews = getReviews().slice(0, 3);
  const faqs = getHomeFaqs();
  const categories = getTourCategories();
  const durations = getDurationFilters();
  const gallery = getGallery();
  const byId = Object.fromEntries(gallery.map((item) => [item.id, item]));
  const moments = momentIds.map((id) => byId[id]).filter(Boolean);

  return (
    <>
      <section className="relative flex flex-col justify-end bg-forest text-ivory lg:min-h-[82svh]">
        <div className="absolute inset-0">
          <HeroLocations />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(14,24,20,0.62)_0%,rgba(14,24,20,0.05)_30%,rgba(14,24,20,0)_55%,rgba(14,24,20,0.42)_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(14,24,20,0.48)_0%,rgba(14,24,20,0.08)_36%,transparent_62%)]" />
        </div>
        <Container className="relative z-10 pb-8 pt-28 lg:pb-32">
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-ivory/90">
            Private tours · Local experiences
          </p>
          <h1 className="mt-4 max-w-[12ch] font-display text-[clamp(2.6rem,5vw+1rem,5.5rem)] leading-[0.96] font-medium tracking-[-0.03em]">
            Sri Lanka, beyond the ordinary.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ivory/90">
            From ancient kingdoms to misty tea country, discover the island through private journeys shaped around you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/tours" variant="light">
              Explore Tours
            </ButtonLink>
            <ButtonLink href="/about" variant="ghostLight">
              Meet Your Guide
            </ButtonLink>
          </div>
          <HeroLocationCaption />
        </Container>
        <div className="relative z-10 px-5 pb-5 md:px-10 lg:absolute lg:inset-x-0 lg:bottom-0 lg:translate-y-1/2 lg:px-0 lg:pb-0">
          <Container>
            <form
              action="/tours"
              className="grid gap-4 rounded-xl border border-sand bg-white p-4 text-ink shadow-[0_18px_50px_rgba(23,63,53,0.12)] md:grid-cols-[1fr_1fr_auto] md:items-end md:p-5"
            >
              <p className="font-display text-[1.7rem] leading-none md:col-span-3">Find your Sri Lanka</p>
              <label className="grid gap-2 text-sm font-medium">
                Experience
                <select name="category" defaultValue="" className="h-12 rounded-lg border border-sand bg-white px-3 text-base font-normal">
                  <option value="">Any experience</option>
                  {categories.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Trip length
                <select name="duration" defaultValue="" className="h-12 rounded-lg border border-sand bg-white px-3 text-base font-normal">
                  <option value="">Any length</option>
                  {durations.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-leaf px-5 font-semibold text-ivory transition-colors duration-200 hover:bg-leaf-deep"
              >
                Explore
              </button>
            </form>
          </Container>
        </div>
      </section>

      <section className="pt-10 lg:pt-32">
        <Container className="grid gap-8 border-y border-sand py-8 md:grid-cols-3">
          {[
            ["Private journeys", "A guide and a small group, with the route made for the people in it."],
            ["Flexible itineraries", "Days can stretch or soften once the pace is clear."],
            ["Local perspectives", "Context for temples, tea country, wildlife, and the coast."],
          ].map(([title, text]) => (
            <div key={title}>
              <h2 className="font-display text-3xl leading-tight font-medium">{title}</h2>
              <p className="mt-2 text-base leading-relaxed text-muted">{text}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-2xl">
            <h2 className="font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.02] font-medium">
              An island of extraordinary experiences.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Four ways to begin. Each photograph opens the journeys that belong to that kind of travel.
            </p>
          </div>
          <div className="signature-grid mt-10">
            {signature.map((item) => {
              const photo = byId[item.key];
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`group relative block overflow-hidden rounded-xl bg-sand ${item.className}`}
                >
                  <SiteImage image={photo?.image} alt={photo?.caption || item.title} sizes="(min-width: 1024px) 50vw, 100vw" />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-5 text-ivory">
                    <span className="block text-[13px] font-semibold uppercase tracking-[0.16em]">{item.kicker}</span>
                    <span className="mt-1 block font-display text-3xl leading-tight">{item.title}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container className="grid items-center gap-10 lg:grid-cols-12">
          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-sand">
              <SiteImage
                image={guide.contextualImage}
                alt="Sigiriya rock beyond the terraced water gardens"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Sigiriya, seen from the water gardens.
            </p>
          </div>
          <div className="lg:col-span-7">
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-forest">Your guide</p>
            <h2 className="mt-3 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.02] font-medium">
              A local perspective makes all the difference.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">{guide.summary}</p>
            <p className="mt-4 text-base leading-relaxed">{guide.paragraphs[1]}</p>
            <blockquote className="mt-6 border-l-2 border-gold pl-5">
              <p className="font-display text-2xl leading-snug italic text-ink">“{guide.quote}”</p>
              <footer className="mt-3 text-sm text-muted">{guide.name}, private guide</footer>
            </blockquote>
            <div className="mt-6 overflow-hidden rounded-xl">
              <div className="relative aspect-[16/8]">
                <SiteImage image={guide.secondaryImage} alt="Tea country in the mist outside Ella" sizes="(min-width: 1024px) 40vw, 100vw" />
              </div>
            </div>
            <Link href="/about" className="mt-6 inline-flex min-h-12 items-center gap-2 font-semibold text-forest">
              Meet Kasun
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 md:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-xl font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.02] font-medium">
              Journeys to begin with.
            </h2>
            <Link href="/tours" className="inline-flex min-h-12 items-center font-semibold text-forest">
              All tours
            </Link>
          </div>
          <div className="mt-10 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <TourCard tour={tours[0]} featured />
            </div>
            <div className="grid gap-12 lg:col-span-5">
              <TourCard tour={tours[1]} />
              <TourCard tour={tours[2]} />
            </div>
            <div className="lg:col-span-12">
              <TourCard tour={tours[3]} />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <h2 className="max-w-xl font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.02] font-medium">
            Where will the island take you?
          </h2>
          <div className="destination-grid mt-10">
            {destinations.map((destination, index) => (
              <Link
                key={destination.slug}
                href={`/destinations/${destination.slug}`}
                className={`group relative block overflow-hidden rounded-xl bg-sand ${destinationClasses[index]}`}
              >
                <SiteImage
                  image={destination.image}
                  alt={destination.image?.alt}
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-5 text-ivory">
                  <span className="block text-[13px] uppercase tracking-[0.16em] text-ivory/80">{destination.region}</span>
                  <span className="mt-1 block font-display text-4xl leading-none">{destination.name}</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="dark-surface bg-forest py-20 text-ivory md:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <SiteImage image={byId["g-ella-mist"]?.image} alt="Cloud in the Ella valley" sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <h2 className="font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.02] font-medium">
              The private journey, in three quiet steps.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ivory/80">
              You plan directly with your guide. The route can favour culture, the hills, wildlife, or the coast. It is a conversation, not a packaged departure.
            </p>
            <ol className="mt-8 grid gap-6">
              {[
                ["01", "Share your interests", "Tell us who is travelling, how you like a day to feel, and what you hope to understand."],
                ["02", "Shape your itinerary", "A route is proposed, then the pace, places, and time outdoors are adjusted with you."],
                ["03", "Explore at your own pace", "Travel privately, with room for conversation, quiet, and a change of plan."],
              ].map(([number, title, text]) => (
                <li key={number} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-white/15 pt-5">
                  <span className="font-display text-2xl text-gold">{number}</span>
                  <div>
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <p className="mt-1 text-ivory/80">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <ButtonLink href="/contact" variant="light" className="mt-8">
              Start Planning
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-forest">
            Travellers
          </p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-xl font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.02] font-medium">
              Notes from the road.
            </h2>
            <Link href="/reviews" className="inline-flex min-h-12 items-center font-semibold text-forest">
              Read the stories
            </Link>
          </div>
          <div className="mt-10 grid gap-10 lg:grid-cols-3">
            {reviews.map((review) => (
              <figure key={review.id} className="border-t border-sand pt-6">
                <blockquote>
                  <p className="font-display text-[1.7rem] leading-snug italic">“{review.quote}”</p>
                </blockquote>
                <figcaption className="mt-5 text-sm text-muted">
                  <span className="block text-base font-semibold text-ink">{review.name}</span>
                  {review.country} · {review.journey}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.02] font-medium">Island moments</h2>
            <Link href="/gallery" className="inline-flex min-h-12 items-center font-semibold text-forest">
              View Gallery
            </Link>
          </div>
          <div className="mt-8">
            <MomentGrid images={moments} />
          </div>
        </Container>
      </section>

      <section className="pb-16 md:pb-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.02] font-medium">
              Travel questions
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Practical notes for planning a private journey. Seasons and the finer details are settled when we plan your dates.
            </p>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={faqs} />
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container className="border-t border-sand pt-16">
          <h2 className="max-w-3xl font-display text-[clamp(2.4rem,5vw,4.2rem)] leading-[1.02] font-medium">
            Your Sri Lankan journey starts with a conversation.
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
            Share a few details and we will reply with the shape of a route.
          </p>
          <ButtonLink href="/contact" className="mt-8">
            Plan My Trip
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
