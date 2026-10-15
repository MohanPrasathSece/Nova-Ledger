import type { VercelRequest, VercelResponse } from "@vercel/node";

const CRM_TOKEN = process.env.CRM_TOKEN;
const CRM_URL = process.env.CRM_URL || "https://inwo.crmcore.me/api/lead_management/api/affiliates";
const DASHBOARD_URL = process.env.VITE_DASHBOARD_URL || "https://lead-dashboard-orcin.vercel.app/api/increment";

function sanitize(str: string): string {
  return String(str).trim().replace(/[<>"'&]/g, "");
}

function splitName(fullName: string): { first_name: string; last_name: string } {
  const parts = (fullName || "Unknown").trim().split(" ");
  return {
    first_name: parts[0] || "Unknown",
    last_name: parts.slice(1).join(" "),
  };
}

const COUNTRY_NAMES: Record<string, string> = {
  IE: "Ireland", CH: "Switzerland", FR: "France", BE: "Belgium",
  CA: "Canada", US: "United States", UK: "United Kingdom", GB: "United Kingdom",
  DE: "Germany", ES: "Spain", IT: "Italy", NL: "Netherlands", SE: "Sweden",
  AU: "Australia", IN: "India", AE: "United Arab Emirates", SG: "Singapore",
  ZA: "South Africa", BR: "Brazil", MX: "Mexico", JP: "Japan", CY: "Cyprus",
};

const DIAL_CODES: Record<string, string> = {
  IE: "353", CH: "41", FR: "33", BE: "32", CA: "1", US: "1", UK: "44", GB: "44", DE: "49",
  ES: "34", IT: "39", NL: "31", SE: "46", AU: "61", IN: "91", AE: "971",
  SG: "65", ZA: "27", BR: "55", MX: "52", JP: "81", CY: "357",
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!CRM_TOKEN) {
    console.error("[CRM] CRM_TOKEN is not set");
    return res.status(200).json({ success: true });
  }

  const { name, email, phone, message, countryCode = "CH", leadType } = req.body ?? {};

  const { first_name, last_name } = splitName(sanitize(name ?? ""));
  const cleanEmail = sanitize(String(email ?? ""));
  const cleanMessage = message ? sanitize(String(message)) : "";

  let cleanPhone = String(phone || "").replace(/[^0-9+]/g, "");
  const dialCode = DIAL_CODES[(countryCode || "CH").toUpperCase()] || "41";

  if (cleanPhone.startsWith("+")) cleanPhone = cleanPhone.slice(1);
  if (cleanPhone.startsWith("00")) cleanPhone = cleanPhone.slice(2);
  if (cleanPhone.startsWith(dialCode)) cleanPhone = cleanPhone.slice(dialCode.length);
  if (cleanPhone.startsWith("0")) cleanPhone = cleanPhone.slice(1);

  const finalPhone = cleanPhone ? `00${dialCode}${cleanPhone}` : "0000000000";
  const countryName = COUNTRY_NAMES[(countryCode || "CH").toUpperCase()] || countryCode;

  const payload = {
    country_name: countryName,
    phone: finalPhone,
    email: cleanEmail,
    first_name,
    last_name,
    description: "Nova Ledger",
    custom_fields: {
      Source_ID: "website",
      How_Much_Invested: "0",
      Outline_Your_Case: cleanMessage || "",
    },
  };

  console.log("[CRM] Submitting:", { email: cleanEmail, first_name, phone: finalPhone, country: countryName });

  try {
    const crmResponse = await fetch(CRM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CRM_TOKEN}`,
        "X-Affiliate-Token": CRM_TOKEN,
      },
      body: JSON.stringify(payload),
    });

    const responseText = await crmResponse.text().catch(() => "");
    console.log("[CRM] Status:", crmResponse.status, "| Body:", responseText);

    let responseData: any = {};
    try { responseData = JSON.parse(responseText); } catch { responseData = {}; }

    const rawMsg = responseText.toLowerCase();

    // Duplicate detection — CRM returns 409, or lead.duplicate === true in body
    const isDuplicate =
      crmResponse.status === 409 ||
      responseData?.lead?.duplicate === true ||
      (rawMsg.includes("already") && rawMsg.includes("exist"));

    if (isDuplicate) {
      return res.status(200).json({
        success: false,
        isDuplicate: true,
        error: "You have already contacted us. Our team will get back to you soon.",
      });
    }

    // Ping dashboard with full lead details — awaited to ensure it completes before function exits
    const dashPayload = {
      website: "Nova Ledger",
      type: leadType || (cleanMessage ? "contact" : "signup"),
      name: `${first_name} ${last_name}`.trim(),
      email: cleanEmail,
      phone: finalPhone,
      country: countryName,
      message: cleanMessage || "",
      timestamp: new Date().toISOString(),
    };
    try {
      await fetch(DASHBOARD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dashPayload),
      });
      console.log("[Dashboard] Pinged with full details:", dashPayload);
    } catch (e) {
      console.error("[Dashboard] Ping failed:", e);
    }

    // Always return success to not block the user
    return res.status(200).json({ success: true });

  } catch (err: any) {
    console.error("[CRM] Exception:", err?.message || err);
    // Still ping dashboard so the count is tracked
    try {
      await fetch(DASHBOARD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          website: "Nova Ledger",
          type: leadType || (cleanMessage ? "contact" : "signup"),
          name: `${first_name} ${last_name}`.trim(),
          email: cleanEmail,
          phone: finalPhone,
          country: countryName,
          message: cleanMessage || "",
          timestamp: new Date().toISOString(),
        }),
      });
    } catch {}
    return res.status(200).json({ success: true });
  }
}
