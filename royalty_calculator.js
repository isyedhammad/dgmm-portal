/**
 * Directorate General of Mines & Minerals, Government of the Punjab
 * Statutory Royalty & Dead Rent Calculation Engine
 * 
 * Pursuant to:
 * - Notification No. SOT(M&MD)5-3/2007(Vol-II) dated 1st July 2024
 * - Punjab Mining Concession Rules (PMCR) 2002 (Rules 65, 66, 135, 141)
 * - Statutory Penalty: 1% per month until 31/12/2025; 10% per month since 01/01/2026
 */

const ROYALTY_NOTIFICATION_2024 = [
  { sr: 1, mineral: "Argillaceous Clay", rate: 250, unit: "Per Metric Ton", note: "Excluding titles granted for cement manufacturing", defaultDeadRentHalfYearly: 400 },
  { sr: 2, mineral: "Ball Clay", rate: 200, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 400 },
  { sr: 3, mineral: "Barytes", rate: 70, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 250 },
  { sr: 4, mineral: "Basalt", rate: 70, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 250 },
  { sr: 5, mineral: "Bauxite", rate: 250, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 500 },
  { sr: 6, mineral: "Bentonite", rate: 200, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 400 },
  { sr: 7, mineral: "Brine", rate: 300, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 500 },
  { sr: 8, mineral: "Calcite", rate: 200, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 350 },
  { sr: 9, mineral: "Celestite", rate: 200, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 350 },
  { sr: 10, mineral: "Chalk", rate: 200, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 350 },
  { sr: 11, mineral: "China Clay", rate: 200, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 400 },
  { sr: 12, mineral: "Coal", rate: 500, unit: "Per Metric Ton", note: "Standard Coal Concessions (PMCR Rule 135)", defaultDeadRentHalfYearly: 1000 },
  { sr: 13, mineral: "Diorite", rate: 200, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 350 },
  { sr: 14, mineral: "Dolomite", rate: 60, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 250 },
  { sr: 15, mineral: "Fireclay", rate: 200, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 400 },
  { sr: 16, mineral: "Fuller Earth", rate: 100, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 300 },
  { sr: 17, mineral: "Granite", rate: 200, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 500 },
  { sr: 18, mineral: "Gravel", rate: 200, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 350 },
  { sr: 19, mineral: "Gypsum", rate: 200, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 450 },
  { sr: 20, mineral: "Iron Ore (Small Scale Mining)", rate: 250, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 500 },
  { sr: 21, mineral: "Iron Ore (Large Scale Mining)", rate: 500, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 1250 },
  { sr: 22, mineral: "Lake Salt", rate: 70, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 250 },
  { sr: 23, mineral: "Laterite", rate: 250, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 450 },
  { sr: 24, mineral: "Limestone (Small Scale Mining)", rate: 120, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 350 },
  { sr: 25, mineral: "Limestone (Large Scale Mining)", rate: 250, unit: "Per Metric Ton", note: "Excluding titles granted for cement manufacturing", defaultDeadRentHalfYearly: 750 },
  { sr: 26, mineral: "Marble", rate: 200, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 500 },
  { sr: 27, mineral: "Ocher", rate: 250, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 400 },
  { sr: 28, mineral: "Ordinary Sand", rate: 100, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 250 },
  { sr: 29, mineral: "Quartzite", rate: 30, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 200 },
  { sr: 30, mineral: "Rock Salt", rate: 400, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 800 },
  { sr: 31, mineral: "Sandstone", rate: 60, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 250 },
  { sr: 32, mineral: "Shale", rate: 20, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 150 },
  { sr: 33, mineral: "Silica Sand", rate: 200, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 450 },
  { sr: 34, mineral: "Slatestone", rate: 200, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 350 },
  { sr: 35, mineral: "Tar Sand", rate: 60, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 250 },
  { sr: 36, mineral: "Tuff", rate: 200, unit: "Per Metric Ton", defaultDeadRentHalfYearly: 350 }
];

