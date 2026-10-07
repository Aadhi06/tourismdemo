import { ChevronDown } from "lucide-react";

export function Accordion({ items, labelledBy }) {
  return (
    <div className="border-y border-sand">
      {items.map((item) => (
        <details key={item.id} className="group border-b border-sand last:border-b-0">
          <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-4 text-left text-lg font-medium text-ink">
            <span>{item.question}</span>
            <ChevronDown
              aria-hidden="true"
              className="size-5 shrink-0 text-forest transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <p className="max-w-3xl pb-5 text-base leading-relaxed text-muted">{item.answer}</p>
        </details>
      ))}
      {labelledBy ? <span className="sr-only">{labelledBy}</span> : null}
    </div>
  );
}
