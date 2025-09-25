import React, { useState } from 'react';
import InvestorDashboard from './InvestorDashboard';
import ProjectMarketplace from './ProjectMarketplace';
import PortfolioManagement from './PortfolioManagement';
import { TrendingUp, ShoppingBag, Briefcase, PieChart } from 'lucide-react';

const InvestmentPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'marketplace', label: 'Pasar Investasi', icon: ShoppingBag },
    { id: 'portfolio', label: 'Portofolio', icon: Briefcase },
    { id: 'analytics', label: 'Analitik', icon: PieChart }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <InvestorDashboard />;
      case 'marketplace':
        return <ProjectMarketplace />;
      case 'portfolio':
        return <PortfolioManagement />;
      case 'analytics':
        return <div className="text-center py-12"><p className="text-gray-500">Modul Analitik Investasi segera hadir</p></div>;
      default:
        return <InvestorDashboard />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Portal Investasi</h1>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <TrendingUp className="w-4 h-4" />
          <span>Investasi Baru</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600 dark:text-green-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default InvestmentPortal;