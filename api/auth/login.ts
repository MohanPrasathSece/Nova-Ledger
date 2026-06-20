import type { VercelRequest, VercelResponse } from "@vercel/node";
import { put, list } from "@vercel/blob";
import { randomUUID } from "crypto";

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

function sanitize(str: string): string {
  return String(str).trim().replace(/[<>"'&]/g, "");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, action = "login", name, phone } = req.body ?? {};

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(String(email))) {
    return res.status(400).json({ error: "Invalid email address" });
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
      if (userFileExists) {
        return res.status(400).json({ error: "An account with this email already exists." });
      }

      // Create new user file
      const userData = {
        email: cleanEmail,
        name: sanitize(name ?? ""),
        phone: sanitize(phone ?? ""),
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
        }
      );
    } else {
      // login action
      if (!userFileExists) {
        return res.status(400).json({ error: "No account found with this email. Please sign up first." });
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
      }
    );

    return res.status(200).json({
      success: true,
      token: sessionToken,
      email: cleanEmail,
    });
  } catch (err) {
    console.error("Blob auth error:", err);
    return res.status(500).json({ error: "Authentication database query failed. Please try again." });
  }
}
