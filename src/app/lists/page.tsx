'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  Download,
  Users,
  User,
  Grid,
  List as ListIcon,
  Settings,
  BookOpen,
} from 'lucide-react';

// Types
interface List {
  id: string;
  name: string;
  description?: string;
  type: 'accounts' | 'contacts';
  itemCount: number;
  owner: {
    name: string;
    avatar: string;
  };
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  autoLinkSequence?: string;
  isAutoLinked?: boolean;
  source: 'user' | 'playbook';
  tags?: string[];
}

// Mock data
const mockContactsLists: List[] = [
  {
    id: '1',
    name: 'New Era Test',
    description: 'Test contacts for new campaign',
    type: 'contacts',
    itemCount: 50,
    owner: { name: 'Ishita Gupta', avatar: '#10b981' },
    createdBy: 'Ishita Gupta',
    createdAt: '2026-02-20',
    updatedAt: '2026-02-27',
    autoLinkSequence: 'Test step',
    isAutoLinked: true,
    source: 'user',
    tags: ['Test', 'Campaign'],
  },
  {
    id: '2',
    name: 'Finance Decision Makers',
    description: 'CFOs and Finance Directors from target accounts',
    type: 'contacts',
    itemCount: 423,
    owner: { name: 'Pied Piper', avatar: '#1c64f2' },
    createdBy: 'Pied Piper',
    createdAt: '2026-01-20',
    updatedAt: '2026-02-25',
    autoLinkSequence: 'Mar30_Batch1',
    isAutoLinked: false,
    source: 'user',
    tags: ['Finance', 'C-Level'],
  },
  {
    id: '3',
    name: 'Marketing Leaders',
    description: 'CMOs and VP Marketing contacts',
    type: 'contacts',
    itemCount: 312,
    owner: { name: 'Pied Piper', avatar: '#f59e0b' },
    createdBy: 'Pied Piper',
    createdAt: '2026-02-05',
    updatedAt: '2026-02-24',
    source: 'playbook',
    tags: ['Marketing', 'C-Level'],
  },
  {
    id: '4',
    name: 'IT Decision Makers',
    description: 'CTOs, CIOs, and IT Directors',
    type: 'contacts',
    itemCount: 567,
    owner: { name: 'Pied Piper', avatar: '#8b5cf6' },
    createdBy: 'Pied Piper',
    createdAt: '2026-02-10',
    updatedAt: '2026-02-27',
    autoLinkSequence: 'Tech Leaders Campaign',
    isAutoLinked: true,
    source: 'user',
    tags: ['IT', 'Technical'],
  },
  {
    id: '5',
    name: 'Product Managers',
    description: 'Product management professionals',
    type: 'contacts',
    itemCount: 289,
    owner: { name: 'Pied Piper', avatar: '#ef4444' },
    createdBy: 'Pied Piper',
    createdAt: '2026-02-15',
    updatedAt: '2026-02-26',
    source: 'user',
    tags: ['Product'],
  },
];

const mockAccountsLists: List[] = [
  {
    id: '6',
    name: 'Enterprise Tech Companies',
    description: 'Large technology companies with 1000+ employees',
    type: 'accounts',
    itemCount: 247,
    owner: { name: 'Pied Piper', avatar: '#1c64f2' },
    createdBy: 'Pied Piper',
    createdAt: '2026-01-15',
    updatedAt: '2026-02-20',
    autoLinkSequence: 'Enterprise Outreach',
    isAutoLinked: true,
    source: 'user',
    tags: ['Enterprise', 'Tech'],
  },
  {
    id: '7',
    name: 'Healthcare Sector Accounts',
    description: 'Healthcare providers and insurers',
    type: 'accounts',
    itemCount: 156,
    owner: { name: 'Pied Piper', avatar: '#10b981' },
    createdBy: 'Pied Piper',
    createdAt: '2026-02-01',
    updatedAt: '2026-02-22',
    source: 'playbook',
    tags: ['Healthcare'],
  },
  {
    id: '8',
    name: 'EMEA Target Accounts',
    description: 'European, Middle East, and African companies',
    type: 'accounts',
    itemCount: 189,
    owner: { name: 'Pied Piper', avatar: '#f59e0b' },
    createdBy: 'Pied Piper',
    createdAt: '2026-02-08',
    updatedAt: '2026-02-26',
    autoLinkSequence: 'EMEA Launch',
    isAutoLinked: false,
    source: 'user',
    tags: ['EMEA', 'Regional'],
  },
  {
    id: '9',
    name: 'Financial Services Accounts',
    description: 'Banks, insurance, and fintech companies',
    type: 'accounts',
    itemCount: 134,
    owner: { name: 'Pied Piper', avatar: '#8b5cf6' },
    createdBy: 'Pied Piper',
    createdAt: '2026-02-12',
    updatedAt: '2026-02-23',
    source: 'user',
    tags: ['Finance', 'Banking'],
  },
];

