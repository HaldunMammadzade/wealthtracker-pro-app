'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Bell, TrendingUp, TrendingDown, Info, AlertTriangle, Settings, CheckCircle, XCircle } from 'lucide-react';

export default function NotificationsPanel({ isOpen, onClose }) {
  const panelRef = useRef(null);
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'price',
      title: 'Price Alert: SHOP Target Reached',
      message: 'Shopify (SHOP) has reached your target price of $70.00. Current price: $70.15 (+3.2%)',
      timestamp: '2024-09-11T14:30:00Z',
      isRead: false,
      priority: 'high',
      symbol: 'SHOP'
    },
    {
      id: '2',
      type: 'news',
      title: 'Bank of Canada Rate Decision',
      message: 'Bank of Canada maintains interest rate at 5.0%. This may impact financial sector holdings in your portfolio.',
      timestamp: '2024-09-11T13:15:00Z',
      isRead: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'trade',
      title: 'Trade Execution Successful',
      message: 'Successfully purchased 50 shares of AAPL at $175.84. Total cost: $8,792.00 including fees.',
      timestamp: '2024-09-11T11:45:00Z',
      isRead: true,
      priority: 'low',
      symbol: 'AAPL'
    },
    {
      id: '4',
      type: 'system',
      title: 'Portfolio Rebalancing Recommended',
      message: 'Your portfolio has drifted 8% from target allocation. Technology sector is overweight by 12%.',
      timestamp: '2024-09-11T09:30:00Z',
      isRead: false,
      priority: 'medium'
    },
    {
      id: '5',
      type: 'price',
      title: 'Volatility Alert: Tech Sector',
      message: 'Increased volatility detected in AAPL, MSFT, GOOGL. Consider reviewing stop-loss orders.',
      timestamp: '2024-09-10T16:20:00Z',
      isRead: true,
      priority: 'high'
    },
    {
      id: '6',
      type: 'news',
      title: 'Earnings Report: Royal Bank',
      message: 'RY reports Q3 earnings beat expectations. EPS: $2.85 vs $2.78 expected.',
      timestamp: '2024-09-10T08:00:00Z',
      isRead: false,
      priority: 'medium',
      symbol: 'RY'
    }
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (id, event) => {
    event.stopPropagation();
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'price': return <TrendingUp className="h-5 w-5 text-blue-600" />;
      case 'news': return <Info className="h-5 w-5 text-green-600" />;
      case 'trade': return <CheckCircle className="h-5 w-5 text-purple-600" />;
      case 'system': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      default: return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'price': return 'bg-blue-100 text-blue-800';
      case 'news': return 'bg-green-100 text-green-800';
      case 'trade': return 'bg-purple-100 text-purple-800';
      case 'system': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread': return !notification.isRead;
      case 'price': return notification.type === 'price';
      case 'news': return notification.type === 'news';
      default: return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const highPriorityCount = notifications.filter(n => !n.isRead && n.priority === 'high').length;

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-md z-40" />
      
      <div className="fixed top-16 right-6 z-50">
        <div 
          ref={panelRef}
          className="bg-white rounded-xl shadow-xl w-96 max-h-[calc(100vh-120px)] overflow-hidden transform transition-all duration-300 scale-100 border border-gray-200"
          style={{ boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
        >
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                {unreadCount > 0 && (
                  <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full font-medium">
                    {unreadCount}
                  </span>
                )}
                {highPriorityCount > 0 && (
                  <span className="px-2 py-1 text-xs bg-orange-500 text-white rounded-full font-medium">
                    1 urgent
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            
            <div className="flex space-x-1 bg-white p-1 rounded-lg">
              {[
                { id: 'all', label: 'All', count: notifications.length },
                { id: 'unread', label: 'Unread', count: unreadCount },
                { id: 'price', label: 'Price', count: notifications.filter(n => n.type === 'price').length },
                { id: 'news', label: 'News', count: notifications.filter(n => n.type === 'news').length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`flex-1 px-2 py-1 text-xs font-medium rounded transition-colors ${
                    filter === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
            
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {filter === 'all' ? 'No notifications' : `No ${filter} notifications`}
                </h3>
                <p className="text-sm text-gray-600">
                  {filter === 'all' ? "You're all caught up!" : 'Try changing the filter to see more notifications.'}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer border-l-4 transition-all ${getPriorityColor(notification.priority)} ${
                      !notification.isRead ? 'bg-blue-50 shadow-sm' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getNotificationIcon(notification.type)}
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getTypeColor(notification.type)}`}>
                          {notification.type.toUpperCase()}
                        </span>
                        {notification.symbol && (
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded font-mono">
                            {notification.symbol}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          {getTimeAgo(notification.timestamp)}
                        </span>
                        <button
                          onClick={(e) => deleteNotification(notification.id, e)}
                          className="p-1 hover:bg-red-100 rounded transition-colors"
                          title="Delete notification"
                        >
                          <XCircle className="h-3 w-3 text-gray-400 hover:text-red-600" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-sm font-medium mb-1 ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                          {notification.message}
                        </p>
                        
                        {notification.type === 'price' && !notification.isRead && (
                          <div className="flex space-x-2 mt-2">
                            <button className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors">
                              View Chart
                            </button>
                            <button className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                              Trade
                            </button>
                          </div>
                        )}
                        
                        {notification.type === 'system' && notification.title.includes('Rebalancing') && (
                          <div className="flex space-x-2 mt-2">
                            <button className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors">
                              View Suggestions
                            </button>
                          </div>
                        )}
                      </div>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full ml-3 mt-1 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <button 
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                onClick={() => {}}
              >
                <Settings className="h-4 w-4" />
                <span>Notification Settings</span>
              </button>
              <button 
                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                onClick={() => {}}
              >
                View All
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
