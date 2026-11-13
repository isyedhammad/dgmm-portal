/**
 * DGMM Punjab - Analytics Presentation & UI Controller (analytics_ui.js)
 * High-performance UI rendering module for Executive Dashboard, LSM, SSM, Minor Minerals,
 * District Yield, Mineral Economics, and 10 Statistical Models.
 */

(function(global) {
  'use strict';

  const UI = {
    charts: {},

    init: function() {
      if (!global.DGMM_ANALYTICS) {
        console.error('DGMM_ANALYTICS service not loaded.');
        return;
      }

      this.bindGlobalFilterEvents();
      this.bindPageNavEvents();
      this.bindExportEvents();

      // Subscribe to analytics service updates
      global.DGMM_ANALYTICS.subscribe(() => {
        UI.renderActivePage();
      });

      this.populateFilterDropdowns();
      this.renderActivePage();
    },

    formatPKR: function(num) {
      if (num === null || num === undefined || isNaN(num)) return 'PKR 0';
      const n = Math.abs(num);
      if (n >= 1e9) return `PKR ${(num / 1e9).toFixed(2)}B`;
      if (n >= 1e6) return `PKR ${(num / 1e6).toFixed(2)}M`;
      if (n >= 1e3) return `PKR ${(num / 1e3).toFixed(1)}K`;
      return `PKR ${Math.round(num).toLocaleString()}`;
    },

    formatNum: function(num, decimals = 0) {
      if (num === null || num === undefined || isNaN(num)) return '0';
      return Number(num).toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
    },

    populateFilterDropdowns: function() {
      const raw = global.DGMM_ANALYTICS.getRawData();
      const distSelect = document.getElementById('analyticsFilterDistrict');
      const minSelect = document.getElementById('analyticsFilterMineral');

      if (distSelect && distSelect.options.length <= 1) {
        const districts = [...new Set(raw.blockInventory.map(b => b.district).filter(Boolean))].sort();
        districts.forEach(d => {
          const opt = document.createElement('option');
          opt.value = d;
          opt.textContent = d;
          distSelect.appendChild(opt);
        });
      }

      if (minSelect && minSelect.options.length <= 1) {
        const minerals = [...new Set(raw.blockInventory.map(b => b.mineral).filter(Boolean))].sort();
        minerals.forEach(m => {
          const opt = document.createElement('option');
          opt.value = m;
          opt.textContent = m;
          minSelect.appendChild(opt);
        });
      }
    },

    bindGlobalFilterEvents: function() {
      const service = global.DGMM_ANALYTICS;

      document.getElementById('analyticsFilterCategory')?.addEventListener('change', e => {
        service.setFilter('category', e.target.value);
      });
      document.getElementById('analyticsFilterDistrict')?.addEventListener('change', e => {
        service.setFilter('district', e.target.value);
      });
      document.getElementById('analyticsFilterMineral')?.addEventListener('change', e => {
        service.setFilter('mineral', e.target.value);
      });
      document.getElementById('analyticsFilterBlockType')?.addEventListener('change', e => {
        service.setFilter('blockType', e.target.value);
      });
      document.getElementById('analyticsFilterStatus')?.addEventListener('change', e => {
        service.setFilter('status', e.target.value);
      });
      document.getElementById('analyticsAsOfDate')?.addEventListener('change', e => {
        service.setFilter('asOfDate', e.target.value);
      });

      // Per-Acre view toggle (Rule 2: Blocks only (default) / All / Zones only)
      document.querySelectorAll('.analytics-per-acre-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.analytics-per-acre-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const mode = btn.getAttribute('data-mode') || 'blocks';
          service.setFilter('perAcreMode', mode);
        });
      });

      document.getElementById('btnResetAnalyticsFilters')?.addEventListener('click', () => {
        service.resetFilters();
        // Reset DOM elements
        if (document.getElementById('analyticsFilterCategory')) document.getElementById('analyticsFilterCategory').value = 'ALL';
        if (document.getElementById('analyticsFilterDistrict')) document.getElementById('analyticsFilterDistrict').value = 'ALL';
        if (document.getElementById('analyticsFilterMineral')) document.getElementById('analyticsFilterMineral').value = 'ALL';
        if (document.getElementById('analyticsFilterBlockType')) document.getElementById('analyticsFilterBlockType').value = 'ALL';
        if (document.getElementById('analyticsFilterStatus')) document.getElementById('analyticsFilterStatus').value = 'ALL';
        if (document.getElementById('analyticsAsOfDate')) document.getElementById('analyticsAsOfDate').value = '2026-11-13';

        document.querySelectorAll('.analytics-per-acre-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('.analytics-per-acre-btn[data-mode="blocks"]')?.classList.add('active');
      });
    },

    bindPageNavEvents: function() {
      const service = global.DGMM_ANALYTICS;

      // Top Tab Pills
      document.querySelectorAll('.analytics-nav-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          const page = pill.getAttribute('data-page');
          if (page) {
            UI.switchPage(page);
          }
        });
      });

      // Sidebar Submenu Items
      document.querySelectorAll('#submenuAnalytics [data-analytics-page]').forEach(item => {
        item.addEventListener('click', e => {
          e.stopPropagation();
          const page = item.getAttribute('data-analytics-page');
          if (page) {
            if (typeof window.activateTab === 'function') {
              window.activateTab('tab-analytics');
            }
            UI.switchPage(page);
          }
        });
      });
    },

    switchPage: function(pageId) {
      global.DGMM_ANALYTICS.state.activePage = pageId;

      document.querySelectorAll('.analytics-nav-pill').forEach(p => {
        p.classList.toggle('active', p.getAttribute('data-page') === pageId);
      });

      document.querySelectorAll('#submenuAnalytics .submenu-item').forEach(s => {
        s.classList.toggle('active', s.getAttribute('data-analytics-page') === pageId);
      });

      document.querySelectorAll('.analytics-page-view').forEach(v => {
        v.style.display = 'none';
      });

      const activeView = document.getElementById(`analyticsView_${pageId}`);
      if (activeView) activeView.style.display = 'block';

      this.renderActivePage();
    },

    bindExportEvents: function() {
      // PDF Export
      document.getElementById('btnExportAnalyticsPdf')?.addEventListener('click', () => {
        window.print();
      });

      // Excel Export
      document.getElementById('btnExportAnalyticsExcel')?.addEventListener('click', () => {
        UI.exportActivePageToExcel();
      });

      // CSV Export
      document.getElementById('btnExportAnalyticsCsv')?.addEventListener('click', () => {
        UI.exportActivePageToCsv();
      });
    },

    renderActivePage: function() {
      const pageId = global.DGMM_ANALYTICS.state.activePage || 'page-a';
      switch (pageId) {
        case 'page-a':
          this.renderPageA();
          break;
        case 'page-b':
          this.renderPageB();
          break;
        case 'page-c':
          this.renderPageC();
          break;
        case 'page-d':
          this.renderPageD();
          break;
        case 'page-e':
          this.renderPageE();
          break;
        case 'page-f':
          this.renderPageF();
          break;
        case 'page-g':
          this.renderPageG();
          break;
      }
    },

    renderInsightsStrip: function(insights) {
      const container = document.getElementById('analyticsInsightsContainer');
      if (!container) return;
      container.innerHTML = insights.map((text, idx) => `
        <div class="analytics-insight-item">
          <div class="insight-bullet-tag"><i class="fa-solid fa-sparkles"></i> Takeaway ${idx + 1}</div>
          <div class="insight-text">${text}</div>
        </div>
      `).join('');
    },

    createOrUpdateChart: function(canvasId, config) {
      if (!window.Chart) return null;
      const ctx = document.getElementById(canvasId);
      if (!ctx) return null;

      if (this.charts[canvasId]) {
        this.charts[canvasId].destroy();
      }

      // Add common styling defaults
      config.options = config.options || {};
      config.options.responsive = true;
      config.options.maintainAspectRatio = false;
      config.options.animation = { duration: 400 };

      const chart = new Chart(ctx, config);
      this.charts[canvasId] = chart;
      return chart;
    },

    downloadChartPNG: function(canvasId, title) {
      const chart = this.charts[canvasId];
      if (!chart) return;
      const a = document.createElement('a');
      a.href = chart.toBase64Image();
      a.download = `DGMM_${title.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
      a.click();
    },

    downloadChartCSV: function(canvasId, title) {
      const chart = this.charts[canvasId];
      if (!chart || !chart.data) return;

      const labels = chart.data.labels || [];
      const datasets = chart.data.datasets || [];

      let csv = 'Label,' + datasets.map(d => `"${d.label || 'Value'}"`).join(',') + '\n';
      labels.forEach((lbl, idx) => {
        const row = [
          `"${lbl}"`,
          ...datasets.map(d => d.data[idx] !== undefined ? d.data[idx] : '')
        ];
        csv += row.join(',') + '\n';
      });

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `DGMM_${title.replace(/[^a-zA-Z0-9]/g, '_')}.csv`;
      a.click();
    },

    // -------------------------------------------------------------
    // RENDER PAGE A: EXECUTIVE DASHBOARD
    // -------------------------------------------------------------
    renderPageA: function() {
      const data = global.DGMM_ANALYTICS.getPageA_ExecutiveData();
      const mode = global.DGMM_ANALYTICS.state.perAcreMode;

      this.renderInsightsStrip(data.insights);

      // KPI Tiles
      document.getElementById('kpiTotalBlocks').textContent = this.formatNum(data.totalBlocks);
      document.getElementById('kpiTotalArea').textContent = `${this.formatNum(data.totalArea)} ac`;
      document.getElementById('kpiTotalReserve').textContent = this.formatPKR(data.totalReserve);

      // Per-Acre KPI (with toggle: Blocks only / All-in / Zones only)
      let displayPerAcre = data.blocksAvgPerAcre;
      let displayPerAcreSub = 'Blocks Only (Excl. Zones)';
      if (mode === 'all') {
        displayPerAcre = data.allInAvgPerAcre;
        displayPerAcreSub = 'All-In (Blocks & River Zones)';
      } else if (mode === 'zones') {
        displayPerAcre = data.zonesAvgPerAcre;
        displayPerAcreSub = 'River-Bed Zones Only';
      }

      document.getElementById('kpiAvgReservePerAcre').textContent = `PKR ${Math.round(displayPerAcre).toLocaleString()}`;
      document.getElementById('kpiAvgReservePerAcreSub').innerHTML = `
        <span>${displayPerAcreSub}</span>
        <span class="analytics-allin-badge" title="All-In provincial average across both blocks and zones is PKR 6,180/acre. Zones comprise 96% of area.">
          All-In: PKR 6,180/ac <i class="fa-solid fa-circle-info"></i>
        </span>
      `;

      document.getElementById('kpiOccupancy').textContent = `${data.occupancyRate.toFixed(1)}%`;
      document.getElementById('kpiOccupancySub').textContent = `${this.formatNum(data.grantedCount)} Granted / ${this.formatNum(data.vacantCount)} Vacant`;
      document.getElementById('kpiUpcomingPipeline').textContent = this.formatNum(data.upcomingCount);

      // Secondary KPI cards
      document.getElementById('kpiBlocksReservePerAcre').textContent = `PKR ${Math.round(data.blocksAvgPerAcre).toLocaleString()}`;
      document.getElementById('kpiZonesShare').textContent = `${data.shareAreaInZones.toFixed(1)}%`;
      document.getElementById('kpiMedianReserve').textContent = this.formatPKR(data.medianReserve);
      document.getElementById('kpiVacantReserve').textContent = this.formatPKR(data.vacantReservePrice);

      // Footnote
      document.getElementById('kpiExcludedFootnote').textContent = `* Per-acre ratios exclude ${data.zeroAreaCount} zero-area and ${data.zeroReserveCount} zero-reserve blocks pursuant to Rule 3.`;

      // Chart 1: Occupancy Donut by Branch
      this.createOrUpdateChart('chartPageA_OccupancyDonut', {
        type: 'doughnut',
        data: {
          labels: ['MM Granted', 'MM Vacant', 'SSM Granted', 'SSM Vacant'],
          datasets: [{
            data: [
              data.occupancyByBranch.mm.granted,
              data.occupancyByBranch.mm.vacant,
              data.occupancyByBranch.ssm.granted,
              data.occupancyByBranch.ssm.vacant
            ],
            backgroundColor: ['#059669', '#EF4444', '#2563EB', '#F59E0B'],
            borderWidth: 2,
            borderColor: '#FFFFFF'
          }]
        },
        options: {
          plugins: {
            legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } },
            tooltip: {
              callbacks: {
                label: ctx => ` ${ctx.label}: ${ctx.raw} blocks (${((ctx.raw / (data.totalBlocks || 1)) * 100).toFixed(1)}%)`
              }
            }
          }
        }
      });

      // Chart 2: Titles in Force by Category
      this.createOrUpdateChart('chartPageA_TitlesCategory', {
        type: 'bar',
        data: {
          labels: ['LSM Mining Leases', 'LSM Valid ELs', 'SSM Mining Leases', 'SSM Prospecting', 'MM Granted Blocks'],
          datasets: [{
            label: 'Titles in Force',
            data: [
              data.titlesInForce.lsmML,
              data.titlesInForce.lsmEL,
              data.titlesInForce.ssmML,
              data.titlesInForce.ssmPL,
              data.titlesInForce.mmGranted
            ],
            backgroundColor: ['#1D4ED8', '#60A5FA', '#047857', '#34D399', '#D97706'],
            borderRadius: 6
          }]
        },
        options: {
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
            x: { grid: { display: false } }
          }
        }
      });

      // Chart 3: Top 10 Districts by Reserve Price
      this.createOrUpdateChart('chartPageA_TopDistricts', {
        type: 'bar',
        data: {
          labels: data.top10Districts.map(d => d.district),
          datasets: [{
            label: 'Reserve Price (PKR)',
            data: data.top10Districts.map(d => d.reserve),
            backgroundColor: '#0F766E',
            borderRadius: 5
          }]
        },
        options: {
          indexAxis: 'y',
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: ctx => ` Reserve: PKR ${(ctx.raw / 1e9).toFixed(2)}B (${data.top10Districts[ctx.dataIndex].share.toFixed(1)}% of province)`
              }
            }
          },
          scales: {
            x: {
              ticks: { callback: v => `PKR ${(v / 1e9).toFixed(1)}B` },
              grid: { color: 'rgba(0,0,0,0.05)' }
            },
            y: { grid: { display: false } }
          }
        }
      });

      // Chart 4: Upcoming Auctions by Mineral
      this.createOrUpdateChart('chartPageA_UpcomingMinerals', {
        type: 'bar',
        data: {
          labels: data.upcomingByMineral.map(m => m.mineral),
          datasets: [{
            label: 'Upcoming Auction Blocks',
            data: data.upcomingByMineral.map(m => m.count),
            backgroundColor: '#D97706',
            borderRadius: 4
          }]
        },
        options: {
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
            x: { ticks: { autoSkip: false, maxRotation: 45 }, grid: { display: false } }
          }
        }
      });
    },

    // -------------------------------------------------------------
    // RENDER PAGE B: LARGE SCALE MINING (LSM)
    // -------------------------------------------------------------
    renderPageB: function() {
      const data = global.DGMM_ANALYTICS.getPageB_LsmData();
      this.renderInsightsStrip(data.insights);

      document.getElementById('kpiLsmML').textContent = this.formatNum(data.lsmMLCount);
      document.getElementById('kpiLsmEL').textContent = this.formatNum(data.lsmELCount);
      document.getElementById('kpiLsmArea').textContent = `${this.formatNum(data.totalArea)} ac`;
      document.getElementById('kpiLsmAvgArea').textContent = `${Math.round(data.avgArea).toLocaleString()} ac`;
      document.getElementById('kpiLsmPastExpiry').textContent = `${data.sharePastExpiry.toFixed(1)}%`;
      document.getElementById('kpiLsmPending').textContent = this.formatNum(data.pendingApps.length);

      // Area by mineral
      this.createOrUpdateChart('chartPageB_AreaMineral', {
        type: 'bar',
        data: {
          labels: data.areaByMineral.map(m => m.mineral),
          datasets: [{
            label: 'Leased Area (Acres)',
            data: data.areaByMineral.map(m => m.area),
            backgroundColor: '#1E40AF',
            borderRadius: 4
          }]
        },
        options: {
          plugins: { legend: { display: false } },
          scales: {
            y: { ticks: { callback: v => `${Math.round(v).toLocaleString()} ac` } }
          }
        }
      });

      // Leases by district
      this.createOrUpdateChart('chartPageB_LeasesDistrict', {
        type: 'bar',
        data: {
          labels: data.leasesByDistrict.map(d => d.district),
          datasets: [{
            label: 'LSM Concessions',
            data: data.leasesByDistrict.map(d => d.count),
            backgroundColor: '#0D9488',
            borderRadius: 4
          }]
        },
        options: { plugins: { legend: { display: false } } }
      });

      // Expiry Wall (Stacked ML / EL)
      this.createOrUpdateChart('chartPageB_ExpiryWall', {
        type: 'bar',
        data: {
          labels: data.expiryWall.map(w => w.year),
          datasets: [
            { label: 'Mining Leases (ML)', data: data.expiryWall.map(w => w.ml), backgroundColor: '#1D4ED8' },
            { label: 'Valid Exploration Licences (EL)', data: data.expiryWall.map(w => w.el), backgroundColor: '#60A5FA' }
          ]
        },
        options: {
          plugins: { legend: { position: 'top' } },
          scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } }
        }
      });

      // Top 5 Holders by Area
      this.createOrUpdateChart('chartPageB_TopHolders', {
        type: 'bar',
        data: {
          labels: data.top5Holders.map(h => h.holder.length > 25 ? h.holder.slice(0, 25) + '...' : h.holder),
          datasets: [{
            label: 'Acreage',
            data: data.top5Holders.map(h => h.area),
            backgroundColor: '#0284C7',
            borderRadius: 4
          }]
        },
        options: {
          indexAxis: 'y',
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: ctx => ` ${data.top5Holders[ctx.dataIndex].holder}: ${data.top5Holders[ctx.dataIndex].area.toLocaleString()} ac (${data.top5Holders[ctx.dataIndex].share.toFixed(1)}%)`
              }
            }
          }
        }
      });

      // EL Stage Funnel
      this.createOrUpdateChart('chartPageB_ElFunnel', {
        type: 'bar',
        data: {
          labels: data.elStageFunnel.map(f => f.stage),
          datasets: [{
            label: 'Concessions',
            data: data.elStageFunnel.map(f => f.count),
            backgroundColor: ['#93C5FD', '#3B82F6', '#1D4ED8', '#047857'],
            borderRadius: 6
          }]
        },
        options: { plugins: { legend: { display: false } } }
      });

      // Pending Ageing Histogram
      this.createOrUpdateChart('chartPageB_PendingAgeing', {
        type: 'bar',
        data: {
          labels: data.ageingHistogram.map(h => h.bracket),
          datasets: [{
            label: 'Applications',
            data: data.ageingHistogram.map(h => h.count),
            backgroundColor: '#F59E0B',
            borderRadius: 4
          }]
        },
        options: { plugins: { legend: { display: false } } }
      });

      // Render Active Titles Register Table (ML & EL)
      const regTbody = document.getElementById('tableLsmRegisterBody');
      if (regTbody && data.allLsmTitles) {
        regTbody.innerHTML = data.allLsmTitles.map((t, idx) => {
          const typeBadge = t.type === 'ML'
            ? '<span class="badge-status-pill badge-active" style="background:#EFF6FF; color:#1D4ED8; font-weight:700;">Mining Lease (ML)</span>'
            : '<span class="badge-status-pill badge-active" style="background:#F0FDF4; color:#15803D; font-weight:700;">Exploration Lic (EL)</span>';
          return `
            <tr>
              <td><strong>${idx + 1}</strong></td>
              <td>${typeBadge}</td>
              <td><code>${t.ref || t.leaseNo || t.appNo || 'ML-' + (idx + 1)}</code></td>
              <td style="font-weight: 600;">${t.company || t.licensee || 'Concessionaire'}</td>
              <td>${t.normDistrict}</td>
              <td>${t.normMineral}</td>
              <td style="font-weight: 700;">${(t.numericArea || 0).toLocaleString()} ac</td>
              <td>${t.grantDate || t.from || 'N/A'}</td>
              <td>${t.expiryDate || t.to || 'N/A'}</td>
              <td><span class="badge-status-pill badge-active">${t.status || 'In Force'}</span></td>
            </tr>
          `;
        }).join('');
      }

      // Render Pending Applications Table
      const pendingTbody = document.getElementById('tableLsmPendingBody');
      if (pendingTbody) {
        pendingTbody.innerHTML = data.pendingApps.map(p => `
          <tr>
            <td><strong>${p.srNo}</strong></td>
            <td><code>${p.appNo}</code></td>
            <td style="font-weight: 600;">${p.applicant}</td>
            <td>${p.normMineral}</td>
            <td>${p.normDistrict}</td>
            <td style="font-weight: 700;">${p.numericArea.toLocaleString()} ac</td>
            <td>${p.formattedDate}</td>
            <td><span class="badge-status-pill badge-vacant">${p.ageYears.toFixed(1)} yrs (${p.ageDays} d)</span></td>
            <td><span class="badge-status-pill badge-process">${p.status}</span></td>
          </tr>
        `).join('');
      }
    },

    // -------------------------------------------------------------
    // RENDER PAGE C: SMALL SCALE MINING (SSM)
    // -------------------------------------------------------------
    renderPageC: function() {
      const data = global.DGMM_ANALYTICS.getPageC_SsmData();
      this.renderInsightsStrip(data.insights);

      document.getElementById('kpiSsmTitles').textContent = this.formatNum(data.totalTitles);
      document.getElementById('kpiSsmArea').textContent = `${this.formatNum(data.totalArea)} ac`;
      document.getElementById('kpiSsmAvgArea').textContent = `${Math.round(data.avgArea).toLocaleString()} ac`;
      document.getElementById('kpiSsmHolders').textContent = this.formatNum(data.uniqueHoldersCount);
      document.getElementById('kpiSsmAuctionShare').textContent = `${data.auctionShare.toFixed(1)}%`;
      document.getElementById('kpiSsmAppShare').textContent = `${data.appShare.toFixed(1)}%`;

      // Grants by Year (Policy Shift Stacked Bar)
      this.createOrUpdateChart('chartPageC_GrantsByYear', {
        type: 'bar',
        data: {
          labels: data.grantsByYear.map(g => g.year),
          datasets: [
            { label: 'Application Mode', data: data.grantsByYear.map(g => g.application), backgroundColor: '#059669' },
            { label: 'Auction Mode', data: data.grantsByYear.map(g => g.auction), backgroundColor: '#D97706' }
          ]
        },
        options: {
          plugins: { legend: { position: 'top' } },
          scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } }
        }
      });

      // Top 15 Holders Pareto
      this.createOrUpdateChart('chartPageC_Top15Holders', {
        type: 'bar',
        data: {
          labels: data.top15Pareto.map(h => h.holder.length > 20 ? h.holder.slice(0, 20) + '...' : h.holder),
          datasets: [
            {
              type: 'bar',
              label: 'Acreage',
              data: data.top15Pareto.map(h => h.acreage),
              backgroundColor: '#0284C7',
              yAxisID: 'y'
            },
            {
              type: 'line',
              label: 'Cumulative %',
              data: data.top15Pareto.map(h => h.cumShare),
              borderColor: '#DC2626',
              borderWidth: 2,
              fill: false,
              yAxisID: 'y1'
            }
          ]
        },
        options: {
          scales: {
            y: { type: 'linear', position: 'left', beginAtZero: true },
            y1: { type: 'linear', position: 'right', max: 100, beginAtZero: true, grid: { display: false } }
          }
        }
      });

      // Tenure Status
      this.createOrUpdateChart('chartPageC_TenureStatus', {
        type: 'doughnut',
        data: {
          labels: data.tenureStatus.map(t => t.status),
          datasets: [{
            data: data.tenureStatus.map(t => t.count),
            backgroundColor: ['#059669', '#F59E0B', '#94A3B8']
          }]
        },
        options: {
          plugins: { legend: { position: 'bottom' } }
        }
      });

      // Auction Premium Stats & Box Plot Indicators
      document.getElementById('statPremMean').textContent = `${data.premiumStats.mean.toFixed(2)}x`;
      document.getElementById('statPremMedian').textContent = `${data.premiumStats.median.toFixed(2)}x`;
      document.getElementById('statPremP25').textContent = `${data.premiumStats.p25.toFixed(2)}x`;
      document.getElementById('statPremP75').textContent = `${data.premiumStats.p75.toFixed(2)}x`;
      document.getElementById('statPremP90').textContent = `${data.premiumStats.p90.toFixed(2)}x`;
      document.getElementById('statPremCompetitive').textContent = `${data.premiumStats.competitiveRate.toFixed(1)}%`;

      // Premium by Mineral Bar
      this.createOrUpdateChart('chartPageC_PremiumMineral', {
        type: 'bar',
        data: {
          labels: data.premiumByMineral.map(m => m.mineral),
          datasets: [{
            label: 'Median Premium (x Reserve)',
            data: data.premiumByMineral.map(m => m.median),
            backgroundColor: '#D97706',
            borderRadius: 4
          }]
        },
        options: {
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true, ticks: { callback: v => `${v}x` } } }
        }
      });

      // Render SSM Data Checks Audit Table
      const checksTbody = document.getElementById('tableSsmDataChecksBody');
      if (checksTbody && data.dataChecks) {
        const issues = [];
        data.dataChecks.invalidDates.forEach(t => {
          issues.push({
            issue: '<span class="badge-status-pill badge-vacant" style="color:#DC2626; font-weight:700;">Expiry Precedes Grant</span>',
            ref: t.ref || 'SSM Title',
            holder: t.client || 'N/A',
            district: t.district || 'N/A',
            mineral: t.mineral || 'N/A',
            grantDate: t.grantDate || 'N/A',
            expiryDate: t.expiryDate || 'N/A',
            note: 'Date sequence inverted in raw cadastre record'
          });
        });
        data.dataChecks.missingDates.forEach(t => {
          issues.push({
            issue: '<span class="badge-status-pill badge-process" style="color:#D97706; font-weight:700;">Missing Tenure Dates</span>',
            ref: t.ref || 'SSM Title',
            holder: t.client || 'N/A',
            district: t.district || 'N/A',
            mineral: t.mineral || 'N/A',
            grantDate: t.grantDate || 'Missing',
            expiryDate: t.expiryDate || 'Missing',
            note: 'Unspecified grant or expiry date'
          });
        });
        checksTbody.innerHTML = issues.map((row, idx) => `
          <tr>
            <td><strong>${idx + 1}</strong></td>
            <td>${row.issue}</td>
            <td><code>${row.ref}</code></td>
            <td style="font-weight: 600;">${row.holder}</td>
            <td>${row.district}</td>
            <td>${row.mineral}</td>
            <td>${row.grantDate}</td>
            <td>${row.expiryDate}</td>
            <td style="font-size: 0.77rem; color: #64748B;">${row.note}</td>
          </tr>
        `).join('');
      }
    },

    // -------------------------------------------------------------
    // RENDER PAGE D: MINOR MINERALS
    // -------------------------------------------------------------
    renderPageD: function() {
      const data = global.DGMM_ANALYTICS.getPageD_MinorMineralsData();
      this.renderInsightsStrip(data.insights);

      document.getElementById('kpiMmTotalUnits').textContent = this.formatNum(data.totalUnits);
      document.getElementById('kpiMmGranted').textContent = this.formatNum(data.grantedCount);
      document.getElementById('kpiMmVacant').textContent = this.formatNum(data.vacantCount);
      document.getElementById('kpiMmBlocksArea').textContent = `${this.formatNum(data.blocksArea)} ac`;
      document.getElementById('kpiMmZonesArea').textContent = `${this.formatNum(data.zonesArea)} ac`;
      document.getElementById('kpiMmBlocksPerAcre').textContent = `PKR ${Math.round(data.blocksPerAcre).toLocaleString()}`;
      document.getElementById('kpiMmZonesPerAcre').textContent = `PKR ${Math.round(data.zonesPerAcre).toLocaleString()}`;
      document.getElementById('kpiMmMeanPremium').textContent = `${data.meanAuctionPremium.toFixed(2)}x`;

      // Occupancy by District
      this.createOrUpdateChart('chartPageD_OccupancyDistrict', {
        type: 'bar',
        data: {
          labels: data.occupancyByDistrict.slice(0, 12).map(d => d.district),
          datasets: [
            { label: 'Granted', data: data.occupancyByDistrict.slice(0, 12).map(d => d.granted), backgroundColor: '#059669' },
            { label: 'Vacant', data: data.occupancyByDistrict.slice(0, 12).map(d => d.vacant), backgroundColor: '#EF4444' }
          ]
        },
        options: {
          scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } }
        }
      });

      // Reserve by Mineral
      this.createOrUpdateChart('chartPageD_ReserveMineral', {
        type: 'bar',
        data: {
          labels: data.reserveByMineral.map(m => m.mineral),
          datasets: [{
            label: 'Reserve Price (PKR)',
            data: data.reserveByMineral.map(m => m.reserve),
            backgroundColor: '#047857'
          }]
        },
        options: {
          plugins: { legend: { display: false } },
          scales: { y: { ticks: { callback: v => `PKR ${(v / 1e9).toFixed(1)}B` } } }
        }
      });

      // Render Reconciliation Table (Discrepancies between Meta Data and Minor Minerals tabs)
      const tbody = document.getElementById('tableMmReconciliationBody');
      if (tbody) {
        tbody.innerHTML = data.reconciliation.map(r => `
          <tr>
            <td><code>${r.code}</code></td>
            <td>${r.name}</td>
            <td>${r.district}</td>
            <td>${r.mineral}</td>
            <td>
              <span class="badge-status-pill ${r.statusMismatch ? 'badge-vacant' : 'badge-granted'}">
                Meta: ${r.metaStatus} | MM: ${r.mmStatus}
              </span>
            </td>
            <td>PKR ${r.metaReserve.toLocaleString()}</td>
            <td>PKR ${r.mmReserve.toLocaleString()}</td>
            <td style="color: ${r.priceMismatch ? '#DC2626' : '#059669'}; font-weight: 700;">
              ${r.priceMismatch ? `PKR ${(r.priceDiff).toLocaleString()}` : 'Reconciled'}
            </td>
          </tr>
        `).join('');
      }
    },

    // -------------------------------------------------------------
    // RENDER PAGE E: DISTRICT YIELD & LOCATION QUOTIENTS
    // -------------------------------------------------------------
    renderPageE: function() {
      const data = global.DGMM_ANALYTICS.getPageE_DistrictYieldData();
      this.renderInsightsStrip(data.insights);

      // Render District Master Table
      const tbody = document.getElementById('tableDistrictYieldBody');
      if (tbody) {
        tbody.innerHTML = data.districtRows.map(r => `
          <tr>
            <td><strong>${r.rank}</strong></td>
            <td><strong>${r.district}</strong></td>
            <td><code>${r.fieldOffice}</code></td>
            <td>${r.lsmML}</td>
            <td>${r.lsmEL}</td>
            <td>${r.ssmML}</td>
            <td>${r.ssmPL}</td>
            <td>${r.mmGranted}</td>
            <td><strong>${r.totalTitles}</strong></td>
            <td>${r.inventoryBlocks} (${r.vacantBlocks} vac)</td>
            <td>${r.occupancyRate.toFixed(1)}%</td>
            <td style="font-weight:700;">${UI.formatPKR(r.totalReserve)}</td>
            <td>PKR ${Math.round(r.reservePerAcreBlocks).toLocaleString()}</td>
            <td>${r.upcomingAuctions}</td>
          </tr>
        `).join('');
      }

      // Ranked Bar Chart
      this.createOrUpdateChart('chartPageE_RankedBar', {
        type: 'bar',
        data: {
          labels: data.districtRows.slice(0, 15).map(d => d.district),
          datasets: [{
            label: 'Reserve Price (PKR)',
            data: data.districtRows.slice(0, 15).map(d => d.totalReserve),
            backgroundColor: '#0A6238',
            borderRadius: 4
          }]
        },
        options: {
          indexAxis: 'y',
          plugins: { legend: { display: false } },
          scales: { x: { ticks: { callback: v => `PKR ${(v / 1e9).toFixed(1)}B` } } }
        }
      });

      // Bubble Chart: Area vs Reserve/Acre
      this.createOrUpdateChart('chartPageE_Bubble', {
        type: 'bubble',
        data: {
          datasets: [{
            label: 'Districts',
            data: data.bubbleData,
            backgroundColor: 'rgba(37, 99, 235, 0.65)',
            borderColor: '#1D4ED8'
          }]
        },
        options: {
          plugins: {
            tooltip: {
              callbacks: {
                label: ctx => ` ${ctx.raw.district}: Area ${Math.round(ctx.raw.x).toLocaleString()} ac, Rs ${Math.round(ctx.raw.y).toLocaleString()}/ac, Reserve ${UI.formatPKR(ctx.raw.reserve)}`
              }
            }
          },
          scales: {
            x: { title: { display: true, text: 'Total District Area (Acres)' } },
            y: { title: { display: true, text: 'Reserve per Acre (Blocks Only, PKR)' } }
          }
        }
      });

      // Location Quotient Heat Grid
      const lqTbody = document.getElementById('tableLocationQuotientBody');
      const lqThead = document.getElementById('tableLocationQuotientHead');
      const topMins = data.mineralsList.slice(0, 8);

      if (lqThead) {
        lqThead.innerHTML = `<tr><th>District</th>${topMins.map(m => `<th>${m}</th>`).join('')}</tr>`;
      }

      if (lqTbody) {
        lqTbody.innerHTML = data.districtRows.slice(0, 15).map(r => `
          <tr>
            <td><strong>${r.district}</strong></td>
            ${topMins.map(m => {
              const lqObj = r.locationQuotients[m] || { lq: 0, isSpecialized: false };
              const bg = lqObj.isSpecialized ? 'rgba(5, 150, 105, 0.18)' : 'transparent';
              const color = lqObj.isSpecialized ? '#065F46' : '#64748B';
              return `<td style="background:${bg}; color:${color}; text-align:center; font-weight:${lqObj.isSpecialized ? '700' : 'normal'}">
                ${lqObj.lq.toFixed(2)}${lqObj.isSpecialized ? ' ★' : ''}
              </td>`;
            }).join('')}
          </tr>
        `).join('');
      }
    },

    // -------------------------------------------------------------
    // RENDER PAGE F: MINERAL ECONOMICS
    // -------------------------------------------------------------
    renderPageF: function() {
      const data = global.DGMM_ANALYTICS.getPageF_MineralEconomicsData();
      this.renderInsightsStrip(data.insights);

      // Render Master Mineral Table
      const tbody = document.getElementById('tableMineralEconomicsBody');
      if (tbody) {
        tbody.innerHTML = data.mineralsList.map(m => `
          <tr>
            <td><strong>${m.mineral}</strong></td>
            <td>${m.titles}</td>
            <td><span class="badge-status-pill badge-granted">${m.granted}</span> / <span class="badge-status-pill badge-vacant">${m.vacant}</span></td>
            <td>${Math.round(m.totalArea).toLocaleString()} ac</td>
            <td style="font-weight:700;">${UI.formatPKR(m.totalReserve)}</td>
            <td>PKR ${Math.round(m.reservePerAcreBlocks).toLocaleString()}</td>
            <td>${UI.formatPKR(m.medianReserve)}</td>
            <td>${m.avgPremium.toFixed(2)}x</td>
            <td><strong>${m.topDistrict}</strong></td>
          </tr>
        `).join('');
      }

      // Per-Acre Bar Chart by Mineral
      this.createOrUpdateChart('chartPageF_PerAcreMineral', {
        type: 'bar',
        data: {
          labels: data.mineralsList.slice(0, 12).map(m => m.mineral),
          datasets: [{
            label: 'Reserve per Acre (Blocks Only, PKR)',
            data: data.mineralsList.slice(0, 12).map(m => m.reservePerAcreBlocks),
            backgroundColor: '#0284C7',
            borderRadius: 4
          }]
        },
        options: {
          plugins: { legend: { display: false } },
          scales: { y: { ticks: { callback: v => `Rs ${Math.round(v).toLocaleString()}` } } }
        }
      });

      // District x Mineral Heat Matrix
      const matrixTbody = document.getElementById('tableHeatMatrixBody');
      const matrixThead = document.getElementById('tableHeatMatrixHead');
      const topMins = data.allMinerals.slice(0, 8);

      if (matrixThead) {
        matrixThead.innerHTML = `<tr><th>District</th>${topMins.map(m => `<th>${m}</th>`).join('')}</tr>`;
      }

      if (matrixTbody) {
        matrixTbody.innerHTML = data.heatMatrix.map(row => `
          <tr>
            <td><strong>${row.district}</strong></td>
            ${topMins.map(min => {
              const cell = row.cells[min] || { count: 0, reserve: 0 };
              const intensity = Math.min(1, cell.count / 15);
              const bg = cell.count > 0 ? `rgba(16, 185, 129, ${0.15 + intensity * 0.65})` : 'transparent';
              const textCol = intensity > 0.4 ? '#FFFFFF' : '#0F172A';
              return `<td style="background:${bg}; color:${textCol}; text-align:center; font-weight:700;">
                ${cell.count > 0 ? cell.count : '-'}
              </td>`;
            }).join('')}
          </tr>
        `).join('');
      }
    },

    // -------------------------------------------------------------
    // RENDER PAGE G: STATISTICAL & ECONOMETRIC MODELS (10 MODELS)
    // -------------------------------------------------------------
    renderPageG: function() {
      const data = global.DGMM_ANALYTICS.getPageG_StatisticalModelsData();
      this.renderInsightsStrip(data.insights);

      // Model 1: Distribution Table
      const distTbody = document.getElementById('tableDistributionModelBody');
      if (distTbody) {
        const groups = [data.distMMBlocks, data.distMMZones, data.distSSMBlocks];
        distTbody.innerHTML = groups.map(g => `
          <tr>
            <td><strong>${g.name}</strong></td>
            <td>${g.n}</td>
            <td>PKR ${Math.round(g.mean).toLocaleString()}</td>
            <td>PKR ${Math.round(g.median).toLocaleString()}</td>
            <td>PKR ${Math.round(g.stdev).toLocaleString()}</td>
            <td>${g.cv.toFixed(2)}</td>
            <td>PKR ${Math.round(g.p25).toLocaleString()}</td>
            <td>PKR ${Math.round(g.p75).toLocaleString()}</td>
            <td>PKR ${Math.round(g.p90).toLocaleString()}</td>
            <td>${g.skewness.toFixed(2)}</td>
          </tr>
        `).join('');
      }

      // Model 2: Concentration (HHI & Gini)
      document.getElementById('statHhiReserve').textContent = Math.round(data.hhiDistrictReserve).toLocaleString();
      document.getElementById('statHhiTitles').textContent = Math.round(data.hhiDistrictTitles).toLocaleString();
      document.getElementById('statHhiMineral').textContent = Math.round(data.hhiMineralTitles).toLocaleString();
      document.getElementById('statHhiLsm').textContent = Math.round(data.hhiLsmHolderArea).toLocaleString();
      document.getElementById('statGiniReserve').textContent = data.giniReserve.toFixed(3);
      document.getElementById('statTop5Share').textContent = `${data.top5ReserveShare.toFixed(1)}%`;

      // Model 2 Lorenz Curve Chart
      this.createOrUpdateChart('chartModel2_LorenzCurve', {
        type: 'line',
        data: {
          labels: data.lorenzCurveReserve.map(p => `${p.p}%`),
          datasets: [
            {
              label: 'Lorenz Curve (Reserve Price)',
              data: data.lorenzCurveReserve.map(p => p.l),
              borderColor: '#059669',
              borderWidth: 2.5,
              fill: false
            },
            {
              label: 'Line of Absolute Equality',
              data: data.lorenzCurveReserve.map(p => p.p),
              borderColor: '#94A3B8',
              borderDash: [5, 5],
              borderWidth: 1.5,
              fill: false
            }
          ]
        },
        options: {
          scales: {
            x: { title: { display: true, text: 'Cumulative % of Districts' } },
            y: { title: { display: true, text: 'Cumulative % of Reserve Price' }, min: 0, max: 100 }
          }
        }
      });

      // Model 3: Pareto Chart (80% Cutoff)
      this.createOrUpdateChart('chartModel3_Pareto', {
        type: 'bar',
        data: {
          labels: data.paretoData.slice(0, 15).map(p => p.district),
          datasets: [
            {
              type: 'bar',
              label: 'Reserve Price (PKR)',
              data: data.paretoData.slice(0, 15).map(p => p.reserve),
              backgroundColor: '#0F766E',
              yAxisID: 'y'
            },
            {
              type: 'line',
              label: 'Cumulative %',
              data: data.paretoData.slice(0, 15).map(p => p.cumPct),
              borderColor: '#DC2626',
              borderWidth: 2,
              fill: false,
              yAxisID: 'y1'
            }
          ]
        },
        options: {
          scales: {
            y: { position: 'left', beginAtZero: true, ticks: { callback: v => `PKR ${(v / 1e9).toFixed(1)}B` } },
            y1: { position: 'right', min: 0, max: 100, grid: { display: false } }
          }
        }
      });

      // Model 4: Price-Size Regression Stats & Scatter
      document.getElementById('statRegMM_b').textContent = data.regMM.b.toFixed(3);
      document.getElementById('statRegMM_r2').textContent = data.regMM.r2.toFixed(3);
      document.getElementById('statRegMM_p').textContent = data.regMM.pValue < 0.001 ? '< 0.001' : data.regMM.pValue.toFixed(3);
      document.getElementById('statRegMM_interpretation').innerHTML = `
        Elasticity $\\beta = ${data.regMM.b.toFixed(3)}$: A 10% larger block carries a <strong>${data.mmPctChange}%</strong> change in reserve valuation. Size explains only <strong>${(data.regMM.r2 * 100).toFixed(1)}%</strong> of variance ($R^2 = ${data.regMM.r2.toFixed(3)}$); geology and cluster location dominate.
      `;

      document.getElementById('statRegSSM_b').textContent = data.regSSM.b.toFixed(3);
      document.getElementById('statRegSSM_r2').textContent = data.regSSM.r2.toFixed(3);
      document.getElementById('statRegSSM_p').textContent = data.regSSM.pValue < 0.001 ? '< 0.001' : data.regSSM.pValue.toFixed(3);
      document.getElementById('statRegSSM_interpretation').innerHTML = `
        Elasticity $\\beta = ${data.regSSM.b.toFixed(3)}$: A 10% larger SSM block carries a <strong>${data.ssmPctChange}%</strong> change in reserve price ($R^2 = ${data.regSSM.r2.toFixed(3)}$).
      `;

      // Model 4 Scatter Plot (Log-Log)
      const scatterPoints = data.regMM.points.map(p => ({ x: p.lx, y: p.ly }));
      const minX = Math.min(...scatterPoints.map(p => p.x));
      const maxX = Math.max(...scatterPoints.map(p => p.x));

      this.createOrUpdateChart('chartModel4_RegressionScatter', {
        type: 'scatter',
        data: {
          datasets: [
            {
              label: 'Observed Blocks (ln Area vs ln Reserve)',
              data: scatterPoints,
              backgroundColor: 'rgba(37, 99, 235, 0.5)'
            },
            {
              type: 'line',
              label: `OLS Fitted Line (b = ${data.regMM.b.toFixed(2)})`,
              data: [
                { x: minX, y: data.regMM.a + data.regMM.b * minX },
                { x: maxX, y: data.regMM.a + data.regMM.b * maxX }
              ],
              borderColor: '#DC2626',
              borderWidth: 2.5,
              fill: false
            }
          ]
        },
        options: {
          scales: {
            x: { title: { display: true, text: 'ln(Area in Acres)' } },
            y: { title: { display: true, text: 'ln(Reserve Price in PKR)' } }
          }
        }
      });

      // Model 5: Price Resistance & Mann-Whitney U
      const pr = data.priceResistance;
      document.getElementById('prGrantedMedAcre').textContent = `PKR ${Math.round(pr.grantedMedAcre).toLocaleString()}`;
      document.getElementById('prVacantMedAcre').textContent = `PKR ${Math.round(pr.vacantMedAcre).toLocaleString()}`;
      document.getElementById('prRatioAcre').textContent = `${pr.resistanceRatioAcre.toFixed(2)}x`;
      document.getElementById('prGrantedMedBlock').textContent = UI.formatPKR(pr.grantedMedBlock);
      document.getElementById('prVacantMedBlock').textContent = UI.formatPKR(pr.vacantMedBlock);
      document.getElementById('prRatioBlock').textContent = `${pr.resistanceRatioBlock.toFixed(2)}x`;
      document.getElementById('prMwuU').textContent = pr.mwuTest.u.toLocaleString();
      if (document.getElementById('prMwuZ')) document.getElementById('prMwuZ').textContent = pr.mwuTest.z.toFixed(2);
      document.getElementById('prMwuP').textContent = `z = ${pr.mwuTest.z.toFixed(2)} (p ${pr.mwuTest.pValue < 0.001 ? '< 0.001' : '= ' + pr.mwuTest.pValue.toFixed(3)})`;

      // Model 6: Auction Competition Correlations
      document.getElementById('statCorrArea').textContent = data.auctionCompetition.corrArea.toFixed(3);
      document.getElementById('statCorrReserve').textContent = data.auctionCompetition.corrReserve.toFixed(3);
      document.getElementById('statCorrYear').textContent = data.auctionCompetition.corrYear.toFixed(3);

      // Model 7: Pipeline VaR Scenario Slider
      const slider = document.getElementById('pipelineVaRSlider');
      if (slider) {
        slider.value = global.DGMM_ANALYTICS.state.simClearedRate || 117;
        document.getElementById('pipelineVaRSliderVal').textContent = `${slider.value}%`;

        slider.oninput = e => {
          const val = parseInt(e.target.value, 10);
          document.getElementById('pipelineVaRSliderVal').textContent = `${val}%`;
          global.DGMM_ANALYTICS.setFilter('simClearedRate', val);
        };
      }

      document.getElementById('varVacantReserve').textContent = UI.formatPKR(data.pipelineVaR.vacantReserveTotal);
      document.getElementById('varUpcomingReserve').textContent = UI.formatPKR(data.pipelineVaR.upcomingReserveTotal);
      document.getElementById('varTotalPipeline').textContent = UI.formatPKR(data.pipelineVaR.totalPipelineReserve);
      document.getElementById('varSimulatedYield').textContent = UI.formatPKR(data.pipelineVaR.simulatedPipelineYield);

      // Model 8: Tenure & Renewal Exposure under Rule 46(3)
      const te = data.tenureExposure;
      document.getElementById('tePastExpiryCount').textContent = `${te.pastExpiryExposure.count} titles`;
      document.getElementById('tePastExpiryArea').textContent = `${Math.round(te.pastExpiryExposure.area).toLocaleString()} ac`;
      document.getElementById('te0to12Count').textContent = `${te.exp0to12.count} titles`;
      document.getElementById('te0to12Area').textContent = `${Math.round(te.exp0to12.area).toLocaleString()} ac`;
      document.getElementById('te12to36Count').textContent = `${te.exp12to36.count} titles`;
      document.getElementById('te36plusCount').textContent = `${te.exp36plus.count} titles`;

      // Model 9: Cumulative Grants Trend
      this.createOrUpdateChart('chartModel9_GrantsTrend', {
        type: 'line',
        data: {
          labels: data.trend.cumulativeTrend.map(t => t.year),
          datasets: [
            {
              label: 'Cumulative Concessions Granted',
              data: data.trend.cumulativeTrend.map(t => t.cumulative),
              borderColor: '#059669',
              borderWidth: 2.5,
              fill: true,
              backgroundColor: 'rgba(5, 150, 105, 0.08)'
            },
            {
              label: 'Annual Grants',
              data: data.trend.cumulativeTrend.map(t => t.annual),
              borderColor: '#D97706',
              borderWidth: 1.5,
              fill: false
            }
          ]
        },
        options: {
          scales: { y: { beginAtZero: true } }
        }
      });

      // Model 10: Outlier Detection Table
      const outlierTbody = document.getElementById('tableOutliersBody');
      if (outlierTbody) {
        outlierTbody.innerHTML = data.outliers.outlierBlocksPerAcre.slice(0, 15).map(o => `
          <tr>
            <td><code>${o.record.code}</code></td>
            <td>${o.record.name}</td>
            <td>${o.record.normDistrict}</td>
            <td>${o.record.normMineral}</td>
            <td>${o.record.numericArea.toLocaleString()} ac</td>
            <td>PKR ${Math.round(o.value).toLocaleString()}/ac</td>
            <td><span class="badge-status-pill badge-vacant">High Outlier (> ${Math.round(o.upperFence).toLocaleString()})</span></td>
          </tr>
        `).join('');
      }
    },

    // -------------------------------------------------------------
    // EXPORT UTILITIES (EXCEL & CSV)
    // -------------------------------------------------------------
    exportActivePageToExcel: function() {
      if (!window.XLSX) {
        alert('SheetJS library is initializing. Please retry in a moment.');
        return;
      }

      const pageId = global.DGMM_ANALYTICS.state.activePage || 'page-a';
      const wb = XLSX.utils.book_new();

      if (pageId === 'page-a') {
        const data = global.DGMM_ANALYTICS.getPageA_ExecutiveData();
        const wsData = [
          ['GOVERNMENT OF THE PUNJAB - MINES & MINERALS DEPARTMENT'],
          ['EXECUTIVE DASHBOARD STATISTICAL SUMMARY REPORT'],
          ['Generated: ' + new Date().toLocaleString()],
          [],
          ['METRIC', 'VALUE'],
          ['Total Blocks & Leases', data.totalBlocks],
          ['Total Leased Area (Acres)', data.totalArea],
          ['Total Reserve Price (PKR)', data.totalReserve],
          ['All-In Average Reserve / Acre (PKR)', data.allInAvgPerAcre],
          ['Blocks-Only Reserve / Acre (PKR)', data.blocksAvgPerAcre],
          ['Occupancy Rate (%)', data.occupancyRate],
          ['Granted Blocks Count', data.grantedCount],
          ['Vacant Blocks Count', data.vacantCount],
          ['Upcoming Auction Pipeline Count', data.upcomingCount]
        ];
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        XLSX.utils.book_append_sheet(wb, ws, 'Executive_Summary');
      } else if (pageId === 'page-e') {
        const data = global.DGMM_ANALYTICS.getPageE_DistrictYieldData();
        const wsData = [
          ['Rank', 'District', 'Field Office', 'LSM ML', 'LSM EL', 'SSM ML', 'SSM PL', 'MM Granted', 'Total Titles', 'Inventory Blocks', 'Vacant Blocks', 'Occupancy %', 'Reserve Price (PKR)', 'Reserve/Acre Blocks Only (PKR)']
        ];
        data.districtRows.forEach(r => {
          wsData.push([
            r.rank, r.district, r.fieldOffice, r.lsmML, r.lsmEL, r.ssmML, r.ssmPL, r.mmGranted,
            r.totalTitles, r.inventoryBlocks, r.vacantBlocks, r.occupancyRate, r.totalReserve, r.reservePerAcreBlocks
          ]);
        });
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        XLSX.utils.book_append_sheet(wb, ws, 'District_Yield');
      } else {
        const inv = global.DGMM_ANALYTICS.getFilteredInventory();
        const ws = XLSX.utils.json_to_sheet(inv);
        XLSX.utils.book_append_sheet(wb, ws, 'Block_Inventory');
      }

      XLSX.writeFile(wb, `DGMM_Analytics_${pageId.toUpperCase()}_${Date.now()}.xlsx`);
    },

    exportActivePageToCsv: function() {
      const pageId = global.DGMM_ANALYTICS.state.activePage || 'page-a';
      const inv = global.DGMM_ANALYTICS.getFilteredInventory();

      let csv = 'ID,Code,Name,Branch,District,Mineral,BlockType,Status,Area_Acres,Reserve_PKR,In_Upcoming_Auction\n';
      inv.forEach(r => {
        csv += `"${r.id}","${r.code}","${(r.name || '').replace(/"/g, '""')}","${r.branch}","${r.normDistrict}","${r.normMineral}","${r.standardType}","${r.standardStatus}",${r.numericArea},${r.numericReserve},${r.inUpcomingAuction ? 'Yes' : 'No'}\n`;
      });

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `DGMM_Analytics_${pageId.toUpperCase()}_Data.csv`;
      a.click();
    }
  };

  global.DGMM_ANALYTICS_UI = UI;

  document.addEventListener('DOMContentLoaded', () => {
    // UI is initialized when Analytics tab is activated or on page load if direct link
    if (document.getElementById('tab-analytics')) {
      UI.init();
    }
  });

})(typeof window !== 'undefined' ? window : global);
