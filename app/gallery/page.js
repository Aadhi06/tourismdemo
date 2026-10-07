import { GalleryBrowser } from "@/components/gallery/GalleryBrowser";
import { Container } from "@/components/shared/Container";
import { getGallery, getGalleryCategories } from "@/lib/data";

export const metadata = {
  title: "Gallery",
  description: "Photographs of Sigiriya, Kandy, Ella, Yala, Galle, and the southern coast of Sri Lanka.",
};

export default async function GalleryPage({ searchParams }) {
  const query = await searchParams;
  const collection = typeof query.collection === "string" ? query.collection : "all";

  return (
    <Container className="py-12 md:py-16">
      <div className="max-w-3xl">
        <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-forest">Photographs</p>
        <h1 className="mt-3 font-display text-[clamp(2.8rem,6vw,5rem)] leading-[0.96] font-medium">
          Island light, looked at slowly.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          A small collection of Sri Lankan places used through this preview. Filter by subject, then open a photograph to read its caption.
        </p>
      </div>
      <div className="mt-10">
        <GalleryBrowser images={getGallery()} categories={getGalleryCategories()} collection={collection} />
      </div>
    </Container>
  );
}
