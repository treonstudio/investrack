// src/data/projects.ts

export interface Project {
  id: string;
  name: string;
  location: string;
  status: 'Perencanaan' | 'Sedang Berjalan' | 'Selesai' | 'Ditunda';
  progress: number;
  budget: number; // in USD
  spent: number; // in USD
  startDate: string;
  endDate: string;
  teamSize: number;
  statusColor: string;
  description?: string;
}

export const projects: Project[] = [
  {
    id: 'emerald-hills',
    name: 'Emerald Hills Residences',
    location: 'Jakarta Selatan',
    status: 'Sedang Berjalan',
    progress: 75,
    budget: 2400000,
    spent: 1800000,
    startDate: '2024-01-15',
    endDate: '2024-12-15',
    teamSize: 24,
    statusColor: 'bg-blue-500',
    description: 'Pembangunan kompleks hunian mewah dengan fasilitas modern dan lengkap.'
  },
  {
    id: 'golden-valley',
    name: 'Kompleks Golden Valley',
    location: 'Bandung',
    status: 'Perencanaan',
    progress: 25,
    budget: 3200000,
    spent: 800000,
    startDate: '2024-03-01',
    endDate: '2025-02-28',
    teamSize: 18,
    statusColor: 'bg-yellow-500',
    description: 'Pengembangan kawasan komersial dan hunian terpadu dengan konsep modern.'
  },
  {
    id: 'sunset-gardens',
    name: 'Taman Sunset Gardens',
    location: 'Surabaya',
    status: 'Selesai',
    progress: 100,
    budget: 1800000,
    spent: 1700000,
    startDate: '2023-06-01',
    endDate: '2024-01-30',
    teamSize: 15,
    statusColor: 'bg-green-500',
    description: 'Proyek hunian dengan konsep taman hijau yang asri dan ramah lingkungan.'
  },
  {
    id: 'marina-luxury',
    name: 'Apartemen Marina Luxury',
    location: 'Jakarta Utara',
    status: 'Sedang Berjalan',
    progress: 40,
    budget: 5600000,
    spent: 2200000,
    startDate: '2024-04-01',
    endDate: '2025-10-01',
    teamSize: 30,
    statusColor: 'bg-blue-500',
    description: 'Apartemen mewah dengan pemandangan laut dan fasilitas premium.'
  },
  {
    id: 'central-plaza',
    name: 'Plaza Bisnis Central',
    location: 'Jakarta Pusat',
    status: 'Perencanaan',
    progress: 10,
    budget: 8200000,
    spent: 800000,
    startDate: '2024-05-01',
    endDate: '2026-05-01',
    teamSize: 20,
    statusColor: 'bg-yellow-500',
    description: 'Pusat bisnis modern di jantung kota dengan fasilitas lengkap.'
  }
];

export interface Milestone {
  id: number;
  title: string;
  description: string;
  date: string;
  status: 'selesai' | 'sedang-berjalan' | 'terlambat' | 'menunggu';
  progress: number;
}

export const emeraldHillsMilestones: Milestone[] = [
  {
    id: 1,
    title: 'Inisiasi Proyek',
    description: 'Survei lokasi dan perizinan telah diperoleh',
    date: '2024-01-15',
    status: 'selesai',
    progress: 100
  },
  {
    id: 2,
    title: 'Pekerjaan Pondasi',
    description: 'Penggalian dan pemasangan pondasi',
    date: '2024-02-01',
    status: 'selesai',
    progress: 100
  },
  {
    id: 3,
    title: 'Struktur Rangka Bangunan',
    description: 'Pembangunan struktur utama dan rangka bangunan',
    date: '2024-04-15',
    status: 'sedang-berjalan',
    progress: 75
  },
  {
    id: 4,
    title: 'Instalasi MEP',
    description: 'Pekerjaan Mekanikal, Elektrikal, dan Plumbing',
    date: '2024-07-01',
    status: 'menunggu',
    progress: 0
  },
  {
    id: 5,
    title: 'Finishing Interior',
    description: 'Pekerjaan interior dan sentuhan akhir',
    date: '2024-10-01',
    status: 'menunggu',
    progress: 0
  },
  {
    id: 6,
    title: 'Inspeksi Akhir',
    description: 'Inspeksi akhir dan serah terima proyek',
    date: '2024-12-15',
    status: 'menunggu',
    progress: 0
  }
];

export interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  status: 'disetujui' | 'menunggu' | 'ditolak';
  uploader: string;
}

export const projectDocuments: Document[] = [
  {
    id: 1,
    name: 'Gambar Kerja - Emerald Hills.pdf',
    type: 'Gambar Kerja',
    size: '15.2 MB',
    uploadDate: '2024-01-15',
    status: 'disetujui',
    uploader: 'Tim Arsitek'
  },
  {
    id: 2,
    name: 'Sertifikat Izin Mendirikan Bangunan.pdf',
    type: 'Dokumen Legal',
    size: '2.8 MB',
    uploadDate: '2024-01-20',
    status: 'disetujui',
    uploader: 'Tim Legal'
  },
  {
    id: 3,
    name: 'Spesifikasi Material.docx',
    type: 'Spesifikasi',
    size: '4.5 MB',
    uploadDate: '2024-02-01',
    status: 'menunggu',
    uploader: 'Tim Engineering'
  },
  {
    id: 4,
    name: 'Laporan Progres - Februari.pdf',
    type: 'Laporan',
    size: '8.1 MB',
    uploadDate: '2024-02-28',
    status: 'disetujui',
    uploader: 'Manajer Proyek'
  },
  {
    id: 5,
    name: 'Panduan Keselamatan Kerja.pdf',
    type: 'Dokumen K3',
    size: '3.2 MB',
    uploadDate: '2024-03-01',
    status: 'disetujui',
    uploader: 'Petugas K3'
  },
  {
    id: 6,
    name: 'Analisis Dampak Lingkungan.pdf',
    type: 'Dokumen Legal',
    size: '10.1 MB',
    uploadDate: '2024-01-10',
    status: 'disetujui',
    uploader: 'Tim Legal'
  },
  {
    id: 7,
    name: 'Perhitungan Desain Struktur.xlsx',
    type: 'Spesifikasi',
    size: '2.1 MB',
    uploadDate: '2024-02-10',
    status: 'disetujui',
    uploader: 'Tim Engineering'
  },
  {
    id: 8,
    name: 'Laporan Progres Bulanan - Maret.pdf',
    type: 'Laporan',
    size: '9.5 MB',
    uploadDate: '2024-03-30',
    status: 'menunggu',
    uploader: 'Manajer Proyek'
  },
  {
    id: 9,
    name: 'Kontrak Kontraktor - Fase 1.pdf',
    type: 'Dokumen Legal',
    size: '6.7 MB',
    uploadDate: '2024-01-05',
    status: 'disetujui',
    uploader: 'Tim Legal'
  },
  {
    id: 10,
    name: 'Denah Instalasi Listrik.dwg',
    type: 'Gambar Kerja',
    size: '12.3 MB',
    uploadDate: '2024-03-10',
    status: 'menunggu',
    uploader: 'Tim Arsitek'
  }
];