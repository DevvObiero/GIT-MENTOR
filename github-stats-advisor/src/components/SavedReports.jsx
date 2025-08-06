import { useState, useEffect } from 'react';
import { getReportsByUsername, deleteReport, downloadReportAsJSON, downloadReportAsText } from '../utils/reportStorage';
import { FaDownload, FaTrash, FaFileAlt, FaFileCode, FaEye } from 'react-icons/fa';

const SavedReports = ({ username }) => {
  const [reports, setReports] = useState([]);
  const [viewingReport, setViewingReport] = useState(null);

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
                onClick={() => setViewingReport(report)}
                className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition"
                title="View Report"
              >
                <FaEye size={14} />
              </button>
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
      
      {/* Report Viewer Modal */}
      {viewingReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">
                Report for {viewingReport.username}
              </h3>
              <button
                onClick={() => setViewingReport(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="mb-4 text-sm text-gray-400">
                Generated: {new Date(viewingReport.timestamp).toLocaleString()}
              </div>
              <div className="bg-gray-800 p-4 rounded">
                <div className="mb-4">
                  <p className="text-white">Rank: <strong>{viewingReport.rank}</strong> (Top {viewingReport.percentile}%)</p>
                  <p className="text-white">Next Level: <strong>{viewingReport.nextLevel}</strong></p>
                  <p className="text-white">Points Needed: <strong>{Math.ceil(viewingReport.neededPoints)}</strong></p>
                </div>
                <hr className="my-4 border-gray-600" />
                <pre className="whitespace-pre-wrap text-sm text-gray-300 font-mono">
                  {viewingReport.advice}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedReports;