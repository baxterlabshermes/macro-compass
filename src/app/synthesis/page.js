'use client'
import Link from 'next/link'

const SECTOR_ALLOCATION = [
  { name: 'Hard Assets',          allocation: 22, sentiment: 8 },
  { name: 'Energy',               allocation: 25, sentiment: 6 },
  { name: 'Food & Water',         allocation: 20, sentiment: 7 },
  { name: 'IPO Pipeline',         allocation: 15, sentiment: 6 },
  { name: 'Wellness & Leisure',   allocation: 10, sentiment: 7 },
  { name: 'Consumer & Apparel',   allocation: 8, sentiment: 4 },
]

const TOP_IDEAS = [
  { rank: 1, asset: 'Silver (SLV) + Uranium Mining', confidence: 9, horizon: '12-36mo', reasoning: 'Dual macro tailwinds: monetary demand and industrial demand creating historically undersupplied market. Best risk/reward in hard assets.' },
  { rank: 2, asset: 'Nootropic + Sleep Tech Equities', confidence: 8, horizon: '24-48mo', reasoning: 'Structural demand from AI burnout epidemic creates compounding margin opportunity. Watch functional food platforms and small-cap biotech.' },
  { rank: 3, asset: 'Pre-IPO Fusion / SMR Infrastructure', confidence: 7, horizon: '18-60mo', reasoning: 'TerraPower/Helion successors will trade at premium multiples vs traditional energy. High conviction but illiquidity risk.' },
]

function signalBar(sentiment) {
  const pct = ((sentiment + 4) / 13) * 100
  const c = sentiment >= 7 ? '#34d399' : sentiment >= 5 ? '#fbbf24' : '#6b7280'
  return (
    <div className="relative w-full h-1.5 rounded-full bg-[rgba(255,255,255,0.08)] overflow-hidden">
      <div style={{ width: `${pct}%`, background: c }} className="h-full rounded-full" />
    </div>
  )
}

export default function SynthesisPage() {
  return (
    <div style={{ background: '#141420', minHeight: '100vh' }}>
      <div className="max-w-5xl mx-auto px-4 pt-20 pb-20">

        <div className="mb-8">
          <p className="text-[11px] uppercase tracking-widest text-white/30 font-semibold mb-2">Macro Compass Strategy</p>
          <h1 className="text-2xl font-semibold text-white">Synthesis & Portfolio Allocation</h1>
        </div>

        {/* Sector bars */}
        <section className="mb-10">
          <h2 className="text-[13px] uppercase tracking-widest text-white/40 font-semibold mb-4">Allocation by Sentiment</h2>
          <div className="card overflow-hidden">
            {SECTOR_ALLOCATION.map(s => (
              <Link key={s.name} href={`/${s.name.toLowerCase().replace(' & ', '-').replace(/\s+/g, '-')}`}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.03] transition-colors">
                <p className="text-[13px] text-white/90 w-28 shrink-0">{s.name}</p>
                <div className="flex-1 min-w-0">{signalBar(s.sentiment)}</div>
                <span className={`w-2 h-2 rounded-full shrink-0 ${s.sentiment >= 7 ? 'bg-emerald-400' : s.sentiment >= 5 ? 'bg-yellow-400' : 'bg-gray-500'}`} />
                <p className="text-[13px] text-white/60 w-12 text-right shrink-0">{s.allocation}%</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Top Ideas */}
        <section className="mb-12">
          <h2 className="text-[13px] uppercase tracking-widest text-white/40 font-semibold mb-5">Top Investment Ideas</h2>
          <div className="space-y-3">
            {TOP_IDEAS.map(t => (
              <div key={t.rank} className="card p-5 flex gap-5 hover:bg-[rgba(255,255,255,0.03)] transition-colors">
                <div className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: t.confidence >= 8 ? 'rgba(52,211,153,0.12)' : 'rgba(251,191,36,0.10)' }}>
                  <span className="text-xl font-semibold" style={{ color: t.confidence >= 8 ? '#34d399' : '#fbbf24' }}>#{t.rank}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="text-[14px] font-semibold text-white truncate">{t.asset}</p>
                    <span className="pill-sm shrink-0" style={{ background: 'rgba(251,191,36,0.10)', color: '#fbbf24' }}>{t.confidence}/10</span>
                  </div>
                  <p className="text-[12px] text-white/40 mb-3">{t.horizon}</p>
                  <p className="text-[13px] text-white/60 leading-relaxed">{t.reasoning}</p>
                </div>
              </div>
            ))}

          {/* Thesis cards */}
          <section className="mb-16">
            <h2 className="text-[13px] uppercase tracking-widest text-white/40 font-semibold mb-5">Macro Thesis</h2>
            <div className="space-y-3">
              {[
                { color: 'border-l-emerald-500', title: 'Primary', body: 'CapEx underinvestment in energy, mining, and agriculture over the past decade creates a persistent supply gap that price signals alone cannot resolve.' },
                { color: 'border-l-teal-400',   title: 'Secondary',  body: 'Fed rate cuts through 2026 amplify all real asset valuations. Silver and uranium have the highest beta to Fed easing cycles among commodities.' },
                { color: 'border-l-blue-400',    title: 'Tertiary',  body: 'Post-rate-cut IPO window creates supply-constrained entry for pre-IPO companies in energy, water, biotech. Track SEC S-1 filings 6-9 months ahead.' },
              ].map((t) => (
                <div key={t.title} className={`card p-4 border-l-4 ${t.color}`}>
                  <p className="text-[10px] uppercase tracking-wider text-white/30 font-semibold mb-1">{t.title}</p>
                  <p className="text-[13px] text-white/70 leading-relaxed">{t.body}</p>
                </div>
              ))}
            </div>
          </section>

        <div className="flex pt-6 border-t border-white/[0.06]">
          <Link href="/" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium← Home</Link>
        </div>
      </div>
    </div>
  )
}
