// build_cadastre_data.js
const fs = require('fs');

console.log('Building cadastre_data.js...');
const finStats = JSON.parse(fs.readFileSync('cadastre_finance_stats.json', 'utf8'));
const concs = JSON.parse(fs.readFileSync('cadastre_concessions.json', 'utf8'));
const apps = JSON.parse(fs.readFileSync('cadastre_applications.json', 'utf8'));
const geo = JSON.parse(fs.readFileSync('cadastre_blocks_geojson.json', 'utf8'));

// Summaries
const concSummary = {
  total: concs.length,
  byBranch: {
    LSM: concs.filter(c => c.branch === 'LSM').length,
    SSM: concs.filter(c => c.branch === 'SSM').length
  },
  byType: {
    ML: concs.filter(c => c.concession_type === 'Mining Lease' || c.concession_type === 'ML').length,
    EL: concs.filter(c => c.concession_type === 'Exploration License' || c.concession_type === 'EL').length,
    PL: concs.filter(c => c.concession_type === 'Prospecting License' || c.concession_type === 'PL').length
  },
  byStatus: {
    Valid: concs.filter(c => c.status === 'Valid' || c.status === 'VD').length,
    Cancelled: concs.filter(c => c.status === 'Cancelled' || c.status === 'CD').length,
    Converted: concs.filter(c => c.status === 'Converted' || c.status === 'CT').length,
    Expired: concs.filter(c => c.status === 'Expired' || c.status === 'EX').length,
    Litigation: concs.filter(c => c.status === 'Under Litigation' || c.status === 'UL').length
  }
};

const appSummary = {
  total: apps.length,
  byBranch: {
    LSM: apps.filter(a => a.branch === 'LSM').length,
    SSM: apps.filter(a => a.branch === 'SSM').length
  },
  byStatus: {
    Filed: apps.filter(a => a.status === 'Filed' || a.status === 'FD').length,
    Granted: apps.filter(a => a.status === 'Granted' || a.status === 'GT').length,
    Deferred: apps.filter(a => a.status === 'Deferred' || a.status === 'DF').length,
    Offered: apps.filter(a => a.status === 'Offered' || a.status === 'OD').length,
    Approved: apps.filter(a => a.status === 'Approved' || a.status === 'AP').length
  }
};

// Clean concessions
const cleanConcs = concs.map(c => ({
  id: c.id,
  no: c.concession_no || c.conc_no || '',
  client: (c.client && c.client !== 'CLIENT DATA NOT PROVIDED BY BRANCH') ? c.client : (c.remarks || 'Client Not Listed'),
  branch: c.branch || 'SSM',
  dist: c.district || '',
  min: c.mineral || '',
  type: c.concession_type || 'Mining Lease',
  status: c.status || 'Valid',
  area: c.area_acr || 0,
  loc: c.location || '',
  grant: c.grant_date || '',
  exp: c.expiry_date || ''
}));

// Clean applications
const cleanApps = apps.map(a => ({
  id: a.id,
  no: a.application_no || a.app_no || '',
  client: a.client || 'Applicant',
  branch: a.branch || 'SSM',
  dist: a.district || '',
  min: a.mineral || '',
  type: a.concession_type || 'Mining Lease',
  status: a.status || 'Filed',
  track: a.current_tracking_status || 'Under Scrutiny',
  area: a.area_acr || 0,
  loc: a.location || '',
  date: a.application_date ? a.application_date.split(' ')[0] : ''
}));

// Clean & optimize 825 geo features (5 decimal places = ~1m resolution)
const minifiedFeatures = geo.features.map(f => {
  return {
    type: "Feature",
    id: f.id,
    properties: {
      id: f.properties.id,
      code: f.properties.code || '',
      name: f.properties.name || '',
      district: f.properties.district_name || '',
      reservePrice: f.properties.reserve_price || 0,
      aucDate1: f.properties.auction_date || '',
      aucDate2: f.properties.auction_date_2 || '',
      aucDate3: f.properties.auction_date_3 || '',
      isUpcoming: !!f.properties.is_upcoming_auction
    },
    geometry: {
      type: f.geometry.type,
      coordinates: f.geometry.coordinates.map(polygon => 
        polygon.map(ring => 
          ring.map(pt => [Math.round(pt[0] * 100000) / 100000, Math.round(pt[1] * 100000) / 100000])
        )
      )
    }
  };
});

const cleanGeo = { type: "FeatureCollection", features: minifiedFeatures };

const content = `/**
 * Official Mining Cadastre Portal Data (mining-cadastre.geosoftsolution.com)
 * Directorate General of Mines & Minerals, Punjab
 * Authenticated Cadastre API Snapshot
 */
window.DGM_DATA = window.DGM_DATA || {};

window.DGM_DATA.cadastreFinanceStats = ${JSON.stringify(finStats)};

window.DGM_DATA.cadastreConcessionsSummary = ${JSON.stringify(concSummary)};

window.DGM_DATA.cadastreApplicationsSummary = ${JSON.stringify(appSummary)};

window.DGM_DATA.cadastreConcessions = ${JSON.stringify(cleanConcs)};

window.DGM_DATA.cadastreApplications = ${JSON.stringify(cleanApps)};

window.DGM_DATA.cadastreBlocksGeoJson = ${JSON.stringify(cleanGeo)};
`;

fs.writeFileSync('cadastre_data.js', content, 'utf8');
console.log('cadastre_data.js written successfully! Size:', (content.length / 1024).toFixed(1), 'KB');
