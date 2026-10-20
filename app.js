// ===================================================================
// GOVERNMENT OF THE PUNJAB — DIRECTORATE GENERAL OF MINES & MINERALS
// EXECUTIVE OPERATIONS & MONITORING PORTAL (V3.0)
// CLIENT APPLICATION LOGIC (app.js)
// ===================================================================

document.addEventListener("DOMContentLoaded", () => {
  // -----------------------------------------------------------------
  // 1. STATE INITIALIZATION
  // -----------------------------------------------------------------
  const rawData = window.DGM_DATA || {};

  // Load EPA Cases
  let epaCases = [];
  try {
    const savedEpa = localStorage.getItem("dgmm_epa_v3");
    if (savedEpa) {
      epaCases = JSON.parse(savedEpa);
    } else {
      epaCases = rawData.epaCases || [];
      localStorage.setItem("dgmm_epa_v3", JSON.stringify(epaCases));
    }
  } catch (e) {
    epaCases = rawData.epaCases || [];
  }

  // Load Auction, Subletting, Renewals & Appeals Datasets
  const auctionRecords = rawData.auctionRecords || [];
  const sublettingCases = rawData.sublettingCases || [];
  const renewalsDecided = rawData.renewalsDecided || [];
  const appealsCases = rawData.appealsCases || [];

  // Filter States
  const mapFilters = {
    mineral: "ALL",
    zone: "ALL",
    scale: "ALL"
  };

  const epaFilters = {
    district: "ALL",
    chip: "ALL",
    search: "",
    page: 1,
    rowsPerPage: 25
  };

  const appealsFilters = {
    category: "ALL",
    search: "",
    page: 1,
    rowsPerPage: 20
  };

  let punjabMap = null;
  let mapMarkersLayer = null;
  let recoveryChart = null;
  let districtsChart = null;
  let fiveYearChart = null;
  let chartMode = "COMBINED";

  // -----------------------------------------------------------------
  // 2. LIVE PKT CLOCK INITIALIZATION
  // -----------------------------------------------------------------
  function updatePktClock() {
    const clockEl = document.getElementById("livePktTime");
    if (!clockEl) return;
    const now = new Date();
    const options = {
      timeZone: "Asia/Karachi",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    };
    try {
      const formatter = new Intl.DateTimeFormat("en-GB", options);
      clockEl.textContent = formatter.format(now) + " PKT";
    } catch (e) {
      clockEl.textContent = now.toUTCString();
    }
  }
  updatePktClock();
  setInterval(updatePktClock, 1000);

  // -----------------------------------------------------------------
  // 3. TOAST NOTIFICATIONS & UTILITIES
  // -----------------------------------------------------------------
  function showToast(message, type = "success") {
    const container = document.getElementById("toastContainer");
    if (!container) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    let icon = "fa-circle-check";
    if (type === "warning") icon = "fa-triangle-exclamation";
    if (type === "error") icon = "fa-circle-xmark";
    toast.innerHTML = `<i class="fa-solid ${icon}" style="color: var(--gold-primary);"></i> <span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(50px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  function escapeHtml(text) {
    if (!text) return "";
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // -----------------------------------------------------------------
  // 4. TOP KPI CARDS RECALCULATION
  // -----------------------------------------------------------------
  function updateKpiCards() {
    const totalEpa = epaCases.length;
    const ebizCount = epaCases.filter(c => (c.method || "").toLowerCase().includes("biz")).length;
    const manualCount = totalEpa - ebizCount;

    const elTotalEpa = document.getElementById("kpiStatTotalEpa");
    const elEbiz = document.getElementById("kpiCountEbiz");
    const elManual = document.getElementById("kpiCountManual");
    const elBadgeEpa = document.getElementById("tabBadgeEpa");
    const elPillAll = document.getElementById("pillAllCount");

    if (elTotalEpa) elTotalEpa.textContent = totalEpa;
    if (elEbiz) elEbiz.textContent = ebizCount;
    if (elManual) elManual.textContent = manualCount;
    if (elBadgeEpa) elBadgeEpa.textContent = totalEpa;
    if (elPillAll) elPillAll.textContent = totalEpa;
  }

  // -----------------------------------------------------------------
  // 5. TAB 1: GIS MINERAL MAP OF PUNJAB (Leaflet.js)
  // -----------------------------------------------------------------
  function getMineralColor(mineral) {
    const m = (mineral || "").toLowerCase();
    if (m.includes("salt")) return "#E11D48"; // Rose / Pink
    if (m.includes("coal")) return "#1E293B"; // Dark Slate
    if (m.includes("limestone")) return "#475569"; // Slate
    if (m.includes("ordinary sand") || m.includes("ord sand")) return "#D97706"; // Amber
    if (m.includes("sandstone")) return "#B45309"; // Warm Ochre
    if (m.includes("gypsum")) return "#0284C7"; // Sky Blue
    if (m.includes("silica")) return "#0D9488"; // Teal
    if (m.includes("gravel")) return "#78350F"; // Brown
    if (m.includes("clay")) return "#7C3AED"; // Purple
    return "#15803D"; // Green
  }

  function initPunjabMap() {
    if (punjabMap) return;
    const mapContainer = document.getElementById("punjabMineralMap");
    if (!mapContainer) return;

    punjabMap = L.map("punjabMineralMap", {
      center: [31.5, 72.8],
      zoom: 7,
      minZoom: 6,
      maxZoom: 14
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap contributors | DGM&M GIS',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(punjabMap);

    mapMarkersLayer = L.layerGroup().addTo(punjabMap);
    renderMapMarkers();
    renderMapSidebarLegend();
  }

  function renderMapMarkers() {
    if (!punjabMap || !mapMarkersLayer) return;
    mapMarkersLayer.clearLayers();

    const sites = rawData.geoMiningSites || [];
    let visibleCount = 0;

    sites.forEach(site => {
      if (mapFilters.mineral !== "ALL" && site.mineral !== mapFilters.mineral) return;
      if (mapFilters.zone !== "ALL" && site.zoneGroup !== mapFilters.zone) return;
      if (mapFilters.scale !== "ALL" && site.scale !== mapFilters.scale) return;

      visibleCount++;
      const color = getMineralColor(site.mineral);

      const marker = L.circleMarker([site.lat, site.lng], {
        radius: site.scale === "LSM" ? 11 : 8,
        fillColor: color,
        color: "#FFFFFF",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.85
      });

      const popupContent = `
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.82rem; min-width: 240px; line-height: 1.4;">
          <div style="font-weight: 800; color: #092617; font-size: 0.92rem; border-bottom: 2px solid #C8A355; padding-bottom: 0.3rem; margin-bottom: 0.4rem;">
            ${escapeHtml(site.name)}
          </div>
          <div style="margin-bottom: 0.2rem;"><strong>District:</strong> ${escapeHtml(site.district)} (${escapeHtml(site.division)})</div>
          <div style="margin-bottom: 0.2rem;"><strong>Mineral:</strong> <span style="background: #F1F5F9; padding: 2px 6px; border-radius: 4px; font-weight: 700; color: ${color};">${escapeHtml(site.mineral)}</span></div>
          <div style="margin-bottom: 0.2rem;"><strong>Scale:</strong> ${escapeHtml(site.scale)} (${escapeHtml(site.concessionType)})</div>
          <div style="margin-bottom: 0.2rem;"><strong>Lessee/Operator:</strong> ${escapeHtml(site.lessee)}</div>
          <div style="margin-bottom: 0.2rem;"><strong>Annual Output:</strong> ${escapeHtml(site.annualOutput)}</div>
          <div style="margin-bottom: 0.2rem; font-size: 0.74rem; color: #64748B; font-family: monospace;"><strong>GPS Ref:</strong> ${escapeHtml(site.gridRef || `${site.lat}, ${site.lng}`)}</div>
          <div style="background: #F8FAF8; padding: 0.35rem 0.5rem; border-radius: 4px; border: 1px solid #E2E8F0; font-size: 0.72rem; color: #334155; margin-top: 0.3rem;">
            ${escapeHtml(site.notes || "")}
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      mapMarkersLayer.addLayer(marker);
    });

    const countEl = document.getElementById("mapActivePointsCount");
    if (countEl) countEl.textContent = `${visibleCount} Mining Sites Displayed`;
  }

  function renderMapSidebarLegend() {
    const container = document.getElementById("mapLegendContainer");
    if (!container) return;
    const sites = rawData.geoMiningSites || [];

    const mineralCounts = {};
    sites.forEach(s => {
      mineralCounts[s.mineral] = (mineralCounts[s.mineral] || 0) + 1;
    });

    container.innerHTML = Object.keys(mineralCounts).map(min => {
      const color = getMineralColor(min);
      return `
        <div class="legend-item" data-mineral="${escapeHtml(min)}">
          <div style="display: flex; align-items: center;">
            <span class="legend-dot" style="background-color: ${color};"></span>
            <span style="font-size: 0.78rem; font-weight: 700; color: var(--text-primary);">${escapeHtml(min)}</span>
          </div>
          <span class="pill-count">${mineralCounts[min]} Hubs</span>
        </div>
      `;
    }).join("");

    container.querySelectorAll(".legend-item").forEach(item => {
      item.onclick = () => {
        container.querySelectorAll(".legend-item").forEach(i => i.classList.remove("active"));
        item.classList.add("active");
        mapFilters.mineral = item.dataset.mineral;
        document.getElementById("mapFilterMineral").value = item.dataset.mineral;
        renderMapMarkers();
      };
    });
  }

  document.getElementById("mapFilterMineral")?.addEventListener("change", (e) => {
    mapFilters.mineral = e.target.value;
    renderMapMarkers();
  });
  document.getElementById("mapFilterZone")?.addEventListener("change", (e) => {
    mapFilters.zone = e.target.value;
    renderMapMarkers();
  });
  document.getElementById("mapFilterScale")?.addEventListener("change", (e) => {
    mapFilters.scale = e.target.value;
    renderMapMarkers();
  });
  document.getElementById("btnResetMapView")?.addEventListener("click", () => {
    mapFilters.mineral = "ALL";
    mapFilters.zone = "ALL";
    mapFilters.scale = "ALL";
    document.getElementById("mapFilterMineral").value = "ALL";
    document.getElementById("mapFilterZone").value = "ALL";
    document.getElementById("mapFilterScale").value = "ALL";
    document.querySelectorAll(".legend-item").forEach(i => i.classList.remove("active"));
    if (punjabMap) punjabMap.setView([31.5, 72.8], 7);
    renderMapMarkers();
  });

  // -----------------------------------------------------------------
  // 6. TAB 2: FINANCIAL INTELLIGENCE & 5-YEAR MULTI-YEAR TRENDS
  // -----------------------------------------------------------------
  function initFiveYearFinancialChart() {
    const ctx = document.getElementById("chartFiveYearFinancials")?.getContext("2d");
    if (!ctx) return;
    if (fiveYearChart) fiveYearChart.destroy();

    const data5Y = rawData.fiveYearSummary || {};
    const trends = data5Y.yearlyTrends || [];

    fiveYearChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: trends.map(t => "FY " + t.fy),
        datasets: [
          {
            label: "Royalty Collected (PKR Millions)",
            data: trends.map(t => Math.round(t.royaltyPKR / 1000000)),
            backgroundColor: "rgba(20, 83, 45, 0.85)",
            borderColor: "#0E3D25",
            borderWidth: 1,
            borderRadius: 4,
            yAxisID: "y"
          },
          {
            label: "Production (Million Metric Tons)",
            data: trends.map(t => +(t.productionTons / 1000000).toFixed(2)),
            type: "line",
            borderColor: "#C8A355",
            backgroundColor: "rgba(200, 163, 85, 0.2)",
            borderWidth: 3,
            pointRadius: 5,
            pointBackgroundColor: "#C8A355",
            yAxisID: "y1"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "top", labels: { boxWidth: 12, font: { family: "Plus Jakarta Sans", size: 11 } } },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                if (ctx.dataset.yAxisID === "y1") {
                  return `Production: ${ctx.raw} Million Tons`;
                }
                return `Royalty: Rs. ${ctx.raw.toLocaleString()} Million`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: "Royalty (PKR Millions)", font: { size: 10 } },
            ticks: { callback: v => "Rs. " + v + "M" },
            grid: { color: "#F1F5F9" }
          },
          y1: {
            beginAtZero: true,
            position: "right",
            title: { display: true, text: "Production (M Tons)", font: { size: 10 } },
            ticks: { callback: v => v + "M T" },
            grid: { display: false }
          },
          x: { grid: { display: false } }
        }
      }
    });

    renderMajorProducers();
    renderFieldOfficesFinancialTable();
  }

  function renderMajorProducers() {
    const list = document.getElementById("majorProducersList");
    if (!list) return;
    const producers = rawData.majorProducers || [];

    list.innerHTML = producers.map(p => `
      <div style="background: #F8FAF8; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.75rem 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <strong style="color: var(--punjab-green-darkest); font-size: 0.85rem;">${escapeHtml(p.company)}</strong>
            <div style="font-size: 0.72rem; color: var(--text-muted);"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(p.plantLocation)} | Area: ${p.totalLeasedArea} Acres</div>
          </div>
          <span class="badge-priority prio-high" style="font-size: 0.7rem;">${escapeHtml(p.mineral)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 0.5rem; font-size: 0.76rem; border-top: 1px dashed var(--border-medium); padding-top: 0.35rem;">
          <span>5-Year Output: <strong>${(p.fiveYearProductionTons / 1000000).toFixed(2)}M Tons</strong></span>
          <span style="color: var(--punjab-green-dark);">5-Year Royalty: <strong>Rs. ${(p.fiveYearRoyaltyPKR / 1000000).toFixed(1)}M</strong></span>
        </div>
      </div>
    `).join("");
  }

  function renderFieldOfficesFinancialTable() {
    const tbody = document.getElementById("fieldOfficesFinancialTableBody");
    if (!tbody) return;
    const offices = rawData.fiveYearSummary?.fieldOffices || [];

    tbody.innerHTML = offices.map(o => `
      <tr>
        <td><strong style="color: var(--punjab-green-darkest);">${escapeHtml(o.office)}</strong></td>
        <td><span class="pill-count">${o.leases}</span></td>
        <td style="font-family: monospace;">${(o.production5Y).toLocaleString()}</td>
        <td style="font-family: monospace; font-weight: 700; color: var(--punjab-green-dark);">Rs. ${(o.royalty5Y).toLocaleString()}</td>
        <td style="font-family: monospace;">Rs. ${(o.totalPaid5Y).toLocaleString()}</td>
        <td style="font-family: monospace; color: var(--text-muted);">Rs. ${(o.securities).toLocaleString()}</td>
        <td><span style="font-size: 0.72rem; color: var(--text-secondary);">${escapeHtml(o.primaryMinerals.join(", "))}</span></td>
        <td><span class="badge-status badge-completed">${o.revenueSharePercent}%</span></td>
      </tr>
    `).join("");
  }

  document.getElementById("btnDismissAuditAlert")?.addEventListener("click", () => {
    document.getElementById("btnDismissAuditAlert").parentElement.parentElement.style.display = "none";
  });

  // -----------------------------------------------------------------
  // 7. TAB 3: LICENSING, RENEWALS & E-AUCTIONS INTELLIGENCE
  // -----------------------------------------------------------------
  function renderAuctionsTable() {
    const tbody = document.getElementById("auctionTableBody");
    if (!tbody) return;

    if (auctionRecords.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 2rem; color: var(--text-muted);">No auction records available.</td></tr>`;
      return;
    }

    tbody.innerHTML = auctionRecords.map((a, i) => {
      const bidVal = parseFloat(a.bidReceived) || 0;
      const reserveVal = parseFloat(a.reservePrice) || 0;
      const incVal = parseFloat(a.increasePercentage) || 0;

      let incBadge = `<span class="badge-status badge-completed">+${(incVal * 100).toFixed(1)}%</span>`;
      if (incVal > 2) {
        incBadge = `<span class="badge-status badge-completed" style="background: #ECFDF5; color: #047857; font-weight: 800;">+${(incVal * 100).toFixed(0)}% Surge</span>`;
      }

      return `
        <tr>
          <td style="font-family: monospace; color: var(--text-muted);">${a.sr || (i + 1)}</td>
          <td><span class="badge-wing">${escapeHtml(a.fieldOffice || "Chiniot")}</span></td>
          <td><strong style="color: var(--punjab-green-darkest); font-size: 0.88rem;">${escapeHtml(a.blockName || "-")}</strong></td>
          <td style="font-family: monospace;">Rs. ${parseFloat(a.lastOperativeBid || 0).toLocaleString()}</td>
          <td style="font-family: monospace; color: var(--text-muted);">Rs. ${reserveVal.toLocaleString()}</td>
          <td style="font-family: monospace; font-weight: 700; color: #047857; font-size: 0.88rem;">Rs. ${bidVal.toLocaleString()}</td>
          <td>${incBadge}</td>
          <td><span class="badge-status badge-completed"><i class="fa-solid fa-check"></i> Bid Fetched</span></td>
        </tr>
      `;
    }).join("");
  }

  function renderSublettingTable() {
    const tbody = document.getElementById("sublettingTableBody");
    if (!tbody) return;

    if (sublettingCases.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 2rem; color: var(--text-muted);">No subletting violations pending.</td></tr>`;
      return;
    }

    tbody.innerHTML = sublettingCases.map(s => `
      <tr>
        <td><strong>${escapeHtml(s.district || "Chakwal")}</strong></td>
        <td><span class="badge-priority prio-urgent" style="font-family: monospace;">${escapeHtml(s.leaseNo || "-")}</span></td>
        <td><div style="font-size: 0.76rem; font-weight: 600;">${escapeHtml(s.company || "-")}</div></td>
        <td style="font-size: 0.74rem; font-family: monospace;">${escapeHtml(s.inspectionDate || "-")}</td>
        <td><span class="badge-priority prio-urgent">${escapeHtml(s.violation || "Rule-160")}</span></td>
      </tr>
    `).join("");
  }

  function renderRenewalsTable() {
    const tbody = document.getElementById("renewalsTableBody");
    if (!tbody) return;

    if (renewalsDecided.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 2rem; color: var(--text-muted);">No decided renewals.</td></tr>`;
      return;
    }

    tbody.innerHTML = renewalsDecided.slice(0, 30).map(r => `
      <tr>
        <td><strong style="font-family: monospace; font-size: 0.76rem; color: var(--punjab-green-darkest);">${escapeHtml(r.leaseNo || "-")}</strong></td>
        <td><div style="font-size: 0.76rem; color: var(--text-secondary); max-width: 220px;">${escapeHtml(r.company || "-")}</div></td>
        <td style="font-family: monospace;">${escapeHtml(r.areaAcres || "-")}</td>
        <td style="font-size: 0.74rem; font-family: monospace;">${escapeHtml(r.renewalWef || "-")}</td>
        <td style="font-size: 0.74rem; font-family: monospace; color: #047857; font-weight: 600;">${escapeHtml(r.newExpiry || "-")}</td>
      </tr>
    `).join("");
  }

  // -----------------------------------------------------------------
  // 8. TAB 4: EPA CLEARANCES TRACKER
  // -----------------------------------------------------------------
  function renderDistrictBadges() {
    const container = document.getElementById("districtBadgesContainer");
    if (!container) return;
    const districtsList = rawData.epaDistricts || [];

    const countsMap = {};
    epaCases.forEach(c => {
      const d = (c.district || "Unknown").trim();
      countsMap[d] = (countsMap[d] || 0) + 1;
    });

    container.innerHTML = districtsList.map(d => {
      const count = countsMap[d.district] || d.count || 0;
      const isActive = epaFilters.district === d.district ? "active" : "";
      return `
        <button class="district-pill-btn ${isActive}" data-district="${escapeHtml(d.district)}">
          <span>${escapeHtml(d.district)}</span>
          <span class="pill-count">${count}</span>
        </button>
      `;
    }).join("");

    container.querySelectorAll(".district-pill-btn").forEach(btn => {
      btn.onclick = () => {
        container.querySelectorAll(".district-pill-btn").forEach(b => b.classList.remove("active"));
        document.getElementById("pillDistrictAll")?.classList.remove("active");
        btn.classList.add("active");
        epaFilters.district = btn.dataset.district;
        epaFilters.page = 1;
        renderEpaTable();
      };
    });
  }

  document.getElementById("pillDistrictAll")?.addEventListener("click", () => {
    document.querySelectorAll(".district-pill-btn").forEach(b => b.classList.remove("active"));
    document.getElementById("pillDistrictAll").classList.add("active");
    epaFilters.district = "ALL";
    epaFilters.page = 1;
    renderEpaTable();
  });

  document.querySelectorAll("#epaFilterChipsRow .filter-chip-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#epaFilterChipsRow .filter-chip-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      epaFilters.chip = btn.dataset.filter;
      epaFilters.page = 1;
      renderEpaTable();
    });
  });

  document.getElementById("epaRowsPerPageSelect")?.addEventListener("change", (e) => {
    epaFilters.rowsPerPage = e.target.value === "ALL" ? 99999 : parseInt(e.target.value, 10);
    epaFilters.page = 1;
    renderEpaTable();
  });

  function getFilteredEpaCases() {
    return epaCases.filter(c => {
      if (epaFilters.district !== "ALL") {
        if ((c.district || "").toLowerCase() !== epaFilters.district.toLowerCase()) return false;
      }
      if (epaFilters.chip === "EBIZ") {
        if (!(c.method || "").toLowerCase().includes("biz")) return false;
      } else if (epaFilters.chip === "MANUAL") {
        if ((c.method || "").toLowerCase().includes("biz")) return false;
      } else if (epaFilters.chip === "DAEC") {
        const text = `${c.delayReason || ""} ${c.reminder || ""}`.toLowerCase();
        if (!text.includes("committee") && !text.includes("meeting") && !text.includes("daec") && !text.includes("dc")) return false;
      } else if (epaFilters.chip === "INSPECTION") {
        const text = `${c.delayReason || ""}`.toLowerCase();
        if (!text.includes("inspector") && !text.includes("inspection") && !text.includes("site")) return false;
      } else if (epaFilters.chip === "SAND") {
        const mineral = (c.mineral || "").toLowerCase();
        if (!mineral.includes("sand")) return false;
      }
      if (epaFilters.search) {
        const q = epaFilters.search.toLowerCase();
        const text = `${c.title || ""} ${c.district || ""} ${c.mineral || ""} ${c.delayReason || ""} ${c.fieldOffice || ""}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }

  function renderEpaTable() {
    const tbody = document.getElementById("epaTableBody");
    if (!tbody) return;
    const filtered = getFilteredEpaCases();

    document.getElementById("epaFilteredCountLabel").textContent = `Showing ${filtered.length} of ${epaCases.length} records`;

    const totalPages = Math.ceil(filtered.length / epaFilters.rowsPerPage) || 1;
    if (epaFilters.page > totalPages) epaFilters.page = totalPages;

    const startIdx = (epaFilters.page - 1) * epaFilters.rowsPerPage;
    const paged = filtered.slice(startIdx, startIdx + epaFilters.rowsPerPage);

    if (paged.length === 0) {
      tbody.innerHTML = `<tr><td colspan="10" style="text-align: center; padding: 2.5rem; color: var(--text-muted);"><i class="fa-solid fa-leaf" style="font-size: 2rem; margin-bottom: 0.5rem; display: block;"></i>No pending EPA cases found matching current criteria.</td></tr>`;
      renderEpaPagination(0, 0, 0);
      return;
    }

    tbody.innerHTML = paged.map((c, idx) => {
      const isEbiz = (c.method || "").toLowerCase().includes("biz");
      const methodBadge = isEbiz
        ? `<span class="badge-method-ebiz"><i class="fa-solid fa-globe"></i> e-Biz</span>`
        : `<span class="badge-method-manual"><i class="fa-solid fa-file-lines"></i> Manual</span>`;

      let statusBadge = `<span class="badge-status badge-partially">Under Process</span>`;
      const reasonLower = (c.delayReason || "").toLowerCase();
      if (reasonLower.includes("committee") || reasonLower.includes("meeting") || reasonLower.includes("daec")) {
        statusBadge = `<span class="badge-status badge-urgent"><i class="fa-solid fa-users"></i> Awaiting DAEC</span>`;
      } else if (reasonLower.includes("inspection") || reasonLower.includes("assigned")) {
        statusBadge = `<span class="badge-status badge-in-progress"><i class="fa-solid fa-magnifying-glass-location"></i> Site Insp.</span>`;
      }

      const globalIdx = startIdx + idx;

      return `
        <tr>
          <td style="font-family: monospace; color: var(--text-muted);">${c.sr || (globalIdx + 1)}</td>
          <td><strong style="color: var(--punjab-green-darkest);">${escapeHtml(c.district || "-")}</strong></td>
          <td><span style="font-size: 0.74rem; color: var(--text-secondary);">${escapeHtml(c.fieldOffice || c.division || "-")}</span></td>
          <td>
            <div style="font-weight: 700; color: #1E293B;">${escapeHtml(c.title || "Concession Block")}</div>
            <div style="font-size: 0.7rem; color: var(--text-muted);">${escapeHtml(c.leaseNo ? `Lease: ${c.leaseNo}` : "")}</div>
          </td>
          <td><span class="badge-wing" style="background: #FAF5FF; border-color: #E9D5FF; color: #7E22CE;">${escapeHtml(c.mineral || "-")}</span></td>
          <td>${methodBadge}</td>
          <td style="font-size: 0.76rem; font-family: monospace;">${escapeHtml(c.dateApplied || "-")}</td>
          <td>
            <div style="font-size: 0.76rem; color: var(--text-secondary); max-width: 320px; line-height: 1.35;">
              ${escapeHtml(c.delayReason || "Case under active procedural scrutiny in district EPA office.")}
            </div>
          </td>
          <td>${statusBadge}</td>
          <td style="text-align: center;">
            <button class="btn-epa-detail" data-idx="${globalIdx}" title="View Case Dossier" style="background: none; border: 1px solid var(--border-medium); border-radius: 4px; padding: 0.3rem 0.55rem; cursor: pointer; color: var(--punjab-green-dark);">
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </button>
          </td>
        </tr>
      `;
    }).join("");

    renderEpaPagination(filtered.length, startIdx, paged.length);
    attachEpaActionListeners(filtered);
  }

  function renderEpaPagination(total, start, count) {
    const info = document.getElementById("epaPaginationInfo");
    const container = document.getElementById("epaPaginationBtns");
    if (!info || !container) return;

    if (total === 0) {
      info.textContent = "0 records";
      container.innerHTML = "";
      return;
    }

    const totalPages = Math.ceil(total / epaFilters.rowsPerPage);
    info.textContent = `Showing ${start + 1} to ${start + count} of ${total} cases (Page ${epaFilters.page} of ${totalPages})`;

    let btns = "";
    if (epaFilters.page > 1) btns += `<button class="filter-chip-btn" id="btnEpaPrev">&larr; Prev</button>`;
    if (epaFilters.page < totalPages) btns += `<button class="filter-chip-btn" id="btnEpaNext">Next &rarr;</button>`;
    container.innerHTML = btns;

    document.getElementById("btnEpaPrev")?.addEventListener("click", () => { epaFilters.page--; renderEpaTable(); });
    document.getElementById("btnEpaNext")?.addEventListener("click", () => { epaFilters.page++; renderEpaTable(); });
  }

  function attachEpaActionListeners(filteredList) {
    document.querySelectorAll(".btn-epa-detail").forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.idx, 10);
        const item = filteredList[idx];
        if (item) openEpaModal(item);
      };
    });
  }

  const modalEpa = document.getElementById("modalEpaDetail");
  function openEpaModal(item) {
    const content = document.getElementById("epaModalContent");
    if (!content) return;

    content.innerHTML = `
      <div style="background: #F8FAF8; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; display: flex; flex-direction: column; gap: 0.85rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem;">
          <div>
            <span class="gov-punjab-label" style="color: var(--gold-dark);">REGULATORY CASE RECORD</span>
            <h2 style="font-size: 1.15rem; font-weight: 800; color: var(--punjab-green-darkest); margin-top: 0.2rem;">${escapeHtml(item.title || "Concession Area")}</h2>
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.15rem;">District: <strong>${escapeHtml(item.district || "-")}</strong> | Field Office: <strong>${escapeHtml(item.fieldOffice || "-")}</strong></div>
          </div>
          <span class="badge-priority prio-high" style="font-size: 0.76rem;">Sr #${escapeHtml(item.sr || "-")}</span>
        </div>

        <div class="form-grid-2col" style="margin-top: 0.5rem; font-size: 0.82rem;">
          <div><strong>Mineral:</strong> ${escapeHtml(item.mineral || "-")}</div>
          <div><strong>Application Method:</strong> ${escapeHtml(item.method || "-")}</div>
          <div><strong>Application Date:</strong> ${escapeHtml(item.dateApplied || "-")}</div>
          <div><strong>Lease Reference:</strong> ${escapeHtml(item.leaseNo || "Under Assignment")}</div>
        </div>

        <div style="border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
          <strong style="color: #991B1B; font-size: 0.78rem; text-transform: uppercase;">Bottleneck / Justification for Delay:</strong>
          <p style="font-size: 0.85rem; color: var(--text-primary); margin-top: 0.35rem; line-height: 1.4; background: #FFFFFF; border: 1px solid var(--border-medium); border-radius: 6px; padding: 0.75rem;">
            ${escapeHtml(item.delayReason || "Case is under review at District Environmental Protection Agency.")}
          </p>
        </div>

        <div style="border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
          <strong style="color: var(--punjab-green-dark); font-size: 0.78rem; text-transform: uppercase;">Reminders & Follow-up Log:</strong>
          <p style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 0.25rem;">
            ${escapeHtml(item.reminder || "No formal reminders recorded in this quarter.")}
          </p>
        </div>

        <div style="background: var(--punjab-green-surface); border: 1px solid var(--punjab-green-border); border-radius: 6px; padding: 0.75rem; font-size: 0.8rem; color: var(--punjab-green-darkest);">
          <strong><i class="fa-solid fa-lightbulb"></i> Recommended Action:</strong> Escalate to the Deputy Commissioner / DAEC Chair for immediate agenda inclusion in the upcoming bi-monthly District Committee session.
        </div>
      </div>
    `;

    modalEpa.classList.add("active");
  }

  document.getElementById("btnCloseEpaModal")?.addEventListener("click", () => modalEpa.classList.remove("active"));
  document.getElementById("btnCloseEpaFooter")?.addEventListener("click", () => modalEpa.classList.remove("active"));

  // -----------------------------------------------------------------
  // 9. TAB 5: APPELLATE AUTHORITY & FIELD OFFICE TARGETS
  // -----------------------------------------------------------------
  function initPerformanceCharts() {
    const regData = rawData.regionalPerformance || [];
    const concData = rawData.concessions || {};

    const ctxRecovery = document.getElementById("chartLsmSsmRecovery")?.getContext("2d");
    if (ctxRecovery) {
      if (recoveryChart) recoveryChart.destroy();
      const labels = regData.map(r => r.region);
      let datasets = [];

      if (chartMode === "COMBINED") {
        datasets = [
          {
            label: "Total Target (PKR M)",
            data: regData.map(r => r.lsmTarget + r.ssmTarget),
            backgroundColor: "rgba(200, 163, 85, 0.75)",
            borderColor: "#C8A355",
            borderWidth: 1,
            borderRadius: 4
          },
          {
            label: "Actual Recovery (PKR M)",
            data: regData.map(r => r.lsmActual + r.ssmActual),
            backgroundColor: "rgba(20, 83, 45, 0.85)",
            borderColor: "#0E3D25",
            borderWidth: 1,
            borderRadius: 4
          }
        ];
      } else if (chartMode === "LSM") {
        datasets = [
          {
            label: "LSM Target (PKR M)",
            data: regData.map(r => r.lsmTarget),
            backgroundColor: "rgba(200, 163, 85, 0.75)",
            borderColor: "#C8A355",
            borderWidth: 1,
            borderRadius: 4
          },
          {
            label: "LSM Actual Recovery (PKR M)",
            data: regData.map(r => r.lsmActual),
            backgroundColor: "rgba(20, 83, 45, 0.85)",
            borderColor: "#0E3D25",
            borderWidth: 1,
            borderRadius: 4
          }
        ];
      } else {
        datasets = [
          {
            label: "SSM Target (PKR M)",
            data: regData.map(r => r.ssmTarget),
            backgroundColor: "rgba(148, 163, 184, 0.75)",
            borderColor: "#94A3B8",
            borderWidth: 1,
            borderRadius: 4
          },
          {
            label: "SSM Actual Recovery (PKR M)",
            data: regData.map(r => r.ssmActual),
            backgroundColor: "rgba(37, 99, 235, 0.85)",
            borderColor: "#1D4ED8",
            borderWidth: 1,
            borderRadius: 4
          }
        ];
      }

      recoveryChart = new Chart(ctxRecovery, {
        type: "bar",
        data: { labels, datasets },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "top", labels: { boxWidth: 12, font: { family: "Plus Jakarta Sans", size: 11 } } },
            tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: Rs. ${ctx.raw.toLocaleString()} Million` } }
          },
          scales: {
            y: { beginAtZero: true, ticks: { callback: v => "Rs. " + v + "M" }, grid: { color: "#F1F5F9" } },
            x: { grid: { display: false } }
          }
        }
      });
    }

    const ctxDistricts = document.getElementById("chartTopDistrictsRevenue")?.getContext("2d");
    if (ctxDistricts) {
      if (districtsChart) districtsChart.destroy();
      const topDists = concData.topDistrictsReservePrice || [];

      districtsChart = new Chart(ctxDistricts, {
        type: "bar",
        data: {
          labels: topDists.map(d => d.district),
          datasets: [{
            label: "Reserve Price Benchmark (PKR M)",
            data: topDists.map(d => d.amountM),
            backgroundColor: [
              "#092617", "#0E3D25", "#14532D", "#C8A355", "#D8B467",
              "#2563EB", "#3B82F6", "#64748B", "#94A3B8", "#CBD5E1"
            ],
            borderRadius: 4
          }]
        },
        options: {
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: (ctx) => `Benchmark: Rs. ${ctx.raw.toLocaleString()} Million` } }
          },
          scales: {
            x: { beginAtZero: true, ticks: { callback: v => v + "M" }, grid: { color: "#F1F5F9" } },
            y: { grid: { display: false } }
          }
        }
      });
    }
  }

  document.getElementById("btnToggleChartCombined")?.addEventListener("click", (e) => {
    chartMode = "COMBINED";
    updateChartToggleActive(e.target);
    initPerformanceCharts();
  });
  document.getElementById("btnToggleChartLsm")?.addEventListener("click", (e) => {
    chartMode = "LSM";
    updateChartToggleActive(e.target);
    initPerformanceCharts();
  });
  document.getElementById("btnToggleChartSsm")?.addEventListener("click", (e) => {
    chartMode = "SSM";
    updateChartToggleActive(e.target);
    initPerformanceCharts();
  });

  function updateChartToggleActive(activeBtn) {
    document.querySelectorAll("#btnToggleChartCombined, #btnToggleChartLsm, #btnToggleChartSsm").forEach(b => b.classList.remove("active"));
    activeBtn.classList.add("active");
  }

  // -----------------------------------------------------------------
  // 10. APPEALS LOG TABLE
  // -----------------------------------------------------------------
  function getFilteredAppeals() {
    return appealsCases.filter(a => {
      if (appealsFilters.category === "MINOR" && a.category !== "Minor Minerals") return false;
      if (appealsFilters.category === "SSM" && a.category !== "Small Scale Mining") return false;
      if (appealsFilters.category === "HIGH_RECOVERY") {
        const text = `${a.impugnedAction || ""} ${a.subject || ""}`.toLowerCase();
        if (!text.includes("crore") && !text.includes("4,65") && !text.includes("52,50") && !text.includes("recovery")) return false;
      }
      if (appealsFilters.search) {
        const q = appealsFilters.search.toLowerCase();
        const text = `${a.appealNo || ""} ${a.appellant || ""} ${a.subject || ""} ${a.impugnedAction || ""}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }

  function renderAppealsTable() {
    const tbody = document.getElementById("appealsTableBody");
    if (!tbody) return;
    const filtered = getFilteredAppeals();

    const totalPages = Math.ceil(filtered.length / appealsFilters.rowsPerPage) || 1;
    if (appealsFilters.page > totalPages) appealsFilters.page = totalPages;

    const startIdx = (appealsFilters.page - 1) * appealsFilters.rowsPerPage;
    const paged = filtered.slice(startIdx, startIdx + appealsFilters.rowsPerPage);

    if (paged.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 2.5rem; color: var(--text-muted);"><i class="fa-solid fa-scale-balanced" style="font-size: 2rem; margin-bottom: 0.5rem; display: block;"></i>No pending appeals matching this filter.</td></tr>`;
      renderAppealsPagination(0, 0, 0);
      return;
    }

    tbody.innerHTML = paged.map((a, idx) => {
      const globalIdx = startIdx + idx;
      let statusBadge = `<span class="badge-status badge-in-progress">Pending Hearing</span>`;
      if ((a.status || "").toLowerCase().includes("decided")) {
        statusBadge = `<span class="badge-status badge-completed">Decided</span>`;
      }

      let issuePill = `<span class="badge-priority prio-medium">${escapeHtml(a.issue || "Dispute")}</span>`;
      if ((a.issue || "").toLowerCase().includes("recovery")) {
        issuePill = `<span class="badge-priority prio-urgent">Recovery</span>`;
      } else if ((a.issue || "").toLowerCase().includes("refund")) {
        issuePill = `<span class="badge-priority prio-high">Refund</span>`;
      }

      return `
        <tr>
          <td style="font-family: monospace; color: var(--text-muted);">${a.sr || (globalIdx + 1)}</td>
          <td><strong style="color: var(--punjab-green-darkest); font-family: monospace; font-size: 0.76rem;">${escapeHtml(a.appealNo || "DGMM-APPEAL")}</strong></td>
          <td><span class="badge-wing">${escapeHtml(a.category || "General")}</span></td>
          <td>
            <div style="font-weight: 700; color: #1E293B;">${escapeHtml(a.subject || "-")}</div>
            <div style="font-size: 0.7rem; color: var(--text-muted);">Year: ${escapeHtml(a.year || "-")}</div>
          </td>
          <td><strong style="color: #334155;">${escapeHtml(a.appellant || "-")}</strong></td>
          <td>${issuePill}</td>
          <td>
            <div style="font-size: 0.74rem; color: var(--text-secondary); max-width: 340px; line-height: 1.35;">
              ${escapeHtml(a.impugnedAction || "-")}
            </div>
          </td>
          <td>${statusBadge}</td>
        </tr>
      `;
    }).join("");

    renderAppealsPagination(filtered.length, startIdx, paged.length);
  }

  function renderAppealsPagination(total, start, count) {
    const info = document.getElementById("appealsPaginationInfo");
    const container = document.getElementById("appealsPaginationBtns");
    if (!info || !container) return;

    if (total === 0) {
      info.textContent = "0 records";
      container.innerHTML = "";
      return;
    }

    const totalPages = Math.ceil(total / appealsFilters.rowsPerPage);
    info.textContent = `Showing ${start + 1} to ${start + count} of ${total} appeals (Page ${appealsFilters.page} of ${totalPages})`;

    let btns = "";
    if (appealsFilters.page > 1) btns += `<button class="filter-chip-btn" id="btnAppealsPrev">&larr; Prev</button>`;
    if (appealsFilters.page < totalPages) btns += `<button class="filter-chip-btn" id="btnAppealsNext">Next &rarr;</button>`;
    container.innerHTML = btns;

    document.getElementById("btnAppealsPrev")?.addEventListener("click", () => { appealsFilters.page--; renderAppealsTable(); });
    document.getElementById("btnAppealsNext")?.addEventListener("click", () => { appealsFilters.page++; renderAppealsTable(); });
  }

  document.getElementById("btnAppealsFilterAll")?.addEventListener("click", (e) => {
    appealsFilters.category = "ALL";
    updateAppealsBtnActive(e.target);
    appealsFilters.page = 1;
    renderAppealsTable();
  });
  document.getElementById("btnAppealsFilterMinor")?.addEventListener("click", (e) => {
    appealsFilters.category = "MINOR";
    updateAppealsBtnActive(e.target);
    appealsFilters.page = 1;
    renderAppealsTable();
  });
  document.getElementById("btnAppealsFilterSsm")?.addEventListener("click", (e) => {
    appealsFilters.category = "SSM";
    updateAppealsBtnActive(e.target);
    appealsFilters.page = 1;
    renderAppealsTable();
  });
  document.getElementById("btnAppealsFilterHighRecovery")?.addEventListener("click", (e) => {
    appealsFilters.category = "HIGH_RECOVERY";
    updateAppealsBtnActive(e.target);
    appealsFilters.page = 1;
    renderAppealsTable();
  });

  function updateAppealsBtnActive(btn) {
    document.querySelectorAll("#btnAppealsFilterAll, #btnAppealsFilterMinor, #btnAppealsFilterSsm, #btnAppealsFilterHighRecovery").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  }

  // -----------------------------------------------------------------
  // 11. TAB SWITCHING
  // -----------------------------------------------------------------
  document.querySelectorAll(".nav-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".nav-tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content-panel").forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const targetId = btn.dataset.tab;
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add("active");
      }

      if (targetId === "tab-map") {
        setTimeout(() => {
          initPunjabMap();
          if (punjabMap) punjabMap.invalidateSize();
        }, 100);
      } else if (targetId === "tab-financials") {
        setTimeout(initFiveYearFinancialChart, 80);
      } else if (targetId === "tab-auctions") {
        renderAuctionsTable();
        renderSublettingTable();
        renderRenewalsTable();
      } else if (targetId === "tab-performance") {
        setTimeout(initPerformanceCharts, 80);
      }
    });
  });

  // KPI Quick Clicks
  document.getElementById("kpiCardFinancials")?.addEventListener("click", () => {
    document.querySelector(".nav-tab-btn[data-tab='tab-financials']")?.click();
  });
  document.getElementById("kpiCardOutput")?.addEventListener("click", () => {
    document.querySelector(".nav-tab-btn[data-tab='tab-financials']")?.click();
  });
  document.getElementById("kpiCardLeases")?.addEventListener("click", () => {
    document.querySelector(".nav-tab-btn[data-tab='tab-map']")?.click();
  });
  document.getElementById("kpiCardEpa")?.addEventListener("click", () => {
    document.querySelector(".nav-tab-btn[data-tab='tab-epa']")?.click();
  });

  // -----------------------------------------------------------------
  // 12. GLOBAL OMNI-SEARCH
  // -----------------------------------------------------------------
  const omniSearch = document.getElementById("globalOmniSearch");
  omniSearch?.addEventListener("input", (e) => {
    const val = e.target.value.trim();
    epaFilters.search = val;
    appealsFilters.search = val;
    epaFilters.page = 1;
    appealsFilters.page = 1;

    renderEpaTable();
    renderAppealsTable();
  });

  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      omniSearch?.focus();
    }
  });

  // -----------------------------------------------------------------
  // 13. EXPORT FUNCTIONALITY (CSV & PDF PRINT)
  // -----------------------------------------------------------------
  const exportToggle = document.getElementById("btnExportMenuToggle");
  const exportMenu = document.getElementById("exportDropdownMenu");

  exportToggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    exportMenu.style.display = exportMenu.style.display === "block" ? "none" : "block";
  });

  window.addEventListener("click", () => {
    if (exportMenu) exportMenu.style.display = "none";
  });

  function downloadCsv(filename, headers, rows) {
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(val => `"${String(val || "").replace(/"/g, '""')}"`).join(","))
    ].join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Exported ${filename} successfully.`);
  }

  document.getElementById("btnExportAuctionsCsv")?.addEventListener("click", () => {
    const headers = ["Sr", "Field Office", "Block Name", "Last Operative Bid", "Reserve Price", "Bid Received", "Increase %"];
    const rows = auctionRecords.map(a => [a.sr, a.fieldOffice, a.blockName, a.lastOperativeBid, a.reservePrice, a.bidReceived, a.increasePercentage]);
    downloadCsv(`DGMM_Auctions_Report_${new Date().toISOString().split("T")[0]}.csv`, headers, rows);
  });

  document.getElementById("btnExportEpaCsv")?.addEventListener("click", () => {
    const headers = ["Sr", "District", "Field Office", "Division", "Title", "Mineral", "Method", "Date Applied", "Delay Reason", "Reminders"];
    const rows = epaCases.map(c => [c.sr, c.district, c.fieldOffice, c.division, c.title, c.mineral, c.method, c.dateApplied, c.delayReason, c.reminder]);
    downloadCsv(`DGMM_EPA_Pending_Clearances_${new Date().toISOString().split("T")[0]}.csv`, headers, rows);
  });

  document.getElementById("btnExportAppealsCsv")?.addEventListener("click", () => {
    const headers = ["Sr", "Appeal No", "Category", "Subject", "Appellant", "Issue", "Impugned Action", "Status", "Year"];
    const rows = appealsCases.map(a => [a.sr, a.appealNo, a.category, a.subject, a.appellant, a.issue, a.impugnedAction, a.status, a.year]);
    downloadCsv(`DGMM_Appeals_Log_${new Date().toISOString().split("T")[0]}.csv`, headers, rows);
  });

  document.getElementById("btnPrintBriefing")?.addEventListener("click", () => {
    window.print();
  });

  // -----------------------------------------------------------------
  // 14. EXCEL & CSV IMPORT (SheetJS)
  // -----------------------------------------------------------------
  const modalImport = document.getElementById("modalImport");
  const dropZone = document.getElementById("dropZone");
  const fileInput = document.getElementById("fileInputExcel");

  document.getElementById("btnOpenImport")?.addEventListener("click", () => modalImport.classList.add("active"));
  document.getElementById("btnCloseImportModal")?.addEventListener("click", () => modalImport.classList.remove("active"));
  document.getElementById("btnCancelImport")?.addEventListener("click", () => modalImport.classList.remove("active"));

  dropZone?.addEventListener("click", () => fileInput.click());
  dropZone?.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.style.borderColor = "var(--punjab-green-dark)";
    dropZone.style.background = "#EAF4EE";
  });
  dropZone?.addEventListener("dragleave", () => {
    dropZone.style.borderColor = "var(--punjab-green-border)";
    dropZone.style.background = "#F8FAF8";
  });
  dropZone?.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.style.borderColor = "var(--punjab-green-border)";
    dropZone.style.background = "#F8FAF8";
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImportedFile(e.dataTransfer.files[0]);
    }
  });

  fileInput?.addEventListener("change", (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleImportedFile(e.target.files[0]);
    }
  });

  function handleImportedFile(file) {
    const feedback = document.getElementById("importStatusFeedback");
    feedback.style.display = "block";
    feedback.style.background = "#FEF3C7";
    feedback.style.color = "#92400E";
    feedback.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Parsing <strong>${escapeHtml(file.name)}</strong>...`;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

        if (!json || json.length === 0) {
          throw new Error("No readable records found in the selected sheet.");
        }

        const newEpa = json.map((row, i) => ({
          sr: row["Sr. No"] || row["Sr"] || (epaCases.length + i + 1),
          fieldOffice: row["Field Office"] || row["Office"] || "",
          division: row["Division"] || "",
          district: row["District"] || "Punjab",
          leaseNo: row["Lease No."] || row["Lease"] || "",
          title: row["Title of Concession"] || row["Concession"] || row["Zone"] || `Imported Zone ${i + 1}`,
          mineral: row["Mineral"] || "Ordinary Sand",
          dateApplied: row["Date Applied"] || row["Date"] || "",
          method: row["Method of Application"] || row["Method"] || "e-Biz",
          reminder: row["Any Reminder"] || row["Reminder"] || "",
          delayReason: row["Reason for Delay"] || row["Bottleneck"] || row["Status"] || ""
        }));
        epaCases = [...newEpa, ...epaCases];
        localStorage.setItem("dgmm_epa_v3", JSON.stringify(epaCases));
        renderDistrictBadges();
        renderEpaTable();
        updateKpiCards();
        feedback.style.background = "#DCFCE7";
        feedback.style.color = "#14532D";
        feedback.innerHTML = `<i class="fa-solid fa-check"></i> Successfully imported <strong>${newEpa.length}</strong> records!`;
        showToast(`Imported ${newEpa.length} records.`);
        setTimeout(() => modalImport.classList.remove("active"), 2000);
      } catch (err) {
        feedback.style.background = "#FEE2E2";
        feedback.style.color = "#991B1B";
        feedback.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Error parsing file: ${escapeHtml(err.message)}`;
      }
    };
    reader.readAsArrayBuffer(file);
  }

  // Refresh
  document.getElementById("btnQuickRefresh")?.addEventListener("click", () => {
    updateKpiCards();
    renderDistrictBadges();
    renderEpaTable();
    initPerformanceCharts();
    renderAppealsTable();
    renderAuctionsTable();
    renderSublettingTable();
    renderRenewalsTable();
    if (punjabMap) renderMapMarkers();
    showToast("Dashboard synchronized with verified datasets.");
  });

  // -----------------------------------------------------------------
  // 15. INITIAL RENDERS
  // -----------------------------------------------------------------
  updateKpiCards();
  renderDistrictBadges();
  renderEpaTable();
  initPerformanceCharts();
  renderAppealsTable();
  renderAuctionsTable();
  renderSublettingTable();
  renderRenewalsTable();

  // Initialize Map
  setTimeout(() => {
    initPunjabMap();
    if (punjabMap) punjabMap.invalidateSize();
  }, 150);
});
