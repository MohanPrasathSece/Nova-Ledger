import type { VercelRequest, VercelResponse } from "@vercel/node";

// Validate environment variables are present
const CRM_TOKEN = process.env.CRM_TOKEN;
const CRM_URL = process.env.CRM_URL || "https://inwo.crmcore.me/api/lead_management/api/affiliates";

function sanitize(str: string): string {
  return String(str).trim().replace(/[<>"'&]/g, "");
}

function splitName(fullName: string): { first_name: string; last_name: string } {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return { first_name: parts[0], last_name: "" };
  const last = parts.pop()!;
  return { first_name: parts.join(" "), last_name: last };
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

  const payload = {
    country_name: "cy",
    description: cleanMessage,
    phone: cleanPhone,
    email: cleanEmail,
    first_name,
    last_name,
    custom_fields: {
      Source_ID: "Website",
      Outline_Your_Case: cleanMessage,
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
      const text = await crmResponse.text();
      console.error("CRM error:", crmResponse.status, text);
      let errMsg = "Failed to submit to CRM. Please try again.";
      let isAlreadyExist = false;
      try {
        const parsed = JSON.parse(text);
        if (parsed.error) {
          errMsg = parsed.error;
          if (/already exist/i.test(parsed.error)) {
            isAlreadyExist = true;
          }
        } else if (parsed.message) {
          errMsg = parsed.message;
          if (/already exist/i.test(parsed.message)) {
            isAlreadyExist = true;
          }
        }
      } catch (e) {
        if (text) {
          errMsg = text;
          if (/already exist/i.test(text)) {
            isAlreadyExist = true;
          }
        }
      }

      if (isAlreadyExist) {
        return res.status(400).json({ error: "Ce compte existe déjà." });
      }

      return res.status(crmResponse.status).json({ error: errMsg });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("CRM submission error:", err);
    return res.status(500).json({ error: "Internal server error. Please try again." });
  }
}
