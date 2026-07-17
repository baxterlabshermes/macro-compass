'use client'
import Link from 'next/link'
import { useState } from 'react'

const KPIs = [
  { label: 'S&P', value: '5,892', change: '+0.8%', dir: 'up' },
  { label: 'DXY', value: '104.7', change: '-0.4%', dir: 'down' },
  { label: 'Crude', value: '$68', change: '+1.2%', dir: 'up' },
  { label: 'Gold', value: '$3,542', change: '-0.3%', dir: 'down' },
]

const TOP_CALLS = [
  {
    signal: 'BUY', signalColor: '#34d399',
    title: 'Silver (SLV)', horizon: '12-36mo',
    thesis: 'Central bank buying at record pace + solar demand deficit.',
    why: 'Central banks bought 1,084t in 2023. Solar panel production tripled since 2020 but silver output is flat.',
    when: 'Below $27/oz or on pullbacks of more than 8%.',
    risk: 'Dollar reversal above DXY 108 would pressure prices briefly.'
  },
  {
    signal: 'BUY', signalColor: '#34d399',
    title: 'Uranium Miners (CCJ)', horizon: '18-60mo',
    thesis: '73 reactors under construction globally — highest in 40 years.',
    why: 'Mining majors have practiced capex discipline through the entire boom. Nobody built new mines.',
    when: 'Dollar-cost average into weakness.',
    risk: 'Reactor safety incidents or policy reversals could pressure sentiment.'
  },
  {
    signal: 'HOLD', signalColor: '#fbbf24',
    title: 'Gold (GLD)', horizon: '6-18mo',
    thesis: 'Strong trend but crowded positioning — patience for better entries.',
    why: 'Gold has already moved $800 in this cycle. The debasation thesis is widely priced in.',
    when: 'Dips toward $3,200 or if real yields turn negative.',
    risk: 'Fed pivot delays pushing DXY back above 108 could trigger a pullback.'
  },
]

const SECTOR_SNAPSHOT = [
  { sector: 'Hard Assets', signal: 'BUY', dir: 'green', summary: 'Best risk/reward. Silver and uranium lead.', href: '/hard-assets' },
  { sector: 'Wellness/Leisure', signal: 'BUY', dir: 'green', summary: 'AI fatigue creating real demand — nootropics at 34% CAGR.', href: '/wellness-leisure' },
  { sector: 'Food & Water', signal: 'HOLD', dir: 'yellow', summary: 'Water infrastructure CapEx underinvested for a generation.', href: '/food-water' },
  { sector: 'Consumer/Apparel', signal: 'HOLD', dir: 'yellow', summary: 'Athleisure crossover durable; watch tariff-resistant models.', href: '/consumer-apparel' },
  { sector: 'Energy', signal: 'WATCH', dir: 'blue', summary: 'Rig counts at decade lows — supply cannot grow fast enough.', href: '/energy' },
  { sector: 'IPO Pipeline', signal: 'WATCH', dir: 'blue', summary: 'Backlog record high — watch for volume spike.', href: '/ipo-pipeline' },
]

const SIGNAL_CONFIG = {
  BUY:   { color: '#34d399', bg: 'rgba(52,211,153,0.12)', label: 'BUY' },
  SELL:  { color: '#f87171', bg: 'rgba(248,113,113,0.12)', label: 'SELL' },
  HOLD:  { color: '#fbbf24', bg: 'rgba(251,191,36,0.12)', label: 'HOLD' },
  WATCH: { color: '#8d969e', bg: 'rgba(141,150,158,0.10)', label: 'WATCH' },
}

function signalLabel(sig) { return sig }

