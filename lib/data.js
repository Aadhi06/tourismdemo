import { galleryItems } from "@/data/gallery";
import { destinations } from "@/data/destinations";
import { guide } from "@/data/guide";
import { images } from "@/data/images";
import { reviews } from "@/data/reviews";
import {
  durationFilters,
  galleryCategories,
  homeFaqs,
  siteSettings,
  sortOptions,
  tourCategories,
} from "@/data/settings";
import { featuredTourOrder, tours } from "@/data/tours";

export function getSiteSettings() {
  return siteSettings;
}

export function getNavigation() {
  return [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/tours", label: "Tours" },
    { href: "/destinations", label: "Destinations" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ];
}

export function getGuide() {
  return {
    ...guide,
    contextualImage: images[guide.contextualImage] || null,
    secondaryImage: images[guide.secondaryImage] || null,
    portraitImage: guide.portraitImage ? images[guide.portraitImage] : null,
  };
}

export function getTourCategories() {
  return tourCategories;
}

export function getDurationFilters() {
  return durationFilters;
}

export function getSortOptions() {
  return sortOptions;
}

export function getHomeFaqs() {
  return homeFaqs;
}

export function getReviews() {
  return reviews;
}

export function getDestinations() {
  return destinations.map(presentDestination);
}

export function getDestinationBySlug(slug) {
  const destination = destinations.find((item) => item.slug === slug);
  if (!destination) return null;
  return {
    ...presentDestination(destination),
    tours: getTours().filter((tour) => tour.destinationIds.includes(destination.id)),
  };
}

export function getTours(filters = {}) {
  let list = tours.map(presentTourCard);

  if (filters.category && tourCategories.some((item) => item.id === filters.category)) {
    list = list.filter((tour) => tour.category === filters.category);
  }

  const duration = durationFilters.find((item) => item.id === filters.duration);
  if (duration) {
    list = list.filter(
      (tour) => tour.durationDays >= duration.min && tour.durationDays <= duration.max,
    );
  }

  const sort = sortOptions.some((item) => item.id === filters.sort) ? filters.sort : "name";
  list.sort((a, b) => compareTours(a, b, sort));
  return list;
}

export function getFeaturedTours() {
  return featuredTourOrder
    .map((slug) => tours.find((tour) => tour.slug === slug))
    .filter(Boolean)
    .map(presentTourCard);
}

export function getTourBySlug(slug) {
  const tour = tours.find((item) => item.slug === slug);
  if (!tour) return null;
  return presentTourDetail(tour);
}

export function getRelatedTours(slug, limit = 3) {
  const current = tours.find((item) => item.slug === slug);
  if (!current) return [];

  const ranked = tours
    .filter((item) => item.slug !== slug)
    .map((item) => {
      const sharedDestination = item.destinationIds.some((id) =>
        current.destinationIds.includes(id),
      );
      const sameCategory = item.category === current.category;
      const score = (sharedDestination ? 2 : 0) + (sameCategory ? 1 : 0);
      return { item, score };
    })
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title));

  const picked = [];
  ranked.forEach((entry) => {
    if (picked.length < limit && (entry.score > 0 || picked.length < limit)) {
      picked.push(entry.item);
    }
  });

  return picked.slice(0, limit).map(presentTourCard);
}

export function getGallery(category) {
  const allowed = galleryCategories.some((item) => item.id === category);
  return galleryItems
    .filter((item) => !category || category === "all" || (allowed && item.category === category))
    .map(presentGalleryItem)
    .filter((item) => item.image);
}

export function getGalleryCategories() {
  return galleryCategories;
}

export function getEnquiryContext({ tourSlug, destinationSlug } = {}) {
  const tourList = getTours({ sort: "name" });
  const destinationList = getDestinations();
  const tour = tourSlug ? getTourBySlug(tourSlug) : null;
  const destination = destinationSlug ? getDestinationBySlug(destinationSlug) : null;

  let message = "";
  let preferredTour = "help";
  let contextLabel = "";

  if (tour) {
    preferredTour = tour.slug;
    contextLabel = tour.title;
    message = `I would like to enquire about ${tour.title}.`;
  } else if (destination) {
    contextLabel = destination.name;
    message = `I would like to plan time around ${destination.name}.`;
  }

  return {
    tours: tourList.map((item) => ({ slug: item.slug, title: item.title })),
    preferredTour,
    message,
    contextLabel,
    destinationName: destination?.name || "",
    tourTitle: tour?.title || "",
  };
}

export function getImageCredits() {
  return Object.values(images).map((image) => ({
    src: image.src,
    location: image.location,
    alt: image.alt,
    ...image.credit,
  }));
}

function presentDestination(destination) {
  return {
    ...destination,
    image: images[destination.heroImage] || null,
    galleryImages: destination.gallery.map((id) => images[id]).filter(Boolean),
  };
}

function presentTourCard(tour) {
  const category = tourCategories.find((item) => item.id === tour.category);
  const places = tour.destinationIds
    .map((id) => destinations.find((destination) => destination.id === id)?.name)
    .filter(Boolean);

  return {
    id: tour.id,
    slug: tour.slug,
    title: tour.title,
    category: tour.category,
    categoryLabel: category?.label || tour.category,
    destinationIds: tour.destinationIds,
    destinationNames: places,
    region: tour.region,
    durationLabel: tour.durationLabel,
    durationDays: tour.durationDays,
    summary: tour.summary,
    priceLabel: tour.priceLabel,
    featured: tour.featured,
    image: images[tour.heroImage] || null,
  };
}

function presentTourDetail(tour) {
  return {
    ...presentTourCard(tour),
    overview: tour.overview,
    highlights: tour.highlights,
    itineraryStyle: tour.itineraryStyle,
    itinerary: tour.itinerary,
    inclusions: tour.inclusions,
    exclusions: tour.exclusions,
    faqs: tour.faqs,
    galleryImages: tour.gallery.map((id) => images[id]).filter(Boolean),
    indicative: tour.indicative,
  };
}

function presentGalleryItem(item) {
  const category = galleryCategories.find((entry) => entry.id === item.category);
  const image = images[item.imageId];
  return {
    id: item.id,
    caption: item.caption,
    category: item.category,
    categoryLabel: category?.label || item.category,
    image,
  };
}

function compareTours(a, b, sort) {
  if (sort === "duration-asc") {
    return a.durationDays - b.durationDays || a.title.localeCompare(b.title);
  }
  if (sort === "duration-desc") {
    return b.durationDays - a.durationDays || a.title.localeCompare(b.title);
  }
  return a.title.localeCompare(b.title);
}
