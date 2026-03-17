'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowLeft,
  Globe,
  Linkedin,
  PenLine,
  Users,
  UserPlus,
  Sparkles,
  Signal,
  Activity,
  StickyNote,
  ChevronRight,
  ChevronDown,
  Building2,
  TrendingUp,
  Trophy,
  DollarSign,
  Gift,
  Zap,
  Target,
  Brain,
  BarChart3,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Clock,
  Star,
  ArrowUpRight,
  Play,
  Lightbulb,
  Shield,
  Layers,
  ExternalLink,
  Briefcase,
  Search,
  MoreHorizontal,
  Filter,
  SlidersHorizontal,
  Check,
  X,
  ArrowUpDown,
  AlertCircle,
  CalendarClock,
} from 'lucide-react';

const mockAccountData: Record<string, {
  name: string;
  industry: string;
  description: string;
  icpFitment: string;
  icpScore: number;
  intentScore: string;
  owner: string;
  govtType: string;
  revenue: string;
  companySize: string;
  b2bB2c: string;
  profitType: string;
  productService: string;
  website: string;
  location: string;
  founded: string;
  signals: { name: string; date: string; icon: React.ReactNode; type: 'positive' | 'neutral' | 'alert'; category: string; description: string }[];
  contacts: { name: string; title: string; initials: string; email?: string; phone?: string; engagement: number; department?: string; location?: string; lastActivity?: string; buyerRole?: string }[];
  aiInsights: { title: string; description: string; confidence: number; type: 'opportunity' | 'risk' | 'action' }[];
  engagementScore: number;
  recentActivity: { action: string; date: string; user: string; type: string; details: string }[];
  notes: { id: number; content: string; author: string; authorInitials: string; date: string; tags: string[] }[];
}> = {
  'bacardilimited.com': {
    name: 'Bacardi',
    industry: 'Food & Beverage Manufacturing',
    description: 'Bacardi Limited is the world\'s largest privately held international spirits company. The portfolio comprises more than 200 brands and labels, including BACARDÍ® rum, GREY GOOSE® vodka, PATRÓN® tequila, DEWAR\'S® Blended Scotch whisky, and BOMBAY SAPPHIRE® gin.',
    icpFitment: 'High',
    icpScore: 87,
    intentScore: 'HIGH-4',
    owner: 'Pied piper',
    govtType: 'Non-Government',
    revenue: '$1B - $10B',
    companySize: '5001 - 10000',
    b2bB2c: 'Both',
    profitType: 'Profit',
    productService: 'Product',
    website: 'bacardilimited.com',
    location: 'Hamilton, Bermuda',
    founded: '1862',
    signals: [
      { name: 'Leadership Change Detected', date: '2 days ago', icon: <Users size={16} />, type: 'positive', category: 'Intent', description: 'New CFO appointed with digital transformation mandate. High likelihood of vendor evaluation.' },
      { name: 'Expansion into APAC Market', date: '1 week ago', icon: <TrendingUp size={16} />, type: 'positive', category: 'Intent', description: 'Announced $50M investment in APAC operations. Seeking technology partners for regional rollout.' },
      { name: 'Q4 Earnings Beat Estimates', date: '2 weeks ago', icon: <BarChart3 size={16} />, type: 'positive', category: 'Activity', description: 'Revenue up 15% YoY. Budget approval likely for new initiatives in Q1.' },
      { name: 'New Product Launch', date: '3 weeks ago', icon: <Gift size={16} />, type: 'neutral', category: 'Activity', description: 'Launched premium tequila line targeting Gen Z market. Digital marketing spend increased.' },
      { name: 'Sustainability Initiative', date: '1 month ago', icon: <Shield size={16} />, type: 'neutral', category: 'Activity', description: 'Committed to 50% reduction in carbon footprint by 2030. Evaluating supply chain tech.' },
      { name: 'Competitor Contract Ending', date: '1 month ago', icon: <Target size={16} />, type: 'positive', category: 'Risk', description: 'Current vendor contract expires Q2. RFP process expected to begin soon.' },
      { name: 'Website Traffic Spike', date: '5 days ago', icon: <TrendingUp size={16} />, type: 'positive', category: 'Intent', description: '3x increase in visits to pricing page from Bacardi IP addresses.' },
      { name: 'Job Posting: Data Engineer', date: '1 week ago', icon: <Briefcase size={16} />, type: 'neutral', category: 'Intent', description: 'Hiring for data team expansion. Indicates investment in analytics capabilities.' },
    ],
    contacts: [
      { name: 'Felipe Schiavo', title: 'Finance Director | CFO Mexico', initials: 'FS', email: 'f.schiavo@bacardi.com', phone: '+52 55 1234 5678', engagement: 85, department: 'Finance', location: 'Mexico City', lastActivity: '2 hours ago', buyerRole: 'Economic Buyer' },
      { name: 'Maria Rodriguez', title: 'VP of Operations', initials: 'MR', email: 'm.rodriguez@bacardi.com', phone: '+1 786 555 0123', engagement: 72, department: 'Operations', location: 'Miami, FL', lastActivity: '1 day ago', buyerRole: 'Champion' },
      { name: 'James Chen', title: 'Head of Digital Transformation', initials: 'JC', email: 'j.chen@bacardi.com', engagement: 45, department: 'IT', location: 'Hamilton, Bermuda', lastActivity: '3 days ago', buyerRole: 'Technical Buyer' },
      { name: 'Sarah Mitchell', title: 'Chief Marketing Officer', initials: 'SM', email: 's.mitchell@bacardi.com', phone: '+1 305 555 0456', engagement: 68, department: 'Marketing', location: 'New York, NY', lastActivity: '5 days ago', buyerRole: 'Influencer' },
      { name: 'Carlos Mendez', title: 'Procurement Director', initials: 'CM', email: 'c.mendez@bacardi.com', engagement: 91, department: 'Procurement', location: 'Mexico City', lastActivity: '4 hours ago', buyerRole: 'Decision Maker' },
      { name: 'Lisa Wong', title: 'IT Security Manager', initials: 'LW', engagement: 32, department: 'IT', location: 'Singapore', lastActivity: '2 weeks ago', buyerRole: 'Gatekeeper' },
    ],
    aiInsights: [
      { title: 'High Purchase Intent Detected', description: 'Based on recent website visits and content engagement, this account shows 3x higher intent than baseline.', confidence: 92, type: 'opportunity' },
      { title: 'Best Time to Reach Out', description: 'Historical data suggests Tuesday-Thursday mornings have 47% higher response rates for this account.', confidence: 78, type: 'action' },
      { title: 'Competitor Risk', description: 'Competitor X has been engaging with key stakeholders. Consider accelerating outreach.', confidence: 65, type: 'risk' },
    ],
    engagementScore: 78,
    recentActivity: [
      { action: 'Visited pricing page', date: '2 hours ago', user: 'Felipe Schiavo', type: 'website', details: 'Spent 4 minutes on Enterprise pricing tier' },
      { action: 'Downloaded whitepaper', date: '1 day ago', user: 'Maria Rodriguez', type: 'content', details: 'ROI Calculator for Operations Teams' },
      { action: 'Opened email campaign', date: '3 days ago', user: 'James Chen', type: 'email', details: 'Q1 Product Update Newsletter - 3 clicks' },
      { action: 'Attended webinar', date: '5 days ago', user: 'Carlos Mendez', type: 'event', details: 'Best Practices for Procurement Automation' },
      { action: 'Requested demo', date: '1 week ago', user: 'Felipe Schiavo', type: 'sales', details: 'Scheduled for next Tuesday, 2:00 PM EST' },
      { action: 'LinkedIn engagement', date: '1 week ago', user: 'Sarah Mitchell', type: 'social', details: 'Liked and shared company post about AI features' },
      { action: 'Visited careers page', date: '2 weeks ago', user: 'Unknown', type: 'website', details: 'Multiple visits from Bacardi HQ IP' },
      { action: 'Form submission', date: '2 weeks ago', user: 'Maria Rodriguez', type: 'form', details: 'Requested case study for beverage industry' },
      { action: 'Email reply received', date: '3 weeks ago', user: 'Felipe Schiavo', type: 'email', details: 'Positive response to outreach, asked for more info' },
      { action: 'Added to CRM', date: '1 month ago', user: 'System', type: 'system', details: 'Account imported from LinkedIn Sales Navigator' },
    ],
    notes: [
      { id: 1, content: 'Had a great discovery call with Felipe. He mentioned they are actively evaluating solutions for Q2. Budget is approved and they want to move fast. Key pain points: manual reporting, lack of real-time visibility into operations.', author: 'Alex Thompson', authorInitials: 'AT', date: '2 days ago', tags: ['Discovery', 'High Priority'] },
      { id: 2, content: 'Maria (VP Ops) confirmed they are frustrated with current vendor. Contract ends in April. She is the internal champion and will push for our solution if we can demo the operations dashboard.', author: 'Sarah Kim', authorInitials: 'SK', date: '1 week ago', tags: ['Champion', 'Competitive'] },
      { id: 3, content: 'Attended their webinar on digital transformation. CEO emphasized need for "data-driven decision making" - align our pitch around this messaging.', author: 'Alex Thompson', authorInitials: 'AT', date: '2 weeks ago', tags: ['Research'] },
      { id: 4, content: 'Pricing discussion: Felipe mentioned budget is $150-200K annually. Our enterprise tier fits perfectly. Need to emphasize ROI calculator and case studies from beverage industry.', author: 'Mike Johnson', authorInitials: 'MJ', date: '3 weeks ago', tags: ['Pricing', 'Negotiation'] },
      { id: 5, content: 'Initial outreach via LinkedIn. Felipe responded positively and agreed to a call. Mentioned he saw our booth at the F&B Tech Summit last month.', author: 'Alex Thompson', authorInitials: 'AT', date: '1 month ago', tags: ['Outreach'] },
    ],
  },
};

