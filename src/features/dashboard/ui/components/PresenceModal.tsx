import React from 'react';
import { createPortal } from 'react-dom';
import { StudentQRBadge } from './StudentQRBadge';
import { CameraScanner } from './CameraScanner';

interface PresenceModalProps {
  pointageType: 'arrivée' | 'départ';
  pointageMethod: 'selection' | 'qrcode' | 'camera';
  setPointageMethod: (method: 'selection' | 'qrcode' | 'camera') => void;
  onClose: () => void;
  cameraStream: MediaStream | null;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onRegisterClockIn: (method: string) => void;
  onStartCamera: () => void;
}

export function PresenceModal({
  pointageType, pointageMethod, setPointageMethod,
  onClose, cameraStream, videoRef, onRegisterClockIn, onStartCamera
}: PresenceModalProps) {
  return createPortal(
    <div className="fixed inset-0 z-[250] bg-black/60 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-xs rounded-2xl overflow-hidden shadow-2xl">

        {/* Header rouge */}
        <div className="bg-brand-red-deep px-6 py-5 text-white relative">
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="absolute top-3 right-3 text-white/70 hover:text-white cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
          <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">Présence</p>
          <h3 className="font-black text-lg leading-tight">Pointage</h3>
          <p className="text-xs text-white/80 mt-0.5 capitalize">Enregistrer mon {pointageType}</p>
        </div>

        {/* Sélection */}
        {pointageMethod === 'selection' && (
          <div className="p-5 space-y-3">
            <p className="text-xs text-neutral-500 text-center mb-4">
              Choisissez votre méthode de pointage
            </p>

            {/* Option 1 : Mon badge QR */}
            <button
              onClick={() => setPointageMethod('qrcode')}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-neutral-200 hover:border-brand-red-deep hover:bg-red-50 transition-all cursor-pointer text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#B3181C">
                  <path d="M3 11h2v2H3zm0-4h2v2H3zm4 4h1v2H7zm0-4h1v2H7zM3 15h2v2H3zm4 0h1v2H7zm4-12h2v2h-2zm4 0h2v2h-2zm-4 4h2v2h-2zm4 0h2v2h-2zm-4 4h2v2h-2zm4 0h2v2h-2zm-4 4h2v2h-2zm4 0h2v2h-2zM3 3h6v6H3zm2 2v2h2V5zm8-2h6v6h-6zm2 2v2h2V5zM3 13h6v6H3zm2 2v2h2v-2z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-sm text-neutral-800 group-hover:text-brand-red-deep transition-colors">
                  Mon badge QR Code
                </p>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Le vigile scanne votre badge
                </p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#ccc">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </button>

            {/* Option 2 : Scanner QR salle */}
            <button
              onClick={onStartCamera}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50 transition-all cursor-pointer text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#555">
                  <path d="M12 15.2A3.2 3.2 0 0 1 8.8 12 3.2 3.2 0 0 1 12 8.8 3.2 3.2 0 0 1 15.2 12 3.2 3.2 0 0 1 12 15.2M12 7a5 5 0 0 0-5 5 5 5 0 0 0 5 5 5 5 0 0 0 5-5 5 5 0 0 0-5-5m0-1.8c-3.42 0-6.28 1.98-7.73 4.86A8.98 8.98 0 0 0 3 12c0 1.86.57 3.59 1.54 5.03L3 18.59 4.41 20l1.56-1.54C7.3 19.47 9.57 20 12 20s4.7-.53 6.03-1.54L19.59 20 21 18.59l-1.54-1.56A9 9 0 0 0 21 12c0-4.97-4.03-9-9-9z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-sm text-neutral-800 group-hover:text-neutral-900 transition-colors">
                  Scanner le QR de la salle
                </p>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Scannez le QR Code au tableau
                </p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#ccc">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </button>
          </div>
        )}

        {pointageMethod === 'qrcode' && (
          <StudentQRBadge
            pointageType={pointageType}
            onBack={() => setPointageMethod('selection')}
            onValidate={() => onRegisterClockIn('QR Student Code')}
          />
        )}

        {pointageMethod === 'camera' && (
          <CameraScanner
            cameraStream={cameraStream}
            videoRef={videoRef}
            onCancel={() => { onClose(); setPointageMethod('selection'); }}
          />
        )}
      </div>
    </div>,
    document.body
  );
}
