import { ButtonLink } from "@/components/shared/Links";
import { Container } from "@/components/shared/Container";
import { getReviews } from "@/lib/data";

export const metadata = {
  title: "Reviews",
  description: "Notes from travellers who took a private journey through Sri Lanka with Ceylon Journeys.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  const reviews = getReviews();

  return (
    <Container className="py-12 md:py-16">
      <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-forest">Travellers</p>
      <h1 className="mt-3 max-w-3xl font-display text-[clamp(2.8rem,6vw,5rem)] leading-[0.96] font-medium">
        From people who took their time.
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
        Notes from couples and families who travelled privately. Each journey was planned around the people in it.
      </p>
      <div className="mt-12 grid gap-12">
        {reviews.map((review) => (
          <figure key={review.id} className="grid gap-4 border-t border-sand pt-8 lg:grid-cols-12">
            <figcaption className="lg:col-span-3">
              <p className="font-semibold">{review.name}</p>
              <p className="text-sm text-muted">{review.country}</p>
              <p className="mt-3 text-sm text-forest">{review.journey}</p>
            </figcaption>
            <blockquote className="lg:col-span-9">
              <h2 className="font-display text-3xl leading-tight font-medium">{review.title}</h2>
              <p className="mt-4 max-w-3xl font-display text-[1.7rem] leading-snug italic">“{review.quote}”</p>
            </blockquote>
          </figure>
        ))}
      </div>
      <div className="mt-16 border-t border-sand pt-10">
        <h2 className="max-w-xl font-display text-4xl leading-tight font-medium">
          Your journey can start with a note.
        </h2>
        <ButtonLink href="/contact" className="mt-6">
          Plan My Trip
        </ButtonLink>
      </div>
    </Container>
  );
}
