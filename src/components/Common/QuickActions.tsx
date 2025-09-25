import React from 'react';
import { getQuickActionsByRole } from '../../data/dashboardData';
import { Plus, FileText, TrendingUp, Calendar, Users, Package } from 'lucide-react';

interface QuickActionsProps {
  userRole: string;
}

const QuickActions: React.FC<QuickActionsProps> = ({ userRole }) => {
  const actions = getQuickActionsByRole(userRole);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Plus': return Plus;
      case 'FileText': return FileText;
      case 'TrendingUp': return TrendingUp;
      case 'Calendar': return Calendar;
      case 'Users': return Users;
      case 'Package': return Package;
      default: return Plus;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Quick Actions</h3>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Aksi Cepat</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md transition-all duration-200 text-left group"
          >
            <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
              {React.createElement(getIconComponent(action.icon), { className: "w-5 h-5 text-white" })}
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{action.title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;