'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const TOP_CALLS = [
  {
    signal: 'BUY',
    title: 'Silver (SLV)',
    horizon: '12-36mo',
    thesis: 'Central bank buying at record pace + solar demand deficit.',
    why: 'Central banks bought 1,084t in 2023. Solar panel production tripled since 2020 but silver output is flat.',
    whenDesc: 'Below $27/oz on pullbacks of more than 8%.',
    risk: 'Dollar reversal above DXY 108 would pressure prices briefly.'
  },
  {
    signal: 'BUY',
    title: 'Uranium Miners (CCJ)',
    horizon: '18-60mo',
    thesis: '73 reactors under construction globally — highest in 40 years.',
    why: "Mining majors have practiced capex discipline through the entire boom. Nobody built new mines.",
    whenDesc: 'Dollar-cost average into weakness.',
    risk: 'Reactor safety incidents or policy reversals could pressure sentiment.'
  },
  {
    signal: 'HOLD',
    title: 'Gold (GLD)',
    horizon: '6-18mo',
    thesis: "Strong trend but crowded positioning — patience for better entries.",
    why: "Gold has already moved $800 in this cycle. The debasation thesis is widely priced in.",
    whenDesc: 'Dips toward $3,200 or if real yields turn negative.',
    risk: "Fed pivot delays pushing DXY back above 108 could trigger a pullback."
  },
]

const SECTOR_SNAPSHOT = [
  { sector: 'Hard Assets', signal: 'BUY', dir: 'up', summary: "Best risk/reward. Silver and uranium lead.", href: '/hard-assets' },
  { sector: 'Wellness/Leisure', signal: 'BUY', dir: 'up', summary: 'AI fatigue creating real demand — nootropics at 34% CAGR.', href: '/wellness-leisure' },
  { sector: 'Food & Water', signal: 'HOLD', dir: 'flat', summary: 'Water infrastructure CapEx underinvested for a generation.', href: '/food-water' },
  { sector: "Consumer/Apparel", signal: 'HOLD', dir: 'flat', summary: "Athleisure crossover durable; watch tariff-resistant models.", href: '/consumer-apparel' },
  { sector: 'Energy', signal: 'WATCH', dir: 'up', summary: 'Rig counts at decade lows — supply cannot grow fast enough.', href: '/energy' },
  { sector: 'IPO Pipeline', signal: 'WATCH', dir: 'flat', summary: 'Backlog record high — watch for volume spike.', href: '/ipo-pipeline' },
]

const SIGNAL_CONFIG = {
  BUY:   { color: '#34d399', bg: 'rgba(52,211,153,0.12)', label: 'BUY' },
  SELL:  { color: '#f87171', bg: 'rgba(248,113,113,0.12)', label: 'SELL' },
  HOLD:  { color: '#fbbf24', bg: 'rgba(251,191,36,0.12)', label: 'HOLD' },
  WATCH: { color: '#8d969e', bg: 'rgba(141,150,158,0.10)', label: 'WATCH' },
}

function signalLabel(sig) { return sig }

/* --- Helper components --- */

function Arrow({ dir, size }) {
  const color = dir === 'up' ? '#34d399' : dir === 'down' ? '#f87171' : '#8d969e'
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke={color}>
      <path strokeWidth={2} strokeLinecap="round"
        d={dir === 'up' ? 'M5 15l7-7 7 7' : dir === 'down' ? 'M19 9l-7 7-7-7' : 
           'M5 12h14'} />
    </svg>
  )
}

function SkeletonCard() {
  return <div className="animate-pulse rounded-xl bg-white/[0.03] h-16" />
}

function PageSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-32 pb-16 text-center">
      <h1 className="text-[13px] uppercase tracking-widest text-white/40 font-semibold mb-8">
        Loading live data...
      </h1>
      <div className="flex items-center justify-between gap-6 flex-wrap mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="w-[125px] h-[72px] rounded-xl animate-pulse bg-white/[0.03]" />
        ))}
      </div>
      <div className="max-w-xl mx-auto space-y-3">
        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    </div>
  )
}

