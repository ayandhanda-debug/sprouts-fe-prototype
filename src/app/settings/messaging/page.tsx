'use client';

import { useRef, useState, type ReactNode } from 'react';
import {
  Box,
  CheckCircle2,
  Database,
  Eye,
  FileText,
  Globe,
  Link2,
  MessageSquareText,
  Plus,
  RefreshCcw,
  Sparkles,
  Trash2,
  Upload,
  UsersRound,
  X,
  MoreHorizontal,
} from 'lucide-react';

const painpoints = [
  'Generic shopping experiences and marketing campaigns lead to low customer engagement and c ...show more',
  'Out-of-stock instances and high inventory costs reduce profitability and shelf availability ...show more',
  'Poor demand forecasting causes over $1.7 trillion annual losses from inventory decisions',
  'Unpredictable consumer behavior causes stockouts and excess inventory waste with over $1.7 ...show more',
  'Generic shopping experiences fail to cater to individual visitor needs',
  'Disjointed customer experiences and manual personalization limit engagement and revenue',
  'Manual merchandising efforts and campaign costs increase as product range expands',
  'Data silos prevent actionable customer insights and targeted marketing strategies',
  'Manual mediation tasks consume excessive time and resources',
  'Lack of real-time CPM data leads to costly revenue errors',
];

const customers = ['Capillary', 'Hevo Data', 'SmartKargo', 'Aon Corporation', 'Razorpay'];

const offerings = [
  {
    title: 'Vendor Link Supplier Collaboration',
    description:
      'Supplier collaboration platform that streamlines vendor management processes, reduces order management costs, improves transparency and availability, and enhances promotional planning through transparent end-to-end supplier coordination.',
  },
  {
    title: 'Customer Journey Orchestration (CJO)',
    description:
      'Marketing automation platform that optimizes campaigns across multiple channels using unified customer data and AI recommendations for high-impact communication journeys.',
  },
];

const recommendedSignals = [
  {
    category: 'problem_based',
    signal_name: 'Release Testing Delays',
    signal:
      'Does [company] report slow releases due to testing bottlenecks or QA constraints?',
    relevance: 'high',
  },
  {
    category: 'problem_based',
    signal_name: 'Late Performance Issues',
    signal:
      'Has [company] experienced production outages or latency issues tied to application performance?',
    relevance: 'high',
  },
  {
    category: 'problem_based',
    signal_name: 'Manual Invoice Processing',
    signal:
      'Does [company] mention manual invoice processing or accounts payable inefficiencies?',
    relevance: 'high',
  },
  {
    category: 'technology',
    signal_name: 'Legacy Modernization Need',
    signal:
      'Is [company] still running legacy applications, monoliths, or outdated enterprise platforms?',
    relevance: 'high',
  },
  {
    category: 'technology',
    signal_name: 'Weak Security Posture',
    signal:
      'Does [company] lack visible application security testing, red teaming, or managed monitoring?',
    relevance: 'high',
  },
  {
    category: 'technology',
    signal_name: 'DataStax Stack Usage',
    signal:
      'Is [company] using DataStax, Cassandra, or real-time streaming architectures at scale?',
    relevance: 'medium',
  },
  {
    category: 'hiring',
    signal_name: 'QA Automation Hiring',
    signal:
      'Is [company] hiring QA automation, SDET, or quality engineering leaders?',
    relevance: 'high',
  },
  {
    category: 'hiring',
    signal_name: 'Cloud Modernization Hiring',
    signal:
      'Is [company] hiring cloud architects, platform engineers, or microservices developers?',
    relevance: 'high',
  },
  {
    category: 'hiring',
    signal_name: 'Cybersecurity Hiring Surge',
    signal:
      'Is [company] hiring application security, penetration testing, or SOC roles?',
    relevance: 'medium',
  },
  {
    category: 'strategic',
    signal_name: 'Digital Product Expansion',
    signal:
      'Is [company] launching new digital products requiring faster, safer software delivery?',
    relevance: 'high',
  },
  {
    category: 'strategic',
    signal_name: 'Banking Personalization Push',
    signal:
      'Is [company] a bank investing in customer analytics or next-best-action initiatives?',
    relevance: 'high',
  },
  {
    category: 'strategic',
    signal_name: 'Healthcare Engagement Initiative',
    signal:
      'Is [company] expanding patient engagement, remote monitoring, or digital health programs?',
    relevance: 'medium',
  },
  {
    category: 'funding',
    signal_name: 'Growth Stage Investment',
    signal:
      'Has [company] recently raised growth funding for product scaling or digital transformation?',
    relevance: 'medium',
  },
  {
    category: 'competitive',
    signal_name: 'Legacy Testing Vendor',
    signal:
      'Is [company] using legacy testing vendors or manual-heavy QA service providers?',
    relevance: 'high',
  },
];

const features = [
  'Context-aware outreach generation',
  'AI reasoning for each message',
  'Content-aware proof point selection',
  'Role-based personalization controls',
];

const outcomes = [
  'Higher reply rates from targeted outreach',
  'Lower manual prompt-editing overhead',
  'Faster campaign launch cycles for SDR teams',
  'More consistent messaging quality across reps',
];

const productInsights = [
  'Product docs',
  'Case studies',
  'Sales decks',
  'Website pages',
];

const testimonials = [
  {
    quote:
      'Sprouts helped us cut campaign build time by 42% while improving response quality across outbound sequences.',
    name: 'Aditi Mehra',
    title: 'VP Marketing',
    company: 'Capillary',
    sourcePage: '/customer-stories/capillary',
  },
  {
    quote:
      'We finally aligned product messaging with sales execution. Reps now use approved proof points without heavy prompt editing.',
    name: 'Rohan Desai',
    title: 'Director, Revenue Operations',
    company: 'Razorpay',
    sourcePage: '/case-studies/razorpay-growth',
  },
  {
    quote:
      'The platform surfaced the exact case studies our SDR team needed for enterprise outreach in logistics.',
    name: 'Nidhi Venkataraman',
    title: 'Head of Demand Gen',
    company: 'SmartKargo',
    sourcePage: '/resources/logistics-ai-success',
  },
];

type SettingsMode = 'standard' | 'advanced';
type UploadMode = 'files' | 'website';
type SourceType = 'Website' | 'Upload';
type RepositoryStatus = 'active' | 'processing' | 'failed' | 'partial' | 'disabled';

interface RepositoryItem {
  id: string;
  title: string;
  source: SourceType;
  category: 'Products & Services' | 'Case Studies' | 'Blogs' | 'Sales Pages' | 'Uploaded Files';
  lastUploaded: string;
  status: RepositoryStatus;
  usedInMessages: number;
  useInContext: boolean;
}

interface PromptInsertOption {
  token: string;
  label: string;
  group: 'PPFO' | 'Insights' | 'Repository';
}

type GraphEntityType =
  | 'PROCESS'
  | 'PRODUCT'
  | 'PAIN_POINT'
  | 'METRIC'
  | 'FEATURE'
  | 'OUTCOME'
  | 'ORGANIZATION'
  | 'INTEGRATION';

