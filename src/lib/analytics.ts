const measurementId = "G-125W3VQB10";

type AnalyticsEvent =
  | "generate_lead"
  | "phone_click"
  | "email_click"
  | "money_page_view"
  | "blog_post_view";

type AnalyticsWindow = Window & {
  gtag?: (command: "event", name: AnalyticsEvent, parameters: Record<string, string>) => void;
};

export function getContentGroup(pathname: string) {
  if (pathname === "/" || pathname === "/work" || pathname.startsWith("/services/")) {
    return "Money pages";
  }
  if (/^\/insights\/[^/]+\/?$/.test(pathname)) return "Blog posts";
  return "Other";
}

// Only fixed labels and public page paths enter analytics. Never pass form data.
export function trackEvent(
  name: AnalyticsEvent,
  labels: { form_id?: "homepage" | "drawer"; link_position?: "footer" | "header" | "content" } = {},
) {
  if (typeof window === "undefined") return;
  try {
    const pathname = window.location.pathname;
    (window as AnalyticsWindow).gtag?.("event", name, {
      send_to: measurementId,
      page_location: `${window.location.origin}${pathname}`,
      page_path: pathname,
      content_group: getContentGroup(pathname),
      ...labels,
    });
  } catch {
    // Tracking must never prevent a visitor from contacting the business.
  }
}

export function trackAcceptedInquiry(
  result: { inquiryAccepted?: boolean } | null,
  formId: "homepage" | "drawer",
) {
  if (result?.inquiryAccepted === true) trackEvent("generate_lead", { form_id: formId });
}
