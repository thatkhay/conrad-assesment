import React, { useState, useContext } from 'react';
import { 
  Settings, 
  User, 
  Lock, 
  Bell,  
  Palette, 
  Database,
  Save,
  RefreshCw
} from 'lucide-react';
import { UserContext } from '../../context/UserContext';

const SettingsPage = ({ showNotification }) => {
  const { currentUser, updateUserSettings } = useContext(UserContext);
  
  // Initial settings state
  const [settings, setSettings] = useState({
    // User Preferences
    displayName: currentUser?.displayName || '',
    email: currentUser?.email || '',
    
    // Notification Preferences
    emailNotifications: true,
    pushNotifications: false,
    
    // Security Settings
    twoFactorAuthentication: false,
    loginAlerts: true,
    
    // Appearance
    darkMode: false,
    compactView: false,
    
    // Data Management
    dataRetentionPeriod: 30 // days
  });

  // Theme Management
  const [theme, setTheme] = useState({
    primaryColor: '#3B82F6', // Tailwind blue
    accentColor: '#10B981',  // Tailwind green
    fontFamily: 'Inter, sans-serif'
  });

  // Handle general settings changes
  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Handle theme changes
  const handleThemeChange = (key, value) => {
    setTheme(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Save settings handler
  const saveSettings = () => {
    try {
      // Update user settings in context/backend
      updateUserSettings({
        ...settings,
        theme
      });
      
      // Apply theme changes
      applyTheme(theme);
      
      // Notification
      showNotification('Settings saved successfully', 'success');
    } catch (error) {
      showNotification('Error saving settings', 'error');
    }
  };

  // Theme application utility
  const applyTheme = (themeSettings) => {
    // Apply theme to root element
    document.documentElement.style.setProperty('--primary-color', themeSettings.primaryColor);
    document.documentElement.style.setProperty('--accent-color', themeSettings.accentColor);
    document.documentElement.style.setProperty('--font-family', themeSettings.fontFamily);
  };

  // Two-Factor Authentication Setup
//   const [tfaSetup, setTfaSetup] = useState({
//     method: 'app', // 'app' or 'sms'
//     status: 'not_configured'
//   });

  // Data Export Functionality
  const handleDataExport = () => {
    try {
      // Collect user data
      const exportData = {
        profile: {
          name: currentUser.name,
          email: currentUser.email,
          role: currentUser.role
        },
        settings: settings,
        theme: theme
      };

      // Create and download JSON file
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'user_data_export.json';
      link.click();

      showNotification('Data exported successfully', 'success');
    } catch (error) {
      showNotification('Error exporting data', 'error');
    }
  };

  return (
    <div className="container mx-auto  mt-14 ">
      <div className="flex items-center mb-8">
        <Settings className="h-8 w-8 mr-4 text-gray-600" />
        <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <User className="h-6 w-6 mr-3 text-blue-500" />
            <h2 className="text-lg font-semibold">Profile</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Display Name</label>
              <input
                type="text"
                value={settings.displayName}
                onChange={(e) => handleSettingChange('displayName', e.target.value)}
                className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleSettingChange('email', e.target.value)}
                className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Bell className="h-6 w-6 mr-3 text-yellow-500" />
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Email Notifications</span>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Push Notifications</span>
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Lock className="h-6 w-6 mr-3 text-red-500" />
            <h2 className="text-lg font-semibold">Security</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Two-Factor Authentication</span>
              <input
                type="checkbox"
                checked={settings.twoFactorAuthentication}
                onChange={(e) => handleSettingChange('twoFactorAuthentication', e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Login Alerts</span>
              <input
                type="checkbox"
                checked={settings.loginAlerts}
                onChange={(e) => handleSettingChange('loginAlerts', e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Palette className="h-6 w-6 mr-3 text-purple-500" />
            <h2 className="text-lg font-semibold">Appearance</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Dark Mode</span>
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Compact View</span>
              <input
                type="checkbox"
                checked={settings.compactView}
                onChange={(e) => handleSettingChange('compactView', e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
              <input
                type="color"
                value={theme.primaryColor}
                onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
                className="w-full h-10 border-none"
              />
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Database className="h-6 w-6 mr-3 text-green-500" />
            <h2 className="text-lg font-semibold">Data Management</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Data Retention (Days)</label>
              <input
                type="number"
                value={settings.dataRetentionPeriod}
                onChange={(e) => handleSettingChange('dataRetentionPeriod', parseInt(e.target.value))}
                min="7"
                max="365"
                className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleDataExport}
                className="flex items-center justify-center w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Export Data
              </button>
            </div>
          </div>
        </div>

        {/* Save Settings */}
        <div className="col-span-full">
          <button
            onClick={saveSettings}
            className="w-full flex items-center justify-center bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition"
          >
            <Save className="h-6 w-6 mr-3" />
            Save All Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;