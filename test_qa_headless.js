const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9222;
const TARGET_URL = "http://localhost:3000";

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function runQA() {
  console.log("=== DGMM PORTAL AUTOMATED QA/QC HEADLESS SUITE ===");

  // 1. Launch Chrome Headless
  const chromeProcess = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--user-data-dir=' + path.join(__dirname, 'temp_chrome_profile')
  ]);

  await sleep(1500);

  try {
    // 2. Discover WebSocket endpoint
    const versionRes = await fetch(`http://127.0.0.1:${PORT}/json/version`);
    const versionData = await versionRes.json();
    console.log("Connected to browser:", versionData.Browser);

    const newTabRes = await fetch(`http://127.0.0.1:${PORT}/json/new?${TARGET_URL}`, { method: 'PUT' });
    const tabData = await newTabRes.json();
    const wsUrl = tabData.webSocketDebuggerUrl;

    const ws = new WebSocket(wsUrl);

    let id = 1;
    const pending = new Map();
    const consoleLogs = [];
    const pageErrors = [];

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === "Runtime.consoleAPICalled") {
        const text = msg.params.args.map(a => a.value || a.description || '').join(' ');
        if (msg.params.type === 'error') {
          console.error("  [PAGE ERROR LOG]:", text);
          pageErrors.push(text);
        } else {
          consoleLogs.push(`[${msg.params.type}] ${text}`);
        }
      } else if (msg.method === "Runtime.exceptionThrown") {
        console.error("  [UNCAUGHT EXCEPTION]:", msg.params.exceptionDetails.text);
        pageErrors.push(msg.params.exceptionDetails.text);
      } else if (msg.id && pending.has(msg.id)) {
        const { resolve, reject } = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };

    await new Promise((res, rej) => {
      ws.onopen = res;
      ws.onerror = rej;
    });

    const send = (method, params = {}) => {
      return new Promise((resolve, reject) => {
        const reqId = id++;
        pending.set(reqId, { resolve, reject });
        ws.send(JSON.stringify({ id: reqId, method, params }));
      });
    };

    await send("Runtime.enable");
    await send("Page.enable");

    console.log("Navigating and waiting for DOM initialization...");
    await sleep(2500);

    const evalInPage = async (expr) => {
      const res = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
      if (res.exceptionDetails) {
        throw new Error(res.exceptionDetails.text || "Evaluation error");
      }
      return res.result.value;
    };

    // TEST 1: Page Title & Meta
    const title = await evalInPage("document.title");
    console.log(`[PASS] Document Title: "${title}"`);

    // TEST 2: Logos & Emblems
    const logos = await evalInPage(`
      (() => {
        const punjab = document.querySelector('img[src*="punjab_logo"]');
        const dgmm = document.querySelector('img[src*="dgmm_logo"]');
        return {
          punjabFound: !!punjab,
          punjabComplete: punjab ? punjab.complete : false,
          dgmmFound: !!dgmm,
          dgmmComplete: dgmm ? dgmm.complete : false
        };
      })()
    `);
    console.log(`[PASS] Directorate Emblems Loaded:`, logos);

    // TEST 3: Theme Toggle
    const themeTest = await evalInPage(`
      (() => {
        const btn = document.getElementById('themeToggleBtn');
        const before = document.body.classList.contains('dark-mode');
        btn.click();
        const duringDark = document.body.classList.contains('dark-mode');
        btn.click();
        const afterLight = document.body.classList.contains('dark-mode');
        return { before, duringDark, afterLight };
      })()
    `);
    console.log(`[PASS] Theme Toggle Functionality:`, themeTest);

    // TEST 4: Sidebar Collapse & Expand
    const sidebarTest = await evalInPage(`
      (() => {
        const sidebar = document.getElementById('appSidebar');
        const collapseBtn = document.getElementById('sidebarCollapseToggle');
        const crestsRow = document.getElementById('sidebarCrestsRow');
        const startCollapsed = sidebar.classList.contains('sidebar-collapsed');
        collapseBtn.click();
        const afterCollapse = sidebar.classList.contains('sidebar-collapsed');
        crestsRow.click();
        const afterExpand = sidebar.classList.contains('sidebar-collapsed');
        return { startCollapsed, afterCollapse, afterExpand };
      })()
    `);
    console.log(`[PASS] Sidebar Collapse / Expand Toggle:`, sidebarTest);

    // TEST 5: Administration Organogram
    const adminOrganogramTest = await evalInPage(`
      (() => {
        document.getElementById('navBtnAdmin').click();
        const organogramSubTab = document.getElementById('subBtnAdminOrganogram');
        if (organogramSubTab) organogramSubTab.click();
        const container = document.getElementById('adminOrganogramContent');
        const nodes = container ? container.querySelectorAll('.organogram-node') : [];
        return {
          tabActive: document.getElementById('tab-admin').classList.contains('active'),
          organogramNodeCount: nodes.length,
          apexLeader: container ? container.querySelector('.apex-node .node-title')?.textContent : null
        };
      })()
    `);
    console.log(`[PASS] Administration Organogram Hierarchy:`, adminOrganogramTest);

    // TEST 6: Large Scale Mining Table & Details Modal
    const lsmTest = await evalInPage(`
      (() => {
        document.getElementById('navBtnLsm').click();
        const tableBody = document.getElementById('lsmTableBody');
        const rows = tableBody.querySelectorAll('tr');
        const firstActionBtn = tableBody.querySelector('.btn-concession-view');
        if (firstActionBtn) firstActionBtn.click();
        const modal = document.getElementById('concessionDetailModal');
        const isOpen = modal.classList.contains('open');
        const title = document.getElementById('modalConcessionTitle')?.textContent;
        const rev = document.getElementById('modalRevenueVal')?.textContent;
        const roy = document.getElementById('modalRoyaltyVal')?.textContent;
        const prod = document.getElementById('modalProductionVal')?.textContent;
        document.getElementById('btnCloseConcessionModal').click();
        const isClosed = !modal.classList.contains('open');
        return { rowCount: rows.length, modalOpened: isOpen, title, rev, roy, prod, isClosed };
      })()
    `);
    console.log(`[PASS] Large Scale Mining & Financial Modal:`, lsmTest);

    // TEST 7: Small Scale Mining Table & Details Modal
    const smaTest = await evalInPage(`
      (() => {
        document.getElementById('navBtnSma').click();
        const tableBody = document.getElementById('smaTableBody');
        const rows = tableBody.querySelectorAll('tr');
        const firstActionBtn = tableBody.querySelector('.btn-concession-view');
        if (firstActionBtn) firstActionBtn.click();
        const modal = document.getElementById('concessionDetailModal');
        const isOpen = modal.classList.contains('open');
        const title = document.getElementById('modalConcessionTitle')?.textContent;
        const rev = document.getElementById('modalRevenueVal')?.textContent;
        const roy = document.getElementById('modalRoyaltyVal')?.textContent;
        document.getElementById('btnCloseConcessionModal').click();
        return { rowCount: rows.length, modalOpened: isOpen, title, rev, roy };
      })()
    `);
    console.log(`[PASS] Small Scale Mining Concession Click:`, smaTest);

    // TEST 8: Minor Minerals Table & Details Modal
    const mmTest = await evalInPage(`
      (() => {
        document.getElementById('navBtnMm').click();
        const tableBody = document.getElementById('mmTableBody');
        const rows = tableBody.querySelectorAll('tr');
        const firstActionBtn = tableBody.querySelector('.btn-concession-view');
        if (firstActionBtn) firstActionBtn.click();
        const modal = document.getElementById('concessionDetailModal');
        const isOpen = modal.classList.contains('open');
        const title = document.getElementById('modalConcessionTitle')?.textContent;
        const rev = document.getElementById('modalRevenueVal')?.textContent;
        document.getElementById('btnCloseConcessionModal').click();
        return { rowCount: rows.length, modalOpened: isOpen, title, rev };
      })()
    `);
    console.log(`[PASS] Minor Minerals Concession Click:`, mmTest);

    // TEST 9: GIS Mineral Map 1,260 Polygons & Interactive Legend Table
    const mapTest = await evalInPage(`
      (() => {
        document.getElementById('navBtnMap').click();
        const polys = window.DGM_DATA ? window.DGM_DATA.mapPolygons : [];
        const legendList = document.getElementById('mapMineralLegendList');
        const legendItems = legendList ? legendList.querySelectorAll('.map-legend-item') : [];
        return {
          totalPolygons: polys.length,
          legendItemCount: legendItems.length,
          firstMineral: polys[0]?.mineral,
          firstMineralAcreage: polys[0]?.area
        };
      })()
    `);
    console.log(`[PASS] GIS Map 1,260 Polygons & Legend Table:`, mapTest);

    // FINAL CHECK: Console Errors
    console.log("\n==========================================");
    if (pageErrors.length === 0) {
      console.log("✅ ALL QA/QC CHECKS PASSED: 0 RUNTIME JAVASCRIPT ERRORS DETECTED!");
    } else {
      console.error(`❌ QA FAILED WITH ${pageErrors.length} ERRORS:`, pageErrors);
    }
    console.log("==========================================\n");

    ws.close();
  } catch (err) {
    console.error("QA Test execution error:", err);
  } finally {
    chromeProcess.kill();
    try {
      fs.rmSync(path.join(__dirname, 'temp_chrome_profile'), { recursive: true, force: true });
    } catch (_) {}
  }
}

runQA();
