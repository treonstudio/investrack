import React from 'react';
import { TrendingUp } from 'lucide-react';

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

interface ChartWidgetProps {
  title: string;
  data: ChartData;
}

const ChartWidget: React.FC<ChartWidgetProps> = ({ title, data }) => {
  // Simple line chart simulation using CSS
  const maxValue = Math.max(...data.datasets[0].data);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <TrendingUp className="w-5 h-5 text-green-500" />
      </div>
      
      <div className="relative h-64">
        <div className="flex items-end justify-between h-full space-x-2">
          {data.datasets[0].data.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-blue-500 rounded-t transition-all duration-500 hover:bg-blue-600"
                style={{ height: `${(value / maxValue) * 100}%` }}
              ></div>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {data.labels[index]}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>{data.datasets[0].label}</span>
          <span className="text-green-500 font-medium">+{((data.datasets[0].data[data.datasets[0].data.length - 1] / data.datasets[0].data[0] - 1) * 100).toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
};

export default ChartWidget;