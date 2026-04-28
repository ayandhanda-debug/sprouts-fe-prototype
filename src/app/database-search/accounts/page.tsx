'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { addSavedIcp } from '@/lib/icp-storage';
import {
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  Building2,
  MapPin,
  Factory,
  Users,
  DollarSign,
  Cpu,
  Wallet,
  Calendar,
  MoreHorizontal,
  ExternalLink,
  Sparkles,
  X,
  Check,
  Zap,
  Target,
  TrendingUp,
  Radar,
  Info,
  Coins,
  Gift,
  Crown,
  Clock,
  Star,
  Shield,
  Calculator,
  ArrowRight,
  Plus,
} from 'lucide-react';

// Mock data for accounts
const mockAccounts = [
  { id: 1, name: 'Repsol, S.A.', logo: '🛢️', primaryIndustry: 'Energy, Utilities...', subIndustry: 'Oil & Gas', otherIndustries: 'Environmental Se...', revenue: '$10B+', employeeRange: '10,001+', employeeCount: '25,864', globalPresence: 'ESP', presenceCount: '16,381', change: '+123', fundingDate: '26 Mar, 2025' },
  { id: 2, name: 'Home Credit India', logo: '🏦', primaryIndustry: 'Finance', subIndustry: 'Financial Servic...', otherIndustries: 'Lending & Broker...', revenue: '$1B - $10B', employeeRange: '5,001 - 10,000', employeeCount: '9,309', globalPresence: 'IND', presenceCount: '7,529', change: '+30', fundingDate: '10 May, 2024' },
  { id: 3, name: 'Nuvoco Vistas Cor...', logo: '🏗️', primaryIndustry: 'Consumer Goods &...', subIndustry: 'Wholesale', otherIndustries: 'Building Materia...', revenue: '$1B - $10B', employeeRange: '1,001 - 5,000', employeeCount: '4,701', globalPresence: 'IND', presenceCount: '4,678', change: '+12', fundingDate: '01 May, 2013' },
  { id: 4, name: 'Foundation Buildi...', logo: '🏢', primaryIndustry: 'Consumer Goods &...', subIndustry: 'Wholesale', otherIndustries: 'N/A', revenue: '$1B - $10B', employeeRange: '1,001 - 5,000', employeeCount: '1,760', globalPresence: 'USA', presenceCount: '825', change: '+9', fundingDate: '01 Jan, 2024' },
  { id: 5, name: 'Alera Group, Inc', logo: '🛡️', primaryIndustry: 'Insurance', subIndustry: 'Insurance', otherIndustries: 'Financial Servic...', revenue: '$1B - $10B', employeeRange: '1,001 - 5,000', employeeCount: '2,643', globalPresence: 'USA', presenceCount: '1,511', change: '+6', fundingDate: '12 Apr, 2023' },
  { id: 6, name: 'Sound Physicians', logo: '🏥', primaryIndustry: 'Healthcare & Lif...', subIndustry: 'Hospital & Healt...', otherIndustries: 'Medical Practice', revenue: '$1B - $10B', employeeRange: '1,001 - 5,000', employeeCount: '3,048', globalPresence: 'USA', presenceCount: '2,714', change: '+39', fundingDate: '07 Jun, 2018' },
  { id: 7, name: 'Marubeni Corporat...', logo: '🌐', primaryIndustry: 'Organizations', subIndustry: 'International Tr...', otherIndustries: 'Wholesale', revenue: '$10B+', employeeRange: '10,001+', employeeCount: '10,181', globalPresence: 'JPN', presenceCount: '730', change: '+86', fundingDate: '01 Aug, 2020' },
  { id: 8, name: 'Gpm Investments, ...', logo: '🛒', primaryIndustry: 'Consumer Goods &...', subIndustry: 'Retail', otherIndustries: 'Dining & Food Se...', revenue: '$1B - $10B', employeeRange: '1,001 - 5,000', employeeCount: '2,810', globalPresence: 'USA', presenceCount: '1,548', change: '+13', fundingDate: '30 Jan, 2017' },
  { id: 9, name: 'Intelsat S.A.', logo: '📡', primaryIndustry: 'Telecommunicatio...', subIndustry: 'Telecommunicatio...', otherIndustries: 'Broadcasting Med...', revenue: '$1B - $10B', employeeRange: '1,001 - 5,000', employeeCount: '1,245', globalPresence: 'USA', presenceCount: '923', change: '+41', fundingDate: '09 Jan, 2008' },
  { id: 10, name: 'Fanatics', logo: '⚽', primaryIndustry: 'Software & Techn...', subIndustry: 'Information Tech...', otherIndustries: 'Sporting & Recre...', revenue: '$1B - $10B', employeeRange: '10,001+', employeeCount: '13,567', globalPresence: 'USA', presenceCount: '7,145', change: '+87', fundingDate: '06 Dec, 2022' },
  { id: 11, name: 'Endurance Technol...', logo: '🔧', primaryIndustry: 'Manufacturing', subIndustry: 'Automotive Manuf...', otherIndustries: 'Automotive', revenue: '$1B - $10B', employeeRange: '1,001 - 5,000', employeeCount: '4,474', globalPresence: 'IND', presenceCount: '4,362', change: '+21', fundingDate: '22 Dec, 2011' },
  { id: 12, name: 'Sport 2000', logo: '🏃', primaryIndustry: 'Consumer Goods &...', subIndustry: 'Retail', otherIndustries: 'Sports & Recreat...', revenue: '$1B - $10B', employeeRange: '1,001 - 5,000', employeeCount: '1,458', globalPresence: 'FRA', presenceCount: '1,357', change: '+31', fundingDate: '02 Jun, 2008' },
];

// Filter sections config
const filterSections = [
  { id: 'icp', label: 'Account ICP', icon: Target, hasInfo: true, section: 'ICP' },
  { id: 'company', label: 'Company', icon: Building2, section: 'ACCOUNT' },
  { id: 'location', label: 'Location', icon: MapPin, section: 'ACCOUNT' },
  { id: 'industry', label: 'Industry', icon: Factory, section: 'ACCOUNT' },
  { id: 'companyKeyword', label: 'Company Keyword', icon: Search, section: 'ACCOUNT' },
  { id: 'employeeByDept', label: 'Employee By Dept.', icon: Users, section: 'ACCOUNT' },
  { id: 'employeeCount', label: 'Employee Count', icon: Users, section: 'ACCOUNT' },
  { id: 'revenue', label: 'Revenue', icon: DollarSign, section: 'ACCOUNT' },
  { id: 'technology', label: 'Technology', icon: Cpu, hasInfo: true, section: 'ACCOUNT' },
  { id: 'funding', label: 'Funding', icon: Wallet, section: 'ACCOUNT' },
  { id: 'foundedYear', label: 'Founded Year', icon: Calendar, section: 'ACCOUNT' },
  { id: 'sicCode', label: 'Industry SIC Code', icon: Factory, section: 'ACCOUNT' },
  { id: 'naicsCode', label: 'Industry NAICS Code', icon: Factory, section: 'ACCOUNT' },
];

const filterValueExamples: Record<string, string[]> = {
  icp: ['High fit', 'Medium fit'],
  company: ['B2B product companies'],
  location: ['India', 'United States'],
  industry: ['Software', 'Financial Services'],
  companyKeyword: ['AI', 'Automation'],
  employeeByDept: ['Engineering 50+', 'Sales 20+'],
  employeeCount: ['1,001 - 5,000'],
  revenue: ['$10M - $500M'],
  technology: ['Salesforce', 'HubSpot'],
  funding: ['Series B+', 'Last 24 months'],
  foundedYear: ['2012 - 2024'],
  sicCode: ['7372'],
  naicsCode: ['511210', '541511'],
};

// AI Discovery signals (when user HAS signals configured)
const discoverySignals = [
  { name: 'Leadership Change', icon: Users, color: '#10b981' },
  { name: 'Expansion Plans', icon: TrendingUp, color: '#1c64f2' },
  { name: 'Tech Stack Match', icon: Cpu, color: '#8b5cf6' },
  { name: 'Funding Received', icon: Wallet, color: '#f59e0b' },
];

