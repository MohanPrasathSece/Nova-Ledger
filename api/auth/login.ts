import type { VercelRequest, VercelResponse } from "@vercel/node";
import { put, list } from "@vercel/blob";
import { randomUUID } from "crypto";

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

function sanitize(str: string): string {
  return String(str).trim().replace(/[<>"'&]/g, "");
}

const DIAL_CODES: Record<string, string> = {
  IE: "353", CH: "41", FR: "33", BE: "32", CA: "1", US: "1", UK: "44", GB: "44", DE: "49",
  ES: "34", IT: "39", NL: "31", SE: "46", AU: "61", IN: "91", AE: "971",
  SG: "65", ZA: "27", BR: "55", MX: "52", JP: "81", CY: "357"
};

function formatPhone(phone: string, countryCode: string, prefix: string) {
  if (!phone) return "";
  let cleanPhone = phone.replace(/[^0-9+]/g, '');
  const dialCode = DIAL_CODES[(countryCode || "CH").toUpperCase()] || "41";
  
  if (cleanPhone.startsWith('+')) cleanPhone = cleanPhone.slice(1);
  if (cleanPhone.startsWith('00')) cleanPhone = cleanPhone.slice(2);
  if (cleanPhone.startsWith(dialCode)) cleanPhone = cleanPhone.slice(dialCode.length);
  if (cleanPhone.startsWith('0')) cleanPhone = cleanPhone.slice(1);
  
  return `${prefix}${dialCode}${cleanPhone}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, action = "login", name, phone, countryCode = "CH" } = req.body ?? {};

  if (!email) {
    return res.status(400).json({ error: "L'adresse e-mail est requise." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(String(email))) {
    return res.status(400).json({ error: "L'adresse e-mail est invalide." });
  }

  const cleanEmail = sanitize(String(email)).toLowerCase();

  if (!BLOB_TOKEN) {
    // In development without blob token, return a dev session
    const devToken = `dev_${randomUUID()}`;
    return res.status(200).json({ success: true, token: devToken, email: cleanEmail });
  }

  try {
    // Check if user exists in the "users" prefix in Vercel Blob
    const { blobs } = await list({
      prefix: `users/${cleanEmail}.json`,
      token: BLOB_TOKEN,
    });
    
    const userFileExists = blobs.some(b => b.pathname === `users/${cleanEmail}.json`);

    if (action === "signup") {
      if (!userFileExists) {
        const formattedPhone = formatPhone(phone, countryCode, "+");
        // Create new user file
        const userData = {
          email: cleanEmail,
          name: sanitize(name ?? ""),
          phone: formattedPhone,
          country: countryCode.toLowerCase(),
          createdAt: new Date().toISOString(),
        };

        await put(
          `users/${cleanEmail}.json`,
          JSON.stringify(userData),
          {
            access: "public",
            token: BLOB_TOKEN,
            contentType: "application/json",
            addRandomSuffix: false,
            cacheControlMaxAge: 0,
          }
        );
        
        try {
          const url = (typeof process !== 'undefined' && process.env && process.env.VITE_DASHBOARD_URL) || "https://lead-dashboard-orcin.vercel.app/api/increment";
          await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ website: "Nova Ledger", type: "signup", name: userData.name, email: cleanEmail })
          }).catch(() => {});
        } catch(e) {}
      } else {
        return res.status(400).json({ error: "Ce compte existe déjà." });
      }
    } else {
      // login action
      if (!userFileExists) {
        return res.status(400).json({ error: "Aucun compte trouvé avec cet e-mail. Veuillez vous inscrire d'abord." });
      }
    }

    // Create session token and record session
    const sessionToken = randomUUID();
    const sessionData = {
      email: cleanEmail,
      token: sessionToken,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
    };

    // Store session in Vercel Blob
    await put(
      `sessions/${sessionToken}.json`,
      JSON.stringify(sessionData),
      {
        access: "public",
        token: BLOB_TOKEN,
        contentType: "application/json",
        addRandomSuffix: false,
        cacheControlMaxAge: 0,
      }
    );

    return res.status(200).json({
      success: true,
      token: sessionToken,
      email: cleanEmail,
    });
  } catch (err) {
    console.error("Blob auth error:", err);
    return res.status(500).json({ error: "Erreur de connexion à la base de données. Veuillez réessayer." });
  }
}
