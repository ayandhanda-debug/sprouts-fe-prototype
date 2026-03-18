import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Mail, Linkedin, Sparkles, RefreshCw } from 'lucide-react';

export interface MessageReasoning {
  status: 'available' | 'stale';
  appliesTo?: string;
  summary?: string;
  staleReason?: string;
}

export interface GeneratedMessage {
  type:
    | 'email'
    | 'followUp'
    | 'secondFollowUp'
    | 'connectionRequest'
    | 'postConnection'
    | 'linkedinFollowUp';
  subject?: string;
  body: string;
  wordCount: number;
  reasoning?: MessageReasoning;
  sourceChips?: string[];
}

interface MessagePreviewProps {
  contactName: string;
  linkedinUrl?: string;
  messages: GeneratedMessage[];
  isLoading?: boolean;
}

type MessageChannel = 'email' | 'linkedin';
const REASONING_PREVIEW_LIMIT = 220;

export default function MessagePreview({ contactName, linkedinUrl, messages, isLoading = false }: MessagePreviewProps) {
  const [expandedMessages, setExpandedMessages] = useState<Set<string>>(new Set(['email']));
  const [expandedReasoningChannels, setExpandedReasoningChannels] = useState<Record<MessageChannel, boolean>>({
    email: false,
    linkedin: false,
  });
  const [closedReasoningChannels, setClosedReasoningChannels] = useState<Record<MessageChannel, boolean>>({
    email: false,
    linkedin: false,
  });

  const toggleMessage = (type: string) => {
    const newExpanded = new Set(expandedMessages);
    if (newExpanded.has(type)) {
      newExpanded.delete(type);
    } else {
      newExpanded.add(type);
    }
    setExpandedMessages(newExpanded);
  };

  const isLinkedinType = (type: string) =>
    type === 'connectionRequest' || type === 'postConnection' || type === 'linkedinFollowUp';

  const getMessageChannel = (type: string): MessageChannel => (isLinkedinType(type) ? 'linkedin' : 'email');

  const getMessageTypeLabel = (type: string) => {
    switch (type) {
      case 'email':
        return 'Email';
      case 'followUp':
        return 'Follow-up 1';
      case 'secondFollowUp':
        return 'Follow-up 2';
      case 'connectionRequest':
        return 'LinkedIn Message';
      case 'postConnection':
        return 'LinkedIn Follow-up 1';
      case 'linkedinFollowUp':
        return 'LinkedIn Follow-up 2';
      default:
        return type;
    }
  };

  const getMessageIcon = (type: string) => {
    if (type === 'connectionRequest' || type === 'postConnection' || type === 'linkedinFollowUp') {
      return <Linkedin size={18} style={{ color: '#1c64f2' }} />;
    }
    return <Mail size={18} style={{ color: '#1c64f2' }} />;
  };

  const getChannelMessages = (channel: MessageChannel) =>
    messages.filter((message) => getMessageChannel(message.type) === channel);

  const getSourceChips = (message: GeneratedMessage): string[] => {
    if (message.sourceChips && message.sourceChips.length > 0) {
      return message.sourceChips;
    }

    switch (message.type) {
      case 'email':
        return ['ICP Fit', 'Pain Point Signal', 'Case Study'];
      case 'followUp':
        return ['Recent Signal', 'Outcome Proof'];
      case 'secondFollowUp':
        return ['Industry Insight', 'Testimonial'];
      case 'connectionRequest':
        return ['LinkedIn Signal', 'Role Context'];
      case 'postConnection':
        return ['Profile Insight', 'Customer Proof'];
      case 'linkedinFollowUp':
        return ['Follow-up Signal', 'Product Snapshot'];
      default:
        return ['Signal'];
    }
  };

  const getChannelReasoning = (channelMessages: GeneratedMessage[]) => {
    const availableReasoning = channelMessages.filter(
      (message) =>
        message.reasoning?.status === 'available' &&
        Boolean(message.reasoning.summary?.trim())
    );
    const staleReasoning = channelMessages.filter((message) => !availableReasoning.includes(message));

    if (availableReasoning.length > 0) {
      return {
        status: 'available' as const,
        summary: availableReasoning
          .map((message) => message.reasoning?.summary?.trim())
          .filter(Boolean)
          .join(' '),
        staleCount: staleReasoning.length,
      };
    }

    return {
      status: 'stale' as const,
      staleReason:
        staleReasoning.find((message) => message.reasoning?.staleReason)?.reasoning?.staleReason ??
        'These messages were generated before AI reasoning was enabled. Regenerate to view reasoning.',
    };
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
        {(['email', 'linkedin'] as MessageChannel[]).map((channel) => {
          const channelMessages = getChannelMessages(channel);
          if (channelMessages.length === 0) {
            return null;
          }
          const channelReasoning = getChannelReasoning(channelMessages);
          const appliesTo = channelMessages.map((message) => getMessageTypeLabel(message.type)).join(' + ');
          const reasoningText =
            channelReasoning.status === 'available'
              ? channelReasoning.summary
              : channelReasoning.staleReason;
          const isReasoningExpanded = expandedReasoningChannels[channel];
          const isReasoningClosed = closedReasoningChannels[channel];
          const showReasoningToggle =
            typeof reasoningText === 'string' && reasoningText.length > REASONING_PREVIEW_LIMIT;
          const reasoningPreview =
            showReasoningToggle && !isReasoningExpanded
              ? `${reasoningText.slice(0, REASONING_PREVIEW_LIMIT).trimEnd()}...`
              : reasoningText;

          return (
            <div
              key={channel}
              className="border rounded-lg p-3"
              style={{ borderColor: '#e7e7e6' }}
            >
              <div className="px-2 py-1 mb-2">
                <span className="text-xs font-semibold tracking-wide" style={{ color: '#1f2937' }}>
                  {channel === 'email' ? 'EMAIL' : 'LINKEDIN'}
                </span>
              </div>

              <div className="space-y-3">
                {channelMessages.map((message) => {
                  const isExpanded = expandedMessages.has(message.type);

                  return (
                    <div
                      key={message.type}
                      className="border rounded-lg overflow-hidden"
                      style={{ borderColor: '#e7e7e6' }}
                    >
                      <button
                        onClick={() => toggleMessage(message.type)}
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

                      {isExpanded && (
                        <div className="border-t" style={{ borderColor: '#e7e7e6' }}>
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

                          <div className="p-4">
                            <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: '#191918' }}>
                              {message.body}
                            </p>
                          </div>

                          <div className="px-4 pb-3 flex justify-end items-center gap-2 flex-wrap">
                            {getSourceChips(message).map((chip) => (
                              <span
                                key={`${message.type}-${chip}`}
                                className="text-[11px] font-semibold px-2 py-1 rounded-full"
                                style={{ color: '#374151', backgroundColor: '#f3f4f6' }}
                              >
                                {chip}
                              </span>
                            ))}
                            <span className="text-xs" style={{ color: '#706f69' }}>
                              {message.wordCount} words
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                <div
                  className="rounded-lg border overflow-hidden"
                  style={{
                    borderColor: channelReasoning.status === 'available' ? '#ddd6fe' : '#e7e7e6',
                    backgroundColor: '#ffffff',
                  }}
                >
                  <div
                    className="px-3 py-2 border-b flex items-center justify-between"
                    style={{
                      borderColor: channelReasoning.status === 'available' ? '#ddd6fe' : '#e7e7e6',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles
                        size={14}
                        style={{ color: channelReasoning.status === 'available' ? '#7c3aed' : '#374151' }}
                      />
                      <span
                        className="text-sm font-semibold"
                        style={{ color: channelReasoning.status === 'available' ? '#5b21b6' : '#111928' }}
                      >
                        AI Reasoning
                      </span>
                      <span
                        className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ color: '#7c3aed', backgroundColor: '#ede9fe' }}
                      >
                        Why these messages?
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setClosedReasoningChannels((prev) => ({
                          ...prev,
                          [channel]: !prev[channel],
                        }))
                      }
                      className="inline-flex items-center justify-center p-1 rounded hover:bg-white"
                      aria-label={isReasoningClosed ? 'Expand AI reasoning' : 'Collapse AI reasoning'}
                    >
                      {isReasoningClosed ? (
                        <ChevronDown size={18} style={{ color: '#706f69' }} />
                      ) : (
                        <ChevronUp size={18} style={{ color: '#706f69' }} />
                      )}
                    </button>
                  </div>

                  {!isReasoningClosed && (
                    <div
                      className="px-3 py-2"
                      style={{
                        backgroundColor:
                          channelReasoning.status === 'available' ? '#f5f3ff' : '#fafafa',
                      }}
                    >
                      <p className="text-xs font-semibold mb-1" style={{ color: '#5b21b6' }}>
                        Applies to: {appliesTo}
                      </p>

                      {channelReasoning.status === 'available' ? (
                        <>
                          <p className="text-sm leading-snug" style={{ color: '#312e81' }}>
                            {reasoningPreview}
                          </p>
                          {showReasoningToggle && (
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedReasoningChannels((prev) => ({
                                  ...prev,
                                  [channel]: !prev[channel],
                                }))
                              }
                              className="text-xs font-semibold mt-2 hover:underline"
                              style={{ color: '#6d28d9' }}
                            >
                              {isReasoningExpanded ? 'See less' : 'See more'}
                            </button>
                          )}
                          {channelReasoning.staleCount > 0 && (
                            <p className="text-xs mt-2" style={{ color: '#6d28d9' }}>
                              {channelReasoning.staleCount} message(s) were generated before reasoning capture and may
                              need regeneration.
                            </p>
                          )}
                        </>
                      ) : (
                        <>
                          <p className="text-sm mb-2" style={{ color: '#706f69' }}>
                            {reasoningPreview}
                          </p>
                          {showReasoningToggle && (
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedReasoningChannels((prev) => ({
                                  ...prev,
                                  [channel]: !prev[channel],
                                }))
                              }
                              className="text-xs font-semibold mb-2 hover:underline"
                              style={{ color: '#4b5563' }}
                            >
                              {isReasoningExpanded ? 'See less' : 'See more'}
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => console.log(`Regenerate requested for ${channel}`)}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border hover:bg-white"
                            style={{ borderColor: '#d1d5db', color: '#111928' }}
                          >
                            <RefreshCw size={14} />
                            Regenerate to get AI reasoning
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
