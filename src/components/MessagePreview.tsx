import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Mail, Link as LinkIcon, Linkedin, Sparkles, RefreshCw } from 'lucide-react';

export interface MessageReasoning {
  status: 'available' | 'stale';
  appliesTo?: string;
  summary?: string;
  staleReason?: string;
}

export interface GeneratedMessage {
  type: 'email' | 'followUp' | 'secondFollowUp' | 'connectionRequest' | 'postConnection';
  subject?: string;
  body: string;
  wordCount: number;
  reasoning?: MessageReasoning;
}

interface MessagePreviewProps {
  contactName: string;
  linkedinUrl?: string;
  messages: GeneratedMessage[];
  isLoading?: boolean;
}

export default function MessagePreview({ contactName, linkedinUrl, messages, isLoading = false }: MessagePreviewProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['email']));
  const [activeTabs, setActiveTabs] = useState<Record<string, 'message' | 'reasoning'>>({});

  const toggleSection = (type: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(type)) {
      newExpanded.delete(type);
    } else {
      newExpanded.add(type);
    }
    setExpandedSections(newExpanded);
  };

  const toggleTab = (type: string, tab: 'message' | 'reasoning') => {
    setActiveTabs((prev) => ({ ...prev, [type]: tab }));
  };

  const getActiveTab = (type: string) => activeTabs[type] ?? 'message';

  const getMessageTypeLabel = (type: string) => {
    switch (type) {
      case 'email':
        return 'Email';
      case 'followUp':
        return 'Follow Up';
      case 'secondFollowUp':
        return 'Second Follow Up';
      case 'connectionRequest':
        return 'Connection Request';
      case 'postConnection':
        return 'Post Connection';
      default:
        return type;
    }
  };

  const getMessageIcon = (type: string) => {
    if (type === 'connectionRequest' || type === 'postConnection') {
      return <LinkIcon size={18} style={{ color: '#1c64f2' }} />;
    }
    return <Mail size={18} style={{ color: '#1c64f2' }} />;
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4">
            <svg
              className="animate-spin h-12 w-12 mx-auto"
              style={{ color: '#1c64f2' }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <p className="text-sm font-medium" style={{ color: '#111928' }}>
            Generating Preview...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {/* Contact Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold" style={{ color: '#111928' }}>
            {contactName}
          </h2>
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:bg-gray-100 rounded"
            >
              <Linkedin size={18} style={{ color: '#1c64f2' }} />
            </a>
          )}
        </div>
        <p className="text-sm" style={{ color: '#706f69' }}>
          Review the generated messages below
        </p>
      </div>

      {/* Message Sections */}
      <div className="space-y-4">
        {messages.map((message) => {
          const isExpanded = expandedSections.has(message.type);
          const activeTab = getActiveTab(message.type);
          const hasReasoning = message.reasoning?.status === 'available' && Boolean(message.reasoning.summary?.trim());
          return (
            <div
              key={message.type}
              className="border rounded-lg overflow-hidden"
              style={{ borderColor: '#e7e7e6' }}
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(message.type)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                style={{ backgroundColor: isExpanded ? '#ffffff' : '#fbfafd' }}
              >
                <div className="flex items-center gap-3">
                  {getMessageIcon(message.type)}
                  <span className="text-base font-medium" style={{ color: '#111928' }}>
                    {getMessageTypeLabel(message.type)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs" style={{ color: '#706f69' }}>
                    {message.wordCount} words
                  </span>
                  {isExpanded ? (
                    <ChevronUp size={20} style={{ color: '#706f69' }} />
                  ) : (
                    <ChevronDown size={20} style={{ color: '#706f69' }} />
                  )}
                </div>
              </button>

              {/* Message Content */}
              {isExpanded && (
                <div className="border-t" style={{ borderColor: '#e7e7e6' }}>
                  <div className="px-4 pt-4 pb-3">
                    <div className="inline-flex items-center gap-2 rounded-lg p-1" style={{ backgroundColor: '#f3f4f6' }}>
                      <button
                        onClick={() => toggleTab(message.type, 'message')}
                        className="px-3 py-1 text-xs font-semibold rounded-md transition-colors"
                        style={{
                          backgroundColor: activeTab === 'message' ? '#ffffff' : 'transparent',
                          color: activeTab === 'message' ? '#111928' : '#706f69',
                        }}
                      >
                        Message
                      </button>
                      <button
                        onClick={() => toggleTab(message.type, 'reasoning')}
                        className="px-3 py-1 text-xs font-semibold rounded-md transition-colors flex items-center gap-1"
                        style={{
                          backgroundColor: activeTab === 'reasoning' ? '#ffffff' : 'transparent',
                          color: activeTab === 'reasoning' ? '#111928' : '#706f69',
                        }}
                      >
                        <Sparkles size={14} />
                        AI Reasoning
                      </button>
                    </div>
                  </div>

                  {activeTab === 'message' && (
                    <>
                      {/* Subject Line (for emails) */}
                      {message.subject && (
                        <div className="px-4 py-3" style={{ backgroundColor: '#f9fafb' }}>
                          <p className="text-xs font-semibold mb-1" style={{ color: '#706f69' }}>
                            SUBJECT
                          </p>
                          <p className="text-sm font-medium" style={{ color: '#111928' }}>
                            {message.subject}
                          </p>
                        </div>
                      )}

                      {/* Message Body */}
                      <div className="p-4">
                        <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: '#191918' }}>
                          {message.body}
                        </p>
                      </div>

                      {/* Word Count Footer */}
                      <div className="px-4 pb-3 flex justify-end">
                        <span className="text-xs" style={{ color: '#706f69' }}>
                          {message.wordCount} words
                        </span>
                      </div>
                    </>
                  )}

                  {activeTab === 'reasoning' && (
                    <div className="px-4 pb-4">
                      {hasReasoning ? (
                        <div className="rounded-lg border" style={{ borderColor: '#ddd6fe', backgroundColor: '#f5f3ff' }}>
                          <div
                            className="px-4 py-3 border-b text-xs font-semibold flex items-center gap-2"
                            style={{ borderColor: '#ddd6fe', color: '#5b21b6' }}
                          >
                            <Sparkles size={14} />
                            AI Reasoning
                            {message.reasoning?.appliesTo && (
                              <span
                                className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                                style={{ color: '#7c3aed', backgroundColor: '#ede9fe' }}
                              >
                                Applies to: {message.reasoning.appliesTo}
                              </span>
                            )}
                          </div>
                          <div className="px-4 py-3">
                            <p className="text-sm leading-relaxed" style={{ color: '#312e81' }}>
                              {message.reasoning?.summary}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-lg border p-4" style={{ borderColor: '#e7e7e6', backgroundColor: '#fafafa' }}>
                          <p className="text-sm font-semibold mb-2" style={{ color: '#111928' }}>
                            AI reasoning is not available yet.
                          </p>
                          <p className="text-sm mb-4" style={{ color: '#706f69' }}>
                            {message.reasoning?.staleReason ??
                              'This message was generated before AI reasoning was enabled. Regenerate this message to view reasoning.'}
                          </p>
                          <button
                            type="button"
                            onClick={() => console.log(`Regenerate requested for ${message.type}`)}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border hover:bg-white"
                            style={{ borderColor: '#d1d5db', color: '#111928' }}
                          >
                            <RefreshCw size={14} />
                            Regenerate to get AI reasoning
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
