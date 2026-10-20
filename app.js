// ===================================================================
// GOVERNMENT OF THE PUNJAB — DIRECTORATE GENERAL OF MINES & MINERALS
// EXECUTIVE MONITORING & REVENUE OPERATIONS PORTAL
// MASTER APPLICATION CONTROLLER (app.js) - VERSION 4.1
// ===================================================================

document.addEventListener("DOMContentLoaded", () => {
  const db = window.DGM_DATA || {};
  const executive = db.executive || {};
  const divisions = db.divisions || { lsm: {}, sma: {}, mm: {} };

  // -------------------------------------------------------------
  // STATE MANAGEMENT
  // -------------------------------------------------------------
  const state = {
    activeTab: "tab-overview",
    searchQuery: "",
    
    // Large Scale Mining (LSM)
    lsm: {
      category: "leases",      // "leases" | "exploration" | "pending"
      explFilter: "valid",     // "valid" | "cancelled"
      page: 1,
      pageSize: 15,
      district: "ALL"
    },

    // Small Scale Mining (SMA)
    sma: {
      category: "leases",      // "leases" | "prospecting" | "matrix"
      mode: "auction",         // "auction" | "application"
      page: 1,
      pageSize: 15,
      district: "ALL",
      mineral: "ALL"
    },

    // Minor Minerals (MM)
    mm: {
      subTab: "all",           // "all" | "upcoming" | "vacant"
      page: 1,
      pageSize: 15,
      district: "ALL",
      mineral: "ALL"
    },

    // EPA Clearances
    epa: {
      page: 1,
      pageSize: 15,
      district: "ALL"
    },

    // Appeals
    appeals: {
      page: 1,
      pageSize: 15,
      district: "ALL"
    }
  };

  // -------------------------------------------------------------
  // INITIALIZATION
  // -------------------------------------------------------------
  initClock();
  initSidebar();
  populateFilterDropdowns();
  renderActiveTab();
  initGlobalSearch();
  initExport();

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
  // SIDEBAR & TAB SWITCHING
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
      "tab-appeals": { section: "Legal Proceedings", title: "Appellate Authority Pendency Tracker" }
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
  // POPULATE FILTER DROPDOWNS
  // -------------------------------------------------------------
  function populateFilterDropdowns() {
    const allDistricts = new Set();
    const allMinerals = new Set();

    (divisions.lsm?.leases || []).forEach(l => { if (l.district) allDistricts.add(l.district); if (l.mineral) allMinerals.add(l.mineral); });
    (divisions.sma?.auctionConcessions || []).forEach(c => { if (c.district) allDistricts.add(c.district); if (c.mineral) allMinerals.add(c.mineral); });
    (divisions.sma?.applicationConcessions || []).forEach(c => { if (c.district) allDistricts.add(c.district); if (c.mineral) allMinerals.add(c.mineral); });
    (divisions.mm?.blocks || []).forEach(b => { if (b.district) allDistricts.add(b.district); if (b.mineral) allMinerals.add(b.mineral); });

    const sortedDistricts = Array.from(allDistricts).sort();
    const sortedMinerals = Array.from(allMinerals).sort();

    function fillSelect(selectId, items, placeholder = "All") {
      const el = document.getElementById(selectId);
      if (!el) return;
      const current = el.value;
      el.innerHTML = `<option value="ALL">${placeholder}</option>`;
      items.forEach(item => {
        const opt = document.createElement("option");
        opt.value = item;
        opt.textContent = item;
        el.appendChild(opt);
      });
      el.value = current || "ALL";
    }

    fillSelect("lsmDistrictFilter", sortedDistricts, "All Districts");
    fillSelect("smaDistrictFilter", sortedDistricts, "All Districts");
    fillSelect("smaMineralFilter", sortedMinerals, "All Minerals");
    fillSelect("mmDistrictFilter", sortedDistricts, "All Districts");
    fillSelect("mmMineralFilter", sortedMinerals, "All Minerals");
    fillSelect("mapMineralFilter", sortedMinerals, "All Minerals");
    fillSelect("epaDistrictSelect", sortedDistricts, "All Districts");
    fillSelect("appealsDistrictSelect", sortedDistricts, "All Districts");
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
    }
  }

  // -------------------------------------------------------------
  // LARGE SCALE MINING (LSM) RENDERER
  // -------------------------------------------------------------
  function renderLsm() {
    const thead = document.getElementById("lsmTableHead");
    const tbody = document.getElementById("lsmTableBody");
    const pageInfo = document.getElementById("lsmPageInfo");
    const explToggles = document.getElementById("lsmExplorationToggles");
    const lsmData = divisions.lsm || {};

    // Toggle secondary exploration bar
    if (explToggles) {
      explToggles.style.display = state.lsm.category === "exploration" ? "flex" : "none";
    }

    let records = [];
    let headers = [];

    if (state.lsm.category === "leases") {
      headers = ["Sr", "Company Name", "License Number", "Area (Acres)", "Mineral", "District", "Location", "Grant Date", "Expiry Date", "Status"];
      records = lsmData.leases || [];
    } else if (state.lsm.category === "exploration") {
      if (state.lsm.explFilter === "valid") {
        headers = ["Sr", "Licensee Name", "License #", "Area (Acres)", "Mineral", "District", "Location", "From", "To", "Status"];
        records = lsmData.explorationValid || [];
      } else {
        headers = ["Sr", "Licensee Name", "License #", "Area (Acres)", "Mineral", "District", "Location", "Period", "Status", "Remarks"];
        records = lsmData.explorationCancelled || [];
      }
    } else if (state.lsm.category === "pending") {
      headers = ["Sr", "Applicant Name", "Application #", "Date", "Area (Acres)", "Category", "District", "Mineral", "Location", "Status"];
      records = lsmData.pendingApplications || [];
    }

    // Filter by district
    if (state.lsm.district !== "ALL") {
      records = records.filter(r => (r.district || "").toLowerCase() === state.lsm.district.toLowerCase());
    }

    // Filter by search query
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      records = records.filter(r => JSON.stringify(r).toLowerCase().includes(q));
    }

    thead.innerHTML = `<tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr>`;

    // Pagination
    const total = records.length;
    const start = (state.lsm.page - 1) * state.lsm.pageSize;
    const pageRecords = records.slice(start, start + state.lsm.pageSize);

    if (pageRecords.length === 0) {
      tbody.innerHTML = `<tr><td colspan="${headers.length}" style="text-align:center; padding: 2.5rem; color: #94A3B8;">No records found.</td></tr>`;
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
              <td>${r.district || '-'}</td>
              <td><small>${r.location || '-'}</small></td>
              <td>${r.grantDate || '-'}</td>
              <td>${r.expiryDate || '-'}</td>
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
                <td>${r.district || '-'}</td>
                <td><small>${r.location || '-'}</small></td>
                <td>${r.from || '-'}</td>
                <td>${r.to || '-'}</td>
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
                <td>${r.district || '-'}</td>
                <td><small>${r.location || '-'}</small></td>
                <td>${r.from} to ${r.to}</td>
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
              <td>${r.appDate || '-'}</td>
              <td>${formatNumber(r.area)} ac</td>
              <td><strong>${r.category || '-'}</strong></td>
              <td>${r.district || '-'}</td>
              <td><span class="badge-status-pill badge-process">${r.mineral || '-'}</span></td>
              <td><small>${r.location || '-'}</small></td>
              <td><span class="badge-status-pill badge-vacant">${r.status || 'Under Process'}</span></td>
            </tr>
          `;
        }
      }).join("");
    }

    const end = Math.min(start + state.lsm.pageSize, total);
    pageInfo.textContent = total > 0 ? `Showing ${start + 1} to ${end} of ${total} records` : `0 records`;
    document.getElementById("btnPrevLsm").disabled = state.lsm.page <= 1;
    document.getElementById("btnNextLsm").disabled = end >= total;
  }

  // LSM Category Sub-tab buttons
  document.querySelectorAll("[data-lsm-sub]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-lsm-sub]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.lsm.category = btn.getAttribute("data-lsm-sub");
      state.lsm.page = 1;
      renderLsm();
    });
  });

  // Exploration Sub-toggle buttons
  document.querySelectorAll("[data-lsm-expl]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-lsm-expl]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.lsm.explFilter = btn.getAttribute("data-lsm-expl");
      state.lsm.page = 1;
      renderLsm();
    });
  });

  document.getElementById("lsmDistrictFilter")?.addEventListener("change", (e) => {
    state.lsm.district = e.target.value;
    state.lsm.page = 1;
    renderLsm();
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
    const modeToggles = document.getElementById("smaModeToggles");
    const smaData = divisions.sma || {};

    // Show mode toggles only when category is "leases"
    if (modeToggles) {
      modeToggles.style.display = state.sma.category === "leases" ? "flex" : "none";
    }

    let records = [];
    let headers = [];

    if (state.sma.category === "leases") {
      if (state.sma.mode === "auction") {
        headers = ["Sr", "Block Code", "Block Name", "Mineral", "District", "Status", "Lessee Name", "Grant Date", "Expiry Date", "Operative Bid (PKR)", "Reserve Price (PKR)"];
        // Filter auction concessions where type is "Mining Lease"
        records = (smaData.auctionConcessions || []).filter(c => c.type === "Mining Lease");
      } else {
        headers = ["Concession #", "Client / Lessee", "Mineral", "Type", "District", "Acreage", "Grant Date", "Expiry Date", "Status"];
        // Filter application concessions where type is "Mining Lease"
        records = (smaData.applicationConcessions || []).filter(c => c.type === "Mining Lease");
      }
    } else if (state.sma.category === "prospecting") {
      headers = ["License / Concession #", "Title / Client", "Mode", "Mineral", "District", "Grant Date", "Expiry Date", "Status"];
      // Combine Prospecting Licenses from auction and application
      const auctionPL = (smaData.auctionConcessions || []).filter(c => c.type === "Prospecting License").map(c => ({
        code: c.block,
        title: c.lessee || c.blockName,
        mode: "Auction Mode",
        mineral: c.mineral,
        district: c.district,
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
        grantDate: c.grantDate,
        expiryDate: c.expiryDate,
        status: c.status
      }));
      records = [...auctionPL, ...appPL];
    } else if (state.sma.category === "matrix") {
      headers = ["District", "Limestone", "Gypsum", "Silica Sand", "Coal", "Fireclay", "Bentonite", "Iron Ore", "Bauxite", "Latrite", "Celestite", "Fuller Earth", "Total Titles"];
      records = smaData.districtMatrix || [];
    }

    // Apply District & Mineral Filters (except matrix)
    if (state.sma.category !== "matrix") {
      if (state.sma.district !== "ALL") {
        records = records.filter(r => (r.district || "").toLowerCase() === state.sma.district.toLowerCase());
      }
      if (state.sma.mineral !== "ALL") {
        records = records.filter(r => (r.mineral || "").toLowerCase() === state.sma.mineral.toLowerCase());
      }
      if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase();
        records = records.filter(r => JSON.stringify(r).toLowerCase().includes(q));
      }
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
                <td><strong>${r.srNo}</strong></td>
                <td><code>${r.block}</code></td>
                <td style="font-weight: 600; color: #0F172A;">${r.blockName}</td>
                <td><span class="badge-status-pill badge-process">${r.mineral}</span></td>
                <td>${r.district}</td>
                <td><span class="badge-status-pill ${r.status === 'Granted' ? 'badge-granted' : 'badge-vacant'}">${r.status}</span></td>
                <td>${r.lessee || '-'}</td>
                <td>${r.grantDate || '-'}</td>
                <td>${r.expiryDate || '-'}</td>
                <td style="font-weight: 700; color: #166534;">${formatPKR(r.operativeBid)}</td>
                <td style="color: #64748B;">${formatPKR(r.reservePrice)}</td>
              </tr>
            `;
          } else {
            return `
              <tr>
                <td><code>${r.concessionNo}</code></td>
                <td style="font-weight: 600; color: #0F172A;">${r.client}</td>
                <td><span class="badge-status-pill badge-process">${r.mineral}</span></td>
                <td>${r.type}</td>
                <td>${r.district}</td>
                <td>${formatNumber(r.acreage)} ac</td>
                <td>${r.grantDate || '-'}</td>
                <td>${r.expiryDate || '-'}</td>
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
              <td>${r.district}</td>
              <td>${r.grantDate || '-'}</td>
              <td>${r.expiryDate || '-'}</td>
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
    pageInfo.textContent = isMatrix ? `Total Districts: ${total}` : (total > 0 ? `Showing ${start + 1} to ${end} of ${total} records` : `0 records`);
    document.getElementById("btnPrevSma").disabled = isMatrix || state.sma.page <= 1;
    document.getElementById("btnNextSma").disabled = isMatrix || end >= total;
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

  // SMA Mode Toggles (Auction vs Application)
  document.querySelectorAll("[data-sma-mode]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-sma-mode]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.sma.mode = btn.getAttribute("data-sma-mode");
      state.sma.page = 1;
      renderSma();
    });
  });

  document.getElementById("smaDistrictFilter")?.addEventListener("change", (e) => {
    state.sma.district = e.target.value;
    state.sma.page = 1;
    renderSma();
  });
  document.getElementById("smaMineralFilter")?.addEventListener("change", (e) => {
    state.sma.mineral = e.target.value;
    state.sma.page = 1;
    renderSma();
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
    const mmData = divisions.mm || {};

    let records = mmData.blocks || [];
    if (state.mm.subTab === "upcoming") {
      records = mmData.upcomingAuctions || [];
    } else if (state.mm.subTab === "vacant") {
      records = (mmData.blocks || []).filter(b => b.status === "Vacant");
    }

    if (state.mm.district !== "ALL") {
      records = records.filter(r => (r.district || "").toLowerCase() === state.mm.district.toLowerCase());
    }
    if (state.mm.mineral !== "ALL") {
      records = records.filter(r => (r.mineral || "").toLowerCase() === state.mm.mineral.toLowerCase());
    }
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      records = records.filter(r => JSON.stringify(r).toLowerCase().includes(q));
    }

    const headers = ["ID", "District", "Mineral", "Block / Zone Title", "Area (Acres)", "Status", "Reserve Price (PKR)", "Auction Dates (1st / 2nd / 3rd)", "Remarks"];
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
          <td style="font-weight: 600;">${r.district}</td>
          <td><span class="badge-status-pill badge-process">${r.mineral}</span></td>
          <td style="font-weight: 600; color: #0F172A;">${r.name || r.code}</td>
          <td>${formatNumber(r.area)} ac</td>
          <td><span class="badge-status-pill ${r.status === 'Granted' ? 'badge-granted' : 'badge-vacant'}">${r.status}</span></td>
          <td style="font-weight: 700; color: #15803D;">${formatPKR(r.reservePrice)}</td>
          <td><small>${r.firstAuctionDate ? `${r.firstAuctionDate} / ${r.secondAuctionDate}` : '-'}</small></td>
          <td><small style="color: #64748B;">${r.remarks ? r.remarks.slice(0, 80) + '...' : '-'}</small></td>
        </tr>
      `).join("");
    }

    const end = Math.min(start + state.mm.pageSize, total);
    pageInfo.textContent = total > 0 ? `Showing ${start + 1} to ${end} of ${total} records` : `0 records`;
    document.getElementById("btnPrevMm").disabled = state.mm.page <= 1;
    document.getElementById("btnNextMm").disabled = end >= total;
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

  document.getElementById("mmDistrictFilter")?.addEventListener("change", (e) => {
    state.mm.district = e.target.value;
    state.mm.page = 1;
    renderMm();
  });
  document.getElementById("mmMineralFilter")?.addEventListener("change", (e) => {
    state.mm.mineral = e.target.value;
    state.mm.page = 1;
    renderMm();
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
    let records = db.epaCases || [];

    if (state.epa.district !== "ALL") {
      records = records.filter(r => (r.district || "").toLowerCase() === state.epa.district.toLowerCase());
    }
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      records = records.filter(r => JSON.stringify(r).toLowerCase().includes(q));
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
          <td style="font-weight: 600;">${r.district} <small style="color: #64748B;">(${r.division})</small></td>
          <td style="font-weight: 600; color: #0F172A;">${r.leaseTitle}</td>
          <td><span class="badge-status-pill badge-process">${r.mineral}</span></td>
          <td><small>${r.method || 'e-Biz Portal'}</small></td>
          <td>${r.appDate || '-'}</td>
          <td><small style="color: #64748B;">${r.reasonForDelay || '-'}</small></td>
          <td><span class="badge-status-pill badge-vacant">${r.daecStatus || 'Pending Meeting'}</span></td>
        </tr>
      `).join("");
    }

    const end = Math.min(start + state.epa.pageSize, total);
    pageInfo.textContent = total > 0 ? `Showing ${start + 1} to ${end} of ${total} records` : `0 records`;
    document.getElementById("btnPrevEpa").disabled = state.epa.page <= 1;
    document.getElementById("btnNextEpa").disabled = end >= total;
  }

  document.getElementById("epaDistrictSelect")?.addEventListener("change", (e) => {
    state.epa.district = e.target.value;
    state.epa.page = 1;
    renderEpa();
  });
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
    let records = db.appealsCases || [];

    if (state.appeals.district !== "ALL") {
      records = records.filter(r => (r.district || "").toLowerCase() === state.appeals.district.toLowerCase());
    }
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      records = records.filter(r => JSON.stringify(r).toLowerCase().includes(q));
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
          <td style="font-weight: 600;">${r.district}</td>
          <td style="font-weight: 600; color: #0F172A;">${r.appellant}</td>
          <td><span class="badge-status-pill badge-process">${r.respondentWing || 'Directorate'}</span></td>
          <td><small>${r.subject || '-'}</small></td>
          <td>${r.hearingDate || '-'}</td>
          <td><span class="badge-status-pill badge-vacant">${r.status || 'Pending'}</span></td>
        </tr>
      `).join("");
    }

    const end = Math.min(start + state.appeals.pageSize, total);
    pageInfo.textContent = total > 0 ? `Showing ${start + 1} to ${end} of ${total} records` : `0 records`;
    document.getElementById("btnPrevAppeals").disabled = state.appeals.page <= 1;
    document.getElementById("btnNextAppeals").disabled = end >= total;
  }

  document.getElementById("appealsDistrictSelect")?.addEventListener("change", (e) => {
    state.appeals.district = e.target.value;
    state.appeals.page = 1;
    renderAppeals();
  });
  document.getElementById("btnPrevAppeals")?.addEventListener("click", () => {
    if (state.appeals.page > 1) { state.appeals.page--; renderAppeals(); }
  });
  document.getElementById("btnNextAppeals")?.addEventListener("click", () => {
    state.appeals.page++; renderAppeals();
  });

  // -------------------------------------------------------------
  // GLOBAL CROSS-SEARCH CONTROLLER
  // -------------------------------------------------------------
  function initGlobalSearch() {
    const input = document.getElementById("globalOmniSearch");
    if (!input) return;

    let debounceTimer;
    input.addEventListener("input", (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        state.searchQuery = e.target.value.trim();
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
          exportData = state.lsm.category === "leases" ? divisions.lsm.leases : divisions.lsm.pendingApplications;
          filename = `DGMM_LSM_${state.lsm.category}.xlsx`;
          break;
        case "tab-sma":
          exportData = state.sma.category === "leases" 
            ? (state.sma.mode === "auction" ? divisions.sma.auctionConcessions : divisions.sma.applicationConcessions)
            : divisions.sma.auctionConcessions;
          filename = `DGMM_SMA_${state.sma.category}.xlsx`;
          break;
        case "tab-mm":
          exportData = divisions.mm.blocks;
          filename = "DGMM_Minor_Minerals_Blocks.xlsx";
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
        default:
          exportData = divisions.mm.blocks;
          filename = "DGMM_Executive_Export.xlsx";
      }

      if (!exportData || exportData.length === 0) {
        alert("No data available to export in the current view.");
        return;
      }

      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "DGM&M Export");
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
