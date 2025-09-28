'use client';

import React from 'react';
import { Shield, TrendingDown, AlertTriangle, BarChart } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

export default function RiskMetrics({ metrics }) {
  const getRiskLevel = (value, type) => {
    switch (type) {
      case 'beta':
        if (value < 0.8) return { level: 'Low', color: 'text-green-600 bg-green-50' };
        if (value < 1.2) return { level: 'Medium', color: 'text-yellow-600 bg-yellow-50' };
        return { level: 'High', color: 'text-red-600 bg-red-50' };
      case 'volatility':
        if (value < 15) return { level: 'Low', color: 'text-green-600 bg-green-50' };
        if (value < 25) return { level: 'Medium', color: 'text-yellow-600 bg-yellow-50' };
        return { level: 'High', color: 'text-red-600 bg-red-50' };
      default:
        return { level: 'Medium', color: 'text-gray-600 bg-gray-50' };
    }
  };

  const riskData = [
    {
      title: 'Beta Coefficient',
      value: metrics.beta.toFixed(2),
      description: 'Sensitivity to market movements',
      icon: BarChart,
      risk: getRiskLevel(metrics.beta, 'beta')
    },
    {
      title: 'Sharpe Ratio',
      value: metrics.sharpeRatio.toFixed(2),
      description: 'Risk-adjusted returns',
      icon: Shield,
      risk: { level: metrics.sharpeRatio > 1 ? 'Good' : 'Poor', color: metrics.sharpeRatio > 1 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50' }
    },
    {
      title: 'Volatility',
      value: `${metrics.volatility.toFixed(1)}%`,
      description: 'Price fluctuation range',
      icon: TrendingDown,
      risk: getRiskLevel(metrics.volatility, 'volatility')
    },
    {
      title: 'Value at Risk (95%)',
      value: `${metrics.var95.toFixed(1)}%`,
      description: 'Potential loss (95% confidence)',
      icon: AlertTriangle,
      risk: { level: 'Risk', color: 'text-red-600 bg-red-50' }
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-blue-600" />
          <span>Risk Analytics</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {riskData.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <item.icon className="h-4 w-4 text-gray-600" />
                  <span className="font-medium text-gray-900">{item.title}</span>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${item.risk.color}`}>
                  {item.risk.level}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{item.value}</div>
              <div className="text-sm text-gray-600">{item.description}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Risk Assessment Summary</h4>
              <p className="text-sm text-blue-700 mt-1">
                Your portfolio shows moderate risk with good diversification. 
                Consider rebalancing if volatility exceeds 25% or beta goes above 1.5.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
