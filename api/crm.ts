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

  const payload = {
    country_name: "ch",
    description: cleanMessage || "Signup Lead",
    phone: formattedPhone,
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

    if (!crmResponse.ok) {
      // Ignored: The user requested no CRM validations and no console errors.
      // We just swallow the CRM error and return success.
      return res.status(200).json({ success: true, ignoredError: true });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    // Ignored: The user requested no CRM validations.
    return res.status(200).json({ success: true, ignoredError: true });
  }
}
