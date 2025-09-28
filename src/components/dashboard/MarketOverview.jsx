'use client';

import React from 'react';
import { Globe, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

export default function MarketOverview() {
  const markets = [
    {
      name: 'TSX Composite',
      value: '20,845.67',
      change: '+71.23',
      changePercent: '+0.34%',
      isPositive: true
    },
    {
      name: 'S&P 500',
      value: '4,337.89',
      change: '-12.45',
      changePercent: '-0.29%',
      isPositive: false
    },
    {
      name: 'NASDAQ',
      value: '13,512.84',
      change: '+45.67',
      changePercent: '+0.34%',
      isPositive: true
    },
    {
      name: 'CAD/USD',
      value: '0.7395',
      change: '+0.0012',
      changePercent: '+0.16%',
      isPositive: true
    }
  ];

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Globe className="h-5 w-5 text-blue-600" />
          <span>Market Overview</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {markets.map((market, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{market.name}</h4>
                <p className="text-lg font-bold text-gray-900">{market.value}</p>
              </div>
              <div className={`flex items-center space-x-1 ${market.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {market.isPositive ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <div className="text-right">
                  <div className="text-sm font-medium">{market.change}</div>
                  <div className="text-xs">{market.changePercent}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
