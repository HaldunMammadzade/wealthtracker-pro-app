'use client';

import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Treemap, Cell } from 'recharts';
import { BarChart3, PieChart, Activity, Zap, TrendingUp, Shield } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { formatCurrency, formatPercent } from '../../lib/utils';

export default function AdvancedAnalytics({ stocks }) {
  const [activeMetric, setActiveMetric] = useState('performance');

  const performanceData = stocks.map((stock, index) => ({
    name: stock.symbol,
    allocation: (stock.value / stocks.reduce((sum, s) => sum + s.value, 0)) * 100,
    return: stock.changePercent,
    contribution: (stock.value / stocks.reduce((sum, s) => sum + s.value, 0)) * stock.changePercent,
    size: stock.value,
    color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'][index % 6]
  }));

  const riskRadarData = [
    { metric: 'Volatility', value: 75, fullMark: 100 },
    { metric: 'Beta', value: 85, fullMark: 100 },
    { metric: 'Sharpe Ratio', value: 65, fullMark: 100 },
    { metric: 'Max Drawdown', value: 40, fullMark: 100 },
    { metric: 'VaR', value: 55, fullMark: 100 },
    { metric: 'Diversification', value: 80, fullMark: 100 }
  ];

  const correlationData = [
    { asset1: 'AAPL', asset2: 'MSFT', correlation: 0.72 },
    { asset1: 'AAPL', asset2: 'GOOGL', correlation: 0.68 },
    { asset1: 'SHOP', asset2: 'AAPL', correlation: 0.45 },
    { asset1: 'RY', asset2: 'TD', correlation: 0.89 },
    { asset1: 'RY', asset2: 'AAPL', correlation: 0.23 },
  ];

  const historicalData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    
    return {
      date: date.toISOString().split('T')[0],
      portfolio: 100000 + (Math.random() - 0.5) * 10000 + i * 500,
      benchmark: 100000 + (Math.random() - 0.5) * 8000 + i * 400,
      alpha: (Math.random() - 0.5) * 2
    };
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getCorrelationColor = (value) => {
    if (value > 0.7) return 'bg-red-500';
    if (value > 0.3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-indigo-600" />
          <span>Advanced Analytics</span>
        </CardTitle>
        
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'performance', label: 'Performance', icon: TrendingUp },
            { id: 'risk', label: 'Risk Profile', icon: Shield },
            { id: 'correlation', label: 'Correlation', icon: Activity },
            { id: 'attribution', label: 'Attribution', icon: PieChart }
          ].map((metric) => (
            <button
              key={metric.id}
              onClick={() => setActiveMetric(metric.id)}
              className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeMetric === metric.id
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <metric.icon className="h-4 w-4" />
              <span>{metric.label}</span>
            </button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent>
        {activeMetric === 'performance' && (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Portfolio vs Benchmark (30 Days)</h4>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="portfolio" 
                    stackId="1" 
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.3}
                    name="Portfolio"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="benchmark" 
                    stackId="2" 
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.2}
                    name="TSX Composite"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h5 className="font-medium text-blue-900">30-Day Return</h5>
                <p className="text-2xl font-bold text-blue-600">+8.42%</p>
                <p className="text-sm text-blue-700">vs +6.31% benchmark</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h5 className="font-medium text-green-900">Alpha</h5>
                <p className="text-2xl font-bold text-green-600">+2.11%</p>
                <p className="text-sm text-green-700">Outperforming market</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h5 className="font-medium text-purple-900">Information Ratio</h5>
                <p className="text-2xl font-bold text-purple-600">1.34</p>
                <p className="text-sm text-purple-700">Strong risk-adj. return</p>
              </div>
            </div>
          </div>
        )}

        {activeMetric === 'risk' && (
          <div className="space-y-6">
            <h4 className="font-semibold text-gray-900">Risk Profile Analysis</h4>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={riskRadarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis domain={[0, 100]} tick={false} />
                <Radar 
                  name="Risk Profile" 
                  dataKey="value" 
                  stroke="#8b5cf6" 
                  fill="#8b5cf6" 
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
            
            <div className="grid grid-cols-2 gap-4">
              {riskRadarData.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">{item.metric}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold">{item.value}/100</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeMetric === 'correlation' && (
          <div className="space-y-6">
            <h4 className="font-semibold text-gray-900">Asset Correlation Matrix</h4>
            <div className="space-y-3">
              {correlationData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">{item.asset1}</span>
                    <span className="text-gray-500">↔</span>
                    <span className="font-medium">{item.asset2}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded ${getCorrelationColor(item.correlation)}`} />
                    <span className="font-semibold">{item.correlation.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h5 className="font-medium text-yellow-900 mb-2">Correlation Analysis</h5>
              <p className="text-sm text-yellow-800">
                High correlation detected between RY and TD (0.89). Consider diversifying 
                financial sector exposure to reduce concentration risk.
              </p>
            </div>
          </div>
        )}

        {activeMetric === 'attribution' && (
          <div className="space-y-6">
            <h4 className="font-semibold text-gray-900">Performance Attribution</h4>
            <ResponsiveContainer width="100%" height={300}>
              <Treemap
                data={performanceData}
                dataKey="size"
                stroke="#fff"
                fill="#8884d8"
              >
                {performanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Treemap>
            </ResponsiveContainer>
            
            <div className="space-y-3">
              {performanceData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      {formatPercent(item.contribution)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {item.allocation.toFixed(1)}% allocation
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
