import { useState, useEffect } from 'react';
import { getReportsByUsername, deleteReport, downloadReportAsJSON, downloadReportAsText } from '../utils/reportStorage';
import { FaDownload, FaTrash, FaFileAlt, FaFileCode } from 'react-icons/fa';

const SavedReports = ({ username }) => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    if (username) {
      const userReports = getReportsByUsername(username);
      setReports(userReports.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
    }
  }, [username]);

  const handleDelete = (reportId) => {
    if (deleteReport(reportId)) {
      setReports(reports.filter(report => report.id !== reportId));
    }
  };

  if (!username || reports.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 p-4 rounded-2xl shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-white">Saved Reports ({reports.length})</h3>
      <div className="space-y-3">
        {reports.map((report) => (
          <div key={report.id} className="bg-gray-800 p-3 rounded-lg flex items-center justify-between">
            <div className="flex-1">
              <p className="text-white font-medium">
                {report.rank} - Top {report.percentile}%
              </p>
              <p className="text-gray-400 text-sm">
                {new Date(report.timestamp).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => downloadReportAsText(report)}
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                title="Download as Text"
              >
                <FaFileAlt size={14} />
              </button>
              <button
                onClick={() => downloadReportAsJSON(report)}
                className="p-2 bg-green-600 hover:bg-green-700 text-white rounded transition"
                title="Download as JSON"
              >
                <FaFileCode size={14} />
              </button>
              <button
                onClick={() => handleDelete(report.id)}
                className="p-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
                title="Delete Report"
              >
                <FaTrash size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedReports;