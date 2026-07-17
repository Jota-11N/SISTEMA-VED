'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { 
  Bell, 
  Menu, 
  LogOut,
  Calendar,
  Download,
  ChevronDown,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function Navbar() {
  const { theme, setTheme, actualTheme } = useTheme();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <header className="h-20 bg-background border-b border-border flex items-center justify-between px-8 sticky top-0 z-20 shadow-sm transition-colors duration-300">
      
      {/* Left side: Title and Subtitle */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-black text-foreground tracking-tight">
          Dashboard
        </h1>
        <p className="text-xs font-bold text-foreground-muted tracking-widest uppercase mt-0.5">
          VED - CEU Administration System
        </p>
      </div>

      {/* Right side: Actions & Profile */}
      <div className="flex items-center gap-6">
        


        {/* Theme Toggle */}
        <button 
          onClick={() => setTheme(actualTheme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-lg text-primary hover:bg-surface border border-transparent hover:border-border transition-colors"
          title="Cambiar Tema"
        >
          {actualTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button className="relative p-2 rounded-lg text-primary hover:bg-surface border border-transparent hover:border-border transition-colors">
            <Bell className="w-5 h-5" strokeWidth={2.5} />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-warning rounded-full ring-2 ring-background"></span>
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-6 border-l border-border">
          {(pathname?.includes('/personero') || searchParams?.get('role') === 'personero') ? (
            <>
              <div className="hidden sm:block text-right">
                <p className="text-sm font-black text-foreground leading-none">Personero Legal</p>
                <p className="text-[10px] font-bold text-foreground-muted uppercase tracking-widest mt-1">Representante</p>
              </div>
              <div className="h-10 w-10 rounded-full border-2 border-border overflow-hidden bg-surface flex items-center justify-center shadow-sm">
                 <img src="https://ui-avatars.com/api/?name=Personero+L&background=059669&color=fff&bold=true" alt="Personero" className="w-full h-full object-cover" />
              </div>
            </>
          ) : (
            <>
              <div className="hidden sm:block text-right">
                <p className="text-sm font-black text-foreground leading-none">JOTA T</p>
                <p className="text-[10px] font-bold text-foreground-muted uppercase tracking-widest mt-1">Super Admin</p>
              </div>
              <div className="h-10 w-10 rounded-full border-2 border-border overflow-hidden bg-surface flex items-center justify-center shadow-sm">
                 <img src="https://ui-avatars.com/api/?name=JOTA+T&background=1D4ED8&color=fff&bold=true" alt="JOTA T" className="w-full h-full object-cover" />
              </div>
            </>
          )}
        </div>

        {/* Logout */}
        <div className="pl-4 border-l border-border h-8 flex items-center">
          <Link href="/" className="p-2 rounded-lg text-error hover:bg-error/10 transition-colors border border-transparent" title="Cerrar Sesión">
            <LogOut className="w-5 h-5" strokeWidth={2.5} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-primary hover:bg-surface rounded-lg border border-transparent">
          <Menu className="w-5 h-5" />
        </button>

      </div>
    </header>
  );
}
