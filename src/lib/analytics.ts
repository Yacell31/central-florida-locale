export type AnalyticsEvent =
  | "cta_click"
  | "consultation_started"
  | "contact_submitted"
  | "buyer_intake_submitted"
  | "seller_intake_submitted"
  | "resource_download"
  | "newsletter_signup"
  | "community_view"
  | "community_comparison"
  | "article_view";
export function track(
  event: AnalyticsEvent,
  properties: { contentId?: string; location?: string } = {},
) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("locale:analytics", { detail: { event, ...properties } }),
  );
}
