'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Filter,
  X,
  ChevronDown,
  ChevronRight,
  Linkedin,
  Globe,
  Sparkles,
  Building2,
  MapPin,
  Users,
  Cpu,
  DollarSign,
  Briefcase,
  Zap,
  Info,
  ArrowUpRight,
} from 'lucide-react';
import SignalsPanel from '@/components/SignalsPanel';
import EnrichmentPanel from '@/components/EnrichmentPanel';

type TrendDirection = 'cooling' | 'heating' | 'stable';
type EventCategory = 'Signal' | 'Intent' | 'Website';

interface TrendEvent {
  id: string;
  title: string;
  date: string;
  delta: number;
  category: EventCategory;
  explainability: string;
}

interface TrendHistoryPoint {
  date: string;
  score: number;
}

interface Account {
  id: number;
  name: string;
  domain: string;
  icpFitment: number;
  icpChange: number;
  industry: string;
  employees: string;
  logo: string;
  trendScore: number;
  trendDirection: TrendDirection;
  trendLabel: string;
  lastUpdated: string;
  keyInsights: string[];
  timelineEvents: TrendEvent[];
  websiteVisits: TrendEvent[];
  history: TrendHistoryPoint[];
}

const filterCategories = [
  { name: 'List', icon: <Filter size={16} /> },
  { name: 'Companies', icon: <Building2 size={16} /> },
  { name: 'Location', icon: <MapPin size={16} /> },
  { name: 'Company Region', icon: <Globe size={16} /> },
  { name: 'Industry', icon: <Briefcase size={16} /> },
  { name: 'Employee Count', icon: <Users size={16} /> },
  { name: 'Technology', icon: <Cpu size={16} /> },
  { name: 'Revenue', icon: <DollarSign size={16} /> },
  { name: 'Funding', icon: <DollarSign size={16} /> },
  { name: 'Owner', icon: <Users size={16} /> },
];

const buildHistory = (base: number): TrendHistoryPoint[] => [
  { date: '17/03', score: Math.max(5, base - 8) },
  { date: '18/03', score: Math.max(6, base - 6) },
  { date: '19/03', score: Math.max(7, base - 4) },
  { date: '20/03', score: Math.max(8, base - 2) },
  { date: '21/03', score: Math.max(9, base - 1) },
  { date: '22/03', score: base },
  { date: '23/03', score: Math.min(100, base + 2) },
];

const buildEvents = (prefix: string): TrendEvent[] => [
  {
    id: `${prefix}-hiring-status`,
    title: 'Hiring Status',
    date: '12 Mar, 2026',
    delta: 5,
    category: 'Signal',
    explainability:
      `${prefix} posted multiple new openings in GTM and product teams this week, which increased Trend Score based on active growth intent signals.`,
  },
  {
    id: `${prefix}-ai-adoption`,
    title: 'AI Adoption',
    date: '12 Mar, 2026',
    delta: 5,
    category: 'Intent',
    explainability:
      `${prefix} content and release activity indicates active AI implementation planning tied to near-term buying initiatives.`,
  },
  {
    id: `${prefix}-competitor-analysis`,
    title: 'Competitor Analysis',
    date: '11 Mar, 2026',
    delta: 4,
    category: 'Signal',
    explainability:
      `Recent competitor comparisons mention ${prefix}, increasing signal confidence around active evaluation in this segment.`,
  },
  {
    id: `${prefix}-customer-success`,
    title: 'Customer Success Stories',
    date: '10 Mar, 2026',
    delta: 3,
    category: 'Signal',
    explainability:
      `${prefix} published new customer wins and partner-led references, which contributed positively to trend momentum.`,
  },
];

const buildWebsiteEvents = (prefix: string): TrendEvent[] => [
  {
    id: `${prefix}-pricing-visits`,
    title: 'Pricing page revisits',
    date: '18 Mar, 2026',
    delta: 3,
    category: 'Website',
    explainability: `${prefix} revisited pricing and package pages multiple times within 48 hours.`,
  },
  {
    id: `${prefix}-case-study-views`,
    title: 'Case-study traffic spike',
    date: '16 Mar, 2026',
    delta: 2,
    category: 'Website',
    explainability: `${prefix} viewed case-study pages related to your primary use-case segment.`,
  },
];

