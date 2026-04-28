'use client';

import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Download,
  ExternalLink,
  Eye,
  Filter,
  Globe,
  MapPin,
  Search,
  Sparkles,
  Trash2,
  Users,
  X,
  Plus,
} from 'lucide-react';
import Header from '@/components/layout/Header';

type TrafficSource = 'Organic' | 'Direct' | 'Referral' | 'Paid';

interface VisitedPage {
  title: string;
  path: string;
  visits: number;
  dwell: string;
}

interface WebsiteVisitRecord {
  id: string;
  accountName: string;
  domain: string;
  logo: string;
  visitorName: string;
  visitorRole: string;
  location: string;
  lastPageTitle: string;
  lastPagePath: string;
  pageViews: number;
  sessionTime: string;
  lastSeen: string;
  source: TrafficSource;
  intentScore: number;
  highlights: string[];
  topPages: VisitedPage[];
}

interface RuleSet {
  id: string;
  name: string;
  filters: string[];
  createdOn: string;
}

const filterSections = [
  { id: 'company', name: 'Company', icon: <Building2 size={16} /> },
  { id: 'location', name: 'Location', icon: <MapPin size={16} /> },
  { id: 'visitor-role', name: 'Visitor Role', icon: <Users size={16} /> },
  { id: 'visited-pages', name: 'Visited Pages', icon: <Eye size={16} /> },
  { id: 'traffic-source', name: 'Traffic Source', icon: <Globe size={16} /> },
  { id: 'session-time', name: 'Session Time', icon: <Clock3 size={16} /> },
];

