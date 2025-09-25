// src/data/investments.ts

export interface InvestmentSummary {
  totalPortfolio: number;
  activeInvestments: number;
  monthlyReturns: number;
  averageROI: number;
  totalReturns: number;
  growthRate: number;
}

export const investmentSummary: InvestmentSummary = {
  totalPortfolio: 850000,
  activeInvestments: 12,
  monthlyReturns: 12000,
  averageROI: 14.5,
  totalReturns: 128000,
  growthRate: 18.2
};

export interface RecentInvestment {
  id: number;
  project: string;
  amount: number;
  date: string;
  status: 'aktif' | 'selesai';
  currentValue: number;
  roi: number;
}

export const recentInvestments: RecentInvestment[] = [
  {
    id: 1,
    project: 'Emerald Hills Residences',
    amount: 150000,
    date: '2024-02-15',
    status: 'aktif',
    currentValue: 165000,
    roi: 10.0
  },
  {
    id: 2,
    project: 'Kompleks Golden Valley',
    amount: 200000,
    date: '2024-01-10',
    status: 'aktif',
    currentValue: 235000,
    roi: 17.5
  },
  {
    id: 3,
    project: 'Taman Sunset Gardens',
    amount: 100000,
    date: '2023-12-05',
    status: 'selesai',
    currentValue: 125000,
    roi: 25.0
  },
  {
    id: 4,
    project: 'Apartemen Marina Luxury',
    amount: 180000,
    date: '2024-03-01',
    status: 'aktif',
    currentValue: 198000,
    roi: 10.0
  },
  {
    id: 5,
    project: 'Kompleks Tech Hub',
    amount: 250000,
    date: '2023-11-20',
    status: 'selesai',
    currentValue: 312500,
    roi: 25.0
  }
];

export interface PerformanceData {
  month: string;
  value: number;
}

export const performanceData: PerformanceData[] = [
  { month: 'Jan', value: 720000 },
  { month: 'Feb', value: 750000 },
  { month: 'Mar', value: 780000 },
  { month: 'Apr', value: 810000 },
  { month: 'May', value: 825000 },
  { month: 'Jun', value: 850000 },
  { month: 'Jul', value: 860000 },
  { month: 'Aug', value: 875000 },
  { month: 'Sep', value: 890000 },
  { month: 'Oct', value: 910000 },
  { month: 'Nov', value: 925000 },
  { month: 'Dec', value: 940000 }
];

export interface UpcomingPayout {
  project: string;
  amount: number;
  date: string;
  type: string;
}

export const upcomingPayouts: UpcomingPayout[] = [
  { project: 'Emerald Hills', amount: 4500, date: '2024-04-15', type: 'Dividen Bulanan' },
  { project: 'Golden Valley', amount: 6200, date: '2024-04-20', type: 'Keuntungan Kuartalan' },
  { project: 'Marina View', amount: 3800, date: '2024-04-25', type: 'Dividen Bulanan' },
  { project: 'Sunset Gardens', amount: 2500, date: '2024-05-01', type: 'Keuntungan Kuartalan' },
  { project: 'Tech Hub Complex', amount: 7000, date: '2024-05-10', type: 'Dividen Bulanan' }
];

export interface MarketplaceProject {
  id: number;
  name: string;
  location: string;
  type: 'Hunian' | 'Komersial' | 'Campuran';
  totalValue: number;
  fundingNeeded: number;
  fundingRaised: number;
  expectedROI: number;
  duration: number; // in months
  riskLevel: 'Rendah' | 'Sedang' | 'Tinggi';
  status: 'Aktif' | 'Terdanai Penuh' | 'Akan Datang';
  investors: number;
  rating: number;
  image: string;
  developer: string;
  startDate: string;
  completionDate: string;
}

