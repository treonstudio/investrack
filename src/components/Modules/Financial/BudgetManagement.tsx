import React, { useState } from 'react';
import { useNotifications } from '../../../contexts/NotificationContext';
import { budgetCategories } from '../../../data/financial';
import { projects } from '../../../data/projects';
import { Plus, Calculator, Edit, Trash2, Download } from 'lucide-react';
import BudgetForm from './BudgetForm';
import ConfirmationModal from '../../Common/ConfirmationModal';

interface BudgetCategory {
  category: string;
  budgeted: number;
  spent: number;
  remaining: number;
  items: { name: string; budgeted: number; spent: number }[];
}
const BudgetManagement: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState('emerald-hills');
  const [budgets, setBudgets] = useState<BudgetCategory[]>(budgetCategories);
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<BudgetCategory | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [budgetToDelete, setBudgetToDelete] = useState<BudgetCategory | null>(null);
  
  const { addNotification } = useNotifications();

  const projectOptions = projects.map(project => ({ id: project.id, name: project.name }));

  const totalBudget = budgets.reduce((sum, cat) => sum + cat.budgeted, 0);
  const totalSpent = budgets.reduce((sum, cat) => sum + cat.spent, 0);
  const totalRemaining = budgets.reduce((sum, cat) => sum + cat.remaining, 0);

  const handleCreateBudget = () => {
    setSelectedBudget(null);
    setFormMode('create');
    setShowBudgetForm(true);
  };

  const handleEditBudget = (budget: BudgetCategory) => {
    setSelectedBudget(budget);
    setFormMode('edit');
    setShowBudgetForm(true);
  };

  const handleDeleteBudget = (budget: BudgetCategory) => {
    setBudgetToDelete(budget);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteBudget = () => {
    if (budgetToDelete) {
      setBudgets(prev => prev.filter(b => b.category !== budgetToDelete.category));
      addNotification({
        title: 'Kategori Anggaran Dihapus',
        message: `Kategori "${budgetToDelete.category}" berhasil dihapus`,
        type: 'success'
      });
      setShowDeleteConfirm(false);
      setBudgetToDelete(null);
    }
  };

  const handleSaveBudget = (budgetData: Partial<BudgetCategory>) => {
    if (formMode === 'create') {
      const newBudget: BudgetCategory = {
        ...budgetData as BudgetCategory
      };
      setBudgets(prev => [...prev, newBudget]);
      addNotification({
        title: 'Kategori Anggaran Ditambahkan',
        message: `Kategori "${newBudget.category}" berhasil ditambahkan`,
        type: 'success'
      });
    } else if (selectedBudget) {
      setBudgets(prev => prev.map(b => 
        b.category === selectedBudget.category 
          ? { ...b, ...budgetData }
          : b
      ));
      addNotification({
        title: 'Kategori Anggaran Diperbarui',
        message: `Kategori "${budgetData.category}" berhasil diperbarui`,
        type: 'success'
      });
    }
  };

  return (
    <>
      <div className="space-y-6">
      {/* Project Selector and Summary */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Manajemen Anggaran</h3>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {projectOptions.map((project) => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            onClick={handleCreateBudget}
            <Plus className="w-4 h-4" />
            <span>Tambah Kategori</span>
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Ekspor RAB</span>
          </button>
        </div>
      </div>

      {/* Budget Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <h4 className="text-blue-100 text-sm">Total Anggaran</h4>
          <p className="text-3xl font-bold">${(totalBudget / 1000).toFixed(0)}K</p>
          <p className="text-blue-200 text-sm mt-1">Dialokasikan untuk proyek</p>
        </div>
        
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
          <h4 className="text-red-100 text-sm">Total Terpakai</h4>
          <p className="text-3xl font-bold">${(totalSpent / 1000).toFixed(0)}K</p>
          <p className="text-red-200 text-sm mt-1">{((totalSpent / totalBudget) * 100).toFixed(1)}% dari anggaran</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <h4 className="text-green-100 text-sm">Sisa</h4>
          <p className="text-3xl font-bold">${(totalRemaining / 1000).toFixed(0)}K</p>
          <p className="text-green-200 text-sm mt-1">{((totalRemaining / totalBudget) * 100).toFixed(1)}% tersisa</p>
        </div>
      </div>

      {/* Budget Categories */}
      <div className="space-y-4">
        {budgets.map((category, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{category.category}</h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ${(category.spent / 1000).toFixed(0)}K / ${(category.budgeted / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    onClick={() => handleEditBudget(category)}
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600">
                    onClick={() => handleDeleteBudget(category)}
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <span>Progres</span>
                  <span>{((category.spent / category.budgeted) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                    style={{ width: `${Math.min((category.spent / category.budgeted) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h5 className="font-medium text-gray-900 dark:text-white">{item.name}</h5>
                    <div className="mt-2 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Anggaran:</span>
                        <span className="text-gray-900 dark:text-white">${(item.budgeted / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Terpakai:</span>
                        <span className="text-gray-900 dark:text-white">${(item.spent / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Sisa:</span>
                        <span className="text-green-600 dark:text-green-400">${((item.budgeted - item.spent) / 1000).toFixed(0)}K</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full"
                          style={{ width: `${Math.min((item.spent / item.budgeted) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RAB Generator */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-purple-500" />
              <span>RAB (Rencana Anggaran Biaya) Generator</span>
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Buat rincian anggaran detail dan laporan analisis biaya
            </p>
          </div>
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2">
            <Calculator className="w-4 h-4" />
            <span>Buat RAB</span>
          </button>
        </div>
      </div>
      </div>

      {/* Budget Form Modal */}
      <BudgetForm
        isOpen={showBudgetForm}
        onClose={() => setShowBudgetForm(false)}
        onSave={handleSaveBudget}
        budget={selectedBudget}
        mode={formMode}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteConfirm}
        title="Hapus Kategori Anggaran"
        message={`Apakah Anda yakin ingin menghapus kategori "${budgetToDelete?.category}"? Semua item di dalamnya akan ikut terhapus. Tindakan ini tidak dapat dibatalkan.`}
        onConfirm={confirmDeleteBudget}
        onCancel={() => {
          setShowDeleteConfirm(false);
          setBudgetToDelete(null);
        }}
        type="danger"
      />
    </>
  );
};

export default BudgetManagement;