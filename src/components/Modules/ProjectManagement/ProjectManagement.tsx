import React, { useState } from 'react';
import { useNotifications } from '../../../contexts/NotificationContext';
import ProjectOverview from './ProjectOverview';
import ProjectTimeline from './ProjectTimeline';
import ProjectDocuments from './ProjectDocuments';
import ProjectForm from './ProjectForm';
import ProjectDetail from './ProjectDetail';
import ConfirmationModal from '../../Common/ConfirmationModal';
import { Building, Calendar, FileText, Camera } from 'lucide-react';
import { Project, projects as initialProjects } from '../../../data/projects';

const ProjectManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showProjectDetail, setShowProjectDetail] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  
  const { addNotification } = useNotifications();

  const tabs = [
    { id: 'overview', label: 'Ringkasan', icon: Building },
    { id: 'timeline', label: 'Timeline', icon: Calendar },
    { id: 'documents', label: 'Dokumen', icon: FileText },
    { id: 'photos', label: 'Foto Progres', icon: Camera }
  ];

  const handleCreateProject = () => {
    setSelectedProject(null);
    setFormMode('create');
    setShowProjectForm(true);
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setFormMode('edit');
    setShowProjectForm(true);
    setShowProjectDetail(false);
  };

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setShowProjectDetail(true);
  };

  const handleDeleteProject = (project: Project) => {
    setProjectToDelete(project);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteProject = () => {
    if (projectToDelete) {
      setProjects(prev => prev.filter(p => p.id !== projectToDelete.id));
      addNotification({
        title: 'Proyek Dihapus',
        message: `Proyek "${projectToDelete.name}" berhasil dihapus`,
        type: 'success'
      });
      setShowDeleteConfirm(false);
      setProjectToDelete(null);
      setShowProjectDetail(false);
    }
  };

  const handleSaveProject = (projectData: Partial<Project>) => {
    if (formMode === 'create') {
      const newProject: Project = {
        ...projectData as Project,
        id: `project-${Date.now()}`
      };
      setProjects(prev => [...prev, newProject]);
      addNotification({
        title: 'Proyek Dibuat',
        message: `Proyek "${newProject.name}" berhasil dibuat`,
        type: 'success'
      });
    } else if (selectedProject) {
      setProjects(prev => prev.map(p => 
        p.id === selectedProject.id 
          ? { ...p, ...projectData }
          : p
      ));
      addNotification({
        title: 'Proyek Diperbarui',
        message: `Proyek "${projectData.name}" berhasil diperbarui`,
        type: 'success'
      });
      
      // Update selected project if we're viewing details
      if (showProjectDetail) {
        setSelectedProject(prev => prev ? { ...prev, ...projectData } : null);
      }
    }
  };

  const handleBackToList = () => {
    setShowProjectDetail(false);
    setSelectedProject(null);
  };

  const renderContent = () => {
    if (showProjectDetail && selectedProject) {
      return (
        <ProjectDetail
          project={selectedProject}
          onBack={handleBackToList}
          onEdit={handleEditProject}
          onDelete={handleDeleteProject}
        />
      );
    }

    switch (activeTab) {
      case 'overview':
        return (
          <ProjectOverview 
            projects={projects}
            onViewProject={handleViewProject}
            onEditProject={handleEditProject}
            onDeleteProject={handleDeleteProject}
          />
        );
      case 'timeline':
        return <ProjectTimeline />;
      case 'documents':
        return <ProjectDocuments />;
      case 'photos':
        return <div className="text-center py-12"><p className="text-gray-500">Modul Foto Progres segera hadir</p></div>;
      default:
        return <ProjectOverview />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manajemen Proyek</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          onClick={handleCreateProject}
          <Building className="w-4 h-4" />
          <span>Proyek Baru</span>
        </button>
      </div>

      {!showProjectDetail && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
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
      )}

      {showProjectDetail && (
        <div>
          {renderContent()}
        </div>
      )}

      {/* Project Form Modal */}
      <ProjectForm
        isOpen={showProjectForm}
        onClose={() => setShowProjectForm(false)}
        onSave={handleSaveProject}
        project={selectedProject}
        mode={formMode}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteConfirm}
        title="Hapus Proyek"
        message={`Apakah Anda yakin ingin menghapus proyek "${projectToDelete?.name}"? Tindakan ini tidak dapat dibatalkan.`}
        onConfirm={confirmDeleteProject}
        onCancel={() => {
          setShowDeleteConfirm(false);
          setProjectToDelete(null);
        }}
        type="danger"
      />
    </div>
  );
};

export default ProjectManagement;