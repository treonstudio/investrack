import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  Building,
  DollarSign,
  TrendingUp,
  Package,
  Users,
  ShoppingCart,
  Settings,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, setActiveModule, collapsed }) => {
  const { user, logout, hasPermission } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, permission: null },
    { id: 'projects', label: 'Proyek', icon: Building, permission: 'project_view' },
    { id: 'financial', label: 'Keuangan', icon: DollarSign, permission: 'finance_view' },
    { id: 'investment', label: 'Investasi', icon: TrendingUp, permission: 'investment_view' },
    { id: 'inventory', label: 'Inventori', icon: Package, permission: 'inventory_view' },
    { id: 'hrm', label: 'Manajemen SDM', icon: Users, permission: 'hr_view' },
    { id: 'sales', label: 'Penjualan & Pemasaran', icon: ShoppingCart, permission: 'sales_view' },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    !item.permission || hasPermission(item.permission) || user?.role === 'admin'
  );

  return (
    <div className={`bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">PropertyMS</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {filteredMenuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveModule(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                    activeModule === item.id
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  title={collapsed ? item.label : ''}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-2">
            <button
              onClick={() => setActiveModule('settings')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700`}
              title={collapsed ? 'Pengaturan' : ''}
            >
              <Settings className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>Pengaturan</span>}
            </button>
            
            <button
              onClick={logout}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              title={collapsed ? 'Keluar' : ''}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>Keluar</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;