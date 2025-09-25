import React, { useState } from 'react';
import { marketplaceProjects } from '../../../data/investments';
import { MapPin, DollarSign, TrendingUp, Calendar, Users, Star } from 'lucide-react';

const ProjectMarketplace: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const projects = marketplaceProjects;

  const filters = [
    { id: 'all', label: 'Semua Proyek' },
    { id: 'hunian', label: 'Hunian' },
    { id: 'komersial', label: 'Komersial' },
    { id: 'campuran', label: 'Campuran' }
  ];

  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : projects.filter(project => project.type.toLowerCase() === selectedFilter);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Rendah': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Sedang': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Tinggi': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aktif': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Terdanai Penuh': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pasar Investasi</h3>
        <div className="flex items-center space-x-4">
          <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option>Urutkan berdasarkan ROI</option>
            <option>Urutkan berdasarkan Risiko</option>
            <option>Urutkan berdasarkan Durasi</option>
          </select>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              selectedFilter === filter.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <div className="relative">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(project.riskLevel)}`}>
                  Risiko {project.riskLevel}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{project.name}</h4>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{project.investors} investor</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400" />
                      <span>{project.rating}</span>
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{project.type}</span>
              </div>

              {/* Funding Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Progres Pendanaan</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${(project.fundingRaised / 1000000).toFixed(1)}M / ${(project.fundingNeeded / 1000000).toFixed(1)}M
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                    style={{ width: `${Math.min((project.fundingRaised / project.fundingNeeded) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500 mt-1">
                  <span>{((project.fundingRaised / project.fundingNeeded) * 100).toFixed(1)}% terdanai</span>
                  <span>Sisa: ${((project.fundingNeeded - project.fundingRaised) / 1000000).toFixed(1)}M</span>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">ROI Diharapkan</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{project.expectedROI}%</p>
                </div>
                
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">Durasi</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{project.duration}mo</p>
                </div>
                
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <DollarSign className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">Min. Investasi</p>
                  <p className="font-semibold text-gray-900 dark:text-white">$10K</p>
                </div>
              </div>

              {/* Project Details */}
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 space-y-1">
                <p><strong>Pengembang:</strong> {project.developer}</p>
                <p><strong>Timeline:</strong> {project.startDate} - {project.completionDate}</p>
              </div>

              {/* Action Button */}
              <button
                className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors duration-200 ${
                  project.status === 'Terdanai Penuh'
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
                disabled={project.status === 'Terdanai Penuh'}
              >
                {project.status === 'Terdanai Penuh' ? 'Terdanai Penuh' : 'Investasi Sekarang'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Market Stats */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Ringkasan Pasar</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {projects.length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Proyek Aktif</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              ${(projects.reduce((sum, p) => sum + p.fundingRaised, 0) / 1000000).toFixed(1)}M
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Investasi</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {(projects.reduce((sum, p) => sum + p.expectedROI, 0) / projects.length).toFixed(1)}%
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">ROI Rata-rata</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {projects.reduce((sum, p) => sum + p.investors, 0)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Investor</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectMarketplace;