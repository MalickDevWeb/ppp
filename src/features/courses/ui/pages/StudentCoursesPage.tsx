import React, { useState } from 'react';
import { CourseHeader } from '../components/CourseHeader';
import { CourseFilters } from '../components/CourseFilters';
import { CourseGrid } from '../components/CourseGrid';

import { CourseDetailModal } from '../components/CourseDetailModal';
import { useCourses } from '@/features/courses/hooks/useCourses';
import { Course } from '@/features/courses/domain/Course';

export function StudentCoursesPage() {
  const { 
    courses, 
    isLoading, 
    error,
    countEnCours, 
    countTermine, 
    countNonDemarre 
  } = useCourses();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatut, setSelectedStatut] = useState<'tous' | 'en_cours' | 'termine' | 'non_demarre'>('tous');
  const [activeDetailCourse, setActiveDetailCourse] = useState<Course | null>(null);
  const [showToast, setShowToast] = useState<string | null>(null);

  const triggerToast = (message: string) => {
    setShowToast(message);
    setTimeout(() => setShowToast(null), 3000);
  };

  // Combined search and status filtering
  const coursFiltrés = courses.filter((cours) => {
    const correspondRecherche = 
      cours.nom.toLowerCase().includes(searchQuery.toLowerCase()) || 
      cours.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cours.professeur.toLowerCase().includes(searchQuery.toLowerCase());

    const correspondStatut = selectedStatut === 'tous' || cours.statut === selectedStatut;

    return correspondRecherche && correspondStatut;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedStatut('tous');
    triggerToast('Filtres réinitialisés');
  };

  if (isLoading) {
    return (
      <div className="flex-1 px-4 md:px-8 py-6 md:py-8 flex items-center justify-center min-h-screen bg-[#FAF8F6]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-brand-red-deep/20 border-t-brand-red-deep rounded-full animate-spin"></div>
          <p className="text-xs font-bold text-secondary">Chargement du catalogue...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 px-4 md:px-8 py-6 md:py-8 flex items-center justify-center min-h-screen bg-[#FAF8F6]">
         <div className="bg-red-50 text-brand-red-deep p-6 rounded-2xl border border-red-100 text-center">
          <span className="material-symbols-outlined text-[32px] mb-2">error</span>
          <h3 className="font-bold">Erreur</h3>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 px-4 md:px-8 py-6 md:py-8 animate-fade-in relative min-h-screen bg-[#FAF8F6]">
      
      {/* Toast notifications */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-gray-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-fade-in border border-white/10">
          <span translate="no" className="material-symbols-outlined text-success-green">check_circle</span>
          <span className="text-xs font-bold">{showToast}</span>
        </div>
      )}

      {/* Modal Detail view */}
      {activeDetailCourse && (
        <CourseDetailModal 
          course={activeDetailCourse as any} // Cast pour garder la compatibilité si le composant utilise un autre type
          onClose={() => setActiveDetailCourse(null)}
          triggerToast={triggerToast}
        />
      )}

      {/* Header section */}
      <CourseHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onResetFilters={handleResetFilters}
      />

      {/* Main Grid content */}
      <div className="space-y-6">
        <CourseFilters 
          selectedStatut={selectedStatut}
          setSelectedStatut={setSelectedStatut}
          countEnCours={countEnCours}
          countTermine={countTermine}
          countNonDemarre={countNonDemarre}
        />

        <CourseGrid 
          coursFiltrés={coursFiltrés as any}
          setActiveDetailCourse={setActiveDetailCourse as any}
        />
      </div>

    </div>
  );
}
