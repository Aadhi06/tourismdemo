"use client";

import Link from "next/link";

export default function Error({ reset }) {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-5 py-20 md:px-10 lg:px-16">
      <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-forest">Something went wrong</p>
      <h1 className="mt-3 max-w-xl font-display text-[clamp(2.8rem,6vw,4.5rem)] leading-[0.98] font-medium">
        This page did not finish loading.
      </h1>
      <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
        The preview hit an unexpected problem. You can try the page again, or go back to the homepage.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-12 items-center rounded-lg bg-leaf px-5 font-semibold text-ivory transition-colors duration-200 hover:bg-leaf-deep"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex min-h-12 items-center rounded-lg border border-leaf/30 px-5 font-semibold text-leaf"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