const defaultAccount = {
  name: 'Unknown Company',
  industry: 'Unknown',
  description: 'No description available.',
  icpFitment: 'N/A',
  icpScore: 0,
  intentScore: 'N/A',
  owner: 'N/A',
  govtType: 'N/A',
  revenue: 'N/A',
  companySize: 'N/A',
  b2bB2c: 'N/A',
  profitType: 'N/A',
  productService: 'N/A',
  website: '',
  location: 'N/A',
  founded: 'N/A',
  signals: [],
  contacts: [],
  aiInsights: [],
  engagementScore: 0,
  recentActivity: [],
  notes: [],
};

// Circular progress component
function CircularProgress({ value, size = 80, strokeWidth = 8, color = '#1c64f2' }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e7e7e6"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold" style={{ color: '#111928' }}>{value}</span>
      </div>
    </div>
  );
}

// Premium Bento Card component - compact enterprise style
function BentoCard({
  children,
  className = '',
  span = 1,
  hover = true,
  glass = false,
  onClick,
  compact = false,
}: {
  children: React.ReactNode;
  className?: string;
  span?: 1 | 2 | 3 | 4;
  hover?: boolean;
  glass?: boolean;
  onClick?: () => void;
  compact?: boolean;
}) {
  const spanClass = span === 2 ? 'col-span-2' : span === 3 ? 'col-span-3' : span === 4 ? 'col-span-4' : 'col-span-1';

  return (
    <div
      className={`
        ${spanClass}
        rounded-xl ${compact ? 'p-3' : 'p-4'}
        ${hover ? 'hover:shadow-md hover:border-gray-300 cursor-pointer' : ''}
        transition-all duration-150 ease-out
        ${glass ? 'backdrop-blur-xl bg-white/90 border border-white/30 shadow-sm' : 'bg-white border shadow-sm'}
        ${className}
      `}
      style={{ borderColor: glass ? 'rgba(255,255,255,0.3)' : '#e7e7e6' }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// ICP Filter Dropdown Component
function ICPFilterDropdown({
  selected,
  onChange,
  options,
}: {
  selected: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; count: number }[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-all hover:border-gray-400 hover:bg-gray-50"
        style={{ borderColor: '#e7e7e6', color: '#464544' }}
      >
        <Filter size={14} />
        <span>ICP: {selected === 'all' ? 'All Roles' : selected}</span>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div
            className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl border shadow-xl z-50 py-1 overflow-hidden"
            style={{ borderColor: '#e7e7e6' }}
          >
            <div className="px-3 py-2 border-b" style={{ borderColor: '#f3f5f5' }}>
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#706f69' }}>Filter by Buyer Role</p>
            </div>
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-sm transition-colors ${
                  selected === option.value ? 'bg-blue-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  {selected === option.value && <Check size={14} style={{ color: '#1c64f2' }} />}
                  <span style={{ color: selected === option.value ? '#1c64f2' : '#464544' }}>{option.label}</span>
                </div>
                <span
                  className="px-2 py-0.5 text-xs font-medium rounded-full"
                  style={{ backgroundColor: '#f3f5f5', color: '#706f69' }}
                >
                  {option.count}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Modal Component
function Modal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-xl shadow-2xl z-50 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: '#e7e7e6' }}>
          <h3 className="text-sm font-bold" style={{ color: '#111928' }}>{title}</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
            <X size={16} style={{ color: '#706f69' }} />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </>
  );
}

// Add Note Modal Content
function AddNoteModalContent({ onClose, accountName }: { onClose: () => void; accountName: string }) {
  const [noteText, setNoteText] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const availableTags = ['Discovery', 'High Priority', 'Champion', 'Competitive', 'Research', 'Pricing', 'Negotiation', 'Outreach'];

  const handleSave = () => {
    if (noteText.trim()) {
      alert(`Note saved for ${accountName}!`);
      onClose();
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Write your note here..."
        className="w-full h-32 px-3 py-2 text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ borderColor: '#e7e7e6' }}
      />
      <div>
        <p className="text-xs font-medium mb-2" style={{ color: '#706f69' }}>Tags (optional)</p>
        <div className="flex flex-wrap gap-1.5">
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
              className={`px-2 py-1 text-xs rounded-lg border transition-colors ${
                selectedTags.includes(tag) ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
              }`}
              style={{ borderColor: selectedTags.includes(tag) ? '#93c5fd' : '#e7e7e6', color: selectedTags.includes(tag) ? '#1c64f2' : '#706f69' }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button onClick={onClose} className="px-3 py-1.5 text-xs font-medium rounded-lg border hover:bg-gray-50" style={{ borderColor: '#e7e7e6', color: '#706f69' }}>
          Cancel
        </button>
        <button onClick={handleSave} className="px-3 py-1.5 text-xs font-semibold rounded-lg text-white" style={{ backgroundColor: '#1c64f2' }}>
          Save Note
        </button>
      </div>
    </div>
  );
}

// Assign Modal Content
function AssignModalContent({ onClose, accountName, currentOwner }: { onClose: () => void; accountName: string; currentOwner: string }) {
  const teamMembers = [
    { name: 'Pied Piper', initials: 'PP', role: 'Account Executive', isCurrentOwner: true },
    { name: 'Alex Thompson', initials: 'AT', role: 'Sales Manager', isCurrentOwner: false },
    { name: 'Sarah Kim', initials: 'SK', role: 'Account Executive', isCurrentOwner: false },
    { name: 'Mike Johnson', initials: 'MJ', role: 'SDR', isCurrentOwner: false },
    { name: 'Emily Chen', initials: 'EC', role: 'Account Executive', isCurrentOwner: false },
  ];

  return (
    <div className="space-y-2">
      <p className="text-xs mb-3" style={{ color: '#706f69' }}>Assign {accountName} to a team member</p>
      {teamMembers.map((member) => (
        <button
          key={member.name}
          onClick={() => {
            alert(`${accountName} assigned to ${member.name}!`);
            onClose();
          }}
          className={`w-full flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-all text-left ${
            member.isCurrentOwner ? 'bg-blue-50 border-blue-200' : ''
          }`}
          style={{ borderColor: member.isCurrentOwner ? '#93c5fd' : '#e7e7e6' }}
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold" style={{ backgroundColor: '#3e545c' }}>
            {member.initials}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium" style={{ color: '#111928' }}>{member.name}</p>
              {member.isCurrentOwner && (
                <span className="px-1.5 py-0.5 text-[10px] font-medium rounded" style={{ backgroundColor: '#dbeafe', color: '#1c64f2' }}>
                  Current Owner
                </span>
              )}
            </div>
            <p className="text-xs" style={{ color: '#706f69' }}>{member.role}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

// AI Insight Card
function AIInsightCard({ insight }: { insight: { title: string; description: string; confidence: number; type: 'opportunity' | 'risk' | 'action' } }) {
  const typeConfig = {
    opportunity: { icon: <Lightbulb size={18} />, color: '#10b981', bg: '#ecfdf5' },
    risk: { icon: <Shield size={18} />, color: '#ef4444', bg: '#fef2f2' },
    action: { icon: <Zap size={18} />, color: '#1c64f2', bg: '#eff6ff' },
  };

  const config = typeConfig[insight.type];

  return (
    <div
      className="p-4 rounded-xl border transition-all duration-200 hover:shadow-md cursor-pointer"
      style={{ borderColor: '#e7e7e6', backgroundColor: config.bg }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${config.color}20`, color: config.color }}
        >
          {config.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className="text-sm font-semibold truncate" style={{ color: '#111928' }}>{insight.title}</p>
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: config.color, color: 'white' }}
            >
              {insight.confidence}%
            </span>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: '#464544' }}>{insight.description}</p>
        </div>
      </div>
    </div>
  );
}

// Recommended signals that can be generated via enrichment
const recommendedSignals = [
  { name: 'Budget Approval Cycle Starting', description: 'Finance team typically begins Q2 budget reviews in March. High likelihood of procurement decisions.', confidence: 89, type: 'opportunity' as const },
  { name: 'Tech Stack Evaluation Underway', description: 'Recent job postings indicate evaluation of new solutions in your category.', confidence: 84, type: 'action' as const },
  { name: 'Key Decision Maker Promoted', description: 'Felipe Schiavo recently promoted to regional CFO role with expanded budget authority.', confidence: 91, type: 'opportunity' as const },
];

// Helper function to parse date strings and get recency
function parseSignalDate(dateStr: string): { daysAgo: number; recencyGroup: string; recencyLabel: string } {
  const str = dateStr.toLowerCase();
  let daysAgo = 999;

  if (str.includes('hour')) daysAgo = 0;
  else if (str.includes('day')) {
    const match = str.match(/(\d+)/);
    daysAgo = match ? parseInt(match[1]) : 1;
  }
  else if (str.includes('week')) {
    const match = str.match(/(\d+)/);
    daysAgo = match ? parseInt(match[1]) * 7 : 7;
  }
  else if (str.includes('month')) {
    const match = str.match(/(\d+)/);
    daysAgo = match ? parseInt(match[1]) * 30 : 30;
  }

  let recencyGroup = 'Earlier';
  let recencyLabel = 'Older';

  if (daysAgo === 0) {
    recencyGroup = 'Today';
    recencyLabel = 'Just now';
  } else if (daysAgo <= 2) {
    recencyGroup = 'Today';
    recencyLabel = 'Recent';
  } else if (daysAgo <= 7) {
    recencyGroup = 'This Week';
    recencyLabel = 'This week';
  } else if (daysAgo <= 30) {
    recencyGroup = 'This Month';
    recencyLabel = 'This month';
  }

  return { daysAgo, recencyGroup, recencyLabel };
}

// Signals Tab Component
function SignalsTab({ account }: { account: typeof mockAccountData[string] }) {
  const [sortBy, setSortBy] = useState<'default' | 'recency' | 'a-z' | 'status'>('default');
  const [filterCategory, setFilterCategory] = useState<'all' | 'Intent' | 'Activity' | 'Risk'>('all');

  // Process signals with recency data
  const processedSignals = account.signals.map((signal, idx) => ({
    ...signal,
    originalIndex: idx,
    ...parseSignalDate(signal.date),
  }));

  // Filter signals
  const filteredSignals = processedSignals.filter(signal =>
    filterCategory === 'all' || signal.category === filterCategory
  );

  // Sort signals
  const sortedSignals = [...filteredSignals].sort((a, b) => {
    switch (sortBy) {
      case 'recency':
        return a.daysAgo - b.daysAgo;
      case 'a-z':
        return a.name.localeCompare(b.name);
      case 'status':
        const statusOrder = { positive: 0, alert: 1, neutral: 2 };
        return statusOrder[a.type] - statusOrder[b.type];
      default:
        return a.originalIndex - b.originalIndex;
    }
  });

  // Group signals by recency when sorted by recency
  const groupedSignals = sortBy === 'recency'
    ? sortedSignals.reduce((groups, signal) => {
        const group = signal.recencyGroup;
        if (!groups[group]) groups[group] = [];
        groups[group].push(signal);
        return groups;
      }, {} as Record<string, typeof sortedSignals>)
    : null;

  const getStatusConfig = (type: 'positive' | 'neutral' | 'alert') => {
    switch (type) {
      case 'positive':
        return {
          label: 'Positive Signal',
          color: '#10b981',
          bg: '#ecfdf5',
          border: '#d1fae5',
          icon: <TrendingUp size={12} />
        };
      case 'alert':
        return {
          label: 'Risk Alert',
          color: '#ef4444',
          bg: '#fef2f2',
          border: '#fecaca',
          icon: <AlertCircle size={12} />
        };
      default:
        return {
          label: 'Neutral',
          color: '#f59e0b',
          bg: '#fffbeb',
          border: '#fde68a',
          icon: <Activity size={12} />
        };
    }
  };

  const getRecencyBadgeStyle = (daysAgo: number) => {
    if (daysAgo <= 2) {
      return { bg: '#ecfdf5', color: '#059669', border: '#a7f3d0' }; // Green - very recent
    } else if (daysAgo <= 7) {
      return { bg: '#eff6ff', color: '#1c64f2', border: '#bfdbfe' }; // Blue - this week
    } else if (daysAgo <= 30) {
      return { bg: '#f3f5f5', color: '#706f69', border: '#e7e7e6' }; // Gray - this month
    }
    return { bg: '#f9fafb', color: '#9ca3af', border: '#e5e7eb' }; // Muted - older
  };

  const renderSignalCard = (signal: typeof sortedSignals[0]) => {
    const statusConfig = getStatusConfig(signal.type);
    const recencyStyle = getRecencyBadgeStyle(signal.daysAgo);

    return (
      <div
        key={signal.originalIndex}
        className="bg-white rounded-lg border p-3 hover:shadow-md transition-all cursor-pointer group"
        style={{ borderColor: '#e7e7e6', borderLeftWidth: '3px', borderLeftColor: statusConfig.color }}
      >
        {/* Card Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-start gap-2.5 flex-1 min-w-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: statusConfig.bg, color: statusConfig.color }}
            >
              {signal.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate group-hover:text-[#1c64f2] transition-colors" style={{ color: '#111928' }}>
                {signal.name}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  className="px-1.5 py-0.5 text-[10px] font-semibold rounded"
                  style={{
                    backgroundColor: signal.category === 'Intent' ? '#eff6ff' : signal.category === 'Risk' ? '#fef2f2' : '#f3f5f5',
                    color: signal.category === 'Intent' ? '#1c64f2' : signal.category === 'Risk' ? '#ef4444' : '#706f69'
                  }}
                >
                  {signal.category}
                </span>
              </div>
            </div>
          </div>
          {/* Status Badge */}
          <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full"
              style={{ backgroundColor: statusConfig.bg, color: statusConfig.color, border: `1px solid ${statusConfig.border}` }}
            >
              {statusConfig.icon}
              {statusConfig.label}
            </span>
            {/* Recency Badge */}
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full"
              style={{ backgroundColor: recencyStyle.bg, color: recencyStyle.color, border: `1px solid ${recencyStyle.border}` }}
            >
              <CalendarClock size={10} />
              {signal.date}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-[11px] line-clamp-2 mb-2" style={{ color: '#464544' }}>
          {signal.description}
        </p>

        {/* Card Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {signal.daysAgo <= 2 && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-bold rounded bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
                <Zap size={8} /> NEW
              </span>
            )}
          </div>
          <button className="text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#1c64f2' }}>
            View Details →
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      {/* Signals Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold" style={{ color: '#111928' }}>All Signals</h2>
          <p className="text-xs" style={{ color: '#706f69' }}>
            {filteredSignals.length} signal{filteredSignals.length !== 1 ? 's' : ''} for {account.name}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1 p-0.5 rounded-lg" style={{ backgroundColor: '#f3f5f5' }}>
            {(['all', 'Intent', 'Activity', 'Risk'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className="px-2.5 py-1 text-[11px] font-medium rounded-md transition-all"
                style={{
                  backgroundColor: filterCategory === cat ? 'white' : 'transparent',
                  color: filterCategory === cat ? '#111928' : '#706f69',
                  boxShadow: filterCategory === cat ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
                }}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="appearance-none pl-7 pr-6 py-1.5 text-xs font-medium rounded-lg border cursor-pointer hover:border-[#1c64f2] transition-colors"
              style={{ borderColor: '#e7e7e6', color: '#464544', backgroundColor: 'white' }}
            >
              <option value="default">Default Order</option>
              <option value="recency">Most Recent</option>
              <option value="a-z">A → Z</option>
              <option value="status">By Status</option>
            </select>
            <ArrowUpDown
              size={12}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: '#706f69' }}
            />
            <ChevronDown
              size={12}
              className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: '#706f69' }}
            />
          </div>
        </div>
      </div>

      {/* Signals Summary Stats */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[
          { label: 'Total Signals', value: account.signals.length, icon: <Signal size={14} />, color: '#1c64f2', bg: '#eff6ff' },
          { label: 'Positive', value: account.signals.filter(s => s.type === 'positive').length, icon: <TrendingUp size={14} />, color: '#10b981', bg: '#ecfdf5' },
          { label: 'Alerts', value: account.signals.filter(s => s.type === 'alert').length, icon: <AlertCircle size={14} />, color: '#ef4444', bg: '#fef2f2' },
          { label: 'This Week', value: processedSignals.filter(s => s.daysAgo <= 7).length, icon: <CalendarClock size={14} />, color: '#f59e0b', bg: '#fffbeb' },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 p-2 rounded-lg border"
            style={{ backgroundColor: stat.bg, borderColor: 'transparent' }}
          >
            <div style={{ color: stat.color }}>{stat.icon}</div>
            <div>
              <p className="text-sm font-bold" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-[10px]" style={{ color: stat.color, opacity: 0.8 }}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Signals Grid/List */}
      {sortBy === 'recency' && groupedSignals ? (
        // Grouped by recency
        <div className="space-y-4">
          {['Today', 'This Week', 'This Month', 'Earlier'].map((group) => {
            const signals = groupedSignals[group];
            if (!signals?.length) return null;

            return (
              <div key={group}>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xs font-bold" style={{ color: '#111928' }}>{group}</h3>
                  <div className="flex-1 h-px" style={{ backgroundColor: '#e7e7e6' }} />
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: '#f3f5f5', color: '#706f69' }}>
                    {signals.length} signal{signals.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {signals.map(renderSignalCard)}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Regular grid
        <div className="grid grid-cols-2 gap-2">
          {sortedSignals.map(renderSignalCard)}
        </div>
      )}
    </div>
  );
}

export default function AccountDetailsPage() {
  const params = useParams();
  const domain = params.domain as string;
  const tab = params.tab as string;
  const [activeTab, setActiveTab] = useState(tab || 'overview');
  const [isEnriching, setIsEnriching] = useState(false);
  const [enrichedSignals, setEnrichedSignals] = useState<typeof recommendedSignals>([]);
  const [credits, setCredits] = useState(10);
  const [icpFilter, setIcpFilter] = useState('all');
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const account = mockAccountData[domain] || defaultAccount;

  // ICP filter options with counts
  const icpOptions = [
    { value: 'all', label: 'All Roles', count: account.contacts.length },
    { value: 'Economic Buyer', label: 'Economic Buyer', count: account.contacts.filter(c => c.buyerRole === 'Economic Buyer').length },
    { value: 'Decision Maker', label: 'Decision Maker', count: account.contacts.filter(c => c.buyerRole === 'Decision Maker').length },
    { value: 'Champion', label: 'Champion', count: account.contacts.filter(c => c.buyerRole === 'Champion').length },
    { value: 'Technical Buyer', label: 'Technical Buyer', count: account.contacts.filter(c => c.buyerRole === 'Technical Buyer').length },
    { value: 'Influencer', label: 'Influencer', count: account.contacts.filter(c => c.buyerRole === 'Influencer').length },
    { value: 'Gatekeeper', label: 'Gatekeeper', count: account.contacts.filter(c => c.buyerRole === 'Gatekeeper').length },
  ].filter(opt => opt.count > 0 || opt.value === 'all');

  // Filtered contacts
  const filteredContacts = icpFilter === 'all'
    ? account.contacts
    : account.contacts.filter(c => c.buyerRole === icpFilter);

  const handleEnrich = () => {
    if (credits < 10 || enrichedSignals.length > 0) return;

    setIsEnriching(true);
    // Simulate API call
    setTimeout(() => {
      setEnrichedSignals(recommendedSignals);
      setCredits(0);
      setIsEnriching(false);
    }, 1500);
  };

  const tabs = [
    { name: 'Overview', slug: 'overview', icon: <Layers size={16} /> },
    { name: 'Contacts', slug: 'contacts', icon: <Users size={16} /> },
    { name: 'Signals', slug: 'signals', icon: <Signal size={16} /> },
    { name: 'Activity', slug: 'activity', icon: <Activity size={16} /> },
    { name: 'Notes', slug: 'notes', icon: <StickyNote size={16} /> },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      {/* Premium Compact Header */}
      <div
        className="sticky top-0 z-40 backdrop-blur-xl border-b shadow-sm"
        style={{ backgroundColor: 'rgba(255,255,255,0.95)', borderColor: '#e7e7e6' }}
      >
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/target-profiles/accounts"
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft size={18} style={{ color: '#706f69' }} />
              </Link>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: 'linear-gradient(135deg, #1c64f2 0%, #0ea5e9 100%)', boxShadow: '0 2px 8px -2px rgba(3, 105, 161, 0.4)' }}
                >
                  {account.name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-base font-bold" style={{ color: '#111928' }}>{account.name}</h1>
                    <div className="flex items-center gap-0.5">
                      <a href={`https://${account.website}`} target="_blank" rel="noopener noreferrer" className="p-1 rounded-md hover:bg-gray-100 transition-colors">
                        <Globe size={14} style={{ color: '#706f69' }} />
                      </a>
                      <a href="#" className="p-1 rounded-md hover:bg-gray-100 transition-colors">
                        <Linkedin size={14} style={{ color: '#0077b5' }} />
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: '#706f69' }}>{account.industry}</span>
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: '#d4d4d4' }}></span>
                    <span className="text-xs flex items-center gap-0.5" style={{ color: '#706f69' }}>
                      <MapPin size={10} />
                      {account.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowNotesModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                style={{ borderColor: '#e7e7e6', color: '#464544' }}
              >
                <PenLine size={12} />
                Notes
              </button>
              <button
                onClick={() => setShowAssignModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:shadow-md cursor-pointer"
                style={{ backgroundColor: '#1c64f2' }}
              >
                <Users size={12} />
                Assign
              </button>
            </div>
          </div>
        </div>

        {/* Compact Tab Navigation */}
        <div className="px-4 flex items-center gap-0.5">
          {tabs.map((t) => (
            <Link
              key={t.slug}
              href={`/account-details/${domain}/${t.slug}`}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-t-lg transition-all ${
                tab === t.slug
                  ? 'bg-white shadow-sm'
                  : 'hover:bg-white/60'
              }`}
              style={{ color: tab === t.slug ? '#1c64f2' : '#706f69' }}
            >
              {t.icon}
              {t.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Premium Bento Grid Content - Data Dense Enterprise Layout */}
      {tab === 'overview' && (
        <div className="p-4">
          {/* Key Metrics Row - Compact */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            <BentoCard hover={false} compact>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: '#706f69' }}>ICP Score</p>
                  <p className="text-2xl font-bold" style={{ color: '#111928' }}>{account.icpScore}</p>
                  <p className="text-[10px] mt-0.5 font-medium" style={{ color: '#10b981' }}>↑ 12% this month</p>
                </div>
                <CircularProgress value={account.icpScore} color="#10b981" size={56} strokeWidth={6} />
              </div>
            </BentoCard>

            <BentoCard hover={false} compact>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: '#706f69' }}>Engagement</p>
                  <p className="text-2xl font-bold" style={{ color: '#111928' }}>{account.engagementScore}%</p>
                  <p className="text-[10px] mt-0.5 font-medium" style={{ color: '#1c64f2' }}>Active this week</p>
                </div>
                <CircularProgress value={account.engagementScore} color="#1c64f2" size={56} strokeWidth={6} />
              </div>
            </BentoCard>

            <BentoCard hover={false} compact>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: '#706f69' }}>Intent Score</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold" style={{ color: '#111928' }}>{account.intentScore}</p>
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded" style={{ backgroundColor: '#fef3c7', color: '#92400e' }}>
                    <Zap size={10} className="inline mr-0.5" />
                    HOT
                  </span>
                </div>
                <p className="text-[10px] mt-0.5" style={{ color: '#706f69' }}>23 signals detected</p>
              </div>
            </BentoCard>

            <BentoCard hover={false} compact>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: '#706f69' }}>Account Owner</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold" style={{ background: 'linear-gradient(135deg, #464544 0%, #1e293b 100%)' }}>
                    PP
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#111928' }}>{account.owner}</p>
                    <p className="text-[10px]" style={{ color: '#706f69' }}>2 weeks ago</p>
                  </div>
                </div>
              </div>
            </BentoCard>
          </div>

          {/* Main Bento Grid - Compact 4-Column Enterprise Layout */}
          <div className="grid grid-cols-4 gap-3">
            {/* AI Insights - Spans 2 columns */}
            <BentoCard span={2} hover={false} className="row-span-2">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1c64f2 0%, #0ea5e9 100%)' }}>
                    <Brain size={14} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold" style={{ color: '#111928' }}>AI Insights</h2>
                    <p className="text-[10px]" style={{ color: '#706f69' }}>Sprouts Intelligence</p>
                  </div>
                </div>
                {enrichedSignals.length > 0 && (
                  <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full" style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>
                    <Star size={10} />
                    Enriched
                  </span>
                )}
              </div>

              {/* Empty State - Compact Premium Enrich CTA */}
              {enrichedSignals.length === 0 && !isEnriching && (
                <div
                  className="relative overflow-hidden rounded-xl p-5"
                  style={{
                    background: 'linear-gradient(135deg, #f9fafb 0%, #f3f5f5 100%)',
                    border: '1px solid #e7e7e6'
                  }}
                >
                  {/* Subtle decorative gradient */}
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #1c64f2 0%, transparent 70%)', transform: 'translate(20%, -20%)' }} />

                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, #1c64f2 0%, #0ea5e9 100%)',
                          boxShadow: '0 4px 16px -4px rgba(3, 105, 161, 0.4)'
                        }}
                      >
                        <Brain size={20} className="text-white" />
                      </div>
                      <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                        <Sparkles size={8} className="text-white" />
                      </div>
                    </div>

                    <h3 className="text-sm font-bold mb-1" style={{ color: '#111928' }}>
                      AI Insights Available
                    </h3>
                    <p className="text-xs mb-4 max-w-xs" style={{ color: '#706f69' }}>
                      Unlock buying signals for <span className="font-semibold" style={{ color: '#1c64f2' }}>{account.name}</span>
                    </p>

                    <button
                      onClick={handleEnrich}
                      className="group flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm text-white transition-all duration-200 cursor-pointer hover:scale-[1.02]"
                      style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        boxShadow: '0 2px 12px -2px rgba(16, 185, 129, 0.4)'
                      }}
                    >
                      <Sparkles size={14} className="group-hover:rotate-12 transition-transform duration-200" />
                      <span>Generate Insights</span>
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                        <Zap size={10} />10
                      </span>
                    </button>

                    <p className="text-[10px] mt-2 flex items-center gap-1" style={{ color: '#706f69' }}>
                      <Clock size={10} />~5 seconds
                    </p>
                  </div>
                </div>
              )}

              {/* Loading State - Compact */}
              {isEnriching && (
                <div
                  className="relative overflow-hidden rounded-xl p-5"
                  style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)', border: '1px solid #a7f3d0' }}
                >
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="relative mb-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                        <Brain size={20} className="text-white animate-pulse" />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-xl animate-spin" style={{ border: '2px solid transparent', borderTopColor: '#10b981', borderRightColor: '#10b981' }} />
                      </div>
                    </div>
                    <h3 className="text-sm font-bold mb-1" style={{ color: '#065f46' }}>Analyzing {account.name}</h3>
                    <div className="flex items-center gap-2 text-xs" style={{ color: '#059669' }}>
                      <div className="flex gap-0.5">
                        <span className="w-1 h-1 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1 h-1 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1 h-1 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      Generating insights
                    </div>
                  </div>
                </div>
              )}

              {/* Enriched Insights - Compact */}
              {enrichedSignals.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 rounded-lg" style={{ backgroundColor: '#ecfdf5' }}>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center bg-emerald-500">
                      <Check size={10} className="text-white" />
                    </div>
                    <p className="text-xs font-semibold" style={{ color: '#059669' }}>3 Insights Generated</p>
                  </div>
                  {enrichedSignals.map((signal, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border transition-all hover:shadow-sm cursor-pointer"
                      style={{
                        borderColor: '#e7e7e6',
                        backgroundColor: signal.type === 'opportunity' ? '#f0fdf4' : signal.type === 'action' ? '#eff6ff' : '#fef2f2'
                      }}
                    >
                      <div className="flex items-start gap-2">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: signal.type === 'opportunity' ? '#10b981' : signal.type === 'action' ? '#1c64f2' : '#ef4444' }}
                        >
                          {signal.type === 'opportunity' ? <Lightbulb size={14} className="text-white" /> : signal.type === 'action' ? <Zap size={14} className="text-white" /> : <Shield size={14} className="text-white" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <p className="text-xs font-bold truncate" style={{ color: '#111928' }}>{signal.name}</p>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0" style={{ backgroundColor: signal.confidence > 85 ? '#10b981' : '#1c64f2', color: 'white' }}>
                              {signal.confidence}%
                            </span>
                          </div>
                          <p className="text-[11px] leading-snug" style={{ color: '#464544' }}>{signal.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </BentoCard>

            {/* Signals - Compact scrollable */}
            <BentoCard className="row-span-2 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: '#ecfdf5' }}>
                    <Signal size={12} style={{ color: '#10b981' }} />
                  </div>
                  <h2 className="text-xs font-bold" style={{ color: '#111928' }}>Recent Signals</h2>
                </div>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded" style={{ backgroundColor: '#f3f5f5', color: '#706f69' }}>
                  {account.signals.length}
                </span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-1.5 -mx-1 px-1" style={{ maxHeight: '280px' }}>
                {account.signals.slice(0, 6).map((signal, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: signal.type === 'positive' ? '#ecfdf5' : signal.type === 'alert' ? '#fef2f2' : '#f3f5f5',
                        color: signal.type === 'positive' ? '#10b981' : signal.type === 'alert' ? '#ef4444' : '#706f69'
                      }}
                    >
                      {signal.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold truncate" style={{ color: '#111928' }}>{signal.name}</p>
                      <p className="text-[10px]" style={{ color: '#706f69' }}>{signal.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-2 py-2 text-xs font-semibold rounded-lg border hover:bg-gray-50 transition-colors" style={{ borderColor: '#e7e7e6', color: '#464544' }}>
                View All →
              </button>
            </BentoCard>

            {/* Recent Activity - New position (spans 1 column) */}
            <BentoCard className="row-span-2 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: '#fef3c7' }}>
                  <Activity size={12} style={{ color: '#d97706' }} />
                </div>
                <h2 className="text-xs font-bold" style={{ color: '#111928' }}>Activity</h2>
              </div>
              <div className="flex-1 overflow-y-auto space-y-1.5" style={{ maxHeight: '280px' }}>
                {account.recentActivity.slice(0, 5).map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#1c64f2' }}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium truncate" style={{ color: '#111928' }}>{activity.action}</p>
                      <p className="text-[10px]" style={{ color: '#706f69' }}>{activity.user} • {activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-2 py-2 text-xs font-semibold rounded-lg border hover:bg-gray-50 transition-colors" style={{ borderColor: '#e7e7e6', color: '#464544' }}>
                View All →
              </button>
            </BentoCard>

            {/* Company Overview - Full width row */}
            <BentoCard span={4} compact>
              <div className="flex items-start gap-4">
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: '#eff6ff' }}>
                    <Building2 size={12} style={{ color: '#1c64f2' }} />
                  </div>
                  <h2 className="text-xs font-bold" style={{ color: '#111928' }}>Company</h2>
                </div>
                <p className="text-[11px] leading-relaxed flex-1 line-clamp-2" style={{ color: '#464544' }}>{account.description}</p>
                <div className="flex items-center gap-6 flex-shrink-0">
                  <div className="text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#706f69' }}>Revenue</p>
                    <p className="text-xs font-bold" style={{ color: '#111928' }}>{account.revenue}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#706f69' }}>Employees</p>
                    <p className="text-xs font-bold" style={{ color: '#111928' }}>{account.companySize}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#706f69' }}>Founded</p>
                    <p className="text-xs font-bold" style={{ color: '#111928' }}>{account.founded}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#706f69' }}>Type</p>
                    <p className="text-xs font-bold" style={{ color: '#111928' }}>{account.b2bB2c}</p>
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Key Contacts - Full width with ICP filter */}
            <BentoCard span={4}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: '#fce7f3' }}>
                      <Users size={12} style={{ color: '#db2777' }} />
                    </div>
                    <div>
                      <h2 className="text-xs font-bold" style={{ color: '#111928' }}>Key Contacts</h2>
                      <p className="text-[10px]" style={{ color: '#706f69' }}>{filteredContacts.length} of {account.contacts.length} contacts</p>
                    </div>
                  </div>
                  <ICPFilterDropdown
                    selected={icpFilter}
                    onChange={setIcpFilter}
                    options={icpOptions}
                  />
                </div>
                <button className="text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors hover:bg-blue-600" style={{ backgroundColor: '#1c64f2', color: 'white' }}>
                  + Add Contact
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {filteredContacts.map((contact, idx) => (
                  <Link
                    key={idx}
                    href={`/contact-details/26907815/overview`}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:shadow-sm hover:border-blue-200 transition-all cursor-pointer group"
                    style={{ borderColor: '#e7e7e6' }}
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold" style={{ background: 'linear-gradient(135deg, #1c64f2 0%, #0ea5e9 100%)' }}>
                        {contact.initials}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center" style={{ backgroundColor: contact.engagement > 70 ? '#10b981' : contact.engagement > 40 ? '#f59e0b' : '#ef4444' }}>
                        <span className="text-[7px] text-white font-bold">{contact.engagement}</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold truncate group-hover:text-blue-600 transition-colors" style={{ color: '#111928' }}>{contact.name}</p>
                      <p className="text-[10px] truncate" style={{ color: '#706f69' }}>{contact.title}</p>
                      {contact.buyerRole && (
                        <span
                          className="inline-block mt-1 px-1.5 py-0.5 text-[9px] font-semibold rounded"
                          style={{
                            backgroundColor: contact.buyerRole === 'Economic Buyer' || contact.buyerRole === 'Decision Maker' ? '#ecfdf5' : contact.buyerRole === 'Champion' ? '#eff6ff' : '#f3f5f5',
                            color: contact.buyerRole === 'Economic Buyer' || contact.buyerRole === 'Decision Maker' ? '#059669' : contact.buyerRole === 'Champion' ? '#1c64f2' : '#706f69'
                          }}
                        >
                          {contact.buyerRole}
                        </span>
                      )}
                    </div>
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" style={{ color: '#1c64f2' }} />
                  </Link>
                ))}
              </div>
            </BentoCard>
          </div>

        </div>
      )}

      {/* Contacts Tab - Premium Compact */}
      {tab === 'contacts' && (
        <div className="p-4">
          {/* Contacts Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-sm font-bold" style={{ color: '#111928' }}>All Contacts</h2>
                <p className="text-xs" style={{ color: '#706f69' }}>{filteredContacts.length} of {account.contacts.length} contacts at {account.name}</p>
              </div>
              <ICPFilterDropdown
                selected={icpFilter}
                onChange={setIcpFilter}
                options={icpOptions}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#706f69' }} />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  className="pl-8 pr-3 py-2 text-xs rounded-lg border w-52"
                  style={{ borderColor: '#e7e7e6' }}
                />
              </div>
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white" style={{ backgroundColor: '#1c64f2' }}>
                <UserPlus size={14} />
                Add Contact
              </button>
            </div>
          </div>

          {/* Contacts Grid - Compact */}
          <div className="grid grid-cols-2 gap-3">
            {filteredContacts.map((contact, idx) => (
              <Link
                key={idx}
                href={`/contact-details/26907815/overview`}
                className="bg-white rounded-xl border p-4 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group"
                style={{ borderColor: '#e7e7e6' }}
              >
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-semibold" style={{ background: 'linear-gradient(135deg, #1c64f2 0%, #0ea5e9 100%)' }}>
                      {contact.initials}
                    </div>
                    <div
                      className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center"
                      style={{ backgroundColor: contact.engagement > 70 ? '#10b981' : contact.engagement > 40 ? '#f59e0b' : '#ef4444' }}
                    >
                      <span className="text-[8px] text-white font-bold">{contact.engagement}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold group-hover:text-blue-600 transition-colors" style={{ color: '#111928' }}>{contact.name}</p>
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#1c64f2' }} />
                    </div>
                    <p className="text-xs truncate" style={{ color: '#706f69' }}>{contact.title}</p>
                    {contact.buyerRole && (
                      <span
                        className="inline-block mt-1.5 px-1.5 py-0.5 text-[10px] font-semibold rounded"
                        style={{
                          backgroundColor: contact.buyerRole === 'Economic Buyer' || contact.buyerRole === 'Decision Maker' ? '#ecfdf5' : contact.buyerRole === 'Champion' ? '#eff6ff' : '#f3f5f5',
                          color: contact.buyerRole === 'Economic Buyer' || contact.buyerRole === 'Decision Maker' ? '#059669' : contact.buyerRole === 'Champion' ? '#1c64f2' : '#706f69'
                        }}
                      >
                        {contact.buyerRole}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t grid grid-cols-2 gap-2" style={{ borderColor: '#f3f5f5' }}>
                  <div className="flex items-center gap-1.5">
                    <Mail size={12} style={{ color: '#706f69' }} />
                    <span className="text-[10px] truncate" style={{ color: contact.email ? '#1c64f2' : '#706f69' }}>
                      {contact.email || 'No email'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone size={12} style={{ color: '#706f69' }} />
                    <span className="text-[10px] truncate" style={{ color: contact.phone ? '#111928' : '#706f69' }}>
                      {contact.phone || 'No phone'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={12} style={{ color: '#706f69' }} />
                    <span className="text-[10px] truncate" style={{ color: '#706f69' }}>{contact.location || 'Unknown'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} style={{ color: '#706f69' }} />
                    <span className="text-[10px] truncate" style={{ color: '#706f69' }}>{contact.lastActivity || 'No activity'}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Signals Tab - Card Layout with Recency */}
      {tab === 'signals' && (
        <SignalsTab account={account} />
      )}

      {/* Activity Tab - Compact */}
      {tab === 'activity' && (
        <div className="p-4">
          {/* Activity Header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-bold" style={{ color: '#111928' }}>Activity Timeline</h2>
              <p className="text-xs" style={{ color: '#706f69' }}>{account.recentActivity.length} activities tracked</p>
            </div>
            <div className="flex items-center gap-2">
              <select className="px-3 py-1.5 text-xs rounded-lg border" style={{ borderColor: '#e7e7e6', color: '#706f69' }}>
                <option>All Activities</option>
                <option>Website</option>
                <option>Email</option>
                <option>Content</option>
                <option>Events</option>
              </select>
              <select className="px-3 py-1.5 text-xs rounded-lg border" style={{ borderColor: '#e7e7e6', color: '#706f69' }}>
                <option>Last 30 days</option>
                <option>Last 7 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
          </div>

          {/* Activity Timeline - Compact */}
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5" style={{ backgroundColor: '#e7e7e6' }} />
            <div className="space-y-2">
              {account.recentActivity.map((activity, idx) => {
                const typeConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
                  website: { icon: <Globe size={12} />, color: '#1c64f2', bg: '#eff6ff' },
                  email: { icon: <Mail size={12} />, color: '#059669', bg: '#ecfdf5' },
                  content: { icon: <StickyNote size={12} />, color: '#7c3aed', bg: '#f5f3ff' },
                  event: { icon: <Users size={12} />, color: '#d97706', bg: '#fef3c7' },
                  sales: { icon: <Phone size={12} />, color: '#db2777', bg: '#fce7f3' },
                  social: { icon: <Linkedin size={12} />, color: '#0077b5', bg: '#e0f2fe' },
                  form: { icon: <MessageSquare size={12} />, color: '#059669', bg: '#ecfdf5' },
                  system: { icon: <Layers size={12} />, color: '#706f69', bg: '#f3f5f5' },
                };
                const config = typeConfig[activity.type] || typeConfig.system;

                return (
                  <div key={idx} className="relative flex items-start gap-3 pl-8">
                    <div
                      className="absolute left-2.5 w-3.5 h-3.5 rounded-full border-2 border-white flex items-center justify-center z-10"
                      style={{ backgroundColor: config.color }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                    <div
                      className="flex-1 bg-white rounded-lg border p-3 hover:shadow-sm transition-all cursor-pointer"
                      style={{ borderColor: '#e7e7e6' }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2 flex-1 min-w-0">
                          <div
                            className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: config.bg, color: config.color }}
                          >
                            {config.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold" style={{ color: '#111928' }}>{activity.action}</p>
                            <p className="text-[11px] truncate" style={{ color: '#464544' }}>{activity.details}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] font-semibold" style={{ color: '#1c64f2' }}>{activity.user}</span>
                              <span className="text-[10px]" style={{ color: '#706f69' }}>•</span>
                              <span className="text-[10px]" style={{ color: '#706f69' }}>{activity.date}</span>
                            </div>
                          </div>
                        </div>
                        <span
                          className="px-1.5 py-0.5 text-[10px] font-semibold rounded capitalize flex-shrink-0"
                          style={{ backgroundColor: config.bg, color: config.color }}
                        >
                          {activity.type}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Notes Tab - Compact */}
      {tab === 'notes' && (
        <div className="p-4">
          {/* Notes Header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-bold" style={{ color: '#111928' }}>Account Notes</h2>
              <p className="text-xs" style={{ color: '#706f69' }}>{account.notes?.length || 0} notes for {account.name}</p>
            </div>
            <button
              onClick={() => setShowNotesModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white cursor-pointer"
              style={{ backgroundColor: '#1c64f2' }}
            >
              <PenLine size={12} />
              Add Note
            </button>
          </div>

          {/* Notes List - Compact */}
          {account.notes && account.notes.length > 0 ? (
            <div className="space-y-2">
              {account.notes.map((note) => (
                <div
                  key={note.id}
                  className="bg-white rounded-lg border p-3 hover:shadow-sm transition-all"
                  style={{ borderColor: '#e7e7e6' }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #1c64f2 0%, #0ea5e9 100%)' }}
                    >
                      {note.authorInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold" style={{ color: '#111928' }}>{note.author}</span>
                          <span className="text-[10px]" style={{ color: '#706f69' }}>•</span>
                          <span className="text-[10px]" style={{ color: '#706f69' }}>{note.date}</span>
                        </div>
                        <button className="p-1 rounded hover:bg-gray-100 transition-colors">
                          <MoreHorizontal size={14} style={{ color: '#706f69' }} />
                        </button>
                      </div>
                      <p className="text-[11px] leading-relaxed mb-2" style={{ color: '#464544' }}>{note.content}</p>
                      <div className="flex items-center gap-1.5">
                        {note.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 text-[10px] font-semibold rounded"
                            style={{
                              backgroundColor: tag === 'High Priority' ? '#fef2f2' : tag === 'Champion' ? '#ecfdf5' : tag === 'Competitive' ? '#fef3c7' : '#f3f5f5',
                              color: tag === 'High Priority' ? '#dc2626' : tag === 'Champion' ? '#059669' : tag === 'Competitive' ? '#d97706' : '#706f69'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border p-6 text-center" style={{ borderColor: '#e7e7e6' }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#f3f5f5' }}>
                <StickyNote size={20} style={{ color: '#706f69' }} />
              </div>
              <p className="text-sm font-semibold" style={{ color: '#111928' }}>No Notes Yet</p>
              <p className="text-xs mt-1" style={{ color: '#706f69' }}>Add your first note about this account.</p>
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <Modal isOpen={showNotesModal} onClose={() => setShowNotesModal(false)} title="Add Note">
        <AddNoteModalContent onClose={() => setShowNotesModal(false)} accountName={account.name} />
      </Modal>

      <Modal isOpen={showAssignModal} onClose={() => setShowAssignModal(false)} title="Assign Account">
        <AssignModalContent onClose={() => setShowAssignModal(false)} accountName={account.name} currentOwner={account.owner} />
      </Modal>
    </div>
  );
}
