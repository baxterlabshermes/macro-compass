'use client'
import Link from 'next/link'

const KPIs = [
  { label: 'S&P 500', value: '5,892', change: '+0.8%', dir: 'up' },
  { label: 'DXY', value: '104.7', change: '-0.4%', dir: 'down' },
  { label: 'WTI Crude', value: '$68.34', change: '+1.2%', dir: 'up' },
  { label: 'Gold', value: '$3,542', change: '-0.3%', dir: 'down' },
]

const TOP_CALLS = [
  {
    signal: 'BUY', signalColor: '#34d399',
    title: 'Silver (SLV)', horizon: '12-36mo',
    thesis: 'Central bank buying at record pace + solar demand deficit — the supply shortfall cannot be solved in <3 years.',
    why: `WHY: Central banks bought 1,084 tonnes in 2023 alone. Solar panel production tripled since 2020 but silver mining output is flat. Industrial demand exceeds new supply by 15M oz annually — this isn't a thesis, it's the data.`,
    when: `WHEN TO ADD BELLOW $27/oz or on pullbacks >8%. Rate cuts accelerate the deficit.`,
    risk: `RISK: Dollar reversal above DXY 108 would pressure prices briefly, but structural deficit holds the floor.`
  },
  {
    signal: 'BUY', signalColor: '#34d399',
    title: 'Uranium Miners (CCJ)', horizon: '18-60mo',
    thesis: '73 reactors under construction globally — highest in 40 years. Supply has been chronically undersupplied for 15+ years.',
    why: `WHY: Mining majors have practiced ruthless capex discipline through the entire boom cycle. Nobody built new mines. Kazatomprom is structurally constrained.`,
    when: `WHEN TO ADD: Dollar-cost average into weakness. IPO window (TerraPower successors) offers higher-beta but riskier entries.`,
    risk: `RISK: Reactor safety incidents or policy reversals could pressure sentiment, though long-term energy security thesis holds.`
  },
  {
    signal: 'HOLD', signalColor: '#fbbf24',
    title: 'Gold (GLD)', horizon: '6-18mo',
    thesis: 'Strong trend but crowded positioning — patience for better entries beats chasing here.',
    why: `WHY: Gold has already moved $800 in this cycle. The debasement thesis is widely priced in, which historically precedes consolidation phases below $3,400.`,
    when: `WHEN TO ADD: Dips toward $3,200-3,300 or if real yields turn negative. Current levels are fair value for existing positions.`,
    risk: `RISK: Fed pivot delays pushing DXY back above 108 could trigger a $200-300 pullback closing the entry window.`
  },
]

const SECTOR_SNAPSHOT = [
  { sector: 'Food & Water', signal: 'HOLD', dir: 'yellow', summary: 'Water infrastructure CapEx underinvested for a generation — structural pricing power.', href: '/food-water' },
  { sector: 'Energy', signal: 'WATCH', dir: 'blue', summary: 'US rig counts at decade lows mean new supply cannot meet Q1/Q2 demand growth.', href: '/energy' },
  { sector: 'Hard Assets', signal: 'BUY', dir: 'green', summary: 'Best risk/reward in metals. Silver and uranium lead on industrial + monetary thesis.', href: '/hard-assets' },
  { sector: 'IPO Pipeline', signal: 'WATCH', dir: 'blue', summary: 'Backlog at record high — when the window opens, expect volume spike AND quality filter.', href: '/ipo-pipeline' },
  { sector: 'Consumer/Apparel', signal: 'HOLD', dir: 'yellow', summary: 'Athleisure crossover is durable but tariff exposure offsets gains. Watch off-price winners.', href: '/consumer-apparel' },
  { sector: 'Wellness/Leisure', signal: 'BUY', dir: 'green', summary: 'AI fatigue is creating real demand — nootropics at 34%+ CAGR, not speculation.', href: '/wellness-leisure' },
]

const SIGNAL_CONFIG = {
  BUY:   { color: '#34d399', bg: 'rgba(52,211,153,0.12)',  label: 'BUY' },
  SELL:  { color: '#f87171', bg: 'rgba(248,113,113,0.12)', label: 'SELL' },
  HOLD:  { color: '#fbbf24', bg: 'rgba(251,191,36,0.12)',  label: 'HOLD' },
  WATCH: { color: '#8d969e', bg: 'rgba(141,150,158,0.10)', label: 'WATCH' },
}

