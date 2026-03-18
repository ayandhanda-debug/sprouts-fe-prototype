'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowLeft,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  MoreVertical,
  Search,
  Sparkles,
} from 'lucide-react';
import AIMessageModal from '@/components/AIMessageModal';
import WriteYourOwnModal from '@/components/WriteYourOwnModal';
import CreditConfirmationModal from '@/components/CreditConfirmationModal';
import GeneratingMessagesModal from '@/components/GeneratingMessagesModal';

// Types
interface ContactInList {
  id: string;
  name: string;
  avatar: string;
  accountName: string;
  accountDomain: string;
  accountLogo: string;
  sequence: {
    name: string;
    status: 'Cold / Not started' | 'In Progress' | 'Completed';
  };
  jobTitle: string;
  department: string;
  designation: string;
  subDesignation: string;
  contactOwner: string;
  hasAIMessage: boolean;
  isNew: boolean;
}

interface ListDetail {
  id: string;
  name: string;
  type: 'accounts' | 'contacts';
  creator: {
    name: string;
    initials: string;
    avatar: string;
  };
  source: 'user' | 'playbook';
}

// Mock list data
const mockListData: Record<string, ListDetail> = {
  '1': {
    id: '1',
    name: 'New Era Test',
    type: 'contacts',
    creator: {
      name: 'Ishita Gupta',
      initials: 'IG',
      avatar: '#10b981',
    },
    source: 'user',
  },
  '2': {
    id: '2',
    name: 'Finance Decision Makers',
    type: 'contacts',
    creator: {
      name: 'Pied Piper',
      initials: 'PP',
      avatar: '#1c64f2',
    },
    source: 'user',
  },
  '3': {
    id: '3',
    name: 'Marketing Leaders',
    type: 'contacts',
    creator: {
      name: 'Pied Piper',
      initials: 'PP',
      avatar: '#f59e0b',
    },
    source: 'playbook',
  },
};

