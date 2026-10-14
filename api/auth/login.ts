import type { VercelRequest, VercelResponse } from "@vercel/node";
import { randomUUID } from "crypto";

function sanitize(str: string): string {
  return String(str).trim().replace(/[<>"'&]/g, "");
}

// Lightweight auth — no blob storage, just issue a session token
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body ?? {};

  if (!email) {
    return res.status(400).json({ error: "L'adresse e-mail est requise." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(String(email))) {
    return res.status(400).json({ error: "L'adresse e-mail est invalide." });
  }

  const cleanEmail = sanitize(String(email)).toLowerCase();
  const sessionToken = randomUUID();

  return res.status(200).json({
    success: true,
    token: sessionToken,
    email: cleanEmail,
  });
}
