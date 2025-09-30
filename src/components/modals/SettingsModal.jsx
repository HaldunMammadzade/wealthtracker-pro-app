import React, { useState } from 'react';
import { User, Bell, Shield, Palette, Globe, ChevronRight } from 'lucide-react';
import Modal from '../ui/Modal';

export default function SettingsModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [showMobileTabs, setShowMobileTabs] = useState(true);
  const [settings, setSettings] = useState({
    theme: 'light',
    currency: 'CAD',
    language: 'en',
    notifications: {
      priceAlerts: true,
      newsUpdates: true,
      portfolioReports: true,
      marketOpen: false
    },
    privacy: {
      shareData: false,
      analytics: true,
      thirdParty: false
    }
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'regional', label: 'Regional', icon: Globe }
  ];

  const handleNotificationChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const handlePrivacyChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    console.log('Settings saved:', settings);
    onClose();
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setShowMobileTabs(false);
  };

  const handleBackToTabs = () => {
    setShowMobileTabs(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Settings" size="xl">
      <div className="flex h-[70vh]">
        <div className="hidden md:block w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
        {showMobileTabs && (
          <div className="md:hidden w-full p-4 overflow-y-auto">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <tab.icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <span className="font-medium text-gray-900 dark:text-gray-100">{tab.label}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </button>
              ))}
            </nav>
          </div>
        )}

       
        <div className={`flex-1 overflow-y-auto ${showMobileTabs ? 'hidden md:block' : 'block'}`}>
       
          <div className="md:hidden sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 z-10">
            <button
              onClick={handleBackToTabs}
              className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              <ChevronRight className="h-5 w-5 transform rotate-180" />
              <span className="font-medium">Back to Settings</span>
            </button>
          </div>

          <div className="p-4 md:p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Settings</h3>
                
                <div className="grid grid-cols-1 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue="john.doe@example.com"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Investment Experience
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>Beginner (0-2 years)</option>
                      <option>Intermediate (3-5 years)</option>
                      <option>Advanced (5+ years)</option>
                      <option>Professional</option>
                    </select>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 sticky bottom-0 bg-white dark:bg-gray-900 -mx-4 md:-mx-6 px-4 md:px-6 pb-4">
                  <button 
                    onClick={handleSave}
                    className="w-full md:w-auto px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notification Preferences</h3>
                
                <div className="space-y-3">
                  {[
                    { key: 'priceAlerts', label: 'Price Alerts', desc: 'Get notified when stock prices hit your target levels' },
                    { key: 'newsUpdates', label: 'News Updates', desc: 'Receive market news and company announcements' },
                    { key: 'portfolioReports', label: 'Portfolio Reports', desc: 'Daily and weekly portfolio performance summaries' },
                    { key: 'marketOpen', label: 'Market Open/Close', desc: 'Notifications when markets open and close' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex-1 pr-4">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm md:text-base">{item.label}</h4>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={settings.notifications[item.key]}
                          onChange={(e) => handleNotificationChange(item.key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Privacy & Security</h3>
                
                <div className="space-y-3">
                  {[
                    { key: 'shareData', label: 'Share Anonymous Data', desc: 'Help improve our services by sharing anonymized usage data' },
                    { key: 'analytics', label: 'Analytics Tracking', desc: 'Allow us to track your app usage for better user experience' },
                    { key: 'thirdParty', label: 'Third-party Integrations', desc: 'Enable third-party services for enhanced features' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex-1 pr-4">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm md:text-base">{item.label}</h4>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={settings.privacy[item.key]}
                          onChange={(e) => handlePrivacyChange(item.key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                  <h4 className="font-medium text-yellow-900 dark:text-yellow-400 mb-2 text-sm md:text-base">Data Security</h4>
                  <p className="text-xs md:text-sm text-yellow-800 dark:text-yellow-300">
                    Your financial data is encrypted and stored securely. We never share your personal 
                    trading information with third parties without your explicit consent.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Appearance</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Theme</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { value: 'light', label: 'Light', preview: 'bg-white border-2' },
                        { value: 'dark', label: 'Dark', preview: 'bg-gray-900 border-2' },
                        { value: 'auto', label: 'System', preview: 'bg-gradient-to-r from-white to-gray-900 border-2' }
                      ].map((theme) => (
                        <button
                          key={theme.value}
                          onClick={() => setSettings(prev => ({ ...prev, theme: theme.value }))}
                          className={`p-4 rounded-lg border-2 transition-colors ${
                            settings.theme === theme.value
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          <div className={`w-full h-12 rounded mb-2 ${theme.preview}`} />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{theme.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'regional' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Regional Settings</h3>
                
                <div className="grid grid-cols-1 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Primary Currency
                    </label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={settings.currency}
                      onChange={(e) => setSettings(prev => ({ ...prev, currency: e.target.value }))}
                    >
                      <option value="CAD">CAD - Canadian Dollar</option>
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Language
                    </label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={settings.language}
                      onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                    >
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                      <option value="es">Español</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}