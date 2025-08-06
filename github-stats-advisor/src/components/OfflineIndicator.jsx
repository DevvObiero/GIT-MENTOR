import { useState, useEffect } from 'react';
import { FaWifi, FaWifiSlash } from 'react-icons/fa';

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed top-4 right-4 bg-red-600 text-white px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50">
      <FaWifiSlash size={16} />
      <span className="text-sm">Offline - Using cached data</span>
    </div>
  );
};

export default OfflineIndicator;