interface GraphEntityNode {
  id: string;
  name: string;
  type: GraphEntityType;
  description: string;
  mentionCount: number;
  confidence: number;
}

interface ContextBlock {
  title: string;
  kind: 'Insight' | 'Painpoint';
  context: string;
  evidence: string[];
}

const toPromptToken = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 42);

const initialRepository: RepositoryItem[] = [
  {
    id: 'repo-1',
    title: 'sprouts.ai',
    source: 'Website',
    category: 'Products & Services',
    lastUploaded: 'Mar 15, 2026',
    status: 'active',
    usedInMessages: 41,
    useInContext: true,
  },
  {
    id: 'repo-2',
    title: 'Logistics AI Case Study - DTDC',
    source: 'Website',
    category: 'Case Studies',
    lastUploaded: 'Mar 14, 2026',
    status: 'active',
    usedInMessages: 29,
    useInContext: true,
  },
  {
    id: 'repo-3',
    title: 'B2B Sales Automation Guide',
    source: 'Upload',
    category: 'Uploaded Files',
    lastUploaded: 'Mar 10, 2026',
    status: 'active',
    usedInMessages: 17,
    useInContext: true,
  },
  {
    id: 'repo-4',
    title: 'Q4 2025 Sales Deck',
    source: 'Upload',
    category: 'Uploaded Files',
    lastUploaded: 'Mar 08, 2026',
    status: 'processing',
    usedInMessages: 0,
    useInContext: true,
  },
  {
    id: 'repo-5',
    title: 'Global Retail Personalization Blog',
    source: 'Website',
    category: 'Blogs',
    lastUploaded: 'Mar 12, 2026',
    status: 'partial',
    usedInMessages: 9,
    useInContext: true,
  },
  {
    id: 'repo-6',
    title: 'gartner-2026-magic-quadrant.pdf',
    source: 'Upload',
    category: 'Uploaded Files',
    lastUploaded: 'Mar 07, 2026',
    status: 'failed',
    usedInMessages: 0,
    useInContext: false,
  },
];

const statusMeta: Record<RepositoryStatus, { label: string; bg: string; color: string }> = {
  active: { label: 'Active', bg: '#d1fae5', color: '#047857' },
  processing: { label: 'Processing', bg: '#fef3c7', color: '#b45309' },
  failed: { label: 'Failed', bg: '#fee2e2', color: '#b91c1c' },
  partial: { label: 'Partial', bg: '#e0e7ff', color: '#4338ca' },
  disabled: { label: 'Disabled', bg: '#e5e7eb', color: '#4b5563' },
};

const graphEntityTypeLabel: Record<GraphEntityType, string> = {
  PROCESS: 'Process',
  PRODUCT: 'Product',
  PAIN_POINT: 'Pain point',
  METRIC: 'Metric',
  FEATURE: 'Feature',
  OUTCOME: 'Outcome',
  ORGANIZATION: 'Organization',
  INTEGRATION: 'Integration',
};

const sampleGraphEntities: GraphEntityNode[] = [
  {
    id: '1d407be1-b290-4781-9371-3439a2359f58',
    name: 'Waterfall Project Management',
    type: 'PROCESS',
    description:
      'Sequential project methodology with phases, milestones and long-range planning.',
    mentionCount: 2,
    confidence: 0.91,
  },
  {
    id: 'dd50a494-48f2-469c-9b39-dd7fc80d1647',
    name: 'MindStaq Platform',
    type: 'PRODUCT',
    description:
      'Unified work management platform consolidating tools into a single operating interface.',
    mentionCount: 2,
    confidence: 0.95,
  },
  {
    id: '09d74e80-c374-498e-a5e9-8ff40dbf8e04',
    name: 'Technology Bloat Problem',
    type: 'PAIN_POINT',
    description:
      'Tool overlap and poor integration creates silos, slows decisions, and wastes team time.',
    mentionCount: 2,
    confidence: 0.93,
  },
  {
    id: '426f3738-8965-4d2c-8558-02583d10251e',
    name: 'Digital Transformation Failure Rate',
    type: 'METRIC',
    description:
      '70% of transformation efforts fail despite high annual spend across enterprises.',
    mentionCount: 1,
    confidence: 0.88,
  },
  {
    id: 'cdb1a2d9-7ddf-49b4-82a5-ed0eae2b629c',
    name: 'Unified Work Dashboard',
    type: 'FEATURE',
    description:
      'Single-pane visibility for task status, workload, dependencies and performance.',
    mentionCount: 1,
    confidence: 0.9,
  },
  {
    id: 'c4b70aaa-70ea-48b3-8c2a-1c636de0d076',
    name: 'Execution Speed Improvement',
    type: 'OUTCOME',
    description:
      'Case study indicates faster execution cycles through centralized work coordination.',
    mentionCount: 1,
    confidence: 0.9,
  },
  {
    id: 'cc408f6d-e519-4cc7-bffb-8389409233c5',
    name: 'Financial Institution Case Study',
    type: 'ORGANIZATION',
    description:
      'Reference customer showing faster execution and fewer manual status operations.',
    mentionCount: 1,
    confidence: 0.85,
  },
  {
    id: 'a748d423-9d10-4516-93ce-7d04ea8c0448',
    name: 'Jira Integration',
    type: 'INTEGRATION',
    description:
      'Agile tracker integration noted as part of fragmented tooling workflows.',
    mentionCount: 1,
    confidence: 0.86,
  },
];

const sampleContextBlocks: ContextBlock[] = [
  {
    title: '50% Faster Execution and Zero Manual Reports',
    kind: 'Insight',
    context:
      'MindStaq identifies heavy app switching and manual reporting overhead, then consolidates operations into a unified source of truth with real-time visibility.',
    evidence: ['https://www.mindstaq.com/'],
  },
  {
    title:
      "Too many tools overlap, don't integrate, and add complexity instead of clarity",
    kind: 'Painpoint',
    context:
      'Enterprises using 1,000+ apps with low integration are forced into fragmented workflows that waste time and erode decision quality.',
    evidence: ['https://www.mindstaq.com/'],
  },
];

