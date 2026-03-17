'use client';

import { useState } from 'react';
import { X, Lightbulb, Code } from 'lucide-react';

interface AIMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedContactsCount: number;
  onSelectMethod: (method: 'smart' | 'custom') => void;
}

export default function AIMessageModal({
  isOpen,
  onClose,
  selectedContactsCount,
  onSelectMethod,
}: AIMessageModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: '#e7e7e6' }}>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-gray-100"
              style={{ color: '#706f69' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-lg font-semibold" style={{ color: '#111928' }}>
              AI Message
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100"
            style={{ color: '#706f69' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#f3f5f5' }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#706f69" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="M8 10h.01M12 10h.01M16 10h.01" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-semibold text-center mb-2" style={{ color: '#111928' }}>
            Choose your generation method
          </h3>
          <p className="text-center mb-8" style={{ color: '#706f69' }}>
            Select how you'd like to create personalized messages
          </p>

          {/* Cards */}
          <div className="grid grid-cols-2 gap-6">
            {/* Smart Generation Card */}
            <button
              onClick={() => onSelectMethod('smart')}
              className="p-6 rounded-xl border-2 hover:border-blue-500 transition-all text-left group"
              style={{ borderColor: '#e7e7e6' }}
            >
              {/* Icon and Badge */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#f3f5f5' }}
                >
                  <Lightbulb size={24} style={{ color: '#706f69' }} />
                </div>
                <span
                  className="px-3 py-1 text-xs font-medium rounded-full"
                  style={{ backgroundColor: '#dbeafe', color: '#1c64f2' }}
                >
                  ⚡ Recommended
                </span>
              </div>

              {/* Title */}
              <h4 className="text-lg font-semibold mb-2" style={{ color: '#111928' }}>
                Smart Generation
              </h4>

              {/* Description */}
              <p className="text-sm mb-4" style={{ color: '#706f69' }}>
                Automatically create personalized messages instantly. First 3 contacts are free!
              </p>

              {/* Features */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm" style={{ color: '#706f69' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>Instant Generation</span>
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: '#706f69' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>AI based WIIFT Selection</span>
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: '#706f69' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>Personalised to setup calls</span>
                </div>
              </div>

              {/* Message Count */}
              <div className="flex items-center gap-2 text-sm mb-4" style={{ color: '#706f69' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>{selectedContactsCount} message{selectedContactsCount !== 1 ? 's' : ''}</span>
              </div>

              {/* Button */}
              <div
                className="w-full py-2 text-sm font-medium text-center rounded-lg group-hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#1c64f2', color: 'white' }}
              >
                Generate Messages
              </div>
            </button>

            {/* Write Your Own Card */}
            <button
              onClick={() => onSelectMethod('custom')}
              className="p-6 rounded-xl border-2 hover:border-blue-500 transition-all text-left group"
              style={{ borderColor: '#e7e7e6' }}
            >
              {/* Icon */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#f3f5f5' }}
                >
                  <Code size={24} style={{ color: '#706f69' }} />
                </div>
              </div>

              {/* Title */}
              <h4 className="text-lg font-semibold mb-2" style={{ color: '#111928' }}>
                Write Your Own
              </h4>

              {/* Description */}
              <p className="text-sm mb-4" style={{ color: '#706f69' }}>
                Write your own instruction for complete control. Configure before generation.
              </p>

              {/* Features */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm" style={{ color: '#706f69' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>Full creative control</span>
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: '#706f69' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>Dynamic field insertion</span>
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: '#706f69' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>Advance customization</span>
                </div>
              </div>

              {/* Spacer to align with Smart Generation */}
              <div className="h-6 mb-4"></div>

              {/* Button */}
              <div
                className="w-full py-2 text-sm font-medium text-center rounded-lg border group-hover:opacity-90 transition-opacity"
                style={{ borderColor: '#e7e7e6', color: '#191918' }}
              >
                Write Prompt
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