const visitRecords: WebsiteVisitRecord[] = [
  {
    id: 'wv-1',
    accountName: 'Syniverse',
    domain: 'syniverse.com',
    logo: 'SY',
    visitorName: 'Neha Sharma',
    visitorRole: 'Head of Revenue Operations',
    location: 'Mumbai, India',
    lastPageTitle: 'Pricing - Enterprise Plan',
    lastPagePath: '/pricing/enterprise',
    pageViews: 9,
    sessionTime: '14m 22s',
    lastSeen: '27 Mar, 2026 · 10:42 AM',
    source: 'Organic',
    intentScore: 82,
    highlights: [
      'Visited pricing page 3 times in one session.',
      'Compared integration docs and implementation guide.',
      'Checked customer success stories for logistics use-cases.',
    ],
    topPages: [
      { title: 'Pricing - Enterprise Plan', path: '/pricing/enterprise', visits: 3, dwell: '5m 40s' },
      { title: 'Case Study - Global Freight Ops', path: '/case-studies/global-freight', visits: 2, dwell: '3m 18s' },
      { title: 'Integrations - Salesforce', path: '/integrations/salesforce', visits: 2, dwell: '2m 55s' },
    ],
  },
  {
    id: 'wv-2',
    accountName: 'netshoes',
    domain: 'netshoes.com',
    logo: 'NS',
    visitorName: 'Raghav Menon',
    visitorRole: 'Director of Digital Commerce',
    location: 'Sao Paulo, Brazil',
    lastPageTitle: 'Solutions - Demand Forecasting',
    lastPagePath: '/solutions/demand-forecasting',
    pageViews: 6,
    sessionTime: '8m 11s',
    lastSeen: '27 Mar, 2026 · 09:13 AM',
    source: 'Referral',
    intentScore: 61,
    highlights: [
      'Read feature-comparison section against legacy tools.',
      'Clicked product docs from partner referral page.',
      'Viewed ROI calculator once.',
    ],
    topPages: [
      { title: 'Solutions - Demand Forecasting', path: '/solutions/demand-forecasting', visits: 2, dwell: '3m 01s' },
      { title: 'Product - AI Signals', path: '/product/ai-signals', visits: 2, dwell: '2m 30s' },
      { title: 'Pricing', path: '/pricing', visits: 1, dwell: '1m 06s' },
    ],
  },
  {
    id: 'wv-3',
    accountName: 'Sailpoint, Inc.',
    domain: 'sailpoint.com',
    logo: 'SP',
    visitorName: 'Aditi Rao',
    visitorRole: 'Senior PMM',
    location: 'Austin, United States',
    lastPageTitle: 'Security & Compliance',
    lastPagePath: '/security',
    pageViews: 4,
    sessionTime: '5m 37s',
    lastSeen: '26 Mar, 2026 · 07:56 PM',
    source: 'Direct',
    intentScore: 43,
    highlights: [
      'Focused on compliance and data policy pages.',
      'No pricing page interaction in this session.',
      'Session depth indicates early-stage evaluation.',
    ],
    topPages: [
      { title: 'Security & Compliance', path: '/security', visits: 2, dwell: '2m 20s' },
      { title: 'Trust Center', path: '/trust', visits: 1, dwell: '1m 25s' },
      { title: 'Docs - Security Overview', path: '/docs/security-overview', visits: 1, dwell: '52s' },
    ],
  },
  {
    id: 'wv-4',
    accountName: 'Acv Auctions Inc.',
    domain: 'acvauctions.com',
    logo: 'AC',
    visitorName: 'Karan Patel',
    visitorRole: 'VP Growth',
    location: 'New York, United States',
    lastPageTitle: 'Case Studies - Marketplace Scale',
    lastPagePath: '/case-studies/marketplace-scale',
    pageViews: 8,
    sessionTime: '11m 04s',
    lastSeen: '26 Mar, 2026 · 02:29 PM',
    source: 'Paid',
    intentScore: 76,
    highlights: [
      'Came through campaign landing and explored proof points.',
      'Visited onboarding timeline before exiting.',
      'Cross-page pattern suggests late-stage buyer research.',
    ],
    topPages: [
      { title: 'Case Studies - Marketplace Scale', path: '/case-studies/marketplace-scale', visits: 3, dwell: '4m 12s' },
      { title: 'Pricing', path: '/pricing', visits: 2, dwell: '2m 34s' },
      { title: 'Onboarding Playbook', path: '/resources/onboarding-playbook', visits: 2, dwell: '2m 10s' },
    ],
  },
  {
    id: 'wv-5',
    accountName: 'Uniphore',
    domain: 'uniphore.com',
    logo: 'UN',
    visitorName: 'Shreya Nair',
    visitorRole: 'Director, RevOps',
    location: 'Bengaluru, India',
    lastPageTitle: 'Product - Messaging Agent',
    lastPagePath: '/product/messaging-agent',
    pageViews: 7,
    sessionTime: '9m 26s',
    lastSeen: '25 Mar, 2026 · 06:11 PM',
    source: 'Organic',
    intentScore: 69,
    highlights: [
      'Read messaging use-cases for enterprise outreach.',
      'Opened API docs and webhook support.',
      'Reviewed customer logos in BFSI vertical.',
    ],
    topPages: [
      { title: 'Product - Messaging Agent', path: '/product/messaging-agent', visits: 3, dwell: '3m 14s' },
      { title: 'Developers - API', path: '/developers/api', visits: 2, dwell: '2m 31s' },
      { title: 'Customers', path: '/customers', visits: 1, dwell: '1m 08s' },
    ],
  },
  {
    id: 'wv-6',
    accountName: 'Aptoan Labs',
    domain: 'aptoan.com',
    logo: 'AP',
    visitorName: 'Sana Khan',
    visitorRole: 'GTM Strategy Lead',
    location: 'Dubai, UAE',
    lastPageTitle: 'Case Study - AI Adoption',
    lastPagePath: '/case-studies/ai-adoption',
    pageViews: 5,
    sessionTime: '7m 45s',
    lastSeen: '25 Mar, 2026 · 03:42 PM',
    source: 'Organic',
    intentScore: 57,
    highlights: [
      'Focused on proof points and implementation outcomes.',
      'Compared customer stories by region.',
      'No direct pricing interaction yet.',
    ],
    topPages: [
      { title: 'Case Study - AI Adoption', path: '/case-studies/ai-adoption', visits: 2, dwell: '2m 31s' },
      { title: 'Outcomes - Sales Velocity', path: '/outcomes/sales-velocity', visits: 1, dwell: '1m 40s' },
      { title: 'Customers', path: '/customers', visits: 1, dwell: '58s' },
    ],
  },
  {
    id: 'wv-7',
    accountName: 'Ciklum',
    domain: 'ciklum.com',
    logo: 'CK',
    visitorName: 'Harsh Batra',
    visitorRole: 'Head of Partnerships',
    location: 'London, UK',
    lastPageTitle: 'Integrations - HubSpot',
    lastPagePath: '/integrations/hubspot',
    pageViews: 10,
    sessionTime: '16m 09s',
    lastSeen: '24 Mar, 2026 · 11:14 AM',
    source: 'Referral',
    intentScore: 84,
    highlights: [
      'Viewed partner integrations and partner program details.',
      'Visited migration checklist and rollout plan.',
      'Returned to pricing after integration review.',
    ],
    topPages: [
      { title: 'Integrations - HubSpot', path: '/integrations/hubspot', visits: 3, dwell: '5m 05s' },
      { title: 'Pricing', path: '/pricing', visits: 2, dwell: '2m 50s' },
      { title: 'Partner Program', path: '/partners', visits: 2, dwell: '2m 14s' },
    ],
  },
  {
    id: 'wv-8',
    accountName: 'Diligent',
    domain: 'diligent.com',
    logo: 'DG',
    visitorName: 'Pratik Desai',
    visitorRole: 'Director, Ops Excellence',
    location: 'Pune, India',
    lastPageTitle: 'Product - Signal Scoring',
    lastPagePath: '/product/signal-scoring',
    pageViews: 6,
    sessionTime: '8m 03s',
    lastSeen: '24 Mar, 2026 · 09:50 AM',
    source: 'Direct',
    intentScore: 48,
    highlights: [
      'Read capability details around ranking and explainability.',
      'Compared product page with alternatives section.',
      'Session indicates mid-funnel research.',
    ],
    topPages: [
      { title: 'Product - Signal Scoring', path: '/product/signal-scoring', visits: 2, dwell: '2m 40s' },
      { title: 'Playbooks', path: '/playbooks', visits: 1, dwell: '1m 12s' },
      { title: 'Security', path: '/security', visits: 1, dwell: '48s' },
    ],
  },
  {
    id: 'wv-9',
    accountName: 'TPX',
    domain: 'tpx.com',
    logo: 'TP',
    visitorName: 'Mira Jain',
    visitorRole: 'Enterprise Architect',
    location: 'Delhi, India',
    lastPageTitle: 'Developers - Webhooks',
    lastPagePath: '/developers/webhooks',
    pageViews: 4,
    sessionTime: '5m 12s',
    lastSeen: '23 Mar, 2026 · 08:23 PM',
    source: 'Direct',
    intentScore: 39,
    highlights: [
      'Deep technical read across webhook and API limits.',
      'No case studies opened in this session.',
      'Likely technical validation stage.',
    ],
    topPages: [
      { title: 'Developers - Webhooks', path: '/developers/webhooks', visits: 2, dwell: '1m 58s' },
      { title: 'Developers - API', path: '/developers/api', visits: 1, dwell: '1m 11s' },
      { title: 'Status', path: '/status', visits: 1, dwell: '46s' },
    ],
  },
  {
    id: 'wv-10',
    accountName: 'Rsa Security',
    domain: 'rsasecurity.com',
    logo: 'RS',
    visitorName: 'Abhinav Chopra',
    visitorRole: 'SVP Sales',
    location: 'Boston, United States',
    lastPageTitle: 'Pricing - Team Plan',
    lastPagePath: '/pricing/team',
    pageViews: 12,
    sessionTime: '19m 51s',
    lastSeen: '23 Mar, 2026 · 03:06 PM',
    source: 'Paid',
    intentScore: 88,
    highlights: [
      'Repeatedly visited pricing and onboarding pages.',
      'Viewed implementation SLA and support plans.',
      'Pattern suggests active buying cycle.',
    ],
    topPages: [
      { title: 'Pricing - Team Plan', path: '/pricing/team', visits: 4, dwell: '6m 01s' },
      { title: 'Implementation SLA', path: '/implementation-sla', visits: 2, dwell: '2m 35s' },
      { title: 'Support Plans', path: '/support', visits: 2, dwell: '2m 10s' },
    ],
  },
  {
    id: 'wv-11',
    accountName: 'Digicert',
    domain: 'digicert.com',
    logo: 'DC',
    visitorName: 'Vidit Awasthi',
    visitorRole: 'Demand Generation Manager',
    location: 'Salt Lake City, United States',
    lastPageTitle: 'Blog - ABM Benchmarks',
    lastPagePath: '/blog/abm-benchmarks',
    pageViews: 3,
    sessionTime: '3m 49s',
    lastSeen: '22 Mar, 2026 · 05:40 PM',
    source: 'Organic',
    intentScore: 28,
    highlights: [
      'Visited only thought-leadership content.',
      'No product intent pages in this session.',
      'Traffic pattern is early awareness.',
    ],
    topPages: [
      { title: 'Blog - ABM Benchmarks', path: '/blog/abm-benchmarks', visits: 1, dwell: '1m 42s' },
      { title: 'Blog - Sales AI', path: '/blog/sales-ai', visits: 1, dwell: '1m 03s' },
      { title: 'Resources', path: '/resources', visits: 1, dwell: '49s' },
    ],
  },
];

