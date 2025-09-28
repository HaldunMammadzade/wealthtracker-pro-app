'use client';

import { useState, useEffect } from 'react';

export function useAdvancedFeatures() {
  const [showAdvancedFeatures, setShowAdvancedFeatures] = useState(true);
  const [userPreferences, setUserPreferences] = useState({
    realTimeUpdates: true,
    showMiniCharts: true,
    enableNotifications: true,
    autoRefresh: true,
    showPerformanceAlerts: true,
    enableAIInsights: true
  });

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('wealthtracker-preferences') : null;
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUserPreferences(parsed);
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
    }
  }, []);

  const updatePreferences = (newPrefs) => {
    const updated = { ...userPreferences, ...newPrefs };
    setUserPreferences(updated);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('wealthtracker-preferences', JSON.stringify(updated));
    }
  };

  const toggleAdvancedFeatures = () => {
    setShowAdvancedFeatures(!showAdvancedFeatures);
  };

  return {
    showAdvancedFeatures,
    userPreferences,
    toggleAdvancedFeatures,
    updatePreferences
  };
}
