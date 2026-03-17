'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import MessageStepper from '@/components/MessageStepper';
import ContactSidebar, { ContactProfile } from '@/components/ContactSidebar';
import MessagePreview, { GeneratedMessage } from '@/components/MessagePreview';

interface ContactWithMessages extends ContactProfile {
  messages: GeneratedMessage[];
}

// Mock data for contacts with generated messages
const mockContactsWithMessages: ContactWithMessages[] = [
  {
    id: 'contact-1',
    name: 'Sarah Johnson',
    avatar: '#1c64f2',
    title: 'Chief Technology Officer',
    company: 'Microsoft',
    companyLogo: '#1c64f2',
    website: 'https://microsoft.com',
    email: 'sarah.johnson@microsoft.com',
    linkedin: 'https://linkedin.com/in/sarahjohnson',
    about:
      'Experienced technology executive with over 15 years in enterprise software development. Passionate about building scalable systems and leading high-performing engineering teams. Focus on cloud infrastructure, AI/ML integration, and digital transformation initiatives.',
    experience: [
      {
        title: 'Chief Technology Officer',
        company: 'Microsoft',
        duration: '2020 - Present',
      },
      {
        title: 'VP of Engineering',
        company: 'Amazon Web Services',
        duration: '2016 - 2020',
      },
      {
        title: 'Director of Engineering',
        company: 'Google Cloud',
        duration: '2012 - 2016',
      },
    ],
    education: [
      {
        degree: 'Master of Science in Computer Science',
        school: 'Stanford University',
        year: '2008 - 2010',
      },
      {
        degree: 'Bachelor of Science in Computer Engineering',
        school: 'MIT',
        year: '2004 - 2008',
      },
    ],
    skills: [
      'Cloud Architecture',
      'Team Leadership',
      'Enterprise Software',
      'AI/ML',
      'System Design',
      'DevOps',
      'Agile',
      'Strategic Planning',
    ],
    messages: [
      {
        type: 'email',
        subject: 'Transforming Enterprise Cloud Infrastructure at Microsoft',
        body: `Hi Sarah,

I hope this message finds you well. I've been following Microsoft's impressive advancements in cloud infrastructure, particularly your recent initiatives in AI integration and scalable system architecture.

Given your extensive background in enterprise software development and your current role leading technology strategy at Microsoft, I thought you might be interested in learning how other CTOs are addressing similar challenges around cloud scalability and AI/ML integration.

We've developed solutions that have helped technology leaders at companies like yours reduce infrastructure costs by 40% while improving system performance. I'd love to share some insights that might be relevant to your current initiatives.

Would you be open to a brief 15-minute conversation next week? I'm confident we can provide value to your team's digital transformation goals.

Best regards,
[Your Name]`,
        wordCount: 142,
        reasoning: {
          status: 'available',
          appliesTo: 'Email',
          summary:
            "The opener ties directly to Sarah's current remit at Microsoft, then anchors the outreach in measurable impact to establish credibility quickly. The CTA asks for a short 15-minute discussion, which keeps friction low while still moving toward a business conversation.",
        },
      },
      {
        type: 'followUp',
        subject: 'Quick follow-up: Cloud Infrastructure Insights',
        body: `Hi Sarah,

I wanted to follow up on my previous email about cloud infrastructure optimization strategies we've been sharing with technology leaders.

I know you're incredibly busy managing Microsoft's technology vision, so I'll keep this brief. We recently published a case study showing how a Fortune 500 company reduced their cloud spending by 35% while improving uptime to 99.99%.

Would it be helpful if I sent over the case study? It includes specific architectural patterns that might align with your current initiatives.

Looking forward to hearing from you.

Best regards,
[Your Name]`,
        wordCount: 108,
        reasoning: {
          status: 'stale',
          staleReason:
            'This follow-up was generated before AI reasoning became available in preview. Please regenerate this message to see rationale.',
        },
      },
      {
        type: 'secondFollowUp',
        subject: 'Thought this might interest you, Sarah',
        body: `Hi Sarah,

I hope you've had a great week! I came across an interesting article about AI integration in enterprise cloud platforms and immediately thought of the work you're doing at Microsoft.

The article discusses emerging patterns in distributed AI workloads – something I imagine is top of mind given Microsoft's investments in this space.

I'd be happy to share the article along with some additional insights from our work with other CTOs if you're interested. No pressure at all – just wanted to make sure it was on your radar.

Best,
[Your Name]`,
        wordCount: 106,
        reasoning: {
          status: 'available',
          appliesTo: 'Second Follow Up',
          summary:
            'This message uses a light-touch re-engagement style by sharing a relevant resource instead of repeating the same ask. It keeps pressure low while preserving relevance to distributed AI workloads and Microsoft initiatives.',
        },
      },
      {
        type: 'connectionRequest',
        body: `Hi Sarah, I'm impressed by your work leading Microsoft's cloud infrastructure initiatives. I help CTOs optimize their enterprise systems and would love to connect and share insights about AI/ML integration strategies. Looking forward to connecting!`,
        wordCount: 42,
        reasoning: {
          status: 'stale',
          staleReason:
            'Reasoning was not stored for older LinkedIn drafts. Regenerate this message to create an AI reasoning summary.',
        },
      },
      {
        type: 'postConnection',
        subject: 'Great to connect, Sarah!',
        body: `Hi Sarah,

Thank you for connecting! It's great to be in touch with someone leading such impressive technology initiatives at Microsoft.

I'm particularly interested in your approach to scaling cloud infrastructure while integrating AI capabilities. We've been working with several CTOs who are tackling similar challenges, and I've gathered some interesting insights about architectural patterns that are proving successful.

I'd love to learn more about your current focus areas and share some of these insights if they're relevant. Would you be open to a brief conversation in the coming weeks?

Either way, I look forward to staying connected and following your continued success at Microsoft.

Best regards,
[Your Name]`,
        wordCount: 127,
        reasoning: {
          status: 'available',
          appliesTo: 'Post Connection',
          summary:
            "The post-connection note opens with gratitude, then builds relevance around Sarah's cloud-and-AI focus before asking for a brief conversation. This sequencing helps the ask feel contextual rather than transactional.",
        },
      },
    ],
  },
  {
    id: 'contact-2',
    name: 'Michael Chen',
    avatar: '#10b981',
    title: 'VP of Engineering',
    company: 'Tesla',
    companyLogo: '#10b981',
    website: 'https://tesla.com',
    email: 'michael.chen@tesla.com',
    linkedin: 'https://linkedin.com/in/michaelchen',
    about:
      'Engineering leader focused on autonomous systems and electric vehicle technology. Specialized in real-time systems, embedded software, and hardware-software integration. Passionate about sustainable technology and innovation in transportation.',
    experience: [
      {
        title: 'VP of Engineering',
        company: 'Tesla',
        duration: '2019 - Present',
      },
      {
        title: 'Director of Software Engineering',
        company: 'Waymo',
        duration: '2015 - 2019',
      },
      {
        title: 'Senior Engineering Manager',
        company: 'Apple',
        duration: '2011 - 2015',
      },
    ],
    education: [
      {
        degree: 'PhD in Electrical Engineering',
        school: 'UC Berkeley',
        year: '2009 - 2011',
      },
      {
        degree: 'MS in Computer Science',
        school: 'Carnegie Mellon University',
        year: '2007 - 2009',
      },
    ],
    skills: [
      'Autonomous Systems',
      'Embedded Software',
      'Real-time Systems',
      'Team Management',
      'Hardware Integration',
      'C++',
      'Python',
      'Machine Learning',
    ],
    messages: [
      {
        type: 'email',
        subject: 'Advancing Autonomous Systems Engineering at Tesla',
        body: `Hi Michael,

I've been following Tesla's groundbreaking work in autonomous vehicle technology and your leadership in advancing real-time systems and embedded software.

Your background spanning work at Waymo and Apple, combined with your current role at Tesla, gives you a unique perspective on the challenges of hardware-software integration in autonomous systems.

We've been working with engineering leaders in the automotive and autonomous systems space to address challenges around real-time processing, sensor fusion, and system reliability. I believe some of our insights could be valuable to your team's initiatives.

Would you be interested in a brief conversation to explore potential synergies? I'm confident we can provide value to Tesla's engineering efforts.

Best regards,
[Your Name]`,
        wordCount: 128,
      },
      {
        type: 'followUp',
        subject: 'Following up: Autonomous Systems Insights',
        body: `Hi Michael,

I wanted to reach out again regarding my previous message about autonomous systems engineering.

We recently completed a project with an automotive company that resulted in a 30% improvement in sensor processing latency – a challenge I imagine is relevant to Tesla's autonomous driving initiatives.

I'd be happy to share some of the technical approaches we used. Would a quick 15-minute call work for you next week?

Best,
[Your Name]`,
        wordCount: 82,
      },
      {
        type: 'secondFollowUp',
        subject: 'Resource for your team',
        body: `Hi Michael,

I hope you're doing well! I wanted to share a technical whitepaper we recently published on real-time system optimization in autonomous vehicles.

Given your expertise in this area, I thought you might find it interesting, or perhaps it could be useful for your engineering team at Tesla.

Happy to send it over if you're interested – no strings attached. Just wanted to provide value where I can.

Cheers,
[Your Name]`,
        wordCount: 79,
      },
      {
        type: 'connectionRequest',
        body: `Hi Michael, your work on autonomous systems at Tesla is fascinating. I specialize in helping engineering leaders optimize real-time systems and would love to connect and exchange ideas about embedded software challenges.`,
        wordCount: 37,
      },
      {
        type: 'postConnection',
        subject: 'Thanks for connecting, Michael!',
        body: `Hi Michael,

Thanks for accepting my connection request! I'm excited to be connected with someone at the forefront of autonomous vehicle technology.

Your work on real-time systems and hardware-software integration at Tesla is particularly impressive. I work with engineering leaders facing similar technical challenges, and I've accumulated insights that might be valuable to share.

I'd love to learn more about your current engineering priorities and discuss any areas where our experience might be helpful. Would you be open to a brief conversation?

Looking forward to staying in touch!

Best,
[Your Name]`,
        wordCount: 105,
      },
    ],
  },
  {
    id: 'contact-3',
    name: 'Emily Rodriguez',
    avatar: '#f59e0b',
    title: 'Director of Product Engineering',
    company: 'Netflix',
    companyLogo: '#f59e0b',
    website: 'https://netflix.com',
    email: 'emily.rodriguez@netflix.com',
    linkedin: 'https://linkedin.com/in/emilyrodriguez',
    about:
      'Product-focused engineering leader with expertise in streaming technology, content delivery networks, and large-scale distributed systems. Passionate about building experiences that delight millions of users worldwide.',
    experience: [
      {
        title: 'Director of Product Engineering',
        company: 'Netflix',
        duration: '2018 - Present',
      },
      {
        title: 'Senior Engineering Manager',
        company: 'Spotify',
        duration: '2014 - 2018',
      },
      {
        title: 'Engineering Lead',
        company: 'YouTube',
        duration: '2010 - 2014',
      },
    ],
    education: [
      {
        degree: 'MS in Computer Science',
        school: 'Georgia Tech',
        year: '2008 - 2010',
      },
      {
        degree: 'BS in Software Engineering',
        school: 'University of Texas at Austin',
        year: '2004 - 2008',
      },
    ],
    skills: [
      'Streaming Technology',
      'Content Delivery',
      'Distributed Systems',
      'Product Development',
      'Microservices',
      'Java',
      'Scala',
      'User Experience',
    ],
    messages: [
      {
        type: 'email',
        subject: 'Enhancing Streaming Performance at Netflix',
        body: `Hi Emily,

I've been impressed by Netflix's continued innovation in streaming technology and content delivery. Your leadership in product engineering, combined with your background at Spotify and YouTube, brings a unique perspective to these challenges.

We've been working with product engineering leaders at other streaming platforms to optimize content delivery performance and improve user experience at scale. Our recent work helped a major platform reduce buffering incidents by 45% while decreasing CDN costs.

I think some of our insights around distributed systems and content delivery optimization could be valuable for Netflix's initiatives. Would you be open to a brief conversation to explore this further?

Best regards,
[Your Name]`,
        wordCount: 125,
      },
      {
        type: 'followUp',
        subject: 'Quick follow-up on streaming optimization',
        body: `Hi Emily,

Following up on my previous message about streaming performance optimization.

I know your plate is full managing product engineering at Netflix, but I wanted to share a quick win we achieved with another streaming platform: we reduced their global latency by 35% using some innovative CDN strategies.

Would you be interested in a brief overview? I think it could be relevant to your work.

Best,
[Your Name]`,
        wordCount: 75,
      },
      {
        type: 'secondFollowUp',
        subject: 'Thought you might find this interesting',
        body: `Hi Emily,

I hope you're having a great week! I came across some interesting research on adaptive bitrate streaming algorithms and thought of the work you're doing at Netflix.

The research discusses new approaches to quality optimization that could be relevant to your content delivery infrastructure. Would you like me to send it over?

No pressure – just wanted to share something that might be valuable.

Cheers,
[Your Name]`,
        wordCount: 77,
      },
      {
        type: 'connectionRequest',
        body: `Hi Emily, I'm impressed by Netflix's streaming technology innovations. I help product engineering leaders optimize content delivery systems and would love to connect and share insights. Looking forward to it!`,
        wordCount: 34,
      },
      {
        type: 'postConnection',
        subject: 'Great to be connected, Emily!',
        body: `Hi Emily,

Thank you for connecting! It's exciting to be in touch with someone leading such innovative product engineering work at Netflix.

Your experience across Netflix, Spotify, and YouTube gives you incredible insights into streaming technology challenges. I work with engineering leaders in this space and have gathered valuable perspectives on scaling content delivery systems.

I'd love to learn more about your current focus areas at Netflix and share relevant insights if helpful. Would you be interested in a brief conversation?

Looking forward to staying connected!

Best,
[Your Name]`,
        wordCount: 103,
      },
    ],
  },
];

function AIMessagePreviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentContactIndex, setCurrentContactIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const contactParam = searchParams.get('contacts');
    if (!contactParam) return;

    const firstContactId = contactParam.split(',')[0]?.trim();
    if (!firstContactId) return;

    const matchedIndex = mockContactsWithMessages.findIndex((contact) => contact.id === firstContactId);
    if (matchedIndex >= 0) {
      setCurrentContactIndex(matchedIndex);
    }
  }, [searchParams]);

  const currentContact = mockContactsWithMessages[currentContactIndex];

  const handleSendToCampaignManager = () => {
    // TODO: Navigate to Campaign Manager sync page (Step 2)
    console.log('Navigating to Campaign Manager sync...');
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4 bg-white border-b"
        style={{ borderColor: '#e7e7e6' }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-1 hover:bg-gray-100 rounded"
            style={{ color: '#706f69' }}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold" style={{ color: '#111928' }}>
            AI Generated Messages
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <MessageStepper currentStep={1} />
          <button
            onClick={handleSendToCampaignManager}
            className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#191918' }}
          >
            Send all to Campaign Manager
          </button>
        </div>
      </div>

      {/* Main Content: Two-column layout */}
      <div className="flex flex-1 overflow-hidden">
        <ContactSidebar
          contacts={mockContactsWithMessages}
          currentIndex={currentContactIndex}
          onNavigate={setCurrentContactIndex}
        />
        <MessagePreview
          contactName={currentContact.name}
          linkedinUrl={currentContact.linkedin}
          messages={currentContact.messages}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default function AIMessagePreviewPage() {
  return (
    <Suspense fallback={<div className="h-screen w-full bg-white" />}>
      <AIMessagePreviewContent />
    </Suspense>
  );
}
