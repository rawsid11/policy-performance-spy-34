// Mock data structure matching the renewals data schema
export interface RenewalsData {
  POLICYNUMBER: string;
  BRANCHCODE: string;
  BANKTECHNICALID: string;
  CHANNEL_NAME: string;
  REGION_NAME: string;
  PRODUCTNAME: string;
  POLICYPAYMENTMECHANISM: string;
  INFORCE_COUNT: number;
  CLAIM_COUNT: number;
  WITHDRAWAL_COUNT: number;
  USER_DUE_MONTH: string;
  RP_DUES: number;
  COLL_MONTH: string;
  COLLECTION_AMT: number;
}

// Sample data for demonstration
export const mockRenewalsData: RenewalsData[] = [
  {
    POLICYNUMBER: "POL001",
    BRANCHCODE: "BR001",
    BANKTECHNICALID: "BANK001",
    CHANNEL_NAME: "Direct Sales",
    REGION_NAME: "North",
    PRODUCTNAME: "Term Life",
    POLICYPAYMENTMECHANISM: "Auto Debit",
    INFORCE_COUNT: 1,
    CLAIM_COUNT: 0,
    WITHDRAWAL_COUNT: 0,
    USER_DUE_MONTH: "AUG-25",
    RP_DUES: 5000,
    COLL_MONTH: "AUG-25",
    COLLECTION_AMT: 5000
  },
  // Additional mock data would go here...
];

// KPI aggregated data for charts
export const kpiOverview = {
  totalPolicies: 12847,
  totalDues: 64235000,
  totalCollections: 58412000,
  collectionRate: 91.1,
  concerningPolicies: 342,
  premiumLeakage: 5823000,
  surrenderPropensity: 4.2
};

export const regionPerformance = [
  { region: "North", policies: 3200, collectionRate: 94.2, collections: 18500000 },
  { region: "South", policies: 2800, collectionRate: 89.7, collections: 15200000 },
  { region: "East", policies: 3500, collectionRate: 87.3, collections: 19800000 },
  { region: "West", policies: 2400, collectionRate: 92.8, collections: 12400000 },
  { region: "Central", policies: 947, collectionRate: 86.1, collections: 8500000 }
];

export const channelPerformance = [
  { channel: "Direct Sales", score: 89.5, policies: 4200, collections: 22000000 },
  { channel: "Bancassurance", score: 87.2, policies: 3800, collections: 19500000 },
  { channel: "Broker", score: 82.4, policies: 2900, collections: 14200000 },
  { channel: "Online", score: 91.8, policies: 1500, collections: 8800000 },
  { channel: "Corporate", score: 76.3, policies: 447, collections: 3900000 }
];

export const productContribution = [
  { product: "Term Life", contribution: 32.5, amount: 19000000 },
  { product: "Whole Life", contribution: 28.7, amount: 16800000 },
  { product: "ULIP", contribution: 18.2, amount: 10600000 },
  { product: "Endowment", contribution: 12.4, amount: 7200000 },
  { product: "Health", contribution: 8.2, amount: 4800000 }
];

export const paymentMechanismSuccess = [
  { mechanism: "Auto Debit", successRate: 94.7, avgCollection: 4850 },
  { mechanism: "Credit Card", successRate: 89.2, avgCollection: 5200 },
  { mechanism: "Net Banking", successRate: 87.5, avgCollection: 4920 },
  { mechanism: "UPI", successRate: 91.3, avgCollection: 3800 },
  { mechanism: "Cash", successRate: 76.8, avgCollection: 3200 },
  { mechanism: "Cheque", successRate: 72.4, avgCollection: 5800 }
];

export const monthlyTrends = [
  { month: "JAN-25", policies: 11200, collectionRate: 88.5, collections: 52000000 },
  { month: "FEB-25", policies: 11800, collectionRate: 89.2, collections: 54500000 },
  { month: "MAR-25", policies: 12100, collectionRate: 90.1, collections: 56200000 },
  { month: "APR-25", policies: 12300, collectionRate: 87.8, collections: 55800000 },
  { month: "MAY-25", policies: 12500, collectionRate: 89.7, collections: 57400000 },
  { month: "JUN-25", policies: 12650, collectionRate: 91.2, collections: 58900000 },
  { month: "JUL-25", policies: 12720, collectionRate: 90.8, collections: 59200000 },
  { month: "AUG-25", policies: 12847, collectionRate: 91.1, collections: 58412000 }
];

export const branchProductivity = [
  { branch: "BR001", region: "North", productivity: 18750, activePolcies: 450 },
  { branch: "BR002", region: "South", productivity: 16200, activePolcies: 380 },
  { branch: "BR003", region: "East", productivity: 19800, activePolcies: 520 },
  { branch: "BR004", region: "West", productivity: 15600, activePolcies: 340 },
  { branch: "BR005", region: "Central", productivity: 14200, activePolcies: 290 }
];

export const concerningCases = [
  { product: "Term Life", cases: 89, potentialLoss: 1250000 },
  { product: "Whole Life", cases: 76, potentialLoss: 1680000 },
  { product: "ULIP", cases: 65, potentialLoss: 980000 },
  { product: "Endowment", cases: 58, potentialLoss: 1120000 },
  { product: "Health", cases: 54, potentialLoss: 793000 }
];