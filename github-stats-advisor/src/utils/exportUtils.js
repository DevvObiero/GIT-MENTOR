import { getReports } from './reportStorage';

export const exportAllReports = () => {
  const reports = getReports();
  const exportData = {
    exportDate: new Date().toISOString(),
    totalReports: Object.keys(reports).length,
    reports: Object.values(reports)
  };
  
  const dataStr = JSON.stringify(exportData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `github_advice_reports_export_${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

export const getStorageStats = () => {
  const reports = getReports();
  const totalReports = Object.keys(reports).length;
  const users = [...new Set(Object.values(reports).map(r => r.username))];
  
  return {
    totalReports,
    uniqueUsers: users.length,
    users,
    storageSize: JSON.stringify(reports).length
  };
};