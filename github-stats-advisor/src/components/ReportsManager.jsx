import { useState, useEffect } from 'react';
import { getReports, deleteReport } from '../utils/reportStorage';
import { exportAllReports, getStorageStats } from '../utils/exportUtils';
import { FaDownload, FaTrash, FaChartBar } from 'react-icons/fa';

const ReportsManager = () => {
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const allReports = Object.values(getReports());
    setReports(allReports.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
    setStats(getStorageStats());
  };

  const handleDeleteAll = () => {
    if (confirm('Delete all saved reports? This cannot be undone.')) {
      localStorage.removeItem('github_advice_reports');
      loadData();
    }
  };

  const handleDelete = (reportId) => {
    if (deleteReport(reportId)) {
      loadData();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Reports Manager</h1>
        
        {stats && (
          <div className="bg-gray-800 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <FaChartBar /> Storage Statistics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-400">{stats.totalReports}</p>
                <p className="text-sm text-gray-400">Total Reports</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-400">{stats.uniqueUsers}</p>
                <p className="text-sm text-gray-400">Unique Users</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-400">{Math.round(stats.storageSize / 1024)}KB</p>
                <p className="text-sm text-gray-400">Storage Used</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-400">{reports.length > 0 ? Math.round((Date.now() - new Date(reports[0].timestamp).getTime()) / (1000 * 60 * 60 * 24)) : 0}</p>
                <p className="text-sm text-gray-400">Days Since Last</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4 mb-6">
          <button
            onClick={exportAllReports}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center gap-2 transition"
          >
            <FaDownload /> Export All Reports
          </button>
          <button
            onClick={handleDeleteAll}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded flex items-center gap-2 transition"
          >
            <FaTrash /> Clear All Reports
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <h2 className="text-xl font-semibold p-4 border-b border-gray-700">All Saved Reports</h2>
          {reports.length === 0 ? (
            <p className="p-4 text-gray-400">No reports saved yet.</p>
          ) : (
            <div className="divide-y divide-gray-700">
              {reports.map((report) => (
                <div key={report.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{report.username}</p>
                    <p className="text-sm text-gray-400">
                      {report.rank} - Top {report.percentile}% | {new Date(report.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(report.id)}
                    className="bg-red-600 hover:bg-red-700 p-2 rounded transition"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsManager;