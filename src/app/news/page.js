import Link from 'next/link'

const marketMoves = [
  { asset: 'Gold/XAU', move: '+0.4% overnight to $3,562/oz on central bank buying acceleration.', arrow: '▲' },
  { asset: 'WTI Crude', move: '-1.8% intraday as OPEC+ production cut compliance declines below 90%.', arrow: '▼' },
  { asset: 'DXY Index', move: '-0.6% at 104.2 on Fed dovish pricing shift to 3 cuts expected in 2027 H1.', arrow: '▼' },
  { asset: 'SOX (Semiconductor)', move: '+1.2% rally driven by nuclear data center power demand thesis.', arrow: '▲' }
]

const newsSources = [
  { source: 'Reuters Commodities Feed', lastUpdate: '2h ago', headline: 'Gold extends rally as dollar weakens on rate cut bets; copper rises on EU grid investment signals.' },
  { source: 'SEC EDGAR RSS', lastUpdate: '6h ago', headline: 'Helion Energy files confidential S-1 under JOBS Act — public filing expected Q2 2027.' },
  { source: 'FRED Economic Data', lastUpdate: '1d ago', headline: 'CPI report shows core inflation cooling to 2.4% YoY, supporting continued Fed easing cycle.' },
  { source: 'Bloomberg IPO Tracker', lastUpdate: '3h ago', headline: 'TerraPower Inc. rumored preparing IPO filing for early 2028; Morgan Stanley advising.' }
]

export default function NewsPage() {
  
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <h1 className="text-3xl font-bold text-white mb-2">📰 Macro Compass News & Intelligence</h1>
      <p className="text-slate-400 mb-6">Real-time aggregated market moves and SEC filings feeding the dashboard analysis.</p>

      {/* Market Moves */}
      <section className="bg-surface border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">1. Today's Market Moves</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-force-print">
          {marketMoves.map((m, i) => (
            <div key={i} className={`flex items-center gap-3 border-l-4 pb-3 p-3 rounded ${m.arrow === '▲' && m.move.includes('+') ? 'border-green-500 bg-green-900/10' : m.arrow === '▼' && m.move.includes('-') ? 'border-red-500 bg-red-900/10' : 'border-yellow-500 bg-yellow-900/10'}`}>
              <span className="text-2xl">{m.arrow}</span>
              <div>
                <p className="text-gold font-bold text-sm uppercase tracking-wide">{m.asset}</p>
                <p className="text-slate-300 text-sm mt-1 leading-relaxed">{m.move.replace(m.arrow, '').trim()}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* News Feed */}
      <section className="bg-surface border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">2. Intelligence Feeds</h2>
        <div className="space-y-4 not-force-print">
          {newsSources.map((n, i) => (
            <div key={i} className="border-b border-slate-700 pb-3 last:border-0">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-slate-500 flex gap-2">
                  <span className="bg-slate-700 px-2 py-0.5 rounded">{n.source}</span>
                  <span className="bg-emerald-900/40 text-green-400 px-2 py-0.5 rounded flex-shrink-0">Updated {n.lastUpdate}</span>
                </span>
              </div>
              <p className="text-white text-sm leading-relaxed">{n.headline}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Macro Signals */}
      <section className="bg-surface border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">3. Key Watch Items for Portfolio Action</h2>
        <div className="space-y-3 not-force-print">
          {[
            ['alert', 'DXY breaking below 100: Triggers accelerated gold/silver accumulation signal.'], 
            ['watch', 'OPEC+ meeting next week: If production cuts deepened, energy equities (XLE) get upward revision.'],
            ['watch', 'SEC S-1 filings on Helion/TerraPower: Confirm public offering dates for IPO pipeline timing.'],
            ['alert', 'CPI below 2.0%: Would signal Fed emergency rate cut — reposition hard assets before rally.']
          ].map((item, i) => (
            <div key={i} className={`flex gap-3 items-start p-3 rounded ${item[0]==='alert'?'bg-orange-900/20 border border-orange-700':'bg-blue-900/10'}`}>
              <span className={`text-xs font-bold min-w-max px-2 py-1 rounded ${item[0]==='alert'?'bg-orange-600 text-white':'bg-blue-500 text-white'}`}>{item[0].toUpperCase()}</span>
              <p className="text-slate-300 text-sm leading-relaxed">{item[1]}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-between pt-4 border-t border-border">
        <Link href="/" className="text-accent hover:underline font-semibold no-print">← Home</Link>
        <a href="/synthesis" className="text-accent hover:underline font-semibold no-print">Previous: Synthesis & Strategy ←</a>
      </div>
    </div>
  )
}
