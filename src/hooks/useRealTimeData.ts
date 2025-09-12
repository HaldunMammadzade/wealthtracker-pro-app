'use client';

import { useState, useEffect, useCallback } from 'react';
import { Stock, MarketData } from '@/types';

export function useRealTimeData(initialStocks: Stock[]) {
  const [stocks, setStocks] = useState<Stock[]>(initialStocks);
  const [isMarketOpen, setIsMarketOpen] = useState(true);

  const updateStockPrices = useCallback(() => {
    if (!isMarketOpen) return;

    setStocks(prevStocks => 
      prevStocks.map(stock => {
        // Simulate realistic price movement (±2%)
        const changePercent = (Math.random() - 0.5) * 4;
        const priceChange = stock.price * (changePercent / 100);
        const newPrice = Math.max(0.01, stock.price + priceChange);
        const newValue = newPrice * stock.shares;

        return {
          ...stock,
          price: Math.round(newPrice * 100) / 100,
          change: Math.round(priceChange * 100) / 100,
          changePercent: Math.round(changePercent * 100) / 100,
          value: Math.round(newValue * 100) / 100,
        };
      })
    );
  }, [isMarketOpen]);

  useEffect(() => {
    // Check if market is open (9:30 AM - 4:00 PM EST)
    const checkMarketHours = () => {
      const now = new Date();
      const easternTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Toronto"}));
      const hour = easternTime.getHours();
      const day = easternTime.getDay();
      
      // Monday = 1, Friday = 5
      const isWeekday = day >= 1 && day <= 5;
      const isDuringMarketHours = hour >= 9 && hour < 16;
      
      setIsMarketOpen(isWeekday && isDuringMarketHours);
    };

    checkMarketHours();
    const marketInterval = setInterval(checkMarketHours, 60000); // Check every minute

    // Update prices every 3 seconds during market hours
    const priceInterval = setInterval(updateStockPrices, 3000);

    return () => {
      clearInterval(marketInterval);
      clearInterval(priceInterval);
    };
  }, [updateStockPrices]);

  return { stocks, isMarketOpen };
}
