'use client';

import { ChevronDown } from 'lucide-react';

interface HeaderProps {
  title: string;
  credits?: number;
  workspaceName?: string;
}

export default function Header({ title, credits = 3500, workspaceName = 'Pied Piper' }: HeaderProps) {
  return (
    <header className="h-14 flex items-center justify-between px-6 bg-white border-b" style={{ borderColor: '#e7e7e6' }}>
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold" style={{ color: '#111928' }}>{title}</h1>
        <span className="w-4 h-4 rounded-full border flex items-center justify-center" style={{ borderColor: '#d4d4d4' }}>
          <span className="text-xs" style={{ color: '#706f69' }}>?</span>
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Credits */}
        <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border" style={{ borderColor: '#e7e7e6' }}>
          <span className="text-sm font-medium" style={{ color: '#111928' }}>{(credits / 1000).toFixed(1)}K</span>
          <span className="text-xs" style={{ color: '#706f69' }}>Credits</span>
        </button>

        {/* Workspace Selector */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border" style={{ borderColor: '#e7e7e6' }}>
          <span className="text-sm" style={{ color: '#111928' }}>{workspaceName}</span>
          <ChevronDown size={16} style={{ color: '#706f69' }} />
        </button>
      </div>
    </header>
  );
}
