'use client';

import React from 'react';
import { DollarSign, TrendingUp, Wallet, Activity } from 'lucide-react';
import { PortfolioStats } from '@/types';
import { formatCurrency, formatPercent } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

interface PortfolioStatsProps {
  stats: PortfolioStats;
}

export default function PortfolioStatsComponent({ stats }: PortfolioStatsProps) {
  const statsData = [
    {
      title: 'Total Portfolio Value',
      value: formatCurrency(stats.totalValue),
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Gain/Loss',
      value: formatCurrency(stats.totalGainLoss),
      subtitle: formatPercent(stats.totalGainLossPercent),
      icon: TrendingUp,
      color: stats.totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600',
      bgColor: stats.totalGainLoss >= 0 ? 'bg-green-50' : 'bg-red-50'
    },
    {
      title: 'Today\'s Change',
      value: formatCurrency(stats.dayGainLoss),
      subtitle: formatPercent(stats.dayGainLossPercent),
      icon: Activity,
      color: stats.dayGainLoss >= 0 ? 'text-green-600' : 'text-red-600',
      bgColor: stats.dayGainLoss >= 0 ? 'bg-green-50' : 'bg-red-50'
    },
    {
      title: 'Cash Balance',
      value: formatCurrency(stats.cashBalance),
      icon: Wallet,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                {stat.subtitle && (
                  <p className={`text-sm ${stat.color}`}>{stat.subtitle}</p>
                )}
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
