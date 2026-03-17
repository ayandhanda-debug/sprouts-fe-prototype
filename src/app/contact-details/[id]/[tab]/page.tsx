'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Globe,
  Linkedin,
  PenLine,
  Bookmark,
  UserPlus,
  MoreHorizontal,
  Activity,
  StickyNote,
  Mail,
  Phone,
  MapPin,
  Building2,
  Sparkles,
  GraduationCap,
  Briefcase,
  Users,
  ChevronRight,
  Plus,
  Brain,
  Zap,
  Clock,
  Star,
  Lightbulb,
  Shield,
  Target,
  MessageSquare,
  ChevronDown,
  TrendingUp,
} from 'lucide-react';

// Recommended insights that can be generated via enrichment for contacts
const recommendedContactInsights = [
  { name: 'Best Outreach Time', description: 'Based on LinkedIn activity patterns, Felipe is most active on Tuesday and Thursday mornings (9-11 AM CST).', confidence: 87, type: 'action' as const },
  { name: 'Shared Connections', description: 'You have 3 mutual connections including Maria Rodriguez (VP Operations) who can provide a warm introduction.', confidence: 92, type: 'opportunity' as const },
  { name: 'Recent Career Move', description: 'Felipe was promoted to CFO Mexico 4 months ago. New role = new budget authority and vendor evaluation opportunities.', confidence: 85, type: 'opportunity' as const },
];

