import Link from 'next/link'

const ipos = [
  { name: 'Helion Energy', sector: 'Energy / Fusion', stage: 'Pre-IPO (Q4 Q5, target IPO)', oppScore: 9, summary: 'Compact fusion reactor with Microsoft partnership. SEC filing window opens late 2026.' },
  { name: 'Pure Water Tech', sector: 'Water Infrastructure', stage: 'Series C -> Pre-IPO', oppScore: 8, summary: 'AI desalination startup targeting municipal contracts at scale.' },
  { name: 'AquaBounty Foods', sector: 'Food / Biotech', stage: 'Post-IPO (active)', oppScore: 6, summary: 'Modified salmon company with gene-edited growth acceleration. Monitor for reverse split risk.' },
  { name: 'TerraPower Grid Solutions', sector: 'Energy / Nuclear', stage: 'Pre-IPO (rumored Q1 Q5)', oppScore: 7, summary: 'Billion-backed SMR infrastructure subsidiary tracking nuclear licensing timeline.' }
]

const recentIpos = [
  { name: 'DebtKite', status: 'Up +42%', category: 'Fintech IPO' },
  { name: 'Aurora Innovation', status: 'Vol +18%', category: 'EV Tech IPO (Q3)' },
  { name: 'Reliance Global', status: 'Up +12%', category: 'Clean Energy IPO' }
]

export default function IppoPipelinePage() {
  const oppColor = (s) => s >= 8 ? 'text-green-400' : s >= 5 ? 'text-yellow-400' : 'text-slate-400'
  
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <h1 className="text-3xl font-bold text-white mb-2">🏭 IPO Pipeline</h1>
      <p className="text-slate-400 mb-6">Pre-IPO opportunities and recent performance tracked for Macro Compass cross-sector analysis.</p>

      {/* Section 1: Pre-IPO Watchlist */}
      <section>
        <h2 className="text-xl font-bold text-white mb-2 border-b border-border pb-2 no-print">1. Active Pre-IPO Targets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-force-print">
          {ipos.map((ipo, i) => (
            <div key={i} className="bg-surface border border-border rounded-lg p-5 hover:border-accent transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-slate-400 uppercase tracking-wide">{ipo.sector}</span>
                <span className={`${oppColor(ipo.oppScore)} font-bold text-lg`}>Opp Score: {ipo.oppScore}/10</span>
              </div>
              <h3 className="text-lg font-bold text-white">{ipo.name}</h3>
              <p className="text-sm text-gold italic mb-2">{ipo.stage}</p>
              <p className="text-sm text-slate-400 leading-relaxed">{ipo.summary}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Recently Completed IPOs */}
      <section>
        <h2 className="text-xl font-bold text-white mb-2 border-b border-border pb-2 no-print">2. Recent Completed IPOs — Performance Tracker</h2>
        <div className="bg-surface border border-border rounded-lg overflow-hidden not-force-print">
          {recentIpos.map((ipo, i) => (
            <div key={i} className={`p-4 flex justify-between items-center ${i > 0 ? 'border-t border-border' : ''}`}>
              <div>
                <p className="text-white font-semibold">{ipo.name}</p>
                <p className="text-xs text-slate-400">{ipo.category}</p>
              </div>
              <span className={ipo.status.startsWith('Up') || ipo.status.includes('+') ? 'text-green-400 font-bold' : 'text-yellow-400 font-bold'}>
                {ipo.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Macro Drivers */}
      <section className="bg-surface border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">3. IPO Market Macro Analysis</h2>
        <div className="space-y-3 not-force-print">
          {[
            ['SEC Registration Backlog', 'HIGH — average 18-month wait for S-1 approval in 2026 creates scarcity premium'],
            ['Fed Rate Cuts + IPO Windows Open', 'CRITICAL — lower rates = lower discount rate = higher valuation multiples during IPO'],
            ['Lockup Expirations (Q4 Q1)', 'RISK SIGNAL — ~20 companies facing lockup exp in next quarter creates sell pressure headwinds']
          ].map((d, i) => (
            <div key={i} className="flex gap-3 border-b border-border pb-2 last:border-0">
              <span className={`inline-flex px-2 py-1 rounded font-semibold min-w-max text-sm ${d.includes('CRITICAL') ? 'bg-red-700/50 text-red-400' : d.includes('HIGH') ? 'bg-orange-900/30 text-orange-400' : 'bg-yellow-900/30 text-yellow-400'}`}>
                {d[0]}
              </span>
              <p className="text-slate-300">{d[1]}</p>
            </div>
          ))}
        </div>
        
        {/* IPO Sentiment */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">IPO Market Sentiment (Consulting Grade: -10 to +10)</h3>
          <div className="relative h-8 flex items-center not-force-print mt-2">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-500 z-10"></div>
            <div className="bg-green-700 h-full ml-auto" style={{ width: '60%', marginLeft: 'calc(50% + 1px)' }}></div>
          </div>
          <p className="mt-3 text-sm text-slate-300 italic leading-relaxed">IPO window opening with Q1-Q4 rate cuts creating favorable entry conditions for high-growth pre-IPO companies targeting 2027 launch.</p>
        </div>
      </section>

      {/* Section 4: Strategy */}
      <section className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">5. Strategic Takeaways for Portfolio Construction</h2>
        
        <div className="space-y-4 not-force-print">
          <div className="flex gap-3">
            <span className="text-yellow-400 font-bold min-w-max">Core Thesis:</span>
            <p className="text-slate-300 leading-relaxed">The post-rate-cut environment + IPO backlog creates a supply-constrained premium for pre-IPO companies in food/water and energy sectors. The best entry point is tracking SEC S-1 filings 6-9 months before expected IPO dates.</p>
          </div>
          
          <div className="flex gap-3">
            <span className="text-yellow-400 font-bold min-w-max">Action Now →</span>
            <ul className="text-slate-300 space-y-1 list-disc ml-4 leading-relaxed">
              <li>Set SEC EDGAR RSS alerts for 'fusion', 'desalination', and 'nuclear' in form S-1 filings</li>
              <li>Prepare capital allocation of 10% to pre-IPO watchlist companies entering public markets by mid-2027</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="flex justify-between pt-4 border-t border-border">
        <Link href="/" className="text-accent hover:underline font-semibold no-print">← Home</Link>
        <Link href="/hard-assets" className="text-accent hover:underline font-semibold no-print">Previous: Hard Assets ←</Link>
        <a href="/consumer-apparel" className="text-accent hover:underline font-semibold no-print">Next: Consumer & Apparel →</a>
      </div>
    </div>
  )
}
