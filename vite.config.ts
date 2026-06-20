import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import fs from "fs";
import path from "path";

// Load environment variables manually from .env file if it exists
if (fs.existsSync(".env")) {
  const envContent = fs.readFileSync(".env", "utf-8");
  for (const line of envContent.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const idx = trimmed.indexOf("=");
      if (idx > 0) {
        const key = trimmed.substring(0, idx).trim();
        let val = trimmed.substring(idx + 1).trim();
        // Remove quotes if present
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.substring(1, val.length - 1);
        }
        process.env[key] = val;
      }
    }
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    {
      name: "api-dev-server",
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url && req.url.startsWith("/api/")) {
            // Read body
            let body = {};
            if (req.method === "POST") {
              const buffers = [];
              for await (const chunk of req) {
                buffers.push(chunk);
              }
              const data = Buffer.concat(buffers).toString();
              try {
                body = JSON.parse(data);
              } catch (e) {
                // Ignore parsing errors
              }
            }

            // Parse query params if any
            const urlObj = new URL(req.url, `http://${req.headers.host || "localhost"}`);
            const query = Object.fromEntries(urlObj.searchParams.entries());

            // Build mock VercelReq
            const vercelReq = Object.assign(req, {
              body,
              query,
              cookies: {},
            });

            // Build mock VercelRes
            const vercelRes = Object.assign(res, {
              status(code: number) {
                res.statusCode = code;
                return vercelRes;
              },
              json(data: any) {
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(data));
                return vercelRes;
              },
              send(data: any) {
                res.end(data);
                return vercelRes;
              },
            }) as any;

            try {
              // Map url to file path
              const cleanPath = urlObj.pathname;
              let filePath = "";
              if (cleanPath === "/api/crm") {
                filePath = "./api/crm.ts";
              } else if (cleanPath === "/api/auth/login") {
                filePath = "./api/auth/login.ts";
              }

              if (filePath && fs.existsSync(filePath)) {
                // Load and run the handler using Vite's SSR loading
                const module = await server.ssrLoadModule(filePath);
                if (module && typeof module.default === "function") {
                  await module.default(vercelReq, vercelRes);
                  return;
                }
              }
            } catch (err) {
              console.error("Error running dev API handler:", err);
              vercelRes.status(500).json({ error: "Internal dev server error", details: String(err) });
              return;
            }
          }
          next();
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    port: 8080,
    host: true,
  },
});

