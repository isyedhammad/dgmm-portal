// build_admin_data.js
const fs = require('fs');

const summary = {
  totalSanctioned: 575,
  totalFilled: 401,
  totalVacant: 174,
  fillRatePct: 69.74,
  vacancyRatePct: 30.26,
  gazetted: { sanctioned: 162, filled: 113, vacant: 49, fillRatePct: 69.75 },
  nonGazetted: { sanctioned: 413, filled: 288, vacant: 125, fillRatePct: 69.73 },
  hq: { sanctioned: 224, filled: 173, vacant: 51, fillRatePct: 77.23 },
  field: { sanctioned: 351, filled: 228, vacant: 123, fillRatePct: 64.96 }
};

const offices = [
  { office: "Headquarters (Lahore)", fundCentre: "LO004398", type: "HQ", gazetted: { s: 93, f: 73, v: 20 }, nonGazetted: { s: 131, f: 100, v: 31 }, total: { s: 224, f: 173, v: 51 } },
  { office: "Lahore Region", fundCentre: "LO004397 / LO005326", type: "Field", gazetted: { s: 5, f: 4, v: 1 }, nonGazetted: { s: 16, f: 9, v: 7 }, total: { s: 21, f: 13, v: 8 } },
  { office: "Sargodha", fundCentre: "SG004080", type: "Field", gazetted: { s: 7, f: 4, v: 3 }, nonGazetted: { s: 20, f: 16, v: 4 }, total: { s: 27, f: 20, v: 7 } },
  { office: "Rawalpindi", fundCentre: "RI004396", type: "Field", gazetted: { s: 7, f: 3, v: 4 }, nonGazetted: { s: 17, f: 8, v: 9 }, total: { s: 24, f: 11, v: 13 } },
  { office: "Dera Ghazi Khan", fundCentre: "DG004075", type: "Field", gazetted: { s: 5, f: 2, v: 3 }, nonGazetted: { s: 23, f: 16, v: 7 }, total: { s: 28, f: 18, v: 10 } },
  { office: "Khushab", fundCentre: "KB004001 / KB004258", type: "Field", gazetted: { s: 7, f: 5, v: 2 }, nonGazetted: { s: 24, f: 13, v: 11 }, total: { s: 31, f: 18, v: 13 } },
  { office: "DD Chakwal", fundCentre: "CH004025", type: "Field", gazetted: { s: 7, f: 3, v: 4 }, nonGazetted: { s: 36, f: 22, v: 14 }, total: { s: 43, f: 25, v: 18 } },
  { office: "AD Chakwal", fundCentre: "CH004024", type: "Field", gazetted: { s: 3, f: 3, v: 0 }, nonGazetted: { s: 11, f: 8, v: 3 }, total: { s: 14, f: 11, v: 3 } },
  { office: "Multan", fundCentre: "MN004562", type: "Field", gazetted: { s: 4, f: 2, v: 2 }, nonGazetted: { s: 17, f: 14, v: 3 }, total: { s: 21, f: 16, v: 5 } },
  { office: "Gujranwala", fundCentre: "GA004176", type: "Field", gazetted: { s: 4, f: 2, v: 2 }, nonGazetted: { s: 16, f: 11, v: 5 }, total: { s: 20, f: 13, v: 7 } },
  { office: "Mianwali", fundCentre: "MI004001", type: "Field", gazetted: { s: 5, f: 4, v: 1 }, nonGazetted: { s: 43, f: 33, v: 10 }, total: { s: 48, f: 37, v: 11 } },
  { office: "Sialkot", fundCentre: "ST004044 / ST004405", type: "Field", gazetted: { s: 2, f: 2, v: 0 }, nonGazetted: { s: 12, f: 9, v: 3 }, total: { s: 14, f: 11, v: 3 } },
  { office: "Sahiwal", fundCentre: "SL004094 / SL004405", type: "Field", gazetted: { s: 3, f: 2, v: 1 }, nonGazetted: { s: 4, f: 2, v: 2 }, total: { s: 7, f: 4, v: 3 } },
  { office: "Chiniot", fundCentre: "CH004002", type: "Field", gazetted: { s: 3, f: 2, v: 1 }, nonGazetted: { s: 8, f: 5, v: 3 }, total: { s: 11, f: 7, v: 4 } },
  { office: "Attock", fundCentre: "AK004059", type: "Field", gazetted: { s: 3, f: 1, v: 2 }, nonGazetted: { s: 13, f: 9, v: 4 }, total: { s: 16, f: 10, v: 6 } },
  { office: "Bahawalpur", fundCentre: "BR004207", type: "Field", gazetted: { s: 2, f: 1, v: 1 }, nonGazetted: { s: 13, f: 9, v: 4 }, total: { s: 15, f: 10, v: 5 } },
  { office: "Jhelum", fundCentre: "JM004169 / JM004405", type: "Field", gazetted: { s: 2, f: 1, v: 1 }, nonGazetted: { s: 9, f: 4, v: 5 }, total: { s: 11, f: 5, v: 6 } }
];

