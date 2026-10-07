/**
 * Builds real contact links only when settings contain values.
 * Missing details stay null so the UI can offer the enquiry form instead.
 */
export function buildContactChannels(contacts = {}) {
  const channels = [];

  if (contacts.email) {
    channels.push({
      id: "email",
      label: "Email",
      value: contacts.email,
      href: `mailto:${contacts.email}`,
      available: true,
    });
  } else {
    channels.push({
      id: "email",
      label: "Email",
      value: null,
      href: "/contact#enquiry",
      available: false,
      previewNote: "An email address has not been added for this preview.",
    });
  }

  if (contacts.phone) {
    const compact = String(contacts.phone).replace(/\s+/g, "");
    channels.push({
      id: "phone",
      label: "Phone",
      value: contacts.phone,
      href: `tel:${compact}`,
      available: true,
    });
  } else {
    channels.push({
      id: "phone",
      label: "Phone",
      value: null,
      href: "/contact#enquiry",
      available: false,
      previewNote: "A phone number has not been added for this preview.",
    });
  }

  const whatsappHref = toWhatsAppHref(contacts.whatsapp);
  if (whatsappHref) {
    channels.push({
      id: "whatsapp",
      label: "WhatsApp",
      value: contacts.whatsapp,
      href: whatsappHref,
      available: true,
    });
  } else {
    channels.push({
      id: "whatsapp",
      label: "WhatsApp",
      value: null,
      href: "/contact#enquiry",
      available: false,
      previewNote: "A WhatsApp number has not been added for this preview.",
    });
  }

  return channels;
}

export function toWhatsAppHref(number, text) {
  if (!number) return null;
  const digits = String(number).replace(/[^\d]/g, "");
  if (digits.length < 8) return null;
  const query = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${digits}${query}`;
}
