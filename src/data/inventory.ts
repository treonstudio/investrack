// src/data/inventory.ts

export interface InventoryItem {
  id: number;
  name: string;
  category: string;
  sku: string;
  quantity: number;
  minStock: number;
  unit: string;
  unitPrice: number;
  totalValue: number;
  supplier: string;
  lastUpdated: string;
  status: 'Tersedia' | 'Stok Menipis' | 'Habis';
  location: string;
}

export const inventoryItems: InventoryItem[] = [
  {
    id: 1,
    name: 'Semen Portland - 50kg',
    category: 'material',
    sku: 'MAT-001',
    quantity: 450,
    minStock: 100,
    unit: 'sak',
    unitPrice: 12.5,
    totalValue: 5625,
    supplier: 'PT Semen Nusantara',
    lastUpdated: '2024-03-15',
    status: 'Tersedia',
    location: 'Gudang A - Seksi 1'
  },
  {
    id: 2,
    name: 'Besi Beton - 12mm',
    category: 'material',
    sku: 'MAT-002',
    quantity: 25,
    minStock: 50,
    unit: 'batang',
    unitPrice: 85.0,
    totalValue: 2125,
    supplier: 'PT Baja Konstruksi',
    lastUpdated: '2024-03-14',
    status: 'Stok Menipis',
    location: 'Gudang B - Seksi 3'
  },
  {
    id: 3,
    name: 'Excavator - CAT 320',
    category: 'alat',
    sku: 'EQP-001',
    quantity: 3,
    minStock: 1,
    unit: 'units',
    unitPrice: 150000,
    totalValue: 450000,
    supplier: 'PT Sewa Alat Berat',
    lastUpdated: '2024-03-12',
    status: 'Tersedia',
    location: 'Lapangan Alat'
  },
  {
    id: 4,
    name: 'Helm Keselamatan - Standar',
    category: 'k3',
    sku: 'SAF-001',
    quantity: 0,
    minStock: 20,
    unit: 'buah',
    unitPrice: 25.0,
    totalValue: 0,
    supplier: 'PT Alat Keselamatan',
    lastUpdated: '2024-03-10',
    status: 'Habis',
    location: 'Ruang Penyimpanan A'
  },
  {
    id: 5,
    name: 'Bor Listrik - Makita',
    category: 'alat',
    sku: 'TOL-001',
    quantity: 12,
    minStock: 5,
    unit: 'buah',
    unitPrice: 180.0,
    totalValue: 2160,
    supplier: 'PT Perkakas Teknik',
    lastUpdated: '2024-03-13',
    status: 'Tersedia',
    location: 'Gudang Perkakas'
  },
  {
    id: 6,
    name: 'Bata Merah - Standar',
    category: 'material',
    sku: 'MAT-003',
    quantity: 8000,
    minStock: 2000,
    unit: 'buah',
    unitPrice: 0.5,
    totalValue: 4000,
    supplier: 'PT Bata Jaya',
    lastUpdated: '2024-03-14',
    status: 'Tersedia',
    location: 'Gudang A - Seksi 2'
  },
  {
    id: 7,
    name: 'Triplek - 12mm',
    category: 'material',
    sku: 'MAT-004',
    quantity: 50,
    minStock: 100,
    unit: 'lembar',
    unitPrice: 30.0,
    totalValue: 1500,
    supplier: 'PT Kayu Lapis',
    lastUpdated: '2024-03-16',
    status: 'Stok Menipis',
    location: 'Gudang A - Seksi 1'
  },
  {
    id: 8,
    name: 'Mesin Molen',
    category: 'alat',
    sku: 'EQP-002',
    quantity: 1,
    minStock: 1,
    unit: 'units',
    unitPrice: 5000,
    totalValue: 5000,
    supplier: 'PT Alat Konstruksi',
    lastUpdated: '2024-03-11',
    status: 'Tersedia',
    location: 'Lapangan Alat'
  },
  {
    id: 9,
    name: 'Kacamata Pelindung',
    category: 'k3',
    sku: 'SAF-002',
    quantity: 15,
    minStock: 30,
    unit: 'pasang',
    unitPrice: 8.0,
    totalValue: 120,
    supplier: 'PT Keselamatan Utama',
    lastUpdated: '2024-03-09',
    status: 'Stok Menipis',
    location: 'Ruang Penyimpanan A'
  },
  {
    id: 10,
    name: 'Cat Tembok Putih - 20L',
    category: 'material',
    sku: 'MAT-005',
    quantity: 10,
    minStock: 5,
    unit: 'kaleng',
    unitPrice: 75.0,
    totalValue: 750,
    supplier: 'PT Cat Warna',
    lastUpdated: '2024-03-17',
    status: 'Tersedia',
    location: 'Gudang C - Seksi 2'
  }
];

export const inventoryCategories = [
  { id: 'all', label: 'Semua Item', count: inventoryItems.length },
  { id: 'material', label: 'Material Konstruksi', count: inventoryItems.filter(item => item.category === 'material').length },
  { id: 'alat', label: 'Alat & Peralatan', count: inventoryItems.filter(item => item.category === 'alat').length },
  { id: 'k3', label: 'Peralatan K3', count: inventoryItems.filter(item => item.category === 'k3').length }
];