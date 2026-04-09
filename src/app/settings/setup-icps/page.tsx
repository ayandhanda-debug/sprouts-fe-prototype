'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ChevronRight,
  Eye,
  MoreVertical,
  RefreshCcw,
  Search,
  SlidersHorizontal,
  SquarePen,
  UserRound,
  UsersRound,
  X,
} from 'lucide-react';
import { getSavedIcps, type SavedIcp } from '@/lib/icp-storage';

type IcpStatus = 'Active' | 'Inactive';
type IcpTab = 'account' | 'persona';

interface CustomIcpRow {
  id: string;
  name: string;
  createdBy: string;
  createdByInitials: string;
  status: IcpStatus;
  dateModified: string;
  fromDbSearch: boolean;
  attributes: string[];
}

interface RecommendedIcpState {
  name: string;
  status: 'Active';
  createdOn: string;
  updatedOn: string;
  summary: string;
  topValues: { label: string; value: string }[];
}

const seededCustomIcps: CustomIcpRow[] = [
  {
    id: 'seed-1',
    name: 'test11',
    createdBy: 'Avinash Nagla',
    createdByInitials: 'AN',
    status: 'Active',
    dateModified: 'Mar 23, 2026',
    fromDbSearch: false,
    attributes: ['Revenue: $1M-$10M', 'Employee Count: 11-50'],
  },
  {
    id: 'seed-2',
    name: 'Exclusion Test',
    createdBy: 'Avinash Nagla',
    createdByInitials: 'AN',
    status: 'Active',
    dateModified: 'Mar 17, 2026',
    fromDbSearch: false,
    attributes: ['Location: United States', 'Industry: Software'],
  },
  {
    id: 'seed-3',
    name: 'HighRadius Enterprise ICP - North America',
    createdBy: 'Avinash Nagla',
    createdByInitials: 'AN',
    status: 'Inactive',
    dateModified: 'Mar 16, 2026',
    fromDbSearch: false,
    attributes: ['Revenue: $500M+', 'Technology: Salesforce'],
  },
  {
    id: 'seed-4',
    name: 'test',
    createdBy: 'Sprouts Admin',
    createdByInitials: 'SA',
    status: 'Active',
    dateModified: 'Feb 19, 2026',
    fromDbSearch: false,
    attributes: ['Employee Count: 1,001-5,000', 'Founded Year: 2010-2020'],
  },
  {
    id: 'seed-5',
    name: 'website test',
    createdBy: 'Karan Chaudhry',
    createdByInitials: 'KC',
    status: 'Inactive',
    dateModified: 'Jan 22, 2026',
    fromDbSearch: false,
    attributes: ['Company keyword: AI', 'Funding: Series B+'],
  },
];

const formatIcpDate = (isoDate: string) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(isoDate));

const initialRecommendedIcp: RecommendedIcpState = {
  name: 'Sprouts Recommended ICP',
  status: 'Active',
  createdOn: 'Sep 11, 2025',
  updatedOn: 'Mar 11, 2026',
  summary:
    'Emerging tech companies from 2010-2020, with $1-10M revenue, small team sizes (11-50 employees), predominantly using HubSpot, and lean marketing departments focused on growth and efficiency.',
  topValues: [
    { label: 'Founded Year', value: '2010-2020' },
    { label: 'Revenue', value: '$1M-$10M' },
    { label: 'Tech Stack', value: 'Hubspot' },
    { label: 'Employee Count', value: '11-50' },
  ],
};

const getStatusStyle = (status: IcpStatus) =>
  status === 'Active'
    ? { backgroundColor: '#e8f8ee', borderColor: '#22c55e', color: '#166534' }
    : { backgroundColor: '#fff1f2', borderColor: '#f87171', color: '#991b1b' };

const getInitialsColor = (initials: string) => {
  const palette = ['#22c55e', '#06b6d4', '#a855f7', '#1d4ed8', '#eab308', '#ef4444'];
  const index = initials.charCodeAt(0) % palette.length;
  return palette[index];
};

