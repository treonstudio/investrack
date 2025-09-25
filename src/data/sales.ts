// src/data/sales.ts

export interface SalesData {
  totalSales: number;
  unitsSold: number;
  averagePrice: number;
  conversionRate: number;
  activeLead: number;
  closedDeals: number;
  monthlyGrowth: number;
}

export const salesData: SalesData = {
  totalSales: 8400000,
  unitsSold: 156,
  averagePrice: 53800,
  conversionRate: 18.5,
  activeLead: 89,
  closedDeals: 23,
  monthlyGrowth: 15.2
};

export interface Customer {
  id: number;
  name: string;
  type: 'Korporat' | 'Perorangan';
  project: string;
  value: number;
  status: 'Kontrak' | 'Proses' | 'Selesai' | 'Negosiasi';
  contact: string;
  phone: string;
  email: string;
  purchaseDate: string;
}

export const customers: Customer[] = [
  {
    id: 1,
    name: 'PT Sukses Mandiri',
    type: 'Korporat',
    project: 'Emerald Hills - Unit A-15',
    value: 450000,
    status: 'Kontrak',
    contact: 'Budi Hartono',
    phone: '+62 812-3456-7890',
    email: 'budi@suksesmandiri.com',
    purchaseDate: '2024-02-15'
  },
  {
    id: 2,
    name: 'Sari Indah Lestari',
    type: 'Perorangan',
    project: 'Golden Valley - Villa C-08',
    value: 720000,
    status: 'Proses',
    contact: 'Sari Lestari',
    phone: '+62 813-4567-8901',
    email: 'sari.lestari@email.com',
    purchaseDate: '2024-03-01'
  },
  {
    id: 3,
    name: 'Ahmad Family',
    type: 'Perorangan',
    project: 'Sunset Gardens - House B-12',
    value: 380000,
    status: 'Selesai',
    contact: 'Ahmad Rizki',
    phone: '+62 814-5678-9012',
    email: 'ahmad.rizki@email.com',
    purchaseDate: '2024-01-20'
  },
  {
    id: 4,
    name: 'CV Berkah Jaya',
    type: 'Korporat',
    project: 'Central Plaza - Office 5F',
    value: 890000,
    status: 'Negosiasi',
    contact: 'Maya Sari',
    phone: '+62 815-6789-0123',
    email: 'maya@berkahj aya.com',
    purchaseDate: '2024-03-10'
  },
  {
    id: 5,
    name: 'PT Jaya Properti',
    type: 'Korporat',
    project: 'Marina Luxury - Unit 10B',
    value: 620000,
    status: 'Kontrak',
    contact: 'Andi Wijaya',
    phone: '+62 816-7890-1234',
    email: 'andi@jayaproperti.com',
    purchaseDate: '2024-03-20'
  },
  {
    id: 6,
    name: 'Budi Santoso',
    type: 'Perorangan',
    project: 'Emerald Hills - Unit B-05',
    value: 510000,
    status: 'Proses',
    contact: 'Budi Santoso',
    phone: '+62 817-8901-2345',
    email: 'budi.santoso@email.com',
    purchaseDate: '2024-04-01'
  }
];

export interface Lead {
  id: number;
  name: string;
  source: 'Website' | 'Referensi' | 'Media Sosial' | 'Pameran';
  interest: string;
  score: number;
  status: 'Panas' | 'Hangat' | 'Dingin';
  contact: string;
  email: string;
  lastContact: string;
  assignedTo: string;
}

export const leads: Lead[] = [
  {
    id: 1,
    name: 'Dewi Kartika',
    source: 'Website',
    interest: 'Emerald Hills - Hunian',
    score: 85,
    status: 'Panas',
    contact: '+62 816-7890-1234',
    email: 'dewi.kartika@email.com',
    lastContact: '2024-03-14',
    assignedTo: 'Tim Sales A'
  },
  {
    id: 2,
    name: 'PT Tech Solutions',
    source: 'Referensi',
    interest: 'Central Plaza - Komersial',
    score: 72,
    status: 'Hangat',
    contact: '+62 817-8901-2345',
    email: 'info@techsolutions.com',
    lastContact: '2024-03-12',
    assignedTo: 'Tim Sales B'
  },
  {
    id: 3,
    name: 'Rini Susanti',
    source: 'Media Sosial',
    interest: 'Golden Valley - Villa',
    score: 64,
    status: 'Hangat',
    contact: '+62 818-9012-3456',
    email: 'rini.susanti@email.com',
    lastContact: '2024-03-13',
    assignedTo: 'Tim Sales A'
  },
  {
    id: 4,
    name: 'Budi Setiawan',
    source: 'Pameran',
    interest: 'Sunset Gardens - Rumah',
    score: 45,
    status: 'Dingin',
    contact: '+62 819-0123-4567',
    email: 'budi.setiawan@email.com',
    lastContact: '2024-03-10',
    assignedTo: 'Tim Sales C'
  },
  {
    id: 5,
    name: 'Citra Property Group',
    source: 'Referensi',
    interest: 'Marina Luxury - Ruang Komersial',
    score: 90,
    status: 'Panas',
    contact: '+62 811-2233-4455',
    email: 'contact@citraproperty.com',
    lastContact: '2024-03-15',
    assignedTo: 'Tim Sales B'
  },
  {
    id: 6,
    name: 'Hadi Wijaya',
    source: 'Website',
    interest: 'Hunian Ramah Lingkungan - Rumah',
    score: 55,
    status: 'Hangat',
    contact: '+62 812-3344-5566',
    email: 'hadi.wijaya@email.com',
    lastContact: '2024-03-11',
    assignedTo: 'Tim Sales A'
  }
];