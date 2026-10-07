import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageFrame } from "@/components/shared/SiteImage";

export function TourCard({ tour, featured = false }) {
  const place = tour.destinationNames.length ? tour.destinationNames.join(" · ") : tour.region;

  return (
    <article className={featured ? "h-full" : "h-full"}>
      <Link
        href={`/tours/${tour.slug}`}
        className="group flex h-full flex-col focus-visible:outline-offset-4"
      >
        <ImageFrame
          image={tour.image}
          sizes="(min-width: 1024px) 40vw, 100vw"
          ratio={featured ? "aspect-[16/10] lg:aspect-[16/11]" : "aspect-[4/3]"}
          className="rounded-xl"
        />
        <div className="flex flex-1 flex-col pt-4">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-forest">
            {tour.categoryLabel}
          </p>
          <h3 className="mt-2 font-display text-3xl leading-tight font-medium text-ink group-hover:text-forest">
            {tour.title}
          </h3>
          <p className="mt-2 text-sm text-muted">
            {place}
            <span aria-hidden="true"> · </span>
            {tour.durationLabel}
          </p>
          <p className="mt-3 line-clamp-2 text-base leading-relaxed text-ink/90">{tour.summary}</p>
          <p className="mt-4 flex items-center justify-between gap-3 text-sm font-semibold text-forest">
            <span>{tour.priceLabel}</span>
            <span className="inline-flex items-center gap-1">
              View Journey
              <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </p>
        </div>
      </Link>
    </article>
  );
}
