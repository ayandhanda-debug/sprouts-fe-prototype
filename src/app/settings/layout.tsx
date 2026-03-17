'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  UserRound,
  Users,
  KeyRound,
  Target,
  ListChecks,
  ListFilter,
  Code2,
  MessageSquare,
  Plug,
  Coins,
  Wallet,
} from 'lucide-react';

type SettingsNavItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

type SettingsSection = {
  title: string;
  items: SettingsNavItem[];
};

const sections: SettingsSection[] = [
  {
    title: 'ACCOUNT DETAILS',
    items: [{ label: 'Account details', path: '/settings/account', icon: <UserRound size={16} /> }],
  },
  {
    title: 'USER AND ROLES',
    items: [
      { label: 'Manage Users', path: '/settings/manage-users', icon: <Users size={16} /> },
      { label: 'Roles & permissions', path: '/settings/roles-permissions', icon: <KeyRound size={16} /> },
    ],
  },
  {
    title: 'CONFIGURATIONS',
    items: [
      { label: 'Intent topics', path: '/settings/intent-topics', icon: <Target size={16} /> },
      { label: 'Set-up ICPs', path: '/settings/setup-icps', icon: <ListChecks size={16} /> },
      { label: 'Exclusion lists', path: '/settings/exclusion-lists', icon: <ListFilter size={16} /> },
      { label: 'Website tracking snippet', path: '/settings/website-tracking-snippet', icon: <Code2 size={16} /> },
      { label: 'Messaging', path: '/settings/config/hpm-configuration', icon: <MessageSquare size={16} /> },
    ],
  },
  {
    title: 'INTEGRATIONS',
    items: [{ label: 'Integrations', path: '/settings/integrations', icon: <Plug size={16} /> }],
  },
  {
    title: 'CREDITS',
    items: [
      { label: 'Credit Usage', path: '/settings/credit-usage', icon: <Coins size={16} /> },
      { label: 'Recharge History', path: '/settings/recharge-history', icon: <Wallet size={16} /> },
    ],
  },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f4f5f6]">
      <header
        className="h-16 border-b bg-[#f4f5f6] px-6 flex items-center justify-between"
        style={{ borderColor: '#dfe2e4' }}
      >
        <h1 className="text-[24px] leading-none font-semibold tracking-tight" style={{ color: '#293f4b' }}>
          Settings
        </h1>

        <button
          className="h-10 px-5 rounded-xl border text-[18px] leading-none font-medium"
          style={{ borderColor: '#d8dbde', color: '#434a52', backgroundColor: '#f8f9fb' }}
        >
          Sprouts.ai
        </button>
      </header>

      <div className="flex">
        <aside className="w-[295px] border-r min-h-[calc(100vh-64px)] px-4 py-4" style={{ borderColor: '#dfe2e4' }}>
          <div className="relative mb-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#98a0a8' }} />
            <input
              readOnly
              value="Search settings..."
              className="w-full h-9 pl-9 pr-3 text-sm rounded-lg border"
              style={{ borderColor: '#d9dce0', color: '#9aa0a8', backgroundColor: '#f7f8f9' }}
            />
          </div>

          <nav className="space-y-4">
            {sections.map((section) => (
              <div key={section.title}>
                <p className="text-xs font-semibold mb-1" style={{ color: '#9a9fa5' }}>
                  {section.title}
                </p>
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const active = pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        className="h-9 px-2.5 rounded-md flex items-center gap-2 text-[14px] leading-none font-medium whitespace-nowrap"
                        style={{
                          color: '#42484f',
                          backgroundColor: active ? '#dde1e5' : 'transparent',
                        }}
                      >
                        <span style={{ color: '#99a1a9' }}>{item.icon}</span>
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-5">
          {children}
        </main>
      </div>
    </div>
  );
}
