import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants';
import { useAuthStore } from '@/core/store/authStore';

interface Props {
  onOpenSettings: () => void;
  onOpenAiTutor: () => void;
  triggerToast: (msg: string) => void;
}

export function StudentSidebar({ onOpenSettings, onOpenAiTutor, triggerToast }: Props) {
  const navigate = useNavigate();
  const { deconnexion } = useAuthStore();

  return (
    <aside
      style={{ paddingTop: '10px' }}
      className="hidden md:flex flex-col h-screen pb-8 gap-4 bg-surface-container-low border-r border-[#E0E0E0] md:w-20 lg:w-64 fixed left-0 top-0 z-50 md:px-2 lg:px-4 select-none"
    >
      <div className="mb-6 px-2 flex flex-col items-center lg:items-start lg:px-4">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#B3181C] to-[#8F1316] text-white flex items-center justify-center font-black shadow-md shadow-[#B3181C]/25 transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer" onClick={() => navigate(ROUTES.student.dashboard)}>
          <span translate="no" className="material-symbols-outlined text-[20px] font-bold">school</span>
        </div>
        <div className="hidden lg:flex flex-col mt-3">
          <h1 className="font-black text-[#291715] text-[15px] leading-tight tracking-tight">École 221</h1>
          <p className="text-[10px] font-black text-brand-red-deep uppercase tracking-widest mt-0.5">Portail Étudiant</p>
        </div>
        <p className="text-secondary font-label-md text-xs hidden lg:block mt-1">Année Académique 2023-24</p>
      </div>

      <nav className="flex flex-col gap-1 flex-grow">
        {[
          { to: ROUTES.student.dashboard, icon: 'dashboard', label: 'Accueil' },
          { to: ROUTES.student.cours, icon: 'school', label: 'Cours' },
          { to: ROUTES.student.planning, icon: 'calendar_today', label: 'Planning' },
          { to: ROUTES.student.devoirs, icon: 'assignment', label: 'Devoirs' },
          { to: ROUTES.student.notes, icon: 'grade', label: 'Notes' },
        ].map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `flex flex-col lg:flex-row items-center gap-1 lg:gap-3 px-1 lg:px-3 py-2.5 font-label-md text-[10px] lg:text-label-md rounded-lg transition-transform ${isActive ? 'bg-primary-container text-on-primary-container font-black' : 'text-secondary hover:bg-secondary-container/50 hover:translate-x-1 font-semibold'}`}
          >
            <span translate="no" className="material-symbols-outlined text-center text-[22px]">{icon}</span>
            <span className="lg:inline leading-none md:scale-90 lg:scale-100">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-2">
        <button
          onClick={onOpenAiTutor}
          className="w-full flex flex-col lg:flex-row items-center justify-center gap-1 lg:gap-2 py-2.5 lg:py-3 bg-brand-red-deep text-white rounded-lg font-label-md text-[9px] lg:text-label-md active:opacity-80 transition-all hover:bg-[#8F1316] cursor-pointer"
        >
          <span translate="no" className="material-symbols-outlined text-[18px] lg:text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
          <span className="lg:inline leading-none">Tuteur IA</span>
        </button>

        <div className="pt-4 border-t border-neutral-gray-200">
          <button onClick={onOpenSettings} className="w-full flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-1 lg:gap-3 px-1 lg:px-3 py-2 text-secondary hover:bg-secondary-container/50 font-label-md text-[10px] lg:text-label-md rounded-lg cursor-pointer">
            <span translate="no" className="material-symbols-outlined text-[20px]">settings</span>
            <span className="hidden lg:inline">Paramètres</span>
          </button>
          <button
            onClick={() => {
              deconnexion();
              localStorage.removeItem('access_token');
              triggerToast('Déconnexion réussie !');
              setTimeout(() => navigate(ROUTES.login), 800);
            }}
            className="w-full flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-1 lg:gap-3 px-1 lg:px-3 py-2 text-secondary hover:bg-brand-red-light/50 hover:text-brand-red-deep font-label-md text-[10px] lg:text-label-md rounded-lg cursor-pointer"
          >
            <span translate="no" className="material-symbols-outlined text-[20px]">logout</span>
            <span className="hidden lg:inline">Déconnexion</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
