import { useState } from 'react';

const GAME_DECISIONS = [
  { chapter: 1, title: 'Primera Semana', outcome: 'healthy', text: 'Rechazó participar en actividades de riesgo' },
  { chapter: 2, title: 'Adaptación Social', outcome: 'neutral', text: 'Evadió la situación sin buscar ayuda' },
  { chapter: 3, title: 'La Presión del Grupo', outcome: 'risk', text: 'Aceptó unirse al grupo de riesgo' },
];

const TIMELINE = [
  {
    id: 1,
    date: '15 Ago 2026',
    time: '10:30 AM',
    type: 'Presencial',
    pro: 'María González · Psicóloga',
    obs: 'Aprendiz presenta signos de ansiedad social moderada. Reporta presión constante de pares para consumo. Buen nivel de conciencia sobre el riesgo. Se estableció rapport positivo y se inició proceso de orientación.',
    plan: 'Sesiones semanales de orientación. Asignación de técnicas de regulación emocional (respiración 4-7-8). Vinculación a grupo de apoyo entre pares.',
    next: '22 Ago 2026',
  },
  {
    id: 2,
    date: '17 Ago 2026',
    time: '2:00 PM',
    type: 'Virtual',
    pro: 'María González · Psicóloga',
    obs: 'Aprendiz muestra buena disposición. Practicó técnicas asignadas. Refiere que la situación con el grupo de compañeros persiste. Identifica dos compañeros de riesgo que también podrían beneficiarse de orientación.',
    plan: 'Continuar trabajo en asertividad. Coordinación con instructor de ficha para acompañamiento contextual.',
    next: '22 Ago 2026',
  },
];

interface CaseViewProps {
  onBack: () => void;
}

