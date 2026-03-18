import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';

export const metadata: Metadata = {
  title: 'Sprouts ABM - Prototype',
  description: 'Account-Based Marketing Platform Prototype',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <main className="ml-16 min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
