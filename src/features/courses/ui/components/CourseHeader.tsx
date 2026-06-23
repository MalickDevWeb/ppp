import React from 'react';

interface CourseHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onResetFilters: () => void;
}

export function CourseHeader({ searchQuery, setSearchQuery, onResetFilters }: CourseHeaderProps) {
  return (
    <div className="w-full mb-8 space-y-6">
      {/* Title & subtitle taking full width */}
      <div className="w-full border-b border-neutral-gray-200/50 pb-5">
        <h1 className="font-headline-lg text-3xl md:text-4xl text-on-surface mb-2 font-black tracking-tight">
          Catalogue des Cours
        </h1>
        <p className="text-sm md:text-base text-neutral-gray-500 font-medium">
          Gérez votre parcours académique et explorez de nouvelles spécialités.
        </p>
      </div>
      
      {/* Search, Filter action blocks below taking elegant styling */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
        <div className="relative w-full md:max-w-md">
          <span translate="no" className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-gray-400 text-[20px]">
            search
          </span>
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 bg-white border border-neutral-gray-200 rounded-2xl focus:outline-none focus:border-brand-red-deep transition-all text-sm font-semibold shadow-2xs hover:border-neutral-gray-300" 
            placeholder="Rechercher par titre, professeur..." 
            type="text" 
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-gray-400 hover:text-neutral-gray-600 cursor-pointer"
            >
              <span translate="no" className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>
        <button 
          onClick={onResetFilters}
          className="flex items-center gap-1.5 px-5 py-3 h-12 border border-neutral-gray-200 rounded-2xl bg-white hover:bg-neutral-50 hover:border-neutral-300 transition-all text-xs font-bold whitespace-nowrap text-secondary shrink-0 w-full md:w-auto justify-center cursor-pointer shadow-2xs"
        >
          <span translate="no" className="material-symbols-outlined text-[16px]">restart_alt</span>
          Réinitialiser le catalogue
        </button>
      </div>
    </div>
  );
}