// Recommended signals (when user has NO signals configured)
const recommendedSignals = [
  {
    id: 'leadership',
    name: 'Leadership Change',
    icon: Users,
    color: '#10b981',
    accountCount: 87,
    description: 'Track C-suite and VP-level changes',
    icp: { high: 44, medium: 29, low: 14 }
  },
  {
    id: 'funding',
    name: 'Funding Rounds',
    icon: Wallet,
    color: '#f59e0b',
    accountCount: 124,
    description: 'Companies with recent investments',
    icp: { high: 62, medium: 41, low: 21 }
  },
  {
    id: 'expansion',
    name: 'Expansion Plans',
    icon: TrendingUp,
    color: '#1c64f2',
    accountCount: 56,
    description: 'New market or office announcements',
    icp: { high: 28, medium: 19, low: 9 }
  },
  {
    id: 'techstack',
    name: 'Tech Stack Match',
    icon: Cpu,
    color: '#8b5cf6',
    accountCount: 143,
    description: 'Using complementary technologies',
    icp: { high: 72, medium: 47, low: 24 }
  },
  {
    id: 'hiring',
    name: 'Hiring Surge',
    icon: Users,
    color: '#ef4444',
    accountCount: 92,
    description: 'Rapidly growing teams',
    icp: { high: 46, medium: 31, low: 15 }
  },
];