/**
 * Calculates statutory royalty, dead rent, and penalty for a 6-month period
 */
function calculateRoyaltyAssessment(params) {
  const {
    leaseRef = "CUSTOM-LEASE",
    titleholder = "Concessionaire",
    mineralName = "Coal",
    district = "Chakwal",
    branch = "SSM",
    acres = 100,
    deadRentRateHalfYearly = 1000,
    isAuctioned = false,
    noPenalty = false, // When true, waives all delay penalties (0% penalty)
    period = "JAN_JUN", // "JAN_JUN" | "JUL_DEC"
    year = 2026,
    monthlyProduction = [0, 0, 0, 0, 0, 0], // Metric tons for the 6 months
    monthlyPayments = [0, 0, 0, 0, 0, 0],   // Payments deposited by lessee
    assessmentDate = new Date("2026-10-22")
  } = params;

  // Find notified rate
  let notifiedItem = ROYALTY_NOTIFICATION_2024.find(m => m.mineral.toLowerCase() === mineralName.toLowerCase());
  if (!notifiedItem) {
    notifiedItem = ROYALTY_NOTIFICATION_2024.find(m => m.mineral.toLowerCase().includes(mineralName.toLowerCase())) || ROYALTY_NOTIFICATION_2024[11]; // default Coal
  }
  const royaltyRatePerTon = notifiedItem.rate;

  // 6 months definition
  const monthNames = period === "JAN_JUN"
    ? ["January", "February", "March", "April", "May", "June"]
    : ["July", "August", "September", "October", "November", "December"];

  const monthIndices = period === "JAN_JUN" ? [0, 1, 2, 3, 4, 5] : [6, 7, 8, 9, 10, 11];

  let totalProductionTons = 0;
  let totalRoyalty = 0;
  let totalPaid = 0;
  let totalPenalty = 0;

  const monthlyBreakdown = monthNames.map((mName, i) => {
    const prodTons = Number(monthlyProduction[i]) || 0;
    const paid = Number(monthlyPayments[i]) || 0;
    totalProductionTons += prodTons;

    // Direct royalty applies only if NOT auctioned
    const royaltyForMonth = isAuctioned ? 0 : (prodTons * royaltyRatePerTon);
    totalRoyalty += royaltyForMonth;
    totalPaid += paid;

    // Statutory Due Date: 14th day of following month (PMCR 2002)
    const monthIndex = monthIndices[i];
    let dueYear = year;
    let dueMonthIndex = monthIndex + 1;
    if (dueMonthIndex > 11) {
      dueMonthIndex = 0;
      dueYear = year + 1;
    }
    const dueDate = new Date(Date.UTC(dueYear, dueMonthIndex, 14));

    // Arrears / Default
    const arrears = Math.max(0, royaltyForMonth - paid);
    let penaltyAmount = 0;
    let monthsDelayed = 0;

    if (arrears > 0 && assessmentDate > dueDate) {
      // Calculate months of delay
      const diffMs = assessmentDate - dueDate;
      monthsDelayed = Math.ceil(diffMs / (1000 * 60 * 60 * 24 * 30.4375));
      if (monthsDelayed < 1) monthsDelayed = 1;

      if (!noPenalty) {
        // Penalty Rule:
        // "1% per month penalty until 2025 and 10% per month since 01/01/2026"
        const transitionDate = new Date(Date.UTC(2026, 0, 1)); // 01/01/2026

        let monthsPre2026 = 0;
        let monthsPost2026 = 0;

        // Iterate through each month of delay to assign correct rate
        for (let m = 0; m < monthsDelayed; m++) {
          const curDelayedDate = new Date(dueDate.getTime() + m * (30.4375 * 24 * 60 * 60 * 1000));
          if (curDelayedDate < transitionDate) {
            monthsPre2026++;
          } else {
            monthsPost2026++;
          }
        }

        const penaltyPre2026 = arrears * (0.01 * monthsPre2026);
        const penaltyPost2026 = arrears * (0.10 * monthsPost2026);
        penaltyAmount = Math.round(penaltyPre2026 + penaltyPost2026);
      } else {
        penaltyAmount = 0;
      }
    }

    totalPenalty += penaltyAmount;

    return {
      monthNumber: i + 1,
      monthName: mName,
      productionTons: prodTons,
      royaltyRate: royaltyRatePerTon,
      royaltyCalculated: royaltyForMonth,
      paidAmount: paid,
      arrears: arrears,
      dueDateFormatted: `${dueYear}-${String(dueMonthIndex + 1).padStart(2, '0')}-14`,
      monthsDelayed: monthsDelayed,
      penaltyCalculated: penaltyAmount,
      totalMonthlyDemand: royaltyForMonth + penaltyAmount
    };
  });

  // 6-Month Statutory Dead Rent:
  // "dead rent according to acres multiplied by the notified dead rent rate"
  const totalDeadRent = Math.round(Number(acres) * Number(deadRentRateHalfYearly));

  // "tell me only whichever is higher"
  let higherAmount = 0;
  let higherType = "";
  let reason = "";

  if (isAuctioned) {
    higherType = "Auction Contract Zone";
    higherAmount = totalDeadRent;
    reason = "Royalty rights are auctioned via public bidding. Concessionaire is exempt from monthly production royalty; lease subject to auction bid terms or minimum statutory dead rent.";
  } else {
    if (totalRoyalty >= totalDeadRent) {
      higherAmount = totalRoyalty;
      higherType = "Royalty (Production Based)";
      reason = `Total 6-month production royalty of PKR ${totalRoyalty.toLocaleString()} exceeds statutory dead rent of PKR ${totalDeadRent.toLocaleString()} by PKR ${(totalRoyalty - totalDeadRent).toLocaleString()}. Royalty rate applies.`;
    } else {
      higherAmount = totalDeadRent;
      higherType = "Dead Rent (Acreage Based)";
      reason = `Statutory dead rent of PKR ${totalDeadRent.toLocaleString()} exceeds reported production royalty of PKR ${totalRoyalty.toLocaleString()} by PKR ${(totalDeadRent - totalRoyalty).toLocaleString()}. Concessionaire must pay minimum statutory Dead Rent (PMCR Rule 135).`;
    }
  }

  // Net Assessment Demand
  const grandTotalPayable = higherAmount + totalPenalty;
  const netBalancePayable = Math.max(0, grandTotalPayable - totalPaid);

  return {
    leaseRef,
    titleholder,
    mineral: notifiedItem.mineral,
    royaltyRatePerTon,
    district,
    branch,
    acres: Number(acres),
    deadRentRateHalfYearly: Number(deadRentRateHalfYearly),
    isAuctioned,
    noPenalty: !!noPenalty,
    period: period === "JAN_JUN" ? "1st January - 30th June" : "1st July - 31st December",
    year,
    monthlyBreakdown,
    totalProductionTons,
    totalRoyalty,
    totalDeadRent,
    whicheverIsHigher: {
      type: higherType,
      amount: higherAmount,
      royalty: totalRoyalty,
      deadRent: totalDeadRent,
      difference: Math.abs(totalRoyalty - totalDeadRent),
      reason: reason
    },
    totalPaid,
    totalPenalty,
    grandTotalPayable,
    netBalancePayable,
    isFullyPaid: netBalancePayable === 0
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    ROYALTY_NOTIFICATION_2024,
    calculateRoyaltyAssessment
  };
} else {
  window.ROYALTY_NOTIFICATION_2024 = ROYALTY_NOTIFICATION_2024;
  window.calculateRoyaltyAssessment = calculateRoyaltyAssessment;
}
