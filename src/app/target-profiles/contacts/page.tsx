'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AIMessageModal from '@/components/AIMessageModal';
import WriteYourOwnModal from '@/components/WriteYourOwnModal';
import CreditConfirmationModal from '@/components/CreditConfirmationModal';
import GeneratingMessagesModal from '@/components/GeneratingMessagesModal';
import {
  Search,
  Filter,
  X,
  ChevronDown,
  ChevronRight,
  Linkedin,
  Globe,
  Sparkles,
  Users,
  MapPin,
  Briefcase,
  Building2,
  UserCircle,
  Bookmark,
  Play,
  MessageSquare,
  Check,
  Loader2,
  ExternalLink,
  ThumbsUp,
  MessageCircle,
  ArrowLeft,
  ArrowRight,
  Download,
  DollarSign,
  TrendingUp,
  Code,
  Settings,
  Layers,
} from 'lucide-react';

const filterCategories = [
  { name: 'Contact Search', icon: <Search size={16} /> },
  { name: 'List', icon: <Filter size={16} /> },
  { name: 'Companies', icon: <Building2 size={16} /> },
  { name: 'Location', icon: <MapPin size={16} /> },
  { name: 'Job Title', icon: <Briefcase size={16} /> },
  { name: 'Department', icon: <Users size={16} /> },
  { name: 'Seniority', icon: <UserCircle size={16} /> },
  { name: 'Owner', icon: <Users size={16} /> },
];

const mockContacts = [
  { id: 26907815, name: 'Felipe Schiavo', initials: 'FS', company: 'Bacardi', jobTitle: 'Finance Director | CFO Mexico', department: 'Finance', color: '#3b82f6' },
  { id: 2, name: 'Ruwen Fcpa, Gaicd', initials: 'RF', company: 'Daimler Truck Ag', jobTitle: 'Director & CFO', department: 'Finance', color: '#6b7280' },
  { id: 3, name: 'Secretary Gm', initials: 'SG', company: 'Hdfc Bank Limited', jobTitle: 'Secretary To GM/CEO', department: 'Admin', color: '#6b7280' },
  { id: 4, name: 'Ramesh Gopale', initials: 'RG', company: 'Inetsoft', jobTitle: 'Chief Marketing Officer', department: 'Marketing', color: '#10b981' },
  { id: 5, name: 'Kamal Agrawal', initials: 'KA', company: 'Axis Bank Limited', jobTitle: 'Vice President - Zonal...', department: 'Operations', color: '#f59e0b' },
  { id: 6, name: 'Rahul Sharma', initials: 'RS', company: 'Tata Capital', jobTitle: 'Deputy Vice President', department: 'Finance', color: '#10b981' },
  { id: 7, name: 'Vinh Le', initials: 'VL', company: 'Polyai', jobTitle: 'Chief Financial Officer', department: 'Finance', color: '#6b7280' },
  { id: 8, name: 'Dominique Schutz', initials: 'DS', company: 'Foundation Medicine', jobTitle: 'CFO & Head of Corporate...', department: 'Finance', color: '#3b82f6' },
  { id: 9, name: 'Tathagat Agarwal', initials: 'TA', company: 'Kotak Mahindra Bank Limited', jobTitle: 'Associate Vice President', department: 'Finance', color: '#10b981' },
  { id: 10, name: 'Mridul Kumar Singh', initials: 'MK', company: 'Tata Aig General Insurance', jobTitle: 'Senior Vice President', department: 'Finance', color: '#f59e0b' },
];

// Types for LinkedIn sourcing
type ModalStep = 'browse' | 'input' | 'processing' | 'results';
type ProcessStep = 'query' | 'search' | 'engagement' | 'complete';
type EngagementType = 'commented' | 'liked' | 'both' | 'disliked';
type ICPTier = 'high' | 'medium' | 'low';
type ICPFilter = 'all' | 'high' | 'medium' | 'low';

interface PostEngagement {
  postTitle: string;
  postUrl: string;
  engagementType: EngagementType;
  commentText?: string;
}

interface CompanyInfo {
  name: string;
  size: string; // e.g., "5000+", "500-5000", "1-500"
  industry: string;
  revenue?: string;
}

interface LinkedInContact {
  name: string;
  headline: string;
  profileUrl: string;
  jobTitle: string;
  department: string;
  company: CompanyInfo;
  engagements: PostEngagement[];
  postCount: number;
  icpTier: ICPTier;
}

interface EnrichmentCard {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  stats?: {
    active?: number;
    total?: number;
    configured?: number;
    available?: string;
  };
  comingSoon?: boolean;
}