const mockContactData: Record<string, {
  name: string;
  initials: string;
  title: string;
  company: string;
  companyDomain: string;
  cmo: string;
  owner: string;
  bio: string;
  location: string;
  email: string | null;
  phone: string | null;
  linkedin: string;
  employeeHistory: { company: string; role: string; duration: string; current?: boolean }[];
  education: { school: string; degree: string; years: string }[];
  skills: string[];
  companyInfo: {
    industry: string;
    icpFitment: string;
    intentScore: string;
    owner: string;
  };
  activity: { action: string; date: string; type: string; details: string }[];
  notes: { id: number; content: string; author: string; authorInitials: string; date: string; tags: string[] }[];
  engagementScore: number;
  buyerRole: string;
  sequences: string[];
  lists: string[];
}> = {
  '26907815': {
    name: 'Felipe Schiavo',
    initials: 'FS',
    title: 'Finance Director | CFO Mexico',
    company: 'Bacardi',
    companyDomain: 'bacardilimited.com',
    cmo: 'High',
    owner: 'Alex Thompson',
    bio: 'A seasoned and fully energized finance leader with over 15 years of leadership experience in commercial and supply chain operations, with a proven track record of delivering results in different industries. With living experience in Brazil and Mexico, leading local and regional teams. Expertise in financial planning & analysis, M&A integration, digital transformation, and operational excellence. Passionate about building high-performing teams and driving sustainable growth.',
    location: 'Mexico City, Ciudad De Mexico, Mexico',
    email: 'f.schiavo@bacardi.com',
    phone: '+52 55 1234 5678',
    linkedin: 'linkedin.com/in/felipeschiavo',
    engagementScore: 85,
    buyerRole: 'Economic Buyer',
    employeeHistory: [
      { company: 'Bacardi', role: 'Finance Director | CFO Mexico', duration: '2020 - Present', current: true },
      { company: 'Bacardi', role: 'Senior Finance Manager - LATAM', duration: '2017 - 2020' },
      { company: 'AkzoNobel', role: 'Finance Manager - Mexico', duration: '2014 - 2017' },
      { company: 'AkzoNobel', role: 'Financial Analyst - Brazil', duration: '2011 - 2014' },
      { company: 'Deloitte', role: 'Senior Auditor', duration: '2008 - 2011' },
    ],
    education: [
      { school: 'Fundação Getulio Vargas', degree: 'MBA, Finance & Strategy', years: '2012 - 2014' },
      { school: 'INSEAD', degree: 'Executive Education, Leadership Program', years: '2019' },
      { school: 'Universidade de São Paulo', degree: 'Bachelor of Accounting', years: '2004 - 2008' },
    ],
    skills: ['Financial Planning & Analysis', 'M&A Integration', 'Digital Transformation', 'Team Leadership', 'Strategic Planning', 'Cost Optimization', 'ERP Implementation', 'Spanish', 'Portuguese', 'English'],
    companyInfo: {
      industry: 'Food & Beverage Manufacturing',
      icpFitment: 'High',
      intentScore: 'HIGH-4',
      owner: 'Alex Thompson',
    },
    activity: [
      { action: 'Visited pricing page', date: '2 hours ago', type: 'website', details: 'Spent 4 minutes on Enterprise pricing tier' },
      { action: 'Opened email', date: '1 day ago', type: 'email', details: 'Q1 Product Update Newsletter - clicked 3 links' },
      { action: 'Replied to email', date: '3 days ago', type: 'email', details: 'Positive response, asked for ROI calculator' },
      { action: 'Attended webinar', date: '1 week ago', type: 'event', details: 'CFO Summit: Digital Finance Transformation' },
      { action: 'Downloaded whitepaper', date: '1 week ago', type: 'content', details: 'ROI Guide for Finance Leaders' },
      { action: 'Requested demo', date: '2 weeks ago', type: 'sales', details: 'Scheduled for Tuesday, 2:00 PM EST' },
      { action: 'LinkedIn profile view', date: '2 weeks ago', type: 'social', details: 'Viewed your company page and 3 employee profiles' },
      { action: 'Form submission', date: '3 weeks ago', type: 'form', details: 'Requested case study for beverage industry' },
      { action: 'First website visit', date: '1 month ago', type: 'website', details: 'Came from Google search "finance automation software"' },
    ],
    notes: [
      { id: 1, content: 'Had an excellent discovery call with Felipe. He is very engaged and clearly the economic buyer. Key priorities: reducing month-end close time from 10 days to 5 days, and getting real-time visibility into regional P&L.', author: 'Alex Thompson', authorInitials: 'AT', date: '2 days ago', tags: ['Discovery', 'High Priority'] },
      { id: 2, content: 'Felipe mentioned their current ERP (SAP) lacks good reporting. They are evaluating add-on solutions. Budget is pre-approved for Q2. He wants to present to the CFO board in March.', author: 'Alex Thompson', authorInitials: 'AT', date: '1 week ago', tags: ['Budget', 'Timeline'] },
      { id: 3, content: 'Background research: Felipe was promoted to CFO Mexico 4 months ago. Previously led the LATAM finance transformation project. Very data-driven leader. Active on LinkedIn - posts about digital finance topics.', author: 'Sarah Kim', authorInitials: 'SK', date: '2 weeks ago', tags: ['Research'] },
      { id: 4, content: 'Follow-up needed: Send the beverage industry case study and ROI calculator. He specifically asked for examples with 5000+ employee companies.', author: 'Alex Thompson', authorInitials: 'AT', date: '3 weeks ago', tags: ['Follow-up'] },
    ],
    sequences: ['Q1 Enterprise Outreach', 'CFO Nurture Campaign', 'Product Demo Follow-up'],
    lists: ['High Intent Leads', 'F&B Industry Targets', 'LATAM Expansion'],
  },
};

const defaultContact = {
  name: 'Unknown Contact',
  initials: '??',
  title: 'Unknown',
  company: 'Unknown',
  companyDomain: '',
  cmo: 'N/A',
  owner: 'N/A',
  bio: 'No bio available.',
  location: 'N/A',
  email: null,
  phone: null,
  linkedin: '',
  employeeHistory: [],
  education: [],
  skills: [],
  companyInfo: {
    industry: 'N/A',
    icpFitment: 'N/A',
    intentScore: 'N/A',
    owner: 'N/A',
  },
  activity: [],
  notes: [],
  engagementScore: 0,
  buyerRole: 'N/A',
  sequences: [],
  lists: [],
};

