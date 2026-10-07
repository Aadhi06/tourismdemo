"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function TourFilters({ categories, durations, sorts, total, active, values }) {
  const router = useRouter();

  function navigate(form) {
    const data = new FormData(form);
    const next = new URLSearchParams();
    ["category", "duration", "sort"].forEach((key) => {
      const value = String(data.get(key) || "");
      if (value) next.set(key, value);
    });
    const query = next.toString();
    router.push(query ? `/tours?${query}` : "/tours", { scroll: false });
  }

  return (
    <form
      key={`${values.category}-${values.duration}-${values.sort}`}
      action="/tours"
      method="get"
      className="grid gap-4 rounded-xl border border-sand bg-white p-4 md:grid-cols-4 md:items-end"
      onChange={(event) => navigate(event.currentTarget)}
    >
      <Field label="Experience" name="category" defaultValue={values.category}>
        <option value="">Any experience</option>
        {categories.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </Field>
      <Field label="Trip length" name="duration" defaultValue={values.duration}>
        <option value="">Any length</option>
        {durations.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </Field>
      <Field label="Sort" name="sort" defaultValue={values.sort || "name"}>
        {sorts.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </Field>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="inline-flex min-h-12 items-center rounded-lg bg-leaf px-4 font-semibold text-ivory transition-colors duration-200 hover:bg-leaf-deep"
        >
          Show journeys
        </button>
        {active ? (
          <Link href="/tours" className="inline-flex min-h-12 items-center font-semibold text-forest underline">
            Clear all
          </Link>
        ) : null}
      </div>
      <p className="text-sm text-muted md:col-span-4">
        {total} {total === 1 ? "journey" : "journeys"}
      </p>
    </form>
  );
}

function Field({ label, name, defaultValue, children }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-ink">
      {label}
      <select
        name={name}
        defaultValue={defaultValue}
        className="h-12 rounded-lg border border-sand bg-white px-3 text-base font-normal"
      >
        {children}
      </select>
    </label>
  );
}
