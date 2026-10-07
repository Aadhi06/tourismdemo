import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { ContactChannels } from "@/components/shared/ContactChannels";
import { Container } from "@/components/shared/Container";
import { SiteImage } from "@/components/shared/SiteImage";
import { buildContactChannels } from "@/lib/contacts";
import { getEnquiryContext, getGuide, getSiteSettings } from "@/lib/data";

export const metadata = {
  title: "Contact",
  description: "Plan a private journey in Sri Lanka with Kasun Perera. Share your dates, your pace, and what you hope to see.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({ searchParams }) {
  const query = await searchParams;
  const settings = getSiteSettings();
  const guide = getGuide();
  const context = getEnquiryContext({
    tourSlug: typeof query.tour === "string" ? query.tour : "",
    destinationSlug: typeof query.destination === "string" ? query.destination : "",
  });
  const channels = buildContactChannels(settings.contacts);

  return (
    <Container className="py-12 md:py-16">
      <div className="max-w-3xl">
        <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-forest">Plan a journey</p>
        <h1 className="mt-3 font-display text-[clamp(2.8rem,6vw,5rem)] leading-[0.96] font-medium">
          Tell us how you like to travel.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Write a few details for {guide.name}. He replies with questions, ideas, and a route shaped around the people travelling.
        </p>
      </div>

      <div className="mt-10 grid items-start gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <EnquiryForm
            key={`${context.preferredTour}-${context.destinationName}`}
            tours={context.tours}
            maxTravellers={settings.enquiry.maxTravellers}
            initial={{
              preferredTour: context.preferredTour,
              message: context.message,
              contextLabel: context.contextLabel,
            }}
          />
        </div>
        <aside className="grid gap-6 lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-sand">
            <SiteImage
              image={guide.contextualImage}
              alt="Sigiriya from the gardens"
              sizes="(min-width: 1024px) 35vw, 100vw"
            />
          </div>
          <div className="rounded-xl border border-sand bg-white p-6">
            <h2 className="font-display text-3xl font-medium">Other ways to write</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{settings.baseLabel}</p>
            <div className="mt-5">
              <ContactChannels channels={channels} />
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}
