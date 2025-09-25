import React, { useState } from 'react';
import { portfolioInvestments, portfolioBreakdown, investmentSummary } from '../../../data/investments';
import { PieChart, TrendingUp, DollarSign, Calendar, MoreVertical } from 'lucide-react';

const PortfolioManagement: React.FC = () => {
  const [selectedView, setSelectedView] = useState('overview');

  const portfolioData = investmentSummary;

  const investments = portfolioInvestments;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aktif': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Selesai': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Menunggu': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Rendah': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Sedang': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Tinggi': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Manajemen Portofolio</h3>
        <div className="flex items-center space-x-3">
          <select
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="overview">Ringkasan</option>
            <option value="performance">Kinerja</option>
            <option value="dividends">Dividen</option>
          </select>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
            Ekspor Laporan
          </button>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Nilai Portofolio</p>
              <p className="text-3xl font-bold">${(portfolioData.totalPortfolio / 1000).toFixed(0)}K</p>
            </div>
            <PieChart className="w-8 h-8 text-blue-200" />
          </div>
          <p className="text-blue-200 text-sm mt-2">Total nilai saat ini</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Total Keuntungan</p>
              <p className="text-3xl font-bold">${(portfolioData.totalReturns / 1000).toFixed(0)}K</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-200" />
          </div>
          <p className="text-green-200 text-sm mt-2">+{portfolioData.growthRate}% keuntungan</p>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Pendapatan Bulanan</p>
              <p className="text-3xl font-bold">${(portfolioData.monthlyReturns / 1000).toFixed(0)}K</p>
            </div>
            <DollarSign className="w-8 h-8 text-orange-200" />
          </div>
          <p className="text-orange-200 text-sm mt-2">Dari investasi aktif</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">ROI Rata-rata</p>
              <p className="text-3xl font-bold">{portfolioData.averageROI}%</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-200" />
          </div>
          <p className="text-purple-200 text-sm mt-2">Tingkat pengembalian tahunan</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-6">Rincian Portofolio</h4>
          <div className="space-y-4">
            {portfolioBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 ${item.color} rounded-full`}></div>
                  <span className="text-gray-700 dark:text-gray-300">{item.category}</span>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white">
                    ${(item.value / 1000).toFixed(0)}K
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {item.percentage}%
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Simple Donut Chart Representation */}
          <div className="mt-6 flex justify-center">
            <div className="relative w-32 h-32">
              <div className="w-full h-full bg-gray-200 dark:bg-gray-600 rounded-full">
                <div className="w-full h-full bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 rounded-full opacity-80"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-6">Kinerja Portofolio</h4>
          <div className="space-y-3">
            {investments.slice(0, 5).map((investment) => (
              <div key={investment.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <h5 className="font-medium text-gray-900 dark:text-white">{investment.projectName}</h5>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                    <span>{investment.type}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(investment.status)}`}>
                      {investment.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(investment.riskLevel)}`}>
                      {investment.riskLevel}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    ${investment.currentValue.toLocaleString()}
                  </p>
                  <p className={`text-sm font-medium ${
                    investment.roi > 15 ? 'text-green-600' : investment.roi > 10 ? 'text-blue-600' : 'text-orange-600'
                  }`}>
                    +{investment.roi}% ROI
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Investment Details Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h4 className="font-semibold text-gray-900 dark:text-white">Detail Investasi</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Proyek
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Investasi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Nilai Saat Ini
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  ROI
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Dividen Bulanan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {investments.map((investment) => (
                <tr key={investment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {investment.projectName}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-500">
                        {investment.type}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                    ${investment.investmentAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                    ${investment.currentValue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`font-medium ${
                      investment.roi > 15 ? 'text-green-600' : investment.roi > 10 ? 'text-blue-600' : 'text-orange-600'
                    }`}>
                      +{investment.roi}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                    ${investment.monthlyDividend.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(investment.status)}`}>
                      {investment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PortfolioManagement;