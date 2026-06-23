import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '@/shared/constants';

export function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md border border-neutral-gray-200/60 shadow-[0_8px_32px_rgba(0,0,0,0.08)] flex justify-around items-center h-16 px-4 rounded-2xl z-[45]">
      {[
        { to: ROUTES.student.dashboard, icon: 'dashboard', label: 'Accueil' },
        { to: ROUTES.student.cours, icon: 'school', label: 'Cours' },
        { to: ROUTES.student.planning, icon: 'calendar_today', label: 'Agenda' },
        { to: ROUTES.student.devoirs, icon: 'assignment', label: 'Devoirs' },
      ].map(({ to, icon, label }) => (
        <NavLink key={to} to={to} className={({ isActive }) => `flex flex-col items-center justify-center transition-all duration-205 py-1.5 px-3 rounded-xl ${isActive ? 'text-brand-red-deep font-bold bg-brand-red-light/40 scale-105' : 'text-neutral-500 hover:text-neutral-800'}`}>
          <span translate="no" className="material-symbols-outlined text-[21px]">{icon}</span>
          <span className="text-[9px] font-black tracking-wide mt-0.5">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
