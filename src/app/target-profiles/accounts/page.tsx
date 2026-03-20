'use client';

import { useState } from 'react';
import Link from 'next/link';
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
} from 'lucide-react';
import SignalsPanel from '@/components/SignalsPanel';
import EnrichmentPanel from '@/components/EnrichmentPanel';

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

const mockAccounts = [
  { id: 1, name: 'Daimler Truck Ag', domain: 'daimlertruck.com', icpFitment: 71, icpChange: 53, industry: 'Automotive', employees: '50K+', logo: 'DT' },
  { id: 2, name: 'Bacardi', domain: 'bacardilimited.com', icpFitment: 67, icpChange: 49, industry: 'Food & Beverage', employees: '5K-10K', logo: 'B' },
  { id: 3, name: 'Inetsoft', domain: 'inetsoft.com', icpFitment: 40, icpChange: 0, industry: 'Software', employees: '50-200', logo: 'IS' },
  { id: 4, name: 'Tata Capital', domain: 'tatacapital.com', icpFitment: 22, icpChange: 0, industry: 'Financial Services', employees: '1K-5K', logo: 'TC' },
  { id: 5, name: 'Axis Bank Limited', domain: 'axisbank.com', icpFitment: 22, icpChange: 0, industry: 'Banking', employees: '50K+', logo: 'AB' },
  { id: 6, name: 'Polyai', domain: 'polyai.com', icpFitment: 67, icpChange: 0, industry: 'AI/ML', employees: '200-500', logo: 'PA' },
  { id: 7, name: 'Tata Aig General Insurance', domain: 'tataaig.com', icpFitment: 17, icpChange: 0, industry: 'Insurance', employees: '5K-10K', logo: 'TA' },
  { id: 8, name: 'LinkedIn', domain: 'linkedin.com', icpFitment: 33, icpChange: 0, industry: 'Technology', employees: '10K-50K', logo: 'LI' },
  { id: 9, name: 'Boston Celtics', domain: 'celtics.com', icpFitment: 60, icpChange: 0, industry: 'Sports', employees: '200-500', logo: 'BC' },
  { id: 10, name: 'Greenway Health', domain: 'greenwayhealth.com', icpFitment: 72, icpChange: 2, industry: 'Healthcare', employees: '1K-5K', logo: 'GH' },
];

export default function AccountsPage() {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSignalsPanel, setShowSignalsPanel] = useState(false);
  const [showEnrichmentPanel, setShowEnrichmentPanel] = useState(false);
  const [signalInitialTemplate, setSignalInitialTemplate] = useState<string | undefined>(undefined);

  const handleEnrichmentSelect = (template: string) => {
    setShowEnrichmentPanel(false);
    setSignalInitialTemplate(template);
    setShowSignalsPanel(true);
  };

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
        <div className="flex-1 overflow-auto">
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
                    ICP Fitment
                  </span>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>Key Competitors</th>
                <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>AI News Insights</th>
              </tr>
            </thead>
            <tbody>
              {mockAccounts.map((account) => (
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
                  <td className="px-4 py-3">
                    <span className="text-sm" style={{ color: '#1c64f2' }}>Searching...</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm" style={{ color: '#1c64f2' }}>Searching...</span>
                  </td>
                </tr>
              ))}
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
