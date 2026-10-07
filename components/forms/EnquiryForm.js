"use client";

import { useMemo, useState } from "react";
import {
  emptyEnquiry,
  formatPreferredDate,
  HELP_TOUR_VALUE,
  submitDemoEnquiry,
  validateEnquiry,
} from "@/lib/enquiry";

export function EnquiryForm({ tours, initial, maxTravellers = 30 }) {
  const starting = useMemo(
    () =>
      emptyEnquiry({
        preferredTour: initial?.preferredTour || HELP_TOUR_VALUE,
        message: initial?.message || "",
      }),
    [initial],
  );
  const [values, setValues] = useState(starting);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);

  function update(name, value) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (status === "pending") return;
    const nextErrors = validateEnquiry(values, { maxTravellers });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const first = Object.keys(nextErrors)[0];
      document.getElementById(first)?.focus();
      return;
    }

    setStatus("pending");
    await new Promise((resolve) => setTimeout(resolve, 400));
    const submission = submitDemoEnquiry(values);
    setResult(submission);
    setStatus("complete");
    requestAnimationFrame(() => {
      document.getElementById("enquiry-confirmation")?.focus();
    });
  }

  if (status === "complete" && result) {
    const tourLabel =
      tours.find((tour) => tour.slug === result.summary.preferredTour)?.title || "Help me choose";
    return (
      <div
        id="enquiry-confirmation"
        tabIndex={-1}
        className="rounded-xl border border-sand bg-white p-6 sm:p-8"
        role="status"
      >
        <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-forest">Preview complete</p>
        <h2 className="mt-3 font-display text-4xl leading-tight">Thank you, {result.summary.fullName}.</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">{result.message}</p>
        <dl className="mt-6 grid gap-3 text-base">
          <Summary term="Country" value={result.summary.country} />
          <Summary term="Email" value={result.summary.email} />
          {result.summary.phone ? <Summary term="Phone" value={result.summary.phone} /> : null}
          <Summary term="Preferred tour" value={tourLabel} />
          {result.summary.preferredDate ? (
            <Summary term="Preferred date" value={formatPreferredDate(result.summary.preferredDate)} />
          ) : null}
          <Summary term="Travellers" value={result.summary.travellers} />
          <Summary term="Message" value={result.summary.message} />
        </dl>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            className="inline-flex min-h-12 items-center rounded-lg border border-leaf px-4 font-semibold text-leaf"
            onClick={() => setStatus("idle")}
          >
            Edit details
          </button>
          <button
            type="button"
            className="inline-flex min-h-12 items-center rounded-lg bg-leaf px-4 font-semibold text-ivory transition-colors duration-200 hover:bg-leaf-deep"
            onClick={() => {
              setValues(emptyEnquiry());
              setResult(null);
              setErrors({});
              setStatus("idle");
            }}
          >
            Start another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form id="enquiry" onSubmit={onSubmit} noValidate className="rounded-xl border border-sand bg-white p-5 sm:p-8">
      {initial?.contextLabel ? (
        <p className="mb-5 rounded-lg bg-sand px-4 py-3 text-sm leading-relaxed text-ink">
          This note is about <strong>{initial.contextLabel}</strong>. You can change any field before continuing.
        </p>
      ) : null}
      <div className="grid gap-5">
        <TextField
          id="fullName"
          label="Full name"
          required
          autoComplete="name"
          value={values.fullName}
          error={errors.fullName}
          onChange={(value) => update("fullName", value)}
        />
        <TextField
          id="country"
          label="Country"
          required
          autoComplete="country-name"
          value={values.country}
          error={errors.country}
          onChange={(value) => update("country", value)}
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          required
          autoComplete="email"
          value={values.email}
          error={errors.email}
          onChange={(value) => update("email", value)}
        />
        <TextField
          id="phone"
          label="Phone or WhatsApp"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          error={errors.phone}
          onChange={(value) => update("phone", value)}
        />
        <label className="grid gap-2 text-sm font-medium" htmlFor="preferredTour">
          <span>Preferred tour <FieldMark>Required</FieldMark></span>
          <select
            id="preferredTour"
            name="preferredTour"
            value={values.preferredTour}
            onChange={(event) => update("preferredTour", event.target.value)}
            className="h-12 rounded-lg border border-sand bg-white px-3 text-base font-normal"
          >
            <option value={HELP_TOUR_VALUE}>Help me choose</option>
            {tours.map((tour) => (
              <option key={tour.slug} value={tour.slug}>
                {tour.title}
              </option>
            ))}
          </select>
        </label>
        <TextField
          id="preferredDate"
          label="Preferred date"
          type="date"
          value={values.preferredDate}
          error={errors.preferredDate}
          onChange={(value) => update("preferredDate", value)}
        />
        <TextField
          id="travellers"
          label="Number of travellers"
          type="number"
          required
          min="1"
          inputMode="numeric"
          value={values.travellers}
          error={errors.travellers}
          onChange={(value) => update("travellers", value)}
        />
        <label className="grid gap-2 text-sm font-medium" htmlFor="message">
          <span>Message <FieldMark>Required</FieldMark></span>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={values.message}
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-error" : "message-hint"}
            onChange={(event) => update("message", event.target.value)}
            className="rounded-lg border border-sand bg-white px-3 py-3 text-base font-normal leading-relaxed"
          />
          <span id="message-hint" className="text-sm font-normal text-muted">
            Tell us who is travelling and what you hope to see.
          </span>
          {errors.message ? (
            <span id="message-error" role="alert" className="text-sm font-normal text-danger">
              {errors.message}
            </span>
          ) : null}
        </label>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-muted">
        This form is a preview. It does not send an email or save your details.
      </p>
      <button
        type="submit"
        disabled={status === "pending"}
        className="mt-4 inline-flex min-h-12 items-center rounded-lg bg-leaf px-5 font-semibold text-ivory transition-colors duration-200 hover:bg-leaf-deep disabled:cursor-wait disabled:opacity-70"
      >
        {status === "pending" ? "Preparing preview…" : "Send enquiry preview"}
      </button>
    </form>
  );
}

function TextField({ id, label, required = false, error, onChange, value, type = "text", ...props }) {
  return (
    <label className="grid gap-2 text-sm font-medium" htmlFor={id}>
      <span>
        {label} <FieldMark>{required ? "Required" : "Optional"}</FieldMark>
      </span>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        required={required}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 rounded-lg border border-sand bg-white px-3 text-base font-normal"
        {...props}
      />
      {error ? (
        <span id={`${id}-error`} role="alert" className="text-sm font-normal text-danger">
          {error}
        </span>
      ) : null}
    </label>
  );
}

function FieldMark({ children }) {
  return <span className="font-normal text-muted">{children}</span>;
}

function Summary({ term, value }) {
  return (
    <div className="grid gap-1 border-b border-sand pb-3 sm:grid-cols-[10rem_1fr]">
      <dt className="text-muted">{term}</dt>
      <dd>{value}</dd>
    </div>
  );
}