const mockAccounts: Account[] = [
  {
    id: 1,
    name: 'Syniverse',
    domain: 'syniverse.com',
    icpFitment: 68,
    icpChange: 8,
    industry: 'Information Technology',
    employees: '1,001 - 5,000',
    logo: 'SY',
    trendScore: 26,
    trendDirection: 'cooling',
    trendLabel: 'Moderate Trend',
    lastUpdated: '17 Mar, 2026',
    keyInsights: ['Score remained stable with no significant changes.'],
    timelineEvents: buildEvents('Syniverse'),
    websiteVisits: buildWebsiteEvents('Syniverse'),
    history: buildHistory(26),
  },
  {
    id: 2,
    name: 'netshoes',
    domain: 'netshoes.com',
    icpFitment: 61,
    icpChange: 5,
    industry: 'Computer Software',
    employees: '1,001 - 5,000',
    logo: 'NS',
    trendScore: 18,
    trendDirection: 'stable',
    trendLabel: 'Low Trend',
    lastUpdated: '16 Mar, 2026',
    keyInsights: ['Signal strength is low and needs additional trigger events.'],
    timelineEvents: buildEvents('netshoes'),
    websiteVisits: buildWebsiteEvents('netshoes'),
    history: buildHistory(18),
  },
  {
    id: 3,
    name: 'Sailpoint, Inc.',
    domain: 'sailpoint.com',
    icpFitment: 63,
    icpChange: 6,
    industry: 'Computer & Network Security',
    employees: '1,001 - 5,000',
    logo: 'SP',
    trendScore: 31,
    trendDirection: 'heating',
    trendLabel: 'Moderate Trend',
    lastUpdated: '15 Mar, 2026',
    keyInsights: ['Buying intent signals are increasing across two monitored topics.'],
    timelineEvents: buildEvents('Sailpoint'),
    websiteVisits: buildWebsiteEvents('Sailpoint'),
    history: buildHistory(31),
  },
  {
    id: 4,
    name: 'Acv Auctions Inc.',
    domain: 'acvauctions.com',
    icpFitment: 66,
    icpChange: 9,
    industry: 'Internet Marketplace',
    employees: '1,001 - 5,000',
    logo: 'AC',
    trendScore: 44,
    trendDirection: 'heating',
    trendLabel: 'High Trend',
    lastUpdated: '14 Mar, 2026',
    keyInsights: ['Recent account activity aligns strongly with your active outreach themes.'],
    timelineEvents: buildEvents('ACV'),
    websiteVisits: buildWebsiteEvents('ACV'),
    history: buildHistory(44),
  },
  {
    id: 5,
    name: 'Uniphore',
    domain: 'uniphore.com',
    icpFitment: 64,
    icpChange: 7,
    industry: 'Information Technology',
    employees: '1,001 - 5,000',
    logo: 'UN',
    trendScore: 53,
    trendDirection: 'heating',
    trendLabel: 'High Trend',
    lastUpdated: '14 Mar, 2026',
    keyInsights: ['Signals indicate active evaluation windows in the current quarter.'],
    timelineEvents: buildEvents('Uniphore'),
    websiteVisits: buildWebsiteEvents('Uniphore'),
    history: buildHistory(53),
  },
  {
    id: 6,
    name: 'Aptean',
    domain: 'aptean.com',
    icpFitment: 67,
    icpChange: 10,
    industry: 'Computer Software',
    employees: '1,001 - 5,000',
    logo: 'AP',
    trendScore: 25,
    trendDirection: 'heating',
    trendLabel: 'Low Trend',
    lastUpdated: '12 Mar, 2026',
    keyInsights: [
      'The team is actively researching AI with direct signals for adoption and competitor analysis.',
      'Schedule a demo call focused on practical AI adoption use-cases and success stories.',
    ],
    timelineEvents: buildEvents('Aptean'),
    websiteVisits: buildWebsiteEvents('Aptean'),
    history: buildHistory(25),
  },
  {
    id: 7,
    name: 'Avalara, Inc.',
    domain: 'avalara.com',
    icpFitment: 67,
    icpChange: 8,
    industry: 'Computer Software',
    employees: '1,001 - 5,000',
    logo: 'AV',
    trendScore: 23,
    trendDirection: 'cooling',
    trendLabel: 'Low Trend',
    lastUpdated: '13 Mar, 2026',
    keyInsights: ['Momentum cooled after a short spike in competitor-related signals.'],
    timelineEvents: buildEvents('Avalara'),
    websiteVisits: buildWebsiteEvents('Avalara'),
    history: buildHistory(23),
  },
  {
    id: 8,
    name: 'Ciklum',
    domain: 'ciklum.com',
    icpFitment: 33,
    icpChange: 0,
    industry: 'Information Technology',
    employees: '1,001 - 5,000',
    logo: 'CK',
    trendScore: 28,
    trendDirection: 'heating',
    trendLabel: 'Moderate Trend',
    lastUpdated: '13 Mar, 2026',
    keyInsights: ['Moderate trend with gradual positive movement from new event signals.'],
    timelineEvents: buildEvents('Ciklum'),
    websiteVisits: buildWebsiteEvents('Ciklum'),
    history: buildHistory(28),
  },
  {
    id: 9,
    name: 'Sovos',
    domain: 'sovos.com',
    icpFitment: 65,
    icpChange: 4,
    industry: 'Computer Software',
    employees: '1,001 - 5,000',
    logo: 'SV',
    trendScore: 30,
    trendDirection: 'heating',
    trendLabel: 'Moderate Trend',
    lastUpdated: '12 Mar, 2026',
    keyInsights: ['Signals indicate consistent trend momentum from multiple functional teams.'],
    timelineEvents: buildEvents('Sovos'),
    websiteVisits: buildWebsiteEvents('Sovos'),
    history: buildHistory(30),
  },
  {
    id: 10,
    name: 'Deltek',
    domain: 'deltek.com',
    icpFitment: 21,
    icpChange: 0,
    industry: 'Computer Software',
    employees: '1,001 - 5,000',
    logo: 'DL',
    trendScore: 21,
    trendDirection: 'stable',
    trendLabel: 'Low Trend',
    lastUpdated: '12 Mar, 2026',
    keyInsights: ['No major trigger events detected in the most recent period.'],
    timelineEvents: buildEvents('Deltek'),
    websiteVisits: buildWebsiteEvents('Deltek'),
    history: buildHistory(21),
  },
];