interface EnrichmentCategory {
  id: string;
  name: string;
  enrichments: EnrichmentCard[];
}

// ICP Classification Logic
const classifyJobTitle = (jobTitle: string): ICPTier => {
  const title = jobTitle.toLowerCase();

  // High: C-suite, VP-level
  if (title.includes('ceo') || title.includes('cfo') || title.includes('cto') ||
      title.includes('coo') || title.includes('chief') || title.includes('president') ||
      title.includes('vp ') || title.includes('vice president')) {
    return 'high';
  }

  // Low: Coordinator, Analyst
  if (title.includes('coordinator') || title.includes('analyst') ||
      title.includes('assistant') || title.includes('associate') ||
      title.includes('specialist')) {
    return 'low';
  }

  // Medium: Director, Manager (default)
  return 'medium';
};

const classifyCompanySize = (size: string): ICPTier => {
  const sizeNum = parseInt(size.replace(/[^0-9]/g, ''));

  if (size.includes('+')) {
    // "5000+" or similar
    return sizeNum >= 5000 ? 'high' : sizeNum >= 500 ? 'medium' : 'low';
  }

  if (size.includes('-')) {
    // "500-5000" format - use upper bound
    const parts = size.split('-').map(p => parseInt(p.replace(/[^0-9]/g, '')));
    const upperBound = parts[1] || sizeNum;
    return upperBound >= 5000 ? 'high' : upperBound >= 500 ? 'medium' : 'low';
  }

  // Single number
  return sizeNum >= 5000 ? 'high' : sizeNum >= 500 ? 'medium' : 'low';
};

const classifyDepartment = (department: string): ICPTier => {
  const dept = department.toLowerCase();

  // High: Finance, Operations, Executive
  if (dept.includes('finance') || dept.includes('operations') ||
      dept.includes('executive') || dept.includes('exec')) {
    return 'high';
  }

  // Low: Marketing, Sales, HR
  if (dept.includes('marketing') || dept.includes('sales') ||
      dept.includes('hr') || dept.includes('human resources')) {
    return 'low';
  }

  // Medium: IT, Engineering, Product (default)
  return 'medium';
};

const calculateICPTier = (jobTitle: string, companySize: string, department: string): ICPTier => {
  const titleScore = classifyJobTitle(jobTitle);
  const sizeScore = classifyCompanySize(companySize);
  const deptScore = classifyDepartment(department);

  // Convert to numbers for averaging (high=3, medium=2, low=1)
  const scoreMap = { high: 3, medium: 2, low: 1 };
  const scores = [titleScore, sizeScore, deptScore].map(s => scoreMap[s]);
  const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;

  // Round to nearest tier
  if (avgScore >= 2.5) return 'high';
  if (avgScore >= 1.5) return 'medium';
  return 'low';
};

// Enrichment categories data
const enrichmentCategories: EnrichmentCategory[] = [
  {
    id: 'signals',
    name: 'Signals',
    enrichments: [
      {
        id: 'linkedin-engagement',
        name: 'LinkedIn Engagement Sourcing',
        description: 'Find people engaging with posts about specific topics',
        icon: <Linkedin size={20} />,
        stats: { active: 0, total: 0 }
      },
      {
        id: 'job-change-tracking',
        name: 'Job Change Tracking',
        description: 'Track when contacts change jobs or roles',
        icon: <Briefcase size={20} />,
        comingSoon: true
      }
    ]
  },
  {
    id: 'tech-stack',
    name: 'Tech Stack',
    enrichments: [
      {
        id: 'tech-stack-discovery',
        name: 'Tech Stack',
        description: 'Uncover the tools and tech companies rely on',
        icon: <Layers size={20} />,
        stats: { configured: 1200, available: 'yes' }
      }
    ]
  },
  {
    id: 'funding',
    name: 'Get Funding Details',
    enrichments: [
      {
        id: 'funding-details',
        name: 'Get Funding Details',
        description: 'See funding stage, date, and amount raised',
        icon: <DollarSign size={20} />
      }
    ]
  },
  {
    id: 'revenue',
    name: 'Get Revenue Details',
    enrichments: [
      {
        id: 'revenue-details',
        name: 'Get Revenue Details',
        description: 'View estimated revenue and growth signals',
        icon: <TrendingUp size={20} />
      }
    ]
  },
  {
    id: 'headcount',
    name: 'Headcount Growth',
    enrichments: [
      {
        id: 'company-headcount',
        name: 'Company Headcount Growth',
        description: 'View total headcount with trend based on the period you choose',
        icon: <Users size={20} />
      },
      {
        id: 'department-headcount',
        name: 'Department Headcount Growth',
        description: 'Track department headcount and its trend based on the period you choose',
        icon: <Building2 size={20} />
      }
    ]
  },
  {
    id: 'customisation',
    name: 'Customisation',
    enrichments: [
      {
        id: 'custom-column',
        name: 'Custom Column',
        description: 'Add intelligent columns powered by custom formulas',
        icon: <Settings size={20} />
      }
    ]
  }
];

