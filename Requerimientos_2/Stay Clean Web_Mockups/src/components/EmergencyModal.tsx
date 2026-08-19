interface EmergencyModalProps {
  onClose: () => void;
}

export default function EmergencyModal({ onClose }: EmergencyModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 18, 30, 0.88)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-md rounded-2xl overflow-hidden animate-slide-up"
        style={{ backgroundColor: '#ffffff', boxShadow: '0 32px 64px rgba(0,0,0,0.4)' }}
      >
        {/* Top accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#39A900] via-[#27AE60] to-[#39A900]" />

        {/* Header */}
        <div className="px-8 pt-8 pb-6 text-center">
          {/* SENA shield + Stay Clean logo */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#00324D]">
              <span className="text-white font-bold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>SC</span>
            </div>
            <div className="text-left">
              <p className="text-[#00324D] font-bold text-base leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>Stay Clean</p>
              <p className="text-[#39A900] text-xs font-medium">SENA · Bienestar Institucional</p>
            </div>
          </div>

          {/* Heart icon pulsing */}
          <div className="relative inline-flex items-center justify-center w-16 h-16 mb-4">
            <span className="text-4xl relative z-10">💚</span>
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(57,169,0,0.15) 0%, transparent 70%)',
                animation: 'pulse-ring 2s ease-out infinite'
              }}
            />
          </div>

          <h2
            className="text-[#00324D] text-2xl font-bold mb-3 leading-tight"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            No estás solo/a.
          </h2>
          <p className="text-[#4a5568] text-sm leading-relaxed">
            El equipo de Bienestar del SENA está aquí para escucharte y apoyarte,
            sin juzgar. Lo que sientes importa y mereces ayuda ahora.
          </p>
        </div>

        {/* Action buttons */}
        <div className="px-8 pb-6 flex flex-col gap-3">
          <button
            className="w-full flex items-center gap-3 px-5 py-4 rounded-xl text-white font-semibold text-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
            style={{ backgroundColor: '#39A900', fontFamily: 'Inter, sans-serif' }}
          >
            <span className="text-xl">🧠</span>
            <div className="text-left">
              <p className="font-semibold">Solicitar contacto con un psicólogo</p>
              <p className="text-white/70 text-xs font-normal">Te conectamos en menos de 10 minutos</p>
            </div>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              className="flex flex-col items-center gap-2 px-4 py-4 rounded-xl border-2 border-[#00324D]/20 bg-[#00324D]/5 text-[#00324D] font-medium text-sm transition-all hover:bg-[#00324D]/10 active:scale-[0.98]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span className="text-2xl">📞</span>
              <div className="text-center">
                <p className="font-semibold text-xs">Línea 106</p>
                <p className="text-[#4a5568] text-xs font-normal">Salud Mental 24/7</p>
              </div>
            </button>

            <button
              className="flex flex-col items-center gap-2 px-4 py-4 rounded-xl border-2 border-[#6B46C1]/20 bg-[#6B46C1]/5 text-[#6B46C1] font-medium text-sm transition-all hover:bg-[#6B46C1]/10 active:scale-[0.98]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span className="text-2xl">🏳️‍🌈</span>
              <div className="text-center">
                <p className="font-semibold text-xs">Línea Diversa</p>
                <p className="text-[#4a5568] text-xs font-normal">Apoyo especializado</p>
              </div>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl border border-[#e2e8f0] text-[#718096] text-sm font-medium transition-all hover:bg-[#F8F9FA] active:scale-[0.99]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            ← Regresar al juego
          </button>
        </div>

        {/* Confidentiality notice */}
        <div className="px-8 pb-6">
          <p className="text-[#a0aec0] text-xs text-center leading-relaxed">
            🔒 Toda la información es confidencial y está protegida por la Ley 1581 de 2012
            (Habeas Data). Tu identidad nunca será revelada sin tu consentimiento.
          </p>
        </div>
      </div>
    </div>
  );
}
