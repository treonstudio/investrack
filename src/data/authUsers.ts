// src/data/authUsers.ts

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'developer' | 'investor' | 'employee' | 'admin';
  avatar?: string;
  permissions: string[];
}

export const dummyUsers: Record<string, User> = {
  'admin@property.com': {
    id: '1',
    name: 'Admin System',
    email: 'admin@property.com',
    role: 'admin',
    permissions: ['all']
  },
  'developer@property.com': {
    id: '2',
    name: 'PT Properti Developer',
    email: 'developer@property.com',
    role: 'developer',
    permissions: ['project_manage', 'finance_manage', 'request_funding', 'project_view', 'finance_view', 'investment_view', 'inventory_view', 'hr_view', 'sales_view']
  },
  'investor@property.com': {
    id: '3',
    name: 'John Investor',
    email: 'investor@property.com',
    role: 'investor',
    permissions: ['portfolio_view', 'investment_manage', 'reports_view', 'project_view', 'finance_view', 'investment_view']
  },
  'employee@property.com': {
    id: '4',
    name: 'Jane Employee',
    email: 'employee@property.com',
    role: 'employee',
    permissions: ['attendance_manage', 'inventory_view', 'project_view', 'hr_view']
  },
  'manager@property.com': {
    id: '5',
    name: 'Manager Operasional',
    email: 'manager@property.com',
    role: 'employee',
    permissions: ['project_view', 'inventory_view', 'hr_view', 'finance_view']
  },
  'sales@property.com': {
    id: '6',
    name: 'Sales Executive',
    email: 'sales@property.com',
    role: 'employee',
    permissions: ['sales_view', 'project_view']
  }
};

export const demoAccounts = [
  { email: 'admin@property.com', role: 'Administrator Sistem', color: 'bg-purple-500' },
  { email: 'developer@property.com', role: 'Pengembang Properti', color: 'bg-blue-500' },
  { email: 'investor@property.com', role: 'Investor', color: 'bg-green-500' },
  { email: 'employee@property.com', role: 'Karyawan', color: 'bg-orange-500' },
  { email: 'manager@property.com', role: 'Manajer', color: 'bg-red-500' },
  { email: 'sales@property.com', role: 'Sales', color: 'bg-indigo-500' }
];