// Stub — lead counting is handled via dashboard ping in api/crm.ts
export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") return res.status(200).end();
  return res.status(200).json({ ok: true });
}
