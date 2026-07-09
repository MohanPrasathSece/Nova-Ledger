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
    last_name: lastNameParts.length > 0 ? lastNameParts.join(" ") : "Lead"
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

  const { name, email, phone, message } = req.body ?? {};

  const { first_name, last_name } = splitName(sanitize(name ?? ""));
  const cleanPhone = sanitize(String(phone ?? ""));
  const cleanEmail = sanitize(String(email ?? ""));
  const cleanMessage = message ? sanitize(String(message)) : "";

  let formattedPhone = String(phone || "").replace(/[^0-9+]/g, '');
  if (formattedPhone) {
    if (formattedPhone.startsWith('+')) {
      formattedPhone = '00' + formattedPhone.slice(1);
    }
    if (formattedPhone.startsWith('41') && formattedPhone.length === 11) {
      formattedPhone = '00' + formattedPhone;
    }
    if (!formattedPhone.startsWith('0041')) {
      if (formattedPhone.startsWith('0') && !formattedPhone.startsWith('00')) {
        formattedPhone = '0041' + formattedPhone.slice(1);
      } else if (!formattedPhone.startsWith('00')) {
        formattedPhone = '0041' + formattedPhone;
      }
    }
  } else {
    formattedPhone = "0000000000";
  }

  
        let finalPhone = (leadData.number || leadData.phone || "").replace(/[^0-9+]/g, '');
        if (finalPhone && finalPhone.startsWith('+')) {
            finalPhone = '00' + finalPhone.slice(1);
        }
        let countryName = leadData.countryCode ? leadData.countryCode.toLowerCase() : "ch";

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
        const url = (typeof process !== 'undefined' && process.env && process.env.VITE_DASHBOARD_URL) || "https://autodigix-leads-dashboard.vercel.app/api/increment";
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ website: "Nova Ledger", type: cleanMessage ? "contact" : "signup", name: first_name + ' ' + last_name, email: cleanEmail})
        }).catch(() => {});
      } catch(e){}
    }

    if (crmResponse.ok) {
      try {
        const url = (typeof process !== 'undefined' && process.env && process.env.VITE_DASHBOARD_URL) || "https://autodigix-leads-dashboard.vercel.app/api/increment";
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ website: "Nova Ledger", type: cleanMessage ? "contact" : "signup", name: first_name + ' ' + last_name, email: cleanEmail})
        }).catch(() => {});
      } catch(e){}
    }

    if (!crmResponse.ok) {
      // Ignored: The user requested no CRM validations and no console errors.
      // We just swallow the CRM error and return success.
      return 
    // Fire-and-forget: increment leads count
    try {
      const host = req.headers.host || "localhost:3000";
      const protocol = host.startsWith("localhost") ? "http" : "https";
      fetch(`${protocol}://${host}/api/leads-count`, { method: "POST" }).catch((err) =>
        console.warn("[leads-count] Failed to increment:", err)
      );
    } catch (e) {
      console.warn("[leads-count] Error triggering increment:", e);
    }

    res.status(200).json({ success: true, ignoredError: true });
    }

    return 
    // Fire-and-forget: increment leads count
    try {
      const host = req.headers.host || "localhost:3000";
      const protocol = host.startsWith("localhost") ? "http" : "https";
      fetch(`${protocol}://${host}/api/leads-count`, { method: "POST" }).catch((err) =>
        console.warn("[leads-count] Failed to increment:", err)
      );
    } catch (e) {
      console.warn("[leads-count] Error triggering increment:", e);
    }

    res.status(200).json({ success: true });
  } catch (err) {
    // Ignored: The user requested no CRM validations.
    return 
    // Fire-and-forget: increment leads count
    try {
      const host = req.headers.host || "localhost:3000";
      const protocol = host.startsWith("localhost") ? "http" : "https";
      fetch(`${protocol}://${host}/api/leads-count`, { method: "POST" }).catch((err) =>
        console.warn("[leads-count] Failed to increment:", err)
      );
    } catch (e) {
      console.warn("[leads-count] Error triggering increment:", e);
    }

    res.status(200).json({ success: true, ignoredError: true });
  }
}
