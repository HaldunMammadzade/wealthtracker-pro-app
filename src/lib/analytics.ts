import { Stock, PortfolioAllocation, RiskMetrics } from '@/types';

export function calculatePortfolioAllocation(stocks: Stock[]): PortfolioAllocation[] {
  const sectorMap: { [key: string]: { value: number; color: string } } = {
    'Technology': { value: 0, color: '#3b82f6' },
    'Financial': { value: 0, color: '#10b981' },
    'Healthcare': { value: 0, color: '#f59e0b' },
    'Consumer': { value: 0, color: '#ef4444' },
    'Energy': { value: 0, color: '#8b5cf6' },
    'Other': { value: 0, color: '#6b7280' }
  };

  // Map stocks to sectors (simplified)
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
  // Simplified risk calculations - in real app, use historical data
  const returns = stocks.map(stock => stock.changePercent / 100);
  const avgReturn = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
  
  const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - avgReturn, 2), 0) / returns.length;
  const volatility = Math.sqrt(variance) * Math.sqrt(252); // Annualized

  return {
    beta: 1.2,
    sharpeRatio: 1.45,
    volatility: volatility * 100,
    maxDrawdown: -8.5,
    var95: -12.3
  };
}

export function calculatePortfolioPerformance(stocks: Stock[]) {
  const totalValue = stocks.reduce((sum, stock) => sum + stock.value, 0);
  const totalGainLoss = stocks.reduce((sum, stock) => sum + (stock.change * stock.shares), 0);
  const totalGainLossPercent = (totalGainLoss / (totalValue - totalGainLoss)) * 100;

  return {
    totalValue,
    totalGainLoss,
    totalGainLossPercent,
    topPerformer: stocks.reduce((best, stock) => 
      stock.changePercent > best.changePercent ? stock : best
    ),
    worstPerformer: stocks.reduce((worst, stock) => 
      stock.changePercent < worst.changePercent ? stock : worst
    )
  };
}
