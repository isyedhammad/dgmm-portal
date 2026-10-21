const fs = require('fs');

async function extractAllCadastreData() {
  console.log('=== LOGGING IN TO MINING CADASTRE PORTAL ===');
  const loginUrl = 'https://mining-cadastre.geosoftsolution.com/accounts/login/?next=/dashboard/home';
  const postUrl = 'https://mining-cadastre.geosoftsolution.com/accounts/login/';

  // Step 1: Login
  const resGet = await fetch(loginUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const getHtml = await resGet.text();
  const getCookies = resGet.headers.getSetCookie ? resGet.headers.getSetCookie() : [resGet.headers.get('set-cookie')];

  let csrfCookie = '';
  getCookies.forEach(c => {
    const m = c.match(/csrftoken=([^;]+)/);
    if (m) csrfCookie = m[1];
  });
  const csrfMatch = getHtml.match(/name=['"]csrfmiddlewaretoken['"]\s+value=['"]([^'"]+)['"]/i);
  const formCsrf = csrfMatch ? csrfMatch[1] : csrfCookie;

  const params = new URLSearchParams();
  params.append('csrfmiddlewaretoken', formCsrf);
  params.append('login', 'dgmines');
  params.append('password', 'Mmd1@mcs');
  params.append('next', '/dashboard/home');

  const resPost = await fetch(postUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0',
      'Cookie': `csrftoken=${csrfCookie}`,
      'Referer': loginUrl,
      'Origin': 'https://mining-cadastre.geosoftsolution.com'
    },
    body: params.toString(),
    redirect: 'manual'
  });

  const postCookies = resPost.headers.getSetCookie ? resPost.headers.getSetCookie() : [resPost.headers.get('set-cookie')];
  let sessionId = '';
  postCookies.forEach(c => {
    const m = c.match(/sessionid=([^;]+)/);
    if (m) sessionId = m[1];
  });

  if (!sessionId) throw new Error('Authentication failed: no session ID');
  console.log('Authenticated! Session ID:', sessionId);

  const headers = {
    'User-Agent': 'Mozilla/5.0',
    'Cookie': `csrftoken=${csrfCookie}; sessionid=${sessionId}`,
    'Accept': 'application/json'
  };

  // 1. Fetch Consolidated Finance Stats
  console.log('\n1. Fetching Consolidated Financial Stats...');
  const resFin = await fetch('https://mining-cadastre.geosoftsolution.com/mm2/api/consolidated-finance-stats/', { headers });
  const finJson = await resFin.json();
  fs.writeFileSync('cadastre_finance_stats.json', JSON.stringify(finJson, null, 2), 'utf8');
  console.log('   Saved cadastre_finance_stats.json (Progress: Total Due PKR ' + finJson.overall_progress?.net_due_amount + ', Realized PKR ' + finJson.overall_progress?.achieved_amount + ')');

  // 2. Fetch Concessions (1,676 records)
  console.log('\n2. Fetching All Concessions...');
  const resConc = await fetch('https://mining-cadastre.geosoftsolution.com/mmd/concessions/?format=json&limit=2500', { headers });
  const concJson = await resConc.json();
  fs.writeFileSync('cadastre_concessions.json', JSON.stringify(concJson.results || [], null, 2), 'utf8');
  console.log('   Saved cadastre_concessions.json (' + (concJson.results?.length || 0) + ' concessions)');

  // 3. Fetch Applications (1,434 records)
  console.log('\n3. Fetching All Applications...');
  const resApps = await fetch('https://mining-cadastre.geosoftsolution.com/mmd/applications/?format=json&limit=2500', { headers });
  const appsJson = await resApps.json();
  fs.writeFileSync('cadastre_applications.json', JSON.stringify(appsJson.results || [], null, 2), 'utf8');
  console.log('   Saved cadastre_applications.json (' + (appsJson.results?.length || 0) + ' applications)');

  // 4. Fetch 825 MultiPolygon Blocks GeoJSON
  console.log('\n4. Fetching 825 MultiPolygon Blocks GeoJSON...');
  const resGeo = await fetch('https://mining-cadastre.geosoftsolution.com/mm2/mm2/api/block-attribute-readonly/geojson_data/', { headers });
  const geoJson = await resGeo.json();
  fs.writeFileSync('cadastre_blocks_geojson.json', JSON.stringify(geoJson, null, 2), 'utf8');
  console.log('   Saved cadastre_blocks_geojson.json (' + (geoJson.features?.length || 0) + ' polygon features)');

  console.log('\n========================================');
  console.log('EXTRACTION COMPLETE: ALL OFFICIAL DATASETS CAPTURED!');
  console.log('========================================');
}

extractAllCadastreData().catch(console.error);