function SignalCard({ call }) {
  const cfg = SIGNAL_CONFIG[call.signal] || SIGNAL_CONFIG.WATCH
  return (
    <div className="rounded-xl border border-white/[0.07] p-5 flex items-start gap-4 hover:bg-white/[0.02] transition-colors">
      <span className="shrink-0 px-2 py-[3px] rounded-pill text-xs" style={{ background: cfg.bg, color: cfg.color }}>
        {call.signal}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white font-medium truncate">{call.title}</p>
        <p className="text-sm text-white/50 leading-relaxed">{call.thesis}</p>
        <p className="text-xs text-white/30 mt-1">Horizon: {call.horizon}</p>
      </div>
    </div>
  )
}

/* --- MAIN PAGE --- */

export default function Page() {
  const [prices, setPrices] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/market-data')
        if (!res.ok) throw new Error('Network error')
        const data = await res.json()

        const kpis = (data.prices || []).map(p => ({
          label: p.label,
          price: p.price ?? 'N/A',
          change: p.changePercent != null
            ? `${p.changePercent >= 0 ? '+' : ''}${p.changePercent.toFixed(2)}%`
            : '+0.00%',
          dir: (p.changePercent || 0) >= 0 ? 'up' : 'down',
        }))

        setPrices(kpis.length > 0 ? kpis : null)
        setLastUpdated(data.updated)
      } catch (_err) {
        // Silently handle fetch failures — will retry on interval
      } finally {
        // Only un-load once we have data or one failed attempt
        setLoading(false)
      }
    }

    fetchData()
    const ref = setInterval(fetchData, 5 * 60 * 1000)
    return () => clearInterval(ref)
  }, [])

  if (loading && !prices) return <PageSkeleton />

  /* Locate Silver / Uranium rows for the thesis section */
  const slv = prices?.find(p => p.label.toLowerCase().includes('silver'))
  const ura = prices?.find(p => p.label.toLowerCase().includes('uranium'))

  return (
    <div style={{ background: '#141420', minHeight: '100vh' }}>
      <main className="max-w-6xl mx-auto px-4 pt-20 pb-16">

        {/* Key Insight */}
        <section className="mb-8">
          <div className="rounded-2xl p-6 border border-white/[0.1] bg-gradient-to-br from-emerald-950/30 to-slate-900/30">
            <p className="text-[10px] uppercase tracking-widest text-emerald-400/60 font-semibold mb-2">Key Insight</p>
            <h1 className="text-2xl font-semibold text-white leading-tight mb-3">
              The supply gap in silver and uranium is widening — every sector points to the same lever: 15 years of underinvestment meeting an acceleration cycle.
            </h1>
            <Link href="/synthesis" className="text-sm text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1 transition-colors">
              See full synthesis{' '}<span aria-hidden="true">{`→`}</span></Link>
          </div>
        </section>

        {/* Live Price Strip */}
        <section className="mb-8">
          <div className="rounded-2xl p-5 border border-white/[0.07] bg-white/[0.02]">
            <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-4">Live Prices</p>
            <div className="flex items-center gap-6 flex-wrap">{''}

              {prices?.map((p, i) => (
                <div key={p.label} className={i < prices.length - 1 ? 'pr-6' : ''}>
                  <p className="text-[10px] uppercase text-white/30 font-semibold tracking-wider">{p.label}</p>
                  <p className="text-lg font-bold text-white">{p.price}</p>
                  <p className={`text-xs font-medium ${p.dir === 'up' ? 'text-emerald-400' : p.dir === 'down' ? 'text-red-400' : 'text-white/50'}`}>
                    {p.change}
                  </p>
                </div>
              ))}

              <div className="ml-auto hidden sm:block">
                <p className="text-[10px] text-white/25">{lastUpdated ? `Updated ${new Date(lastUpdated).toLocaleTimeString()}` : 'Loading...'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Top Conviction */}
        <section className="mb-10">
          <h2 className="text-[13px] uppercase tracking-widest text-white/40 font-semibold mb-5">Top Conviction</h2>
          <div className="rounded-xl border border-white/[0.07] p-6 bg-white/[0.02]">
            {slv && (
              <p className={`text-[13px] font-medium mb-3 ${slv.change.includes('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                Silver: {slv.price} ({slv.change} today)
              </p>
            )}
            {ura && (
              <p className={`text-[13px] font-medium mb-3 ${ura.change.includes('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                Urani: {ura.price} ({ura.change} today)
              </p>
            )}
            <p className="text-[14px] text-white/70 mb-4 leading-relaxed">
              Central bank gold buying at record pace + solar silver deficit create a real supply shortfall. Uranium has 73 reactors under construction with zero new mines built in 15 years.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#18181b] rounded-xl px-4 py-3 border border-white/[0.05]">
                <p className="text-[10px] uppercase text-white/30 font-semibold mb-1 tracking-wider">Why</p>
                <p className="text-sm text-white/60 leading-snug">Central banks bought 1,084t in 2023. Solar demand outgrows new supply by 15M oz annually.</p>
              </div>
              <div className="bg-[#18181b] rounded-xl px-4 py-3 border border-white/[0.05]">
                <p className="text-[10px] uppercase text-white/30 font-semibold mb-1 tracking-wider">When to Act</p>
                <p className="text-sm text-white/60 leading-snug">Below $27/oz silver on pullbacks above 8%. DCA into uranium miners on weakness.</p>
              </div>
              <div className="bg-[#18181b] rounded-xl px-4 py-3 border border-white/[0.05]">
                <p className="text-[10px] uppercase text-white/30 font-semibold mb-1 tracking-wider">Risk</p>
                <p className="text-sm text-white/60 leading-snug">Dollar reversal above DXY 108 would pressure prices briefly but deficit holds the floor.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Other Signals */}
        <section className="mb-12">
          <h2 className="text-[13px] uppercase tracking-widest text-white/40 font-semibold mb-5">Other Signals</h2>
          <div className="space-y-3">{''}
            {TOP_CALLS.map((call, idx) => (
              <SignalCard key={idx} call={call} />
            ))}
          </div>
        </section>

        {/* All Sectors */}
        <section className="mb-12">
          <h2 className="text-[13px] uppercase tracking-widest text-white/40 font-semibold mb-5">All Sectors</h2>
          <div className="rounded-xl border border-white/[0.07] overflow-hidden bg-white/[0.02]">{''}
            {SECTOR_SNAPSHOT.map((s, idx) => {
              const cfg = SIGNAL_CONFIG[s.signal] || SIGNAL_CONFIG.WATCH
              return (
                <Link key={idx} href={s.href}
                  className="flex items-center justify-between p-4 border-b border-white/[0.05] last:border-none hover:bg-white/[0.03] transition-colors">
                  <div className="flex items-start gap-3 min-w-0">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 
                      ${s.signal === 'BUY' ? 'bg-emerald-400/10 text-emerald-400' : s.signal === 'HOLD' ? 'bg-yellow-400/10 text-yellow-400' : 'bg-blue-400/10 text-blue-400'}`}>
                      <Arrow dir={s.dir} size={16} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm text-white font-medium truncate">{s.sector}</p>
                      <p className="text-xs text-white/50 truncate">{s.summary}</p>
                    </div>
                  </div>
                  <span className={`shrink-0 px-2 py-[3px] rounded-pill text-xs
                    ${s.signal === 'BUY' ? 'bg-emerald-400/10 text-emerald-400' : s.signal === 'HOLD' ? 'bg-yellow-400/10 text-yellow-400' : 'bg-blue-400/10 text-blue-400'}`}>
                    {signalLabel(cfg.label)}
                  </span>
                </Link>
              )
            })}
          </div>
        </section>

      </main>

    </div>
  )
}
