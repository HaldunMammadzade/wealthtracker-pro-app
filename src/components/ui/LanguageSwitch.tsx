'use client';

import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export default function LanguageSwitch() {
  const { language, changeLanguage } = useLanguage();
  const [showOptions, setShowOptions] = useState(false);

  const languages = [
    { id: 'en', label: 'English', flag: '🇨🇦' },
    { id: 'fr', label: 'Français', flag: '🇫🇷' }
  ];

  const currentLanguage = languages.find(l => l.id === language);

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="flex items-center space-x-2 p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 transition-colors rounded-lg"
        title="Change language"
      >
        <Globe className="h-5 w-5" />
        <span className="text-sm">{currentLanguage?.flag}</span>
      </button>

      {showOptions && (
        <div className="absolute top-full right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 z-50">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => {
                changeLanguage(lang.id as any);
                setShowOptions(false);
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                language === lang.id
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
