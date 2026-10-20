// build_map_polygons.js
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const proj4 = require('proj4');

// Pakistan Grid Zone I (Kalianpur 1962 / Everest 1830 in meters)
proj4.defs('EPSG:24376', '+proj=lcc +lat_1=32.5 +lat_0=32.5 +lon_0=68 +k_0=0.99878641 +x_0=2743196.4 +y_0=914398.8 +a=6377276.345 +b=6356075.41314024 +units=m +no_defs');

function convertEN(e, n) {
  if (isNaN(e) || isNaN(n)) return null;
  // Test as meters:
  let [lngM, latM] = proj4('EPSG:24376', 'WGS84', [e, n]);
  if (latM >= 27.5 && latM <= 34.5 && lngM >= 69.2 && lngM <= 75.8) {
    return [Math.round(latM * 100000) / 100000, Math.round(lngM * 100000) / 100000];
  }
  // Test as Indian yards:
  const ey = e * 0.91439853;
  const ny = n * 0.91439853;
  let [lngY, latY] = proj4('EPSG:24376', 'WGS84', [ey, ny]);
  if (latY >= 27.5 && latY <= 34.5 && lngY >= 69.2 && lngY <= 75.8) {
    return [Math.round(latY * 100000) / 100000, Math.round(lngY * 100000) / 100000];
  }
  return null;
}

// Canonical mineral categorizer and color assignment
const COLOR_PALETTE = {
  'Coal': { color: '#0F172A', fill: '#334155', text: '#F8FAFC', label: 'Coal' },
  'Limestone': { color: '#1D4ED8', fill: '#3B82F6', text: '#FFFFFF', label: 'Limestone' },
  'Silica Sand': { color: '#0891B2', fill: '#06B6D4', text: '#FFFFFF', label: 'Silica Sand' },
  'Ordinary Sand': { color: '#D97706', fill: '#F59E0B', text: '#FFFFFF', label: 'Ordinary Sand / Bajri' },
  'Fireclay': { color: '#C2410C', fill: '#EA580C', text: '#FFFFFF', label: 'Fireclay' },
  'Gypsum': { color: '#047857', fill: '#10B981', text: '#FFFFFF', label: 'Gypsum' },
  'Rock Salt': { color: '#DB2777', fill: '#EC4899', text: '#FFFFFF', label: 'Rock Salt' },
  'Iron Ore': { color: '#B91C1C', fill: '#EF4444', text: '#FFFFFF', label: 'Iron Ore' },
  'Bentonite': { color: '#6D28D9', fill: '#8B5CF6', text: '#FFFFFF', label: 'Bentonite' },
  'Ocher': { color: '#92400E', fill: '#B45309', text: '#FFFFFF', label: 'Ocher' },
  'Bauxite & Laterite': { color: '#78350F', fill: '#A16207', text: '#FFFFFF', label: 'Bauxite & Laterite' },
  'Argillaceous Clay': { color: '#475569', fill: '#64748B', text: '#FFFFFF', label: 'Argillaceous Clay' },
  'Gravel & Bajri': { color: '#4D7C0F', fill: '#84CC16', text: '#FFFFFF', label: 'Gravel & Bajri' },
  'Other Minerals': { color: '#4338CA', fill: '#6366F1', text: '#FFFFFF', label: 'Other Minerals' }
};

function standardizeMineral(raw) {
  if (!raw) return 'Other Minerals';
  const s = String(raw).toLowerCase().replace(/[\r\n\t]+/g, ' ').trim();
  if (s.includes('coal')) return 'Coal';
  if (s.includes('limestone') || s.includes('lime stone') || s.includes('limestoen')) return 'Limestone';
  if (s.includes('silica')) return 'Silica Sand';
  if (s.includes('fireclay') || s.includes('fire clay')) return 'Fireclay';
  if (s.includes('gypsum')) return 'Gypsum';
  if (s.includes('salt') || s.includes('rock salt') || s.includes('rocksalt') || s.includes('brine')) return 'Rock Salt';
  if (s.includes('iron') || s.includes('iron ore')) return 'Iron Ore';
  if (s.includes('bentonite') || s.includes('bentonie')) return 'Bentonite';
  if (s.includes('ocher') || s.includes('ochre')) return 'Ocher';
  if (s.includes('bauxite') || s.includes('laterite') || s.includes('laterie') || s.includes('latrite')) return 'Bauxite & Laterite';
  if (s.includes('argillaceous') || s.includes('ariglicious') || s.includes('clay')) return 'Argillaceous Clay';
  if (s.includes('gravel') || s.includes('bajri')) return 'Gravel & Bajri';
  if (s.includes('sand') || s.includes('ordinary') || s.includes('bhassar') || s.includes('ghassar')) return 'Ordinary Sand';
  return 'Other Minerals';
}

function cleanStr(val) {
  if (val === null || val === undefined) return '';
  return String(val).replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ').trim();
}

const dir = 'c:/Users/dgmnm/OneDrive/Desktop/DG M&M Data/GR - Data';

