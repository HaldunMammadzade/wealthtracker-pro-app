'use client';

import React, { useState } from 'react';
import { Plus, Star, TrendingUp, TrendingDown, Search, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { formatCurrency, formatPercent } from '../../lib/utils';

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([
    {
      symbol: 'CNR',
      name: 'Canadian National Railway',
      price: 142.50,
      change: 2.30,
      changePercent: 1.64,
      volume: '1.2M',
      marketCap: '96.8B'
    },
    {
      symbol: 'ENB',
      name: 'Enbridge Inc.',
      price: 48.92,
      change: -0.45,
      changePercent: -0.91,
      volume: '2.8M',
      marketCap: '102.3B'
    },
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      price: 425.67,
      change: 8.45,
      changePercent: 2.03,
      volume: '35.2M',
      marketCap: '1.05T'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [searchSymbol, setSearchSymbol] = useState('');

  const removeFromWatchlist = (symbol) => {
    setWatchlist(prev => prev.filter(stock => stock.symbol !== symbol));
  };

  const addToWatchlist = () => {
    if (searchSymbol.trim()) {
      const newStock = {
        symbol: searchSymbol.toUpperCase(),
        name: 'New Company Inc.',
        price: 100.00,
        change: 0,
        changePercent: 0,
        volume: '1M',
        marketCap: '10B'
      };
      setWatchlist(prev => [...prev, newStock]);
      setSearchSymbol('');
      setShowAddForm(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-600" />
            <span>Watchlist</span>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {showAddForm && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter stock symbol (e.g., TSLA)"
                  value={searchSymbol}
                  onChange={(e) => setSearchSymbol(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && addToWatchlist()}
                />
              </div>
              <button
                onClick={addToWatchlist}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {watchlist.map((stock) => (
            <div key={stock.symbol} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-gray-900">{stock.symbol}</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(stock.price)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 truncate max-w-[120px]">{stock.name}</span>
                  <div className={`flex items-center space-x-1 text-sm ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.change >= 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    <span>{formatPercent(stock.changePercent)}</span>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Vol: {stock.volume}</span>
                  <span>Cap: {stock.marketCap}</span>
                </div>
              </div>
              
              <button
                onClick={() => removeFromWatchlist(stock.symbol)}
                className="ml-3 p-1 text-gray-400 hover:text-red-600 transition-colors"
                title="Remove from watchlist"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {watchlist.length === 0 && (
          <div className="text-center py-8">
            <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your watchlist is empty</h3>
            <p className="text-sm text-gray-600 mb-4">Add stocks to track their performance</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add First Stock
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