const mapSavedIcpToRow = (icp: SavedIcp): CustomIcpRow => ({
  id: icp.id,
  name: icp.name,
  createdBy: 'Ayan Dhanda',
  createdByInitials: 'AD',
  status: 'Active',
  dateModified: formatIcpDate(icp.createdAt),
  fromDbSearch: icp.source === 'db-search',
  attributes:
    icp.attributeSelections && icp.attributeSelections.length > 0
      ? icp.attributeSelections
      : [...icp.filters, ...icp.signals.map((signal) => `Signal: ${signal}`)],
});

export default function SetupIcpsPage() {
  const [tab, setTab] = useState<IcpTab>('account');
  const [savedIcps, setSavedIcps] = useState<SavedIcp[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendedIcp, setRecommendedIcp] = useState<RecommendedIcpState>(initialRecommendedIcp);
  const [draftRecommendedIcp, setDraftRecommendedIcp] = useState<RecommendedIcpState>(initialRecommendedIcp);
  const [showEditRecommendedModal, setShowEditRecommendedModal] = useState(false);

  useEffect(() => {
    setSavedIcps(getSavedIcps());
  }, []);

  const allRows = useMemo(() => {
    const fromDbSearch = savedIcps.map(mapSavedIcpToRow);
    return [...fromDbSearch, ...seededCustomIcps];
  }, [savedIcps]);

  const filteredRows = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return allRows;
    return allRows.filter((row) => {
      const haystack = [row.name, row.createdBy, ...row.attributes].join(' ').toLowerCase();
      return haystack.includes(query);
    });
  }, [allRows, searchQuery]);

  const openEditRecommendedModal = () => {
    setDraftRecommendedIcp(recommendedIcp);
    setShowEditRecommendedModal(true);
  };

  const updateDraftTopValue = (index: number, nextValue: string) => {
    setDraftRecommendedIcp((prev) => ({
      ...prev,
      topValues: prev.topValues.map((item, itemIndex) =>
        itemIndex === index ? { ...item, value: nextValue } : item
      ),
    }));
  };

  const saveRecommendedIcpChanges = () => {
    const today = formatIcpDate(new Date().toISOString());
    setRecommendedIcp({
      ...draftRecommendedIcp,
      updatedOn: today,
    });
    setShowEditRecommendedModal(false);
  };

  return (
    <div className="space-y-3">
      <section className="rounded-xl border bg-[#f7f8f9] p-4" style={{ borderColor: '#dce0e4' }}>
        <h2 className="text-[34px] leading-none font-semibold" style={{ color: '#1e2f3a' }}>
          Set Up ICP
        </h2>
        <p className="mt-1 text-[13px]" style={{ color: '#6f7b86' }}>
          Create up to 20 Account ICPs. A maximum of 10 Account ICPs can be set as active at the same time.
        </p>

        <div className="mt-3 inline-flex items-center gap-1 rounded-xl border p-1" style={{ borderColor: '#d8dde2', backgroundColor: '#f2f4f6' }}>
          <button
            type="button"
            onClick={() => setTab('account')}
            className="h-8 px-3 rounded-lg text-[13px] font-semibold inline-flex items-center gap-1.5"
            style={{
              backgroundColor: tab === 'account' ? '#ffffff' : 'transparent',
              color: tab === 'account' ? '#1f2f3a' : '#667380',
            }}
          >
            <SlidersHorizontal size={14} />
            Account ICP
          </button>
          <button
            type="button"
            onClick={() => setTab('persona')}
            className="h-8 px-3 rounded-lg text-[13px] font-semibold inline-flex items-center gap-1.5"
            style={{
              backgroundColor: tab === 'persona' ? '#ffffff' : 'transparent',
              color: tab === 'persona' ? '#1f2f3a' : '#667380',
            }}
          >
            <UsersRound size={14} />
            Persona ICP
          </button>
        </div>
      </section>

      {tab === 'account' && (
        <>
          <section className="rounded-xl border bg-[#f7f8f9] p-4" style={{ borderColor: '#dce0e4' }}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-[32px] leading-none font-semibold flex items-center gap-2" style={{ color: '#1f2f3a' }}>
                  {recommendedIcp.name}
                  <span className="inline-flex items-center gap-1 text-[22px] font-semibold" style={{ color: '#16a34a' }}>
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#22c55e' }} />
                    {recommendedIcp.status}
                  </span>
                </h3>
                <p className="mt-2 text-[13px]" style={{ color: '#5d6a75' }}>
                  Created on: {recommendedIcp.createdOn} &nbsp; Last updated: {recommendedIcp.updatedOn}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={openEditRecommendedModal}
                  className="h-8 px-3 rounded-lg border text-[13px] font-semibold inline-flex items-center gap-1.5"
                  style={{ borderColor: '#dce0e4', color: '#2b3c47', backgroundColor: '#ffffff' }}
                >
                  <SquarePen size={14} />
                  Edit
                </button>
                <button
                  type="button"
                  className="h-8 px-3 rounded-lg border text-[13px] font-semibold inline-flex items-center gap-1.5"
                  style={{ borderColor: '#dce0e4', color: '#2b3c47', backgroundColor: '#ffffff' }}
                >
                  <Eye size={14} />
                  Detailed View
                </button>
                <button
                  type="button"
                  className="h-8 w-8 rounded-lg border inline-flex items-center justify-center"
                  style={{ borderColor: '#dce0e4', color: '#5a6772', backgroundColor: '#ffffff' }}
                >
                  <RefreshCcw size={14} />
                </button>
                <button
                  type="button"
                  className="h-8 w-8 rounded-lg border inline-flex items-center justify-center"
                  style={{ borderColor: '#dce0e4', color: '#5a6772', backgroundColor: '#ffffff' }}
                >
                  <MoreVertical size={14} />
                </button>
              </div>
            </div>

            <p className="mt-3 text-[15px]" style={{ color: '#334652' }}>
              {recommendedIcp.summary}
            </p>

            <p className="mt-4 text-[24px] leading-none font-semibold" style={{ color: '#243641' }}>
              Top Contributing Values
            </p>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {recommendedIcp.topValues.map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border bg-white px-4 py-5 text-center"
                  style={{ borderColor: '#dce0e4' }}
                >
                  <p className="text-[14px]" style={{ color: '#495863' }}>
                    {item.label}
                  </p>
                  <p className="mt-1 text-[36px] leading-none font-semibold" style={{ color: '#1e2f3a' }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border bg-[#f7f8f9]" style={{ borderColor: '#dce0e4' }}>
            <div className="px-4 py-3 border-b flex items-center justify-between gap-3" style={{ borderColor: '#dce0e4' }}>
              <div className="flex items-center gap-2">
                <h3 className="text-[30px] leading-none font-semibold" style={{ color: '#1f2f3a' }}>
                  Custom ICPs
                </h3>
                <span
                  className="h-7 px-2.5 rounded-full text-[13px] font-semibold inline-flex items-center gap-1"
                  style={{ backgroundColor: '#e8edf2', color: '#495863' }}
                >
                  <UserRound size={14} />
                  {allRows.length} ICPs
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-[240px]">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#8d98a1' }} />
                  <input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search"
                    className="w-full h-8 pl-9 pr-3 rounded-lg border text-[13px] bg-white"
                    style={{ borderColor: '#dce0e4', color: '#33424d' }}
                  />
                </div>
                <button
                  type="button"
                  className="h-8 px-3 rounded-lg text-[13px] font-semibold text-white"
                  style={{ backgroundColor: '#1c64f2' }}
                >
                  Create ICP
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ borderColor: '#dce0e4' }}>
                    <th className="text-left px-4 py-2.5 text-[14px] font-semibold" style={{ color: '#55636e' }}>
                      ICP name
                    </th>
                    <th className="text-left px-4 py-2.5 text-[14px] font-semibold" style={{ color: '#55636e' }}>
                      Created by
                    </th>
                    <th className="text-left px-4 py-2.5 text-[14px] font-semibold" style={{ color: '#55636e' }}>
                      Status
                    </th>
                    <th className="text-left px-4 py-2.5 text-[14px] font-semibold" style={{ color: '#55636e' }}>
                      Date modified
                    </th>
                    <th className="w-10" />
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.map((row) => {
                    const statusStyle = getStatusStyle(row.status);
                    return (
                      <tr key={row.id} className="border-b last:border-b-0" style={{ borderColor: '#e3e7eb' }}>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-2 min-w-0">
                            <ChevronRight size={15} style={{ color: '#64727d' }} />
                            {row.fromDbSearch && (
                              <span
                                className="h-5 px-2 rounded-full text-[10px] font-semibold inline-flex items-center whitespace-nowrap"
                                style={{ backgroundColor: '#dbeafe', color: '#1d4ed8' }}
                              >
                                Created from DB Search
                              </span>
                            )}
                            <span className="text-[14px] font-medium truncate" style={{ color: '#1f2f3a' }}>
                              {row.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-5 h-5 rounded-full inline-flex items-center justify-center text-[10px] font-semibold text-white"
                              style={{ backgroundColor: getInitialsColor(row.createdByInitials) }}
                            >
                              {row.createdByInitials}
                            </span>
                            <span className="text-[14px]" style={{ color: '#293b46' }}>
                              {row.createdBy}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-2.5">
                          <span
                            className="h-7 px-2.5 rounded-full border text-[13px] font-semibold inline-flex items-center"
                            style={statusStyle}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-[14px]" style={{ color: '#293b46' }}>
                          {row.dateModified}
                        </td>
                        <td className="px-2 py-2.5">
                          <button
                            type="button"
                            className="h-8 w-8 rounded-lg inline-flex items-center justify-center hover:bg-[#eceff3]"
                          >
                            <MoreVertical size={14} style={{ color: '#64727d' }} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredRows.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-[14px]" style={{ color: '#6f7c86' }}>
                        No ICPs found for this search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {tab === 'persona' && (
        <section className="rounded-xl border bg-[#f7f8f9] p-6" style={{ borderColor: '#dce0e4' }}>
          <h3 className="text-[22px] leading-none font-semibold" style={{ color: '#2a3f4b' }}>
            Persona ICP
          </h3>
          <p className="mt-2 text-[14px]" style={{ color: '#6f7c86' }}>
            Persona ICP setup is part of the next iteration for this prototype.
          </p>
        </section>
      )}

      {showEditRecommendedModal && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={() => setShowEditRecommendedModal(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="w-full max-w-[700px] rounded-2xl border bg-white shadow-xl"
              style={{ borderColor: '#dce0e4' }}
            >
              <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#e4e8ec' }}>
                <div>
                  <h3 className="text-[20px] font-semibold" style={{ color: '#1f2f3a' }}>
                    Edit Sprouts Recommended ICP
                  </h3>
                  <p className="text-[13px] mt-1" style={{ color: '#6f7b86' }}>
                    Update summary and top contributing values.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowEditRecommendedModal(false)}
                  className="h-8 w-8 rounded-lg inline-flex items-center justify-center hover:bg-[#f3f5f7]"
                >
                  <X size={16} style={{ color: '#6f7b86' }} />
                </button>
              </div>

              <div className="px-5 py-4 space-y-4">
                <div>
                  <label className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: '#65737f' }}>
                    ICP Summary
                  </label>
                  <textarea
                    value={draftRecommendedIcp.summary}
                    onChange={(event) =>
                      setDraftRecommendedIcp((prev) => ({
                        ...prev,
                        summary: event.target.value,
                      }))
                    }
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-[13px] leading-snug resize-none"
                    style={{ borderColor: '#dce0e4', color: '#2d3f4b', minHeight: '96px' }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {draftRecommendedIcp.topValues.map((valueItem, index) => (
                    <div key={valueItem.label}>
                      <label className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: '#65737f' }}>
                        {valueItem.label}
                      </label>
                      <input
                        value={valueItem.value}
                        onChange={(event) => updateDraftTopValue(index, event.target.value)}
                        className="mt-1 w-full h-10 rounded-lg border px-3 text-[13px]"
                        style={{ borderColor: '#dce0e4', color: '#2d3f4b' }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-5 py-4 border-t flex items-center justify-end gap-2" style={{ borderColor: '#e4e8ec' }}>
                <button
                  type="button"
                  onClick={() => setShowEditRecommendedModal(false)}
                  className="h-9 px-3 rounded-lg border text-[13px] font-medium"
                  style={{ borderColor: '#dce0e4', color: '#4f5d68' }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveRecommendedIcpChanges}
                  className="h-9 px-3 rounded-lg text-[13px] font-semibold text-white"
                  style={{ backgroundColor: '#1c64f2' }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
