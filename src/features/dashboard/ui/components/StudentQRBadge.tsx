import React from 'react';

interface StudentQRBadgeProps {
  pointageType: 'arrivée' | 'départ';
  onBack: () => void;
  onValidate: () => void;
}

export function StudentQRBadge({ pointageType, onBack, onValidate }: StudentQRBadgeProps) {
  return (
    <div className="p-6 text-center space-y-4">
      <p className="text-xs text-secondary leading-relaxed font-semibold">
        Présentez ce code de sécurité devant le guichet de pointage de votre professeur pour enregistrer votre {pointageType}.
      </p>

      <div className="bg-brand-red-light/40 border border-[#B3181C]/15 rounded-2xl p-4 relative overflow-hidden flex flex-col items-center">
        <div className="w-full flex justify-between items-center text-left border-b border-[#B3181C]/10 pb-2 mb-3">
          <div>
            <h5 className="text-[8px] font-black text-brand-red-deep uppercase">ÉCOLE 221 - SÉNÉGAL</h5>
            <p className="text-[9px] font-black text-secondary leading-none">Abdoulaye Diallo</p>
          </div>
          <span className="text-[7.5px] bg-[#E3A857]/20 text-[#291715] px-1.5 py-0.5 rounded font-black">MASTER 1 GL</span>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-neutral-gray-200/50 shadow-inner inline-block relative">
          <div className="w-32 h-32 relative flex flex-wrap p-1.5 justify-between">
            <div className="w-8 h-8 border-4 border-neutral-gray-900 rounded bg-[#291715]/15"></div>
            <div className="w-3 h-3 bg-neutral-900"></div>
            <div className="w-8 h-8 border-4 border-neutral-gray-900 rounded bg-[#291715]/15"></div>
            <div className="w-6 h-6 bg-neutral-900 flex items-center justify-center text-[7px] font-black text-[#E3A857]">221</div>
            <div className="w-10 h-10 border-4 border-brand-red-deep rounded p-0.5"><div className="w-full h-full bg-brand-red-deep"></div></div>
            <div className="w-8 h-8 border-4 border-neutral-gray-900 rounded bg-[#291715]/15"></div>
          </div>
          <div className="absolute left-0 right-0 h-0.5 bg-brand-red-deep animate-pulse shadow top-1/2"></div>
        </div>

        <p className="mt-2.5 font-mono text-[9px] text-neutral-400 font-bold">MATRICULE : 221-M382-M1GL</p>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={onBack}
          className="flex-grow py-2.5 bg-neutral-100 hover:bg-neutral-200 rounded-xl text-neutral-700 font-bold text-xs cursor-pointer"
        >
          Retour
        </button>
        <button 
          onClick={onValidate}
          className="flex-grow py-2.5 bg-brand-red-deep hover:bg-brand-red-deep/90 text-white rounded-xl font-black text-xs cursor-pointer shadow-md"
        >
          Simuler Validation Borne
        </button>
      </div>
    </div>
  );
}