// Mock contacts data
const mockContactsData: Record<string, ContactInList[]> = {
  '1': Array.from({ length: 50 }, (_, i) => ({
    id: `contact-${i + 1}`,
    name: [
      'John Smith',
      'Sarah Johnson',
      'Michael Brown',
      'Emily Davis',
      'David Wilson',
      'Jessica Martinez',
      'James Anderson',
      'Jennifer Taylor',
    ][i % 8],
    avatar: ['#1c64f2', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'][i % 5],
    accountName: [
      'Microsoft',
      'Google',
      'Amazon',
      'Apple',
      'Meta',
      'Netflix',
      'Tesla',
      'Adobe',
    ][i % 8],
    accountDomain: [
      'microsoft.com',
      'google.com',
      'amazon.com',
      'apple.com',
      'meta.com',
      'netflix.com',
      'tesla.com',
      'adobe.com',
    ][i % 8],
    accountLogo: ['#1c64f2', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'][i % 5],
    sequence: {
      name: ['Test step', 'Mar30_Batch1', 'Tech Leaders Campaign'][i % 3],
      status: ['Cold / Not started', 'In Progress', 'Completed'][i % 3] as any,
    },
    jobTitle: [
      'Chief Technology Officer',
      'VP Engineering',
      'Director of IT',
      'Senior Software Engineer',
      'Product Manager',
      'Head of DevOps',
    ][i % 6],
    department: ['Engineering', 'Product', 'IT', 'Operations', 'R&D'][i % 5],
    designation: ['C-Level', 'VP', 'Director', 'Manager', 'Senior'][i % 5],
    subDesignation: ['Technical', 'Business', 'Operations', 'Strategy'][i % 4],
    contactOwner: 'Pied Piper',
    hasAIMessage: i % 2 === 0,
    isNew: i < 15,
  })),
};

export default function ListDetailPage() {
  const params = useParams();
  const router = useRouter();
  const listId = params.id as string;

  const [activeTab, setActiveTab] = useState<'new' | 'noMessages' | 'all'>('all');
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());

  // AI Message Modal State
  const [showAIMessageModal, setShowAIMessageModal] = useState(false);
  const [showWriteYourOwnModal, setShowWriteYourOwnModal] = useState(false);
  const [showCreditConfirmation, setShowCreditConfirmation] = useState(false);
  const [showGeneratingModal, setShowGeneratingModal] = useState(false);
  const [selectedContactsForMessage, setSelectedContactsForMessage] = useState<Set<string>>(new Set());

  // Get list data
  const listData = mockListData[listId];
  const allContacts = mockContactsData[listId] || [];

  // Filter contacts based on active tab
  const filteredContacts =
    activeTab === 'new'
      ? allContacts.filter((c) => c.isNew)
      : activeTab === 'noMessages'
      ? allContacts.filter((c) => !c.hasAIMessage)
      : allContacts;

  // Get counts for tabs
  const newCount = allContacts.filter((c) => c.isNew).length;
  const noMessagesCount = allContacts.filter((c) => !c.hasAIMessage).length;
  const allCount = allContacts.length;

  // Handle checkbox selection
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedContacts(new Set(filteredContacts.map((c) => c.id)));
    } else {
      setSelectedContacts(new Set());
    }
  };

  const handleSelectContact = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedContacts);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedContacts(newSelected);
  };

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Get badge color based on sequence status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Cold / Not started':
        return { bg: '#f3f4f6', color: '#706f69' };
      case 'In Progress':
        return { bg: '#dbeafe', color: '#1c64f2' };
      case 'Completed':
        return { bg: '#d1fae5', color: '#10b981' };
      default:
        return { bg: '#f3f4f6', color: '#706f69' };
    }
  };

  // AI Message Handlers
  const handleAIMessageClick = () => {
    const selected = Array.from(selectedContacts);
    setSelectedContactsForMessage(new Set(selected));
    setShowAIMessageModal(true);
  };

  const handleViewMessageClick = (contactId: string) => {
    setSelectedContactsForMessage(new Set([contactId]));
    setShowAIMessageModal(true);
  };

  const handleViewReasoningClick = (contactId: string) => {
    router.push(`/ai-messages/preview?contacts=${contactId}`);
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

    setTimeout(() => {
      setShowGeneratingModal(false);
      // Navigate to preview page with selected contacts
      const contactIds = Array.from(selectedContactsForMessage).join(',');
      router.push(`/ai-messages/preview?contacts=${contactIds}`);
    }, 3000);
  };

  const handleCustomGenerate = (prompt: string, model: string, messageTypes: string[]) => {
    setShowWriteYourOwnModal(false);
    setShowCreditConfirmation(true);
  };

  if (!listData) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-120px)]">
        <p className="text-sm" style={{ color: '#706f69' }}>
          List not found
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b" style={{ borderColor: '#e7e7e6' }}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/lists')}
            className="p-1 hover:bg-gray-100 rounded"
            style={{ color: '#706f69' }}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold" style={{ color: '#111928' }}>
            Target Lists
          </h1>
          <HelpCircle size={16} style={{ color: '#706f69' }} />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium" style={{ color: '#191918' }}>
            181 Credits
          </span>
          <select
            className="px-3 py-1.5 text-sm rounded-lg border"
            style={{ borderColor: '#e7e7e6', color: '#191918' }}
          >
            <option>Sprouts.ai</option>
          </select>
        </div>
      </div>

      {/* Breadcrumb / List Info */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b" style={{ borderColor: '#e7e7e6' }}>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-white"
          style={{ backgroundColor: listData.creator.avatar }}
        >
          {listData.creator.initials}
        </div>
        <div>
          <h2 className="text-base font-semibold" style={{ color: '#111928' }}>
            {listData.name}
          </h2>
          <p className="text-xs" style={{ color: '#706f69' }}>
            {listData.source === 'user' ? 'User generated' : 'Playbook generated'}
          </p>
        </div>
      </div>

      {/* Tab Navigation and Actions */}
      <div className="flex items-center justify-between px-4 bg-white border-b" style={{ borderColor: '#e7e7e6' }}>
        <div className="flex">
          <button
            onClick={() => setActiveTab('new')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'new' ? 'border-b-2' : ''
            }`}
            style={{
              borderColor: activeTab === 'new' ? '#1c64f2' : 'transparent',
              color: activeTab === 'new' ? '#1c64f2' : '#706f69',
            }}
          >
            New ({newCount})
          </button>
          <button
            onClick={() => setActiveTab('noMessages')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'noMessages' ? 'border-b-2' : ''
            }`}
            style={{
              borderColor: activeTab === 'noMessages' ? '#1c64f2' : 'transparent',
              color: activeTab === 'noMessages' ? '#1c64f2' : '#706f69',
            }}
          >
            No AI Messages ({noMessagesCount})
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'all' ? 'border-b-2' : ''
            }`}
            style={{
              borderColor: activeTab === 'all' ? '#1c64f2' : 'transparent',
              color: activeTab === 'all' ? '#1c64f2' : '#706f69',
            }}
          >
            All ({allCount})
          </button>
        </div>
        <button
          onClick={handleAIMessageClick}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#191918' }}
          disabled={selectedContacts.size === 0}
        >
          <Sparkles size={16} />
          AI Message
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b" style={{ borderColor: '#e7e7e6' }}>
        <div className="relative w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#706f69' }} />
          <input
            type="text"
            placeholder="Search contacts"
            className="w-full pl-9 pr-4 py-1.5 text-sm rounded-lg border"
            style={{ borderColor: '#e7e7e6' }}
          />
        </div>
        {selectedContacts.size > 0 && (
          <span className="text-sm" style={{ color: '#706f69' }}>
            {selectedContacts.size} selected
          </span>
        )}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-white z-10" style={{ borderBottom: '1px solid #e7e7e6' }}>
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  className="rounded"
                  checked={selectedContacts.size === filteredContacts.length && filteredContacts.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>
                Contact Name
              </th>
              <th className="w-12 px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>
                Actions
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>
                Account Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>
                Sequence
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>
                Job Title
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>
                Department
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>
                Designation
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>
                Sub-Designation
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>
                Contact Owner
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>
                AI Reasoning
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>
                Message Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact) => {
              const statusColor = getStatusColor(contact.sequence.status);
              return (
                <tr
                  key={contact.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                  style={{ borderColor: '#e7e7e6' }}
                >
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      className="rounded"
                      checked={selectedContacts.has(contact.id)}
                      onChange={(e) => handleSelectContact(contact.id, e.target.checked)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white"
                        style={{ backgroundColor: contact.avatar }}
                      >
                        {getInitials(contact.name)}
                      </div>
                      <Link
                        href={`/contact-details/${contact.id}/overview`}
                        className="text-sm font-medium hover:underline"
                        style={{ color: '#1c64f2' }}
                      >
                        {contact.name}
                      </Link>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="p-1 hover:bg-gray-200 rounded"
                      style={{ color: '#706f69' }}
                      title="More actions"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-white"
                        style={{ backgroundColor: contact.accountLogo }}
                      >
                        {contact.accountName[0]}
                      </div>
                      <Link
                        href={`/account-details/${contact.accountDomain}/overview`}
                        className="text-sm font-medium hover:underline"
                        style={{ color: '#1c64f2' }}
                      >
                        {contact.accountName}
                      </Link>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-medium" style={{ color: '#191918' }}>
                        {contact.sequence.name}
                      </span>
                      <span
                        className="px-2 py-0.5 text-xs rounded-full inline-block w-fit"
                        style={{ backgroundColor: statusColor.bg, color: statusColor.color }}
                      >
                        {contact.sequence.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm" style={{ color: '#191918' }}>
                      {contact.jobTitle}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm" style={{ color: '#191918' }}>
                      {contact.department}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm" style={{ color: '#191918' }}>
                      {contact.designation}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm" style={{ color: '#191918' }}>
                      {contact.subDesignation}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm" style={{ color: '#191918' }}>
                      {contact.contactOwner}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {contact.hasAIMessage ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewReasoningClick(contact.id);
                        }}
                        className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
                        style={{ color: '#1c64f2' }}
                      >
                        <Sparkles size={14} />
                        View reasoning
                      </button>
                    ) : (
                      <span className="text-sm" style={{ color: '#9ca3af' }}>
                        Generate first
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {contact.hasAIMessage ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewMessageClick(contact.id);
                        }}
                        className="flex items-center gap-1 text-sm font-medium hover:underline"
                        style={{ color: '#1c64f2' }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                        View
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewMessageClick(contact.id);
                        }}
                        className="text-sm font-medium hover:underline"
                        style={{ color: '#1c64f2' }}
                      >
                        Generate
                      </button>
                    )}
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
          <span>1 - {filteredContacts.length} of {filteredContacts.length} items</span>
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
            <button className="p-1 rounded hover:bg-gray-100" disabled>
              <ChevronRight size={16} style={{ color: '#d4d4d4' }} />
            </button>
          </div>
        </div>
      </div>

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
        availableCredits={3183}
      />

      <GeneratingMessagesModal isOpen={showGeneratingModal} />
    </div>
  );
}
