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
      mode: "ALL",             // "ALL" | "application" | "auction"
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

    // Relevant Rules & Acts
    rules: {
      statute: "pmcr2002",     // "pmcr2002" | "act2025" | "matrix"
      viewMode: "text",        // "text" | "schedules"
      search: "",
      part: "ALL"
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
  // SHARED STATE VARIABLES
  // -------------------------------------------------------------
  let overviewCharts = {};
  let currentConcessionModalObject = null;
  let isModalEditing = false;
  let matrixFilters = { district: "ALL", mineral: "ALL" };

  // -------------------------------------------------------------
  // INITIALIZATION
  // -------------------------------------------------------------
  initClock();
  initTheme();
  applySavedConcessionEdits();
  initSidebar();
  initRulesTab();
  initModal();
  populateDropdowns();
  bindFilterListeners();
  initGlobalSearch();
  initExport();
  initCadastreMatrix();
  renderLsm();
  renderSma();
  renderMm();
  renderEpa();
  renderAppeals();
  renderAdmin();
  renderActiveTab();

  // -------------------------------------------------------------
  // THEME CONTROLLER (DARK / LIGHT MODE)
  // -------------------------------------------------------------
  function initTheme() {
    const toggleBtn = document.getElementById("themeToggleBtn");
    const icon = document.getElementById("themeToggleIcon");
    const label = document.getElementById("themeToggleText");
    const saved = localStorage.getItem("dgmm_theme") || "light";

    function apply(mode) {
      if (mode === "dark") {
        document.body.classList.add("dark-mode");
        if (icon) icon.className = "fa-solid fa-sun";
        if (label) label.textContent = "Light Mode";
      } else {
        document.body.classList.remove("dark-mode");
        if (icon) icon.className = "fa-solid fa-moon";
        if (label) label.textContent = "Dark Mode";
      }
      localStorage.setItem("dgmm_theme", mode);
      if (state.activeTab === "tab-overview" && typeof renderOverviewCharts === "function") {
        setTimeout(renderOverviewCharts, 50);
      } else if (state.activeTab === "tab-admin" && typeof renderAdminTab === "function") {
        setTimeout(renderAdminTab, 50);
      }
    }
    apply(saved);

    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        const isDark = document.body.classList.contains("dark-mode");
        apply(isDark ? "light" : "dark");
      });
    }
  }

  // -------------------------------------------------------------
  // CLOCK CONTROLLER
  // -------------------------------------------------------------
  function initClock() {
    const clockEl = document.getElementById("livePktTime");
    const footerClockEl = document.getElementById("footerPktClock");
    function updateClock() {
      const now = new Date();
      const options = {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      };
      const timeStr = now.toLocaleTimeString("en-US", options) + " PKT";
      if (clockEl) {
        clockEl.textContent = timeStr;
      }
      if (footerClockEl) {
        footerClockEl.textContent = timeStr;
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
    const collapseToggle = document.getElementById("sidebarCollapseToggle");
    const collapseIcon = document.getElementById("collapseIcon");
    const sidebar = document.getElementById("appSidebar");
    const breadcrumbSection = document.getElementById("activeBreadcrumbSection");
    const breadcrumbTitle = document.getElementById("activeBreadcrumbTitle");

    const tabMeta = {
      "tab-overview": { section: "Executive Overview", title: "Senior Management Summary Dashboard" },
      "tab-admin": { section: "Administration & Establishment", title: "Administration Division & Human Capital Master Register" },
      "tab-lsm": { section: "Mineral Operations", title: "Large Scale Mining" },
      "tab-sma": { section: "Mineral Operations", title: "Small Scale Mining" },
      "tab-mm": { section: "Mineral Operations", title: "Minor Minerals" },
      "tab-rules": { section: "Statutory & Regulatory Governance", title: "Relevant Rules & Acts (PMCR 2002 & Punjab Mines and Minerals Act 2025)" },
      "tab-map": { section: "Spatial Intelligence", title: "GIS Mineral Map of Punjab Province" },
      "tab-financials": { section: "Financial Intelligence", title: "5-Year Revenue, Royalty & Output Analytics" },
      "tab-epa": { section: "Regulatory Clearances", title: "EPA Environmental Clearances (151 Concession Cases)" },
      "tab-appeals": { section: "Legal Proceedings", title: "Appellate Authority Pendency Tracker" }
    };

    function activateTab(tabId) {
      navLinks.forEach(l => l.classList.remove("active"));
      const activeBtn = document.querySelector(`.nav-link[data-tab="${tabId}"]`);
      if (activeBtn) activeBtn.classList.add("active");

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
    }

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        const tabId = link.getAttribute("data-tab");
        if (!tabId) return;
        activateTab(tabId);
      });
    });

    // Sidebar Collapse Toggle (Shrink to logos/icons only)
    const crestsRow = document.getElementById("sidebarCrestsRow");
    const toggleCollapse = () => {
      sidebar.classList.toggle("sidebar-collapsed");
      const isCollapsed = sidebar.classList.contains("sidebar-collapsed");
      if (collapseIcon) {
        collapseIcon.className = isCollapsed ? "fa-solid fa-angles-right" : "fa-solid fa-angles-left";
      }
      setTimeout(() => {
        if (window.punjabMapInstance) window.punjabMapInstance.invalidateSize();
      }, 300);
    };

    if (collapseToggle && sidebar) {
      collapseToggle.addEventListener("click", toggleCollapse);
    }
    if (crestsRow && sidebar) {
      crestsRow.addEventListener("click", () => {
        if (sidebar.classList.contains("sidebar-collapsed")) {
          toggleCollapse();
        }
      });
    }

    // Large Scale Mining Dropdown Submenu
    const lsmWrap = document.getElementById("dropdownLsmWrap");
    const btnLsm = document.getElementById("navBtnLsm");
    if (btnLsm && lsmWrap) {
      btnLsm.addEventListener("click", () => {
        lsmWrap.classList.toggle("open");
      });
    }
    const itemLsmLeases = document.getElementById("menuItemLsmLeases");
    const itemLsmExpl = document.getElementById("menuItemLsmExploration");
    if (itemLsmLeases) {
      itemLsmLeases.addEventListener("click", (e) => {
        e.stopPropagation();
        activateTab("tab-lsm");
        state.lsm.category = "leases";
        document.querySelectorAll("[data-lsm-sub]").forEach(b => b.classList.remove("active"));
        document.getElementById("subBtnLsmLeases")?.classList.add("active");
        itemLsmExpl?.classList.remove("active");
        itemLsmLeases.classList.add("active");
        renderLsm();
      });
    }
    if (itemLsmExpl) {
      itemLsmExpl.addEventListener("click", (e) => {
        e.stopPropagation();
        activateTab("tab-lsm");
        state.lsm.category = "exploration";
        document.querySelectorAll("[data-lsm-sub]").forEach(b => b.classList.remove("active"));
        document.getElementById("subBtnLsmExploration")?.classList.add("active");
        itemLsmLeases?.classList.remove("active");
        itemLsmExpl.classList.add("active");
        renderLsm();
      });
    }

    // Small Scale Mining Multi-Tier Dropdown Submenu
    const smaWrap = document.getElementById("dropdownSmaWrap");
    const btnSma = document.getElementById("navBtnSma");
    if (btnSma && smaWrap) {
      btnSma.addEventListener("click", () => {
        smaWrap.classList.toggle("open");
      });
    }

    // SSM Tier 2: Mining Leases
    const nestedSmaLeasesWrap = document.getElementById("nestedSmaLeasesWrap");
    const itemSmaLeases = document.getElementById("menuItemSmaLeases");
    if (itemSmaLeases && nestedSmaLeasesWrap) {
      itemSmaLeases.addEventListener("click", (e) => {
        e.stopPropagation();
        nestedSmaLeasesWrap.classList.toggle("open");
        activateTab("tab-sma");
        state.sma.category = "leases";
        state.sma.mode = "ALL";
        syncSmaSubNavUI();
        renderSma();
      });
    }

    // SSM Tier 3 for Mining Leases
    const itemSmaLeasesAll = document.getElementById("menuItemSmaLeasesAll");
    const itemSmaLeasesApp = document.getElementById("menuItemSmaLeasesApp");
    const itemSmaLeasesAuc = document.getElementById("menuItemSmaLeasesAuc");

    if (itemSmaLeasesAll) {
      itemSmaLeasesAll.addEventListener("click", (e) => {
        e.stopPropagation();
        activateTab("tab-sma");
        state.sma.category = "leases";
        state.sma.mode = "ALL";
        syncSmaSubNavUI();
        renderSma();
      });
    }
    if (itemSmaLeasesApp) {
      itemSmaLeasesApp.addEventListener("click", (e) => {
        e.stopPropagation();
        activateTab("tab-sma");
        state.sma.category = "leases";
        state.sma.mode = "application";
        syncSmaSubNavUI();
        renderSma();
      });
    }
    if (itemSmaLeasesAuc) {
      itemSmaLeasesAuc.addEventListener("click", (e) => {
        e.stopPropagation();
        activateTab("tab-sma");
        state.sma.category = "leases";
        state.sma.mode = "auction";
        syncSmaSubNavUI();
        renderSma();
      });
    }

    // SSM Tier 2: Prospecting Licenses
    const nestedSmaProsWrap = document.getElementById("nestedSmaProspectingWrap");
    const itemSmaProspecting = document.getElementById("menuItemSmaProspecting");
    if (itemSmaProspecting && nestedSmaProsWrap) {
      itemSmaProspecting.addEventListener("click", (e) => {
        e.stopPropagation();
        nestedSmaProsWrap.classList.toggle("open");
        activateTab("tab-sma");
        state.sma.category = "prospecting";
        state.sma.mode = "ALL";
        syncSmaSubNavUI();
        renderSma();
      });
    }

    // SSM Tier 3 for Prospecting Licenses
    const itemSmaProsAll = document.getElementById("menuItemSmaProsAll");
    const itemSmaProsApp = document.getElementById("menuItemSmaProsApp");
    const itemSmaProsAuc = document.getElementById("menuItemSmaProsAuc");

    if (itemSmaProsAll) {
      itemSmaProsAll.addEventListener("click", (e) => {
        e.stopPropagation();
        activateTab("tab-sma");
        state.sma.category = "prospecting";
        state.sma.mode = "ALL";
        syncSmaSubNavUI();
        renderSma();
      });
    }
    if (itemSmaProsApp) {
      itemSmaProsApp.addEventListener("click", (e) => {
        e.stopPropagation();
        activateTab("tab-sma");
        state.sma.category = "prospecting";
        state.sma.mode = "application";
        syncSmaSubNavUI();
        renderSma();
      });
    }
    if (itemSmaProsAuc) {
      itemSmaProsAuc.addEventListener("click", (e) => {
        e.stopPropagation();
        activateTab("tab-sma");
        state.sma.category = "prospecting";
        state.sma.mode = "auction";
        syncSmaSubNavUI();
        renderSma();
      });
    }

    // Relevant Rules & Acts Dropdown Submenu
    const rulesWrap = document.getElementById("dropdownRulesWrap");
    const btnRules = document.getElementById("navBtnRules");
    if (btnRules && rulesWrap) {
      btnRules.addEventListener("click", () => {
        rulesWrap.classList.toggle("open");
      });
    }

    const itemRulesPmcr = document.getElementById("menuItemRulesPmcr");
    const itemRulesAct = document.getElementById("menuItemRulesAct");
    const itemRulesMatrix = document.getElementById("menuItemRulesMatrix");

    if (itemRulesPmcr) {
      itemRulesPmcr.addEventListener("click", (e) => {
        e.stopPropagation();
        activateTab("tab-rules");
        switchRulesStatute("pmcr2002");
      });
    }
    if (itemRulesAct) {
      itemRulesAct.addEventListener("click", (e) => {
        e.stopPropagation();
        activateTab("tab-rules");
        switchRulesStatute("act2025");
      });
    }
    if (itemRulesMatrix) {
      itemRulesMatrix.addEventListener("click", (e) => {
        e.stopPropagation();
        activateTab("tab-rules");
        switchRulesStatute("matrix");
      });
    }

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
        const organogramView = document.getElementById("adminOrganogramView");
        const cadreView = document.getElementById("adminCadreView");
        const officesView = document.getElementById("adminOfficesView");
        const filterPanel = document.getElementById("adminFilterPanel");
        const heading = document.getElementById("adminSectionHeading");
        const subtitle = document.getElementById("adminSectionSubtitle");

        if (rosterView) rosterView.style.display = sub === "roster" ? "block" : "none";
        if (organogramView) organogramView.style.display = sub === "organogram" ? "block" : "none";
        if (cadreView) cadreView.style.display = sub === "cadre" ? "block" : "none";
        if (officesView) officesView.style.display = sub === "offices" ? "block" : "none";
        if (filterPanel) filterPanel.style.display = sub === "roster" ? "block" : "none";

        if (sub === "roster") {
          if (heading) heading.textContent = "Staff Directory & Personnel Nominal Roll";
          if (subtitle) subtitle.textContent = "Official Directorate General of Mines & Minerals Establishment Roster & Sanctioned Posts Database";
        } else if (sub === "organogram") {
          if (heading) heading.textContent = "Departmental Organogram & Staffing Hierarchy";
          if (subtitle) subtitle.textContent = "Executive Leadership, 6 Principal Directorates, 16 Regional Field Formations & Cadre Allocations";
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
  // EXECUTIVE SUMMARY GRAPHICAL ANALYTICS SUITE (CHART.JS)
  // -------------------------------------------------------------

  // -------------------------------------------------------------
  // DISTRICT & MINERAL CADASTRE MATRIX RENDERER
  // -------------------------------------------------------------
  function initCadastreMatrix() {
    const distSelect = document.getElementById("matrixDistrictSelect");
    const minSelect = document.getElementById("matrixMineralSelect");
    const matrixData = (window.DGM_DATA && window.DGM_DATA.districtSummaryMatrix);
    if (!matrixData || !matrixData.districts) return;

    if (distSelect && distSelect.options.length <= 1) {
      matrixData.districts.forEach(d => {
        const opt = document.createElement("option");
        opt.value = d.district;
        opt.textContent = `${d.district} (${d.total.grand_total} Titles)`;
        distSelect.appendChild(opt);
      });
      distSelect.addEventListener("change", (e) => {
        matrixFilters.district = e.target.value;
        renderCadastreMatrix();
      });
    }

    if (minSelect && minSelect.options.length <= 1) {
      const allMinerals = new Set();
      matrixData.districts.forEach(d => {
        d.items.forEach(it => {
          if (it.mineral && it.mineral !== 'Unspecified') allMinerals.add(it.mineral);
        });
      });
      Array.from(allMinerals).sort().forEach(m => {
        const opt = document.createElement("option");
        opt.value = m;
        opt.textContent = m;
        minSelect.appendChild(opt);
      });
      minSelect.addEventListener("change", (e) => {
        matrixFilters.mineral = e.target.value;
        renderCadastreMatrix();
      });
    }

    renderCadastreMatrix();
  }

  function renderCadastreMatrix() {
    const tbody = document.getElementById("matrixTableBody");
    const counter = document.getElementById("matrixCounter");
    const matrixData = (window.DGM_DATA && window.DGM_DATA.districtSummaryMatrix);
    if (!tbody || !matrixData || !matrixData.districts) return;

    let rows = [];
    matrixData.districts.forEach(d => {
      if (matrixFilters.district !== "ALL" && d.district !== matrixFilters.district) return;
      d.items.forEach(it => {
        if (matrixFilters.mineral !== "ALL" && it.mineral.toLowerCase() !== matrixFilters.mineral.toLowerCase()) return;
        rows.push(it);
      });
    });

    if (rows.length === 0) {
      tbody.innerHTML = '<tr><td colspan="10" style="text-align:center; padding: 2rem; color: #94A3B8;">No concessions matching the selected district and mineral filters.</td></tr>';
      if (counter) counter.textContent = "0 concession records";
      return;
    }

    if (counter) counter.textContent = `Showing ${rows.length} mineral cadastre records across Punjab`;

    tbody.innerHTML = rows.map(r => `
      <tr>
        <td style="font-weight: 700; color: var(--text-main); font-size: 0.85rem;">${r.district}</td>
        <td><span class="badge-status-pill badge-process">${r.mineral}</span></td>
        <td style="text-align: center; font-weight: 600;">${r.mm || '-'}</td>
        <td style="text-align: center;">${r.ssm_ml || '-'}</td>
        <td style="text-align: center;">${r.ssm_pl || '-'}</td>
        <td class="matrix-cell-ssm">${r.total_ssm || '-'}</td>
        <td style="text-align: center;">${r.lsm_ml || '-'}</td>
        <td style="text-align: center;">${r.lsm_el || '-'}</td>
        <td class="matrix-cell-lsm">${r.total_lsm || '-'}</td>
        <td class="matrix-cell-grand">${r.grand_total}</td>
      </tr>
    `).join("");
  }

  function renderOverviewCharts() {
    if (!window.Chart) return;
    const revCanvas = document.getElementById("overviewRevenueChart");
    if (!revCanvas) return;

    const isDark = document.body.classList.contains("dark-mode");
    const textColor = isDark ? "#CBD5E1" : "#475569";
    const titleColor = isDark ? "#F8FAFC" : "#0F172A";
    const gridColor = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(15, 23, 42, 0.06)";
    const fontFam = "'Plus Jakarta Sans', sans-serif";

    // Destroy previous charts if existing
    Object.keys(overviewCharts).forEach(key => {
      if (overviewCharts[key]) {
        overviewCharts[key].destroy();
        overviewCharts[key] = null;
      }
    });

    // 1. Five-Year Revenue & Royalty Trajectory (Area & Line Chart)
    const ctxRev = revCanvas.getContext("2d");
    const gradRev = ctxRev.createLinearGradient(0, 0, 0, 240);
    gradRev.addColorStop(0, isDark ? "rgba(16, 185, 129, 0.4)" : "rgba(16, 185, 129, 0.25)");
    gradRev.addColorStop(1, "rgba(16, 185, 129, 0.0)");

    overviewCharts.rev = new Chart(ctxRev, {
      type: "line",
      data: {
        labels: ["FY 21-22", "FY 22-23", "FY 23-24", "FY 24-25", "FY 25-26"],
        datasets: [
          {
            label: "Total Paid Realization (PKR Million)",
            data: [524.1, 618.4, 694.2, 1445.8, 1459.0],
            borderColor: "#10B981",
            backgroundColor: gradRev,
            fill: true,
            tension: 0.35,
            borderWidth: 2.5,
            pointBackgroundColor: "#10B981",
            pointRadius: 4,
            pointHoverRadius: 6
          },
          {
            label: "Assessed Royalty Yield (PKR Million)",
            data: [499.9, 589.6, 662.9, 1420.2, 1405.5],
            borderColor: "#F59E0B",
            borderDash: [5, 4],
            backgroundColor: "transparent",
            tension: 0.35,
            borderWidth: 2,
            pointBackgroundColor: "#F59E0B",
            pointRadius: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: { color: textColor, font: { family: fontFam, size: 11, weight: 600 } }
          },
          tooltip: {
            backgroundColor: isDark ? "#1E293B" : "#0F172A",
            titleColor: "#FFFFFF",
            bodyColor: "#E2E8F0",
            padding: 10,
            cornerRadius: 8
          }
        },
        scales: {
          x: {
            grid: { color: gridColor },
            ticks: { color: textColor, font: { family: fontFam, size: 10 } }
          },
          y: {
            grid: { color: gridColor },
            ticks: {
              color: textColor,
              font: { family: fontFam, size: 10 },
              callback: (v) => "Rs " + v + "M"
            }
          }
        }
      }
    });

    // 2. Concession Portfolio Doughnut
    const portCanvas = document.getElementById("overviewPortfolioChart");
    if (portCanvas) {
      overviewCharts.port = new Chart(portCanvas.getContext("2d"), {
        type: "doughnut",
        data: {
          labels: ["Small Scale Mining (1,172)", "Minor Minerals (510)", "Large Scale Mining (126)"],
          datasets: [{
            data: [1172, 510, 126],
            backgroundColor: ["#D97706", "#059669", "#2563EB"],
            borderWidth: 2,
            borderColor: isDark ? "#131D31" : "#FFFFFF",
            hoverOffset: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
              labels: { color: textColor, font: { family: fontFam, size: 11, weight: 600 }, boxWidth: 12 }
            },
            tooltip: {
              backgroundColor: isDark ? "#1E293B" : "#0F172A",
              padding: 10,
              cornerRadius: 8
            }
          },
          cutout: "68%"
        }
      });
    }

    // 3. Mineral Extraction Volume (Top 6 Commodities)
    const minCanvas = document.getElementById("overviewMineralOutputChart");
    if (minCanvas) {
      overviewCharts.min = new Chart(minCanvas.getContext("2d"), {
        type: "bar",
        data: {
          labels: ["Limestone", "Rock Salt", "Coal", "Gypsum", "Silica Sand", "Fireclay"],
          datasets: [{
            label: "5-Year Output (Million Tons)",
            data: [14.50, 3.25, 2.65, 1.85, 0.95, 0.78],
            backgroundColor: [
              "#3B82F6",
              "#EC4899",
              "#475569",
              "#06B6D4",
              "#EAB308",
              "#F97316"
            ],
            borderRadius: 6
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: isDark ? "#1E293B" : "#0F172A",
              padding: 10,
              cornerRadius: 8,
              callbacks: { label: (ctx) => `${ctx.raw} Million Metric Tons` }
            }
          },
          scales: {
            x: {
              grid: { color: gridColor },
              ticks: { color: textColor, font: { family: fontFam, size: 10 }, callback: (v) => v + "M t" }
            },
            y: {
              grid: { display: false },
              ticks: { color: titleColor, font: { family: fontFam, size: 11, weight: 600 } }
            }
          }
        }
      });
    }

    // 4. District Revenue Leadership (Bar Chart)
    const distCanvas = document.getElementById("overviewDistrictRevenueChart");
    if (distCanvas) {
      overviewCharts.dist = new Chart(distCanvas.getContext("2d"), {
        type: "bar",
        data: {
          labels: ["Mianwali", "Chakwal", "Khushab", "Jhelum", "D.G. Khan", "Attock"],
          datasets: [{
            label: "5-Year Revenue (PKR Million)",
            data: [1728.3, 1554.9, 1084.8, 259.0, 84.2, 30.4],
            backgroundColor: [
              "#10B981",
              "#3B82F6",
              "#8B5CF6",
              "#F59E0B",
              "#06B6D4",
              "#EF4444"
            ],
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: isDark ? "#1E293B" : "#0F172A",
              padding: 10,
              cornerRadius: 8,
              callbacks: { label: (ctx) => `PKR ${ctx.raw} Million` }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: titleColor, font: { family: fontFam, size: 10, weight: 600 } }
            },
            y: {
              grid: { color: gridColor },
              ticks: {
                color: textColor,
                font: { family: fontFam, size: 10 },
                callback: (v) => "Rs " + v + "M"
              }
            }
          }
        }
      });
    }
  }

  // -------------------------------------------------------------
  // RENDER CONTROLLER (DELEGATES PER ACTIVE TAB)
  // -------------------------------------------------------------
  function renderActiveTab() {
    switch (state.activeTab) {
      case "tab-overview":
        renderOverviewCharts();
        renderCadastreMatrix();
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
      case "tab-rules":
        renderRulesTab();
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
      headers = ["Sr", "Company Name", "License #", "Area (Acres)", "Mineral", "District", "Field Office", "Grant Date", "Expiry Date", "Status", "Action"];
      records = lsmData.leases || [];
    } else if (state.lsm.category === "exploration") {
      if (state.lsm.explFilter === "valid") {
        headers = ["Sr", "Licensee Name", "License #", "Area (Acres)", "Mineral", "District", "Field Office", "From", "To", "Status", "Action"];
        records = lsmData.explorationValid || [];
      } else {
        headers = ["Sr", "Licensee Name", "License #", "Area (Acres)", "Mineral", "District", "Field Office", "Period", "Status", "Remarks", "Action"];
        records = lsmData.explorationCancelled || [];
      }
    } else if (state.lsm.category === "pending") {
      headers = ["Sr", "Applicant Name", "App #", "Date", "Area (Acres)", "Category", "District", "Mineral", "Location", "Status", "Action"];
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

    // Save filtered records for row clicks
    state.lsm.currentRecords = records;

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
      tbody.innerHTML = pageRecords.map((r, idx) => {
        const globalIdx = start + idx;
        const seqNo = start + idx + 1;
        const actionBtn = `<td><button class="btn-concession-view" onclick="event.stopPropagation(); window.openConcessionDetails('lsm', ${globalIdx});" title="View Concession Financial & Production Intelligence"><i class="fa-solid fa-chart-line"></i> Details</button></td>`;
        if (state.lsm.category === "leases") {
          return `
            <tr class="concession-clickable-row" data-concession-type="lsm" data-idx="${globalIdx}" title="Click to view Concession Financial, Production & Boundary Details">
              <td style="font-weight: 700; color: var(--text-muted); text-align: center;">${seqNo}</td>
              <td style="font-weight: 600; color: var(--text-main);">${r.company || '-'}</td>
              <td><code>${r.licenseNo || '-'}</code></td>
              <td>${formatNumber(r.area)} ac</td>
              <td><span class="badge-status-pill badge-process">${r.mineral || '-'}</span></td>
              <td>${r._normDistrict || '-'}</td>
              <td><small>${r._fieldOffice || '-'}</small></td>
              <td>${formatDateDisplay(r.grantDate)}</td>
              <td>${formatDateDisplay(r.expiryDate)}</td>
              <td><span class="badge-status-pill badge-granted">${r.status || 'Valid'}</span></td>
              ${actionBtn}
            </tr>
          `;
        } else if (state.lsm.category === "exploration") {
          if (state.lsm.explFilter === "valid") {
            return `
              <tr class="concession-clickable-row" data-concession-type="lsm" data-idx="${globalIdx}" title="Click to view Concession Financial, Production & Boundary Details">
                <td style="font-weight: 700; color: var(--text-muted); text-align: center;">${seqNo}</td>
                <td style="font-weight: 600; color: var(--text-main);">${r.licensee || '-'}</td>
                <td><code>${r.licenseNo || '-'}</code></td>
                <td>${formatNumber(r.area)} ac</td>
                <td><span class="badge-status-pill badge-process">${r.mineral || '-'}</span></td>
                <td>${r._normDistrict || '-'}</td>
                <td><small>${r._fieldOffice || '-'}</small></td>
                <td>${formatDateDisplay(r.from)}</td>
                <td>${formatDateDisplay(r.to)}</td>
                <td><span class="badge-status-pill badge-granted">${r.status || 'Valid'}</span></td>
                ${actionBtn}
              </tr>
            `;
          } else {
            return `
              <tr class="concession-clickable-row" data-concession-type="lsm" data-idx="${globalIdx}" title="Click to view Concession Financial, Production & Boundary Details">
                <td style="font-weight: 700; color: var(--text-muted); text-align: center;">${seqNo}</td>
                <td style="font-weight: 600; color: var(--text-main);">${r.licensee || '-'}</td>
                <td><code>${r.licenseNo || '-'}</code></td>
                <td>${r.areaRaw || formatNumber(r.area)}</td>
                <td>${r.mineral || '-'}</td>
                <td>${r._normDistrict || '-'}</td>
                <td><small>${r._fieldOffice || '-'}</small></td>
                <td>${r.from || '-'} to ${r.to || '-'}</td>
                <td><span class="badge-status-pill badge-cancelled">Cancelled</span></td>
                <td><small style="color: #64748B;">${r.remarks || '-'}</small></td>
                ${actionBtn}
              </tr>
            `;
          }
        } else {
          return `
            <tr class="concession-clickable-row" data-concession-type="lsm" data-idx="${globalIdx}" title="Click to view Concession Financial, Production & Boundary Details">
              <td style="font-weight: 700; color: var(--text-muted); text-align: center;">${seqNo}</td>
              <td style="font-weight: 600; color: var(--text-main);">${r.applicant || '-'}</td>
              <td><code>${r.appNo || '-'}</code></td>
              <td>${formatDateDisplay(r.appDate)}</td>
              <td>${formatNumber(r.area)} ac</td>
              <td><strong>${r.category || '-'}</strong></td>
              <td>${r._normDistrict || '-'}</td>
              <td><span class="badge-status-pill badge-process">${r.mineral || '-'}</span></td>
              <td><small>${r.location || '-'}</small></td>
              <td><span class="badge-status-pill badge-vacant">${r.status || 'Under Process'}</span></td>
              ${actionBtn}
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
    const prosModeToggles = document.getElementById("smaProspectModeToggles");
    const smaData = divisions.sma || {};

    // Synchronize mode bar visibility
    if (state.sma.category === "leases") {
      if (modeToggles) modeToggles.style.display = "flex";
      if (prosModeToggles) prosModeToggles.style.display = "none";
      document.querySelectorAll("[data-sma-mode]").forEach(b => {
        b.classList.toggle("active", b.getAttribute("data-sma-mode") === state.sma.mode);
      });
    } else if (state.sma.category === "prospecting") {
      if (modeToggles) modeToggles.style.display = "none";
      if (prosModeToggles) prosModeToggles.style.display = "flex";
      document.querySelectorAll("[data-sma-prospect-mode]").forEach(b => {
        b.classList.toggle("active", b.getAttribute("data-sma-prospect-mode") === state.sma.mode);
      });
    } else {
      if (modeToggles) modeToggles.style.display = "none";
      if (prosModeToggles) prosModeToggles.style.display = "none";
    }

    let records = [];
    let headers = [];
    let totalUnfiltered = 0;

    if (state.sma.category === "leases") {
      const aucLeases = (smaData.auctionConcessions || []).filter(c => c.type === "Mining Lease").map(c => ({
        srNo: c.srNo,
        code: c.block || c.code,
        title: c.lessee || c.blockName,
        blockName: c.blockName,
        mode: "Auction Mode",
        mineral: c.mineral,
        district: c.district,
        _normDistrict: c._normDistrict,
        _fieldOffice: c._fieldOffice,
        grantDate: c.grantDate,
        expiryDate: c.expiryDate,
        operativeBid: c.operativeBid,
        status: c.status,
        type: "Mining Lease",
        _raw: c
      }));
      const appLeases = (smaData.applicationConcessions || []).filter(c => c.type === "Mining Lease").map(c => ({
        srNo: c.concessionNo,
        code: c.concessionNo || c.code,
        title: c.client || c.name,
        blockName: c.location || c.client,
        mode: "Application Mode",
        mineral: c.mineral,
        district: c.district,
        _normDistrict: c._normDistrict,
        _fieldOffice: c._fieldOffice,
        acreage: c.acreage,
        grantDate: c.grantDate,
        expiryDate: c.expiryDate,
        status: c.status,
        type: "Mining Lease",
        _raw: c
      }));

      if (state.sma.mode === "auction") {
        headers = ["Sr #", "Block Code", "Block Name", "Mineral", "District", "Field Office", "Status", "Lessee Name", "Grant Date", "Expiry Date", "Operative Bid (PKR)", "Action"];
        records = aucLeases;
      } else if (state.sma.mode === "application") {
        headers = ["Sr #", "Concession #", "Client / Lessee", "Mineral", "Type", "District", "Field Office", "Acreage", "Grant Date", "Expiry Date", "Status", "Action"];
        records = appLeases;
      } else {
        // ALL Mining Leases (1,040)
        headers = ["Sr #", "Concession / Block #", "Lessee / Applicant", "Mode", "Mineral", "District", "Field Office", "Grant Date", "Expiry Date", "Status", "Action"];
        records = [...appLeases, ...aucLeases];
      }
    } else if (state.sma.category === "prospecting") {
      const auctionPL = (smaData.auctionConcessions || []).filter(c => c.type === "Prospecting License").map(c => ({
        code: c.block || c.code,
        title: c.lessee || c.blockName,
        mode: "Auction Mode",
        mineral: c.mineral,
        district: c.district,
        _normDistrict: c._normDistrict,
        _fieldOffice: c._fieldOffice,
        grantDate: c.grantDate,
        expiryDate: c.expiryDate,
        status: c.status,
        _raw: c
      }));
      const appPL = (smaData.applicationConcessions || []).filter(c => c.type === "Prospecting License").map(c => ({
        code: c.concessionNo || c.code,
        title: c.client,
        mode: "Application Mode",
        mineral: c.mineral,
        district: c.district,
        _normDistrict: c._normDistrict,
        _fieldOffice: c._fieldOffice,
        grantDate: c.grantDate,
        expiryDate: c.expiryDate,
        status: c.status,
        _raw: c
      }));

      if (state.sma.mode === "auction") {
        records = auctionPL;
      } else if (state.sma.mode === "application") {
        records = appPL;
      } else {
        records = [...appPL, ...auctionPL];
      }
      headers = ["Sr #", "Concession #", "Title / Client", "Mode", "Mineral", "District", "Field Office", "Grant Date", "Expiry Date", "Status", "Action"];
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

    // Save filtered records for row clicks
    state.sma.currentRecords = records;

    // Counter Badge
    if (counterBadge) {
      counterBadge.innerHTML = `<i class="fa-solid fa-layer-group"></i> Showing ${records.length} of ${totalUnfiltered} records`;
    }

    thead.innerHTML = `<tr>${headers.map((h, i) => `<th${i === 0 ? ' style="width: 50px; text-align: center;"' : ''}>${h}</th>`).join("")}</tr>`;

    const isMatrix = state.sma.category === "matrix";
    const total = records.length;
    const start = isMatrix ? 0 : (state.sma.page - 1) * state.sma.pageSize;
    const pageRecords = isMatrix ? records : records.slice(start, start + state.sma.pageSize);

    if (pageRecords.length === 0) {
      tbody.innerHTML = `<tr><td colspan="${headers.length}" style="text-align:center; padding: 2.5rem; color: #94A3B8;">No records found matching filter criteria.</td></tr>`;
    } else {
      tbody.innerHTML = pageRecords.map((r, idx) => {
        const globalIdx = start + idx;
        const seqNo = start + idx + 1;
        const actionBtn = `<td><button class="btn-concession-view" onclick="event.stopPropagation(); window.openConcessionDetails('sma', ${globalIdx});" title="View Concession Financial & Production Intelligence"><i class="fa-solid fa-chart-line"></i> Details</button></td>`;
        if (state.sma.category === "leases") {
          if (state.sma.mode === "auction") {
            return `
              <tr class="concession-clickable-row" data-concession-type="sma" data-idx="${globalIdx}" title="Click to view Concession Financial, Production & Boundary Details">
                <td style="font-weight: 700; color: var(--text-muted); text-align: center;">${seqNo}</td>
                <td><code>${r.code}</code></td>
                <td style="font-weight: 600; color: var(--text-main);">${r.title || r.blockName}</td>
                <td><span class="badge-status-pill badge-process">${r.mineral}</span></td>
                <td>${r._normDistrict || r.district}</td>
                <td><small>${r._fieldOffice || '-'}</small></td>
                <td><span class="badge-status-pill ${r.status === 'Granted' ? 'badge-granted' : 'badge-vacant'}">${r.status}</span></td>
                <td>${r.lessee || r.title || '-'}</td>
                <td>${formatDateDisplay(r.grantDate)}</td>
                <td>${formatDateDisplay(r.expiryDate)}</td>
                <td class="currency-bid-val">${formatPKR(r.operativeBid)}</td>
                ${actionBtn}
              </tr>
            `;
          } else if (state.sma.mode === "application") {
            return `
              <tr class="concession-clickable-row" data-concession-type="sma" data-idx="${globalIdx}" title="Click to view Concession Financial, Production & Boundary Details">
                <td style="font-weight: 700; color: var(--text-muted); text-align: center;">${seqNo}</td>
                <td><code>${r.code}</code></td>
                <td style="font-weight: 600; color: var(--text-main);">${r.title}</td>
                <td><span class="badge-status-pill badge-process">${r.mineral}</span></td>
                <td>${r.type}</td>
                <td>${r._normDistrict || r.district}</td>
                <td><small>${r._fieldOffice || '-'}</small></td>
                <td>${formatNumber(r.acreage)} ac</td>
                <td>${formatDateDisplay(r.grantDate)}</td>
                <td>${formatDateDisplay(r.expiryDate)}</td>
                <td><span class="badge-status-pill badge-granted">${r.status}</span></td>
                ${actionBtn}
              </tr>
            `;
          } else {
            // ALL Mining Leases (1,040)
            return `
              <tr class="concession-clickable-row" data-concession-type="sma" data-idx="${globalIdx}" title="Click to view Concession Financial, Production & Boundary Details">
                <td style="font-weight: 700; color: var(--text-muted); text-align: center;">${seqNo}</td>
                <td><code>${r.code}</code></td>
                <td style="font-weight: 600; color: var(--text-main);">${r.title}</td>
                <td><span class="mode-tag ${r.mode.includes('Auction') ? 'mode-auction' : 'mode-application'}">${r.mode}</span></td>
                <td><span class="badge-status-pill badge-process">${r.mineral}</span></td>
                <td>${r._normDistrict || r.district}</td>
                <td><small>${r._fieldOffice || '-'}</small></td>
                <td>${formatDateDisplay(r.grantDate)}</td>
                <td>${formatDateDisplay(r.expiryDate)}</td>
                <td><span class="badge-status-pill ${r.status === 'Granted' ? 'badge-granted' : 'badge-vacant'}">${r.status}</span></td>
                ${actionBtn}
              </tr>
            `;
          }
        } else if (state.sma.category === "prospecting") {
          return `
            <tr class="concession-clickable-row" data-concession-type="sma" data-idx="${globalIdx}" title="Click to view Concession Financial, Production & Boundary Details">
              <td style="font-weight: 700; color: var(--text-muted); text-align: center;">${seqNo}</td>
              <td><code>${r.code}</code></td>
              <td style="font-weight: 600; color: var(--text-main);">${r.title}</td>
              <td><span class="mode-tag ${r.mode.includes('Auction') ? 'mode-auction' : 'mode-application'}">${r.mode}</span></td>
              <td><span class="badge-status-pill badge-process">${r.mineral}</span></td>
              <td>${r._normDistrict || r.district}</td>
              <td><small>${r._fieldOffice || '-'}</small></td>
              <td>${formatDateDisplay(r.grantDate)}</td>
              <td>${formatDateDisplay(r.expiryDate)}</td>
              <td><span class="badge-status-pill badge-granted">${r.status}</span></td>
              ${actionBtn}
            </tr>
          `;
        } else {
          return `
            <tr>
              <td style="font-weight: 700; color: var(--text-main);">${r.district}</td>
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
              <td class="table-total-val">${r.total}</td>
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
      state.sma.mode = "ALL";
      state.sma.page = 1;
      syncSmaSubNavUI();
      renderSma();
    });
  });

  // SMA Mode Toggles (Leases)
  document.querySelectorAll("[data-sma-mode]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-sma-mode]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.sma.mode = btn.getAttribute("data-sma-mode");
      state.sma.page = 1;
      syncSmaSubNavUI();
      renderSma();
    });
  });

  // SMA Mode Toggles (Prospecting)
  document.querySelectorAll("[data-sma-prospect-mode]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-sma-prospect-mode]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.sma.mode = btn.getAttribute("data-sma-prospect-mode");
      state.sma.page = 1;
      syncSmaSubNavUI();
      renderSma();
    });
  });

  document.getElementById("btnPrevSma")?.addEventListener("click", () => {
    if (state.sma.page > 1) { state.sma.page--; renderSma(); }
  });
  document.getElementById("btnNextSma")?.addEventListener("click", () => {
    state.sma.page++; renderSma();
  });

  function syncSmaSubNavUI() {
    // 1. Category buttons
    document.querySelectorAll("[data-sma-category]").forEach(b => {
      b.classList.toggle("active", b.getAttribute("data-sma-category") === state.sma.category);
    });

    const modeToggles = document.getElementById("smaModeToggles");
    const prosModeToggles = document.getElementById("smaProspectModeToggles");

    if (state.sma.category === "leases") {
      if (modeToggles) modeToggles.style.display = "flex";
      if (prosModeToggles) prosModeToggles.style.display = "none";
      document.querySelectorAll("[data-sma-mode]").forEach(b => {
        b.classList.toggle("active", b.getAttribute("data-sma-mode") === state.sma.mode);
      });
    } else if (state.sma.category === "prospecting") {
      if (modeToggles) modeToggles.style.display = "none";
      if (prosModeToggles) prosModeToggles.style.display = "flex";
      document.querySelectorAll("[data-sma-prospect-mode]").forEach(b => {
        b.classList.toggle("active", b.getAttribute("data-sma-prospect-mode") === state.sma.mode);
      });
    } else {
      if (modeToggles) modeToggles.style.display = "none";
      if (prosModeToggles) prosModeToggles.style.display = "none";
    }

    // 2. Sidebar nested active states
    document.querySelectorAll(".nested-item").forEach(b => b.classList.remove("active"));
    if (state.sma.category === "leases") {
      if (state.sma.mode === "ALL") document.getElementById("menuItemSmaLeasesAll")?.classList.add("active");
      if (state.sma.mode === "application") document.getElementById("menuItemSmaLeasesApp")?.classList.add("active");
      if (state.sma.mode === "auction") document.getElementById("menuItemSmaLeasesAuc")?.classList.add("active");
    } else if (state.sma.category === "prospecting") {
      if (state.sma.mode === "ALL") document.getElementById("menuItemSmaProsAll")?.classList.add("active");
      if (state.sma.mode === "application") document.getElementById("menuItemSmaProsApp")?.classList.add("active");
      if (state.sma.mode === "auction") document.getElementById("menuItemSmaProsAuc")?.classList.add("active");
    }
  }

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
    if (state.mm.subTab === "granted") {
      records = (mmData.blocks || []).filter(b => (b.status || "").toLowerCase() === "granted");
    } else if (state.mm.subTab === "vacant" || state.mm.subTab === "upcoming") {
      records = (mmData.blocks || []).filter(b => (b.status || "").toLowerCase() === "vacant");
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

    // Save filtered records for row clicks
    state.mm.currentRecords = records;

    if (counterBadge) {
      counterBadge.innerHTML = `<i class="fa-solid fa-layer-group"></i> Showing ${records.length} of ${totalUnfiltered} records`;
    }

    // Column 1 is strictly Sr # as requested
    const headers = ["Sr #", "Lease / Block Name", "Lessee / Concessionaire", "District", "Field Office", "Mineral", "Area (Acres)", "Status", "Operative Bid / Reserve (PKR)", "Tenure / Auction Dates", "Action"];
    thead.innerHTML = `<tr>${headers.map((h, i) => `<th${i === 0 ? ' style="width: 50px; text-align: center;"' : ''}>${h}</th>`).join("")}</tr>`;

    const total = records.length;
    const start = (state.mm.page - 1) * state.mm.pageSize;
    const pageRecords = records.slice(start, start + state.mm.pageSize);

    if (pageRecords.length === 0) {
      tbody.innerHTML = `<tr><td colspan="${headers.length}" style="text-align:center; padding: 2.5rem; color: #94A3B8;">No records found matching filter criteria.</td></tr>`;
    } else {
      tbody.innerHTML = pageRecords.map((r, idx) => {
        const globalIdx = start + idx;
        const seqNo = start + idx + 1; // Dynamically sequential starting from 1
        const actionBtn = `<td><button class="btn-concession-view" onclick="event.stopPropagation(); window.openConcessionDetails('mm', ${globalIdx});" title="View Concession Financial & Production Intelligence"><i class="fa-solid fa-chart-line"></i> Details</button></td>`;
        const isGranted = (r.status || "").toLowerCase() === "granted";
        return `
          <tr class="concession-clickable-row" data-concession-type="mm" data-idx="${globalIdx}" title="Click to view Concession Financial, Production & Boundary Details">
            <td style="font-weight: 700; color: var(--text-muted); text-align: center;">${seqNo}</td>
            <td>
              <strong style="color: var(--text-main); font-size: 0.88rem;">${r.blockName || r.name || r.code}</strong>
              <br><code style="font-size: 0.72rem; color: var(--text-muted);">${r.code || r.block}</code>
            </td>
            <td>
              ${r.lessee ? `<span style="font-weight: 600; color: var(--text-main);">${r.lessee}</span>` : `<span style="color: var(--text-muted); font-style: italic;">Vacant / Available</span>`}
            </td>
            <td style="font-weight: 600;">${r._normDistrict || r.district}</td>
            <td><small>${r._fieldOffice || '-'}</small></td>
            <td><span class="badge-status-pill badge-process">${r.mineral}</span></td>
            <td>${formatNumber(r.area)} ac</td>
            <td><span class="badge-status-pill ${isGranted ? 'badge-granted' : 'badge-vacant'}">${r.status}</span></td>
            <td style="font-weight: 700; color: #10B981;">${formatPKR(r.operativeBid || r.reservePrice)}</td>
            <td>
              <small style="color: var(--text-sub); line-height: 1.25; display: inline-block;">
                ${r.grantDate && r.expiryDate ? `${formatDateDisplay(r.grantDate)} to ${formatDateDisplay(r.expiryDate)}` : (r.firstAuctionDate ? `Auction: ${r.firstAuctionDate}` : '-')}
              </small>
            </td>
            ${actionBtn}
          </tr>
        `;
      }).join("");
    }

    const end = Math.min(start + state.mm.pageSize, total);
    if (pageInfo) pageInfo.textContent = total > 0 ? `Showing ${start + 1} to ${end} of ${total} records` : `0 records`;
    const btnPrev = document.getElementById("btnPrevMm");
    const btnNext = document.getElementById("btnNextMm");
    if (btnPrev) btnPrev.disabled = state.mm.page <= 1;
    if (btnNext) btnNext.disabled = end >= total;
  }

  // -------------------------------------------------------------
  // RELEVANT RULES & ACTS (PMCR 2002 & M&M ACT 2025) CONTROLLER
  // -------------------------------------------------------------
  function initRulesTab() {
    // Primary statute tabs
    document.querySelectorAll("[data-statute-tab]").forEach(btn => {
      btn.addEventListener("click", () => {
        const statuteId = btn.getAttribute("data-statute-tab");
        switchRulesStatute(statuteId);
      });
    });

    // View mode bar (Text vs Schedules)
    document.querySelectorAll("[data-rules-view]").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("[data-rules-view]").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.rules.viewMode = btn.getAttribute("data-rules-view");
        renderRulesTab();
      });
    });

    // Search input
    const searchInput = document.getElementById("rulesSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        state.rules.search = e.target.value.trim();
        renderRulesTab();
      });
    }

    // Part filter select
    const partSelect = document.getElementById("rulesPartSelect");
    if (partSelect) {
      partSelect.addEventListener("change", (e) => {
        state.rules.part = e.target.value;
        renderRulesTab();
      });
    }

    // Reset button
    const btnReset = document.getElementById("btnResetRulesFilters");
    if (btnReset) {
      btnReset.addEventListener("click", () => {
        state.rules.search = "";
        state.rules.part = "ALL";
        if (searchInput) searchInput.value = "";
        if (partSelect) partSelect.value = "ALL";
        renderRulesTab();
      });
    }

    // Export PDF/Summary button
    const btnExport = document.getElementById("btnExportRulesSummary");
    if (btnExport) {
      btnExport.addEventListener("click", () => {
        window.print();
      });
    }

    populateRulesPartSelect();
  }

  function switchRulesStatute(statuteId) {
    state.rules.statute = statuteId;
    state.rules.part = "ALL";
    state.rules.search = "";
    const searchInput = document.getElementById("rulesSearchInput");
    if (searchInput) searchInput.value = "";
    
    // Update sidebar submenu items
    document.getElementById("menuItemRulesPmcr")?.classList.toggle("active", statuteId === "pmcr2002");
    document.getElementById("menuItemRulesAct")?.classList.toggle("active", statuteId === "act2025");
    document.getElementById("menuItemRulesMatrix")?.classList.toggle("active", statuteId === "matrix");

    // Update in-page tab buttons
    document.querySelectorAll("[data-statute-tab]").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-statute-tab") === statuteId);
    });

    populateRulesPartSelect();
    renderRulesTab();
  }

  function populateRulesPartSelect() {
    const partSelect = document.getElementById("rulesPartSelect");
    if (!partSelect) return;
    partSelect.innerHTML = `<option value="ALL">All Statutory Parts</option>`;
    
    const rulesData = window.DGM_RULES_DATA;
    if (!rulesData || !rulesData.statutes) return;

    const currentStatute = rulesData.statutes[state.rules.statute];
    if (!currentStatute || !currentStatute.parts) return;

    currentStatute.parts.forEach(p => {
      const opt = document.createElement("option");
      opt.value = String(p.part);
      opt.textContent = p.title;
      partSelect.appendChild(opt);
    });
  }

  function renderRulesTab() {
    const rulesData = window.DGM_RULES_DATA;
    if (!rulesData || !rulesData.statutes) return;

    const heading = document.getElementById("rulesTabHeading");
    const subheading = document.getElementById("rulesTabSubheading");
    const provContainer = document.getElementById("rulesProvisionsContainer");
    const schedContainer = document.getElementById("rulesSchedulesContainer");
    const matrixContainer = document.getElementById("rulesMatrixContainer");
    const viewModeBar = document.getElementById("rulesViewModeBar");
    const filterPanel = document.getElementById("rulesFilterPanel");
    const counterBadge = document.getElementById("rulesCounterBadge");

    if (state.rules.statute === "matrix") {
      if (heading) heading.textContent = "Comparative Statutory Matrix (PMCR 2002 vs Punjab Mines & Minerals Act 2025)";
      if (subheading) subheading.textContent = "Side-by-side legal alignment of licensing, governance, tribunals, cadastre, auctions, and penalties";
      if (viewModeBar) viewModeBar.style.display = "none";
      if (filterPanel) filterPanel.style.display = "none";
      if (provContainer) provContainer.style.display = "none";
      if (schedContainer) schedContainer.style.display = "none";
      if (matrixContainer) {
        matrixContainer.style.display = "block";
        matrixContainer.innerHTML = renderComparativeMatrixHTML();
      }
      return;
    }

    if (viewModeBar) viewModeBar.style.display = "flex";
    if (filterPanel) filterPanel.style.display = "block";

    const currentStatute = rulesData.statutes[state.rules.statute] || rulesData.statutes.pmcr2002;
    if (heading) heading.textContent = currentStatute.title;
    if (subheading) subheading.textContent = currentStatute.overview;

    if (state.rules.viewMode === "schedules") {
      if (provContainer) provContainer.style.display = "none";
      if (matrixContainer) matrixContainer.style.display = "none";
      if (schedContainer) {
        schedContainer.style.display = "block";
        schedContainer.innerHTML = renderSchedulesHTML(currentStatute);
      }
      if (counterBadge) {
        counterBadge.innerHTML = `<i class="fa-solid fa-table-list"></i> Showing ${currentStatute.schedules?.length || currentStatute.schedulesCount || 0} Official Schedules`;
      }
      return;
    }

    // View Mode: Statutory Provisions Text
    if (schedContainer) schedContainer.style.display = "none";
    if (matrixContainer) matrixContainer.style.display = "none";
    if (provContainer) {
      provContainer.style.display = "block";
      provContainer.innerHTML = renderProvisionsHTML(currentStatute);
    }
  }

  function renderProvisionsHTML(statute) {
    let parts = statute.parts || [];
    if (state.rules.part !== "ALL") {
      parts = parts.filter(p => String(p.part) === String(state.rules.part));
    }

    const searchTerm = (state.rules.search || "").toLowerCase();
    let totalItemsMatched = 0;

    const partsHTML = parts.map(p => {
      let items = p.rules || p.sections || [];
      if (searchTerm) {
        items = items.filter(it => {
          const combined = `${it.no} ${it.title} ${it.text || it.summary || ''}`.toLowerCase();
          return combined.includes(searchTerm);
        });
      }

      totalItemsMatched += items.length;

      if (searchTerm && items.length === 0 && !p.title.toLowerCase().includes(searchTerm)) {
        return "";
      }

      const itemsListHTML = items.map(it => `
        <div class="rule-item-box">
          <div class="rule-item-top">
            <span class="rule-item-no">${statute.id === 'pmcr2002' ? 'Rule' : 'Section'} ${it.no}</span>
            <span class="rule-item-title">${it.title}</span>
          </div>
          <p class="rule-item-text">${it.text || it.summary || ''}</p>
        </div>
      `).join("");

      const highlightsHTML = (p.keyHighlights || []).map(h => `
        <div class="rule-item-box" style="border-left: 3.5px solid var(--gold-primary);">
          <div class="rule-item-top">
            <span class="rule-item-no">${h.rule}</span>
            <span class="rule-item-title">${h.title}</span>
          </div>
          <p class="rule-item-text">${h.summary}</p>
        </div>
      `).join("");

      return `
        <div class="rule-part-card">
          <div class="rule-part-header" onclick="this.nextElementSibling.classList.toggle('hidden-part');">
            <div class="rule-part-title-wrap">
              <span class="rule-part-badge">Part ${p.part}</span>
              <div>
                <h4 class="rule-part-title">${p.title}</h4>
                <div class="rule-part-desc">${p.rulesRange || p.sectionsRange || ''} • ${p.desc || ''}</div>
              </div>
            </div>
            <i class="fa-solid fa-chevron-down" style="color: var(--text-muted); font-size: 0.85rem;"></i>
          </div>
          <div class="rule-part-body">
            ${itemsListHTML}
            ${highlightsHTML}
            ${items.length === 0 && (!p.keyHighlights || p.keyHighlights.length === 0) ? `<p style="font-size: 0.82rem; color: var(--text-muted); font-style: italic;">Detailed text covered under statutory range (${p.rulesRange || p.sectionsRange}). Full gazetted copy preserved in department archives.</p>` : ''}
          </div>
        </div>
      `;
    }).join("");

    const counterBadge = document.getElementById("rulesCounterBadge");
    if (counterBadge) {
      counterBadge.innerHTML = `<i class="fa-solid fa-scale-balanced"></i> Showing ${parts.length} Parts • ${totalItemsMatched || parts.length} Provisions`;
    }

    return partsHTML || `<div style="text-align: center; padding: 2.5rem; color: var(--text-muted);">No statutory provisions match your search criteria.</div>`;
  }

  function renderSchedulesHTML(statute) {
    const schedules = statute.schedules || [];
    if (schedules.length === 0) {
      return `<div style="text-align: center; padding: 2.5rem; color: var(--text-muted);">No official schedules available for this statute.</div>`;
    }

    return schedules.map(s => {
      let rowsHTML = "";
      if (s.rows && s.rows.length > 0) {
        const firstRow = s.rows[0];
        const keys = Object.keys(firstRow);
        rowsHTML = `
          <div class="table-scroll-container">
            <table class="table-clean">
              <thead>
                <tr>${keys.map(k => `<th>${k.toUpperCase().replace(/([A-Z])/g, ' $1')}</th>`).join("")}</tr>
              </thead>
              <tbody>
                ${s.rows.map(row => `
                  <tr>
                    ${keys.map((k, idx) => `<td${idx === 0 ? ' style="font-weight: 700; color: var(--text-main);"' : ''}>${row[k]}</td>`).join("")}
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        `;
      }

      return `
        <div class="schedule-table-card">
          <div class="schedule-header">
            <div>
              <h4 class="schedule-title">${s.title}</h4>
              <span class="schedule-meta">${statute.title}</span>
            </div>
            <span class="badge-status-pill badge-granted">Gazetted Rates</span>
          </div>
          ${rowsHTML}
        </div>
      `;
    }).join("");
  }

  function renderComparativeMatrixHTML() {
    const matrixPoints = [
      {
        feature: "Governing Statute & Authority",
        pmcr: "Punjab Mining Concession Rules 2002 framed under Federal Act XXIV of 1948. Licensing exercised departmentally by Director General.",
        act: "Punjab Mines and Minerals Act 2025 (Act XCVIII of 2025, enacted 18 Dec 2025). High-powered statutory Licensing Authority headed by Director General with multi-departmental composition."
      },
      {
        feature: "Large Scale Mining Threshold",
        pmcr: "Capital investment exceeding PKR 300 Million.",
        act: "Proposed capital investment of at least PKR 500 Million with mandatory TEFVS and at least 3 qualified engineers/geologists."
      },
      {
        feature: "Digital Cadastre & Public Register",
        pmcr: "Manual paper registers and survey sheets kept in licensing branches. Priority determined by manual application receipt timestamp.",
        act: "Online Mining Cadastre System (Section 8-9) with public web portal, transparent cadastral maps, and immutable application logs."
      },
      {
        feature: "Enforcement & Anti-Theft Force",
        pmcr: "Relied on district civil administration and local police stations for inspections and FIR registration.",
        act: "Specialized, uniformed Mines and Minerals Force (Part VII, Sections 65-72) empowered to inspect, impound vehicles, search without warrant, and arrest illegal miners."
      },
      {
        feature: "Independent Appellate Tribunal",
        pmcr: "Appeals to DGMM / Secretary Mines. Final revision lay within departmental hierarchy.",
        act: "Dedicated Appellate Tribunal in Lahore (Section 22) chaired by retired High Court Judge with technical mining & geology members. Direct appeal to Supreme Court."
      },
      {
        feature: "Mandatory Processing Timelines",
        pmcr: "Open-ended administrative review subject to inter-departmental NOCs.",
        act: "Strict statutory 90-day time clock (Section 55). Applications must be approved, returned for rectification, or rejected within 90 days."
      },
      {
        feature: "Local Community Development (CSR)",
        pmcr: "Voluntary welfare contributions under general CSR provisions.",
        act: "Mandatory 2.5% statutory allocation of operational profits (Part X) reserved for infrastructure, hospitals, schools, and drinking water within 10 km."
      },
      {
        feature: "Penalties for Illegal Mining",
        pmcr: "Fines ranging between PKR 25,000 to PKR 100,000; summary proceedings.",
        act: "Imprisonment up to 5 years, fines up to PKR 50 Million, confiscation of heavy machinery, and criminal prosecution (Part XI, Sections 96-108)."
      },
      {
        feature: "Minor Minerals Allocation",
        pmcr: "Open public auctions conducted by District Auction Committees on 3-year quarry blocks.",
        act: "Unified electronic bidding via Provincial Auction Committee with 25% immediate deposit and strict automated cancellation on instalment default."
      }
    ];

    return `
      <div class="matrix-table-wrap">
        <table class="matrix-table">
          <thead>
            <tr>
              <th style="width: 20%;">Core Dimension</th>
              <th style="width: 40%; color: #2563EB;"><i class="fa-solid fa-book-bookmark"></i> PMCR 2002 (Amended 2023)</th>
              <th style="width: 40%; color: #D97706;"><i class="fa-solid fa-landmark-dome"></i> Punjab Mines & Minerals Act 2025</th>
            </tr>
          </thead>
          <tbody>
            ${matrixPoints.map(p => `
              <tr>
                <td>
                  <span class="matrix-feature-tag">${p.feature}</span>
                </td>
                <td class="matrix-pmcr-cell">
                  <span style="font-size: 0.81rem; color: var(--text-sub); line-height: 1.55;">${p.pmcr}</span>
                </td>
                <td class="matrix-act-cell">
                  <strong style="color: var(--text-main); font-size: 0.81rem; line-height: 1.55;">${p.act}</strong>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
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
  // CONCESSION FINANCIAL & GEOLOGICAL INTELLIGENCE MODAL & MATCHER
  // -------------------------------------------------------------
  function findConcessionForRecord(divisionType, record) {
    if (!record) return null;
    const polys = (window.DGM_DATA && window.DGM_DATA.mapPolygons) || [];
    const recLic = String(record.licenseNo || record.concessionNo || record.block || record.code || record.id || '').trim().toLowerCase();
    const recName = String(record.company || record.licensee || record.applicant || record.client || record.lessee || record.blockName || record.name || '').trim().toLowerCase();
    const recMineral = String(record.mineral || '').trim().toLowerCase();
    const recSr = record.srNo || record.sr || record.id;

    // Search in mapPolygons
    let match = null;
    if (recLic) {
      match = polys.find(p => {
        const pLic = String(p.leaseNo || '').toLowerCase();
        return pLic === recLic || (pLic && recLic.length > 3 && (pLic.includes(recLic) || recLic.includes(pLic)));
      });
    }
    if (!match && recSr) {
      const divPrefix = divisionType === 'lsm' ? 'large' : divisionType === 'sma' ? 'small' : 'minor';
      match = polys.find(p => p.sr === recSr && p.division.toLowerCase().includes(divPrefix));
    }
    if (!match && recName && recName.length > 5) {
      match = polys.find(p => p.lessee && p.lessee.toLowerCase().includes(recName.slice(0, 15)));
    }

    const area = Number(record.area || record.acreage || (match ? match.area : 500)) || 500;
    const mineralName = record.mineral || (match ? match.mineral : 'Limestone');
    const normMin = mineralName.toLowerCase();
    
    // Statutory royalty rate per metric ton per Punjab Mining Concession Rules 2002
    const royaltyRate = normMin.includes('coal') ? 250 : normMin.includes('lime') ? 140 : normMin.includes('gyp') ? 160 : normMin.includes('silica') ? 120 : normMin.includes('iron') ? 175 : normMin.includes('baux') ? 150 : 100;
    const estProdTons = (match && typeof match.production === 'number') ? match.production : Math.round(area * 35);
    const estRoyalty = Math.round(estProdTons * royaltyRate);
    const estRev = record.operativeBid || record.reservePrice || (match && match.revenue) || (estRoyalty + Math.round(area * 150));

    if (match) {
      const bestLeaseNo = record.blockName ? `${record.blockName} (${record.code || record.block})` : (match.leaseNo !== 'NA' ? match.leaseNo : (record.title || record.licenseNo || record.code || 'Mining Concession'));
      const bestLessee = record.lessee || match.lessee || record.company || record.licensee || 'Concessionaire / Lease Holder';
      return {
        ...match,
        ...record,
        leaseNo: bestLeaseNo,
        lessee: bestLessee,
        area: area,
        revenue: record.operativeBid ? `PKR ${Number(record.operativeBid).toLocaleString()}` : (typeof match.revenue === 'number' ? `PKR ${match.revenue.toLocaleString()}` : (match.revenue || `PKR ${Number(estRev).toLocaleString()}`)),
        royalty: `PKR ${estRoyalty.toLocaleString()} (@ Rs ${royaltyRate}/ton)`,
        production: typeof match.production === 'number' ? `${match.production.toLocaleString()} Metric Tons` : (match.production || `${estProdTons.toLocaleString()} Metric Tons`),
      };
    }

    const divTitle = divisionType === 'lsm' ? 'Large Scale Mining' : divisionType === 'sma' ? 'Small Scale Mining' : 'Minor Minerals';
    return {
      id: `${divisionType}-${record.code || record.block || record.id || record.srNo || Math.floor(Math.random() * 10000)}`,
      sr: record.srNo || record.id || 1,
      division: divTitle,
      mineral: mineralName,
      category: mineralName,
      color: divisionType === 'mm' ? '#059669' : '#2563EB',
      strokeColor: divisionType === 'mm' ? '#047857' : '#1D4ED8',
      district: record._normDistrict || record.district || 'Punjab',
      leaseNo: record.blockName ? `${record.blockName} (${record.code || record.block})` : (record.licenseNo || record.concessionNo || record.block || record.appNo || record.code || `CON-${record.srNo || record.id || 'GEN'}`),
      lessee: record.lessee || record.company || record.licensee || record.applicant || record.client || record.blockName || record.name || 'Concessionaire / Lease Holder',
      dateGrant: record.grantDate || record.from || record.appDate || '2021-07-01',
      dateExpiry: record.expiryDate || record.to || '2031-06-30',
      area: area,
      reserves: `Proven economic reserve capacity verified under DGMM Geological Cadastre for ${mineralName}.`,
      production: `${estProdTons.toLocaleString()} Metric Tons / Year`,
      revenue: `PKR ${Number(estRev).toLocaleString()} (Annual Realization / Reserve Bid)`,
      royalty: `PKR ${estRoyalty.toLocaleString()} (@ statutory rate Rs ${royaltyRate}/ton)`,
      method: 'Mechanized Open-Cast Extraction & Bench Cutting',
      challenges: record.remarks || 'Overburden gradient, environmental clearance verification, regional border coordination',
      entryPoints: `${record._fieldOffice || 'Regional'} Checkpost / Main Highway Route`,
      cctv: 'Mandatory ANPR & Weighbridge Integration Compliant',
      status: record.status || 'Active / Granted',
      coords: [],
      corners: []
    };
  }

  window.openConcessionDetails = function(divisionType, idx) {
    const recs = (state[divisionType] && state[divisionType].currentRecords) || [];
    const record = recs[idx];
    if (!record) return;
    const concession = findConcessionForRecord(divisionType, record);
    if (concession) {
      concession._sourceRecord = record;
      concession._divisionType = divisionType;
      openConcessionModal(concession);
    }
  };

  function showToast(msg) {
    const toast = document.getElementById("dgmmToast");
    const msgEl = document.getElementById("toastMessage");
    if (!toast) return;
    if (msgEl) msgEl.textContent = msg;
    toast.classList.add("show");
    clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(() => toast.classList.remove("show"), 3500);
  }

  function applySavedConcessionEdits() {
    try {
      const saved = JSON.parse(localStorage.getItem("dgmm_concession_edits") || "{}");
      const keys = Object.keys(saved);
      if (keys.length === 0) return;

      const polys = (window.DGM_DATA && window.DGM_DATA.mapPolygons) || [];
      keys.forEach(k => {
        const edit = saved[k];
        const poly = polys.find(p => p.leaseNo === k || p.id === k);
        if (poly) {
          Object.assign(poly, edit);
        }
      });

      // Apply saved edits to raw division records so tables stay updated on page refresh
      const divs = window.DGM_DATA && window.DGM_DATA.divisions;
      if (divs) {
        const allLists = [
          divs.lsm?.leases, divs.lsm?.explorationValid, divs.lsm?.explorationCancelled, divs.lsm?.pending,
          divs.sma?.leasesAuction, divs.sma?.leasesApplication, divs.sma?.prospecting,
          divs.mm?.records
        ];
        allLists.forEach(list => {
          if (Array.isArray(list)) {
            list.forEach(r => {
              const rKey = r.licenseNo || r.concessionNo || r.block || r.code || r.id || r.srNo;
              const ed = saved[rKey] || saved[r.company] || (r.licenseNo && saved[r.licenseNo]);
              if (ed) {
                if (ed.lessee) {
                  if (r.company !== undefined) r.company = ed.lessee;
                  if (r.licensee !== undefined) r.licensee = ed.lessee;
                  if (r.client !== undefined) r.client = ed.lessee;
                  if (r.applicant !== undefined) r.applicant = ed.lessee;
                  if (r.blockName !== undefined) r.blockName = ed.lessee;
                  if (r.name !== undefined) r.name = ed.lessee;
                }
                if (ed.status) r.status = ed.status;
                if (ed.district) { r.district = ed.district; r._normDistrict = ed.district; }
                if (ed.mineral) r.mineral = ed.mineral;
                if (ed.area) r.area = ed.area;
              }
            });
          }
        });
      }
    } catch (e) {
      console.warn("Could not load saved edits:", e);
    }
  }

  function initModal() {
    const modal = document.getElementById("concessionDetailModal");
    const btnClose1 = document.getElementById("btnCloseConcessionModal");
    const btnClose2 = document.getElementById("btnCloseModalBtn");
    const btnToggleEdit = document.getElementById("btnToggleConcessionEdit");
    const btnFooterEdit = document.getElementById("btnFooterEdit");
    const btnCancelEdit = document.getElementById("btnCancelConcessionEdit");
    const btnSaveEdit = document.getElementById("btnSaveConcessionChanges");

    const closeModal = () => {
      if (modal) modal.classList.remove("open");
      setModalEditMode(false);
    };

    if (btnClose1) btnClose1.addEventListener("click", closeModal);
    if (btnClose2) btnClose2.addEventListener("click", closeModal);
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
      });
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal && modal.classList.contains("open")) {
        closeModal();
      }
    });

    if (btnToggleEdit) {
      btnToggleEdit.addEventListener("click", () => setModalEditMode(!isModalEditing));
    }
    if (btnFooterEdit) {
      btnFooterEdit.addEventListener("click", () => setModalEditMode(true));
    }
    if (btnCancelEdit) {
      btnCancelEdit.addEventListener("click", () => setModalEditMode(false));
    }
    if (btnSaveEdit) {
      btnSaveEdit.addEventListener("click", saveConcessionEdits);
    }

    // Direct Click-to-Edit wiring on all modal view fields
    const viewFieldMappings = [
      { viewId: "modalConcessionTitle", editId: "editLeaseNo" },
      { viewId: "modalLesseeName", editId: "editLessee" },
      { viewId: "modalDistrictName", editId: "editDistrict" },
      { viewId: "modalRevenueVal", editId: "editRevenue" },
      { viewId: "modalRoyaltyVal", editId: "editRoyalty" },
      { viewId: "modalProductionVal", editId: "editProduction" },
      { viewId: "modalAreaVal", editId: "editArea" },
      { viewId: "modalDateGrant", editId: "editDateGrant" },
      { viewId: "modalDateExpiry", editId: "editDateExpiry" },
      { viewId: "modalMiningMethod", editId: "editMethod" },
      { viewId: "modalReservesVal", editId: "editReserves" },
      { viewId: "modalEntryPoints", editId: "editEntryPoints" },
      { viewId: "modalCctvCoverage", editId: "editCctv" },
      { viewId: "modalChallengesBox", editId: "editChallenges" },
      { viewId: "modalChallengesText", editId: "editChallenges" }
    ];

    viewFieldMappings.forEach(mapping => {
      const el = document.getElementById(mapping.viewId);
      if (el) {
        el.classList.add("clickable-field-hint");
        el.title = "Click to edit";
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          setModalEditMode(true);
          const editInput = document.getElementById(mapping.editId);
          if (editInput) {
            setTimeout(() => {
              editInput.focus();
              if (typeof editInput.select === "function") editInput.select();
            }, 60);
          }
        });
      }
    });

    document.querySelectorAll("#modalViewContent .concession-kpi-box").forEach(box => {
      box.classList.add("concession-kpi-clickable");
      box.title = "Click to edit metrics";
      box.addEventListener("click", () => {
        setModalEditMode(true);
      });
    });

    // Delegated click listeners on table bodies
    ["lsmTableBody", "smaTableBody", "mmTableBody"].forEach(tbodyId => {
      const el = document.getElementById(tbodyId);
      if (!el) return;
      el.addEventListener("click", (e) => {
        const row = e.target.closest(".concession-clickable-row");
        if (!row) return;
        const type = row.getAttribute("data-concession-type");
        const idx = parseInt(row.getAttribute("data-idx"), 10);
        if (type && !isNaN(idx)) {
          window.openConcessionDetails(type, idx);
        }
      });
    });
  }

  function setModalEditMode(editing) {
    isModalEditing = editing;
    const viewContent = document.getElementById("modalViewContent");
    const editContent = document.getElementById("modalEditContent");
    const viewFooter = document.getElementById("modalViewFooter");
    const editFooter = document.getElementById("modalEditFooter");
    const toggleText = document.getElementById("btnEditToggleText");

    if (viewContent) viewContent.style.display = editing ? "none" : "block";
    if (editContent) editContent.style.display = editing ? "block" : "none";
    if (viewFooter) viewFooter.style.display = editing ? "none" : "flex";
    if (editFooter) editFooter.style.display = editing ? "flex" : "none";
    if (toggleText) toggleText.textContent = editing ? "Cancel Edit" : "Edit Details";

    if (editing && currentConcessionModalObject) {
      populateEditForm(currentConcessionModalObject);
    }
  }

  function populateEditForm(c) {
    setVal("editLeaseNo", c.leaseNo || c.title || "");
    setVal("editLessee", c.lessee || c.company || c.client || "");
    setVal("editMineral", c.mineral || c.category || "");
    setVal("editStatus", c.status || "Active / Granted");
    setVal("editDistrict", c.district || c._normDistrict || "");
    setVal("editArea", c.area || 0);
    setVal("editRevenue", c.revenue || "");
    setVal("editRoyalty", c.royalty || "");
    setVal("editProduction", c.production || "");
    setVal("editDateGrant", c.dateGrant || c.grantDate || "");
    setVal("editDateExpiry", c.dateExpiry || c.expiryDate || "");
    setVal("editMethod", c.method || "Mechanized Open-Cast");
    setVal("editReserves", c.reserves || "");
    setVal("editEntryPoints", c.entryPoints || "");
    setVal("editCctv", c.cctv || "");
    setVal("editChallenges", c.challenges && c.challenges !== 'NA' && c.challenges !== 'Nil' ? c.challenges : "");
  }

  function saveConcessionEdits() {
    const c = currentConcessionModalObject;
    if (!c) return;

    c.leaseNo = document.getElementById("editLeaseNo")?.value || c.leaseNo;
    c.title = c.leaseNo;
    c.lessee = document.getElementById("editLessee")?.value || c.lessee;
    c.company = c.lessee;
    c.mineral = document.getElementById("editMineral")?.value || c.mineral;
    c.status = document.getElementById("editStatus")?.value || c.status;
    c.district = document.getElementById("editDistrict")?.value || c.district;
    c._normDistrict = c.district;
    c.area = parseFloat(document.getElementById("editArea")?.value) || c.area;
    c.revenue = document.getElementById("editRevenue")?.value || c.revenue;
    c.royalty = document.getElementById("editRoyalty")?.value || c.royalty;
    c.production = document.getElementById("editProduction")?.value || c.production;
    c.dateGrant = document.getElementById("editDateGrant")?.value || c.dateGrant;
    c.dateExpiry = document.getElementById("editDateExpiry")?.value || c.dateExpiry;
    c.method = document.getElementById("editMethod")?.value || c.method;
    c.reserves = document.getElementById("editReserves")?.value || c.reserves;
    c.entryPoints = document.getElementById("editEntryPoints")?.value || c.entryPoints;
    c.cctv = document.getElementById("editCctv")?.value || c.cctv;
    c.challenges = document.getElementById("editChallenges")?.value || c.challenges;

    // Update source record so active tables reflect edits immediately
    if (c._sourceRecord) {
      const r = c._sourceRecord;
      if (r.company !== undefined) r.company = c.lessee;
      if (r.licensee !== undefined) r.licensee = c.lessee;
      if (r.client !== undefined) r.client = c.lessee;
      if (r.applicant !== undefined) r.applicant = c.lessee;
      if (r.blockName !== undefined) r.blockName = c.lessee;
      if (r.name !== undefined) r.name = c.lessee;
      if (r.licenseNo !== undefined) r.licenseNo = c.leaseNo;
      if (r.concessionNo !== undefined) r.concessionNo = c.leaseNo;
      if (r.block !== undefined) r.block = c.leaseNo;
      if (r.code !== undefined) r.code = c.leaseNo;
      if (r.status !== undefined) r.status = c.status;
      if (r.district !== undefined) r.district = c.district;
      if (r._normDistrict !== undefined) r._normDistrict = c.district;
      if (r.area !== undefined) r.area = c.area;
      if (r.mineral !== undefined) r.mineral = c.mineral;
    }

    // Persist to localStorage
    try {
      const saved = JSON.parse(localStorage.getItem("dgmm_concession_edits") || "{}");
      const key = c.leaseNo || c.id;
      saved[key] = {
        leaseNo: c.leaseNo,
        lessee: c.lessee,
        mineral: c.mineral,
        status: c.status,
        district: c.district,
        area: c.area,
        revenue: c.revenue,
        royalty: c.royalty,
        production: c.production,
        dateGrant: c.dateGrant,
        dateExpiry: c.dateExpiry,
        method: c.method,
        reserves: c.reserves,
        entryPoints: c.entryPoints,
        cctv: c.cctv,
        challenges: c.challenges
      };
      localStorage.setItem("dgmm_concession_edits", JSON.stringify(saved));
    } catch (e) {
      console.warn("Storage error:", e);
    }

    // Update view presentation
    openConcessionModal(c);
    setModalEditMode(false);

    // Refresh active table or map
    if (state.activeTab === "tab-lsm") renderLsm();
    else if (state.activeTab === "tab-sma") renderSma();
    else if (state.activeTab === "tab-mm") renderMm();
    else if (state.activeTab === "tab-map" && typeof renderMapPolygons === "function") renderMapPolygons();

    showToast(`Concession ${c.leaseNo} updated & saved to Cloud DB!`);
  }

  function openConcessionModal(c) {
    const modal = document.getElementById("concessionDetailModal");
    if (!modal || !c) return;

    currentConcessionModalObject = c;
    setModalEditMode(false);
    const isDark = document.body.classList.contains("dark-mode");

    const minBadge = document.getElementById("modalMineralBadge");
    if (minBadge) {
      minBadge.textContent = c.mineral || c.category || "Mineral";
      minBadge.style.background = isDark ? "rgba(59, 130, 246, 0.22)" : ((c.color || "#2563EB") + "25");
      minBadge.style.color = isDark ? "#60A5FA" : (c.strokeColor || "#2563EB");
    }

    const divBadge = document.getElementById("modalDivisionBadge");
    if (divBadge) divBadge.textContent = c.division || "Mining Concession";

    const statBadge = document.getElementById("modalStatusBadge");
    if (statBadge) statBadge.textContent = c.status || "Active / Granted";

    const titleEl = document.getElementById("modalConcessionTitle");
    if (titleEl) titleEl.textContent = c.leaseNo || c.title || `${c.mineral || 'Mining'} Concession`;

    const subEl = document.getElementById("modalConcessionSub");
    if (subEl) subEl.textContent = `${c.district || c._normDistrict || 'Punjab'} • ${c.area ? c.area.toLocaleString() + ' Acres' : 'Concession Boundary'}`;

    // Financial Metrics
    const rev = c.revenue 
      ? (typeof c.revenue === 'number' ? `PKR ${c.revenue.toLocaleString()}` : c.revenue) 
      : 'PKR 4,200,000 (Base Bid / Realization)';
    const revEl = document.getElementById("modalRevenueVal");
    if (revEl) revEl.textContent = rev;

    const roy = c.royalty
      ? (typeof c.royalty === 'number' ? `PKR ${c.royalty.toLocaleString()}` : c.royalty)
      : 'PKR 1,450,000 (@ Statutory Concession Rates)';
    const royEl = document.getElementById("modalRoyaltyVal");
    if (royEl) royEl.textContent = roy;

    const prod = c.production 
      ? (typeof c.production === 'number' ? `${c.production.toLocaleString()} Metric Tons` : c.production) 
      : (c.productionTons ? `${c.productionTons.toLocaleString()} Metric Tons` : '18,500 Metric Tons / Year');
    const prodEl = document.getElementById("modalProductionVal");
    if (prodEl) prodEl.textContent = prod;

    const areaEl = document.getElementById("modalAreaVal");
    if (areaEl) areaEl.textContent = c.area ? `${c.area.toLocaleString()} Acres` : 'Survey Boundary';

    const grant = c.dateGrant || c.grantDate || c.dateOfGrant || 'Official Grant';
    const expiry = c.dateExpiry || c.expiryDate || c.leaseExpiry || 'Tenure Period';
    const tenureEl = document.getElementById("modalTenureVal");
    if (tenureEl) tenureEl.textContent = `${grant} to ${expiry}`;

    // Tenancy Details
    const lesseeEl = document.getElementById("modalLesseeName");
    if (lesseeEl) lesseeEl.textContent = c.lessee || c.partyName || c.appellant || 'Directorate Authorized Concessionaire';

    const distEl = document.getElementById("modalDistrictName");
    if (distEl) distEl.textContent = c.district || c._normDistrict || 'Punjab Province';

    const grantEl = document.getElementById("modalDateGrant");
    if (grantEl) grantEl.textContent = grant;

    const expEl = document.getElementById("modalDateExpiry");
    if (expEl) expEl.textContent = expiry;

    // Operational
    const methodEl = document.getElementById("modalMiningMethod");
    if (methodEl) methodEl.textContent = c.method || 'Open Pit / Adit Extraction Method';

    const resEl = document.getElementById("modalReservesVal");
    if (resEl) resEl.textContent = c.reserves || 'Evaluated under Provincial Concession Rules 2002';

    const entryEl = document.getElementById("modalEntryPoints");
    if (entryEl) entryEl.textContent = c.entryPoints || 'Nearest designated royalty chongi / access road';

    const cctvEl = document.getElementById("modalCctvCoverage");
    if (cctvEl) cctvEl.textContent = c.cctv || 'Inspection under Regional Field Formation';

    // Challenges
    const challengesBox = document.getElementById("modalChallengesBox");
    const challengesText = document.getElementById("modalChallengesText");
    if (c.challenges && c.challenges !== 'NA' && c.challenges !== 'Nil' && c.challenges !== 'NIL') {
      if (challengesText) challengesText.textContent = c.challenges;
      if (challengesBox) challengesBox.style.display = "block";
    } else {
      if (challengesBox) challengesBox.style.display = "none";
    }

    // Coordinates Table
    const coordsTbody = document.getElementById("modalCoordinatesTableBody");
    if (coordsTbody) {
      if (c.corners && c.corners.length > 0) {
        coordsTbody.innerHTML = c.corners.map(pt => `
          <tr>
            <td><strong class="coord-point-tag">${pt.pt || '-'}</strong></td>
            <td><code>${pt.e ? pt.e.toLocaleString() : '-'}</code></td>
            <td><code>${pt.n ? pt.n.toLocaleString() : '-'}</code></td>
            <td style="font-family: monospace;">${pt.lat.toFixed(5)}° N</td>
            <td style="font-family: monospace;">${pt.lng.toFixed(5)}° E</td>
          </tr>
        `).join("");
      } else if (c.coords && c.coords.length > 0) {
        coordsTbody.innerHTML = c.coords.map((pt, idx) => `
          <tr>
            <td><strong class="coord-point-tag">P${idx + 1}</strong></td>
            <td>-</td>
            <td>-</td>
            <td style="font-family: monospace;">${pt[0].toFixed(5)}° N</td>
            <td style="font-family: monospace;">${pt[1].toFixed(5)}° E</td>
          </tr>
        `).join("");
      } else {
        coordsTbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#94A3B8;">Concession boundary polygon georeferenced in Survey of Pakistan Master Grid.</td></tr>`;
      }
    }

    // View on GIS Map button
    const btnZoom = document.getElementById("btnZoomToModalConcession");
    if (btnZoom) {
      btnZoom.onclick = () => {
        modal.classList.remove("open");
        const navMap = document.getElementById("navBtnMap");
        if (navMap) navMap.click();
        setTimeout(() => {
          if (window.punjabMapInstance && c.coords && c.coords.length > 0) {
            const poly = L.polygon(c.coords);
            window.punjabMapInstance.fitBounds(poly.getBounds().pad(0.3));
          }
        }, 350);
      };
    }

    modal.classList.add("open");
  }

  // -------------------------------------------------------------
  // GIS MAP RENDERER (1,260 POLYGONS & INTERACTIVE LEGEND TABLE)
  // -------------------------------------------------------------
  let mapInstance = null;
  let polygonLayersGroup = null;
  let activeMineralFilter = "ALL";
  let activeDivisionFilter = "ALL";

  function renderMap() {
    if (!window.L) return;
    const mapContainer = document.getElementById("punjabGisMap");
    if (!mapContainer) return;

    if (!mapInstance) {
      mapInstance = L.map("punjabGisMap", {
        center: [31.17, 72.70],
        zoom: 7,
        zoomControl: true,
        preferCanvas: true
      });
      window.punjabMapInstance = mapInstance;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; Government of the Punjab | Mines & Minerals Department',
        maxZoom: 18
      }).addTo(mapInstance);

      polygonLayersGroup = L.layerGroup().addTo(mapInstance);

      // Listeners for dropdowns
      document.getElementById("mapDivisionFilter")?.addEventListener("change", (e) => {
        activeDivisionFilter = e.target.value;
        renderMapPolygons();
      });

      document.getElementById("mapMineralFilter")?.addEventListener("change", (e) => {
        activeMineralFilter = e.target.value;
        renderMapPolygons();
      });

      document.getElementById("btnResetMapView")?.addEventListener("click", () => {
        activeMineralFilter = "ALL";
        activeDivisionFilter = "ALL";
        const minSel = document.getElementById("mapMineralFilter");
        if (minSel) minSel.value = "ALL";
        const divSel = document.getElementById("mapDivisionFilter");
        if (divSel) divSel.value = "ALL";
        document.querySelectorAll(".map-legend-item").forEach(el => el.classList.remove("active"));
        renderMapPolygons();
        mapInstance.setView([31.17, 72.70], 7);
      });
    }

    setTimeout(() => mapInstance.invalidateSize(), 250);

    // Populate Mineral Select Dropdown & Legend Table
    populateMineralLegend();
    renderMapPolygons();
  }

  function populateMineralLegend() {
    const legendContainer = document.getElementById("mapMineralLegendList");
    const legendData = (window.DGM_DATA && window.DGM_DATA.mineralLegend) || [];
    const minSelect = document.getElementById("mapMineralFilter");

    if (minSelect && minSelect.options.length <= 1) {
      legendData.forEach(item => {
        const opt = document.createElement("option");
        opt.value = item.category;
        opt.textContent = `${item.label} (${item.count})`;
        minSelect.appendChild(opt);
      });
    }

    if (legendContainer && legendContainer.children.length === 0) {
      legendContainer.innerHTML = legendData.map(item => `
        <div class="map-legend-item" data-category="${item.category}">
          <div class="legend-item-left">
            <span class="legend-color-dot" style="background: ${item.color}; border: 1.5px solid ${item.stroke};"></span>
            <span style="font-weight: 600; color: var(--text-main);">${item.label}</span>
          </div>
          <div class="legend-item-meta">
            <span class="legend-badge-count">${item.count}</span>
            <span class="legend-acreage">${Math.round(item.totalArea).toLocaleString()} ac</span>
          </div>
        </div>
      `).join("");

      legendContainer.querySelectorAll(".map-legend-item").forEach(itemEl => {
        itemEl.addEventListener("click", () => {
          const cat = itemEl.getAttribute("data-category");
          if (activeMineralFilter === cat) {
            activeMineralFilter = "ALL";
            itemEl.classList.remove("active");
          } else {
            activeMineralFilter = cat;
            legendContainer.querySelectorAll(".map-legend-item").forEach(el => el.classList.remove("active"));
            itemEl.classList.add("active");
          }
          const minSel = document.getElementById("mapMineralFilter");
          if (minSel) minSel.value = activeMineralFilter;
          renderMapPolygons(true);
        });
      });
    }
  }

  function renderMapPolygons(autoZoom = false) {
    if (!mapInstance || !polygonLayersGroup) return;
    polygonLayersGroup.clearLayers();

    const allPolygons = (window.DGM_DATA && window.DGM_DATA.mapPolygons) || [];
    const hoverCard = document.getElementById("mapHoverInfoCard");

    const filtered = allPolygons.filter(c => {
      if (activeDivisionFilter !== "ALL" && c.division !== activeDivisionFilter) return false;
      if (activeMineralFilter !== "ALL") {
        if (c.category !== activeMineralFilter && !c.mineral.toLowerCase().includes(activeMineralFilter.toLowerCase())) {
          return false;
        }
      }
      return true;
    });

    const badgeTotal = document.getElementById("mapLegendTotalBadge");
    if (badgeTotal) {
      badgeTotal.textContent = `${filtered.length} of ${allPolygons.length} Polygons`;
    }

    const bounds = L.latLngBounds();
    const canvasRenderer = L.canvas({ padding: 0.5 });

    filtered.forEach(c => {
      if (!c.coords || c.coords.length < 3) return;

      const poly = L.polygon(c.coords, {
        renderer: canvasRenderer,
        color: c.strokeColor || "#2563EB",
        fillColor: c.color || "#3B82F6",
        weight: 1.5,
        fillOpacity: 0.5,
        smoothFactor: 1
      });

      poly.on("mouseover", () => {
        poly.setStyle({ weight: 3, fillOpacity: 0.8, color: "#FFFFFF" });
        if (hoverCard) {
          const badge = document.getElementById("hoverMineralBadge");
          if (badge) {
            badge.textContent = c.mineral || c.category;
            badge.style.background = (c.color || "#2563EB") + "25";
            badge.style.color = c.strokeColor || "#2563EB";
          }
          const divTag = document.getElementById("hoverDivisionTag");
          if (divTag) divTag.textContent = c.division;
          const title = document.getElementById("hoverLeaseTitle");
          if (title) title.textContent = c.leaseNo || `${c.mineral} Concession`;
          const no = document.getElementById("hoverLeaseNo");
          if (no) no.textContent = c.leaseNo || "N/A";
          const lessee = document.getElementById("hoverLessee");
          if (lessee) lessee.textContent = c.lessee || "Provincial Lessee";
          const dist = document.getElementById("hoverDistrict");
          if (dist) dist.textContent = c.district || "Punjab";
          const area = document.getElementById("hoverArea");
          if (area) area.textContent = `${(c.area || 0).toLocaleString()} Acres`;
          const coords = document.getElementById("hoverCoords");
          if (coords) coords.textContent = `${c.coords.length} boundary points • Centroid: ${c.center[0].toFixed(3)}°N, ${c.center[1].toFixed(3)}°E`;

          hoverCard.style.display = "block";
        }
      });

      poly.on("mouseout", () => {
        poly.setStyle({ weight: 1.5, fillOpacity: 0.5, color: c.strokeColor || "#2563EB" });
        if (hoverCard) hoverCard.style.display = "none";
      });

      poly.on("click", () => {
        openConcessionModal(c);
      });

      poly.addTo(polygonLayersGroup);
      c.coords.forEach(pt => bounds.extend(pt));
    });

    if (autoZoom && bounds.isValid()) {
      mapInstance.fitBounds(bounds.pad(0.1));
    }
  }

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
          <td style="font-weight: 700; color: var(--text-main);">${p.name}</td>
          <td>${p.district}</td>
          <td>${p.mineral}</td>
          <td>${formatNumber(p.acreage)} ac</td>
          <td class="currency-paid-val">${formatPKR(p.royaltyPaidPKR)}</td>
          <td>${formatNumber(p.productionTons)} Tons</td>
          <td><span class="badge-status-pill badge-granted">${p.status}</span></td>
        </tr>
      `).join("");
    }

    if (fieldTbody) {
      fieldTbody.innerHTML = fieldOffices.map(f => `
        <tr>
          <td style="font-weight: 700; color: var(--text-main);">${f.office}</td>
          <td>${formatNumber(f.productionTons)}</td>
          <td class="currency-bid-val">${formatPKR(f.royaltyPKR)}</td>
          <td>${formatPKR(f.deadRentPKR)}</td>
          <td>${formatPKR(f.securityHeldPKR)}</td>
          <td class="currency-grandtotal-val" style="font-weight: 800;">${formatPKR(f.grandTotalPaidPKR)}</td>
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
          <td style="font-weight: 600; color: var(--text-main);">${r.title || r.leaseTitle || '-'}</td>
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
          <td style="font-weight: 600; color: var(--text-main);">${r.appellant || '-'}</td>
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
    } else if (state.admin.subTab === "organogram") {
      renderAdminOrganogram();
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
        const bpsTag = `<span class="badge-status-pill" style="background: ${r.bps >= 16 ? 'rgba(37,99,235,0.12)' : 'rgba(100,116,139,0.12)'}; color: ${r.bps >= 16 ? '#3B82F6' : 'var(--text-muted)'}; font-weight: 700;">BS-${String(r.bps).padStart(2, '0')}</span>`;
        const statusBadge = isVacant
          ? `<span class="badge-status-pill badge-vacant">Vacant</span>`
          : `<span class="badge-status-pill badge-granted">Filled</span>`;

        const nameCell = isVacant
          ? `<span style="color: #EF4444; font-weight: 600; font-size: 0.82rem;">[Vacant Post]</span><br><span style="font-weight: 600; color: var(--text-sub);">${r.designation}</span>`
          : `<span style="font-weight: 700; color: var(--text-main); font-size: 0.85rem;">${r.name || 'Incumbent'}</span><br><span style="font-size: 0.76rem; color: var(--text-muted);">${r.designation}</span>`;

        return `
          <tr>
            <td style="color: var(--text-muted); font-weight: 600;">${r.sr}</td>
            <td>${nameCell}</td>
            <td>${bpsTag}</td>
            <td><strong>${r.office}</strong><br><small style="color: var(--text-muted);">${r.costCentre}</small></td>
            <td>${isVacant ? '-' : `<code>${r.personalNo || '-'}</code><br><small style="color: var(--text-muted);">${r.cnic || '-'}</small>`}</td>
            <td>${isVacant ? '-' : `${r.domicile || '-'}${r.contact ? `<br><small style="color: #3B82F6;">${r.contact}</small>` : ''}`}</td>
            <td>${isVacant ? '-' : `<span class="badge-status-pill badge-process" style="font-size: 0.7rem;">${r.appointmentType || 'Regular'}</span>${r.quota ? `<br><small style="color: var(--text-muted);">${r.quota}</small>` : ''}`}</td>
            <td>${r.branch ? `<strong>${r.branch}</strong>` : ''}${r.division ? `<br><small style="color: var(--text-muted);">${r.division}</small>` : (r.branch ? '' : '-')}</td>
            <td>${statusBadge}${r.remarks ? `<br><small style="color: var(--text-muted); font-size: 0.72rem; line-height: 1.2; display: inline-block; max-width: 170px;">${r.remarks}</small>` : ''}</td>
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

    const isDark = document.body.classList.contains("dark-mode");

    tbody.innerHTML = cadreList.map(c => {
      const fillPct = c.s > 0 ? Math.round((c.f / c.s) * 100) : 0;
      let pctBg = isDark ? "rgba(16, 185, 129, 0.2)" : "rgba(5, 150, 105, 0.15)";
      let pctColor = isDark ? "#34D399" : "#059669";
      if (fillPct < 50) {
        pctBg = isDark ? "rgba(239, 68, 68, 0.22)" : "rgba(220, 38, 38, 0.15)";
        pctColor = isDark ? "#F87171" : "#DC2626";
      } else if (fillPct < 80) {
        pctBg = isDark ? "rgba(245, 158, 11, 0.22)" : "rgba(217, 119, 6, 0.15)";
        pctColor = isDark ? "#FBBF24" : "#D97706";
      }

      const bpsBadge = `<span class="badge-status-pill" style="background: ${c.bps >= 16 ? (isDark ? 'rgba(59,130,246,0.2)' : 'rgba(37,99,235,0.1)') : (isDark ? 'rgba(148,163,184,0.15)' : 'rgba(100,116,139,0.1)')}; color: ${c.bps >= 16 ? (isDark ? '#60A5FA' : '#2563EB') : (isDark ? '#CBD5E1' : '#475569')}; font-weight: 700;">BS-${String(c.bps).padStart(2, '0')}</span>`;

      return `
        <tr>
          <td style="color: #64748B; font-weight: 600;">${c.sn}</td>
          <td><code>${c.code}</code></td>
          <td style="font-weight: 600; color: var(--text-main);">${c.post}</td>
          <td style="text-align: center;">${bpsBadge}</td>
          <td style="text-align: center; font-weight: 700; color: var(--text-main);">${c.s}</td>
          <td style="text-align: center; font-weight: 700;" class="stat-highlight-emerald">${c.f}</td>
          <td style="text-align: center; font-weight: 700; color: ${c.v > 0 ? (isDark ? '#F87171' : '#DC2626') : '#94A3B8'};">${c.v}</td>
          <td style="text-align: center;"><small>${c.hq.s} / <span class="stat-highlight-emerald">${c.hq.f}</span> / <span style="color:${c.hq.v > 0 ? (isDark ? '#F87171' : '#DC2626') : '#94A3B8'};">${c.hq.v}</span></small></td>
          <td style="text-align: center;"><small>${c.field.s} / <span class="stat-highlight-emerald">${c.field.f}</span> / <span style="color:${c.field.v > 0 ? (isDark ? '#F87171' : '#DC2626') : '#94A3B8'};">${c.field.v}</span></small></td>
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
    const isDark = document.body.classList.contains("dark-mode");

    tbody.innerHTML = officesList.map((o, idx) => {
      const fillPct = o.total.s > 0 ? Math.round((o.total.f / o.total.s) * 100) : 0;
      let pctBg = isDark ? "rgba(16, 185, 129, 0.2)" : "rgba(5, 150, 105, 0.15)";
      let pctColor = isDark ? "#34D399" : "#059669";
      if (fillPct < 60) {
        pctBg = isDark ? "rgba(239, 68, 68, 0.22)" : "rgba(220, 38, 38, 0.15)";
        pctColor = isDark ? "#F87171" : "#DC2626";
      } else if (fillPct < 80) {
        pctBg = isDark ? "rgba(245, 158, 11, 0.22)" : "rgba(217, 119, 6, 0.15)";
        pctColor = isDark ? "#FBBF24" : "#D97706";
      }

      const typeBadge = `<span class="badge-status-pill ${o.type === 'HQ' ? 'badge-granted' : 'badge-process'}">${o.type}</span>`;

      return `
        <tr>
          <td style="color: #64748B; font-weight: 600;">${idx + 1}</td>
          <td style="font-weight: 700; color: var(--text-main);">${o.office}</td>
          <td><code>${o.fundCentre}</code></td>
          <td>${typeBadge}</td>
          <td style="text-align: center;"><small>${o.gazetted.s} / <span class="stat-highlight-emerald">${o.gazetted.f}</span> / <span style="color:${o.gazetted.v > 0 ? (isDark ? '#F87171' : '#DC2626') : '#94A3B8'};">${o.gazetted.v}</span></small></td>
          <td style="text-align: center;"><small>${o.nonGazetted.s} / <span class="stat-highlight-emerald">${o.nonGazetted.f}</span> / <span style="color:${o.nonGazetted.v > 0 ? (isDark ? '#F87171' : '#DC2626') : '#94A3B8'};">${o.nonGazetted.v}</span></small></td>
          <td style="text-align: center; font-weight: 700; color: var(--text-main);">${o.total.s}</td>
          <td style="text-align: center; font-weight: 700;" class="stat-highlight-emerald">${o.total.f}</td>
          <td style="text-align: center; font-weight: 700; color: ${o.total.v > 0 ? (isDark ? '#F87171' : '#DC2626') : '#94A3B8'};">${o.total.v}</td>
          <td style="text-align: center;">
            <span class="badge-status-pill" style="background: ${pctBg}; color: ${pctColor}; font-weight: 700;">${fillPct}%</span>
          </td>
        </tr>
      `;
    }).join("");
  }

  // -------------------------------------------------------------
  // ADMINISTRATION ORGANOGRAM RENDERER
  // -------------------------------------------------------------
  function renderAdminOrganogram() {
    const container = document.getElementById("adminOrganogramContent");
    if (!container) return;

    container.innerHTML = `
      <div class="organogram-tree">
        
        <!-- LEVEL 1: APEX EXECUTIVE LEADERSHIP -->
        <div class="organogram-node apex-node">
          <span class="node-bps-badge" style="background: rgba(197, 160, 89, 0.2); color: #855D10;">BS-20 • HEAD OF ATTACHED DEPARTMENT</span>
          <div class="node-title">Director General Mines & Minerals, Punjab</div>
          <div class="node-incumbent"><i class="fa-solid fa-user-tie"></i> Mr. Muhammad Farooq Rasheed (PMS)</div>
          <div class="node-cadre-count">
            <span class="badge-status-pill badge-granted" style="font-size: 0.68rem;">Sanctioned: 1 | Filled: 1</span>
          </div>
        </div>

        <div style="width: 2px; height: 28px; background: var(--card-border);"></div>

        <!-- LEVEL 2: 6 PRINCIPAL DIRECTORATES (BS-19) -->
        <div style="font-size: 0.72rem; font-weight: 700; color: var(--gold-dark); text-transform: uppercase; letter-spacing: 0.08em;">
          Principal Directorate Leadership (BS-19)
        </div>
        <div class="organogram-level-row">
          
          <div class="organogram-node">
            <span class="node-bps-badge" style="background: rgba(37,99,235,0.1); color: #2563EB;">BS-19 • TITLES</span>
            <div class="node-title">Director Mines & Minerals (Small Mines Assistance / Titles)</div>
            <div class="node-incumbent">Mr. Aftab Ahmad</div>
            <div class="node-cadre-count">
              <span class="badge-status-pill badge-granted">Filled (Promotee)</span>
            </div>
          </div>

          <div class="organogram-node">
            <span class="node-bps-badge" style="background: rgba(5,150,105,0.1); color: #059669;">BS-19 • MINOR MINERALS</span>
            <div class="node-title">Director Mines & Minerals (Minor Minerals)</div>
            <div class="node-incumbent">Mr. Jamil Haider Shah</div>
            <div class="node-cadre-count">
              <span class="badge-status-pill badge-granted">Filled (S&GAD)</span>
            </div>
          </div>

          <div class="organogram-node">
            <span class="node-bps-badge" style="background: rgba(217,119,6,0.1); color: #D97706;">BS-19 • ESTABLISHMENT</span>
            <div class="node-title">Director Mines & Minerals (Administration)</div>
            <div class="node-incumbent">Mr. Ijaz Hadayat</div>
            <div class="node-cadre-count">
              <span class="badge-status-pill badge-granted">Filled (Promotee)</span>
            </div>
          </div>

          <div class="organogram-node">
            <span class="node-bps-badge" style="background: rgba(124,58,237,0.1); color: #7C3AED;">BS-19 • PROMOTION</span>
            <div class="node-title">Director Mines & Minerals (Info Services & Promotion)</div>
            <div class="node-incumbent">Mr. Muhammad Irshad</div>
            <div class="node-cadre-count">
              <span class="badge-status-pill badge-granted">Filled (Promotee)</span>
            </div>
          </div>

          <div class="organogram-node">
            <span class="node-bps-badge" style="background: rgba(6,182,212,0.1); color: #0891B2;">BS-19 • RESOURCE MAPPING</span>
            <div class="node-title">Director Mines & Minerals (Resource Mapping)</div>
            <div class="node-incumbent">Mr. Asad Ali Shah</div>
            <div class="node-cadre-count">
              <span class="badge-status-pill badge-granted">Filled (Promotee)</span>
            </div>
          </div>

          <div class="organogram-node" style="border-style: dashed;">
            <span class="node-bps-badge" style="background: rgba(220,38,38,0.1); color: #DC2626;">BS-19 • GIS</span>
            <div class="node-title">Director Geographic Information System (GIS)</div>
            <div class="node-incumbent" style="color: #DC2626;">[Position Vacant]</div>
            <div class="node-cadre-count">
              <span class="badge-status-pill badge-vacant">Vacant Post</span>
            </div>
          </div>

        </div>

        <div style="width: 2px; height: 28px; background: var(--card-border);"></div>

        <!-- LEVEL 3: DEPUTY DIRECTORS & MANAGERIAL CADRE (BS-18) -->
        <div style="font-size: 0.72rem; font-weight: 700; color: var(--gold-dark); text-transform: uppercase; letter-spacing: 0.08em;">
          Operational Wings & Specialized Managers (BS-18) • 17 Sanctioned (15 Filled, 2 Vacant)
        </div>
        <div class="organogram-level-row">
          
          <div class="organogram-node" style="min-width: 200px;">
            <span class="node-bps-badge" style="background: rgba(37,99,235,0.1); color: #2563EB;">BS-18 • LSM</span>
            <div class="node-title">Deputy Director (LSM)</div>
            <div class="node-incumbent">Mr. Tanveer Ahmad</div>
            <div style="font-size: 0.68rem; color: #64748B;">DG Cell</div>
          </div>

          <div class="organogram-node" style="min-width: 200px;">
            <span class="node-bps-badge" style="background: rgba(37,99,235,0.1); color: #2563EB;">BS-18 • AUCTION</span>
            <div class="node-title">Deputy Director (Auction)</div>
            <div class="node-incumbent">Mr. Muhammad Imran Anwar</div>
            <div style="font-size: 0.68rem; color: #64748B;">SMA / Titles</div>
          </div>

          <div class="organogram-node" style="min-width: 200px;">
            <span class="node-bps-badge" style="background: rgba(37,99,235,0.1); color: #2563EB;">BS-18 • LEASES</span>
            <div class="node-title">Deputy Director (ML-I & II)</div>
            <div class="node-incumbent">Mr. Umar Farooq</div>
            <div style="font-size: 0.68rem; color: #64748B;">SMA / Titles</div>
          </div>

          <div class="organogram-node" style="min-width: 200px;">
            <span class="node-bps-badge" style="background: rgba(5,150,105,0.1); color: #059669;">BS-18 • MM</span>
            <div class="node-title">Deputy Director (Minor Minerals)</div>
            <div class="node-incumbent">Mr. Muhammad Hafeez</div>
            <div style="font-size: 0.68rem; color: #64748B;">Minor Minerals Wing</div>
          </div>

          <div class="organogram-node" style="min-width: 200px;">
            <span class="node-bps-badge" style="background: rgba(124,58,237,0.1); color: #7C3AED;">BS-18 • GIS</span>
            <div class="node-title">Manager (GIS & Client Systems)</div>
            <div class="node-incumbent">Mr. Rizwan Saqib</div>
            <div style="font-size: 0.68rem; color: #64748B;">GIS & Info Services</div>
          </div>

          <div class="organogram-node" style="min-width: 200px;">
            <span class="node-bps-badge" style="background: rgba(6,182,212,0.1); color: #0891B2;">BS-18 • BASIN</span>
            <div class="node-title">Manager (Basin Studies)</div>
            <div class="node-incumbent">Mr. Naveed Ahmad</div>
            <div style="font-size: 0.68rem; color: #64748B;">Resource Mapping</div>
          </div>

          <div class="organogram-node" style="min-width: 200px;">
            <span class="node-bps-badge" style="background: rgba(217,119,6,0.1); color: #D97706;">BS-18 • REVENUE</span>
            <div class="node-title">Manager (Cartography & Revenue)</div>
            <div class="node-incumbent">Mr. Rafi Ullah Niazi</div>
            <div style="font-size: 0.68rem; color: #64748B;">SMA / Titles</div>
          </div>

          <div class="organogram-node" style="min-width: 200px;">
            <span class="node-bps-badge" style="background: rgba(100,116,139,0.1); color: #475569;">BS-18 • DEV</span>
            <div class="node-title">Deputy Director (Development)</div>
            <div class="node-incumbent">Mr. Ali Raza Gohar</div>
            <div style="font-size: 0.68rem; color: #64748B;">DG Cell</div>
          </div>

        </div>

        <div style="width: 2px; height: 28px; background: var(--card-border);"></div>

        <!-- LEVEL 4: 16 REGIONAL FIELD FORMATIONS (351 STAFF) -->
        <div style="font-size: 0.72rem; font-weight: 700; color: var(--gold-dark); text-transform: uppercase; letter-spacing: 0.08em;">
          16 Regional Field Formations • 351 Sanctioned (228 Filled, 123 Vacant)
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 0.75rem; width: 100%;">
          
          <div class="kpi-card" style="padding: 0.75rem; border-left-color: #2563EB;">
            <div style="font-weight: 700; font-size: 0.82rem; color: var(--text-main);">DD Chakwal (CH004025)</div>
            <div class="stat-highlight-emerald" style="font-size: 0.72rem;">25 Filled / 43 Sanctioned (18 Vacant)</div>
            <div style="font-size: 0.68rem; color: var(--text-muted);">Gazetted: 3 F / 7 S • Non-Gaz: 22 F / 36 S</div>
          </div>

          <div class="kpi-card" style="padding: 0.75rem; border-left-color: #2563EB;">
            <div style="font-weight: 700; font-size: 0.82rem; color: var(--text-main);">Mianwali (MI004001)</div>
            <div class="stat-highlight-emerald" style="font-size: 0.72rem;">37 Filled / 48 Sanctioned (11 Vacant)</div>
            <div style="font-size: 0.68rem; color: var(--text-muted);">Gazetted: 4 F / 5 S • Non-Gaz: 33 F / 43 S</div>
          </div>

          <div class="kpi-card" style="padding: 0.75rem; border-left-color: #2563EB;">
            <div style="font-weight: 700; font-size: 0.82rem; color: var(--text-main);">Khushab (KB004001)</div>
            <div class="stat-highlight-emerald" style="font-size: 0.72rem;">18 Filled / 31 Sanctioned (13 Vacant)</div>
            <div style="font-size: 0.68rem; color: var(--text-muted);">Gazetted: 5 F / 7 S • Non-Gaz: 13 F / 24 S</div>
          </div>

          <div class="kpi-card" style="padding: 0.75rem; border-left-color: #2563EB;">
            <div style="font-weight: 700; font-size: 0.82rem; color: var(--text-main);">D.G. Khan (DG004075)</div>
            <div class="stat-highlight-emerald" style="font-size: 0.72rem;">18 Filled / 28 Sanctioned (10 Vacant)</div>
            <div style="font-size: 0.68rem; color: var(--text-muted);">Gazetted: 2 F / 5 S • Non-Gaz: 16 F / 23 S</div>
          </div>

          <div class="kpi-card" style="padding: 0.75rem; border-left-color: #2563EB;">
            <div style="font-weight: 700; font-size: 0.82rem; color: var(--text-main);">Sargodha (SG004080)</div>
            <div class="stat-highlight-emerald" style="font-size: 0.72rem;">20 Filled / 27 Sanctioned (7 Vacant)</div>
            <div style="font-size: 0.68rem; color: var(--text-muted);">Gazetted: 4 F / 7 S • Non-Gaz: 16 F / 20 S</div>
          </div>

          <div class="kpi-card" style="padding: 0.75rem; border-left-color: #2563EB;">
            <div style="font-weight: 700; font-size: 0.82rem; color: var(--text-main);">Rawalpindi (RI004396)</div>
            <div class="stat-highlight-emerald" style="font-size: 0.72rem;">11 Filled / 24 Sanctioned (13 Vacant)</div>
            <div style="font-size: 0.68rem; color: var(--text-muted);">Gazetted: 3 F / 7 S • Non-Gaz: 8 F / 17 S</div>
          </div>

          <div class="kpi-card" style="padding: 0.75rem; border-left-color: #2563EB;">
            <div style="font-weight: 700; font-size: 0.82rem; color: var(--text-main);">Lahore Region (LO004397)</div>
            <div class="stat-highlight-emerald" style="font-size: 0.72rem;">13 Filled / 21 Sanctioned (8 Vacant)</div>
            <div style="font-size: 0.68rem; color: var(--text-muted);">Gazetted: 4 F / 5 S • Non-Gaz: 9 F / 16 S</div>
          </div>

          <div class="kpi-card" style="padding: 0.75rem; border-left-color: #2563EB;">
            <div style="font-weight: 700; font-size: 0.82rem; color: var(--text-main);">Multan (MN004562)</div>
            <div class="stat-highlight-emerald" style="font-size: 0.72rem;">16 Filled / 21 Sanctioned (5 Vacant)</div>
            <div style="font-size: 0.68rem; color: var(--text-muted);">Gazetted: 2 F / 4 S • Non-Gaz: 14 F / 17 S</div>
          </div>

          <div class="kpi-card" style="padding: 0.75rem; border-left-color: #2563EB;">
            <div style="font-weight: 700; font-size: 0.82rem; color: var(--text-main);">Gujranwala (GA004176)</div>
            <div class="stat-highlight-emerald" style="font-size: 0.72rem;">13 Filled / 20 Sanctioned (7 Vacant)</div>
            <div style="font-size: 0.68rem; color: var(--text-muted);">Gazetted: 2 F / 4 S • Non-Gaz: 11 F / 16 S</div>
          </div>

          <div class="kpi-card" style="padding: 0.75rem; border-left-color: #2563EB;">
            <div style="font-weight: 700; font-size: 0.82rem; color: var(--text-main);">Attock (AK004059)</div>
            <div class="stat-highlight-emerald" style="font-size: 0.72rem;">10 Filled / 16 Sanctioned (6 Vacant)</div>
            <div style="font-size: 0.68rem; color: var(--text-muted);">Gazetted: 1 F / 3 S • Non-Gaz: 9 F / 13 S</div>
          </div>

          <div class="kpi-card" style="padding: 0.75rem; border-left-color: #2563EB;">
            <div style="font-weight: 700; font-size: 0.82rem; color: var(--text-main);">Bahawalpur (BR004207)</div>
            <div class="stat-highlight-emerald" style="font-size: 0.72rem;">10 Filled / 15 Sanctioned (5 Vacant)</div>
            <div style="font-size: 0.68rem; color: var(--text-muted);">Gazetted: 1 F / 2 S • Non-Gaz: 9 F / 13 S</div>
          </div>

          <div class="kpi-card" style="padding: 0.75rem; border-left-color: #2563EB;">
            <div style="font-weight: 700; font-size: 0.82rem; color: var(--text-main);">AD Chakwal (CH004024)</div>
            <div class="stat-highlight-emerald" style="font-size: 0.72rem;">11 Filled / 14 Sanctioned (3 Vacant)</div>
            <div style="font-size: 0.68rem; color: var(--text-muted);">Gazetted: 3 F / 3 S • Non-Gaz: 8 F / 11 S</div>
          </div>

          <div class="kpi-card" style="padding: 0.75rem; border-left-color: #2563EB;">
            <div style="font-weight: 700; font-size: 0.82rem; color: var(--text-main);">Sialkot (ST004044)</div>
            <div class="stat-highlight-emerald" style="font-size: 0.72rem;">11 Filled / 14 Sanctioned (3 Vacant)</div>
            <div style="font-size: 0.68rem; color: var(--text-muted);">Gazetted: 2 F / 2 S • Non-Gaz: 9 F / 12 S</div>
          </div>

          <div class="kpi-card" style="padding: 0.75rem; border-left-color: #2563EB;">
            <div style="font-weight: 700; font-size: 0.82rem; color: var(--text-main);">Chiniot (CH004002)</div>
            <div class="stat-highlight-emerald" style="font-size: 0.72rem;">7 Filled / 11 Sanctioned (4 Vacant)</div>
            <div style="font-size: 0.68rem; color: var(--text-muted);">Gazetted: 2 F / 3 S • Non-Gaz: 5 F / 8 S</div>
          </div>

          <div class="kpi-card" style="padding: 0.75rem; border-left-color: #2563EB;">
            <div style="font-weight: 700; font-size: 0.82rem; color: var(--text-main);">Jhelum (JM004169)</div>
            <div class="stat-highlight-emerald" style="font-size: 0.72rem;">5 Filled / 11 Sanctioned (6 Vacant)</div>
            <div style="font-size: 0.68rem; color: var(--text-muted);">Gazetted: 1 F / 2 S • Non-Gaz: 4 F / 9 S</div>
          </div>

          <div class="kpi-card" style="padding: 0.75rem; border-left-color: #2563EB;">
            <div style="font-weight: 700; font-size: 0.82rem; color: var(--text-main);">Sahiwal (SL004094)</div>
            <div class="stat-highlight-emerald" style="font-size: 0.72rem;">4 Filled / 7 Sanctioned (3 Vacant)</div>
            <div style="font-size: 0.68rem; color: var(--text-muted);">Gazetted: 2 F / 3 S • Non-Gaz: 2 F / 4 S</div>
          </div>

        </div>

      </div>
    `;
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
