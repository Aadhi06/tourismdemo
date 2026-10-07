"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Lightbox } from "@/components/gallery/Lightbox";
import { SiteImage } from "@/components/shared/SiteImage";
import { cx } from "@/lib/utils";

export function GalleryBrowser({ images, categories, collection = "all" }) {
  const router = useRouter();
  const selected = categories.some((item) => item.id === collection) ? collection : "all";
  const [openIndex, setOpenIndex] = useState(null);

  const visible = useMemo(() => {
    if (selected === "all") return images;
    return images.filter((item) => item.category === selected);
  }, [images, selected]);

  function choose(id) {
    router.replace(id === "all" ? "/gallery" : `/gallery?collection=${id}`, { scroll: false });
    setOpenIndex(null);
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2" aria-label="Gallery categories">
        <FilterButton active={selected === "all"} onClick={() => choose("all")}>
          All
        </FilterButton>
        {categories.map((category) => (
          <FilterButton
            key={category.id}
            active={selected === category.id}
            onClick={() => choose(category.id)}
          >
            {category.label}
          </FilterButton>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted">
        {visible.length} {visible.length === 1 ? "photograph" : "photographs"}
      </p>

      {visible.length === 0 ? (
        <div className="mt-8 rounded-xl border border-sand bg-white px-6 py-10">
          <h2 className="font-display text-3xl">Nothing in this collection yet.</h2>
          <button type="button" onClick={() => choose("all")} className="mt-4 min-h-12 font-semibold text-forest underline">
            Show all photographs
          </button>
        </div>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, index) => (
            <li key={item.id} className={index % 5 === 0 ? "sm:col-span-2 lg:col-span-2" : ""}>
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className="group block w-full text-left"
              >
                <span className="relative block aspect-[4/3] overflow-hidden rounded-xl bg-sand">
                  <SiteImage
                    image={item.image}
                    alt={item.caption}
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                </span>
                <span className="mt-3 block text-[13px] font-semibold uppercase tracking-[0.14em] text-forest">
                  {item.categoryLabel}
                </span>
                <span className="mt-1 block text-base text-ink">{item.caption}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {openIndex !== null ? (
        <Lightbox
          images={visible}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onChange={setOpenIndex}
        />
      ) : null}
    </div>
  );
}

function FilterButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cx(
        "min-h-11 rounded-lg px-4 text-sm font-semibold transition-colors duration-200",
        active ? "bg-leaf text-ivory" : "border border-sand bg-white text-ink hover:border-leaf",
      )}
    >
      {children}
    </button>
  );
}
