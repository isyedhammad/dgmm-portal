const fs = require('fs');

async function downloadFinanceData() {
  console.log('=== LOGGING IN TO MINING CADASTRE FOR DETAILED REVENUE DATA ===');
  const loginUrl = 'https://mining-cadastre.geosoftsolution.com/accounts/login/?next=/dashboard/home';
  const postUrl = 'https://mining-cadastre.geosoftsolution.com/accounts/login/';

  const resGet = await fetch(loginUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const getCookies = resGet.headers.getSetCookie ? resGet.headers.getSetCookie() : [resGet.headers.get('set-cookie')];
  let csrfCookie = '';
  getCookies.forEach(c => { const m = c.match(/csrftoken=([^;]+)/); if (m) csrfCookie = m[1]; });

  const getHtml = await resGet.text();
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
      'Cookie': 'csrftoken=' + csrfCookie,
      'Referer': loginUrl,
      'Origin': 'https://mining-cadastre.geosoftsolution.com'
    },
    body: params.toString(),
    redirect: 'manual'
  });

  const postCookies = resPost.headers.getSetCookie ? resPost.headers.getSetCookie() : [resPost.headers.get('set-cookie')];
  let sessionId = '';
  postCookies.forEach(c => { const m = c.match(/sessionid=([^;]+)/); if (m) sessionId = m[1]; });

  if (!sessionId) throw new Error('Authentication failed');
  console.log('Authenticated! Session ID:', sessionId);

  const headers = {
    'User-Agent': 'Mozilla/5.0',
    'Cookie': 'csrftoken=' + csrfCookie + '; sessionid=' + sessionId,
    'Accept': 'application/json'
  };

  // 1. Fetch Concession Chalan Entries (1,728)
  console.log('Fetching Concession Chalan Entries...');
  const resChalan = await fetch('https://mining-cadastre.geosoftsolution.com/mm2/api/concession-chalan-entry/?limit=2500', { headers });
  const chalanData = await resChalan.json();
  const chalans = chalanData.results || [];
  fs.writeFileSync('cadastre_chalans.json', JSON.stringify(chalans, null, 2), 'utf8');
  console.log(`Saved cadastre_chalans.json (${chalans.length} records)`);

  // 2. Fetch District Royalty Contracts (15)
  console.log('Fetching Royalty Contracts...');
  const resRC = await fetch('https://mining-cadastre.geosoftsolution.com/mm2/api/district-royalty-contract/?limit=50', { headers });
  const rcData = await resRC.json();
  const royaltyContracts = rcData.results || [];
  fs.writeFileSync('cadastre_royalty_contracts.json', JSON.stringify(royaltyContracts, null, 2), 'utf8');
  console.log(`Saved cadastre_royalty_contracts.json (${royaltyContracts.length} records)`);

  // 3. Fetch Bank Guarantees (206)
  console.log('Fetching Bank Guarantees...');
  const resBG = await fetch('https://mining-cadastre.geosoftsolution.com/mm2/api/bank-guarantees/?limit=500', { headers });
  const bgData = await resBG.json();
  const bankGuarantees = bgData.results || [];
  fs.writeFileSync('cadastre_bank_guarantees.json', JSON.stringify(bankGuarantees, null, 2), 'utf8');
  console.log(`Saved cadastre_bank_guarantees.json (${bankGuarantees.length} records)`);

  // 4. Fetch Minor Mineral / SSM Installments (5,613 records in batches)
  console.log('Fetching Installments...');
  let allInstallments = [];
  let offset = 0;
  const limit = 2000;
  while (true) {
    const resIns = await fetch(`https://mining-cadastre.geosoftsolution.com/mm2/api/installment/?limit=${limit}&offset=${offset}`, { headers });
    const insData = await resIns.json();
    const batch = insData.results || [];
    allInstallments = allInstallments.concat(batch);
    console.log(`  Fetched batch of ${batch.length} installments (total so far: ${allInstallments.length})`);
    if (!insData.next || batch.length === 0) break;
    offset += limit;
  }
  fs.writeFileSync('cadastre_installments.json', JSON.stringify(allInstallments, null, 2), 'utf8');
  console.log(`Saved cadastre_installments.json (${allInstallments.length} records)`);

  console.log('\n=== ALL CADASTRE FINANCIAL DATASETS DOWNLOADED SUCCESSFULLY ===');
}

downloadFinanceData().catch(console.error);
