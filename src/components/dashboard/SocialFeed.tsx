'use client';

import React, { useState } from 'react';
import { MessageCircle, Heart, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

interface SocialPost {
  id: string;
  source: 'twitter' | 'reddit' | 'news';
  author: string;
  content: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  symbols: string[];
  likes: number;
  comments: number;
  timestamp: string;
  url?: string;
}

export default function SocialFeed() {
  const [posts] = useState<SocialPost[]>([
    {
      id: '1',
      source: 'twitter',
      author: '@FinanceGuru',
      content: 'Just analyzed $SHOP earnings. Revenue growth still strong despite macro headwinds. Long-term outlook remains positive. 🚀',
      sentiment: 'bullish',
      symbols: ['SHOP'],
      likes: 247,
      comments: 63,
      timestamp: '2024-09-12T10:30:00Z'
    },
    {
      id: '2',
      source: 'reddit',
      author: 'r/CanadianInvestor',
      content: 'TD and RY looking oversold. Canadian banks might be due for a bounce with interest rate stability.',
      sentiment: 'bullish',
      symbols: ['TD', 'RY'],
      likes: 89,
      comments: 34,
      timestamp: '2024-09-12T09:15:00Z'
    },
    {
      id: '3',
      source: 'twitter',
      author: '@MarketAnalyst',
      content: 'Tech sector showing weakness. AAPL, MSFT facing resistance at key levels. Might see pullback before next leg up.',
      sentiment: 'bearish',
      symbols: ['AAPL', 'MSFT'],
      likes: 156,
      comments: 42,
      timestamp: '2024-09-12T08:45:00Z'
    },
    {
      id: '4',
      source: 'news',
      author: 'Bloomberg',
      content: 'Bank of Canada signals pause in rate hikes. Canadian dollar strengthens on dovish pivot.',
      sentiment: 'neutral',
      symbols: [],
      likes: 312,
      comments: 78,
      timestamp: '2024-09-12T07:20:00Z',
      url: 'https://bloomberg.com/news/sample'
    }
  ]);

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'twitter': return '𝕏';
      case 'reddit': return '🟠';
      case 'news': return '📰';
      default: return '💬';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return 'text-green-600 bg-green-50';
      case 'bearish': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return <TrendingUp className="h-3 w-3" />;
      case 'bearish': return <TrendingDown className="h-3 w-3" />;
      default: return null;
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'now';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h`;
    
    return `${Math.floor(diffInHours / 24)}d`;
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5 text-blue-600" />
          <span>Market Sentiment</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {posts.map((post) => (
            <div key={post.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getSourceIcon(post.source)}</span>
                  <span className="font-medium text-sm text-gray-900 dark:text-white">
                    {post.author}
                  </span>
                  <span className="text-xs text-gray-500">
                    {getTimeAgo(post.timestamp)}
                  </span>
                </div>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getSentimentColor(post.sentiment)}`}>
                  {getSentimentIcon(post.sentiment)}
                  <span className="capitalize">{post.sentiment}</span>
                </div>
              </div>

              {/* Content */}
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                {post.content}
              </p>

              {/* Symbols */}
              {post.symbols.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.symbols.map((symbol) => (
                    <span
                      key={symbol}
                      className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded font-mono"
                    >
                      ${symbol}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Heart className="h-3 w-3" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-3 w-3" />
                    <span>{post.comments}</span>
                  </div>
                </div>
                {post.url && (
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span>Read more</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
