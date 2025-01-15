import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from '../context/UserContext';
import Dashboard from '../components/Dashboard/Dashboard';
import UserManagement from '../components/UserManagement/UserManagement';
import Settings from '../components/Settings/Settings';
import Header from '../components/ui/Header';

const MainPage = () => {
  const [activePage, setActivePage] = useState('dashboard');

  // Toast notification helper
  const showNotification = (message, type = 'success') => {
    switch(type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'info':
        toast.info(message);
        break;
      case 'warning':
        toast.warning(message);
        break;
      default:
        toast(message);
    }
  };

  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-100">
        <Header activePage={activePage} setActivePage={setActivePage} />
        
        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {activePage === 'dashboard' && (
              <Dashboard showNotification={showNotification} />
            )}
            {activePage === 'users' && (
              <UserManagement showNotification={showNotification} />
            )}
            {activePage === 'settings' && (
              <Settings showNotification={showNotification} />
            )}
          </div>
        </main>

        {/* Toast Container */}
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </UserProvider>
  );
};

export default MainPage;