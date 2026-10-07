"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useId, useRef } from "react";
import { SiteImage } from "@/components/shared/SiteImage";

export function Lightbox({ images, index, onClose, onChange }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const titleId = useId();
  const current = images[index];

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, []);

  useEffect(() => {
    function onKey(event) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onChange((index + 1) % images.length);
      if (event.key === "ArrowLeft") onChange((index - 1 + images.length) % images.length);
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = [...dialogRef.current.querySelectorAll("button")].filter(
        (node) => !node.disabled,
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [images.length, index, onChange, onClose]);

  if (!current) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[60] flex flex-col bg-[#121a17]/92 text-ivory"
    >
      <div className="flex items-start justify-between gap-4 px-4 py-3 sm:px-6">
        <div>
          <p id={titleId} className="font-display text-2xl leading-tight sm:text-3xl">
            {current.caption || current.image?.location}
          </p>
          {current.categoryLabel ? (
            <p className="mt-1 text-sm text-ivory/75">{current.categoryLabel}</p>
          ) : null}
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-white/30"
        >
          <X aria-hidden="true" />
          <span className="sr-only">Close gallery</span>
        </button>
      </div>

      <div className="relative mx-auto min-h-0 w-full max-w-6xl flex-1 px-4">
        <div className="relative h-full min-h-[16rem]">
          <SiteImage image={current.image} alt={current.caption || current.image?.alt} sizes="100vw" />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <button
          type="button"
          onClick={() => onChange((index - 1 + images.length) % images.length)}
          className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/30 px-3"
          disabled={images.length < 2}
        >
          <ChevronLeft aria-hidden="true" />
          Previous
        </button>
        <p className="text-sm text-ivory/80">
          {index + 1} / {images.length}
        </p>
        <button
          type="button"
          onClick={() => onChange((index + 1) % images.length)}
          className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/30 px-3"
          disabled={images.length < 2}
        >
          Next
          <ChevronRight aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
