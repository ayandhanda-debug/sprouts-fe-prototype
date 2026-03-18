'use client';

import { useState, useEffect, useRef } from 'react';
import {
  X,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Check,
  Search,
  Globe,
  Clock,
  FileText,
  ExternalLink,
  RefreshCw,
  Table,
  Zap,
  TrendingUp,
  Users,
  Shield,
  Award,
  Newspaper,
  DollarSign,
  Target,
  Lightbulb,
  BarChart3,
  Megaphone,
  Briefcase,
  Leaf,
  Building,
  ArrowLeft,
  Mic,
  Loader2,
  Edit3,
  Plus,
  List,
  Pencil,
} from 'lucide-react';

// Template categories
const templateCategories = [
  { id: 'market', name: 'Market Dynamics', icon: TrendingUp, color: '#3b82f6' },
  { id: 'leadership', name: 'Leadership Challenges', icon: Users, color: '#8b5cf6' },
  { id: 'compliance', name: 'Compliance Risks', icon: Shield, color: '#ef4444' },
  { id: 'customer', name: 'Customer Challenges', icon: Target, color: '#f59e0b' },
  { id: 'competitor-news', name: 'Competitor News', icon: Newspaper, color: '#06b6d4' },
  { id: 'news', name: 'News', icon: FileText, color: '#6b7280' },
  { id: 'security', name: 'Security Risks', icon: Shield, color: '#dc2626' },
  { id: 'digital', name: 'Digital Challenges', icon: Zap, color: '#7c3aed' },
  { id: 'financial', name: 'Financial Indicators', icon: DollarSign, color: '#16a34a' },
  { id: 'intelligence', name: 'Financial Intelligence', icon: BarChart3, color: '#0d9488' },
  { id: 'sales', name: 'Sales & Marketing', icon: Megaphone, color: '#ea580c' },
  { id: 'talent', name: 'Talent Management', icon: Users, color: '#9333ea' },
  { id: 'operations', name: 'Operations Management', icon: Briefcase, color: '#64748b' },
  { id: 'product', name: 'Product Innovation', icon: Lightbulb, color: '#ca8a04' },
  { id: 'sales-challenges', name: 'Sales and marketing challenges', icon: Megaphone, color: '#f97316' },
  { id: 'sustainability', name: 'Sustainability & CSR', icon: Leaf, color: '#22c55e' },
  { id: 'industry', name: 'Industry Research', icon: Building, color: '#3b82f6' },
  { id: 'highlights', name: 'Company Highlights', icon: Award, color: '#f59e0b' },
];

const templatesByCategory: Record<string, string[]> = {
  market: [
    'Losing Ground To Key Competitors',
    'Shifting focus to SMB',
    'Global market presence expansion',
    'Entry into new markets and segments',
    'Expanding customer base',
    'Declining market share and competitiveness',
    'Challenges in market expansion',
    'Adapting to changing competitive landscape',
    'Competitive pricing strategies',
    'Strategic acquisitions for growth',
    'Competition from innovative startups',
    'Operating in declining industries',
    'Upcycling focus to enterprise clients',
    'Delayed response to emerging market trends',
  ],
  leadership: ['Executive turnover and changes', 'New CEO appointment impact', 'Leadership succession planning', 'Board composition changes', 'C-suite restructuring'],
  compliance: ['Regulatory compliance challenges', 'Legal and litigation risks', 'Data privacy concerns', 'Industry regulation changes'],
  customer: ['Customer churn indicators', 'Customer satisfaction trends', 'Customer expansion opportunities'],
  'competitor-news': ['Competitor product launches', 'Competitor funding news', 'Competitor market moves'],
  news: ['Recent press releases', 'Media coverage analysis', 'Industry news mentions'],
  security: ['Cybersecurity incidents', 'Data breach history', 'Security compliance status'],
  digital: ['Digital transformation initiatives', 'Technology adoption trends', 'IT infrastructure changes'],
  financial: ['Revenue growth trends', 'Profitability indicators', 'Financial health metrics'],
  intelligence: ['Funding round analysis', 'Valuation trends', 'Investor sentiment'],
  sales: ['Sales team changes', 'Go-to-market strategy shifts', 'Marketing campaign analysis'],
  talent: ['Hiring trends', 'Layoff announcements', 'Key talent movements'],
  operations: ['Supply chain challenges', 'Operational efficiency', 'Manufacturing updates'],
  product: ['R&D investments', 'Patent filings', 'Product roadmap signals'],
  'sales-challenges': ['Sales pipeline stagnation', 'Missed revenue targets', 'Low marketing ROI indicators', 'Customer acquisition cost increase', 'Declining conversion rates', 'Sales and marketing misalignment'],
  sustainability: ['ESG initiatives', 'Carbon footprint goals', 'Sustainability reporting'],
  industry: ['Industry trend analysis', 'Market size changes', 'Regulatory landscape'],
  highlights: ['Recent awards and recognition', 'Major partnerships announced', 'Significant milestones achieved', 'Product launches and innovations'],
};

