import React from 'react';
import { financialMetrics, recentTransactions, budgetOverview } from '../../../data/financial';
import { DollarSign, TrendingUp, TrendingDown, AlertCircle, ArrowRight } from 'lucide-react';

const FinancialOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {financialMetrics.map((metric, index) => (
          <div key={index} className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-green-500" />
              {metric.trend === 'up' ? (
                <TrendingUp className="w-5 h-5 text-green-500" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-500" />
              )}
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.title}</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{metric.value}</p>
            <p className={`text-sm font-medium mt-2 ${metric.color}`}>
              {metric.change} from last month
            </p>
          </div>
        ))}
      </div>

      {/* Budget Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Ringkasan Anggaran per Proyek</h3>
        <div className="space-y-4">
          {budgetOverview.map((project, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900 dark:text-white">{project.project}</h4>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Anggaran: ${(project.budget / 1000).toFixed(0)}K
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Sisa: ${(project.remaining / 1000).toFixed(0)}K
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
                  style={{ width: `${(project.spent / project.budget) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                <span>{((project.spent / project.budget) * 100).toFixed(1)}% terpakai</span>
                <span>${(project.spent / 1000).toFixed(0)}K of ${(project.budget / 1000).toFixed(0)}K</span>
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <button className="w-full text-center text-blue-500 hover:text-blue-600 font-medium">
            <div className="flex items-center justify-center space-x-2">
              <span>Kelola Anggaran Detail</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Transaksi Terbaru</h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {transaction.description}
                  </h4>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                    <span>{transaction.project}</span>
                    <span>•</span>
                    <span>{transaction.category}</span>
                    <span>•</span>
                    <span>{transaction.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-semibold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <button className="w-full text-center text-blue-500 hover:text-blue-600 font-medium">
            <div className="flex items-center justify-center space-x-2">
              <span>Lihat Semua Transaksi</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>

      {/* Financial Alerts */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mt-0.5" />
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Peringatan Keuangan</h4>
            <ul className="mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>• Penggunaan anggaran proyek Sunset Gardens mencapai 94% - Perlu review</li>
              <li>• Proyeksi arus kas menunjukkan potensi kekurangan di Q3 2024</li>
              <li>• Pembayaran invoice tertunda total $125K telah lewat 15+ hari</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialOverview;