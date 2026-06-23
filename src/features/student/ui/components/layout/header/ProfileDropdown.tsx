import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants';
import { useAuthStore } from '@/core/store/authStore';

interface Props {
  showProfile: boolean; setShowProfile: (v: boolean) => void;
  setShowNotifications: (v: boolean) => void;
  setShowCalendar: (v: boolean) => void;
  studentMood: string; tempMood: string; setTempMood: (v: string) => void;
  isEditingMood: boolean; setIsEditingMood: (v: boolean) => void;
  onOpenSettings: () => void;
  onOpenSupport: () => void;
  triggerToast: (msg: string) => void;
  onMoodSave: () => void;
  profileRef: React.RefObject<HTMLDivElement | null>;
}

export function ProfileDropdown({
  showProfile, setShowProfile, setShowNotifications, setShowCalendar,
  studentMood, tempMood, setTempMood, isEditingMood, setIsEditingMood,
  onOpenSettings, onOpenSupport, triggerToast, onMoodSave, profileRef
}: Props) {
  const navigate = useNavigate();
  const { deconnexion } = useAuthStore();

  return (
    <div className="relative" ref={profileRef}>
      <div onClick={() => { setShowProfile(!showProfile); setShowCalendar(false); setShowNotifications(false); }} className="flex items-center gap-2.5 cursor-pointer py-1.5 pl-1.5 pr-2.5 rounded-2xl hover:bg-neutral-gray-50 transition-all select-none group">
        <div className="relative shrink-0 transition-transform duration-300 group-hover:scale-105">
          <div className="h-8.5 w-8.5 rounded-xl bg-brand-red-deep text-white font-heavy flex items-center justify-center overflow-hidden shadow-sm ring-2 ring-brand-red-light">
            <div className="w-full h-full bg-brand-red-deep text-white flex items-center justify-center font-black text-xs select-none">AD</div>
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 block h-2.5 w-2.5 rounded-full bg-[#10B981] ring-2 ring-white animate-pulse z-10" />
        </div>
        <div className="hidden md:flex flex-col text-left">
          <span className="text-xs font-black text-[#291715] leading-tight max-w-[100px] truncate group-hover:text-brand-red-deep transition-colors">Abdoulaye D.</span>
          <span className="text-[9px] font-heavy text-success-green tracking-wide flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />L1 GL • En Ligne</span>
        </div>
      </div>
      {showProfile && (
        <div className="fixed top-16 left-4 right-4 sm:absolute sm:top-full sm:left-auto sm:right-0 mt-2 w-[calc(100vw-32px)] sm:w-80 bg-white border border-neutral-gray-200 rounded-3xl shadow-xl z-[200] overflow-hidden animate-slide-up">
          <div className="p-5 text-center bg-gradient-to-br from-brand-red-deep to-[#7a1012] text-white">
            <div className="w-14 h-14 rounded-2xl overflow-hidden mx-auto shadow-md border-2 border-white/20 mb-3">
              <div className="w-full h-full bg-white/20 text-white flex items-center justify-center font-black text-base select-none">AD</div>
            </div>
            <h4 className="font-bold text-sm">Abdoulaye Diallo</h4>
            <p className="text-[10px] text-white/80 font-semibold mt-0.5">Matricule : #221-M382 • Master 1 GL</p>
            <span className="inline-block mt-2 px-2.5 py-0.5 bg-white/20 rounded-full text-[8.5px] font-black uppercase tracking-wider text-white">Promotion 221-GL</span>
          </div>
          <div className="p-4 space-y-4">
            <div className="space-y-1.5">
              <span className="text-[9px] font-black uppercase tracking-wider text-neutral-gray-400">Statut / Humeur</span>
              {isEditingMood ? (
                <div className="flex gap-1.5 items-center">
                  <input type="text" value={tempMood} onChange={(e) => setTempMood(e.target.value)} className="flex-grow text-xs border border-neutral-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:border-brand-red-deep bg-neutral-gray-50" placeholder="Que faites-vous ?" />
                  <button onClick={onMoodSave} className="bg-brand-red-deep text-white px-2 py-1 rounded-lg text-xs font-bold">OK</button>
                </div>
              ) : (
                <div onClick={() => setIsEditingMood(true)} className="bg-neutral-gray-50 hover:bg-brand-red-light/30 border border-neutral-gray-150 p-2.5 rounded-xl cursor-all-scroll text-xs text-secondary italic flex items-center justify-between">
                  <span>{studentMood}</span>
                  <span className="material-symbols-outlined text-xs text-neutral-gray-400">edit</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button onClick={() => { setShowProfile(false); onOpenSettings(); }} className="p-2.5 border border-neutral-gray-200 rounded-xl font-bold text-xs text-[#291715] hover:bg-neutral-gray-50 flex flex-col items-center gap-1 cursor-pointer">
                <span className="material-symbols-outlined text-brand-red-deep text-[18px]">settings</span>Options
              </button>
              <button onClick={() => { setShowProfile(false); onOpenSupport(); }} className="p-2.5 border border-neutral-gray-200 rounded-xl font-bold text-xs text-[#291715] hover:bg-neutral-gray-50 flex flex-col items-center gap-1 cursor-pointer">
                <span className="material-symbols-outlined text-brand-red-deep text-[18px]">support_agent</span>Support
              </button>
            </div>
            <div className="pt-2 border-t border-neutral-gray-100 space-y-1.5 text-[11px] text-secondary font-medium">
              <div className="flex justify-between"><span>Faculté :</span><span className="font-bold text-[#291715]">Sciences & Technologies</span></div>
              <div className="flex justify-between"><span>Moyenne Générale :</span><span className="font-bold text-brand-red-deep text-xs font-black">16.69 / 20</span></div>
              <div className="flex justify-between"><span>Inscriptions :</span><span className="text-success-green font-bold">🟢 Validé S1 & S2</span></div>
            </div>
            <button onClick={() => { setShowProfile(false); deconnexion(); localStorage.removeItem('access_token'); triggerToast('Déconnexion réussie'); setTimeout(() => navigate(ROUTES.login), 800); }} className="w-full py-2 bg-neutral-gray-100 hover:bg-brand-red-light hover:text-brand-red-deep font-bold text-xs text-secondary rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer">
              <span className="material-symbols-outlined text-[16px]">logout</span>Fermer la session
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
