import { useState, useEffect } from 'react';
import { getReports, deleteReport } from '../utils/reportStorage';
import { exportAllReports, getStorageStats } from '../utils/exportUtils';
import { FaDownload, FaTrash, FaChartBar, FaEye } from 'react-icons/fa';
import ShinyText from './ShinyText';
import TargetCursor from './TargetCursor';
import "./StarBorder.css";
import StarBorder from "./StartBorder"; 




const ReportsManager = () => {
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState(null);
  const [viewingReport, setViewingReport] = useState(null);
  

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
    <div className="min-h-screen mt-8 bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
    
         <div className="hidden md:block">
  <TargetCursor hideDefaultCursor={true} />
</div>

         <ShinyText
  text="REPORTS MANAGER"
  speed={3}
  className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center"
/>
        {stats && (
          <div className="  p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              {/* <FaChartBar /> Storage Statistics */}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                
                <p className="text-2xl font-bold text-blue-400">{stats.totalReports}</p>

                <p className="text-sm ">Total Reports</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">{stats.uniqueUsers}</p>
                <p className="text-sm ">Unique Users</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">{Math.round(stats.storageSize / 1024)}KB</p>
                <p className="text-sm ">Storage Used</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-400">
                  {reports.length > 0
                    ? Math.round((Date.now() - new Date(reports[0].timestamp).getTime()) / (1000 * 60 * 60 * 24))
                    : 0}
                </p>
                <p className="text-sm ">Days Since Last</p>
              </div>
            </div>
          </div>
        )}

    


        <div className=" rounded-lg overflow-hidden">
          <h2 className="text-xl font-semibold p-4 border-b border-white/20">All Saved Reports</h2>
          {reports.length === 0 ? (
            <p className="p-4 text-white/70">No reports saved yet.</p>
          ) : (
            <div className="divide-y divide-white/20">
              {reports.map((report) => (
                <div key={report.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium flex-start flex">{report.username}</p>
                    <p className="text-sm text-white/70">
                      {report.rank} - Top {report.percentile}% | {new Date(report.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewingReport(report)}
                      className="bg-black cursor-target hover:bg-purple-700 p-2 rounded transition"
                      title="View Report"
                    >
                      <FaEye size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(report.id)}
                      className="bg-black cursor-target hover:bg-red-700 p-2 rounded transition"
                      title="Delete Report"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
      </div>
      <div className="flex flex-wrap  mt-5 sm:flex-nowrap gap-4 mb-6 justify-center items-center text-center">
        


 <StarBorder
    onClick={exportAllReports}          
  target="_blank"
  rel="noopener noreferrer"
  color="#fff" // white glow
          speed="6s"
          className="cursor-target px-4 py-2 rounded flex items-center gap-2 transition"
        >
  <FaDownload /> 
</StarBorder>



<StarBorder
    onClick={handleDeleteAll}
          
  color="#fff" // white glow
          speed="6s"
          className="cursor-target px-4 py-2 rounded flex items-center gap-2 transition"
        >
  <FaTrash /> 
</StarBorder>



 
</div>

      
      {/* Report Viewer Modal */}
      {viewingReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-white/20">
              <h3 className="text-xl font-semibold text-white">
                Report for {viewingReport.username}
              </h3>
              <button
                onClick={() => setViewingReport(null)}
                className="text-white/70 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="mb-4 text-sm text-white/70">
                Generated: {new Date(viewingReport.timestamp).toLocaleString()}
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded">
                <div className="mb-4">
                  <p className="text-white">
                    Rank: <strong>{viewingReport.rank}</strong> (Top {viewingReport.percentile}%)
                  </p>
                  <p className="text-white">
                    Next Level: <strong>{viewingReport.nextLevel}</strong>
                  </p>
                  <p className="text-white">
                    Points Needed: <strong>{Math.ceil(viewingReport.neededPoints)}</strong>
                  </p>
                </div>
                <hr className="my-4 border-white/20" />
                <pre className="whitespace-pre-wrap text-sm text-white/80 font-mono">
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

export default ReportsManager;
