import React from 'react';
import { useState } from 'react';
import { useNotifications } from '../../../contexts/NotificationContext';
import { emeraldHillsMilestones } from '../../../data/projects';
import { CheckCircle, Circle, Clock, AlertCircle, Plus, Edit, Trash2 } from 'lucide-react';
import MilestoneForm from './MilestoneForm';
import ConfirmationModal from '../../Common/ConfirmationModal';
import { Milestone } from '../../../data/projects';

const ProjectTimeline: React.FC = () => {
  const [milestones, setMilestones] = useState<Milestone[]>(emeraldHillsMilestones);
  const [showMilestoneForm, setShowMilestoneForm] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [milestoneToDelete, setMilestoneToDelete] = useState<Milestone | null>(null);
  
  const { addNotification } = useNotifications();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'selesai':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'sedang-berjalan':
        return <Clock className="w-6 h-6 text-blue-500" />;
      case 'terlambat':
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Circle className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'selesai':
        return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      case 'sedang-berjalan':
        return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'terlambat':
        return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      default:
        return 'border-gray-300 bg-gray-50 dark:bg-gray-700';
    }
  };

  const handleCreateMilestone = () => {
    setSelectedMilestone(null);
    setFormMode('create');
    setShowMilestoneForm(true);
  };

  const handleEditMilestone = (milestone: Milestone) => {
    setSelectedMilestone(milestone);
    setFormMode('edit');
    setShowMilestoneForm(true);
  };

  const handleDeleteMilestone = (milestone: Milestone) => {
    setMilestoneToDelete(milestone);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteMilestone = () => {
    if (milestoneToDelete) {
      setMilestones(prev => prev.filter(m => m.id !== milestoneToDelete.id));
      addNotification({
        title: 'Milestone Dihapus',
        message: `Milestone "${milestoneToDelete.title}" berhasil dihapus`,
        type: 'success'
      });
      setShowDeleteConfirm(false);
      setMilestoneToDelete(null);
    }
  };

  const handleSaveMilestone = (milestoneData: Partial<Milestone>) => {
    if (formMode === 'create') {
      const newMilestone: Milestone = {
        ...milestoneData as Milestone,
        id: Date.now()
      };
      setMilestones(prev => [...prev, newMilestone]);
      addNotification({
        title: 'Milestone Dibuat',
        message: `Milestone "${newMilestone.title}" berhasil dibuat`,
        type: 'success'
      });
    } else if (selectedMilestone) {
      setMilestones(prev => prev.map(m => 
        m.id === selectedMilestone.id 
          ? { ...m, ...milestoneData }
          : m
      ));
      addNotification({
        title: 'Milestone Diperbarui',
        message: `Milestone "${milestoneData.title}" berhasil diperbarui`,
        type: 'success'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Timeline Proyek - Emerald Hills</h3>
        <button 
          onClick={handleCreateMilestone}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Milestone</span>
        </button>
      </div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
        
        <div className="space-y-6">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="relative flex items-start space-x-6">
              <div className="relative z-10 flex-shrink-0">
                {getStatusIcon(milestone.status)}
              </div>
              
              <div className={`flex-1 p-4 rounded-lg border-2 ${getStatusColor(milestone.status)}`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{milestone.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{milestone.description}</p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{milestone.date}</span>
                </div>
                
                {milestone.status === 'sedang-berjalan' && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-700 dark:text-gray-300">Progres</span>
                      <span className="font-medium text-gray-900 dark:text-white">{milestone.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${milestone.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                    milestone.status === 'selesai' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                    milestone.status === 'sedang-berjalan' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                    milestone.status === 'terlambat' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                  }`}>
                    {milestone.status.replace('-', ' ')}
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleEditMilestone(milestone)}
                      className="p-1 text-gray-400 hover:text-blue-600 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteMilestone(milestone)}
                      className="p-1 text-gray-400 hover:text-red-600 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 mt-8">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Progres Keseluruhan Proyek</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Total Progres</span>
            <span className="font-medium text-gray-900 dark:text-white">58%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full" style={{ width: '58%' }}></div>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Perkiraan selesai: 15 Desember 2024</span>
            <span>Sesuai jadwal</span>
          </div>
        </div>
      </div>

      {/* Milestone Form Modal */}
      <MilestoneForm
        isOpen={showMilestoneForm}
        onClose={() => setShowMilestoneForm(false)}
        onSave={handleSaveMilestone}
        milestone={selectedMilestone}
        mode={formMode}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteConfirm}
        title="Hapus Milestone"
        message={`Apakah Anda yakin ingin menghapus milestone "${milestoneToDelete?.title}"? Tindakan ini tidak dapat dibatalkan.`}
        onConfirm={confirmDeleteMilestone}
        onCancel={() => {
          setShowDeleteConfirm(false);
          setMilestoneToDelete(null);
        }}
        type="danger"
      />
    </div>
  );
};

export default ProjectTimeline;