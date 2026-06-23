import React from 'react';

interface CourseFiltersProps {
  selectedStatut: 'tous' | 'en_cours' | 'termine' | 'non_demarre';
  setSelectedStatut: (statut: 'tous' | 'en_cours' | 'termine' | 'non_demarre') => void;
  countEnCours: number;
  countTermine: number;
  countNonDemarre: number;
}

export function CourseFilters({
  selectedStatut,
  setSelectedStatut,
  countEnCours,
  countTermine,
  countNonDemarre,
}: CourseFiltersProps) {
  return (
    <div className="flex gap-2.5 pb-2 overflow-x-auto max-w-full flex-nowrap scroll-smooth snap-x select-none -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
      <button 
        onClick={() => setSelectedStatut('tous')}
        className={`px-5 py-2.5 rounded-full font-bold text-xs transition-all cursor-pointer whitespace-nowrap shrink-0 snap-start ${
          selectedStatut === 'tous' 
            ? 'bg-brand-red-deep text-white shadow-md shadow-brand-red-deep/15 scale-102' 
            : 'bg-neutral-gray-100 hover:bg-neutral-gray-200 text-secondary'
        }`}
      >
        Tous les cours
      </button>
      <button 
        onClick={() => setSelectedStatut('en_cours')}
        className={`px-5 py-2.5 rounded-full font-bold text-xs transition-all cursor-pointer whitespace-nowrap shrink-0 snap-start ${
          selectedStatut === 'en_cours' 
            ? 'bg-brand-red-deep text-white shadow-md shadow-brand-red-deep/15 scale-102' 
            : 'bg-neutral-gray-100 hover:bg-neutral-gray-200 text-secondary'
        }`}
      >
        En cours ({countEnCours})
      </button>
      <button 
        onClick={() => setSelectedStatut('termine')}
        className={`px-5 py-2.5 rounded-full font-bold text-xs transition-all cursor-pointer whitespace-nowrap shrink-0 snap-start ${
          selectedStatut === 'termine' 
            ? 'bg-brand-red-deep text-white shadow-md shadow-brand-red-deep/15 scale-102' 
            : 'bg-neutral-gray-100 hover:bg-neutral-gray-200 text-secondary'
        }`}
      >
        Terminés ({countTermine})
      </button>
      <button 
        onClick={() => setSelectedStatut('non_demarre')}
        className={`px-5 py-2.5 rounded-full font-bold text-xs transition-all cursor-pointer whitespace-nowrap shrink-0 snap-start ${
          selectedStatut === 'non_demarre' 
            ? 'bg-brand-red-deep text-white shadow-md shadow-brand-red-deep/15 scale-102' 
            : 'bg-neutral-gray-100 hover:bg-neutral-gray-200 text-secondary'
        }`}
      >
        Non démarrés ({countNonDemarre})
      </button>
    </div>
  );
}