const locationOptions = ['Global', 'North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East & Africa'];
const timeRangeOptions = ['Past Week', 'Past Month', 'Past 3 Months', 'Past 6 Months', 'Past Year'];
const responseFormatOptions = ['Paragraph', 'Bullet Points', 'Summary', 'Detailed Analysis'];

const aiModels = [
  { id: 'sprouts-research', name: 'Sprouts Research', credits: 3, webSearchIncluded: true },
  { id: 'haiku', name: 'Claude Haiku', credits: 1, webSearchIncluded: false },
  { id: 'gpt-4', name: 'GPT-4o', credits: 5, webSearchIncluded: false },
  { id: 'sonnet', name: 'Claude Sonnet', credits: 2, webSearchIncluded: false },
];

const initialActiveSignals = [
  { id: 1, name: 'Key Competitors', status: 'running', progress: 97, enrichedRows: 2981, totalRows: 2982, lastRun: '09 Jan, 2026' },
  { id: 2, name: 'AI News Insights', status: 'running', progress: 93, enrichedRows: 2781, totalRows: 2985, lastRun: '09 Jan, 2026' },
  { id: 3, name: 'Industry Awards And Achievements', status: 'running', progress: 80, enrichedRows: 2380, totalRows: 2984, lastRun: '09 Jan, 2026' },
  { id: 4, name: 'Recent Funding Announcements', status: 'running', progress: 93, enrichedRows: 2780, totalRows: 2983, lastRun: '09 Jan, 2026' },
  { id: 5, name: 'New Offerings', status: 'running', progress: 100, enrichedRows: 2981, totalRows: 2981, lastRun: '09 Jan, 2026' },
  { id: 6, name: 'India Presence', status: 'completed', progress: 100, enrichedRows: 1, totalRows: 1, lastRun: '09 Jan, 2026' },
];

const previewResults = [
  { name: 'Mendix', initials: 'ME', color: '#3b82f6', signal: 'Mendix is facing sustained competitive pressure from OutSystems and Appian, with Feb 4, 2026 market comparisons naming them as top enterprise rivals and a broader set of usage-priced and open-source alternatives increasing buyer choice.' },
  { name: 'Incorta', initials: 'IN', color: '#8b5cf6', signal: 'Incorta is facing competitive pressure from integrated ABI platforms (notably Microsoft Power BI/Fabric) and from enterprise application vendors embedding analytics, while being described as a niche player.' },
  { name: 'Nerdio', initials: 'NE', color: '#ef4444', signal: 'Nerdio faces concentrated competitive pressure from hyperscaler platform offerings Microsoft Azure Virtual Desktop and Windows 365 and incumbent players like Citrix and VMware.' },
  { name: 'Enterprise', initials: 'EN', color: '#f59e0b', signal: 'Enterprise faces intense competitive pressure in core airport and neighborhood rental markets from direct rivals Avis Budget Group and Hertz Global Holdings.' },
  { name: 'Glacier Truck', initials: 'GT', color: '#16a34a', signal: 'Daimler Truck is under intensified competitive pressure: 2025 group deliveries fell 8% to 422,510 vehicles and North American sales dropped about 26%.' },
];

const suggestionChips = [
  'Losing Ground To Key Competitors',
  'Shifting focus to SMB',
  'Global market presence expansion',
  'Expanding customer base',
];

const loadingMessages = [
  'Searching across 50+ data sources...',
  'Analyzing company signals...',
  'Cross-referencing news articles...',
  'Extracting competitive insights...',
  'Validating findings...',
  'Generating preview results...',
];

