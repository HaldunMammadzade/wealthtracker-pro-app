'use client';

import React, { useState, useEffect } from 'react';
import { mockStocks, mockTransactions, mockPortfolioStats } from '../../data/mockData';
import { mockNews } from '../../data/mockNews';
import { generateRandomData, calculatePortfolioAllocation, calculateRiskMetrics } from '../../lib/utils';
import { useRealTimeData } from '../../hooks/useRealTimeData';
import { useAdvancedFeatures } from '../../hooks/useAdvancedFeatures';
import { useLanguage } from '../../hooks/useLanguage';
import PortfolioStats from './PortfolioStats';
import StockCard from './StockCard';
import TransactionList from './TransactionList';
import RiskMetrics from './RiskMetrics';
import MarketNews from './MarketNews';
import PerformanceAlerts from './PerformanceAlerts';
import PortfolioChart from '../charts/PortfolioChart';
import SectorAllocationChart from '../charts/SectorAllocationChart';
import OrderBook from '../trading/OrderBook';
import PortfolioOptimizer from '../analytics/PortfolioOptimizer';
import MarketInsights from '../ai/MarketInsights';
import AdvancedAnalytics from '../analytics/AdvancedAnalytics';
import Watchlist from './Watchlist';
import QuickActions from './QuickActions';
import MarketOverview from './MarketOverview';
import Calendar from './Calendar';
import PriceAlerts from './PriceAlerts';
import SocialFeed from './SocialFeed';
import SettingsModal from '../modals/SettingsModal';
import NotificationsPanel from '../modals/NotificationsPanel';
import ExportModal from '../modals/ExportModal';
import AdvancedFeaturesToggle from '../ui/AdvancedFeaturesToggle';
import ThemeSwitch from '../ui/ThemeSwitch';
import LanguageSwitch from '../ui/LanguageSwitch';
import ChatSupport from '../support/ChatSupport';
import InstallPrompt from '../pwa/InstallPrompt';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Activity, Globe, TrendingUp, Bell, Settings, Download, Brain, BarChart3, Zap, Menu, X } from 'lucide-react';