const cadre = [
  // Gazetted BS 16 to 20
  { sn: 1, code: "D110-M", post: "Director General, Mines & Minerals, Punjab", bps: 20, s: 1, f: 1, v: 0, hq: { s: 1, f: 1, v: 0 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 2, code: "D279-M", post: "Director Mines & Minerals, Punjab", bps: 19, s: 6, f: 5, v: 1, hq: { s: 6, f: 5, v: 1 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 3, code: "D821-M", post: "Director Geographic Information System (GIS)", bps: 19, s: 1, f: 0, v: 1, hq: { s: 1, f: 0, v: 1 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 4, code: "D051-M", post: "Deputy Director, Mines & Minerals", bps: 18, s: 17, f: 15, v: 2, hq: { s: 8, f: 8, v: 0 }, field: { s: 9, f: 7, v: 2 } },
  { sn: 5, code: "M309-M", post: "Manager (Information Technology) (IT)", bps: 18, s: 1, f: 0, v: 1, hq: { s: 1, f: 0, v: 1 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 6, code: "M374-M", post: "Manager (GIS & Client Systems)", bps: 18, s: 1, f: 1, v: 0, hq: { s: 1, f: 1, v: 0 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 7, code: "M371-M", post: "Manager (Cartography & Survey)", bps: 18, s: 1, f: 1, v: 0, hq: { s: 1, f: 1, v: 0 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 8, code: "M372-M", post: "Manager (Mineral Data & Geo Chemistry)", bps: 18, s: 1, f: 0, v: 1, hq: { s: 1, f: 0, v: 1 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 9, code: "M373-M", post: "Manager (Basin Studies)", bps: 18, s: 1, f: 1, v: 0, hq: { s: 1, f: 1, v: 0 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 10, code: "M369-M", post: "Manager (Geo-Physics)", bps: 18, s: 1, f: 1, v: 0, hq: { s: 1, f: 1, v: 0 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 11, code: "M375-M", post: "Manager Environment Facilitation (EF)", bps: 18, s: 1, f: 0, v: 1, hq: { s: 1, f: 0, v: 1 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 12, code: "M370-M", post: "Manager (Geological Mapping)", bps: 18, s: 1, f: 0, v: 1, hq: { s: 1, f: 0, v: 1 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 13, code: "D281-M", post: "Deputy Manager (Cartography & Survey)", bps: 17, s: 1, f: 1, v: 0, hq: { s: 1, f: 1, v: 0 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 14, code: "D281-M", post: "Deputy Manager (Mineral Data & Geo Chemistry)", bps: 17, s: 1, f: 0, v: 1, hq: { s: 1, f: 0, v: 1 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 15, code: "D281-M", post: "Deputy Manager (Basin Studies)", bps: 17, s: 1, f: 1, v: 0, hq: { s: 1, f: 1, v: 0 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 16, code: "D281-M", post: "Deputy Manager (Geo-Physics)", bps: 17, s: 1, f: 1, v: 0, hq: { s: 1, f: 1, v: 0 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 17, code: "D281-M", post: "Deputy Manager (Geological Mapping)", bps: 17, s: 1, f: 1, v: 0, hq: { s: 1, f: 1, v: 0 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 18, code: "D281-M", post: "Deputy Manager (Environment & Facilitation)", bps: 17, s: 1, f: 1, v: 0, hq: { s: 1, f: 1, v: 0 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 19, code: "A146-M", post: "Assistant Director Mines & Minerals", bps: 17, s: 31, f: 28, v: 3, hq: { s: 13, f: 13, v: 0 }, field: { s: 18, f: 15, v: 3 } },
  { sn: 20, code: "A752-M", post: "Assistant Director (Appeals)", bps: 17, s: 1, f: 1, v: 0, hq: { s: 1, f: 1, v: 0 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 21, code: "W110-M", post: "Web GIS Development Officer", bps: 17, s: 1, f: 1, v: 0, hq: { s: 1, f: 1, v: 0 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 22, code: "D530-M", post: "Data Base Administrator", bps: 17, s: 1, f: 1, v: 0, hq: { s: 1, f: 1, v: 0 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 23, code: "N055-M", post: "Network Administrator", bps: 17, s: 1, f: 1, v: 0, hq: { s: 1, f: 1, v: 0 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 24, code: "L066-M", post: "Librarian", bps: 17, s: 1, f: 1, v: 0, hq: { s: 1, f: 1, v: 0 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 25, code: "D092-M", post: "GIS Development Officer", bps: 17, s: 5, f: 4, v: 1, hq: { s: 5, f: 4, v: 1 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 26, code: "A214-M", post: "Assistant Mechanical Engineer", bps: 17, s: 1, f: 1, v: 0, hq: { s: 1, f: 1, v: 0 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 27, code: "G043-M", post: "Geologist", bps: 17, s: 3, f: 3, v: 0, hq: { s: 1, f: 1, v: 0 }, field: { s: 2, f: 2, v: 0 } },
  { sn: 28, code: "A012-M", post: "Account Officer (Budget & Accounts)", bps: 17, s: 1, f: 1, v: 0, hq: { s: 1, f: 1, v: 0 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 29, code: "A316-M", post: "Audit Officer", bps: 17, s: 1, f: 1, v: 0, hq: { s: 1, f: 1, v: 0 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 30, code: "S282-M", post: "Superintendent", bps: 17, s: 16, f: 9, v: 7, hq: { s: 10, f: 8, v: 2 }, field: { s: 6, f: 1, v: 5 } },
  { sn: 31, code: "M141-M", post: "Mineral Development Officer", bps: 16, s: 9, f: 7, v: 2, hq: { s: 3, f: 2, v: 1 }, field: { s: 6, f: 5, v: 1 } },
  { sn: 32, code: "S304-M", post: "Survey & Drawing Officer", bps: 16, s: 9, f: 5, v: 4, hq: { s: 1, f: 0, v: 1 }, field: { s: 8, f: 5, v: 3 } },
  { sn: 33, code: "H144-M", post: "Hardware Technician", bps: 16, s: 2, f: 1, v: 1, hq: { s: 2, f: 1, v: 1 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 34, code: "C176-M", post: "Computer Programmer", bps: 16, s: 2, f: 0, v: 2, hq: { s: 2, f: 0, v: 2 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 35, code: "A012-M", post: "Accounts Officer", bps: 16, s: 2, f: 1, v: 1, hq: { s: 2, f: 1, v: 1 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 36, code: "A097-M", post: "Assistant", bps: 16, s: 36, f: 17, v: 19, hq: { s: 16, f: 11, v: 5 }, field: { s: 20, f: 6, v: 14 } },

  // Non-Gazetted BS 01 to 15
  { sn: 37, code: "S216-M", post: "Stenographer", bps: 15, s: 12, f: 8, v: 4, hq: { s: 7, f: 4, v: 3 }, field: { s: 5, f: 4, v: 1 } },
  { sn: 38, code: "A334-M", post: "Accountant", bps: 15, s: 7, f: 0, v: 7, hq: { s: 4, f: 0, v: 4 }, field: { s: 3, f: 0, v: 3 } },
  { sn: 39, code: "H030-M", post: "Head Draftsman", bps: 15, s: 1, f: 1, v: 0, hq: { s: 1, f: 1, v: 0 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 40, code: "S322-M", post: "Senior Auditor", bps: 14, s: 1, f: 0, v: 1, hq: { s: 1, f: 0, v: 1 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 41, code: "S078-M", post: "Senior Clerk", bps: 14, s: 30, f: 21, v: 9, hq: { s: 15, f: 9, v: 6 }, field: { s: 15, f: 12, v: 3 } },
  { sn: 42, code: "D222-M", post: "Draftsman", bps: 14, s: 12, f: 8, v: 4, hq: { s: 6, f: 5, v: 1 }, field: { s: 6, f: 3, v: 3 } },
  { sn: 43, code: "C174-M", post: "Computer Operator", bps: 12, s: 6, f: 3, v: 3, hq: { s: 4, f: 1, v: 3 }, field: { s: 2, f: 2, v: 0 } },
  { sn: 44, code: "C291-M", post: "CAD Operator", bps: 12, s: 5, f: 0, v: 5, hq: { s: 5, f: 0, v: 5 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 45, code: "R087-M", post: "Royalty Inspector", bps: 11, s: 17, f: 2, v: 15, hq: { s: 1, f: 1, v: 0 }, field: { s: 16, f: 1, v: 15 } },
  { sn: 46, code: "F031-M", post: "Field Inspector", bps: 11, s: 49, f: 0, v: 49, hq: { s: 0, f: 0, v: 0 }, field: { s: 49, f: 0, v: 49 } },
  { sn: 47, code: "D180-M", post: "Driller", bps: 11, s: 2, f: 2, v: 0, hq: { s: 2, f: 2, v: 0 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 48, code: "T028-M", post: "Technician", bps: 11, s: 2, f: 2, v: 0, hq: { s: 2, f: 2, v: 0 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 49, code: "D773-M", post: "Diesel Engine Operator", bps: 11, s: 2, f: 2, v: 0, hq: { s: 2, f: 2, v: 0 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 50, code: "J019-F", post: "Junior Clerk", bps: 11, s: 23, f: 18, v: 5, hq: { s: 10, f: 9, v: 1 }, field: { s: 13, f: 9, v: 4 } },
  { sn: 51, code: "J018-M", post: "Junior Auditor", bps: 9, s: 2, f: 0, v: 2, hq: { s: 2, f: 0, v: 2 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 52, code: "S307-M", post: "Surveyor", bps: 9, s: 15, f: 5, v: 10, hq: { s: 1, f: 0, v: 1 }, field: { s: 14, f: 5, v: 9 } },
  { sn: 53, code: "E034-M", post: "Electrician", bps: 6, s: 2, f: 2, v: 0, hq: { s: 0, f: 0, v: 0 }, field: { s: 2, f: 2, v: 0 } },
  { sn: 54, code: "T061-M", post: "Tracer", bps: 9, s: 3, f: 3, v: 0, hq: { s: 3, f: 3, v: 0 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 55, code: "D186-M", post: "Driver", bps: 5, s: 34, f: 26, v: 8, hq: { s: 13, f: 9, v: 4 }, field: { s: 21, f: 17, v: 4 } },
  { sn: 56, code: "H076-M", post: "Helper", bps: 4, s: 2, f: 2, v: 0, hq: { s: 2, f: 2, v: 0 }, field: { s: 0, f: 0, v: 0 } },
  { sn: 57, code: "C054-M", post: "Chainman", bps: 1, s: 41, f: 40, v: 1, hq: { s: 2, f: 2, v: 0 }, field: { s: 39, f: 38, v: 1 } },
  { sn: 58, code: "N006-M", post: "Naib Qasid", bps: 1, s: 103, f: 102, v: 1, hq: { s: 39, f: 39, v: 0 }, field: { s: 64, f: 63, v: 1 } },
  { sn: 59, code: "F023-M", post: "Ferroprinter", bps: 1, s: 1, f: 1, v: 0, hq: { s: 0, f: 0, v: 0 }, field: { s: 1, f: 1, v: 0 } },
  { sn: 60, code: "C112-M", post: "Chowkidar", bps: 1, s: 18, f: 17, v: 1, hq: { s: 2, f: 2, v: 0 }, field: { s: 16, f: 15, v: 1 } },
  { sn: 61, code: "M019-M", post: "Mali", bps: 1, s: 3, f: 3, v: 0, hq: { s: 0, f: 0, v: 0 }, field: { s: 3, f: 3, v: 0 } },
  { sn: 62, code: "B004-M", post: "Bahishti", bps: 1, s: 2, f: 2, v: 0, hq: { s: 0, f: 0, v: 0 }, field: { s: 2, f: 2, v: 0 } },
  { sn: 63, code: "S325-M", post: "Sweeper", bps: 1, s: 17, f: 17, v: 0, hq: { s: 7, f: 7, v: 0 }, field: { s: 10, f: 10, v: 0 } },
  { sn: 64, code: "D011-M", post: "Dak Runner", bps: 1, s: 1, f: 1, v: 0, hq: { s: 0, f: 0, v: 0 }, field: { s: 1, f: 1, v: 0 } }
];

console.log('Summary:', summary);
console.log('Offices count:', offices.length);
console.log('Cadre count:', cadre.length);

module.exports = { summary, offices, cadre };

