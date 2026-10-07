export const siteSettings = {
  brand: "Ceylon Journeys",
  positioning: "Private journeys. Local perspectives.",
  previewLabel: "Concept preview · sample content",
  indicativeNotice:
    "Suggested for this preview. Itineraries, inclusions, and timings are sample ideas, not a confirmed offer.",
  priceLabel: "Price on enquiry",
  formatLabel: "Private tour",
  baseLabel: "Private guiding across Sri Lanka",
  locale: "en",
  contacts: {
    email: null,
    phone: null,
    whatsapp: null,
  },
  enquiry: {
    maxTravellers: 30,
  },
};

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/tours", label: "Tours" },
  { href: "/destinations", label: "Destinations" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export const tourCategories = [
  { id: "culture", label: "Culture & Heritage" },
  { id: "hill-country", label: "Hill Country" },
  { id: "wildlife", label: "Wildlife & Nature" },
  { id: "coastal", label: "Coastal Escapes" },
  { id: "city", label: "City Stories" },
];

export const durationFilters = [
  { id: "1", label: "1 day", min: 1, max: 1 },
  { id: "2-4", label: "2–4 days", min: 2, max: 4 },
  { id: "5+", label: "5 days or more", min: 5, max: 99 },
];

export const sortOptions = [
  { id: "name", label: "Name" },
  { id: "duration-asc", label: "Duration, shortest first" },
  { id: "duration-desc", label: "Duration, longest first" },
];

export const galleryCategories = [
  { id: "destinations", label: "Destinations" },
  { id: "culture", label: "Culture" },
  { id: "wildlife", label: "Wildlife" },
  { id: "nature", label: "Nature" },
  { id: "experiences", label: "Experiences" },
];

export const homeFaqs = [
  {
    id: "custom",
    question: "Can the itinerary be shaped around our interests?",
    answer:
      "Yes. These sample routes are starting points. Tell us what you care about — temples, tea country, wildlife, the coast, food, or time with family — and the plan is adjusted before you travel.",
  },
  {
    id: "group",
    question: "What size of group do you guide?",
    answer:
      "Journeys are arranged for couples, families, and small private groups. There is no shared coach on these sample tours. If you are travelling as a larger party, say so in your enquiry and we can talk about what would work.",
  },
  {
    id: "planning",
    question: "How far ahead should we enquire?",
    answer:
      "Write whenever you are ready to start a conversation. Earlier notes help with pacing and park or temple timing, but this preview cannot promise availability. A reply in the finished service would confirm what is possible.",
  },
  {
    id: "responsible",
    question: "How do you approach wildlife and cultural sites?",
    answer:
      "Wildlife is watched on the animals’ terms, and sightings are never promised. At temples and homes, the pace leaves room for explanation, dress, and quiet. The aim is context, not a checklist of stops.",
  },
  {
    id: "after",
    question: "What happens after we send an enquiry?",
    answer:
      "On this preview, nothing is sent or stored. In the finished website, your note would open a personal reply with ideas, questions, and a suggested shape for the journey — not an instant booking.",
  },
];
