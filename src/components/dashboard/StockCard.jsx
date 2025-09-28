'use client';

import React from 'react';
import { TrendingUp, TrendingDown, MoreVertical, Star } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { formatCurrency, formatPercent } from '../../lib/utils';
import { Card } from '../ui/Card';

export default function StockCard({ stock }) {
  const isPositive = stock.change >= 0;

  const generateMiniChartData = () => {
    const data = [];
    let price = stock.price;
    for (let i = 0; i < 20; i++) {
      price += (Math.random() - 0.5) * 2;
      data.push({ value: price });
    }
    return data;
  };

  const miniChartData = generateMiniChartData();

  return (
    <Card className="hover:scale-[1.02] transition-all duration-200 cursor-pointer group relative overflow-hidden">
      <div className={`absolute inset-0 opacity-5 ${isPositive ? 'bg-green-500' : 'bg-red-500'}`}></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${isPositive ? 'bg-green-500' : 'bg-red-500'}`}>
              {stock.symbol.substring(0, 2)}
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">{stock.symbol}</h3>
              <p className="text-sm text-gray-600 truncate max-w-[160px]">{stock.name}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-gray-400 hover:text-yellow-500 transition-colors cursor-pointer" />
            <MoreVertical className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer" />
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              {formatCurrency(stock.price)}
            </span>
            <div className={`flex items-center space-x-1 mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span className="text-sm font-semibold">
                {formatCurrency(Math.abs(stock.change))} ({formatPercent(stock.changePercent)})
              </span>
            </div>
          </div>
          
          <div className="w-24 h-12">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={miniChartData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={isPositive ? '#10b981' : '#ef4444'} 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-gray-600">Shares</p>
            <p className="font-semibold text-gray-900">{stock.shares.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-gray-600">Market Value</p>
            <p className="font-semibold text-gray-900">{formatCurrency(stock.value)}</p>
          </div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100">
          <span>Cap: {stock.marketCap}</span>
          <span>Vol: {stock.volume}</span>
          <span className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : ''}{((stock.value - (stock.price - stock.change) * stock.shares) / ((stock.price - stock.change) * stock.shares) * 100).toFixed(1)}%
          </span>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-5 transition-opacity duration-200"></div>
    </Card>
  );
}
