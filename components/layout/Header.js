"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { cx } from "@/lib/utils";

export function Header({ brand, previewLabel, links }) {
  const pathname = usePathname();
  const overlay = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [openPath, setOpenPath] = useState(null);
  const open = openPath === pathname;
  const panelRef = useRef(null);
  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const titleId = useId();
  const solid = !overlay || scrolled || open;

  useEffect(() => {
    if (!overlay) return undefined;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function onKey(event) {
      if (event.key === "Escape") {
        setOpenPath(null);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll("a, button");
      const items = [...focusable];
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-200",
        solid ? "border-b border-sand bg-white text-ink" : "bg-transparent text-ivory",
      )}
    >
      <p
        className={cx(
          "px-5 py-1.5 text-center text-[13px] tracking-[0.08em]",
          solid ? "text-muted" : "text-ivory/85",
        )}
      >
        {previewLabel}
      </p>
      <div className="mx-auto flex h-[4.5rem] w-full max-w-[1280px] items-center justify-between gap-4 px-5 md:px-10 lg:px-16">
        <Link href="/" className="font-display text-[1.65rem] leading-none tracking-[-0.03em] sm:text-[1.85rem]">
          {brand}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cx(
                  "min-h-11 rounded-md px-3 py-2 text-[15px] font-medium",
                  active ? "underline decoration-2 underline-offset-8" : "hover:opacity-75",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden min-h-11 items-center rounded-lg bg-leaf px-4 text-[15px] font-semibold text-ivory transition-colors duration-200 hover:bg-leaf-deep lg:inline-flex"
          >
            Plan My Trip
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-lg border border-current/20 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpenPath(open ? null : pathname)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <div
          ref={panelRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-50 flex flex-col bg-white text-ink lg:hidden"
        >
          <div className="flex h-[4.5rem] items-center justify-between px-5">
            <p id={titleId} className="font-display text-[1.65rem] leading-none">
              {brand}
            </p>
            <button
              ref={closeButtonRef}
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-lg border border-sand"
              onClick={() => {
                setOpenPath(null);
                menuButtonRef.current?.focus();
              }}
            >
              <X aria-hidden="true" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <nav aria-label="Mobile" className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 pb-8">
            {links.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cx(
                    "border-b border-sand py-4 font-display text-4xl",
                    active ? "text-forest" : "text-ink",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-leaf px-5 font-semibold text-ivory transition-colors duration-200 hover:bg-leaf-deep"
            >
              Plan My Trip
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
