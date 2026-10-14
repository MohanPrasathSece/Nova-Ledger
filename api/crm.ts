import type { VercelRequest, VercelResponse } from "@vercel/node";

const CRM_TOKEN = process.env.CRM_TOKEN;
const CRM_URL = process.env.CRM_URL || "https://inwo.crmcore.me/api/lead_management/api/affiliates";

function sanitize(str: string): string {
  return String(str).trim().replace(/[<>"'&]/g, "");
}

function splitName(fullName: string): { first_name: string; last_name: string } {
  const [first_name, ...lastNameParts] = (fullName || "Unknown").trim().split(" ");
  return {
    first_name: first_name || "Unknown",
    last_name: lastNameParts.length > 0 ? lastNameParts.join(" ") : "",
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
    return res.status(200).json({ success: true, warning: "CRM not configured" });
  }

  const { name, email, phone, message, countryCode = "CH", leadType } = req.body ?? {};

  const { first_name, last_name } = splitName(sanitize(name ?? ""));
  const cleanEmail = sanitize(String(email ?? ""));
  const cleanMessage = message ? sanitize(String(message)) : "";

  // Format phone: strip everything except digits, then prepend 00{dialCode}
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

  console.log("[CRM] Submitting lead:", { email: cleanEmail, first_name, last_name, phone: finalPhone, country: countryName });

  // Fire-and-forget leads count increment
  try {
    const host = req.headers.host || "localhost:3000";
    const protocol = host.startsWith("localhost") ? "http" : "https";
    fetch(`${protocol}://${host}/api/leads-count`, { method: "POST" }).catch(() => {});
  } catch (_) {}

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

    // Detect duplicate lead — CRM returns 409 for duplicates
    const isDuplicate =
      crmResponse.status === 409 ||
      rawMsg.includes("duplicate") ||
      (rawMsg.includes("already") && rawMsg.includes("exist"));

    if (isDuplicate) {
      return res.status(200).json({
        success: false,
        isDuplicate: true,
        error: "You have already contacted us. Please wait while our team reviews your request. We'll get back to you soon.",
      });
    }

    // CRM returned HTTP-level error
    if (!crmResponse.ok) {
      console.error("[CRM] Non-ok response:", crmResponse.status, responseText);
      return res.status(200).json({ success: true, _crmStatus: crmResponse.status });
    }

    // CRM returned 200 but body contains an error (e.g. "Lead is not valid!")
    if (responseData?.error && !responseData?.lead && !responseData?.id) {
      console.error("[CRM] Body-level error on 200:", responseData.error);
      // Don't block the user — log and continue
      return res.status(200).json({ success: true, _crmBodyError: responseData.error });
    }

    // CRM accepted — ping dashboard
    try {
      const dashUrl =
        process.env.VITE_DASHBOARD_URL || "https://lead-dashboard-orcin.vercel.app/api/increment";
      const type = leadType || (cleanMessage ? "contact" : "signup");
      fetch(dashUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website: "Nova Ledger", type, name: `${first_name} ${last_name}`, email: cleanEmail }),
      }).catch(() => {});
    } catch (_) {}

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("[CRM] Fetch exception:", err?.message || err);
    // Don't block the user on a network error to CRM
    return res.status(200).json({ success: true, _crmError: "network" });
  }
}