export default function ListsPage() {
  const [activeTab, setActiveTab] = useState<'accounts' | 'contacts'>('contacts');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [contactsLists, setContactsLists] = useState(mockContactsLists);
  const [accountsLists, setAccountsLists] = useState(mockAccountsLists);
  const [selectedLists, setSelectedLists] = useState<Set<string>>(new Set());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentList, setCurrentList] = useState<List | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'accounts' as 'accounts' | 'contacts',
    tags: '',
  });

  // Get current lists based on active tab
  const currentLists = activeTab === 'contacts' ? contactsLists : accountsLists;

  // Filter lists based on search query
  const filteredLists = currentLists.filter((list) =>
    list.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (list.description && list.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Handle checkbox selection
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedLists(new Set(filteredLists.map((l) => l.id)));
    } else {
      setSelectedLists(new Set());
    }
  };

  const handleSelectList = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedLists);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedLists(newSelected);
  };

  // Handle create list
  const handleCreateList = () => {
    const totalLists = contactsLists.length + accountsLists.length;
    const newList: List = {
      id: String(totalLists + 1),
      name: formData.name,
      description: formData.description,
      type: formData.type,
      itemCount: 0,
      owner: { name: 'Pied Piper', avatar: '#1c64f2' },
      createdBy: 'Pied Piper',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      source: 'user',
      tags: formData.tags ? formData.tags.split(',').map((t) => t.trim()) : [],
    };

    if (formData.type === 'contacts') {
      setContactsLists([...contactsLists, newList]);
    } else {
      setAccountsLists([...accountsLists, newList]);
    }
    setShowCreateModal(false);
    setFormData({ name: '', description: '', type: 'accounts', tags: '' });
  };

  // Handle edit list
  const handleEditList = () => {
    if (!currentList) return;

    const updateList = (list: List) =>
      list.id === currentList.id
        ? {
            ...list,
            name: formData.name,
            description: formData.description,
            type: formData.type,
            tags: formData.tags ? formData.tags.split(',').map((t) => t.trim()) : [],
            updatedAt: new Date().toISOString().split('T')[0],
          }
        : list;

    if (currentList.type === 'contacts') {
      setContactsLists(contactsLists.map(updateList));
    } else {
      setAccountsLists(accountsLists.map(updateList));
    }
    setShowEditModal(false);
    setCurrentList(null);
    setFormData({ name: '', description: '', type: 'accounts', tags: '' });
  };

  // Handle delete list
  const handleDeleteList = () => {
    if (!currentList) return;

    if (currentList.type === 'contacts') {
      setContactsLists(contactsLists.filter((list) => list.id !== currentList.id));
    } else {
      setAccountsLists(accountsLists.filter((list) => list.id !== currentList.id));
    }
    setShowDeleteModal(false);
    setCurrentList(null);
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (activeTab === 'contacts') {
      setContactsLists(contactsLists.filter((list) => !selectedLists.has(list.id)));
    } else {
      setAccountsLists(accountsLists.filter((list) => !selectedLists.has(list.id)));
    }
    setSelectedLists(new Set());
  };

  // Open delete modal
  const openDeleteModal = (list: List) => {
    setCurrentList(list);
    setShowDeleteModal(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      {/* Tab Navigation */}
      <div className="flex border-b bg-white" style={{ borderColor: '#e7e7e6' }}>
        <button
          onClick={() => {
            setActiveTab('contacts');
            setSelectedLists(new Set());
          }}
          className={`px-6 py-3 text-sm font-medium ${
            activeTab === 'contacts' ? 'border-b-2' : ''
          }`}
          style={{
            borderColor: activeTab === 'contacts' ? '#1c64f2' : 'transparent',
            color: activeTab === 'contacts' ? '#1c64f2' : '#706f69',
          }}
        >
          Contacts lists
        </button>
        <button
          onClick={() => {
            setActiveTab('accounts');
            setSelectedLists(new Set());
          }}
          className={`px-6 py-3 text-sm font-medium ${
            activeTab === 'accounts' ? 'border-b-2' : ''
          }`}
          style={{
            borderColor: activeTab === 'accounts' ? '#1c64f2' : 'transparent',
            color: activeTab === 'accounts' ? '#1c64f2' : '#706f69',
          }}
        >
          Accounts lists
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b" style={{ borderColor: '#e7e7e6' }}>
        <div className="flex items-center gap-3 flex-1">
          {/* Search */}
          <div className="relative w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#706f69' }} />
            <input
              type="text"
              placeholder="Search lists"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-sm rounded-lg border"
              style={{ borderColor: '#e7e7e6' }}
            />
          </div>

          {/* Filter Dropdowns */}
          <select
            className="px-3 py-1.5 text-sm rounded-lg border"
            style={{ borderColor: '#e7e7e6', color: '#706f69' }}
          >
            <option>List type</option>
            <option>User generated</option>
            <option>Playbook generated</option>
          </select>

          <select
            className="px-3 py-1.5 text-sm rounded-lg border"
            style={{ borderColor: '#e7e7e6', color: '#706f69' }}
          >
            <option>Campaign Manager</option>
          </select>

          <select
            className="px-3 py-1.5 text-sm rounded-lg border"
            style={{ borderColor: '#e7e7e6', color: '#706f69' }}
          >
            <option>View for</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex items-center gap-1 border rounded-lg" style={{ borderColor: '#e7e7e6' }}>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-l-lg ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
              style={{ color: viewMode === 'grid' ? '#1c64f2' : '#706f69' }}
              title="Grid view"
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-r-lg ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
              style={{ color: viewMode === 'list' ? '#1c64f2' : '#706f69' }}
              title="List view"
            >
              <ListIcon size={16} />
            </button>
          </div>

          {/* Bulk Delete */}
          {selectedLists.size > 0 && (
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-lg border"
              style={{ borderColor: '#e7e7e6', color: '#ef4444' }}
            >
              <Trash2 size={16} />
              Delete Selected
            </button>
          )}

          {/* Create List Button */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-white rounded-lg"
            style={{ backgroundColor: '#1c64f2' }}
          >
            <Plus size={16} />
            New List
          </button>
        </div>
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
                  checked={selectedLists.size === filteredLists.length && filteredLists.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>
                <button className="flex items-center gap-1">
                  List Name
                  <ChevronDown size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>Created by</th>
              <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>
                Total {activeTab === 'contacts' ? 'contacts' : 'accounts'}
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>Auto-link to sequence</th>
              <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#706f69' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLists.map((list) => (
              <tr
                key={list.id}
                className="border-b hover:bg-gray-50 transition-colors"
                style={{ borderColor: '#e7e7e6' }}
              >
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    className="rounded"
                    checked={selectedLists.has(list.id)}
                    onChange={(e) => handleSelectList(list.id, e.target.checked)}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {list.source === 'user' ? (
                      <User size={16} style={{ color: '#706f69' }} />
                    ) : (
                      <BookOpen size={16} style={{ color: '#706f69' }} />
                    )}
                    <div>
                      <Link href={`/lists/${list.id}`} className="text-sm font-medium hover:underline" style={{ color: '#1c64f2' }}>
                        {list.name}
                      </Link>
                      <p className="text-xs mt-0.5" style={{ color: '#706f69' }}>
                        {list.source === 'user' ? 'User generated' : 'Playbook generated'}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white"
                      style={{ backgroundColor: list.owner.avatar }}
                    >
                      {getInitials(list.owner.name)}
                    </div>
                    <span className="text-sm" style={{ color: '#191918' }}>{list.owner.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm" style={{ color: '#706f69' }}>{formatDate(list.createdAt)}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-medium" style={{ color: '#111928' }}>{list.itemCount}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm" style={{ color: list.autoLinkSequence ? '#191918' : '#706f69' }}>
                      {list.autoLinkSequence || 'Unassigned'}
                    </span>
                    {list.isAutoLinked && (
                      <Settings size={14} style={{ color: '#706f69' }} />
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openDeleteModal(list)}
                      className="p-1 rounded hover:bg-gray-200"
                      style={{ color: '#706f69' }}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      className="flex items-center gap-1 px-3 py-1 text-xs font-medium rounded border"
                      style={{ borderColor: '#e7e7e6', color: '#191918' }}
                    >
                      <Download size={14} />
                      Export list
                    </button>
                  </div>
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
          <span>1 - {filteredLists.length} of {currentLists.length} items</span>
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

      {/* Create List Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="px-6 py-4 border-b" style={{ borderColor: '#e7e7e6' }}>
              <h2 className="text-lg font-semibold" style={{ color: '#111928' }}>Create New List</h2>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#191918' }}>
                  List Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter list name"
                  className="w-full px-3 py-2 text-sm rounded-lg border"
                  style={{ borderColor: '#e7e7e6' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#191918' }}>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter description (optional)"
                  className="w-full px-3 py-2 text-sm rounded-lg border"
                  style={{ borderColor: '#e7e7e6' }}
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#191918' }}>
                  Type <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'accounts' | 'contacts' })}
                  className="w-full px-3 py-2 text-sm rounded-lg border"
                  style={{ borderColor: '#e7e7e6' }}
                >
                  <option value="accounts">Accounts</option>
                  <option value="contacts">Contacts</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#191918' }}>Tags</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Enter tags (comma-separated)"
                  className="w-full px-3 py-2 text-sm rounded-lg border"
                  style={{ borderColor: '#e7e7e6' }}
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-2" style={{ borderColor: '#e7e7e6' }}>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setFormData({ name: '', description: '', type: 'accounts', tags: '' });
                }}
                className="px-4 py-2 text-sm rounded-lg border"
                style={{ borderColor: '#e7e7e6', color: '#706f69' }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateList}
                disabled={!formData.name || formData.name.length < 3}
                className="px-4 py-2 text-sm font-medium text-white rounded-lg disabled:opacity-50"
                style={{ backgroundColor: '#1c64f2' }}
              >
                Create List
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && currentList && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="px-6 py-4 border-b" style={{ borderColor: '#e7e7e6' }}>
              <h2 className="text-lg font-semibold" style={{ color: '#111928' }}>Delete List</h2>
            </div>
            <div className="px-6 py-4">
              <p className="text-sm" style={{ color: '#191918' }}>
                Are you sure you want to delete <strong>{currentList.name}</strong>?
              </p>
              <p className="text-sm mt-2" style={{ color: '#706f69' }}>
                This action cannot be undone. The list and all its contents will be permanently removed.
              </p>
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-2" style={{ borderColor: '#e7e7e6' }}>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setCurrentList(null);
                }}
                className="px-4 py-2 text-sm rounded-lg border"
                style={{ borderColor: '#e7e7e6', color: '#706f69' }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteList}
                className="px-4 py-2 text-sm font-medium text-white rounded-lg"
                style={{ backgroundColor: '#ef4444' }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
