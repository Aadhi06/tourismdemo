export function ContactChannels({ channels, tone = "light" }) {
  const quiet = tone === "dark" ? "text-ivory/75" : "text-muted";
  const strong = tone === "dark" ? "text-ivory" : "text-ink";
  const link = tone === "dark" ? "text-ivory underline-offset-4 hover:underline" : "text-forest underline-offset-4 hover:underline";
  const listed = channels.filter((channel) => channel.available);

  if (!listed.length) {
    return (
      <p className={`text-base leading-relaxed ${strong}`}>
        The enquiry form is the direct way to reach us. We reply by email.
      </p>
    );
  }

  return (
    <ul className="grid gap-5">
      {listed.map((channel) => (
        <li key={channel.id}>
          <p className={`text-[13px] font-semibold uppercase tracking-[0.16em] ${quiet}`}>{channel.label}</p>
          <a href={channel.href} className={`mt-1 inline-flex min-h-11 items-center text-base ${link}`}>
            {channel.value}
          </a>
        </li>
      ))}
    </ul>
  );
}