export default function Page() {
  return (
    <div style={{ background: '#141420', minHeight: '100vh' }}>
      <main className="max-w-5xl mx-auto px-4 pt-20 pb-16">

        {/* Key Insight */}
        <section className="mb-8">
          <div className="grad-green rounded-2xl p-6 border border-white/[0.1]">
            <p className="text-[11px] uppercase tracking-widest text-emerald-300/70 font-semibold mb-2">Key Insight</p>
            <h1 className="text-2xl font-semibold text-white leading-tight mb-3">
              The supply gap in silver and uranium is widening — every sector points to the same lever: 15 years of underinvestment meeting an acceleration cycle.
            </h1>
            <Link href="/synthesis" className="text-sm text-emerald-400 hover:text-emerald-300 font-medium">See full synthesis →</Link>
          </div>
        </section>

        {/* Top Conviction */}
        <section className="mb-10">
          <h2 className="text-[13px] uppercase tracking-widest text-white/40 font-semibold mb-5">Top Conviction</h2>
          <div className="card p-6">
            <p className="text-base text-white/70 mb-4">
              Central bank gold buying at record pace + solar silver deficit create a real supply shortfall. Uranium has 73 reactors under construction with zero new mines built in 15 years.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#1e1e2e] rounded-xl px-4 py-3">
                <p className="text-[10px] uppercase text-white/30 font-semibold mb-1">WHY</p>
                <p className="text-sm text-white/60 leading-snug">Central banks bought 1,084t in 2023. Solar demand outgrows new supply by 15M oz annually.</p>
              </div>
              <div className="bg-[#1e1e2e] rounded-xl px-4 py-3">
                <p className="text-[10px] uppercase text-white/30 font-semibold mb-1">WHEN TO ACT</p>
                <p className="text-sm text-white/60 leading-snug">Below $27/oz silver on pullbacks above 8%. DCA into uranium miners on weakness.</p>
              </div>
              <div className="bg-[#1e1e2e] rounded-xl px-4 py-3">
                <p className="text-[10px] uppercase text-white/30 font-semibold mb-1">RISK</p>
                <p className="text-sm text-white/60 leading-snug">Dollar reversal above DXY 108 would pressure prices briefly but deficit holds the floor.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Other Signals */}
        <section className="mb-12">
          <h2 className="text-[13px] uppercase tracking-widest text-white/40 font-semibold mb-5">Other Signals</h2>
          <div className="space-y-3">
            {TOP_CALLS.slice(1).map((call) => (
              <SignalCard key={call.title} call={call} />
            ))}
          </div>
        </section>

        {/* All Sectors Summary */}
        <section className="mb-12">
          <h2 className="text-[13px] uppercase tracking-widest text-white/40 font-semibold mb-5">All Sectors</h2>
          <div className="card overflow-hidden">
            {SECTOR_SNAPSHOT.map((s) => {
              const cfg = SIGNAL_CONFIG[s.signal] || SIGNAL_CONFIG.WATCH
              return (
                <Link key={s.sector} href={s.href}
                  className={`flex items-center justify-between p-4 border-b border-white/[0.05] last:border-none hover:bg-white/[0.03] transition-colors`}>
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(52,211,153,0.1)', color: cfg.color }}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeWidth={2} strokeLinecap="round" d="M19 9l-7 7-7-7"/></svg>
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm text-white font-medium truncate">{s.sector}</p>
                      <p className="text-xs text-white/50 truncate">{s.summary}</p>
                    </div>
                  </div>
                  <span className="shrink-0 px-2 py-[3px] rounded-pill text-xs" style={{ background: cfg.bg, color: cfg.color }}>
                    {signalLabel(cfg.label)}
                  </span>
                </Link>
              )
            })}
          </div>
        </section>

        {/* What to Watch */}
        <section className="mb-12">
          <h2 className="text-[13px] uppercase tracking-widest text-white/40 font-semibold mb-5">What to Watch</h2>
          <div className="card overflow-hidden divide-y divide-white/[0.05]">
            {[
              { label: 'Fed Rate Decision — Dec Q3', detail: 'Market prices in 2 cuts. One less would flip dollar thesis.', high: true },
              { label: 'OPEC+ Production Meeting', detail: 'Compliance below 90%. Watch for deeper cuts that support crude floor.', high: false },
            ].map((w) => (
              <div key={w.label} className="flex items-center gap-3 px-4 py-4">
                <span className={`w-1.5 h-[32px] rounded-full shrink-0 ${w.high ? 'bg-emerald-400' : 'bg-blue-400'}`} />
                <div>
                  <p className="text-sm text-white/90">{w.label}</p>
                  <p className="text-xs text-white/40 mt-0.5">{w.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Full Signal Breakdown */}
        <section className="mb-16">
          <h2 className="text-[13px] uppercase tracking-widest text-white/40 font-semibold mb-5">Signal Breakdown</h2>
          <div className="card overflow-hidden divide-y divide-white/[0.05]">
            {TOP_CALLS.map((s) => (
              <CollapseBox key={s.title} title={`${s.title} — ${s.signal}`} defaultOpen={s.title === 'Silver (SLV)'}>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/[0.03] p-3 rounded-lg"><p className="text-[10px] uppercase text-white/30 font-semibold mb-1">WHY</p><p className="text-sm text-white/60">{s.why}</p></div>
                  <div className="bg-white/[0.03] p-3 rounded-lg"><p className="text-[10px] uppercase text-white/30 font-semibold mb-1">WHEN</p><p className="text-sm text-white/60">{s.when}</p></div>
                  <div className="bg-white/[0.03] p-3 rounded-lg"><p className="text-[10px] uppercase text-white/30 font-semibold mb-1">RISK</p><p className="text-sm text-white/60">{s.risk}</p></div>
                </div>
              </CollapseBox>
            ))}
          </div>
        </section>

      </main>
    </div>
  )
}

function SignalCard({ call: s }) {
  const cfg = SIGNAL_CONFIG[s.signal] || SIGNAL_CONFIG.WATCH
  return (
    <div className="card p-5 flex items-start gap-4 hover:bg-white/[0.02] transition-colors">
      <span className="shrink-0 px-2 py-[3px] rounded-pill text-xs" style={{ background: cfg.bg, color: cfg.color }}>
        {s.signal}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white font-medium truncate">{s.title}</p>
        <p className="text-sm text-white/50 leading-relaxed">{s.thesis}</p>
        <p className="text-xs text-white/30 mt-1">Horizon: {s.horizon}</p>
      </div>
    </div>
  )
}

function CollapseBox({ title, defaultOpen, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full text-left">
        <span className="text-[13px] text-white/80">{title}</span>
        <svg className={`w-4 h-4 text-white/30 transition-transform ${open ? 'rotate-180' : ''}`} stroke="currentColor" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" fill="none" strokeWidth={2}/></svg>
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  )
}
