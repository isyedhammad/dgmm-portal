const fs = require('fs');

console.log('=== BUILDING LEASE-WISE REVENUE & HISTORICAL DATASETS ===');

const chalans = JSON.parse(fs.readFileSync('cadastre_chalans.json', 'utf8'));
const inst = JSON.parse(fs.readFileSync('cadastre_installments.json', 'utf8'));
const rc = JSON.parse(fs.readFileSync('cadastre_royalty_contracts.json', 'utf8'));
const bg = JSON.parse(fs.readFileSync('cadastre_bank_guarantees.json', 'utf8'));
const concs = JSON.parse(fs.readFileSync('cadastre_concessions.json', 'utf8'));
const finStats = JSON.parse(fs.readFileSync('cadastre_finance_stats.json', 'utf8'));

// Build concession lookup map
const concMap = {};
concs.forEach(c => {
  const clientName = (c.client && c.client !== 'CLIENT DATA NOT PROVIDED BY BRANCH') ? c.client : (c.remarks || '');
  const obj = {
    id: c.id,
    no: c.concession_no || c.conc_no || '',
    client: clientName,
    branch: c.branch || 'SSM',
    district: c.district || '',
    mineral: c.mineral || '',
    type: c.concession_type || 'Mining Lease',
    status: c.status || 'Valid',
    area: c.area_acr || 0,
    location: c.location || ''
  };
  if (c.concession_no) concMap[c.concession_no.toUpperCase().trim()] = obj;
  if (c.conc_no) concMap[c.conc_no.toUpperCase().trim()] = obj;
  if (c.id) concMap['ID_' + c.id] = obj;
});

// 1. Process Chalans (1,728)
const cleanChalans = chalans.map(ch => {
  const refKey = (ch.reference || '').toUpperCase().trim();
  const matched = concMap[refKey] || {};
  return {
    id: ch.id,
    type: 'Chalan',
    ref: ch.reference || ('Chalan-' + ch.chalan_no),
    client: matched.client || (ch.chalan_remarks ? ch.chalan_remarks.toUpperCase() : 'Verified Concession Holder'),
    branch: ch.branch || matched.branch || 'LSM',
    district: ch.district || matched.district || 'Punjab',
    mineral: matched.mineral || 'Industrial Mineral',
    concessionType: matched.type || 'Mining Lease',
    mode: 'Chalan Entry',
    amountType: ch.amount_type || 'Royalty',
    chalanNo: ch.chalan_no || '',
    chalanDate: ch.chalan_date || ch.created_at || '',
    amountDue: Number(ch.chalan_amount) || 0,
    amountPaid: ch.paid ? (Number(ch.chalan_amount) || 0) : 0,
    balance: ch.paid ? 0 : (Number(ch.chalan_amount) || 0),
    isPaid: !!ch.paid,
    receiptUrl: ch.receipt_url || '',
    fy: 'FY 2026-27'
  };
});

// 2. Process Block Installments (897 block accounts)
const blockMap = {};
inst.forEach(i => {
  const cd = i.concession_detail || {};
  const code = i.block_code || cd.file_number || ('Block-' + i.block_id);
  if (!blockMap[code]) {
    // Extract district and mineral from block_code
    let dist = 'Punjab';
    let min = 'Minor Mineral';
    let branch = 'MM';
    if (i.block_code) {
      const parts = i.block_code.split('-');
      if (parts[0]) branch = parts[0];
      if (parts[1]) {
        const dCode = parts[1].toUpperCase();
        const distMap = {
          'ATK': 'Attock', 'CHK': 'Chakwal', 'DGK': 'D.G. Khan', 'JHL': 'Jhelum',
          'KHB': 'Khushab', 'MIW': 'Mianwali', 'SRG': 'Sargodha', 'RWP': 'Rawalpindi',
          'LHR': 'Lahore', 'FSD': 'Faisalabad', 'GUJ': 'Gujrat', 'GJW': 'Gujranwala',
          'JHG': 'Jhang', 'SWL': 'Sahiwal', 'MUL': 'Multan', 'BWP': 'Bahawalpur',
          'RYK': 'Rahim Yar Khan', 'KSR': 'Kasur', 'OKR': 'Okara', 'TTS': 'Toba Tek Singh'
        };
        dist = distMap[dCode] || parts[1];
      }
      if (parts[2]) min = parts[2].replace(/_/g, ' ');
    }

    blockMap[code] = {
      id: i.block_id || i.id,
      type: 'BlockInstallment',
      ref: cd.file_number || code.split(' ')[0],
      client: code.split('(')[1] ? code.split('(')[1].replace(')', '').trim() : 'Auction Block Contractor',
      branch: branch || 'MM',
      district: dist,
      mineral: min,
      concessionType: 'Auction Block',
      mode: 'Auction Installments',
      amountType: 'Auction Installment',
      chalanNo: '-',
      chalanDate: cd.grant_date || '',
      operativeBid: cd.operative_bid_amount || 0,
      amountDue: 0,
      amountPaid: 0,
      balance: 0,
      totalInstallments: 0,
      paidInstallments: 0,
      isPaid: false,
      receiptUrl: '',
      fy: 'FY 2026-27'
    };
  }

  const amt = Number(i.installment_amount) || 0;
  const paid = Number(i.paid_amount) || 0;
  blockMap[code].amountDue += amt;
  blockMap[code].amountPaid += paid;
  blockMap[code].totalInstallments += 1;
  if (i.paid) blockMap[code].paidInstallments += 1;
});

