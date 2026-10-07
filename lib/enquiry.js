const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const HELP_TOUR_VALUE = "help";

export function emptyEnquiry(partial = {}) {
  return {
    fullName: "",
    country: "",
    email: "",
    phone: "",
    preferredTour: HELP_TOUR_VALUE,
    preferredDate: "",
    travellers: "2",
    message: "",
    ...partial,
  };
}

export function validateEnquiry(values, { maxTravellers = 30 } = {}) {
  const errors = {};
  const fullName = values.fullName.trim();
  const country = values.country.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();
  const message = values.message.trim();
  const travellers = values.travellers.trim();
  const preferredDate = values.preferredDate.trim();

  if (fullName.length < 2) {
    errors.fullName = "Enter your full name.";
  }

  if (country.length < 2) {
    errors.country = "Enter the country you are travelling from.";
  }

  if (!email) {
    errors.email = "Enter an email address.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter an email address in the form name@example.com.";
  }

  if (phone) {
    const digits = phone.replace(/[^\d]/g, "");
    if (digits.length < 7 || digits.length > 15) {
      errors.phone = "Enter a phone number with 7 to 15 digits, or leave it blank.";
    }
  }

  if (!/^\d+$/.test(travellers) || Number(travellers) < 1) {
    errors.travellers = "Enter the number of travellers as a whole number.";
  } else if (Number(travellers) > maxTravellers) {
    errors.travellers = `Enter a number from 1 to ${maxTravellers}. Describe a larger party in your message.`;
  }

  if (preferredDate) {
    const parsed = parseLocalDate(preferredDate);
    if (!parsed) {
      errors.preferredDate = "Enter a valid date.";
    } else if (parsed < startOfToday()) {
      errors.preferredDate = "Choose today or a later date.";
    }
  }

  if (message.length < 12) {
    errors.message = "Add a short note about how you would like to travel.";
  }

  return errors;
}

export function parseLocalDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }
  date.setHours(0, 0, 0, 0);
  return date;
}

export function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export function formatPreferredDate(value) {
  const date = parseLocalDate(value);
  if (!date) return value;
  return new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/**
 * Local demo adapter. It does not store personal details, send email,
 * or call a network service.
 */
export function submitDemoEnquiry(values) {
  return {
    ok: true,
    message: "Demo enquiry completed. No message has been sent.",
    summary: {
      fullName: values.fullName.trim(),
      country: values.country.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      preferredTour: values.preferredTour,
      preferredDate: values.preferredDate.trim(),
      travellers: values.travellers.trim(),
      message: values.message.trim(),
    },
  };
}