export default function ContactDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const tab = params.tab as string;
  const [isEnriching, setIsEnriching] = useState(false);
  const [enrichedInsights, setEnrichedInsights] = useState<typeof recommendedContactInsights>([]);

  const contact = mockContactData[id] || defaultContact;

  const handleEnrich = () => {
    if (enrichedInsights.length > 0) return;
    setIsEnriching(true);
    setTimeout(() => {
      setEnrichedInsights(recommendedContactInsights);
      setIsEnriching(false);
    }, 1500);
  };

  const tabs = [
    { name: 'Overview', slug: 'overview' },
    { name: 'Activity', slug: 'activity' },
    { name: 'Notes', slug: 'notes' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <div className="bg-white border-b" style={{ borderColor: '#e7e7e6' }}>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/target-profiles/contacts" className="p-2 rounded-lg hover:bg-gray-100">
                <ArrowLeft size={20} style={{ color: '#706f69' }} />
              </Link>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                  style={{ backgroundColor: '#3b82f6' }}
                >
                  {contact.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-lg font-semibold" style={{ color: '#111928' }}>{contact.name}</h1>
                    <Linkedin size={16} style={{ color: '#0077b5' }} />
                  </div>
                  <p className="text-sm" style={{ color: '#706f69' }}>
                    {contact.title} at{' '}
                    <Link href={`/account-details/${contact.companyDomain}/overview`} className="underline" style={{ color: '#1c64f2' }}>
                      {contact.company}
                    </Link>
                  </p>
                  {/* Contact Details - Email & Phone */}
                  <div className="flex items-center gap-4 mt-2">
                    {/* Email */}
                    {contact.email ? (
                      <a href={`mailto:${contact.email}`} className="flex items-center gap-1.5 text-sm hover:underline" style={{ color: '#1c64f2' }}>
                        <Mail size={14} />
                        {contact.email}
                      </a>
                    ) : (
                      <button
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-sm font-medium transition-all hover:scale-105 cursor-pointer"
                        style={{ backgroundColor: '#eff6ff', color: '#1c64f2' }}
                      >
                        <Mail size={14} />
                        <span>Get Email</span>
                        <span className="flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-bold rounded" style={{ backgroundColor: '#1c64f2', color: 'white' }}>
                          <Zap size={10} />3
                        </span>
                      </button>
                    )}
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: '#d4d4d4' }}></span>
                    {/* Phone */}
                    {contact.phone ? (
                      <a href={`tel:${contact.phone}`} className="flex items-center gap-1.5 text-sm hover:underline" style={{ color: '#059669' }}>
                        <Phone size={14} />
                        {contact.phone}
                      </a>
                    ) : (
                      <button
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-sm font-medium transition-all hover:scale-105 cursor-pointer"
                        style={{ backgroundColor: '#ecfdf5', color: '#059669' }}
                      >
                        <Phone size={14} />
                        <span>Get Phone</span>
                        <span className="flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-bold rounded" style={{ backgroundColor: '#059669', color: 'white' }}>
                          <Zap size={10} />10
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm" style={{ borderColor: '#e7e7e6', color: '#191918' }}>
                <PenLine size={16} />
                Add note
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm" style={{ borderColor: '#e7e7e6', color: '#191918' }}>
                <Bookmark size={16} />
                Save to List
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm" style={{ borderColor: '#e7e7e6', color: '#191918' }}>
                <UserPlus size={16} />
                Reassign to
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm" style={{ borderColor: '#e7e7e6', color: '#191918' }}>
                <MoreHorizontal size={16} />
                More Actions
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 mt-4 pt-4 border-t" style={{ borderColor: '#e7e7e6' }}>
            {/* Hero Metric - Engagement Score */}
            <div
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
              style={{
                background: contact.engagementScore > 70
                  ? 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)'
                  : contact.engagementScore > 40
                  ? 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)'
                  : 'linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)',
                border: `1px solid ${contact.engagementScore > 70 ? '#10b981' : contact.engagementScore > 40 ? '#f59e0b' : '#ef4444'}20`
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: contact.engagementScore > 70 ? '#10b981' : contact.engagementScore > 40 ? '#f59e0b' : '#ef4444'
                }}
              >
                <TrendingUp size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-medium" style={{ color: '#706f69' }}>Engagement Score</p>
                <p className="text-xl font-bold" style={{ color: contact.engagementScore > 70 ? '#059669' : contact.engagementScore > 40 ? '#d97706' : '#dc2626' }}>
                  {contact.engagementScore}%
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs" style={{ color: '#706f69' }}>Buyer Role</p>
              <span
                className="px-2 py-0.5 text-xs font-medium rounded"
                style={{
                  backgroundColor: contact.buyerRole === 'Economic Buyer' || contact.buyerRole === 'Decision Maker' ? '#ecfdf5' : contact.buyerRole === 'Champion' ? '#eff6ff' : '#f3f5f5',
                  color: contact.buyerRole === 'Economic Buyer' || contact.buyerRole === 'Decision Maker' ? '#059669' : contact.buyerRole === 'Champion' ? '#1c64f2' : '#706f69'
                }}
              >
                {contact.buyerRole}
              </span>
            </div>
            <div>
              <p className="text-xs" style={{ color: '#706f69' }}>Contact Owner</p>
              <p className="text-sm font-medium" style={{ color: '#191918' }}>{contact.owner}</p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: '#706f69' }}>Sequence</p>
              {contact.sequences.length > 0 ? (
                <div className="relative">
                  <select
                    className="appearance-none px-3 py-1 pr-7 text-sm font-medium rounded-lg border cursor-pointer"
                    style={{ borderColor: '#e7e7e6', color: '#1c64f2', backgroundColor: '#eff6ff' }}
                  >
                    {contact.sequences.map((seq, idx) => (
                      <option key={idx} value={seq}>{seq}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#1c64f2' }} />
                </div>
              ) : (
                <p className="text-sm" style={{ color: '#706f69' }}>N/A</p>
              )}
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: '#706f69' }}>List</p>
              {contact.lists.length > 0 ? (
                <div className="relative">
                  <select
                    className="appearance-none px-3 py-1 pr-7 text-sm font-medium rounded-lg border cursor-pointer"
                    style={{ borderColor: '#e7e7e6', color: '#8b5cf6', backgroundColor: '#f5f3ff' }}
                  >
                    {contact.lists.map((list, idx) => (
                      <option key={idx} value={list}>{list}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#8b5cf6' }} />
                </div>
              ) : (
                <p className="text-sm" style={{ color: '#706f69' }}>N/A</p>
              )}
            </div>
            <div>
              <p className="text-xs" style={{ color: '#706f69' }}>List</p>
              <p className="text-sm" style={{ color: '#706f69' }}>N/A</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 flex items-center gap-1">
          {tabs.map((t) => (
            <Link
              key={t.slug}
              href={`/contact-details/${id}/${t.slug}`}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                tab === t.slug
                  ? 'border-current'
                  : 'border-transparent hover:border-gray-300'
              }`}
              style={{ color: tab === t.slug ? '#1c64f2' : '#706f69' }}
            >
              {t.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Content */}
      {tab === 'overview' && (
        <div className="p-6">
          {/* AI Insights Section */}
          <div className="bg-white rounded-xl border mb-6 p-5" style={{ borderColor: '#e7e7e6' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1c64f2 0%, #8b5cf6 100%)' }}>
                  <Brain size={18} className="text-white" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold" style={{ color: '#111928' }}>AI Insights</h2>
                  <p className="text-xs" style={{ color: '#706f69' }}>Powered by Sprouts Intelligence</p>
                </div>
              </div>
              {enrichedInsights.length > 0 && (
                <span className="flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                  <Star size={12} />
                  Enriched
                </span>
              )}
            </div>

            {/* Empty State - Premium Enrich CTA */}
            {enrichedInsights.length === 0 && !isEnriching && (
              <div
                className="relative overflow-hidden rounded-2xl p-8"
                style={{
                  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
                  border: '1px solid rgba(148, 163, 184, 0.2)'
                }}
              >
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, #1c64f2 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                      style={{
                        background: 'linear-gradient(135deg, #1c64f2 0%, #0ea5e9 100%)',
                        boxShadow: '0 10px 40px -10px rgba(28, 100, 242, 0.5)'
                      }}
                    >
                      <Brain size={28} className="text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-md">
                      <Sparkles size={12} className="text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#0f172a' }}>
                    AI Insights Available
                  </h3>
                  <p className="text-sm mb-6 max-w-sm leading-relaxed" style={{ color: '#64748b' }}>
                    Unlock intelligent outreach recommendations for <span className="font-semibold" style={{ color: '#1c64f2' }}>{contact.name}</span>
                  </p>

                  {/* CTA Button */}
                  <button
                    onClick={handleEnrich}
                    className="group relative flex items-center gap-3 px-6 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      boxShadow: '0 4px 20px -4px rgba(16, 185, 129, 0.5)'
                    }}
                  >
                    <Sparkles size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                    <span>Generate Insights</span>
                    <div
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold"
                      style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                    >
                      <Zap size={12} />
                      10
                    </div>
                  </button>

                  {/* Subtext */}
                  <p className="text-xs mt-4 flex items-center gap-1.5" style={{ color: '#94a3b8' }}>
                    <Clock size={12} />
                    Takes ~5 seconds to analyze
                  </p>
                </div>
              </div>
            )}

            {/* Loading State */}
            {isEnriching && (
              <div
                className="relative overflow-hidden rounded-2xl p-8"
                style={{
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #d1fae5 100%)',
                  border: '1px solid rgba(16, 185, 129, 0.2)'
                }}
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="relative mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        boxShadow: '0 10px 40px -10px rgba(16, 185, 129, 0.5)'
                      }}
                    >
                      <Brain size={28} className="text-white animate-pulse" />
                    </div>
                    {/* Spinning ring */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-20 h-20 rounded-2xl animate-spin"
                        style={{
                          border: '2px solid transparent',
                          borderTopColor: '#10b981',
                          borderRightColor: '#10b981',
                        }}
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#065f46' }}>
                    Analyzing {contact.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#059669' }}>
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    Generating AI insights
                  </div>
                </div>
              </div>
            )}

            {/* Enriched Insights */}
            {enrichedInsights.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-4 p-3 rounded-xl" style={{ backgroundColor: '#f0fdf4' }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-green-500">
                    <Star size={12} className="text-white" />
                  </div>
                  <p className="text-sm font-medium" style={{ color: '#166534' }}>
                    3 AI Insights Generated Successfully
                  </p>
                </div>
                {enrichedInsights.map((insight, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border transition-all hover:shadow-md cursor-pointer"
                    style={{
                      borderColor: '#e7e7e6',
                      backgroundColor: insight.type === 'opportunity' ? '#ecfdf5' : insight.type === 'action' ? '#eff6ff' : '#fef2f2'
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: insight.type === 'opportunity' ? '#10b981' : insight.type === 'action' ? '#1c64f2' : '#ef4444',
                        }}
                      >
                        {insight.type === 'opportunity' ? <Lightbulb size={20} className="text-white" /> : insight.type === 'action' ? <Zap size={20} className="text-white" /> : <Shield size={20} className="text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="text-sm font-bold" style={{ color: '#111928' }}>{insight.name}</p>
                          <span
                            className="text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0"
                            style={{ backgroundColor: insight.confidence > 85 ? '#10b981' : '#1c64f2', color: 'white' }}
                          >
                            {insight.confidence}% confidence
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: '#464544' }}>{insight.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Contact Overview */}
              <div className="bg-white rounded-lg border p-4" style={{ borderColor: '#e7e7e6' }}>
                <h2 className="flex items-center gap-2 text-sm font-medium mb-4" style={{ color: '#111928' }}>
                  <Users size={16} />
                  Contact Overview
                </h2>
                <p className="text-sm" style={{ color: '#464544' }}>{contact.bio}</p>
                <button className="text-sm font-medium mt-2" style={{ color: '#1c64f2' }}>See more</button>
              </div>

              {/* Contact Details */}
              <div className="bg-white rounded-lg border p-4" style={{ borderColor: '#e7e7e6' }}>
                <h2 className="flex items-center gap-2 text-sm font-medium mb-4" style={{ color: '#111928' }}>
                  <Users size={16} />
                  Contact Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs" style={{ color: '#706f69' }}>Contact State and Country</p>
                    <p className="text-sm flex items-center gap-1" style={{ color: '#191918' }}>
                      <MapPin size={14} />
                      {contact.location}
                    </p>
                  </div>
                  <div className="flex items-center justify-between py-2 border-t" style={{ borderColor: '#e7e7e6' }}>
                    <div className="flex items-center gap-2">
                      <Mail size={14} style={{ color: '#706f69' }} />
                      <span className="text-sm" style={{ color: '#706f69' }}>{contact.email || 'N/A'}</span>
                    </div>
                    <button className="flex items-center gap-1 text-sm" style={{ color: '#1c64f2' }}>
                      <ChevronRight size={14} />
                      Enrich
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-2 border-t" style={{ borderColor: '#e7e7e6' }}>
                    <div className="flex items-center gap-2">
                      <Phone size={14} style={{ color: '#706f69' }} />
                      <span className="text-sm" style={{ color: '#706f69' }}>{contact.phone || 'N/A'}</span>
                    </div>
                    <button className="flex items-center gap-1 text-sm" style={{ color: '#1c64f2' }}>
                      <ChevronRight size={14} />
                      Enrich
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact Notes */}
              <div className="bg-white rounded-lg border p-4" style={{ borderColor: '#e7e7e6' }}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="flex items-center gap-2 text-sm font-medium" style={{ color: '#111928' }}>
                    <StickyNote size={16} />
                    Contact Notes
                  </h2>
                  <button className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1c64f2' }}>
                    <Plus size={14} className="text-white" />
                  </button>
                </div>
                <p className="text-sm text-center py-4" style={{ color: '#706f69' }}>No notes yet</p>
              </div>
            </div>

            {/* Middle Column */}
            <div className="space-y-6">
              {/* Employee History */}
              <div className="bg-white rounded-lg border p-4" style={{ borderColor: '#e7e7e6' }}>
                <h2 className="flex items-center gap-2 text-sm font-medium mb-4" style={{ color: '#111928' }}>
                  <Briefcase size={16} />
                  Employee History
                  <span className="px-1.5 py-0.5 text-xs rounded-full" style={{ backgroundColor: '#f3f5f5', color: '#706f69' }}>
                    {contact.employeeHistory.length}
                  </span>
                </h2>
                <div className="space-y-3">
                  {contact.employeeHistory.map((job, idx) => (
                    <div key={idx} className="flex items-start gap-3 py-2 border-b last:border-0" style={{ borderColor: '#e7e7e6' }}>
                      <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: job.current ? '#ecfdf5' : '#f3f5f5' }}>
                        <Building2 size={14} style={{ color: job.current ? '#10b981' : '#706f69' }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium" style={{ color: '#191918' }}>{job.company}</p>
                          {job.current && (
                            <span className="px-1.5 py-0.5 text-[10px] font-medium rounded" style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-xs" style={{ color: '#706f69' }}>{job.role}</p>
                        {job.duration && (
                          <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>{job.duration}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Account Overview */}
              <div className="bg-white rounded-lg border p-4" style={{ borderColor: '#e7e7e6' }}>
                <h2 className="flex items-center gap-2 text-sm font-medium mb-4" style={{ color: '#111928' }}>
                  <Building2 size={16} />
                  Account Overview
                </h2>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#3e545c' }}>
                    <span className="text-white font-medium">{contact.company[0]}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Link href={`/account-details/${contact.companyDomain}/overview`} className="text-sm font-medium underline" style={{ color: '#191918' }}>
                        {contact.company}
                      </Link>
                      <Globe size={14} style={{ color: '#706f69' }} />
                      <Linkedin size={14} style={{ color: '#0077b5' }} />
                    </div>
                    <p className="text-xs" style={{ color: '#706f69' }}>{contact.companyInfo.industry}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t" style={{ borderColor: '#e7e7e6' }}>
                  <div>
                    <p className="text-xs flex items-center gap-1" style={{ color: '#706f69' }}>
                      <Sparkles size={10} style={{ color: '#1c64f2' }} />
                      ICP Fitment
                    </p>
                    <p className="text-sm font-medium" style={{ color: '#10b981' }}>{contact.companyInfo.icpFitment}</p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: '#706f69' }}>Intent score</p>
                    <p className="px-2 py-0.5 text-xs rounded inline-block" style={{ backgroundColor: '#fef3c7', color: '#92400e' }}>
                      {contact.companyInfo.intentScore}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: '#706f69' }}>Account owner</p>
                    <p className="text-sm" style={{ color: '#191918' }}>{contact.companyInfo.owner}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Education */}
              <div className="bg-white rounded-lg border p-4" style={{ borderColor: '#e7e7e6' }}>
                <h2 className="flex items-center gap-2 text-sm font-medium mb-4" style={{ color: '#111928' }}>
                  <GraduationCap size={16} />
                  Education
                  <span className="px-1.5 py-0.5 text-xs rounded-full" style={{ backgroundColor: '#f3f5f5', color: '#706f69' }}>
                    {contact.education.length}
                  </span>
                </h2>
                <div className="space-y-3">
                  {contact.education.map((edu, idx) => (
                    <div key={idx} className="flex items-center gap-3 py-2 border-b last:border-0" style={{ borderColor: '#e7e7e6' }}>
                      <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: '#f3f5f5' }}>
                        <GraduationCap size={14} style={{ color: '#706f69' }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: '#191918' }}>{edu.school}</p>
                        <p className="text-xs" style={{ color: '#706f69' }}>{edu.degree}</p>
                        <p className="text-xs" style={{ color: '#706f69' }}>{edu.years}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 text-sm font-medium rounded-lg border" style={{ borderColor: '#e7e7e6', color: '#191918' }}>
                  View all Education
                </button>
              </div>

              {/* Skills */}
              <div className="bg-white rounded-lg border p-4" style={{ borderColor: '#e7e7e6' }}>
                <h2 className="flex items-center gap-2 text-sm font-medium mb-4" style={{ color: '#111928' }}>
                  <Sparkles size={16} />
                  Skills
                  {contact.skills.length > 0 && (
                    <span className="px-1.5 py-0.5 text-xs rounded-full" style={{ backgroundColor: '#f3f5f5', color: '#706f69' }}>
                      {contact.skills.length}
                    </span>
                  )}
                </h2>
                {contact.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {contact.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg"
                        style={{ backgroundColor: '#f3f5f5', color: '#464544' }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <p className="text-sm font-medium" style={{ color: '#111928' }}>No data to show</p>
                    <p className="text-xs mt-1" style={{ color: '#706f69' }}>No skills available yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Activity Tab */}
      {tab === 'activity' && (
        <div className="p-6">
          {/* Activity Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold" style={{ color: '#111928' }}>Activity Timeline</h2>
              <p className="text-sm" style={{ color: '#706f69' }}>{contact.activity?.length || 0} activities tracked for {contact.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <select className="px-4 py-2 text-sm rounded-xl border" style={{ borderColor: '#e7e7e6', color: '#706f69' }}>
                <option>All Activities</option>
                <option>Website</option>
                <option>Email</option>
                <option>Content</option>
                <option>Events</option>
              </select>
              <select className="px-4 py-2 text-sm rounded-xl border" style={{ borderColor: '#e7e7e6', color: '#706f69' }}>
                <option>Last 30 days</option>
                <option>Last 7 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
          </div>

          {/* Activity Timeline */}
          {contact.activity && contact.activity.length > 0 ? (
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5" style={{ backgroundColor: '#e7e7e6' }} />
              <div className="space-y-4">
                {contact.activity.map((activity, idx) => {
                  const typeConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
                    website: { icon: <Globe size={16} />, color: '#1c64f2', bg: '#eff6ff' },
                    email: { icon: <Mail size={16} />, color: '#10b981', bg: '#ecfdf5' },
                    content: { icon: <StickyNote size={16} />, color: '#8b5cf6', bg: '#f5f3ff' },
                    event: { icon: <Users size={16} />, color: '#f59e0b', bg: '#fef3c7' },
                    sales: { icon: <Phone size={16} />, color: '#ec4899', bg: '#fce7f3' },
                    social: { icon: <Linkedin size={16} />, color: '#0077b5', bg: '#e0f2fe' },
                    form: { icon: <MessageSquare size={16} />, color: '#10b981', bg: '#ecfdf5' },
                  };
                  const config = typeConfig[activity.type] || typeConfig.website;

                  return (
                    <div key={idx} className="relative flex items-start gap-4 pl-12">
                      <div
                        className="absolute left-4 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center z-10"
                        style={{ backgroundColor: config.color }}
                      >
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                      <div
                        className="flex-1 bg-white rounded-2xl border p-4 hover:shadow-md transition-all"
                        style={{ borderColor: '#e7e7e6' }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: config.bg, color: config.color }}
                            >
                              {config.icon}
                            </div>
                            <div>
                              <p className="text-sm font-semibold" style={{ color: '#111928' }}>{activity.action}</p>
                              <p className="text-sm mt-1" style={{ color: '#464544' }}>{activity.details}</p>
                              <p className="text-xs mt-2" style={{ color: '#706f69' }}>{activity.date}</p>
                            </div>
                          </div>
                          <span
                            className="px-2 py-1 text-xs font-medium rounded-lg capitalize"
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
          ) : (
            <div className="bg-white rounded-2xl border p-8 text-center" style={{ borderColor: '#e7e7e6' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#f3f5f5' }}>
                <Activity size={24} style={{ color: '#706f69' }} />
              </div>
              <p className="text-lg font-semibold" style={{ color: '#111928' }}>No Activity Yet</p>
              <p className="text-sm mt-2" style={{ color: '#706f69' }}>Activity will appear here as {contact.name} engages with your content.</p>
            </div>
          )}
        </div>
      )}

      {/* Notes Tab */}
      {tab === 'notes' && (
        <div className="p-6">
          {/* Notes Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold" style={{ color: '#111928' }}>Contact Notes</h2>
              <p className="text-sm" style={{ color: '#706f69' }}>{contact.notes?.length || 0} notes for {contact.name}</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white" style={{ backgroundColor: '#1c64f2' }}>
              <PenLine size={16} />
              Add Note
            </button>
          </div>

          {/* Notes List */}
          {contact.notes && contact.notes.length > 0 ? (
            <div className="space-y-4">
              {contact.notes.map((note) => (
                <div
                  key={note.id}
                  className="bg-white rounded-2xl border p-5 hover:shadow-md transition-all"
                  style={{ borderColor: '#e7e7e6' }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0"
                      style={{ backgroundColor: '#3b82f6' }}
                    >
                      {note.authorInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold" style={{ color: '#111928' }}>{note.author}</span>
                          <span className="text-xs" style={{ color: '#706f69' }}>•</span>
                          <span className="text-xs" style={{ color: '#706f69' }}>{note.date}</span>
                        </div>
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                          <MoreHorizontal size={16} style={{ color: '#706f69' }} />
                        </button>
                      </div>
                      <p className="text-sm leading-relaxed mb-3" style={{ color: '#464544' }}>{note.content}</p>
                      <div className="flex items-center gap-2">
                        {note.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 text-xs font-medium rounded-lg"
                            style={{
                              backgroundColor: tag === 'High Priority' ? '#fef2f2' : tag === 'Discovery' ? '#ecfdf5' : tag === 'Budget' ? '#eff6ff' : tag === 'Timeline' ? '#fef3c7' : '#f3f5f5',
                              color: tag === 'High Priority' ? '#dc2626' : tag === 'Discovery' ? '#059669' : tag === 'Budget' ? '#1c64f2' : tag === 'Timeline' ? '#d97706' : '#706f69'
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
            <div className="bg-white rounded-2xl border p-8 text-center" style={{ borderColor: '#e7e7e6' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#f3f5f5' }}>
                <StickyNote size={24} style={{ color: '#706f69' }} />
              </div>
              <p className="text-lg font-semibold" style={{ color: '#111928' }}>No Notes Yet</p>
              <p className="text-sm mt-2" style={{ color: '#706f69' }}>Add your first note about {contact.name}.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
