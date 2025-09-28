'use client';

import React from 'react';
import { Zap, TrendingUp, TrendingDown, BarChart3, Download, Settings, RefreshCw } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

export default function QuickActions({ onExport, onSettings }) {
  const actions = [
    {
      id: 'buy',
      label: 'Quick Buy',
      icon: TrendingUp,
      color: 'bg-green-500 hover:bg-green-600 text-white',
      action: () => console.log('Quick buy clicked')
    },
    {
      id: 'sell',
      label: 'Quick Sell',
      icon: TrendingDown,
      color: 'bg-red-500 hover:bg-red-600 text-white',
      action: () => console.log('Quick sell clicked')
    },
    {
      id: 'analyze',
      label: 'Portfolio Analysis',
      icon: BarChart3,
      color: 'bg-blue-500 hover:bg-blue-600 text-white',
      action: () => console.log('Analysis clicked')
    },
    {
      id: 'export',
      label: 'Export Data',
      icon: Download,
      color: 'bg-purple-500 hover:bg-purple-600 text-white',
      action: onExport
    },
    {
      id: 'refresh',
      label: 'Refresh Data',
      icon: RefreshCw,
      color: 'bg-gray-500 hover:bg-gray-600 text-white',
      action: () => window.location.reload()
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      color: 'bg-indigo-500 hover:bg-indigo-600 text-white',
      action: onSettings
    }
  ];

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="h-5 w-5 text-yellow-600" />
          <span>Quick Actions</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className={`flex flex-col items-center space-y-2 p-4 rounded-lg transition-all hover:scale-105 ${action.color}`}
            >
              <action.icon className="h-6 w-6" />
              <span className="text-sm font-medium text-center">{action.label}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
