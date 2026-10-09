type Props = Record<string, string | number | boolean | undefined>;

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  plausible?: (event: string, options?: { props?: Props }) => void;
};

// Forwards conversion events to whichever analytics script is on the page
// (GA4 via VITE_GA_ID, GTM's dataLayer, or Plausible). A no-op when none is.
export function track(event: string, props: Props = {}) {
  if (typeof window === "undefined") return;
  const w = window as AnalyticsWindow;
  try {
    if (w.gtag) w.gtag("event", event, props);
    else w.dataLayer?.push({ event, ...props });
    w.plausible?.(event, { props });
  } catch {
    // Analytics must never break the page.
  }
}
