import React, { useState } from 'react';
import FinancialOverview from './FinancialOverview';
import BudgetManagement from './BudgetManagement';
import FinancialReports from './FinancialReports';
import TransactionManagement from './TransactionManagement';
import { DollarSign, Calculator, FileBarChart, CreditCard } from 'lucide-react';

const FinancialManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Ringkasan', icon: DollarSign },
    { id: 'budget', label: 'Budget & RAB', icon: Calculator },
    { id: 'reports', label: 'Laporan', icon: FileBarChart },
    { id: 'payments', label: 'Pembayaran', icon: CreditCard }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <FinancialOverview />;
      case 'budget':
        return <BudgetManagement />;
      case 'reports':
        return <FinancialReports />;
      case 'payments':
        return <TransactionManagement />;
      default:
        return <FinancialOverview />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manajemen Keuangan</h1>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Calculator className="w-4 h-4" />
          <span>Anggaran Baru</span>
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

export default FinancialManagement;