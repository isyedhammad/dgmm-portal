// ===================================================================
// GOVERNMENT OF THE PUNJAB — DIRECTORATE GENERAL OF MINES & MINERALS
// EXECUTIVE MONITORING & REVENUE OPERATIONS PORTAL
// BACKEND API SERVER & STATIC FILE SERVICE (server.js)
// Zero-dependency pure Node.js server (Runs on Render, Linux, Windows)
// ===================================================================

const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

// MIME types dictionary
const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf"
};

// Load initial data from data.js
let dgmData = {};
try {
  const dataJsContent = fs.readFileSync(path.join(__dirname, "data.js"), "utf8");
  const sandbox = { window: {} };
  const fn = new Function("window", dataJsContent);
  fn(sandbox.window);
  dgmData = sandbox.window.DGM_DATA || {};
  console.log("DGM&M Database loaded successfully from data.js");
} catch (e) {
  console.error("Warning: Error evaluating data.js:", e.message);
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // REST API Endpoints
  if (pathname === "/api/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      status: "healthy",
      service: "DGM&M Punjab Executive Monitoring Portal",
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    }));
    return;
  }

  if (pathname === "/api/meta") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(dgmData.meta || {}));
    return;
  }

  if (pathname === "/api/kpis") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      totalEpa: (dgmData.epaCases || []).length,
      totalSites: (dgmData.geoMiningSites || []).length,
      totalAppeals: (dgmData.appealsCases || []).length,
      fiveYearRoyaltyTotal: dgmData.fiveYearSummary ? dgmData.fiveYearSummary.totalGrandAmountPaidPKR : 0,
      fiveYearProductionTotal: dgmData.fiveYearSummary ? dgmData.fiveYearSummary.totalProductionTons : 0,
      concessions: dgmData.concessions || {},
      regionalPerformance: dgmData.regionalPerformance || []
    }));
    return;
  }

  if (pathname === "/api/epa") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(dgmData.epaCases || []));
    return;
  }

  if (pathname === "/api/financials") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(dgmData.fiveYearSummary || {}));
    return;
  }

  if (pathname === "/api/producers" || pathname === "/api/cement-audit") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(dgmData.majorProducers || []));
    return;
  }

  if (pathname === "/api/map/sites") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(dgmData.geoMiningSites || []));
    return;
  }

  if (pathname === "/api/auctions") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(dgmData.auctionRecords || []));
    return;
  }

  if (pathname === "/api/licensing") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      renewals: dgmData.renewalsDecided || [],
      sublettingCases: dgmData.sublettingCases || []
    }));
    return;
  }

  if (pathname === "/api/appeals") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(dgmData.appealsCases || []));
    return;
  }

  if (pathname === "/api/audit-findings") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(dgmData.dataQualityAudit || []));
    return;
  }

  // Static File Serving
  let filePath = path.join(PUBLIC_DIR, pathname === "/" ? "index.html" : pathname);

  // Security check: ensure path is within PUBLIC_DIR
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    res.end("403 Forbidden");
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA routing
      filePath = path.join(PUBLIC_DIR, "index.html");
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("500 Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`DGM&M Executive Operations & Monitoring Portal`);
  console.log(`Government of the Punjab — Mining Intelligence`);
  console.log(`Server listening on port: ${PORT}`);
  console.log(`Local Access: http://localhost:${PORT}`);
  console.log(`=======================================================`);
});
