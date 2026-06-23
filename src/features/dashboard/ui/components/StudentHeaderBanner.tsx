import React from 'react';

interface StudentHeaderBannerProps {
  attendancesCount: number;
  onPointer: (type: 'arrivée' | 'départ') => void;
}

export function StudentHeaderBanner({ attendancesCount, onPointer }: StudentHeaderBannerProps) {
  const currentHour = new Date().getHours();
  const welcomeMessage = currentHour >= 18 ? "Bonsoir, Abdoulaye !" : currentHour >= 12 ? "Bon après-midi, Abdoulaye !" : "Bonjour, Abdoulaye !";

  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 className="font-headline-lg text-headline-lg font-black text-on-surface tracking-tight">{welcomeMessage}</h2>
        <p className="text-xs md:text-sm font-semibold text-secondary">
          Bienvenue dans votre espace d'apprentissage en temps réel de <span className="text-brand-red-deep font-bold block sm:inline">l'École 221</span>.
          {attendancesCount > 0 && (
            <span className="block mt-1 font-mono text-[10px] text-[#B3181C] font-black">
              ● {attendancesCount} {attendancesCount === 1 ? 'pointage enregistré' : 'pointages enregistrés'} cette session
            </span>
          )}
        </p>
      </div>
      
      <div className="flex gap-2">
        <button 
          onClick={() => onPointer('arrivée')}
          className="bg-brand-red-deep text-white px-3.5 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-brand-red-deep/15 flex items-center gap-1.5 hover:opacity-95 cursor-pointer"
        >
          <span translate="no" className="material-symbols-outlined text-sm font-bold">qr_code_scanner</span>
          Pointer Arrivée
        </button>
        <button 
          onClick={() => onPointer('départ')}
          className="bg-black text-white px-3.5 py-2.5 rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 hover:bg-neutral-950 cursor-pointer border border-neutral-900"
        >
          <span translate="no" className="material-symbols-outlined text-sm font-bold">logout</span>
          Départ
        </button>
      </div>
    </div>
  );
}
