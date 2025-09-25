import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getDashboardDataByRole } from '../../data/dashboardData';
import StatsCards from '../Common/StatsCards';
import ChartWidget from '../Common/ChartWidget';
import RecentActivity from '../Common/RecentActivity';
import QuickActions from '../Common/QuickActions';

const DashboardContent: React.FC = () => {
  const { user } = useAuth();

  const dashboardData = getDashboardDataByRole(user?.role);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Selamat datang kembali, {user?.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Berikut yang terjadi dengan {user?.role === 'developer' ? 'proyek' : user?.role === 'investor' ? 'investasi' : 'pekerjaan'} Anda hari ini.
          </p>
        </div>
      </div>

      <StatsCards stats={dashboardData.stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWidget
          title={user?.role === 'investor' ? 'Pertumbuhan Portofolio' : 'Ringkasan Kinerja'}
          data={dashboardData.chartData}
        />
        <RecentActivity userRole={user?.role || 'admin'} />
      </div>

      <QuickActions userRole={user?.role || 'admin'} />
    </div>
  );
};

export default DashboardContent;