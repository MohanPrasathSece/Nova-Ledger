/**
 * Utility function to track Google Ads conversion events.
 * Safely checks if window.gtag exists before triggering event.
 */
export function trackGoogleAdsConversion(
  sendTo: string = "AW-18499202035/K1JYCOH-ipQdEPPXjfVE",
  value: number = 1.0,
  currency: string = "INR"
) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    try {
      (window as any).gtag("event", "conversion", {
        send_to: sendTo,
        value: value,
        currency: currency,
      });
      console.log(`[Google Ads] Conversion event tracked: ${sendTo}`, { value, currency });
    } catch (error) {
      console.error("[Google Ads] Error tracking conversion:", error);
    }
  }
}