// Generate a refined prompt from a template name
function getRefinedPrompt(template: string): string {
  return `What competitive challenges is the account facing in its core markets or industries, including signs of market share decline, competitive pressure, and business impact?\n\nIdentify concrete signs of market share decline, competitive pressure, and resulting business impact, cite supporting evidence and quantify where possible. Explicitly note any gaps or uncertainty due to missing data.`;
}

interface SignalsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCount?: number;
  credits?: number;
  initialTemplate?: string;
}

type Tab = 'create' | 'active';
type Step = 'create' | 'enrich';

function LoadingProgress() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgInt = setInterval(() => setCurrentMessage((p) => (p + 1) % loadingMessages.length), 1500);
    const progInt = setInterval(() => setProgress((p) => Math.min(p + 1, 95)), 100);
    return () => { clearInterval(msgInt); clearInterval(progInt); };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="relative w-12 h-12 mb-3">
        <div className="absolute inset-0 border-4 border-blue-100 rounded-full" />
        <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
        </div>
      </div>
      <p className="text-xs font-medium text-gray-600 mb-2">{loadingMessages[currentMessage]}</p>
      <div className="w-36 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>
      <p className="text-xs text-gray-400 mt-1.5">{progress}% complete</p>
    </div>
  );
}

// Preview panel (reused in both create and enrich steps)
function PreviewPanel({
  isLoading,
  data,
  onRefresh,
  onClose,
}: {
  isLoading: boolean;
  data: typeof previewResults | null;
  onRefresh: () => void;
  onClose: () => void;
}) {
  return (
    <div className="w-[240px] border-r border-gray-100 flex flex-col bg-gray-50/50 flex-shrink-0">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-1.5">
          <FileText size={13} className="text-gray-500" />
          <span className="text-xs font-medium text-gray-700">Preview</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={onRefresh} className="p-1 hover:bg-gray-100 rounded transition-colors" disabled={isLoading}>
            <RefreshCw size={12} className={`text-gray-400 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded transition-colors">
            <X size={12} className="text-gray-400" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <LoadingProgress />
        ) : data ? (
          <div>
            <div className="flex text-xs font-medium text-gray-400 py-2 px-3 border-b border-gray-100">
              <span className="w-16">Name</span>
              <span className="flex-1">Signal</span>
            </div>
            {data.map((item, idx) => (
              <div key={idx} className="flex gap-2 py-3 px-3 border-b border-gray-50 hover:bg-white transition-colors">
                <div className="w-16 flex-shrink-0">
                  <div className="flex items-center gap-1">
                    <div className="w-5 h-5 rounded flex items-center justify-center text-white text-[8px] font-bold" style={{ backgroundColor: item.color }}>
                      {item.initials}
                    </div>
                    <span className="text-xs font-medium text-gray-700 truncate">{item.name}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">{item.signal}</p>
                  <button className="text-xs text-blue-500 mt-1 hover:underline">read more</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-12 text-center px-4">
            <FileText size={24} className="text-gray-200 mb-2" />
            <p className="text-xs text-gray-400">Enter a query and click Preview to see results</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SignalsPanel({
  isOpen,
  onClose,
  selectedCount = 2800,
  credits = 2800,
  initialTemplate,
}: SignalsPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>('create');
  const [currentStep, setCurrentStep] = useState<Step>('create');

  const [researchQuery, setResearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Slash menu
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashSubmenu, setSlashSubmenu] = useState<'location' | 'timeRange' | 'format' | null>(null);

  // Refined prompt overlay
  const [refinedPromptTemplate, setRefinedPromptTemplate] = useState<string | null>(null);

  // Suggestions collapsed state
  const [suggestionsExpanded, setSuggestionsExpanded] = useState(true);

  // Template modal
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('market');
  const [templateSearch, setTemplateSearch] = useState('');

  // Options
  const [selectedModel, setSelectedModel] = useState(aiModels[0]);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Global');
  const [selectedTimeRange, setSelectedTimeRange] = useState('Past 6 Months');
  const [selectedFormat, setSelectedFormat] = useState('Paragraph');
  const [webSearchEnabled, setWebSearchEnabled] = useState(true);

  // Preview
  const [showPreview, setShowPreview] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [previewData, setPreviewData] = useState<typeof previewResults | null>(null);

  // Voice
  const [isRecording, setIsRecording] = useState(false);

  // Enrich settings
  const [columnName, setColumnName] = useState('Competitive Challenges');
  const [enrichRows, setEnrichRows] = useState(1);
  const [enrichAllFuture, setEnrichAllFuture] = useState(true);

  // Active signals
  const [activeSignals, setActiveSignals] = useState(initialActiveSignals);

  const runningCount = activeSignals.filter((s) => s.status === 'running').length;
  const canProceedToEnrich = researchQuery.trim().length > 0 || selectedTemplate !== null;

  const filteredTemplates = templateSearch
    ? Object.values(templatesByCategory).flat().filter((t) => t.toLowerCase().includes(templateSearch.toLowerCase()))
    : templatesByCategory[selectedCategory] || [];

  // Pre-populate from initialTemplate
  useEffect(() => {
    if (isOpen && initialTemplate) {
      setSelectedTemplate(initialTemplate);
      setResearchQuery(`What are the ${initialTemplate.toLowerCase()} for {TARGET}?`);
      setColumnName(initialTemplate);
      setActiveTab('create');
      setCurrentStep('create');
      setPreviewData(null);
      setShowPreview(false);
    }
  }, [isOpen, initialTemplate]);

  const triggerPreview = () => {
    setShowPreview(true);
    setIsPreviewLoading(true);
    setPreviewData(null);
    setTimeout(() => { setPreviewData(previewResults); setIsPreviewLoading(false); }, 6000);
  };

  const refreshPreview = () => {
    setIsPreviewLoading(true);
    setPreviewData(null);
    setTimeout(() => { setPreviewData(previewResults); setIsPreviewLoading(false); }, 4000);
  };

  const handleSelectTemplate = (template: string) => {
    setSelectedTemplate(template);
    setResearchQuery(`What are the ${template.toLowerCase()} for {TARGET}?`);
    setColumnName(template);
    setPreviewData(null);
    setShowPreview(false);
    setShowTemplateModal(false);
    setShowSlashMenu(false);
    setRefinedPromptTemplate(null);
  };

  // Clicking a chip shows the refined prompt overlay first
  const handleChipClick = (chip: string) => {
    setRefinedPromptTemplate(chip);
  };

  const handleReplacePrompt = () => {
    if (refinedPromptTemplate) {
      handleSelectTemplate(refinedPromptTemplate);
    }
    setRefinedPromptTemplate(null);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setResearchQuery(val);
    if (val.endsWith('/')) {
      setShowSlashMenu(true);
      setSlashSubmenu(null);
    } else if (!val.includes('/') || val.slice(-1) === ' ') {
      setShowSlashMenu(false);
      setSlashSubmenu(null);
    }
  };

  const handleSlashOption = (option: string) => {
    if (option === 'templates') {
      setShowTemplateModal(true);
      setShowSlashMenu(false);
      setResearchQuery(researchQuery.replace(/\/$/, ''));
    } else if (option === 'location' || option === 'timeRange' || option === 'format') {
      setSlashSubmenu(option);
    } else if (option === 'webSearch') {
      setWebSearchEnabled(!webSearchEnabled);
      setShowSlashMenu(false);
      setResearchQuery(researchQuery.replace(/\/$/, ''));
    }
  };

  const handleSubMenuSelect = (value: string) => {
    if (slashSubmenu === 'location') setSelectedLocation(value);
    else if (slashSubmenu === 'timeRange') setSelectedTimeRange(value);
    else if (slashSubmenu === 'format') setSelectedFormat(value);
    setShowSlashMenu(false);
    setSlashSubmenu(null);
    setResearchQuery(researchQuery.replace(/\/$/, ''));
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setResearchQuery('What competitive challenges is the company facing in their core markets?');
        setIsRecording(false);
      }, 3000);
    }
  };

  const handleProceed = () => {
    const newSignal = {
      id: activeSignals.length + 1,
      name: columnName,
      status: 'running',
      progress: 0,
      enrichedRows: 0,
      totalRows: enrichRows,
      lastRun: '09 Jan, 2026',
    };
    setActiveSignals([newSignal, ...activeSignals]);
    setSelectedTemplate(null);
    setResearchQuery('');
    setPreviewData(null);
    setShowPreview(false);
    setCurrentStep('create');
    setActiveTab('active');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={onClose} />

      {/* Template Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6" onClick={() => setShowTemplateModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-[800px] h-[560px] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3 flex-1">
                <h3 className="text-base font-semibold text-gray-900">Categories</h3>
                <div className="relative flex-1 max-w-xs ml-4">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search templates..."
                    value={templateSearch}
                    onChange={(e) => setTemplateSearch(e.target.value)}
                    className="w-full pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
              <button onClick={() => setShowTemplateModal(false)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                <X size={18} className="text-gray-500" />
              </button>
            </div>
            <div className="flex flex-1 overflow-hidden">
              <div className="w-52 border-r border-gray-100 overflow-y-auto py-3">
                {templateCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCategory(cat.id); setTemplateSearch(''); }}
                    className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors ${selectedCategory === cat.id && !templateSearch ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                    {cat.name}
                  </button>
                ))}
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-2 gap-2">
                  {filteredTemplates.map((template, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectTemplate(template)}
                      className="flex items-center justify-between p-3 text-left text-sm text-gray-700 bg-gray-50 hover:bg-blue-50 hover:text-blue-700 rounded-xl border border-gray-100 hover:border-blue-200 transition-all group"
                    >
                      <span className="font-medium leading-snug">{template}</span>
                      <ExternalLink size={13} className="text-gray-300 group-hover:text-blue-400 flex-shrink-0 ml-2" />
                    </button>
                  ))}
                  {filteredTemplates.length === 0 && (
                    <div className="col-span-2 text-center py-8 text-sm text-gray-400">No templates match</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Panel */}
      <div
        className="fixed right-0 top-0 h-screen w-[600px] bg-white z-50 shadow-2xl flex flex-col"
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
        onClick={() => { setShowSlashMenu(false); setShowModelDropdown(false); }}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft size={18} className="text-gray-600" />
              </button>
              <div>
                <h2 className="text-base font-semibold text-gray-900">Signals</h2>
                <p className="text-xs text-gray-500">Stay ahead with real-time AI-powered intent research.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-100">
                <Table size={13} className="text-blue-600" />
                <span className="text-xs font-semibold text-blue-700">{credits.toLocaleString()} Selected</span>
              </div>
              <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={18} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1.5">
            <button
              onClick={() => { setActiveTab('create'); setCurrentStep('create'); }}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'create' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Create
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${activeTab === 'active' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Active
              <span className={`text-xs px-1.5 py-0.5 rounded-md font-semibold ${activeTab === 'active' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
                {runningCount}/{activeSignals.length}
              </span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">

          {/* ── CREATE TAB — Query Step ── */}
          {activeTab === 'create' && currentStep === 'create' && (
            <div className="flex flex-1 overflow-hidden">
              {/* Preview panel (left) */}
              {showPreview && (
                <PreviewPanel
                  isLoading={isPreviewLoading}
                  data={previewData}
                  onRefresh={refreshPreview}
                  onClose={() => setShowPreview(false)}
                />
              )}

              {/* Main create area */}
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto px-5 pt-5 pb-3">

                  {/* ── QUERY INPUT CONTAINER (textarea + toolbar in one box) ── */}
                  <div
                    className="border border-gray-200 rounded-xl overflow-hidden bg-white focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-400 relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Selected template badge inside box */}
                    {selectedTemplate && (
                      <div className="flex items-center gap-2 mx-3 mt-3 mb-1 px-2.5 py-1.5 bg-blue-50 rounded-lg border border-blue-100 w-fit max-w-full">
                        <Sparkles size={11} className="text-blue-600 flex-shrink-0" />
                        <span className="text-xs text-blue-700 font-medium truncate max-w-[300px]">{selectedTemplate}</span>
                        <button onClick={() => { setSelectedTemplate(null); setResearchQuery(''); }} className="text-blue-400 hover:text-blue-600 flex-shrink-0">
                          <X size={11} />
                        </button>
                      </div>
                    )}

                    {/* Textarea */}
                    <textarea
                      ref={textareaRef}
                      value={researchQuery}
                      onChange={handleQueryChange}
                      onKeyDown={(e) => { if (e.key === 'Escape') { setShowSlashMenu(false); setSlashSubmenu(null); } }}
                      placeholder="Enter your research query..."
                      className="w-full h-28 px-4 pt-3 pb-2 text-sm text-gray-800 bg-white resize-none focus:outline-none placeholder-gray-400"
                    />

                    {/* Toolbar — inside the container */}
                    <div className="flex items-center gap-1.5 px-3 py-2 border-t border-gray-100 bg-gray-50/50">
                      <button
                        onClick={(e) => { e.stopPropagation(); setShowTemplateModal(true); }}
                        className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
                        title="Browse templates"
                      >
                        <Plus size={15} />
                      </button>
                      <button className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
                        <Edit3 size={15} />
                      </button>

                      <div className="h-4 w-px bg-gray-200 mx-1" />

                      {/* Model selector */}
                      <div className="relative">
                        <button
                          onClick={(e) => { e.stopPropagation(); setShowModelDropdown(!showModelDropdown); }}
                          className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <span className="text-gray-400">Model:</span>
                          <span>{selectedModel.name}</span>
                        </button>
                        {showModelDropdown && (
                          <div className="absolute left-0 bottom-full mb-1 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden">
                            {aiModels.map((model) => (
                              <button
                                key={model.id}
                                onClick={(e) => { e.stopPropagation(); setSelectedModel(model); setShowModelDropdown(false); }}
                                className={`w-full flex items-center justify-between px-3 py-2.5 text-sm hover:bg-gray-50 ${selectedModel.id === model.id ? 'bg-blue-50' : ''}`}
                              >
                                <div className="flex items-center gap-2">
                                  {selectedModel.id === model.id ? <Check size={12} className="text-blue-600" /> : <div className="w-3" />}
                                  <span className="text-gray-700 font-medium">{model.name}</span>
                                </div>
                                <span className="text-xs text-gray-400">{model.credits} cr</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Rows stepper */}
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden ml-1 bg-white">
                        <button onClick={() => setEnrichRows(Math.max(1, enrichRows - 1))} className="px-1.5 py-1 text-gray-400 hover:bg-gray-100 text-xs leading-none">−</button>
                        <span className="px-2 py-1 text-xs font-medium text-gray-700 border-x border-gray-200 min-w-[26px] text-center">{enrichRows}</span>
                        <button onClick={() => setEnrichRows(enrichRows + 1)} className="px-1.5 py-1 text-gray-400 hover:bg-gray-100 text-xs leading-none">+</button>
                      </div>

                      {/* Voice — right side */}
                      <button
                        onClick={handleVoiceInput}
                        className={`p-1.5 rounded-lg ml-auto transition-colors ${isRecording ? 'bg-red-100 text-red-600 animate-pulse' : 'text-gray-400 hover:bg-gray-200 hover:text-gray-600'}`}
                      >
                        <Mic size={15} />
                      </button>
                    </div>

                    {/* Slash menu — floats above toolbar */}
                    {showSlashMenu && (
                      <div
                        className="absolute left-3 bottom-14 w-60 bg-white border border-gray-200 rounded-xl shadow-xl z-30 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {!slashSubmenu ? (
                          <>
                            <button onClick={() => handleSlashOption('templates')} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                              <FileText size={14} className="text-gray-400" /> Research Templates
                            </button>
                            <button onClick={() => handleSlashOption('location')} className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                              <div className="flex items-center gap-3"><Globe size={14} className="text-gray-400" /> Location</div>
                              <div className="flex items-center gap-1.5"><span className="text-xs text-gray-400">{selectedLocation}</span><ChevronRight size={13} className="text-gray-300" /></div>
                            </button>
                            <button onClick={() => handleSlashOption('timeRange')} className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                              <div className="flex items-center gap-3"><Clock size={14} className="text-gray-400" /> Time Range</div>
                              <div className="flex items-center gap-1.5"><span className="text-xs text-gray-400">{selectedTimeRange}</span><ChevronRight size={13} className="text-gray-300" /></div>
                            </button>
                            <button onClick={() => handleSlashOption('format')} className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                              <div className="flex items-center gap-3"><List size={14} className="text-gray-400" /> Response Format</div>
                              <div className="flex items-center gap-1.5"><span className="text-xs text-gray-400">{selectedFormat}</span><ChevronRight size={13} className="text-gray-300" /></div>
                            </button>
                            <div className="border-t border-gray-100">
                              <button onClick={() => handleSlashOption('webSearch')} className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                                <div className="flex items-center gap-3"><Search size={14} className="text-gray-400" /> Web Search</div>
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${webSearchEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{webSearchEnabled ? 'ON' : 'OFF'}</span>
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <button onClick={() => setSlashSubmenu(null)} className="w-full flex items-center gap-2 px-4 py-2 text-xs text-gray-400 hover:bg-gray-50 border-b border-gray-100">← Back</button>
                            {(slashSubmenu === 'location' ? locationOptions : slashSubmenu === 'timeRange' ? timeRangeOptions : responseFormatOptions).map((opt) => (
                              <button key={opt} onClick={() => handleSubMenuSelect(opt)} className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                                <span>{opt}</span>
                                {((slashSubmenu === 'location' && selectedLocation === opt) || (slashSubmenu === 'timeRange' && selectedTimeRange === opt) || (slashSubmenu === 'format' && selectedFormat === opt)) && <Check size={13} className="text-blue-600" />}
                              </button>
                            ))}
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* ── REFINED PROMPT OVERLAY ── */}
                  {refinedPromptTemplate && (
                    <div className="mt-3 border border-gray-200 rounded-xl bg-white shadow-lg overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                        <h4 className="text-sm font-semibold text-gray-900">Refined Prompt</h4>
                        <button onClick={() => setRefinedPromptTemplate(null)} className="p-1 hover:bg-gray-100 rounded-lg">
                          <X size={14} className="text-gray-500" />
                        </button>
                      </div>
                      <div className="px-4 py-3">
                        <p className="text-sm text-gray-700 leading-relaxed mb-2">
                          {getRefinedPrompt(refinedPromptTemplate)}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {['Key Competitors', 'AI News Insights'].map((tag) => (
                            <span key={tag} className="px-2 py-0.5 text-xs bg-blue-50 text-blue-700 border border-blue-100 rounded-md font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="px-4 pb-3 flex justify-end">
                        <button
                          onClick={handleReplacePrompt}
                          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Replace Prompt
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── SUGGESTIONS ── */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-700">Suggestions</span>
                        <button
                          onClick={() => {
                            const newChips = [...suggestionChips].sort(() => Math.random() - 0.5);
                            // just a visual refresh
                          }}
                          className="p-0.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600"
                        >
                          <RefreshCw size={11} />
                        </button>
                      </div>
                      <button onClick={() => setSuggestionsExpanded(!suggestionsExpanded)} className="p-0.5 hover:bg-gray-100 rounded text-gray-400">
                        <ChevronDown size={14} className={`transition-transform ${suggestionsExpanded ? '' : '-rotate-90'}`} />
                      </button>
                    </div>

                    {suggestionsExpanded && (
                      <div className="flex items-center gap-2 flex-wrap">
                        {suggestionChips.slice(0, 2).map((chip) => (
                          <button
                            key={chip}
                            onClick={() => handleChipClick(chip)}
                            className={`px-3 py-1.5 text-xs border rounded-full transition-all ${
                              refinedPromptTemplate === chip
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : 'text-gray-600 bg-white hover:bg-blue-50 hover:text-blue-700 border-gray-200 hover:border-blue-200'
                            }`}
                          >
                            {chip}
                          </button>
                        ))}
                        <button
                          onClick={() => setShowTemplateModal(true)}
                          className="text-xs text-blue-500 hover:underline ml-auto"
                        >
                          View All
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between bg-white">
                  <button
                    onClick={triggerPreview}
                    disabled={!canProceedToEnrich}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <FileText size={14} /> Preview
                  </button>
                  <button
                    onClick={() => { setCurrentStep('enrich'); if (!showPreview) { setShowPreview(true); setIsPreviewLoading(true); setPreviewData(null); setTimeout(() => { setPreviewData(previewResults); setIsPreviewLoading(false); }, 6000); } }}
                    disabled={!canProceedToEnrich}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    Next: Enrich Settings <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── CREATE TAB — Enrich Settings Step (split: preview left + settings right) ── */}
          {activeTab === 'create' && currentStep === 'enrich' && (
            <div className="flex flex-1 overflow-hidden">
              {/* Left: Preview */}
              <PreviewPanel
                isLoading={isPreviewLoading}
                data={previewData}
                onRefresh={refreshPreview}
                onClose={() => {}}
              />

              {/* Right: Signal Settings */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Settings header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setCurrentStep('create')} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                      <ArrowLeft size={14} className="text-gray-500" />
                    </button>
                    <span className="text-sm font-semibold text-gray-900">Signal Settings</span>
                  </div>
                  <ChevronDown size={14} className="text-gray-400" />
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                  {/* Query textarea */}
                  <div>
                    <textarea
                      value={researchQuery}
                      onChange={(e) => setResearchQuery(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2.5 text-xs text-gray-700 bg-gray-50 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 leading-relaxed"
                    />
                  </div>

                  {/* Column Name */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Column Name *</label>
                    <input
                      type="text"
                      value={columnName}
                      onChange={(e) => setColumnName(e.target.value)}
                      className="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                    />
                  </div>

                  {/* Selected Model settings pills */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">Selected Model</label>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { label: selectedModel.name, icon: Sparkles },
                        { label: selectedLocation, icon: Globe },
                        { label: selectedTimeRange, icon: Clock },
                        { label: selectedFormat, icon: FileText },
                        { label: 'Web Search', icon: Search },
                      ].map(({ label, icon: Icon }) => (
                        <div key={label} className="flex items-center gap-1 px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 font-medium">
                          <Icon size={10} className="text-gray-400" /> {label}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enrichment Scope */}
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <label className="block text-xs font-medium text-gray-700 mb-3">Enrichment Scope</label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600">Enrich for the first</span>
                      <input
                        type="number"
                        value={enrichRows}
                        onChange={(e) => setEnrichRows(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-16 px-2 py-1.5 text-xs text-center border border-gray-200 rounded-lg bg-white focus:outline-none"
                        min={1}
                      />
                      <span className="text-xs text-gray-600">rows:</span>
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg border border-blue-100 ml-auto">
                        {selectedModel.credits} credits/row
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                      <span className="text-xs text-gray-600">Enrich for all future rows</span>
                      <button onClick={() => setEnrichAllFuture(!enrichAllFuture)} className={`relative w-9 h-5 rounded-full transition-colors ${enrichAllFuture ? 'bg-green-500' : 'bg-gray-300'}`}>
                        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${enrichAllFuture ? 'translate-x-4' : 'translate-x-0.5'}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Proceed footer */}
                <div className="px-4 py-3 border-t border-gray-100 flex justify-end">
                  <button onClick={handleProceed} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                    <Zap size={13} /> Proceed
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── ACTIVE TAB ── */}
          {activeTab === 'active' && (
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="space-y-3">
                {activeSignals.map((signal, idx) => (
                  <div key={signal.id} className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-gray-300 w-5 text-center">{idx + 1}</span>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900">{signal.name}</h4>
                          <span className="inline-block mt-0.5 px-2 py-0.5 text-xs text-blue-700 bg-blue-50 border border-blue-100 rounded-md font-medium">Account Field</span>
                        </div>
                      </div>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg"><Pencil size={13} className="text-gray-400" /></button>
                    </div>
                    {signal.status !== 'completed' && (
                      <div className="mb-2.5">
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${signal.progress}%` }} />
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-xs">
                      {signal.status === 'completed' ? (
                        <div className="flex items-center gap-1.5 text-green-600">
                          <Check size={13} />
                          <span className="font-medium">
                            Enriched {signal.enrichedRows.toLocaleString()} of {signal.totalRows.toLocaleString()} accounts
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <Loader2 size={12} className="animate-spin text-blue-500" />
                          <span>
                            Enriched{' '}
                            <span className="font-semibold text-gray-700">
                              {signal.enrichedRows.toLocaleString()} of {signal.totalRows.toLocaleString()}
                            </span>{' '}
                            accounts
                          </span>
                          <ExternalLink size={11} className="text-gray-300 ml-0.5" />
                        </div>
                      )}
                      <span className="text-gray-400">Last run: {signal.lastRun}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