export default function ContactsPage() {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Smart Column Modal State
  const [showSmartColumnModal, setShowSmartColumnModal] = useState(false);
  const [modalStep, setModalStep] = useState<ModalStep>('browse');
  const [selectedFeature, setSelectedFeature] = useState<string>('');

  // LinkedIn Sourcing State
  const [naturalQuery, setNaturalQuery] = useState('');
  const [searchKeywords, setSearchKeywords] = useState('');
  const [linkedinPosts, setLinkedinPosts] = useState<any[]>([]);
  const [engagementContacts, setEngagementContacts] = useState<LinkedInContact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());
  const [icpFilter, setIcpFilter] = useState<ICPFilter>('all');

  // Processing progress
  const [processStep, setProcessStep] = useState<ProcessStep>('query');
  const [postsFound, setPostsFound] = useState(0);

  // Notification
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // AI Message Modal State
  const [showAIMessageModal, setShowAIMessageModal] = useState(false);
  const [showWriteYourOwnModal, setShowWriteYourOwnModal] = useState(false);
  const [showCreditConfirmation, setShowCreditConfirmation] = useState(false);
  const [showGeneratingModal, setShowGeneratingModal] = useState(false);
  const [selectedContactsForMessage, setSelectedContactsForMessage] = useState<Set<number>>(new Set());

  // Mock Data Generators
  const generateMockLinkedInPosts = (keywords: string) => {
    return [
      {
        title: "The Future of AI in Healthcare | LinkedIn",
        link: "https://www.linkedin.com/posts/john-doe_ai-healthcare-innovation-activity-123456789",
        snippet: "Discussing how AI is transforming patient care and improving diagnosis accuracy..."
      },
      {
        title: "Healthcare Innovation Discussion | LinkedIn",
        link: "https://www.linkedin.com/posts/sarah-medical_healthcare-ai-technology-activity-987654321",
        snippet: "Exploring the intersection of AI adoption and modern healthcare delivery..."
      },
      {
        title: "AI Adoption Trends in Medical Industry | LinkedIn",
        link: "https://www.linkedin.com/posts/michael-tech_ai-adoption-medtech-activity-456789123",
        snippet: "Analysis of how healthcare organizations are embracing AI technologies..."
      },
      {
        title: "Healthcare Digital Transformation | LinkedIn",
        link: "https://www.linkedin.com/posts/emily-health_digital-healthcare-ai-activity-789123456",
        snippet: "The role of artificial intelligence in revolutionizing patient outcomes..."
      },
      {
        title: "AI in Clinical Decision Making | LinkedIn",
        link: "https://www.linkedin.com/posts/david-clinical_ai-healthcare-innovation-activity-321654987",
        snippet: "How AI is helping clinicians make better, faster decisions for patient care..."
      },
    ];
  };

  const generateMockEngagementContacts = (postUrl: string, postTitle: string) => {
    const firstNames = ['John', 'Sarah', 'Michael', 'Emily', 'David', 'Jessica', 'Robert', 'Lisa', 'James', 'Jennifer'];
    const lastNames = ['Smith', 'Johnson', 'Chen', 'Williams', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];

    // Job titles with seniority levels
    const jobTitles = [
      { title: 'Chief Technology Officer', dept: 'Executive' },
      { title: 'VP of Digital Health', dept: 'Operations' },
      { title: 'CFO', dept: 'Finance' },
      { title: 'Chief Medical Information Officer', dept: 'Executive' },
      { title: 'Director of Clinical Analytics', dept: 'IT' },
      { title: 'Healthcare Innovation Director', dept: 'Product' },
      { title: 'Senior Product Manager', dept: 'Product' },
      { title: 'Engineering Manager', dept: 'Engineering' },
      { title: 'Marketing Coordinator', dept: 'Marketing' },
      { title: 'Data Analyst', dept: 'IT' },
      { title: 'Sales Operations Manager', dept: 'Sales' },
      { title: 'HR Business Partner', dept: 'HR' },
    ];

    // Company info with varying sizes
    const companies = [
      { name: 'HealthTech Solutions', size: '5000+', industry: 'Healthcare Technology', revenue: '$500M+' },
      { name: 'MedSys Corporation', size: '10000+', industry: 'Medical Devices', revenue: '$2B+' },
      { name: 'TechCorp', size: '1000-5000', industry: 'Software', revenue: '$100M-500M' },
      { name: 'StartupX', size: '50-200', industry: 'AI/ML', revenue: '$10M-50M' },
      { name: 'Global Healthcare', size: '20000+', industry: 'Healthcare Services', revenue: '$5B+' },
      { name: 'Clinical Analytics Inc', size: '500-1000', industry: 'Data Analytics', revenue: '$50M-100M' },
      { name: 'Digital Health Group', size: '200-500', industry: 'Digital Health', revenue: '$20M-50M' },
      { name: 'MedDevice Co', size: '100-500', industry: 'Medical Equipment', revenue: '$30M-100M' },
    ];

    const engagementTypes: EngagementType[] = ['commented', 'liked', 'both'];

    const sampleComments = [
      'This is exactly what we need in modern healthcare. Great insights!',
      'Really interesting perspective on AI adoption. We\'re seeing similar trends in our organization.',
      'Thanks for sharing! This aligns with our digital transformation strategy.',
      'Completely agree. The potential for AI in healthcare is enormous.',
      'We\'ve been implementing similar solutions and the results have been promising.',
      'Great post! Would love to connect and discuss this further.',
      'This is a game changer for the industry. Excited to see where this goes.',
      'Insightful analysis. The data supports these findings.',
      'We\'re exploring these technologies as well. Very timely discussion.',
      'Excellent points about patient outcomes and AI integration.',
    ];

    const numContacts = Math.floor(Math.random() * 20) + 15; // 15-35 contacts per post
    const contacts = [];

    for (let i = 0; i < numContacts; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const name = `${firstName} ${lastName}`;
      const profileUrl = `https://linkedin.com/in/${firstName.toLowerCase()}${lastName.toLowerCase()}`;
      const engagementType = engagementTypes[Math.floor(Math.random() * engagementTypes.length)];

      const jobData = jobTitles[Math.floor(Math.random() * jobTitles.length)];
      const company = companies[Math.floor(Math.random() * companies.length)];

      // Calculate ICP tier
      const icpTier = calculateICPTier(jobData.title, company.size, jobData.dept);

      // Add comment text if they commented
      const commentText = (engagementType === 'commented' || engagementType === 'both')
        ? sampleComments[Math.floor(Math.random() * sampleComments.length)]
        : undefined;

      contacts.push({
        name,
        headline: `${jobData.title} at ${company.name}`,
        profileUrl,
        jobTitle: jobData.title,
        department: jobData.dept,
        company,
        postUrl,
        postTitle,
        engagementType,
        commentText,
        icpTier,
      });
    }

    return contacts;
  };

  const deduplicateContacts = (allContacts: any[]): LinkedInContact[] => {
    const contactMap = new Map<string, LinkedInContact>();

    allContacts.forEach(contact => {
      const engagement: PostEngagement = {
        postTitle: contact.postTitle,
        postUrl: contact.postUrl,
        engagementType: contact.engagementType,
        commentText: contact.commentText,
      };

      if (contactMap.has(contact.profileUrl)) {
        const existing = contactMap.get(contact.profileUrl)!;
        // Add this engagement to the list
        existing.engagements.push(engagement);
        existing.postCount = existing.engagements.length;
      } else {
        contactMap.set(contact.profileUrl, {
          name: contact.name,
          headline: contact.headline,
          profileUrl: contact.profileUrl,
          jobTitle: contact.jobTitle,
          department: contact.department,
          company: contact.company,
          engagements: [engagement],
          postCount: 1,
          icpTier: contact.icpTier,
        });
      }
    });

    return Array.from(contactMap.values())
      .sort((a, b) => b.postCount - a.postCount);
  };

  // Handle Smart Column button click
  const handleSmartColumnClick = () => {
    setShowSmartColumnModal(true);
    setModalStep('browse');
    setSelectedFeature('');
    setNaturalQuery('');
    setEngagementContacts([]);
    setSelectedContacts(new Set());
  };

  // Handle feature selection
  const handleFeatureSelect = (feature: string) => {
    setSelectedFeature(feature);
    if (feature === 'linkedin-engagement') {
      setModalStep('input');
    }
  };

  // Handle query submission
  const handleQuerySubmit = () => {
    if (!naturalQuery.trim()) return;

    setModalStep('processing');
    setProcessStep('query');

    // Step 1: Convert query to keywords (mock LLM)
    setTimeout(() => {
      setSearchKeywords(`site:linkedin.com/posts "${naturalQuery}" discussion`);
      setProcessStep('search');

      // Step 2: Fetch LinkedIn posts (mock Serper.dev)
      setTimeout(() => {
        const posts = generateMockLinkedInPosts(searchKeywords);
        setLinkedinPosts(posts);
        setPostsFound(posts.length);
        setProcessStep('engagement');

        // Step 3: Fetch engagement data (mock edges.run)
        setTimeout(() => {
          const allContacts: any[] = [];
          posts.forEach(post => {
            const contacts = generateMockEngagementContacts(post.link, post.title);
            allContacts.push(...contacts);
          });

          // Step 4: Deduplicate
          const deduplicated = deduplicateContacts(allContacts);
          setEngagementContacts(deduplicated);
          setProcessStep('complete');

          // Show results
          setTimeout(() => {
            setModalStep('results');
          }, 500);
        }, 2000);
      }, 1500);
    }, 1500);
  };

  // Handle contact selection
  const toggleContactSelection = (profileUrl: string) => {
    const newSelected = new Set(selectedContacts);
    if (newSelected.has(profileUrl)) {
      newSelected.delete(profileUrl);
    } else {
      newSelected.add(profileUrl);
    }
    setSelectedContacts(newSelected);
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedContacts.size === engagementContacts.length) {
      setSelectedContacts(new Set());
    } else {
      setSelectedContacts(new Set(engagementContacts.map(c => c.profileUrl)));
    }
  };

  // Handle add to target list
  const handleAddToTargetList = () => {
    const count = selectedContacts.size;
    setShowSmartColumnModal(false);
    setNotificationMessage(`${count} contact${count !== 1 ? 's' : ''} added to target list`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Get engagement badge
  const getEngagementBadge = (types: EngagementType[]) => {
    const hasCommented = types.includes('commented') || types.includes('both');
    const hasLiked = types.includes('liked') || types.includes('both');

    return (
      <div className="flex items-center gap-2 text-xs" style={{ color: '#706f69' }}>
        {hasCommented && (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ backgroundColor: '#dbeafe', color: '#1c64f2' }}>
            <MessageCircle size={12} />
            Commented
          </span>
        )}
        {hasLiked && (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ backgroundColor: '#d1fae5', color: '#059669' }}>
            <ThumbsUp size={12} />
            Liked
          </span>
        )}
      </div>
    );
  };

  // AI Message Handlers
  const handleAIMessageClick = () => {
    // Check if contacts are selected
    const selectedIds = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
      .map((checkbox: any) => {
        const row = checkbox.closest('tr');
        if (row) {
          const contactId = mockContacts.find(c => row.textContent?.includes(c.name))?.id;
          return contactId;
        }
        return null;
      })
      .filter((id): id is number => id !== null);

    setSelectedContactsForMessage(new Set(selectedIds));
    setShowAIMessageModal(true);
  };

  const handleSelectMethod = (method: 'smart' | 'custom') => {
    setShowAIMessageModal(false);
    if (method === 'smart') {
      setShowCreditConfirmation(true);
    } else {
      setShowWriteYourOwnModal(true);
    }
  };

  const handleCreditConfirm = () => {
    setShowCreditConfirmation(false);
    setShowGeneratingModal(true);

    // Simulate message generation
    setTimeout(() => {
      setShowGeneratingModal(false);
      setNotificationMessage('Messages generated successfully!');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      // In real implementation, navigate to preview page
    }, 3000);
  };

  const handleCustomGenerate = (prompt: string, model: string, messageTypes: string[]) => {
    setShowWriteYourOwnModal(false);
    setShowCreditConfirmation(true);
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
              Contact
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
            <button
              className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg"
              style={{ backgroundColor: '#f3f5f5', color: '#191918' }}
            >
              <Filter size={16} />
              Hide Filters
              <span className="px-1.5 py-0.5 text-xs rounded-full text-white" style={{ backgroundColor: '#1c64f2' }}>1</span>
            </button>

            {/* Search */}
            <div className="relative w-72">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#706f69' }} />
              <input
                type="text"
                placeholder="Search contacts or LinkedIn profile"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-sm rounded-lg border"
                style={{ borderColor: '#e7e7e6' }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSmartColumnClick}
              className="flex items-center gap-2 px-4 py-1.5 text-sm rounded-lg border"
              style={{ borderColor: '#e7e7e6', color: '#191918' }}
            >
              <Play size={16} />
              Smart Column
            </button>
            <button
              onClick={handleAIMessageClick}
              className="flex items-center gap-2 px-4 py-1.5 text-sm rounded-lg border"
              style={{ borderColor: '#e7e7e6', color: '#706f69' }}
            >
              <Sparkles size={16} />
              AI Message
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
                    Contact Name
                    <ChevronDown size={14} />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>Actions</th>
                <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>Account Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>Job Title</th>
                <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>Buyer Roles</th>
              </tr>
            </thead>
            <tbody>
              {mockContacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="border-b hover:bg-gray-50 transition-colors cursor-pointer"
                  style={{ borderColor: '#e7e7e6' }}
                  onClick={() => router.push(`/contact-details/${contact.id}/overview`)}
                >
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white"
                        style={{ backgroundColor: contact.color }}
                      >
                        {contact.initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: '#111928' }}>{contact.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Linkedin size={14} style={{ color: '#706f69' }} />
                          <Globe size={14} style={{ color: '#706f69' }} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-1">
                      <button className="p-1 rounded hover:bg-gray-100">
                        <Bookmark size={14} style={{ color: '#706f69' }} />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <Link href={`/account-details/${contact.company.toLowerCase().replace(/\s+/g, '')}.com/overview`} className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded flex items-center justify-center text-xs font-medium text-white"
                        style={{ backgroundColor: '#3e545c' }}
                      >
                        {contact.company[0]}
                      </div>
                      <span className="text-sm" style={{ color: '#111928' }}>{contact.company}</span>
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm" style={{ color: '#191918' }}>{contact.jobTitle}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded-full" style={{ backgroundColor: '#f3f5f5', color: '#706f69' }}>
                      {contact.department === 'Finance' ? 'Economic Buyer' : 'Other'}
                    </span>
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
            <span>1 - 20 of 3,092 items</span>
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

      {/* Smart Column Modal */}
      {showSmartColumnModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b" style={{ borderColor: '#e7e7e6' }}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold" style={{ color: '#111928' }}>
                    {modalStep === 'browse' && 'Add Smart Column'}
                    {modalStep === 'input' && 'LinkedIn Engagement Sourcing'}
                    {modalStep === 'processing' && 'Finding Engaged Contacts'}
                    {modalStep === 'results' && `Found ${engagementContacts.length} Engaged Contacts`}
                  </h2>
                  {modalStep === 'browse' && (
                    <p className="text-sm mt-1" style={{ color: '#706f69' }}>
                      Enrich your workflow with AI-powered insights and custom formulas
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setShowSmartColumnModal(false)}
                  className="p-1 rounded hover:bg-gray-100"
                  style={{ color: '#706f69' }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto">
              {/* Browse Enrichments */}
              {modalStep === 'browse' && (
                <div className="p-6 space-y-6">
                  {enrichmentCategories.map((category) => (
                    <div key={category.id}>
                      {/* Category Header */}
                      <h3 className="text-sm font-semibold mb-3 tracking-wide" style={{ color: '#111928' }}>
                        {category.name}
                      </h3>

                      {/* Enrichment Cards */}
                      <div className={category.enrichments.length > 1 ? "grid grid-cols-2 gap-3" : "space-y-3"}>
                        {category.enrichments.map((enrichment) => (
                          <button
                            key={enrichment.id}
                            onClick={() => !enrichment.comingSoon && handleFeatureSelect(enrichment.id)}
                            disabled={enrichment.comingSoon}
                            className={`w-full p-4 rounded-xl border transition-all text-left ${
                              enrichment.comingSoon
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:border-blue-500'
                            }`}
                            style={{ borderColor: '#e7e7e6' }}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <h4 className="text-sm font-semibold mb-1" style={{ color: '#111928' }}>
                                  {enrichment.name}
                                </h4>
                                <p className="text-xs mb-2" style={{ color: '#706f69' }}>
                                  {enrichment.description}
                                </p>

                                {/* Stats Row */}
                                {enrichment.stats && (
                                  <div className="flex items-center gap-2 text-xs" style={{ color: '#706f69' }}>
                                    {enrichment.stats.active !== undefined && (
                                      <span>Active: {enrichment.stats.active}</span>
                                    )}
                                    {enrichment.stats.total !== undefined && (
                                      <>
                                        <span>•</span>
                                        <span>Total Signals: {enrichment.stats.total}+</span>
                                      </>
                                    )}
                                    {enrichment.stats.configured !== undefined && (
                                      <>
                                        <span>•</span>
                                        <span>Configured: {enrichment.stats.configured.toLocaleString()}</span>
                                      </>
                                    )}
                                    {enrichment.stats.available && (
                                      <>
                                        <span>•</span>
                                        <span>Available: {enrichment.stats.available}</span>
                                      </>
                                    )}
                                  </div>
                                )}

                                {enrichment.comingSoon && (
                                  <span className="inline-block px-2 py-0.5 text-xs rounded-full" style={{ backgroundColor: '#f3f5f5', color: '#706f69' }}>
                                    Coming Soon
                                  </span>
                                )}
                              </div>

                              {/* Icon Circle */}
                              <div
                                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: '#f3f5f5', color: '#706f69' }}
                              >
                                {enrichment.icon}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 2: Query Input */}
              {modalStep === 'input' && (
                <div className="p-6">
                  <p className="text-sm mb-6" style={{ color: '#706f69' }}>
                    Find people engaging with LinkedIn posts about specific topics
                  </p>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2" style={{ color: '#111928' }}>
                      Enter your search query
                    </label>
                    <textarea
                      value={naturalQuery}
                      onChange={(e) => setNaturalQuery(e.target.value)}
                      placeholder="Example: People discussing AI adoption in healthcare"
                      className="w-full px-4 py-3 text-sm rounded-lg border resize-none"
                      style={{ borderColor: '#e7e7e6', minHeight: '120px' }}
                    />
                    <p className="text-xs mt-2" style={{ color: '#706f69' }}>
                      Describe the topic or discussion you want to find engaged contacts for
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setModalStep('browse')}
                      className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg"
                      style={{ color: '#706f69' }}
                    >
                      <ArrowLeft size={16} />
                      Back
                    </button>
                    <button
                      onClick={handleQuerySubmit}
                      disabled={!naturalQuery.trim()}
                      className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ backgroundColor: '#1c64f2' }}
                    >
                      Search Posts
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Processing */}
              {modalStep === 'processing' && (
                <div className="p-6 flex flex-col items-center justify-center min-h-[400px]">
                  <Loader2 size={48} className="animate-spin mb-6" style={{ color: '#1c64f2' }} />

                  <div className="w-full max-w-md space-y-3">
                    <div className="flex items-center gap-3">
                      {processStep !== 'query' ? (
                        <Check size={20} style={{ color: '#059669' }} />
                      ) : (
                        <Loader2 size={20} className="animate-spin" style={{ color: '#1c64f2' }} />
                      )}
                      <span className="text-sm" style={{ color: processStep !== 'query' ? '#059669' : '#111928' }}>
                        Converting query to keywords
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {processStep === 'complete' || processStep === 'engagement' ? (
                        <Check size={20} style={{ color: '#059669' }} />
                      ) : processStep === 'search' ? (
                        <Loader2 size={20} className="animate-spin" style={{ color: '#1c64f2' }} />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2" style={{ borderColor: '#e7e7e6' }}></div>
                      )}
                      <span className="text-sm" style={{ color: processStep === 'complete' || processStep === 'engagement' ? '#059669' : processStep === 'search' ? '#111928' : '#706f69' }}>
                        Searching LinkedIn posts {postsFound > 0 && `(${postsFound} found)`}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {processStep === 'complete' ? (
                        <Check size={20} style={{ color: '#059669' }} />
                      ) : processStep === 'engagement' ? (
                        <Loader2 size={20} className="animate-spin" style={{ color: '#1c64f2' }} />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2" style={{ borderColor: '#e7e7e6' }}></div>
                      )}
                      <span className="text-sm" style={{ color: processStep === 'complete' ? '#059669' : processStep === 'engagement' ? '#111928' : '#706f69' }}>
                        Fetching engagement data...
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {processStep === 'complete' ? (
                        <Check size={20} style={{ color: '#059669' }} />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2" style={{ borderColor: '#e7e7e6' }}></div>
                      )}
                      <span className="text-sm" style={{ color: processStep === 'complete' ? '#059669' : '#706f69' }}>
                        Deduplicating contacts
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Results */}
              {modalStep === 'results' && (
                <div className="flex flex-col h-full">
                  <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: '#e7e7e6' }}>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleSelectAll}
                        className="px-4 py-1.5 text-sm rounded-lg border"
                        style={{ borderColor: '#e7e7e6', color: '#191918' }}
                      >
                        {selectedContacts.size === engagementContacts.length ? 'Deselect All' : 'Select All'}
                      </button>
                      <span className="text-sm" style={{ color: '#706f69' }}>
                        {selectedContacts.size} selected
                      </span>
                    </div>
                    <button
                      className="flex items-center gap-2 px-4 py-1.5 text-sm rounded-lg border"
                      style={{ borderColor: '#e7e7e6', color: '#706f69' }}
                    >
                      <Download size={16} />
                      Export CSV
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-3">
                      {engagementContacts.map((contact) => (
                        <div
                          key={contact.profileUrl}
                          onClick={() => toggleContactSelection(contact.profileUrl)}
                          className="p-4 rounded-lg border-2 cursor-pointer hover:border-blue-500 transition-all"
                          style={{ borderColor: selectedContacts.has(contact.profileUrl) ? '#1c64f2' : '#e7e7e6' }}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={selectedContacts.has(contact.profileUrl)}
                              onChange={() => {}}
                              className="mt-1 rounded"
                              style={{ accentColor: '#1c64f2' }}
                            />
                            <div className="flex-1">
                              {/* Contact Header */}
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="font-medium text-sm" style={{ color: '#111928' }}>{contact.name}</h3>
                                  <p className="text-sm mt-0.5" style={{ color: '#706f69' }}>{contact.headline}</p>
                                  <a
                                    href={contact.profileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex items-center gap-1 mt-1 text-xs hover:underline"
                                    style={{ color: '#1c64f2' }}
                                  >
                                    <ExternalLink size={12} />
                                    View LinkedIn Profile
                                  </a>
                                </div>
                                {contact.postCount > 1 && (
                                  <span className="px-2 py-0.5 text-xs rounded-full" style={{ backgroundColor: '#fef3c7', color: '#f59e0b' }}>
                                    {contact.postCount} post{contact.postCount > 1 ? 's' : ''}
                                  </span>
                                )}
                              </div>

                              {/* Engagements List */}
                              <div className="space-y-2">
                                {contact.engagements.map((engagement, idx) => (
                                  <div key={idx} className="p-3 rounded-lg" style={{ backgroundColor: '#f9fafb' }}>
                                    {/* Post Title with Link */}
                                    <a
                                      href={engagement.postUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="text-xs font-medium hover:underline mb-1 block"
                                      style={{ color: '#111928' }}
                                    >
                                      {engagement.postTitle}
                                    </a>

                                    {/* Engagement Type Badge */}
                                    <div className="flex items-center gap-2 mb-2">
                                      {(engagement.engagementType === 'commented' || engagement.engagementType === 'both') && (
                                        <span className="flex items-center gap-1 px-2 py-0.5 text-xs rounded-full" style={{ backgroundColor: '#dbeafe', color: '#1c64f2' }}>
                                          <MessageCircle size={10} />
                                          Commented
                                        </span>
                                      )}
                                      {(engagement.engagementType === 'liked' || engagement.engagementType === 'both') && (
                                        <span className="flex items-center gap-1 px-2 py-0.5 text-xs rounded-full" style={{ backgroundColor: '#d1fae5', color: '#059669' }}>
                                          <ThumbsUp size={10} />
                                          Liked
                                        </span>
                                      )}
                                    </div>

                                    {/* Comment Text */}
                                    {engagement.commentText && (
                                      <p className="text-xs italic pl-3 border-l-2" style={{ color: '#706f69', borderColor: '#e7e7e6' }}>
                                        "{engagement.commentText}"
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="px-6 py-4 border-t flex items-center justify-between" style={{ borderColor: '#e7e7e6' }}>
                    <p className="text-sm" style={{ color: '#706f69' }}>
                      Showing {engagementContacts.length} contacts from {postsFound} LinkedIn posts
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setModalStep('input');
                          setNaturalQuery('');
                          setEngagementContacts([]);
                          setSelectedContacts(new Set());
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg"
                        style={{ color: '#706f69' }}
                      >
                        <ArrowLeft size={16} />
                        New Search
                      </button>
                      <button
                        onClick={handleAddToTargetList}
                        disabled={selectedContacts.size === 0}
                        className="px-6 py-2 text-sm font-medium text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: '#1c64f2' }}
                      >
                        Add Selected ({selectedContacts.size})
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg" style={{ backgroundColor: '#059669' }}>
            <Check size={20} className="text-white" />
            <span className="text-sm font-medium text-white">{notificationMessage}</span>
          </div>
        </div>
      )}

      {/* AI Message Modals */}
      <AIMessageModal
        isOpen={showAIMessageModal}
        onClose={() => setShowAIMessageModal(false)}
        selectedContactsCount={selectedContactsForMessage.size || 1}
        onSelectMethod={handleSelectMethod}
      />

      <WriteYourOwnModal
        isOpen={showWriteYourOwnModal}
        onClose={() => setShowWriteYourOwnModal(false)}
        onGenerate={handleCustomGenerate}
      />

      <CreditConfirmationModal
        isOpen={showCreditConfirmation}
        onClose={() => setShowCreditConfirmation(false)}
        onConfirm={handleCreditConfirm}
        selectedContactsCount={selectedContactsForMessage.size || 1}
        totalCredits={5}
        availableCredits={3183}
      />

      <GeneratingMessagesModal isOpen={showGeneratingModal} />
    </div>
  );
}
