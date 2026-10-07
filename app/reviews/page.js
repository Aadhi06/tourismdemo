import { ButtonLink } from "@/components/shared/Links";
import { Container } from "@/components/shared/Container";
import { getReviews } from "@/lib/data";

export const metadata = {
  title: "Reviews",
  description: "Fictional sample traveller stories written for the Ceylon Journeys preview. Not verified reviews.",
};

export default function ReviewsPage() {
  const reviews = getReviews();

  return (
    <Container className="py-12 md:py-16">
      <p className="inline-flex rounded-md bg-sand px-3 py-2 text-sm font-semibold text-ink">
        Sample traveller stories — demo content
      </p>
      <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.8rem,6vw,5rem)] leading-[0.96] font-medium">
        Stories written for the preview.
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
        These notes are fictional. They are not Google reviews, Tripadvisor reviews, or messages from real guests. Names and countries are sample identities.
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
          A real journey would start with your own note.
        </h2>
        <ButtonLink href="/contact" className="mt-6">
          Plan My Trip
        </ButtonLink>
      </div>
    </Container>
  );
}
