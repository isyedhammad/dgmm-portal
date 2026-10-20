const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const excelPath = path.join(__dirname, 'MINING DATA PUNJAB.xlsx');
const wb = XLSX.readFile(excelPath);

function formatExcelDate(val) {
  if (!val) return '';
  if (typeof val === 'number' && val > 20000 && val < 60000) {
    const d = new Date((val - 25569) * 86400 * 1000);
    return d.toISOString().split('T')[0];
  }
  return String(val).trim();
}

// Helper to convert sheet to array of objects with custom header row
function parseSheet(sheetName, headerRowIndex = 0) {
  const ws = wb.Sheets[sheetName];
  if (!ws) return [];
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
  if (rows.length <= headerRowIndex) return [];
  
  const headers = rows[headerRowIndex].map(h => (h ? String(h).trim() : ''));
  const results = [];
  
  for (let r = headerRowIndex + 1; r < rows.length; r++) {
    const row = rows[r];
    if (!row || row.length === 0) continue;
    const obj = {};
    let hasValue = false;
    headers.forEach((h, c) => {
      if (h) {
        const val = row[c] !== undefined ? row[c] : '';
        obj[h] = val;
        if (val !== '') hasValue = true;
      }
    });
    if (hasValue) results.push(obj);
  }
  return results;
}

// 1. Meta Data (870 blocks across Punjab)
const metaRaw = XLSX.utils.sheet_to_json(wb.Sheets['Meta Data']) || [];
const allBlocks = metaRaw.map(r => ({
  id: r.ID || '',
  branch: r.BRANCH || '',
  district: r.DISTRICT || '',
  mineral: r.MINERAL || '',
  reservePrice: parseFloat(r['RESERVE PRICE'] || 0) || 0,
  area: parseFloat(r.AREA || 0) || 0,
  inUpcomingAuction: String(r['IN UPCOMING AUCTION']).toLowerCase() === 'true',
  firstAuctionDate: formatExcelDate(r['1ST AUCTION DATE']),
  secondAuctionDate: formatExcelDate(r['2ND AUCTION DATE']),
  thirdAuctionDate: formatExcelDate(r['3RD AUCTION DATE']),
  code: r.CODE || '',
  name: r.NAME || '',
  location: r.LOCATION || '',
  blockType: r['BLOCK TYPE'] || 'Block',
  status: r.STATUS || 'Granted',
  remarks: r.REMARKS || ''
}));

const mmBlocks = allBlocks.filter(b => b.branch === 'MM');
const ssmBlocks = allBlocks.filter(b => b.branch === 'SSM');
const upcomingAuctions = allBlocks.filter(b => b.inUpcomingAuction);

// 2. LSM Mining Leases (75 granted industrial leases)
const lsmLeasesRaw = parseSheet('LSM Mining Leases', 1);
const lsmLeases = lsmLeasesRaw.filter(r => r['Company Name'] && r['Company Name'] !== 'Total').map(r => ({
  srNo: r['Sr. No'] || '',
  company: r['Company Name'] || '',
  licenseNo: r['License Number'] || '',
  area: parseFloat(r['Area'] || 0) || 0,
  mineral: r['Mineral'] || '',
  district: r['District'] || '',
  location: r['Location'] || '',
  grantDate: formatExcelDate(r['Date of Grant']),
  expiryDate: formatExcelDate(r['Date of Expiry']),
  status: r['Status '] || r['Status'] || 'Valid',
  remarks: r['Remarks'] || ''
}));

// 3. LSM Exploration Licenses (27 Valid, 24 Cancelled)
const lsmExplorationWs = wb.Sheets['LSM Exploration Licesnes'];
const lsmExplorationRows = XLSX.utils.sheet_to_json(lsmExplorationWs, { header: 1 });
const lsmExplorationValid = [];
const lsmExplorationCancelled = [];
let isCancelledSection = false;

lsmExplorationRows.slice(2).forEach(row => {
  if (!row || row.length === 0) return;
  const rowStr = row.map(c => String(c)).join(' ');
  if (rowStr.includes('Cancelled/Expired/Withdrawn')) {
    isCancelledSection = true;
    return;
  }
  if (rowStr.includes('Valid Exploration Licenses') || rowStr.includes('Total') || rowStr.includes('Grand Total')) {
    return;
  }

  const sr = row[0];
  const licensee = row[1];
  const licenseNo = row[2];
  if (!licensee || !licenseNo) return;

  const item = {
    srNo: sr || '',
    licensee: String(licensee).trim(),
    licenseNo: String(licenseNo).trim(),
    area: parseFloat(String(row[3]).replace(/[^0-9.]/g, '') || 0) || 0,
    areaRaw: String(row[3] || ''),
    mineral: String(row[4] || '').trim(),
    district: String(row[5] || '').trim(),
    location: String(row[6] || '').trim(),
    from: formatExcelDate(row[7]),
    to: formatExcelDate(row[8]),
    status: isCancelledSection ? 'Cancelled / Terminated' : (String(row[9] || 'Valid').trim()),
    remarks: String(row[10] || '').trim()
  };

  if (isCancelledSection) {
    lsmExplorationCancelled.push(item);
  } else {
    lsmExplorationValid.push(item);
  }
});

