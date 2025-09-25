import React, { useState } from 'react';
import { reportTypes, financialSummary, monthlyFinancialData } from '../../../data/financial';
import { FileBarChart, Download, Calendar, Filter } from 'lucide-react';

const FinancialReports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedProject, setSelectedProject] = useState('all');

  const monthlyData = monthlyFinancialData.slice(0, 6); // Show first 6 months

  return (
    <div className="space-y-6">
      {/* Report Filters */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Laporan Keuangan</h3>
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="monthly">Bulanan</option>
            <option value="quarterly">Kuartalan</option>
            <option value="yearly">Tahunan</option>
          </select>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">Semua Proyek</option>
            <option value="emerald-hills">Emerald Hills</option>
            <option value="golden-valley">Golden Valley</option>
            <option value="sunset-gardens">Sunset Gardens</option>
          </select>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Terapkan Filter</span>
          </button>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <h4 className="text-green-100 text-sm">Total Pendapatan</h4>
          <p className="text-3xl font-bold">${(financialSummary.totalRevenue / 1000000).toFixed(1)}M</p>
          <p className="text-green-200 text-sm mt-1">+{financialSummary.monthlyGrowth}% dari bulan lalu</p>
        </div>
        
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
          <h4 className="text-red-100 text-sm">Total Pengeluaran</h4>
          <p className="text-3xl font-bold">${(financialSummary.totalExpenses / 1000000).toFixed(1)}M</p>
          <p className="text-red-200 text-sm mt-1">Biaya operasional</p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <h4 className="text-blue-100 text-sm">Laba Bersih</h4>
          <p className="text-3xl font-bold">${(financialSummary.netProfit / 1000000).toFixed(1)}M</p>
          <p className="text-blue-200 text-sm mt-1">{financialSummary.profitMargin}% margin keuntungan</p>
        </div>
      </div>

      {/* Monthly Performance Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-6">Kinerja Keuangan Bulanan</h4>
        <div className="space-y-4">
          {monthlyData.map((data, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex-1">
                <h5 className="font-medium text-gray-900 dark:text-white">{data.month}</h5>
                <div className="flex items-center space-x-6 mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>Pendapatan: ${(data.revenue / 1000).toFixed(0)}K</span>
                  <span>Pengeluaran: ${(data.expenses / 1000).toFixed(0)}K</span>
                  <span className="text-green-600 dark:text-green-400">Laba: ${(data.profit / 1000).toFixed(0)}K</span>
                </div>
              </div>
              <div className="w-32">
                <div className="flex items-end h-12 space-x-1">
                  <div 
                    className="bg-blue-500 rounded-sm flex-1"
                    style={{ height: `${(data.revenue / 520000) * 100}%` }}
                  ></div>
                  <div 
                    className="bg-red-500 rounded-sm flex-1"
                    style={{ height: `${(data.expenses / 520000) * 100}%` }}
                  ></div>
                  <div 
                    className="bg-green-500 rounded-sm flex-1"
                    style={{ height: `${(data.profit / 520000) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Reports */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h4 className="font-semibold text-gray-900 dark:text-white">Laporan Tersedia</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {reportTypes.map((report, index) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md transition-all duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="text-2xl">{report.icon}</div>
                <button className="p-1 text-gray-400 hover:text-blue-500">
                  <Download className="w-4 h-4" />
                </button>
              </div>
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">{report.title}</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{report.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                <span>Terakhir: {report.lastGenerated}</span>
                <span>{report.size}</span>
              </div>
              <button className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-sm font-medium">
                Buat Laporan
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Aksi Cepat</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow duration-200">
            <FileBarChart className="w-5 h-5 text-blue-500" />
            <div className="text-left">
              <p className="font-medium text-gray-900 dark:text-white">Laporan Kustom</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Buat analisis kustom</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow duration-200">
            <Calendar className="w-5 h-5 text-green-500" />
            <div className="text-left">
              <p className="font-medium text-gray-900 dark:text-white">Jadwalkan Laporan</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Otomatisasi pembuatan laporan</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow duration-200">
            <Download className="w-5 h-5 text-purple-500" />
            <div className="text-left">
              <p className="font-medium text-gray-900 dark:text-white">Ekspor Semua</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Ekspor laporan massal</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinancialReports;