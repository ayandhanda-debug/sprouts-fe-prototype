'use client';

import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent, type SyntheticEvent } from 'react';
import {
  Box,
  Building2,
  ChevronRight,
  FolderOpen,
  Lightbulb,
  MessageSquareText,
  Sparkles,
  TrendingUp,
  UserRound,
  Wand2,
  X,
  Zap,
  type LucideIcon,
} from 'lucide-react';

interface WriteYourOwnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (prompt: string, model: string, messageTypes: string[]) => void;
}

type InsertCategoryKey =
  | 'offerings'
  | 'insights'
  | 'painpoints'
  | 'features'
  | 'testimonials'
  | 'outcomes'
  | 'accounts'
  | 'contacts'
  | 'products'
  | 'repository';

interface InsertCategory {
  key: InsertCategoryKey;
  label: string;
  icon: LucideIcon;
  groupToken: string;
  items: string[];
}

interface MenuPosition {
  top: number;
  left: number;
}

const painpoints = [
  'Low customer engagement from generic campaigns',
  'Inventory and stockout related profitability issues',
  'Poor demand forecasting causing revenue leakage',
];

const features = [
  'Context-aware outreach generation',
  'AI reasoning per message',
  'Proof-point based personalization',
];

const outcomes = [
  'Higher reply rate from targeted outreach',
  'Lower prompt editing overhead for SDRs',
  'Faster launch cycles for campaigns',
];

const insights = [
  'Offerings',
  'Testimonials',
  'Active Customers',
  'Case Studies',
];

const products = ['Product Docs', 'Website Pages', 'Sales Decks', 'Integration Notes'];

const repositoryFiles = [
  'sprouts.ai',
  'Logistics AI Case Study - DTDC',
  'B2B Sales Automation Guide',
  'Q4 2025 Sales Deck',
  'Global Retail Personalization Blog',
  'gartner-2026-magic-quadrant.pdf',
];

const accounts = ['Capillary', 'Hevo Data', 'SmartKargo', 'Aon Corporation', 'Razorpay'];

const contacts = [
  'Radoslaw Jankielowicz',
  'Dennis Beek',
  'Pratyush Singh',
  'Richard Chesir',
];

const toPromptToken = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 42);

const insertCategories: InsertCategory[] = [
  { key: 'offerings', label: 'Offerings', icon: Box, groupToken: '/offerings', items: ['Vendor Link Supplier Collaboration', 'Customer Journey Orchestration (CJO)'] },
  { key: 'insights', label: 'Insights', icon: Lightbulb, groupToken: '/insights', items: insights },
  { key: 'painpoints', label: 'Pain points', icon: Zap, groupToken: '/painpoints', items: painpoints },
  { key: 'features', label: 'Features', icon: Sparkles, groupToken: '/features', items: features },
  { key: 'testimonials', label: 'Testimonials', icon: MessageSquareText, groupToken: '/testimonials', items: ['Aditi Mehra - Capillary', 'Rohan Desai - Razorpay', 'Nidhi Venkataraman - SmartKargo'] },
  { key: 'outcomes', label: 'Outcomes', icon: TrendingUp, groupToken: '/outcomes', items: outcomes },
  { key: 'accounts', label: 'Accounts', icon: Building2, groupToken: '/accounts', items: accounts },
  { key: 'contacts', label: 'Contacts', icon: UserRound, groupToken: '/contacts', items: contacts },
  { key: 'products', label: 'Products', icon: Box, groupToken: '/products', items: products },
  { key: 'repository', label: 'Repository Files', icon: FolderOpen, groupToken: '/files', items: repositoryFiles },
];

const itemTokenPrefix: Record<InsertCategoryKey, string> = {
  offerings: 'offering',
  insights: 'insight',
  painpoints: 'painpoint',
  features: 'feature',
  testimonials: 'testimonial',
  outcomes: 'outcome',
  accounts: 'account',
  contacts: 'contact',
  products: 'product',
  repository: 'file',
};

const buildItemToken = (categoryKey: InsertCategoryKey, value: string, index: number) => {
  const prefix = itemTokenPrefix[categoryKey];
  if (categoryKey === 'painpoints' || categoryKey === 'testimonials') {
    return `/${prefix}_${index + 1}`;
  }
  return `/${prefix}_${toPromptToken(value)}`;
};