export const marketplaceProjects: MarketplaceProject[] = [
  {
    id: 1,
    name: 'Apartemen Marina Luxury',
    location: 'Jakarta Utara',
    type: 'Hunian',
    totalValue: 5600000,
    fundingNeeded: 2800000,
    fundingRaised: 1800000,
    expectedROI: 22,
    duration: 18,
    riskLevel: 'Sedang',
    status: 'Aktif',
    investors: 24,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=400',
    developer: 'PT Premium Properties',
    startDate: '2024-04-01',
    completionDate: '2025-10-01'
  },
  {
    id: 2,
    name: 'Plaza Bisnis Central',
    location: 'Jakarta Pusat',
    type: 'Komersial',
    totalValue: 8200000,
    fundingNeeded: 4100000,
    fundingRaised: 2500000,
    expectedROI: 18,
    duration: 24,
    riskLevel: 'Rendah',
    status: 'Aktif',
    investors: 32,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400',
    developer: 'PT Urban Development',
    startDate: '2024-05-01',
    completionDate: '2026-05-01'
  },
  {
    id: 3,
    name: 'Villa Green Valley',
    location: 'Bogor',
    type: 'Hunian',
    totalValue: 3400000,
    fundingNeeded: 1700000,
    fundingRaised: 900000,
    expectedROI: 25,
    duration: 15,
    riskLevel: 'Tinggi',
    status: 'Aktif',
    investors: 18,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400',
    developer: 'PT EcoLiving Developers',
    startDate: '2024-03-15',
    completionDate: '2025-06-15'
  },
  {
    id: 4,
    name: 'Kompleks Tech Hub',
    location: 'Tangerang',
    type: 'Campuran',
    totalValue: 6800000,
    fundingNeeded: 3400000,
    fundingRaised: 3400000,
    expectedROI: 20,
    duration: 20,
    riskLevel: 'Sedang',
    status: 'Terdanai Penuh',
    investors: 45,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/442574/pexels-photo-442574.jpeg?auto=compress&cs=tinysrgb&w=400',
    developer: 'PT Future Spaces',
    startDate: '2024-02-01',
    completionDate: '2025-10-01'
  },
  {
    id: 5,
    name: 'Hunian Ramah Lingkungan',
    location: 'Bekasi',
    type: 'Hunian',
    totalValue: 4500000,
    fundingNeeded: 2250000,
    fundingRaised: 0,
    expectedROI: 20,
    duration: 20,
    riskLevel: 'Rendah',
    status: 'Akan Datang',
    investors: 0,
    rating: 0,
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400',
    developer: 'PT Green Living Solutions',
    startDate: '2024-07-01',
    completionDate: '2026-03-01'
  },
  {
    id: 6,
    name: 'Menara Perkantoran Pintar',
    location: 'Surabaya',
    type: 'Komersial',
    totalValue: 9000000,
    fundingNeeded: 4500000,
    fundingRaised: 1000000,
    expectedROI: 17,
    duration: 28,
    riskLevel: 'Sedang',
    status: 'Aktif',
    investors: 15,
    rating: 4.5,
    image: 'https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=400',
    developer: 'PT Innovate Spaces',
    startDate: '2024-06-01',
    completionDate: '2026-10-01'
  }
];

export interface PortfolioInvestment {
  id: number;
  projectName: string;
  type: 'Hunian' | 'Komersial' | 'Campuran';
  investmentAmount: number;
  currentValue: number;
  returns: number;
  roi: number;
  status: 'Aktif' | 'Selesai' | 'Menunggu';
  startDate: string;
  expectedCompletion: string;
  monthlyDividend: number;
  riskLevel: 'Rendah' | 'Sedang' | 'Tinggi';
}

export const portfolioInvestments: PortfolioInvestment[] = [
  {
    id: 1,
    projectName: 'Emerald Hills Residences',
    type: 'Hunian',
    investmentAmount: 150000,
    currentValue: 165000,
    returns: 15000,
    roi: 10.0,
    status: 'Aktif',
    startDate: '2024-02-15',
    expectedCompletion: '2024-12-15',
    monthlyDividend: 1800,
    riskLevel: 'Sedang'
  },
  {
    id: 2,
    projectName: 'Kompleks Golden Valley',
    type: 'Komersial',
    investmentAmount: 200000,
    currentValue: 235000,
    returns: 35000,
    roi: 17.5,
    status: 'Aktif',
    startDate: '2024-01-10',
    expectedCompletion: '2025-06-10',
    monthlyDividend: 2800,
    riskLevel: 'Rendah'
  },
  {
    id: 3,
    projectName: 'Taman Sunset Gardens',
    type: 'Hunian',
    investmentAmount: 100000,
    currentValue: 125000,
    returns: 25000,
    roi: 25.0,
    status: 'Selesai',
    startDate: '2023-12-05',
    expectedCompletion: '2024-08-05',
    monthlyDividend: 0,
    riskLevel: 'Tinggi'
  },
  {
    id: 4,
    projectName: 'Menara Marina Luxury',
    type: 'Campuran',
    investmentAmount: 180000,
    currentValue: 198000,
    returns: 18000,
    roi: 10.0,
    status: 'Aktif',
    startDate: '2024-03-01',
    expectedCompletion: '2025-09-01',
    monthlyDividend: 2200,
    riskLevel: 'Sedang'
  },
  {
    id: 5,
    projectName: 'Pusat Bisnis Central',
    type: 'Komersial',
    investmentAmount: 220000,
    currentValue: 242000,
    returns: 22000,
    roi: 10.0,
    status: 'Aktif',
    startDate: '2024-01-20',
    expectedCompletion: '2025-07-20',
    monthlyDividend: 3200,
    riskLevel: 'Rendah'
  },
  {
    id: 6,
    projectName: 'Villa Green Valley',
    type: 'Hunian',
    investmentAmount: 80000,
    currentValue: 85000,
    returns: 5000,
    roi: 6.25,
    status: 'Menunggu',
    startDate: '2024-04-10',
    expectedCompletion: '2025-06-10',
    monthlyDividend: 1000,
    riskLevel: 'Tinggi'
  }
];

export const portfolioBreakdown = [
  { category: 'Hunian', value: 415000, percentage: 48.8, color: 'bg-blue-500' },
  { category: 'Komersial', value: 277000, percentage: 32.6, color: 'bg-green-500' },
  { category: 'Campuran', value: 158000, percentage: 18.6, color: 'bg-purple-500' }
];