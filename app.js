// ===================================================================
// GOVERNMENT OF THE PUNJAB — DIRECTORATE GENERAL OF MINES & MINERALS
// EXECUTIVE MONITORING & REVENUE OPERATIONS PORTAL
// MASTER APPLICATION CONTROLLER (app.js) - VERSION 5.0 (SMART FILTERS)
// ===================================================================

document.addEventListener("DOMContentLoaded", () => {
  const db = window.DGM_DATA || {};
  const executive = db.executive || {};
  const divisions = db.divisions || { lsm: {}, sma: {}, mm: {} };

  // -------------------------------------------------------------
  // DISTRICT & FIELD OFFICE CANONICAL MAPPINGS
  // -------------------------------------------------------------
  const DISTRICT_CANONICAL = {
    "ATK": "Attock",
    "ATTOCK": "Attock",
    "RWP": "Rawalpindi",
    "RAWALPINDI": "Rawalpindi",
    "DGK": "Dera Ghazi Khan",
    "D.G. KHAN": "Dera Ghazi Khan",
    "D.G KHAN": "Dera Ghazi Khan",
    "DG KHAN": "Dera Ghazi Khan",
    "DERA GHAZI KHAN": "Dera Ghazi Khan",
    "CKL": "Chakwal",
    "CKL-I": "Chakwal",
    "CKL-II": "Chakwal",
    "CHAKWAL": "Chakwal",
    "MLI": "Mianwali",
    "MAINWALI": "Mianwali",
    "MIANWALI": "Mianwali",
    "JLM": "Jhelum",
    "JHELUM": "Jhelum",
    "KHB": "Khushab",
    "KHUSHAB": "Khushab",
    "BHW": "Bahawalpur",
    "BHAWALPUR": "Bahawalpur",
    "BAHAWALPUR": "Bahawalpur",
    "BAHAWALNAGAR": "Bahawalnagar",
    "BWN": "Bahawalnagar",
    "RJP": "Rajanpur",
    "RAJANPUR": "Rajanpur",
    "CHN": "Chiniot",
    "CHINIOT": "Chiniot",
    "SGD": "Sargodha",
    "SRG": "Sargodha",
    "SARGODHA": "Sargodha",
    "FSD": "Faisalabad",
    "FAISALABAD": "Faisalabad",
    "JHG": "Jhang",
    "JHANG": "Jhang",
    "LHR": "Lahore",
    "LAHORE": "Lahore",
    "KSR": "Kasur",
    "KASUR": "Kasur",
    "SKP": "Sheikhupura",
    "SHEIKHUPURA": "Sheikhupura",
    "NKS": "Nankana Sahib",
    "NANKANA SAHIB": "Nankana Sahib",
    "OKA": "Okara",
    "OKARA": "Okara",
    "GRW": "Gujranwala",
    "GUJRANWALA": "Gujranwala",
    "GJT": "Gujrat",
    "GUJ": "Gujrat",
    "GUJRAT": "Gujrat",
    "SKT": "Sialkot",
    "SIALKOT": "Sialkot",
    "NWL": "Narowal",
    "NAROWAL": "Narowal",
    "HFD": "Hafizabad",
    "HFBD": "Hafizabad",
    "HAFIZABAD": "Hafizabad",
    "MBD": "Mandi Bahauddin",
    "MANDI BAHAUDDIN": "Mandi Bahauddin",
    "MANDI BAHA-UD-DIN": "Mandi Bahauddin",
    "MTN": "Multan",
    "MULTAN": "Multan",
    "KWL": "Khanewal",
    "KHANEWAL": "Khanewal",
    "VHR": "Vehari",
    "VEHARI": "Vehari",
    "SWL": "Sahiwal",
    "SAHIWAL": "Sahiwal",
    "PKP": "Pakpattan",
    "PAKPATTAN": "Pakpattan",
    "BKR": "Bhakkar",
    "BHAKKAR": "Bhakkar",
    "BAKHER": "Bhakkar",
    "LYA": "Layyah",
    "LAYYAH": "Layyah",
    "MZG": "Muzaffargarh",
    "MUZAFFARGARH": "Muzaffargarh",
    "LDH": "Lodhran",
    "LODHRAN": "Lodhran",
    "TTS": "Toba Tek Singh",
    "TOBA TEK SINGH": "Toba Tek Singh",
    "RYK": "Rahim Yar Khan",
    "R.Y. KHAN": "Rahim Yar Khan",
    "RAHIM YAR KHAN": "Rahim Yar Khan"
  };

  const DISTRICT_TO_FIELD_OFFICE = {
    "Attock": "Attock Office",
    "Rawalpindi": "Attock Office",
    "Chakwal": "Chakwal Office",
    "Jhelum": "Jhelum Office",
    "Gujrat": "Jhelum Office",
    "Mandi Bahauddin": "Jhelum Office",
    "Khushab": "Khushab Office",
    "Mianwali": "Mianwali Office",
    "Bhakkar": "Mianwali Office",
    "Dera Ghazi Khan": "D.G. Khan Office",
    "Rajanpur": "D.G. Khan Office",
    "Muzaffargarh": "D.G. Khan Office",
    "Layyah": "D.G. Khan Office",
    "Sargodha": "Sargodha Office",
    "Chiniot": "Sargodha Office",
    "Faisalabad": "Sargodha Office",
    "Jhang": "Sargodha Office",
    "Toba Tek Singh": "Sargodha Office",
    "Lahore": "Lahore Office",
    "Kasur": "Lahore Office",
    "Sheikhupura": "Lahore Office",
    "Nankana Sahib": "Lahore Office",
    "Okara": "Lahore Office",
    "Gujranwala": "Gujranwala Office",
    "Hafizabad": "Gujranwala Office",
    "Sialkot": "Gujranwala Office",
    "Narowal": "Gujranwala Office",
    "Multan": "Multan Office",
    "Khanewal": "Multan Office",
    "Vehari": "Multan Office",
    "Sahiwal": "Multan Office",
    "Pakpattan": "Multan Office",
    "Lodhran": "Multan Office",
    "Bahawalpur": "Bahawalpur Office",
    "Bahawalnagar": "Bahawalpur Office",
    "Rahim Yar Khan": "Bahawalpur Office"
  };

  const ALL_FIELD_OFFICES = [
    "Attock Office",
    "Bahawalpur Office",
    "Chakwal Office",
    "D.G. Khan Office",
    "Gujranwala Office",
    "Jhelum Office",
    "Khushab Office",
    "Lahore Office",
    "Mianwali Office",
    "Multan Office",
    "Sargodha Office"
  ];

  function normalizeDistrict(raw) {
    if (!raw) return "Headquarters";
    const cleaned = String(raw).trim().toUpperCase();
    if (DISTRICT_CANONICAL[cleaned]) return DISTRICT_CANONICAL[cleaned];
    for (const [key, val] of Object.entries(DISTRICT_CANONICAL)) {
      if (cleaned.includes(key)) return val;
    }
    return raw.trim();
  }

  function normalizeMineral(min) {
    if (!min) return "";
    let str = "";
    if (typeof min === "string") str = min.trim();
    else if (Array.isArray(min)) {
      const flat = min.flat(Infinity).filter(Boolean);
      str = flat.length > 0 ? String(flat[0]).trim() : "";
    } else {
      str = String(min).trim();
    }
    const upper = str.toUpperCase().replace(/[;]/g, "").trim();
    if (!upper || upper === "-") return "";
    if (upper.includes("ORD") || upper.includes("ORDINARY SAND")) return "Ordinary Sand";
    if (upper.includes("SAND STONE") || upper.includes("SANDSTONE")) return "Sandstone";
    if (upper.includes("SAND GRAVEL") || upper.includes("SAND-GRAVEL") || upper.includes("SAND/GRAVEL")) return "Sand Gravel";
    if (upper.includes("SILICA") || upper.includes("SLICA")) return "Silica Sand";
    if (upper.includes("ROCK") && upper.includes("SALT")) return "Rock Salt";
    if (upper.includes("IRON")) return "Iron Ore";
    if (upper.includes("FIRE") && upper.includes("CLAY")) return "Fireclay";
    if (upper.includes("ARG") && upper.includes("CLAY")) return "Argillaceous Clay";
    if (upper.includes("PLACER") || upper.includes("GOLD")) return "Placer Gold & Base Metals";
    if (upper.includes("SLATE")) return "Slate Stone";
    if (upper.includes("LIME") && upper.includes("STONE")) return "Limestone";
    if (upper.includes("GYPSUM")) return "Gypsum";
    if (upper.includes("COAL")) return "Coal";
    if (upper.includes("BAUXITE")) return "Bauxite";
    if (upper.includes("BENTONITE")) return "Bentonite";
    if (upper.includes("CELESTITE")) return "Celestite";
    if (upper.includes("FULLER")) return "Fuller Earth";
    if (upper.includes("LATRITE")) return "Latrite";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function getFieldOffice(rawDistrict) {
    const canonical = normalizeDistrict(rawDistrict);
    return DISTRICT_TO_FIELD_OFFICE[canonical] || "Headquarters (Lahore)";
  }

  // -------------------------------------------------------------
  // DATE PARSER & RANGE MATCHER
  // -------------------------------------------------------------
  function parseDateSafe(val) {
    if (!val) return null;
    const str = String(val).trim();
    if (!isNaN(str) && Number(str) > 20000 && Number(str) < 60000) {
      const epoch = new Date(1899, 11, 30);
      return new Date(epoch.getTime() + Number(str) * 86400000);
    }
    if (/^\d{4}-\d{2}-\d{2}/.test(str)) {
      return new Date(str.slice(0, 10));
    }
    const dmy = str.match(/^(\d{1,2})[.\/-](\d{1,2})[.\/-](\d{4})/);
    if (dmy) {
      return new Date(parseInt(dmy[3], 10), parseInt(dmy[2], 10) - 1, parseInt(dmy[1], 10));
    }
    const d = new Date(str);
    return isNaN(d.getTime()) ? null : d;
  }

  function formatDateDisplay(d) {
    if (!d) return "-";
    const parsed = parseDateSafe(d);
    if (!parsed) return String(d);
    const yr = parsed.getFullYear();
    const mo = String(parsed.getMonth() + 1).padStart(2, "0");
    const da = String(parsed.getDate()).padStart(2, "0");
    return `${yr}-${mo}-${da}`;
  }

  function testDateInRange(dateCandidates, fromStr, toStr) {
    if (!fromStr && !toStr) return true;
    const fromDate = fromStr ? new Date(fromStr + "T00:00:00") : null;
    const toDate = toStr ? new Date(toStr + "T23:59:59") : null;

    const list = Array.isArray(dateCandidates) ? dateCandidates : [dateCandidates];
    const validDates = list.map(parseDateSafe).filter(Boolean);
    if (validDates.length === 0) return true; // Keep record if no parseable date is provided

    return validDates.some(d => {
      if (fromDate && d < fromDate) return false;
      if (toDate && d > toDate) return false;
      return true;
    });
  }

  // -------------------------------------------------------------
  // DATA PRE-ENRICHMENT
  // -------------------------------------------------------------
  function enrichDatasets() {
    // LSM Leases
    (divisions.lsm?.leases || []).forEach(r => {
      r._normDistrict = normalizeDistrict(r.district);
      r._fieldOffice = getFieldOffice(r._normDistrict);
      r._normMineral = normalizeMineral(r.mineral);
    });

    // LSM Exploration
    (divisions.lsm?.explorationValid || []).forEach(r => {
      r._normDistrict = normalizeDistrict(r.district);
      r._fieldOffice = getFieldOffice(r._normDistrict);
      r._normMineral = normalizeMineral(r.mineral);
    });
    (divisions.lsm?.explorationCancelled || []).forEach(r => {
      r._normDistrict = normalizeDistrict(r.district);
      r._fieldOffice = getFieldOffice(r._normDistrict);
      r._normMineral = normalizeMineral(r.mineral);
    });

    // LSM Pending
    (divisions.lsm?.pendingApplications || []).forEach(r => {
      r._normDistrict = normalizeDistrict(r.district);
      r._fieldOffice = getFieldOffice(r._normDistrict);
      r._normMineral = normalizeMineral(r.mineral);
    });

    // SMA
    (divisions.sma?.auctionConcessions || []).forEach(r => {
      r._normDistrict = normalizeDistrict(r.district);
      r._fieldOffice = getFieldOffice(r._normDistrict);
      r._normMineral = normalizeMineral(r.mineral);
    });
    (divisions.sma?.applicationConcessions || []).forEach(r => {
      r._normDistrict = normalizeDistrict(r.district);
      r._fieldOffice = getFieldOffice(r._normDistrict);
      r._normMineral = normalizeMineral(r.mineral);
    });

    // Minor Minerals
    (divisions.mm?.blocks || []).forEach(r => {
      r._normDistrict = normalizeDistrict(r.district);
      r._fieldOffice = getFieldOffice(r._normDistrict);
      r._normMineral = normalizeMineral(r.mineral);
    });
    (divisions.mm?.upcomingAuctions || []).forEach(r => {
      r._normDistrict = normalizeDistrict(r.district);
      r._fieldOffice = getFieldOffice(r._normDistrict);
      r._normMineral = normalizeMineral(r.mineral);
    });

    // EPA Cases
    (db.epaCases || []).forEach(r => {
      r._normDistrict = normalizeDistrict(r.district);
      r._fieldOffice = r.fieldOffice ? `${r.fieldOffice} Office` : getFieldOffice(r._normDistrict);
      r._normMineral = normalizeMineral(r.mineral);
    });

    // Appeals Docket (Infer District from Appeal No & Subject)
    (db.appealsCases || []).forEach(r => {
      const combined = (r.appealNo + " " + (r.subject || "")).toUpperCase();
      let foundDist = "Headquarters (Lahore)";
      for (const [key, val] of Object.entries(DISTRICT_CANONICAL)) {
        if (combined.includes(key)) {
          foundDist = val;
          break;
        }
      }
      r._normDistrict = foundDist;
      r._fieldOffice = getFieldOffice(foundDist);
      r._normMineral = normalizeMineral(r.mineral || r.subject);
      r._displayDate = formatDateDisplay(r.dateOfAppeal || r.year);
      r.respondentWing = r.respondentWing || "Director Licensing";
    });
  }

  enrichDatasets();

  // -------------------------------------------------------------
  // STATE MANAGEMENT
  // -------------------------------------------------------------
  const initialActivePane = document.querySelector(".tab-pane.active");
  const state = {
    activeTab: initialActivePane ? initialActivePane.id : "tab-overview",
    globalSearch: "",

    // Large Scale Mining
    lsm: {
      category: "leases",      // "leases" | "exploration" | "pending"
      explFilter: "valid",     // "valid" | "cancelled"
      search: "",
      district: "ALL",
      mineral: "ALL",
      fieldOffice: "ALL",
      status: "ALL",
      dateFrom: "",
      dateTo: "",
      page: 1,
      pageSize: 15
    },

    // Small Scale Mining
    sma: {
      category: "leases",      // "leases" | "prospecting" | "matrix"
      mode: "auction",         // "auction" | "application"
      search: "",
      district: "ALL",
      mineral: "ALL",
      fieldOffice: "ALL",
      status: "ALL",
      dateFrom: "",
      dateTo: "",
      page: 1,
      pageSize: 15
    },

    // Minor Minerals
    mm: {
      subTab: "all",           // "all" | "upcoming" | "vacant"
      search: "",
      district: "ALL",
      mineral: "ALL",
      fieldOffice: "ALL",
      status: "ALL",
      dateFrom: "",
      dateTo: "",
      page: 1,
      pageSize: 15
    },

    // EPA Clearances
    epa: {
      search: "",
      district: "ALL",
      mineral: "ALL",
      method: "ALL",
      status: "ALL",
      page: 1,
      pageSize: 15
    },

    // Appeals Tracker
    appeals: {
      search: "",
      district: "ALL",
      wing: "ALL",
      dateFrom: "",
      dateTo: "",
      page: 1,
      pageSize: 15
    },

    // Administration Division
    admin: {
      subTab: "roster",        // "roster" | "cadre" | "offices"
      search: "",
      office: "ALL",
      bps: "ALL",
      status: "ALL",
      gender: "ALL",
      appointment: "ALL",
      page: 1,
      pageSize: 15
    }
  };

  // -------------------------------------------------------------
  // INITIALIZATION
  // -------------------------------------------------------------
  initClock();
  initSidebar();
  populateDropdowns();
  bindFilterListeners();
  initGlobalSearch();
  initExport();
  renderLsm();
  renderSma();
  renderMm();
  renderEpa();
  renderAppeals();
  renderAdmin();
  renderActiveTab();

  // -------------------------------------------------------------
  // CLOCK CONTROLLER
  // -------------------------------------------------------------
  function initClock() {
    const clockEl = document.getElementById("livePktTime");
    function updateClock() {
      const now = new Date();
      const options = {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      };
      if (clockEl) {
        clockEl.textContent = now.toLocaleTimeString("en-US", options) + " PKT";
      }
    }
    updateClock();
    setInterval(updateClock, 1000);
  }

  // -------------------------------------------------------------
  // SIDEBAR & TAB CONTROLLER
  // -------------------------------------------------------------
  function initSidebar() {
    const navLinks = document.querySelectorAll(".sidebar-nav .nav-link");
    const mobileToggle = document.getElementById("mobileMenuToggle");
    const sidebar = document.getElementById("appSidebar");
    const breadcrumbSection = document.getElementById("activeBreadcrumbSection");
    const breadcrumbTitle = document.getElementById("activeBreadcrumbTitle");

    const tabMeta = {
      "tab-overview": { section: "Executive Overview", title: "Senior Management Summary Dashboard" },
      "tab-lsm": { section: "Mineral Operations", title: "Large Scale Mining" },
      "tab-sma": { section: "Mineral Operations", title: "Small Scale Mining" },
      "tab-mm": { section: "Mineral Operations", title: "Minor Minerals" },
      "tab-map": { section: "Spatial Intelligence", title: "GIS Mineral Map of Punjab Province" },
      "tab-financials": { section: "Financial Intelligence", title: "5-Year Revenue, Royalty & Output Analytics" },
      "tab-epa": { section: "Regulatory Clearances", title: "EPA Environmental Clearances (151 Concession Cases)" },
      "tab-appeals": { section: "Legal Proceedings", title: "Appellate Authority Pendency Tracker" },
      "tab-admin": { section: "Administration & Establishment", title: "Administration Division & Human Capital Master Register" }
    };

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        const tabId = link.getAttribute("data-tab");
        if (!tabId) return;

        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");

        document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.remove("active"));
        const targetPane = document.getElementById(tabId);
        if (targetPane) targetPane.classList.add("active");

        state.activeTab = tabId;

        if (tabMeta[tabId]) {
          breadcrumbSection.textContent = tabMeta[tabId].section;
          breadcrumbTitle.textContent = tabMeta[tabId].title;
        }

        if (sidebar && sidebar.classList.contains("mobile-open")) {
          sidebar.classList.remove("mobile-open");
        }

        renderActiveTab();
      });
    });

    if (mobileToggle && sidebar) {
      mobileToggle.addEventListener("click", () => {
        sidebar.classList.toggle("mobile-open");
      });
    }
  }

  // -------------------------------------------------------------
  // POPULATE DROPDOWNS
  // -------------------------------------------------------------
  function populateDropdowns() {
    const allDistricts = new Set();
    const allMinerals = new Set();

    // Harvest distinct values from all datasets
    [
      ...(divisions.lsm?.leases || []),
      ...(divisions.lsm?.explorationValid || []),
      ...(divisions.lsm?.pendingApplications || []),
      ...(divisions.sma?.auctionConcessions || []),
      ...(divisions.sma?.applicationConcessions || []),
      ...(divisions.mm?.blocks || []),
      ...(db.epaCases || []),
      ...(db.appealsCases || [])
    ].forEach(r => {
      if (r._normDistrict && r._normDistrict !== "Unknown") allDistricts.add(r._normDistrict);
      const cleanMin = normalizeMineral(r.mineral);
      if (cleanMin) allMinerals.add(cleanMin);
    });

    const sortedDistricts = Array.from(allDistricts).sort();
    const sortedMinerals = Array.from(allMinerals).sort();

    function fill(elId, items, defaultLabel = "All") {
      const el = document.getElementById(elId);
      if (!el) return;
      const cur = el.value;
      el.innerHTML = `<option value="ALL">${defaultLabel}</option>`;
      items.forEach(it => {
        const opt = document.createElement("option");
        opt.value = it;
        opt.textContent = it;
        el.appendChild(opt);
      });
      el.value = cur || "ALL";
    }

    // Districts
    fill("lsmDistrictFilter", sortedDistricts, "All Districts");
    fill("smaDistrictFilter", sortedDistricts, "All Districts");
    fill("mmDistrictFilter", sortedDistricts, "All Districts");
    fill("epaDistrictSelect", sortedDistricts, "All Districts");
    fill("appealsDistrictSelect", sortedDistricts, "All Districts");

    // Minerals
    fill("lsmMineralFilter", sortedMinerals, "All Minerals");
    fill("smaMineralFilter", sortedMinerals, "All Minerals");
    fill("mmMineralFilter", sortedMinerals, "All Minerals");
    fill("mapMineralFilter", sortedMinerals, "All Minerals");
    fill("epaMineralSelect", sortedMinerals, "All Minerals");

    // Field Offices
    fill("lsmFieldOfficeFilter", ALL_FIELD_OFFICES, "All Field Offices");
    fill("smaFieldOfficeFilter", ALL_FIELD_OFFICES, "All Field Offices");
    fill("mmFieldOfficeFilter", ALL_FIELD_OFFICES, "All Field Offices");

    // Admin Offices
    const adminOffices = (window.DGM_DATA && window.DGM_DATA.admin && window.DGM_DATA.admin.offices)
      ? window.DGM_DATA.admin.offices.map(o => o.office)
      : [];
    fill("adminOfficeSelect", adminOffices, "All Offices (17)");
  }

  // -------------------------------------------------------------
  // BIND FILTER LISTENERS
  // -------------------------------------------------------------
  function bindFilterListeners() {
    // LSM Inputs
    bindInput("lsmSearchInput", val => { state.lsm.search = val; state.lsm.page = 1; renderLsm(); });
    bindSelect("lsmDistrictFilter", val => { state.lsm.district = val; state.lsm.page = 1; renderLsm(); });
    bindSelect("lsmMineralFilter", val => { state.lsm.mineral = val; state.lsm.page = 1; renderLsm(); });
    bindSelect("lsmFieldOfficeFilter", val => { state.lsm.fieldOffice = val; state.lsm.page = 1; renderLsm(); });
    bindSelect("lsmStatusFilter", val => { state.lsm.status = val; state.lsm.page = 1; renderLsm(); });
    bindInput("lsmDateFrom", val => { state.lsm.dateFrom = val; state.lsm.page = 1; renderLsm(); });
    bindInput("lsmDateTo", val => { state.lsm.dateTo = val; state.lsm.page = 1; renderLsm(); });

    document.getElementById("btnResetLsmFilters")?.addEventListener("click", () => {
      resetLsmFilters();
      renderLsm();
    });

    // SMA Inputs
    bindInput("smaSearchInput", val => { state.sma.search = val; state.sma.page = 1; renderSma(); });
    bindSelect("smaDistrictFilter", val => { state.sma.district = val; state.sma.page = 1; renderSma(); });
    bindSelect("smaMineralFilter", val => { state.sma.mineral = val; state.sma.page = 1; renderSma(); });
    bindSelect("smaFieldOfficeFilter", val => { state.sma.fieldOffice = val; state.sma.page = 1; renderSma(); });
    bindSelect("smaStatusFilter", val => { state.sma.status = val; state.sma.page = 1; renderSma(); });
    bindInput("smaDateFrom", val => { state.sma.dateFrom = val; state.sma.page = 1; renderSma(); });
    bindInput("smaDateTo", val => { state.sma.dateTo = val; state.sma.page = 1; renderSma(); });

    document.getElementById("btnResetSmaFilters")?.addEventListener("click", () => {
      resetSmaFilters();
      renderSma();
    });

    // MM Inputs
    bindInput("mmSearchInput", val => { state.mm.search = val; state.mm.page = 1; renderMm(); });
    bindSelect("mmDistrictFilter", val => { state.mm.district = val; state.mm.page = 1; renderMm(); });
    bindSelect("mmMineralFilter", val => { state.mm.mineral = val; state.mm.page = 1; renderMm(); });
    bindSelect("mmFieldOfficeFilter", val => { state.mm.fieldOffice = val; state.mm.page = 1; renderMm(); });
    bindSelect("mmStatusFilter", val => { state.mm.status = val; state.mm.page = 1; renderMm(); });
    bindInput("mmDateFrom", val => { state.mm.dateFrom = val; state.mm.page = 1; renderMm(); });
    bindInput("mmDateTo", val => { state.mm.dateTo = val; state.mm.page = 1; renderMm(); });

    document.getElementById("btnResetMmFilters")?.addEventListener("click", () => {
      resetMmFilters();
      renderMm();
    });

    // EPA Inputs
    bindInput("epaSearchInput", val => { state.epa.search = val; state.epa.page = 1; renderEpa(); });
    bindSelect("epaDistrictSelect", val => { state.epa.district = val; state.epa.page = 1; renderEpa(); });
    bindSelect("epaMineralSelect", val => { state.epa.mineral = val; state.epa.page = 1; renderEpa(); });
    bindSelect("epaMethodSelect", val => { state.epa.method = val; state.epa.page = 1; renderEpa(); });
    bindSelect("epaStatusSelect", val => { state.epa.status = val; state.epa.page = 1; renderEpa(); });

    document.getElementById("btnResetEpaFilters")?.addEventListener("click", () => {
      resetEpaFilters();
      renderEpa();
    });

    // Appeals Inputs
    bindInput("appealsSearchInput", val => { state.appeals.search = val; state.appeals.page = 1; renderAppeals(); });
    bindSelect("appealsDistrictSelect", val => { state.appeals.district = val; state.appeals.page = 1; renderAppeals(); });
    bindSelect("appealsWingSelect", val => { state.appeals.wing = val; state.appeals.page = 1; renderAppeals(); });
    bindInput("appealsDateFrom", val => { state.appeals.dateFrom = val; state.appeals.page = 1; renderAppeals(); });
    bindInput("appealsDateTo", val => { state.appeals.dateTo = val; state.appeals.page = 1; renderAppeals(); });

    document.getElementById("btnResetAppealsFilters")?.addEventListener("click", () => {
      resetAppealsFilters();
      renderAppeals();
    });

    // Admin Inputs
    bindInput("adminSearchInput", val => { state.admin.search = val; state.admin.page = 1; renderAdmin(); });
    bindSelect("adminOfficeSelect", val => { state.admin.office = val; state.admin.page = 1; renderAdmin(); });
    bindSelect("adminBpsSelect", val => { state.admin.bps = val; state.admin.page = 1; renderAdmin(); });
    bindSelect("adminStatusSelect", val => { state.admin.status = val; state.admin.page = 1; renderAdmin(); });
    bindSelect("adminGenderSelect", val => { state.admin.gender = val; state.admin.page = 1; renderAdmin(); });
    bindSelect("adminAppointmentSelect", val => { state.admin.appointment = val; state.admin.page = 1; renderAdmin(); });

    document.getElementById("btnResetAdminFilters")?.addEventListener("click", () => {
      resetAdminFilters();
      renderAdmin();
    });

    // Admin Sub-tabs toggles
    document.querySelectorAll("[data-admin-sub]").forEach(btn => {
      btn.addEventListener("click", () => {
        const sub = btn.getAttribute("data-admin-sub");
        if (!sub) return;
        document.querySelectorAll("[data-admin-sub]").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.admin.subTab = sub;

        const rosterView = document.getElementById("adminRosterView");
        const cadreView = document.getElementById("adminCadreView");
        const officesView = document.getElementById("adminOfficesView");
        const filterPanel = document.getElementById("adminFilterPanel");
        const heading = document.getElementById("adminSectionHeading");
        const subtitle = document.getElementById("adminSectionSubtitle");

        if (rosterView) rosterView.style.display = sub === "roster" ? "block" : "none";
        if (cadreView) cadreView.style.display = sub === "cadre" ? "block" : "none";
        if (officesView) officesView.style.display = sub === "offices" ? "block" : "none";
        if (filterPanel) filterPanel.style.display = sub === "roster" ? "block" : "none";

        if (sub === "roster") {
          if (heading) heading.textContent = "Staff Directory & Personnel Nominal Roll";
          if (subtitle) subtitle.textContent = "Official Directorate General of Mines & Minerals Establishment Roster & Sanctioned Posts Database";
        } else if (sub === "cadre") {
          if (heading) heading.textContent = "Sanctioned Cadre Matrix (BS-20 to BS-01)";
          if (subtitle) subtitle.textContent = "Complete 64-Post Cadre Schedule with Headquarters & Field Allocation Breakdown";
        } else if (sub === "offices") {
          if (heading) heading.textContent = "Regional Field Offices Staffing Rollup";
          if (subtitle) subtitle.textContent = "Headquarters & 16 Regional Field Formations by Fund Centre with Gazetted & Non-Gazetted Deployment";
        }

        renderAdmin();
      });
    });

    document.getElementById("btnPrevAdmin")?.addEventListener("click", () => {
      if (state.admin.page > 1) { state.admin.page--; renderAdmin(); }
    });
    document.getElementById("btnNextAdmin")?.addEventListener("click", () => {
      state.admin.page++; renderAdmin();
    });
  }

  function bindInput(id, callback) {
    const el = document.getElementById(id);
    if (!el) return;
    let timer;
    el.addEventListener("input", e => {
      clearTimeout(timer);
      timer = setTimeout(() => callback(e.target.value.trim()), 200);
    });
  }

  function bindSelect(id, callback) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("change", e => callback(e.target.value));
  }

  // -------------------------------------------------------------
  // RESET HANDLERS
  // -------------------------------------------------------------
  function resetLsmFilters() {
    state.lsm.search = "";
    state.lsm.district = "ALL";
    state.lsm.mineral = "ALL";
    state.lsm.fieldOffice = "ALL";
    state.lsm.status = "ALL";
    state.lsm.dateFrom = "";
    state.lsm.dateTo = "";
    state.lsm.page = 1;

    setVal("lsmSearchInput", "");
    setVal("lsmDistrictFilter", "ALL");
    setVal("lsmMineralFilter", "ALL");
    setVal("lsmFieldOfficeFilter", "ALL");
    setVal("lsmStatusFilter", "ALL");
    setVal("lsmDateFrom", "");
    setVal("lsmDateTo", "");
  }

  function resetSmaFilters() {
    state.sma.search = "";
    state.sma.district = "ALL";
    state.sma.mineral = "ALL";
    state.sma.fieldOffice = "ALL";
    state.sma.status = "ALL";
    state.sma.dateFrom = "";
    state.sma.dateTo = "";
    state.sma.page = 1;

    setVal("smaSearchInput", "");
    setVal("smaDistrictFilter", "ALL");
    setVal("smaMineralFilter", "ALL");
    setVal("smaFieldOfficeFilter", "ALL");
    setVal("smaStatusFilter", "ALL");
    setVal("smaDateFrom", "");
    setVal("smaDateTo", "");
  }

  function resetMmFilters() {
    state.mm.search = "";
    state.mm.district = "ALL";
    state.mm.mineral = "ALL";
    state.mm.fieldOffice = "ALL";
    state.mm.status = "ALL";
    state.mm.dateFrom = "";
    state.mm.dateTo = "";
    state.mm.page = 1;

    setVal("mmSearchInput", "");
    setVal("mmDistrictFilter", "ALL");
    setVal("mmMineralFilter", "ALL");
    setVal("mmFieldOfficeFilter", "ALL");
    setVal("mmStatusFilter", "ALL");
    setVal("mmDateFrom", "");
    setVal("mmDateTo", "");
  }

  function resetEpaFilters() {
    state.epa.search = "";
    state.epa.district = "ALL";
    state.epa.mineral = "ALL";
    state.epa.method = "ALL";
    state.epa.status = "ALL";
    state.epa.page = 1;

    setVal("epaSearchInput", "");
    setVal("epaDistrictSelect", "ALL");
    setVal("epaMineralSelect", "ALL");
    setVal("epaMethodSelect", "ALL");
    setVal("epaStatusSelect", "ALL");
  }

  function resetAppealsFilters() {
    state.appeals.search = "";
    state.appeals.district = "ALL";
    state.appeals.wing = "ALL";
    state.appeals.dateFrom = "";
    state.appeals.dateTo = "";
    state.appeals.page = 1;

    setVal("appealsSearchInput", "");
    setVal("appealsDistrictSelect", "ALL");
    setVal("appealsWingSelect", "ALL");
    setVal("appealsDateFrom", "");
    setVal("appealsDateTo", "");
  }

  function resetAdminFilters() {
    state.admin.search = "";
    state.admin.office = "ALL";
    state.admin.bps = "ALL";
    state.admin.status = "ALL";
    state.admin.gender = "ALL";
    state.admin.appointment = "ALL";
    state.admin.page = 1;

    setVal("adminSearchInput", "");
    setVal("adminOfficeSelect", "ALL");
    setVal("adminBpsSelect", "ALL");
    setVal("adminStatusSelect", "ALL");
    setVal("adminGenderSelect", "ALL");
    setVal("adminAppointmentSelect", "ALL");
  }

  function setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val;
  }

  // -------------------------------------------------------------
  // CHIPS RENDERING HELPER
  // -------------------------------------------------------------
  function renderActiveChips(containerId, chips, onRemove) {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (chips.length === 0) {
      container.innerHTML = `<span style="font-size: 0.72rem; color: #94A3B8; font-style: italic;">No active filters applied</span>`;
      return;
    }
    container.innerHTML = chips.map(c => `
      <span class="filter-chip">
        <strong>${c.label}:</strong> ${c.value}
        <button class="chip-remove" data-key="${c.key}" title="Clear this filter">&times;</button>
      </span>
    `).join("");

    container.querySelectorAll(".chip-remove").forEach(btn => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-key");
        onRemove(key);
      });
    });
  }

  // -------------------------------------------------------------
  // RENDER CONTROLLER (DELEGATES PER ACTIVE TAB)
  // -------------------------------------------------------------
  function renderActiveTab() {
    switch (state.activeTab) {
      case "tab-overview":
        break;
      case "tab-lsm":
        renderLsm();
        break;
      case "tab-sma":
        renderSma();
        break;
      case "tab-mm":
        renderMm();
        break;
      case "tab-map":
        renderMap();
        break;
      case "tab-financials":
        renderFinancials();
        break;
      case "tab-epa":
        renderEpa();
        break;
      case "tab-appeals":
        renderAppeals();
        break;
      case "tab-admin":
        renderAdmin();
        break;
    }
  }

  // -------------------------------------------------------------
  // LARGE SCALE MINING (LSM) RENDERER
  // -------------------------------------------------------------
  function renderLsm() {
    const thead = document.getElementById("lsmTableHead");
    const tbody = document.getElementById("lsmTableBody");
    const pageInfo = document.getElementById("lsmPageInfo");
    const counterBadge = document.getElementById("lsmCounterBadge");
    const explToggles = document.getElementById("lsmExplorationToggles");
    const lsmData = divisions.lsm || {};

    if (explToggles) {
      explToggles.style.display = state.lsm.category === "exploration" ? "flex" : "none";
    }

    let records = [];
    let headers = [];
    let totalUnfiltered = 0;

    if (state.lsm.category === "leases") {
      headers = ["Sr", "Company Name", "License #", "Area (Acres)", "Mineral", "District", "Field Office", "Grant Date", "Expiry Date", "Status"];
      records = lsmData.leases || [];
    } else if (state.lsm.category === "exploration") {
      if (state.lsm.explFilter === "valid") {
        headers = ["Sr", "Licensee Name", "License #", "Area (Acres)", "Mineral", "District", "Field Office", "From", "To", "Status"];
        records = lsmData.explorationValid || [];
      } else {
        headers = ["Sr", "Licensee Name", "License #", "Area (Acres)", "Mineral", "District", "Field Office", "Period", "Status", "Remarks"];
        records = lsmData.explorationCancelled || [];
      }
    } else if (state.lsm.category === "pending") {
      headers = ["Sr", "Applicant Name", "App #", "Date", "Area (Acres)", "Category", "District", "Mineral", "Location", "Status"];
      records = lsmData.pendingApplications || [];
    }

    totalUnfiltered = records.length;

    // Apply Smart Filters
    records = records.filter(r => {
      // District
      if (state.lsm.district !== "ALL" && r._normDistrict !== state.lsm.district) return false;

      // Mineral
      if (state.lsm.mineral !== "ALL") {
        const target = state.lsm.mineral.toLowerCase();
        const norm = (r._normMineral || "").toLowerCase();
        const raw = String(r.mineral || "").toLowerCase();
        if (norm !== target && !norm.includes(target) && !raw.includes(target)) return false;
      }

      // Field Office
      if (state.lsm.fieldOffice !== "ALL" && r._fieldOffice !== state.lsm.fieldOffice) return false;

      // Status
      if (state.lsm.status !== "ALL") {
        const curStatus = (r.status || "").toLowerCase();
        const target = state.lsm.status.toLowerCase();
        if (!curStatus.includes(target) && target !== "valid") return false;
        if (target === "valid" && !curStatus.includes("valid") && curStatus !== "") return false;
      }

      // Dates (Grant / Expiry / Period / App Date)
      const datesToTest = [r.grantDate, r.expiryDate, r.from, r.to, r.appDate];
      if (!testDateInRange(datesToTest, state.lsm.dateFrom, state.lsm.dateTo)) return false;

      // Keyword / Omnisearch
      const term = (state.lsm.search || state.globalSearch || "").toLowerCase();
      if (term) {
        const fullString = JSON.stringify(r).toLowerCase();
        if (!fullString.includes(term)) return false;
      }

      return true;
    });

    // Update Active Chips
    const activeChips = [];
    if (state.lsm.search) activeChips.push({ key: "search", label: "Search", value: `"${state.lsm.search}"` });
    if (state.lsm.district !== "ALL") activeChips.push({ key: "district", label: "District", value: state.lsm.district });
    if (state.lsm.mineral !== "ALL") activeChips.push({ key: "mineral", label: "Mineral", value: state.lsm.mineral });
    if (state.lsm.fieldOffice !== "ALL") activeChips.push({ key: "fieldOffice", label: "Office", value: state.lsm.fieldOffice });
    if (state.lsm.status !== "ALL") activeChips.push({ key: "status", label: "Status", value: state.lsm.status });
    if (state.lsm.dateFrom) activeChips.push({ key: "dateFrom", label: "From", value: state.lsm.dateFrom });
    if (state.lsm.dateTo) activeChips.push({ key: "dateTo", label: "To", value: state.lsm.dateTo });

    renderActiveChips("lsmChipsContainer", activeChips, key => {
      if (key === "search") { state.lsm.search = ""; setVal("lsmSearchInput", ""); }
      if (key === "district") { state.lsm.district = "ALL"; setVal("lsmDistrictFilter", "ALL"); }
      if (key === "mineral") { state.lsm.mineral = "ALL"; setVal("lsmMineralFilter", "ALL"); }
      if (key === "fieldOffice") { state.lsm.fieldOffice = "ALL"; setVal("lsmFieldOfficeFilter", "ALL"); }
      if (key === "status") { state.lsm.status = "ALL"; setVal("lsmStatusFilter", "ALL"); }
      if (key === "dateFrom") { state.lsm.dateFrom = ""; setVal("lsmDateFrom", ""); }
      if (key === "dateTo") { state.lsm.dateTo = ""; setVal("lsmDateTo", ""); }
      state.lsm.page = 1;
      renderLsm();
    });

    // Update Counter Badge
    if (counterBadge) {
      counterBadge.innerHTML = `<i class="fa-solid fa-layer-group"></i> Showing ${records.length} of ${totalUnfiltered} records`;
    }

    // Render Table Header
    thead.innerHTML = `<tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr>`;

    // Pagination
    const total = records.length;
    const start = (state.lsm.page - 1) * state.lsm.pageSize;
    const pageRecords = records.slice(start, start + state.lsm.pageSize);

    if (pageRecords.length === 0) {
      tbody.innerHTML = `<tr><td colspan="${headers.length}" style="text-align:center; padding: 2.5rem; color: #94A3B8;">No matching records found.</td></tr>`;
    } else {
      tbody.innerHTML = pageRecords.map(r => {
        if (state.lsm.category === "leases") {
          return `
            <tr>
              <td><strong>${r.srNo || '-'}</strong></td>
              <td style="font-weight: 600; color: #0F172A;">${r.company || '-'}</td>
              <td><code>${r.licenseNo || '-'}</code></td>
              <td>${formatNumber(r.area)} ac</td>
              <td><span class="badge-status-pill badge-process">${r.mineral || '-'}</span></td>
              <td>${r._normDistrict || '-'}</td>
              <td><small>${r._fieldOffice || '-'}</small></td>
              <td>${formatDateDisplay(r.grantDate)}</td>
              <td>${formatDateDisplay(r.expiryDate)}</td>
              <td><span class="badge-status-pill badge-granted">${r.status || 'Valid'}</span></td>
            </tr>
          `;
        } else if (state.lsm.category === "exploration") {
          if (state.lsm.explFilter === "valid") {
            return `
              <tr>
                <td><strong>${r.srNo || '-'}</strong></td>
                <td style="font-weight: 600; color: #0F172A;">${r.licensee || '-'}</td>
                <td><code>${r.licenseNo || '-'}</code></td>
                <td>${formatNumber(r.area)} ac</td>
                <td><span class="badge-status-pill badge-process">${r.mineral || '-'}</span></td>
                <td>${r._normDistrict || '-'}</td>
                <td><small>${r._fieldOffice || '-'}</small></td>
                <td>${formatDateDisplay(r.from)}</td>
                <td>${formatDateDisplay(r.to)}</td>
                <td><span class="badge-status-pill badge-granted">${r.status || 'Valid'}</span></td>
              </tr>
            `;
          } else {
            return `
              <tr>
                <td><strong>${r.srNo || '-'}</strong></td>
                <td style="font-weight: 600; color: #0F172A;">${r.licensee || '-'}</td>
                <td><code>${r.licenseNo || '-'}</code></td>
                <td>${r.areaRaw || formatNumber(r.area)}</td>
                <td>${r.mineral || '-'}</td>
                <td>${r._normDistrict || '-'}</td>
                <td><small>${r._fieldOffice || '-'}</small></td>
                <td>${r.from || '-'} to ${r.to || '-'}</td>
                <td><span class="badge-status-pill badge-cancelled">Cancelled</span></td>
                <td><small style="color: #64748B;">${r.remarks || '-'}</small></td>
              </tr>
            `;
          }
        } else {
          return `
            <tr>
              <td><strong>${r.srNo || '-'}</strong></td>
              <td style="font-weight: 600; color: #0F172A;">${r.applicant || '-'}</td>
              <td><code>${r.appNo || '-'}</code></td>
              <td>${formatDateDisplay(r.appDate)}</td>
              <td>${formatNumber(r.area)} ac</td>
              <td><strong>${r.category || '-'}</strong></td>
              <td>${r._normDistrict || '-'}</td>
              <td><span class="badge-status-pill badge-process">${r.mineral || '-'}</span></td>
              <td><small>${r.location || '-'}</small></td>
              <td><span class="badge-status-pill badge-vacant">${r.status || 'Under Process'}</span></td>
            </tr>
          `;
        }
      }).join("");
    }

    const end = Math.min(start + state.lsm.pageSize, total);
    if (pageInfo) pageInfo.textContent = total > 0 ? `Showing ${start + 1} to ${end} of ${total} records` : `0 records`;
    const btnPrev = document.getElementById("btnPrevLsm");
    const btnNext = document.getElementById("btnNextLsm");
    if (btnPrev) btnPrev.disabled = state.lsm.page <= 1;
    if (btnNext) btnNext.disabled = end >= total;
  }

  // LSM Category Sub-tabs
  document.querySelectorAll("[data-lsm-sub]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-lsm-sub]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.lsm.category = btn.getAttribute("data-lsm-sub");
      state.lsm.page = 1;
      renderLsm();
    });
  });

  // LSM Exploration Toggles
  document.querySelectorAll("[data-lsm-expl]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-lsm-expl]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.lsm.explFilter = btn.getAttribute("data-lsm-expl");
      state.lsm.page = 1;
      renderLsm();
    });
  });

  document.getElementById("btnPrevLsm")?.addEventListener("click", () => {
    if (state.lsm.page > 1) { state.lsm.page--; renderLsm(); }
  });
  document.getElementById("btnNextLsm")?.addEventListener("click", () => {
    state.lsm.page++; renderLsm();
  });

  // -------------------------------------------------------------
  // SMALL SCALE MINING (SMA) RENDERER
  // -------------------------------------------------------------
  function renderSma() {
    const thead = document.getElementById("smaTableHead");
    const tbody = document.getElementById("smaTableBody");
    const pageInfo = document.getElementById("smaPageInfo");
    const counterBadge = document.getElementById("smaCounterBadge");
    const modeToggles = document.getElementById("smaModeToggles");
    const smaData = divisions.sma || {};

    if (modeToggles) {
      modeToggles.style.display = state.sma.category === "leases" ? "flex" : "none";
    }

    let records = [];
    let headers = [];
    let totalUnfiltered = 0;

    if (state.sma.category === "leases") {
      if (state.sma.mode === "auction") {
        headers = ["Sr", "Block Code", "Block Name", "Mineral", "District", "Field Office", "Status", "Lessee Name", "Grant Date", "Expiry Date", "Operative Bid (PKR)"];
        records = (smaData.auctionConcessions || []).filter(c => c.type === "Mining Lease");
      } else {
        headers = ["Concession #", "Client / Lessee", "Mineral", "Type", "District", "Field Office", "Acreage", "Grant Date", "Expiry Date", "Status"];
        records = (smaData.applicationConcessions || []).filter(c => c.type === "Mining Lease");
      }
    } else if (state.sma.category === "prospecting") {
      headers = ["Concession #", "Title / Client", "Mode", "Mineral", "District", "Field Office", "Grant Date", "Expiry Date", "Status"];
      const auctionPL = (smaData.auctionConcessions || []).filter(c => c.type === "Prospecting License").map(c => ({
        code: c.block,
        title: c.lessee || c.blockName,
        mode: "Auction Mode",
        mineral: c.mineral,
        district: c.district,
        _normDistrict: c._normDistrict,
        _fieldOffice: c._fieldOffice,
        grantDate: c.grantDate,
        expiryDate: c.expiryDate,
        status: c.status
      }));
      const appPL = (smaData.applicationConcessions || []).filter(c => c.type === "Prospecting License").map(c => ({
        code: c.concessionNo,
        title: c.client,
        mode: "Application Mode",
        mineral: c.mineral,
        district: c.district,
        _normDistrict: c._normDistrict,
        _fieldOffice: c._fieldOffice,
        grantDate: c.grantDate,
        expiryDate: c.expiryDate,
        status: c.status
      }));
      records = [...auctionPL, ...appPL];
    } else if (state.sma.category === "matrix") {
      headers = ["District", "Limestone", "Gypsum", "Silica Sand", "Coal", "Fireclay", "Bentonite", "Iron Ore", "Bauxite", "Latrite", "Celestite", "Fuller Earth", "Total Titles"];
      records = smaData.districtMatrix || [];
    }

    totalUnfiltered = records.length;

    // Apply Smart Filters (non-matrix)
    if (state.sma.category !== "matrix") {
      records = records.filter(r => {
        if (state.sma.district !== "ALL" && r._normDistrict !== state.sma.district) return false;
        if (state.sma.mineral !== "ALL") {
          const target = state.sma.mineral.toLowerCase();
          const norm = (r._normMineral || "").toLowerCase();
          const raw = String(r.mineral || "").toLowerCase();
          if (norm !== target && !norm.includes(target) && !raw.includes(target)) return false;
        }
        if (state.sma.fieldOffice !== "ALL" && r._fieldOffice !== state.sma.fieldOffice) return false;
        if (state.sma.status !== "ALL" && !(r.status || "").toLowerCase().includes(state.sma.status.toLowerCase())) return false;

        const datesToTest = [r.grantDate, r.expiryDate];
        if (!testDateInRange(datesToTest, state.sma.dateFrom, state.sma.dateTo)) return false;

        const term = (state.sma.search || state.globalSearch || "").toLowerCase();
        if (term && !JSON.stringify(r).toLowerCase().includes(term)) return false;

        return true;
      });
    } else {
      // Matrix filtering by search or district
      const term = (state.sma.search || state.globalSearch || "").toLowerCase();
      if (term) {
        records = records.filter(r => JSON.stringify(r).toLowerCase().includes(term));
      }
      if (state.sma.district !== "ALL") {
        records = records.filter(r => (r.district || "").toLowerCase().includes(state.sma.district.toLowerCase()));
      }
    }

    // Active Chips
    const activeChips = [];
    if (state.sma.search) activeChips.push({ key: "search", label: "Search", value: `"${state.sma.search}"` });
    if (state.sma.district !== "ALL") activeChips.push({ key: "district", label: "District", value: state.sma.district });
    if (state.sma.mineral !== "ALL") activeChips.push({ key: "mineral", label: "Mineral", value: state.sma.mineral });
    if (state.sma.fieldOffice !== "ALL") activeChips.push({ key: "fieldOffice", label: "Office", value: state.sma.fieldOffice });
    if (state.sma.status !== "ALL") activeChips.push({ key: "status", label: "Status", value: state.sma.status });
    if (state.sma.dateFrom) activeChips.push({ key: "dateFrom", label: "From", value: state.sma.dateFrom });
    if (state.sma.dateTo) activeChips.push({ key: "dateTo", label: "To", value: state.sma.dateTo });

    renderActiveChips("smaChipsContainer", activeChips, key => {
      if (key === "search") { state.sma.search = ""; setVal("smaSearchInput", ""); }
      if (key === "district") { state.sma.district = "ALL"; setVal("smaDistrictFilter", "ALL"); }
      if (key === "mineral") { state.sma.mineral = "ALL"; setVal("smaMineralFilter", "ALL"); }
      if (key === "fieldOffice") { state.sma.fieldOffice = "ALL"; setVal("smaFieldOfficeFilter", "ALL"); }
      if (key === "status") { state.sma.status = "ALL"; setVal("smaStatusFilter", "ALL"); }
      if (key === "dateFrom") { state.sma.dateFrom = ""; setVal("smaDateFrom", ""); }
      if (key === "dateTo") { state.sma.dateTo = ""; setVal("smaDateTo", ""); }
      state.sma.page = 1;
      renderSma();
    });

    // Counter Badge
    if (counterBadge) {
      counterBadge.innerHTML = `<i class="fa-solid fa-layer-group"></i> Showing ${records.length} of ${totalUnfiltered} records`;
    }

    thead.innerHTML = `<tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr>`;

    const isMatrix = state.sma.category === "matrix";
    const total = records.length;
    const start = isMatrix ? 0 : (state.sma.page - 1) * state.sma.pageSize;
    const pageRecords = isMatrix ? records : records.slice(start, start + state.sma.pageSize);

    if (pageRecords.length === 0) {
      tbody.innerHTML = `<tr><td colspan="${headers.length}" style="text-align:center; padding: 2.5rem; color: #94A3B8;">No records found.</td></tr>`;
    } else {
      tbody.innerHTML = pageRecords.map(r => {
        if (state.sma.category === "leases") {
          if (state.sma.mode === "auction") {
            return `
              <tr>
                <td><strong>${r.srNo || '-'}</strong></td>
                <td><code>${r.block}</code></td>
                <td style="font-weight: 600; color: #0F172A;">${r.blockName}</td>
                <td><span class="badge-status-pill badge-process">${r.mineral}</span></td>
                <td>${r._normDistrict || r.district}</td>
                <td><small>${r._fieldOffice}</small></td>
                <td><span class="badge-status-pill ${r.status === 'Granted' ? 'badge-granted' : 'badge-vacant'}">${r.status}</span></td>
                <td>${r.lessee || '-'}</td>
                <td>${formatDateDisplay(r.grantDate)}</td>
                <td>${formatDateDisplay(r.expiryDate)}</td>
                <td style="font-weight: 700; color: #166534;">${formatPKR(r.operativeBid)}</td>
              </tr>
            `;
          } else {
            return `
              <tr>
                <td><code>${r.concessionNo}</code></td>
                <td style="font-weight: 600; color: #0F172A;">${r.client}</td>
                <td><span class="badge-status-pill badge-process">${r.mineral}</span></td>
                <td>${r.type}</td>
                <td>${r._normDistrict || r.district}</td>
                <td><small>${r._fieldOffice}</small></td>
                <td>${formatNumber(r.acreage)} ac</td>
                <td>${formatDateDisplay(r.grantDate)}</td>
                <td>${formatDateDisplay(r.expiryDate)}</td>
                <td><span class="badge-status-pill badge-granted">${r.status}</span></td>
              </tr>
            `;
          }
        } else if (state.sma.category === "prospecting") {
          return `
            <tr>
              <td><code>${r.code}</code></td>
              <td style="font-weight: 600; color: #0F172A;">${r.title}</td>
              <td><span class="nav-pill ${r.mode.includes('Auction') ? 'pill-sma' : 'pill-neutral'}">${r.mode}</span></td>
              <td><span class="badge-status-pill badge-process">${r.mineral}</span></td>
              <td>${r._normDistrict || r.district}</td>
              <td><small>${r._fieldOffice}</small></td>
              <td>${formatDateDisplay(r.grantDate)}</td>
              <td>${formatDateDisplay(r.expiryDate)}</td>
              <td><span class="badge-status-pill badge-granted">${r.status}</span></td>
            </tr>
          `;
        } else {
          return `
            <tr>
              <td style="font-weight: 700; color: #0F172A;">${r.district}</td>
              <td>${r.limestone || '-'}</td>
              <td>${r.gypsum || '-'}</td>
              <td>${r.silicaSand || '-'}</td>
              <td>${r.coal || '-'}</td>
              <td>${r.fireclay || '-'}</td>
              <td>${r.bentonite || '-'}</td>
              <td>${r.ironOre || '-'}</td>
              <td>${r.bauxite || '-'}</td>
              <td>${r.latrite || '-'}</td>
              <td>${r.celestite || '-'}</td>
              <td>${r.fullerEarth || '-'}</td>
              <td style="font-weight: 700; color: #1E3A8A;">${r.total}</td>
            </tr>
          `;
        }
      }).join("");
    }

    const end = Math.min(start + state.sma.pageSize, total);
    if (pageInfo) pageInfo.textContent = isMatrix ? `Total Districts: ${total}` : (total > 0 ? `Showing ${start + 1} to ${end} of ${total} records` : `0 records`);
    const btnPrev = document.getElementById("btnPrevSma");
    const btnNext = document.getElementById("btnNextSma");
    if (btnPrev) btnPrev.disabled = isMatrix || state.sma.page <= 1;
    if (btnNext) btnNext.disabled = isMatrix || end >= total;
  }

  // SMA Category Sub-tabs
  document.querySelectorAll("[data-sma-category]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-sma-category]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.sma.category = btn.getAttribute("data-sma-category");
      state.sma.page = 1;
      renderSma();
    });
  });

  // SMA Mode Toggles
  document.querySelectorAll("[data-sma-mode]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-sma-mode]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.sma.mode = btn.getAttribute("data-sma-mode");
      state.sma.page = 1;
      renderSma();
    });
  });

  document.getElementById("btnPrevSma")?.addEventListener("click", () => {
    if (state.sma.page > 1) { state.sma.page--; renderSma(); }
  });
  document.getElementById("btnNextSma")?.addEventListener("click", () => {
    state.sma.page++; renderSma();
  });

  // -------------------------------------------------------------
  // MINOR MINERALS (MM) RENDERER
  // -------------------------------------------------------------
  function renderMm() {
    const thead = document.getElementById("mmTableHead");
    const tbody = document.getElementById("mmTableBody");
    const pageInfo = document.getElementById("mmPageInfo");
    const counterBadge = document.getElementById("mmCounterBadge");
    const mmData = divisions.mm || {};

    let records = mmData.blocks || [];
    if (state.mm.subTab === "upcoming") {
      records = mmData.upcomingAuctions || [];
    } else if (state.mm.subTab === "vacant") {
      records = (mmData.blocks || []).filter(b => b.status === "Vacant");
    }

    const totalUnfiltered = records.length;

    // Apply Smart Filters
    records = records.filter(r => {
      if (state.mm.district !== "ALL" && r._normDistrict !== state.mm.district) return false;
      if (state.mm.mineral !== "ALL") {
        const target = state.mm.mineral.toLowerCase();
        const norm = (r._normMineral || "").toLowerCase();
        const raw = String(r.mineral || "").toLowerCase();
        if (norm !== target && !norm.includes(target) && !raw.includes(target)) return false;
      }
      if (state.mm.fieldOffice !== "ALL" && r._fieldOffice !== state.mm.fieldOffice) return false;
      if (state.mm.status !== "ALL" && !(r.status || "").toLowerCase().includes(state.mm.status.toLowerCase())) return false;

      const datesToTest = [r.firstAuctionDate, r.secondAuctionDate, r.thirdAuctionDate];
      if (!testDateInRange(datesToTest, state.mm.dateFrom, state.mm.dateTo)) return false;

      const term = (state.mm.search || state.globalSearch || "").toLowerCase();
      if (term && !JSON.stringify(r).toLowerCase().includes(term)) return false;

      return true;
    });

    // Active Chips
    const activeChips = [];
    if (state.mm.search) activeChips.push({ key: "search", label: "Search", value: `"${state.mm.search}"` });
    if (state.mm.district !== "ALL") activeChips.push({ key: "district", label: "District", value: state.mm.district });
    if (state.mm.mineral !== "ALL") activeChips.push({ key: "mineral", label: "Mineral", value: state.mm.mineral });
    if (state.mm.fieldOffice !== "ALL") activeChips.push({ key: "fieldOffice", label: "Office", value: state.mm.fieldOffice });
    if (state.mm.status !== "ALL") activeChips.push({ key: "status", label: "Status", value: state.mm.status });
    if (state.mm.dateFrom) activeChips.push({ key: "dateFrom", label: "Auction From", value: state.mm.dateFrom });
    if (state.mm.dateTo) activeChips.push({ key: "dateTo", label: "Auction To", value: state.mm.dateTo });

    renderActiveChips("mmChipsContainer", activeChips, key => {
      if (key === "search") { state.mm.search = ""; setVal("mmSearchInput", ""); }
      if (key === "district") { state.mm.district = "ALL"; setVal("mmDistrictFilter", "ALL"); }
      if (key === "mineral") { state.mm.mineral = "ALL"; setVal("mmMineralFilter", "ALL"); }
      if (key === "fieldOffice") { state.mm.fieldOffice = "ALL"; setVal("mmFieldOfficeFilter", "ALL"); }
      if (key === "status") { state.mm.status = "ALL"; setVal("mmStatusFilter", "ALL"); }
      if (key === "dateFrom") { state.mm.dateFrom = ""; setVal("mmDateFrom", ""); }
      if (key === "dateTo") { state.mm.dateTo = ""; setVal("mmDateTo", ""); }
      state.mm.page = 1;
      renderMm();
    });

    if (counterBadge) {
      counterBadge.innerHTML = `<i class="fa-solid fa-layer-group"></i> Showing ${records.length} of ${totalUnfiltered} records`;
    }

    const headers = ["ID", "District", "Field Office", "Mineral", "Block / Zone Title", "Area (Acres)", "Status", "Reserve Price (PKR)", "Auction Dates (1st / 2nd / 3rd)", "Remarks"];
    thead.innerHTML = `<tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr>`;

    const total = records.length;
    const start = (state.mm.page - 1) * state.mm.pageSize;
    const pageRecords = records.slice(start, start + state.mm.pageSize);

    if (pageRecords.length === 0) {
      tbody.innerHTML = `<tr><td colspan="${headers.length}" style="text-align:center; padding: 2.5rem; color: #94A3B8;">No records found.</td></tr>`;
    } else {
      tbody.innerHTML = pageRecords.map(r => `
        <tr>
          <td><strong>${r.id}</strong></td>
          <td style="font-weight: 600;">${r._normDistrict || r.district}</td>
          <td><small>${r._fieldOffice}</small></td>
          <td><span class="badge-status-pill badge-process">${r.mineral}</span></td>
          <td style="font-weight: 600; color: #0F172A;">${r.name || r.code}</td>
          <td>${formatNumber(r.area)} ac</td>
          <td><span class="badge-status-pill ${r.status === 'Granted' ? 'badge-granted' : 'badge-vacant'}">${r.status}</span></td>
          <td style="font-weight: 700; color: #15803D;">${formatPKR(r.reservePrice)}</td>
          <td><small>${r.firstAuctionDate ? `${r.firstAuctionDate} / ${r.secondAuctionDate || '-'}` : '-'}</small></td>
          <td><small style="color: #64748B;">${r.remarks ? r.remarks.slice(0, 60) + '...' : '-'}</small></td>
        </tr>
      `).join("");
    }

    const end = Math.min(start + state.mm.pageSize, total);
    if (pageInfo) pageInfo.textContent = total > 0 ? `Showing ${start + 1} to ${end} of ${total} records` : `0 records`;
    const btnPrev = document.getElementById("btnPrevMm");
    const btnNext = document.getElementById("btnNextMm");
    if (btnPrev) btnPrev.disabled = state.mm.page <= 1;
    if (btnNext) btnNext.disabled = end >= total;
  }

  // MM Controls
  document.querySelectorAll("[data-mm-sub]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-mm-sub]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.mm.subTab = btn.getAttribute("data-mm-sub");
      state.mm.page = 1;
      renderMm();
    });
  });

  document.getElementById("btnPrevMm")?.addEventListener("click", () => {
    if (state.mm.page > 1) { state.mm.page--; renderMm(); }
  });
  document.getElementById("btnNextMm")?.addEventListener("click", () => {
    state.mm.page++; renderMm();
  });

  // -------------------------------------------------------------
  // GIS MAP RENDERER (LEAFLET.JS)
  // -------------------------------------------------------------
  let mapInstance = null;
  let mapMarkers = [];

  function renderMap() {
    if (!window.L) return;
    const mapContainer = document.getElementById("punjabGisMap");
    if (!mapContainer) return;

    if (!mapInstance) {
      mapInstance = L.map("punjabGisMap", {
        center: [31.5204, 72.7],
        zoom: 7,
        zoomControl: true
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; Government of the Punjab | Mines & Minerals',
        maxZoom: 18
      }).addTo(mapInstance);
    }

    setTimeout(() => mapInstance.invalidateSize(), 200);

    mapMarkers.forEach(m => mapInstance.removeLayer(m));
    mapMarkers = [];

    const sites = db.geoMiningSites || [];
    const filterMineral = document.getElementById("mapMineralFilter")?.value || "ALL";

    const mineralColors = {
      "Rock Salt": "#E11D48",
      "Limestone": "#2563EB",
      "Coal": "#1E293B",
      "Silica Sand": "#F59E0B",
      "Gypsum": "#0D9488",
      "Ordinary Sand": "#10B981"
    };

    const legendEl = document.getElementById("mapLegendPills");
    if (legendEl && legendEl.children.length === 0) {
      legendEl.innerHTML = Object.entries(mineralColors).map(([min, col]) => `
        <span class="legend-pill" style="background: ${col}18; color: ${col};">
          <span class="legend-dot" style="background: ${col};"></span> ${min}
        </span>
      `).join("");
    }

    const filteredSites = filterMineral === "ALL" 
      ? sites 
      : sites.filter(s => (s.mineral || "").toLowerCase().includes(filterMineral.toLowerCase()));

    filteredSites.forEach(site => {
      const color = mineralColors[site.mineral] || "#6366F1";
      const marker = L.circleMarker([site.lat, site.lng], {
        radius: 8,
        fillColor: color,
        color: "#FFFFFF",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9
      });

      marker.bindPopup(`
        <div style="font-family: inherit; font-size: 0.85rem; min-width: 200px;">
          <div style="font-weight: 700; color: #0F172A; font-size: 0.95rem; margin-bottom: 0.25rem;">${site.title}</div>
          <div style="margin-bottom: 0.4rem;"><span class="badge-status-pill badge-process" style="background: ${color}20; color: ${color};">${site.mineral}</span></div>
          <div style="font-size: 0.78rem; color: #475569;">
            <div><strong>District:</strong> ${site.district} (${site.division})</div>
            <div><strong>Field Office:</strong> ${getFieldOffice(site.district)}</div>
            <div><strong>Coordinates:</strong> ${site.lat.toFixed(4)}, ${site.lng.toFixed(4)}</div>
            ${site.northing ? `<div><strong>UTM:</strong> N: ${site.northing} | E: ${site.easting}</div>` : ''}
            <div><strong>Deposit Details:</strong> ${site.details || 'Active mining lease'}</div>
          </div>
        </div>
      `);

      marker.addTo(mapInstance);
      mapMarkers.push(marker);
    });

    document.getElementById("btnResetMapView")?.addEventListener("click", () => {
      mapInstance.setView([31.5204, 72.7], 7);
    });
  }

  document.getElementById("mapMineralFilter")?.addEventListener("change", renderMap);

  // -------------------------------------------------------------
  // FINANCIALS RENDERER
  // -------------------------------------------------------------
  function renderFinancials() {
    const prodTbody = document.getElementById("producersTableBody");
    const fieldTbody = document.getElementById("fieldOfficesTableBody");

    const producers = db.majorProducers || [];
    const summary = db.fiveYearSummary || {};
    const fieldOffices = summary.fieldOffices || [];

    if (prodTbody) {
      prodTbody.innerHTML = producers.map(p => `
        <tr>
          <td style="font-weight: 700; color: #0F172A;">${p.name}</td>
          <td>${p.district}</td>
          <td>${p.mineral}</td>
          <td>${formatNumber(p.acreage)} ac</td>
          <td style="font-weight: 700; color: #15803D;">${formatPKR(p.royaltyPaidPKR)}</td>
          <td>${formatNumber(p.productionTons)} Tons</td>
          <td><span class="badge-status-pill badge-granted">${p.status}</span></td>
        </tr>
      `).join("");
    }

    if (fieldTbody) {
      fieldTbody.innerHTML = fieldOffices.map(f => `
        <tr>
          <td style="font-weight: 700; color: #0F172A;">${f.office}</td>
          <td>${formatNumber(f.productionTons)}</td>
          <td style="font-weight: 700; color: #166534;">${formatPKR(f.royaltyPKR)}</td>
          <td>${formatPKR(f.deadRentPKR)}</td>
          <td>${formatPKR(f.securityHeldPKR)}</td>
          <td style="font-weight: 800; color: #1E3A8A;">${formatPKR(f.grandTotalPaidPKR)}</td>
          <td><strong>${f.shareOfTotalProduction}%</strong></td>
        </tr>
      `).join("");
    }
  }

  // -------------------------------------------------------------
  // EPA CLEARANCES RENDERER
  // -------------------------------------------------------------
  function renderEpa() {
    const tbody = document.getElementById("epaTableBody");
    const pageInfo = document.getElementById("epaPageInfo");
    const counterBadge = document.getElementById("epaCounterBadge");
    let records = db.epaCases || [];
    const totalUnfiltered = records.length;

    // Apply Smart Filters
    records = records.filter(r => {
      if (state.epa.district !== "ALL" && r._normDistrict !== state.epa.district) return false;
      if (state.epa.mineral !== "ALL") {
        const target = state.epa.mineral.toLowerCase();
        const norm = (r._normMineral || "").toLowerCase();
        const raw = String(r.mineral || "").toLowerCase();
        if (norm !== target && !norm.includes(target) && !raw.includes(target)) return false;
      }
      if (state.epa.method !== "ALL" && !(r.method || "").toLowerCase().includes(state.epa.method.toLowerCase())) return false;
      if (state.epa.status !== "ALL") {
        const curStatus = (r.daecStatus || r.status || "Pending").toLowerCase();
        if (!curStatus.includes(state.epa.status.toLowerCase())) return false;
      }

      const term = (state.epa.search || state.globalSearch || "").toLowerCase();
      if (term && !JSON.stringify(r).toLowerCase().includes(term)) return false;

      return true;
    });

    // Active Chips
    const activeChips = [];
    if (state.epa.search) activeChips.push({ key: "search", label: "Search", value: `"${state.epa.search}"` });
    if (state.epa.district !== "ALL") activeChips.push({ key: "district", label: "District", value: state.epa.district });
    if (state.epa.mineral !== "ALL") activeChips.push({ key: "mineral", label: "Mineral", value: state.epa.mineral });
    if (state.epa.method !== "ALL") activeChips.push({ key: "method", label: "Method", value: state.epa.method });
    if (state.epa.status !== "ALL") activeChips.push({ key: "status", label: "DAEC Status", value: state.epa.status });

    renderActiveChips("epaChipsContainer", activeChips, key => {
      if (key === "search") { state.epa.search = ""; setVal("epaSearchInput", ""); }
      if (key === "district") { state.epa.district = "ALL"; setVal("epaDistrictSelect", "ALL"); }
      if (key === "mineral") { state.epa.mineral = "ALL"; setVal("epaMineralSelect", "ALL"); }
      if (key === "method") { state.epa.method = "ALL"; setVal("epaMethodSelect", "ALL"); }
      if (key === "status") { state.epa.status = "ALL"; setVal("epaStatusSelect", "ALL"); }
      state.epa.page = 1;
      renderEpa();
    });

    if (counterBadge) {
      counterBadge.innerHTML = `<i class="fa-solid fa-layer-group"></i> Showing ${records.length} of ${totalUnfiltered} records`;
    }

    const total = records.length;
    const start = (state.epa.page - 1) * state.epa.pageSize;
    const pageRecords = records.slice(start, start + state.epa.pageSize);

    if (pageRecords.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 2.5rem; color: #94A3B8;">No records found.</td></tr>`;
    } else {
      tbody.innerHTML = pageRecords.map(r => `
        <tr>
          <td><strong>${r.sr}</strong></td>
          <td style="font-weight: 600;">${r._normDistrict || r.district} <small style="color: #64748B;">(${r._fieldOffice})</small></td>
          <td style="font-weight: 600; color: #0F172A;">${r.title || r.leaseTitle || '-'}</td>
          <td><span class="badge-status-pill badge-process">${r.mineral || '-'}</span></td>
          <td><small>${r.method || 'e-Biz'}</small></td>
          <td>${formatDateDisplay(r.dateApplied || r.appDate)}</td>
          <td><small style="color: #64748B;">${r.delayReason || r.reasonForDelay || '-'}</small></td>
          <td><span class="badge-status-pill badge-vacant">${r.daecStatus || 'Pending Meeting'}</span></td>
        </tr>
      `).join("");
    }

    const end = Math.min(start + state.epa.pageSize, total);
    if (pageInfo) pageInfo.textContent = total > 0 ? `Showing ${start + 1} to ${end} of ${total} records` : `0 records`;
    const btnPrev = document.getElementById("btnPrevEpa");
    const btnNext = document.getElementById("btnNextEpa");
    if (btnPrev) btnPrev.disabled = state.epa.page <= 1;
    if (btnNext) btnNext.disabled = end >= total;
  }

  document.getElementById("btnPrevEpa")?.addEventListener("click", () => {
    if (state.epa.page > 1) { state.epa.page--; renderEpa(); }
  });
  document.getElementById("btnNextEpa")?.addEventListener("click", () => {
    state.epa.page++; renderEpa();
  });

  // -------------------------------------------------------------
  // APPEALS DOCKET RENDERER
  // -------------------------------------------------------------
  function renderAppeals() {
    const tbody = document.getElementById("appealsTableBody");
    const pageInfo = document.getElementById("appealsPageInfo");
    const counterBadge = document.getElementById("appealsCounterBadge");
    let records = db.appealsCases || [];
    const totalUnfiltered = records.length;

    // Apply Smart Filters
    records = records.filter(r => {
      if (state.appeals.district !== "ALL" && r._normDistrict !== state.appeals.district) return false;
      if (state.appeals.wing !== "ALL" && !(r.respondentWing || "").toLowerCase().includes(state.appeals.wing.toLowerCase())) return false;

      const datesToTest = [r.dateOfAppeal, r.year];
      if (!testDateInRange(datesToTest, state.appeals.dateFrom, state.appeals.dateTo)) return false;

      const term = (state.appeals.search || state.globalSearch || "").toLowerCase();
      if (term && !JSON.stringify(r).toLowerCase().includes(term)) return false;

      return true;
    });

    // Active Chips
    const activeChips = [];
    if (state.appeals.search) activeChips.push({ key: "search", label: "Search", value: `"${state.appeals.search}"` });
    if (state.appeals.district !== "ALL") activeChips.push({ key: "district", label: "District", value: state.appeals.district });
    if (state.appeals.wing !== "ALL") activeChips.push({ key: "wing", label: "Wing", value: state.appeals.wing });
    if (state.appeals.dateFrom) activeChips.push({ key: "dateFrom", label: "Hearing From", value: state.appeals.dateFrom });
    if (state.appeals.dateTo) activeChips.push({ key: "dateTo", label: "Hearing To", value: state.appeals.dateTo });

    renderActiveChips("appealsChipsContainer", activeChips, key => {
      if (key === "search") { state.appeals.search = ""; setVal("appealsSearchInput", ""); }
      if (key === "district") { state.appeals.district = "ALL"; setVal("appealsDistrictSelect", "ALL"); }
      if (key === "wing") { state.appeals.wing = "ALL"; setVal("appealsWingSelect", "ALL"); }
      if (key === "dateFrom") { state.appeals.dateFrom = ""; setVal("appealsDateFrom", ""); }
      if (key === "dateTo") { state.appeals.dateTo = ""; setVal("appealsDateTo", ""); }
      state.appeals.page = 1;
      renderAppeals();
    });

    if (counterBadge) {
      counterBadge.innerHTML = `<i class="fa-solid fa-layer-group"></i> Showing ${records.length} of ${totalUnfiltered} records`;
    }

    const total = records.length;
    const start = (state.appeals.page - 1) * state.appeals.pageSize;
    const pageRecords = records.slice(start, start + state.appeals.pageSize);

    if (pageRecords.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 2.5rem; color: #94A3B8;">No records found.</td></tr>`;
    } else {
      tbody.innerHTML = pageRecords.map(r => `
        <tr>
          <td><code>${r.appealNo}</code></td>
          <td style="font-weight: 600;">${r._normDistrict || '-'}</td>
          <td style="font-weight: 600; color: #0F172A;">${r.appellant || '-'}</td>
          <td><span class="badge-status-pill badge-process">${r.respondentWing || 'Directorate'}</span></td>
          <td><small>${r.subject || '-'}</small></td>
          <td>${r._displayDate || '-'}</td>
          <td><span class="badge-status-pill badge-vacant">${r.status || 'Pending'}</span></td>
        </tr>
      `).join("");
    }

    const end = Math.min(start + state.appeals.pageSize, total);
    if (pageInfo) pageInfo.textContent = total > 0 ? `Showing ${start + 1} to ${end} of ${total} records` : `0 records`;
    const btnPrev = document.getElementById("btnPrevAppeals");
    const btnNext = document.getElementById("btnNextAppeals");
    if (btnPrev) btnPrev.disabled = state.appeals.page <= 1;
    if (btnNext) btnNext.disabled = end >= total;
  }

  document.getElementById("btnPrevAppeals")?.addEventListener("click", () => {
    if (state.appeals.page > 1) { state.appeals.page--; renderAppeals(); }
  });
  document.getElementById("btnNextAppeals")?.addEventListener("click", () => {
    state.appeals.page++; renderAppeals();
  });

  // -------------------------------------------------------------
  // ADMINISTRATION DIVISION & HUMAN CAPITAL CONTROLLER
  // -------------------------------------------------------------
  function renderAdmin() {
    if (state.admin.subTab === "roster") {
      renderAdminRoster();
    } else if (state.admin.subTab === "cadre") {
      renderAdminCadre();
    } else if (state.admin.subTab === "offices") {
      renderAdminOffices();
    }
  }

  function renderAdminRoster() {
    const tbody = document.getElementById("adminRosterTableBody");
    const pageInfo = document.getElementById("adminPageInfo");
    const counterBadge = document.getElementById("adminCounterBadge");
    if (!tbody) return;

    const allRoster = (window.DGM_DATA && window.DGM_DATA.admin && window.DGM_DATA.admin.roster) || [];
    const totalUnfiltered = allRoster.length;

    // Filter Logic
    const term = (state.admin.search || state.globalSearch || "").toLowerCase();
    const filtered = allRoster.filter(r => {
      // Office / Cost Centre
      if (state.admin.office !== "ALL") {
        const off = (r.office || "").toLowerCase();
        const cc = (r.costCentre || "").toLowerCase();
        const filterOff = state.admin.office.toLowerCase();
        if (!off.includes(filterOff) && !cc.includes(filterOff)) return false;
      }

      // BPS Grade
      if (state.admin.bps !== "ALL") {
        const bpsTarget = state.admin.bps.replace(/^BS-?0?/i, "");
        const recordBps = String(r.bps || "");
        if (recordBps !== bpsTarget && "BS-" + recordBps.padStart(2, "0") !== state.admin.bps) return false;
      }

      // Status
      if (state.admin.status !== "ALL") {
        if ((r.status || "").toLowerCase().trim() !== state.admin.status.toLowerCase().trim()) return false;
      }

      // Gender
      if (state.admin.gender !== "ALL") {
        if ((r.gender || "").toLowerCase().trim() !== state.admin.gender.toLowerCase().trim()) return false;
      }

      // Appointment Type
      if (state.admin.appointment !== "ALL") {
        if (!(r.appointmentType || "").toLowerCase().includes(state.admin.appointment.toLowerCase())) return false;
      }

      // Keyword Search
      if (term) {
        const haystack = [
          r.name,
          r.designation,
          r.personalNo,
          r.cnic,
          r.domicile,
          r.contact,
          r.branch,
          r.division,
          r.remarks,
          r.fatherName,
          r.costCentre,
          r.office
        ].filter(Boolean).join(" ").toLowerCase();
        if (!haystack.includes(term)) return false;
      }

      return true;
    });

    // Active Chips
    const activeChips = [];
    if (state.admin.search) activeChips.push({ key: "search", label: "Search", value: `"${state.admin.search}"` });
    if (state.admin.office !== "ALL") activeChips.push({ key: "office", label: "Office", value: state.admin.office });
    if (state.admin.bps !== "ALL") activeChips.push({ key: "bps", label: "BPS", value: state.admin.bps });
    if (state.admin.status !== "ALL") activeChips.push({ key: "status", label: "Status", value: state.admin.status });
    if (state.admin.gender !== "ALL") activeChips.push({ key: "gender", label: "Gender", value: state.admin.gender });
    if (state.admin.appointment !== "ALL") activeChips.push({ key: "appointment", label: "Appointment", value: state.admin.appointment });

    renderActiveChips("adminChipsContainer", activeChips, key => {
      if (key === "search") { state.admin.search = ""; setVal("adminSearchInput", ""); }
      if (key === "office") { state.admin.office = "ALL"; setVal("adminOfficeSelect", "ALL"); }
      if (key === "bps") { state.admin.bps = "ALL"; setVal("adminBpsSelect", "ALL"); }
      if (key === "status") { state.admin.status = "ALL"; setVal("adminStatusSelect", "ALL"); }
      if (key === "gender") { state.admin.gender = "ALL"; setVal("adminGenderSelect", "ALL"); }
      if (key === "appointment") { state.admin.appointment = "ALL"; setVal("adminAppointmentSelect", "ALL"); }
      state.admin.page = 1;
      renderAdminRoster();
    });

    if (counterBadge) {
      counterBadge.innerHTML = `<i class="fa-solid fa-users"></i> Showing ${filtered.length} of ${totalUnfiltered} personnel`;
    }

    const total = filtered.length;
    const start = (state.admin.page - 1) * state.admin.pageSize;
    const pageRecords = filtered.slice(start, start + state.admin.pageSize);

    if (pageRecords.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding: 2.5rem; color: #94A3B8;">No staff records matching your filter criteria.</td></tr>`;
    } else {
      tbody.innerHTML = pageRecords.map(r => {
        const isVacant = (r.status || "").toLowerCase().trim() === "vacant";
        const bpsTag = `<span class="badge-status-pill" style="background: ${r.bps >= 16 ? 'rgba(37,99,235,0.1)' : 'rgba(100,116,139,0.1)'}; color: ${r.bps >= 16 ? '#2563EB' : '#475569'}; font-weight: 700;">BS-${String(r.bps).padStart(2, '0')}</span>`;
        const statusBadge = isVacant
          ? `<span class="badge-status-pill badge-vacant">Vacant</span>`
          : `<span class="badge-status-pill badge-granted">Filled</span>`;

        const nameCell = isVacant
          ? `<span style="color: #DC2626; font-weight: 600; font-size: 0.82rem;">[Vacant Post]</span><br><span style="font-weight: 600; color: #1E293B;">${r.designation}</span>`
          : `<span style="font-weight: 700; color: #0F172A; font-size: 0.85rem;">${r.name || 'Incumbent'}</span><br><span style="font-size: 0.76rem; color: #475569;">${r.designation}</span>`;

        return `
          <tr>
            <td style="color: #64748B; font-weight: 600;">${r.sr}</td>
            <td>${nameCell}</td>
            <td>${bpsTag}</td>
            <td><strong>${r.office}</strong><br><small style="color: #64748B;">${r.costCentre}</small></td>
            <td>${isVacant ? '-' : `<code>${r.personalNo || '-'}</code><br><small style="color: #64748B;">${r.cnic || '-'}</small>`}</td>
            <td>${isVacant ? '-' : `${r.domicile || '-'}${r.contact ? `<br><small style="color: #2563EB;">${r.contact}</small>` : ''}`}</td>
            <td>${isVacant ? '-' : `<span class="badge-status-pill badge-process" style="font-size: 0.7rem;">${r.appointmentType || 'Regular'}</span>${r.quota ? `<br><small style="color: #64748B;">${r.quota}</small>` : ''}`}</td>
            <td>${r.branch ? `<strong>${r.branch}</strong>` : ''}${r.division ? `<br><small style="color: #64748B;">${r.division}</small>` : (r.branch ? '' : '-')}</td>
            <td>${statusBadge}${r.remarks ? `<br><small style="color: #475569; font-size: 0.72rem; line-height: 1.2; display: inline-block; max-width: 170px;">${r.remarks}</small>` : ''}</td>
          </tr>
        `;
      }).join("");
    }

    const end = Math.min(start + state.admin.pageSize, total);
    if (pageInfo) pageInfo.textContent = total > 0 ? `Showing ${start + 1} to ${end} of ${total} records` : `0 records`;
    const btnPrev = document.getElementById("btnPrevAdmin");
    const btnNext = document.getElementById("btnNextAdmin");
    if (btnPrev) btnPrev.disabled = state.admin.page <= 1;
    if (btnNext) btnNext.disabled = end >= total;
  }

  function renderAdminCadre() {
    const tbody = document.getElementById("adminCadreTableBody");
    if (!tbody) return;
    const cadreList = (window.DGM_DATA && window.DGM_DATA.admin && window.DGM_DATA.admin.cadre) || [];

    tbody.innerHTML = cadreList.map(c => {
      const fillPct = c.s > 0 ? Math.round((c.f / c.s) * 100) : 0;
      let pctBg = "rgba(5, 150, 105, 0.15)";
      let pctColor = "#059669";
      if (fillPct < 50) { pctBg = "rgba(220, 38, 38, 0.15)"; pctColor = "#DC2626"; }
      else if (fillPct < 80) { pctBg = "rgba(217, 119, 6, 0.15)"; pctColor = "#D97706"; }

      const bpsBadge = `<span class="badge-status-pill" style="background: ${c.bps >= 16 ? 'rgba(37,99,235,0.1)' : 'rgba(100,116,139,0.1)'}; color: ${c.bps >= 16 ? '#2563EB' : '#475569'}; font-weight: 700;">BS-${String(c.bps).padStart(2, '0')}</span>`;

      return `
        <tr>
          <td style="color: #64748B; font-weight: 600;">${c.sn}</td>
          <td><code>${c.code}</code></td>
          <td style="font-weight: 600; color: #0F172A;">${c.post}</td>
          <td style="text-align: center;">${bpsBadge}</td>
          <td style="text-align: center; font-weight: 700; color: #0F172A;">${c.s}</td>
          <td style="text-align: center; font-weight: 700; color: #059669;">${c.f}</td>
          <td style="text-align: center; font-weight: 700; color: ${c.v > 0 ? '#DC2626' : '#94A3B8'};">${c.v}</td>
          <td style="text-align: center;"><small>${c.hq.s} / <span style="color:#059669; font-weight:600;">${c.hq.f}</span> / <span style="color:${c.hq.v > 0 ? '#DC2626' : '#94A3B8'};">${c.hq.v}</span></small></td>
          <td style="text-align: center;"><small>${c.field.s} / <span style="color:#059669; font-weight:600;">${c.field.f}</span> / <span style="color:${c.field.v > 0 ? '#DC2626' : '#94A3B8'};">${c.field.v}</span></small></td>
          <td style="text-align: center;">
            <span class="badge-status-pill" style="background: ${pctBg}; color: ${pctColor}; font-weight: 700;">${fillPct}%</span>
          </td>
        </tr>
      `;
    }).join("");
  }

  function renderAdminOffices() {
    const tbody = document.getElementById("adminOfficesTableBody");
    if (!tbody) return;
    const officesList = (window.DGM_DATA && window.DGM_DATA.admin && window.DGM_DATA.admin.offices) || [];

    tbody.innerHTML = officesList.map((o, idx) => {
      const fillPct = o.total.s > 0 ? Math.round((o.total.f / o.total.s) * 100) : 0;
      let pctBg = "rgba(5, 150, 105, 0.15)";
      let pctColor = "#059669";
      if (fillPct < 60) { pctBg = "rgba(220, 38, 38, 0.15)"; pctColor = "#DC2626"; }
      else if (fillPct < 80) { pctBg = "rgba(217, 119, 6, 0.15)"; pctColor = "#D97706"; }

      const typeBadge = `<span class="badge-status-pill ${o.type === 'HQ' ? 'badge-granted' : 'badge-process'}">${o.type}</span>`;

      return `
        <tr>
          <td style="color: #64748B; font-weight: 600;">${idx + 1}</td>
          <td style="font-weight: 700; color: #0F172A;">${o.office}</td>
          <td><code>${o.fundCentre}</code></td>
          <td>${typeBadge}</td>
          <td style="text-align: center;"><small>${o.gazetted.s} / <span style="color:#059669; font-weight:600;">${o.gazetted.f}</span> / <span style="color:${o.gazetted.v > 0 ? '#DC2626' : '#94A3B8'};">${o.gazetted.v}</span></small></td>
          <td style="text-align: center;"><small>${o.nonGazetted.s} / <span style="color:#059669; font-weight:600;">${o.nonGazetted.f}</span> / <span style="color:${o.nonGazetted.v > 0 ? '#DC2626' : '#94A3B8'};">${o.nonGazetted.v}</span></small></td>
          <td style="text-align: center; font-weight: 700; color: #0F172A;">${o.total.s}</td>
          <td style="text-align: center; font-weight: 700; color: #059669;">${o.total.f}</td>
          <td style="text-align: center; font-weight: 700; color: ${o.total.v > 0 ? '#DC2626' : '#94A3B8'};">${o.total.v}</td>
          <td style="text-align: center;">
            <span class="badge-status-pill" style="background: ${pctBg}; color: ${pctColor}; font-weight: 700;">${fillPct}%</span>
          </td>
        </tr>
      `;
    }).join("");
  }

  // -------------------------------------------------------------
  // GLOBAL CROSS-SEARCH CONTROLLER
  // -------------------------------------------------------------
  function initGlobalSearch() {
    const input = document.getElementById("globalOmniSearch");
    if (!input) return;

    let debounceTimer;
    input.addEventListener("input", e => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        state.globalSearch = e.target.value.trim();
        renderActiveTab();
      }, 250);
    });
  }

  // -------------------------------------------------------------
  // EXPORT ACTIVE DATA CONTROLLER (SHEETJS)
  // -------------------------------------------------------------
  function initExport() {
    const exportBtn = document.getElementById("btnExportActiveTable");
    if (!exportBtn || !window.XLSX) return;

    exportBtn.addEventListener("click", () => {
      let exportData = [];
      let filename = `DGMM_${state.activeTab}_Export.xlsx`;

      switch (state.activeTab) {
        case "tab-lsm":
          if (state.lsm.category === "leases") exportData = divisions.lsm.leases;
          else if (state.lsm.category === "exploration") {
            exportData = state.lsm.explFilter === "valid" ? divisions.lsm.explorationValid : divisions.lsm.explorationCancelled;
          } else {
            exportData = divisions.lsm.pendingApplications;
          }
          filename = `DGMM_LSM_${state.lsm.category}.xlsx`;
          break;
        case "tab-sma":
          if (state.sma.category === "leases") {
            exportData = state.sma.mode === "auction" ? divisions.sma.auctionConcessions : divisions.sma.applicationConcessions;
          } else if (state.sma.category === "prospecting") {
            exportData = [...divisions.sma.auctionConcessions.filter(c => c.type === "Prospecting License"), ...divisions.sma.applicationConcessions.filter(c => c.type === "Prospecting License")];
          } else {
            exportData = divisions.sma.districtMatrix;
          }
          filename = `DGMM_SMA_${state.sma.category}.xlsx`;
          break;
        case "tab-mm":
          exportData = state.mm.subTab === "upcoming" ? divisions.mm.upcomingAuctions : divisions.mm.blocks;
          filename = `DGMM_Minor_Minerals_${state.mm.subTab}.xlsx`;
          break;
        case "tab-financials":
          exportData = db.majorProducers;
          filename = "DGMM_Cement_Producers_Royalty_Audit.xlsx";
          break;
        case "tab-epa":
          exportData = db.epaCases;
          filename = "DGMM_EPA_Clearances.xlsx";
          break;
        case "tab-appeals":
          exportData = db.appealsCases;
          filename = "DGMM_Appeals_Docket.xlsx";
          break;
        case "tab-admin":
          if (state.admin.subTab === "roster") {
            exportData = (window.DGM_DATA && window.DGM_DATA.admin && window.DGM_DATA.admin.roster) || [];
            filename = "DGMM_Staff_Nominal_Roll.xlsx";
          } else if (state.admin.subTab === "cadre") {
            exportData = (window.DGM_DATA && window.DGM_DATA.admin && window.DGM_DATA.admin.cadre) || [];
            filename = "DGMM_Sanctioned_Cadre_Matrix.xlsx";
          } else {
            exportData = (window.DGM_DATA && window.DGM_DATA.admin && window.DGM_DATA.admin.offices) || [];
            filename = "DGMM_Regional_Offices_Staffing.xlsx";
          }
          break;
        default:
          exportData = divisions.mm.blocks;
          filename = "DGMM_Executive_Export.xlsx";
      }

      if (!exportData || exportData.length === 0) {
        alert("No data available to export in the current view.");
        return;
      }

      // Sanitize fields (remove internal underscore helper properties for pristine export)
      const cleanData = exportData.map(row => {
        const copy = { ...row };
        Object.keys(copy).forEach(k => {
          if (k.startsWith("_")) delete copy[k];
        });
        return copy;
      });

      const ws = XLSX.utils.json_to_sheet(cleanData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "DGM&M Official");
      XLSX.writeFile(wb, filename);
    });
  }

  // -------------------------------------------------------------
  // HELPERS
  // -------------------------------------------------------------
  function formatNumber(num) {
    if (num === null || num === undefined || isNaN(num)) return "0";
    return Number(num).toLocaleString("en-PK", { maximumFractionDigits: 2 });
  }

  function formatPKR(val) {
    if (val === null || val === undefined || isNaN(val) || Number(val) === 0) return "Rs 0";
    const num = Number(val);
    if (num >= 1e9) {
      return `Rs ${(num / 1e9).toFixed(2)}B`;
    } else if (num >= 1e6) {
      return `Rs ${(num / 1e6).toFixed(2)}M`;
    }
    return `Rs ${num.toLocaleString("en-PK")}`;
  }
});
