import React, { useState } from 'react';
import { employees, attendanceData, payrollSummary } from '../../../data/hrm';
import { Users, Clock, DollarSign, Calendar } from 'lucide-react';

const HRMSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState('employees');

  const tabs = [
    { id: 'employees', label: 'Karyawan', icon: Users },
    { id: 'attendance', label: 'Absensi', icon: Clock },
    { id: 'payroll', label: 'Payroll', icon: DollarSign },
    { id: 'schedule', label: 'Jadwal', icon: Calendar }
  ];

  const renderEmployees = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Karyawan</p>
              <p className="text-3xl font-bold">{payrollSummary.totalEmployees}</p>
            </div>
            <Users className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Proyek Aktif</p>
              <p className="text-3xl font-bold">8</p>
            </div>
            <Calendar className="w-8 h-8 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Departemen</p>
              <p className="text-3xl font-bold">6</p>
            </div>
            <Users className="w-8 h-8 text-orange-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Rata-rata Absensi</p>
              <p className="text-3xl font-bold">95%</p>
            </div>
            <Clock className="w-8 h-8 text-purple-200" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h4 className="font-semibold text-gray-900 dark:text-white">Direktori Karyawan</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Karyawan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Posisi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Proyek
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Absensi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Gaji
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{employee.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-500">{employee.employeeId}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-500">{employee.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{employee.position}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-500">{employee.department}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">
                    {employee.project}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-12 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mr-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${employee.attendance}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{employee.attendance}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">
                    ${employee.salary.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      {employee.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {attendanceData[0] && (
          <>
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Hadir Hari Ini</p>
                  <p className="text-3xl font-bold">{attendanceData[0].present}</p>
                </div>
                <Clock className="w-8 h-8 text-green-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100">Tidak Hadir Hari Ini</p>
                  <p className="text-3xl font-bold">{attendanceData[0].absent}</p>
                </div>
                <Users className="w-8 h-8 text-red-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100">Terlambat</p>
                  <p className="text-3xl font-bold">{attendanceData[0].late}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Jam Lembur</p>
                  <p className="text-3xl font-bold">{attendanceData[0].overtime}</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-200" />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-6">Ringkasan Absensi Mingguan</h4>
        <div className="space-y-4">
          {attendanceData.map((day, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex-1">
                <h5 className="font-medium text-gray-900 dark:text-white">{day.date}</h5>
                <div className="flex items-center space-x-6 mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-green-600">Hadir: {day.present}</span>
                  <span className="text-red-600">Tidak Hadir: {day.absent}</span>
                  <span className="text-yellow-600">Terlambat: {day.late}</span>
                  <span className="text-purple-600">Lembur: {day.overtime}j</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {((day.present / (day.present + day.absent)) * 100).toFixed(1)}%
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">Tingkat Kehadiran</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPayroll = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Gaji</p>
              <p className="text-3xl font-bold">${(payrollSummary.totalSalaries / 1000).toFixed(0)}K</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-200" />
          </div>
          <p className="text-blue-200 text-sm mt-2">Biaya bulanan</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Rata-rata Gaji</p>
              <p className="text-3xl font-bold">${(payrollSummary.averageSalary / 1000).toFixed(1)}K</p>
            </div>
            <Users className="w-8 h-8 text-green-200" />
          </div>
          <p className="text-green-200 text-sm mt-2">Per karyawan</p>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Upah Lembur</p>
              <p className="text-3xl font-bold">${(payrollSummary.overtimeHours * 25 / 1000).toFixed(1)}K</p>
            </div>
            <Clock className="w-8 h-8 text-orange-200" />
          </div>
          <p className="text-orange-200 text-sm mt-2">{payrollSummary.overtimeHours} jam</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h4 className="font-semibold text-gray-900 dark:text-white">Ringkasan Payroll</h4>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {employees.map((employee) => (
            <div key={employee.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">{employee.name}</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {employee.position} • {employee.employeeId}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    ${employee.salary.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Gaji pokok</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-900 dark:text-white">Total Gaji Bulanan</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ${payrollSummary.totalSalaries.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="text-center py-12">
      <p className="text-gray-500">Modul Manajemen Jadwal segera hadir</p>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'employees': return renderEmployees();
      case 'attendance': return renderAttendance();
      case 'payroll': return renderPayroll();
      case 'schedule': return renderSchedule();
      default: return renderEmployees();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sistem Manajemen SDM</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Users className="w-4 h-4" />
          <span>Tambah Karyawan</span>
        </button>
      </div>

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
    </div>
  );
};

export default HRMSystem;