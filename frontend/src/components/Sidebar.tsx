'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Contact, 
  User, 
  Users, 
  Eye, 
  Link as LinkIcon, 
  ShieldCheck, 
  BarChart4, 
  UsersRound, 
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Elecciones', href: '/dashboard/elecciones', icon: CheckSquare },
  { name: 'Padrón Electoral', href: '/dashboard/padron-electoral', icon: Contact },
  { name: 'Listas', href: '/dashboard/listas', icon: User },
  { name: 'Electores', href: '/dashboard/electores', icon: Users },
  { name: 'Monitor', href: '/dashboard/monitor-votacion', icon: Eye },
  { name: 'Blockchain', href: '/dashboard/blockchain', icon: LinkIcon },
  { name: 'Auditoría', href: '/dashboard/auditoria', icon: ShieldCheck },
  { name: 'Reportes', href: '/dashboard/reportes', icon: BarChart4 },
  { name: 'Usuarios', href: '/dashboard/usuarios', icon: UsersRound },
  { name: 'Configuración', href: '/dashboard/configuracion', icon: Settings },
];

export default function Sidebar({ 
  isCollapsed = false, 
  setIsCollapsed 
}: { 
  isCollapsed?: boolean; 
  setIsCollapsed?: (val: boolean) => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <aside className={`${isCollapsed ? 'w-[72px]' : 'w-[260px]'} bg-transparent border-r border-border h-screen fixed top-0 left-0 flex flex-col z-30 hidden md:flex transition-all duration-300 overflow-hidden`}>
      
      {/* Header / Logo */}
      <div className={`pt-6 pb-6 flex flex-col items-center justify-center transition-all duration-300 w-full`}>
        <div className={`flex items-center justify-center w-full ${isCollapsed ? 'px-0' : 'px-6 gap-3'}`}>
          {/* Logo with Orange Accent as requested */}
          <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm shadow-primary/20">
            <ShieldCheck className="w-6 h-6 text-warning" strokeWidth={2.5} />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col whitespace-nowrap overflow-hidden">
              <span className="text-lg font-black text-primary tracking-tight leading-none">VED CEU</span>
              <span className="text-[9px] font-bold text-foreground-muted uppercase tracking-widest mt-0.5">Administration</span>
            </div>
          )}
        </div>
      </div>

      {/* Menu items list */}
      <nav className="flex-1 overflow-y-auto py-2 custom-scrollbar">
        <ul className={`space-y-1.5 flex flex-col items-center w-full ${isCollapsed ? 'px-2' : 'px-4'}`}>
          {menuItems.map((item) => {
            // Lógica RBAC (Simulación): Ocultar opciones para el Personero
            const isPersoneroRole = pathname?.includes('/personero') || searchParams?.get('role') === 'personero';
            const hiddenForPersonero = ['Padrón Electoral', 'Electores', 'Usuarios', 'Configuración'];
            if (isPersoneroRole && hiddenForPersonero.includes(item.name)) {
              return null;
            }

            // Propagar el rol simulado a través de los enlaces
            let currentHref = item.href;
            if (isPersoneroRole) {
               currentHref = item.name === 'Dashboard' ? '/dashboard/personero' : `${item.href}?role=personero`;
            }

            const Icon = item.icon;
            const isActive = currentHref.split('?')[0] === '/dashboard' || currentHref.split('?')[0] === '/dashboard/personero'
              ? pathname === currentHref.split('?')[0]
              : pathname?.startsWith(currentHref.split('?')[0]);

            return (
              <li key={item.name} title={isCollapsed ? item.name : undefined} className={`relative w-full ${isCollapsed ? 'px-0' : 'px-2'}`}>
                <Link
                  href={currentHref}
                  className={`flex items-center ${isCollapsed ? 'justify-center w-11 h-11 mx-auto' : 'gap-4 px-3 py-2.5 w-full'} rounded-xl text-[14px] font-bold transition-all duration-200 group relative ${
                    isActive 
                      ? 'bg-primary text-white shadow-md shadow-primary/20' 
                      : 'text-foreground-muted hover:text-foreground hover:bg-surface-hover'
                  }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-foreground-muted group-hover:text-primary transition-colors'}`} strokeWidth={isActive ? 2.5 : 2} />
                  
                  {!isCollapsed && (
                    <span className="whitespace-nowrap overflow-hidden tracking-wide">{item.name}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Actions & Session Security Box */}
      <div className="p-4 flex flex-col gap-3 mt-auto">
        
        {/* Session Security Box */}
        {!isCollapsed && (
          <div className="bg-secondary border border-primary/10 rounded-xl p-3.5 flex items-center gap-3 relative overflow-hidden group">
            <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm text-primary">
              <ShieldCheck className="w-4 h-4" strokeWidth={2.5} />
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-[10px] font-bold text-foreground-muted uppercase tracking-widest">Session Status</div>
              <div className="text-[13px] font-black text-primary leading-none mt-1">Secured & Active</div>
            </div>
          </div>
        )}

        {/* Bottom Actions: Collapse (Icon only) */}
        <div className="flex items-center justify-center mt-2 pt-3 border-t border-border/50">
          <button  
            onClick={() => setIsCollapsed && setIsCollapsed(!isCollapsed)}
            className="flex items-center justify-center w-10 h-10 rounded-xl text-foreground-muted hover:text-primary hover:bg-surface-hover transition-colors border border-transparent"
            title={isCollapsed ? "Expandir Menú" : "Contraer Menú"}
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </aside>
  );
}
