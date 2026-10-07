"use client";

import { usePathname } from "next/navigation";

export function MainOffset({ children }) {
  const home = usePathname() === "/";
  return (
    <main id="content" tabIndex={-1} className={home ? "outline-none" : "pt-20 outline-none"}>
      {children}
    </main>
  );
}