const cleanBlocks = Object.values(blockMap).map(b => {
  b.balance = Math.max(0, b.amountDue - b.amountPaid);
  b.isPaid = b.paidInstallments === b.totalInstallments && b.totalInstallments > 0;
  return b;
});

// 3. Process Royalty Contracts (15)
const cleanRC = rc.map(r => ({
  id: r.id,
  type: 'RoyaltyContract',
  ref: 'RC-' + r.district_royalty.substring(0, 3).toUpperCase() + '-' + r.id,
  client: r.client || 'District Contractor',
  branch: 'SSM',
  district: r.district_royalty || 'Punjab',
  mineral: 'District Royalty Collection',
  concessionType: 'Royalty Contract',
  mode: 'District Royalty Contract',
  amountType: 'Contract Bid Money',
  chalanNo: '-',
  chalanDate: r.grant_date || '',
  amountDue: Number(r.bid_money) || 0,
  amountPaid: Number(r.bid_money) || 0, // In cadastre royalty contracts, bid money is contractual
  balance: 0,
  isPaid: true,
  receiptUrl: '',
  fy: 'FY 2026-27'
}));

// 4. Process Bank Guarantees (206)
const cleanBG = bg.map(b => ({
  id: b.id,
  type: 'BankGuarantee',
  ref: b.guarantee_no || ('BG-' + b.id),
  client: b.plant || 'Industrial Cement Plant',
  branch: b.branch || 'LSM',
  district: b.district || 'Punjab',
  mineral: 'Limestone / Clay Security',
  concessionType: 'Statutory Guarantee',
  mode: 'Bank Guarantee',
  amountType: 'Bank Guarantee',
  chalanNo: b.guarantee_no || '',
  chalanDate: b.issue_date || '',
  amountDue: Number(b.amount) || 0,
  amountPaid: Number(b.amount) || 0, // Held in statutory custody
  balance: 0,
  isPaid: true,
  receiptUrl: b.guarantee_image || '',
  fy: 'FY 2026-27'
}));

// Build unified ledger
const unifiedCadastreLedger = [
  ...cleanChalans,
  ...cleanBlocks,
  ...cleanRC,
  ...cleanBG
].sort((a, b) => b.amountDue - a.amountDue);

console.log('Unified Cadastre Ledger count:', unifiedCadastreLedger.length);
console.log('Chalans count:', cleanChalans.length);
console.log('Blocks count:', cleanBlocks.length);
console.log('RC count:', cleanRC.length);
console.log('BG count:', cleanBG.length);

const cadastreBundle = {
  fy: "FY 2026-27",
  summary: {
    targetPKR: finStats.overall_progress?.target_amount || 115053702942,
    netDuePKR: finStats.overall_progress?.net_due_amount || 86211496813,
    achievedPKR: finStats.overall_progress?.achieved_amount || 33784889662,
    recoverablePKR: finStats.overall_progress?.recoverable_amount || 53449361706,
    bankGuaranteesPKR: finStats.bank_guarantees?.total_amount || 18326671508,
    targetPct: 29.36,
    duePct: 39.19,
    lsm: finStats.LSM,
    mm: finStats.MM,
    ssm: finStats.SSM,
    blocks: finStats.blocks
  },
  counts: {
    totalRecords: unifiedCadastreLedger.length,
    chalans: cleanChalans.length,
    blockAccounts: cleanBlocks.length,
    royaltyContracts: cleanRC.length,
    bankGuarantees: cleanBG.length
  },
  chalans: cleanChalans,
  blockAccounts: cleanBlocks,
  royaltyContracts: cleanRC,
  bankGuarantees: cleanBG,
  unifiedLedger: unifiedCadastreLedger
};

fs.writeFileSync('cadastre_lease_finance.js', 'window.CADASTRE_LEASE_FINANCE = ' + JSON.stringify(cadastreBundle) + ';', 'utf8');
console.log('Saved cadastre_lease_finance.js (Size: ' + (fs.statSync('cadastre_lease_finance.js').size / 1024 / 1024).toFixed(2) + ' MB)');
