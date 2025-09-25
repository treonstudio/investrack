// src/data/financial.ts

export interface FinancialMetric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  color: string;
}

export const financialMetrics: FinancialMetric[] = [
  {
    title: 'Total Pendapatan',
    value: '$4.2M',
    change: '+12.5%',
    trend: 'up',
    color: 'text-green-600'
  },
  {
    title: 'Total Pengeluaran',
    value: '$2.8M',
    change: '+8.2%',
    trend: 'up',
    color: 'text-red-600'
  },
  {
    title: 'Laba Bersih',
    value: '$1.4M',
    change: '+18.7%',
    trend: 'up',
    color: 'text-green-600'
  },
  {
    title: 'Arus Kas',
    value: '$850K',
    change: '-5.2%',
    trend: 'down',
    color: 'text-orange-600'
  }
];

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: string;
  project: string;
}

export const recentTransactions: Transaction[] = [
  {
    id: 1,
    description: 'Pembelian Material - Semen & Besi',
    amount: -45000,
    date: '2024-03-15',
    category: 'Material',
    project: 'Emerald Hills'
  },
  {
    id: 2,
    description: 'Dana Investor - Fase 2',
    amount: 500000,
    date: '2024-03-14',
    category: 'Investasi',
    project: 'Golden Valley'
  },
  {
    id: 3,
    description: 'Pembayaran Kontraktor - Pekerjaan Pondasi',
    amount: -75000,
    date: '2024-03-13',
    category: 'Tenaga Kerja',
    project: 'Emerald Hills'
  },
  {
    id: 4,
    description: 'Sewa Alat - Excavator',
    amount: -12000,
    date: '2024-03-12',
    category: 'Peralatan',
    project: 'Sunset Gardens'
  },
  {
    id: 5,
    description: 'Akuisisi Lahan - Lokasi Baru',
    amount: -1200000,
    date: '2024-03-10',
    category: 'Lahan',
    project: 'Central Plaza'
  },
  {
    id: 6,
    description: 'Pendapatan Penjualan - Unit A-10',
    amount: 350000,
    date: '2024-03-08',
    category: 'Penjualan',
    project: 'Marina Luxury'
  },
  {
    id: 7,
    description: 'Gaji Karyawan - Maret',
    amount: -150000,
    date: '2024-03-05',
    category: 'SDM',
    project: 'All Projects'
  }
];

export interface BudgetOverviewItem {
  project: string;
  budget: number;
  spent: number;
  remaining: number;
}

export const budgetOverview: BudgetOverviewItem[] = [
  { project: 'Emerald Hills', budget: 2400000, spent: 1800000, remaining: 600000 },
  { project: 'Golden Valley', budget: 3200000, spent: 800000, remaining: 2400000 },
  { project: 'Sunset Gardens', budget: 1800000, spent: 1700000, remaining: 100000 },
  { project: 'Marina Luxury', budget: 5600000, spent: 2200000, remaining: 3400000 },
  { project: 'Central Plaza', budget: 8200000, spent: 800000, remaining: 7400000 }
];

export interface BudgetCategory {
  category: string;
  budgeted: number;
  spent: number;
  remaining: number;
  items: { name: string; budgeted: number; spent: number }[];
}

