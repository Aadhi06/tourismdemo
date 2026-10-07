"use client";

import Link from "next/link";
import { useEffect } from "react";

export function MobileEnquiryBar({ href, label = "Enquire About This Tour", price }) {
  useEffect(() => {
    document.body.classList.add("has-enquiry-bar");
    return () => document.body.classList.remove("has-enquiry-bar");
  }, []);

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-sand bg-white px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-3">
        <p className="text-sm font-medium text-ink">{price}</p>
        <Link
          href={href}
          className="inline-flex min-h-12 items-center rounded-lg bg-leaf px-4 text-sm font-semibold text-ivory transition-colors duration-200 hover:bg-leaf-deep"
        >
          {label}
        </Link>
      </div>
    </div>
  );
}