export default function Page() {
  return (
    <div style={{ background: '#141420', minHeight: '100vh' }}>
      {/* ── Key Insight Banner ── */}
      <div className="max-w-5xl mx-auto px-4 pt-20 pb-6">
        <div className="grad-green rounded-2xl p-6 mb-8 border border-white/[0.1]">
          <p className="text-[11px] uppercase tracking-widest text-emerald-300/70 font-semibold mb-2">Key Insight</p>
          <h1 className="text-2xl font-semibold text-white leading-tight mb-3">
            The supply gap in silver and uranium is widening, not closing. Every sector points to the same lever: 15 years of underinvestment meeting an acceleration cycle.
          </h1>
          <Link href="/synthesis" className="text-sm text-emerald-400 hover:text-emerald-300 font-medium">See the full synthesis →</Link>
        </div>

        {/* ── Top Call: Silver — our #1 conviction pick ── */}
        <section className="mb-10">
          <div className="flex items-baseline gap-2 mb-5">
            <h2 className="text-[13px] uppercase tracking-widest text-white/40 font-semibold">Top Conviction</h1>
            <span className="pill-sm" style={{ background: 'rgba(52,211,153,0.12)', color: '#34d399' }}>BUY #1</span>
          </div>

          <div className="card p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-white/30 font-medium mb-1">Silver + Uranium</p>
                <h3 className="text-xl font-semibold text-white leading-tight">SLV and uranium miners offer the best risk/reward across all tracked markets right now.</h3>
              </div>
              <span className="pill-sm whitespace-nowrap shrink-0" style={{ background: 'rgba(52,211,153,0.12)', color: '#34d399' }}>BUY</span>
            </div>

            <p className="text-[14px] text-white/70 mb-4">
              Central bank gold buying at record pace + solar silver deficit create a real supply shortfall, not a narrative. Uranium has 73 reactors under construction with zero new mines built in 15+ years
            </p>

            {/* Why / When / Risk — inline */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#1e1e2e] rounded-xl px-3 py-3">
                <p className="text-[10px] uppercase tracking-wider text-white/30 font-semibold mb-1">Why</p>
                <p className="text-[13px] text-white/60 leading-snug">Central banks bought 1,084t in 2023. Solar demand outgrows new supply by 15M oz annually.</p>
              </div>
              <div className="bg-[#1e1e2e] rounded-xl px-3 py-3">
                <p className="text-[10px] uppercase tracking-wider text-white/30 font-semibold mb-1">When to Act</p>
                <p className="text-[13px] text-white/60 leading-snug">Below $27/oz silver on pullbacks >8%. DCA into uranium miners on weakness.</p>
              </div>
              <div className="bg-[#1e1e2e] rounded-xl px-3 py-3">
                <p className="text-[10px] uppercase tracking-wider text-white/30 font-semibold mb-1">Risk</p>
                <p className="text-[13px] text-white/60 leading-snug">Dollar reversal above DXY 108 would pressure prices briefly but deficit holds the floor.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Remaining Calls ── */}
        <section className="mb-12">
          <h2 className="text-[13px] uppercase tracking-widest text-white/40 font-semibold mb-5">Other Signals</h2>
          <div className="space-y-3">
            {TOP_CALLS.slice(1).map((call) => (
              <SignalCard key={call.title} call={call} />
            ))}
          </div>
        </section>

        {/* ── Sector Overview — compact table ── */}
        <section className="mb-12">
          <h2 className="text-[13px] uppercase tracking-widest text-white/40 font-semibold mb-5">All Sectors</h2>
          <div className="card overflow-hidden">
            {SECTOR_SNAPSHOT.map((s) => {
              const cfg = SIGNAL_CONFIG[s.signal] || SIGNAL_CONFIG.WATCH
              return (
                <Link key={s.sector} href={s.href}
                  className={`flex items-center justify-between p-4 border-b border-[rgba(255,255,255,0.05)] last:border-none hover:bg-white/[0.03] transition-colors`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${cfg.color}15`, color: cfg.color }}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeWidth={2} strokeLinecap="round" d="M19 9l-7 7-7-7"/></svg>
                    </span>
                    <div className="min-w-0">
                      <p className="text-[14px] text-white font-medium truncate">{s.sector}</p>
                      <p className="text-[12px] text-white/50 truncate">{s.summary}</p>
                    </div>
                  </div>
                  <span className="pill-sm shrink-0" style={{ background: `${cfg.color}18`, color: cfg.color }}>{signalLabel(cfg.label)}</span>
                </Link>
              )
            })}
          </div>
        </section>

        {/* ── What to Watch This Week ── */}
        <section className="mb-16">
          <h2 className="text-[13px] uppercase tracking-widest text-white/40 font-semibold mb-5">What to Watch</h2>
          <div className="card overflow-hidden divide-y divide-[rgba(255,255,255,0.05)]">
            {[
              { label: 'Fed Rate Decision — Dec Q3', detail: 'Market prices in 2 cuts. One less would flip dollar thesis.', type: 'high' },
              { label: 'OPEC+ Production Meeting', detail: 'Compliance below 90% — watch for deeper cuts that support crude floor.', type: 'med' },
            ].map((w) => (
              <div key={w.label} className="flex items-center gap-3 px-4 py-4 hover:bg-white/[0.02] transition-colors">
                <span className={`w-1.5 h-8 rounded-full shrink-0 ${w.type==='high'?'bg-emerald-400':'bg-blue-400'}`} />
                <div>
                  <p className="text-[13px] text-white/90">{w.label}</p>
                  <p className="text-[12px] text-white/40 mt-0.5">{w.detail}</p>
                </div>
              </div>
            ))}
