"use client";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { track } from "@/lib/analytics";
export function LeadForm({
  kind = "contact",
  source = "",
  compact = false,
  defaultService,
}: {
  kind?: string;
  source?: string;
  compact?: boolean;
  defaultService?: string;
}) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const [service, setService] = useState(
    defaultService ||
      (["buying", "selling", "investing", "relocating"].includes(kind)
        ? kind
        : "buying"),
  );
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "loading") return;
    const data = new FormData(e.currentTarget);
    setState("loading");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.message || "We could not send your request. Please try again.",
        );
      setState("success");
      track(
        kind === "newsletter"
          ? "newsletter_signup"
          : kind === "buying"
            ? "buyer_intake_submitted"
            : kind === "selling"
              ? "seller_intake_submitted"
              : "contact_submitted",
        { location: source.split("?")[0].slice(0, 80) },
      );
      setMessage(result.message);
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Please try again.");
    }
  }
  return (
    <form
      onSubmit={submit}
      className={`lead-form ${compact ? "compact-form" : ""}`}
    >
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="source" value={source} />
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {!compact && kind !== "newsletter" && (
        <label>
          Full name
          <input
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            placeholder="Your name"
          />
        </label>
      )}
      <label className={compact ? "visually-hidden-label" : ""}>
        {compact ? "Email address" : "Email address"}
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder="Your email address"
        />
      </label>
      {!compact && kind !== "newsletter" && (
        <>
          <label>
            Phone <span>(optional)</span>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={30}
              placeholder="Your phone number"
            />
          </label>
          <label>
            How can I help?
            <select
              name="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option value="buying">Buying a home</option>
              <option value="selling">Selling a home</option>
              <option value="investing">Investing</option>
              <option value="relocating">Relocating</option>
              <option value="neighborhood">A neighborhood question</option>
              <option value="general">A general question</option>
            </select>
          </label>
          {kind !== "contact" && (
            <div className="form-row">
              <label>
                Timeline
                <select name="timeline">
                  <option>Just exploring</option>
                  <option>Within 3 months</option>
                  <option>3–6 months</option>
                  <option>6–12 months</option>
                  <option>More than a year</option>
                </select>
              </label>
              <label>
                Area of interest
                <input
                  name="area"
                  maxLength={150}
                  placeholder="Where are you considering?"
                />
              </label>
            </div>
          )}
          <label>
            {service === "selling"
              ? "Tell me about the property and your goals"
              : service === "investing"
                ? "Your investment goals and criteria"
                : service === "relocating"
                  ? "Where are you moving from, and what matters most?"
                  : "What would you like to plan?"}
            <textarea
              name="details"
              rows={4}
              maxLength={3000}
              placeholder="Share a little about your goals, questions or timeline."
              required
            />
          </label>
          <label className="checkbox-label">
            <input name="consent" type="checkbox" required />I agree to be
            contacted about this inquiry and have read the{" "}
            <Link href="/privacy">privacy notice</Link>.
          </label>
          <label className="checkbox-label">
            <input name="marketing" type="checkbox" />
            I’d also like to receive The Central Florida Edit. (Optional)
          </label>
        </>
      )}
      <button
        type="submit"
        className="button"
        disabled={state === "loading" || state === "success"}
      >
        {state === "loading" ? (
          <LoaderCircle size={16} className="spin" />
        ) : state === "success" ? (
          <Check size={16} />
        ) : null}
        {state === "loading"
          ? "Sending…"
          : state === "success"
            ? "Request received"
            : kind === "newsletter"
              ? "Join The Edit"
              : "Send Your Message"}
        <ArrowUpRight size={16} />
      </button>
      <p className="form-note">
        {kind === "newsletter"
          ? "Practical insights. A thoughtful inbox. Unsubscribe anytime."
          : "No pressure. Just a useful first conversation."}{" "}
        <Link href="/privacy">Privacy</Link>
      </p>
      {state === "error" && (
        <p role="alert" className="form-error">
          {message}
        </p>
      )}
      {state === "success" && (
        <p role="status" className="form-success">
          {message}
        </p>
      )}
    </form>
  );
}
export function Newsletter({ dark = false }: { dark?: boolean }) {
  return (
    <section className={`newsletter ${dark ? "dark" : ""}`}>
      <div className="container newsletter-inner">
        <div>
          <p className="eyebrow">A little local perspective, delivered.</p>
          <h2>
            The Central Florida <em>Edit.</em>
          </h2>
          <p>
            Curated real estate insights, neighborhood updates and
            <br className="desktop-break" /> practical tips—delivered to your
            inbox.
          </p>
        </div>
        <LeadForm kind="newsletter" source="newsletter-section" compact />
      </div>
    </section>
  );
}
