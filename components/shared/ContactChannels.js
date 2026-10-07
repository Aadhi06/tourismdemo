import Link from "next/link";

export function ContactChannels({ channels, tone = "light" }) {
  const quiet = tone === "dark" ? "text-ivory/75" : "text-muted";
  const strong = tone === "dark" ? "text-ivory" : "text-ink";
  const link = tone === "dark" ? "text-ivory underline-offset-4 hover:underline" : "text-forest underline-offset-4 hover:underline";

  return (
    <ul className="grid gap-5">
      {channels.map((channel) => (
        <li key={channel.id}>
          <p className={`text-[13px] font-semibold uppercase tracking-[0.16em] ${quiet}`}>{channel.label}</p>
          {channel.available ? (
            <a href={channel.href} className={`mt-1 inline-flex min-h-11 items-center text-base ${link}`}>
              {channel.value}
            </a>
          ) : (
            <div className="mt-1">
              <p className={`text-base leading-relaxed ${strong}`}>{channel.previewNote}</p>
              <Link href={channel.href} className={`mt-1 inline-flex min-h-11 items-center text-base font-semibold ${link}`}>
                Send an enquiry
              </Link>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
