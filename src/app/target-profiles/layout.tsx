'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import { Users, Building2, ChevronDown } from 'lucide-react';

export default function TargetProfilesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAccounts = pathname.includes('/accounts');

  return (
    <div className="min-h-screen">
      <Header title="Target Profiles" />

      {/* Sub-navigation */}
      <div className="bg-white px-6 py-3 border-b flex items-center justify-between" style={{ borderColor: '#e7e7e6' }}>
        <div className="flex items-center gap-2">
          <Link
            href="/target-profiles/accounts"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isAccounts
                ? 'bg-surface-gray'
                : 'hover:bg-surface-gray'
            }`}
            style={{
              backgroundColor: isAccounts ? '#f3f5f5' : undefined,
              color: '#191918'
            }}
          >
            <Building2 size={16} />
            Accounts
          </Link>
          <Link
            href="/target-profiles/contacts"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              !isAccounts
                ? 'bg-surface-gray'
                : 'hover:bg-surface-gray'
            }`}
            style={{
              backgroundColor: !isAccounts ? '#f3f5f5' : undefined,
              color: '#191918'
            }}
          >
            <Users size={16} />
            Contacts
          </Link>
        </div>

        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm"
          style={{ borderColor: '#e7e7e6', color: '#191918' }}
        >
          Actions
          <ChevronDown size={16} />
        </button>
      </div>

      {children}
    </div>
  );
}