export default function DatabaseSearchAccountsPage() {
  const [showFilters, setShowFilters] = useState(true);
  const [expandedFilters, setExpandedFilters] = useState<string[]>(['icp', 'company']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAccounts, setSelectedAccounts] = useState<number[]>([]);

  // AI Discovery Modal State
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiModalState, setAiModalState] = useState<'loading' | 'results' | 'qualifying' | 'success'>('loading');
  const [discoveredCount, setDiscoveredCount] = useState(0);

  // Signal configuration state
  const [hasSignals, setHasSignals] = useState(false);
  const [showSetupSignals, setShowSetupSignals] = useState(false);
  const [selectedSignals, setSelectedSignals] = useState<string[]>([]);
  const [accountsToQualify, setAccountsToQualify] = useState(0);
  const [userCredits, setUserCredits] = useState(3500); // 3.5K credits

  // Qualification control state
  const [showQualificationControl, setShowQualificationControl] = useState(false);
  const [signalAmounts, setSignalAmounts] = useState<Record<string, number>>({});
  const [maxICPAccounts] = useState(150); // Sprouts recommended ICP ceiling per signal
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showSaveIcpModal, setShowSaveIcpModal] = useState(false);
  const [newIcpName, setNewIcpName] = useState('');
  const [saveIcpError, setSaveIcpError] = useState('');

  // ICP Segmentation State
  const [icpSegments, setIcpSegments] = useState({
    high: 0,
    medium: 0,
    low: 0
  });

  // Signal Computing State
  const [isComputingSignals, setIsComputingSignals] = useState(false);

  // Credit Recharge Modal State
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('growth');
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  const [customCredits, setCustomCredits] = useState(10000);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const appliedSignalLabels = useMemo(
    () =>
      selectedSignals
        .map((signalId) => recommendedSignals.find((signal) => signal.id === signalId)?.name)
        .filter((value): value is string => Boolean(value)),
    [selectedSignals]
  );

  const appliedAttributeSelections = useMemo(() => {
    const selections = expandedFilters
      .map((filterId) => {
        const filter = filterSections.find((item) => item.id === filterId);
        const values = filterValueExamples[filterId];
        if (!filter || !values || values.length === 0) return null;
        return {
          attribute: filter.label,
          values,
        };
      })
      .filter(
        (
          item
        ): item is {
          attribute: string;
          values: string[];
        } => Boolean(item)
      );

    if (searchQuery.trim()) {
      selections.unshift({
        attribute: 'Company Search',
        values: [searchQuery.trim()],
      });
    }

    if (appliedSignalLabels.length > 0) {
      selections.push({
        attribute: 'Signals',
        values: appliedSignalLabels,
      });
    }

    return selections;
  }, [expandedFilters, searchQuery, appliedSignalLabels]);

  const appliedFilterLabels = filterSections
    .filter((filter) => expandedFilters.includes(filter.id))
    .map((filter) => filter.label);

  const canSaveIcp = appliedAttributeSelections.length > 0;

  // Dynamic credit calculation with tiered pricing (game theory: anchoring + bulk discount)
  const calculateCredits = (count: number) => {
    if (count === 0) return { total: 0, perAccount: 0, savings: 0, tier: 'none' };

    // Tiered pricing: more accounts = better rate
    let perAccount: number;
    let tier: string;

    if (count <= 10) {
      perAccount = 2; // Base rate
      tier = 'standard';
    } else if (count <= 30) {
      perAccount = 1.5; // 25% discount
      tier = 'bulk';
    } else {
      perAccount = 1; // 50% discount
      tier = 'premium';
    }

    const total = Math.ceil(count * perAccount);
    const baseTotal = count * 2; // What they'd pay at base rate
    const savings = baseTotal - total;

    return { total, perAccount, savings, tier };
  };

  // Get total selected accounts from all signals
  const getTotalSelectedAccounts = () => {
    return Object.values(signalAmounts).reduce((sum, amount) => sum + amount, 0);
  };

  // Generate ICP breakdown based on discovered count
  const generateICPBreakdown = (totalCount: number, hasSignals: boolean) => {
    if (hasSignals) {
      // With signals: Better quality distribution
      // High: ~50%, Medium: ~33%, Low: ~17%
      return {
        high: Math.floor(totalCount * 0.50),
        medium: Math.floor(totalCount * 0.33),
        low: Math.floor(totalCount * 0.17)
      };
    } else {
      // Without signals: Lower quality distribution
      // High: ~25%, Medium: ~42%, Low: ~33%
      return {
        high: Math.floor(totalCount * 0.25),
        medium: Math.floor(totalCount * 0.42),
        low: Math.floor(totalCount * 0.33)
      };
    }
  };

  // Handle individual signal amount change
  const handleSignalAmountChange = (signalId: string, amount: number) => {
    setSignalAmounts(prev => ({ ...prev, [signalId]: amount }));
  };

  const toggleFilter = (id: string) => {
    setExpandedFilters(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const toggleAccountSelection = (id: number) => {
    setSelectedAccounts(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const openSaveIcpModal = () => {
    const defaultName = `Custom ICP ${new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })}`;
    setNewIcpName(defaultName);
    setSaveIcpError('');
    setShowSaveIcpModal(true);
  };

  const handleSaveIcp = () => {
    const icpName = newIcpName.trim();
    if (!icpName) {
      setSaveIcpError('ICP name is required.');
      return;
    }
    if (!canSaveIcp) {
      setSaveIcpError('Apply at least one filter or search query before saving.');
      return;
    }

    const filterPayload = Array.from(
      new Set([
        ...appliedFilterLabels,
        ...(searchQuery.trim() ? [`Company search: ${searchQuery.trim()}`] : []),
      ])
    );

    addSavedIcp({
      id: `icp-${Date.now()}`,
      name: icpName,
      source: 'db-search',
      createdAt: new Date().toISOString(),
      companyQuery: searchQuery.trim(),
      filters: filterPayload,
      signals: appliedSignalLabels,
      attributeSelections: appliedAttributeSelections.map(
        (item) => `${item.attribute}: ${item.values.join(', ')}`
      ),
    });

    setShowSaveIcpModal(false);
    setNewIcpName('');
    setSaveIcpError('');
    setNotificationMessage(`Saved "${icpName}" to Set-up ICPs.`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleAIDiscover = () => {
    // Reset all modal states
    setShowQualificationControl(false);
    setShowSetupSignals(false);
    setAccountsToQualify(0);

    // Open modal and start loading
    setShowAIModal(true);
    setAiModalState('loading');

    // Simulate AI processing
    setTimeout(() => {
      const count = hasSignals ? 55 : 12;
      setDiscoveredCount(count);
      setAccountsToQualify(count);

      // Generate ICP breakdown
      const breakdown = generateICPBreakdown(count, hasSignals);
      setIcpSegments(breakdown);

      setAiModalState('results');
    }, 3000);
  };

  const handleSetupSignals = () => {
    // Start signal computation loading
    setIsComputingSignals(true);
    setAiModalState('loading');

    // Simulate backend signal computation and ICP analysis
    setTimeout(() => {
      setIsComputingSignals(false);
      setShowSetupSignals(true);
      setAiModalState('results');
    }, 2500); // 2.5 second loading for signal computation
  };

  const toggleSignalSelection = (signalId: string) => {
    setSelectedSignals(prev =>
      prev.includes(signalId) ? prev.filter(s => s !== signalId) : [...prev, signalId]
    );
  };

  const handleCreateSignals = () => {
    if (selectedSignals.length === 0) return;

    setShowSetupSignals(false);
    setHasSignals(true);

    // Initialize signal amounts
    const initialAmounts: Record<string, number> = {};
    selectedSignals.forEach(signalId => {
      const signal = recommendedSignals.find(s => s.id === signalId);
      if (signal) {
        initialAmounts[signalId] = Math.min(signal.accountCount, maxICPAccounts);
      }
    });
    setSignalAmounts(initialAmounts);

    // Show loading then go directly to qualification control
    setAiModalState('loading');
    setTimeout(() => {
      setDiscoveredCount(55);
      setAiModalState('results');
      setShowQualificationControl(true);
    }, 3000);
  };

  const icpFilters = filterSections.filter(f => f.section === 'ICP');
  const accountFilters = filterSections.filter(f => f.section === 'ACCOUNT');

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg" style={{ backgroundColor: '#10b981' }}>
            <Check size={20} className="text-white" />
            <span className="text-sm font-medium text-white">{notificationMessage}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b" style={{ borderColor: '#e7e7e6' }}>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold" style={{ color: '#111928' }}>Search</h1>
              <button className="p-1 rounded hover:bg-gray-100">
                <Info size={16} style={{ color: '#706f69' }} />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowRechargeModal(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:shadow-md transition-all cursor-pointer group"
                style={{ backgroundColor: userCredits < 1000 ? '#fef2f2' : '#f3f5f5' }}
              >
                <Coins size={14} style={{ color: userCredits < 1000 ? '#ef4444' : '#f59e0b' }} />
                <span className="text-sm font-medium" style={{ color: userCredits < 1000 ? '#ef4444' : '#464544' }}>
                  {userCredits.toLocaleString()} Credits
                </span>
                {userCredits < 1000 && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: '#fecaca', color: '#ef4444' }}>LOW</span>
                )}
                <Plus size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#1c64f2' }} />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: '#1c64f2' }}>
                  PP
                </div>
                <span className="text-sm font-medium" style={{ color: '#111928' }}>Pied Piper</span>
                <ChevronDown size={14} style={{ color: '#706f69' }} />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
              style={{ backgroundColor: '#f3f5f5', color: '#111928' }}
            >
              <Building2 size={14} />
              Accounts
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              style={{ color: '#706f69' }}
            >
              <Users size={14} />
              Contacts
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="px-6 py-3 border-t flex items-center justify-between" style={{ borderColor: '#e7e7e6' }}>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold" style={{ color: '#111928' }}>Total</span>
              <span className="text-sm" style={{ color: '#706f69' }}>14.3M</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium" style={{ color: '#464544' }}>Net new</span>
              <span className="text-sm" style={{ color: '#706f69' }}>14.3M</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium" style={{ color: '#464544' }}>Saved accounts</span>
              <span className="text-sm" style={{ color: '#706f69' }}>2.8K</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex relative">
        {/* Filters Sidebar */}
        {showFilters && (
          <div className="w-72 bg-white border-r flex-shrink-0 h-[calc(100vh-180px)] overflow-y-auto" style={{ borderColor: '#e7e7e6' }}>
            {/* Filter Header */}
            <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: '#e7e7e6' }}>
              <div className="flex items-center gap-4">
                <button
                  className="text-sm font-medium pb-2 border-b-2"
                  style={{ color: '#1c64f2', borderColor: '#1c64f2' }}
                >
                  Filters
                </button>
                <button
                  className="text-sm font-medium pb-2 border-b-2 border-transparent"
                  style={{ color: '#706f69' }}
                >
                  Saved
                </button>
              </div>
              <button className="p-1 rounded hover:bg-gray-100">
                <X size={16} style={{ color: '#706f69' }} />
              </button>
            </div>

            {/* Search Filters */}
            <div className="p-4">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#706f69' }} />
                <input
                  type="text"
                  placeholder="Search filters"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  style={{ borderColor: '#e7e7e6', color: '#111928' }}
                />
              </div>
            </div>

            {/* ICP Section */}
            <div className="px-4 pb-2">
              <div className="text-xs font-semibold tracking-wide mb-2" style={{ color: '#706f69' }}>ICP</div>
            </div>

            <div className="px-2">
              {icpFilters.map(filter => (
                <div key={filter.id} className="mb-1">
                  <button
                    onClick={() => toggleFilter(filter.id)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <filter.icon size={14} style={{ color: '#706f69' }} />
                      <span className="text-sm" style={{ color: '#464544' }}>{filter.label}</span>
                      {filter.hasInfo && (
                        <div className="w-4 h-4 rounded-full border flex items-center justify-center" style={{ borderColor: '#e7e7e6' }}>
                          <span className="text-[10px]" style={{ color: '#706f69' }}>i</span>
                        </div>
                      )}
                    </div>
                    <ChevronDown
                      size={14}
                      style={{ color: '#706f69' }}
                      className={`transition-transform ${expandedFilters.includes(filter.id) ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* ACCOUNT Section */}
            <div className="px-4 py-2 mt-2">
              <div className="text-xs font-semibold tracking-wide mb-2" style={{ color: '#706f69' }}>ACCOUNT</div>
            </div>

            <div className="px-2 pb-24">
              {accountFilters.map(filter => (
                <div key={filter.id} className="mb-1">
                  <button
                    onClick={() => toggleFilter(filter.id)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <filter.icon size={14} style={{ color: '#706f69' }} />
                      <span className="text-sm" style={{ color: '#464544' }}>{filter.label}</span>
                      {filter.hasInfo && (
                        <div className="w-4 h-4 rounded-full border flex items-center justify-center" style={{ borderColor: '#e7e7e6' }}>
                          <span className="text-[10px]" style={{ color: '#706f69' }}>i</span>
                        </div>
                      )}
                    </div>
                    <ChevronDown
                      size={14}
                      style={{ color: '#706f69' }}
                      className={`transition-transform ${expandedFilters.includes(filter.id) ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* Bottom Actions - Fixed */}
            <div
              className="absolute bottom-0 left-0 w-72 bg-white border-t px-4 py-3 flex items-center justify-between gap-2"
              style={{ borderColor: '#e7e7e6' }}
            >
              <button
                className="h-9 px-2 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                style={{ color: '#464544' }}
              >
                Clear
              </button>
              <button
                type="button"
                onClick={openSaveIcpModal}
                className="h-9 px-2 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                style={{ color: '#464544' }}
              >
                Save ICP
              </button>
              <button
                className="h-9 px-3 text-sm font-semibold rounded-lg text-white hover:brightness-105 transition-all cursor-pointer"
                style={{ backgroundColor: '#1c64f2' }}
              >
                Save Search
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-4">
          {/* Search Bar */}
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer"
              style={{ borderColor: '#e7e7e6', color: '#464544' }}
            >
              <Filter size={14} />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>

            <div className="flex-1 relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#706f69' }} />
              <input
                type="text"
                placeholder="Search company name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-md pl-9 pr-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                style={{ borderColor: '#e7e7e6', color: '#111928' }}
              />
            </div>

            {/* AI Discovery Button */}
            <button
              onClick={handleAIDiscover}
              className="group cursor-pointer"
            >
              <div className="relative flex items-center gap-2 px-4 py-2 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #0e2933 0%, #1c64f2 100%)',
                }}
              >
                {/* Subtle glow effect on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, #1c64f2 0%, #0e2933 100%)',
                  }}
                />

                {/* Shine effect */}
                <div className="absolute inset-0 opacity-20 overflow-hidden">
                  <div
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    }}
                  />
                </div>

                {/* Content */}
                <div className="relative flex items-center gap-2">
                  <div className="relative">
                    <Sparkles size={16} className="text-white" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#10b981' }} />
                  </div>
                  <span className="text-white font-semibold text-sm whitespace-nowrap">
                    AI Discover
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: '#e7e7e6' }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ borderColor: '#e7e7e6', backgroundColor: '#f9fafb' }}>
                    <th className="w-10 px-3 py-3">
                      <input type="checkbox" className="rounded border-gray-300 cursor-pointer" />
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-semibold" style={{ color: '#464544' }}>Account Name</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold" style={{ color: '#464544' }}>Actions</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold" style={{ color: '#464544' }}>Primary Industry</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold" style={{ color: '#464544' }}>Sub Industry</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold" style={{ color: '#464544' }}>Other Industries</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold" style={{ color: '#464544' }}>Revenue</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold" style={{ color: '#464544' }}>Employee Range</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold" style={{ color: '#464544' }}>Employee Count</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold" style={{ color: '#464544' }}>Global Presence</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold" style={{ color: '#464544' }}>Latest Funding</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAccounts.map((account) => (
                    <tr
                      key={account.id}
                      className="border-b hover:bg-gray-50 transition-colors cursor-pointer"
                      style={{ borderColor: '#e7e7e6' }}
                    >
                      <td className="px-3 py-3">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 cursor-pointer"
                          checked={selectedAccounts.includes(account.id)}
                          onChange={() => toggleAccountSelection(account.id)}
                        />
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ backgroundColor: '#f3f5f5' }}>
                            {account.logo}
                          </div>
                          <Link
                            href={`/account-details/${account.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com/overview`}
                            className="text-sm font-medium hover:underline"
                            style={{ color: '#111928' }}
                          >
                            {account.name}
                          </Link>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 rounded hover:bg-gray-100 transition-colors cursor-pointer">
                            <ExternalLink size={14} style={{ color: '#706f69' }} />
                          </button>
                          <button className="p-1.5 rounded hover:bg-gray-100 transition-colors cursor-pointer">
                            <MoreHorizontal size={14} style={{ color: '#706f69' }} />
                          </button>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-sm" style={{ color: '#464544' }}>{account.primaryIndustry}</td>
                      <td className="px-3 py-3 text-sm" style={{ color: '#464544' }}>{account.subIndustry}</td>
                      <td className="px-3 py-3 text-sm" style={{ color: '#706f69' }}>{account.otherIndustries}</td>
                      <td className="px-3 py-3 text-sm" style={{ color: '#464544' }}>{account.revenue}</td>
                      <td className="px-3 py-3 text-sm" style={{ color: '#464544' }}>{account.employeeRange}</td>
                      <td className="px-3 py-3 text-sm" style={{ color: '#464544' }}>{account.employeeCount}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-1">
                          <span className="text-sm" style={{ color: '#464544' }}>{account.globalPresence}</span>
                          <span className="text-sm" style={{ color: '#706f69' }}>{account.presenceCount}</span>
                          <span className="text-xs" style={{ color: '#10b981' }}>{account.change}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-sm" style={{ color: '#464544' }}>{account.fundingDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-4 py-3 border-t flex items-center justify-between" style={{ borderColor: '#e7e7e6' }}>
              <div className="flex items-center gap-2 text-sm" style={{ color: '#706f69' }}>
                Showing rows per Page:
                <select className="border rounded px-2 py-1 text-sm cursor-pointer" style={{ borderColor: '#e7e7e6' }}>
                  <option>20</option>
                  <option>50</option>
                  <option>100</option>
                </select>
              </div>
              <div className="flex items-center gap-2 text-sm" style={{ color: '#706f69' }}>
                1 - 20 of <span className="font-medium" style={{ color: '#111928' }}>14,280,274</span> items
                <div className="flex items-center gap-1 ml-2">
                  <button className="p-1 rounded hover:bg-gray-100 transition-colors cursor-pointer">
                    <ChevronDown size={14} className="rotate-90" />
                  </button>
                  <span className="px-2">1</span>
                  <button className="p-1 rounded hover:bg-gray-100 transition-colors cursor-pointer">
                    <ChevronDown size={14} className="-rotate-90" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save ICP Modal */}
      {showSaveIcpModal && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={() => {
              setShowSaveIcpModal(false);
              setSaveIcpError('');
            }}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="w-full max-w-[560px] rounded-2xl border bg-white shadow-xl"
              style={{ borderColor: '#dbe1e6' }}
            >
              <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#e7e7e6' }}>
                <div>
                  <h3 className="text-[20px] font-semibold" style={{ color: '#1f2f3a' }}>
                    Save as Custom ICP
                  </h3>
                  <p className="text-[13px] mt-1" style={{ color: '#6f7b86' }}>
                    Save current DB Search filters to Settings → Set-up ICPs.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowSaveIcpModal(false);
                    setSaveIcpError('');
                  }}
                  className="h-8 w-8 rounded-lg inline-flex items-center justify-center hover:bg-[#f3f5f7]"
                >
                  <X size={16} style={{ color: '#6f7b86' }} />
                </button>
              </div>

              <div className="px-5 py-4 space-y-4">
                <div>
                  <label
                    htmlFor="custom-icp-name"
                    className="text-[12px] font-semibold uppercase tracking-wide"
                    style={{ color: '#66737f' }}
                  >
                    ICP Name
                  </label>
                  <input
                    id="custom-icp-name"
                    value={newIcpName}
                    onChange={(event) => setNewIcpName(event.target.value)}
                    className="mt-1 w-full h-10 px-3 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                    style={{ borderColor: '#dbe1e6', color: '#1f2f3a' }}
                    placeholder="e.g. India Mid-Market Logistics ICP"
                  />
                </div>

                <div className="rounded-lg border p-3" style={{ borderColor: '#e7e7e6', backgroundColor: '#f8fafb' }}>
                  <p className="text-[12px] font-semibold" style={{ color: '#5f6d79' }}>
                    ICP Attributes
                  </p>
                  <p className="text-[11px] mt-1" style={{ color: '#7a8792' }}>
                    Selected values that will be saved under this custom ICP type.
                  </p>
                  <div
                    className="mt-2 rounded-md border px-2.5 py-2 text-[11px] font-medium"
                    style={{ borderColor: '#dbe5f2', backgroundColor: '#edf4ff', color: '#37516b' }}
                  >
                    Scoring set: all selected filters are combined for custom ICP fitment.
                  </div>

                  <div className="space-y-2 mt-2 max-h-[220px] overflow-y-auto pr-0.5">
                    {appliedAttributeSelections.map((item) => (
                      <div
                        key={`${item.attribute}-${item.values.join('|')}`}
                        className="rounded-md border px-2.5 py-2 bg-white"
                        style={{ borderColor: '#e3e8ed' }}
                      >
                        <p className="text-[11px] font-semibold" style={{ color: '#3d4f61' }}>
                          {item.attribute}
                        </p>
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {item.values.map((value) => (
                            <span
                              key={`${item.attribute}-${value}`}
                              className="px-2 py-1 rounded-md text-[10px] font-medium"
                              style={{ backgroundColor: '#edf3fb', color: '#3c556c' }}
                            >
                              {value}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                    {!canSaveIcp && (
                      <span className="text-[12px]" style={{ color: '#9aa3ad' }}>
                        No attributes selected yet.
                      </span>
                    )}
                  </div>
                </div>

                {saveIcpError && (
                  <p className="text-[12px] font-medium" style={{ color: '#dc2626' }}>
                    {saveIcpError}
                  </p>
                )}
              </div>

              <div className="px-5 py-4 border-t flex items-center justify-between" style={{ borderColor: '#e7e7e6' }}>
                <Link
                  href="/settings/setup-icps"
                  className="text-[13px] font-medium underline"
                  style={{ color: '#2563eb' }}
                >
                  Open Set-up ICPs
                </Link>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowSaveIcpModal(false);
                      setSaveIcpError('');
                    }}
                    className="h-9 px-3 rounded-lg border text-sm font-medium"
                    style={{ borderColor: '#dbe1e6', color: '#4b5a67' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveIcp}
                    className="h-9 px-3 rounded-lg text-sm font-semibold text-white"
                    style={{ backgroundColor: '#1c64f2' }}
                  >
                    Save ICP
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* AI Discovery Modal */}
      {showAIModal && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
            onClick={() => setShowAIModal(false)}
          />

          {/* Modal */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50">
            <div
              className="bg-white rounded-3xl shadow-2xl overflow-hidden"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
            >
              {/* Modal Header with gradient */}
              <div
                className="relative px-6 py-5"
                style={{
                  background: 'linear-gradient(135deg, #0e2933 0%, #1c64f2 100%)',
                }}
              >
                {/* Close button */}
                <button
                  onClick={() => setShowAIModal(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <X size={16} className="text-white" />
                </button>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur">
                    <Radar size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">AI Account Discovery</h3>
                    <p className="text-sm text-white/70">Powered by signal intelligence</p>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {aiModalState === 'loading' || aiModalState === 'qualifying' ? (
                  /* Loading State */
                  <div className="py-6">
                    {/* Animated loader */}
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        {/* Outer ring */}
                        <div
                          className="w-20 h-20 rounded-full border-4 border-gray-100 animate-spin"
                          style={{ borderTopColor: '#1c64f2' }}
                        />
                        {/* Inner icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Sparkles size={28} style={{ color: '#1c64f2' }} className="animate-pulse" />
                        </div>
                      </div>
                    </div>

                    {/* Loading text */}
                    <div className="text-center mb-6">
                      <p className="text-base font-semibold mb-2" style={{ color: '#111928' }}>
                        {isComputingSignals
                          ? 'Computing signals and running ICP analysis...'
                          : hasSignals
                            ? 'Analyzing your ICP signals...'
                            : 'Running basic account matching...'
                        }
                      </p>
                      <p className="text-sm" style={{ color: '#706f69' }}>
                        {isComputingSignals
                          ? 'Calculating account quality for each signal'
                          : 'Scanning 14.3M accounts for best matches'
                        }
                      </p>
                    </div>

                    {/* Progress steps */}
                    <div className="space-y-3 max-w-xs mx-auto">
                      {(isComputingSignals ? [
                        // Signal computation loading steps
                        { text: 'Computing signals and ICP analysis', done: false, highlight: true, warning: false },
                        { text: 'Finding fresh accounts', done: false, highlight: false, warning: false },
                        { text: 'Analyzing account quality', done: false, highlight: false, warning: false },
                      ] : hasSignals ? [
                        // Existing "with signals" steps (removed "Excluding already qualified")
                        { text: 'Reading your ICP criteria', done: true, highlight: false, warning: false },
                        { text: 'Finding fresh accounts', done: true, highlight: true, warning: false },
                        { text: 'Ranking by signal strength', done: showQualificationControl || aiModalState === 'qualifying', highlight: false, warning: false },
                      ] : [
                        // Existing "without signals" steps
                        { text: 'Reading your ICP criteria', done: true, highlight: false, warning: false },
                        { text: 'Basic firmographic matching', done: true, highlight: false, warning: false },
                        { text: 'No signals configured', done: false, highlight: false, warning: true },
                        { text: 'Limited results available', done: false, highlight: false, warning: false },
                      ]).map((step, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${step.done ? '' : 'animate-pulse'}`}
                            style={{
                              backgroundColor: step.done ? '#10b981' : (step.warning ? '#f59e0b' : '#e7e7e6'),
                            }}
                          >
                            {step.done && <Check size={12} className="text-white" />}
                            {step.warning && <span className="text-white text-xs">!</span>}
                          </div>
                          <span
                            className={`text-sm ${step.highlight ? 'font-medium' : ''}`}
                            style={{ color: step.done ? '#111928' : (step.warning ? '#f59e0b' : '#706f69') }}
                          >
                            {step.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Info note */}
                    <div className="mt-6 px-4 py-3 rounded-xl text-center" style={{
                      backgroundColor: isComputingSignals ? '#eff6ff' : hasSignals ? '#f0fdf4' : '#fef3c7'
                    }}>
                      <p className="text-xs" style={{
                        color: isComputingSignals ? '#1c64f2' : hasSignals ? '#10b981' : '#d97706'
                      }}>
                        {isComputingSignals
                          ? 'Analyzing signal quality across High, Medium, and Low ICP tiers...'
                          : hasSignals
                            ? "You'll only see accounts you haven't qualified yet"
                            : "Add signals to unlock 3x more account matches"
                        }
                      </p>
                    </div>
                  </div>
                ) : aiModalState === 'success' ? (
                  /* Success State */
                  <div className="py-8 text-center">
                    <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#10b981' }}>
                      <Check size={32} className="text-white" />
                    </div>
                    <h4 className="text-lg font-bold mb-2" style={{ color: '#111928' }}>
                      Accounts Qualified!
                    </h4>
                    <p className="text-sm" style={{ color: '#706f69' }}>
                      Qualifying {getTotalSelectedAccounts()} accounts to Target Account List
                    </p>
                  </div>
                ) : (
                  /* Results State */
                  <div className="py-2">
                    {showQualificationControl ? (
                      /* Qualification Control View */
                      <div className="py-2">
                        <div className="text-center mb-6">
                          <h4 className="text-lg font-bold mb-2" style={{ color: '#111928' }}>
                            Qualify Accounts
                          </h4>
                          <p className="text-sm" style={{ color: '#706f69' }}>
                            Select accounts to qualify from {selectedSignals.length} signal{selectedSignals.length > 1 ? 's' : ''}
                            <span className="ml-1 text-xs px-2 py-0.5 rounded" style={{ backgroundColor: '#f0fdf4', color: '#10b981' }}>
                              {maxICPAccounts} max per signal
                            </span>
                          </p>
                        </div>

                        {/* Per-Signal Distribution with Individual Sliders */}
                        <div className="mb-4">
                          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#706f69' }}>
                            Distribution by signal
                          </p>

                          <div className="space-y-3">
                            {selectedSignals.map(signalId => {
                              const signal = recommendedSignals.find(s => s.id === signalId);
                              if (!signal) return null;

                              const maxAvailable = Math.min(signal.accountCount, maxICPAccounts);
                              const currentAmount = signalAmounts[signalId] || 0;
                              const percentage = maxAvailable > 0 ? Math.round((currentAmount / maxAvailable) * 100) : 0;

                              return (
                                <div key={signalId} className="space-y-1.5">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <div
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: signal.color }}
                                      />
                                      <span className="text-sm font-medium" style={{ color: '#464544' }}>
                                        {signal.name}
                                      </span>
                                    </div>
                                    <div className="text-right">
                                      <span className="text-sm font-bold" style={{ color: '#111928' }}>
                                        {currentAmount}
                                      </span>
                                      <span className="text-xs ml-1" style={{ color: '#706f69' }}>
                                        of {maxAvailable}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Slider */}
                                  <input
                                    type="range"
                                    min="0"
                                    max={maxAvailable}
                                    value={currentAmount}
                                    onChange={(e) => handleSignalAmountChange(signalId, Number(e.target.value))}
                                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                                    style={{
                                      background: `linear-gradient(to right, ${signal.color} 0%, ${signal.color} ${percentage}%, #e7e7e6 ${percentage}%, #e7e7e6 100%)`,
                                    }}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Account Preview Section */}
                        {getTotalSelectedAccounts() > 0 && (
                          <div className="mb-4">
                            <h5 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#706f69' }}>
                              Preview ({getTotalSelectedAccounts() > 3 ? `3 of ${getTotalSelectedAccounts()}` : getTotalSelectedAccounts()} accounts)
                            </h5>
                            <div className="space-y-2">
                              {[
                                { name: 'Repsol, S.A.', logo: '🛢️', signals: selectedSignals.slice(0, 2) },
                                { name: 'Home Credit India', logo: '🏦', signals: selectedSignals.slice(0, 1) },
                                { name: 'Nuvoco Vistas Corp', logo: '🏗️', signals: selectedSignals.length > 1 ? selectedSignals.slice(1, 3) : selectedSignals }
                              ].slice(0, 3).map((account, idx) => (
                                <div
                                  key={idx}
                                  className="px-3 py-2.5 rounded-lg border"
                                  style={{
                                    backgroundColor: '#ffffff',
                                    borderColor: '#e7e7e6'
                                  }}
                                >
                                  <div className="flex items-center gap-2.5 mb-1.5">
                                    <span className="text-lg">{account.logo}</span>
                                    <h6 className="text-sm font-semibold flex-1" style={{ color: '#111928' }}>
                                      {account.name}
                                    </h6>
                                  </div>
                                  <div className="flex flex-wrap gap-1.5 ml-7">
                                    {account.signals.map(signalId => {
                                      const signal = recommendedSignals.find(s => s.id === signalId);
                                      if (!signal) return null;
                                      return (
                                        <span
                                          key={signalId}
                                          className="px-2 py-0.5 rounded-full text-xs font-medium"
                                          style={{
                                            backgroundColor: signal.color + '20',
                                            color: signal.color
                                          }}
                                        >
                                          {signal.name}
                                        </span>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>
                            {getTotalSelectedAccounts() > 3 && (
                              <p className="text-xs text-center mt-2" style={{ color: '#706f69' }}>
                                +{getTotalSelectedAccounts() - 3} more accounts
                              </p>
                            )}
                          </div>
                        )}

                        {/* Credit Calculation */}
                        <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: '#f9fafb', border: '1px solid #e7e7e6' }}>
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="text-xs" style={{ color: '#706f69' }}>Total accounts</p>
                              <p className="text-sm font-bold" style={{ color: '#111928' }}>
                                {getTotalSelectedAccounts()} accounts
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs" style={{ color: '#706f69' }}>Total cost</p>
                              <p className="text-lg font-bold" style={{ color: '#111928' }}>
                                {calculateCredits(getTotalSelectedAccounts()).total} credits
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: '#e7e7e6' }}>
                            <span className="text-xs" style={{ color: '#706f69' }}>Rate per account</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium" style={{ color: '#464544' }}>
                                {calculateCredits(getTotalSelectedAccounts()).perAccount} cr
                              </span>
                              {calculateCredits(getTotalSelectedAccounts()).tier === 'bulk' && (
                                <span className="px-1.5 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>
                                  25% off
                                </span>
                              )}
                              {calculateCredits(getTotalSelectedAccounts()).tier === 'premium' && (
                                <span className="px-1.5 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: '#d1fae5', color: '#059669' }}>
                                  50% off
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <button
                          onClick={() => {
                            const totalAccounts = getTotalSelectedAccounts();
                            const creditInfo = calculateCredits(totalAccounts);
                            if (creditInfo.total <= userCredits) {
                              setUserCredits(prev => prev - creditInfo.total);
                              setShowQualificationControl(false);

                              // Show qualifying loader
                              setAiModalState('qualifying');

                              // After 2 seconds, show success message
                              setTimeout(() => {
                                setAiModalState('success');

                                // After 2 seconds, close and show notification
                                setTimeout(() => {
                                  setShowAIModal(false);
                                  setNotificationMessage(`${totalAccounts} accounts qualified successfully!`);
                                  setShowNotification(true);
                                  setTimeout(() => setShowNotification(false), 3000);

                                  // Reset
                                  setAiModalState('loading');
                                  setShowQualificationControl(false);
                                }, 2000);
                              }, 2000);
                            }
                          }}
                          disabled={getTotalSelectedAccounts() === 0 || calculateCredits(getTotalSelectedAccounts()).total > userCredits}
                          className={`w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all mb-3 ${
                            getTotalSelectedAccounts() > 0 && calculateCredits(getTotalSelectedAccounts()).total <= userCredits
                              ? 'hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                              : 'opacity-50 cursor-not-allowed'
                          }`}
                          style={{
                            background: getTotalSelectedAccounts() > 0 && calculateCredits(getTotalSelectedAccounts()).total <= userCredits
                              ? 'linear-gradient(135deg, #0e2933 0%, #1c64f2 100%)'
                              : '#9ca3af',
                          }}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <Zap size={18} />
                            {getTotalSelectedAccounts() === 0
                              ? 'Select accounts to qualify'
                              : `Qualify ${getTotalSelectedAccounts()} Account${getTotalSelectedAccounts() > 1 ? 's' : ''}`
                            }
                          </div>
                        </button>
                      </div>
                    ) : showSetupSignals ? (
                      /* Signal Selection Screen */
                      <div className="py-2">
                        <div className="text-center mb-6">
                          <h4 className="text-lg font-bold mb-2" style={{ color: '#111928' }}>
                            Add Signals to Unlock More
                          </h4>
                          <p className="text-sm" style={{ color: '#706f69' }}>
                            Select the signals you want to track
                          </p>
                        </div>

                        {/* Section Label */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="p-1 rounded" style={{ backgroundColor: '#dbeafe' }}>
                            <Sparkles size={12} style={{ color: '#1c64f2' }} />
                          </div>
                          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#1c64f2' }}>
                            Sprouts AI Recommended
                          </span>
                        </div>

                        <p className="text-xs mb-3" style={{ color: '#706f69' }}>
                          Account counts based on Sprouts recommended ICP
                        </p>

                        {/* Recommended Signals - Selectable */}
                        <div className="space-y-3 mb-4">
                          {recommendedSignals.map((signal) => {
                            const isSelected = selectedSignals.includes(signal.id);
                            return (
                              <div
                                key={signal.id}
                                onClick={() => toggleSignalSelection(signal.id)}
                                className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                                  isSelected ? 'border-blue-500 bg-blue-50/50' : 'hover:border-blue-300 hover:bg-blue-50/30'
                                }`}
                                style={{ borderColor: isSelected ? '#1c64f2' : '#e7e7e6' }}
                              >
                                <div className="flex items-center gap-3">
                                  {/* Checkbox */}
                                  <div
                                    className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
                                      isSelected ? 'bg-blue-600' : 'border-2'
                                    }`}
                                    style={{ borderColor: isSelected ? 'transparent' : '#e7e7e6' }}
                                  >
                                    {isSelected && <Check size={14} className="text-white" />}
                                  </div>
                                  <div
                                    className="p-2 rounded-lg"
                                    style={{ backgroundColor: `${signal.color}15` }}
                                  >
                                    <signal.icon size={18} style={{ color: signal.color }} />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium" style={{ color: '#111928' }}>{signal.name}</p>
                                    <p className="text-xs" style={{ color: '#706f69' }}>{signal.description}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-lg font-bold mb-2" style={{ color: '#10b981' }}>{signal.accountCount}</p>
                                  <p className="text-xs mb-2" style={{ color: '#706f69' }}>accounts</p>

                                  {/* ICP Segmentation Mini Cards */}
                                  <div className="flex items-center gap-1 justify-end">
                                    {/* High ICP */}
                                    <div className="px-2 py-1 rounded" style={{ backgroundColor: '#f0fdf4' }}>
                                      <p className="text-xs font-bold" style={{ color: '#10b981' }}>{signal.icp.high}</p>
                                      <p className="text-[10px]" style={{ color: '#10b981' }}>High</p>
                                    </div>

                                    {/* Medium ICP */}
                                    <div className="px-2 py-1 rounded" style={{ backgroundColor: '#eff6ff' }}>
                                      <p className="text-xs font-bold" style={{ color: '#1c64f2' }}>{signal.icp.medium}</p>
                                      <p className="text-[10px]" style={{ color: '#1c64f2' }}>Med</p>
                                    </div>

                                    {/* Low ICP */}
                                    <div className="px-2 py-1 rounded" style={{ backgroundColor: '#fef3c7' }}>
                                      <p className="text-xs font-bold" style={{ color: '#f59e0b' }}>{signal.icp.low}</p>
                                      <p className="text-[10px]" style={{ color: '#f59e0b' }}>Low</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Selected Count */}
                        {selectedSignals.length > 0 && (
                          <div className="px-4 py-3 rounded-xl mb-4 flex items-center justify-between" style={{ backgroundColor: '#f0fdf4' }}>
                            <p className="text-sm font-medium" style={{ color: '#10b981' }}>
                              {selectedSignals.length} signal{selectedSignals.length > 1 ? 's' : ''} selected
                            </p>
                            <p className="text-sm" style={{ color: '#10b981' }}>
                              {selectedSignals.reduce((sum, id) =>
                                sum + (recommendedSignals.find(s => s.id === id)?.accountCount || 0), 0
                              )} total accounts
                            </p>
                          </div>
                        )}

                        {/* Social Proof */}
                        <div className="px-4 py-3 rounded-xl mb-6 text-center" style={{ backgroundColor: '#f0f9ff' }}>
                          <p className="text-xs" style={{ color: '#0369a1' }}>
                            <span className="font-semibold">Pro tip:</span> Teams with 4+ signals find 3x more qualified accounts
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <button
                          onClick={handleCreateSignals}
                          disabled={selectedSignals.length === 0}
                          className={`w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all mb-3 ${
                            selectedSignals.length > 0
                              ? 'hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                              : 'opacity-50 cursor-not-allowed'
                          }`}
                          style={{
                            background: selectedSignals.length > 0
                              ? 'linear-gradient(135deg, #0e2933 0%, #1c64f2 100%)'
                              : '#9ca3af',
                          }}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <Sparkles size={18} />
                            {selectedSignals.length > 0
                              ? `Create ${selectedSignals.length} Signal${selectedSignals.length > 1 ? 's' : ''} & View Results`
                              : 'Select Signals to Continue'
                            }
                          </div>
                        </button>
                        <button
                          onClick={() => setShowSetupSignals(false)}
                          className="w-full py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100 cursor-pointer"
                          style={{ color: '#706f69' }}
                        >
                          Back to results
                        </button>
                      </div>
                    ) : !hasSignals ? (
                      /* Limited Results - No Signals */
                      <div className="py-2">
                        {/* Limited Results Badge */}
                        <div className="text-center mb-4">
                          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#fef3c7' }}>
                            <Zap size={16} style={{ color: '#d97706' }} />
                            <span className="text-sm font-medium" style={{ color: '#d97706' }}>Limited Results</span>
                          </div>
                        </div>

                        {/* ICP Segmentation Display */}
                        <div className="mb-6">
                          <h4 className="text-base font-semibold mb-3 text-center" style={{ color: '#111928' }}>
                            {discoveredCount} Accounts Found
                          </h4>

                          {/* ICP Segment Cards */}
                          <div className="grid grid-cols-3 gap-3 mb-3">
                            {/* High ICP */}
                            <div className="p-4 rounded-xl border-2" style={{ borderColor: '#10b981', backgroundColor: '#f0fdf4' }}>
                              <div className="text-center">
                                <div className="w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center" style={{ backgroundColor: '#10b981' }}>
                                  <TrendingUp size={20} className="text-white" />
                                </div>
                                <p className="text-2xl font-bold mb-1" style={{ color: '#10b981' }}>
                                  {icpSegments.high}
                                </p>
                                <p className="text-xs font-medium" style={{ color: '#10b981' }}>High ICP</p>
                              </div>
                            </div>

                            {/* Medium ICP */}
                            <div className="p-4 rounded-xl border-2" style={{ borderColor: '#1c64f2', backgroundColor: '#eff6ff' }}>
                              <div className="text-center">
                                <div className="w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1c64f2' }}>
                                  <Target size={20} className="text-white" />
                                </div>
                                <p className="text-2xl font-bold mb-1" style={{ color: '#1c64f2' }}>
                                  {icpSegments.medium}
                                </p>
                                <p className="text-xs font-medium" style={{ color: '#1c64f2' }}>Medium ICP</p>
                              </div>
                            </div>

                            {/* Low ICP */}
                            <div className="p-4 rounded-xl border-2" style={{ borderColor: '#f59e0b', backgroundColor: '#fef3c7' }}>
                              <div className="text-center">
                                <div className="w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f59e0b' }}>
                                  <Zap size={20} className="text-white" />
                                </div>
                                <p className="text-2xl font-bold mb-1" style={{ color: '#f59e0b' }}>
                                  {icpSegments.low}
                                </p>
                                <p className="text-xs font-medium" style={{ color: '#f59e0b' }}>Low ICP</p>
                              </div>
                            </div>
                          </div>

                          {/* Explanation text */}
                          <p className="text-xs text-center mb-2" style={{ color: '#706f69' }}>
                            Add signals to improve ICP matching accuracy
                          </p>

                          {/* Loss Aversion - Show what they're missing */}
                          <p className="text-sm text-center" style={{ color: '#706f69' }}>
                            You could find <span className="font-bold" style={{ color: '#10b981' }}>55+ accounts</span> with signals
                          </p>
                        </div>

                        {/* Progress Ring - Endowed Progress Effect */}
                        <div className="flex items-center justify-center gap-4 mb-6 p-4 rounded-xl" style={{ backgroundColor: '#f9fafb' }}>
                          <div className="relative w-16 h-16">
                            <svg className="w-16 h-16 transform -rotate-90">
                              <circle cx="32" cy="32" r="28" fill="none" stroke="#e7e7e6" strokeWidth="6" />
                              <circle cx="32" cy="32" r="28" fill="none" stroke="#f59e0b" strokeWidth="6"
                                strokeDasharray={`${0.2 * 176} 176`}
                                strokeLinecap="round"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-lg font-bold" style={{ color: '#111928' }}>1/5</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-semibold" style={{ color: '#111928' }}>Signal Setup: 20%</p>
                            <p className="text-xs" style={{ color: '#706f69' }}>Add 4 more signals to maximize discovery</p>
                          </div>
                        </div>

                        {/* Sample of what they found */}
                        <div className="mb-4">
                          <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#706f69' }}>
                            Basic matches found
                          </p>
                          <div className="space-y-2">
                            {['DataFlow Inc', 'Nexus Systems'].map((name, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between px-3 py-2 rounded-lg"
                                style={{ backgroundColor: '#f9fafb' }}
                              >
                                <div className="flex items-center gap-2">
                                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: '#706f69' }}>
                                    {name.charAt(0)}
                                  </div>
                                  <span className="text-sm" style={{ color: '#464544' }}>{name}</span>
                                </div>
                                <div className="flex items-center gap-1 px-2 py-1 rounded-full" style={{ backgroundColor: '#f3f4f6' }}>
                                  <span className="text-xs" style={{ color: '#706f69' }}>Basic match</span>
                                </div>
                              </div>
                            ))}
                            <p className="text-xs text-center" style={{ color: '#706f69' }}>
                              + {discoveredCount - 2} more basic matches
                            </p>
                          </div>
                        </div>

                        {/* Unlock More - Primary CTA */}
                        <div className="p-4 rounded-xl border-2 border-dashed mb-4" style={{ borderColor: '#1c64f2', backgroundColor: '#eff6ff' }}>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg" style={{ backgroundColor: '#dbeafe' }}>
                              <Radar size={20} style={{ color: '#1c64f2' }} />
                            </div>
                            <div>
                              <p className="text-sm font-semibold" style={{ color: '#111928' }}>Unlock 43+ more accounts</p>
                              <p className="text-xs" style={{ color: '#706f69' }}>Setup signals to find high-intent buyers</p>
                            </div>
                          </div>
                          <button
                            onClick={handleSetupSignals}
                            className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                            style={{
                              background: 'linear-gradient(135deg, #0e2933 0%, #1c64f2 100%)',
                            }}
                          >
                            <div className="flex items-center justify-center gap-2">
                              <Sparkles size={16} />
                              Setup Signals Now
                            </div>
                          </button>
                        </div>

                        {/* Secondary CTA - Qualify basic matches */}
                        <button
                          onClick={() => {
                            // Directly qualify the 12 basic accounts
                            const creditInfo = calculateCredits(discoveredCount);
                            if (creditInfo.total <= userCredits) {
                              setUserCredits(prev => prev - creditInfo.total);

                              // Show qualifying loader
                              setAiModalState('qualifying');

                              setTimeout(() => {
                                setAiModalState('success');

                                setTimeout(() => {
                                  setShowAIModal(false);
                                  setNotificationMessage(`${discoveredCount} accounts qualified successfully!`);
                                  setShowNotification(true);
                                  setTimeout(() => setShowNotification(false), 3000);

                                  // Reset
                                  setAiModalState('loading');
                                }, 2000);
                              }, 2000);
                            }
                          }}
                          className="w-full py-2.5 rounded-xl border text-sm font-medium transition-colors hover:bg-gray-50 cursor-pointer"
                          style={{ borderColor: '#e7e7e6', color: '#464544' }}
                        >
                          <span>Qualify {discoveredCount} accounts</span>
                          <span className="ml-2 px-2 py-0.5 rounded text-xs" style={{ backgroundColor: '#f3f4f6', color: '#706f69' }}>
                            {calculateCredits(discoveredCount).total} credits
                          </span>
                        </button>
                      </div>
                    ) : (
                      /* Fallback - Should never reach here but prevents blank screen */
                      <div className="py-8 text-center">
                        <p className="text-sm" style={{ color: '#706f69' }}>
                          Loading...
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Credit Recharge Modal - Apple-like Minimalist Design */}
      {showRechargeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => {
              if (!isProcessingPayment) {
                setShowRechargeModal(false);
                setPaymentSuccess(false);
                setShowCustomAmount(false);
              }
            }}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl w-full max-w-md mx-4 overflow-hidden" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            {/* Modal Header - Clean & Minimal */}
            <div className="px-6 pt-6 pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight" style={{ color: '#1d1d1f' }}>Recharge Credits</h2>
                  <p className="text-sm mt-1" style={{ color: '#86868b' }}>Select the number of credits you want to add</p>
                </div>
                <button
                  onClick={() => {
                    if (!isProcessingPayment) {
                      setShowRechargeModal(false);
                      setPaymentSuccess(false);
                      setShowCustomAmount(false);
                    }
                  }}
                  className="p-1 -mr-1 -mt-1 rounded-full hover:bg-black/5 transition-colors"
                >
                  <X size={20} style={{ color: '#86868b' }} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="px-6 pb-6 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 180px)' }}>
              {paymentSuccess ? (
                /* Success State - Minimal */
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ backgroundColor: '#f5f5f7' }}>
                    <Check size={32} style={{ color: '#1d1d1f' }} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-lg font-semibold mb-1" style={{ color: '#1d1d1f' }}>Payment Successful</h3>
                  <p className="text-sm mb-6" style={{ color: '#86868b' }}>
                    Credits have been added to your account
                  </p>
                  <div className="text-left space-y-3 py-4 border-t border-b mb-6" style={{ borderColor: '#e8e8ed' }}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: '#86868b' }}>Previous Balance</span>
                      <span className="text-sm font-medium" style={{ color: '#1d1d1f' }}>
                        {(userCredits - (showCustomAmount ? customCredits : creditPackages.find(p => p.id === selectedPackage)?.totalCredits || 0)).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: '#86868b' }}>Credits Added</span>
                      <span className="text-sm font-medium" style={{ color: '#1d1d1f' }}>
                        +{showCustomAmount ? customCredits.toLocaleString() : (creditPackages.find(p => p.id === selectedPackage)?.totalCredits || 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #e8e8ed' }}>
                      <span className="text-sm font-medium" style={{ color: '#1d1d1f' }}>New Balance</span>
                      <span className="text-lg font-semibold" style={{ color: '#1d1d1f' }}>{userCredits.toLocaleString()}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowRechargeModal(false);
                      setPaymentSuccess(false);
                    }}
                    className="w-full py-3 rounded-xl font-medium text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: '#1d1d1f' }}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  {/* Credits Input - Clean & Prominent */}
                  <div className="mb-6">
                    <label className="text-xs font-medium uppercase tracking-wide mb-2 block" style={{ color: '#86868b' }}>
                      Credits to add
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <Coins size={18} style={{ color: '#86868b' }} />
                      </div>
                      <input
                        type="text"
                        value={showCustomAmount ? customCredits.toLocaleString() : (creditPackages.find(p => p.id === selectedPackage)?.totalCredits || 0).toLocaleString()}
                        readOnly
                        className="w-full pl-12 pr-4 py-4 text-2xl font-semibold rounded-xl border-2 focus:outline-none transition-colors"
                        style={{ borderColor: '#e8e8ed', color: '#1d1d1f', backgroundColor: '#fafafa' }}
                      />
                    </div>
                  </div>

                  {/* Slider */}
                  <div className="mb-8">
                    <input
                      type="range"
                      min="500"
                      max="100000"
                      step="500"
                      value={showCustomAmount ? customCredits : (creditPackages.find(p => p.id === selectedPackage)?.credits || 5000)}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setShowCustomAmount(true);
                        setCustomCredits(value);
                      }}
                      className="w-full h-1 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #1d1d1f 0%, #1d1d1f ${((showCustomAmount ? customCredits : creditPackages.find(p => p.id === selectedPackage)?.credits || 5000) - 500) / 995}%, #e8e8ed ${((showCustomAmount ? customCredits : creditPackages.find(p => p.id === selectedPackage)?.credits || 5000) - 500) / 995}%, #e8e8ed 100%)`,
                        accentColor: '#1d1d1f'
                      }}
                    />
                    <div className="flex justify-between mt-2 text-xs" style={{ color: '#86868b' }}>
                      <span>500</span>
                      <span>25K</span>
                      <span>50K</span>
                      <span>75K</span>
                      <span>100K</span>
                    </div>
                  </div>

                  {/* Quick Select Packages - Minimal Pills */}
                  <div className="mb-6">
                    <p className="text-xs font-medium uppercase tracking-wide mb-3" style={{ color: '#86868b' }}>
                      Quick select
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                      {creditPackages.map((pkg) => {
                        const isSelected = !showCustomAmount && selectedPackage === pkg.id;
                        return (
                          <button
                            key={pkg.id}
                            onClick={() => {
                              setSelectedPackage(pkg.id);
                              setShowCustomAmount(false);
                            }}
                            className="py-3 px-2 rounded-xl text-center transition-all"
                            style={{
                              backgroundColor: isSelected ? '#1d1d1f' : '#f5f5f7',
                              color: isSelected ? '#ffffff' : '#1d1d1f',
                            }}
                          >
                            <span className="block text-sm font-semibold">{pkg.credits >= 1000 ? `${pkg.credits/1000}K` : pkg.credits}</span>
                            <span className="block text-[10px] mt-0.5" style={{ color: isSelected ? 'rgba(255,255,255,0.7)' : '#86868b' }}>
                              ${pkg.price}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Summary - Clean Lines */}
                  <div className="border-t pt-4 space-y-3" style={{ borderColor: '#e8e8ed' }}>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: '#86868b' }}>Credits</span>
                      <span style={{ color: '#1d1d1f' }}>
                        {showCustomAmount
                          ? customCredits.toLocaleString()
                          : (creditPackages.find(p => p.id === selectedPackage)?.credits || 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: '#86868b' }}>Rate</span>
                      <span style={{ color: '#1d1d1f' }}>
                        {showCustomAmount
                          ? `$${getCustomPricing(customCredits).rate.toFixed(3)}`
                          : `$${(creditPackages.find(p => p.id === selectedPackage)?.pricePerCredit || 0.01).toFixed(3)}`} per credit
                      </span>
                    </div>
                    {((!showCustomAmount && (creditPackages.find(p => p.id === selectedPackage)?.savingsPercent || 0) > 0) ||
                      (showCustomAmount && getCustomPricing(customCredits).savingsPercent > 0)) && (
                      <div className="flex justify-between text-sm">
                        <span style={{ color: '#86868b' }}>Volume discount</span>
                        <span style={{ color: '#1d1d1f' }}>
                          {showCustomAmount
                            ? getCustomPricing(customCredits).savingsPercent
                            : creditPackages.find(p => p.id === selectedPackage)?.savingsPercent}% off
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between pt-3 border-t" style={{ borderColor: '#e8e8ed' }}>
                      <span className="text-sm font-medium" style={{ color: '#1d1d1f' }}>Total Amount</span>
                      <span className="text-xl font-semibold" style={{ color: '#1d1d1f' }}>
                        ${showCustomAmount
                          ? getCustomPricing(customCredits).price.toLocaleString()
                          : (creditPackages.find(p => p.id === selectedPackage)?.price || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer - Clean */}
            {!paymentSuccess && (
              <div className="px-6 pb-6 pt-2">
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowRechargeModal(false);
                      setShowCustomAmount(false);
                    }}
                    disabled={isProcessingPayment}
                    className="flex-1 py-3 text-sm font-medium rounded-xl transition-all hover:bg-black/5 disabled:opacity-50"
                    style={{ backgroundColor: '#f5f5f7', color: '#1d1d1f' }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setIsProcessingPayment(true);
                      const creditsToAdd = showCustomAmount
                        ? customCredits
                        : (creditPackages.find(p => p.id === selectedPackage)?.totalCredits || 0);
                      setTimeout(() => {
                        setUserCredits(prev => prev + creditsToAdd);
                        setIsProcessingPayment(false);
                        setPaymentSuccess(true);
                      }, 1500);
                    }}
                    disabled={isProcessingPayment}
                    className="flex-1 py-3 text-sm font-medium rounded-xl text-white flex items-center justify-center gap-2 disabled:opacity-50 transition-all hover:opacity-90"
                    style={{ backgroundColor: '#1d1d1f' }}
                  >
                    {isProcessingPayment ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing
                      </>
                    ) : (
                      `Pay $${showCustomAmount
                        ? getCustomPricing(customCredits).price.toLocaleString()
                        : (creditPackages.find(p => p.id === selectedPackage)?.price || 0).toLocaleString()}`
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Credit packages with game theory pricing
const creditPackages = [
  {
    id: 'starter',
    name: 'Starter',
    credits: 5000,
    bonus: 0,
    totalCredits: 5000,
    price: 50,
    pricePerCredit: 0.01,
    savingsPercent: 0,
    icon: Coins,
    color: '#706f69',
    badge: null,
  },
  {
    id: 'growth',
    name: 'Growth',
    credits: 25000,
    bonus: 2500,
    totalCredits: 27500,
    price: 200,
    pricePerCredit: 0.008,
    savingsPercent: 20,
    icon: TrendingUp,
    color: '#1c64f2',
    badge: 'MOST POPULAR',
  },
  {
    id: 'scale',
    name: 'Scale',
    credits: 50000,
    bonus: 7500,
    totalCredits: 57500,
    price: 350,
    pricePerCredit: 0.007,
    savingsPercent: 30,
    icon: Zap,
    color: '#10b981',
    badge: 'BEST VALUE',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    credits: 100000,
    bonus: 20000,
    totalCredits: 120000,
    price: 600,
    pricePerCredit: 0.006,
    savingsPercent: 40,
    icon: Crown,
    color: '#f59e0b',
    badge: 'MAX SAVINGS',
  },
];

// Custom pricing calculator
function getCustomPricing(credits: number) {
  let rate = 0.01;
  let savingsPercent = 0;

  if (credits >= 75000) {
    rate = 0.006;
    savingsPercent = 40;
  } else if (credits >= 40000) {
    rate = 0.007;
    savingsPercent = 30;
  } else if (credits >= 15000) {
    rate = 0.008;
    savingsPercent = 20;
  }

  return {
    price: Math.ceil(credits * rate),
    rate,
    savingsPercent,
  };
}
