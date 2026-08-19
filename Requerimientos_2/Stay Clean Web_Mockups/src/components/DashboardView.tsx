import { useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';

const RISK_DIST = [
  { name: 'Riesgo Bajo', value: 143, color: '#27AE60', pct: '58%' },
  { name: 'Riesgo Medio', value: 67, color: '#F2C94C', pct: '27%' },
  { name: 'Riesgo Alto', value: 37, color: '#EB5757', pct: '15%' },
];

const PROGRAM_DATA = [
  { name: 'ADSO', alertas: 14 },
  { name: 'Contabilidad', alertas: 11 },
  { name: 'Mecatrónica', alertas: 9 },
  { name: 'Salud Pública', alertas: 7 },
  { name: 'Logística', alertas: 5 },
];

const ALERTS = [
  { id: 'A001', name: 'Valentina M.', ficha: '2890456 · ADSO', risk: 'alto', score: 87, time: '08/19 09:42', status: 'Pendiente' },
  { id: 'A002', name: 'Carlos A.', ficha: '2876123 · Contabilidad', risk: 'alto', score: 81, time: '08/19 09:15', status: 'En Atención' },
  { id: 'A003', name: 'Mariana T.', ficha: '2901234 · Mecatrónica', risk: 'medio', score: 64, time: '08/19 08:55', status: 'Pendiente' },
  { id: 'A004', name: 'Santiago R.', ficha: '2845678 · Salud Pública', risk: 'medio', score: 58, time: '08/18 17:30', status: 'Pendiente' },
  { id: 'A005', name: 'Luisa F.', ficha: '2890456 · ADSO', risk: 'bajo', score: 34, time: '08/18 16:15', status: 'En Atención' },
  { id: 'A006', name: 'Andrés P.', ficha: '2912345 · Logística', risk: 'alto', score: 79, time: '08/18 14:00', status: 'Pendiente' },
];

const NAV_ITEMS = [
  { icon: '🏠', label: 'Inicio', active: true },
  { icon: '🔔', label: 'Alertas Activas', badge: 8 },
  { icon: '📋', label: 'Casos en Seguimiento' },
  { icon: '🎓', label: 'Módulo Pedagógico' },
  { icon: '📊', label: 'Reportes' },
  { icon: '⚙️', label: 'Configuración' },
];

interface DashboardViewProps {
  onOpenCase: (id: string) => void;
}

const RiskBadge = ({ level }: { level: string }) => {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    alto: { label: 'Alto', color: '#EB5757', bg: 'rgba(235,87,87,0.12)' },
    medio: { label: 'Medio', color: '#D4A017', bg: 'rgba(242,201,76,0.12)' },
    bajo: { label: 'Bajo', color: '#27AE60', bg: 'rgba(39,174,96,0.12)' },
  };
  const s = map[level];
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ color: s.color, background: s.bg, fontFamily: 'Inter, sans-serif' }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: s.color }}
      />
      {s.label}
    </span>
  );
};

