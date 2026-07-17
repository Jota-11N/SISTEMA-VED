'use client';

import React, { useState, Suspense } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function DashboardClientLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-background font-sans transition-colors duration-300">
      <Suspense fallback={<div className="w-[260px] h-screen bg-background border-r border-border hidden md:flex" />}>
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </Suspense>
      <div className={`flex-1 flex flex-col transition-all duration-300 min-w-0 z-10 ${isCollapsed ? 'md:ml-[68px]' : 'md:ml-[260px]'}`}>
        <Suspense fallback={<header className="h-20 bg-background border-b border-border" />}>
          <Navbar />
        </Suspense>
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
