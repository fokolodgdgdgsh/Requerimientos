import { useState } from 'react';

const STARS = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  top: ((i * 17 + 13) % 97) + '%',
  left: ((i * 23 + 7) % 99) + '%',
  size: ((i * 3) % 3) + 1,
  opacity: ((i * 7) % 5) * 0.07 + 0.08,
}));

const SCENARIO = {
  chapter: 3,
  total: 8,
  step: 3,
  totalSteps: 5,
  title: 'La Presión del Grupo',
  setting: 'Centro de Formación SENA · Hora del Descanso',
  narration: 'Son las 2:00 pm. Estás en el área de descanso del programa de ADSO cuando tu compañero Sebastián se acerca y te dice en voz baja:',
  dialogue: '"Ei, un grupo vamos al parque después de clases. Tenemos algo para \'subir el ánimo\' con el estrés del proyecto. Dicen que con eso el estudio rinde más... ¿Vas con nosotros?"',
  speaker: 'Sebastián R.',
  speakerInitials: 'SR',
  speakerColor: '#4A90D9',
  options: [
    {
      id: 'a',
      type: 'healthy' as const,
      label: 'Decisión Saludable',
      icon: '🟢',
      border: '#27AE60',
      bg: 'rgba(39,174,96,0.09)',
      labelColor: '#27AE60',
      text: '"No, gracias Sebastián. Prefiero quedarme a repasar el proyecto. Y si el estrés te agobia, puedo acompañarte a Bienestar — los psicólogos del SENA ayudan un montón."',
      effect: { health: +12, xp: +60 },
      feedback: '¡Muy bien! Reconociste la presión y ofreciste apoyo real. Al mencionar Bienestar Institucional, tu compañero ahora tiene una puerta de acceso a ayuda profesional.',
    },
    {
      id: 'b',
      type: 'neutral' as const,
      label: 'Decisión Neutra',
      icon: '🟡',
      border: '#F2C94C',
      bg: 'rgba(242,201,76,0.09)',
      labelColor: '#D4A017',
      text: '"Mmm... no sé, déjame terminar esto y ya veo. Tal vez en otro momento."',
      effect: { health: 0, xp: +15 },
      feedback: 'Evitaste la situación por ahora. Recuerda que posponer no siempre resuelve. Si sientes presión frecuente de tu grupo, considera hablar con un orientador.',
    },
    {
      id: 'c',
      type: 'risk' as const,
      label: 'Decisión de Riesgo',
      icon: '🔴',
      border: '#EB5757',
      bg: 'rgba(235,87,87,0.09)',
      labelColor: '#EB5757',
      text: '"Bueno... una vez no hace daño, ¿verdad? Igual necesito despejar la cabeza."',
      effect: { health: -22, xp: 0 },
      feedback: 'Esta elección representa un riesgo para tu bienestar. Recuerda: el equipo de Bienestar Institucional está aquí para apoyarte sin juzgarte. No tienes que enfrentar esto solo/a.',
    },
  ],
};

interface GameViewProps {
  onEmergency: () => void;
}

