import type { VercelRequest, VercelResponse } from "@vercel/node";

// Validate environment variables are present
const CRM_TOKEN = process.env.CRM_TOKEN;
const CRM_URL = process.env.CRM_URL || "https://inwo.crmcore.me/api/lead_management/api/affiliates";

function sanitize(str: string): string {
  return String(str).trim().replace(/[<>"'&]/g, "");
}

function splitName(fullName: string): { first_name: string; last_name: string } {
  const [first_name, ...lastNameParts] = (fullName || "Unknown").trim().split(" ");
  return {
    first_name: first_name || "Unknown",
    last_name: lastNameParts.length > 0 ? lastNameParts.join(" ") : ""
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!CRM_TOKEN) {
    console.error("CRM_TOKEN environment variable is not set");
    return res.status(500).json({ error: "CRM configuration error" });
  }

  const { name, email, phone, message, countryCode = "CH", leadType } = req.body ?? {};

  const { first_name, last_name } = splitName(sanitize(name ?? ""));
  const cleanEmail = sanitize(String(email ?? ""));
  const cleanMessage = message ? sanitize(String(message)) : "";

  // Formatting phone
  const DIAL_CODES: Record<string, string> = {
    CH: "41", FR: "33", BE: "32", CA: "1", US: "1", UK: "44", GB: "44", DE: "49",
    ES: "34", IT: "39", NL: "31", SE: "46", AU: "61", IN: "91", AE: "971",
    SG: "65", ZA: "27", BR: "55", MX: "52", JP: "81", CY: "357"
  };

  let cleanPhone = String(phone || "").replace(/[^0-9+]/g, '');
  const dialCode = DIAL_CODES[countryCode.toUpperCase()] || "41";
  
  if (cleanPhone.startsWith('+')) cleanPhone = cleanPhone.slice(1);
  if (cleanPhone.startsWith('00')) cleanPhone = cleanPhone.slice(2);
  if (cleanPhone.startsWith(dialCode)) cleanPhone = cleanPhone.slice(dialCode.length);
  if (cleanPhone.startsWith('0')) cleanPhone = cleanPhone.slice(1);
  
  const finalPhone = cleanPhone ? `00${dialCode}${cleanPhone}` : "0000000000";
  const countryName = countryCode.toLowerCase();

  const payload = {
    country_name: countryName,
    description: "Nova Ledger",
    phone: finalPhone,
    email: cleanEmail,
    first_name,
    last_name,
    custom_fields: {
      Source_ID: "website",
      How_Much_Invested: "0",
      Outline_Your_Case: cleanMessage || "",
    },
  };

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

    if (crmResponse.ok) {
      try {
        const url = (typeof process !== 'undefined' && process.env && process.env.VITE_DASHBOARD_URL) || "https://lead-dashboard-orcin.vercel.app/api/increment";
        const type = leadType || (cleanMessage ? "contact" : "signup");
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ website: "Nova Ledger", type, name: first_name + ' ' + last_name, email: cleanEmail})
        }).catch(() => {});
      } catch(e) {}
    }

    // Fire-and-forget: increment leads count
    try {
      const host = req.headers.host || "localhost:3000";
      const protocol = host.startsWith("localhost") ? "http" : "https";
      fetch(`${protocol}://${host}/api/leads-count`, { method: "POST" }).catch(() => {});
    } catch (e) {}

    if (!crmResponse.ok) {
      return res.status(200).json({ success: true, ignoredError: true });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    // Fire-and-forget: increment leads count
    try {
      const host = req.headers.host || "localhost:3000";
      const protocol = host.startsWith("localhost") ? "http" : "https";
      fetch(`${protocol}://${host}/api/leads-count`, { method: "POST" }).catch(() => {});
    } catch (e) {}

    return res.status(200).json({ success: true, ignoredError: true });
  }
}
