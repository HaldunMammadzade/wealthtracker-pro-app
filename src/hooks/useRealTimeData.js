'use client';

import { useState, useEffect, useCallback } from 'react';

export function useRealTimeData(initialStocks) {
  const [stocks, setStocks] = useState(initialStocks);
  const [isMarketOpen, setIsMarketOpen] = useState(true);

  const updateStockPrices = useCallback(() => {
    if (!isMarketOpen) return;

    setStocks(prevStocks => 
      prevStocks.map(stock => {
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
    const checkMarketHours = () => {
      const now = new Date();
      const easternTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Toronto"}));
      const hour = easternTime.getHours();
      const day = easternTime.getDay();
      
      const isWeekday = day >= 1 && day <= 5;
      const isDuringMarketHours = hour >= 9 && hour < 16;
      
      setIsMarketOpen(isWeekday && isDuringMarketHours);
    };

    checkMarketHours();
    const marketInterval = setInterval(checkMarketHours, 60000);
    const priceInterval = setInterval(updateStockPrices, 3000);

    return () => {
      clearInterval(marketInterval);
      clearInterval(priceInterval);
    };
  }, [updateStockPrices]);

  return { stocks, isMarketOpen };
}
