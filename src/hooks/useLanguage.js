'use client';

import { useState, useEffect } from 'react';

const translations = {
  'header.title': {
    en: 'WealthTracker Pro',
    fr: 'WealthTracker Pro'
  },
  'header.lastUpdated': {
    en: 'Last updated',
    fr: 'Dernière mise à jour'
  },
  'header.marketStatus': {
    en: 'Market Status',
    fr: 'État du marché'
  },
  'header.liveTrading': {
    en: 'Live Trading',
    fr: 'Trading en direct'
  },
  'header.marketClosed': {
    en: 'Market Closed',
    fr: 'Marché fermé'
  },
  'nav.overview': {
    en: 'Overview',
    fr: 'Aperçu'
  },
  'nav.analytics': {
    en: 'Analytics',
    fr: 'Analyses'
  },
  'nav.trading': {
    en: 'Trading',
    fr: 'Trading'
  },
  'nav.insights': {
    en: 'AI Insights',
    fr: 'IA Insights'
  },
  'portfolio.totalValue': {
    en: 'Total Portfolio Value',
    fr: 'Valeur totale du portefeuille'
  },
  'portfolio.totalGainLoss': {
    en: 'Total Gain/Loss',
    fr: 'Gain/Perte totale'
  },
  'portfolio.todaysChange': {
    en: "Today's Change",
    fr: "Changement d'aujourd'hui"
  },
  'portfolio.cashBalance': {
    en: 'Cash Balance',
    fr: 'Solde en espèces'
  },
  'portfolio.holdings': {
    en: 'Holdings',
    fr: 'Participations'
  },
  'portfolio.realTimeUpdates': {
    en: 'Real-time updates',
    fr: 'Mises à jour en temps réel'
  },
  'common.notifications': {
    en: 'Notifications',
    fr: 'Notifications'
  },
  'common.settings': {
    en: 'Settings',
    fr: 'Paramètres'
  },
  'common.export': {
    en: 'Export',
    fr: 'Exporter'
  },
  'common.save': {
    en: 'Save',
    fr: 'Enregistrer'
  },
  'common.cancel': {
    en: 'Cancel',
    fr: 'Annuler'
  },
  'common.loading': {
    en: 'Loading...',
    fr: 'Chargement...'
  }
};

export function useLanguage() {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') || 'en';
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLanguage);
      window.location.reload();
    }
  };

  const t = (key) => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language] || key;
  };

  return { language, changeLanguage, t };
}
