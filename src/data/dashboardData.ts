// src/data/dashboardData.ts

export interface Stat {
  title: string;
  value: string;
  change: string;
  color: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

export interface DashboardContentData {
  stats: Stat[];
  chartData: ChartData;
}

export const getDashboardDataByRole = (role: string | undefined): DashboardContentData => {
  switch (role) {
    case 'developer':
      return {
        stats: [
          { title: 'Proyek Aktif', value: '8', change: '+12%', color: 'bg-blue-500' },
          { title: 'Total Investasi', value: '$2.4M', change: '+8%', color: 'bg-green-500' },
          { title: 'Tingkat Penyelesaian', value: '67%', change: '+5%', color: 'bg-orange-500' },
          { title: 'Pendapatan Bulanan', value: '$180K', change: '+15%', color: 'bg-purple-500' }
        ],
        chartData: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
          datasets: [
            {
              label: 'Kemajuan Proyek',
              data: [30, 45, 60, 75, 80, 90],
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)'
            }
          ]
        }
      };
    case 'investor':
      return {
        stats: [
          { title: 'Nilai Portofolio', value: '$850K', change: '+18%', color: 'bg-green-500' },
          { title: 'Investasi Aktif', value: '12', change: '+2', color: 'bg-blue-500' },
          { title: 'Keuntungan Bulanan', value: '$12K', change: '+22%', color: 'bg-orange-500' },
          { title: 'ROI Rata-rata', value: '14.5%', change: '+1.2%', color: 'bg-purple-500' }
        ],
        chartData: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
          datasets: [
            {
              label: 'Pertumbuhan Portofolio',
              data: [700, 720, 750, 780, 820, 850],
              borderColor: 'rgb(34, 197, 94)',
              backgroundColor: 'rgba(34, 197, 94, 0.1)'
            }
          ]
        }
      };
    case 'employee':
      return {
        stats: [
          { title: 'Tugas Selesai', value: '24', change: '+8%', color: 'bg-blue-500' },
          { title: 'Kehadiran', value: '98%', change: '+2%', color: 'bg-green-500' },
          { title: 'Proyek Terlibat', value: '3', change: '0', color: 'bg-orange-500' },
          { title: 'Jam Bulan Ini', value: '172', change: '+5%', color: 'bg-purple-500' }
        ],
        chartData: {
          labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
          datasets: [
            {
              label: 'Kinerja Mingguan',
              data: [85, 90, 88, 95],
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)'
            }
          ]
        }
      };
    default: // Admin or other roles
      return {
        stats: [
          { title: 'Total Proyek', value: '15', change: '+20%', color: 'bg-blue-500' },
          { title: 'Total Investasi', value: '$5.2M', change: '+15%', color: 'bg-green-500' },
          { title: 'Pengguna Aktif', value: '248', change: '+12%', color: 'bg-orange-500' },
          { title: 'Kesehatan Sistem', value: '99.9%', change: '+0.1%', color: 'bg-purple-500' }
        ],
        chartData: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
          datasets: [
            {
              label: 'Ringkasan Sistem',
              data: [120, 150, 180, 220, 260, 300],
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)'
            }
          ]
        }
      };
  }
};