export default function GameView({ onEmergency }: GameViewProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [health, setHealth] = useState(72);
  const [xp, setXp] = useState(320);

  const selectedOption = SCENARIO.options.find(o => o.id === selected);

  function handleSelect(id: string) {
    if (showFeedback) return;
    const opt = SCENARIO.options.find(o => o.id === id)!;
    setSelected(id);
    setHealth(prev => Math.max(0, Math.min(100, prev + opt.effect.health)));
    setXp(prev => prev + opt.effect.xp);
    setShowFeedback(true);
  }

  function handleReset() {
    setSelected(null);
    setShowFeedback(false);
  }

  const healthColor = health >= 70 ? '#27AE60' : health >= 40 ? '#F2C94C' : '#EB5757';
  const healthLabel = health >= 70 ? 'Óptima' : health >= 40 ? 'Moderada' : 'Baja';

  return (
    <div
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #050f1e 0%, #0a1e35 40%, #00324D 100%)' }}
    >
      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {STARS.map(s => (
          <div
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{ top: s.top, left: s.left, width: s.size, height: s.size, opacity: s.opacity }}
          />
        ))}
        {/* Ambient glow */}
        <div
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(57,169,0,0.06) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,50,77,0.15) 0%, transparent 70%)' }}
        />
      </div>

      {/* ── HEADER ── */}
      <header
        className="relative z-10 flex items-center justify-between px-5 py-3.5"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ background: '#39A900', fontFamily: 'Poppins, sans-serif' }}
          >
            SC
          </div>
          <span className="text-white font-bold text-base hidden sm:block" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Stay Clean
          </span>
        </div>

        {/* Chapter progress */}
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-white/50 text-[10px] tracking-wide uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>
            Capítulo {SCENARIO.chapter} de {SCENARIO.total}
          </span>
          <div className="flex gap-1">
            {Array.from({ length: SCENARIO.total }).map((_, i) => (
              <div
                key={i}
                className="h-1 w-5 rounded-full transition-all"
                style={{ backgroundColor: i < SCENARIO.chapter ? '#39A900' : 'rgba(255,255,255,0.15)' }}
              />
            ))}
          </div>
        </div>

        {/* Avatar + Emergency */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #39A900, #27AE60)' }}
            >
              JD
            </div>
            <div className="hidden md:block">
              <p className="text-white text-xs font-semibold leading-none">Juan David</p>
              <p className="text-white/40 text-[10px] mt-0.5">ADSO · Ficha 2890456</p>
            </div>
          </div>

          <button
            onClick={onEmergency}
            className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-[#EB5757] text-xs font-semibold transition-all hover:scale-105 active:scale-95"
            style={{
              background: 'rgba(235,87,87,0.12)',
              border: '1px solid rgba(235,87,87,0.4)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <span className="relative">
              🆘
              <span
                className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#EB5757]"
                style={{ animation: 'pulse-ring 1.8s ease-out infinite' }}
              />
            </span>
            <span className="hidden sm:block">Ayuda Inmediata</span>
          </button>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-6 gap-5">

        {/* Status bar */}
        <div className="w-full max-w-xl flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[180px]">
            <div className="flex justify-between items-center mb-1">
              <span className="text-white/50 text-[10px] uppercase tracking-wide" style={{ fontFamily: 'Inter, sans-serif' }}>
                ❤️ Salud Emocional — {healthLabel}
              </span>
              <span className="text-[10px] font-bold" style={{ color: healthColor }}>{health}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${health}%`, background: `linear-gradient(90deg, ${healthColor}bb, ${healthColor})` }}
              />
            </div>
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[#F2C94C] text-xs font-bold"
            style={{ background: 'rgba(242,201,76,0.12)', border: '1px solid rgba(242,201,76,0.25)' }}
          >
            ⚡ {xp.toLocaleString()} XP
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white/60 text-xs"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            📍 {SCENARIO.step}/{SCENARIO.totalSteps} decisiones
          </div>
        </div>

        {/* Scenario card */}
        <div
          className="w-full max-w-xl rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}
        >
          {/* Scene illustration */}
          <div
            className="relative h-36 flex items-center justify-center"
            style={{ background: 'linear-gradient(180deg, #0d2337 0%, #071624 100%)' }}
          >
            <div className="absolute inset-0 flex items-end overflow-hidden">
              {/* Silhouette buildings */}
              {[
                { left: '5%', w: 60, h: 80 }, { left: '14%', w: 40, h: 100 },
                { left: '24%', w: 70, h: 60 }, { right: '6%', w: 65, h: 85 },
                { right: '16%', w: 45, h: 110 }, { right: '28%', w: 55, h: 70 },
              ].map((b, i) => (
                <div
                  key={i}
                  className="absolute bottom-0 rounded-t-sm"
                  style={{
                    left: b.left, right: b.right,
                    width: b.w, height: b.h,
                    background: 'rgba(0,20,35,0.7)',
                  }}
                />
              ))}
              {/* Ground */}
              <div className="absolute bottom-0 left-0 right-0 h-6" style={{ background: 'rgba(0,10,20,0.8)' }} />
            </div>
            <div className="relative z-10 text-center">
              <div className="text-4xl mb-1.5">🏫</div>
              <span
                className="text-white/55 text-[11px] px-3 py-1 rounded-full"
                style={{ background: 'rgba(0,0,0,0.35)', fontFamily: 'Inter, sans-serif' }}
              >
                {SCENARIO.setting}
              </span>
            </div>
            <div className="absolute top-3 left-4">
              <span
                className="text-[#39A900] text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide"
                style={{ background: 'rgba(57,169,0,0.15)', border: '1px solid rgba(57,169,0,0.3)' }}
              >
                {SCENARIO.title}
              </span>
            </div>
          </div>

          {/* Narration */}
          <div style={{ background: 'rgba(10,25,45,0.9)', backdropFilter: 'blur(8px)', borderTop: '1px solid rgba(255,255,255,0.07)' }} className="px-5 py-4">
            <p className="text-white/60 text-xs italic mb-3 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              {SCENARIO.narration}
            </p>
            <div className="flex gap-3 items-start">
              <div
                className="w-9 h-9 min-w-[2.25rem] rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ background: SCENARIO.speakerColor }}
              >
                {SCENARIO.speakerInitials}
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold mb-1.5" style={{ color: '#39A900', fontFamily: 'Inter, sans-serif' }}>
                  {SCENARIO.speaker}
                </p>
                <p className="text-white/85 text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {SCENARIO.dialogue}
                </p>
              </div>
            </div>
          </div>

          {/* Choices / Feedback */}
          <div
            style={{ background: 'rgba(5,15,30,0.92)', backdropFilter: 'blur(8px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
            className="px-5 py-5"
          >
            {!showFeedback ? (
              <>
                <p className="text-white/35 text-[11px] text-center mb-4 uppercase tracking-widest" style={{ fontFamily: 'Inter, sans-serif' }}>
                  ¿Qué decides hacer?
                </p>
                <div className="flex flex-col gap-2.5">
                  {SCENARIO.options.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(opt.id)}
                      className="text-left px-4 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] group"
                      style={{ border: `1px solid ${opt.border}55`, background: opt.bg }}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="text-sm mt-0.5 shrink-0">{opt.icon}</span>
                        <div>
                          <span
                            className="text-[10px] font-bold block mb-1 uppercase tracking-wide"
                            style={{ color: opt.labelColor, fontFamily: 'Inter, sans-serif' }}
                          >
                            {opt.label}
                          </span>
                          <span className="text-white/75 text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {opt.text}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="animate-fade-in">
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4"
                  style={{
                    background: selectedOption?.type === 'healthy' ? 'rgba(39,174,96,0.15)' : selectedOption?.type === 'neutral' ? 'rgba(242,201,76,0.15)' : 'rgba(235,87,87,0.15)',
                    color: selectedOption?.type === 'healthy' ? '#27AE60' : selectedOption?.type === 'neutral' ? '#D4A017' : '#EB5757',
                  }}
                >
                  {selectedOption?.type === 'healthy' ? '✓ Decisión Saludable' : selectedOption?.type === 'neutral' ? '○ Decisión Neutra' : '⚠ Decisión de Riesgo'}
                  <span className="opacity-70 font-normal ml-1">
                    {selectedOption?.effect.health !== 0 ? `${selectedOption!.effect.health > 0 ? '+' : ''}${selectedOption!.effect.health} salud` : ''}
                    {selectedOption?.effect.xp ? `  +${selectedOption.effect.xp} XP` : ''}
                  </span>
                </div>
                <p className="text-white/75 text-sm leading-relaxed mb-5" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {selectedOption?.feedback}
                </p>
                {selectedOption?.type === 'risk' && (
                  <button
                    onClick={onEmergency}
                    className="w-full flex items-center justify-center gap-2 mb-3 py-3 rounded-xl text-[#EB5757] text-sm font-semibold transition-all hover:scale-[1.01]"
                    style={{ background: 'rgba(235,87,87,0.12)', border: '1px solid rgba(235,87,87,0.35)' }}
                  >
                    🆘 Hablar con un psicólogo ahora
                  </button>
                )}
                <button
                  onClick={handleReset}
                  className="w-full py-3 rounded-xl text-white text-sm font-semibold transition-all hover:scale-[1.01] active:scale-[0.99]"
                  style={{ background: '#39A900' }}
                >
                  Siguiente situación →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer hint */}
        <div className="flex items-center gap-4 text-white/25 text-[10px]" style={{ fontFamily: 'Inter, sans-serif' }}>
          <span>Módulo 3 · Riesgos Psicosociales</span>
          <span>·</span>
          <span>Datos protegidos por Ley 1581 de 2012</span>
        </div>
      </main>
    </div>
  );
}
