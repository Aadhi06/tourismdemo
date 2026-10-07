import { ButtonLink } from "@/components/shared/Links";
import { Container } from "@/components/shared/Container";

export default function NotFound() {
  return (
    <Container className="py-20 md:py-28">
      <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-forest">Page not found</p>
      <h1 className="mt-3 max-w-xl font-display text-[clamp(2.8rem,6vw,4.5rem)] leading-[0.98] font-medium">
        This path is not on the map.
      </h1>
      <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
        The page may have been renamed, or the link may be incomplete. You can return home, look through the journeys, or start an enquiry.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/tours" variant="ghost">
          Explore tours
        </ButtonLink>
        <ButtonLink href="/contact" variant="ghost">
          Plan My Trip
        </ButtonLink>
      </div>
    </Container>
  );
}
