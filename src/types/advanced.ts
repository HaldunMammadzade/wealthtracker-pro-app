export interface MarketData {
  symbol: string;
  price: number;
  bid: number;
  ask: number;
  volume: number;
  timestamp: string;
}

export interface WatchlistItem {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  alerts: PriceAlert[];
}

export interface PriceAlert {
  id: string;
  symbol: string;
  condition: 'above' | 'below';
  targetPrice: number;
  isActive: boolean;
  createdAt: string;
}

export interface PortfolioAllocation {
  sector: string;
  percentage: number;
  value: number;
  color: string;
}

export interface RiskMetrics {
  beta: number;
  sharpeRatio: number;
  volatility: number;
  maxDrawdown: number;
  var95: number; // Value at Risk 95%
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  symbols: string[];
}
