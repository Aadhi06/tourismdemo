import Link from "next/link";
import { cx } from "@/lib/utils";

const variants = {
  primary: "bg-leaf text-ivory hover:bg-leaf-deep",
  light: "bg-white text-leaf hover:bg-ivory",
  ghostLight:
    "border border-white/75 bg-transparent text-ivory hover:bg-white/10",
  ghost:
    "border border-leaf/30 bg-transparent text-leaf hover:border-leaf hover:bg-leaf hover:text-ivory",
};

export function ButtonLink({ href, variant = "primary", className = "", children }) {
  return (
    <Link
      href={href}
      className={cx(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 text-base font-semibold transition-colors duration-200",
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
