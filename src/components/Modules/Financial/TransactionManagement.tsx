import React, { useState } from 'react';
import { useNotifications } from '../../../contexts/NotificationContext';
import { recentTransactions } from '../../../data/financial';
import { Plus, Search, Filter, Edit, Trash2, DollarSign, Calendar, Tag } from 'lucide-react';
import TransactionForm from './TransactionForm';
import ConfirmationModal from '../../Common/ConfirmationModal';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: string;
  project: string;
}

const TransactionManagement: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(recentTransactions);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState('all');
  
  const { addNotification } = useNotifications();

  const categories = ['all', 'Material', 'Tenaga Kerja', 'Peralatan', 'Perizinan & Legal', 'Pemasaran', 'Investasi', 'Penjualan', 'SDM', 'Lahan'];
  const projects = ['all', 'Emerald Hills', 'Golden Valley', 'Sunset Gardens', 'Marina Luxury', 'Central Plaza', 'All Projects'];

  const handleCreateTransaction = () => {
    setSelectedTransaction(null);
    setFormMode('create');
    setShowTransactionForm(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setFormMode('edit');
    setShowTransactionForm(true);
  };

  const handleDeleteTransaction = (transaction: Transaction) => {
    setTransactionToDelete(transaction);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteTransaction = () => {
    if (transactionToDelete) {
      setTransactions(prev => prev.filter(t => t.id !== transactionToDelete.id));
      addNotification({
        title: 'Transaksi Dihapus',
        message: `Transaksi "${transactionToDelete.description}" berhasil dihapus`,
        type: 'success'
      });
      setShowDeleteConfirm(false);
      setTransactionToDelete(null);
    }
  };

  const handleSaveTransaction = (transactionData: Partial<Transaction>) => {
    if (formMode === 'create') {
      const newTransaction: Transaction = {
        ...transactionData as Transaction,
        id: Date.now()
      };
      setTransactions(prev => [newTransaction, ...prev]);
      addNotification({
        title: 'Transaksi Ditambahkan',
        message: `Transaksi "${newTransaction.description}" berhasil ditambahkan`,
        type: 'success'
      });
    } else if (selectedTransaction) {
      setTransactions(prev => prev.map(t => 
        t.id === selectedTransaction.id 
          ? { ...t, ...transactionData }
          : t
      ));
      addNotification({
        title: 'Transaksi Diperbarui',
        message: `Transaksi "${transactionData.description}" berhasil diperbarui`,
        type: 'success'
      });
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || transaction.category === selectedCategory;
    const matchesProject = selectedProject === 'all' || transaction.project === selectedProject;
    
    return matchesSearch && matchesCategory && matchesProject;
  });

  const totalIncome = filteredTransactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = filteredTransactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const netAmount = totalIncome - totalExpense;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Manajemen Transaksi</h3>
        <button 
          onClick={handleCreateTransaction}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Transaksi</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Total Pemasukan</p>
              <p className="text-3xl font-bold">${totalIncome.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100">Total Pengeluaran</p>
              <p className="text-3xl font-bold">${totalExpense.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-red-200" />
          </div>
        </div>

        <div className={`bg-gradient-to-r ${netAmount >= 0 ? 'from-blue-500 to-blue-600' : 'from-orange-500 to-orange-600'} rounded-xl p-6 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${netAmount >= 0 ? 'text-blue-100' : 'text-orange-100'}`}>Saldo Bersih</p>
              <p className="text-3xl font-bold">${Math.abs(netAmount).toLocaleString()}</p>
            </div>
            <DollarSign className={`w-8 h-8 ${netAmount >= 0 ? 'text-blue-200' : 'text-orange-200'}`} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari transaksi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Semua Kategori' : category}
                </option>
              ))}
            </select>

            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              {projects.map((project) => (
                <option key={project} value={project}>
                  {project === 'all' ? 'Semua Proyek' : project}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Deskripsi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Jumlah
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Proyek
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {transaction.description}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`font-semibold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      {transaction.amount > 0 ? 'Pemasukan' : 'Pengeluaran'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1 text-gray-900 dark:text-white">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{transaction.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">{transaction.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">
                    {transaction.project}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleEditTransaction(transaction)}
                        className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteTransaction(transaction)}
                        className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Tidak Ada Transaksi</h3>
            <p className="text-gray-600 dark:text-gray-400">Belum ada transaksi yang sesuai dengan filter yang dipilih.</p>
          </div>
        )}
      </div>

      {/* Transaction Form Modal */}
      <TransactionForm
        isOpen={showTransactionForm}
        onClose={() => setShowTransactionForm(false)}
        onSave={handleSaveTransaction}
        transaction={selectedTransaction}
        mode={formMode}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteConfirm}
        title="Hapus Transaksi"
        message={`Apakah Anda yakin ingin menghapus transaksi "${transactionToDelete?.description}"? Tindakan ini tidak dapat dibatalkan.`}
        onConfirm={confirmDeleteTransaction}
        onCancel={() => {
          setShowDeleteConfirm(false);
          setTransactionToDelete(null);
        }}
        type="danger"
      />
    </div>
  );
};

export default TransactionManagement;