// Local storage utility for managing advice reports
const STORAGE_KEY = 'github_advice_reports';

export const saveReport = (username, reportData) => {
  try {
    const reports = getReports();
    const reportId = `${username}_${Date.now()}`;
    const newReport = {
      id: reportId,
      username,
      timestamp: new Date().toISOString(),
      ...reportData
    };
    
    reports[reportId] = newReport;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
    return reportId;
  } catch (error) {
    console.error('Failed to save report:', error);
    return null;
  }
};

export const getReports = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Failed to get reports:', error);
    return {};
  }
};

export const getReportsByUsername = (username) => {
  const reports = getReports();
  return Object.values(reports).filter(report => report.username === username);
};

export const deleteReport = (reportId) => {
  try {
    const reports = getReports();
    delete reports[reportId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
    return true;
  } catch (error) {
    console.error('Failed to delete report:', error);
    return false;
  }
};

export const downloadReportAsJSON = (report) => {
  const dataStr = JSON.stringify(report, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `github_advice_${report.username}_${new Date(report.timestamp).toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

export const downloadReportAsText = (report) => {
  const content = `GitHub Advice Report for ${report.username}
Generated: ${new Date(report.timestamp).toLocaleString()}
Rank: ${report.rank} (Top ${report.percentile}%)
Next Level: ${report.nextLevel}
Points Needed: ${Math.ceil(report.neededPoints)}

ADVICE:
${report.advice}`;

  const dataBlob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `github_advice_${report.username}_${new Date(report.timestamp).toISOString().split('T')[0]}.txt`;
  link.click();
  URL.revokeObjectURL(url);
};