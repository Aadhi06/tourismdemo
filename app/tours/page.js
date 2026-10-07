import Link from "next/link";
import { TourFilters } from "@/components/tours/TourFilters";
import { Container } from "@/components/shared/Container";
import { TourCard } from "@/components/shared/TourCard";
import { getDurationFilters, getSortOptions, getTourCategories, getTours } from "@/lib/data";

export const metadata = {
  title: "Tours",
  description:
    "Private journeys through Sri Lanka: culture, hill country, wildlife, the south coast, and Colombo.",
};

export default async function ToursPage({ searchParams }) {
  const query = await searchParams;
  const values = {
    category: typeof query.category === "string" ? query.category : "",
    duration: typeof query.duration === "string" ? query.duration : "",
    sort: typeof query.sort === "string" ? query.sort : "name",
  };
  const tours = getTours(values);
  const active = Boolean(values.category || values.duration || (values.sort && values.sort !== "name"));

  return (
    <Container className="py-12 md:py-16">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-forest">Private journeys</p>
          <h1 className="mt-3 font-display text-[clamp(2.8rem,6vw,5rem)] leading-[0.96] font-medium">
            Journeys, shaped around you.
          </h1>
        </div>
        <p className="text-lg leading-relaxed text-muted lg:col-span-5">
          Seven private routes, from a single day in Kandy to a week of temples and cities. Filter by the kind of travel and the number of days, then open a journey to see how it unfolds.
        </p>
      </div>

      <div className="mt-10">
        <TourFilters
          categories={getTourCategories()}
          durations={getDurationFilters()}
          sorts={getSortOptions()}
          total={tours.length}
          active={active}
          values={values}
        />
      </div>

      {tours.length === 0 ? (
        <div className="mt-12 rounded-xl border border-sand bg-white px-6 py-12">
          <h2 className="font-display text-4xl">No journeys match these filters.</h2>
          <p className="mt-3 max-w-lg text-muted">
            Try another length or experience, or clear the filters to see the full list.
          </p>
          <Link href="/tours" className="mt-6 inline-flex min-h-12 items-center font-semibold text-forest underline">
            Clear all
          </Link>
        </div>
      ) : (
        <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <li key={tour.slug}>
              <TourCard tour={tour} />
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