export const budgetCategories: BudgetCategory[] = [
  {
    category: 'Material',
    budgeted: 800000,
    spent: 620000,
    remaining: 180000,
    items: [
      { name: 'Semen', budgeted: 150000, spent: 125000 },
      { name: 'Besi Beton', budgeted: 300000, spent: 285000 },
      { name: 'Bata Merah', budgeted: 200000, spent: 180000 },
      { name: 'Pasir & Kerikil', budgeted: 150000, spent: 30000 }
    ]
  },
  {
    category: 'Tenaga Kerja',
    budgeted: 600000,
    spent: 450000,
    remaining: 150000,
    items: [
      { name: 'Pekerja Konstruksi', budgeted: 300000, spent: 250000 },
      { name: 'Teknisi Ahli', budgeted: 200000, spent: 150000 },
      { name: 'Supervisi Proyek', budgeted: 100000, spent: 50000 }
    ]
  },
  {
    category: 'Peralatan',
    budgeted: 400000,
    spent: 320000,
    remaining: 80000,
    items: [
      { name: 'Sewa Alat Berat', budgeted: 200000, spent: 180000 },
      { name: 'Perkakas & Peralatan', budgeted: 100000, spent: 85000 },
      { name: 'Transportasi', budgeted: 100000, spent: 55000 }
    ]
  },
  {
    category: 'Perizinan & Legal',
    budgeted: 150000,
    spent: 135000,
    remaining: 15000,
    items: [
      { name: 'Izin Mendirikan Bangunan', budgeted: 80000, spent: 80000 },
      { name: 'Dokumentasi Legal', budgeted: 50000, spent: 45000 },
      { name: 'Izin Lingkungan', budgeted: 20000, spent: 10000 }
    ]
  },
  {
    category: 'Pemasaran',
    budgeted: 100000,
    spent: 70000,
    remaining: 30000,
    items: [
      { name: 'Iklan Digital', budgeted: 50000, spent: 40000 },
      { name: 'Sponsorship Acara', budgeted: 30000, spent: 20000 },
      { name: 'Brosur & Flyer', budgeted: 20000, spent: 10000 }
    ]
  }
];

export interface ReportType {
  title: string;
  description: string;
  icon: string;
  lastGenerated: string;
  size: string;
}

export const reportTypes: ReportType[] = [
  {
    title: 'Laporan Laba Rugi',
    description: 'Analisis komprehensif pendapatan dan pengeluaran',
    icon: '📊',
    lastGenerated: '2024-03-10',
    size: '2.4 MB'
  },
  {
    title: 'Laporan Arus Kas',
    description: 'Pelacakan arus masuk dan keluar kas',
    icon: '💰',
    lastGenerated: '2024-03-10',
    size: '1.8 MB'
  },
  {
    title: 'Neraca',
    description: 'Ringkasan aset, kewajiban, dan ekuitas',
    icon: '⚖️',
    lastGenerated: '2024-03-08',
    size: '1.5 MB'
  },
  {
    title: 'Analisis Biaya Proyek',
    description: 'Rincian biaya detail per proyek',
    icon: '🏗️',
    lastGenerated: '2024-03-12',
    size: '3.2 MB'
  },
  {
    title: 'Analisis ROI',
    description: 'Perhitungan tingkat pengembalian investasi',
    icon: '📈',
    lastGenerated: '2024-03-09',
    size: '1.9 MB'
  },
  {
    title: 'Anggaran vs Realisasi',
    description: 'Analisis kinerja anggaran',
    icon: '🎯',
    lastGenerated: '2024-03-11',
    size: '2.1 MB'
  }
];

export const financialSummary = {
  totalRevenue: 4200000,
  totalExpenses: 2800000,
  netProfit: 1400000,
  profitMargin: 33.3,
  monthlyGrowth: 12.5,
  quarterlyGrowth: 28.3
};

export interface MonthlyFinancialData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export const monthlyFinancialData: MonthlyFinancialData[] = [
  { month: 'Jan 2024', revenue: 320000, expenses: 240000, profit: 80000 },
  { month: 'Feb 2024', revenue: 380000, expenses: 260000, profit: 120000 },
  { month: 'Mar 2024', revenue: 420000, expenses: 280000, profit: 140000 },
  { month: 'Apr 2024', revenue: 450000, expenses: 320000, profit: 130000 },
  { month: 'May 2024', revenue: 480000, expenses: 340000, profit: 140000 },
  { month: 'Jun 2024', revenue: 520000, expenses: 360000, profit: 160000 },
  { month: 'Jul 2024', revenue: 550000, expenses: 380000, profit: 170000 },
  { month: 'Aug 2024', revenue: 580000, expenses: 400000, profit: 180000 },
  { month: 'Sep 2024', revenue: 600000, expenses: 410000, profit: 190000 },
  { month: 'Oct 2024', revenue: 620000, expenses: 420000, profit: 200000 },
  { month: 'Nov 2024', revenue: 650000, expenses: 430000, profit: 220000 },
  { month: 'Dec 2024', revenue: 680000, expenses: 450000, profit: 230000 }
];