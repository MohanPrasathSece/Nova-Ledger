/**
 * Utility function to track events with Meta Pixel (fbq).
 * Safely checks if window.fbq exists before calling it.
 */
export function trackMetaEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== "undefined" && (window as any).fbq) {
    try {
      if (params) {
        (window as any).fbq("track", eventName, params);
      } else {
        (window as any).fbq("track", eventName);
      }
      console.log(`[Meta Pixel] Tracked event: ${eventName}`, params || "");
    } catch (error) {
      console.error("[Meta Pixel] Error tracking event:", error);
    }
  }
}
