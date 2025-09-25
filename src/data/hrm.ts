// src/data/hrm.ts

export interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  project: string;
  employeeId: string;
  joinDate: string;
  salary: number;
  status: 'Aktif' | 'Cuti' | 'Berhenti';
  phone: string;
  email: string;
  attendance: number; // percentage
}

export const employees: Employee[] = [
  {
    id: 1,
    name: 'Ahmad Rizki',
    position: 'Manajer Lapangan',
    department: 'Konstruksi',
    project: 'Emerald Hills',
    employeeId: 'EMP-001',
    joinDate: '2023-01-15',
    salary: 8500,
    status: 'Aktif',
    phone: '+62 812-3456-7890',
    email: 'ahmad.rizki@company.com',
    attendance: 95
  },
  {
    id: 2,
    name: 'Siti Nurhaliza',
    position: 'Arsitek',
    department: 'Desain',
    project: 'Golden Valley',
    employeeId: 'EMP-002',
    joinDate: '2023-03-20',
    salary: 9200,
    status: 'Aktif',
    phone: '+62 813-4567-8901',
    email: 'siti.nurhaliza@company.com',
    attendance: 98
  },
  {
    id: 3,
    name: 'Budi Santoso',
    position: 'Pekerja Konstruksi',
    department: 'Konstruksi',
    project: 'Emerald Hills',
    employeeId: 'EMP-003',
    joinDate: '2023-02-10',
    salary: 4500,
    status: 'Aktif',
    phone: '+62 814-5678-9012',
    email: 'budi.santoso@company.com',
    attendance: 92
  },
  {
    id: 4,
    name: 'Maya Dewi',
    position: 'Petugas K3',
    department: 'Keselamatan',
    project: 'Semua Proyek',
    employeeId: 'EMP-004',
    joinDate: '2023-01-05',
    salary: 6800,
    status: 'Aktif',
    phone: '+62 815-6789-0123',
    email: 'maya.dewi@company.com',
    attendance: 97
  },
  {
    id: 5,
    name: 'Joko Susilo',
    position: 'Manajer SDM',
    department: 'HR',
    project: 'Semua Proyek',
    employeeId: 'EMP-005',
    joinDate: '2022-11-01',
    salary: 7500,
    status: 'Aktif',
    phone: '+62 816-7890-1234',
    email: 'joko.susilo@company.com',
    attendance: 99
  },
  {
    id: 6,
    name: 'Dewi Lestari',
    position: 'Spesialis Pemasaran',
    department: 'Pemasaran',
    project: 'Semua Proyek',
    employeeId: 'EMP-006',
    joinDate: '2023-05-10',
    salary: 6000,
    status: 'Aktif',
    phone: '+62 817-8901-2345',
    email: 'dewi.lestari@company.com',
    attendance: 96
  },
  {
    id: 7,
    name: 'Rudi Hartono',
    position: 'Analis Keuangan',
    department: 'Keuangan',
    project: 'Semua Proyek',
    employeeId: 'EMP-007',
    joinDate: '2023-04-01',
    salary: 7800,
    status: 'Aktif',
    phone: '+62 818-9012-3456',
    email: 'rudi.hartono@company.com',
    attendance: 94
  },
  {
    id: 8,
    name: 'Putri Indah',
    position: 'Koordinator Proyek',
    department: 'Manajemen Proyek',
    project: 'Marina Luxury',
    employeeId: 'EMP-008',
    joinDate: '2024-01-20',
    salary: 7000,
    status: 'Aktif',
    phone: '+62 819-0123-4567',
    email: 'putri.indah@company.com',
    attendance: 96
  },
  {
    id: 9,
    name: 'Faisal Rahman',
    position: 'Supervisor Lapangan',
    department: 'Konstruksi',
    project: 'Golden Valley',
    employeeId: 'EMP-009',
    joinDate: '2024-02-01',
    salary: 5500,
    status: 'Aktif',
    phone: '+62 811-2345-6789',
    email: 'faisal.rahman@company.com',
    attendance: 90
  },
  {
    id: 10,
    name: 'Citra Kirana',
    position: 'Asisten Admin',
    department: 'Administrasi',
    project: 'Semua Proyek',
    employeeId: 'EMP-010',
    joinDate: '2023-08-15',
    salary: 4000,
    status: 'Aktif',
    phone: '+62 812-3456-7899',
    email: 'citra.kirana@company.com',
    attendance: 98
  }
];

export interface AttendanceData {
  date: string;
  present: number;
  absent: number;
  late: number;
  overtime: number; // in hours
}

export const attendanceData: AttendanceData[] = [
  { date: '2024-03-15', present: 45, absent: 3, late: 2, overtime: 8 },
  { date: '2024-03-14', present: 47, absent: 1, late: 3, overtime: 12 },
  { date: '2024-03-13', present: 46, absent: 2, late: 1, overtime: 6 },
  { date: '2024-03-12', present: 48, absent: 0, late: 4, overtime: 15 },
  { date: '2024-03-11', present: 44, absent: 4, late: 2, overtime: 5 },
  { date: '2024-03-08', present: 46, absent: 2, late: 0, overtime: 10 },
  { date: '2024-03-07', present: 47, absent: 1, late: 1, overtime: 7 },
  { date: '2024-03-06', present: 45, absent: 3, late: 2, overtime: 9 },
  { date: '2024-03-05', present: 48, absent: 0, late: 0, overtime: 11 },
  { date: '2024-03-04', present: 44, absent: 4, late: 3, overtime: 4 }
];

export interface PayrollSummary {
  totalEmployees: number;
  totalSalaries: number;
  averageSalary: number;
  pendingPayments: number;
  overtimeHours: number;
  bonusesThisMonth: number;
}

export const payrollSummary: PayrollSummary = {
  totalEmployees: employees.length,
  totalSalaries: employees.reduce((sum, emp) => sum + emp.salary, 0),
  averageSalary: employees.reduce((sum, emp) => sum + emp.salary, 0) / employees.length,
  pendingPayments: 2,
  overtimeHours: 156,
  bonusesThisMonth: 12000
};