// 4. Pending Applications LSM (156 applications)
const lsmPendingRaw = parseSheet('Pending Applications LSM', 1);
const lsmPendingApps = lsmPendingRaw.filter(r => r['Name of Applicant'] && r['Application_No-']).map(r => ({
  srNo: r['Sr.\nNo'] || r['Sr. No'] || '',
  applicant: r['Name of Applicant'] || '',
  appNo: r['Application_No-'] || '',
  appDate: formatExcelDate(r['Application Date']),
  area: parseFloat(r['Applied Area (acres)'] || 0) || 0,
  category: r['Applied_Category'] || '',
  district: r['District'] || '',
  mineral: r['Mineral_Name'] || '',
  location: r['Location'] || '',
  status: r['Status'] || 'under process',
  remarks: r['Remarks'] || ''
}));

// 5. Granted by Auction SSM (280 concessions)
const ssmAuctionRaw = parseSheet('Granted by Auction SSM', 1);
const ssmAuctionConcessions = ssmAuctionRaw.filter(r => r['Block'] && r['Block Name']).map(r => ({
  srNo: r['Sr No.'] || '',
  block: r['Block'] || '',
  blockName: r['Block Name'] || '',
  mineral: r['Mineral'] || '',
  district: r['District'] || '',
  status: r['Status'] || 'Granted',
  type: r['Concession Type'] || 'Mining Lease',
  lessee: r['Lessee Name'] || '',
  grantDate: formatExcelDate(r['Grant Date']),
  expiryDate: formatExcelDate(r['Expiry Date']),
  operativeBid: parseFloat(r['Operative Bid'] || 0) || 0,
  reservePrice: parseFloat(r['Reserve Price'] || 0) || 0
}));

// 6. Granted by Applications SSM (893 titles)
const ssmAppRaw = parseSheet('Granted by Applications SSM', 1);
const ssmAppConcessions = ssmAppRaw.filter(r => r['Concession No.'] && r['Client']).map(r => ({
  concessionNo: r['Concession No.'] || '',
  client: r['Client'] || '',
  branch: r['Branch'] || 'SSM',
  mineral: r['Mineral'] || '',
  type: r['Type'] || 'Mining Lease',
  district: r['District'] || '',
  acreage: parseFloat(r['Acreage'] || 0) || 0,
  grantDate: formatExcelDate(r['Grant Date']),
  expiryDate: formatExcelDate(r['Expiry Date']),
  status: r['Status'] || 'Valid'
}));

// 7. District Wise SSM Matrix
const districtWiseSsmRaw = parseSheet('Distirct Wise SSM', 1);
const districtWiseSsm = districtWiseSsmRaw.filter(r => r['District'] && r['District'] !== 'Total').map(r => ({
  district: r['District'] || '',
  bauxite: parseInt(r['Bauxite'] || 0) || 0,
  bentonite: parseInt(r['Bentonite'] || 0) || 0,
  celestite: parseInt(r['Celestite'] || 0) || 0,
  coal: parseInt(r['Coal'] || 0) || 0,
  fireclay: parseInt(r['Fireclay'] || 0) || 0,
  fullerEarth: parseInt(r['Fuller Earth'] || 0) || 0,
  gypsum: parseInt(r['Gypsum'] || 0) || 0,
  ironOre: parseInt(r['Iron Ore'] || 0) || 0,
  latrite: parseInt(r['Latrite'] || 0) || 0,
  limestone: parseInt(r['Limestone'] || 0) || 0,
  rockSalt: parseInt(r['Rock Salt'] || 0) || 0,
  silicaSand: parseInt(r['Silica Sand'] || 0) || 0,
  total: parseInt(r['Total'] || 0) || 0
}));

// Read existing data.js to preserve EPA cases, Appeals cases, Map coordinates, 5-year financials
const existingDataJsPath = path.join(__dirname, 'data.js');
let existingData = {};
try {
  const content = fs.readFileSync(existingDataJsPath, 'utf8');
  const sandbox = { window: {} };
  const fn = new Function('window', content);
  fn(sandbox.window);
  existingData = sandbox.window.DGM_DATA || {};
} catch (e) {
  console.error('Error reading existing data.js:', e.message);
}

