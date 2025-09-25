import React, { useState, useEffect } from 'react';
import { X, Save, Calculator, Plus, Trash2 } from 'lucide-react';

interface BudgetItem {
  name: string;
  budgeted: number;
  spent: number;
}

interface BudgetCategory {
  category: string;
  budgeted: number;
  spent: number;
  remaining: number;
  items: BudgetItem[];
}

interface BudgetFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (budgetData: Partial<BudgetCategory>) => void;
  budget?: BudgetCategory | null;
  mode: 'create' | 'edit';
}

const BudgetForm: React.FC<BudgetFormProps> = ({
  isOpen,
  onClose,
  onSave,
  budget,
  mode
}) => {
  const [formData, setFormData] = useState({
    category: '',
    budgeted: 0,
    spent: 0,
    items: [] as BudgetItem[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (budget && mode === 'edit') {
      setFormData({
        category: budget.category,
        budgeted: budget.budgeted,
        spent: budget.spent,
        items: [...budget.items]
      });
    } else {
      setFormData({
        category: '',
        budgeted: 0,
        spent: 0,
        items: []
      });
    }
    setErrors({});
  }, [budget, mode, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'budgeted' || name === 'spent' ? Number(value) : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleItemChange = (index: number, field: keyof BudgetItem, value: string | number) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: field === 'name' ? value : Number(value)
    };
    setFormData(prev => ({ ...prev, items: updatedItems }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { name: '', budgeted: 0, spent: 0 }]
    }));
  };

  const removeItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.category.trim()) {
      newErrors.category = 'Nama kategori wajib diisi';
    }
    if (formData.budgeted <= 0) {
      newErrors.budgeted = 'Anggaran harus lebih dari 0';
    }

    // Validate items
    formData.items.forEach((item, index) => {
      if (!item.name.trim()) {
        newErrors[`item_${index}_name`] = 'Nama item wajib diisi';
      }
      if (item.budgeted <= 0) {
        newErrors[`item_${index}_budgeted`] = 'Anggaran item harus lebih dari 0';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const budgetData: Partial<BudgetCategory> = {
        ...formData,
        remaining: formData.budgeted - formData.spent
      };
      
      onSave(budgetData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {mode === 'create' ? 'Tambah Kategori Anggaran' : 'Edit Kategori Anggaran'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Kategori Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Calculator className="w-4 h-4 inline mr-1" />
                  Nama Kategori *
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                    errors.category ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Masukkan nama kategori"
                />
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Total Anggaran (USD) *
                </label>
                <input
                  type="number"
                  name="budgeted"
                  value={formData.budgeted}
                  onChange={handleInputChange}
                  min="0"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                    errors.budgeted ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="0"
                />
                {errors.budgeted && <p className="text-red-500 text-sm mt-1">{errors.budgeted}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dana Terpakai (USD)
                </label>
                <input
                  type="number"
                  name="spent"
                  value={formData.spent}
                  onChange={handleInputChange}
                  min="0"
                  max={formData.budgeted}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Items Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Item Anggaran</h3>
                <button
                  type="button"
                  onClick={addItem}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Item</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nama Item *
                      </label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white ${
                          errors[`item_${index}_name`] ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'
                        }`}
                        placeholder="Nama item"
                      />
                      {errors[`item_${index}_name`] && (
                        <p className="text-red-500 text-xs mt-1">{errors[`item_${index}_name`]}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Anggaran *
                      </label>
                      <input
                        type="number"
                        value={item.budgeted}
                        onChange={(e) => handleItemChange(index, 'budgeted', e.target.value)}
                        min="0"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white ${
                          errors[`item_${index}_budgeted`] ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'
                        }`}
                        placeholder="0"
                      />
                      {errors[`item_${index}_budgeted`] && (
                        <p className="text-red-500 text-xs mt-1">{errors[`item_${index}_budgeted`]}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Terpakai
                      </label>
                      <input
                        type="number"
                        value={item.spent}
                        onChange={(e) => handleItemChange(index, 'spent', e.target.value)}
                        min="0"
                        max={item.budgeted}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white"
                        placeholder="0"
                      />
                    </div>

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="w-full bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg flex items-center justify-center space-x-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                ))}

                {formData.items.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    Belum ada item anggaran. Klik "Tambah Item" untuk menambahkan.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors duration-200"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{mode === 'create' ? 'Simpan Kategori' : 'Perbarui Kategori'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BudgetForm;