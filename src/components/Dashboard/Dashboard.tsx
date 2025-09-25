import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import DashboardContent from './DashboardContent';
import ProjectManagement from '../Modules/ProjectManagement/ProjectManagement';
import FinancialManagement from '../Modules/Financial/FinancialManagement';
import InvestmentPortal from '../Modules/Investment/InvestmentPortal';
import InventoryManagement from '../Modules/Inventory/InventoryManagement';
import HRMSystem from '../Modules/HRM/HRMSystem';
import SalesMarketing from '../Modules/Sales/SalesMarketing';

const Dashboard: React.FC = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardContent />;
      case 'projects':
        return <ProjectManagement />;
      case 'financial':
        return <FinancialManagement />;
      case 'investment':
        return <InvestmentPortal />;
      case 'inventory':
        return <InventoryManagement />;
      case 'hrm':
        return <HRMSystem />;
      case 'sales':
        return <SalesMarketing />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        collapsed={sidebarCollapsed}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          sidebarCollapsed={sidebarCollapsed}
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;