export default function Dashboard() {
  const { stocks, isMarketOpen } = useRealTimeData(mockStocks);
  const { showAdvancedFeatures, toggleAdvancedFeatures } = useAdvancedFeatures();
  const { t } = useLanguage();
  const [chartData, setChartData] = useState(generateRandomData(30));
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sectorAllocation, setSectorAllocation] = useState(calculatePortfolioAllocation(mockStocks));
  const [riskMetrics, setRiskMetrics] = useState(calculateRiskMetrics(mockStocks));
  const [activeView, setActiveView] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showExport, setShowExport] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setSectorAllocation(calculatePortfolioAllocation(stocks));
    setRiskMetrics(calculateRiskMetrics(stocks));
  }, [stocks]);

  
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const updatedStats = {
    ...mockPortfolioStats,
    totalValue: stocks.reduce((sum, stock) => sum + stock.value, 0),
    totalGainLoss: stocks.reduce((sum, stock) => sum + (stock.change * stock.shares), 0),
    dayGainLoss: stocks.reduce((sum, stock) => sum + (stock.change * stock.shares), 0),
  };
  updatedStats.totalGainLossPercent = (updatedStats.totalGainLoss / (updatedStats.totalValue - updatedStats.totalGainLoss)) * 100;
  updatedStats.dayGainLossPercent = (updatedStats.dayGainLoss / updatedStats.totalValue) * 100;

  const views = [
    { id: 'overview', label: t('nav.overview'), icon: Activity },
    { id: 'analytics', label: t('nav.analytics'), icon: BarChart3 },
    { id: 'trading', label: t('nav.trading'), icon: TrendingUp },
    { id: 'insights', label: t('nav.insights'), icon: Brain }
  ];

  const handleViewChange = (viewId) => {
    setActiveView(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <header className="glass border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-40">
        <div className="mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>

              <div className="flex-shrink-0">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  WealthTracker Pro
                </h1>
                <p className="hidden sm:block text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                  {t('header.lastUpdated')}: {currentTime.toLocaleString('en-CA', { 
                    timeZone: 'America/Toronto',
                    hour12: true 
                  })} EST
                </p>
              </div>
            </div>

            <div className="hidden lg:flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
              {views.map((view) => (
                <button
                  key={view.id}
                  onClick={() => setActiveView(view.id)}
                  className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    activeView === view.id
                      ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  <view.icon className="h-4 w-4" />
                  <span>{view.label}</span>
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden xl:flex items-center space-x-4 text-sm mr-2">
                <div className="text-right">
                  <p className="text-xs text-gray-600 dark:text-gray-400">{t('header.marketStatus')}</p>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${isMarketOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                    <p className={`text-xs font-semibold ${isMarketOpen ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {isMarketOpen ? t('header.liveTrading') : t('header.marketClosed')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex items-center space-x-2">
                <LanguageSwitch />
                <ThemeSwitch />
                <div className="hidden md:block">
                  <AdvancedFeaturesToggle 
                    showAdvanced={showAdvancedFeatures}
                    onToggle={toggleAdvancedFeatures}
                  />
                </div>
              </div>
              
              <button 
                onClick={() => setShowNotifications(true)}
                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors relative rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              
              <button 
                onClick={() => setShowExport(true)}
                className="hidden sm:block p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Export"
              >
                <Download className="h-5 w-5" />
              </button>
              
              <button 
                onClick={() => setShowSettings(true)}
                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Settings"
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      
      <div className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-800 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
         
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Menu
            </h2>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

         
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 border-b border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Market Status</p>
                <div className="flex items-center space-x-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${isMarketOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                  <p className={`text-sm font-semibold ${isMarketOpen ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {isMarketOpen ? 'Live Trading' : 'Market Closed'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-600 dark:text-gray-400">TSX</p>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">+0.34%</p>
              </div>
            </div>
          </div>

          
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {views.map((view) => (
              <button
                key={view.id}
                onClick={() => handleViewChange(view.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  activeView === view.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <view.icon className="h-5 w-5" />
                <span className="font-medium">{view.label}</span>
              </button>
            ))}

            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
              <button
                onClick={() => {
                  setShowExport(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
              >
                <Download className="h-5 w-5" />
                <span className="font-medium">Export Data</span>
              </button>

              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Settings
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Language</span>
                    <LanguageSwitch />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Theme</span>
                    <ThemeSwitch />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Advanced Features</span>
                    <AdvancedFeaturesToggle 
                      showAdvanced={showAdvancedFeatures}
                      onToggle={toggleAdvancedFeatures}
                    />
                  </div>
                </div>
              </div>
            </div>
          </nav>

         
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <div className="text-xs text-center text-gray-500 dark:text-gray-400">
              <p className="font-semibold">WealthTracker Pro</p>
              <p className="mt-1">{currentTime.toLocaleTimeString('en-CA', { hour12: true })}</p>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="space-y-6 sm:space-y-8">
          <PortfolioStats stats={updatedStats} />

          {activeView === 'overview' && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <QuickActions 
                  onExport={() => setShowExport(true)}
                  onSettings={() => setShowSettings(true)}
                />
                <MarketOverview />
                {showAdvancedFeatures && (
                  <div className="lg:col-span-2 xl:col-span-1">
                    <Calendar />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <span>Portfolio Performance (30 Days)</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PortfolioChart data={chartData} height={350} />
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <span>Sector Allocation</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SectorAllocationChart data={sectorAllocation} />
                  </CardContent>
                </Card>
              </div>

              <RiskMetrics metrics={riskMetrics} />

              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                <div className="xl:col-span-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Holdings</h2>
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Real-time updates</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {stocks.map((stock) => (
                      <StockCard key={stock.symbol} stock={stock} />
                    ))}
                  </div>
                </div>

                <div className="xl:col-span-6 space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <Watchlist />
                      {showAdvancedFeatures && <PriceAlerts />}
                    </div>

                    <div className="space-y-6">
                      {showAdvancedFeatures && <PerformanceAlerts stocks={stocks} />}
                      <TransactionList transactions={mockTransactions} />
                      <MarketNews news={mockNews} />
                      {showAdvancedFeatures && <SocialFeed />}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeView === 'analytics' && (
            <div className="space-y-8">
              <AdvancedAnalytics stocks={stocks} />
              {showAdvancedFeatures && <PortfolioOptimizer stocks={stocks} />}
            </div>
          )}

          {activeView === 'trading' && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <OrderBook symbol="AAPL" />
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <span>Quick Trade</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <button className="p-4 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg transition-colors">
                        <div className="text-green-600 dark:text-green-400 font-semibold">BUY</div>
                        <div className="text-sm text-green-700 dark:text-green-300">Market Order</div>
                      </button>
                      <button className="p-4 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg transition-colors">
                        <div className="text-red-600 dark:text-red-400 font-semibold">SELL</div>
                        <div className="text-sm text-red-700 dark:text-red-300">Market Order</div>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeView === 'insights' && (
            <div className="space-y-8">
              <MarketInsights stocks={stocks} />
              {showAdvancedFeatures && (
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      <span>AI Trading Assistant</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">87%</div>
                        <div className="text-sm text-green-700 dark:text-green-300">AI Confidence</div>
                      </div>
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">+12.4%</div>
                        <div className="text-sm text-blue-700 dark:text-blue-300">Projected Return</div>
                      </div>
                      <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">8.2/10</div>
                        <div className="text-sm text-purple-700 dark:text-purple-300">Risk Score</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>

      <ChatSupport />
      <InstallPrompt />

      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <NotificationsPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
      <ExportModal isOpen={showExport} onClose={() => setShowExport(false)} />
    </div>
  );
}