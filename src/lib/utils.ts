import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Stock, PortfolioAllocation, RiskMetrics } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(value);
}

export function formatPercent(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-CA').format(value);
}

export function generateRandomData(days: number) {
  const data = [];
  let value = 100000;
  
  for (let i = 0; i < days; i++) {
    const change = (Math.random() - 0.5) * 2000;
    value += change;
    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: Math.round(value),
      volume: Math.round(Math.random() * 1000000)
    });
  }
  
  return data;
}

export function calculatePortfolioAllocation(stocks: Stock[]): PortfolioAllocation[] {
  const sectorMap: { [key: string]: { value: number; color: string } } = {
    'Technology': { value: 0, color: '#3b82f6' },
    'Financial': { value: 0, color: '#10b981' },
    'Healthcare': { value: 0, color: '#f59e0b' },
    'Consumer': { value: 0, color: '#ef4444' },
    'Energy': { value: 0, color: '#8b5cf6' },
    'Other': { value: 0, color: '#6b7280' }
  };

  const sectorMapping: { [key: string]: string } = {
    'AAPL': 'Technology',
    'MSFT': 'Technology',
    'GOOGL': 'Technology',
    'SHOP': 'Technology',
    'RY': 'Financial',
    'TD': 'Financial',
  };

  const totalValue = stocks.reduce((sum, stock) => sum + stock.value, 0);

  stocks.forEach(stock => {
    const sector = sectorMapping[stock.symbol] || 'Other';
    sectorMap[sector].value += stock.value;
  });

  return Object.entries(sectorMap)
    .filter(([_, data]) => data.value > 0)
    .map(([sector, data]) => ({
      sector,
      value: data.value,
      percentage: (data.value / totalValue) * 100,
      color: data.color
    }))
    .sort((a, b) => b.value - a.value);
}

export function calculateRiskMetrics(stocks: Stock[]): RiskMetrics {
  const returns = stocks.map(stock => stock.changePercent / 100);
  const avgReturn = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
  
  const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - avgReturn, 2), 0) / returns.length;
  const volatility = Math.sqrt(variance) * Math.sqrt(252);

  return {
    beta: 1.15 + (Math.random() - 0.5) * 0.3,
    sharpeRatio: 1.45 + (Math.random() - 0.5) * 0.6,
    volatility: Math.max(5, volatility * 100 + Math.random() * 10),
    maxDrawdown: -8.5 - Math.random() * 5,
    var95: -12.3 - Math.random() * 8
  };
}