export default function DashboardView({ onOpenCase }: DashboardViewProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchVal, setSearchVal] = useState('');

  const filtered = ALERTS.filter(
    a =>
      a.name.toLowerCase().includes(searchVal.toLowerCase()) ||
      a.ficha.toLowerCase().includes(searchVal.toLowerCase()),
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F8F9FA', fontFamily: 'Inter, sans-serif' }}>

      {/* ── SIDEBAR ── */}
      <aside
        className="flex-shrink-0 flex flex-col transition-all duration-300 overflow-hidden"
        style={{
          width: sidebarOpen ? 232 : 64,
          background: '#00324D',
          minHeight: '100vh',
        }}
      >
        {/* Logo area */}
        <div className="flex items-center gap-3 px-4 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div
            className="w-8 h-8 min-w-[2rem] rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ background: '#39A900', fontFamily: 'Poppins, sans-serif' }}
          >
            SC
          </div>
          {sidebarOpen && (
            <div>
              <p className="text-white font-bold text-sm leading-none" style={{ fontFamily: 'Poppins, sans-serif' }}>Stay Clean</p>
              <p className="text-white/40 text-[10px] mt-0.5">SENA Bienestar</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(p => !p)}
            className="ml-auto text-white/40 hover:text-white/70 transition-colors text-sm"
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 flex flex-col gap-0.5">
          {NAV_ITEMS.map(item => (
            <button
              key={item.label}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-left transition-all group"
              style={{
                background: item.active ? 'rgba(57,169,0,0.2)' : 'transparent',
                color: item.active ? '#39A900' : 'rgba(255,255,255,0.55)',
              }}
              onMouseEnter={e => { if (!item.active) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={e => { if (!item.active) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
            >
              <span className="text-base min-w-[1.25rem] text-center">{item.icon}</span>
              {sidebarOpen && (
                <span className="text-sm font-medium flex-1">{item.label}</span>
              )}
              {sidebarOpen && item.badge && (
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white"
                  style={{ background: '#EB5757' }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* User profile */}
        <div className="px-3 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 min-w-[2rem] rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #39A900, #27AE60)' }}
            >
              MG
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-semibold truncate">María González</p>
                <p className="text-white/40 text-[10px]">Psicóloga · Bienestar</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Header */}
        <header
          className="flex items-center justify-between px-6 py-3.5 bg-white flex-shrink-0"
          style={{ borderBottom: '1px solid #E8ECF0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
        >
          <div>
            <h1 className="text-[#00324D] text-lg font-bold leading-none" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Panel de Bienestar
            </h1>
            <p className="text-[#94a3b8] text-xs mt-0.5">Centro de Formación SENA · Bogotá D.C. · 19 Ago 2026</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden sm:block">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] text-sm">🔍</span>
              <input
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                placeholder="Buscar aprendiz o ficha..."
                className="pl-9 pr-4 py-2 rounded-lg text-sm outline-none"
                style={{
                  background: '#F8F9FA',
                  border: '1px solid #E8ECF0',
                  color: '#00324D',
                  width: 220,
                  fontFamily: 'Inter, sans-serif',
                }}
              />
            </div>

            {/* Notifications */}
            <button className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#F8F9FA] transition-colors" style={{ border: '1px solid #E8ECF0' }}>
              <span className="text-base">🔔</span>
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center"
                style={{ background: '#EB5757' }}
              >
                3
              </span>
            </button>

            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #39A900, #00324D)' }}
            >
              MG
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">

          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Evaluados', value: '247', icon: '👥', color: '#00324D', bg: 'rgba(0,50,77,0.06)', trend: '+12 este mes' },
              { label: 'Riesgo Alto', value: '37', icon: '🚨', color: '#EB5757', bg: 'rgba(235,87,87,0.06)', trend: '↑ 4 nuevos hoy' },
              { label: 'En Seguimiento', value: '34', icon: '📋', color: '#F2C94C', bg: 'rgba(242,201,76,0.06)', trend: '8 activos hoy' },
              { label: 'Cerrados con Éxito', value: '89', icon: '✅', color: '#27AE60', bg: 'rgba(39,174,96,0.06)', trend: '+3 esta semana' },
            ].map(kpi => (
              <div
                key={kpi.label}
                className="bg-white rounded-xl p-4 flex flex-col gap-3"
                style={{ border: '1px solid #E8ECF0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
              >
                <div className="flex items-start justify-between">
                  <p className="text-[#64748b] text-xs leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>{kpi.label}</p>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ background: kpi.bg }}>
                    {kpi.icon}
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-bold leading-none" style={{ color: kpi.color, fontFamily: 'Poppins, sans-serif' }}>{kpi.value}</p>
                  <p className="text-[#94a3b8] text-[10px] mt-1">{kpi.trend}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Two-column layout: alerts + charts */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* Alert table - wider */}
            <div
              className="xl:col-span-2 bg-white rounded-xl overflow-hidden"
              style={{ border: '1px solid #E8ECF0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
            >
              <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #F1F5F9' }}>
                <div>
                  <h2 className="text-[#00324D] text-sm font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Alertas Activas
                  </h2>
                  <p className="text-[#94a3b8] text-[11px] mt-0.5">Priorizadas por criticidad · Tiempo real</p>
                </div>
                <span
                  className="text-[10px] font-bold px-2 py-1 rounded-full text-white"
                  style={{ background: '#EB5757' }}
                >
                  {filtered.filter(a => a.status === 'Pendiente').length} pendientes
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                      {['Aprendiz', 'Ficha / Programa', 'Riesgo', 'Score', 'Fecha/Hora', 'Estado', ''].map(h => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wide whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((a, i) => (
                      <tr
                        key={a.id}
                        className="transition-colors hover:bg-[#F8FAFC]"
                        style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F1F5F9' : 'none' }}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div
                              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                              style={{ background: a.risk === 'alto' ? '#EB5757' : a.risk === 'medio' ? '#F2C94C' : '#27AE60' }}
                            >
                              {a.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-[#1e293b] text-sm font-medium whitespace-nowrap">{a.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-[#64748b] text-xs whitespace-nowrap">{a.ficha}</td>
                        <td className="px-4 py-3"><RiskBadge level={a.risk} /></td>
                        <td className="px-4 py-3">
                          <span className="text-sm font-bold" style={{ color: a.risk === 'alto' ? '#EB5757' : a.risk === 'medio' ? '#D4A017' : '#27AE60' }}>
                            {a.score}
                          </span>
                          <span className="text-[#94a3b8] text-xs">/100</span>
                        </td>
                        <td className="px-4 py-3 text-[#64748b] text-xs whitespace-nowrap">{a.time}</td>
                        <td className="px-4 py-3">
                          <span
                            className="text-[10px] font-semibold px-2 py-1 rounded-full"
                            style={{
                              background: a.status === 'Pendiente' ? 'rgba(235,87,87,0.1)' : 'rgba(39,174,96,0.1)',
                              color: a.status === 'Pendiente' ? '#EB5757' : '#27AE60',
                            }}
                          >
                            {a.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => onOpenCase(a.id)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:scale-105 active:scale-95"
                            style={{ background: '#00324D' }}
                          >
                            Abrir Caso
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Charts column */}
            <div className="flex flex-col gap-4">
              {/* Donut chart */}
              <div
                className="bg-white rounded-xl p-5"
                style={{ border: '1px solid #E8ECF0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
              >
                <h2 className="text-[#00324D] text-sm font-bold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Distribución de Riesgo
                </h2>
                <p className="text-[#94a3b8] text-[11px] mb-3">Total: 247 aprendices evaluados</p>
                <div className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={RISK_DIST}
                        cx="50%"
                        cy="50%"
                        innerRadius={52}
                        outerRadius={72}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {RISK_DIST.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [String(value) + ' aprendices', 'Total']}
                        contentStyle={{ fontSize: 11, fontFamily: 'Inter, sans-serif', border: '1px solid #E8ECF0', borderRadius: 8 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col gap-2 mt-1">
                  {RISK_DIST.map(d => (
                    <div key={d.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                        <span className="text-[#64748b] text-xs">{d.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#1e293b] text-xs font-bold">{d.value}</span>
                        <span className="text-[#94a3b8] text-[10px]">{d.pct}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bar chart */}
              <div
                className="bg-white rounded-xl p-5 flex-1"
                style={{ border: '1px solid #E8ECF0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
              >
                <h2 className="text-[#00324D] text-sm font-bold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Alertas por Programa
                </h2>
                <p className="text-[#94a3b8] text-[11px] mb-3">Top 5 fichas con mayor índice</p>
                <div className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={PROGRAM_DATA} layout="vertical" margin={{ top: 0, right: 12, left: 0, bottom: 0 }}>
                      <CartesianGrid horizontal={false} stroke="#F1F5F9" />
                      <XAxis type="number" tick={{ fontSize: 10, fill: '#94a3b8', fontFamily: 'Inter, sans-serif' }} axisLine={false} tickLine={false} />
                      <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#64748b', fontFamily: 'Inter, sans-serif' }} axisLine={false} tickLine={false} width={68} />
                      <Tooltip
                        formatter={(v) => [String(v) + ' alertas', 'Total']}
                        contentStyle={{ fontSize: 11, fontFamily: 'Inter, sans-serif', border: '1px solid #E8ECF0', borderRadius: 8 }}
                      />
                      <Bar dataKey="alertas" fill="#39A900" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Confidentiality notice */}
          <div
            className="mt-6 px-4 py-3 rounded-xl flex items-start gap-3"
            style={{ background: 'rgba(0,50,77,0.04)', border: '1px solid rgba(0,50,77,0.08)' }}
          >
            <span className="text-base shrink-0 mt-0.5">🔒</span>
            <p className="text-[#64748b] text-xs leading-relaxed">
              <strong className="text-[#00324D]">Confidencialidad:</strong> La información mostrada en este panel está protegida por la Ley 1581 de 2012 (Habeas Data) y el Decreto 1377 de 2013.
              Solo el personal autorizado de Bienestar Institucional tiene acceso. El uso indebido de datos personales está sujeto a sanciones disciplinarias y legales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
