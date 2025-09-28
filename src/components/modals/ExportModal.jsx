'use client';

import React, { useState } from 'react';
import { Download } from 'lucide-react';
import Modal from '../ui/Modal';

export default function ExportModal({ isOpen, onClose }) {
  const [exportType, setExportType] = useState('portfolio');
  const [format, setFormat] = useState('pdf');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const filename = `wealthtracker-${exportType}-${new Date().toISOString().split('T')[0]}`;
    const blob = new Blob(['Sample export data'], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setIsExporting(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Export Portfolio Data" size="lg">
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What would you like to export?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { id: 'portfolio', label: 'Portfolio Summary', desc: 'Complete portfolio overview' },
              { id: 'transactions', label: 'Transaction History', desc: 'Detailed transaction list' },
              { id: 'performance', label: 'Performance Report', desc: 'Charts and analytics' },
              { id: 'tax', label: 'Tax Document', desc: 'CRA-ready document' }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => setExportType(option.id)}
                className={`p-4 border-2 rounded-lg text-left transition-colors ${
                  exportType === option.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h4 className="font-medium text-gray-900">{option.label}</h4>
                <p className="text-sm text-gray-600 mt-1">{option.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose format</h3>
          <div className="grid grid-cols-4 gap-3">
            {[
              { id: 'pdf', label: 'PDF' },
              { id: 'excel', label: 'Excel' },
              { id: 'csv', label: 'CSV' },
              { id: 'png', label: 'PNG' }
            ].map((fmt) => (
              <button
                key={fmt.id}
                onClick={() => setFormat(fmt.id)}
                className={`p-3 border-2 rounded-lg text-center transition-colors ${
                  format === fmt.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {fmt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            {isExporting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                <span>Export</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