function CheckboxRow({
  title,
  dense = false,
}: {
  title: string;
  dense?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border px-3 ${dense ? 'py-3' : 'py-4'} flex items-start justify-between gap-3`}
      style={{ borderColor: '#dce0e4', backgroundColor: '#f7f8f9' }}
    >
      <div className="flex items-start gap-3">
        <input type="checkbox" className="mt-1.5 w-4 h-4" />
        <p className="text-[16px] leading-[1.35]" style={{ color: '#3d4a54' }}>
          {title}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-1.5" style={{ color: '#7f8b93' }}>
        {!dense && <Sparkles size={14} />}
        <Link2 size={14} />
      </div>
    </div>
  );
}

function StandardConfiguration() {
  const [selectedRecommendedSignalNames, setSelectedRecommendedSignalNames] = useState<string[]>(
    []
  );
  const [isRunningSignalsOnTal, setIsRunningSignalsOnTal] = useState(false);
  const [runSignalStatus, setRunSignalStatus] = useState('');

  const allRecommendedSignalsSelected =
    recommendedSignals.length > 0 &&
    selectedRecommendedSignalNames.length === recommendedSignals.length;

  const toggleRecommendedSignal = (signalName: string) => {
    setSelectedRecommendedSignalNames((current) =>
      current.includes(signalName)
        ? current.filter((name) => name !== signalName)
        : [...current, signalName]
    );
  };

  const toggleAllRecommendedSignals = () => {
    setSelectedRecommendedSignalNames((current) =>
      current.length === recommendedSignals.length
        ? []
        : recommendedSignals.map((item) => item.signal_name)
    );
  };

  const handleRunSignalsOnTal = () => {
    if (selectedRecommendedSignalNames.length === 0) {
      setRunSignalStatus('Select at least one recommended signal to run on TAL.');
      return;
    }

    setIsRunningSignalsOnTal(true);
    setRunSignalStatus('');
    setTimeout(() => {
      setIsRunningSignalsOnTal(false);
      setRunSignalStatus(
        `Queued ${selectedRecommendedSignalNames.length} signal(s) to run on TAL from ai-hpm-dev.`
      );
    }, 1000);
  };

  return (
    <div className="grid grid-cols-[1.65fr_1fr] gap-3">
      <div className="space-y-3">
        <section className="rounded-xl border bg-[#f4f6f7]" style={{ borderColor: '#dce0e4' }}>
          <div className="p-3 border-b" style={{ borderColor: '#dce0e4' }}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[20px] leading-none font-semibold flex items-center gap-2" style={{ color: '#313f49' }}>
                <Sparkles size={16} />
                PPFOs Config
              </h3>
              <span className="text-[14px] leading-none font-medium" style={{ color: '#707d86' }}>
                Updated: 03 Mar, 2026
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-3 h-8 rounded-lg inline-flex items-center text-[14px] font-semibold" style={{ backgroundColor: '#eceff3', color: '#434e58' }}>
                  Painpoints 26
                </span>
                <span className="px-3 h-8 rounded-lg inline-flex items-center text-[14px] font-semibold" style={{ backgroundColor: '#eceff3', color: '#434e58' }}>
                  Features 38
                </span>
                <span className="px-3 h-8 rounded-lg inline-flex items-center text-[14px] font-semibold" style={{ backgroundColor: '#eceff3', color: '#434e58' }}>
                  Outcomes 38
                </span>
              </div>
              <button
                className="h-9 px-4 rounded-lg border inline-flex items-center gap-2 text-[14px] leading-none font-medium"
                style={{ borderColor: '#d8dde1', color: '#45535e', backgroundColor: '#f8f9fb' }}
              >
                <Plus size={15} />
                Add
              </button>
            </div>
          </div>

          <div className="p-3 space-y-2 max-h-[560px] overflow-y-auto">
            <label className="h-8 px-1 inline-flex items-center gap-2 text-[14px] leading-none font-medium" style={{ color: '#3d4a54' }}>
              <input type="checkbox" className="w-4 h-4" />
              Select All
            </label>
            {painpoints.map((item) => (
              <CheckboxRow key={item} title={item} />
            ))}
          </div>
        </section>

        <section className="rounded-xl border bg-[#f4f6f7]" style={{ borderColor: '#dce0e4' }}>
          <div className="h-14 px-4 border-b flex items-center justify-between" style={{ borderColor: '#dce0e4' }}>
            <h3 className="text-[18px] leading-none font-semibold flex items-center gap-2" style={{ color: '#313f49' }}>
              <MessageSquareText size={16} />
              Website Testimonials
            </h3>
            <span className="text-[12px] font-semibold px-2.5 h-7 rounded-full inline-flex items-center" style={{ backgroundColor: '#e8edf2', color: '#51606b' }}>
              {testimonials.length} captured
            </span>
          </div>

          <div className="p-3 space-y-2 max-h-[360px] overflow-y-auto">
            {testimonials.map((item) => (
              <div
                key={`${item.name}-${item.company}`}
                className="rounded-xl border p-3"
                style={{ borderColor: '#dce0e4', backgroundColor: '#f7f8f9' }}
              >
                <p className="text-[14px] leading-[1.35]" style={{ color: '#374651' }}>
                  "{item.quote}"
                </p>
                <div className="mt-2 pt-2 border-t flex items-center justify-between" style={{ borderColor: '#dce0e4' }}>
                  <div>
                    <p className="text-[14px] font-semibold leading-none" style={{ color: '#313f49' }}>
                      {item.name}
                    </p>
                    <p className="mt-1 text-[12px] leading-none" style={{ color: '#6f7c86' }}>
                      {item.title}, {item.company}
                    </p>
                  </div>
                  <span
                    className="text-[11px] font-semibold px-2 py-1 rounded-md border"
                    style={{ borderColor: '#d6dde3', color: '#5b6872', backgroundColor: '#eef2f6' }}
                  >
                    {item.sourcePage}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="space-y-3">
        <section className="rounded-xl border bg-[#f4f6f7]" style={{ borderColor: '#dce0e4' }}>
          <div className="h-14 px-4 border-b flex items-center gap-2" style={{ borderColor: '#dce0e4' }}>
            <UsersRound size={16} style={{ color: '#50606b' }} />
            <h3 className="text-[20px] leading-none font-semibold" style={{ color: '#313f49' }}>
              Active Customers 25/25
            </h3>
          </div>
          <div className="p-3 space-y-2 max-h-[360px] overflow-y-auto pr-1">
            <label className="h-8 px-1 inline-flex items-center gap-2 text-[14px] leading-none font-medium" style={{ color: '#3d4a54' }}>
              <input type="checkbox" className="w-4 h-4" />
              Select All
            </label>
            {customers.map((customer) => (
              <div
                key={customer}
                className="rounded-xl border px-3 py-3 flex items-center gap-2"
                style={{ borderColor: '#dce0e4', backgroundColor: '#f7f8f9' }}
              >
                <input type="checkbox" className="w-4 h-4" />
                <CheckCircle2 size={16} style={{ color: '#55b969' }} />
                <p className="text-[16px] leading-none font-medium" style={{ color: '#46535d' }}>
                  {customer}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border bg-[#f4f6f7]" style={{ borderColor: '#dce0e4' }}>
          <div className="h-14 px-4 border-b flex items-center gap-2" style={{ borderColor: '#dce0e4' }}>
            <Box size={16} style={{ color: '#50606b' }} />
            <h3 className="text-[20px] leading-none font-semibold" style={{ color: '#313f49' }}>
              Offerings 23/25
            </h3>
          </div>

          <div className="p-3 space-y-2">
            <label className="h-8 px-1 inline-flex items-center gap-2 text-[14px] leading-none font-medium" style={{ color: '#3d4a54' }}>
              <input type="checkbox" className="w-4 h-4" />
              Select All
            </label>
            {offerings.map((offering) => (
              <div
                key={offering.title}
                className="rounded-xl border px-3 py-3"
                style={{ borderColor: '#dce0e4', backgroundColor: '#f7f8f9' }}
              >
                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1 w-4 h-4" />
                  <div>
                    <p className="text-[16px] leading-none font-semibold mb-1" style={{ color: '#44515b' }}>
                      {offering.title}
                    </p>
                    <p className="text-[13px] leading-[1.25]" style={{ color: '#73808a' }}>
                      {offering.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border bg-[#f4f6f7]" style={{ borderColor: '#dce0e4' }}>
          <div className="h-14 px-4 border-b flex items-center justify-between gap-2" style={{ borderColor: '#dce0e4' }}>
            <div className="flex items-center gap-2">
              <Sparkles size={16} style={{ color: '#50606b' }} />
              <h3 className="text-[18px] leading-none font-semibold" style={{ color: '#313f49' }}>
                Recommended Signals
              </h3>
            </div>
            <button
              type="button"
              onClick={handleRunSignalsOnTal}
              disabled={isRunningSignalsOnTal || selectedRecommendedSignalNames.length === 0}
              className="h-8 px-3 rounded-lg text-[13px] font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#2467f4' }}
            >
              {isRunningSignalsOnTal
                ? 'Running...'
                : `Run on TAL${selectedRecommendedSignalNames.length > 0 ? ` (${selectedRecommendedSignalNames.length})` : ''}`}
            </button>
          </div>

          <div className="p-3 space-y-2 max-h-[380px] overflow-y-auto pr-1">
            <div className="flex items-center justify-between">
              <label
                className="h-8 px-1 inline-flex items-center gap-2 text-[14px] leading-none font-medium"
                style={{ color: '#3d4a54' }}
              >
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={allRecommendedSignalsSelected}
                  onChange={toggleAllRecommendedSignals}
                />
                Select All
              </label>
              <span
                className="px-2 py-1 rounded-md text-[11px] font-semibold border"
                style={{ borderColor: '#d6dde3', color: '#5b6872', backgroundColor: '#eef2f6' }}
              >
                ai-hpm-dev
              </span>
            </div>

            <p className="text-[12px] px-1" style={{ color: '#6f7c86' }}>
              Showing 3 of {recommendedSignals.length} recommended signals
            </p>

            {recommendedSignals.map((signalItem) => {
              const isChecked = selectedRecommendedSignalNames.includes(signalItem.signal_name);
              return (
                <div
                  key={signalItem.signal_name}
                  className="rounded-xl border px-3 py-3"
                  style={{
                    borderColor: isChecked ? '#bfd4ff' : '#dce0e4',
                    backgroundColor: isChecked ? '#eef4ff' : '#f7f8f9',
                  }}
                >
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      className="mt-1 w-4 h-4"
                      checked={isChecked}
                      onChange={() => toggleRecommendedSignal(signalItem.signal_name)}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="text-[15px] leading-none font-semibold" style={{ color: '#44515b' }}>
                          {signalItem.signal_name}
                        </p>
                        <span
                          className="px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase"
                          style={{
                            backgroundColor:
                              signalItem.relevance === 'high' ? '#dbeafe' : '#ede9fe',
                            color: signalItem.relevance === 'high' ? '#1d4ed8' : '#5b21b6',
                          }}
                        >
                          {signalItem.relevance}
                        </span>
                      </div>
                      <p className="text-[13px] leading-[1.25]" style={{ color: '#73808a' }}>
                        {signalItem.signal}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {runSignalStatus && (
              <p className="text-[12px] leading-none px-1 pt-1" style={{ color: '#5f6f7a' }}>
                {runSignalStatus}
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function SettingsMessagingPage() {
  const [mode, setMode] = useState<SettingsMode>('standard');
  const [repositoryItems, setRepositoryItems] = useState<RepositoryItem[]>(initialRepository);
  const [openMenuRowId, setOpenMenuRowId] = useState<string | null>(null);
  const [viewRepositoryRowId, setViewRepositoryRowId] = useState<string | null>(null);
  const [configWebsiteUrl, setConfigWebsiteUrl] = useState('sprouts.ai/dashboard');
  const [isQuickEnriching, setIsQuickEnriching] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadMode, setUploadMode] = useState<UploadMode>('files');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [systemPrompt, setSystemPrompt] = useState(
    'Write concise, proof-backed outreach in a consultative tone. Keep the first message under 90 words, mention one relevant customer proof point, and end with a low-friction CTA.'
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const promptTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [showPromptInsertMenu, setShowPromptInsertMenu] = useState(false);
  const [slashQuery, setSlashQuery] = useState('');
  const [slashReplaceRange, setSlashReplaceRange] = useState<{ start: number; end: number } | null>(null);
  const [activeInsertIndex, setActiveInsertIndex] = useState(0);
  const viewRepositoryItem =
    repositoryItems.find((item) => item.id === viewRepositoryRowId) ?? null;
  const extractedEntities =
    viewRepositoryItem?.source === 'Website'
      ? sampleGraphEntities.filter((entity) => entity.type !== 'INTEGRATION')
      : sampleGraphEntities;
  const entityTypeCounts = extractedEntities.reduce<Record<GraphEntityType, number>>(
    (acc, entity) => {
      acc[entity.type] = (acc[entity.type] ?? 0) + 1;
      return acc;
    },
    {
      PROCESS: 0,
      PRODUCT: 0,
      PAIN_POINT: 0,
      METRIC: 0,
      FEATURE: 0,
      OUTCOME: 0,
      ORGANIZATION: 0,
      INTEGRATION: 0,
    }
  );

  const promptInsertOptions: PromptInsertOption[] = [
    { token: '/ppfo_painpoints', label: `Painpoints (${painpoints.length})`, group: 'PPFO' },
    { token: '/ppfo_features', label: `Features (${features.length})`, group: 'PPFO' },
    { token: '/ppfo_outcomes', label: `Outcomes (${outcomes.length})`, group: 'PPFO' },
    ...painpoints.map((painpoint, index) => ({
      token: `/painpoint_${index + 1}`,
      label: painpoint.replace(' ...show more', ''),
      group: 'PPFO' as const,
    })),
    ...features.map((feature) => ({
      token: `/feature_${toPromptToken(feature)}`,
      label: feature,
      group: 'PPFO' as const,
    })),
    ...outcomes.map((outcome) => ({
      token: `/outcome_${toPromptToken(outcome)}`,
      label: outcome,
      group: 'PPFO' as const,
    })),
    { token: '/insight_offerings', label: `Offerings (${offerings.length})`, group: 'Insights' },
    { token: '/insight_testimonials', label: `Testimonials (${testimonials.length})`, group: 'Insights' },
    { token: '/insight_customers', label: `Customers (${customers.length})`, group: 'Insights' },
    { token: '/insight_product', label: `Product Insights (${productInsights.length})`, group: 'Insights' },
    ...customers.map((customer) => ({
      token: `/customer_${toPromptToken(customer)}`,
      label: customer,
      group: 'Insights' as const,
    })),
    ...testimonials.map((testimonial, index) => ({
      token: `/testimonial_${index + 1}`,
      label: `${testimonial.name} - ${testimonial.company}`,
      group: 'Insights' as const,
    })),
    ...productInsights.map((insight) => ({
      token: `/product_${toPromptToken(insight)}`,
      label: insight,
      group: 'Insights' as const,
    })),
    ...offerings.map((offering) => ({
      token: `/offering_${toPromptToken(offering.title)}`,
      label: offering.title,
      group: 'Insights' as const,
    })),
    ...repositoryItems.map((item) => ({
      token: `/file_${toPromptToken(item.title)}`,
      label: item.title,
      group: 'Repository' as const,
    })),
  ];

  const filteredPromptInsertOptions = promptInsertOptions.filter((option) => {
    if (!showPromptInsertMenu) return false;
    const normalized = slashQuery.trim().toLowerCase();
    if (!normalized) return true;
    return option.token.toLowerCase().includes(normalized) || option.label.toLowerCase().includes(normalized);
  });

  const getTodayLabel = () =>
    new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date());

  const handleQuickEnrich = () => {
    setIsQuickEnriching(true);
    setTimeout(() => setIsQuickEnriching(false), 1200);
  };

  const updatePromptSlashState = (value: string, cursorIndex: number) => {
    const valueBeforeCursor = value.slice(0, cursorIndex);
    const slashMatch = valueBeforeCursor.match(/(?:^|\s)\/([a-zA-Z0-9._-]*)$/);
    if (!slashMatch) {
      setShowPromptInsertMenu(false);
      setSlashReplaceRange(null);
      return;
    }

    const rawQuery = slashMatch[1] ?? '';
    const commandStart = cursorIndex - rawQuery.length - 1;
    setShowPromptInsertMenu(true);
    setSlashQuery(rawQuery.toLowerCase());
    setSlashReplaceRange({ start: commandStart, end: cursorIndex });
    setActiveInsertIndex(0);
  };

  const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const nextPrompt = event.target.value;
    const cursorIndex = event.target.selectionStart ?? nextPrompt.length;
    setSystemPrompt(nextPrompt);
    updatePromptSlashState(nextPrompt, cursorIndex);
  };

  const handlePromptCaretChange = (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const cursorIndex = event.currentTarget.selectionStart ?? event.currentTarget.value.length;
    updatePromptSlashState(event.currentTarget.value, cursorIndex);
  };

  const appendPromptToken = (token: string) => {
    setSystemPrompt((prev) => `${prev.trimEnd()} ${token}`.trim());
    setShowPromptInsertMenu(false);
    setSlashReplaceRange(null);
    requestAnimationFrame(() => {
      promptTextareaRef.current?.focus();
    });
  };

  const handleInsertPromptToken = (token: string) => {
    if (!slashReplaceRange) {
      appendPromptToken(token);
      return;
    }
    const nextPrompt = `${systemPrompt.slice(0, slashReplaceRange.start)}${token} ${systemPrompt.slice(slashReplaceRange.end)}`;
    const nextCursorPosition = slashReplaceRange.start + token.length + 1;
    setSystemPrompt(nextPrompt);
    setShowPromptInsertMenu(false);
    setSlashReplaceRange(null);
    requestAnimationFrame(() => {
      if (!promptTextareaRef.current) return;
      promptTextareaRef.current.focus();
      promptTextareaRef.current.setSelectionRange(nextCursorPosition, nextCursorPosition);
    });
  };

  const handlePromptKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!showPromptInsertMenu || filteredPromptInsertOptions.length === 0) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveInsertIndex((prev) => (prev + 1) % filteredPromptInsertOptions.length);
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveInsertIndex((prev) =>
        prev === 0 ? filteredPromptInsertOptions.length - 1 : prev - 1
      );
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      const selectedOption = filteredPromptInsertOptions[activeInsertIndex];
      if (selectedOption) {
        handleInsertPromptToken(selectedOption.token);
      }
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      setShowPromptInsertMenu(false);
      setSlashReplaceRange(null);
    }
  };

  const handleFilePick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).map((file) => file.name);
    if (files.length > 0) {
      setSelectedFiles((prev) => [...prev, ...files]);
    }
  };

  const toggleContextUsage = (rowId: string) => {
    setRepositoryItems((prev) =>
      prev.map((item) =>
        item.id === rowId ? { ...item, useInContext: !item.useInContext } : item
      )
    );
  };

  const handleUploadConfirm = () => {
    const today = getTodayLabel();
    if (uploadMode === 'files') {
      if (selectedFiles.length === 0) return;
      const newItems: RepositoryItem[] = selectedFiles.map((name, idx) => ({
        id: `upload-${Date.now()}-${idx}`,
        title: name,
        source: 'Upload',
        category: 'Uploaded Files',
        lastUploaded: today,
        status: 'processing',
        usedInMessages: 0,
        useInContext: true,
      }));
      setRepositoryItems((prev) => [...newItems, ...prev]);
      setIsUploadModalOpen(false);
      setSelectedFiles([]);
      setTimeout(() => {
        const newIds = new Set(newItems.map((item) => item.id));
        setRepositoryItems((prev) =>
          prev.map((item) => (newIds.has(item.id) ? { ...item, status: 'active' } : item))
        );
      }, 1800);
      return;
    }

    if (!websiteUrl.trim()) return;
    const cleanTitle = websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
    const newWebsite: RepositoryItem = {
      id: `website-${Date.now()}`,
      title: cleanTitle,
      source: 'Website',
      category: 'Sales Pages',
      lastUploaded: today,
      status: 'processing',
      usedInMessages: 0,
      useInContext: true,
    };
    setRepositoryItems((prev) => [newWebsite, ...prev]);
    setIsUploadModalOpen(false);
    setWebsiteUrl('');
    setTimeout(() => {
      setRepositoryItems((prev) =>
        prev.map((item) => (item.id === newWebsite.id ? { ...item, status: 'active' } : item))
      );
    }, 1800);
  };

  const handleRepositoryAction = (
    action: 'view' | 're-crawl' | 'delete',
    rowId: string
  ) => {
    setOpenMenuRowId(null);

    if (action === 'view') {
      setViewRepositoryRowId(rowId);
      return;
    }

    if (action === 'delete') {
      setRepositoryItems((prev) => prev.filter((item) => item.id !== rowId));
      if (viewRepositoryRowId === rowId) {
        setViewRepositoryRowId(null);
      }
      return;
    }

    if (action === 're-crawl') {
      const today = getTodayLabel();
      setRepositoryItems((prev) =>
        prev.map((item) =>
          item.id === rowId ? { ...item, status: 'processing', lastUploaded: today } : item
        )
      );
      setTimeout(() => {
        setRepositoryItems((prev) =>
          prev.map((item) =>
            item.id === rowId
              ? { ...item, status: item.title.toLowerCase().includes('gartner') ? 'failed' : 'active' }
              : item
          )
        );
      }, 1500);
      return;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <h2 className="text-[22px] leading-none font-semibold" style={{ color: '#2a3f4b' }}>
            AI Message Configuration
          </h2>
          <p className="mt-1 text-[13px] leading-none" style={{ color: '#74818b' }}>
            Auto-fill from your domain, then review, edit and manage PPFOs, Customers, Offerings and Knowledge Base assets.
          </p>
          <div
            className="mt-3 inline-flex items-center gap-1 rounded-xl border p-1 relative z-10"
            style={{ borderColor: '#d8dce0', backgroundColor: '#f8f9fb' }}
          >
            <button
              type="button"
              onClick={() => setMode('standard')}
              className="px-4 h-8 rounded-lg text-[13px] font-semibold cursor-pointer"
              style={{
                backgroundColor: mode === 'standard' ? '#ffffff' : 'transparent',
                color: mode === 'standard' ? '#2a3f4b' : '#66727c',
              }}
            >
              Standard
            </button>
            <button
              type="button"
              onClick={() => setMode('advanced')}
              className="px-4 h-8 rounded-lg text-[13px] font-semibold cursor-pointer"
              style={{
                backgroundColor: mode === 'advanced' ? '#ffffff' : 'transparent',
                color: mode === 'advanced' ? '#2a3f4b' : '#66727c',
              }}
            >
              Advanced
            </button>
          </div>
        </div>
        {mode === 'standard' && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <div
              className="h-10 w-[320px] rounded-xl border bg-[#f8f9fb] px-3 flex items-center gap-2"
              style={{ borderColor: '#d8dce0' }}
            >
              <Box size={16} style={{ color: '#6a7680' }} />
              <input
                value={configWebsiteUrl}
                onChange={(event) => setConfigWebsiteUrl(event.target.value)}
                className="w-full bg-transparent text-[14px] outline-none"
                style={{ color: '#45535e' }}
                placeholder="Add website or page URL"
              />
            </div>
            <button
              type="button"
              onClick={handleQuickEnrich}
              className="h-10 px-4 rounded-xl text-[13px] font-semibold text-white cursor-pointer"
              style={{ backgroundColor: '#2467f4' }}
            >
              {isQuickEnriching ? 'Enriching...' : 'Enrich'}
            </button>
          </div>
        )}
      </div>

      {mode === 'standard' && <StandardConfiguration />}

      {mode === 'advanced' && (
        <div className="space-y-3">
          <section className="rounded-xl border bg-[#f7f8f9]" style={{ borderColor: '#dce0e4' }}>
            <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: '#dce0e4' }}>
              <div className="flex items-center gap-2">
                <Database size={18} style={{ color: '#54626e' }} />
                <h3 className="text-[18px] font-semibold" style={{ color: '#2f3f49' }}>
                  Content Repository
                </h3>
                <span
                  className="h-7 px-3 rounded-full text-[13px] font-semibold inline-flex items-center"
                  style={{ backgroundColor: '#e8eaed', color: '#4d5964' }}
                >
                  {repositoryItems.length} items
                </span>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="h-10 px-4 rounded-xl text-[15px] font-semibold text-white inline-flex items-center gap-2"
                style={{ backgroundColor: '#2467f4' }}
              >
                <Upload size={16} />
                Upload Content
              </button>
            </div>

            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: '#dce0e4' }}>
                  <th className="text-left px-4 py-3 text-[13px] font-semibold" style={{ color: '#6f7c86' }}>
                    Title
                  </th>
                  <th className="text-left px-4 py-3 text-[13px] font-semibold" style={{ color: '#6f7c86' }}>
                    Source
                  </th>
                  <th className="text-left px-4 py-3 text-[13px] font-semibold" style={{ color: '#6f7c86' }}>
                    Last Uploaded
                  </th>
                  <th className="text-left px-4 py-3 text-[13px] font-semibold" style={{ color: '#6f7c86' }}>
                    Status
                  </th>
                  <th className="text-left px-4 py-3 text-[13px] font-semibold" style={{ color: '#6f7c86' }}>
                    Use Context
                  </th>
                  <th className="w-12" />
                </tr>
              </thead>
              <tbody>
                {repositoryItems.map((item) => {
                  const meta = statusMeta[item.status];
                  return (
                    <tr key={item.id} className="border-b last:border-b-0" style={{ borderColor: '#dce0e4' }}>
                      <td className="px-4 py-4 text-[16px] font-semibold" style={{ color: '#273640' }}>
                        <div className="flex items-center gap-2">
                          {item.source === 'Website' ? (
                            <Globe size={18} style={{ color: '#677581' }} />
                          ) : (
                            <FileText size={18} style={{ color: '#677581' }} />
                          )}
                          <span>{item.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className="h-8 px-4 rounded-full border text-[13px] font-semibold inline-flex items-center"
                          style={{ borderColor: '#d0d5da', color: '#37444f', backgroundColor: '#f7f8f9' }}
                        >
                          {item.source}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-[16px]" style={{ color: '#6b7682' }}>
                        {item.lastUploaded}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className="h-8 px-4 rounded-full text-[13px] font-semibold inline-flex items-center"
                          style={{ backgroundColor: meta.bg, color: meta.color }}
                        >
                          {meta.label}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          type="button"
                          onClick={() => toggleContextUsage(item.id)}
                          className="h-7 px-0 inline-flex items-center gap-2"
                          style={{ color: item.useInContext ? '#1d4ed8' : '#6b7280' }}
                        >
                          <span
                            className="h-4 w-8 rounded-full p-0.5 inline-flex"
                            style={{
                              backgroundColor: item.useInContext ? '#2563eb' : '#cbd5e1',
                              justifyContent: item.useInContext ? 'flex-end' : 'flex-start',
                            }}
                          >
                            <span className="h-3 w-3 rounded-full bg-white" />
                          </span>
                          <span className="text-[11px] font-semibold">
                            {item.useInContext ? 'On' : 'Off'}
                          </span>
                        </button>
                      </td>
                      <td className="px-2 py-4 relative">
                        <button
                          onClick={() => setOpenMenuRowId(openMenuRowId === item.id ? null : item.id)}
                          className="h-8 w-8 rounded-lg inline-flex items-center justify-center hover:bg-[#eceff3]"
                        >
                          <MoreHorizontal size={18} style={{ color: '#6f7b86' }} />
                        </button>

                        {openMenuRowId === item.id && (
                          <div
                            className="absolute right-3 top-12 z-10 w-44 rounded-xl border shadow-md p-1.5"
                            style={{ borderColor: '#dce0e4', backgroundColor: '#ffffff' }}
                          >
                            <ActionButton label="View" icon={<Eye size={15} />} onClick={() => handleRepositoryAction('view', item.id)} />
                            <ActionButton label="Re-crawl" icon={<RefreshCcw size={15} />} onClick={() => handleRepositoryAction('re-crawl', item.id)} />
                            <ActionButton
                              label="Delete"
                              icon={<Trash2 size={15} />}
                              danger
                              onClick={() => handleRepositoryAction('delete', item.id)}
                            />
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>

          <section className="rounded-xl border bg-[#f4f6f7] p-4" style={{ borderColor: '#dce0e4' }}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-[17px] font-semibold" style={{ color: '#2f3f49' }}>
                  System Prompt
                </h3>
                <p className="mt-1 text-[13px]" style={{ color: '#6f7c86' }}>
                  Define how AI should write messages, your tone, constraints, and any conditions.
                </p>
              </div>
              <span
                className="h-6 px-2 rounded-md text-[11px] font-semibold inline-flex items-center"
                style={{ backgroundColor: '#e9edf2', color: '#52606b' }}
              >
                {systemPrompt.length} chars
              </span>
            </div>

            <p className="mt-2 text-[12px] leading-none" style={{ color: '#6f7c86' }}>
              Type <span className="font-semibold">/</span> to insert PPFOs, product insights, offerings, testimonials, or repository files.
            </p>
            <div className="mt-2 relative">
              <textarea
                ref={promptTextareaRef}
                value={systemPrompt}
                onChange={handlePromptChange}
                onClick={handlePromptCaretChange}
                onKeyUp={handlePromptCaretChange}
                onKeyDown={handlePromptKeyDown}
                onBlur={() => {
                  setTimeout(() => setShowPromptInsertMenu(false), 100);
                }}
                className="w-full rounded-lg border px-3 py-2 text-[13px] leading-snug resize-none"
                style={{ borderColor: '#d7dce1', color: '#33424d', backgroundColor: '#fbfcfd', minHeight: '132px' }}
                placeholder="Example: Use a warm but direct tone, reference one proof point max, avoid generic openers, and tailor CTA by role."
              />
              {showPromptInsertMenu && filteredPromptInsertOptions.length > 0 && (
                <div
                  className="absolute top-[calc(100%+6px)] left-0 right-0 rounded-xl border shadow-lg z-20 max-h-52 overflow-y-auto"
                  style={{ borderColor: '#d7dce1', backgroundColor: '#ffffff' }}
                >
                  {filteredPromptInsertOptions.map((option, index) => (
                    <button
                      key={`${option.group}-${option.token}`}
                      type="button"
                      onMouseDown={(event) => {
                        event.preventDefault();
                        handleInsertPromptToken(option.token);
                      }}
                      className="w-full px-3 py-2 text-left flex items-center justify-between border-b last:border-b-0"
                      style={{
                        borderColor: '#edf1f4',
                        backgroundColor: activeInsertIndex === index ? '#f2f6fc' : '#ffffff',
                      }}
                    >
                      <div className="min-w-0">
                        <p className="text-[12px] font-semibold truncate" style={{ color: '#2f3f49' }}>
                          {option.label}
                        </p>
                        <p className="text-[11px] truncate" style={{ color: '#6f7c86' }}>
                          {option.group}
                        </p>
                      </div>
                      <span className="text-[11px] font-semibold ml-3" style={{ color: '#2563eb' }}>
                        {option.token}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-2 flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {promptInsertOptions.slice(0, 8).map((option) => (
                  <button
                    key={`chip-${option.token}`}
                    type="button"
                    onClick={() => appendPromptToken(option.token)}
                    className="h-7 px-2.5 rounded-md text-[12px] font-semibold inline-flex items-center border"
                    style={{ backgroundColor: '#e9edf2', color: '#475561', borderColor: '#d7dce1' }}
                  >
                    {option.token}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setSystemPrompt('')}
                className="h-8 px-3 rounded-lg text-[12px] font-semibold border"
                style={{ borderColor: '#d7dce1', color: '#5c6974', backgroundColor: '#ffffff' }}
              >
                Clear Prompt
              </button>
            </div>
          </section>
        </div>
      )}

      {viewRepositoryItem && (
        <div
          className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center p-4"
          onClick={() => setViewRepositoryRowId(null)}
        >
          <div
            className="w-full max-w-[920px] rounded-2xl border shadow-xl p-4 max-h-[84vh] overflow-y-auto"
            style={{ borderColor: '#dce0e4', backgroundColor: '#f8f9fb' }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-[24px] leading-none font-semibold" style={{ color: '#1f2f3a' }}>
                  Extracted Entities Preview
                </h3>
                <p className="mt-1 text-[13px]" style={{ color: '#6f7c86' }}>
                  {viewRepositoryItem.title} · {viewRepositoryItem.source}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewRepositoryRowId(null)}
                className="h-9 w-9 rounded-lg inline-flex items-center justify-center hover:bg-[#eceff3]"
              >
                <X size={20} style={{ color: '#6f7c86' }} />
              </button>
            </div>

            <div className="mt-3 grid grid-cols-[1.55fr_1fr] gap-3">
              <section className="rounded-xl border bg-white p-3" style={{ borderColor: '#dce0e4' }}>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h4 className="text-[16px] font-semibold" style={{ color: '#2f3f49' }}>
                    Key Entities ({extractedEntities.length})
                  </h4>
                  <span
                    className="h-7 px-2.5 rounded-full text-[12px] font-semibold inline-flex items-center"
                    style={{ backgroundColor: '#eef2ff', color: '#4338ca' }}
                  >
                    Graph API
                  </span>
                </div>
                <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                  {extractedEntities.map((entity) => (
                    <div
                      key={entity.id}
                      className="rounded-lg border p-2.5"
                      style={{ borderColor: '#e3e7eb', backgroundColor: '#fbfcfd' }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[14px] font-semibold" style={{ color: '#263640' }}>
                          {entity.name}
                        </p>
                        <span
                          className="h-6 px-2 rounded-md text-[11px] font-semibold inline-flex items-center"
                          style={{ backgroundColor: '#edf2f7', color: '#4f5f6b' }}
                        >
                          {graphEntityTypeLabel[entity.type]}
                        </span>
                      </div>
                      <p className="mt-1 text-[12px] leading-snug" style={{ color: '#677581' }}>
                        {entity.description}
                      </p>
                      <div className="mt-1.5 flex items-center gap-3 text-[11px] font-semibold" style={{ color: '#63717d' }}>
                        <span>Mentions: {entity.mentionCount}</span>
                        <span>Confidence: {(entity.confidence * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-xl border bg-white p-3" style={{ borderColor: '#dce0e4' }}>
                <h4 className="text-[16px] font-semibold mb-2" style={{ color: '#2f3f49' }}>
                  Extraction Summary
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(graphEntityTypeLabel) as GraphEntityType[]).map((type) =>
                    entityTypeCounts[type] > 0 ? (
                      <div
                        key={type}
                        className="rounded-lg border px-2.5 py-2"
                        style={{ borderColor: '#e3e7eb', backgroundColor: '#f9fafb' }}
                      >
                        <p className="text-[11px] font-semibold" style={{ color: '#6c7882' }}>
                          {graphEntityTypeLabel[type]}
                        </p>
                        <p className="text-[18px] font-semibold leading-none mt-1" style={{ color: '#2a3d48' }}>
                          {entityTypeCounts[type]}
                        </p>
                      </div>
                    ) : null
                  )}
                </div>

                <div className="mt-3 rounded-lg border p-2.5" style={{ borderColor: '#e3e7eb', backgroundColor: '#f9fafb' }}>
                  <p className="text-[12px] font-semibold" style={{ color: '#53616c' }}>
                    Metadata
                  </p>
                  <p className="mt-1 text-[12px]" style={{ color: '#6f7c86' }}>
                    Entities found: 20
                  </p>
                  <p className="text-[12px]" style={{ color: '#6f7c86' }}>
                    Chunks analyzed: 19
                  </p>
                  <p className="text-[12px]" style={{ color: '#6f7c86' }}>
                    Query time: 6507 ms
                  </p>
                </div>
              </section>
            </div>

            <section className="mt-3 rounded-xl border bg-white p-3" style={{ borderColor: '#dce0e4' }}>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h4 className="text-[16px] font-semibold" style={{ color: '#2f3f49' }}>
                  Retrieval Context
                </h4>
                <span
                  className="h-7 px-2.5 rounded-full text-[12px] font-semibold inline-flex items-center"
                  style={{ backgroundColor: '#ecfeff', color: '#0f766e' }}
                >
                  Context API
                </span>
              </div>
              <div className="space-y-2">
                {sampleContextBlocks.map((block) => (
                  <div
                    key={`${block.kind}-${block.title}`}
                    className="rounded-lg border p-2.5"
                    style={{ borderColor: '#e3e7eb', backgroundColor: '#fbfcfd' }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-5 px-2 rounded-md text-[10px] font-semibold inline-flex items-center"
                        style={{
                          backgroundColor: block.kind === 'Insight' ? '#dcfce7' : '#fee2e2',
                          color: block.kind === 'Insight' ? '#166534' : '#991b1b',
                        }}
                      >
                        {block.kind}
                      </span>
                      <p className="text-[13px] font-semibold truncate" style={{ color: '#2f3f49' }}>
                        {block.title}
                      </p>
                    </div>
                    <p className="mt-1.5 text-[12px] leading-snug" style={{ color: '#677581' }}>
                      {block.context}
                    </p>
                    <p className="mt-1 text-[11px]" style={{ color: '#5d6a75' }}>
                      Evidence: {block.evidence.join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}

      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center p-3">
          <div
            className="w-full max-w-[560px] rounded-2xl border shadow-xl p-4"
            style={{ borderColor: '#dce0e4', backgroundColor: '#f8f9fb' }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[28px] font-semibold leading-none" style={{ color: '#222f39' }}>
                  Upload Content
                </h3>
                <p className="mt-1 text-[13px]" style={{ color: '#6f7c86' }}>
                  Add files or websites to your Knowledge Base to power smarter messaging.
                </p>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="h-9 w-9 rounded-lg inline-flex items-center justify-center hover:bg-[#eceff3]"
              >
                <X size={20} style={{ color: '#6f7c86' }} />
              </button>
            </div>

            <div
              className="mt-4 inline-flex items-center rounded-xl border p-1"
              style={{ borderColor: '#dce0e4', backgroundColor: '#eceff3' }}
            >
              <button
                onClick={() => setUploadMode('files')}
                className="h-9 px-4 rounded-lg text-[13px] font-semibold inline-flex items-center gap-2"
                style={{
                  backgroundColor: uploadMode === 'files' ? '#ffffff' : 'transparent',
                  color: uploadMode === 'files' ? '#283640' : '#6d7984',
                }}
              >
                <Upload size={16} />
                Upload Files
              </button>
              <button
                onClick={() => setUploadMode('website')}
                className="h-9 px-4 rounded-lg text-[13px] font-semibold inline-flex items-center gap-2"
                style={{
                  backgroundColor: uploadMode === 'website' ? '#ffffff' : 'transparent',
                  color: uploadMode === 'website' ? '#283640' : '#6d7984',
                }}
              >
                <Globe size={16} />
                Add Website / URL
              </button>
            </div>

            {uploadMode === 'files' && (
              <div className="mt-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full rounded-2xl border-2 border-dashed px-4 text-center aspect-square max-h-[320px] min-h-[250px] flex flex-col items-center justify-center"
                  style={{ borderColor: '#8ab0ff', backgroundColor: '#f4f7ff' }}
                >
                  <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#e7ecf8' }}>
                    <Upload size={22} style={{ color: '#6f7c86' }} />
                  </div>
                  <p className="mt-4 text-[18px] leading-tight font-semibold" style={{ color: '#202c36' }}>
                    Drag &amp; drop files here, or click to browse
                  </p>
                  <p className="mt-2 text-[13px] leading-snug" style={{ color: '#67737f' }}>
                    Supports DOC, DOCX, TXT, Markdown, PDF, PPT, PPTX
                  </p>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  accept=".pdf,.ppt,.pptx,.doc,.docx,.txt,.md"
                  onChange={handleFilePick}
                />

                {selectedFiles.length > 0 && (
                  <div className="mt-3 rounded-xl border p-3" style={{ borderColor: '#dce0e4', backgroundColor: '#ffffff' }}>
                    <p className="text-[13px] font-semibold mb-2" style={{ color: '#42505a' }}>
                      Selected files
                    </p>
                    <div className="space-y-1.5">
                      {selectedFiles.map((file, index) => (
                        <div key={`${file}-${index}`} className="flex items-center justify-between text-[13px]">
                          <span style={{ color: '#4f5c67' }}>{file}</span>
                          <button
                            onClick={() =>
                              setSelectedFiles((prev) => prev.filter((_, fileIndex) => fileIndex !== index))
                            }
                            className="text-[12px] font-semibold"
                            style={{ color: '#dc2626' }}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {uploadMode === 'website' && (
              <div className="mt-4 rounded-2xl border-2 border-dashed p-4" style={{ borderColor: '#8ab0ff', backgroundColor: '#f4f7ff' }}>
                <label className="text-[13px] font-semibold mb-2 block" style={{ color: '#42505a' }}>
                  Website URL
                </label>
                <input
                  value={websiteUrl}
                  onChange={(event) => setWebsiteUrl(event.target.value)}
                  className="w-full h-11 px-3 rounded-lg border text-[14px]"
                  style={{ borderColor: '#d8dde1', color: '#2f3f49', backgroundColor: '#ffffff' }}
                  placeholder="https://example.com/case-study"
                />
                <p className="mt-2 text-[12px]" style={{ color: '#6f7c86' }}>
                  We will scrape and index this page into Products, Case Studies, Blogs or Sales Pages based on content classification.
                </p>
              </div>
            )}

            <button
              onClick={handleUploadConfirm}
              disabled={uploadMode === 'files' ? selectedFiles.length === 0 : !websiteUrl.trim()}
              className="mt-4 h-10 w-full rounded-xl text-[14px] font-semibold text-white disabled:opacity-50"
              style={{ backgroundColor: '#85a9ee' }}
            >
              {uploadMode === 'files' ? 'Confirm Upload' : 'Add Website'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ActionButton({
  label,
  icon,
  danger = false,
  onClick,
}: {
  label: string;
  icon: ReactNode;
  danger?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full h-9 px-2.5 rounded-lg text-[13px] font-medium flex items-center gap-2 hover:bg-[#f3f4f6]"
      style={{ color: danger ? '#dc2626' : '#37444f' }}
    >
      {icon}
      {label}
    </button>
  );
}
