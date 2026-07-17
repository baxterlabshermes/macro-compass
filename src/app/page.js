import Link from 'next/link'

// Mock data — real API integration later
const marketKPIs = [
  { label: 'S&P 500', value: '5,892', change: '+0.8%', direction: 'up' },
  { label: 'DXY (Dollar)', value: '104.7', change: '-0.4%', direction: 'down' },
  { label: 'WTI Crude', value: '$68.34', change: '+1.2%', direction: 'up' },
  { label: 'Gold', value: '$3,542', change: '-0.3%', direction: 'down' },
]

const topCalls = [
  {
    rank: 1,
    signal: 'BUY',
    asset: 'Silver (SLV)',
    thesis: 'Central bank buying + solar demand creating historic undersupply. Rate cuts below accelerate price.',
    confidence: 'HIGH',
    horizon: '12-36mo'
  },
  {
    rank: 2,
    signal: 'BUY',
    asset: 'Uranium Miners (CCJ)',
    thesis: 'SMR buildout accelerates. Supply deficit widening while reactors stay online.',
    confidence: 'MED-HIGH',
    horizon: '18-60mo'
  },
  {
    rank: 3,
    signal: 'HOLD',
    asset: 'Gold (GLD)',
    thesis: 'Solid trend but crowded trade. Add on dips below $3,400.',
    confidence: 'MED',
    horizon: '6-18mo'
  },
  {
    rank: 4,
    signal: 'WATCH',
    asset: 'IPO Window (Q3-Q4)',
    thesis: 'Post-rate-cut window opens but pick winners carefully. Watch EDGAR S-1 filings.',
    confidence: 'MED',
    horizon: '6mo entry'
  },
]

const sectorSignals = [
  { name: 'Food & Water', signal: 'HOLD', sentiment: 5, topLine: 'Prices stable but no catalyst yet.' },
  { name: 'Energy', signal: 'WATCH', sentiment: 4, topLine: 'Capitulation selling may be near at $63.' },
  { name: 'Hard Assets', signal: 'BUY', sentiment: 8, topLine: 'Best risk/reward in metals. Silver leading.' },
  { name: 'IPO Pipeline', signal: 'WATCH', sentiment: 4, topLine: 'Window opens after rate cuts — timing uncertain.' },
  { name: 'Consumer/Apparel', signal: 'HOLD', sentiment: 5, topLine: 'Margins stabilizing but no clear winner.' },
  { name: 'Wellness/Leisure', signal: 'BUY', sentiment: 7, topLine: 'AI fatigue driving demand. Nootropics growing fast.' },
]

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Macro Compass</h1>
        <p className="text-slate-400">Daily macro intelligence. Actionable calls only.</p>
      </div>

      {/* Market Overview */}
      <section>
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Market Snapshot</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {marketKPIs.map(k => (
            <div key={k.label} className="bg-surface border border-border rounded-lg p-3">
              <p className="text-xs text-slate-500">{k.label}</p>
              <p className="text-xl font-bold text-white mt-1">{k.value}</p>
              <p className={`text-sm font-semibold mt-1 ${k.direction === 'up' ? 'text-green-400' : 'text-red-400'}`}>{k.change}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Calls */}
      <section className="bg-surface border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-1">Top Investment Calls</h2>
        <p className="text-slate-400 text-sm mb-5">Highest conviction signals across all sectors. Sorted by opportunity size.</p>

        <div className="space-y-3">
          {topCalls.map(call => (
            <div key={call.rank} className="flex items-start gap-4 p-4 border border-slate-700 rounded-lg hover:border-accent transition-colors">
              <div className="shrink-0 w-28 pt-1">
                <span className={`text-lg font-bold px-2 py-0.5 rounded text-sm ${
                  call.signal === 'BUY' ? 'bg-green-900/40 text-green-300' :
                  call.signal === 'SELL' ? 'bg-red-900/40 text-red-300' :
                  call.signal === 'HOLD' ? 'bg-yellow-900/40 text-yellow-300' :
                  'bg-slate-700/40 text-slate-400'
                }`}>{call.signal}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold">{call.asset}</p>
                <p className="text-sm text-slate-300 mt-1 leading-relaxed">{call.thesis}</p>
              </div>
              <div className="shrink-0 text-right min-w-[80px]">
                <p className="text-xs text-slate-500">HORIZON</p>
                <p className="text-sm text-white font-medium">{call.horizon}</p>
                <p className="text-xs text-slate-500 mt-1">CONFIDENCE</p>
                <p className="text-sm font-medium" style={{ color: call.confidence === 'HIGH' ? '#22c55e' : call.confidence === 'MED-HIGH' ? '#84cc16' : '#eab308' }}>{call.confidence}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sector Signals */}
      <section className="bg-surface border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-1">Sector Outlook</h2>
        <p className="text-slate-400 text-sm mb-5">One-line summary per sector. Click for details.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sectorSignals.map(s => (
            <a key={s.name} href="/synthesis" className="flex items-center gap-4 p-4 border border-slate-700 rounded-lg hover:border-accent transition-colors">
              <span className={`text-lg font-bold px-3 py-1 rounded text-sm shrink-0 ${
                s.signal === 'BUY' ? 'bg-green-900/40 text-green-300' :
                s.signal === 'SELL' ? 'bg-red-900/40 text-red-300' :
                s.signal === 'HOLD' ? 'bg-yellow-900/40 text-yellow-300' :
                'bg-slate-700/40 text-slate-400'
              }`}>{s.signal}</span>
              <div className="min-w-0">
                <p className="text-white font-semibold">{s.name}</p>
                <p className="text-sm text-slate-300 truncate">{s.topLine}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

    </div>
  )
}
