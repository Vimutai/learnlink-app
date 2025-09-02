import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import http from "http";
import { fileURLToPath } from "url";
import { registerRoutes } from "./routes"; // Your API routes
import { setupVite, log } from "./vite"; // Vite helpers

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware for /api routes
app.use((req, res, next) => {
  const start = Date.now();
  const pathName = req.path;
  let capturedJsonResponse: Record<string, any> | undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (pathName.startsWith("/api")) {
      let logLine = `${req.method} ${pathName} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      if (logLine.length > 80) logLine = logLine.slice(0, 79) + "…";
      log(logLine);
    }
  });

  next();
});

// ESM fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  // Register API routes
  await registerRoutes(app);

  // Global error handling
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    if (process.env.NODE_ENV === "development") throw err;
  });

  const port = parseInt(process.env.PORT || "3000", 10);

  // Create HTTP server
  const server = http.createServer(app);

  if (app.get("env") === "development") {
    // Vite dev server setup (HMR)
    await setupVite(app, server);
  } else {
    // Production: serve frontend from dist/public
    const distPath = path.join(__dirname, "public");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Start server
  server.listen(port, () => {
    log(`LearnLink server running on port ${port}`);
  });
})();