const directionStyles: Record<TrendDirection, { label: string; color: string }> = {
  cooling: { label: 'Cooling', color: '#2563eb' },
  heating: { label: 'Heating', color: '#f97316' },
  stable: { label: 'Stable', color: '#6b7280' },
};

const trendNarrative: Record<TrendDirection, string> = {
  cooling: 'cooling down',
  heating: 'heating up',
  stable: 'remaining steady',
};

const keyInsightHighlightTerms = [
  '5 AI-Detected Behaviors',
  'AI Adoption',
  'Competitor Analysis',
  'Customer Success Stories',
  'Notable Customers and Partners',
];

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const highlightInsightText = (text: string, keyPrefix: string) => {
  if (!text) return text;

  const regex = new RegExp(`(${keyInsightHighlightTerms.map(escapeRegex).join('|')})`, 'g');
  const parts = text.split(regex);

  return parts.map((part, idx) => {
    if (!keyInsightHighlightTerms.includes(part)) {
      return <span key={`${keyPrefix}-${idx}`}>{part}</span>;
    }

    return (
      <span
        key={`${keyPrefix}-${idx}`}
        className="font-semibold px-0.5 rounded-sm"
        style={{ backgroundColor: '#eaf1ff', color: '#1f2937' }}
      >
        {part}
      </span>
    );
  });
};

