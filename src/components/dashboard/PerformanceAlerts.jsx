'use client';

import React from 'react';
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { formatPercent } from '../../lib/utils';

export default function PerformanceAlerts({ stocks }) {
  const generateAlerts = () => {
    const alerts = [];

    stocks.forEach(stock => {
      if (stock.changePercent > 5) {
        alerts.push({
          id: `gain-${stock.symbol}`,
          type: 'success',
          title: `Strong Performance Alert`,
          message: `${stock.symbol} is up ${formatPercent(stock.changePercent)} today`,
          action: 'Consider taking profits'
        });
      } else if (stock.changePercent < -5) {
        alerts.push({
          id: `loss-${stock.symbol}`,
          type: 'warning',
          title: `Significant Drop Alert`,
          message: `${stock.symbol} is down ${formatPercent(Math.abs(stock.changePercent))} today`,
          action: 'Review position or buy opportunity'
        });
      }
    });

    const totalValue = stocks.reduce((sum, stock) => sum + stock.value, 0);
    const totalChange = stocks.reduce((sum, stock) => sum + (stock.change * stock.shares), 0);
    const portfolioChangePercent = (totalChange / totalValue) * 100;

    if (Math.abs(portfolioChangePercent) > 2) {
      alerts.push({
        id: 'portfolio-change',
        type: portfolioChangePercent > 0 ? 'success' : 'warning',
        title: 'Portfolio Alert',
        message: `Your portfolio is ${portfolioChangePercent > 0 ? 'up' : 'down'} ${formatPercent(Math.abs(portfolioChangePercent))} today`,
        action: 'Review overall strategy'
      });
    }

    return alerts.slice(0, 3);
  };

  const alerts = generateAlerts();

  if (alerts.length === 0) return null;

  const getAlertIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getAlertColors = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900">Performance Alerts</h3>
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`p-4 rounded-lg border ${getAlertColors(alert.type)} relative`}
        >
          <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
            <X className="h-4 w-4" />
          </button>
          
          <div className="flex items-start space-x-3">
            {getAlertIcon(alert.type)}
            <div className="flex-1">
              <h4 className="font-medium">{alert.title}</h4>
              <p className="text-sm mt-1">{alert.message}</p>
              <p className="text-xs mt-2 font-medium">{alert.action}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
