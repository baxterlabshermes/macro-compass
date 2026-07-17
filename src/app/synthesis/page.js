'use client'
export default function SynthesisPage() {

  const sectors = [
    { name: 'Hard Assets', allocation: 22, sentiment: 8, href: '/hard-assets' },
    { name: 'Energy', allocation: 25, sentiment: 6, href: '/energy' },
    { name: 'Food & Water', allocation: 20, sentiment: 7, href: '/food-water' },
    { name: 'IPO Pipeline', allocation: 15, sentiment: 6, href: '/ipo-pipeline' },
    { name: 'Wellness', allocation: 10, sentiment: 7, href: '/wellness-leisure' },
    { name: 'Consumer', allocation: 8, sentiment: 4, href: '/consumer-apparel' },
  ]

  const ideas = [
    { rank: 1, asset: 'Silver + Uranium Mining', confidence: 9, horizon: '12-36mo', reason: 'Dual supply gap — monetary demand and industrial demand creating historically undersupplied market.' },
    { rank: 2, asset: 'Nootropic + Sleep Tech Equities', confidence: 8, horizon: '24-48mo', reason: 'Structural demand from AI burnout epidemic creates compounding margin opportunity.' },
    { rank: 3, asset: 'Pre-IPO Fusion / SMR Infrastructure', confidence: 7, horizon: '18-60mo', reason: 'TerraPower/Helion successors will trade at premium multiples vs traditional energy.' },
  ]

  const thesis = [
    { label: 'Primary', color: 'border-l-emerald-500', body: 'CapEx underinvestment in energy, mining, and agriculture creates a persistent supply gap price signals alone cannot resolve.' },
    { label: 'Secondary', color: 'border-l-teal-400', body: 'Fed rate cuts through 2026 amplify all real asset valuations. Silver and uranium have the highest beta to Fed easing cycles.' },
    { label: 'Tertiary', color: 'border-l-blue-400', body: 'Post-rate-cut IPO window creates supply-constrained entry for pre-IPO companies in energy, water, biotech.' },
  ]

  function signalDot(sentiment) {
    if (sentiment >= 7) return 'bg-emerald-400'
    if (sentiment >= 5) return 'bg-yellow-400'
    return 'bg-gray-500'
  }

  function barWidth(sentiment) {
    return ((sentiment + 2) / 12) * 100
  }

  function barColor(sentiment) {
    if (sentiment >= 7) return '#34d399'
    if (sentiment >= 5) return '#fbbf24'
    return '#6b7280'
  }

  return (
    <div style={{ background: '#0b0b0e', minHeight: '100vh' }}>
      <main className="max-w-5xl mx-auto px-4 pt-24 pb-16">

        {/* Header */}
        <div className="mb-10">
          <p className="text-[11px] uppercase tracking-widest text-white/30 font-semibold mb-2">Strategy</p>
          <h1 className="text-2xl font-semibold text-white">Synthesis & Allocation</h1>
        </div>

        {/* Sector allocation bars */}
        <section className="mb-10">
          <h2 className="text-[13px] uppercase tracking-widest text-white/40 font-semibold mb-4">Allocation by Sentiment</h2>
          <div className="card overflow-hidden divide-y divide-white/[0.05]">
            {sectors.map((s) => (
              <a key={s.name} href={s.href} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.03] transition-colors block no-underline text-inherit">
                <span className="text-[13px] text-white/90 w-28 shrink-0">{s.name}</span>
                <div className="flex-1 min-w-0">
                  <div className="w-full h-1.5 rounded-full bg-[rgba(255,255,255,0.08)] overflow-hidden">
                    <div style={{ width: `${barWidth(s.sentiment)}%`, background: barColor(s.sentiment) }} className="h-full rounded-full transition-all" />
                  </div>
                </div>
                <span className={`w-2 h-2 rounded-full shrink-0 ${signalDot(s.sentiment)}`} />
                <span className="text-[13px] text-white/60 w-12 text-right shrink-0">{s.allocation}%</span>
              </a>
            ))}
          </div>
          {/* Legend */}
          <div className="flex gap-4 pt-3">
            <span className="text-[10px] text-white/30 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Bullish 7+</span>
            <span className="text-[10px] text-white/30 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-400" /> Neutral 5-6</span>
            <span className="text-[10px] text-white/30 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-500" /> Bearish &lt;5</span>
          </div>
        </section>

        {/* Top ideas */}
        <section className="mb-16">
          <h2 className="text-[13px] uppercase tracking-widest text-white/40 font-semibold mb-5">Top Investment Ideas</h2>
          <div className="space-y-3">
            {ideas.map((t) => (
              <div key={t.rank} className="card p-5 flex gap-5 hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                <div className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: t.confidence >= 8 ? 'rgba(52,211,153,0.12)' : 'rgba(251,191,36,0.10)' }}>
                  <span className="text-xl font-semibold" style={{ color: t.confidence >= 8 ? '#34d399' : '#fbbf24' }}>#{t.rank}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[14px] font-semibold text-white truncate">{t.asset}</span>
                    <span className="shrink-0 px-2 py-0.5 rounded pill-sm" style={{ background: 'rgba(251,191,36,0.10)', color: '#fbbf24' }}>{t.confidence}/10</span>
                  </div>
                  <p className="text-[12px] text-white/40 mb-2">{t.horizon}</p>
                  <p className="text-[13px] text-white/60 leading-relaxed">{t.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Macro thesis */}
        <section className="mb-16">
          <h2 className="text-[13px] uppercase tracking-widest text-white/40 font-semibold mb-5">Macro Thesis</h2>
          <div className="space-y-3">
            {thesis.map((t) => (
              <div key={t.label} className={`card p-4 border-l-4 ${t.color}`}>
                <p className="text-[10px] uppercase tracking-wider text-white/30 font-semibold mb-1">{t.label}</p>
                <p className="text-[13px] text-white/70 leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Back link */}
        <div className="flex pt-6 border-t border-white/[0.06]">
          <a href="/" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">← Home</a>
        </div>

      </main>
    </div>
  )
}
