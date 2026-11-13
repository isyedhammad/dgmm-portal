const { spawn } = require('child_process');
const path = require('path');
const http = require('http');
const fs = require('fs');

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9223;
const HTTP_PORT = 8090;

function startStaticServer() {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
  };

  const server = http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/') reqPath = '/index.html';
    const filePath = path.join(__dirname, decodeURIComponent(reqPath));

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      res.end(data);
    });
  });

  return new Promise(resolve => {
    server.listen(HTTP_PORT, () => {
      console.log(`Local test server running on http://127.0.0.1:${HTTP_PORT}`);
      resolve(server);
    });
  });
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function runAnalyticsQA() {
  console.log('=== STARTING ADVANCED ANALYTICS MODULE QA/QC HEADLESS SUITE ===');
  const server = await startStaticServer();

  const profileDir = path.join(__dirname, 'temp_chrome_profile_analytics_qa');
  const chromeProcess = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${profileDir}`
  ]);

  await sleep(1500);

  try {
    const versionRes = await fetch(`http://127.0.0.1:${PORT}/json/version`);
    const versionData = await versionRes.json();
    console.log('Connected to Chrome Headless:', versionData.Browser);

    const targetUrl = `http://127.0.0.1:${HTTP_PORT}/index.html`;
    const newTabRes = await fetch(`http://127.0.0.1:${PORT}/json/new?${targetUrl}`, { method: 'PUT' });
    const tabData = await newTabRes.json();
    const wsUrl = tabData.webSocketDebuggerUrl;

    const ws = new WebSocket(wsUrl);

    let id = 1;
    const pending = new Map();
    const pageErrors = [];

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        const text = msg.params.args.map(a => a.value || a.description || '').join(' ');
        if (msg.params.type === 'error') {
          console.error('  [PAGE CONSOLE ERROR]:', text);
          pageErrors.push(text);
        }
      } else if (msg.method === 'Runtime.exceptionThrown') {
        console.error('  [UNCAUGHT EXCEPTION]:', msg.params.exceptionDetails.text);
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

    await send('Runtime.enable');
    await send('Page.enable');

    console.log('Waiting for DOM initialization...');
    await sleep(2500);

    const evalInPage = async (expr) => {
      const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
      if (res.exceptionDetails) {
        console.error('EVAL EXCEPTION DETAILS:', JSON.stringify(res.exceptionDetails, null, 2));
        throw new Error(res.exceptionDetails.exception?.description || res.exceptionDetails.text || 'Evaluation error');
      }
      return res.result.value;
    };

    // TEST 1: Activate Analytics Tab and Verify Routing
    console.log('\n--- TEST 1: Analytics Tab Navigation & Breadcrumbs ---');
    const navResult = await evalInPage(`
      (() => {
        const navBtn = document.getElementById('navBtnAnalytics');
        if (!navBtn) return { error: 'navBtnAnalytics not found' };
        navBtn.click();
        const activePane = document.querySelector('.tab-pane.active')?.id;
        const bSection = document.getElementById('activeBreadcrumbSection')?.textContent;
        const bTitle = document.getElementById('activeBreadcrumbTitle')?.textContent;
        const pillsCount = document.querySelectorAll('.analytics-nav-pill').length;
        return {
          activePane,
          bSection,
          bTitle,
          pillsCount
        };
      })()
    `);
    console.log('[PASS] Analytics Navigation:', navResult);
    if (navResult.activePane !== 'tab-analytics') throw new Error('Analytics tab not active');
    if (navResult.pillsCount !== 7) throw new Error('Expected 7 navigation pills');

    // TEST 2: Page A - Executive Dashboard Acceptance Criteria
    console.log('\n--- TEST 2: Page A (Executive Dashboard) Acceptance Values & Charts ---');
    const pageAResult = await evalInPage(`
      (() => {
        const kpis = {
          totalBlocks: document.getElementById('kpiTotalBlocks')?.textContent.trim(),
          leasedArea: document.getElementById('kpiTotalArea')?.textContent.trim(),
          totalReserve: document.getElementById('kpiTotalReserve')?.textContent.trim(),
          avgReserveAcre: document.getElementById('kpiAvgReservePerAcre')?.textContent.trim(),
          occupancy: document.getElementById('kpiOccupancy')?.textContent.trim(),
          occupancySub: document.getElementById('kpiOccupancySub')?.textContent.trim(),
          upcoming: document.getElementById('kpiUpcomingPipeline')?.textContent.trim(),
          blocksOnlyAcre: document.getElementById('kpiBlocksReservePerAcre')?.textContent.trim(),
          zonesAreaShare: document.getElementById('kpiZonesShare')?.textContent.trim(),
          medianReserve: document.getElementById('kpiMedianReserve')?.textContent.trim()
        };
        const charts = {
          occupancy: !!window.DGMM_ANALYTICS_UI.charts['chartPageA_OccupancyDonut'],
          titles: !!window.DGMM_ANALYTICS_UI.charts['chartPageA_TitlesCategory'],
          districts: !!window.DGMM_ANALYTICS_UI.charts['chartPageA_TopDistricts'],
          upcomingMinerals: !!window.DGMM_ANALYTICS_UI.charts['chartPageA_UpcomingMinerals']
        };
        const insightsCount = document.querySelectorAll('#analyticsInsightsContainer .insight-pill').length;
        return { kpis, charts, insightsCount };
      })()
    `);
    console.log('[PASS] Page A Executive Dashboard:', pageAResult);
    if (!pageAResult.kpis.totalBlocks.includes('870')) throw new Error(`Expected 870 blocks, got ${pageAResult.kpis.totalBlocks}`);
    if (!pageAResult.kpis.leasedArea.includes('5,446,909')) throw new Error(`Expected 5,446,909 acres, got ${pageAResult.kpis.leasedArea}`);
    if (!pageAResult.kpis.totalReserve.includes('33.66B') && !pageAResult.kpis.totalReserve.includes('33,663')) throw new Error(`Expected 33.66B reserve, got ${pageAResult.kpis.totalReserve}`);
    if (!pageAResult.kpis.occupancy.includes('84.8%') || !pageAResult.kpis.occupancySub.includes('738')) throw new Error(`Expected 84.8% / 738, got ${pageAResult.kpis.occupancy} / ${pageAResult.kpis.occupancySub}`);
    if (!pageAResult.kpis.upcoming.includes('104')) throw new Error(`Expected 104 upcoming, got ${pageAResult.kpis.upcoming}`);
    if (!pageAResult.charts.occupancy || !pageAResult.charts.titles || !pageAResult.charts.districts) throw new Error('Page A charts missing');

    // TEST 3: Page B - Large Scale Mining (LSM)
    console.log('\n--- TEST 3: Page B (Large Scale Mining) KPIs & Rules ---');
    const pageBResult = await evalInPage(`
      (() => {
        window.DGMM_ANALYTICS_UI.switchPage('page-b');
        const kpis = {
          mlCount: document.getElementById('kpiLsmML')?.textContent.trim(),
          elCount: document.getElementById('kpiLsmEL')?.textContent.trim(),
          totalArea: document.getElementById('kpiLsmArea')?.textContent.trim(),
          avgArea: document.getElementById('kpiLsmAvgArea')?.textContent.trim(),
          pendingApps: document.getElementById('kpiLsmPending')?.textContent.trim()
        };
        const tableRows = {
          register: document.querySelectorAll('#tableLsmRegister tbody tr').length,
          pending: document.querySelectorAll('#tableLsmPending tbody tr').length
        };
        const charts = {
          areaMineral: !!window.DGMM_ANALYTICS_UI.charts['chartPageB_AreaMineral'],
          leasesDistrict: !!window.DGMM_ANALYTICS_UI.charts['chartPageB_LeasesDistrict'],
          expiryWall: !!window.DGMM_ANALYTICS_UI.charts['chartPageB_ExpiryWall'],
          topHolders: !!window.DGMM_ANALYTICS_UI.charts['chartPageB_TopHolders'],
          elFunnel: !!window.DGMM_ANALYTICS_UI.charts['chartPageB_ElFunnel'],
          ageing: !!window.DGMM_ANALYTICS_UI.charts['chartPageB_PendingAgeing']
        };
        return { kpis, tableRows, charts };
      })()
    `);
    console.log('[PASS] Page B LSM:', pageBResult);
    if (!pageBResult.kpis.mlCount.includes('75')) throw new Error(`Expected 75 MLs, got ${pageBResult.kpis.mlCount}`);
    if (!pageBResult.kpis.elCount.includes('27')) throw new Error(`Expected 27 valid ELs, got ${pageBResult.kpis.elCount}`);
    if (!pageBResult.kpis.pendingApps.includes('156')) throw new Error(`Expected 156 pending apps, got ${pageBResult.kpis.pendingApps}`);
    if (pageBResult.tableRows.register !== 102) throw new Error(`Expected 102 register rows (75 ML + 27 EL), got ${pageBResult.tableRows.register}`);
    if (pageBResult.tableRows.pending !== 156) throw new Error(`Expected 156 pending rows, got ${pageBResult.tableRows.pending}`);

    // TEST 4: Page C - Small Scale Mining (SSM)
    console.log('\n--- TEST 4: Page C (Small Scale Mining) KPIs & Policy Mode Shift ---');
    const pageCResult = await evalInPage(`
      (() => {
        window.DGMM_ANALYTICS_UI.switchPage('page-c');
        const kpis = {
          titles: document.getElementById('kpiSsmTitles')?.textContent.trim(),
          area: document.getElementById('kpiSsmArea')?.textContent.trim(),
          holders: document.getElementById('kpiSsmHolders')?.textContent.trim(),
          auctionShare: document.getElementById('kpiSsmAuctionShare')?.textContent.trim(),
          appShare: document.getElementById('kpiSsmAppShare')?.textContent.trim()
        };
        const dataChecks = document.querySelectorAll('#tableSsmDataChecks tbody tr').length;
        const charts = {
          grantsByYear: !!window.DGMM_ANALYTICS_UI.charts['chartPageC_GrantsByYear'],
          top15: !!window.DGMM_ANALYTICS_UI.charts['chartPageC_Top15Holders'],
          tenure: !!window.DGMM_ANALYTICS_UI.charts['chartPageC_TenureStatus'],
          premium: !!window.DGMM_ANALYTICS_UI.charts['chartPageC_PremiumMineral']
        };
        return { kpis, dataChecks, charts };
      })()
    `);
    console.log('[PASS] Page C SSM:', pageCResult);
    if (!pageCResult.kpis.titles.includes('1,172')) throw new Error(`Expected 1,172 SSM titles, got ${pageCResult.kpis.titles}`);
    if (!pageCResult.kpis.auctionShare.includes('23.9%') || !pageCResult.kpis.appShare.includes('76.1%')) {
      throw new Error(`Expected 23.9% auction vs 76.1% app in mode share, got ${pageCResult.kpis.auctionShare} / ${pageCResult.kpis.appShare}`);
    }

    // TEST 5: Page D - Minor Minerals & Reconciliation
    console.log('\n--- TEST 5: Page D (Minor Minerals) & Reconciliation Table ---');
    const pageDResult = await evalInPage(`
      (() => {
        window.DGMM_ANALYTICS_UI.switchPage('page-d');
        const kpis = {
          units: document.getElementById('kpiMmTotalUnits')?.textContent.trim(),
          granted: document.getElementById('kpiMmGranted')?.textContent.trim(),
          vacant: document.getElementById('kpiMmVacant')?.textContent.trim(),
          blocksArea: document.getElementById('kpiMmBlocksArea')?.textContent.trim(),
          zonesArea: document.getElementById('kpiMmZonesArea')?.textContent.trim(),
          blocksPerAcre: document.getElementById('kpiMmBlocksPerAcre')?.textContent.trim(),
          zonesPerAcre: document.getElementById('kpiMmZonesPerAcre')?.textContent.trim()
        };
        const reconRows = document.querySelectorAll('#tableMmReconciliation tbody tr').length;
        const charts = {
          occupancy: !!window.DGMM_ANALYTICS_UI.charts['chartPageD_OccupancyDistrict'],
          reserveMineral: !!window.DGMM_ANALYTICS_UI.charts['chartPageD_ReserveMineral']
        };
        return { kpis, reconRows, charts };
      })()
    `);
    console.log('[PASS] Page D Minor Minerals:', pageDResult);
    if (!pageDResult.kpis.units.includes('510') || !pageDResult.kpis.granted.includes('458') || !pageDResult.kpis.vacant.includes('52')) {
      throw new Error(`Expected 510 total, 458 granted, 52 vacant, got ${pageDResult.kpis.units} / ${pageDResult.kpis.granted} / ${pageDResult.kpis.vacant}`);
    }
    if (pageDResult.reconRows !== 45) throw new Error(`Expected 45 reconciliation rows, got ${pageDResult.reconRows}`);

    // TEST 6: Page E - District Yield & Location Quotient
    console.log('\n--- TEST 6: Page E (District Yield) & Location Quotient Matrix ---');
    const pageEResult = await evalInPage(`
      (() => {
        window.DGMM_ANALYTICS_UI.switchPage('page-e');
        const districtRows = document.querySelectorAll('#tableDistrictYield tbody tr').length;
        const lqRows = document.querySelectorAll('#tableLocationQuotient tbody tr').length;
        const charts = {
          rankedBar: !!window.DGMM_ANALYTICS_UI.charts['chartPageE_RankedBar'],
          bubble: !!window.DGMM_ANALYTICS_UI.charts['chartPageE_Bubble']
        };
        return { districtRows, lqRows, charts };
      })()
    `);
    console.log('[PASS] Page E District Yield:', pageEResult);
    if (pageEResult.districtRows < 36) throw new Error(`Expected 36 districts, got ${pageEResult.districtRows}`);
    if (pageEResult.lqRows === 0) throw new Error('Expected Location Quotient rows');

    // TEST 7: Page F - Mineral Economics
    console.log('\n--- TEST 7: Page F (Mineral Economics) Master Table & Visuals ---');
    const pageFResult = await evalInPage(`
      (() => {
        window.DGMM_ANALYTICS_UI.switchPage('page-f');
        const mineralRows = document.querySelectorAll('#tableMineralEconomics tbody tr').length;
        const charts = {
          perAcre: !!window.DGMM_ANALYTICS_UI.charts['chartPageF_PerAcreMineral']
        };
        return { mineralRows, charts };
      })()
    `);
    console.log('[PASS] Page F Mineral Economics:', pageFResult);
    if (pageFResult.mineralRows < 15) throw new Error(`Expected >=15 mineral rows, got ${pageFResult.mineralRows}`);

    // TEST 8: Page G - Statistical & Econometric Models
    console.log('\n--- TEST 8: Page G (Statistical Models: 10 Econometric Models) ---');
    const pageGResult = await evalInPage(`
      (() => {
        window.DGMM_ANALYTICS_UI.switchPage('page-g');
        const models = {
          m1_rows: document.querySelectorAll('#tableDistributionModelBody tr').length,
          m2_gini: document.getElementById('statGiniReserve')?.textContent.trim(),
          m2_hhi: document.getElementById('statHhiReserve')?.textContent.trim(),
          m4_mmBeta: document.getElementById('statRegMM_b')?.textContent.trim(),
          m4_ssmBeta: document.getElementById('statRegSSM_b')?.textContent.trim(),
          varPipeline: document.getElementById('varTotalPipeline')?.textContent.trim(),
          varYield: document.getElementById('varSimulatedYield')?.textContent.trim()
        };
        const charts = {
          lorenz: !!window.DGMM_ANALYTICS_UI.charts['chartModel2_LorenzCurve'],
          pareto: !!window.DGMM_ANALYTICS_UI.charts['chartModel3_Pareto'],
          scatter: !!window.DGMM_ANALYTICS_UI.charts['chartModel4_RegressionScatter'],
          trend: !!window.DGMM_ANALYTICS_UI.charts['chartModel9_GrantsTrend']
        };
        return { models, charts };
      })()
    `);
    console.log('[PASS] Page G Models:', pageGResult);
    if (pageGResult.models.m1_rows !== 3) throw new Error(`Expected 3 distribution rows, got ${pageGResult.models.m1_rows}`);
    if (!pageGResult.models.m2_gini.includes('0.667')) throw new Error(`Expected Gini 0.667, got ${pageGResult.models.m2_gini}`);
    if (!pageGResult.models.m4_mmBeta.includes('-0.345')) throw new Error(`Expected MM beta -0.345, got ${pageGResult.models.m4_mmBeta}`);
    if (!pageGResult.models.m4_ssmBeta.includes('-0.327')) throw new Error(`Expected SSM beta -0.327, got ${pageGResult.models.m4_ssmBeta}`);

    // TEST 9: Interactive VaR Slider Test
    console.log('\n--- TEST 9: Interactive VaR Slider Simulation ---');
    const varSliderResult = await evalInPage(`
      (() => {
        const slider = document.getElementById('pipelineVaRSlider');
        if (!slider) return { error: 'slider not found' };
        slider.value = 150;
        slider.dispatchEvent(new Event('input', { bubbles: true }));
        return {
          sliderVal: slider.value,
          label: document.getElementById('pipelineVaRSliderVal')?.textContent.trim(),
          simulatedYield: document.getElementById('varSimulatedYield')?.textContent.trim()
        };
      })()
    `);
    console.log('[PASS] VaR Slider Simulation:', varSliderResult);
    if (varSliderResult.label !== '150%') throw new Error(`Expected 150%, got ${varSliderResult.label}`);

    // TEST 10: Dynamic Global Filters & Per-Acre Toggle Interactivity
    console.log('\n--- TEST 10: Dynamic Global Filter & Per-Acre Toggle Test ---');
    const filterTestResult = await evalInPage(`
      (() => {
        window.DGMM_ANALYTICS_UI.switchPage('page-a');
        
        // 1. Toggle Per-Acre to All-In
        const allBtn = document.querySelector('.analytics-per-acre-btn[data-mode="all"]');
        allBtn.click();
        const allInAcreVal = document.getElementById('kpiAvgReservePerAcre')?.textContent.trim();

        // 2. Filter by District = Sargodha
        const distSelect = document.getElementById('analyticsFilterDistrict');
        distSelect.value = 'Sargodha';
        distSelect.dispatchEvent(new Event('change', { bubbles: true }));
        const sargodhaBlocks = document.getElementById('kpiTotalBlocks')?.textContent.trim();
        const sargodhaReserve = document.getElementById('kpiTotalReserve')?.textContent.trim();

        // 3. Reset filters
        document.getElementById('btnResetAnalyticsFilters')?.click();
        const resetBlocks = document.getElementById('kpiTotalBlocks')?.textContent.trim();

        return {
          allInAcreVal,
          sargodhaBlocks,
          sargodhaReserve,
          resetBlocks
        };
      })()
    `);
    console.log('[PASS] Filter & Toggle Interactivity:', filterTestResult);
    if (!filterTestResult.allInAcreVal.includes('6,180')) throw new Error(`Expected 6,180 for all-in acre, got ${filterTestResult.allInAcreVal}`);
    if (!filterTestResult.resetBlocks.includes('870')) throw new Error(`Expected 870 on reset, got ${filterTestResult.resetBlocks}`);

    // TEST 11: Console Errors Verification
    console.log('\n--- TEST 11: Error & Exception Check ---');
    console.log('Total console errors caught:', pageErrors.length);
    if (pageErrors.length > 0) {
      throw new Error(`Encountered ${pageErrors.length} console errors: ${pageErrors.join('; ')}`);
    }
    console.log('SUCCESS: ZERO console errors or runtime exceptions detected across all 7 pages!');

    console.log('\n========================================');
    console.log('ALL ADVANCED ANALYTICS TESTS PASSED (100%)');
    console.log('========================================\n');

  } finally {
    try {
      chromeProcess.kill();
    } catch (e) {}
    try {
      server.close();
    } catch (e) {}
  }
}

runAnalyticsQA().catch(err => {
  console.error('\nQA TEST FAILED:', err);
  process.exit(1);
});