// Compile master DGM_DATA
const compiledData = {
  meta: existingData.meta || {
    department: "Directorate General of Mines & Minerals",
    ministry: "Mines & Minerals Department, Government of the Punjab",
    jurisdiction: "All 36 Districts of Punjab, Pakistan",
    version: "4.0 Executive Tri-Division Cloud Edition"
  },
  
  executive: {
    totalBlocks: 870,
    totalAreaAcres: 5446909,
    totalAreaAcresFormatted: "5.45 Million Acres",
    totalReservePricePKR: 33663414846,
    totalReservePriceFormatted: "PKR 33.66 Billion",
    avgRevenuePerAcrePKR: 6180,
    grantedCount: 738,
    grantedPercent: 84.8,
    vacantCount: 132,
    vacantPercent: 15.2,
    upcomingAuctionsCount: 104,
    largeScaleBlocks: 606,
    mediumScaleBlocks: 162,
    smallScaleBlocks: 102,
    topRevenueConcentration: "51.6% in Sargodha (9.42B) & Attock (7.97B)",
    attockValueDensity: "Rs. 176,991 per acre",
    sargodhaSandstoneRevenue: "Rs. 8.91 Billion (88 blocks)",
    ordinarySandCount: 321,
    ordinarySandArea: "4.98 Million Acres (13.53B PKR)",
    keyTakeaways: [
      {
        title: "Revenue Concentrated in Sargodha and Attock (51.6%)",
        desc: "Together, Sargodha (9.42 Billion PKR) and Attock (7.97 Billion PKR) contribute over 51.6% of the province's total mining reserve price revenue. Attock exhibits an extraordinary revenue density of 176,991 PKR per acre."
      },
      {
        title: "Ordinary Sand and Sandstone Form the Backbone",
        desc: "Ordinary Sand is the single largest mineral type (321 blocks, ~4.98M acres, 13.53B PKR). Sandstone consists of 88 blocks commanding 8.91B PKR in reserve price, driven by Sargodha's 52 sandstone blocks."
      },
      {
        title: "Skewed Toward Large-Scale Leases with Active Pipeline",
        desc: "Out of 870 blocks, 606 are Large (>100 acres). An active pipeline of 104 upcoming auctions is scheduled for 2026 across minor and small-scale minerals."
      }
    ]
  },

  // 3 Primary Divisions (LSM, SMA, MM)
  divisions: {
    lsm: {
      name: "Large Scale Mining (LSM)",
      code: "LSM",
      summary: {
        totalLeases: lsmLeases.length,
        totalAreaAcres: Math.round(lsmLeases.reduce((sum, l) => sum + (l.area || 0), 0)),
        validExploration: lsmExplorationValid.length,
        cancelledExploration: lsmExplorationCancelled.length,
        pendingApplications: lsmPendingApps.length
      },
      leases: lsmLeases,
      explorationValid: lsmExplorationValid,
      explorationCancelled: lsmExplorationCancelled,
      pendingApplications: lsmPendingApps
    },

    sma: {
      name: "Small Scale Mining & Concessions (SMA / SSM)",
      code: "SMA",
      summary: {
        totalAuctionConcessions: ssmAuctionConcessions.length,
        totalApplicationConcessions: ssmAppConcessions.length,
        totalAuctionOperativeBidPKR: ssmAuctionConcessions.reduce((sum, c) => sum + (c.operativeBid || 0), 0),
        totalAuctionReservePricePKR: ssmAuctionConcessions.reduce((sum, c) => sum + (c.reservePrice || 0), 0)
      },
      auctionConcessions: ssmAuctionConcessions,
      applicationConcessions: ssmAppConcessions,
      districtMatrix: districtWiseSsm
    },

    mm: {
      name: "Minor Minerals Division (MM)",
      code: "MM",
      summary: {
        totalBlocks: mmBlocks.length,
        grantedCount: mmBlocks.filter(b => b.status === 'Granted').length,
        vacantCount: mmBlocks.filter(b => b.status === 'Vacant').length,
        upcomingAuctionsCount: mmBlocks.filter(b => b.inUpcomingAuction).length,
        totalReservePricePKR: mmBlocks.reduce((sum, b) => sum + (b.reservePrice || 0), 0)
      },
      blocks: mmBlocks,
      upcomingAuctions: upcomingAuctions
    }
  },

  // Retain all geospatial, environmental, financial, and appellate modules
  geoMiningSites: existingData.geoMiningSites || [],
  fiveYearSummary: existingData.fiveYearSummary || {},
  majorProducers: existingData.majorProducers || [],
  epaCases: existingData.epaCases || [],
  appealsCases: existingData.appealsCases || [],
  dataQualityAudit: existingData.dataQualityAudit || []
};

// Write out to data.js
const outJs = `// Directorate General of Mines & Minerals, Government of the Punjab
// Executive Master Database (Harmonized Divisions: LSM, SMA, MM + Financials, GIS Map, EPA, Appeals)
window.DGM_DATA = ${JSON.stringify(compiledData, null, 2)};
`;

fs.writeFileSync(existingDataJsPath, outJs, 'utf8');
console.log('Master database compiled successfully into data.js');
console.log('LSM Leases:', lsmLeases.length);
console.log('LSM Exploration (Valid):', lsmExplorationValid.length);
console.log('LSM Exploration (Cancelled):', lsmExplorationCancelled.length);
console.log('LSM Pending Apps:', lsmPendingApps.length);
console.log('SMA Auction Concessions:', ssmAuctionConcessions.length);
console.log('SMA Application Titles:', ssmAppConcessions.length);
console.log('MM Minor Mineral Blocks:', mmBlocks.length);
console.log('Total Upcoming Auctions:', upcomingAuctions.length);
