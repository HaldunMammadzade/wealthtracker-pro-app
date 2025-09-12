'use client';

import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';

interface OrderBookEntry {
  price: number;
  size: number;
  total: number;
}

interface OrderBookProps {
  symbol: string;
}

export default function OrderBook({ symbol }: OrderBookProps) {
  const [orderBook] = useState(() => {
    const generateOrders = (basePrice: number, isBid: boolean): OrderBookEntry[] => {
      const orders: OrderBookEntry[] = [];
      let total = 0;
      
      for (let i = 0; i < 10; i++) {
        const price = isBid 
          ? basePrice - (i * 0.01) 
          : basePrice + (i * 0.01);
        const size = Math.floor(Math.random() * 1000) + 100;
        total += size;
        
        orders.push({ price, size, total });
      }
      
      return orders;
    };

    const basePrice = 175.84;
    return {
      bids: generateOrders(basePrice, true),
      asks: generateOrders(basePrice, false)
    };
  });

  const maxTotal = Math.max(
    Math.max(...orderBook.bids.map(b => b.total)),
    Math.max(...orderBook.asks.map(a => a.total))
  );

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-blue-600" />
          <span>Order Book - {symbol}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {/* Bids */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="font-semibold text-green-600">Bids</span>
            </div>
            <div className="space-y-1">
              <div className="grid grid-cols-3 text-xs font-medium text-gray-600 pb-2 border-b">
                <span>Price</span>
                <span>Size</span>
                <span>Total</span>
              </div>
              {orderBook.bids.map((bid, index) => (
                <div key={index} className="relative">
                  <div 
                    className="absolute inset-0 bg-green-100 opacity-30"
                    style={{ width: `${(bid.total / maxTotal) * 100}%` }}
                  />
                  <div className="relative grid grid-cols-3 text-xs py-1 px-2">
                    <span className="font-medium text-green-600">
                      {formatCurrency(bid.price)}
                    </span>
                    <span>{bid.size.toLocaleString()}</span>
                    <span>{bid.total.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Asks */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <TrendingDown className="h-4 w-4 text-red-600" />
              <span className="font-semibold text-red-600">Asks</span>
            </div>
            <div className="space-y-1">
              <div className="grid grid-cols-3 text-xs font-medium text-gray-600 pb-2 border-b">
                <span>Price</span>
                <span>Size</span>
                <span>Total</span>
              </div>
              {orderBook.asks.map((ask, index) => (
                <div key={index} className="relative">
                  <div 
                    className="absolute inset-0 bg-red-100 opacity-30"
                    style={{ width: `${(ask.total / maxTotal) * 100}%` }}
                  />
                  <div className="relative grid grid-cols-3 text-xs py-1 px-2">
                    <span className="font-medium text-red-600">
                      {formatCurrency(ask.price)}
                    </span>
                    <span>{ask.size.toLocaleString()}</span>
                    <span>{ask.total.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
