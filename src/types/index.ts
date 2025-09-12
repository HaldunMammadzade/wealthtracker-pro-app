export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  shares: number;
  value: number;
  marketCap?: string;
  volume?: string;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'dividend';
  symbol: string;
  amount: number;
  price: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface PortfolioStats {
  totalValue: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  dayGainLoss: number;
  dayGainLossPercent: number;
  cashBalance: number;
}

export interface ChartData {
  date: string;
  value: number;
  volume?: number;
}
