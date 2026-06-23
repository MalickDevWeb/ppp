import React from 'react';
import { createPortal } from 'react-dom';
import { CoursItem } from './types';

interface CourseDetailModalProps {
  course: CoursItem;
  onClose: () => void;
  triggerToast: (msg: string) => void;
}

export function CourseDetailModal({ course, onClose, triggerToast }: CourseDetailModalProps) {
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-neutral-gray-200/50 flex flex-col animate-scale-up">
        {/* Modal Image & Header Overlay */}
        <div className="relative h-48 w-full bg-neutral-gray-300">
          <img className="w-full h-full object-cover" src={course.image} alt={course.nom} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-black/30 bg-black/15 p-2 rounded-full transition-all cursor-pointer"
          >
            <span translate="no" className="material-symbols-outlined text-[18px]">close</span>
          </button>

          <div className="absolute bottom-4 left-5 right-5 text-white">
            <span className="px-2.5 py-0.5 rounded-full bg-[#E3A857] text-[#291715] text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">
              {course.categorie}
            </span>
            <h4 className="text-xl md:text-2xl font-black leading-tight drop-shadow-sm">{course.nom}</h4>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[340px]">
          <p className="text-sm text-neutral-gray-600 font-medium leading-relaxed bg-neutral-gray-50 p-4 rounded-2xl border border-neutral-gray-100">
            {course.description}
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#FFF8F7] flex items-center justify-center text-brand-red-deep">
                <span translate="no" className="material-symbols-outlined text-[20px]">person</span>
              </div>
              <div>
                <h5 className="font-bold text-secondary text-[10px] uppercase tracking-wider">Professeur</h5>
                <p className="text-xs font-bold text-on-surface truncate">{course.professeur}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#FFF8F7] flex items-center justify-center text-brand-red-deep">
                <span translate="no" className="material-symbols-outlined text-[20px]">location_on</span>
              </div>
              <div>
                <h5 className="font-bold text-secondary text-[10px] uppercase tracking-wider">Salle</h5>
                <p className="text-xs font-bold text-on-surface">{course.salle}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#FFF8F7] flex items-center justify-center text-brand-red-deep">
                <span translate="no" className="material-symbols-outlined text-[20px]">timelapse</span>
              </div>
              <div>
                <h5 className="font-bold text-secondary text-[10px] uppercase tracking-wider">Volume Horaire</h5>
                <p className="text-xs font-bold text-on-surface">{course.volumeHoraire}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#FFF8F7] flex items-center justify-center text-brand-red-deep">
                <span translate="no" className="material-symbols-outlined text-[20px]">auto_stories</span>
              </div>
              <div>
                <h5 className="font-bold text-secondary text-[10px] uppercase tracking-wider">État</h5>
                <p className="text-xs font-bold text-on-surface capitalize">
                  {course.statut === 'en_cours' ? '🔴 En cours' : course.statut === 'termine' ? '🟢 Terminé' : '⚪ Non démarré'}
                </p>
              </div>
            </div>
          </div>

          {course.progression > 0 && (
            <div className="pt-3 border-t border-neutral-gray-100">
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-secondary">Progression Globale</span>
                <span className="text-brand-red-deep">{course.progression}%</span>
              </div>
              <div className="w-full h-2.5 bg-neutral-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-brand-red-deep rounded-full duration-500 transition-all" style={{ width: `${course.progression}%` }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Mobile Touch Friendly Buttons */}
        <div className="p-5 bg-surface-container-low border-t border-neutral-gray-200/50 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-3.5 text-center border border-neutral-gray-300 rounded-xl font-bold text-label-md text-secondary hover:bg-surface hover:text-[#291715] transition-all cursor-pointer"
          >
            Fermer
          </button>
          
          {course.statut === 'termine' ? (
            <button 
              onClick={() => {
                triggerToast("Téléchargement du certificat d'accomplissement...");
                onClose();
              }}
              className="flex-1 py-3.5 text-center bg-success-green text-white rounded-xl font-bold text-label-md hover:opacity-95 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-success-green/10 cursor-pointer"
            >
              <span translate="no" className="material-symbols-outlined text-[16px]">verified</span>
              Télécharger Certificat
            </button>
          ) : course.statut === 'non_demarre' ? (
            <button 
              onClick={() => {
                triggerToast(`Confirmation d'inscription validée! Bienvenue.`);
                onClose();
              }}
              className="flex-1 py-3.5 text-center bg-brand-red-deep text-white rounded-xl font-bold text-label-md hover:opacity-95 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-brand-red-deep/10 cursor-pointer"
            >
              <span translate="no" className="material-symbols-outlined text-[16px]">assignment_turned_in</span>
              S'inscrire au cours
            </button>
          ) : (
            <button 
              onClick={() => {
                triggerToast(`Ouverture de la salle virtuelle et des supports de cours.`);
                onClose();
              }}
              className="flex-1 py-3.5 text-center bg-brand-red-deep text-white rounded-xl font-bold text-label-md hover:opacity-95 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#B3181C]/15 cursor-pointer"
            >
              <span translate="no" className="material-symbols-outlined text-[16px]">school</span>
              Rejoindre le cours
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