export default function AccountsPage() {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSignalsPanel, setShowSignalsPanel] = useState(false);
  const [showEnrichmentPanel, setShowEnrichmentPanel] = useState(false);
  const [signalInitialTemplate, setSignalInitialTemplate] = useState<string | undefined>(undefined);
  const [openTrendPopoverFor, setOpenTrendPopoverFor] = useState<number | null>(null);
  const [selectedTrendAccount, setSelectedTrendAccount] = useState<Account | null>(null);
  const [trendDetailsTab, setTrendDetailsTab] = useState<'timeline' | 'website'>('timeline');
  const [collapsedEventGroups, setCollapsedEventGroups] = useState<Record<string, boolean>>({});
  const [expandedEventRows, setExpandedEventRows] = useState<Set<string>>(new Set());

  const filteredAccounts = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();
    if (!normalized) return mockAccounts;
    return mockAccounts.filter((account) => account.name.toLowerCase().includes(normalized));
  }, [searchQuery]);

  const handleEnrichmentSelect = (template: string) => {
    setShowEnrichmentPanel(false);
    setSignalInitialTemplate(template);
    setShowSignalsPanel(true);
  };

  const openTrendDetails = (account: Account) => {
    setOpenTrendPopoverFor(null);
    setTrendDetailsTab('timeline');
    setCollapsedEventGroups({});
    setExpandedEventRows(new Set());
    setSelectedTrendAccount(account);
  };

  const closeTrendDetails = () => {
    setSelectedTrendAccount(null);
  };

  const trendDetailsRows =
    trendDetailsTab === 'timeline'
      ? selectedTrendAccount?.timelineEvents ?? []
      : selectedTrendAccount?.websiteVisits ?? [];

  const groupedTrendRows = useMemo(() => {
    const groups: Record<EventCategory, TrendEvent[]> = {
      Signal: [],
      Intent: [],
      Website: [],
    };
    trendDetailsRows.forEach((event) => {
      groups[event.category].push(event);
    });
    return groups;
  }, [trendDetailsRows]);

  const toggleEventGroup = (groupName: EventCategory) => {
    setCollapsedEventGroups((prev) => ({ ...prev, [groupName]: !prev[groupName] }));
  };

  const toggleEventRow = (eventId: string) => {
    setExpandedEventRows((prev) => {
      const next = new Set(prev);
      if (next.has(eventId)) {
        next.delete(eventId);
      } else {
        next.add(eventId);
      }
      return next;
    });
  };

  const chartPolyline = useMemo(() => {
    if (!selectedTrendAccount || selectedTrendAccount.history.length === 0) {
      return '';
    }

    return selectedTrendAccount.history
      .map((point, idx) => {
        const x = (idx / Math.max(selectedTrendAccount.history.length - 1, 1)) * 100;
        const y = 100 - point.score;
        return `${x},${y}`;
      })
      .join(' ');
  }, [selectedTrendAccount]);

  return (
    <div className="flex h-[calc(100vh-120px)]">
      {/* Filters Sidebar */}
      {showFilters && (
        <div className="w-80 bg-white border-r flex flex-col" style={{ borderColor: '#e7e7e6' }}>
          {/* Filter Tabs */}
          <div className="flex border-b" style={{ borderColor: '#e7e7e6' }}>
            <button className="flex-1 px-4 py-3 text-sm font-medium border-b-2" style={{ borderColor: '#1c64f2', color: '#1c64f2' }}>
              Filters
            </button>
            <button className="flex-1 px-4 py-3 text-sm font-medium" style={{ color: '#706f69' }}>
              Saved
            </button>
            <button onClick={() => setShowFilters(false)} className="px-3 py-3" style={{ color: '#706f69' }}>
              <X size={16} />
            </button>
          </div>

          {/* Search Filters */}
          <div className="p-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#706f69' }} />
              <input
                type="text"
                placeholder="Search filters"
                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border"
                style={{ borderColor: '#e7e7e6', backgroundColor: '#f9fafb' }}
              />
            </div>
          </div>

          {/* Filter Categories */}
          <div className="flex-1 overflow-y-auto px-2">
            <p className="px-2 py-2 text-xs font-medium uppercase tracking-wider" style={{ color: '#706f69' }}>
              Account
            </p>
            {filterCategories.map((filter, idx) => (
              <button
                key={idx}
                className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg hover:bg-gray-50 transition-colors"
                style={{ color: '#191918' }}
              >
                <span className="flex items-center gap-2">
                  {filter.icon}
                  {filter.name}
                </span>
                <ChevronRight size={16} style={{ color: '#706f69' }} />
              </button>
            ))}
          </div>

          {/* Filter Actions */}
          <div className="p-4 border-t flex items-center gap-2" style={{ borderColor: '#e7e7e6' }}>
            <button className="px-4 py-2 text-sm" style={{ color: '#706f69' }}>
              Clear
            </button>
            <button className="px-4 py-2 text-sm" style={{ color: '#706f69' }}>
              Save Search
            </button>
            <button
              className="flex-1 px-4 py-2 text-sm font-medium text-white rounded-lg"
              style={{ backgroundColor: '#1c64f2' }}
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b" style={{ borderColor: '#e7e7e6' }}>
          <div className="flex items-center gap-3">
            {!showFilters && (
              <button
                onClick={() => setShowFilters(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border"
                style={{ borderColor: '#e7e7e6' }}
              >
                <Filter size={16} />
                Show Filters
              </button>
            )}
            <button
              className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg"
              style={{ backgroundColor: '#f3f5f5', color: '#191918' }}
            >
              <Filter size={16} />
              Hide Filters
              <span className="px-1.5 py-0.5 text-xs rounded-full text-white" style={{ backgroundColor: '#1c64f2' }}>1</span>
            </button>

            {/* Search */}
            <div className="relative w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#706f69' }} />
              <input
                type="text"
                placeholder="Search company name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-sm rounded-lg border"
                style={{ borderColor: '#e7e7e6' }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push('/database-search/accounts')}
              className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-lg border transition-colors hover:bg-gray-50"
              style={{ borderColor: '#e7e7e6', color: '#191918' }}
            >
              <Search size={16} />
              DB Search
            </button>
            <button
              onClick={() => setShowSignalsPanel(true)}
              className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-lg transition-colors hover:bg-gray-100"
              style={{ backgroundColor: '#f5f5f7', color: '#1d1d1f' }}
            >
              <Zap size={16} />
              Signals
            </button>
            <button
              onClick={() => setShowEnrichmentPanel(true)}
              className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-white rounded-lg"
              style={{ backgroundColor: '#1c64f2' }}
            >
              <Sparkles size={16} />
              Enrichment
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto" onClick={() => setOpenTrendPopoverFor(null)}>
          <table className="w-full">
            <thead className="sticky top-0 bg-white" style={{ borderBottom: '1px solid #e7e7e6' }}>
              <tr>
                <th className="w-12 px-4 py-3">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>
                  <button className="flex items-center gap-1">
                    Account Name
                    <ChevronDown size={14} />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>Assign to</th>
                <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>
                  <span className="flex items-center gap-1">
                    <Sparkles size={14} style={{ color: '#1c64f2' }} />
                    Fitment
                  </span>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>
                  <span className="flex items-center gap-1">
                    Trend Score
                    <Info size={14} />
                  </span>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>Key Competitors</th>
                <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>AI News Insights</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((account) => {
                const previewInsights = [
                  `The account triggered 5 AI-Detected Behaviors, led by AI Adoption, Competitor Analysis, and Customer Success Stories, indicating active AI evaluation and ${trendNarrative[account.trendDirection]}.`,
                  account.keyInsights[0] ?? 'There is modest hiring activity across strategic teams.',
                ];

                return (
                  <tr
                    key={account.id}
                    className="border-b hover:bg-gray-50 transition-colors cursor-pointer"
                    style={{ borderColor: '#e7e7e6' }}
                    onClick={() => router.push(`/account-details/${account.domain}/overview`)}
                  >
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded flex items-center justify-center text-xs font-medium text-white"
                        style={{ backgroundColor: '#3e545c' }}
                      >
                        {account.logo}
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: '#111928' }}>{account.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Linkedin size={14} style={{ color: '#706f69' }} />
                          <Globe size={14} style={{ color: '#706f69' }} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm" style={{ color: '#706f69' }}>-</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium" style={{ color: '#111928' }}>{account.icpFitment}</span>
                      {account.icpChange > 0 && (
                        <span className="text-xs" style={{ color: '#10b981' }}>▲ {account.icpChange}</span>
                      )}
                    </div>
                  </td>
                  <td
                    className="px-4 py-3 relative"
                    onClick={(e) => e.stopPropagation()}
                    onMouseEnter={() => setOpenTrendPopoverFor(account.id)}
                    onMouseLeave={() =>
                      setOpenTrendPopoverFor((current) => (current === account.id ? null : current))
                    }
                  >
                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenTrendPopoverFor((current) => (current === account.id ? null : account.id))
                        }
                        className="inline-flex items-center gap-2 rounded-lg border px-2 py-1 text-sm"
                        style={{ borderColor: '#e7e7e6', backgroundColor: '#ffffff' }}
                      >
                        <span className="font-medium" style={{ color: '#111928' }}>
                          {account.trendScore}
                        </span>
                        <ArrowUpRight size={14} style={{ color: directionStyles[account.trendDirection].color }} />
                      </button>

                      {openTrendPopoverFor === account.id && (
                        <div
                          className="absolute top-full left-0 mt-2 z-20 w-[360px] rounded-xl border bg-white p-3 shadow-xl"
                          style={{ borderColor: '#e7e7e6' }}
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-xl font-semibold leading-tight" style={{ color: '#111928' }}>
                              {account.trendLabel}
                            </p>
                            <span className="text-lg font-semibold" style={{ color: '#111928' }}>{account.trendScore}</span>
                          </div>
                          <p className="text-sm mt-1" style={{ color: '#706f69' }}>
                            Last updated: {account.lastUpdated}
                          </p>

                          <p className="text-sm mt-2" style={{ color: '#111928' }}>
                            Trend:{' '}
                            <span
                              className="font-semibold inline-flex items-center gap-1"
                              style={{ color: directionStyles[account.trendDirection].color }}
                            >
                              {directionStyles[account.trendDirection].label}
                              <ArrowUpRight size={13} />
                            </span>
                          </p>

                          <div className="mt-3">
                            <p className="text-sm font-semibold" style={{ color: '#111928' }}>
                              Key Insights
                            </p>
                            <div className="mt-1 space-y-1 text-sm leading-6" style={{ color: '#3f3f46' }}>
                              {previewInsights.slice(0, 2).map((insight, insightIdx) => (
                                <div key={`${account.id}-hover-insight-${insightIdx}`} className="flex items-start gap-2">
                                  <span className="mt-1 text-sm" style={{ color: '#52525b' }}>
                                    •
                                  </span>
                                  <p className={insightIdx === 1 ? 'line-clamp-1' : ''}>
                                    {highlightInsightText(insight, `${account.id}-${insightIdx}`)}
                                    {insightIdx === 1 && (
                                      <span className="ml-1 font-medium" style={{ color: '#2563eb' }}>
                                        See more
                                      </span>
                                    )}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <button
                            onClick={() => openTrendDetails(account)}
                            className="mt-3 w-full rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-gray-50"
                            style={{ borderColor: '#d1d5db', color: '#111928' }}
                          >
                            View Details
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm" style={{ color: '#1c64f2' }}>Searching...</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm" style={{ color: '#1c64f2' }}>Searching...</span>
                  </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t" style={{ borderColor: '#e7e7e6' }}>
          <div className="flex items-center gap-2 text-sm" style={{ color: '#706f69' }}>
            Showing rows per page:
            <select className="px-2 py-1 rounded border" style={{ borderColor: '#e7e7e6' }}>
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
          <div className="flex items-center gap-2 text-sm" style={{ color: '#706f69' }}>
            <span>1 - 20 of 2,784 items</span>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded hover:bg-gray-100" disabled>
                <ChevronRight size={16} className="rotate-180" style={{ color: '#d4d4d4' }} />
              </button>
              <input
                type="text"
                defaultValue="1"
                className="w-12 px-2 py-1 text-center rounded border"
                style={{ borderColor: '#e7e7e6' }}
              />
              <button className="p-1 rounded hover:bg-gray-100">
                <ChevronRight size={16} style={{ color: '#706f69' }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trend Score Details Drawer */}
      {selectedTrendAccount && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button
            type="button"
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
            onClick={closeTrendDetails}
            aria-label="Close trend details"
          />
          <div
            className="relative my-2 mr-2 h-[calc(100vh-16px)] w-[760px] max-w-[95vw] overflow-hidden rounded-xl border bg-white shadow-2xl"
            style={{ borderColor: '#e7e7e6' }}
          >
            <div className="h-full overflow-y-auto p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div
                    className="w-7 h-7 rounded flex items-center justify-center text-[11px] font-semibold text-white"
                    style={{ backgroundColor: '#3e545c' }}
                  >
                    {selectedTrendAccount.logo}
                  </div>
                  <div>
                    <p className="text-[30px] font-semibold leading-none" style={{ color: '#111928' }}>
                      {selectedTrendAccount.name}
                    </p>
                    <p className="mt-2 text-[30px] font-semibold leading-none" style={{ color: '#111928' }}>
                      {selectedTrendAccount.trendLabel}
                      <span className="ml-2 text-xl align-middle" style={{ color: '#111928' }}>
                        {selectedTrendAccount.trendScore}
                      </span>
                    </p>
                    <p className="text-sm mt-1" style={{ color: '#706f69' }}>
                      Last updated: {selectedTrendAccount.lastUpdated}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg border hover:bg-gray-50"
                    style={{ borderColor: '#e5e7eb', color: '#191918' }}
                  >
                    <Users size={15} />
                    Add Owner
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border p-2 hover:bg-gray-50"
                    style={{ borderColor: '#e5e7eb' }}
                    onClick={closeTrendDetails}
                  >
                    <X size={18} style={{ color: '#6b7280' }} />
                  </button>
                </div>
              </div>

              <div className="mt-5 border-t pt-4" style={{ borderColor: '#e7e7e6' }}>
                <p className="text-xl" style={{ color: '#111928' }}>
                  Trend:{' '}
                  <span
                    className="font-semibold inline-flex items-center gap-1"
                    style={{ color: directionStyles[selectedTrendAccount.trendDirection].color }}
                  >
                    {directionStyles[selectedTrendAccount.trendDirection].label}
                    <ArrowUpRight size={16} />
                  </span>
                </p>
                <p className="text-sm mt-2" style={{ color: '#6b7280' }}>
                  Score: <span className="font-semibold" style={{ color: '#111928' }}>{selectedTrendAccount.trendScore}</span>
                </p>
              </div>

              <div className="mt-5">
                <p className="text-xl font-semibold" style={{ color: '#111928' }}>
                  Key Insights
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {selectedTrendAccount.keyInsights.map((insight) => (
                    <li key={insight} className="text-sm" style={{ color: '#374151' }}>
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-[28px] font-semibold" style={{ color: '#111928' }}>
                    Trend Score Trend
                  </h3>
                  <select
                    className="rounded-lg border px-3 py-1.5 text-sm"
                    style={{ borderColor: '#d1d5db', color: '#374151' }}
                    defaultValue="Last 7 Days"
                  >
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Last 90 Days</option>
                  </select>
                </div>

                <div className="mt-3 rounded-lg border p-3" style={{ borderColor: '#e7e7e6' }}>
                  <div className="relative h-56">
                    <div className="absolute inset-0">
                      {[0, 25, 50, 75, 100].map((label) => (
                        <div
                          key={label}
                          className="absolute left-0 right-0 border-t"
                          style={{
                            top: `${100 - label}%`,
                            borderColor: '#eef0f3',
                          }}
                        />
                      ))}
                    </div>
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                      <polyline
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="1.8"
                        points={chartPolyline}
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>
                  <div className="mt-2 grid grid-cols-7 text-xs" style={{ color: '#6b7280' }}>
                    {selectedTrendAccount.history.map((point) => (
                      <span key={point.date} className="text-center">
                        {point.date}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="inline-flex items-center rounded-lg border p-1" style={{ borderColor: '#e5e7eb' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setTrendDetailsTab('timeline');
                      setCollapsedEventGroups({});
                      setExpandedEventRows(new Set());
                    }}
                    className="px-4 py-1.5 text-sm font-medium rounded-md"
                    style={{
                      color: trendDetailsTab === 'timeline' ? '#111928' : '#6b7280',
                      backgroundColor: trendDetailsTab === 'timeline' ? '#f3f4f6' : 'transparent',
                    }}
                  >
                    Timeline
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTrendDetailsTab('website');
                      setCollapsedEventGroups({});
                      setExpandedEventRows(new Set());
                    }}
                    className="px-4 py-1.5 text-sm font-medium rounded-md"
                    style={{
                      color: trendDetailsTab === 'website' ? '#111928' : '#6b7280',
                      backgroundColor: trendDetailsTab === 'website' ? '#f3f4f6' : 'transparent',
                    }}
                  >
                    Website Visits
                  </button>
                </div>

                <h4 className="text-xl font-semibold mt-3" style={{ color: '#111928' }}>
                  Timeline of Events
                </h4>
                <div className="mt-2 space-y-3">
                  {(Object.entries(groupedTrendRows) as [EventCategory, TrendEvent[]][])
                    .filter(([, events]) => events.length > 0)
                    .map(([groupName, events]) => {
                      const isCollapsed = collapsedEventGroups[groupName] ?? false;
                      return (
                        <div key={groupName} className="rounded-xl border" style={{ borderColor: '#e7e7e6' }}>
                          <button
                            type="button"
                            className="w-full px-3 py-2 flex items-center justify-between text-left hover:bg-gray-50 rounded-t-xl"
                            onClick={() => toggleEventGroup(groupName)}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold" style={{ color: '#111928' }}>
                                {groupName}
                              </span>
                              <span
                                className="px-2 py-0.5 rounded-full text-xs font-medium"
                                style={{ color: '#4b5563', backgroundColor: '#f3f4f6' }}
                              >
                                {events.length}
                              </span>
                            </div>
                            <ChevronDown
                              size={16}
                              style={{ color: '#6b7280', transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)' }}
                            />
                          </button>

                          {!isCollapsed && (
                            <div className="px-2 pb-2 space-y-2">
                              {events.map((event) => {
                                const isExpanded = expandedEventRows.has(event.id);
                                return (
                                  <div
                                    key={event.id}
                                    className="rounded-xl border px-3 py-2"
                                    style={{ borderColor: '#e7e7e6' }}
                                  >
                                    <div className="flex items-start justify-between gap-2">
                                      <div className="flex items-start gap-3">
                                        <div
                                          className="w-7 h-7 rounded-md flex items-center justify-center"
                                          style={{ backgroundColor: '#ecfeff' }}
                                        >
                                          <Zap size={14} style={{ color: '#0891b2' }} />
                                        </div>
                                        <div>
                                          <div className="flex items-center gap-2">
                                            <p className="text-sm font-semibold" style={{ color: '#111928' }}>
                                              {event.title}
                                            </p>
                                            <span
                                              className="px-1.5 py-0.5 rounded text-[11px] font-medium"
                                              style={{ color: '#6b7280', backgroundColor: '#f3f4f6' }}
                                            >
                                              {event.category}
                                            </span>
                                          </div>
                                          <p className="text-sm" style={{ color: '#6b7280' }}>
                                            {event.date}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span
                                          className="px-2 py-1 rounded-full text-sm font-semibold"
                                          style={{ color: '#16a34a', backgroundColor: '#dcfce7' }}
                                        >
                                          ↑ {event.delta}
                                        </span>
                                        <button
                                          type="button"
                                          onClick={() => toggleEventRow(event.id)}
                                          className="p-1 rounded hover:bg-gray-100"
                                          aria-label={isExpanded ? 'Collapse event reason' : 'Expand event reason'}
                                        >
                                          <ChevronDown
                                            size={14}
                                            style={{
                                              color: '#6b7280',
                                              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                            }}
                                          />
                                        </button>
                                      </div>
                                    </div>
                                    {isExpanded && (
                                      <div className="mt-2 rounded-lg px-3 py-2" style={{ backgroundColor: '#f9fafb' }}>
                                        <p className="text-xs font-semibold mb-1" style={{ color: '#4b5563' }}>
                                          Explainability
                                        </p>
                                        <p className="text-sm" style={{ color: '#374151' }}>
                                          {event.explainability}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Signals Panel */}
      <SignalsPanel
        isOpen={showSignalsPanel}
        onClose={() => { setShowSignalsPanel(false); setSignalInitialTemplate(undefined); }}
        selectedCount={mockAccounts.length}
        credits={2800}
        initialTemplate={signalInitialTemplate}
      />

      {/* Enrichment Panel */}
      <EnrichmentPanel
        isOpen={showEnrichmentPanel}
        onClose={() => setShowEnrichmentPanel(false)}
        onSelectSignal={handleEnrichmentSelect}
      />
    </div>
  );
}
