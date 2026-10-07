"use client";

import { useState } from "react";
import { Lightbox } from "@/components/gallery/Lightbox";
import { SiteImage } from "@/components/shared/SiteImage";

export function MomentGrid({ images }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      <div className="moment-grid">
        {images.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setOpenIndex(index)}
            className={`group relative min-h-56 overflow-hidden rounded-xl bg-sand text-left ${
              index === 0 ? "moment-lead aspect-[4/5] md:aspect-auto" : "aspect-[4/3] md:aspect-auto"
            }`}
          >
            <SiteImage image={item.image} alt={item.caption} sizes="(min-width: 1024px) 33vw, 100vw" />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-ivory">
              <span className="block text-sm">{item.caption}</span>
            </span>
          </button>
        ))}
      </div>
      {openIndex !== null ? (
        <Lightbox
          images={images}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onChange={setOpenIndex}
        />
      ) : null}
    </>
  );
}
