'use client';

import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Target, AlertCircle, Sparkles, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { formatCurrency, formatPercent } from '../../lib/utils';

export default function MarketInsights({ stocks }) {
  const [insights, setInsights] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    const generateInsights = () => {
      const mockInsights = [
        {
          id: '1',
          type: 'opportunity',
          confidence: 87,
          title: 'Canadian Banking Sector Undervalued',
          description: 'AI analysis suggests TD and RY are trading below fair value based on earnings projections and interest rate environment.',
          actionItems: [
            'Consider increasing allocation to Canadian banks',
            'Monitor upcoming earnings reports',
            'Watch for interest rate policy changes'
          ],
          timeframe: '3-6 months',
          impact: 'high',
          relatedSymbols: ['TD', 'RY']
        },
        {
          id: '2',
          type: 'warning',
          confidence: 76,
          title: 'Tech Sector Volatility Alert',
          description: 'Pattern recognition indicates increased volatility in tech holdings. Consider defensive positioning.',
          actionItems: [
            'Review position sizing in tech stocks',
            'Consider stop-loss orders',
            'Diversify into defensive sectors'
          ],
          timeframe: '2-4 weeks',
          impact: 'medium',
          relatedSymbols: ['AAPL', 'MSFT', 'GOOGL', 'SHOP']
        },
        {
          id: '3',
          type: 'bullish',
          confidence: 92,
          title: 'Shopify Growth Momentum Strong',
          description: 'Machine learning models show strong bullish signals for SHOP based on e-commerce trends and earnings momentum.',
          actionItems: [
            'SHOP showing strong technical patterns',
            'E-commerce tailwinds continue',
            'Consider adding on dips'
          ],
          timeframe: '1-3 months',
          impact: 'high',
          relatedSymbols: ['SHOP']
        },
        {
          id: '4',
          type: 'neutral',
          confidence: 68,
          title: 'Portfolio Diversification Optimal',
          description: 'Current portfolio allocation shows good risk-adjusted returns. Minor rebalancing recommended.',
          actionItems: [
            'Maintain current allocation strategy',
            'Monitor for sector rotation opportunities',
            'Regular rebalancing recommended'
          ],
          timeframe: 'Ongoing',
          impact: 'low',
          relatedSymbols: []
        }
      ];

      setTimeout(() => {
        setInsights(mockInsights);
        setIsAnalyzing(false);
      }, 2000);
    };

    generateInsights();
  }, [stocks]);

  const getInsightColor = (type) => {
    switch (type) {
      case 'bullish': return 'bg-green-50 border-green-200 text-green-800';
      case 'bearish': return 'bg-red-50 border-red-200 text-red-800';
      case 'opportunity': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'bullish': return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'bearish': return <TrendingUp className="h-5 w-5 text-red-600 rotate-180" />;
      case 'opportunity': return <Target className="h-5 w-5 text-blue-600" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      default: return <Brain className="h-5 w-5 text-gray-600" />;
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-green-600 bg-green-100';
    if (confidence >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-purple-600" />
          <span>AI Market Insights</span>
          <Sparkles className="h-4 w-4 text-purple-400" />
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {isAnalyzing ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
              <p className="text-sm text-gray-600 mt-3">AI analyzing market patterns...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {insights.map((insight) => (
              <div key={insight.id} className={`p-4 rounded-lg border ${getInsightColor(insight.type)} transition-all hover:shadow-md`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getInsightIcon(insight.type)}
                    <div>
                      <h4 className="font-semibold">{insight.title}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${getConfidenceColor(insight.confidence)}`}>
                          {insight.confidence}% confidence
                        </span>
                        <span className="text-xs text-gray-600">
                          {insight.timeframe}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          insight.impact === 'high' ? 'bg-red-100 text-red-700' :
                          insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {insight.impact} impact
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm mb-3">{insight.description}</p>
                
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Recommended Actions:</h5>
                  <ul className="space-y-1">
                    {insight.actionItems.map((action, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <ChevronRight className="h-3 w-3 mr-2" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {insight.relatedSymbols.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-medium">Related:</span>
                      {insight.relatedSymbols.map((symbol) => (
                        <span key={symbol} className="text-xs px-2 py-1 bg-gray-200 rounded">
                          {symbol}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="h-4 w-4 text-purple-600" />
                <span className="font-medium text-purple-900">AI Analysis Summary</span>
              </div>
              <p className="text-sm text-purple-700">
                Based on technical analysis, fundamental data, and market sentiment, your portfolio shows 
                strong defensive positioning with growth opportunities in Canadian equities. 
                Consider rebalancing towards financial sector exposure.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
