import React from 'react';
import { getRecentActivitiesByRole } from '../../data/dashboardData';
import { Clock, CheckCircle, AlertCircle, Users, DollarSign } from 'lucide-react';

interface RecentActivityProps {
  userRole: string;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ userRole }) => {
  const activities = getRecentActivitiesByRole(userRole);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'CheckCircle': return CheckCircle;
      case 'Clock': return Clock;
      case 'DollarSign': return DollarSign;
      case 'Users': return Users;
      case 'AlertCircle': return AlertCircle;
      default: return Clock;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Aktivitas Terbaru</h3>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
            {React.createElement(getIconComponent(activity.icon), { className: `w-5 h-5 ${activity.color} mt-0.5` })}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {activity.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button className="w-full text-center text-blue-500 hover:text-blue-600 text-sm font-medium">
          Lihat semua aktivitas
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;