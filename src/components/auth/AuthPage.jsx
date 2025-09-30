'use client';

import React, { useState } from 'react';
import { Shield, TrendingUp, BarChart3, Brain, Lock } from 'lucide-react';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';

export default function AuthPage() {
  const [activeView, setActiveView] = useState('login');

  const features = [
    {
      icon: TrendingUp,
      title: 'Real-Time Portfolio Tracking',
      description: 'Monitor your investments with live market data and instant updates'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Comprehensive performance metrics and risk analysis tools'
    },
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Get intelligent recommendations based on machine learning'
    },
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Your data is encrypted and protected with enterprise-grade security'
    }
  ];

  const stats = [
    { value: '$10B+', label: 'Assets Under Management' },
    { value: '50K+', label: 'Active Investors' },
    { value: '99.9%', label: 'Uptime Guarantee' },
    { value: '4.9★', label: 'User Rating' }
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900">
        <div className="w-full max-w-2xl flex justify-center">
          {activeView === 'login' && (
            <Login
              onSwitchToRegister={() => setActiveView('register')}
              onForgotPassword={() => setActiveView('forgot')}
            />
          )}
          {activeView === 'register' && (
            <Register onSwitchToLogin={() => setActiveView('login')} />
          )}
          {activeView === 'forgot' && (
            <ForgotPassword onBackToLogin={() => setActiveView('login')} />
          )}
        </div>
      </div>

      {/* Right Panel - Features & Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-12 flex-col justify-between text-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full -ml-48 -mb-48"></div>
        
        <div className="relative z-10">
          {/* Logo & Tagline */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <TrendingUp className="h-7 w-7 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold">WealthTracker Pro</h1>
            </div>
            <p className="text-xl text-blue-100">
              Professional Investment Portfolio Management for Canadian Investors
            </p>
          </div>

          {/* Features */}
          <div className="space-y-6 mb-12">
            <h2 className="text-2xl font-bold mb-6">Why Choose WealthTracker Pro?</h2>
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                  <p className="text-blue-100 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-blue-100 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="relative z-10 mt-12">
          <div className="flex items-center space-x-2 mb-4">
            <Lock className="h-5 w-5" />
            <span className="text-sm font-medium">Trusted & Secure Platform</span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-blue-100">
            <span>🇨🇦 IIROC Regulated</span>
            <span>•</span>
            <span>🔒 256-bit Encryption</span>
            <span>•</span>
            <span>✓ SOC 2 Certified</span>
          </div>
        </div>
      </div>
    </div>
  );
}