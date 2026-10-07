import Link from "next/link";
import { ButtonLink } from "@/components/shared/Links";
import { Container } from "@/components/shared/Container";
import { SiteImage } from "@/components/shared/SiteImage";
import { getGuide } from "@/lib/data";

export const metadata = {
  title: "About",
  description:
    "Meet Kasun Perera, the fictional sample guide behind Ceylon Journeys, and the way private Sri Lankan journeys are shaped.",
};

export default function AboutPage() {
  const guide = getGuide();

  return (
    <>
      <Container className="grid items-end gap-10 py-12 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-6">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-forest">Sample guide profile</p>
          <h1 className="mt-3 font-display text-[clamp(2.8rem,6vw,5rem)] leading-[0.96] font-medium">
            {guide.name}
          </h1>
          <p className="mt-4 text-lg text-muted">{guide.role} · {guide.identityNote}</p>
        </div>
        <p className="text-lg leading-relaxed text-ink lg:col-span-6">{guide.summary}</p>
      </Container>

      <Container className="grid gap-6 pb-16 lg:grid-cols-12 lg:pb-24">
        <div className="lg:col-span-7">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-sand sm:aspect-[5/4]">
            <SiteImage
              image={guide.contextualImage}
              alt="Sigiriya rock seen from the water gardens"
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
          </div>
          <p className="mt-3 text-sm text-muted">
            Illustrative place photograph of Sigiriya. It is not a portrait of the fictional guide.
          </p>
        </div>
        <div className="lg:col-span-5 lg:pt-10">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-sand">
            <SiteImage image={guide.secondaryImage} alt="Mist over tea country near Ella" sizes="(min-width: 1024px) 30vw, 100vw" />
          </div>
          <blockquote className="mt-8 border-l-2 border-gold pl-5">
            <p className="font-display text-3xl leading-snug italic">“{guide.quote}”</p>
          </blockquote>
        </div>
      </Container>

      <Container className="grid gap-12 pb-16 lg:grid-cols-12 lg:pb-24">
        <div className="lg:col-span-7">
          <h2 className="font-display text-4xl leading-tight font-medium">A biography written for the preview</h2>
          <div className="mt-5 grid gap-4 text-lg leading-relaxed text-ink">
            {guide.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5">
          <h2 className="font-display text-4xl leading-tight font-medium">How the guiding feels</h2>
          <ul className="mt-5 grid gap-5">
            {guide.philosophy.map((item) => (
              <li key={item.title} className="border-t border-sand pt-4">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <section className="bg-white py-16 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-display text-4xl leading-tight font-medium">Languages in this sample</h2>
            <p className="mt-3 leading-relaxed text-muted">
              These are illustrative notes for the demo profile. They are not verified qualifications or test results.
            </p>
          </div>
          <ul className="grid gap-4 lg:col-span-7">
            {guide.languages.map((language) => (
              <li key={language.name} className="flex flex-wrap items-baseline justify-between gap-3 border-b border-sand pb-4">
                <span className="font-display text-3xl">{language.name}</span>
                <span className="text-sm text-muted">{language.note}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Container className="py-16 md:py-24">
        <h2 className="max-w-2xl font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.05] font-medium">
          If the pace sounds right, start with a note.
        </h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
          Tell us who is travelling and what you hope to understand. The enquiry on this preview stays on the page.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/contact">Plan My Trip</ButtonLink>
          <Link href="/tours" className="inline-flex min-h-12 items-center px-2 font-semibold text-forest">
            Browse journeys
          </Link>
        </div>
      </Container>
    </>
  );
}