export default function WriteYourOwnModal({
  isOpen,
  onClose,
  onGenerate,
}: WriteYourOwnModalProps) {
  const [promptLibrary, setPromptLibrary] = useState('');
  const [instructions, setInstructions] = useState('');
  const [llmModel, setLlmModel] = useState('Claude 4.5 Haiku');
  const [messageTypes, setMessageTypes] = useState<string[]>([]);
  const promptTextareaRef = useRef<HTMLTextAreaElement>(null);
  const textareaContainerRef = useRef<HTMLDivElement>(null);
  const [showInsertMenu, setShowInsertMenu] = useState(false);
  const [slashQuery, setSlashQuery] = useState('');
  const [slashReplaceRange, setSlashReplaceRange] = useState<{ start: number; end: number } | null>(null);
  const [activeCategory, setActiveCategory] = useState<InsertCategoryKey>('features');
  const [activeInsertIndex, setActiveInsertIndex] = useState(0);
  const [menuPosition, setMenuPosition] = useState<MenuPosition>({ top: 16, left: 16 });

  const normalizedSlashQuery = slashQuery.trim().toLowerCase();

  const getVisibleItems = (category: InsertCategory) => {
    if (!normalizedSlashQuery) return category.items;
    const categoryMatches = category.label.toLowerCase().includes(normalizedSlashQuery);
    if (categoryMatches) return category.items;
    return category.items.filter((item) => item.toLowerCase().includes(normalizedSlashQuery));
  };

  const visibleCategories = insertCategories.filter((category) => {
    if (!normalizedSlashQuery) return true;
    return (
      category.label.toLowerCase().includes(normalizedSlashQuery) ||
      category.items.some((item) => item.toLowerCase().includes(normalizedSlashQuery))
    );
  });

  const resolvedActiveCategory =
    visibleCategories.find((category) => category.key === activeCategory) ?? visibleCategories[0];
  const visibleCategoryItems = resolvedActiveCategory ? getVisibleItems(resolvedActiveCategory) : [];

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

  const getCaretCoordinates = (textarea: HTMLTextAreaElement, caretIndex: number) => {
    const style = window.getComputedStyle(textarea);
    const mirror = document.createElement('div');
    mirror.style.position = 'absolute';
    mirror.style.visibility = 'hidden';
    mirror.style.whiteSpace = 'pre-wrap';
    mirror.style.wordBreak = 'break-word';
    mirror.style.overflow = 'hidden';
    mirror.style.boxSizing = style.boxSizing;
    mirror.style.width = style.width;
    mirror.style.padding = style.padding;
    mirror.style.border = style.border;
    mirror.style.fontFamily = style.fontFamily;
    mirror.style.fontSize = style.fontSize;
    mirror.style.fontWeight = style.fontWeight;
    mirror.style.lineHeight = style.lineHeight;
    mirror.style.letterSpacing = style.letterSpacing;
    mirror.style.textTransform = style.textTransform;
    mirror.style.textIndent = style.textIndent;

    const textUntilCaret = textarea.value.slice(0, caretIndex);
    mirror.textContent = textUntilCaret;

    const marker = document.createElement('span');
    marker.textContent = textarea.value.slice(caretIndex) || '.';
    mirror.appendChild(marker);

    document.body.appendChild(mirror);
    const x = marker.offsetLeft;
    const y = marker.offsetTop;
    const lineHeight = Number.parseFloat(style.lineHeight) || Number.parseFloat(style.fontSize) * 1.4;
    document.body.removeChild(mirror);
    return { x, y, lineHeight };
  };

  const updateMenuPosition = (caretIndex: number) => {
    if (!promptTextareaRef.current || !textareaContainerRef.current) return;
    const textarea = promptTextareaRef.current;
    const container = textareaContainerRef.current;
    const coords = getCaretCoordinates(textarea, caretIndex);
    const maxLeft = Math.max(8, container.clientWidth - 760);
    const computedLeft = Math.min(maxLeft, Math.max(8, coords.x + 8));
    const computedTop = Math.max(8, coords.y - textarea.scrollTop + coords.lineHeight + 6);
    setMenuPosition({ top: computedTop, left: computedLeft });
  };

  useEffect(() => {
    if (!showInsertMenu) return;
    if (visibleCategories.length === 0) return;
    if (!visibleCategories.some((category) => category.key === activeCategory)) {
      setActiveCategory(visibleCategories[0].key);
    }
    setActiveInsertIndex(0);
  }, [showInsertMenu, slashQuery]);

  const updateSlashState = (value: string, cursorIndex: number) => {
    const valueBeforeCursor = value.slice(0, cursorIndex);
    const slashMatch = valueBeforeCursor.match(/(?:^|\s)\/([a-zA-Z0-9._-]*)$/);
    if (!slashMatch) {
      setShowInsertMenu(false);
      setSlashReplaceRange(null);
      return;
    }

    const rawQuery = slashMatch[1] ?? '';
    const commandStart = cursorIndex - rawQuery.length - 1;
    setShowInsertMenu(true);
    setSlashQuery(rawQuery.toLowerCase());
    setSlashReplaceRange({ start: commandStart, end: cursorIndex });
    setActiveInsertIndex(0);
    updateMenuPosition(cursorIndex);
  };

  const handleInstructionsChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const nextValue = event.target.value;
    const cursorIndex = event.target.selectionStart ?? nextValue.length;
    setInstructions(nextValue);
    updateSlashState(nextValue, cursorIndex);
  };

  const handleCaretChange = (event: SyntheticEvent<HTMLTextAreaElement>) => {
    const cursorIndex = event.currentTarget.selectionStart ?? event.currentTarget.value.length;
    updateSlashState(event.currentTarget.value, cursorIndex);
  };

  const insertToken = (token: string) => {
    if (!slashReplaceRange) {
      const nextValue = `${instructions.trimEnd()} ${token}`.trim();
      setInstructions(nextValue);
      setShowInsertMenu(false);
      setSlashReplaceRange(null);
      requestAnimationFrame(() => {
        promptTextareaRef.current?.focus();
      });
      return;
    }

    const nextValue = `${instructions.slice(0, slashReplaceRange.start)}${token} ${instructions.slice(slashReplaceRange.end)}`;
    const nextCursorPosition = slashReplaceRange.start + token.length + 1;
    setInstructions(nextValue);
    setShowInsertMenu(false);
    setSlashReplaceRange(null);
    requestAnimationFrame(() => {
      if (!promptTextareaRef.current) return;
      promptTextareaRef.current.focus();
      promptTextareaRef.current.setSelectionRange(nextCursorPosition, nextCursorPosition);
    });
  };

  const insertCategoryToken = () => {
    if (!resolvedActiveCategory) return;
    insertToken(resolvedActiveCategory.groupToken);
  };

  const insertCategoryItemToken = (item: string, itemIndex: number) => {
    if (!resolvedActiveCategory) return;
    insertToken(buildItemToken(resolvedActiveCategory.key, item, itemIndex));
  };

  const handleInstructionsKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!showInsertMenu || !resolvedActiveCategory) return;
    if (visibleCategoryItems.length === 0) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveInsertIndex((prev) => (prev + 1) % visibleCategoryItems.length);
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveInsertIndex((prev) => (prev === 0 ? visibleCategoryItems.length - 1 : prev - 1));
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      const item = visibleCategoryItems[activeInsertIndex];
      if (item) {
        insertCategoryItemToken(item, activeInsertIndex);
      }
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      setShowInsertMenu(false);
      setSlashReplaceRange(null);
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
                <div ref={textareaContainerRef} className="relative">
                  <textarea
                    ref={promptTextareaRef}
                    value={instructions}
                    onChange={handleInstructionsChange}
                    onClick={handleCaretChange}
                    onKeyUp={handleCaretChange}
                    onKeyDown={handleInstructionsKeyDown}
                    onBlur={() => {
                      setTimeout(() => setShowInsertMenu(false), 120);
                    }}
                    placeholder="Type / to insert configured Offerings, Pain Points, Features, or Outcomes in the prompt—AI will use them when generating messages."
                    className="w-full px-4 py-3 text-sm rounded-lg border resize-none"
                    style={{ borderColor: '#e7e7e6', minHeight: '280px' }}
                  />
                  {showInsertMenu && resolvedActiveCategory && visibleCategories.length > 0 && (
                    <div
                      className="absolute z-20 w-[760px] max-w-[calc(100vw-140px)] grid grid-cols-2 gap-2"
                      style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left}px` }}
                    >
                      <div className="rounded-2xl border shadow-lg overflow-hidden" style={{ borderColor: '#e7e7e6', backgroundColor: '#ffffff' }}>
                        <div className="h-12 px-4 border-b flex items-center" style={{ borderColor: '#e7e7e6' }}>
                          <h4 className="text-[16px] font-semibold" style={{ color: '#111928' }}>
                            Select
                          </h4>
                        </div>
                        <div className="max-h-72 overflow-y-auto p-2">
                          {visibleCategories.map((category) => {
                            const Icon = category.icon;
                            const isActive = category.key === resolvedActiveCategory.key;
                            return (
                              <button
                                key={category.key}
                                type="button"
                                onMouseDown={(event) => {
                                  event.preventDefault();
                                  setActiveCategory(category.key);
                                  setActiveInsertIndex(0);
                                }}
                                className="w-full h-12 px-3 rounded-xl flex items-center justify-between text-left"
                                style={{ backgroundColor: isActive ? '#f3f5f8' : 'transparent' }}
                              >
                                <span className="inline-flex items-center gap-3 min-w-0">
                                  <Icon size={18} style={{ color: '#374151' }} />
                                  <span className="text-[14px] font-medium truncate" style={{ color: '#111928' }}>
                                    {category.label}
                                  </span>
                                </span>
                                <ChevronRight size={16} style={{ color: '#9ca3af' }} />
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="rounded-2xl border shadow-lg overflow-hidden" style={{ borderColor: '#e7e7e6', backgroundColor: '#ffffff' }}>
                        <div className="h-12 px-4 border-b flex items-center justify-between" style={{ borderColor: '#e7e7e6' }}>
                          <h4 className="text-[16px] font-semibold" style={{ color: '#111928' }}>
                            {resolvedActiveCategory.label}
                          </h4>
                          <button
                            type="button"
                            onMouseDown={(event) => {
                              event.preventDefault();
                              insertCategoryToken();
                            }}
                            className="text-[13px] font-semibold hover:underline"
                            style={{ color: '#1c64f2' }}
                          >
                            Select All
                          </button>
                        </div>
                        <div className="max-h-72 overflow-y-auto p-2">
                          {visibleCategoryItems.length === 0 ? (
                            <p className="px-2 py-2 text-[13px]" style={{ color: '#9ca3af' }}>
                              No matches
                            </p>
                          ) : (
                            visibleCategoryItems.map((item, index) => (
                              <button
                                key={`${resolvedActiveCategory.key}-${item}`}
                                type="button"
                                onMouseDown={(event) => {
                                  event.preventDefault();
                                  insertCategoryItemToken(item, index);
                                }}
                                className="w-full px-3 py-2 rounded-lg text-left"
                                style={{ backgroundColor: activeInsertIndex === index ? '#f3f5f8' : 'transparent' }}
                              >
                                <p className="text-[14px]" style={{ color: '#111928' }}>
                                  {item}
                                </p>
                              </button>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  )}
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
                      checked={messageTypes.includes('linkedin-message')}
                      onChange={() => handleToggleMessageType('linkedin-message')}
                      className="rounded"
                      style={{ accentColor: '#1c64f2' }}
                    />
                    <span className="text-sm" style={{ color: '#111928' }}>LinkedIn Message</span>
                  </label>
                  <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: '#e7e7e6' }}>
                    <input
                      type="checkbox"
                      checked={messageTypes.includes('linkedin-followup-1')}
                      onChange={() => handleToggleMessageType('linkedin-followup-1')}
                      className="rounded"
                      style={{ accentColor: '#1c64f2' }}
                    />
                    <span className="text-sm" style={{ color: '#111928' }}>LinkedIn Follow-up 1</span>
                  </label>
                  <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: '#e7e7e6' }}>
                    <input
                      type="checkbox"
                      checked={messageTypes.includes('linkedin-followup-2')}
                      onChange={() => handleToggleMessageType('linkedin-followup-2')}
                      className="rounded"
                      style={{ accentColor: '#1c64f2' }}
                    />
                    <span className="text-sm" style={{ color: '#111928' }}>LinkedIn Follow-up 2</span>
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
