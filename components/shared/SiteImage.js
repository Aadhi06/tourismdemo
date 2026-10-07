"use client";

import Image from "next/image";
import { useState } from "react";

export function SiteImage({ image, alt, priority = false, sizes = "100vw", className = "" }) {
  const [failed, setFailed] = useState(false);
  const label = alt || image?.alt || "Ceylon Journeys";

  if (!image?.src || failed) {
    return (
      <div
        className={`absolute inset-0 flex items-end bg-forest p-5 text-ivory ${className}`}
        role="img"
        aria-label={label}
      >
        <span className="font-display text-3xl leading-none">Ceylon Journeys</span>
      </div>
    );
  }

  return (
    <Image
      src={image.src}
      alt={label}
      fill
      priority={priority}
      sizes={sizes}
      className={`site-img ${className}`}
      style={{
        "--focal": image.focal || "center",
        "--focal-mobile": image.focalMobile || image.focal || "center",
      }}
      onError={() => setFailed(true)}
    />
  );
}

export function ImageFrame({
  image,
  alt,
  priority = false,
  sizes,
  className = "",
  ratio = "aspect-[4/3]",
}) {
  return (
    <div className={`relative overflow-hidden bg-sand ${ratio} ${className}`}>
      <SiteImage image={image} alt={alt} priority={priority} sizes={sizes} />
    </div>
  );
}
