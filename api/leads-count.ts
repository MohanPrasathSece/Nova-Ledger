import { put, list, download } from "@vercel/blob";

const BLOB_KEY = "leads-count.json";
const TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
const STORE_ID = process.env.BLOB_STORE_ID;

async function getCount(): Promise<number> {
  try {
    const { blobs } = await list({ prefix: BLOB_KEY, token: TOKEN, storeId: STORE_ID });
    if (blobs.length === 0) return 0;

    const { body } = await download(blobs[0].url, { token: TOKEN });
    const text = await new Response(body).text();
    const json = JSON.parse(text) as { count?: unknown };
    return typeof json.count === "number" ? json.count : 0;
  } catch {
    return 0;
  }
}

async function setCount(count: number): Promise<void> {
  await put(BLOB_KEY, JSON.stringify({ count }), {
    access: "private",
    contentType: "application/json",
    allowOverwrite: true,
    addRandomSuffix: false,
    token: TOKEN,
    storeId: STORE_ID,
    cacheControlMaxAge: 0,
  });
}

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    if (req.method === "GET") {
      const count = await getCount();
      return res.status(200).json({ count });
    }

    if (req.method === "POST") {
      const current = await getCount();
      const next = current + 1;
      await setCount(next);
      console.log(`[leads-count] incremented → ${next}`);
      return res.status(200).json({ count: next });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("[leads-count] Error:", err);
    return res.status(500).json({ error: "Internal server error", details: String(err) });
  }
}
