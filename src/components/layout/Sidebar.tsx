'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Target,
  List,
  BookOpen,
  Globe,
  Bell,
  Settings,
  Lock,
  ChevronRight
} from 'lucide-react';

interface NavItem {
  name: string;
  icon: React.ReactNode;
  path?: string;
  locked?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: 'Qualify & Enrich',
    items: [
      { name: 'DB Search', icon: <Search size={20} />, path: '/database-search/accounts' },
      { name: 'Target Profiles', icon: <Target size={20} />, path: '/target-profiles/accounts' },
      { name: 'Lists', icon: <List size={20} />, path: '/lists' },
    ],
  },
  {
    title: 'Engage & Automate',
    items: [
      { name: 'Playbook', icon: <BookOpen size={20} />, locked: true },
    ],
  },
  {
    title: 'Track and Monitor',
    items: [
      { name: 'Website Visits', icon: <Globe size={20} />, path: '/website-visits' },
      { name: 'Notifications', icon: <Bell size={20} />, locked: true },
      { name: 'Settings', icon: <Settings size={20} />, path: '/settings/account' },
    ],
  },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 h-screen z-50 transition-all duration-300 ease-in-out"
      style={{ backgroundColor: '#0e2933' }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className={`h-full flex flex-col ${isExpanded ? 'w-56' : 'w-16'} transition-all duration-300`}>
        {/* Logo */}
        <div className="flex items-center h-14 px-4 border-b border-white/10">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#1c64f2' }}>
            <span className="text-white font-bold text-sm">S</span>
          </div>
          {isExpanded && (
            <span className="ml-3 text-white font-semibold whitespace-nowrap">Sprouts.ai</span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navSections.map((section, sectionIdx) => (
            <div key={sectionIdx} className="mb-4">
              {isExpanded && (
                <p className="px-4 mb-2 text-xs font-medium text-white/50 uppercase tracking-wider whitespace-nowrap">
                  {section.title}
                </p>
              )}
              <ul className="space-y-1 px-2">
                {section.items.map((item, itemIdx) => {
                  const isActive = item.path && pathname.startsWith(item.path);

                  return (
                    <li key={itemIdx}>
                      {item.locked ? (
                        <div
                          className="flex items-center px-2 py-2 rounded-lg text-white/40 cursor-not-allowed"
                        >
                          <span className="relative">
                            {item.icon}
                            <Lock size={10} className="absolute -top-1 -right-1 text-white/40" />
                          </span>
                          {isExpanded && (
                            <span className="ml-3 text-sm whitespace-nowrap">{item.name}</span>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={item.path || '#'}
                          className={`flex items-center px-2 py-2 rounded-lg transition-colors ${
                            isActive
                              ? 'bg-white/10 text-white'
                              : 'text-white/70 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          {item.icon}
                          {isExpanded && (
                            <span className="ml-3 text-sm whitespace-nowrap">{item.name}</span>
                          )}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#3e545c' }}>
              <span className="text-white text-xs font-medium">PP</span>
            </div>
            {isExpanded && (
              <div className="ml-3">
                <p className="text-sm text-white font-medium whitespace-nowrap">Pied Piper</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
