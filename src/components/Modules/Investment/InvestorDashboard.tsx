import React from 'react';
import { investmentSummary, recentInvestments, performanceData, upcomingPayouts } from '../../../data/investments';
import { TrendingUp, DollarSign, Percent, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const InvestorDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Investment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Nilai Portofolio</p>
              <p className="text-3xl font-bold">${(investmentSummary.totalPortfolio / 1000).toFixed(0)}K</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-200" />
          </div>
          <p className="text-green-200 text-sm mt-2">+{investmentSummary.growthRate}% tahun ini</p>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Investasi Aktif</p>
              <p className="text-3xl font-bold">{investmentSummary.activeInvestments}</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-200" />
          </div>
          <p className="text-blue-200 text-sm mt-2">Di berbagai proyek</p>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Keuntungan Bulanan</p>
              <p className="text-3xl font-bold">${(investmentSummary.monthlyReturns / 1000).toFixed(0)}K</p>
            </div>
            <Calendar className="w-8 h-8 text-orange-200" />
          </div>
          <p className="text-orange-200 text-sm mt-2">Pendapatan bulan ini</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">ROI Rata-rata</p>
              <p className="text-3xl font-bold">{investmentSummary.averageROI}%</p>
            </div>
            <Percent className="w-8 h-8 text-purple-200" />
          </div>
          <p className="text-purple-200 text-sm mt-2">Tingkat pengembalian tahunan</p>
        </div>
      </div>

      {/* Portfolio Performance Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Kinerja Portofolio</h3>
        <div className="relative h-64">
          <div className="flex items-end justify-between h-full space-x-4">
            {performanceData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t transition-all duration-500 hover:from-green-600 hover:to-green-500"
                  style={{ height: `${((data.value - 700000) / 150000) * 100}%` }}
                ></div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{data.month}</span>
                <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                  ${(data.value / 1000).toFixed(0)}K
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Investments */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Investasi Terbaru</h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentInvestments.map((investment) => (
              <div key={investment.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{investment.project}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Investasi: ${investment.amount.toLocaleString()} • {investment.date}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Nilai Saat Ini: ${investment.currentValue.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      {investment.roi > 15 ? (
                        <ArrowUpRight className="w-4 h-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-orange-500" />
                      )}
                      <span className={`font-semibold ${
                        investment.roi > 15 ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        +{investment.roi}%
                      </span>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full mt-1 ${
                      investment.status === 'aktif'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {investment.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Payouts */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pembayaran Mendatang</h3>
          </div>
          <div className="p-6 space-y-4">
            {upcomingPayouts.map((payout, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{payout.project}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{payout.type}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Jatuh tempo: {payout.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                    ${payout.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900 dark:text-white">Total Diharapkan</span>
                <span className="text-xl font-bold text-green-600 dark:text-green-400">
                  ${upcomingPayouts.reduce((sum, payout) => sum + payout.amount, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Opportunities Alert */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Peluang Investasi Baru</h4>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              3 proyek baru tersedia untuk investasi dengan ROI yang diharapkan 16-22%
            </p>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
            Lihat Proyek
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;