export default function CaseView({ onBack }: CaseViewProps) {
  const [noteText, setNoteText] = useState('');
  const [noteType, setNoteType] = useState('Presencial');
  const [noteDate, setNoteDate] = useState('2026-08-22');
  const [notePlan, setNotePlan] = useState('');
  const [nextAppt, setNextAppt] = useState('2026-08-29');
  const [saved, setSaved] = useState(false);

  function handleSave() {
    if (!noteText.trim()) return;
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    setNoteText('');
    setNotePlan('');
  }

  const outcomeColor = (o: string) =>
    o === 'healthy' ? '#27AE60' : o === 'neutral' ? '#D4A017' : '#EB5757';
  const outcomeLabel = (o: string) =>
    o === 'healthy' ? '✓ Saludable' : o === 'neutral' ? '○ Neutra' : '⚠ Riesgo';

  return (
    <div className="min-h-screen flex flex-col overflow-hidden" style={{ background: '#F8F9FA', fontFamily: 'Inter, sans-serif' }}>

      {/* ── CASE HEADER ── */}
      <header
        className="flex-shrink-0 bg-white px-6 py-4 flex items-start justify-between gap-4 flex-wrap"
        style={{ borderBottom: '1px solid #E8ECF0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
      >
        <div className="flex items-start gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-[#64748b] text-sm font-medium hover:text-[#00324D] transition-colors mt-0.5"
          >
            ← Volver
          </button>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-[#00324D] text-lg font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                CASO-2026-089
              </h1>
              <span
                className="px-3 py-1 rounded-full text-xs font-bold text-white"
                style={{ background: '#F2C94C', color: '#7a5c00' }}
              >
                EN PROCESO
              </span>
            </div>
            <p className="text-[#94a3b8] text-xs mt-1">
              Abierto el 15 Ago 2026 · Última actualización: 17 Ago 2026 · Responsable: María González
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="px-4 py-2 rounded-lg text-xs font-semibold text-[#64748b] hover:bg-[#F1F5F9] transition-colors"
            style={{ border: '1px solid #E8ECF0' }}
          >
            Exportar PDF
          </button>
          <button
            className="px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:scale-105"
            style={{ background: '#39A900' }}
          >
            Cerrar Caso
          </button>
        </div>
      </header>

      {/* ── BODY ── */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* LEFT PANEL — Risk profile */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* Anonymized profile */}
            <div
              className="bg-white rounded-xl p-5"
              style={{ border: '1px solid #E8ECF0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-base"
                  style={{ background: 'linear-gradient(135deg, #EB5757, #c0392b)', fontFamily: 'Poppins, sans-serif' }}
                >
                  AMV
                </div>
                <div>
                  <p className="text-[#00324D] font-bold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Aprendiz A.M.V.
                  </p>
                  <p className="text-[#94a3b8] text-xs">Identidad restringida · Nivel Acceso 2</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Programa', value: 'ADSO' },
                  { label: 'Ficha', value: '2890456' },
                  { label: 'Semestre', value: '1° Trimestre' },
                  { label: 'Edad', value: '18 años' },
                  { label: 'Instructor', value: 'Diego Ramírez' },
                  { label: 'Tutor SENA', value: 'Carlos Pineda' },
                ].map(item => (
                  <div key={item.label}>
                    <p className="text-[#94a3b8] text-[10px] uppercase tracking-wide">{item.label}</p>
                    <p className="text-[#1e293b] text-xs font-semibold mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk score */}
            <div
              className="bg-white rounded-xl p-5"
              style={{ border: '1px solid #E8ECF0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
            >
              <h3 className="text-[#00324D] text-sm font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Perfil de Riesgo
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-20 h-20 shrink-0">
                  <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                    <circle cx="40" cy="40" r="32" fill="none" stroke="#F1F5F9" strokeWidth="8" />
                    <circle
                      cx="40" cy="40" r="32" fill="none"
                      stroke="#EB5757" strokeWidth="8"
                      strokeDasharray={`${(87 / 100) * 201} 201`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold text-[#EB5757]" style={{ fontFamily: 'Poppins, sans-serif' }}>87</span>
                    <span className="text-[#94a3b8] text-[8px]">/100</span>
                  </div>
                </div>
                <div>
                  <span
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-white mb-1"
                    style={{ background: '#EB5757' }}
                  >
                    🔴 Riesgo Alto
                  </span>
                  <p className="text-[#64748b] text-xs leading-relaxed">
                    Score basado en decisiones del módulo gamificado y factores contextuales detectados.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2.5">
                {[
                  { factor: 'Presión Social', val: 90 },
                  { factor: 'Estrés Académico', val: 75 },
                  { factor: 'Soporte Familiar', val: 55 },
                  { factor: 'Habilidades de Afrontamiento', val: 40 },
                ].map(f => (
                  <div key={f.factor}>
                    <div className="flex justify-between mb-1">
                      <span className="text-[#64748b] text-[11px]">{f.factor}</span>
                      <span className="text-[11px] font-semibold" style={{ color: f.val >= 70 ? '#EB5757' : f.val >= 50 ? '#D4A017' : '#27AE60' }}>
                        {f.val}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#F1F5F9' }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: f.val + '%',
                          background: f.val >= 70 ? '#EB5757' : f.val >= 50 ? '#F2C94C' : '#27AE60',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Game session summary */}
            <div
              className="bg-white rounded-xl p-5"
              style={{ border: '1px solid #E8ECF0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
            >
              <h3 className="text-[#00324D] text-sm font-bold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Sesión Gamificada
              </h3>
              <p className="text-[#94a3b8] text-[11px] mb-3">Stay Clean · Salud Emocional final: 45% · 19 Ago 2026</p>
              <div className="flex flex-col gap-2.5">
                {GAME_DECISIONS.map(d => (
                  <div
                    key={d.chapter}
                    className="flex items-start gap-3 p-3 rounded-lg"
                    style={{ background: '#F8FAFC', border: '1px solid #F1F5F9' }}
                  >
                    <div
                      className="w-6 h-6 min-w-[1.5rem] rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                      style={{ background: outcomeColor(d.outcome) }}
                    >
                      {d.chapter}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#1e293b] text-xs font-semibold">{d.title}</p>
                      <p className="text-[#64748b] text-[11px] mt-0.5">{d.text}</p>
                    </div>
                    <span
                      className="text-[10px] font-semibold shrink-0"
                      style={{ color: outcomeColor(d.outcome) }}
                    >
                      {outcomeLabel(d.outcome)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL — Intervention log */}
          <div className="lg:col-span-3 flex flex-col gap-4">

            {/* New note form */}
            <div
              className="bg-white rounded-xl p-5"
              style={{ border: '1px solid #E8ECF0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
            >
              <h3 className="text-[#00324D] text-sm font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                + Nueva Nota de Intervención
              </h3>
              <div className="grid grid-cols-3 gap-3 mb-3">
                <div>
                  <label className="text-[#64748b] text-[10px] uppercase tracking-wide block mb-1">Fecha</label>
                  <input
                    type="date"
                    value={noteDate}
                    onChange={e => setNoteDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-xs outline-none"
                    style={{ border: '1px solid #E8ECF0', background: '#F8FAFC', color: '#1e293b' }}
                  />
                </div>
                <div>
                  <label className="text-[#64748b] text-[10px] uppercase tracking-wide block mb-1">Tipo de Atención</label>
                  <select
                    value={noteType}
                    onChange={e => setNoteType(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-xs outline-none"
                    style={{ border: '1px solid #E8ECF0', background: '#F8FAFC', color: '#1e293b' }}
                  >
                    <option>Presencial</option>
                    <option>Virtual</option>
                    <option>Telefónica</option>
                    <option>Grupal</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#64748b] text-[10px] uppercase tracking-wide block mb-1">Próxima Cita</label>
                  <input
                    type="date"
                    value={nextAppt}
                    onChange={e => setNextAppt(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-xs outline-none"
                    style={{ border: '1px solid #E8ECF0', background: '#F8FAFC', color: '#1e293b' }}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="text-[#64748b] text-[10px] uppercase tracking-wide block mb-1">Observaciones de la Sesión</label>
                <textarea
                  value={noteText}
                  onChange={e => setNoteText(e.target.value)}
                  rows={3}
                  placeholder="Describe el desarrollo de la sesión, actitud del aprendiz, temas abordados..."
                  className="w-full px-3 py-2.5 rounded-lg text-xs outline-none resize-none"
                  style={{ border: '1px solid #E8ECF0', background: '#F8FAFC', color: '#1e293b', fontFamily: 'Inter, sans-serif' }}
                />
              </div>
              <div className="mb-4">
                <label className="text-[#64748b] text-[10px] uppercase tracking-wide block mb-1">Plan de Acción</label>
                <textarea
                  value={notePlan}
                  onChange={e => setNotePlan(e.target.value)}
                  rows={2}
                  placeholder="Acuerdos, compromisos, actividades asignadas, derivaciones..."
                  className="w-full px-3 py-2.5 rounded-lg text-xs outline-none resize-none"
                  style={{ border: '1px solid #E8ECF0', background: '#F8FAFC', color: '#1e293b', fontFamily: 'Inter, sans-serif' }}
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[#94a3b8] text-[10px]">
                  🔒 Nota firmada digitalmente por: María González · Psicóloga SENA
                </p>
                <button
                  onClick={handleSave}
                  className="px-5 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                  style={{ background: saved ? '#27AE60' : '#39A900' }}
                >
                  {saved ? '✓ Guardado' : 'Guardar Nota'}
                </button>
              </div>
            </div>

            {/* Timeline */}
            <div
              className="bg-white rounded-xl p-5"
              style={{ border: '1px solid #E8ECF0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
            >
              <h3 className="text-[#00324D] text-sm font-bold mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Historial de Intervención
              </h3>

              <div className="relative">
                {/* Vertical line */}
                <div
                  className="absolute left-[1.15rem] top-3 bottom-0 w-px"
                  style={{ background: 'linear-gradient(to bottom, #39A900, #E8ECF0)' }}
                />

                <div className="flex flex-col gap-6">
                  {TIMELINE.map((entry, i) => (
                    <div key={entry.id} className="flex gap-4">
                      {/* Dot */}
                      <div
                        className="w-6 h-6 min-w-[1.5rem] rounded-full flex items-center justify-center text-white text-[10px] font-bold z-10 mt-1"
                        style={{ background: '#39A900' }}
                      >
                        {TIMELINE.length - i}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-2">
                        <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[#1e293b] text-xs font-bold">{entry.date}</span>
                              <span className="text-[#94a3b8] text-[10px]">{entry.time}</span>
                              <span
                                className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                                style={{
                                  background: entry.type === 'Presencial' ? 'rgba(0,50,77,0.08)' : 'rgba(57,169,0,0.08)',
                                  color: entry.type === 'Presencial' ? '#00324D' : '#2d8500',
                                }}
                              >
                                {entry.type === 'Presencial' ? '🏢' : '💻'} {entry.type}
                              </span>
                            </div>
                            <p className="text-[#94a3b8] text-[10px] mt-0.5">{entry.pro}</p>
                          </div>
                        </div>

                        <div
                          className="p-3.5 rounded-xl"
                          style={{ background: '#F8FAFC', border: '1px solid #F1F5F9' }}
                        >
                          <div className="mb-3">
                            <p className="text-[#64748b] text-[10px] font-semibold uppercase tracking-wide mb-1">Observaciones</p>
                            <p className="text-[#1e293b] text-xs leading-relaxed">{entry.obs}</p>
                          </div>
                          <div className="mb-2">
                            <p className="text-[#64748b] text-[10px] font-semibold uppercase tracking-wide mb-1">Plan de Acción</p>
                            <p className="text-[#1e293b] text-xs leading-relaxed">{entry.plan}</p>
                          </div>
                          <div className="flex items-center gap-2 pt-2" style={{ borderTop: '1px solid #E8ECF0' }}>
                            <span className="text-[#94a3b8] text-[10px]">📅 Próxima cita:</span>
                            <span className="text-[#39A900] text-[10px] font-semibold">{entry.next}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
