'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { Target, TrendingUp, AlertTriangle, Zap } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { formatCurrency, formatPercent } from '../../lib/utils';

export default function PortfolioOptimizer({ stocks }) {
  const [activeTab, setActiveTab] = useState('efficiency');

  const totalValue = stocks.reduce((sum, stock) => sum + stock.value, 0);
  
  const efficiencyData = stocks.map(stock => ({
    symbol: stock.symbol,
    return: stock.changePercent,
    risk: Math.abs(stock.changePercent) + Math.random() * 5,
    sharpe: stock.changePercent / (Math.abs(stock.changePercent) + 1),
    weight: (stock.value / totalValue) * 100
  }));

  const optimizationSuggestions = [
    {
      action: 'sell',
      symbol: 'AAPL',
      currentWeight: 18.1,
      targetWeight: 15.0,
      reasoning: 'Overweight in single stock - reduce concentration risk',
      priority: 'high'
    },
    {
      action: 'buy',
      symbol: 'TD',
      currentWeight: 12.9,
      targetWeight: 16.0,
      reasoning: 'Underweight in Canadian financials - add defensive exposure',
      priority: 'medium'
    },
    {
      action: 'buy',
      symbol: 'SHOP',
      currentWeight: 21.1,
      targetWeight: 25.0,
      reasoning: 'Strong growth momentum - increase allocation',
      priority: 'high'
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold">{data.symbol}</p>
          <p className="text-sm">Return: {formatPercent(data.return)}</p>
          <p className="text-sm">Risk: {data.risk.toFixed(1)}%</p>
          <p className="text-sm">Weight: {data.weight.toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'buy': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'sell': return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      default: return <Target className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="h-5 w-5 text-purple-600" />
          <span>Portfolio Optimizer</span>
        </CardTitle>
        
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg overflow-x-auto flex-nowrap">
          {[
            { id: 'efficiency', label: 'Efficiency Frontier' },
            { id: 'rebalance', label: 'Rebalancing' },
            { id: 'risk', label: 'Risk Analysis' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{minWidth: 'fit-content'}}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors  ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent>
        {activeTab === 'efficiency' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Risk vs Return Analysis</h4>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={efficiencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="risk" 
                  name="Risk %" 
                  tickFormatter={(value) => `${value.toFixed(1)}%`}
                />
                <YAxis 
                  dataKey="return" 
                  name="Return %" 
                  tickFormatter={(value) => `${value.toFixed(1)}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Scatter 
                  dataKey="return" 
                  fill="#3b82f6"
                  strokeWidth={2}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'rebalance' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Optimization Suggestions</h4>
            <div className="space-y-3">
              {optimizationSuggestions.map((suggestion, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      {getActionIcon(suggestion.action)}
                      <span className="font-semibold text-gray-900">
                        {suggestion.action.toUpperCase()} {suggestion.symbol}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(suggestion.priority)}`}>
                        {suggestion.priority}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-2 text-sm">
                    <div>
                      <span className="text-gray-600">Current Weight:</span>
                      <span className="ml-2 font-medium">{suggestion.currentWeight.toFixed(1)}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Target Weight:</span>
                      <span className="ml-2 font-medium">{suggestion.targetWeight.toFixed(1)}%</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600">{suggestion.reasoning}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'risk' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Portfolio Risk Breakdown</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={efficiencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="symbol" />
                <YAxis tickFormatter={(value) => `${value.toFixed(1)}%`} />
                <Tooltip 
                  formatter={(value) => [`${value.toFixed(1)}%`, 'Risk']}
                />
                <Bar dataKey="risk" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="font-medium text-red-900">High Risk Assets</span>
                </div>
                <p className="text-sm text-red-700 mt-1">
                  {efficiencyData.filter(s => s.risk > 10).length} assets above 10% risk
                </p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-900">Diversification Score</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  8.5/10 - Well diversified
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
