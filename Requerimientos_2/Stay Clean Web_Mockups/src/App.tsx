import { useState } from 'react';
import GameView from './components/GameView';
import DashboardView from './components/DashboardView';
import CaseView from './components/CaseView';
import EmergencyModal from './components/EmergencyModal';

type View = 'game' | 'dashboard' | 'case';

const VIEWS: { id: View; label: string; icon: string; desc: string }[] = [
  { id: 'game', label: 'Módulo Aprendiz', icon: '🎮', desc: 'Entorno Gamificado' },
  { id: 'dashboard', label: 'Panel Bienestar', icon: '📊', desc: 'Dashboard Psicología' },
  { id: 'case', label: 'Gestión de Caso', icon: '📋', desc: 'CASO-2026-089' },
];

export default function App() {
  const [view, setView] = useState<View>('dashboard');
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="size-full relative overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Active view */}
      <div className="size-full">
        {view === 'game' && <GameView onEmergency={() => setShowModal(true)} />}
        {view === 'dashboard' && <DashboardView onOpenCase={() => setView('case')} />}
        {view === 'case' && <CaseView onBack={() => setView('dashboard')} />}
      </div>

      {/* Emergency modal */}
      {showModal && <EmergencyModal onClose={() => setShowModal(false)} />}

      {/* Prototype navigator — fixed bottom bar */}
      <div
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 p-1 rounded-2xl"
        style={{
          background: 'rgba(0, 18, 30, 0.92)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        {/* Label */}
        <div className="px-3 py-1.5">
          <p className="text-white/30 text-[9px] uppercase tracking-widest whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
            Prototipo
          </p>
        </div>
        <div className="w-px h-6 mx-1" style={{ background: 'rgba(255,255,255,0.1)' }} />

        {VIEWS.map(v => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200"
            style={{
              background: view === v.id ? '#39A900' : 'transparent',
              color: view === v.id ? '#ffffff' : 'rgba(255,255,255,0.55)',
              fontFamily: 'Inter, sans-serif',
            }}
            onMouseEnter={e => {
              if (view !== v.id) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)';
            }}
            onMouseLeave={e => {
              if (view !== v.id) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            }}
          >
            <span className="text-sm">{v.icon}</span>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold leading-none">{v.label}</p>
              <p className="text-[9px] opacity-70 mt-0.5">{v.desc}</p>
            </div>
          </button>
        ))}

        <div className="w-px h-6 mx-1" style={{ background: 'rgba(255,255,255,0.1)' }} />

        {/* Emergency preview button */}
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[#EB5757] text-xs font-semibold transition-all"
          style={{ background: 'rgba(235,87,87,0.15)' }}
          onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(235,87,87,0.25)')}
          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(235,87,87,0.15)')}
        >
          <span className="text-sm">🆘</span>
          <span className="hidden sm:block">Vista 4</span>
        </button>
      </div>
    </div>
  );
}