const sourceOptions: Array<'All' | TrafficSource> = ['All', 'Organic', 'Direct', 'Referral', 'Paid'];
const timeOptions = ['Last 24 Hours', 'Last 7 Days', 'Last 30 Days'];

function getIntentPill(intentScore: number) {
  if (intentScore >= 75) {
    return {
      label: 'High',
      style: {
        backgroundColor: '#dcfce7',
        color: '#166534',
        borderColor: '#86efac',
      },
    };
  }

  if (intentScore >= 50) {
    return {
      label: 'Medium',
      style: {
        backgroundColor: '#fef3c7',
        color: '#92400e',
        borderColor: '#fcd34d',
      },
    };
  }

  return {
    label: 'Low',
    style: {
      backgroundColor: '#dbeafe',
      color: '#1d4ed8',
      borderColor: '#93c5fd',
    },
  };
}

export default function WebsiteVisitsPage() {
  const [showFilters, setShowFilters] = useState(true);
  const [selectedFilterIds, setSelectedFilterIds] = useState<string[]>(['company']);
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<'All' | TrafficSource>('All');
  const [timeFilter, setTimeFilter] = useState('Last 7 Days');
  const [selectedVisitId, setSelectedVisitId] = useState('');
  const [showRulesDrawer, setShowRulesDrawer] = useState(false);
  const [ruleSets, setRuleSets] = useState<RuleSet[]>([]);
  const [selectedRuleSetId, setSelectedRuleSetId] = useState('');
  const [isConfiguringNewRuleSet, setIsConfiguringNewRuleSet] = useState(false);
  const [newRuleFilterIds, setNewRuleFilterIds] = useState<string[]>([]);
  const [rulesNotice, setRulesNotice] = useState('');

  const filteredVisits = useMemo(() => {
    return visitRecords.filter((visit) => {
      const matchesSearch =
        !searchQuery.trim() ||
        [visit.accountName, visit.domain, visit.visitorName, visit.visitorRole, visit.lastPageTitle]
          .join(' ')
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase());
      const matchesSource = sourceFilter === 'All' || visit.source === sourceFilter;
      return matchesSearch && matchesSource;
    });
  }, [searchQuery, sourceFilter]);

  const selectedVisit = filteredVisits.find((visit) => visit.id === selectedVisitId) ?? null;

  const maxRuleSets = 5;
  const allRuleFilterOptions = [
    ...filterSections.map((filter) => ({
      id: filter.id,
      label: filter.name,
    })),
    {
      id: 'search-filter',
      label: searchQuery.trim() ? `Search: ${searchQuery.trim()}` : 'Search',
    },
    {
      id: 'source-filter',
      label: sourceFilter === 'All' ? 'Source' : `Source: ${sourceFilter}`,
    },
    {
      id: 'time-filter',
      label: `Range: ${timeFilter}`,
    },
  ];

  const toggleSidebarFilter = (filterId: string) => {
    setSelectedFilterIds((current) => {
      if (current.includes(filterId)) {
        return current.filter((id) => id !== filterId);
      }
      return [...current, filterId];
    });
  };

  const startConfiguringRuleSet = () => {
    if (ruleSets.length >= maxRuleSets) {
      setRulesNotice('Maximum 5 rule sets allowed.');
      return;
    }

    const defaults = [
      ...selectedFilterIds,
      ...(searchQuery.trim() ? ['search-filter'] : []),
      ...(sourceFilter !== 'All' ? ['source-filter'] : []),
      ...(timeFilter ? ['time-filter'] : []),
    ];

    setNewRuleFilterIds(defaults);
    setIsConfiguringNewRuleSet(true);
    setRulesNotice('');
  };

  const toggleNewRuleFilter = (filterId: string) => {
    setNewRuleFilterIds((current) => {
      if (current.includes(filterId)) {
        return current.filter((id) => id !== filterId);
      }
      return [...current, filterId];
    });
  };

  const saveConfiguredRuleSet = () => {
    if (newRuleFilterIds.length === 0) {
      setRulesNotice('Select at least one filter to create a rule set.');
      return;
    }

    const selectedLabels = allRuleFilterOptions
      .filter((option) => newRuleFilterIds.includes(option.id))
      .map((option) => option.label);

    if (selectedLabels.length === 0) {
      setRulesNotice('Select at least one filter to create a rule set.');
      return;
    }

    const nextIndex = ruleSets.length + 1;
    const newRuleSet: RuleSet = {
      id: `rule-${Date.now()}-${nextIndex}`,
      name: `Rule Set ${nextIndex}`,
      filters: selectedLabels,
      createdOn: '28 Apr, 2026',
    };

    setRuleSets((current) => [...current, newRuleSet]);
    setSelectedRuleSetId(newRuleSet.id);
    setIsConfiguringNewRuleSet(false);
    setNewRuleFilterIds([]);
    setRulesNotice(`Saved ${newRuleSet.name}.`);
  };

  const cancelConfiguringRuleSet = () => {
    setIsConfiguringNewRuleSet(false);
    setNewRuleFilterIds([]);
    setRulesNotice('');
  };

  const deleteRuleSet = (ruleSetId: string) => {
    setRuleSets((current) => current.filter((rule) => rule.id !== ruleSetId));
    setSelectedRuleSetId((current) => (current === ruleSetId ? '' : current));
  };

  return (
    <div>
      <Header title="Website Visits" />

      <div className="relative flex h-[calc(100vh-120px)]">
        {showFilters && (
          <div className="w-80 bg-white border-r flex flex-col" style={{ borderColor: '#e7e7e6' }}>
            <div className="flex border-b" style={{ borderColor: '#e7e7e6' }}>
              <button
                className="flex-1 px-4 py-3 text-sm font-medium border-b-2"
                style={{ borderColor: '#1c64f2', color: '#1c64f2' }}
              >
                Filters
              </button>
              <button className="flex-1 px-4 py-3 text-sm font-medium" style={{ color: '#706f69' }}>
                Saved
              </button>
              <button onClick={() => setShowFilters(false)} className="px-3 py-3" style={{ color: '#706f69' }}>
                <X size={16} />
              </button>
            </div>

            <div className="p-4 border-b" style={{ borderColor: '#e7e7e6' }}>
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: '#706f69' }}
                />
                <input
                  type="text"
                  placeholder="Search filters"
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border"
                  style={{ borderColor: '#e7e7e6', backgroundColor: '#f9fafb' }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-2 py-2">
              <p className="px-2 py-2 text-xs font-medium uppercase tracking-wider" style={{ color: '#706f69' }}>
                Website
              </p>
              {filterSections.map((filter) => {
                const isSelected = selectedFilterIds.includes(filter.id);
                return (
                  <button
                    key={filter.id}
                    onClick={() => toggleSidebarFilter(filter.id)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg hover:bg-gray-50 transition-colors"
                    style={{
                      color: isSelected ? '#1d4ed8' : '#191918',
                      backgroundColor: isSelected ? '#eef4ff' : 'transparent',
                    }}
                  >
                    <span className="flex items-center gap-2">
                      {filter.icon}
                      {filter.name}
                    </span>
                    {isSelected ? (
                      <span
                        className="h-4 w-4 rounded-full inline-flex items-center justify-center"
                        style={{ backgroundColor: '#1d4ed8', color: '#ffffff' }}
                      >
                        <Check size={11} />
                      </span>
                    ) : (
                      <ChevronRight size={16} style={{ color: '#706f69' }} />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="p-4 border-t flex items-center gap-2" style={{ borderColor: '#e7e7e6' }}>
              <button className="px-3 py-2 text-sm" style={{ color: '#706f69' }}>
                Clear
              </button>
              <button className="px-3 py-2 text-sm" style={{ color: '#706f69' }}>
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

        <div className="flex-1 min-w-0 flex">
          <div className="flex-1 min-w-0 flex flex-col bg-white">
            <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: '#e7e7e6' }}>
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
                  {selectedFilterIds.length > 0 && (
                    <span
                      className="px-1.5 py-0.5 text-xs rounded-full text-white"
                      style={{ backgroundColor: '#1c64f2' }}
                    >
                      {selectedFilterIds.length}
                    </span>
                  )}
                </button>

                <div className="relative w-72">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: '#706f69' }}
                  />
                  <input
                    type="text"
                    placeholder="Search account or visitor"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="w-full pl-9 pr-4 py-1.5 text-sm rounded-lg border"
                    style={{ borderColor: '#e7e7e6' }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowRulesDrawer(true)}
                  className="h-8 px-3 rounded-lg border text-sm font-medium inline-flex items-center"
                  style={{ borderColor: '#c9d8ff', backgroundColor: '#eff4ff', color: '#1d4ed8' }}
                >
                  View Rules
                </button>

                <div className="relative">
                  <select
                    value={sourceFilter}
                    onChange={(event) => setSourceFilter(event.target.value as 'All' | TrafficSource)}
                    className="h-8 rounded-lg border pl-3 pr-7 text-sm appearance-none"
                    style={{ borderColor: '#e7e7e6', color: '#191918', backgroundColor: '#ffffff' }}
                  >
                    {sourceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option === 'All' ? 'All Sources' : option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: '#6b7280' }}
                  />
                </div>

                <div className="relative">
                  <select
                    value={timeFilter}
                    onChange={(event) => setTimeFilter(event.target.value)}
                    className="h-8 rounded-lg border pl-3 pr-7 text-sm appearance-none"
                    style={{ borderColor: '#e7e7e6', color: '#191918', backgroundColor: '#ffffff' }}
                  >
                    {timeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: '#6b7280' }}
                  />
                </div>

                <button
                  type="button"
                  className="h-8 px-3 rounded-lg border text-sm font-medium inline-flex items-center gap-1.5"
                  style={{ borderColor: '#e7e7e6', color: '#191918' }}
                >
                  <Download size={14} />
                  Export
                </button>

                <button
                  type="button"
                  className="h-8 px-3 rounded-lg border text-sm font-medium inline-flex items-center gap-1.5"
                  style={{ borderColor: '#e7e7e6', color: '#191918' }}
                >
                  Actions
                  <ChevronDown size={14} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              <table className="min-w-[1200px] w-full">
                <thead className="sticky top-0 bg-white" style={{ borderBottom: '1px solid #e7e7e6' }}>
                  <tr>
                    <th className="w-10 px-4 py-3">
                      <input type="checkbox" className="rounded" />
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>
                      <button className="inline-flex items-center gap-1">
                        Account Name
                        <ChevronDown size={14} />
                      </button>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>
                      Visitor
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>
                      Latest Page
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>
                      Page Views
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>
                      Session Time
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>
                      Last Seen
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>
                      Source
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>
                      <span className="inline-flex items-center gap-1">
                        <Sparkles size={14} style={{ color: '#1c64f2' }} />
                        Visit Score
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVisits.map((visit) => {
                    const intentPill = getIntentPill(visit.intentScore);
                    const isSelected = selectedVisit?.id === visit.id;
                    return (
                      <tr
                        key={visit.id}
                        className="border-b hover:bg-gray-50 transition-colors"
                        style={{
                          borderColor: '#e7e7e6',
                          backgroundColor: isSelected ? '#f5f9ff' : '#ffffff',
                        }}
                      >
                        <td className="px-4 py-3 align-top">
                          <input type="checkbox" className="rounded" onClick={(event) => event.stopPropagation()} />
                        </td>
                        <td className="px-4 py-3 align-top">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded flex items-center justify-center text-xs font-medium text-white"
                              style={{ backgroundColor: '#3e545c' }}
                            >
                              {visit.logo}
                            </div>
                            <div>
                              <button
                                type="button"
                                className="text-sm font-semibold hover:underline"
                                style={{ color: '#111928' }}
                                onClick={() => setSelectedVisitId(visit.id)}
                              >
                                {visit.accountName}
                              </button>
                              <p className="text-xs" style={{ color: '#6b7280' }}>
                                {visit.domain}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 align-top">
                          <p className="text-sm font-medium" style={{ color: '#111928' }}>
                            {visit.visitorName}
                          </p>
                          <p className="text-xs" style={{ color: '#6b7280' }}>
                            {visit.visitorRole}
                          </p>
                        </td>
                        <td className="px-4 py-3 align-top">
                          <p className="text-sm font-medium" style={{ color: '#111928' }}>
                            {visit.lastPageTitle}
                          </p>
                          <p className="text-xs truncate max-w-[220px]" style={{ color: '#6b7280' }}>
                            {visit.lastPagePath}
                          </p>
                        </td>
                        <td className="px-4 py-3 align-top text-sm" style={{ color: '#111928' }}>
                          {visit.pageViews}
                        </td>
                        <td className="px-4 py-3 align-top text-sm" style={{ color: '#111928' }}>
                          {visit.sessionTime}
                        </td>
                        <td className="px-4 py-3 align-top text-sm" style={{ color: '#111928' }}>
                          {visit.lastSeen}
                        </td>
                        <td className="px-4 py-3 align-top">
                          <span
                            className="inline-flex h-6 px-2.5 items-center rounded-full border text-xs font-medium"
                            style={{ borderColor: '#e5e7eb', color: '#374151', backgroundColor: '#f9fafb' }}
                          >
                            {visit.source}
                          </span>
                        </td>
                        <td className="px-4 py-3 align-top">
                          <span
                            className="inline-flex h-6 px-2.5 items-center rounded-md border text-xs font-semibold gap-1"
                            style={intentPill.style}
                          >
                            {visit.intentScore}
                            <span>{intentPill.label}</span>
                          </span>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredVisits.length === 0 && (
                    <tr>
                      <td colSpan={9} className="px-4 py-10 text-center text-sm" style={{ color: '#6b7280' }}>
                        No website visits match the selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {selectedVisit && (
            <aside className="w-[390px] border-l bg-white flex flex-col" style={{ borderColor: '#e7e7e6' }}>
              <div className="px-4 py-4 border-b" style={{ borderColor: '#e7e7e6' }}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#111928' }}>
                      {selectedVisit.accountName}
                    </p>
                    <p className="mt-1 text-xs" style={{ color: '#6b7280' }}>
                      {selectedVisit.visitorName} · {selectedVisit.visitorRole}
                    </p>
                    <p className="mt-1 text-xs" style={{ color: '#6b7280' }}>
                      {selectedVisit.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="h-8 px-2.5 rounded-lg border text-xs font-medium inline-flex items-center gap-1.5"
                      style={{ borderColor: '#e7e7e6', color: '#1f2937' }}
                    >
                      Open Account
                      <ArrowUpRight size={13} />
                    </button>
                    <button
                      type="button"
                      className="h-8 w-8 rounded-lg border inline-flex items-center justify-center"
                      style={{ borderColor: '#e7e7e6', color: '#6b7280' }}
                      onClick={() => setSelectedVisitId('')}
                      aria-label="Close details"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <section className="rounded-lg border p-3" style={{ borderColor: '#e7e7e6' }}>
                  <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#6b7280' }}>
                    Session Summary
                  </p>
                  <p className="mt-2 text-sm font-medium" style={{ color: '#111928' }}>
                    {selectedVisit.lastPageTitle}
                  </p>
                  <a
                    href="#"
                    className="mt-0.5 inline-flex items-center gap-1 text-xs"
                    style={{ color: '#2563eb' }}
                  >
                    {selectedVisit.lastPagePath}
                    <ExternalLink size={12} />
                  </a>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <MetricPill label="Pages" value={String(selectedVisit.pageViews)} />
                    <MetricPill label="Duration" value={selectedVisit.sessionTime} />
                    <MetricPill label="Source" value={selectedVisit.source} />
                  </div>
                </section>

                <section className="rounded-lg border p-3" style={{ borderColor: '#e7e7e6' }}>
                  <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#6b7280' }}>
                    Key Highlights
                  </p>
                  <div className="mt-2 space-y-2">
                    {selectedVisit.highlights.map((highlight) => (
                      <div key={highlight} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: '#3b82f6' }} />
                        <p className="text-sm leading-5" style={{ color: '#1f2937' }}>
                          {highlight}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-lg border p-3" style={{ borderColor: '#e7e7e6' }}>
                  <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#6b7280' }}>
                    Top Pages
                  </p>
                  <div className="mt-2 space-y-2">
                    {selectedVisit.topPages.map((page) => (
                      <div
                        key={page.path}
                        className="rounded-md border p-2.5"
                        style={{ borderColor: '#eceff3', backgroundColor: '#fbfdff' }}
                      >
                        <p className="text-sm font-medium" style={{ color: '#111928' }}>
                          {page.title}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: '#6b7280' }}>
                          {page.path}
                        </p>
                        <p className="text-xs mt-1" style={{ color: '#4b5563' }}>
                          {page.visits} visits · {page.dwell} avg dwell
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="p-4 border-t" style={{ borderColor: '#e7e7e6' }}>
                <button
                  type="button"
                  className="h-10 w-full rounded-lg text-sm font-semibold text-white inline-flex items-center justify-center gap-1.5"
                  style={{ backgroundColor: '#1c64f2' }}
                >
                  Add To Target Profiles
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </aside>
          )}

          {showRulesDrawer && (
            <aside
              className="absolute right-0 top-0 h-full w-[360px] border-l bg-white shadow-xl z-20 flex flex-col"
              style={{ borderColor: '#e7e7e6' }}
            >
              <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: '#e7e7e6' }}>
                <div>
                  <p className="text-lg font-semibold" style={{ color: '#111928' }}>
                    All Rules
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#6b7280' }}>
                    {ruleSets.length}/{maxRuleSets} rule sets
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowRulesDrawer(false)}
                  className="h-8 w-8 rounded-lg border inline-flex items-center justify-center"
                  style={{ borderColor: '#e7e7e6', color: '#6b7280' }}
                >
                  <X size={14} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {ruleSets.length === 0 && (
                  <div className="rounded-lg border p-3 text-sm" style={{ borderColor: '#e7e7e6', color: '#6b7280' }}>
                    No rule sets configured yet.
                  </div>
                )}

                {ruleSets.map((ruleSet) => {
                  const isSelectedRule = selectedRuleSetId === ruleSet.id;
                  return (
                    <div
                      key={ruleSet.id}
                      className="rounded-lg border p-3 cursor-pointer"
                      style={{
                        borderColor: isSelectedRule ? '#93c5fd' : '#e7e7e6',
                        backgroundColor: isSelectedRule ? '#f8fbff' : '#ffffff',
                      }}
                      onClick={() => setSelectedRuleSetId(ruleSet.id)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold" style={{ color: '#111928' }}>
                            {ruleSet.name}
                          </p>
                          <p className="text-xs mt-0.5" style={{ color: '#6b7280' }}>
                            {ruleSet.filters.length} filters · {ruleSet.createdOn}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            deleteRuleSet(ruleSet.id);
                          }}
                          className="h-7 w-7 rounded-md border inline-flex items-center justify-center"
                          style={{ borderColor: '#e7e7e6', color: '#6b7280' }}
                          aria-label={`Delete ${ruleSet.name}`}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {ruleSet.filters.map((filter) => (
                          <span
                            key={`${ruleSet.id}-${filter}`}
                            className="px-2 py-1 rounded-md text-[11px] font-medium"
                            style={{ backgroundColor: '#f3f4f6', color: '#374151' }}
                          >
                            {filter}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {!isConfiguringNewRuleSet && (
                  <button
                    type="button"
                    onClick={startConfiguringRuleSet}
                    disabled={ruleSets.length >= maxRuleSets}
                    className="h-9 w-full rounded-lg text-sm font-medium border inline-flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ borderColor: '#c9d8ff', backgroundColor: '#eff4ff', color: '#1d4ed8' }}
                  >
                    <Plus size={14} />
                    Configure New Rule Set
                  </button>
                )}

                {isConfiguringNewRuleSet && (
                  <div className="rounded-lg border p-3 space-y-3" style={{ borderColor: '#e7e7e6' }}>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold" style={{ color: '#111928' }}>
                        New Rule Set
                      </p>
                      <button
                        type="button"
                        onClick={cancelConfiguringRuleSet}
                        className="h-7 w-7 rounded-md border inline-flex items-center justify-center"
                        style={{ borderColor: '#e7e7e6', color: '#6b7280' }}
                        aria-label="Cancel creating rule set"
                      >
                        <X size={13} />
                      </button>
                    </div>

                    <p className="text-xs" style={{ color: '#6b7280' }}>
                      Select filters to include in this rule set.
                    </p>

                    <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1">
                      {allRuleFilterOptions.map((option) => {
                        const selected = newRuleFilterIds.includes(option.id);
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => toggleNewRuleFilter(option.id)}
                            className="w-full rounded-md border px-2.5 py-2 text-left text-sm flex items-center justify-between"
                            style={{
                              borderColor: selected ? '#93c5fd' : '#e7e7e6',
                              backgroundColor: selected ? '#eef4ff' : '#ffffff',
                              color: selected ? '#1d4ed8' : '#1f2937',
                            }}
                          >
                            <span>{option.label}</span>
                            {selected && <Check size={14} />}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={saveConfiguredRuleSet}
                        disabled={newRuleFilterIds.length === 0}
                        className="h-8 flex-1 rounded-lg text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: '#1c64f2' }}
                      >
                        Save Rule Set
                      </button>
                      <button
                        type="button"
                        onClick={cancelConfiguringRuleSet}
                        className="h-8 px-3 rounded-lg border text-sm font-medium"
                        style={{ borderColor: '#e7e7e6', color: '#4b5563' }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {rulesNotice && (
                  <p className="text-xs" style={{ color: '#6b7280' }}>
                    {rulesNotice}
                  </p>
                )}
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border px-2 py-1.5" style={{ borderColor: '#e7e7e6', backgroundColor: '#f9fafb' }}>
      <p className="text-[10px] uppercase tracking-wide font-semibold" style={{ color: '#6b7280' }}>
        {label}
      </p>
      <p className="mt-0.5 text-xs font-medium" style={{ color: '#111928' }}>
        {value}
      </p>
    </div>
  );
}
