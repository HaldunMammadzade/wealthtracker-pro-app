'use client';

import React, { useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export default function ThemeSwitch() {
  const { theme, changeTheme } = useTheme();
  const [showOptions, setShowOptions] = useState(false);

  const themes = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'system', label: 'System', icon: Monitor }
  ];

  const currentTheme = themes.find(t => t.id === theme);

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 transition-colors rounded-lg"
        title="Change theme"
      >
        {currentTheme && <currentTheme.icon className="h-5 w-5" />}
      </button>

      {showOptions && (
        <div className="absolute top-full right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 z-50">
          {themes.map((themeOption) => (
            <button
              key={themeOption.id}
              onClick={() => {
                changeTheme(themeOption.id);
                setShowOptions(false);
              }}
              className={`w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                theme === themeOption.id
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <themeOption.icon className="h-4 w-4" />
              <span>{themeOption.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