export const getQuickActionsByRole = (userRole: string | undefined) => {
  switch (userRole) {
    case 'developer':
      return [
        { title: 'Proyek Baru', description: 'Mulai proyek pengembangan baru', icon: 'Plus', color: 'bg-blue-500' },
        { title: 'Ajukan Pendanaan', description: 'Kirim proposal pendanaan', icon: 'TrendingUp', color: 'bg-green-500' },
        { title: 'Jadwalkan Rapat', description: 'Bertemu dengan stakeholder', icon: 'Calendar', color: 'bg-orange-500' },
        { title: 'Buat Laporan', description: 'Buat laporan kemajuan', icon: 'FileText', color: 'bg-purple-500' }
      ];
    case 'investor':
      return [
        { title: 'Jelajahi Proyek', description: 'Jelajahi peluang investasi', icon: 'TrendingUp', color: 'bg-green-500' },
        { title: 'Lihat Laporan', description: 'Periksa kinerja investasi', icon: 'FileText', color: 'bg-blue-500' },
        { title: 'Analisis Portofolio', description: 'Analisis investasi Anda', icon: 'Plus', color: 'bg-purple-500' },
        { title: 'Hubungi Developer', description: 'Komunikasi dengan tim proyek', icon: 'Users', color: 'bg-orange-500' }
      ];
    case 'employee':
      return [
        { title: 'Absen Masuk/Keluar', description: 'Catat kehadiran', icon: 'Calendar', color: 'bg-blue-500' },
        { title: 'Lihat Tugas', description: 'Periksa tugas yang diberikan', icon: 'FileText', color: 'bg-orange-500' },
        { title: 'Kirim Laporan', description: 'Upload kemajuan kerja', icon: 'Plus', color: 'bg-green-500' },
        { title: 'Minta Material', description: 'Minta material untuk kerja', icon: 'Package', color: 'bg-purple-500' }
      ];
    default: // Admin
      return [
        { title: 'Monitor Sistem', description: 'Periksa kesehatan sistem', icon: 'TrendingUp', color: 'bg-blue-500' },
        { title: 'Kelola Pengguna', description: 'Kelola akun pengguna', icon: 'Users', color: 'bg-green-500' },
        { title: 'Buat Analitik', description: 'Buat laporan sistem', icon: 'FileText', color: 'bg-purple-500' },
        { title: 'Backup Sistem', description: 'Lakukan backup sistem', icon: 'Plus', color: 'bg-orange-500' }
      ];
  }
};

export const getRecentActivitiesByRole = (userRole: string | undefined) => {
  switch (userRole) {
    case 'developer':
      return [
        { id: 1, type: 'project', title: 'Proyek Emerald Hills - Pondasi Selesai', time: '2 jam lalu', icon: 'CheckCircle', color: 'text-green-500' },
        { id: 2, type: 'finance', title: 'Anggaran material disetujui - $45,000', time: '4 jam lalu', icon: 'DollarSign', color: 'text-blue-500' },
        { id: 3, type: 'team', title: 'Kontraktor baru ditambahkan ke tim', time: '6 jam lalu', icon: 'Users', color: 'text-orange-500' },
        { id: 4, type: 'alert', title: 'Peringatan cuaca untuk pekerjaan luar ruangan', time: '1 hari lalu', icon: 'AlertCircle', color: 'text-yellow-500' }
      ];
    case 'investor':
      return [
        { id: 1, type: 'investment', title: 'ROI meningkat 2.5% bulan ini', time: '1 jam lalu', icon: 'CheckCircle', color: 'text-green-500' },
        { id: 2, type: 'project', title: 'Golden Valley - 80% selesai', time: '3 jam lalu', icon: 'Clock', color: 'text-blue-500' },
        { id: 3, type: 'payout', title: 'Dividen bulanan $5,200 diproses', time: '2 hari lalu', icon: 'DollarSign', color: 'text-green-500' },
        { id: 4, type: 'report', title: 'Peluang investasi baru tersedia', time: '3 hari lalu', icon: 'AlertCircle', color: 'text-orange-500' }
      ];
    case 'employee':
      return [
        { id: 1, type: 'task', title: 'Inspeksi lokasi selesai - Blok A', time: '30 menit lalu', icon: 'CheckCircle', color: 'text-green-500' },
        { id: 2, type: 'attendance', title: 'Absen masuk tercatat di Gerbang Timur', time: '8 jam lalu', icon: 'Clock', color: 'text-blue-500' },
        { id: 3, type: 'assignment', title: 'Tugas baru: Hitung material', time: '1 hari lalu', icon: 'AlertCircle', color: 'text-orange-500' },
        { id: 4, type: 'training', title: 'Pelatihan keselamatan selesai', time: '2 hari lalu', icon: 'Users', color: 'text-purple-500' }
      ];
    default: // Admin
      return [
        { id: 1, type: 'system', title: 'Backup sistem berhasil diselesaikan', time: '1 jam lalu', icon: 'CheckCircle', color: 'text-green-500' },
        { id: 2, type: 'user', title: 'Investor baru terdaftar', time: '3 jam lalu', icon: 'Users', color: 'text-blue-500' },
        { id: 3, type: 'alert', title: 'Performa server optimal', time: '6 jam lalu', icon: 'Clock', color: 'text-green-500' },
        { id: 4, type: 'update', title: 'Pemeliharaan database dijadwalkan', time: '1 hari lalu', icon: 'AlertCircle', color: 'text-yellow-500' }
      ];
  }
};