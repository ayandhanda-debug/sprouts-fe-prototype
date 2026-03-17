'use client';

import { useState } from 'react';
import { X, Wand2 } from 'lucide-react';

interface WriteYourOwnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (prompt: string, model: string, messageTypes: string[]) => void;
}

export default function WriteYourOwnModal({
  isOpen,
  onClose,
  onGenerate,
}: WriteYourOwnModalProps) {
  const [promptLibrary, setPromptLibrary] = useState('');
  const [instructions, setInstructions] = useState('');
  const [llmModel, setLlmModel] = useState('Claude 4.5 Haiku');
  const [messageTypes, setMessageTypes] = useState<string[]>([]);

  const handleToggleMessageType = (type: string) => {
    setMessageTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleGenerate = () => {
    if (instructions && messageTypes.length > 0) {
      onGenerate(instructions, llmModel, messageTypes);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
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
        <div className="flex-1 overflow-y-auto p-6">
          {/* Title */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#111928' }}>
              Prompt Mode
            </h3>
            <p className="text-sm" style={{ color: '#706f69' }}>
              Write your own instructions and configure advanced settings for message generation.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - Prompt Input */}
            <div className="col-span-2 space-y-4">
              {/* Prompt Library */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#111928' }}>
                  Prompt Library
                </label>
                <select
                  value={promptLibrary}
                  onChange={(e) => setPromptLibrary(e.target.value)}
                  className="w-full px-4 py-2 text-sm rounded-lg border"
                  style={{ borderColor: '#e7e7e6', color: '#706f69' }}
                >
                  <option value="">Select Prompt Library</option>
                  <option value="cold-outreach">Cold Outreach Template</option>
                  <option value="follow-up">Follow-up Template</option>
                  <option value="intro">Introduction Template</option>
                </select>
              </div>

              {/* Your Instructions */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#111928' }}>
                  Your Instructions
                </label>
                <div className="relative">
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="Type / to insert configured Offerings, Pain Points, Features, or Outcomes in the prompt—AI will use them when generating messages."
                    className="w-full px-4 py-3 text-sm rounded-lg border resize-none"
                    style={{ borderColor: '#e7e7e6', minHeight: '280px' }}
                  />
                  <button
                    className="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border hover:bg-gray-50 transition-colors"
                    style={{ borderColor: '#e7e7e6', color: '#706f69' }}
                  >
                    <Wand2 size={14} />
                    Improve Prompt
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Configuration */}
            <div className="space-y-4">
              {/* LLM Model */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#111928' }}>
                  LLM Model
                  <span style={{ color: '#ef4444' }}> *</span>
                </label>
                <select
                  value={llmModel}
                  onChange={(e) => setLlmModel(e.target.value)}
                  className="w-full px-4 py-2 text-sm rounded-lg border"
                  style={{ borderColor: '#e7e7e6', color: '#111928' }}
                >
                  <option value="Claude 4.5 Haiku">Claude 4.5 Haiku</option>
                  <option value="Claude 4.5 Sonnet">Claude 4.5 Sonnet</option>
                  <option value="GPT-4">GPT-4</option>
                </select>
              </div>

              {/* Message Type */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#111928' }}>
                  Message Type
                  <span style={{ color: '#ef4444' }}> *</span>
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: '#e7e7e6' }}>
                    <input
                      type="checkbox"
                      checked={messageTypes.includes('email')}
                      onChange={() => handleToggleMessageType('email')}
                      className="rounded"
                      style={{ accentColor: '#1c64f2' }}
                    />
                    <span className="text-sm" style={{ color: '#111928' }}>Email</span>
                  </label>
                  <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: '#e7e7e6' }}>
                    <input
                      type="checkbox"
                      checked={messageTypes.includes('linkedin-connect')}
                      onChange={() => handleToggleMessageType('linkedin-connect')}
                      className="rounded"
                      style={{ accentColor: '#1c64f2' }}
                    />
                    <span className="text-sm" style={{ color: '#111928' }}>LinkedIn Connect Request</span>
                  </label>
                  <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: '#e7e7e6' }}>
                    <input
                      type="checkbox"
                      checked={messageTypes.includes('linkedin-post')}
                      onChange={() => handleToggleMessageType('linkedin-post')}
                      className="rounded"
                      style={{ accentColor: '#1c64f2' }}
                    />
                    <span className="text-sm" style={{ color: '#111928' }}>LinkedIn Post Connection</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex items-center justify-between" style={{ borderColor: '#e7e7e6' }}>
          <button
            className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
            style={{ color: '#706f69' }}
          >
            Save Prompt
          </button>
          <button
            onClick={handleGenerate}
            disabled={!instructions || messageTypes.length === 0}
            className="px-6 py-2 text-sm font-medium text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#4b5563' }}
          >
            Generate all & Proceed
          </button>
        </div>
      </div>
    </div>
  );
}
