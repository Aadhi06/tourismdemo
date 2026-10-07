import Link from "next/link";

export function Breadcrumbs({ items, tone = "default" }) {
  const quiet = tone === "inverse" ? "text-ivory/80" : "text-muted";
  const current = tone === "inverse" ? "text-ivory" : "text-ink";
  const link =
    tone === "inverse"
      ? "text-ivory underline-offset-4 hover:underline"
      : "underline-offset-4 hover:text-forest hover:underline";

  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${quiet}`}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {last || !item.href ? (
                <span className={current} aria-current={last ? "page" : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className={link}>
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