function parseConcessionSheet(filename, sheetName, divisionName) {
  const filePath = path.join(dir, filename);
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return [];
  }

  const wb = XLSX.readFile(filePath);
  const sheet = wb.Sheets[sheetName];
  if (!sheet) {
    console.error('Sheet not found:', sheetName);
    return [];
  }

  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  const concessions = [];
  let current = null;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length === 0) continue;

    const sr = row[0];
    const point = cleanStr(row[3]);
    const e = parseFloat(row[4]);
    const n = parseFloat(row[5]);

    const isNew = (sr !== undefined && sr !== null && sr !== '' && !isNaN(parseInt(sr, 10)) && typeof sr !== 'string')
      || (typeof sr === 'string' && /^\d+$/.test(sr.trim()))
      || (row[6] && String(row[6]).trim().length > 3 && (row[1] || row[2]));

    if (isNew) {
      if (current && current.coords.length >= 3) {
        concessions.push(current);
      }

      const rawMineral = cleanStr(row[1]);
      const standardMineral = standardizeMineral(rawMineral);
      const palette = COLOR_PALETTE[standardMineral] || COLOR_PALETTE['Other Minerals'];

      current = {
        id: `${divisionName}-${concessions.length + 1}`,
        sr: sr || (concessions.length + 1),
        division: divisionName,
        mineral: rawMineral || standardMineral,
        category: standardMineral,
        color: palette.fill,
        strokeColor: palette.color,
        district: cleanStr(row[2]),
        leaseNo: cleanStr(row[6]),
        lessee: cleanStr(row[7]),
        dateGrant: cleanStr(row[8]),
        dateExpiry: cleanStr(row[9]),
        area: parseFloat(row[10]) || 0,
        reserves: cleanStr(row[11]),
        production: cleanStr(row[12]),
        revenue: cleanStr(row[13]),
        method: cleanStr(row[14]),
        challenges: cleanStr(row[20]),
        entryPoints: cleanStr(row[21]),
        cctv: cleanStr(row[22]),
        status: cleanStr(row[23]) || 'Active',
        coords: [],
        corners: []
      };
    }

    if (current && !isNaN(e) && !isNaN(n)) {
      const latlng = convertEN(e, n);
      if (latlng) {
        current.coords.push(latlng);
        current.corners.push({
          pt: point || `P${current.corners.length + 1}`,
          e,
          n,
          lat: latlng[0],
          lng: latlng[1]
        });
      }
    }
  }

  if (current && current.coords.length >= 3) {
    concessions.push(current);
  }

  console.log(`Parsed ${concessions.length} valid polygon concessions from ${filename} [${sheetName}]`);
  return concessions;
}

console.log('Compiling Concession Polygons from official GR - Data...');

const lsmConcessions = parseConcessionSheet('Gr Check - Mines & Minerals.xlsx', 'Gr Check Large Scale Mining', 'Large Scale Mining');
const smaConcessions = parseConcessionSheet('Gr Check SMA.xlsx', 'COMBINED DATA SSM', 'Small Scale Mining');
const mmConcessions = parseConcessionSheet('Gr Check Minor Minerals.xlsx', 'Gr Check - Mine & Mineral', 'Minor Minerals');

const allConcessions = [...lsmConcessions, ...smaConcessions, ...mmConcessions];
console.log('Total Compiled Concessions with Polygons:', allConcessions.length);

// Calculate center centroid for each polygon
allConcessions.forEach(c => {
  let sumLat = 0, sumLng = 0;
  c.coords.forEach(pt => { sumLat += pt[0]; sumLng += pt[1]; });
  c.center = [
    Math.round((sumLat / c.coords.length) * 100000) / 100000,
    Math.round((sumLng / c.coords.length) * 100000) / 100000
  ];
});

// Compile Legend Table Statistics
const legendMap = {};
Object.keys(COLOR_PALETTE).forEach(cat => {
  legendMap[cat] = {
    category: cat,
    label: COLOR_PALETTE[cat].label,
    color: COLOR_PALETTE[cat].fill,
    stroke: COLOR_PALETTE[cat].color,
    count: 0,
    totalArea: 0,
    divisions: { 'Large Scale Mining': 0, 'Small Scale Mining': 0, 'Minor Minerals': 0 }
  };
});

allConcessions.forEach(c => {
  const cat = c.category || 'Other Minerals';
  if (!legendMap[cat]) {
    legendMap[cat] = {
      category: cat,
      label: cat,
      color: '#6366F1',
      stroke: '#4338CA',
      count: 0,
      totalArea: 0,
      divisions: { 'Large Scale Mining': 0, 'Small Scale Mining': 0, 'Minor Minerals': 0 }
    };
  }
  legendMap[cat].count++;
  legendMap[cat].totalArea += (c.area || 0);
  if (legendMap[cat].divisions[c.division] !== undefined) {
    legendMap[cat].divisions[c.division]++;
  }
});

const legendTable = Object.values(legendMap)
  .filter(item => item.count > 0)
  .sort((a, b) => b.count - a.count);

console.log('\n--- Mineral Legend Summary ---');
legendTable.forEach(item => {
  console.log(`${item.label.padEnd(25)} Count: ${String(item.count).padStart(4)} | Area: ${item.totalArea.toFixed(1).padStart(10)} Acres`);
});

const outputJs = `// ===================================================================
// GOVERNMENT OF THE PUNJAB — DIRECTORATE GENERAL OF MINES & MINERALS
// GEOGRAPHIC INFORMATION SYSTEM (GIS) MASTER CONCESSION BOUNDARIES
// Compiled from official Grid Reference (GR) records across Punjab
// ===================================================================

if (typeof window === 'undefined') {
  global.window = {};
}

window.DGM_DATA = window.DGM_DATA || {};

window.DGM_DATA.mapPolygons = ${JSON.stringify(allConcessions, null, 2)};
window.DGM_DATA.mineralLegend = ${JSON.stringify(legendTable, null, 2)};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    polygons: window.DGM_DATA.mapPolygons,
    legend: window.DGM_DATA.mineralLegend
  };
}
`;

fs.writeFileSync('c:\\Users\\dgmnm\\OneDrive\\Desktop\\DG M&M Data\\map_polygons.js', outputJs, 'utf8');
console.log('\nSuccessfully generated map_polygons.js!');
const stats = fs.statSync('c:\\Users\\dgmnm\\OneDrive\\Desktop\\DG M&M Data\\map_polygons.js');
console.log('File size:', (stats.size / 1024 / 1024).toFixed(2), 'MB');
