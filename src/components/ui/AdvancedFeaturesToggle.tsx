'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Info, Zap, Brain, BarChart3, Shield } from 'lucide-react';

interface AdvancedFeaturesToggleProps {
  showAdvanced: boolean;
  onToggle: () => void;
}

export default function AdvancedFeaturesToggle({ showAdvanced, onToggle }: AdvancedFeaturesToggleProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const advancedFeatures = [
    { icon: Brain, label: 'AI Insights', description: 'Machine learning recommendations' },
    { icon: BarChart3, label: 'Advanced Analytics', description: 'Deep portfolio analysis' },
    { icon: Shield, label: 'Risk Management', description: 'Professional risk tools' },
    { icon: Zap, label: 'Real-time Alerts', description: 'Performance notifications' }
  ];

  return (
    <div className="relative">
      <button 
        onClick={onToggle}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`p-2 transition-all duration-300 rounded-lg ${
          showAdvanced 
            ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 shadow-md' 
            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
        }`}
        title={showAdvanced ? 'Hide Advanced Features' : 'Show Advanced Features'}
      >
        {showAdvanced ? (
          <Eye className="h-5 w-5" />
        ) : (
          <EyeOff className="h-5 w-5" />
        )}
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50">
          <div className="flex items-center space-x-2 mb-3">
            <Info className="h-4 w-4 text-blue-600" />
            <span className="font-semibold text-gray-900">
              {showAdvanced ? 'Advanced Mode Active' : 'Advanced Features Available'}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            {showAdvanced 
              ? 'You are currently viewing all professional features. Click to switch to simplified view.'
              : 'Enable advanced features for professional-grade portfolio management and analysis.'
            }
          </p>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-900">Advanced Features Include:</h4>
            {advancedFeatures.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`p-1 rounded ${showAdvanced ? 'text-blue-600 bg-blue-50' : 'text-gray-400 bg-gray-50'}`}>
                  <feature.icon className="h-3 w-3" />
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-900">{feature.label}</span>
                  <p className="text-xs text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {!showAdvanced && (
            <button
              onClick={() => {
                onToggle();
                setShowTooltip(false);
              }}
              className="w-full mt-4 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              Enable Advanced Features
            </button>
          )}
        </div>
      )}
    </div>
  );
}
