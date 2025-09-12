'use client';

import React, { useState, useEffect } from 'react';
import { mockStocks, mockTransactions, mockPortfolioStats } from '@/data/mockData';
import { mockNews } from '@/data/mockNews';
import { generateRandomData, calculatePortfolioAllocation, calculateRiskMetrics } from '@/lib/utils';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { useAdvancedFeatures } from '@/hooks/useAdvancedFeatures';
import { useLanguage } from '@/hooks/useLanguage';
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
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Activity, Globe, TrendingUp, Bell, Settings, Download, Brain, BarChart3, Zap } from 'lucide-react';

export default function Dashboard() {
  const { stocks, isMarketOpen } = useRealTimeData(mockStocks);
  const { showAdvancedFeatures, toggleAdvancedFeatures } = useAdvancedFeatures();
  const { t } = useLanguage();
  const [chartData, setChartData] = useState(generateRandomData(30));
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sectorAllocation, setSectorAllocation] = useState(calculatePortfolioAllocation(mockStocks));
  const [riskMetrics, setRiskMetrics] = useState(calculateRiskMetrics(mockStocks));
  const [activeView, setActiveView] = useState<'overview' | 'analytics' | 'trading' | 'insights'>('overview');
  
  // Modal states
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

  // Calculate updated portfolio stats
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      {/* Fixed Header with Better Spacing */}
      <header className="glass border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-30">
        <div className=" mx-auto px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Left Section */}
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0">
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  WealthTracker Pro
                </h1>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {t('header.lastUpdated')}: {currentTime.toLocaleString('en-CA', { 
                    timeZone: 'America/Toronto',
                    hour12: true 
                  })} EST
                </p>
              </div>
              
              {/* View Selector - Hidden on small screens */}
              <div className="hidden lg:flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                {views.map((view) => (
                  <button
                    key={view.id}
                    onClick={() => setActiveView(view.id as any)}
                    className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-all ${
                      activeView === view.id
                        ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                  >
                    <view.icon className="h-4 w-4" />
                    <span className="hidden xl:inline">{view.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Market Info */}
              <div className="hidden md:flex items-center space-x-4 text-sm">
                <div className="text-right">
                  <p className="text-gray-600 dark:text-gray-400">{t('header.marketStatus')}</p>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${isMarketOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                    <p className={`font-semibold ${isMarketOpen ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {isMarketOpen ? t('header.liveTrading') : t('header.marketClosed')}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-gray-600 dark:text-gray-400">TSX Composite</p>
                  <p className="font-semibold text-blue-600 dark:text-blue-400">20,845.67 (+0.34%)</p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <LanguageSwitch />
                <ThemeSwitch />
                <AdvancedFeaturesToggle 
                  showAdvanced={showAdvancedFeatures}
                  onToggle={toggleAdvancedFeatures}
                />
                
                <button 
                  onClick={() => setShowNotifications(true)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors relative rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  title="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                </button>
                
                <button 
                  onClick={() => setShowExport(true)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  title="Export"
                >
                  <Download className="h-5 w-5" />
                </button>
                
                <button 
                  onClick={() => setShowSettings(true)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  title="Settings"
                >
                  <Settings className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile View Selector */}
          <div className="lg:hidden mt-4 flex overflow-x-auto space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            {views.map((view) => (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id as any)}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
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
        </div>
      </header>

      {/* Main Content with Better Spacing */}
      <main className=" mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="space-y-6 sm:space-y-8">
          {/* Portfolio Stats */}
          <PortfolioStats stats={updatedStats} />

          {/* Content based on active view */}
          {activeView === 'overview' && (
            <>
              {/* Top Row - Quick Actions, Market Overview, Calendar */}
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

              {/* Charts Row */}
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

              {/* Risk Metrics */}
              <RiskMetrics metrics={riskMetrics} />

              {/* Main Grid - Holdings and Sidebar */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                {/* Holdings - Left Column */}
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

                {/* Sidebar - Right Columns */}
                <div className="xl:col-span-6 space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Sidebar Column */}
                    <div className="space-y-6">
                      <Watchlist />
                      {showAdvancedFeatures && <PriceAlerts />}
                    </div>

                    {/* Right Sidebar Column */}
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

      {/* Chat Support */}
      <ChatSupport />

      {/* PWA Install Prompt */}
      <InstallPrompt />

      {/* Modals */}
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <NotificationsPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
      <ExportModal isOpen={showExport} onClose={() => setShowExport(false)} />
    </div>
  );
}
