/**
 * Utility function to track Google Ads conversion events.
 * Safely calls window.gtag_report_conversion or window.gtag before triggering event.
 */
export function trackGoogleAdsConversion(
  sendTo: string = "AW-18499202035/VDr3CKSfjZsdEPPXjfVE",
  value: number = 1.0,
  currency: string = "INR",
  url?: string
) {
  if (typeof window !== "undefined") {
    // If the global gtag_report_conversion snippet is available and tracking the default lead form
    if (
      sendTo === "AW-18499202035/VDr3CKSfjZsdEPPXjfVE" &&
      typeof (window as any).gtag_report_conversion === "function"
    ) {
      try {
        (window as any).gtag_report_conversion(url);
        console.log(`[Google Ads] Conversion event tracked via gtag_report_conversion: ${sendTo}`, {
          value,
          currency,
          url,
        });
        return;
      } catch (error) {
        console.warn("[Google Ads] Error calling gtag_report_conversion, falling back to gtag:", error);
      }
    }

    if ((window as any).gtag) {
      try {
        const payload: Record<string, any> = {
          send_to: sendTo,
          value: value,
          currency: currency,
        };
        if (url) {
          payload.event_callback = function () {
            window.location.href = url;
          };
        }
        (window as any).gtag("event", "conversion", payload);
        console.log(`[Google Ads] Conversion event tracked: ${sendTo}`, { value, currency });
      } catch (error) {
        console.error("[Google Ads] Error tracking conversion:", error);
      }
    }
  }
}

