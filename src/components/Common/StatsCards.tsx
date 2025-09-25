import React from 'react';

interface Stat {
  title: string;
  value: string;
  change: string;
  color: string;
}

interface StatsCardsProps {
  stats: Stat[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center`}>
              <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full"></div>
            </div>
          </div>
          <div className="mt-4">
            <span className={`text-sm font-medium ${
              stat.change.startsWith('+') ? 'text-green-600' : stat.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'
            }`}>
              {stat.change} from last month
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;