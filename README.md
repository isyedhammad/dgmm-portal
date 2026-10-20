# Directorate General of Mines & Minerals (DGM&M) — Executive Monitoring Portal
### Government of the Punjab, Mines & Minerals Department

An executive-grade monitoring portal and GIS intelligence system designed for senior leadership and the Director General to supervise mineral concessions, 5-year royalty collections, e-auctions, appellate pendency, and EPA environmental clearances across all 36 districts of Punjab.

---

## Key Features & Architecture

1. **Interactive GIS Mineral Map of Punjab**:
   - Georeferenced coordinates with GPS coordinates, Northing, Easting, District, Division, and mineral type.
   - Distinctive mineral clustering: Rock Salt (Salt Range/Khewra), Limestone (Salt Range & D.G. Khan), Coal (Makarwal/Dandot), Silica Sand, Gypsum, Fireclay, and Ordinary Sand zones.
   - Geospatial drilldown cards and quick focus buttons.

2. **5-Year Revenue, Royalty & Production Intelligence**:
   - Multi-year financial trajectory from FY 2021-22 through FY 2025-26.
   - Comprehensive roll-up across 6 regional field offices: Attock, Chakwal, D.G. Khan, Jhelum, Khushab, and Mianwali.
   - Production rollup: **23.44 Million Metric Tons**.
   - Total Royalty & Revenue: **PKR 4.741 Billion**.
   - Major Cement Manufacturers Royalty Audit (Fauji Cement, Bestway Cement, Maple Leaf Cement, Gharibwal Cement, Sittara Chemical).

3. **Licensing, Renewals & E-Auction Analytics**:
   - 98 Decided lease renewals under Small Scale Mining (SSM).
   - Illegal Subletting Violations tracker under PMCR Rules 160, 161, 171, and 176.
   - 1st Round of E-Auction fetched bids analysis comparing Reserve Price vs Received Bids (+18% to +985% revenue surge).

4. **EPA Environmental Clearances & NOC Tracker**:
   - 151 official cases tracked across 21 districts.
   - Visual district filter pills (Rawalpindi, Jhelum, Chakwal, Attock, Sargodha, Sahiwal, Hafizabad, Chiniot, Bahawalpur, R.Y. Khan, etc.).
   - DAEC status tracking, identifying bottleneck reasons (e.g. pending DC meetings).

5. **Appellate Authority Pendency Tracker**:
   - 187 listed legal appeals before the Appellate Authority / Director General Lahore.
   - Filing dates, hearing histories, subject matter, and case disposition logs.

6. **Executive Design System**:
   - Sovereign Punjab Emerald (`#092617`) and Sovereign Gold (`#C8A355`).
   - Official Dual-Crests: Official Directorate General of Mines & Minerals crest alongside the Government of the Punjab State Seal.
   - 100% responsive, high-density data tables, instant search, and export options.

---

## Local Development & Quick Start

### Prerequisites
- Node.js (v18.0.0 or higher)

### Start the Local Server
```bash
node server.js
```
Open your browser and navigate to:
```
http://localhost:3000
```

---

## Production Deployment on Render

This project contains a zero-dependency, high-performance Node.js backend configured via `render.yaml`.

### Steps to Deploy:
1. Push this repository to GitHub or GitLab.
2. Sign in to [Render](https://render.com).
3. Click **New +** -> **Web Service** -> Connect your GitHub repository.
4. Render will automatically read `render.yaml` or use:
   - **Environment**: Node
   - **Build Command**: `echo 'Build complete'`
   - **Start Command**: `node server.js`
   - **Health Check Path**: `/api/health`
5. Click **Create Web Service**. Your portal will be live at `https://<your-service-name>.onrender.com`.

---

## API Endpoints Reference

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/health` | GET | Health check status and service uptime |
| `/api/kpis` | GET | High-level executive KPI rollups |
| `/api/map/sites` | GET | Geolocated mining sites with coordinates |
| `/api/financials` | GET | 5-Year production, royalty, and field office trends |
| `/api/producers` | GET | Cement manufacturers and major producers audit |
| `/api/licensing` | GET | Decided lease renewals and subletting violations |
| `/api/auctions` | GET | Consolidated e-auction fetched bids and reserve prices |
| `/api/epa` | GET | 151 compiled EPA environmental clearance cases |
| `/api/appeals` | GET | 187 listed Appellate Authority legal proceedings |
| `/api/audit-findings`| GET | Data quality audit anomalies and reconciliation logs |

---

*Directorate General of Mines & Minerals, Government of the Punjab*  
*Poonch House, Multan Road, Lahore, Pakistan*
