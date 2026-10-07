export function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

export function pluralise(count, singular, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}
