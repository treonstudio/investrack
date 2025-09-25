import React from 'react';
import { useState } from 'react';
import { useNotifications } from '../../../contexts/NotificationContext';
import { projectDocuments } from '../../../data/projects';
import { FileText, Download, Eye, Upload, Calendar, Edit, Trash2, Plus } from 'lucide-react';
import DocumentForm from './DocumentForm';
import ConfirmationModal from '../../Common/ConfirmationModal';
import { Document } from '../../../data/projects';

const ProjectDocuments: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>(projectDocuments);
  const [showDocumentForm, setShowDocumentForm] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<Document | null>(null);
  
  const { addNotification } = useNotifications();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'disetujui':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'menunggu':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'ditolak':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getFileIcon = (type: string) => {
    return <FileText className="w-10 h-10 text-blue-500" />;
  };

  const handleCreateDocument = () => {
    setSelectedDocument(null);
    setFormMode('create');
    setShowDocumentForm(true);
  };

  const handleEditDocument = (document: Document) => {
    setSelectedDocument(document);
    setFormMode('edit');
    setShowDocumentForm(true);
  };

  const handleDeleteDocument = (document: Document) => {
    setDocumentToDelete(document);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteDocument = () => {
    if (documentToDelete) {
      setDocuments(prev => prev.filter(d => d.id !== documentToDelete.id));
      addNotification({
        title: 'Dokumen Dihapus',
        message: `Dokumen "${documentToDelete.name}" berhasil dihapus`,
        type: 'success'
      });
      setShowDeleteConfirm(false);
      setDocumentToDelete(null);
    }
  };

  const handleSaveDocument = (documentData: Partial<Document>) => {
    if (formMode === 'create') {
      const newDocument: Document = {
        ...documentData as Document,
        id: Date.now()
      };
      setDocuments(prev => [...prev, newDocument]);
      addNotification({
        title: 'Dokumen Diupload',
        message: `Dokumen "${newDocument.name}" berhasil diupload`,
        type: 'success'
      });
    } else if (selectedDocument) {
      setDocuments(prev => prev.map(d => 
        d.id === selectedDocument.id 
          ? { ...d, ...documentData }
          : d
      ));
      addNotification({
        title: 'Dokumen Diperbarui',
        message: `Dokumen "${documentData.name}" berhasil diperbarui`,
        type: 'success'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Dokumen Proyek</h3>
        <button 
          onClick={handleCreateDocument}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Dokumen</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {['Gambar Kerja', 'Dokumen Legal', 'Laporan', 'Dokumen K3', 'Spesifikasi'].map((category) => (
          <button 
            key={category} 
            onClick={handleCreateDocument}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{category}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {Math.floor(Math.random() * 10) + 1} file
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h4 className="font-semibold text-gray-900 dark:text-white">Dokumen Terbaru</h4>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {documents.map((doc) => (
            <div key={doc.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getFileIcon(doc.type)}
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white">{doc.name}</h5>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                      <span>{doc.type}</span>
                      <span>{doc.size}</span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{doc.uploadDate}</span>
                      </div>
                      <span>oleh {doc.uploader}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadge(doc.status)}`}>
                    {doc.status}
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleEditDocument(doc)}
                      className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                      <Download className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteDocument(doc)}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
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

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Statistik Dokumen</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">24</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Dokumen</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">20</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Disetujui</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">4</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Menunggu Review</p>
          </div>
        </div>
      </div>

      {/* Document Form Modal */}
      <DocumentForm
        isOpen={showDocumentForm}
        onClose={() => setShowDocumentForm(false)}
        onSave={handleSaveDocument}
        document={selectedDocument}
        mode={formMode}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteConfirm}
        title="Hapus Dokumen"
        message={`Apakah Anda yakin ingin menghapus dokumen "${documentToDelete?.name}"? Tindakan ini tidak dapat dibatalkan.`}
        onConfirm={confirmDeleteDocument}
        onCancel={() => {
          setShowDeleteConfirm(false);
          setDocumentToDelete(null);
        }}
        type="danger"
      />
    </div>
  );
};

export default ProjectDocuments;