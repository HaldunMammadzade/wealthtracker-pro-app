'use client';

import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, DollarSign, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const events = [
    {
      date: '2024-09-13',
      type: 'earnings',
      symbol: 'AAPL',
      title: 'Apple Earnings Call',
      time: '4:30 PM EST'
    },
    {
      date: '2024-09-15',
      type: 'dividend',
      symbol: 'TD',
      title: 'TD Dividend Payment',
      time: 'Market Close'
    },
    {
      date: '2024-09-18',
      type: 'meeting',
      symbol: 'RY',
      title: 'Royal Bank AGM',
      time: '10:00 AM EST'
    },
    {
      date: '2024-09-20',
      type: 'earnings',
      symbol: 'SHOP',
      title: 'Shopify Q3 Results',
      time: 'After Market'
    }
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getEventsForDate = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'earnings': return 'bg-blue-500';
      case 'dividend': return 'bg-green-500';
      case 'split': return 'bg-purple-500';
      case 'meeting': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5 text-blue-600" />
            <span>Financial Calendar</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm font-medium min-w-[120px] text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <button
              onClick={() => navigateMonth('next')}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {dayNames.map(day => (
            <div key={day} className="p-2 text-center text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}
          
          {getDaysInMonth(currentDate).map((day, index) => {
            const dayEvents = day ? getEventsForDate(day) : [];
            const isToday = day && 
              day === new Date().getDate() && 
              currentDate.getMonth() === new Date().getMonth() && 
              currentDate.getFullYear() === new Date().getFullYear();
            
            return (
              <div
                key={index}
                className={`relative p-2 text-center text-sm border rounded ${
                  day ? 'hover:bg-gray-50' : ''
                } ${isToday ? 'bg-blue-50 border-blue-300' : 'border-gray-200'}`}
              >
                {day && (
                  <>
                    <span className={`${isToday ? 'font-bold text-blue-600' : 'text-gray-900'}`}>
                      {day}
                    </span>
                    {dayEvents.length > 0 && (
                      <div className="flex justify-center space-x-1 mt-1">
                        {dayEvents.slice(0, 3).map((event, idx) => (
                          <div
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full ${getEventColor(event.type)}`}
                            title={`${event.symbol}: ${event.title}`}
                          />
                        ))}
                        {dayEvents.length > 3 && (
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-3">Upcoming Events</h4>
          <div className="space-y-2">
            {events.slice(0, 4).map((event, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${getEventColor(event.type)}`} />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">{event.symbol}</span>
                    <span className="text-xs text-gray-500">{event.date}</span>
                    {event.time && <span className="text-xs text-gray-500">{event.time}</span>}
                  </div>
                  <p className="text-sm text-gray-600">{event.title}</p>
                </div>
                {event.type === 'earnings' && <TrendingUp className="h-4 w-4 text-blue-600" />}
                {event.type === 'dividend' && <DollarSign className="h-4 w-4 text-green-600" />}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
