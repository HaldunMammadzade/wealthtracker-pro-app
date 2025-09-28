'use client';

import React, { useState } from 'react';
import { Bell, Plus, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

export default function PriceAlerts() {
  const [alerts, setAlerts] = useState([
    {
      id: '1',
      symbol: 'AAPL',
      condition: 'above',
      targetPrice: 180.00,
      currentPrice: 175.84,
      isActive: true,
      createdAt: '2024-09-10'
    },
    {
      id: '2',
      symbol: 'SHOP',
      condition: 'below',
      targetPrice: 65.00,
      currentPrice: 68.45,
      isActive: true,
      createdAt: '2024-09-09'
    },
    {
      id: '3',
      symbol: 'TD',
      condition: 'above',
      targetPrice: 80.00,
      currentPrice: 78.43,
      isActive: false,
      createdAt: '2024-09-08'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newAlert, setNewAlert] = useState({
    symbol: '',
    condition: 'above',
    targetPrice: 0
  });

  const addAlert = () => {
    if (newAlert.symbol && newAlert.targetPrice > 0) {
      const alert = {
        id: Date.now().toString(),
        symbol: newAlert.symbol.toUpperCase(),
        condition: newAlert.condition,
        targetPrice: newAlert.targetPrice,
        currentPrice: 100,
        isActive: true,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setAlerts(prev => [...prev, alert]);
      setNewAlert({ symbol: '', condition: 'above', targetPrice: 0 });
      setShowAddForm(false);
    }
  };

  const deleteAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const toggleAlert = (id) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  const getAlertStatus = (alert) => {
    const { condition, targetPrice, currentPrice } = alert;
    const isTriggered = condition === 'above' 
      ? currentPrice >= targetPrice 
      : currentPrice <= targetPrice;
    
    if (isTriggered) return { status: 'triggered', color: 'text-red-600 bg-red-50' };
    
    const distance = Math.abs(currentPrice - targetPrice);
    const percentDistance = (distance / currentPrice) * 100;
    
    if (percentDistance <= 5) return { status: 'close', color: 'text-yellow-600 bg-yellow-50' };
    return { status: 'monitoring', color: 'text-green-600 bg-green-50' };
  };

  return (
    <div className="w-full">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-blue-600" />
              <span>Price Alerts</span>
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                {alerts.filter(a => a.isActive).length} active
              </span>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {showAddForm && (
            <div className="p-4 bg-gray-50 rounded-lg space-y-3">
              <h4 className="font-medium text-gray-900">Create New Alert</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Symbol</label>
                  <input
                    type="text"
                    placeholder="e.g., AAPL"
                    value={newAlert.symbol}
                    onChange={(e) => setNewAlert(prev => ({ ...prev, symbol: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                    <select
                      value={newAlert.condition}
                      onChange={(e) => setNewAlert(prev => ({ ...prev, condition: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="above">Above</option>
                      <option value="below">Below</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Price</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={newAlert.targetPrice || ''}
                      onChange={(e) => setNewAlert(prev => ({ ...prev, targetPrice: parseFloat(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={addAlert}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Alert
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3 max-h-80 overflow-y-auto">
            {alerts.map((alert) => {
              const alertStatus = getAlertStatus(alert);
              return (
                <div key={alert.id} className="p-3 border border-gray-200 rounded-lg bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2 min-w-0 flex-1">
                      <span className="font-bold text-gray-900 text-sm">{alert.symbol}</span>
                      <div className="flex items-center space-x-1 text-xs text-gray-600">
                        {alert.condition === 'above' ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        <span>{alert.condition} ${alert.targetPrice.toFixed(2)}</span>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${alertStatus.color}`}>
                        {alertStatus.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 ml-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={alert.isActive}
                          onChange={() => toggleAlert(alert.id)}
                          className="sr-only peer"
                        />
                        <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                      <button
                        onClick={() => deleteAlert(alert.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Current: ${alert.currentPrice.toFixed(2)}</span>
                    <span>Created: {alert.createdAt}</span>
                  </div>
                  
                  {alertStatus.status === 'triggered' && (
                    <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-800">
                      🚨 Alert triggered! {alert.symbol} is now {alert.condition} your target price.
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {alerts.length === 0 && (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No price alerts</h3>
              <p className="text-sm text-gray-600 mb-4">Set up alerts to get notified when stocks hit your target prices</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Your First Alert
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
