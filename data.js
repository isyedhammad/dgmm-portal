// Directorate General of Mines & Minerals (DGM&M), Government of the Punjab
// Executive Operations & Intelligence Data Store (v3.0 - Complete Multi-Module Dataset)

window.DGM_DATA = {
  meta: {
    department: "Directorate General of Mines & Minerals",
    parentGov: "Government of the Punjab",
    portalTitle: "Executive Operations & Monitoring Portal",
    directorateLogo: "assets/dgmm_logo.jpg",
    lastUpdated: "October 2026",
    activeMiningRules: "Punjab Mining Concession Rules (PMCR) 2002 / Mines & Minerals Act 2025"
  },

  // 1. Senior Leadership Audit Findings & Quality Notes
  dataQualityAudit: [
    {
      id: "DQA-01",
      district: "Chakwal",
      leaseNo: "ML.CKL.I.R. SALT (11)",
      mineral: "Rock Salt",
      issueType: "Royalty Calculation Variance",
      description: "Reported Total Royalty Paid (Rs. 13,048,240) in financial compilation is understated by Rs. 1,050,942.5 against the sum of its five yearly royalty figures (Rs. 14,099,182.5). Grand Total inherits the same discrepancy.",
      status: "Recommended for Source Voucher Verification"
    },
    {
      id: "DQA-02",
      district: "Provincial (Lahore)",
      leaseNo: "Appellate Authority Log",
      mineral: "All Minerals",
      issueType: "Appeals Pendency Number Variance",
      description: "Appellate Authority Summary states 294 pending appeals, whereas individual listings of cases across Minor Minerals (66) and Small Scale Mining (123) and PL Rejections (124) total 313 (variance of 19 cases).",
      status: "Reconciliation In Progress"
    },
    {
      id: "DQA-03",
      district: "Rawalpindi & Jhelum",
      leaseNo: "Multiple Concessions",
      mineral: "Ordinary Sand / Limestone",
      issueType: "DAEC Meeting Schedule Bottleneck",
      description: "41 mining lease applications have fulfilled area inspection requirements but remain stalled awaiting formal convening of District Anti-Encroachment/Environmental Committees (DAEC) under respective Deputy Commissioners.",
      status: "Executive Directive to Deputy Commissioners Required"
    }
  ],

  // 2. 5-Year Production & Royalty Rollup (FY 2021-22 to FY 2025-26)
  fiveYearSummary: {
    totalLeasesTracked: 1004,
    totalProductionTons: 23438648.75,
    totalRoyaltyPKR: 4577049759,
    totalGrandAmountPaidPKR: 4741490058,
    totalDeadRentPKR: 49266848,
    totalPenaltiesPKR: 115173451,
    totalSecuritiesHeldPKR: 141500000,
    yearlyTrends: [
      { fy: "2021-22", productionTons: 3833442.92, royaltyPKR: 499880282.5, totalPaidPKR: 524102140 },
      { fy: "2022-23", productionTons: 4680239.04, royaltyPKR: 589605238.1, totalPaidPKR: 618420950 },
      { fy: "2023-24", productionTons: 5467613.43, royaltyPKR: 662879402.4, totalPaidPKR: 694150300 },
      { fy: "2024-25", productionTons: 4510566.30, royaltyPKR: 1420224627.0, totalPaidPKR: 1445830110 },
      { fy: "2025-26", productionTons: 4946787.07, royaltyPKR: 1405511152.0, totalPaidPKR: 1458986558 }
    ],
    fieldOffices: [
      {
        office: "Attock",
        leases: 17,
        production5Y: 224585.0,
        royalty5Y: 30192250,
        totalPaid5Y: 30386730,
        securities: 2300000,
        primaryMinerals: ["Limestone", "Sand-Gravel", "Slate Stone", "Argillaceous Clay"],
        revenueSharePercent: 0.7
      },
      {
        office: "Chakwal",
        leases: 363,
        production5Y: 6025538.42,
        royalty5Y: 1468092786,
        totalPaid5Y: 1554917910,
        securities: 62300000,
        primaryMinerals: ["Coal", "Rock Salt", "Limestone", "Iron Ore"],
        revenueSharePercent: 32.8
      },
      {
        office: "D.G. Khan",
        leases: 37,
        production5Y: 576933.0,
        royalty5Y: 84126350,
        totalPaid5Y: 84156350,
        securities: 3700000,
        primaryMinerals: ["Gravel", "Gypsum", "Limestone", "Argillaceous Clay"],
        revenueSharePercent: 1.8
      },
      {
        office: "Jhelum",
        leases: 58,
        production5Y: 1185528.33,
        royalty5Y: 253445114,
        totalPaid5Y: 258979514,
        securities: 8500000,
        primaryMinerals: ["Coal", "Sand-Gravel", "Limestone", "Rock Salt"],
        revenueSharePercent: 5.5
      },
      {
        office: "Khushab",
        leases: 229,
        production5Y: 4639685.49,
        royalty5Y: 1023508891,
        totalPaid5Y: 1084790115,
        securities: 31100000,
        primaryMinerals: ["Silica Sand", "Coal", "Fireclay", "Bauxite"],
        revenueSharePercent: 22.9
      },
      {
        office: "Mianwali",
        leases: 300,
        production5Y: 10786378.52,
        royalty5Y: 1717684369,
        totalPaid5Y: 1728259440,
        securities: 33600000,
        primaryMinerals: ["Gypsum", "Silica Sand", "China Clay", "Coal", "Limestone"],
        revenueSharePercent: 36.3
      }
    ]
  },

  // 3. Major Industrial Mineral Concessionaires (Cement & Large Scale Mining)
  majorProducers: [
    {
      company: "M/s Fauji Cement Company Ltd.",
      plantLocation: "Hassan Abdal / Wah, Attock & Rawalpindi",
      mineral: "Limestone & Arg. Clay",
      totalLeasedArea: 2504.28,
      fiveYearProductionTons: 15345120,
      fiveYearRoyaltyPKR: 2842410880,
      activeLeases: [
        { leaseNo: "LSM/ML-ATK-Lime Stone (23)", area: 165.77, expiry: "2032-02-07", status: "Active" },
        { leaseNo: "LSM/ML-ATK-Arg. Clay (1)", area: 458.69, expiry: "2025-05-11", status: "Valid Rule 46(3)" },
        { leaseNo: "LSM/ML-ATK-Lime Stone(16)", area: 1779.42, expiry: "2030-08-14", status: "Active" },
        { leaseNo: "LSM/ML-RWP-Limestone(19)", area: 212.86, expiry: "2032-07-17", status: "Active" }
      ]
    },
    {
      company: "M/s Bestway Cement Ltd.",
      plantLocation: "Farooqia (Hassan Abdal) & Tatral (Chakwal)",
      mineral: "Limestone & Shale",
      totalLeasedArea: 4890.50,
      fiveYearProductionTons: 18450000,
      fiveYearRoyaltyPKR: 3415200000,
      activeLeases: [
        { leaseNo: "LSM/ML-CKL-Limestone (04)", area: 2450.00, expiry: "2034-09-12", status: "Active" },
        { leaseNo: "LSM/ML-ATK-Limestone (12)", area: 1440.50, expiry: "2031-03-22", status: "Active" }
      ]
    },
    {
      company: "M/s Gharibwal Cement Ltd.",
      plantLocation: "Gharibwal, District Chakwal & Jhelum",
      mineral: "Limestone & Clay",
      totalLeasedArea: 2120.00,
      fiveYearProductionTons: 8200000,
      fiveYearRoyaltyPKR: 1517000000,
      activeLeases: [
        { leaseNo: "LSM/ML-JLM-Limestone (02)", area: 1820.00, expiry: "2030-11-30", status: "Active" }
      ]
    },
    {
      company: "M/s Maple Leaf Cement Factory Ltd.",
      plantLocation: "Iskandarabad, District Mianwali",
      mineral: "Limestone, Gypsum & Clay",
      totalLeasedArea: 3250.00,
      fiveYearProductionTons: 14200000,
      fiveYearRoyaltyPKR: 2627000000,
      activeLeases: [
        { leaseNo: "LSM/ML-MLI-Limestone (08)", area: 2100.00, expiry: "2033-05-15", status: "Active" }
      ]
    },
    {
      company: "M/s Sittara Chemical Industries Ltd.",
      plantLocation: "Near Simbal & Khewra, District Chakwal",
      mineral: "Rock Salt (EL & ML)",
      totalLeasedArea: 485.40,
      fiveYearProductionTons: 940000,
      fiveYearRoyaltyPKR: 188000000,
      activeLeases: [
        { leaseNo: "LSM-EL-CKL-I ROCK SALT (3)", area: 485.40, expiry: "Valid Rule 24(2)", status: "Exploration" }
      ]
    }
  ],

  // 4. Geospatial Mining Coordinates across Punjab (Leaflet Map)
  geoMiningSites: [
    {
      id: "GEO-001",
      name: "Khewra & Simbal Salt Formations",
      district: "Chakwal",
      division: "Rawalpindi",
      mineral: "Rock Salt",
      lat: 32.6500,
      lng: 73.0100,
      scale: "LSM",
      concessionType: "Mining Lease & EL",
      lessee: "PMDC / Sittara Chemical Ltd.",
      annualOutput: "450,000 Tons",
      zoneGroup: "Salt Range Belt",
      gridRef: "E: 3218450 | N: 984500",
      notes: "World's second largest salt deposit; high-purity pink halite."
    },
    {
      id: "GEO-002",
      name: "Choa Saidan Shah & Dandot Mines",
      district: "Chakwal",
      division: "Rawalpindi",
      mineral: "Coal",
      lat: 32.7150,
      lng: 72.9850,
      scale: "SSM",
      concessionType: "Mining Lease",
      lessee: "Mirza Collieries / Mst. Mahwish Sultana",
      annualOutput: "320,000 Tons",
      zoneGroup: "Salt Range Belt",
      gridRef: "E: 3209500 | N: 991200",
      notes: "Sub-bituminous coal feeding brick kilns and localized power units."
    },
    {
      id: "GEO-003",
      name: "Daud Khel & Iskandarabad Formations",
      district: "Mianwali",
      division: "Sargodha",
      mineral: "Gypsum",
      lat: 32.8800,
      lng: 71.5600,
      scale: "SSM",
      concessionType: "Mining Lease",
      lessee: "Punjab Mineral Dev. Corp (PUNJMIN)",
      annualOutput: "1,200,000 Tons",
      zoneGroup: "Salt Range Belt",
      gridRef: "E: 3125400 | N: 1012300",
      notes: "Major supplier to national cement and soil conditioner industry."
    },
    {
      id: "GEO-004",
      name: "Musa Khel & Chhidru China Clay",
      district: "Mianwali",
      division: "Sargodha",
      mineral: "China Clay",
      lat: 32.6800,
      lng: 71.7200,
      scale: "SSM",
      concessionType: "Mining Lease",
      lessee: "Abdul Hafeez & Local Operators",
      annualOutput: "85,000 Tons",
      zoneGroup: "Salt Range Belt",
      gridRef: "E: 3139800 | N: 994500",
      notes: "High alumina refractory clay used for ceramics."
    },
    {
      id: "GEO-005",
      name: "Padhrar & Surakki Silica Sand Mines",
      district: "Khushab",
      division: "Sargodha",
      mineral: "Silica Sand",
      lat: 32.3500,
      lng: 72.3100,
      scale: "SSM",
      concessionType: "Mining Lease",
      lessee: "Mst. Sharif Bibi & Glass Suppliers",
      annualOutput: "480,000 Tons",
      zoneGroup: "Salt Range Belt",
      gridRef: "E: 3185200 | N: 955400",
      notes: "Essential raw material for container glass and float glass plants."
    },
    {
      id: "GEO-006",
      name: "Malot & Baghanwala Reserves",
      district: "Jhelum",
      division: "Rawalpindi",
      mineral: "Sand-Gravel",
      lat: 32.6900,
      lng: 73.4900,
      scale: "Minor Minerals",
      concessionType: "Mining Lease",
      lessee: "Muhammad Sadaqat / Malik Sabir Hussain",
      annualOutput: "650,000 Tons",
      zoneGroup: "Salt Range Belt",
      gridRef: "E: 3258100 | N: 987600",
      notes: "High demand construction aggregate along GT Road / Motorway."
    },
    {
      id: "GEO-007",
      name: "Hassan Abdal & Margalla Limestone Complex",
      district: "Attock",
      division: "Rawalpindi",
      mineral: "Limestone",
      lat: 33.8200,
      lng: 72.6900,
      scale: "LSM",
      concessionType: "Mining Lease",
      lessee: "M/s Fauji Cement Ltd. / Haji Raj Wali",
      annualOutput: "4,500,000 Tons",
      zoneGroup: "Potohar & Margalla Zone",
      gridRef: "E: 3178271.52 | N: 1069848.0",
      notes: "Premier limestone belt sustaining major cement plants and crushers."
    },
    {
      id: "GEO-008",
      name: "Wah & Taxila Aggregate Quarries",
      district: "Rawalpindi",
      division: "Rawalpindi",
      mineral: "Limestone",
      lat: 33.7400,
      lng: 72.8200,
      scale: "LSM",
      concessionType: "Mining Lease",
      lessee: "Fauji Cement Lease (19 & 20)",
      annualOutput: "1,850,000 Tons",
      zoneGroup: "Potohar & Margalla Zone",
      gridRef: "E: 3180283.2 | N: 1070232.05",
      notes: "Critical supply chain for CPEC infrastructure and urban construction."
    },
    {
      id: "GEO-009",
      name: "Kamra & Sanjwal Riverbed Channels",
      district: "Attock",
      division: "Rawalpindi",
      mineral: "Sand-Gravel",
      lat: 33.7500,
      lng: 72.4200,
      scale: "Minor Minerals",
      concessionType: "E-Auction Zone",
      lessee: "Multiple Concessionaires",
      annualOutput: "920,000 Tons",
      zoneGroup: "Potohar & Margalla Zone",
      gridRef: "E: 3154200 | N: 1058900",
      notes: "E-Biz portal monitored minor mineral extraction zones."
    },
    {
      id: "GEO-010",
      name: "Kirana Hills Crushed Stone & Sandstone",
      district: "Sargodha",
      division: "Sargodha",
      mineral: "Sandstone",
      lat: 32.0200,
      lng: 72.7000,
      scale: "Minor Minerals",
      concessionType: "Mining Lease",
      lessee: "Block 88 NB / Sargodha Crushers",
      annualOutput: "5,800,000 Tons",
      zoneGroup: "Central Riverbed & Hills",
      gridRef: "E: 3201400 | N: 912300",
      notes: "Provincial cornerstone: Rs. 8.91 Billion revenue density in Sargodha."
    },
    {
      id: "GEO-011",
      name: "Chenab Riverbed Zone (Chiniot-Shorkot)",
      district: "Chiniot",
      division: "Faisalabad",
      mineral: "Ordinary Sand",
      lat: 31.7200,
      lng: 72.9800,
      scale: "Minor Minerals",
      concessionType: "E-Auction Lease",
      lessee: "Shorkot Concession Zone (115.2M bid)",
      annualOutput: "1,400,000 Tons",
      zoneGroup: "Central Riverbed & Hills",
      gridRef: "E: 3225800 | N: 875400",
      notes: "Fetched record 985% bid increase over reserve price in 2026 auction."
    },
    {
      id: "GEO-012",
      name: "Chenab Riverbed (Shera Kot Zone)",
      district: "Gujranwala",
      division: "Gujranwala",
      mineral: "Ordinary Sand",
      lat: 32.1800,
      lng: 74.1900,
      scale: "Minor Minerals",
      concessionType: "Mining Lease",
      lessee: "Ch. Muhammad Abdullah Tahir",
      annualOutput: "850,000 Tons",
      zoneGroup: "Central Riverbed & Hills",
      gridRef: "E: 3289400 | N: 924500",
      notes: "Acreage: 128,355 acres; GPS cadastral mapping completed."
    },
    {
      id: "GEO-013",
      name: "Hafizabad Riverine Sand Blocks",
      district: "Hafizabad",
      division: "Gujranwala",
      mineral: "Ordinary Sand",
      lat: 32.0700,
      lng: 73.6900,
      scale: "Minor Minerals",
      concessionType: "Mining Lease",
      lessee: "Local Leaseholders",
      annualOutput: "650,000 Tons",
      zoneGroup: "Central Riverbed & Hills",
      gridRef: "E: 3265200 | N: 914200",
      notes: "5 pending EPA clearance cases awaiting site inspection verification."
    },
    {
      id: "GEO-014",
      name: "Koh-e-Suleman (Sanghar & Mangrotha Nala)",
      district: "D.G. Khan",
      division: "D.G. Khan",
      mineral: "Gravel",
      lat: 30.5500,
      lng: 70.4300,
      scale: "Minor Minerals",
      concessionType: "Mining Lease",
      lessee: "Muhammad Tahir & Sajjad Ahmad",
      annualOutput: "380,000 Tons",
      zoneGroup: "Southern & Suleman Range",
      gridRef: "E: 3089400 | N: 745600",
      notes: "Part of Koh-e-Suleman ADP development scheme; 14 HR posts recruited."
    },
    {
      id: "GEO-015",
      name: "Sahiwal & Harappa Zone-1",
      district: "Sahiwal",
      division: "Sahiwal",
      mineral: "Ordinary Sand",
      lat: 30.6700,
      lng: 73.1000,
      scale: "Minor Minerals",
      concessionType: "Mining Lease",
      lessee: "Muhammad Amin Nasir",
      annualOutput: "720,000 Tons",
      zoneGroup: "Southern & Suleman Range",
      gridRef: "E: 3238812.0 | N: 712776.0",
      notes: "Acreage: 48,222 acres; Rs. 70.1M bid revenue; Ravi riverbed channel."
    },
    {
      id: "GEO-016",
      name: "Sutlej Riverbed (Pakpattan & Bahawalnagar)",
      district: "Pakpattan",
      division: "Sahiwal",
      mineral: "Ordinary Sand",
      lat: 30.3400,
      lng: 73.3800,
      scale: "Minor Minerals",
      concessionType: "Mining Lease",
      lessee: "Multiple Leaseholders",
      annualOutput: "410,000 Tons",
      zoneGroup: "Southern & Suleman Range",
      gridRef: "E: 3254200 | N: 685400",
      notes: "Renewal applications submitted; 4 cases pending DAEC review."
    },
    {
      id: "GEO-017",
      name: "Bahawalpur & Cholistan Fringe Concessions",
      district: "Bahawalpur",
      division: "Bahawalpur",
      mineral: "Ordinary Sand",
      lat: 29.3900,
      lng: 71.6800,
      scale: "Minor Minerals",
      concessionType: "Mining Lease",
      lessee: "Mari Nihal & Pir Gorai Zones",
      annualOutput: "290,000 Tons",
      zoneGroup: "Southern & Suleman Range",
      gridRef: "E: 3175400 | N: 589400",
      notes: "Under administrative supervision of Deputy Director Bahawalpur."
    },
    {
      id: "GEO-018",
      name: "Rahim Yar Khan Riverine Blocks",
      district: "Rahim Yar Khan",
      division: "Bahawalpur",
      mineral: "Ordinary Sand",
      lat: 28.4200,
      lng: 70.3000,
      scale: "Minor Minerals",
      concessionType: "Mining Lease",
      lessee: "Southern Riverbed Concessions",
      annualOutput: "340,000 Tons",
      zoneGroup: "Southern & Suleman Range",
      gridRef: "E: 3098500 | N: 485400",
      notes: "6 EPA pending clearances awaiting DC DAEC meeting approval."
    }
  ],

  // 5. E-Auction Intelligence Records (from Auction Data files)
  auctionRecords: [
    {
        "sr":  "1.0",
        "fieldOffice":  "Assistant Director (Mines \u0026 Minerals) Chiniot.",
        "blockName":  "Shorkot Zone",
        "lastOperativeBid":  "1.0611E7",
        "reservePrice":  "4.0E7",
        "bidReceived":  "1.152E8",
        "increasePercentage":  "9.856658185"
    },
    {
        "sr":  "2.0",
        "fieldOffice":  "Assistant Director (Mines \u0026 Minerals) Chiniot.",
        "blockName":  "Nawa Lahore Gojra Zone.",
        "lastOperativeBid":  "7.0001E7",
        "reservePrice":  "9.0E7",
        "bidReceived":  "2.008E8",
        "increasePercentage":  "1.86853045"
    },
    {
        "sr":  "3.0",
        "fieldOffice":  "Assistant Director (Mines \u0026 Minerals) Sahiwal.",
        "blockName":  "Pakkpattan City Zone-3",
        "lastOperativeBid":  "2.4702E7",
        "reservePrice":  "4.0E7",
        "bidReceived":  "2.468E8",
        "increasePercentage":  "8.991093839"
    },
    {
        "sr":  "4.0",
        "fieldOffice":  "Assistant Director (Mines \u0026 Minerals) Sahiwal.",
        "blockName":  "Qboola Zone",
        "lastOperativeBid":  "1.6651E7",
        "reservePrice":  "2.25E7",
        "bidReceived":  "9.555E7",
        "increasePercentage":  "4.73839409"
    },
    {
        "sr":  "5.0",
        "fieldOffice":  "Deputy Director (Mines \u0026 Minerals) Lahore.",
        "blockName":  "Jodhsingwala/Rajowal Zone",
        "lastOperativeBid":  "4.5E7",
        "reservePrice":  "5.4E7",
        "bidReceived":  "7.06E7",
        "increasePercentage":  "0.5688888889"
    },
    {
        "sr":  "6.0",
        "fieldOffice":  "Deputy Director (Mines \u0026 Minerals) Lahore.",
        "blockName":  "Khudpur Zone",
        "lastOperativeBid":  "1.5E8",
        "reservePrice":  "1.8E8",
        "bidReceived":  "4.192E8",
        "increasePercentage":  "1.794666667"
    },
    {
        "sr":  "7.0",
        "fieldOffice":  "Assistant Director (Mines \u0026 Minerals) Sialkot.",
        "blockName":  "Deshian Zone",
        "lastOperativeBid":  "4.0225E7",
        "reservePrice":  "4.0E7",
        "bidReceived":  "4.01E7",
        "increasePercentage":  "-0.003107520199"
    },
    {
        "sr":  "8.0",
        "fieldOffice":  "Assistant Director (Mines \u0026 Minerals) Sialkot.",
        "blockName":  "Kotla Arab Ali Khan",
        "lastOperativeBid":  "2.8627E7",
        "reservePrice":  "4.5E7",
        "bidReceived":  "7.05E7",
        "increasePercentage":  "1.462710029"
    },
    {
        "sr":  "9.0",
        "fieldOffice":  "Assistant Director (Mines \u0026 Minerals) Sialkot.",
        "blockName":  "Chak Gillan",
        "lastOperativeBid":  "2.782E7",
        "reservePrice":  "3.5E7",
        "bidReceived":  "2.6E8",
        "increasePercentage":  "8.345794393"
    },
    {
        "sr":  "10.0",
        "fieldOffice":  "Deputy Director (Mines \u0026 Minerals) Dera Ghazi Khan.",
        "blockName":  "Kot Sultan/Jaman Shah Zone",
        "lastOperativeBid":  "1265000.0",
        "reservePrice":  "2500000.0",
        "bidReceived":  "1.2E7",
        "increasePercentage":  "8.486166008"
    },
    {
        "sr":  "11.0",
        "fieldOffice":  "Deputy Director (Mines \u0026 Minerals) Multan.",
        "blockName":  "Khaniewal Zone 1+2",
        "lastOperativeBid":  "8.0E7",
        "reservePrice":  "8.8E7",
        "bidReceived":  "1.495E8",
        "increasePercentage":  "0.86875"
    },
    {
        "sr":  "12.0",
        "fieldOffice":  "Deputy Director (Mines \u0026 Minerals) Multan.",
        "blockName":  "Kabir wala Zone-2",
        "lastOperativeBid":  "1.05556555E8",
        "reservePrice":  "1.162E8",
        "bidReceived":  "1.999E8",
        "increasePercentage":  "0.8937715427"
    },
    {
        "sr":  "13.0",
        "fieldOffice":  "Deputy Director (Mines \u0026 Minerals) Multan.",
        "blockName":  "Jahania Zone-2",
        "lastOperativeBid":  "8.0E7",
        "reservePrice":  "8.8E7",
        "bidReceived":  "1.6115E8",
        "increasePercentage":  "1.014375"
    },
    {
        "sr":  "14.0",
        "fieldOffice":  "Deputy Director (Mines \u0026 Minerals) Multan.",
        "blockName":  "Wajihawala Zone-2",
        "lastOperativeBid":  "2.0314E7",
        "reservePrice":  "2.5E7",
        "bidReceived":  "8.57E7",
        "increasePercentage":  "3.218765383"
    },
    {
        "sr":  "15.0",
        "fieldOffice":  "Deputy Director (Mines \u0026 Minerals) Mianwali.",
        "blockName":  "Bhakkhar Notak Bel Zone-2",
        "lastOperativeBid":  null,
        "reservePrice":  "4.0E7",
        "bidReceived":  "5.05E7",
        "increasePercentage":  "#DIV/0!"
    }
],

  // 6. Subletting Violation Cases (from pending cases of subletting.xlsx)
  sublettingCases: [
    {
        "sr":  "1",
        "district":  "Chakwal",
        "leaseNo":  "ML-CKL-I-Coal-(179)",
        "company":  "M/s Mirza Collieries (Pvt.) Limited",
        "inspectionDate":  "01.07.2026",
        "violation":  "Rule-, 160,161, 176, 171",
        "remarks":  null
    },
    {
        "sr":  "2",
        "district":  "Khushab",
        "leaseNo":  "ML-KHB-Silica Sand (84)",
        "company":  "Malik Faisal Noor",
        "inspectionDate":  [
                               [

                               ]
                           ],
        "violation":  "Rule-153, 160 -171 and 174",
        "remarks":  null
    },
    {
        "sr":  "3",
        "district":  "Mianwali",
        "leaseNo":  "ML-MLI-Fireclay (103)",
        "company":  "Tippu Sultan Khan",
        "inspectionDate":  "08.07.2023 \n Remanded appeal vide order dated 12.03.2025",
        "violation":  "Rule 171",
        "remarks":  null
    }
],

  // 7. Renewals Decided & Pending (from List of renewal decided cases.xlsx)
  renewalsDecided: [
    {
        "sr":  "18.0",
        "leaseNo":  "ML-CKL-II-Coal (98)",
        "company":  "Mst. Mahwish Sultana, Sultan House Choa Saiden Shah, District Chakwal.",
        "areaAcres":  "321.15",
        "lastExpiry":  "31.12.2018",
        "renewalWef":  "01.01.2019",
        "newExpiry":  "31.12.2028"
    },
    {
        "sr":  "105.0",
        "leaseNo":  "ML-MLI-FIRECLAY (134)",
        "company":  "Mr. Aziz ur Rehman  Khan Niazi S/o Aman Ullah R/o Cottage No.8,J Block Architect Housing Scheme, off Raiwind Road Lahore",
        "areaAcres":  "300.0",
        "lastExpiry":  "25.03.2025",
        "renewalWef":  "01.01.2027",
        "newExpiry":  "31.12.2034"
    },
    {
        "sr":  "106.0",
        "leaseNo":  "ML-MLI-FIRECLAY (135)",
        "company":  "Mst. Aniqa Javed W/o Zeeshan Mustaq Awan R/o 511-L Block, Street No.8/1, Phase 5 DHA Lahore.",
        "areaAcres":  "299.97",
        "lastExpiry":  "25.03.2025",
        "renewalWef":  "01.01.2027",
        "newExpiry":  "31.12.2034"
    },
    {
        "sr":  "29.0",
        "leaseNo":  "ML-JLM-Gypsum (45)",
        "company":  "Kh. Muhammad Hanif, Mohallah Alam Shah near Islamia Primary School, Pind Dadan Khan, District Jhelum.",
        "areaAcres":  "88.77",
        "lastExpiry":  "02.08.2022",
        "renewalWef":  "01.03.2021",
        "newExpiry":  "28.02.2030"
    },
    {
        "sr":  "7.0",
        "leaseNo":  "ML-CKL-I-Coal (148)",
        "company":  "M/s Aziz \u0026 Co., Aziz Ur Rehman (Sole Proprietor), H. No. 38/2, Mohallah Sarwar Road, City Lahore Cantt.",
        "areaAcres":  "326.19",
        "lastExpiry":  "30.06.2022",
        "renewalWef":  "01.07.2022",
        "newExpiry":  "30.06.2029"
    },
    {
        "sr":  "23.0",
        "leaseNo":  "ML-JLM-Coal (17)",
        "company":  "M/s Sultan \u0026 Co., Mangala 9- Tippu Market Jhelum Cantt.",
        "areaAcres":  "746.3",
        "lastExpiry":  "14.09.2014.",
        "renewalWef":  "01.07.2025",
        "newExpiry":  "30.06.2033"
    },
    {
        "sr":  "63.0",
        "leaseNo":  "ML.MLI.FIRECLAY(72)",
        "company":  [
                        [

                        ]
                    ],
        "areaAcres":  "249.04",
        "lastExpiry":  "20.10.2003",
        "renewalWef":  "01.07.2025",
        "newExpiry":  "30.06.2030"
    },
    {
        "sr":  "2.0",
        "leaseNo":  "ML-CKL-I-Coal (40)",
        "company":  "M/s Peer Coal Co., V.P.O Kaurali District Chakwal.",
        "areaAcres":  "999.05",
        "lastExpiry":  "31.10.2020",
        "renewalWef":  "01.11.2020",
        "newExpiry":  "30.10.2030"
    },
    {
        "sr":  "68.0",
        "leaseNo":  "ML-KHB- GYSPUM(21)",
        "company":  "Mr. Noor Khan S/O Gul Khan  Ghallah Mandi, Shop No.21, Quadiabad,",
        "areaAcres":  "97.6",
        "lastExpiry":  "01.11.1992",
        "renewalWef":  "01.11.2023",
        "newExpiry":  "31.10.2028"
    },
    {
        "sr":  "6.0",
        "leaseNo":  "ML-CKL-I-Coal (121)",
        "company":  "M/s Saqib Coal Co., Choa Saidan Shah District Chakwal.",
        "areaAcres":  "254.42",
        "lastExpiry":  "31.10.2019",
        "renewalWef":  "01.11.2025",
        "newExpiry":  "31.10.2030"
    },
    {
        "sr":  "60.0",
        "leaseNo":  "ML-KHB-COAL(66)",
        "company":  "M/s. Umar coal co. 1-A, civil lines Khushab.",
        "areaAcres":  "324.02",
        "lastExpiry":  "07.01.2000",
        "renewalWef":  "02.05.2026",
        "newExpiry":  "01.05.2036"
    },
    {
        "sr":  "90.0",
        "leaseNo":  "ML-MLI-FIRECLAY (74)",
        "company":  "Mr. Shamim Ahmad, S/o Muhammad Saleem,R/o K.D Khan, Colony, Talgang Road,",
        "areaAcres":  "212.86",
        "lastExpiry":  "21.12.2004",
        "renewalWef":  "02.06.2026",
        "newExpiry":  "01.06.2034"
    },
    {
        "sr":  "91.0",
        "leaseNo":  "ML-MLI-FIRECLAY (80)",
        "company":  "Mr. Badie-ur-Rehman S/o Abdul Rauf Khan, R/o K.D Khan, Colony, Talgang Road,",
        "areaAcres":  "176.44",
        "lastExpiry":  "04.08.2008",
        "renewalWef":  "02.06.2026",
        "newExpiry":  "01.06.2034"
    },
    {
        "sr":  "108.0",
        "leaseNo":  "ML.MLI.FIRECLAY (74)",
        "company":  "Mr. Shamim Ahmad, S/o Muhammad Saleem,R/o K.D Khan, Colony, Talgang Road,",
        "areaAcres":  "212.86",
        "lastExpiry":  "21.12.2004",
        "renewalWef":  "02.06.2026",
        "newExpiry":  "01.06.2034`"
    },
    {
        "sr":  "37.0",
        "leaseNo":  "ML.MLI.Fireclay (96)",
        "company":  "Mr. Muhammad Usama Khan R/o Mohallah Bhaiyawala Tehsil Musa hel District Mianwali.",
        "areaAcres":  "454.54",
        "lastExpiry":  "29.10.2013",
        "renewalWef":  "02.07.2025",
        "newExpiry":  "01.07.2030"
    },
    {
        "sr":  "95.0",
        "leaseNo":  "ML-MLI-FRIECLAY (14)",
        "company":  "M/s Malik Sultan Muhammad Khan \u0026 Company, R/o Dhok Ali Khan District Mianwali.",
        "areaAcres":  "356.47",
        "lastExpiry":  "30.10.1963",
        "renewalWef":  "02.11.2025",
        "newExpiry":  "01.11.2033"
    },
    {
        "sr":  "34.0",
        "leaseNo":  "ML-CKL-II-Gypsum (35)",
        "company":  "Syed Safdar Ali Shah, C/o M/s Malik Ali Shan \u0026 Co.,Choa Saiden Shah, District Chakwal.",
        "areaAcres":  "255.32",
        "lastExpiry":  "02.01.2023",
        "renewalWef":  "03.01.2023",
        "newExpiry":  "02.01.2032"
    },
    {
        "sr":  "42.0",
        "leaseNo":  "ML-KHB-OCHER(11)",
        "company":  "M/s Al-Hamad \u0026 Company Mohallah Bahyanwala Tehsil \u0026 District Mianwali.",
        "areaAcres":  "180.56",
        "lastExpiry":  "03.02.2000",
        "renewalWef":  "03.02.2025",
        "newExpiry":  "02.02.2030"
    },
    {
        "sr":  "89.0",
        "leaseNo":  "ML-KHB-BAUXITE (12)",
        "company":  "Mr. Badie-ur-Rehman S/o Abdul Rauf Khan,R/o K.D Khan, Colony, Talgang Road,",
        "areaAcres":  "411.78",
        "lastExpiry":  "03.02.2009",
        "renewalWef":  "04.04.2026",
        "newExpiry":  "03.04.2035"
    },
    {
        "sr":  "96.0",
        "leaseNo":  "ML-MLI-FRIECLAY (07)",
        "company":  "M/s Malik Sultan Muhammad Khan \u0026 Company,",
        "areaAcres":  "950.16",
        "lastExpiry":  "18.07.2006",
        "renewalWef":  "04.06.2026",
        "newExpiry":  "03.06.2035"
    },
    {
        "sr":  "38.0",
        "leaseNo":  "ML.MLI.Fireclay (101)",
        "company":  "Mr. Muhammad Osama  Khan R/o Musa Khel,",
        "areaAcres":  "138.42",
        "lastExpiry":  "25.07.2017",
        "renewalWef":  "04.07.2025",
        "newExpiry":  "03.07.2030"
    },
    {
        "sr":  "39.0",
        "leaseNo":  "ML.MLI.IRON ORE(36)",
        "company":  "Mr. Muhammad  Khalid Khan S/o Muhammmad  Ameer Khan  R/o Musa",
        "areaAcres":  "299.92",
        "lastExpiry":  "25.07.2017",
        "renewalWef":  "04.07.2025",
        "newExpiry":  "03.07.2030"
    },
    {
        "sr":  "52.0",
        "leaseNo":  "ML.MLI.IRON ORE(35)",
        "company":  "Mr.  Nazir  Ahmed  Khan  S/O M.Ameer  Khan  R/O  Musa  Khel,  Tehsil \u0026",
        "areaAcres":  "300.0",
        "lastExpiry":  "25.07.2017",
        "renewalWef":  "04.07.2030",
        "newExpiry":  "03.07.2030"
    },
    {
        "sr":  "98.0",
        "leaseNo":  "ML-KHB-FRIECLAY (20)",
        "company":  "Mr. Abdul Rauf Khan,R/o K.D Khan Colony, Tulagang Road,",
        "areaAcres":  "123.55",
        "lastExpiry":  "26.05.2010",
        "renewalWef":  "04.08.2026",
        "newExpiry":  "03.08.2034"
    },
    {
        "sr":  "104.0",
        "leaseNo":  "ML-MLI-FIRECLAY (79)",
        "company":  "Malik Meher Khan S/o Ayub Khan",
        "areaAcres":  "75.23",
        "lastExpiry":  "28.07.2008",
        "renewalWef":  "04.10.2026",
        "newExpiry":  "03.10.2036"
    },
    {
        "sr":  "13.0",
        "leaseNo":  "ML-CKL-II-Coal (18)",
        "company":  "M/s Walayat Industries (Pvt) Ltd., PO. Pir Mukhdoom Jehaniya, Opp: Shell Petrol Pump, Tehsil Choa Saiden Shah, District Chakwal.",
        "areaAcres":  "755.52",
        "lastExpiry":  "05.03.2022",
        "renewalWef":  "05.03.2022",
        "newExpiry":  "04.03.2032"
    },
    {
        "sr":  "94.0",
        "leaseNo":  "ML-KHB-ROCK SALT (15)",
        "company":  "M/s Al Mustafa Mines, House No.316N Samnabad, Lahore.",
        "areaAcres":  "433.88",
        "lastExpiry":  "05.05.2005",
        "renewalWef":  [
                           [

                           ]
                       ],
        "newExpiry":  "04.05.2035"
    },
    {
        "sr":  "61.0",
        "leaseNo":  "ML-KHB- S. SAND (41)",
        "company":  "M/s. Commander Mineral, C/o Malik Umer Daraz S/o Ghulam Muhammad, R/o Burj Mohara, P.O Waheer, Tehsil \u0026 District Khushab",
        "areaAcres":  "298.5",
        "lastExpiry":  "06.05.2010",
        "renewalWef":  "05.05.2026",
        "newExpiry":  "04.05.2031"
    },
    {
        "sr":  "100.0",
        "leaseNo":  "ML-KHB-COAL (53)",
        "company":  "M/s Aziz Collieries Mohalla Ali Pura Teshil \u0026 District Khushab.",
        "areaAcres":  "516.85",
        "lastExpiry":  "12.07.1975",
        "renewalWef":  "05.09.2026",
        "newExpiry":  "04.09.2036"
    },
    {
        "sr":  "24.0",
        "leaseNo":  "ML-CKL-I-Rock Salt (16)",
        "company":  "M/s Pak Rock Salt Industry (Regd) 10-A, Rathore Street, New Muslim Town, Lahore.",
        "areaAcres":  "500.0",
        "lastExpiry":  "04.05.2025",
        "renewalWef":  "06.05.2025",
        "newExpiry":  "05.05.2035"
    },
    {
        "sr":  "83.0",
        "leaseNo":  "ML-KHB- FIRECLAY(29)",
        "company":  "Mr. Ahmad Khan Subdul Mohalla Anayat Khel Tehsil \u0026 District Mianwali",
        "areaAcres":  "146.82",
        "lastExpiry":  "07.07.2000",
        "renewalWef":  "06.07.2020",
        "newExpiry":  "05.07.2028"
    },
    {
        "sr":  "26.0",
        "leaseNo":  "ML-JLM-Gypsum (32)",
        "company":  "Mst.Musarat Sultana W/o Raja Akbar Khan(Late)near Darbar Muhabat Shah Bukhari Khewra District Jhelum",
        "areaAcres":  "186.52",
        "lastExpiry":  "21.02.2012",
        "renewalWef":  "06.08.2025",
        "newExpiry":  "05.08.2029"
    },
    {
        "sr":  "82.0",
        "leaseNo":  "ML.MLI.IRON ORE(10)",
        "company":  "Malik  Sarfraz  Khan  S/O  Mehr  Bahadur  Khan,  B-6,  Housing  Colony,",
        "areaAcres":  "250.0",
        "lastExpiry":  "08.03.2001",
        "renewalWef":  "07.03.2026",
        "newExpiry":  "06.03.2034"
    },
    {
        "sr":  "84.0",
        "leaseNo":  "ML-KHB- FIRECLAY(28)",
        "company":  "Mr. Ahmad Khan Subdul Mohalla Anayat Khel Tehsil \u0026 District Mianwali",
        "areaAcres":  "206.62",
        "lastExpiry":  "07.07.2000",
        "renewalWef":  "07.07.2020",
        "newExpiry":  "06.07.2028"
    },
    {
        "sr":  "55.0",
        "leaseNo":  "ML.MLI.IRON ORE(31)",
        "company":  "Malik   Sikander   Khan   S/o   Malik   Mehar   Khan   C-34Housing   Colony",
        "areaAcres":  "330.57",
        "lastExpiry":  "17.09.2013",
        "renewalWef":  "08.08.2025",
        "newExpiry":  "07.08.2030"
    },
    {
        "sr":  "57.0",
        "leaseNo":  "ML.MLI.S.SAND(133)",
        "company":  "Malik Sarfraz Khan S/o Mehar Khan R/o Mehar House Housing Cololny",
        "areaAcres":  "194.06",
        "lastExpiry":  "12.01.2013",
        "renewalWef":  "08.08.2025",
        "newExpiry":  "07.08.2030"
    },
    {
        "sr":  "53.0",
        "leaseNo":  "ML.MLI.FIRECLAY(53)",
        "company":  "Mr.  Sikandar  Khan,  H.No.C/34,  Housing  Colony,  Iskandarabad,  District",
        "areaAcres":  "723.14",
        "lastExpiry":  "18.05.2019",
        "renewalWef":  "08.08.2035",
        "newExpiry":  "07.08.2030"
    },
    {
        "sr":  "15.0",
        "leaseNo":  "ML-CKL-II-Coal (64)",
        "company":  "Alamzab Khan, Khawja Building, Room No.16, Choa Saiden Shah, District Chakwal.",
        "areaAcres":  "230.7",
        "lastExpiry":  "08.05.2025",
        "renewalWef":  "09.05.2025",
        "newExpiry":  "08.05.2033"
    },
    {
        "sr":  "66.0",
        "leaseNo":  "ML-KHB- GYSPUM(32)",
        "company":  "Mr. Khan Muhammad s/o Dost Muhammad c/o Rocy Gysum Factory Hosue",
        "areaAcres":  "249.45",
        "lastExpiry":  "26.10.2001",
        "renewalWef":  "09.10.2025",
        "newExpiry":  "08.10.2028"
    },
    {
        "sr":  "71.0",
        "leaseNo":  "ML.MLI.FIRECLAY(18)",
        "company":  "M/s Malik Sikandar Hayat \u0026 R/O Dhok Ali Khan, District Mianwali",
        "areaAcres":  "231.82",
        "lastExpiry":  "08.11.1989",
        "renewalWef":  "09.11.2025",
        "newExpiry":  "08.11.2030"
    },
    {
        "sr":  "73.0",
        "leaseNo":  "ML.MLI.FIRECLAY(8)",
        "company":  "M/S Malik Sikandar Hayat \u0026 R/O Dhok Ali Khan, District Mianwali",
        "areaAcres":  "674.01",
        "lastExpiry":  "10.06.1961",
        "renewalWef":  "10.06.2021",
        "newExpiry":  "09.06.2031"
    },
    {
        "sr":  "87.0",
        "leaseNo":  "ML-KHB- GYSPUM(29)",
        "company":  "Mr. Naseer Muhammad s/o Atta mUhammad Shop No.22, Ghallah Mandi,",
        "areaAcres":  "222.41",
        "lastExpiry":  "11.11.2000",
        "renewalWef":  "10.11.2025",
        "newExpiry":  "09.11.2033"
    },
    {
        "sr":  "1.0",
        "leaseNo":  "ML-CKL-I-Coal (11)",
        "company":  "M/s Umer Khan S/o Sher Khan, Decent Coal Mines, Mohallah Gujran, Makerwal road, Masudabad, Tehsil and P.o office C.S.Shah District Chakwal.",
        "areaAcres":  "1040.0",
        "lastExpiry":  "30.06.2017",
        "renewalWef":  "11.07.2025",
        "newExpiry":  "10.07.2035"
    },
    {
        "sr":  "54.0",
        "leaseNo":  "ML.MLI.IRON ORE(38)",
        "company":  "Muhammad Kinnan S/O Haji Sher Khan, P.O Mehar House, Housing Colony",
        "areaAcres":  "187.4",
        "lastExpiry":  "25.07.2017",
        "renewalWef":  "11.08.2025",
        "newExpiry":  "10.08.2030"
    },
    {
        "sr":  "3.0",
        "leaseNo":  "ML-CKL-I-Coal (58)",
        "company":  "Marhaba Mineral Co., Choa Saidan Shah District Chakwal.",
        "areaAcres":  "476.95",
        "lastExpiry":  "11.09.2025",
        "renewalWef":  "11.09.2025",
        "newExpiry":  "10.09.2035"
    },
    {
        "sr":  "111.0",
        "leaseNo":  "ML-MLI-IRON ORE (05)",
        "company":  "Mr. Annis AkbartR/o Usman Block, Garden Town, Lahore",
        "areaAcres":  "1613.49",
        "lastExpiry":  "11.12.1988",
        "renewalWef":  "11.12.2023",
        "newExpiry":  "10.12.2033"
    },
    {
        "sr":  "80.0",
        "leaseNo":  "ML.MLI.FIRECLAY(76)",
        "company":  "Sufi bahdar khan \u0026 sons p.o. Musa khel. District Mianwali.",
        "areaAcres":  "1305.56",
        "lastExpiry":  "04.06.2005",
        "renewalWef":  "13.07.20025",
        "newExpiry":  "12.07.2033"
    },
    {
        "sr":  "109.0",
        "leaseNo":  "ML-KHB-BAUXITE (16)",
        "company":  "Mr. Ghulam Haider S/o Ahmad Khan R/o Ansar Colony near Satellite Town, District Khushab",
        "areaAcres":  "296.96",
        "lastExpiry":  "06.01.2022",
        "renewalWef":  "13.07.2024",
        "newExpiry":  "12.07.2032"
    },
    {
        "sr":  "5.0",
        "leaseNo":  "ML-CKL-I-Coal (95)",
        "company":  "M/s Kamal Mineral Co Alamabad Choa Saiden Shah District Chakwal.",
        "areaAcres":  "384.53",
        "lastExpiry":  "12.10.2024",
        "renewalWef":  "13.10.2024",
        "newExpiry":  "12.10.2034"
    },
    {
        "sr":  "93.0",
        "leaseNo":  "ML-MLI-SILICA SAND (92)",
        "company":  "Muhammad Afzal Khan S/o Muhammad Ashraf Khan,",
        "areaAcres":  "244.45",
        "lastExpiry":  "14.02.1996",
        "renewalWef":  "14.02.2021",
        "newExpiry":  "13.02.2029"
    },
    {
        "sr":  "86.0",
        "leaseNo":  "ML.MLI.FIRECLAY(31)",
        "company":  "Hafiz Ahmad Khan, Vill: \u0026 P.O. Musa Khel, District Mianwali",
        "areaAcres":  "556.77",
        "lastExpiry":  "17.04.1980",
        "renewalWef":  "14.04.2025",
        "newExpiry":  "13.04.2033"
    },
    {
        "sr":  "4.0",
        "leaseNo":  "ML-CKL-I-Coal (93)",
        "company":  "M/s Sangha Brothers Coal Co., Old Bus Stand, Khushab.",
        "areaAcres":  "599.39",
        "lastExpiry":  "13.09.2023",
        "renewalWef":  "14.09.2023",
        "newExpiry":  "13.09.2033"
    },
    {
        "sr":  "11.0",
        "leaseNo":  "ML-CKL-I-Coal (207)",
        "company":  "M/s. Bhala Coal Cpompany,Vill. Bhalla P.O Karriala, District Chakwal.",
        "areaAcres":  "634.83",
        "lastExpiry":  "14.06.2024",
        "renewalWef":  "15.06.2024",
        "newExpiry":  "14.06.2031"
    },
    {
        "sr":  "20.0",
        "leaseNo":  "ML-CKL-II-Coal (114)",
        "company":  "Mst. Ghazala Farhat W/o Sultan Azmat Hayat (Late) Sultan House Choa Saidan Shah District Chakwal.",
        "areaAcres":  "250.0",
        "lastExpiry":  "14.06.2024",
        "renewalWef":  "15.06.2024",
        "newExpiry":  "14.06.2030"
    },
    {
        "sr":  "22.0",
        "leaseNo":  "ML-CKL-II-Coal (133)",
        "company":  "Raja Naveed Akhter Satti S/o Raja Mohammad Akhter, Satti Associates, Chakwal Road, Choa Saiden Shah, District Chakwal.",
        "areaAcres":  "315.19",
        "lastExpiry":  "14.06.2024",
        "renewalWef":  "15.06.2024",
        "newExpiry":  "14.06.2034"
    },
    {
        "sr":  "44.0",
        "leaseNo":  "ML.MLI.FIRECLAY(91)",
        "company":  "Mst. Khanzadi W/O Muhammad Bashir Khan R/O Thatti Mianwali",
        "areaAcres":  "495.86",
        "lastExpiry":  "15.06.2009",
        "renewalWef":  "15.06.2025",
        "newExpiry":  "14.06.2029"
    },
    {
        "sr":  "65.0",
        "leaseNo":  "ML-KHB- GYSPUM(23)",
        "company":  "Zeeshan Gypsum Concern (Ch. Binymin) H. No.36 Grain Market Mall Road,",
        "areaAcres":  "149.2",
        "lastExpiry":  "21.08.1995",
        "renewalWef":  "15.10.2025",
        "newExpiry":  "14.10.2030"
    },
    {
        "sr":  "67.0",
        "leaseNo":  "ML-KHB- S. SAND (47)",
        "company":  "M/s. Malik Brother House No. 1, Extension Lal Kurti Sadar Bazar Lahore",
        "areaAcres":  "210.11",
        "lastExpiry":  "16.02.1995",
        "renewalWef":  "16.02.2025",
        "newExpiry":  "15.02.2030"
    },
    {
        "sr":  "113.0",
        "leaseNo":  "ML-KHB-GYPSUM (48)",
        "company":  "Mr. Muhamamd Ramzan S/o Ghulam Muhammad R/o House No 86-B Quaidabad District Khushab",
        "areaAcres":  "306.5",
        "lastExpiry":  "16.06.2011",
        "renewalWef":  "16.06.2021",
        "newExpiry":  "18.01.2026"
    },
    {
        "sr":  "48.0",
        "leaseNo":  "ML.MLI.S.SAND(129)",
        "company":  "Mst. Khanzadi W/O Muhammad Bashir Khan R/O Thatti Mianwali",
        "areaAcres":  "475.2",
        "lastExpiry":  "25.08.2009",
        "renewalWef":  "16.07.2024",
        "newExpiry":  "17.07.2029"
    },
    {
        "sr":  "102.0",
        "leaseNo":  "ML-MLI-SILICA SAND (53)",
        "company":  "Haji Sana Ullah Khan S/o Saif Ullah Khan R/o House No.174, Jalo Khel, Kamar Mashani,Tehsil Isa Khel, District Mianwali.",
        "areaAcres":  "198.8",
        "lastExpiry":  "31.05.1986",
        "renewalWef":  "16.09.2020",
        "newExpiry":  "15.09.2028"
    },
    {
        "sr":  "75.0",
        "leaseNo":  "ML.MLI.FIRECLAY(28)",
        "company":  "M/s Akram  Mining Co., Through Kamran Akram Khan  S/o Muhamamd Akram Khan, R/o K.D. Khan Colony, Talagang Road, Mianwali.",
        "areaAcres":  "351.86",
        "lastExpiry":  "12.06.1980",
        "renewalWef":  "16.10.2020",
        "newExpiry":  "15.10.2030"
    },
    {
        "sr":  "25.0",
        "leaseNo":  "ML.CKL. II. Bauxite (2)",
        "company":  "Raja Naveed Akhter Satti S/o Raja Mohammad Akhter, Satti Associates, Chakwal Road, Choa Saiden Shah, District Chakwal.",
        "areaAcres":  "300.0",
        "lastExpiry":  "16.01.2021.",
        "renewalWef":  "17.01.2025",
        "newExpiry":  "16.01.2030"
    },
    {
        "sr":  "88.0",
        "leaseNo":  "ML.MLI.FIRECLAY(81)",
        "company":  "Malik  Sarfraz  Khan  S/O  Malik  Mehr  Khan,  C-34,  Housing  Colony,",
        "areaAcres":  "245.48",
        "lastExpiry":  "17.03.2008",
        "renewalWef":  "17.03.2025",
        "newExpiry":  "16.03.2034"
    },
    {
        "sr":  "40.0",
        "leaseNo":  "ML.MLI.Fireclay (98)",
        "company":  "Mr.Muhammad  Usama  Khan  S/O  Muhammad  Siddique  Khan,Mohallhah Bahinwala,near Jamia Masjid,Musa Khel,P.O Khas.The \u0026 Distt.Mianwali.",
        "areaAcres":  "244.5",
        "lastExpiry":  "16.04.2014",
        "renewalWef":  "17.04.2024",
        "newExpiry":  "16.04.2029"
    },
    {
        "sr":  "58.0",
        "leaseNo":  "ML-KHB-COAL(20)",
        "company":  "Mrs. Salma Sabir W/o Arshad Parizada, Office Al Hamad Coal .",
        "areaAcres":  "576.32",
        "lastExpiry":  "18.05.1980",
        "renewalWef":  "17.05.2025",
        "newExpiry":  "16.05.2030"
    },
    {
        "sr":  "79.0",
        "leaseNo":  "ML-DGK-GYPSUM (78)",
        "company":  "1-Â  Haji Muhammad Younas S/o Haji Muhammad Yousaf, C/o  Khalil-ur- Rehman Buzdar, Dastiger Contractor, Cement Factory, District, D.G Khan.",
        "areaAcres":  "287.19",
        "lastExpiry":  "17.07.2019",
        "renewalWef":  "17.07.2024",
        "newExpiry":  "16.07.2031"
    },
    {
        "sr":  "47.0",
        "leaseNo":  "ML.DGK.GYPSUM(46)",
        "company":  "Ghulam Abbas Baloach S/O Ghulam Sarwar 37 Mussarat Colony, Gulshan-i-",
        "areaAcres":  "250.0",
        "lastExpiry":  "27.04.2002",
        "renewalWef":  "17.07.2025",
        "newExpiry":  "18.07.2030"
    },
    {
        "sr":  "64.0",
        "leaseNo":  "ML.MLI.S.SAND(119)",
        "company":  "M/s Hanns Mining Co, House No.2 -B Khalid Bin Waleed Street Ittehad Colony, Lahore.",
        "areaAcres":  "245.03",
        "lastExpiry":  "23.04.2004",
        "renewalWef":  "17.09.2025",
        "newExpiry":  "16.09.2027"
    },
    {
        "sr":  "114.0",
        "leaseNo":  "ML-MLI-FIRECLAY (34)",
        "company":  "Mr. Muhammad Muzafar S/o Muhammad Ramzan R/o of Mohallah Islamabad Near Girdstation District Mianwali",
        "areaAcres":  "299.77",
        "lastExpiry":  "19.01.1986",
        "renewalWef":  "18.01.2026",
        "newExpiry":  "17.01.2032"
    },
    {
        "sr":  "45.0",
        "leaseNo":  "ML.MLI.COAL(30)",
        "company":  "M/s. Saleem Mineral Co. Chowa Saidan Shah Chakwal.",
        "areaAcres":  "999.66",
        "lastExpiry":  "18.05.2002",
        "renewalWef":  "18.05.2025",
        "newExpiry":  "17.05.2030"
    },
    {
        "sr":  "72.0",
        "leaseNo":  "ML.MLI.FIRECLAY(10)",
        "company":  "Abdul Rauf Khan (Sole Prop: Pakistan Tribal Minerals), Kd Khan Colony,",
        "areaAcres":  "479.95",
        "lastExpiry":  "20.11.1962",
        "renewalWef":  "18.11.2025",
        "newExpiry":  "17.11.2035"
    },
    {
        "sr":  "8.0",
        "leaseNo":  "ML-CKL-I-Coal (158)",
        "company":  "M/s Imran Enterprise (Pvt) Ltd., 59-E/I Gulberg-III Lahore.",
        "areaAcres":  "428.72",
        "lastExpiry":  "20.07.2019",
        "renewalWef":  "20.07.2019",
        "newExpiry":  "19.07.2034"
    },
    {
        "sr":  "36.0",
        "leaseNo":  "ML.MLI.Fireclay (108)",
        "company":  "Muhammad  Anwar  Khan  S/o  Muhammad  Sahibdad  Khan  R/o Mohallah",
        "areaAcres":  "299.67",
        "lastExpiry":  "20.11.2019",
        "renewalWef":  "20.11.2024",
        "newExpiry":  "19.11.2029"
    },
    {
        "sr":  "49.0",
        "leaseNo":  "ML.MLI.Fireclay (127)",
        "company":  "M/s Bashir Mining Company, P.O Thathi, Tehsil \u0026 District Mianwali",
        "areaAcres":  "299.83",
        "lastExpiry":  "20.11.2019",
        "renewalWef":  "20.11.2024",
        "newExpiry":  "19.11.2029"
    },
    {
        "sr":  "115.0",
        "leaseNo":  "ML-MLI-CHAINA CLAY (02)",
        "company":  [
                        [

                        ]
                    ],
        "areaAcres":  "293.63",
        "lastExpiry":  "09.07.2025",
        "renewalWef":  "21.11.2026",
        "newExpiry":  "21.11.2034"
    },
    {
        "sr":  "107.0",
        "leaseNo":  "ML-MLI-FIRECLAY (95)",
        "company":  "Mr. Fasail Habib Tarar R/o House No.70-1, Gulberg, III Lahore",
        "areaAcres":  "312.62",
        "lastExpiry":  "22.03.2013",
        "renewalWef":  "22.03.2023",
        "newExpiry":  "21.03.2033"
    },
    {
        "sr":  "62.0",
        "leaseNo":  "ML-KHB- S. SAND (16)",
        "company":  "Malik Umar Daraz.S/o Ghulam Muhammad, R/o Borj Mohra, P.O. Waheer,",
        "areaAcres":  "237.64",
        "lastExpiry":  "23.04.1981",
        "renewalWef":  "22.04.2026",
        "newExpiry":  "21.04.2031"
    },
    {
        "sr":  "85.0",
        "leaseNo":  "ML.MLI.FIRECLAY(67)",
        "company":  "Muhammad Khan \u0026Company Mohallah Buriwali, Musa Khel,",
        "areaAcres":  "250.0",
        "lastExpiry":  "13.05.2000",
        "renewalWef":  "22.06.2022",
        "newExpiry":  "21.06.2030"
    },
    {
        "sr":  "9.0",
        "leaseNo":  "ML-CKL-I-Coal (179)",
        "company":  "M/s Mirza Collieries (Pvt) Ltd., Sargodha Road Khushab.",
        "areaAcres":  "500.34",
        "lastExpiry":  "22.01.2022",
        "renewalWef":  "23.01.2022",
        "newExpiry":  "22.01.2025"
    },
    {
        "sr":  "81.0",
        "leaseNo":  "ML.MLI.OCHER(5)",
        "company":  "Khaliq uz Zaman Khan, Kd Khan Colony, Talagang Road, Mianwali",
        "areaAcres":  "249.17",
        "lastExpiry":  "24.07.2000",
        "renewalWef":  "23.07.2020",
        "newExpiry":  "22.07.2030"
    },
    {
        "sr":  "19.0",
        "leaseNo":  "ML-CKL-II-Coal (107)",
        "company":  "Cap Â® Mohammad Hussain Coal Co., V \u0026 P.O Bharwal District Chakwal.",
        "areaAcres":  "177.48",
        "lastExpiry":  "23.07.2025",
        "renewalWef":  "23.07.2025",
        "newExpiry":  "22.07.2033"
    },
    {
        "sr":  "97.0",
        "leaseNo":  "ML-KHB-SILICA SAND (76)",
        "company":  "Mr. Mansoor Sadiq S/o Sadiq-ud Din,R/o Mohallah Hamidanwala, Mitha Tiwana,",
        "areaAcres":  "250.0",
        "lastExpiry":  "20.03.2008",
        "renewalWef":  "23.08.2017",
        "newExpiry":  "22.08.2027"
    },
    {
        "sr":  "30.0",
        "leaseNo":  "ML-JLM-Gypsum (50)",
        "company":  "Kh. Muhammad Hanif, Mohallah Alam Shah near Islamia Primary School P.D. Khan District Jhelum.",
        "areaAcres":  "234.5",
        "lastExpiry":  "22.08.2022",
        "renewalWef":  "23.08.2022",
        "newExpiry":  "22.08.2031"
    },
    {
        "sr":  "21.0",
        "leaseNo":  "ML-CKL-II-Coal (116)",
        "company":  "M/s. Hi Tech Minerals, House No. 9 Khawja street No-2, Abid Colony,Ghazi Road Lahore.",
        "areaAcres":  "282.0",
        "lastExpiry":  "23.04.2026",
        "renewalWef":  "24.04.2026",
        "newExpiry":  "23.04.2034"
    },
    {
        "sr":  "92.0",
        "leaseNo":  "ML-KHB-COAL (15)",
        "company":  "M/s Katha Collieries (Pvt),Room No.13-18-19, 1st Floor Arcade,73-Jail Road,",
        "areaAcres":  "1722.22",
        "lastExpiry":  "24.05.1975",
        "renewalWef":  "24.05.2026",
        "newExpiry":  "23.05.2035"
    },
    {
        "sr":  "27.0",
        "leaseNo":  "ML-JLM-Gypsum (41)",
        "company":  "Rasool Muhammad, Mohallah Islam Gunj, Khewra ICI Factory, Tehsil P.D. Khan, District Jhelum.",
        "areaAcres":  "58.59",
        "lastExpiry":  "22.12.2025.",
        "renewalWef":  "24.12.2025",
        "newExpiry":  "23.12.2031"
    },
    {
        "sr":  "70.0",
        "leaseNo":  "ML-KHB- FIRECLAY(42)",
        "company":  "Mr. Muhammad Ehsan (etc.), Legal Heir of Muhammad Hayat (Late), P.O",
        "areaAcres":  "370.97",
        "lastExpiry":  "25.07.2017",
        "renewalWef":  "25.07.2022",
        "newExpiry":  "24.07.2029"
    },
    {
        "sr":  "110.0",
        "leaseNo":  "ML-KHB-LATRITE (02)",
        "company":  "Mr. Ghulam Haider S/o Ahmad Khan R/o Ansar Colony near Satellite Town, District Khushab",
        "areaAcres":  "495.86",
        "lastExpiry":  "01.02.2018",
        "renewalWef":  "25.07.2022",
        "newExpiry":  "24.07.2032"
    },
    {
        "sr":  "51.0",
        "leaseNo":  "ML.MLI.S.SAND(98)",
        "company":  "Mr. Hafeez Ullah Khan Niazi S/O Zafar Ullah Khan, House No. 2 Zaman",
        "areaAcres":  "250.0",
        "lastExpiry":  "28.07.1997",
        "renewalWef":  "25.07.2025",
        "newExpiry":  "24.07.2030"
    },
    {
        "sr":  "17.0",
        "leaseNo":  "ML-CKL-II-Coal (91)",
        "company":  "M/s Black Gold Mines Associates Ltd., III Multan Road Lahore.",
        "areaAcres":  "527.37",
        "lastExpiry":  "24.08.2024",
        "renewalWef":  "25.08.2024",
        "newExpiry":  "24.08.2034"
    },
    {
        "sr":  "12.0",
        "leaseNo":  "ML-CKL-I-Coal (208)",
        "company":  "Mr.Sher Zaman Khan S/o Pasta Gul, sole propriter Musa khel coal Mine, Plot no. 5-6 Al Madina colony Tehsil Rohri,District Sakkhar",
        "areaAcres":  "121.82",
        "lastExpiry":  "25.01.2026",
        "renewalWef":  "26.01.2026",
        "newExpiry":  "25.01.2031"
    },
    {
        "sr":  "46.0",
        "leaseNo":  "ML.DGK.GYPSUM(41)",
        "company":  "Arshad Iqbal S/O Ghulam Hussain, 501-A, Noor Manzil Near T.P. Exchange",
        "areaAcres":  "249.97",
        "lastExpiry":  "27.04.2001",
        "renewalWef":  "26.04.2025",
        "newExpiry":  "25.04.2030"
    },
    {
        "sr":  "41.0",
        "leaseNo":  "ML.MLI.Fireclay (97)",
        "company":  "Mr.Shah Alam Khan S/O Saif Ullah Khan,Daud Khel Distt.Mianwali.",
        "areaAcres":  "298.03",
        "lastExpiry":  "07.08.2013",
        "renewalWef":  "26.06.2025",
        "newExpiry":  "25.06.2030"
    },
    {
        "sr":  "69.0",
        "leaseNo":  "ML.MLI. OCHER (11)",
        "company":  "Muhammad Yousaf Khan Muhallah Gaushala,Musa Khel District Mianwali.",
        "areaAcres":  "129.5",
        "lastExpiry":  "25.07.2012",
        "renewalWef":  "26.07.2022",
        "newExpiry":  "25.07.2032"
    },
    {
        "sr":  "101.0",
        "leaseNo":  "ML-KHB-ROCK SALT (16)",
        "company":  "M/s Aziz Rock Salt, Sandral Chowk, Mohallah, Ronakpur,",
        "areaAcres":  "408.12",
        "lastExpiry":  "27.06.2006",
        "renewalWef":  "27.06.2026",
        "newExpiry":  "26.06.2036"
    },
    {
        "sr":  "112.0",
        "leaseNo":  "M;-KHB-SILICA SAND (86)",
        "company":  "Mr. Nadir  Amer S/o Muhammad Feroz R/o Dera Shanti Nali P.O Nali Khas Teshil \u0026 District Khushab",
        "areaAcres":  "134.28",
        "lastExpiry":  "10.08.2020",
        "renewalWef":  "27.08.2024",
        "newExpiry":  "26.08.2031"
    },
    {
        "sr":  "50.0",
        "leaseNo":  "ML.DGK.GYPSUM(58)",
        "company":  "Mr. Ghulam Farid S/O Imam Bukhsh C/O Luckh Data Auto Store, Juma Mor",
        "areaAcres":  "297.52",
        "lastExpiry":  "28.04.2011",
        "renewalWef":  "28.04.2026",
        "newExpiry":  "27.04.2031"
    }
],

  // 8. EPA Pending Cases (All 151 records)
  epaCases: [
    {
        "sr":  "1.0",
        "fieldOffice":  "Attock",
        "division":  "Minor Minerals",
        "district":  "Attock",
        "leaseNo":  null,
        "title":  "Kamra Bhoi-1",
        "mineral":  "Sand Gravel",
        "dateApplied":  "25.11.2025",
        "method":  "Manual",
        "reminder":  "Nil",
        "delayReason":  "The case is under process in EPA Attock"
    },
    {
        "sr":  "2.0",
        "fieldOffice":  "Attock",
        "division":  "Minor Minerals",
        "district":  "Attock",
        "leaseNo":  null,
        "title":  "Kohlia-2",
        "mineral":  "Sand Gravel",
        "dateApplied":  "25.11.2025",
        "method":  "Manual",
        "reminder":  "Nil",
        "delayReason":  "The case is under process in EPA Attock"
    },
    {
        "sr":  "3.0",
        "fieldOffice":  "Attock",
        "division":  "Minor Minerals",
        "district":  "Attock",
        "leaseNo":  null,
        "title":  "Qibla Bandi",
        "mineral":  "Sand Gravel",
        "dateApplied":  "24.04.2026",
        "method":  "E-Biz",
        "reminder":  "Nil",
        "delayReason":  "The concerned Area Inspector has been assigned to conduct site inspection of the proposed block."
    },
    {
        "sr":  "4.0",
        "fieldOffice":  "Attock",
        "division":  "Minor Minerals",
        "district":  "Attock",
        "leaseNo":  null,
        "title":  "Kamra Haji Shah Shakardara Zone",
        "mineral":  "Sand Gravel",
        "dateApplied":  "19.05.2026",
        "method":  "E-Biz",
        "reminder":  "Nil",
        "delayReason":  "The concerned Area Inspector has been assigned to conduct site inspection of the proposed block."
    },
    {
        "sr":  "5.0",
        "fieldOffice":  "Attock",
        "division":  "Minor Minerals",
        "district":  "Attock",
        "leaseNo":  null,
        "title":  "Sarwala-3",
        "mineral":  "Sand Gravel",
        "dateApplied":  "15.05.2026",
        "method":  "E-Biz",
        "reminder":  "Nil",
        "delayReason":  "The concerned Area Inspector has been assigned to conduct site inspection of the proposed block."
    },
    {
        "sr":  "6.0",
        "fieldOffice":  "Attock",
        "division":  "Minor Minerals",
        "district":  "Attock",
        "leaseNo":  null,
        "title":  "Baryar-1",
        "mineral":  "Gravel",
        "dateApplied":  "13.05.2026",
        "method":  "E-Biz",
        "reminder":  "Nil",
        "delayReason":  "The concerned Area Inspector has been assigned to conduct site inspection of the proposed block."
    },
    {
        "sr":  "7.0",
        "fieldOffice":  "Attock",
        "division":  "Minor Minerals",
        "district":  "Attock",
        "leaseNo":  null,
        "title":  "Sanjwal-2",
        "mineral":  "Gravel",
        "dateApplied":  "14.05.2026",
        "method":  "E-Biz",
        "reminder":  "Nil",
        "delayReason":  "The concerned Area Inspector has been assigned to conduct site inspection of the proposed block."
    },
    {
        "sr":  "8.0",
        "fieldOffice":  "Attock",
        "division":  "Minor Minerals",
        "district":  "Attock",
        "leaseNo":  null,
        "title":  "Tura Khel Mela-1",
        "mineral":  "Gravel",
        "dateApplied":  "30.07.2026",
        "method":  "E-Biz",
        "reminder":  "Nil",
        "delayReason":  "The concerned Area Inspector has been assigned to conduct site inspection of the proposed block."
    },
    {
        "sr":  "9.0",
        "fieldOffice":  "Attock",
        "division":  "Minor Minerals",
        "district":  "Attock",
        "leaseNo":  null,
        "title":  "Chapri 6 Bhander Khaki Jan Zone",
        "mineral":  "Ord Sand",
        "dateApplied":  "15.05.2026",
        "method":  "E-Biz",
        "reminder":  "Nil",
        "delayReason":  "The concerned Area Inspector has been assigned to conduct site inspection of the proposed block."
    },
    {
        "sr":  "10.0",
        "fieldOffice":  "Attock",
        "division":  "Minor Minerals",
        "district":  "Attock",
        "leaseNo":  null,
        "title":  "Bhera-1",
        "mineral":  "Ord Sand",
        "dateApplied":  "18.05.2026",
        "method":  "E-Biz",
        "reminder":  "Nil",
        "delayReason":  "The case will be placed before the Committee and decided in accordance with the assigned meeting schedule."
    },
    {
        "sr":  "11.0",
        "fieldOffice":  "Attock",
        "division":  "Minor Minerals",
        "district":  "Attock",
        "leaseNo":  null,
        "title":  "Khour-2",
        "mineral":  "Sand Stone",
        "dateApplied":  "09.07.2026",
        "method":  "E-Biz",
        "reminder":  "Nil",
        "delayReason":  "The case is under process in EPA Attock"
    },
    {
        "sr":  "12.0",
        "fieldOffice":  "Attock",
        "division":  "Minor Minerals",
        "district":  "Attock",
        "leaseNo":  null,
        "title":  "Dhari Rai Ditta",
        "mineral":  "Sand Stone",
        "dateApplied":  "18.07.2026",
        "method":  "E-Biz",
        "reminder":  "Nil",
        "delayReason":  "The case is under process in EPA Attock"
    },
    {
        "sr":  "13.0",
        "fieldOffice":  "Attock",
        "division":  "Major Minerals",
        "district":  "Attock",
        "leaseNo":  null,
        "title":  "Paracha-3(R)",
        "mineral":  "Limestone",
        "dateApplied":  "28.03.2025",
        "method":  "Manual",
        "reminder":  "Nil",
        "delayReason":  "The case is under process in EPA Attock"
    },
    {
        "sr":  "14.0",
        "fieldOffice":  "Attock",
        "division":  "Major Minerals",
        "district":  "Attock",
        "leaseNo":  null,
        "title":  "pathargarh 4",
        "mineral":  "Limestone",
        "dateApplied":  "13.06.2026",
        "method":  "E-Biz",
        "reminder":  "Nil",
        "delayReason":  "The concerned Area Inspector has been assigned to conduct site inspection of the proposed block."
    },
    {
        "sr":  "15.0",
        "fieldOffice":  "Attock",
        "division":  "Major Minerals",
        "district":  "Attock",
        "leaseNo":  null,
        "title":  "Romian-1",
        "mineral":  "Slate Stone",
        "dateApplied":  "23.07.2026",
        "method":  "E-Biz",
        "reminder":  "Nil",
        "delayReason":  "The concerned Area Inspector has been assigned to conduct a site inspection and submit a factual report accordingly."
    },
    {
        "sr":  "16.0",
        "fieldOffice":  "Bahawalpur",
        "division":  "Minor Minerals",
        "district":  "Bahawalnagar",
        "leaseNo":  null,
        "title":  "ML-BWN-Bahawal Nagar Zone (Renewal Case)",
        "mineral":  "Ord.sand",
        "dateApplied":  "11.09.2025",
        "method":  "Manual",
        "reminder":  "19.11.2025\n01.04.2026\n16.06.2026\n13.08.2026",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "17.0",
        "fieldOffice":  "Bahawalpur",
        "division":  "Minor Minerals",
        "district":  "Bahawalnagar",
        "leaseNo":  null,
        "title":  "ML-BWN-Ratteke/Ahmad Gadu Ka Zone (Renewal Case)",
        "mineral":  "Ord.sand",
        "dateApplied":  "11.09.2025",
        "method":  "Manual",
        "reminder":  "Nil",
        "delayReason":  null
    },
    {
        "sr":  "18.0",
        "fieldOffice":  "Bahawalpur",
        "division":  "Minor Minerals",
        "district":  "Bahawalnagar",
        "leaseNo":  null,
        "title":  "ML-BWN-Pir Gorai-I (Renewal Case)",
        "mineral":  "Ord.sand",
        "dateApplied":  "11.09.2025",
        "method":  "Manual",
        "reminder":  "Nil",
        "delayReason":  null
    },
    {
        "sr":  "19.0",
        "fieldOffice":  "Bahawalpur",
        "division":  "Minor Minerals",
        "district":  "Bahawalnagar",
        "leaseNo":  null,
        "title":  "ML-BWN-Mari Nihal zone (Renewal Case)",
        "mineral":  "Ord.sand",
        "dateApplied":  "11.09.2025",
        "method":  "Manual",
        "reminder":  "Nil",
        "delayReason":  null
    },
    {
        "sr":  "20.0",
        "fieldOffice":  "Bahawalpur",
        "division":  "Minor Minerals",
        "district":  "Bahawalpur",
        "leaseNo":  null,
        "title":  "ML-BWP-Lodhran Satluj Zone (Renewal)",
        "mineral":  "Ord.sand",
        "dateApplied":  "25.07.2026",
        "method":  "Manual",
        "reminder":  "17.08.2026",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "21.0",
        "fieldOffice":  "Bahawalpur",
        "division":  "Minor Minerals",
        "district":  "Bahawalpur",
        "leaseNo":  null,
        "title":  "ML-BWP-Hasiplur Zone 1 (Renewal)",
        "mineral":  "Ord.sand",
        "dateApplied":  "25.07.2026",
        "method":  "Manual",
        "reminder":  "Nil",
        "delayReason":  null
    },
    {
        "sr":  "22.0",
        "fieldOffice":  "Bahawalpur",
        "division":  "Minor Minerals",
        "district":  "Rahim Yar Khan",
        "leaseNo":  null,
        "title":  [
                      [

                      ]
                  ],
        "mineral":  "Ord.sand",
        "dateApplied":  "11.09.2025",
        "method":  "Manual",
        "reminder":  "Nil",
        "delayReason":  "EPA office Rahim yar Khan has convened the meeting before Deputy Commissioner Rahim Yar khan. The Authority directed for joint visits of the sites. Inspection of all sites has been conducted jointly Now EPA office has requested to put up the cases for renewal which they assured that they will put up the cases in next week."
    },
    {
        "sr":  "23.0",
        "fieldOffice":  "Bahawalpur",
        "division":  "Minor Minerals",
        "district":  "Rahim Yar Khan",
        "leaseNo":  null,
        "title":  [
                      [

                      ]
                  ],
        "mineral":  "Ord.sand",
        "dateApplied":  "11.09.2025",
        "method":  "Manual",
        "reminder":  "Nil",
        "delayReason":  null
    },
    {
        "sr":  "24.0",
        "fieldOffice":  "Bahawalpur",
        "division":  "Minor Minerals",
        "district":  "Rahim Yar Khan",
        "leaseNo":  null,
        "title":  "ML-RYK-Basti Nawaz Zone (Renewal Case)",
        "mineral":  "Ord.sand",
        "dateApplied":  "11.09.2025",
        "method":  "Manual",
        "reminder":  "Nil",
        "delayReason":  null
    },
    {
        "sr":  "25.0",
        "fieldOffice":  "Bahawalpur",
        "division":  "Minor Minerals",
        "district":  "Rahim Yar Khan",
        "leaseNo":  null,
        "title":  "ML-RYK-Kot Smaba Zone (Renewal Case)",
        "mineral":  "Ord.sand",
        "dateApplied":  "11.09.2025",
        "method":  "Manual",
        "reminder":  "Nil",
        "delayReason":  null
    },
    {
        "sr":  "26.0",
        "fieldOffice":  "Bahawalpur",
        "division":  "Minor Minerals",
        "district":  "Rahim Yar Khan",
        "leaseNo":  null,
        "title":  "ML-RYK-Khan Pur Zone-II (Renewal Case)",
        "mineral":  "Ord.sand",
        "dateApplied":  "09.02.2026",
        "method":  "Manual",
        "reminder":  "Nil",
        "delayReason":  null
    },
    {
        "sr":  "27.0",
        "fieldOffice":  "Bahawalpur",
        "division":  "Minor Minerals",
        "district":  "Rahim Yar Khan",
        "leaseNo":  null,
        "title":  "ML-RYK-Chachran Sharif Zone (Renewal Case)",
        "mineral":  "Ord.sand",
        "dateApplied":  "09.02.2026",
        "method":  "Manual",
        "reminder":  "Nil",
        "delayReason":  null
    },
    {
        "sr":  "28.0",
        "fieldOffice":  "Chakwal",
        "division":  "Minor Minerals",
        "district":  "Chakwal",
        "leaseNo":  null,
        "title":  "ML.CKL.Sand/Gravel Tamman Zone",
        "mineral":  "Sand/Gravel",
        "dateApplied":  "13.05.2026",
        "method":  "e-Biz",
        "reminder":  "-",
        "delayReason":  "The Environment Department has submitted the case to the Deputy Commissioner for fixation date for the meeting of the District Environmental Approval Committee."
    },
    {
        "sr":  "29.0",
        "fieldOffice":  "Chakwal",
        "division":  "Minor Minerals",
        "district":  "Chakwal",
        "leaseNo":  null,
        "title":  "ML.CKL.Sand/Gravel Bhone Murid Zone",
        "mineral":  "Sand/Gravel",
        "dateApplied":  "13.05.2026",
        "method":  "e-Biz",
        "reminder":  "-",
        "delayReason":  "The Environment Department has submitted the case to the Deputy Commissioner for fixation date for the meeting of the District Environmental Approval Committee."
    },
    {
        "sr":  "30.0",
        "fieldOffice":  "Chakwal",
        "division":  "Minor Minerals",
        "district":  "Chakwal",
        "leaseNo":  null,
        "title":  "ML.CKL.Sand/Gravel Nila Dullah Zone",
        "mineral":  "Sand/Gravel",
        "dateApplied":  "13.05.2026",
        "method":  "e-Biz",
        "reminder":  "-",
        "delayReason":  "The Environment Department has submitted the case to the Deputy Commissioner for fixation date for the meeting of the District Environmental Approval Committee."
    },
    {
        "sr":  "31.0",
        "fieldOffice":  "Chakwal",
        "division":  "Minor Minerals",
        "district":  "Chakwal",
        "leaseNo":  null,
        "title":  "ML.CKL.Gravel Chak Koka-1 (Revised)",
        "mineral":  "Gravel",
        "dateApplied":  "13.05.2026",
        "method":  "e-Biz",
        "reminder":  "-",
        "delayReason":  "The Environment Department has submitted the case to the Deputy Commissioner for fixation date for the meeting of the District Environmental Approval Committee."
    },
    {
        "sr":  "32.0",
        "fieldOffice":  "Chakwal",
        "division":  "Major Minerals",
        "district":  "Chakwal",
        "leaseNo":  null,
        "title":  "PL.CKL.I.ROCK SALT LAFI-1",
        "mineral":  "Rock Salt",
        "dateApplied":  "27.04.2026",
        "method":  "e-Biz",
        "reminder":  "-",
        "delayReason":  "The Environment Department has submitted the case to the Deputy Commissioner for fixation date for the meeting of the District Environmental Approval Committee."
    },
    {
        "sr":  "33.0",
        "fieldOffice":  "Chakwal",
        "division":  "Major Minerals",
        "district":  "Chakwal",
        "leaseNo":  null,
        "title":  "PL.CKL.I.ROCK SALT LAFI-2",
        "mineral":  "Rock Salt",
        "dateApplied":  "27.04.2026",
        "method":  "e-Biz",
        "reminder":  "-",
        "delayReason":  "The Environment Department has submitted the case to the Deputy Commissioner for fixation date for the meeting of the District Environmental Approval Committee."
    },
    {
        "sr":  "34.0",
        "fieldOffice":  "Chakwal",
        "division":  "Major Minerals",
        "district":  "Chakwal",
        "leaseNo":  null,
        "title":  "PL.CKL.II.ROCK SALT TAKWAN",
        "mineral":  "Rock Salt",
        "dateApplied":  "27.04.2026",
        "method":  "e-Biz",
        "reminder":  "-",
        "delayReason":  "The Environment Department has submitted the case to the Deputy Commissioner for fixation date for the meeting of the District Environmental Approval Committee."
    },
    {
        "sr":  "35.0",
        "fieldOffice":  "Chakwal",
        "division":  "Major Minerals",
        "district":  "Chakwal",
        "leaseNo":  null,
        "title":  "PL.CKL.II.ROCK SALT KUSSAK",
        "mineral":  "Rock Salt",
        "dateApplied":  "27.04.2026",
        "method":  "e-Biz",
        "reminder":  "-",
        "delayReason":  "The Environment Department has submitted the case to the Deputy Commissioner for fixation date for the meeting of the District Environmental Approval Committee."
    },
    {
        "sr":  "36.0",
        "fieldOffice":  "Chakwal",
        "division":  "Major Minerals",
        "district":  "Chakwal",
        "leaseNo":  null,
        "title":  "PL.CKL.II.ROCK SALT WAHALI ZER",
        "mineral":  "Rock Salt",
        "dateApplied":  "27.04.2026",
        "method":  "e-Biz",
        "reminder":  "-",
        "delayReason":  "The Environment Department has submitted the case to the Deputy Commissioner for fixation date for the meeting of the District Environmental Approval Committee."
    },
    {
        "sr":  "37.0",
        "fieldOffice":  "Chakwal",
        "division":  "Major Minerals",
        "district":  "Chakwal",
        "leaseNo":  null,
        "title":  "PL.CKL.I.ROCK SALT SARDHI",
        "mineral":  "Rock Salt",
        "dateApplied":  "27.04.2026",
        "method":  "e-Biz",
        "reminder":  "-",
        "delayReason":  "The Environment Department has submitted the case to the Deputy Commissioner for fixation date for the meeting of the District Environmental Approval Committee."
    },
    {
        "sr":  "38.0",
        "fieldOffice":  "Chakwal",
        "division":  "Major Minerals",
        "district":  "Chakwal",
        "leaseNo":  null,
        "title":  "ML.CKL.I. Bentonite (19)",
        "mineral":  [
                        [

                        ]
                    ],
        "dateApplied":  "03.07.2026",
        "method":  "e-Biz",
        "reminder":  "The Environment Department had raised objections, and responses to the quarries have been submitted by this office.",
        "delayReason":  "The Environment Department has submitted the case to the Deputy Commissioner for fixation date for the meeting of the District Environmental Approval Committee."
    },
    {
        "sr":  "39.0",
        "fieldOffice":  "Chakwal",
        "division":  "Major Minerals",
        "district":  "Chakwal",
        "leaseNo":  null,
        "title":  "PL.CKL.I. Bentonite (19)",
        "mineral":  [
                        [

                        ]
                    ],
        "dateApplied":  "03.07.2027",
        "method":  "e-Biz",
        "reminder":  "The Environment Department had raised objections, and responses to the quarries have been submitted by this office.",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "40.0",
        "fieldOffice":  "Chakwal",
        "division":  "Major Minerals",
        "district":  "Chakwal",
        "leaseNo":  null,
        "title":  "ML.CKL.I. Baxuite (05)",
        "mineral":  [
                        [

                        ]
                    ],
        "dateApplied":  "03.07.2026",
        "method":  "e-Biz",
        "reminder":  "The Environment Department had raised objections, and responses to the quarries have been submitted by this office.",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "41.0",
        "fieldOffice":  "Chakwal",
        "division":  "Major Minerals",
        "district":  "Chakwal",
        "leaseNo":  null,
        "title":  "ML.CKL.I. Baxuite Dalwal (New Block)",
        "mineral":  [
                        [

                        ]
                    ],
        "dateApplied":  "03.07.2026",
        "method":  "e-Biz",
        "reminder":  "The Environment Department had raised objections, and responses to the quarries have been submitted by this office.",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "42.0",
        "fieldOffice":  "Chakwal",
        "division":  "Major Minerals",
        "district":  "Chakwal",
        "leaseNo":  null,
        "title":  "ML.CKL.I. Baxuite Khair Pur (New Block)",
        "mineral":  [
                        [

                        ]
                    ],
        "dateApplied":  "03.07.2026",
        "method":  "e-Biz",
        "reminder":  "The Environment Department had raised objections, and responses to the quarries have been submitted by this office.",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "43.0",
        "fieldOffice":  "Chakwal",
        "division":  "Major Minerals",
        "district":  "Chakwal",
        "leaseNo":  null,
        "title":  "ML.CKL.Limestone Ratucha (5) Revised",
        "mineral":  [
                        [

                        ]
                    ],
        "dateApplied":  "08.07.2026",
        "method":  "e-Biz",
        "reminder":  "The Environment Department had raised objections, and responses to the quarries have been submitted by this office.",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "44.0",
        "fieldOffice":  "Chakwal",
        "division":  "Major Minerals",
        "district":  "Chakwal",
        "leaseNo":  null,
        "title":  "ML.CKL.Limestone Ratucha (6) Revised",
        "mineral":  [
                        [

                        ]
                    ],
        "dateApplied":  "08.07.2026",
        "method":  "e-Biz",
        "reminder":  "The Environment Department had raised objections, and responses to the quarries have been submitted by this office.",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "45.0",
        "fieldOffice":  "Chakwal",
        "division":  "Major Minerals",
        "district":  "Chakwal",
        "leaseNo":  null,
        "title":  "ML.CKL.Limestone Pidh 1+2 (Revised)",
        "mineral":  [
                        [

                        ]
                    ],
        "dateApplied":  "08.07.2026",
        "method":  "e-Biz",
        "reminder":  "The Environment Department had raised objections, and responses to the quarries have been submitted by this office.",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "46.0",
        "fieldOffice":  "Chakwal",
        "division":  "Major Minerals",
        "district":  "Chakwal",
        "leaseNo":  null,
        "title":  "ML.CKL.I. Baxuite Dulmial -2 (Revised)",
        "mineral":  [
                        [

                        ]
                    ],
        "dateApplied":  "08.07.2026",
        "method":  "e-Biz",
        "reminder":  "The Environment Department had raised objections, and responses to the quarries have been submitted by this office.",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "47.0",
        "fieldOffice":  "Chiniot",
        "division":  "Minor Minerals",
        "district":  "Chiniot",
        "leaseNo":  null,
        "title":  "Ordinary Sand Saghriyawala Vinoka Zone (Renewal)",
        "mineral":  "Ordinary Sand",
        "dateApplied":  "09.01.2026",
        "method":  "Manual",
        "reminder":  "-",
        "delayReason":  "Requsite documents were provided to EPA Office Chiniot on its request. Site visit was also carried out. Now process od DEC Meeting is underway and it is expected that meeting will be convened within this month and renewals will be issued."
    },
    {
        "sr":  "48.0",
        "fieldOffice":  "Chiniot",
        "division":  "Minor Minerals",
        "district":  "Chiniot",
        "leaseNo":  null,
        "title":  "Ordinary Sand Baran Tarkhana (Renewal)",
        "mineral":  "Ordinary Sand",
        "dateApplied":  "09.01.2026",
        "method":  "Manual",
        "reminder":  "-",
        "delayReason":  "Requsite documents were provided to EPA Office Chiniot on its request. Site visit was also carried out. Now process od DEC Meeting is underway and it is expected that meeting will be convened within this month and renewals will be issued."
    },
    {
        "sr":  "49.0",
        "fieldOffice":  "Chiniot",
        "division":  "Minor Minerals",
        "district":  "Jhang",
        "leaseNo":  null,
        "title":  "Ordinary Sand Daloana Block",
        "mineral":  "Ordinary Sand",
        "dateApplied":  "04.08.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  "The new case was intially submitted manually, later on on  EPA Jhang office directions case was applied through e-biz. Field office is in contact with EPA Jhang office. Field visit has been carried out and hopefully NOC will be issued soon."
    },
    {
        "sr":  "50.0",
        "fieldOffice":  "Gujranwala",
        "division":  "Minor Minerals",
        "district":  "Gujranwala",
        "leaseNo":  null,
        "title":  [
                      [

                      ]
                  ],
        "mineral":  "Ord.Sand",
        "dateApplied":  "13.05.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "51.0",
        "fieldOffice":  "Gujranwala",
        "division":  "Minor Minerals",
        "district":  "Gujranwala",
        "leaseNo":  null,
        "title":  "MM.GJW.Ord.Sand.Wazirabad River Chenab Zone-A",
        "mineral":  [
                        [

                        ]
                    ],
        "dateApplied":  "20.05.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "52.0",
        "fieldOffice":  "Gujranwala",
        "division":  "Minor Minerals",
        "district":  "Gujranwala",
        "leaseNo":  null,
        "title":  "MM.GJW.Ord.Sand.Jabboke Zone",
        "mineral":  [
                        [

                        ]
                    ],
        "dateApplied":  "13.05.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "53.0",
        "fieldOffice":  "Gujranwala",
        "division":  "Minor Minerals",
        "district":  "Hafizabad",
        "leaseNo":  null,
        "title":  "MM.HFZ.Ord.Sand.Bhun Fazil Mehmood Pur Zone",
        "mineral":  "Ord.Sand",
        "dateApplied":  "13.05.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  "The case was submitted through e-biz on 13.05.2026. The Assistant Director EPA raised some qurries whoes reply has been submitted on 19.08.2026. The case is pending for (DAEC) meeting. Renewal case Pending for DAEC meeting."
    },
    {
        "sr":  "54.0",
        "fieldOffice":  "Gujranwala",
        "division":  "Minor Minerals",
        "district":  "Hafizabad",
        "leaseNo":  null,
        "title":  "MM.HFZ.Ord.Sand.Kot Daim Kot Ghazi Zone",
        "mineral":  "Ord.Sand",
        "dateApplied":  "19.08.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  "The case was initially submitted manualy for renewal on 06.01.2026 of the already granted  Envirnmental aprovals and reminder was issue on 06.04.2026, 24.06.2026 and 27.07.2026. Later on as per directions of the DD EPA, all cases were submitted on e-biz. Thereafter, some of the querries have been raised by the EPA which are being replied and the cases are resubmitted on 19.08.2026.Renewal case Pending for DAEC meeting."
    },
    {
        "sr":  "55.0",
        "fieldOffice":  "Gujranwala",
        "division":  "Minor Minerals",
        "district":  "Hafizabad",
        "leaseNo":  null,
        "title":  "MM.HFZ,Ord.Sand.Chuchak Kot Bela Zone",
        "mineral":  "Ord.Sand",
        "dateApplied":  "13.05.2026",
        "method":  "e-Biz",
        "reminder":  null,
        "delayReason":  "It is  submitted that applications for IEE approval/renewal in respect of Ordinary Sand cases were initially submitted manually on 15.04.2024 ,15.06.2024 and 16.12.2025. The cases were subsequently placed before the Deputy Commissioner Hafizabad in the DAEC meeting. However, despite several reminders and personal meetings the cases remained pending for a considerable period without any decision.Meanwhile, the Assistant Director Environment Hafizabad  advised the undersigned to submit the cases through the E-Biz system. Accordingly, the cases were submitted through E-Biz on 13.05.2026. The cases remained pending before the Deputy Commissioner Hafizabad for a considerable period and were eventually deferred on 09.07.2026 without assigning any specific reason.\nSubsequently, the Environment Department returned the cases with certain objections. The objections/queries were duly addressed  and the cases were resubmitted through the E-Biz system to the Environment Department for further necessary proceedings on 12.08.2026 and 19.08.2026.It is pertinent to mention that the undersigned along with the Assistant Director EPA Hafizabad personally met the Deputy Commissioner Hafizabad and requested him to fix a date for the DAEC meeting for issuance/renewal of environmental approvals in respect of three cases and issuance of Environmental NOC for two fresh cases. However, the Deputy Commissioner declined to issue the NOC for the two fresh cases and also declined to process the renewal of two cases, except the Kot Saleem Head Qadirabad case.\nFurthermore, after the meeting the Assistant Director EPA Hafizabad informed the undersigned that the Deputy Commissioner had directed him not to put up the cases relating to Mines \u0026 Minerals for further proceedings. The Assistant Director further stated that the matter should be taken up with the Deputy Commissioner through the higher authorities of the Mines \u0026 Minerals Department so that the cases for renewal and fresh NOC could be processed otherwise, the cases would be returned with objections.\nIn view of the above all the requisite objections/queries have been addressed and the cases have again been resubmitted through the E-Biz system. It is therefore requested that the matter may kindly be taken up with the Deputy Commissioner Hafizabad for early processing of the cases and issuance of the requisite environmental approvals/NOC so that the mining cases may proceed further in accordance with the rules. New case Pending for DAEC meeting."
    },
    {
        "sr":  "56.0",
        "fieldOffice":  "Gujranwala",
        "division":  "Minor Minerals",
        "district":  "Hafizabad",
        "leaseNo":  null,
        "title":  "MM.HFZ.Ord.Sand. Peer Kot/Kot Jafar",
        "mineral":  "ord.sand",
        "dateApplied":  "19.08.2026",
        "method":  "e-Biz",
        "reminder":  null,
        "delayReason":  "It is  submitted that applications for IEE approval/renewal in respect of Ordinary Sand cases were initially submitted manually on 15.04.2024 ,15.06.2024 and 16.12.2025. The cases were subsequently placed before the Deputy Commissioner Hafizabad in the DAEC meeting. However, despite several reminders and personal meetings the cases remained pending for a considerable period without any decision.Meanwhile, the Assistant Director Environment Hafizabad  advised the undersigned to submit the cases through the E-Biz system. Accordingly, the cases were submitted through E-Biz on 13.05.2026. The cases remained pending before the Deputy Commissioner Hafizabad for a considerable period and were eventually deferred on 09.07.2026 without assigning any specific reason.\nSubsequently, the Environment Department returned the cases with certain objections. The objections/queries were duly addressed  and the cases were resubmitted through the E-Biz system to the Environment Department for further necessary proceedings on 12.08.2026 and 19.08.2026.It is pertinent to mention that the undersigned along with the Assistant Director EPA Hafizabad personally met the Deputy Commissioner Hafizabad and requested him to fix a date for the DAEC meeting for issuance/renewal of environmental approvals in respect of three cases and issuance of Environmental NOC for two fresh cases. However, the Deputy Commissioner declined to issue the NOC for the two fresh cases and also declined to process the renewal of two cases, except the Kot Saleem Head Qadirabad case.\nFurthermore, after the meeting the Assistant Director EPA Hafizabad informed the undersigned that the Deputy Commissioner had directed him not to put up the cases relating to Mines \u0026 Minerals for further proceedings. The Assistant Director further stated that the matter should be taken up with the Deputy Commissioner through the higher authorities of the Mines \u0026 Minerals Department so that the cases for renewal and fresh NOC could be processed otherwise, the cases would be returned with objections.\nIn view of the above all the requisite objections/queries have been addressed and the cases have again been resubmitted through the E-Biz system. It is therefore requested that the matter may kindly be taken up with the Deputy Commissioner Hafizabad for early processing of the cases and issuance of the requisite environmental approvals/NOC so that the mining cases may proceed further in accordance with the rules. New case Pending for DAEC meeting."
    },
    {
        "sr":  "57.0",
        "fieldOffice":  "Gujranwala",
        "division":  "Minor Minerals",
        "district":  "Hafizabad",
        "leaseNo":  null,
        "title":  "MM.HFZ.Ord.Sand Kot Saleem Head Qadirabad",
        "mineral":  "ord.sand",
        "dateApplied":  "12.08.2026",
        "method":  "e-Biz",
        "reminder":  null,
        "delayReason":  "It is  submitted that applications for IEE approval/renewal in respect of Ordinary Sand cases were initially submitted manually on 15.04.2024 ,15.06.2024 and 16.12.2025. The cases were subsequently placed before the Deputy Commissioner Hafizabad in the DAEC meeting. However, despite several reminders and personal meetings the cases remained pending for a considerable period without any decision.Meanwhile, the Assistant Director Environment Hafizabad  advised the undersigned to submit the cases through the E-Biz system. Accordingly, the cases were submitted through E-Biz on 13.05.2026. The cases remained pending before the Deputy Commissioner Hafizabad for a considerable period and were eventually deferred on 09.07.2026 without assigning any specific reason.\nSubsequently, the Environment Department returned the cases with certain objections. The objections/queries were duly addressed  and the cases were resubmitted through the E-Biz system to the Environment Department for further necessary proceedings on 12.08.2026 and 19.08.2026.It is pertinent to mention that the undersigned along with the Assistant Director EPA Hafizabad personally met the Deputy Commissioner Hafizabad and requested him to fix a date for the DAEC meeting for issuance/renewal of environmental approvals in respect of three cases and issuance of Environmental NOC for two fresh cases. However, the Deputy Commissioner declined to issue the NOC for the two fresh cases and also declined to process the renewal of two cases, except the Kot Saleem Head Qadirabad case.\nFurthermore, after the meeting the Assistant Director EPA Hafizabad informed the undersigned that the Deputy Commissioner had directed him not to put up the cases relating to Mines \u0026 Minerals for further proceedings. The Assistant Director further stated that the matter should be taken up with the Deputy Commissioner through the higher authorities of the Mines \u0026 Minerals Department so that the cases for renewal and fresh NOC could be processed otherwise, the cases would be returned with objections.\nIn view of the above all the requisite objections/queries have been addressed and the cases have again been resubmitted through the E-Biz system. It is therefore requested that the matter may kindly be taken up with the Deputy Commissioner Hafizabad for early processing of the cases and issuance of the requisite environmental approvals/NOC so that the mining cases may proceed further in accordance with the rules. New case Pending for DAEC meeting."
    },
    {
        "sr":  "58.0",
        "fieldOffice":  "Jhelum",
        "division":  "Minor Minerals",
        "district":  "Jhelum",
        "leaseNo":  null,
        "title":  [
                      [

                      ]
                  ],
        "mineral":  "sand stone",
        "dateApplied":  "08.08.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "59.0",
        "fieldOffice":  "Jhelum",
        "division":  "Minor Minerals",
        "district":  "Jhelum",
        "leaseNo":  null,
        "title":  "ORDINARY SAND HARANPUR/PIND DADAN KHAN ZONE",
        "mineral":  "ordinary sand",
        "dateApplied":  "04.08.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "60.0",
        "fieldOffice":  "Jhelum",
        "division":  "Minor Minerals",
        "district":  "Jhelum",
        "leaseNo":  null,
        "title":  "ORDINARY SAND DEWAN PUR/KOT JATTIPUR ZONE",
        "mineral":  "ordinary sand",
        "dateApplied":  "05.08.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "61.0",
        "fieldOffice":  "Jhelum",
        "division":  "Minor Minerals",
        "district":  "Jhelum",
        "leaseNo":  null,
        "title":  [
                      [

                      ]
                  ],
        "mineral":  "sand stone",
        "dateApplied":  "05.08.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "62.0",
        "fieldOffice":  "Jhelum",
        "division":  "Minor Minerals",
        "district":  "Jhelum",
        "leaseNo":  null,
        "title":  "SAND STONE BLOCK KHEWRA-4",
        "mineral":  "sand stone",
        "dateApplied":  "05.08.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "63.0",
        "fieldOffice":  "Jhelum",
        "division":  "Minor Minerals",
        "district":  "Jhelum",
        "leaseNo":  null,
        "title":  [
                      [

                      ]
                  ],
        "mineral":  "sand gravel",
        "dateApplied":  "05.08.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "64.0",
        "fieldOffice":  "Jhelum",
        "division":  "Minor Minerals",
        "district":  "Jhelum",
        "leaseNo":  null,
        "title":  [
                      [

                      ]
                  ],
        "mineral":  "sand stone",
        "dateApplied":  "05.08.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "65.0",
        "fieldOffice":  "Jhelum",
        "division":  "Minor Minerals",
        "district":  "Jhelum",
        "leaseNo":  null,
        "title":  [
                      [

                      ]
                  ],
        "mineral":  "sand gravel",
        "dateApplied":  "05.08.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "66.0",
        "fieldOffice":  "Jhelum",
        "division":  "Minor Minerals",
        "district":  "Jhelum",
        "leaseNo":  null,
        "title":  [
                      [

                      ]
                  ],
        "mineral":  "sand stone",
        "dateApplied":  "06.08.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "67.0",
        "fieldOffice":  "Jhelum",
        "division":  "Minor Minerals",
        "district":  "Jhelum",
        "leaseNo":  null,
        "title":  [
                      [

                      ]
                  ],
        "mineral":  "sand stone",
        "dateApplied":  "06.08.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "68.0",
        "fieldOffice":  "Jhelum",
        "division":  "Minor Minerals",
        "district":  "Jhelum",
        "leaseNo":  null,
        "title":  [
                      [

                      ]
                  ],
        "mineral":  "sand gravel",
        "dateApplied":  "06.08.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "69.0",
        "fieldOffice":  "Jhelum",
        "division":  "Minor Minerals",
        "district":  "Jhelum",
        "leaseNo":  null,
        "title":  [
                      [

                      ]
                  ],
        "mineral":  "sand gravel",
        "dateApplied":  "06.08.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "70.0",
        "fieldOffice":  "Jhelum",
        "division":  "Minor Minerals",
        "district":  "Jhelum",
        "leaseNo":  null,
        "title":  [
                      [

                      ]
                  ],
        "mineral":  "sand stone",
        "dateApplied":  "06.08.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "71.0",
        "fieldOffice":  "Jhelum",
        "division":  "Minor Minerals",
        "district":  "Jhelum",
        "leaseNo":  null,
        "title":  [
                      [

                      ]
                  ],
        "mineral":  "sand stone",
        "dateApplied":  "06.08.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "72.0",
        "fieldOffice":  "Jhelum",
        "division":  "Minor Minerals",
        "district":  "Jhelum",
        "leaseNo":  null,
        "title":  [
                      [

                      ]
                  ],
        "mineral":  "sand stone",
        "dateApplied":  "06.08.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "73.0",
        "fieldOffice":  "Jhelum",
        "division":  "Minor Minerals",
        "district":  "Jhelum",
        "leaseNo":  null,
        "title":  "ORDINARY SAND MANDHAR BLOCK",
        "mineral":  "ordinary sand",
        "dateApplied":  "06.08.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "74.0",
        "fieldOffice":  "Jhelum",
        "division":  "Minor Minerals",
        "district":  "Jhelum",
        "leaseNo":  null,
        "title":  [
                      [

                      ]
                  ],
        "mineral":  "sand gravel",
        "dateApplied":  "07.08.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "75.0",
        "fieldOffice":  "Jhelum",
        "division":  "Minor Minerals",
        "district":  "Jhelum",
        "leaseNo":  null,
        "title":  [
                      [

                      ]
                  ],
        "mineral":  "sand gravel",
        "dateApplied":  "07.08.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "76.0",
        "fieldOffice":  "Jhelum",
        "division":  "Minor Minerals",
        "district":  "Jhelum",
        "leaseNo":  null,
        "title":  [
                      [

                      ]
                  ],
        "mineral":  "sand stone",
        "dateApplied":  "05.08.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "77.0",
        "fieldOffice":  "Jhelum",
        "division":  "Minor Minerals",
        "district":  "Jhelum",
        "leaseNo":  null,
        "title":  [
                      [

                      ]
                  ],
        "mineral":  "sand Stone",
        "dateApplied":  "17.05.2026",
        "method":  "e-Biz",
        "reminder":  "26.03.2026, 30.03.2026,02.04.2026,16.04.2026,21.04.2026,22.04.2026,23.04.2026,29.04.2026",
        "delayReason":  "The case was intially submitted manually, later on applied through e-biz. The wildlife report received on 08.07.2026 and forest report received 11.08.2026. All the reports received, case will be discussed in next meeting and hopefully NOC will be approved."
    },
    {
        "sr":  "78.0",
        "fieldOffice":  "Khushab",
        "division":  "Major Minerals",
        "district":  "Khushab",
        "leaseNo":  "ML-KHB-Bentonite Daryun New Block",
        "title":  "ML-KHB-Bentonite Daryun New Block",
        "mineral":  [
                        [

                        ]
                    ],
        "dateApplied":  "15.06.2026",
        "method":  "E-Biz",
        "reminder":  "Nil",
        "delayReason":  "The Deputy Commissioner, Khushab, issued a notification dated 02.07.2025, whereby the Divisional Forest Officer, Khushab, and the Assistant Director Wildlife, Khushab, were nominated as members of the committee constituted for scrutiny/review of the environmental assessment of projects. Accordingly, the requisite NOCs from both departments are mandatory prerequisites before the case can be placed before the District Environmental Approval Committee (DEAC) for consideration and further proceedings.In this regard, the matter was taken up with both concerned departments for issuance of the requisite NOCs vide this office letter dated 22.06.2026, followed by a reminder dated 18.08.2026. However, the requisite NOCs are still awaited. This office is actively pursuing the matter with both concerned departments for expeditious issuance of the requisite NOCs."
    },
    {
        "sr":  "79.0",
        "fieldOffice":  "Khushab",
        "division":  "Major Minerals",
        "district":  "Khushab",
        "leaseNo":  "ML-KHB-Bentonite Dullewali New Block",
        "title":  "ML-KHB-Bentonite Dullewali New Block",
        "mineral":  [
                        [

                        ]
                    ],
        "dateApplied":  "17.06.2026",
        "method":  "E-Biz",
        "reminder":  "Nil",
        "delayReason":  null
    },
    {
        "sr":  "80.0",
        "fieldOffice":  "Khushab",
        "division":  "Major Minerals",
        "district":  "Khushab",
        "leaseNo":  "ML-KHB-Silica Sand Sakriala New Block",
        "title":  "ML-KHB-Silica Sand Sakriala New Block",
        "mineral":  [
                        [

                        ]
                    ],
        "dateApplied":  "22.06.2026",
        "method":  "E-Biz",
        "reminder":  "Nil",
        "delayReason":  null
    },
    {
        "sr":  "81.0",
        "fieldOffice":  "Lahore",
        "division":  "Minor Minerals",
        "district":  "Kasur",
        "leaseNo":  null,
        "title":  "Ordinary Sand Lease Ojlah",
        "mineral":  "Ordinary Sand/Ghassar/Bhassar",
        "dateApplied":  "04.05.2026",
        "method":  "E-Bizz",
        "reminder":  "Meeting in person with Inspector EPA on 22.07.2026 and DD (EPA) on 04.08.2026",
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "82.0",
        "fieldOffice":  "Lahore",
        "division":  "Minor Minerals",
        "district":  "Kasur",
        "leaseNo":  null,
        "title":  "Ordinary Sand Lease Bungi Lalu",
        "mineral":  "Ordinary Sand/Ghassar/Bhassar",
        "dateApplied":  "04.05.2026",
        "method":  "E-Bizz",
        "reminder":  "Meeting in person with Inspector EPA on 22.07.2026 and DD (EPA) on 04.08.2027",
        "delayReason":  null
    },
    {
        "sr":  "83.0",
        "fieldOffice":  "Lahore",
        "division":  "Minor Minerals",
        "district":  "Kasur",
        "leaseNo":  null,
        "title":  "Ordinary Sand Lease Head Balloki Works Zone",
        "mineral":  "Ordinary Sand/Ghassar/Bhassar",
        "dateApplied":  "05.05.2026",
        "method":  "E-Bizz",
        "reminder":  "Meeting in person with Inspector EPA on 22.07.2026 and DD (EPA) on 04.08.2028",
        "delayReason":  null
    },
    {
        "sr":  "84.0",
        "fieldOffice":  "Lahore",
        "division":  "Minor Minerals",
        "district":  "Kasur",
        "leaseNo":  null,
        "title":  "Ordinary Sand Lease Jodh Singhwala/Rajowal",
        "mineral":  "Ordinary Sand/Ghassar/Bhassar",
        "dateApplied":  "04.05.2026",
        "method":  "E-Bizz",
        "reminder":  "Meeting in person with Inspector EPA on 22.07.2026 and DD (EPA) on 04.08.2029",
        "delayReason":  null
    },
    {
        "sr":  "85.0",
        "fieldOffice":  "Lahore",
        "division":  "Minor Minerals",
        "district":  "Kasur",
        "leaseNo":  null,
        "title":  "Ordinary Sand Lease Chunnian zone 1",
        "mineral":  "Ordinary Sand/Ghassar/Bhassar",
        "dateApplied":  "04.05.2026",
        "method":  "E-Bizz",
        "reminder":  "Meeting in person with Inspector EPA on 22.07.2026 and DD (EPA) on 04.08.2030",
        "delayReason":  null
    },
    {
        "sr":  "86.0",
        "fieldOffice":  "Lahore",
        "division":  "Minor Minerals",
        "district":  "Kasur",
        "leaseNo":  null,
        "title":  "Ordinary Sand Lease Chunnian Zone 2",
        "mineral":  "Ordinary Sand/Ghassar/Bhassar",
        "dateApplied":  "04.05.2026",
        "method":  "E-Bizz",
        "reminder":  "Meeting in person with Inspector EPA on 22.07.2026 and DD (EPA) on 04.08.2031",
        "delayReason":  null
    },
    {
        "sr":  "87.0",
        "fieldOffice":  "Lahore",
        "division":  "Minor Minerals",
        "district":  "Kasur",
        "leaseNo":  null,
        "title":  "Ordinary Sand Lease Nauthe Khalsa",
        "mineral":  "Ordinary Sand/Ghassar/Bhassar",
        "dateApplied":  "04.05.2026",
        "method":  "E-Bizz",
        "reminder":  "Meeting in person with Inspector EPA on 22.07.2026 and DD (EPA) on 04.08.2032",
        "delayReason":  null
    },
    {
        "sr":  "88.0",
        "fieldOffice":  "Lahore",
        "division":  "Minor Minerals",
        "district":  "Kasur",
        "leaseNo":  null,
        "title":  "Ordinary Sand Lease Bhuchoke/Kot Radha Kishan",
        "mineral":  "Ordinary Sand/Ghassar/Bhassar",
        "dateApplied":  "04.05.2026",
        "method":  "E-Bizz",
        "reminder":  "Meeting in person with Inspector EPA on 22.07.2026 and DD (EPA) on 04.08.2033",
        "delayReason":  null
    },
    {
        "sr":  "89.0",
        "fieldOffice":  "Lahore",
        "division":  "Minor Minerals",
        "district":  "Lahore",
        "leaseNo":  null,
        "title":  "Ordinary Sand Lease Manga Mandi Zone",
        "mineral":  "Ordinary Sand/Ghassar/Bhassar",
        "dateApplied":  "01.05.2026",
        "method":  "E-Bizz",
        "reminder":  "Meetings in person with DD and AD EPA Lahore (19.07.2026, 28.07.2026)",
        "delayReason":  "Initial Submission: In past, IEE renewal applications were being submitted manually. DD (EPA) LHR was requested vide letters dated 17.09.2025, 26.01.2026 \u0026 28.02.2026 to issue IEE renewals of pending cases in Lahore. Whereupon, it was advised to submit cases of renewal may be submitted through the prescribed forum i.e.\ne-Biz portal of Environment Protection Agency.In response, PITB was approached vide letter dated 06.03.2026 to generate Departmental Logins to file renewal applications.  It was communicated verbaly that No Logins will be provided on E-Biz and to use official email address to register account as citizen and to file IEE renewals. This procedural ambiguity resulted into delay in filing IEE renewals.\nEPA Objections: IEE renewals were file in April \u0026 May-2025 through e-Biz for the first time. DD (EPA) raised certain objections regarding tree plantation and laboratory reports.\nCurrent Status: Required laboratory reports have been submitted, while tree for plantation have been provided to RUDA in consultation with the AD (EPA), Lahore."
    },
    {
        "sr":  "90.0",
        "fieldOffice":  "Lahore",
        "division":  "Minor Minerals",
        "district":  "Lahore",
        "leaseNo":  null,
        "title":  "Ordinary Sand Lease Bhadru/Chamrupur",
        "mineral":  "Ordinary Sand/Ghassar/Bhassar",
        "dateApplied":  "01.05.2026",
        "method":  "E-Bizz",
        "reminder":  "Meetings in person with DD and AD EPA Lahore (19.07.2026, 28.07.2026)",
        "delayReason":  null
    },
    {
        "sr":  "91.0",
        "fieldOffice":  "Lahore",
        "division":  "Minor Minerals",
        "district":  "Lahore",
        "leaseNo":  null,
        "title":  "Ordinary Sand Lease Khud Pur Zone",
        "mineral":  "Ordinary Sand/Ghassar/Bhassar",
        "dateApplied":  "01.05.2026",
        "method":  "E-Bizz",
        "reminder":  "Meetings in person with DD and AD EPA Lahore (19.07.2026, 28.07.2026)",
        "delayReason":  null
    },
    {
        "sr":  "92.0",
        "fieldOffice":  "Lahore",
        "division":  "Minor Minerals",
        "district":  "Lahore",
        "leaseNo":  null,
        "title":  "Ordinary Sand Lease Muridwal/Niaz Beg",
        "mineral":  "Ordinary Sand/Ghassar/Bhassar",
        "dateApplied":  "15.04.2026",
        "method":  "E-Bizz",
        "reminder":  "Meetings in person with DD and AD EPA Lahore (19.07.2026, 28.07.2026)",
        "delayReason":  null
    },
    {
        "sr":  "93.0",
        "fieldOffice":  "Lahore",
        "division":  "Minor Minerals",
        "district":  "Lahore",
        "leaseNo":  null,
        "title":  "Ordinary Sand Lease Nonarian",
        "mineral":  "Ordinary Sand/Ghassar/Bhassar",
        "dateApplied":  "01.05.2026",
        "method":  "E-Bizz",
        "reminder":  "Meetings in person with DD and AD EPA Lahore (19.07.2026, 28.07.2026)",
        "delayReason":  null
    },
    {
        "sr":  "94.0",
        "fieldOffice":  "Lahore",
        "division":  "Minor Minerals",
        "district":  "Lahore",
        "leaseNo":  null,
        "title":  "Ordinary Sand Lease Ganja Kalan/Begum Kot",
        "mineral":  "Ordinary Sand/Ghassar/Bhassar",
        "dateApplied":  "01.05.2026",
        "method":  "E-Bizz",
        "reminder":  "Meetings in person with DD and AD EPA Lahore (19.07.2026, 28.07.2026)",
        "delayReason":  null
    },
    {
        "sr":  "95.0",
        "fieldOffice":  "Lahore",
        "division":  "Minor Minerals",
        "district":  "Lahore",
        "leaseNo":  null,
        "title":  "Ordinary Sand Lease Saggian",
        "mineral":  "Ordinary Sand/Ghassar/Bhassar",
        "dateApplied":  "01.05.2026",
        "method":  "E-Bizz",
        "reminder":  "Meetings in person with DD and AD EPA Lahore (19.07.2026, 28.07.2026)",
        "delayReason":  null
    },
    {
        "sr":  "96.0",
        "fieldOffice":  "Lahore",
        "division":  "Minor Minerals",
        "district":  "Nankana Sahib",
        "leaseNo":  null,
        "title":  "Ordinary Sand Lease Syedwala/Parinda Zone",
        "mineral":  "Ordinary Sand/Ghassar/Bhassar",
        "dateApplied":  "01.05.2026",
        "method":  "E-Bizz",
        "reminder":  null,
        "delayReason":  [
                            [

                            ]
                        ]
    },
    {
        "sr":  "97.0",
        "fieldOffice":  "Lahore",
        "division":  "Minor Minerals",
        "district":  "Sheikhupura",
        "leaseNo":  null,
        "title":  [
                      [

                      ]
                  ],
        "mineral":  "Ordinary Sand/Ghassar/Bhassar",
        "dateApplied":  "04.05.2026",
        "method":  "E-Bizz",
        "reminder":  "Meeting with AD (EPA) on 12.08.2026 and DD (EPA) on 10.08.2026",
        "delayReason":  "Initial Submission: As explained above in case of District Lahore.\nEPA Objections: DD(EPA) SKP raised objections on E-Bizz regarding tree plantation and laboratory reports.\n Current Status: The required laboratory reports have been prepared, while the plantation mechanism will be finalized in the next meeting with the District Administration."
    },
    {
        "sr":  "98.0",
        "fieldOffice":  "Lahore",
        "division":  "Minor Minerals",
        "district":  "Sheikhupura",
        "leaseNo":  null,
        "title":  "Ordinary sand Lease Mandi Faizabad",
        "mineral":  "Ordinary Sand/Ghassar/Bhassar",
        "dateApplied":  "05.05.2026",
        "method":  "E-Bizz",
        "reminder":  "Meeting with AD (EPA) on 12.08.2026 and DD (EPA) on 10.08.2027",
        "delayReason":  null
    },
    {
        "sr":  "99.0",
        "fieldOffice":  "Lahore",
        "division":  "Minor Minerals",
        "district":  "Sheikhupura",
        "leaseNo":  null,
        "title":  "Ordinary Sand Lease Mandhali Zone",
        "mineral":  "Ordinary Sand/Ghassar/Bhassar",
        "dateApplied":  "04.05.2026",
        "method":  "E-Bizz",
        "reminder":  "Meeting with AD (EPA) on 12.08.2026 and DD (EPA) on 10.08.2028",
        "delayReason":  null
    },
    {
        "sr":  "100.0",
        "fieldOffice":  "Lahore",
        "division":  "Minor Minerals",
        "district":  "Sheikhupura",
        "leaseNo":  null,
        "title":  "Ordinary sand Lease Dhana Zone",
        "mineral":  "Ordinary Sand/Ghassar/Bhassar",
        "dateApplied":  "03.05.2026",
        "method":  "E-Bizz",
        "reminder":  "Meeting with AD (EPA) on 12.08.2026 and DD (EPA) on 10.08.2029",
        "delayReason":  null
    },
    {
        "sr":  "101.0",
        "fieldOffice":  "Lahore",
        "division":  "Minor Minerals",
        "district":  "Sheikhupura",
        "leaseNo":  null,
        "title":  "Ordinary Sand Lease Kaloke/Jhandiala Sher Khan",
        "mineral":  "Ordinary Sand/Ghassar/Bhassar",
        "dateApplied":  "05.05.2026",
        "method":  "E-Bizz",
        "reminder":  "Meeting with AD (EPA) on 12.08.2026 and DD (EPA) on 10.08.2030",
        "delayReason":  null
    },
    {
        "sr":  "102.0",
        "fieldOffice":  "Lahore",
        "division":  "Minor Minerals",
        "district":  "Sheikhupura",
        "leaseNo":  null,
        "title":  "Ordinary Sand Lease Maqbul Pur Zone",
        "mineral":  "Ordinary Sand/Ghassar/Bhassar",
        "dateApplied":  "05.05.2026",
        "method":  "E-Bizz",
        "reminder":  "Meeting with AD (EPA) on 12.08.2026 and DD (EPA) on 10.08.2031",
        "delayReason":  null
    },
    {
        "sr":  "103.0",
        "fieldOffice":  "Lahore",
        "division":  "Minor Minerals",
        "district":  "Sheikhupura",
        "leaseNo":  null,
        "title":  "Ordinary Sand Lease Qila Shabdeo Singh/Mananwala Zone",
        "mineral":  "Ordinary Sand/Ghassar/Bhassar",
        "dateApplied":  "05.05.2026",
        "method":  "E-Bizz",
        "reminder":  "Meeting with AD (EPA) on 12.08.2026 and DD (EPA) on 10.08.2032",
        "delayReason":  null
    },
    {
        "sr":  "104.0",
        "fieldOffice":  "Lahore",
        "division":  "Minor Minerals",
        "district":  "Sheikhupura",
        "leaseNo":  null,
        "title":  "Ordinary Sadn Lease Kot Jaspat Jada",
        "mineral":  "Ordinary Sand/Ghassar/Bhassar",
        "dateApplied":  "05.05.2026",
        "method":  "E-Bizz",
        "reminder":  "Meeting with AD (EPA) on 12.08.2026 and DD (EPA) on 10.08.2033",
        "delayReason":  null
    },
    {
        "sr":  "105.0",
        "fieldOffice":  "Lahore",
        "division":  "Minor Minerals",
        "district":  "Sheikhupura",
        "leaseNo":  null,
        "title":  "Ordinary Sand Lease Mirowal Kangra Zone",
        "mineral":  "Ordinary Sand/Ghassar/Bhassar",
        "dateApplied":  "05.05.2026",
        "method":  "E-Bizz",
        "reminder":  "Meeting with AD (EPA) on 12.08.2026 and DD (EPA) on 10.08.2034",
        "delayReason":  null
    },
    {
        "sr":  "106.0",
        "fieldOffice":  "Lahore",
        "division":  "Minor Minerals",
        "district":  "Sheikhupura",
        "leaseNo":  null,
        "title":  "Ordinary Sand Lease Feroze Wattuwan Zone",
        "mineral":  "Ordinary Sand/Ghassar/Bhassar",
        "dateApplied":  "05.05.2026",
        "method":  "E-Bizz",
        "reminder":  "Meeting with AD (EPA) on 12.08.2026 and DD (EPA) on 10.08.2035",
        "delayReason":  null
    },
    {
        "sr":  "107.0",
        "fieldOffice":  "Lahore",
        "division":  "Minor Minerals",
        "district":  "Sheikhupura",
        "leaseNo":  null,
        "title":  "Ordinary Sand Lease Sheikhupura Zone 1",
        "mineral":  "Ordinary Sand/Ghassar/Bhassar",
        "dateApplied":  "05.05.2026",
        "method":  "E-Bizz",
        "reminder":  "Meeting with AD (EPA) on 12.08.2026 and DD (EPA) on 10.08.2036",
        "delayReason":  null
    },
    {
        "sr":  "108.0",
        "fieldOffice":  "Multan",
        "division":  "Minor Minerals",
        "district":  "Khanewal",
        "leaseNo":  null,
        "title":  "KWL/ Ord. Sand/Kabirwala zone-1",
        "mineral":  "Ordinary Sand",
        "dateApplied":  "14.03.2025",
        "method":  "Manual/E-biz",
        "reminder":  "-",
        "delayReason":  "-do-"
    },
    {
        "sr":  "109.0",
        "fieldOffice":  "Multan",
        "division":  "Minor Minerals",
        "district":  "Khanewal",
        "leaseNo":  null,
        "title":  "KWL/ Ord. Sand/Basti Dulwan Zone",
        "mineral":  "Ordinary Sand",
        "dateApplied":  "14.03.2025",
        "method":  "Manual/E-biz",
        "reminder":  "-",
        "delayReason":  "-do-"
    },
    {
        "sr":  "110.0",
        "fieldOffice":  "Multan",
        "division":  "Minor Minerals",
        "district":  "Khanewal",
        "leaseNo":  null,
        "title":  "KWL/ Ord. Sand/Talumba zone",
        "mineral":  "Ordinary Sand",
        "dateApplied":  "14.03.2025",
        "method":  "Manual/E-biz",
        "reminder":  "-",
        "delayReason":  "-do-"
    },
    {
        "sr":  "111.0",
        "fieldOffice":  "Multan",
        "division":  "Minor Minerals",
        "district":  "Khanewal",
        "leaseNo":  null,
        "title":  "KWL/ Ord. Sand/Jahania zone-1",
        "mineral":  "Ordinary Sand",
        "dateApplied":  "14.03.2025",
        "method":  "Manual/E-biz",
        "reminder":  "-",
        "delayReason":  "-do-"
    },
    {
        "sr":  "112.0",
        "fieldOffice":  "Multan",
        "division":  "Minor Minerals",
        "district":  "Khanewal",
        "leaseNo":  null,
        "title":  "KWL/Ord. Sand Jahanian zone-2",
        "mineral":  "Ordinary Sand",
        "dateApplied":  "14.03.2025",
        "method":  "Manual/E-biz",
        "reminder":  "-",
        "delayReason":  "-do-"
    },
    {
        "sr":  "113.0",
        "fieldOffice":  "Multan",
        "division":  "Minor Minerals",
        "district":  "Khanewal",
        "leaseNo":  null,
        "title":  "KWL/ Ord. Sand/Kabirwala zone-2",
        "mineral":  "Ordinary Sand",
        "dateApplied":  "14.03.2025",
        "method":  "Manual/E-biz",
        "reminder":  "-",
        "delayReason":  "-do-"
    },
    {
        "sr":  "114.0",
        "fieldOffice":  "Multan",
        "division":  "Minor Minerals",
        "district":  "Khanewal",
        "leaseNo":  null,
        "title":  "KWL/ Ord. Sand/Pull Baghar / Sarai Sidhu Zone",
        "mineral":  "Ordinary Sand",
        "dateApplied":  "14.03.2025",
        "method":  "Manual/E-biz",
        "reminder":  "-",
        "delayReason":  "-do-"
    },
    {
        "sr":  "115.0",
        "fieldOffice":  "Multan",
        "division":  "Minor Minerals",
        "district":  "Khanewal",
        "leaseNo":  null,
        "title":  "KWL/ Ord. Sand/Khanewal zone-1+2",
        "mineral":  "Ordinary Sand",
        "dateApplied":  "14.03.2025",
        "method":  "Manual/E-biz",
        "reminder":  "-",
        "delayReason":  "-do-"
    },
    {
        "sr":  "116.0",
        "fieldOffice":  "Multan",
        "division":  "Minor Minerals",
        "district":  "Khanewal",
        "leaseNo":  null,
        "title":  "KWL/Ord. Sand/Wajhian Wala zone-2",
        "mineral":  "Ordinary Sand",
        "dateApplied":  "14.03.2025",
        "method":  "Manual/E-biz",
        "reminder":  "-",
        "delayReason":  "-do-"
    },
    {
        "sr":  "117.0",
        "fieldOffice":  "Multan",
        "division":  "Minor Minerals",
        "district":  "Vehari",
        "leaseNo":  null,
        "title":  "VR/Ord. Sand/ Burewala zone-1",
        "mineral":  "Ordinary Sand",
        "dateApplied":  "27.02.2026",
        "method":  "E-biz",
        "reminder":  "-",
        "delayReason":  "-do-"
    },
    {
        "sr":  "118.0",
        "fieldOffice":  "Multan",
        "division":  "Minor Minerals",
        "district":  "Vehari",
        "leaseNo":  null,
        "title":  "VR/Ord. Sand/ Tibba Sultan Pur/ Mitro zone",
        "mineral":  "Ordinary Sand",
        "dateApplied":  "04.03.2026",
        "method":  "E-biz",
        "reminder":  "-",
        "delayReason":  "-do-"
    },
    {
        "sr":  "119.0",
        "fieldOffice":  "Rawalpindi",
        "division":  "Minor Minerals",
        "district":  "Rawalpindi",
        "leaseNo":  null,
        "title":  "GRAVEL CHOA KHALSA",
        "mineral":  "Gravel",
        "dateApplied":  "04.06.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  "These cases were initially submitted manualy for renewal  of the already granted  Envirnmental aprovals. Later on as per directions of the DD EPA, all cases were submitted on e-biz. Thereafter, some of the querries have been raise by the EPA which are being replied.  Site inspection, has been conducted.  The cases will be placed before the comittee for approvel."
    },
    {
        "sr":  "120.0",
        "fieldOffice":  "Rawalpindi",
        "division":  "Minor Minerals",
        "district":  "Rawalpindi",
        "leaseNo":  null,
        "title":  "GRAVEL PAKKA KHU",
        "mineral":  "Gravel",
        "dateApplied":  "04.06.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  "These cases were initially submitted manualy for renewal  of the already granted  Envirnmental aprovals. Later on as per directions of the DD EPA, all cases were submitted on e-biz. Thereafter, some of the querries have been raise by the EPA which are being replied.  Site inspection, has been conducted.  The cases will be placed before the comittee for approvel."
    },
    {
        "sr":  "121.0",
        "fieldOffice":  "Rawalpindi",
        "division":  "Minor Minerals",
        "district":  "Rawalpindi",
        "leaseNo":  null,
        "title":  "SAND GRAVEL DINGIWALA KAS",
        "mineral":  "sand gravel",
        "dateApplied":  "04.06.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  "These cases were initially submitted manualy for renewal  of the already granted  Envirnmental aprovals. Later on as per directions of the DD EPA, all cases were submitted on e-biz. Thereafter, some of the querries have been raise by the EPA which are being replied.  Site inspection, has been conducted.  The cases will be placed before the comittee for approvel."
    },
    {
        "sr":  "122.0",
        "fieldOffice":  "Rawalpindi",
        "division":  "Minor Minerals",
        "district":  "Rawalpindi",
        "leaseNo":  null,
        "title":  "SAND GRAVEL KOLIAN HAMEED",
        "mineral":  "sand gravel",
        "dateApplied":  "04.06.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  "These cases were initially submitted manualy for renewal  of the already granted  Envirnmental aprovals. Later on as per directions of the DD EPA, all cases were submitted on e-biz. Thereafter, some of the querries have been raise by the EPA which are being replied.  Site inspection, has been conducted.  The cases will be placed before the comittee for approvel."
    },
    {
        "sr":  "123.0",
        "fieldOffice":  "Rawalpindi",
        "division":  "Minor Minerals",
        "district":  "Rawalpindi",
        "leaseNo":  null,
        "title":  [
                      [

                      ]
                  ],
        "mineral":  "sand gravel",
        "dateApplied":  "04.06.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  "These cases were initially submitted manualy for renewal  of the already granted  Envirnmental aprovals. Later on as per directions of the DD EPA, all cases were submitted on e-biz. Thereafter, some of the querries have been raise by the EPA which are being replied.  Site inspection, has been conducted.  The cases will be placed before the comittee for approvel."
    },
    {
        "sr":  "124.0",
        "fieldOffice":  "Rawalpindi",
        "division":  "Minor Minerals",
        "district":  "Rawalpindi",
        "leaseNo":  null,
        "title":  "SAND GRAVEL KHAN PUR",
        "mineral":  "sand gravel",
        "dateApplied":  "04.06.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  "These cases were initially submitted manualy for renewal  of the already granted  Envirnmental aprovals. Later on as per directions of the DD EPA, all cases were submitted on e-biz. Thereafter, some of the querries have been raise by the EPA which are being replied.  Site inspection, has been conducted.  The cases will be placed before the comittee for approvel."
    },
    {
        "sr":  "125.0",
        "fieldOffice":  "Rawalpindi",
        "division":  "Minor Minerals",
        "district":  "Rawalpindi",
        "leaseNo":  null,
        "title":  [
                      [

                      ]
                  ],
        "mineral":  "sand gravel",
        "dateApplied":  "04.06.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  "These cases were initially submitted manualy for renewal  of the already granted  Envirnmental aprovals. Later on as per directions of the DD EPA, all cases were submitted on e-biz. Thereafter, some of the querries have been raise by the EPA which are being replied.  Site inspection, has been conducted.  The cases will be placed before the comittee for approvel."
    },
    {
        "sr":  "126.0",
        "fieldOffice":  "Rawalpindi",
        "division":  "Minor Minerals",
        "district":  "Rawalpindi",
        "leaseNo":  null,
        "title":  [
                      [

                      ]
                  ],
        "mineral":  "sand stone",
        "dateApplied":  "04.06.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  "These cases were initially submitted manualy for renewal  of the already granted  Envirnmental aprovals. Later on as per directions of the DD EPA, all cases were submitted on e-biz. Thereafter, some of the querries have been raise by the EPA which are being replied.  Site inspection, has been conducted.  The cases will be placed before the comittee for approvel."
    },
    {
        "sr":  "127.0",
        "fieldOffice":  "Rawalpindi",
        "division":  "Minor Minerals",
        "district":  "Rawalpindi",
        "leaseNo":  null,
        "title":  [
                      [

                      ]
                  ],
        "mineral":  "sand gravel",
        "dateApplied":  "04.06.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  "These cases were initially submitted manualy for renewal  of the already granted  Envirnmental aprovals. Later on as per directions of the DD EPA, all cases were submitted on e-biz. Thereafter, some of the querries have been raise by the EPA which are being replied.  Site inspection, has been conducted.  The cases will be placed before the comittee for approvel."
    },
    {
        "sr":  "128.0",
        "fieldOffice":  "Rawalpindi",
        "division":  "Minor Minerals",
        "district":  "Rawalpindi",
        "leaseNo":  null,
        "title":  [
                      [

                      ]
                  ],
        "mineral":  "sand gravel",
        "dateApplied":  "04.06.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  "These cases were initially submitted manualy for renewal  of the already granted  Envirnmental aprovals. Later on as per directions of the DD EPA, all cases were submitted on e-biz. Thereafter, some of the querries have been raise by the EPA which are being replied.  Site inspection, has been conducted.  The cases will be placed before the comittee for approvel."
    },
    {
        "sr":  "129.0",
        "fieldOffice":  "Rawalpindi",
        "division":  "Minor Minerals",
        "district":  "Rawalpindi",
        "leaseNo":  null,
        "title":  [
                      [

                      ]
                  ],
        "mineral":  "sand gravel",
        "dateApplied":  "04.06.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  "These cases were initially submitted manualy for renewal  of the already granted  Envirnmental aprovals. Later on as per directions of the DD EPA, all cases were submitted on e-biz. Thereafter, some of the querries have been raise by the EPA which are being replied.  Site inspection, has been conducted.  The cases will be placed before the comittee for approvel."
    },
    {
        "sr":  "130.0",
        "fieldOffice":  "Rawalpindi",
        "division":  "Minor Minerals",
        "district":  "Rawalpindi",
        "leaseNo":  null,
        "title":  [
                      [

                      ]
                  ],
        "mineral":  "sand gravel",
        "dateApplied":  "04.06.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  "These cases were initially submitted manualy for renewal  of the already granted  Envirnmental aprovals. Later on as per directions of the DD EPA, all cases were submitted on e-biz. Thereafter, some of the querries have been raise by the EPA which are being replied.  Site inspection, has been conducted.  The cases will be placed before the comittee for approvel."
    },
    {
        "sr":  "131.0",
        "fieldOffice":  "Rawalpindi",
        "division":  "Minor Minerals",
        "district":  "Rawalpindi",
        "leaseNo":  null,
        "title":  [
                      [

                      ]
                  ],
        "mineral":  "sand gravel",
        "dateApplied":  "04.06.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  "These cases were initially submitted manualy for renewal  of the already granted  Envirnmental aprovals. Later on as per directions of the DD EPA, all cases were submitted on e-biz. Thereafter, some of the querries have been raise by the EPA which are being replied.  Site inspection, has been conducted.  The cases will be placed before the comittee for approvel."
    },
    {
        "sr":  "132.0",
        "fieldOffice":  "Rawalpindi",
        "division":  "Minor Minerals",
        "district":  "Rawalpindi",
        "leaseNo":  null,
        "title":  "SAND GRAVEL KALAR SYEDAN-1",
        "mineral":  "sand gravel",
        "dateApplied":  "04.06.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  "These cases were initially submitted manualy for renewal  of the already granted  Envirnmental aprovals. Later on as per directions of the DD EPA, all cases were submitted on e-biz. Thereafter, some of the querries have been raise by the EPA which are being replied.  Site inspection, has been conducted.  The cases will be placed before the comittee for approvel."
    },
    {
        "sr":  "133.0",
        "fieldOffice":  "Rawalpindi",
        "division":  "Minor Minerals",
        "district":  "Rawalpindi",
        "leaseNo":  null,
        "title":  [
                      [

                      ]
                  ],
        "mineral":  "sand gravel",
        "dateApplied":  "04.06.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  "These cases were initially submitted manualy for renewal  of the already granted  Envirnmental aprovals. Later on as per directions of the DD EPA, all cases were submitted on e-biz. Thereafter, some of the querries have been raise by the EPA which are being replied.  Site inspection, has been conducted.  The cases will be placed before the comittee for approvel."
    },
    {
        "sr":  "134.0",
        "fieldOffice":  "Rawalpindi",
        "division":  "Minor Minerals",
        "district":  "Rawalpindi",
        "leaseNo":  null,
        "title":  [
                      [

                      ]
                  ],
        "mineral":  "sand gravel",
        "dateApplied":  "08.08.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  "Newly created block. IEE report has been recently submitted to EPA"
    },
    {
        "sr":  "135.0",
        "fieldOffice":  "Rawalpindi",
        "division":  "Minor Minerals",
        "district":  "Rawalpindi",
        "leaseNo":  null,
        "title":  [
                      [

                      ]
                  ],
        "mineral":  "sand gravel",
        "dateApplied":  "08.08.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  "Newly created block. IEE report has been recently submitted to EPA"
    },
    {
        "sr":  "136.0",
        "fieldOffice":  "Rawalpindi",
        "division":  "Minor Minerals",
        "district":  "Rawalpindi",
        "leaseNo":  null,
        "title":  "SAND STONE THALIAN",
        "mineral":  "sand stone",
        "dateApplied":  "13.08.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  "Newly created block. IEE report has been recently submitted to EPA"
    },
    {
        "sr":  "137.0",
        "fieldOffice":  "Rawalpindi",
        "division":  "Major Minerals",
        "district":  "Rawalpindi",
        "leaseNo":  null,
        "title":  "LIMESTONE BLOCK BAHUTI PIND 2-A",
        "mineral":  "Limestone",
        "dateApplied":  "04.06.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  "These cases were initially submitted manualy for renewal  of the already granted  Envirnmental aprovals. Later on as per directions of the DD EPA, all cases were submitted on e-biz. Thereafter, some of the querries have been raise by the EPA which are being replied.  Site inspection, has been conducted.  The cases will be placed before the comittee for approvel."
    },
    {
        "sr":  "138.0",
        "fieldOffice":  "Rawalpindi",
        "division":  "Major Minerals",
        "district":  "Rawalpindi",
        "leaseNo":  null,
        "title":  "LIMESTONE BOCK DHOK GULAB-6",
        "mineral":  "Limestone",
        "dateApplied":  "04.06.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  "These cases were initially submitted manualy for renewal  of the already granted  Envirnmental aprovals. Later on as per directions of the DD EPA, all cases were submitted on e-biz. Thereafter, some of the querries have been raise by the EPA which are being replied.  Site inspection, has been conducted.  The cases will be placed before the comittee for approvel."
    },
    {
        "sr":  "139.0",
        "fieldOffice":  "Rawalpindi",
        "division":  "Major Minerals",
        "district":  "Rawalpindi",
        "leaseNo":  null,
        "title":  "LIMESTONE BLOCK DHOK GULAB-07",
        "mineral":  "Limestone",
        "dateApplied":  "04.06.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  "These cases were initially submitted manualy for renewal  of the already granted  Envirnmental aprovals. Later on as per directions of the DD EPA, all cases were submitted on e-biz. Thereafter, some of the querries have been raise by the EPA which are being replied.  Site inspection, has been conducted.  The cases will be placed before the comittee for approvel."
    },
    {
        "sr":  "140.0",
        "fieldOffice":  "Sahiwal",
        "division":  "Minor Minerals",
        "district":  "Pakpattan",
        "leaseNo":  null,
        "title":  "ML-SWL-AD(M\u0026M)/Pakpattan City Zone-2  (Renewal)",
        "mineral":  "Ordinary Sand",
        "dateApplied":  "05.08.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  "Pending before Environment Department for DEC meeting"
    },
    {
        "sr":  "141.0",
        "fieldOffice":  "Sahiwal",
        "division":  "Minor Minerals",
        "district":  "Pakpattan",
        "leaseNo":  null,
        "title":  "ML-SWL-AD(M\u0026M) Arifwala City Zone-2 (Renewal)",
        "mineral":  "Ordinary Sand",
        "dateApplied":  "05.08.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  "Pending before Environment Department for DEC meeting"
    },
    {
        "sr":  "142.0",
        "fieldOffice":  "Sahiwal",
        "division":  "Minor Minerals",
        "district":  "Pakpattan",
        "leaseNo":  null,
        "title":  "ML-SWL-AD(M\u0026M) Qaboola Zone (Renewal)",
        "mineral":  "Ordinary Sand",
        "dateApplied":  "05.08.2026",
        "method":  "e-Biz",
        "reminder":  "Nil",
        "delayReason":  "Pending before Environment Department for DEC meeting"
    },
    {
        "sr":  "143.0",
        "fieldOffice":  "Sahiwal",
        "division":  "Minor Minerals",
        "district":  "Sahiwal",
        "leaseNo":  null,
        "title":  "ML-SWL-AD(M\u0026M)/Sahiwal Zone-4 (Renewal)",
        "mineral":  "Ordinary Sand",
        "dateApplied":  "13.04.2026",
        "method":  "Manual",
        "reminder":  "Nil",
        "delayReason":  "Pending before Environment Department for DEC meeting"
    },
    {
        "sr":  "144.0",
        "fieldOffice":  "Sahiwal",
        "division":  "Minor Minerals",
        "district":  "Sahiwal",
        "leaseNo":  null,
        "title":  "ML-SWL-AD(M\u0026M)/Mullah Hamza Zone (Renewal)",
        "mineral":  "Ordinary Sand",
        "dateApplied":  "13.04.2026",
        "method":  "Manual",
        "reminder":  "Nil",
        "delayReason":  "Pending before Environment Department for DEC meeting"
    },
    {
        "sr":  "145.0",
        "fieldOffice":  "Sahiwal",
        "division":  "Minor Minerals",
        "district":  "Sahiwal",
        "leaseNo":  null,
        "title":  "ML-SWL-AD(M\u0026M) Chichwatni Kamalia Zone-1 (Renewal)",
        "mineral":  "Ordinary Sand",
        "dateApplied":  "13.04.2026",
        "method":  "Manual",
        "reminder":  "Nil",
        "delayReason":  "Pending before Environment Department for DEC meeting"
    },
    {
        "sr":  "146.0",
        "fieldOffice":  "Sargodha",
        "division":  "Minor Minerals",
        "district":  "Sargodha",
        "leaseNo":  null,
        "title":  "Sandstone Block No. (A) near Shaheenabad",
        "mineral":  [
                        [

                        ]
                    ],
        "dateApplied":  "23.07.2026",
        "method":  "e-Biz",
        "reminder":  "12.08.2026",
        "delayReason":  "It is submitted that as per the current practice/ policy the subject cases were filed to the EPA Sargodha through eBiz Punjab on 23.07.2026. Subsequently, EPA Sargodha raised certain observations on eBiz portal related to said cases and directed this office to submit said cases also manually. Accordingly, the requisite hard copies of these cases were submitted to the concerned department and further requested vide letter dated 12.08.2026 that the IEE approvals of these cases may be issued at the earliest for the enhancement of Govt. revenue. Moreover, the undersigned contacted the Deputy Director EPA Sargodha via telephonically on 19.08.2026 regarding the issuance of IEE approvals who informed that site visits of the subject cases would be conducted within the next two to three days, following which the cases would be placed before the District Environmental Approval Committee meeting for the issuance of IEE approvals."
    },
    {
        "sr":  "147.0",
        "fieldOffice":  "Sargodha",
        "division":  "Minor Minerals",
        "district":  "Sargodha",
        "leaseNo":  null,
        "title":  "Sandstone Block No. (B) near Shaheenabad",
        "mineral":  [
                        [

                        ]
                    ],
        "dateApplied":  "23.07.2026",
        "method":  "e-Biz",
        "reminder":  "12.08.2026",
        "delayReason":  null
    },
    {
        "sr":  "148.0",
        "fieldOffice":  "Sargodha",
        "division":  "Minor Minerals",
        "district":  "Sargodha",
        "leaseNo":  null,
        "title":  "Sandstone Block No. (C) near Shaheenabad",
        "mineral":  [
                        [

                        ]
                    ],
        "dateApplied":  "23.07.2026",
        "method":  "e-Biz",
        "reminder":  "12.08.2026",
        "delayReason":  null
    },
    {
        "sr":  "149.0",
        "fieldOffice":  "Sargodha",
        "division":  "Minor Minerals",
        "district":  "Sargodha",
        "leaseNo":  null,
        "title":  "Sandstone Block No. (D) near Shaheenabad",
        "mineral":  [
                        [

                        ]
                    ],
        "dateApplied":  "23.07.2026",
        "method":  "e-Biz",
        "reminder":  "12.08.2026",
        "delayReason":  null
    },
    {
        "sr":  "150.0",
        "fieldOffice":  "Sargodha",
        "division":  "Minor Minerals",
        "district":  "Sargodha",
        "leaseNo":  null,
        "title":  "Sandstone Block No. (E) near Shaheenabad",
        "mineral":  [
                        [

                        ]
                    ],
        "dateApplied":  "23.07.2026",
        "method":  "e-Biz",
        "reminder":  "12.08.2026",
        "delayReason":  null
    },
    {
        "sr":  "151.0",
        "fieldOffice":  "Sargodha",
        "division":  "Minor Minerals",
        "district":  "Sargodha",
        "leaseNo":  null,
        "title":  "Sandstone Block No. (F) near Shaheenabad",
        "mineral":  [
                        [

                        ]
                    ],
        "dateApplied":  "23.07.2026",
        "method":  "e-Biz",
        "reminder":  "12.08.2026",
        "delayReason":  null
    }
],

  // 9. Appeals Data (187 records)
  appealsCases: [
    {
        "sr":  "2.0",
        "appealNo":  "DGMM/JLM-APPEAL (208)/2021",
        "subject":  "Sand Gravel (Malot-1) District Jhelum",
        "year":  "2021.0",
        "dateOfAppeal":  "44264.0",
        "appellant":  "Muhammad Sadaqat etc",
        "impugnedAction":  "a recovery of sale price of mineral amounting to Rs.4,65,03,723/- and Rs.52,50,000/- by dividing it equally to five crusher owners",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "3.0",
        "appealNo":  "DGMM/JLM-APPEAL(207)/2021",
        "subject":  "Sand Gravel (Malot-1) District Jhelum",
        "year":  "2021.0",
        "dateOfAppeal":  "44264.0",
        "appellant":  "Malik Sabir Hussain",
        "impugnedAction":  "a recovery of sale price of mineral amounting to Rs.4,65,03,723/- and Rs.52,50,000/- by dividing it equally to Malik Sabir Hussain and four crusher owners",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "4.0",
        "appealNo":  "DGMM/SKP-APPEAL (143)/2021",
        "subject":  "Ord. Sand block Basira, Sheikhupura",
        "year":  "2021.0",
        "dateOfAppeal":  "44511.0",
        "appellant":  "Ch. Ghulam Hassan",
        "impugnedAction":  "mining lease for ordinary sand was cancelled on account of nonpayment of 3rd installment and the request of the appellant for refund 1st and 2nd installment declined",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "5.0",
        "appealNo":  "DGMM/ATK-APPEAL(249)/2021",
        "subject":  "Ord. Sand Terbehti Sanjwal, Block-4, Attock",
        "year":  "2021.0",
        "dateOfAppeal":  "44526.0",
        "appellant":  "Khan Pervaiz",
        "impugnedAction":  "mining lease of the appellant was cancelled on account of non-payment of 3rd installment and security deposited by the appellant was forfeited under Rule-207(2)",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "6.0",
        "appealNo":  "DGMM/ATK-APPEAL(248)/2021",
        "subject":  "Ord. Sand Terbethi Sanjwal Block-9, Attock.",
        "year":  "2021.0",
        "dateOfAppeal":  "44239.0",
        "appellant":  "Khan Pervaiz",
        "impugnedAction":  "mining lease was cancelled on account of non-payment of 2nd installment and security deposited by the appellant was forfeited under Rule-207(2)",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "7.0",
        "appealNo":  "DGMM/SRG-APPEAL (372)/2022",
        "subject":  "Ord. Sand Chak Nizam Miani 2(B)",
        "year":  "2022.0",
        "dateOfAppeal":  "44714.0",
        "appellant":  "Khurram Shahzad Khan",
        "impugnedAction":  "request of the appellant for returning back of 5 CDRs amounting to Rs.2,52,67,000/- was rejected",
        "issue":  "CDRs dispute",
        "status":  "Decided",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "8.0",
        "appealNo":  "DGMM/ATK-APPEAL (250)/2022",
        "subject":  "Ord. Sand Terbehti Sanjwal, Block-4, Attock",
        "year":  "2022.0",
        "dateOfAppeal":  "44616.0",
        "appellant":  "Khan Pervaiz",
        "impugnedAction":  "mining lease of the appellant was cancelled on account of non-payment of 3rd installment, 10% income tax and 15% security deposited by the appellant was forfeited under Rule-207(2)",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "9.0",
        "appealNo":  "DGMM/TTS-APPEAL(49)/2022",
        "subject":  "Ord. Sand near Kamalia Bhussi Pir Mahal Zone District Toba Tek Sing",
        "year":  "2022.0",
        "dateOfAppeal":  "44645.0",
        "appellant":  "Mst. Habib Akhtar",
        "impugnedAction":  "mining lease of the appellant was cancelled on account of non-payment of 2nd installment and security already deposited was forfeited under Rule-207(2)",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "10.0",
        "appealNo":  "DGMM/MISC-APPEAL (94)/2022",
        "subject":  "Sand Stone Farash Taraki-1, Jhelum.",
        "year":  "2022.0",
        "dateOfAppeal":  "44798.0",
        "appellant":  "Ch. Muhammad Zafar Iqbal",
        "impugnedAction":  "appellant was allowed refund of one installment but he claims for refund of 2nd installment under Rule-222",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "11.0",
        "appealNo":  "DGMM/ATK-APPEAL (251)/2022",
        "subject":  "Unauthorized excavation in respect of Sand Gravel Block No.1 near Shahia, Attock",
        "year":  "2022.0",
        "dateOfAppeal":  "44678.0",
        "appellant":  "Mumtaz Khan",
        "impugnedAction":  "Recovery of Rs.3,30,000/-",
        "issue":  "Recovery",
        "status":  "Decided",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "12.0",
        "appealNo":  "DGMM/ATK-APPEAL (252)/2022",
        "subject":  "Unauthorized Exc. Block No.1, near Shahia, District Attock",
        "year":  "2022.0",
        "dateOfAppeal":  "44678.0",
        "appellant":  "Malik Taimoor",
        "impugnedAction":  "Recovery of Rs.12,47,400/-",
        "issue":  "Recovery",
        "status":  "Decided",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "13.0",
        "appealNo":  "DGMM/ATK-APPEAL (253)/2022",
        "subject":  "Unauthorized Exc. Block No.1, near Shahia, District Attock",
        "year":  "2022.0",
        "dateOfAppeal":  "44678.0",
        "appellant":  "Arsalan Zafran",
        "impugnedAction":  "Recovery of Rs.13,20,000/-",
        "issue":  "Recovery",
        "status":  "Decided",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "14.0",
        "appealNo":  "DGMM/ATK-APPEAL (254)/2022",
        "subject":  "Unauthorized excavation in respect of Sand Gravel Block No.1 near Pour Miana + Jahanabad,",
        "year":  "2022.0",
        "dateOfAppeal":  "44678.0",
        "appellant":  "Ejaz Akhtar",
        "impugnedAction":  "Recovery of Rs.15,85,500/-",
        "issue":  "Recovery",
        "status":  "Decided",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "15.0",
        "appealNo":  "DGMM/ATK-APPEAL (255)/2022",
        "subject":  "Unauthorized Exc. Block No.1, near Pour Miana+ Jahanabad, Shahia, Attock",
        "year":  "2022.0",
        "dateOfAppeal":  "44678.0",
        "appellant":  "Saif Ullah",
        "impugnedAction":  "Recovery of Rs.20,72,850/-",
        "issue":  "Recovery",
        "status":  "Decided",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "16.0",
        "appealNo":  "DGMM/ATK-APPEAL (256)/2022",
        "subject":  "Unauthorized Exc. Block No.1, near Shahia, District Attock",
        "year":  "2022.0",
        "dateOfAppeal":  "44678.0",
        "appellant":  "Malik Azhar Mehmood",
        "impugnedAction":  "Recovery of Rs.2,92,500/-",
        "issue":  "Recovery",
        "status":  "Decided",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "17.0",
        "appealNo":  "DGMM/ATK-APPEAL (257)/2022",
        "subject":  "Unauthorized Exc. Block No.1, near Shahia, District Attock",
        "year":  "2022.0",
        "dateOfAppeal":  "44678.0",
        "appellant":  "Malik Yasir",
        "impugnedAction":  "Recovery of Rs.3,07,125/-",
        "issue":  "Recovery",
        "status":  "Decided",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "18.0",
        "appealNo":  "DGMM/ATK-APPEAL (258)/2022",
        "subject":  "Unauthorized Exc. Block No.1, near Shahia, District Attock",
        "year":  "2022.0",
        "dateOfAppeal":  "44678.0",
        "appellant":  "Waris Khan",
        "impugnedAction":  "Recovery of Rs.6,63,600/-",
        "issue":  "Recovery",
        "status":  "Decided",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "19.0",
        "appealNo":  "DGMM/ATK-APPEAL (259)/2022",
        "subject":  "Unauthorized Exc. Block No.1, near Posur Miana + Jahanabad, Shahia, Attock",
        "year":  "2022.0",
        "dateOfAppeal":  "44678.0",
        "appellant":  "Qamar Zaman",
        "impugnedAction":  "Recovery of Rs.25,27,350/-",
        "issue":  "Recovery",
        "status":  "Decided",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "20.0",
        "appealNo":  "DGMM/CKL-APPEAL (137)/2022",
        "subject":  "ML-CKL-I-Sandstone Khura (01), Chakwal",
        "year":  "2022.0",
        "dateOfAppeal":  "44706.0",
        "appellant":  "Muhammad Ikram Ullah",
        "impugnedAction":  "a recovery of Rs.23,99,400/- was approved against the appellant on account of unauthorized excavation of Sand Stone under Rule-218",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "21.0",
        "appealNo":  "DGMM/JHG-APPEAL (168)/2022",
        "subject":  "Ord. Sand Khumanwala Zone, Jhang",
        "year":  "2022.0",
        "dateOfAppeal":  "44657.0",
        "appellant":  "M/s Paradise Associates",
        "impugnedAction":  "mining lease of the appellant was cancelled due to nonpayment of 2nd installment and security already deposited was forfeited under Rule-207(2)",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "22.0",
        "appealNo":  "DGMM/SWL-APPEAL(61)/2022",
        "subject":  "Ord. Sand Chichawatni Kamalia Zone-2",
        "year":  "2022.0",
        "dateOfAppeal":  "44690.0",
        "appellant":  "Inam Ullah",
        "impugnedAction":  "mining lease of the appellant was cancelled on account of non-payment of 2nd installment and security deposited by the appellant was forfeited under Rule-207(2)",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "23.0",
        "appealNo":  "DGMM/MLI-APPEAL (56)/2022",
        "subject":  "Ord. Sand Piplan Jaal-Doaba Mianwali",
        "year":  "2022.0",
        "dateOfAppeal":  "44824.0",
        "appellant":  "Zaka Ullah Khan",
        "impugnedAction":  "mining lease of the appellant was cancelled on account of non-payment of 2nd installment and security already deposited was forfeited",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "24.0",
        "appealNo":  "DGMM/NWL-APPEAL (36)/2022",
        "subject":  "Ord. Sand Ramri Gumtala, Narowal",
        "year":  "2022.0",
        "dateOfAppeal":  "44845.0",
        "appellant":  "Barat Khan",
        "impugnedAction":  "request of the appellant for refund of bidmoney was rejected under Rule-222",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "25.0",
        "appealNo":  "DGMM/KSR-APPEAL (140)/2023",
        "subject":  "Ord. Sand namely Chunian Zone No.1, Kasur",
        "year":  "2022.0",
        "dateOfAppeal":  "44911.0",
        "appellant":  "Rana Muhammad Yasin",
        "impugnedAction":  null,
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "26.0",
        "appealNo":  "DGMM/LHR-APPEAL (164)/2023",
        "subject":  "Ord. Sand Ganja Kalan/Begum Kot.",
        "year":  "2023.0",
        "dateOfAppeal":  "45231.0",
        "appellant":  "Muhammad Farooq",
        "impugnedAction":  "mining lease of the appellant for excavation of Ordinary Sand/Bhassar Ganja Kalan/Begum Kot was cancelled on account of non-payment of 4th installment and security amount was forfeited",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "27.0",
        "appealNo":  "DGMM/RWP-APPEAL (276)/2023",
        "subject":  "Sand Gravel namely Ladian Rawalpindi",
        "year":  "2023.0",
        "dateOfAppeal":  "44974.0",
        "appellant":  "Muhammad Safeer Khan",
        "impugnedAction":  "request of the appellant for refund of bidmoney was rejected while security was released in favor of the appellant",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "28.0",
        "appealNo":  "DGMM/DGK-APPEAL (202)/2023",
        "subject":  "Ord. Sand namely Basti Gabol-1 Block",
        "year":  "2023.0",
        "dateOfAppeal":  "45156.0",
        "appellant":  "Ghulam Farid Wadani",
        "impugnedAction":  "mining lease of the appellant was cancelled due to non-payment of 4th installment and security already deposited by the appellant was forfeited",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "29.0",
        "appealNo":  "DGMM/MZG-APPEAL (86)/2023",
        "subject":  "Ord. Sand/Ghassar Alipur Zone-1",
        "year":  "2023.0",
        "dateOfAppeal":  "45163.0",
        "appellant":  "Ghulam Farid Wadani",
        "impugnedAction":  "mining lease of the appellant was cancelled due to non-payment of 2nd installment and security already deposited by the appellant was forfeited",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "30.0",
        "appealNo":  "DGMM/CKL-APPEAL (140)/2023",
        "subject":  "Sand Gravel Talagang Zone-3, Chakwal",
        "year":  "2023.0",
        "dateOfAppeal":  "45055.0",
        "appellant":  "Hussain Maqbool Hashmi",
        "impugnedAction":  "mining lease of the appellant was cancelled on account of non-payment of 2nd installment and security already deposited was forfeited",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "31.0",
        "appealNo":  "DGMM/KSR-APPEAL (142)/2023",
        "subject":  "Ord. Sand Chunian Zone-1, District Kasur.",
        "year":  "2023.0",
        "dateOfAppeal":  "45279.0",
        "appellant":  "Haji Muhammad Ismail",
        "impugnedAction":  "a recovery of Rs.47,70,000/- was approved against the appellant on account of unauthorized excavation of sand",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "32.0",
        "appealNo":  "DGMM/JLM-APPEAL (221)/2024",
        "subject":  "Unauthorized Exc. Of Gravel near Piswal in River Jhelum, District Jhelum",
        "year":  "2024.0",
        "dateOfAppeal":  "45292.0",
        "appellant":  "Muhammad Shahid",
        "impugnedAction":  "a recovery amounting to Rs2,58,750/- approved against the appellant in respect of unauthorized excavation of Gravel",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "33.0",
        "appealNo":  "DGMM/JLM-APPEAL (220)/2024",
        "subject":  "Unauthorized Exc. Of Gravel near Piswal in River Jhelum, District Jhelum",
        "year":  "2024.0",
        "dateOfAppeal":  "45292.0",
        "appellant":  "Muhammad Shahid",
        "impugnedAction":  "a recovery amounting to Rs.8,90,010/- approved against the appellant in respect of unauthorized excavation of Gravel",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "34.0",
        "appealNo":  "DGMM/LYA-APPEAL (03)/2024",
        "subject":  "Unauthorized mining near Heera Tail, Chak No.144 Tehsil \u0026 District Layyah.",
        "year":  "2024.0",
        "dateOfAppeal":  "45628.0",
        "appellant":  "Mr. Aziz Khan \u0026 Mr. Dad Khan",
        "impugnedAction":  "a joint appeal against the order dated 28.10.2024 passed by the Licensing Authority (Minor Minerals), Punjab, is preferred by two individuals namely Mr. Aziz Khan \u0026 Mr. Dad Khan under Rule-234 of the Punjab Mining Concession Rules, 2002. As per decision of Appellate Authority dated 09.04.2021 in appeal No. DGMM/JLM-APPEAL (208)/2021, a joint appeal is competent when each individuals deposit prescribed appeal fee amounting to Rs.5,000/- in Government treasury separately.",
        "issue":  "Joint appeal (single fee)",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "35.0",
        "appealNo":  "DGMM/DGK-APPEAL (204)/2024",
        "subject":  "Sand Gravel namely Wadore Zone",
        "year":  "2024.0",
        "dateOfAppeal":  "45294.0",
        "appellant":  "Ghulam Farid Wadani",
        "impugnedAction":  "mining lease of the appellant was cancelled due to non-payment of 2nd installment and security already deposited by the appellant was forfeited",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "36.0",
        "appealNo":  "DGMM/DGK-APPEAL (203)/2024",
        "subject":  "Sand Gravel namely Wadore-3",
        "year":  "2024.0",
        "dateOfAppeal":  "45294.0",
        "appellant":  "Ghulam Farid Wadani",
        "impugnedAction":  "mining lease of the appellant was cancelled due to non-payment of 3rd installment and security already deposited by the appellant was forfeited",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "37.0",
        "appealNo":  "DGMM/FSD-APPEAL (48)/2024",
        "subject":  "Unauthorized Exc. of Sand /Gassar at Chak No.205\u002674 Lohke Khurian wala Faisalabad",
        "year":  "2024.0",
        "dateOfAppeal":  "45569.0",
        "appellant":  "Malik Farman \u0026 Waqas Ahmed",
        "impugnedAction":  "an assessment amount to Rs.22,86,900/- was approved against the appellants",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "38.0",
        "appealNo":  "DGMM/SRG-APPEAL (387)/2024",
        "subject":  "Ordinary Sand Block No.4 Dodha District Sargodha.",
        "year":  "2024.0",
        "dateOfAppeal":  "45398.0",
        "appellant":  "Legal Heirs of Zulfiqar Khan",
        "impugnedAction":  "request of the appellant for refund of his already deposited security amount of Rs.1,12,95,000/- was rejected and the same was forfeited in favor of the Government",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "39.0",
        "appealNo":  "DGMM/LHR-APPEAL (166) / 2024",
        "subject":  "Unauthorized Exc. of Ord. Sand near Village Dhoonday Lahore.",
        "year":  "2024.0",
        "dateOfAppeal":  "45531.0",
        "appellant":  "Ali Raza",
        "impugnedAction":  "A recovery of Rs.12,75,375/- was approved against the appellant on account of unauthorized excavation of ordinary sand and bhassar",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "40.0",
        "appealNo":  "DGMM/OKA-APPEAL (69)/2024",
        "subject":  "Ord. Sand namely Sherghar zone 2+3, Okara",
        "year":  "2024.0",
        "dateOfAppeal":  "45586.0",
        "appellant":  "Haider Ali",
        "impugnedAction":  "security deposited by the appellant was forfeited under Rule-207(2)",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "41.0",
        "appealNo":  "DGMM/GT-APPEAL(81)/2024",
        "subject":  "Unauthorized Excavation of Ordinary Sand Khatala Kot Fatu Zone District Gujrat",
        "year":  "2024.0",
        "dateOfAppeal":  "45621.0",
        "appellant":  "M/S Malhi Stone Works International",
        "impugnedAction":  "a recovery of Rs.15,92,640/- against the appellant on account of unauthorized excavation of Ordinary Sand from vacant zone",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "42.0",
        "appealNo":  "DGMM/SRG-APPEAL (388)/2024",
        "subject":  "Sand Stone Block No.(1-A)/110 SB, District Sargodha",
        "year":  "2024.0",
        "dateOfAppeal":  "45621.0",
        "appellant":  "Haroon Rasheed Khan Niazi",
        "impugnedAction":  "mining lease of the appellant was cancelled on account of non-payment of 2nd installment and 15% of security was forfeited",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "43.0",
        "appealNo":  "DGMM/DGK-APPEAL (207)/2024",
        "subject":  "Unauthorized Excavation of ordinary sand from vacant zone namely Dera Ghazi Khan Zone-2 District D.G. Khan",
        "year":  "2024.0",
        "dateOfAppeal":  "45624.0",
        "appellant":  "Mr. Nasrullah",
        "impugnedAction":  "a recovery of Rs.48,60,000/- against the appellant on account of unauthorized excavation of Ordinary Sand/Ghassar from vacant zone",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "44.0",
        "appealNo":  "DGMM/DGK-APPEAL (206)/2024",
        "subject":  "Unauthorized Excavation of ordinary sand from vacant zone namely Dera Ghazi Khan Zone-2 District D.G. Khan",
        "year":  "2024.0",
        "dateOfAppeal":  "45624.0",
        "appellant":  "Javed Mumtaz",
        "impugnedAction":  "a recovery of Rs.48,60,000/- against the appellant on account of unauthorized excavation of Ordinary Sand/Ghassar from vacant zone",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "45.0",
        "appealNo":  "DGMM/LHR-APPEAL (167)/2024",
        "subject":  "Ordinary Sand Namely Khudpur Zone, District Lahore",
        "year":  "2024.0",
        "dateOfAppeal":  "45638.0",
        "appellant":  "Haji Muhammad Ismail",
        "impugnedAction":  "security already deposited by the appellant was forfeited on account of nonpayment of balance amount of 4th installment and 10% income tax total amounting to Rs.27,25,000/-",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "46.0",
        "appealNo":  "DGMM/GT-APPEAL (82)/24",
        "subject":  "Ordinary Sand Block Namely Surkhpur District Gujrat.",
        "year":  "2024.0",
        "dateOfAppeal":  "45645.0",
        "appellant":  "Muhammad Asif",
        "impugnedAction":  "mining lease of the appellant was cancelled due to non-payment of 2nd installment and forfeited the security already deposited by the appellant",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "47.0",
        "appealNo":  "DGMM/LYA-APPEAL (4)/2024",
        "subject":  "Unauthorized Excavation of Ordinary Sand/Ghassar from Un-Granted Area Near Kot Murad-Abad, Chak No.280-TDA, Layyah",
        "year":  "2024.0",
        "dateOfAppeal":  "45656.0",
        "appellant":  "Muhammad Akbar",
        "impugnedAction":  "a recovery of Rs.1,02,60,000/- was approved against the appellant on account of unauthorized excavation of ordinary sand/ghassar from un-granted area",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "48.0",
        "appealNo":  "DGMM/SRG-APPEAL (393)/2025",
        "subject":  "Sandstone Block No. -A near Chak No.116 Janubi District Sargodha.",
        "year":  "2025.0",
        "dateOfAppeal":  "45798.0",
        "appellant":  "M/S. Core Enterprises",
        "impugnedAction":  "the appellant is seeking exclusion of the said land from the mining lease and reduction of bid money proportionately in terms of Rule-222",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "49.0",
        "appealNo":  "DGMM.DGK.APPEAL(208)/2025",
        "subject":  "Ordinary Sand Vacant Mining Lease Namely Wadore Zone and Wadore Nala in District Dera Ghazi Khan",
        "year":  "2025.0",
        "dateOfAppeal":  "45713.0",
        "appellant":  "Allah Ditta",
        "impugnedAction":  "a recovery of Rs.1,58,65,875/- against the appellant on account of unauthorized excavation of Ordinary Sand/Ghassar from vacant mining lease",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "50.0",
        "appealNo":  "DGMM.DGK.APPEAL(209)/2025",
        "subject":  "Ordinary Sand Vacant Mining Lease Namely Wadore Zone and Wadore Nala in District Dera Ghazi Khan",
        "year":  "2025.0",
        "dateOfAppeal":  "45713.0",
        "appellant":  "Mr. Khalil Ahmad",
        "impugnedAction":  "a recovery of Rs.1,58,65,875/- against the appellant on account of unauthorized excavation of Ordinary Sand/Ghassar from vacant mining lease",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "51.0",
        "appealNo":  "DGMM/RWP-APPEAL(281)/2025",
        "subject":  "Sand Gravel block Dhok Qazi District Rawalpindi.",
        "year":  "2025.0",
        "dateOfAppeal":  "45713.0",
        "appellant":  "Ch. Zafar Iqbal",
        "impugnedAction":  "against the offer letter dated 19.03.2025 passed by the Licensing Authority (Minor Minerals),",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "52.0",
        "appealNo":  "DGMM.CHT.APPEAL(15)/2025",
        "subject":  "Ordinary Sand Zone Mehta Rasheeda Tehsil and District Chiniot.",
        "year":  "2025.0",
        "dateOfAppeal":  "45716.0",
        "appellant":  "M/S Associates",
        "impugnedAction":  "mining lease of the appellant was cancelled due to non-payment of 2nd installment",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "53.0",
        "appealNo":  "DGMM/MBD-APPEAL (23)/2025",
        "subject":  "Ordinary Sand/Bhassar block Rerka Zerin District Mandi Baha-Ud-Din",
        "year":  "2025.0",
        "dateOfAppeal":  "45660.0",
        "appellant":  "Muhammad Iqbal",
        "impugnedAction":  "mining lease for ordinary sand/bhassar namely block Rerka Zerin, District Mandi Baha-Ud-Din was cancelled due to non-payment of 2nd installment and security already deposited by the appellant forfeited under rule 207(2)",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "54.0",
        "appealNo":  "DG(MM)/KWL-APPEAL (72)/2025",
        "subject":  "Ordinary sand Kabirwala Zone-2 District Khanewal.",
        "year":  "2025.0",
        "dateOfAppeal":  "45746.0",
        "appellant":  "Nawab Khan",
        "impugnedAction":  "mining lease of the appellant was cancelled due to non-payment of 2nd installment amounting to Rs.2,63,89,139/- and security amount was forfeited",
        "issue":  "Refund",
        "status":  "Decided",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "55.0",
        "appealNo":  "DGMM/HFBD-APPEAL (09)/2025",
        "subject":  "Ord. Sand Zone Bahak Ahmad Yar Jahanian Khatiran, Hafizabad.",
        "year":  "2025.0",
        "dateOfAppeal":  "45857.0",
        "appellant":  "Haji Muhammad Ismail",
        "impugnedAction":  "the earnest money already deposited by the appellant was forfeited on account of failure to deposit the security amount within the prescribed time",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "56.0",
        "appealNo":  "DGMM/RWP-APPEAL(280)/2025",
        "subject":  "Sand Gravel block Mandwal District Rawalpindi.",
        "year":  "2025.0",
        "dateOfAppeal":  "45757.0",
        "appellant":  "M/s Khaksar Traders",
        "impugnedAction":  "against the offer letter dated 19.03.2025 passed by the Licensing Authority (Minor Minerals)",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "57.0",
        "appealNo":  "DG(MM)/NWL-APPEAL (41)/2025",
        "subject":  "Ordinary sand Darbar Sahib Kakay Zone District Narowal.",
        "year":  "2025.0",
        "dateOfAppeal":  "45946.0",
        "appellant":  "Khizer Bin Zaid",
        "impugnedAction":  "earnest money of Rs.178,75,000/- was forfeited",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "58.0",
        "appealNo":  "DGMM/HFBD-APPEAL (11)/2025",
        "subject":  "Ordinary sand Kot Daim/Kot Ghazi Zone Tehsil Jalapur Bhattian, District Hafizabad",
        "year":  "2025.0",
        "dateOfAppeal":  "45959.0",
        "appellant":  "Mr. Munawar Hussain",
        "impugnedAction":  "mining lease of the appellant was cancelled due to non-payment of balance amount of 2nd installment and security amount already deposited by the appellant was also forfeited",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "59.0",
        "appealNo":  "DGMM/SRG-APPEAL (396)/2026",
        "subject":  "Chak No.123 Janubi Tehsil Silanwali District Sargodha",
        "year":  "2026.0",
        "dateOfAppeal":  "46051.0",
        "appellant":  "Mian Shahbaz Ahmad",
        "impugnedAction":  "mining lease of the appellant was cancelled due to non-payment of 2nd installment and security amount already deposited by him was also forfeited under Rule-207",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "60.0",
        "appealNo":  "DGMM/KSR-APPEAL (144)/2026",
        "subject":  "Ord. Sand Jodh Singh Wala/ Rajowal Zone District Kasur | Remanded Writ Petition",
        "year":  "2026.0",
        "dateOfAppeal":  "46218.0",
        "appellant":  "M. Hassan Ismail",
        "impugnedAction":  "Mining lease of the appellant was cancelled on default of payment of installments and security already deposited by him was forfeited",
        "issue":  "ML cancelled",
        "status":  "Decided",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "61.0",
        "appealNo":  "DGMM/BKR-APPEAL (12)/2026",
        "subject":  "Ordinary Sand Bhakher Notik Behal Zone-2 District Bakher",
        "year":  "2026.0",
        "dateOfAppeal":  "46209.0",
        "appellant":  "Nawab Khan",
        "impugnedAction":  "Mining lease of the appellant was cancelled on default of payment of installments and security already deposited by him was forfeited",
        "issue":  "ML cancelled",
        "status":  "Pending",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "62.0",
        "appealNo":  "DGMM/SWL-APPEAL (62)/2026",
        "subject":  "Ord. Sand namely Sahiwal Zone-4, District Sahiwal",
        "year":  "2026.0",
        "dateOfAppeal":  "46114.0",
        "appellant":  "M/s Ch. Muhammad Afzal Sial",
        "impugnedAction":  "request of the appellant for refund of bidmoney was rejected while security was released in favor of the appellant",
        "issue":  "Refund",
        "status":  "Decided",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "63.0",
        "appealNo":  "DG(MM)/LYA-APPEAL (05)/2025",
        "subject":  "Ordinary sand Karoor Lal Essan Zone District Layyah.",
        "year":  "2026.0",
        "dateOfAppeal":  "46014.0",
        "appellant":  "Zeeshan Haider",
        "impugnedAction":  "request of the appellant for refund of bidmoney was rejected while security was released in favor of the appellant",
        "issue":  "Refund",
        "status":  "Decided",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "64.0",
        "appealNo":  "DGMM/MISC-APPEAL (151)/2026",
        "subject":  "Ordinary Sand /Ghassar Masoom Shah Mittha District Khushab.",
        "year":  "2026.0",
        "dateOfAppeal":  "46194.0",
        "appellant":  "Malik Muhmmad Iqbal",
        "impugnedAction":  null,
        "issue":  "Not specified",
        "status":  "Decided",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "65.0",
        "appealNo":  "DGMM/MISC-APPEAL (152)/2026",
        "subject":  "(Ordinary Sand /Ghassar Chak Gillan Tehsil and District Gujrat.",
        "year":  "2026.0",
        "dateOfAppeal":  "46196.0",
        "appellant":  "Muhammad Ashraf etc",
        "impugnedAction":  null,
        "issue":  "Not specified",
        "status":  "Decided",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "66.0",
        "appealNo":  "DGMM/ATK-APPEAL(264)/2026",
        "subject":  "Sand Gravel Dhari Rai Ditta (2) Block, District Attock.",
        "year":  "2026.0",
        "dateOfAppeal":  "46224.0",
        "appellant":  "Mukaram Shahzad",
        "impugnedAction":  "against the auction notice dated 15.07.2026 issued by the Licensing Authority (Minor Minerals), Punjab, Lahore whereby mining lease of the appellant was put for re-auction in respect of sand gravel Dhari Rai Ditta (2) Block, Tehsil Fateh Jhang, District Attock",
        "issue":  "Not specified",
        "status":  "Decided",
        "category":  "Minor Minerals"
    },
    {
        "sr":  "2.0",
        "appealNo":  "DGMM/SSM-APPEAL (1413)/2021",
        "subject":  "ML-CKL-I-Coal (07)",
        "year":  "2021.0",
        "dateOfAppeal":  "44480.0",
        "appellant":  "M/s Dost Sons (Pvt.) Ltd",
        "impugnedAction":  "a penalty amounting to Rs.20,000/- (Rs.10,000/- ten times royalty on 10 tons of coal and Rs.10,000/-) imposed on the appellant under Rule-177",
        "issue":  "Penalty",
        "status":  "Decided",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "3.0",
        "appealNo":  "DGMM/SSM-APPEAL (1426)/2022",
        "subject":  "PL-MLI-Coal (166)",
        "year":  "2022.0",
        "dateOfAppeal":  "44587.0",
        "appellant":  "Fazal Hussain",
        "impugnedAction":  "Prospecting License of the appellant bearing No.PL-MLI-Coal (166) was treated expired on account of non-submission of conversion application and default in payment of Government dues amounting to Rs.3,77,788/-",
        "issue":  "PL cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "4.0",
        "appealNo":  "DGMM/MISC-APPEAL (95)/2022",
        "subject":  "ML-MLI-Silica Sand (126)",
        "year":  "2022.0",
        "dateOfAppeal":  "44806.0",
        "appellant":  "Malik Sikandar Khan",
        "impugnedAction":  "Mining lease of the appellant was cancelled.",
        "issue":  "ML cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "5.0",
        "appealNo":  "DGMM/SSM-APPEAL (1491)/2022",
        "subject":  "ML-MLI-Iron Ore (11)",
        "year":  "2022.0",
        "dateOfAppeal":  "44897.0",
        "appellant":  "Haji Ilam Dad Khan",
        "impugnedAction":  "mining lease of the appellant bearing No.ML-MLI-Iron Ore (11) was expired due the area falls in the area of Iron Ore reserved for Steel Mills in Trans Indus Range Zone â€œCâ€",
        "issue":  "ML cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "6.0",
        "appealNo":  "DGMM/SSM-APPEAL (1453)/2022",
        "subject":  "ML-JLM-Limestone (Ruppar) Jhelum",
        "year":  "2022.0",
        "dateOfAppeal":  "44732.0",
        "appellant":  "Ch. Muhammad Zafar Iqbal",
        "impugnedAction":  "mining lease of the appellant was cancelled on account of non-payment of 2nd installment and security already deposited was forfeited",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "7.0",
        "appealNo":  "DGMM/SSM-APPEAL (1477)/2022",
        "subject":  "ML-CKL-I-Gypsum (40)",
        "year":  "2022.0",
        "dateOfAppeal":  "44826.0",
        "appellant":  "Raja Sohail Shafique",
        "impugnedAction":  "application of the appellant for further renewal of mining lease bearing No.ML-CKL-I-Gypsum (40) was rejected under Rule-134 of the Punjab Mining Concession Rules, 2002 due the entire area falls in â€œSalt Range National Parkâ€",
        "issue":  "Renewal declined",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "8.0",
        "appealNo":  "DGMM/SSM-APPEAL (1424)/2022",
        "subject":  "ML-CKL-I-Coal (127)",
        "year":  "2022.0",
        "dateOfAppeal":  "44571.0",
        "appellant":  "Legal Heirs of Sabir Hussain Late",
        "impugnedAction":  "the remanded appeal of the appellant for payment of surface rent was rejected on the ground that the applicant does not fall in the mining area of the lessee and having no locus standi",
        "issue":  "Surface rent declined",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "9.0",
        "appealNo":  "DGMM/SSM-APPEAL (1425)/2022",
        "subject":  "PL-KHB-Gypsum (145)",
        "year":  "2022.0",
        "dateOfAppeal":  "44860.0",
        "appellant":  "Umar Hayat",
        "impugnedAction":  "Prospecting License of the appellant bearing No.PL-KHB-Gypsum (145) was treated expired/cancelled on account of non-submission of conversion application and default in payment of Government dues amounting to Rs.15,583/-",
        "issue":  "PL cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "10.0",
        "appealNo":  "DGMM/SSM-APPEAL(1487)/2022",
        "subject":  "APP-KHB-Coal (1143)",
        "year":  "2022.0",
        "dateOfAppeal":  "44883.0",
        "appellant":  "M/s Fasih Group of Minerals",
        "impugnedAction":  "the appellant was granted an area of 998.03 acres in respect of APP-KHB-Coal (1143) instead of grant of 1500 acres",
        "issue":  "PL granted less than 1500 acres",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "11.0",
        "appealNo":  "DGMM/MISC-APPEAL (97)/2022",
        "subject":  "ML-MLI-Fireclay (64) | Remanded writ petition No.58197/2022",
        "year":  "2022.0",
        "dateOfAppeal":  "44846.0",
        "appellant":  "Mst. Sakina Niazi, etc",
        "impugnedAction":  "Father of the petitioners namely Asmat Ullah Khan (deceased) was granted a mining lease No.ML-MLI-Fireclay (64) near Bazaar, District Mianwali and the petitioners being successors in interest of deceased lessee seek transfer of lease rights to them",
        "issue":  "Transfer of mining rights to legal heirs",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "12.0",
        "appealNo":  "DGMM/MISC-APPEAL (98)/2022",
        "subject":  "ML-MLI-Salica Sand (60)/(88) | Remanded writ petition No.58185/2022",
        "year":  "2022.0",
        "dateOfAppeal":  "44846.0",
        "appellant":  "Hameed Akhtar Khan Niazi",
        "impugnedAction":  "Father of the petitioners Mr. Asmat Ullah Khan (deceased) was granted a mining lease No.ML-MLI-Fireclay (64) and the petitioners being successors in interest of deceased lessee seek transfer of lease rights to them",
        "issue":  "Transfer of mining rights to legal heirs",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "13.0",
        "appealNo":  "DGMM/-SSM.APPEAL (1496)/2022",
        "subject":  "ML-CKL-I-Gypsum (50)",
        "year":  "2022.0",
        "dateOfAppeal":  "44909.0",
        "appellant":  "Muhammad Usman",
        "impugnedAction":  "mining lease of the appellant was renewed for a period of five years with effect from 17.07.2019 to 16.07.2024 retrospectively",
        "issue":  "Renewal",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "14.0",
        "appealNo":  "DGMM/SSM-APPEAL (1498)/2022",
        "subject":  "PL-CKL-II-Gypsum (41)",
        "year":  "2022.0",
        "dateOfAppeal":  "44915.0",
        "appellant":  "Raja Umar Farooq",
        "impugnedAction":  "conversion application of the appellant was rejected due to non-fulfillment of criteria, keeping the area idle and default in payment Government dues amounting to Rs.87,046/-",
        "issue":  "Conversion rejected, PL cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "15.0",
        "appealNo":  "DGMM/MISC-APPEAL (103)/2022",
        "subject":  "PL-MLI-Iron Ore (74) | APP-MLI-Iron Ore (317) | Remanded writ petition.",
        "year":  "2022.0",
        "dateOfAppeal":  "44918.0",
        "appellant":  "Malik Saif Ullah",
        "impugnedAction":  "prospecting license for Iron Ore bearing \nNo.PL-MLI-Iron Ore (74) near Khairabad District Mianwali was granted to Mr. Muhammad Ibrahim Malla Khel whereas the appellant has priority right over the area",
        "issue":  "Claim of priority right",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "16.0",
        "appealNo":  "DGMM/SSM-APPEAL (1499)/2022",
        "subject":  "PL-KHB-Bauxite (33)",
        "year":  "2022.0",
        "dateOfAppeal":  "44923.0",
        "appellant":  "Legal Heirs of Muhammad Iqbal",
        "impugnedAction":  "application of the appellant for renewal of his prospecting license bearing No.PL-KHB-Bauxite (33) was turned down and cancelled/expired the Prospecting License due to non-submission of conversion application, non-submission of MPRs \u0026 QPRs and default in payment of Government outstanding dues amounting to Rs.77,627/-",
        "issue":  "PL cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "17.0",
        "appealNo":  "DGMM/SSM-APPEAL (1502)/2022",
        "subject":  "APP-KHB-Laterite (149)",
        "year":  "2022.0",
        "dateOfAppeal":  "44925.0",
        "appellant":  "M/s Fouz Rock Enterprises",
        "impugnedAction":  "application of the appellant bearing No. APP-KHB-Laterite (149) for grant of extension in mining lease No.ML-KHB-Laterite (03) over an area of 46.98 acres was rejected due to the area overlaps with earlier applied for area of Iron Ore which is akin mineral of Laterite",
        "issue":  "Extension application rejected",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "18.0",
        "appealNo":  "DGMM/SSM-APPEAL (1507)/2023",
        "subject":  "PL-KHB-Iron Ore (13)",
        "year":  "2023.0",
        "dateOfAppeal":  "44944.0",
        "appellant":  "M/s. Fouz Rock Enterprises",
        "impugnedAction":  "Against issuance of offer letter in favor of Muhamad Haqeeq Ahmad in respect of application bearing No. APP-KHB-Iron Ore (66).",
        "issue":  "Claim of priority right",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "19.0",
        "appealNo":  "DGMM/SSM-APPEAL (1511)/2023",
        "subject":  "PL-JLM-Gypsum (71)",
        "year":  "2023.0",
        "dateOfAppeal":  "44956.0",
        "appellant":  "M/s Haroon Mines (Pvt.) Ltd",
        "impugnedAction":  "conversion application of the appellant was rejected and Prospecting License bearing No.PL-JLM-Gypsum (71) treated expired after renewing it till its expiry under Rule-124",
        "issue":  "Conversion rejected, PL cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "20.0",
        "appealNo":  "DGMM/SSM-APPEAL (1513)/2023",
        "subject":  "Contract of Royalty Collection Attock.",
        "year":  "2023.0",
        "dateOfAppeal":  "44970.0",
        "appellant":  "M/s Khaksar Traders",
        "impugnedAction":  "request of the appellant/firm for compensation in shape of extension in period of contract on account of closure of work of limestone from Pathergarh \u0026 Hassanabdal during the period from 29.12.2022 to 31.12.2022 (03 days) and 21.01.2022 to 02.02.2022 (13 days) was rejected",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "21.0",
        "appealNo":  "DGMM/SSM-APPEAL (1521)/2023",
        "subject":  "ML-CKL-II-Coal (12)",
        "year":  "2023.0",
        "dateOfAppeal":  "45000.0",
        "appellant":  "M/s. Nazar \u0026 Co",
        "impugnedAction":  "an assessment of Rs.2,33,219/- was approved against the appellant on account of illegal excavation of coal under Rule-174",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "22.0",
        "appealNo":  "DGMM/SSM-APPEAL (1551)/2023",
        "subject":  "ML-MLI-Sand Stone (140)",
        "year":  "2023.0",
        "dateOfAppeal":  "45029.0",
        "appellant":  "Asghar Bilal Khan",
        "impugnedAction":  "mining lease of the appellant bearing No.ML-MLI-Silica Sand (140) was treated expired on account of non-submission of renewal application one year before expiry of the lease period and default in payment of Government outstanding dues amounting to Rs.96,261/-",
        "issue":  "ML cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "23.0",
        "appealNo":  "DGMM/SSM-APPEAL (1518)/2023",
        "subject":  "PL-CKL-II-Coal (344)",
        "year":  "2023.0",
        "dateOfAppeal":  "44991.0",
        "appellant":  "Gul Afsar Khan",
        "impugnedAction":  "the appellant was granted a Prospecting License bearing No.PL-CKL-II-Coal (344) for a period of three years with effect from 08.02.2023 over an area of 508.33 acres instead of applied for area (i.e. 1500 acres)",
        "issue":  "PL granted less than 1500 acres",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "24.0",
        "appealNo":  "DGMM/SSM-APPEAL (1517)/2023",
        "subject":  "PL-CKL-II-Coal (343)",
        "year":  "2023.0",
        "dateOfAppeal":  "44991.0",
        "appellant":  "Gul Afsar Khan",
        "impugnedAction":  "the appellant was granted a Prospecting License bearing No.PL-CKL-II-Coal (343) for a period of three years with effect from 07.02.2023 over an area of 591.42 acres instead of applied for area (i.e. 1500 acres)",
        "issue":  "PL granted less than 1500 acres",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "25.0",
        "appealNo":  "DGMM/SSM-APPEAL (1516)/2023",
        "subject":  "ML-KHB-Gypsum (56)",
        "year":  "2023.0",
        "dateOfAppeal":  "44991.0",
        "appellant":  "M/s MSD Retail (Pvt) Ltd",
        "impugnedAction":  "Mining lease was cancelled and possession of the area was resumed in favor of Government on 08.02.2023.",
        "issue":  "ML cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "26.0",
        "appealNo":  "DGMM/SSM-APPEAL (1515)/2023",
        "subject":  "PL-MLI-COAL (136)",
        "year":  "2023.0",
        "dateOfAppeal":  "44991.0",
        "appellant":  "Legal Heirs of M. Ameer Khan",
        "impugnedAction":  "conversion application of the appellant was rejected and prospecting license bearing No.PL-MLI-Coal(136) was treated as expired/cancelled on account of non-submission of succession certificate",
        "issue":  "Not specified",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "27.0",
        "appealNo":  "DGMM/SSM-APPEAL (1602)/2023",
        "subject":  "ML-ATK-Limestone (Pathergarh-5)",
        "year":  "2023.0",
        "dateOfAppeal":  "45103.0",
        "appellant":  "M/s Khaksar Traders",
        "impugnedAction":  "Mining lease of appellant was cancelled on account of non-payment 2nd installment amounting to Rs.1,14,75,000/- alongwith 10% income tax of 1st and 2nd installments amounting to Rs.22,95,000/- and ordered for forfeiture of security amounting to Rs.68,85,000/- already deposited by the appellant",
        "issue":  "ML cancelled; Refund",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "28.0",
        "appealNo":  "DGMM/SSM-APPEAL (1542)/2023",
        "subject":  "Contract of Royalty Collection Attock.",
        "year":  "2023.0",
        "dateOfAppeal":  "45023.0",
        "appellant":  "M/s Khaksar Traders",
        "impugnedAction":  "the appellant-firm was directed to pay contract amount @ new bid received till grant of new contract in respect of Contract for Collection of Royalty in District Attock.",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "29.0",
        "appealNo":  "DGMM/SSM-APPEAL(1612)/2023",
        "subject":  "Limestone block Pathergrah-4-D, Attock.",
        "year":  "2023.0",
        "dateOfAppeal":  "45120.0",
        "appellant":  "M/s. Indus Corporation",
        "impugnedAction":  "request of the appellant firm for re-validation of lease period with effect from 01.07.2022 was declined",
        "issue":  "Re-validation of lease period",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "30.0",
        "appealNo":  "DGMM/SSM-APPEAL (1610)/2023",
        "subject":  "ML-ATK-Limestone Pathergrah-4",
        "year":  "2023.0",
        "dateOfAppeal":  "45134.0",
        "appellant":  "M/s. Indus Corporation",
        "impugnedAction":  "request of the appellant firm for re-validation of lease period with effect from 01.07.2022 was declined.",
        "issue":  "Re-validation of lease period",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "31.0",
        "appealNo":  "DGMM/SSM-APPEAL (1613)/2023",
        "subject":  "ML-ATK-Limestone Pathargarh4-E.",
        "year":  "2023.0",
        "dateOfAppeal":  "45134.0",
        "appellant":  "Muhammad Afzal Khan",
        "impugnedAction":  "request of the appellant firm for re-validation of lease period with effect from 01.07.2022 was declined",
        "issue":  "Re-validation of lease period",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "32.0",
        "appealNo":  "DGMM/SSM-APPEAL (1591)/2023",
        "subject":  "ML-MLI-Ocher (14)",
        "year":  "2023.0",
        "dateOfAppeal":  "45085.0",
        "appellant":  "Taimoor Khan",
        "impugnedAction":  "renewal for 5 years instead 10 years",
        "issue":  "Renewal",
        "status":  "Decided",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "33.0",
        "appealNo":  "DGMM/SSM-APPEAL (1627)/2023",
        "subject":  "PL-CKL-II-Coal(345)",
        "year":  "2023.0",
        "dateOfAppeal":  "45153.0",
        "appellant":  "Ghulam Ahmed",
        "impugnedAction":  "prospecting license of the appellant bearing No.PL-CKL-II-Coal (345) was cancelled due to non-submission of acceptance of plan, demarcation certificate and prospecting scheme",
        "issue":  "PL cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "34.0",
        "appealNo":  "DGMM/SSM-APPEAL (1641)/2023",
        "subject":  "ML-MLI-Limestone (Thatti 2-A)",
        "year":  "2023.0",
        "dateOfAppeal":  "45163.0",
        "appellant":  "Muhammad Anwar Khan",
        "impugnedAction":  "a bid of Rs.58,15,000/- was accepted and the appellant has been required to deposit 15% of approved bid alongwith 10% withholding tax and half yearly dead rent",
        "issue":  "Dead rent",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "35.0",
        "appealNo":  "DGMM/SSM-APPEAL (1665)/2023",
        "subject":  "ML-KHB-Coal (95)",
        "year":  "2023.0",
        "dateOfAppeal":  "45168.0",
        "appellant":  "M/s Miran Enterprises",
        "impugnedAction":  "an amount of Rs.30,84,305/- is outstanding against the appellant on account of non-payment of dead rent and penalty amounts",
        "issue":  "Dead rent",
        "status":  "Decided",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "36.0",
        "appealNo":  "DGMM/SSM-APPEAL (1619)/2023",
        "subject":  "ML-CKL-I-BAUXITE (01). | Remanded Revision Petition.",
        "year":  "2023.0",
        "dateOfAppeal":  "45055.0",
        "appellant":  "Hussain Maqbool Hashmi",
        "impugnedAction":  "the appellant was directed to deposit 2nd and 3rd installments of bid money alongwith 10% of income tax as per Clause-ii of terms \u0026 condition of the allotment letter dated 11.08.2021",
        "issue":  "Default",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "37.0",
        "appealNo":  "DGMM/SSM-APPEAL (1603)/2023",
        "subject":  "ML-KHB-Fireclay (38)",
        "year":  "2023.0",
        "dateOfAppeal":  "45147.0",
        "appellant":  "Muhammad Zubair",
        "impugnedAction":  "mining lease was tread as expired on the ground that lessee has failed to submit renewal application within the prescribed limit",
        "issue":  "ML cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "38.0",
        "appealNo":  "DGMM/SSM-APPEAL (1677)/2023",
        "subject":  "ML-CKL-Limestone (KhairPur-2)",
        "year":  "2023.0",
        "dateOfAppeal":  "45183.0",
        "appellant":  "Malik Allah Razi",
        "impugnedAction":  "a recovery of amounting to Rs.74,01,520/- under Rule-174 of the Punjab Mining Concession Rules, 2002 approved against the appellant and fine of Rs.20,000/- \u0026 50,000/- was also imposed on account of violations of Rules 148 \u0026 153 of ibid rules",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "39.0",
        "appealNo":  "DGMM/SSM-APPEAL (1570)/2023",
        "subject":  "ML-CKL-I-Gypsum (24)",
        "year":  "2023.0",
        "dateOfAppeal":  "45056.0",
        "appellant":  "M/s. Nawaz Awan Wanhar Collieries",
        "impugnedAction":  "renewed for 5 years instead of 10 years",
        "issue":  "Renewal",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "40.0",
        "appealNo":  "DGMM/SSM-APPEAL (1683)/2023",
        "subject":  "APP-MLI-Bauxite (48).",
        "year":  "2023.0",
        "dateOfAppeal":  "45215.0",
        "appellant":  "Malik Saif Ullah",
        "impugnedAction":  "application of the appellant bearing No.APP-MLI-Bauxite (48) was rejected",
        "issue":  "App for PL rejected",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "41.0",
        "appealNo":  "DGMM/SSM-APPEAL (1684)/2023",
        "subject":  "APP-MLI-Iron Ore (307).",
        "year":  "2023.0",
        "dateOfAppeal":  "45215.0",
        "appellant":  "Malik Saif Ullah",
        "impugnedAction":  "application of the appellant bearing No.APP-MLI-Iron Ore (307) was rejected",
        "issue":  "App for PL rejected",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "42.0",
        "appealNo":  "DGMM/SSM-APPEAL (1693)/2023",
        "subject":  "PL-KHB-Coal (512)",
        "year":  "2023.0",
        "dateOfAppeal":  "45251.0",
        "appellant":  "Ch. Ehsan Ullah",
        "impugnedAction":  "prospecting license of the appellant was treated expired violations of terms and conditions of allotment letter and non-submission of demarcation certificate and prospecting scheme",
        "issue":  "PL cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "43.0",
        "appealNo":  "DGMM/SSM-APPEAL (1695)/2024",
        "subject":  "ML-KHB-Ocher (14)",
        "year":  "2023.0",
        "dateOfAppeal":  "45259.0",
        "appellant":  "Legal Heirs of Shamim Ahmad",
        "impugnedAction":  "mining lease of the appellant was treated as expired on account of non-filing of renewal application within stipulated period under Rule-134",
        "issue":  "ML cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "44.0",
        "appealNo":  "DGMM/SSM-APPEAL (1696)/2023",
        "subject":  "ML-MLI-Fireclay (59)",
        "year":  "2023.0",
        "dateOfAppeal":  "45259.0",
        "appellant":  "Legal Heir of Asghar Khan",
        "impugnedAction":  "mining lease of the appellant was treated expired on account of non-filing of renewal application within stipulated period under Rule-134",
        "issue":  "ML cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "45.0",
        "appealNo":  "DGMM/SSM-APEAL (1697)/2023",
        "subject":  "ML-KHB-Silica Sand (85)",
        "year":  "2023.0",
        "dateOfAppeal":  "45259.0",
        "appellant":  "Muhammad Aslam Khan",
        "impugnedAction":  "mining lease of the appellant was treated as expired due to non-submission of renewal application within stipulated period and default of Rs.2,92,722/-",
        "issue":  "ML cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "46.0",
        "appealNo":  "DGMM/SSM-APPEAL (1505)/2023",
        "subject":  "ML-KHB-Rock Salt (20)",
        "year":  "2023.0",
        "dateOfAppeal":  "44938.0",
        "appellant":  "M/s. Hashim \u0026 Hassan Mines",
        "impugnedAction":  "mining lease of the appellant renewed for a period of ten years with effect from 29.11.2022 to 28.11.2032 instead of thirty (30) years",
        "issue":  "Renewal",
        "status":  "Decided",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "47.0",
        "appealNo":  "DGMM/SSM-APPEAL (1703)/2023",
        "subject":  "PL-CKL-I-Gypsum (17)",
        "year":  "2023.0",
        "dateOfAppeal":  "45287.0",
        "appellant":  "Imran Mehdi",
        "impugnedAction":  "prospecting license of appellant bearing No.PL-CKL-I-Gypsum (17) was treated expired as the area fall in Salt Range National Park and notified by the Forest Department as prohibited under the Forest Laws",
        "issue":  "PL cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "48.0",
        "appealNo":  "DGMM/SSM-APPEAL (1704)/2023",
        "subject":  "PL- CKL-II-COAL (341)",
        "year":  "2023.0",
        "dateOfAppeal":  "45288.0",
        "appellant":  "M/s Ali Sher Coal Colliery",
        "impugnedAction":  "application of the appellant for change in constitution under Rule-168 was declined",
        "issue":  "Change of constitution declined",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "49.0",
        "appealNo":  "DGMM/SSM-APPEAL (1716)/2024",
        "subject":  "APP-MLI-COAL (598)",
        "year":  "2024.0",
        "dateOfAppeal":  "45314.0",
        "appellant":  "Hafeez-Ur-Rehman",
        "impugnedAction":  "application of the appellant bearing No.APP-MLI-Coal (598) for grant of prospecting license was become infructuous and rejected as the mode of grant of all minerals was changed vide Notification No.SOT(M\u0026M)1-5/2001(Vol-II) dated 22.02.2023",
        "issue":  "App for PL rejected",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "50.0",
        "appealNo":  "DGMM/SSM-APPEAL (1756)/2024",
        "subject":  "ML-ATK-Limestone Pathargarh (19)",
        "year":  "2024.0",
        "dateOfAppeal":  "45475.0",
        "appellant":  "Islam Gul",
        "impugnedAction":  "surrender application was rejected under Rule-111, the leased area cancelled, the security forfeited and declared the appellant as blacklisted under Rule-181",
        "issue":  "Surrender application declined",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "51.0",
        "appealNo":  "DGMM/SSM-APPEAL (1739)/2024",
        "subject":  "ML-ATK-Limestone (Hassan Abdal 1\u002613)",
        "year":  "2024.0",
        "dateOfAppeal":  "45385.0",
        "appellant":  "Abdul Tahir",
        "impugnedAction":  "an assessment of Rs.3,11,39,200/- was approved against the appellant on account of unauthorized excavation of limestone",
        "issue":  "Recovery",
        "status":  "Decided",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "52.0",
        "appealNo":  "DGMM/SSM-APPEAL (1732)/2024",
        "subject":  "ML-ATK-Limestone (Hassan Abdal 1\u002613)",
        "year":  "2024.0",
        "dateOfAppeal":  "45385.0",
        "appellant":  "Gul Agha",
        "impugnedAction":  "a recovery of Rs.4,20,48,100/- was approved against the appellant on account of unauthorized excavation of limestone",
        "issue":  "Recovery",
        "status":  "Decided",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "53.0",
        "appealNo":  "DGMM/SSM-APPEAL (1733)/2024",
        "subject":  "ML-ATK-Limestone (Hassan Abdal 1\u002613)",
        "year":  "2024.0",
        "dateOfAppeal":  "45385.0",
        "appellant":  "Qaiser Ali",
        "impugnedAction":  "an assessment of Rs.4,97,32,800/- was approved against the appellant on account of unauthorized excavation of limestone",
        "issue":  "Recovery",
        "status":  "Decided",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "54.0",
        "appealNo":  "DGMM/SSM-APPEAL (1734)/2024",
        "subject":  "ML-ATK-Limestone (Hassan Abdal 1\u002613)",
        "year":  "2024.0",
        "dateOfAppeal":  "45385.0",
        "appellant":  "Muhammad Umar Ahmad",
        "impugnedAction":  "an assessment of Rs.4,80,00,000/- was approved against the appellant",
        "issue":  "Recovery",
        "status":  "Decided",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "55.0",
        "appealNo":  "DGMM/SSM-APPEAL (1735)/2024",
        "subject":  "ML-ATK-Limestone (Hassan Abdal 1\u002613)",
        "year":  "2024.0",
        "dateOfAppeal":  "45385.0",
        "appellant":  "Hamad Ali Khan",
        "impugnedAction":  "an assessment of Rs.4,87,93,600/- on account of unauthorized excavation of Limestone against the appellant",
        "issue":  "Recovery",
        "status":  "Decided",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "56.0",
        "appealNo":  "DGMM/SSM-APPEAL (1736)/2024",
        "subject":  "ML-ATK-Limestone (Hassan Abdal 1\u002613)",
        "year":  "2024.0",
        "dateOfAppeal":  "45385.0",
        "appellant":  "Muhammad Niaz Malik",
        "impugnedAction":  "an assessment of Rs.4,13,15,200/- on account of unauthorized excavation of limestone in respect of ML-ATK-Limestone Hassan Abdal (1\u002613) recovery of Rs.1,91,12,144/- was approved against the appellant",
        "issue":  "Recovery",
        "status":  "Decided",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "57.0",
        "appealNo":  "DGMM/SSM-APPEAL (1737)/2024",
        "subject":  "ML-ATK-Limestone (Hassan Abdal 1\u002613)",
        "year":  "2024.0",
        "dateOfAppeal":  "45385.0",
        "appellant":  "Hakeem Khan",
        "impugnedAction":  "a recovery of Rs.1,72,73,600/- was approved against the against the appellant on account of unauthorized excavation of limestone",
        "issue":  "Recovery",
        "status":  "Decided",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "58.0",
        "appealNo":  "DGMM/SSM-APPEAL (1738)/2024",
        "subject":  "ML-ATK-Limestone (Hassan Abdal 1\u002613)",
        "year":  "2024.0",
        "dateOfAppeal":  "45385.0",
        "appellant":  "Ali Bahadur",
        "impugnedAction":  "a recovery of Rs.5,04,42,600/- was approved against the appellant on account of unauthorized excavation of limestone i",
        "issue":  "Recovery",
        "status":  "Decided",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "59.0",
        "appealNo":  "DGMM/SSM-APPEAL (1740)/2024",
        "subject":  "ML-ATK-Limestone (Hassan Abdal 1\u002613)",
        "year":  "2024.0",
        "dateOfAppeal":  "45385.0",
        "appellant":  "Malik Shaukat Ali",
        "impugnedAction":  "a recovery of Rs.2,16,86,400/- was approved against the appellant on account of unauthorized excavation of limestone",
        "issue":  "Recovery",
        "status":  "Decided",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "60.0",
        "appealNo":  "DGMM/SSM-APPEAL (1728)/2024",
        "subject":  "ML-ATK-Limestone (Hassan Abdal 13)",
        "year":  "2024.0",
        "dateOfAppeal":  "45379.0",
        "appellant":  "Muhammad Khaqan",
        "impugnedAction":  "a recovery of Rs.4,95,74,400/- was approved against the appellant on account of unauthorized excavation of limestone",
        "issue":  "Recovery",
        "status":  "Decided",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "61.0",
        "appealNo":  "DGMM/SSM-APPEAL (1729)/2024",
        "subject":  "ML-ATK-Limestone (Hassan Abdal 13)",
        "year":  "2024.0",
        "dateOfAppeal":  "45379.0",
        "appellant":  "Danish Iqbal Khan",
        "impugnedAction":  "a recovery of Rs.6,46,68,800/- was approved against the appellant on account of unauthorized excavation of limestone",
        "issue":  "Recovery",
        "status":  "Decided",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "62.0",
        "appealNo":  "DGMM/SSM-APPEAL (1730)/2024",
        "subject":  "ML-ATK-Limestone (Hassan Abdal 1\u002613)",
        "year":  "2024.0",
        "dateOfAppeal":  "45379.0",
        "appellant":  "Saeed Akhtar",
        "impugnedAction":  "an assessment of Rs.4,73,53,600/- was approved against the appellant on account of unauthorized excavation of limestone",
        "issue":  "Recovery",
        "status":  "Decided",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "63.0",
        "appealNo":  "DGMM/SSM-APPEAL (1741)/2024",
        "subject":  "ML-KHB-Silica Sand (80)",
        "year":  "2024.0",
        "dateOfAppeal":  "45386.0",
        "appellant":  "Muhammad Mumtaz",
        "impugnedAction":  "mining lease of the appellant bearing No.ML-KHB-Silica Sand (80) was treated expired on account of non-submission of renewal application on time and also default in payment of Government outstanding dues amounting to Rs.4,37,367/-.",
        "issue":  "ML cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "64.0",
        "appealNo":  "DGMM/SSM-APPEAL (1748)/2024",
        "subject":  "ML-ATK-Limestone(Hassan Abdal-1\u002613)",
        "year":  "2024.0",
        "dateOfAppeal":  "45447.0",
        "appellant":  "M/s Major Stone Crushing Pvt. Ltd",
        "impugnedAction":  "recovery amounting to Rs.3,64,93,150/- was imposed upon the appellant company in respect of the defunct limestone leases Hassanabdal-1 \u0026 13",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "65.0",
        "appealNo":  "DGMM/SSM-APPEAL (1755)/2024",
        "subject":  "ML-ATK-Limestone (Mirza+Burha-4)",
        "year":  "2024.0",
        "dateOfAppeal":  "45477.0",
        "appellant":  "Bilal Khan",
        "impugnedAction":  "surrender application was rejected under Rule-111, the leased area cancelled, the security forfeited and declared the appellant as blacklisted under Rule-181",
        "issue":  "Surrender application declined",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "66.0",
        "appealNo":  "DGMM/SSM-APPEAL (1744)/2024",
        "subject":  "Unauthorized Mining of Limestone Near Margla Hills, Tehsil Taxila, Rawalpindi",
        "year":  "2024.0",
        "dateOfAppeal":  "45407.0",
        "appellant":  "Syed Tehzeeb Hussain Shah",
        "impugnedAction":  "a recovery of Rs.3,59,40,000/- was approved against the appellant on account of unauthorized excavation of limestone",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "67.0",
        "appealNo":  "DGMM/SSM-APPEAL (1722)/2024",
        "subject":  "Remanded Revision Petition. | ML-CKL-Rock-Salt (3 \u00261)",
        "year":  "2024.0",
        "dateOfAppeal":  "45352.0",
        "appellant":  "M/s Wanhar Salt Corporation (Pvt.) Ltd",
        "impugnedAction":  "assessment of Rs.2,71,39,688/- was approved against the appellant company on account unauthorized excavation of Rock Salt under Rule-174",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "68.0",
        "appealNo":  "DGMM/SSM-APPEAL (1745)/2024",
        "subject":  "ML-CKL-Limestone (Bharwal-1)",
        "year":  "2024.0",
        "dateOfAppeal":  "45425.0",
        "appellant":  "Ghulam Mustafa",
        "impugnedAction":  "mining lease of the appellant bearing No.ML-CKL-Limestone (Bharwal-1) was cancelled on account of non-payment of 4th installment",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "69.0",
        "appealNo":  "DGMM/SSM-APPEAL (1752)/2024",
        "subject":  "PL-KHB-Coal (500)",
        "year":  "2024.0",
        "dateOfAppeal":  "45456.0",
        "appellant":  "M/s Fasih Group of Minerals Khushab",
        "impugnedAction":  "allotment letter dated 27.10.2021 of the appellant was withdrawn on account non-submission of NOC from EPA",
        "issue":  "PL cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "70.0",
        "appealNo":  "DGMM/SSM-APPEAL (1754)/2024",
        "subject":  "ML-ATK-Limestone Pathargarh-3(A+B+C) /(6A+6B) 2/R.",
        "year":  "2024.0",
        "dateOfAppeal":  "45471.0",
        "appellant":  "Haroon Rasheed Khan Niazi",
        "impugnedAction":  "surrender application was rejected under Rule-111, the leased area cancelled, the security forfeited and declared the appellant as blacklisted under Rule-181",
        "issue":  "Surrender application declined",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "71.0",
        "appealNo":  "DGMM/SSM-APPEAL (1753)/2024",
        "subject":  "ML-ATK-Limestone Pathargarh-6 (A+B)/ 7(A+B)/11-E.",
        "year":  "2024.0",
        "dateOfAppeal":  "45471.0",
        "appellant":  "M/s Sand \u0026 Rock Traders",
        "impugnedAction":  "surrender application was rejected under Rule-111, the leased area cancelled, the security forfeited and declared the appellant as blacklisted under Rule-181",
        "issue":  "Surrender application declined",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "72.0",
        "appealNo":  "DGMM/SSM-APPEAL (1718)/2024",
        "subject":  "PL-MLI-Silica Sand (179)",
        "year":  "2024.0",
        "dateOfAppeal":  "45329.0",
        "appellant":  "M/s Ali Khan \u0026 Brothers",
        "impugnedAction":  "offer letter dated 09.12.2022 was withdrawn and prospecting license bearing No.PL-MLI-Silica Sand (179) was cancelled",
        "issue":  "PL cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "73.0",
        "appealNo":  "DGMM/SSM-APPEAL (1758)/2024",
        "subject":  "Unauthorized Exc. of Limestone at Margla Hills in District Rawalpindi",
        "year":  "2024.0",
        "dateOfAppeal":  "45492.0",
        "appellant":  "Mir Afzal",
        "impugnedAction":  "Recovery of Rs.3,71,20,000/-",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "74.0",
        "appealNo":  "DGMM/SSM-APPEAL (1759)/2024",
        "subject":  "Unauthorized Exc. of Limestone at Margla Hills in District Rawalpindi",
        "year":  "2024.0",
        "dateOfAppeal":  "45492.0",
        "appellant":  "Ch. Muhammad Akhtar",
        "impugnedAction":  "Recovery of Rs.3,59,40,000/-",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "75.0",
        "appealNo":  "DGMM/SSM-APPEAL (1760)/2024",
        "subject":  "Unauthorized Exc. of Limestone at Margla Hills in District Rawalpindi",
        "year":  "2024.0",
        "dateOfAppeal":  "45492.0",
        "appellant":  "Syed Safdar Hussain Shah",
        "impugnedAction":  "Recovery of Rs.45,76,000/-",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "76.0",
        "appealNo":  "DGMM/SSM-APPEAL (1761)/2024",
        "subject":  "Unauthorized Exc. of Limestone at Margla Hills in District Rawalpindi",
        "year":  "2024.0",
        "dateOfAppeal":  "45492.0",
        "appellant":  "Haji Muhammad Akram",
        "impugnedAction":  "Recovery of Rs.3,33,40,000/-",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "77.0",
        "appealNo":  "DGMM/SSM-APPEAL (1762)/2024",
        "subject":  "Unauthorized Exc. of Limestone at Margla Hills in District Rawalpindi",
        "year":  "2024.0",
        "dateOfAppeal":  "45492.0",
        "appellant":  "Muhammad Saeed Mughal",
        "impugnedAction":  "Recovery of Rs.4,28,16,000/-",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "78.0",
        "appealNo":  "DGMM/SSM-APPEAL (1763)/2024",
        "subject":  "Unauthorized Exc. of Limestone at Margla Hills in District Rawalpindi",
        "year":  "2024.0",
        "dateOfAppeal":  "45492.0",
        "appellant":  "Raja Muhammad Sagheer",
        "impugnedAction":  "Recovery of Rs.3,49,80,000/-",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "79.0",
        "appealNo":  "DGMM/SSM-APPEAL (1764)/2024",
        "subject":  "Unauthorized Exc. of Limestone at Margla Hills in District Rawalpindi",
        "year":  "2024.0",
        "dateOfAppeal":  "45492.0",
        "appellant":  "Gul Baz Khan",
        "impugnedAction":  "Recovery of Rs.3,00,96,000/-",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "80.0",
        "appealNo":  "DGMM/SSM-APPEAL (1765)/2024",
        "subject":  "Unauthorized Exc. of Limestone at Margla Hills in District Rawalpindi",
        "year":  "2024.0",
        "dateOfAppeal":  "45492.0",
        "appellant":  "Gul Baz Khan",
        "impugnedAction":  "Recovery of Rs.3,76,00,000/-",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "81.0",
        "appealNo":  "DGMM/SSM-APPEAL (1766)/2024",
        "subject":  "Unauthorized Exc. of Limestone at Margla Hills in District Rawalpindi",
        "year":  "2024.0",
        "dateOfAppeal":  "45492.0",
        "appellant":  "Malik Shahid",
        "impugnedAction":  "Recovery of Rs.3,00,80,000/-",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "82.0",
        "appealNo":  "DGMM/SSM-APPEAL (1767)/2024",
        "subject":  "Unauthorized Exc. of Limestone at Margla Hills in District Rawalpindi",
        "year":  "2024.0",
        "dateOfAppeal":  "45492.0",
        "appellant":  "Syed Wajahat Hussain Shah",
        "impugnedAction":  "Recovery of Rs.2,85,44,000/-",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "83.0",
        "appealNo":  "DGMM/SSM-APPEAL (1768)/2024",
        "subject":  "Unauthorized Exc. of Limestone at Margla Hills in District Rawalpindi",
        "year":  "2024.0",
        "dateOfAppeal":  "45492.0",
        "appellant":  "Tariq Mahmood",
        "impugnedAction":  "Recovery of Rs.6,01,92,000/-",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "84.0",
        "appealNo":  "DGMM/SSM-APPEAL (1773)/2024",
        "subject":  "Unauthorized Exc. of Limestone at Margla Hills in District Rawalpindi",
        "year":  "2024.0",
        "dateOfAppeal":  "45562.0",
        "appellant":  "Fazal-e-Akram",
        "impugnedAction":  "Recovery of Rs.3,50,40,000/-",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "85.0",
        "appealNo":  "DGMM/SSM-APPEAL (1775)/2024",
        "subject":  "ML-CKL-I-BAUXITE (01)",
        "year":  "2024.0",
        "dateOfAppeal":  "45621.0",
        "appellant":  "Hussain Maqbool Hashmi",
        "impugnedAction":  "Recovery of Rs.3,59,40,000/-",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "86.0",
        "appealNo":  "DGMM/SSM-APPEAL (1719)/2024",
        "subject":  "PL-CKL-I-IRON ORE (03)",
        "year":  "2024.0",
        "dateOfAppeal":  "45334.0",
        "appellant":  "M/s Quantum Minerals",
        "impugnedAction":  "prospecting license of the appellant bearing No.PL-CKL-I-Iron Ore (03) was terminated",
        "issue":  "PL cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "87.0",
        "appealNo":  "DGMM/SSM-APPEAL (1720)/2024",
        "subject":  "PL-CKL-I-IRON ORE (02)",
        "year":  "2024.0",
        "dateOfAppeal":  "45334.0",
        "appellant":  "M/s Quantum Minerals",
        "impugnedAction":  "prospecting license of the appellant bearing No.PL-CKL-I-Iron Ore (02) was terminated",
        "issue":  "PL cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "88.0",
        "appealNo":  "DGMM/SSM-APPEAL (1778)/2024",
        "subject":  "PL-RJP-Gypsum (02)",
        "year":  "2024.0",
        "dateOfAppeal":  "45639.0",
        "appellant":  "Muhammad Musharraf Khan",
        "impugnedAction":  "Prospecting license was cancelled",
        "issue":  "PL cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "89.0",
        "appealNo":  "DGMM/SSM-APPEAL (1779)/2024",
        "subject":  "PL-RJP-Gypsum (01)",
        "year":  "2024.0",
        "dateOfAppeal":  "45639.0",
        "appellant":  "Muhammad Musharraf Khan",
        "impugnedAction":  "Prospecting license was cancelled",
        "issue":  "PL cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "90.0",
        "appealNo":  "DGMM/SSM-APPEAL (1776)/2024",
        "subject":  "PL-RJP-Gypsum (05)",
        "year":  "2024.0",
        "dateOfAppeal":  "45639.0",
        "appellant":  "M/s Al-Abbas Constructors",
        "impugnedAction":  "Prospecting license was cancelled",
        "issue":  "PL cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "91.0",
        "appealNo":  "DGMM/SSM-APPEAL (1777)/2024",
        "subject":  "PL-RJP-Gypsum (04)",
        "year":  "2024.0",
        "dateOfAppeal":  "45639.0",
        "appellant":  "M/s Al-Abbas Constructors",
        "impugnedAction":  "Prospecting license was cancelled",
        "issue":  "PL cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "92.0",
        "appealNo":  "DGMM/SSM-APPEAL (1817)/2025",
        "subject":  "ML-MLI-IRON ORE(31).",
        "year":  "2025.0",
        "dateOfAppeal":  "45901.0",
        "appellant":  "Mr. Umair Sikandar Khan",
        "impugnedAction":  "renewal of the mining lease for 05 years instead of 10 years",
        "issue":  "Renewal",
        "status":  "Decided",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "93.0",
        "appealNo":  "DGMM/SSM-APPEAL (1818)/2025",
        "subject":  "ML-MLI-FIRE CLAY(53).",
        "year":  "2025.0",
        "dateOfAppeal":  "45901.0",
        "appellant":  "Mr. Umair Sikandar Khan",
        "impugnedAction":  "renewal of the mining lease for 05 years instead of 10 years",
        "issue":  "Renewal",
        "status":  "Decided",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "94.0",
        "appealNo":  "DGMM/SSM-APPEAL (1814)/2025",
        "subject":  "Limestone Block Pathargarh-6-F, Tehsil Hassan Abdaal District Attock.",
        "year":  "2025.0",
        "dateOfAppeal":  "45901.0",
        "appellant":  "Legal Heirs of Abdul Rasheed Khan Niazi",
        "impugnedAction":  "mining lease of the appellant was cancelled due to non-payment of 4th installment and security amount already deposited by the appellant was also forfeited",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "95.0",
        "appealNo":  "DGMM-SSM-APPEAL (1785)/2025",
        "subject":  "ML-JLM-COAL (109).",
        "year":  "2025.0",
        "dateOfAppeal":  "45713.0",
        "appellant":  "M/s Al Ijaz Mining Corporation",
        "impugnedAction":  "demand notice amounting to Rs.14,57,770/-",
        "issue":  "Demand Notice",
        "status":  "Decided",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "96.0",
        "appealNo":  "DGMM-SSM-APPEAL (1794)/2025",
        "subject":  "ML-MLI-LIMESTONE-RIKHI-3-A",
        "year":  "2025.0",
        "dateOfAppeal":  "45726.0",
        "appellant":  "Malik Akhtar Saeed",
        "impugnedAction":  "Request for extension of lease period was declined",
        "issue":  "Sine die adjourned",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "97.0",
        "appealNo":  "DGMM/SSM-APPEAL (1787)/2025",
        "subject":  "PL-JLM-COAL(376).",
        "year":  "2025.0",
        "dateOfAppeal":  "45720.0",
        "appellant":  "Mr. Muhammad Asghar Awan",
        "impugnedAction":  "conversion application of applicant was rejected and prospecting license was treated as expired",
        "issue":  "Conversion rejected, PL cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "98.0",
        "appealNo":  "DGMM/SSM-APPEAL (1802)/2025",
        "subject":  "PL-CKL-I(471)",
        "year":  "2025.0",
        "dateOfAppeal":  "45824.0",
        "appellant":  "M/s H \u0026 T Coal Company",
        "impugnedAction":  "conversion application of appellant was rejected and prospecting license was treated as cancelled/expired",
        "issue":  "Conversion rejected, PL cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "99.0",
        "appealNo":  "DGMM/SSM-APPEAL (1803)/2025",
        "subject":  "PL-CKL-I-COAL(486).",
        "year":  "2025.0",
        "dateOfAppeal":  "45827.0",
        "appellant":  "M/s Saleem Collaries Pvt. Ltd",
        "impugnedAction":  "conversion application of appellant was rejected and prospecting license was treated as cancelled/expired",
        "issue":  "Conversion rejected, PL cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "100.0",
        "appealNo":  "DGMM/SSM-APPEAL (1804)/2025",
        "subject":  "PL-KHB-Fireclay(82).",
        "year":  "2025.0",
        "dateOfAppeal":  "45831.0",
        "appellant":  "Mr. Ameer Kalam",
        "impugnedAction":  "conversion application of appellant was rejected and prospecting license was treated as cancelled/expired",
        "issue":  "Conversion rejected, PL cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "101.0",
        "appealNo":  "DGMM/SSM-APPEAL (1805)/2025",
        "subject":  "PL-KHB-Fireclay(11).",
        "year":  "2025.0",
        "dateOfAppeal":  "45831.0",
        "appellant":  "Legal Heir (Azhar Iqbal) of Mrs. Mumtaz Begum",
        "impugnedAction":  "conversion application of appellant was rejected and prospecting license was treated as cancelled/expired",
        "issue":  "Conversion rejected, PL cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "102.0",
        "appealNo":  "DGMM/SSM-APPEAL (1806)/2025",
        "subject":  "PL-KHB-FIRECLAY(89).",
        "year":  "2025.0",
        "dateOfAppeal":  "45831.0",
        "appellant":  "M/s Awan Traders",
        "impugnedAction":  "conversion application of appellant was rejected and prospecting license was treated as cancelled/expired",
        "issue":  "Conversion rejected, PL cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "103.0",
        "appealNo":  "DGMM/SSM-APPEAL (1809)/2025",
        "subject":  "ML-RJP-SILICA SAND(02)",
        "year":  "2025.0",
        "dateOfAppeal":  "45854.0",
        "appellant":  "M/s Al-Hussain Leasing Company",
        "impugnedAction":  "assessment of Rs.5,04,42,974/- was approved against the appellantâ€™s firm on account unauthorized excavation of ordinary sand gravel from the area of mining lease",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "104.0",
        "appealNo":  "DGMM/SSM-APEAL (1808)/2025",
        "subject":  "ML-ROCK-SALT-KHB(19).",
        "year":  "2025.0",
        "dateOfAppeal":  "45854.0",
        "appellant":  "Aamir Zameer Malik",
        "impugnedAction":  "request for the appellant for refund of 1/5th of the bid money amounting to Rs.20,20,20,000/-, income tax @ 10% amounting to Rs.2,02,02,000/- and security amounting to Rs.2,00,000/- was declined",
        "issue":  "Refund",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "105.0",
        "appealNo":  "DGMM/SSM-APPEAL (1810)/2025",
        "subject":  "ML-CKL-II-COAL (83).",
        "year":  "2025.0",
        "dateOfAppeal":  "45884.0",
        "appellant":  "Qazi Muhammad Aslam",
        "impugnedAction":  "request of appellant for cancellation of mining lease bearing No.ML-CKL-II-COAL (83) granted to M/S Mughal Coal Mines on account of subletting under Rule-171 was declined",
        "issue":  "Sub-letting",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "106.0",
        "appealNo":  "DGMM/SSM-APPEAL (1811)/2025",
        "subject":  "PL-MLI-COAL(173).",
        "year":  "2025.0",
        "dateOfAppeal":  "45889.0",
        "appellant":  "Tariq Habib Ullah Khan",
        "impugnedAction":  "the lessee failed to submit renewal application, submission of IEE and also defaulter in Government outstanding dues amounting to Rs.2,98,512/-",
        "issue":  "PL cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "107.0",
        "appealNo":  "DGMM/MISC-APPEAL (135)/2025",
        "subject":  "PL-MLI-IRON ORE (202)",
        "year":  "2025.0",
        "dateOfAppeal":  "45889.0",
        "appellant":  "Tariq Masood Khan",
        "impugnedAction":  "Against Khalid Saeed Ullah Khan who is subsequent allottee of prospecting license under appeal",
        "issue":  "App for PL rejected",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "108.0",
        "appealNo":  "DGMM/SSM-APPEAL (1812)/2025",
        "subject":  "PL-MLI-COAL(174)",
        "year":  "2025.0",
        "dateOfAppeal":  "45889.0",
        "appellant":  "M/s Niazi Mining Company",
        "impugnedAction":  "the lessee failed to submit renewal application, submission of IEE and also defaulter in Government outstanding dues amounting to Rs.3,32,385/-",
        "issue":  "PL cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "109.0",
        "appealNo":  "DGMM/SSM-APPEAL (1826)/2025",
        "subject":  "ML-CKL-I-Coal(117)",
        "year":  "2025.0",
        "dateOfAppeal":  "46000.0",
        "appellant":  "Chaudhary Shafqat Abbas",
        "impugnedAction":  "mining lease was cancelled on charge of sub-letting",
        "issue":  "ML cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "110.0",
        "appealNo":  "DGMM/SSM-APPEAL (1821)/2025",
        "subject":  "ML-MLI-SILICA SAND(133).",
        "year":  "2025.0",
        "dateOfAppeal":  "45922.0",
        "appellant":  "Malik Sarfraz Khan",
        "impugnedAction":  "renewal of the mining lease for 05 years instead of 10 years",
        "issue":  "Renewal",
        "status":  "Decided",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "111.0",
        "appealNo":  "DGMM/SSM-APPEAL (1820)/2025",
        "subject":  "ML-MLI-IRON ORE(38).",
        "year":  "2025.0",
        "dateOfAppeal":  "45922.0",
        "appellant":  "Mr. Muhammad Kinaan Iqbal",
        "impugnedAction":  "renewal of the mining lease for 05 years instead of 10 years",
        "issue":  "Renewal",
        "status":  "Decided",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "112.0",
        "appealNo":  "DGMM/SSM-APPEAL (1819)/2025",
        "subject":  "ML-MLI-FIRE CLAY(93).",
        "year":  "2025.0",
        "dateOfAppeal":  "45922.0",
        "appellant":  "Mr. Muhammad Kinaan Iqbal",
        "impugnedAction":  "renewal of the mining lease for 05 years instead of 10 years",
        "issue":  "Renewal",
        "status":  "Decided",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "113.0",
        "appealNo":  "DGMM/SSM-APPEAL(1816)2025",
        "subject":  "ML-MLI-GYPSUM(31).",
        "year":  "2025.0",
        "dateOfAppeal":  "45924.0",
        "appellant":  "Mr. Asmat Ullah",
        "impugnedAction":  "mining lease of the appellant was cancelled due to non-payment of 3rd installment and possession of area was resumed in favour of Government on 19.02.2024",
        "issue":  "ML cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "114.0",
        "appealNo":  "DG(MM)/MISC-APPEAL (140)/2025",
        "subject":  "(Remanded Writ Petition No.3216/2025",
        "year":  "2025.0",
        "dateOfAppeal":  "45945.0",
        "appellant":  "Aamir Majeed Khan Niazi",
        "impugnedAction":  "the appellant/petitioner participated in e-auction held on 27.09.2025 for mining lease of limestone namely Pathergarh-6 (C+F) situated at Tehsil Hasanabdal District Attock and emerged as the highest bidder by making an offer of Rs.35,35,00,000/- against the reserve price of Rs.35,00,00,000/-.",
        "issue":  "Bid rejected",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "115.0",
        "appealNo":  "DGMM/SSM-APPEAL (1825)/2025",
        "subject":  "ML-RJP-SILICA SAND(02) District Rajanpur.",
        "year":  "2025.0",
        "dateOfAppeal":  "45987.0",
        "appellant":  "M/s Al-Hussain Leasing Company",
        "impugnedAction":  "mining lease of silica sand was cancelled",
        "issue":  "ML cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "116.0",
        "appealNo":  "DGMM/SSM-APPEAL (1833)/2026",
        "subject":  "ML-ATK-Limestone (Pathergarh-5).",
        "year":  "2026.0",
        "dateOfAppeal":  "46083.0",
        "appellant":  "M/s Win Mining Corporation",
        "impugnedAction":  "recovery amounting to Rs.25,20,89,600/- was imposed upon the appellant company",
        "issue":  "Recovery",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "117.0",
        "appealNo":  "DGMM-SSM-APPEAL (1832)/2026",
        "subject":  "PL-MLI-OCHER(42)",
        "year":  "2026.0",
        "dateOfAppeal":  "46057.0",
        "appellant":  "Muhammad Farooq Khan",
        "impugnedAction":  "Licensing Authority restored an area of 75.59 acres instead of 125 acres",
        "issue":  "Area restored (less than claimed)",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "118.0",
        "appealNo":  "DGMM-SSM-APPEAL (1830)/2026",
        "subject":  "PL-CKL-I-COAL(530)",
        "year":  "2026.0",
        "dateOfAppeal":  "45987.0",
        "appellant":  "M/s Elahi Enterprises",
        "impugnedAction":  "prospecting license cancelled due to non-submission of renewal application , IEE report and also defaulter in Government outstanding dues amounting to Rs.5,32,885/-",
        "issue":  "PL cancelled",
        "status":  "Pending",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "119.0",
        "appealNo":  "DGMM-SSM-APPEAL (1783)/2025",
        "subject":  "PL-ATK-Bentonite (31).",
        "year":  "2026.0",
        "dateOfAppeal":  "45677.0",
        "appellant":  "M/s Pakistan Mineral Products",
        "impugnedAction":  "conversion application of appellant was rejected and prospecting license was treated as cancelled/expired. The Mines Committee in its 83rd meeting held on 21.11.2024 decided to reject the conversion application of the appellant firm and disposal of the licensed area through open auction under rule `187 of the Punjab Mining Concession Rules, 2002.",
        "issue":  "PL cancelled",
        "status":  "Decided",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "120.0",
        "appealNo":  "DGMM-SSM-APPEAL (1784)/2025",
        "subject":  "PL-ATK-Bentonite (30).",
        "year":  "2026.0",
        "dateOfAppeal":  "45677.0",
        "appellant":  "M/s Pakistan Mineral Products",
        "impugnedAction":  "conversion application of appellant was rejected and prospecting license was treated as cancelled/expired. The Mines Committee in its 83rd meeting held on 21.11.2024 decided to reject the conversion application of the appellant firm and disposal of the licensed area through open auction under rule `187 of the Punjab Mining Concession Rules, 2002.",
        "issue":  "PL cancelled",
        "status":  "Decided",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "121.0",
        "appealNo":  "DG(MM)/MISC-APPEAL (153)/2026",
        "subject":  "Remanded Writ petition No.33375/26",
        "year":  "2026.0",
        "dateOfAppeal":  "46196.0",
        "appellant":  "Haihong Super Pak (Pvt.) Ltd",
        "impugnedAction":  null,
        "issue":  "Not specified",
        "status":  "Decided",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "122.0",
        "appealNo":  "DGMM/MISC-APPEALS (149)/2026 [ML-CKL-LIMESTONE-KHOKHAR BALA-1 (REVISED)",
        "subject":  null,
        "year":  "2026.0",
        "dateOfAppeal":  "46153.0",
        "appellant":  "Sattar Khan",
        "impugnedAction":  null,
        "issue":  "Not specified",
        "status":  "Decided",
        "category":  "Small Scale Mining"
    },
    {
        "sr":  "123.0",
        "appealNo":  "DGMM/MISC-APPEAL (150)/2026",
        "subject":  "Mining lease for Fireclay block Amb District Khushab.",
        "year":  "2026.0",
        "dateOfAppeal":  "46196.0",
        "appellant":  "Muhammad Ameer Khan",
        "impugnedAction":  null,
        "issue":  "Not specified",
        "status":  "Decided",
        "category":  "Small Scale Mining"
    }
],

  // 10. District-wise EPA Summary
  epaDistricts: [
    { district: "Rawalpindi", count: 21, fieldOffice: "Rawalpindi", division: "Rawalpindi", bottleneck: "DAEC Review & DC Meeting" },
    { district: "Jhelum", count: 20, fieldOffice: "Jhelum", division: "Rawalpindi", bottleneck: "Site Inspection by EPA" },
    { district: "Chakwal", count: 19, fieldOffice: "Chakwal", division: "Rawalpindi", bottleneck: "DAEC Meeting Schedule" },
    { district: "Attock", count: 15, fieldOffice: "Attock", division: "Rawalpindi", bottleneck: "Site Inspection & Area Inspector" },
    { district: "Sheikhupura", count: 11, fieldOffice: "Lahore", division: "Lahore", bottleneck: "EPA Lahore Regional Review" },
    { district: "Khanewal", count: 9, fieldOffice: "Multan", division: "Multan", bottleneck: "DAEC Notice Issued" },
    { district: "Kasur", count: 8, fieldOffice: "Lahore", division: "Lahore", bottleneck: "Under Process in EPA Kasur" },
    { district: "Lahore", count: 7, fieldOffice: "Lahore", division: "Lahore", bottleneck: "Riverbed Zone Environmental Review" },
    { district: "Rahim Yar Khan", count: 6, fieldOffice: "Bahawalpur", division: "Bahawalpur", bottleneck: "Awaiting DC DAEC Concession Approval" },
    { district: "Sargodha", count: 6, fieldOffice: "Sargodha", division: "Sargodha", bottleneck: "Crushed Stone Quarry Scrutiny" },
    { district: "Hafizabad", count: 5, fieldOffice: "Gujranwala", division: "Gujranwala", bottleneck: "Area Inspector Site Verification" },
    { district: "Bahawalnagar", count: 4, fieldOffice: "Bahawalpur", division: "Bahawalpur", bottleneck: "Renewal Cases Reminders Sent" },
    { district: "Gujranwala", count: 3, fieldOffice: "Gujranwala", division: "Gujranwala", bottleneck: "Chenab Sand Quarry Clearances" },
    { district: "Sahiwal", count: 3, fieldOffice: "Sahiwal", division: "Sahiwal", bottleneck: "DAEC Meeting Concession Clearance" },
    { district: "Pakpattan", count: 3, fieldOffice: "Sahiwal", division: "Sahiwal", bottleneck: "Sutlej River Sand Blocks" },
    { district: "Khushab", count: 3, fieldOffice: "Khushab", division: "Sargodha", bottleneck: "Salt Range DAEC Coordination" },
    { district: "Chiniot", count: 2, fieldOffice: "Chiniot", division: "Faisalabad", bottleneck: "Ordinary Sand Riverbed Assessment" },
    { district: "Bahawalpur", count: 2, fieldOffice: "Bahawalpur", division: "Bahawalpur", bottleneck: "Field Verification Pending" },
    { district: "Vehari", count: 2, fieldOffice: "Multan", division: "Multan", bottleneck: "Under Process in Field Office" },
    { district: "Jhang", count: 1, fieldOffice: "Chiniot", division: "Faisalabad", bottleneck: "Riverbed Zone Verification" },
    { district: "Nankana Sahib", count: 1, fieldOffice: "Lahore", division: "Lahore", bottleneck: "EPA Scrutiny" }
  ],

  // 11. Strategic Concessions & Lease Overview
  concessions: {
    totalBlocks: 870,
    grantedCount: 738,
    grantedPercent: 84.8,
    vacantCount: 132,
    vacantPercent: 15.2,
    upcomingAuctions: 104,
    largeLeases: 606,
    topRevenueConcentration: "51.6% in Sargodha & Attock",
    sargodhaSandstoneRevenue: "Rs. 8.91 Billion PKR",
    attockValueDensity: "Rs. 176,991 PKR per acre",
    topDistrictsReservePrice: [
      { district: "Sargodha", amountM: 9419.45 },
      { district: "Attock", amountM: 7973.39 },
      { district: "Khushab", amountM: 1903.82 },
      { district: "Jhelum", amountM: 1718.69 },
      { district: "Sheikhupura", amountM: 1031.55 },
      { district: "Dera Ghazi Khan", amountM: 859.30 },
      { district: "Chiniot", amountM: 822.50 },
      { district: "Gujrat", amountM: 809.60 },
      { district: "Mianwali", amountM: 793.30 },
      { district: "Hafizabad", amountM: 670.00 }
    ],
    topMineralsByCount: [
      { mineral: "Ordinary Sand", count: 321 },
      { mineral: "Limestone", count: 170 },
      { mineral: "Sandstone", count: 88 },
      { mineral: "Sand-Gravel", count: 67 },
      { mineral: "Silica Sand", count: 39 },
      { mineral: "Coal", count: 37 },
      { mineral: "Gypsum", count: 33 },
      { mineral: "Gravel", count: 31 },
      { mineral: "Rock Salt", count: 26 },
      { mineral: "Fireclay", count: 19 }
    ]
  },

  // 12. Regional Performance (LSM vs SSM Targets in PKR Millions)
  regionalPerformance: [
    { region: "Sargodha", lsmTarget: 1450, lsmActual: 1520, ssmTarget: 2200, ssmActual: 2340 },
    { region: "Attock / Rawalpindi", lsmTarget: 2100, lsmActual: 2080, ssmTarget: 1150, ssmActual: 1120 },
    { region: "D.G. Khan", lsmTarget: 480, lsmActual: 460, ssmTarget: 620, ssmActual: 590 },
    { region: "Jhelum / Chakwal", lsmTarget: 950, lsmActual: 980, ssmTarget: 890, ssmActual: 870 },
    { region: "Lahore / Sheikhupura", lsmTarget: 320, lsmActual: 335, ssmTarget: 1100, ssmActual: 1045 },
    { region: "Multan / Khanewal", lsmTarget: 180, lsmActual: 175, ssmTarget: 780, ssmActual: 810 },
    { region: "Bahawalpur / RYK", lsmTarget: 120, lsmActual: 110, ssmTarget: 540, ssmActual: 515 },
    { region: "Gujranwala / Hafizabad", lsmTarget: 90, lsmActual: 95, ssmTarget: 720, ssmActual: 740 },
    { region: "Faisalabad / Chiniot", lsmTarget: 160, lsmActual: 150, ssmTarget: 640, ssmActual: 620 }
  ]
};