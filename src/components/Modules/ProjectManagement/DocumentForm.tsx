import React, { useState, useEffect } from 'react';
import { X, Save, Upload, FileText } from 'lucide-react';
import { Document } from '../../../data/projects';

interface DocumentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (documentData: Partial<Document>) => void;
  document?: Document | null;
  mode: 'create' | 'edit';
}

const DocumentForm: React.FC<DocumentFormProps> = ({
  isOpen,
  onClose,
  onSave,
  document,
  mode
}) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Gambar Kerja',
    uploader: '',
    status: 'menunggu' as Document['status']
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const documentTypes = [
    'Gambar Kerja',
    'Dokumen Legal',
    'Laporan',
    'Dokumen K3',
    'Spesifikasi'
  ];

  useEffect(() => {
    if (document && mode === 'edit') {
      setFormData({
        name: document.name,
        type: document.type,
        uploader: document.uploader,
        status: document.status
      });
    } else {
      setFormData({
        name: '',
        type: 'Gambar Kerja',
        uploader: '',
        status: 'menunggu'
      });
    }
    setErrors({});
  }, [document, mode, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama dokumen wajib diisi';
    }
    if (!formData.uploader.trim()) {
      newErrors.uploader = 'Nama pengunggah wajib diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const documentData: Partial<Document> = {
        ...formData,
        id: document?.id || Date.now(),
        size: document?.size || '1.2 MB',
        uploadDate: document?.uploadDate || new Date().toISOString().split('T')[0]
      };
      
      onSave(documentData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {mode === 'create' ? 'Upload Dokumen Baru' : 'Edit Dokumen'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* File Upload (only for create mode) */}
            {mode === 'create' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Upload className="w-4 h-4 inline mr-1" />
                  File Dokumen
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Klik untuk memilih file atau drag & drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    PDF, DOC, DOCX, XLS, XLSX, DWG (Max. 10MB)
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.dwg"
                  />
                </div>
              </div>
            )}

            {/* Nama Dokumen */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FileText className="w-4 h-4 inline mr-1" />
                Nama Dokumen *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                  errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Masukkan nama dokumen"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Tipe dan Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tipe Dokumen
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  {documentTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="menunggu">Menunggu Review</option>
                  <option value="disetujui">Disetujui</option>
                  <option value="ditolak">Ditolak</option>
                </select>
              </div>
            </div>

            {/* Pengunggah */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pengunggah *
              </label>
              <input
                type="text"
                name="uploader"
                value={formData.uploader}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                  errors.uploader ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Masukkan nama pengunggah"
              />
              {errors.uploader && <p className="text-red-500 text-sm mt-1">{errors.uploader}</p>}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors duration-200"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{mode === 'create' ? 'Upload Dokumen' : 'Perbarui Dokumen'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocumentForm;