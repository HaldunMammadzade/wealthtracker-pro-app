import { Stock, Transaction, PortfolioStats } from '@/types';

export const mockStocks: Stock[] = [
  {
    symbol: 'SHOP',
    name: 'Shopify Inc.',
    price: 68.45,
    change: 2.34,
    changePercent: 3.54,
    shares: 150,
    value: 10267.50,
    marketCap: '85.2B',
    volume: '2.1M'
  },
  {
    symbol: 'RY',
    name: 'Royal Bank of Canada',
    price: 125.87,
    change: -1.23,
    changePercent: -0.97,
    shares: 75,
    value: 9440.25,
    marketCap: '178.4B',
    volume: '1.8M'
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 175.84,
    change: 4.56,
    changePercent: 2.67,
    shares: 50,
    value: 8792.00,
    marketCap: '2.7T',
    volume: '45.2M'
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 378.91,
    change: -2.45,
    changePercent: -0.64,
    shares: 20,
    value: 7578.20,
    marketCap: '2.8T',
    volume: '22.1M'
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 139.67,
    change: 3.21,
    changePercent: 2.35,
    shares: 45,
    value: 6285.15,
    marketCap: '1.7T',
    volume: '28.5M'
  },
  {
    symbol: 'TD',
    name: 'Toronto-Dominion Bank',
    price: 78.43,
    change: 0.87,
    changePercent: 1.12,
    shares: 80,
    value: 6274.40,
    marketCap: '142.1B',
    volume: '3.2M'
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'buy',
    symbol: 'SHOP',
    amount: 50,
    price: 65.20,
    date: '2024-09-10',
    status: 'completed'
  },
  {
    id: '2',
    type: 'sell',
    symbol: 'RY',
    amount: 25,
    price: 127.45,
    date: '2024-09-09',
    status: 'completed'
  },
  {
    id: '3',
    type: 'buy',
    symbol: 'AAPL',
    amount: 30,
    price: 172.10,
    date: '2024-09-08',
    status: 'completed'
  },
  {
    id: '4',
    type: 'dividend',
    symbol: 'TD',
    amount: 80,
    price: 0.96,
    date: '2024-09-05',
    status: 'completed'
  },
  {
    id: '5',
    type: 'buy',
    symbol: 'MSFT',
    amount: 10,
    price: 375.20,
    date: '2024-09-03',
    status: 'pending'
  }
];

export const mockPortfolioStats: PortfolioStats = {
  totalValue: 48637.50,
  totalGainLoss: 6847.30,
  totalGainLossPercent: 16.41,
  dayGainLoss: 1234.56,
  dayGainLossPercent: 2.61,
  cashBalance: 12500.00
};
