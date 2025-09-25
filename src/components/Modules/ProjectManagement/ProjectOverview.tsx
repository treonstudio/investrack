import React from 'react';
import { Project } from '../../../data/projects';
import { MapPin, Users, DollarSign, Calendar, TrendingUp, Building, Eye, Edit, Trash2 } from 'lucide-react';

interface ProjectOverviewProps {
  projects: Project[];
  onViewProject: (project: Project) => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (project: Project) => void;
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({
  projects,
  onViewProject,
  onEditProject,
  onDeleteProject
}) => {
  const totalBudget = projects.reduce((sum, project) => sum + project.budget, 0);
  const totalSpent = projects.reduce((sum, project) => sum + project.spent, 0);
  const averageProgress = projects.reduce((sum, project) => sum + project.progress, 0) / projects.length;
  const activeProjects = projects.filter(project => project.status === 'Sedang Berjalan').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Proyek Aktif</p>
              <p className="text-3xl font-bold">{activeProjects}</p>
            </div>
            <Building className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Total Investasi</p>
              <p className="text-3xl font-bold">${(totalBudget / 1000000).toFixed(1)}M</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Progres Rata-rata</p>
              <p className="text-3xl font-bold">{Math.round(averageProgress)}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{project.name}</h3>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{project.teamSize} anggota</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{project.startDate} - {project.endDate}</span>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-white text-sm ${project.statusColor}`}>
                {project.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Progres</p>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-900 dark:text-white font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Anggaran</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">${(project.budget / 1000000).toFixed(1)}M</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Terpakai: ${(project.spent / 1000000).toFixed(1)}M</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Penggunaan Anggaran</p>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(project.spent / project.budget) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => onViewProject(project)}
                className="flex items-center space-x-1 px-3 py-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                <Eye className="w-4 h-4" />
                <span>Lihat Detail</span>
              </button>
              <button 
                onClick={() => onEditProject(project)}
                className="flex items-center space-x-1 px-3 py-1.5 text-gray-600 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button 
                onClick={() => onDeleteProject(project)}
                className="flex items-center space-x-1 px-3 py-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Belum Ada Proyek</h3>
          <p className="text-gray-600 dark:text-gray-400">Mulai dengan membuat proyek baru untuk mengelola pengembangan properti Anda.</p>
        </div>
      )}
    </div>
  );
};

export default ProjectOverview;