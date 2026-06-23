import React from 'react';

interface GradesHeaderProps {
  onDownload?: () => void;
}

export function GradesHeader({ onDownload }: GradesHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 select-none">
      <div>
        <h1 className="font-headline-lg text-[28px] md:text-[32px] text-on-surface font-black tracking-tight text-[#291715]">Résultats Académiques</h1>
        <p className="text-secondary font-body-md text-body-md mt-1 font-medium">Semestre 2 — Ingénierie Logicielle & Innovation</p>
      </div>
      <button 
        onClick={onDownload}
        className="flex items-center gap-2 bg-[#B3181C] text-white px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider hover:bg-[#8c1215] transition-all active:scale-95 shadow-sm cursor-pointer border border-[#B3181C]/20"
      >
        <span translate="no" className="material-symbols-outlined text-sm">download</span>
        Télécharger le relevé officiel
      </button>
    </div>
  );
}
