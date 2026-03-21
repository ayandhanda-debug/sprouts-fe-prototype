'use client';

import { useState } from 'react';
import {
  X,
  Search,
  TrendingUp,
  Users,
  Shield,
  Newspaper,
  FileText,
  Zap,
  DollarSign,
  Target,
  Lightbulb,
  BarChart3,
  Megaphone,
  Briefcase,
  Leaf,
  Building,
  Award,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';

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

// Flatten all templates for "All" view
const allTemplates = Object.entries(templatesByCategory).flatMap(([catId, templates]) =>
  templates.map((name) => ({
    name,
    catId,
    catName: templateCategories.find((c) => c.id === catId)?.name || '',
    color: templateCategories.find((c) => c.id === catId)?.color || '#6b7280',
  }))
);

interface EnrichmentPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSignal: (template: string) => void;
}

export default function EnrichmentPanel({ isOpen, onClose, onSelectSignal }: EnrichmentPanelProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  if (!isOpen) return null;

  const activeCategoryMeta = templateCategories.find((c) => c.id === activeCategory);
  const signalsForActiveCategory =
    activeCategory === 'all'
      ? allTemplates
      : (templatesByCategory[activeCategory] || []).map((name) => ({
          name,
          catId: activeCategory,
          catName: activeCategoryMeta?.name || '',
          color: activeCategoryMeta?.color || '#6b7280',
        }));

  const filteredSignals = search
    ? signalsForActiveCategory.filter(
        (t) =>
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.catName.toLowerCase().includes(search.toLowerCase())
      )
    : signalsForActiveCategory;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={onClose} />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-screen w-[700px] bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft size={18} className="text-gray-600" />
              </button>
              <div>
                <h2 className="text-base font-semibold text-gray-900">Enrichment</h2>
                <p className="text-xs text-gray-500">Select a signal to add to your accounts.</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              <X size={18} className="text-gray-500" />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search signals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-gray-50"
            />
          </div>

        </div>

        {/* Categories + signals two-column layout */}
        <div className="flex-1 overflow-hidden p-5">
          <div className="h-full rounded-xl border border-gray-100 bg-gray-50/40 flex overflow-hidden">
            <div className="w-[280px] bg-white border-r border-gray-100 p-4 overflow-y-auto">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Signal Categories</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    activeCategory === 'all'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                {templateCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      activeCategory === cat.id
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: activeCategory === cat.id ? '#fff' : cat.color }}
                    />
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {activeCategory === 'all' ? 'All Signals' : activeCategoryMeta?.name}
                  </h3>
                  {activeCategory !== 'all' && (
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: activeCategoryMeta?.color || '#6b7280' }}
                    />
                  )}
                </div>
                <p className="text-xs text-gray-400">{filteredSignals.length} signals</p>
              </div>

              {filteredSignals.length === 0 ? (
                <div className="text-center py-16 text-sm text-gray-400">No signals found</div>
              ) : (
                <div className="space-y-2">
                  {filteredSignals.map((template, idx) => (
                    <button
                      key={idx}
                      onClick={() => onSelectSignal(template.name)}
                      className="w-full group flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 transition-all text-left"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: template.color }} />
                          <span className="text-[10px] font-medium text-gray-400 truncate">{template.catName}</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-800 leading-snug">
                          {template.name}
                        </p>
                      </div>
                      <div className="ml-3 flex items-center gap-1 text-xs text-gray-400 group-hover:text-blue-500 flex-shrink-0">
                        <span>Add</span>
                        <ChevronRight size={12} />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
