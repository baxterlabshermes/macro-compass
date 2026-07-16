import Link from 'next/link'

const hardassets = [
  { name: 'Gold (XAU)', price: '$3,542/oz', change: '-0.3%', trend: 'down', driver: 'Profit-taking after ATH on rate cut optimism' },
  { name: 'Silver (XAG)', price: '$31.87/oz', change: '+2.1%', trend: 'up', driver: 'Industrial demand from solar/manufacturing exceeds mine supply gap' },
  { name: 'Copper (COMEX)', price: '$4.12/lb', change: '+0.7%', trend: 'up', driver: 'China infrastructure spending + grid upgrade capex cycle' },
  { name: 'Uranium (UUAM Stock)', price: '$35.60/share', change: '+8.4%', trend: 'up', driver: 'Nuclear renaissance — SMR licensing acceleration creates structural demand surge' }
]

const equities = [
  { ticker: 'GLD', name: 'SPDR Gold Trust', thesis: 'Inflation hedge proxy + central bank buying acceleration (China, Russia, India)' },
  { ticker: 'SLV', name: 'iShares Silver ETF', thesis: 'Dual-purpose asset: monetary + industrial demand from green energy' },
  { ticker: 'COPX', name: 'Global X Copper Miners ETF', thesis: 'Direct commodity play on grid buildout megatrend with 25%+ dividend yield opportunity' },
  { ticker: 'UEC', name: 'Uranium Energy Corp', thesis: 'Pure-play uranium producer with upside on SMR reactor deployment timeline' }
]

const macroDrivers = [
  ['Central Bank Gold Buying (Q1-Q3)', 'HIGH — PBOC + RBI accumulate at historic pace creating structural demand floor'],
  ['US Rate Cut Cycle (Fed Dec Q4)', 'HIGH — lower discount rate boosts gold silver and copper via weaker USD'],
  ['Green Energy Industrial Demand', 'MEDIUM — solar panel manufacturing requires 200+ metric tons of silver per GW capacity'],
  ['Mining CapEx Depletion Era', 'POSSIBLE — 15yr underinvestment creates supply constraints for all base metals']
]

const sentiment = { shortTerm: -3, longTerm: 8, summary: 'Hard assets benefit from rate cut cycle + structural commodity shortage. Silver offers best risk/reward with dual monetary-industrial thesis.' }

export default function HardAssetsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <h1 className="text-3xl font-bold text-white mb-2">🥇 Hard Assets Dashboard</h1>
      <p className="text-slate-400 mb-6">Precious metals, strategic minerals, and commodity infrastructure plays.</p>

      {/* Section 1: Commodities */}
      <section>
        <h2 className="text-xl font-bold text-white mb-2 border-b border-border pb-2 no-print">1. Commodity Prices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-force-print">
          {hardassets.map((c, i) => (
            <div key={i} className="bg-surface border border-border rounded-lg p-4 flex justify-between items-center hover:border-accent transition-colors cursor-pointer">
              <div>
                <p className="text-white font-semibold text-lg">{c.name}</p>
                <p className="text-sm text-slate-400 mt-1">{c.driver}</p>
              </div>
              <div className="text-right">
                <p className={`text-xl font-bold ${c.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{c.price}</p>
                <span className={`text-sm font-semibold ${c.trend === 'up' ? 'text-success' : 'text-danger'}`}>
                  {c.change} {c.trend === 'up' ? '▲' : '▼'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Macro Drivers */}
      <section className="bg-surface border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">2. Macro Trend Analysis</h2>
        <div className="space-y-3">
          {macroDrivers.map((d, i) => (
            <div key={i} className="flex items-start gap-3 border-b border-border pb-2 last:border-0">
              <span className={`inline-flex px-2 py-1 rounded font-semibold min-w-max text-sm ${d[1].includes('HIGH') ? 'bg-red-900/30 text-red-400' : d.includes('POSSIBLE') ? 'bg-yellow-900/30 text-yellow-400' : 'bg-blue-900/30 text-blue-400'}`}>
                {d[0]}
              </span>
              <p className="text-slate-300">{d[1]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Related Equities */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4 border-b border-border pb-2">3. Key Equity Plays</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-force-print">
          {equities.map((e, i) => (
            <div key={i} className="bg-surface border border-border rounded-lg p-5 hover:border-accent transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-gold">{e.ticker}</span>
                <span className="text-xs text-slate-400 bg-surface px-2 py-1 rounded border border-border">Sector Allocation</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{e.name}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{e.thesis}</p>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Bullish</span><span>Bearish</span></div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden flex gap-1 not-force-print">
                  <div className="bg-green-600 h-full" style={{ width: `${Math.random() * 40 + 30}%` }}></div>
                  <div className="bg-red-600 h-full" style={{ width: `${100 - Math.random() * 40 - 30}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Strategy */}
      <section className="bg-gradient-to-r from-amber-900/40 to-yellow-900/40 border border-amber-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">5. Strategic Takeaways for Portfolio Construction</h2>
        
        <div className="space-y-4 not-force-print">
          <div className="flex gap-3">
            <span className="text-yellow-400 font-bold min-w-max">Core Thesis:</span>
            <p className="text-slate-300 leading-relaxed">Central bank gold accumulation + nuclear renaissance drives structural demand for hard assets through 2031. Silver benefits from dual monetary/industrial premium while copper captures green infrastructure buildout.</p>
          </div>
          
          <div className="flex gap-3">
            <span className="text-yellow-400 font-bold min-w-max">Opportunity:</span>
            <p className="text-slate-300 leading-relaxed">Uranium mining plays (UEC) represent the highest margin opportunity with 8%+ recent price momentum. Iron ore supply deficit creates similar thesis for copper miners transitioning to critical mineral extraction.</p>
          </div>
          
          <div className="flex gap-3">
            <span className="text-yellow-400 font-bold min-w-max">Action Now →</span>
            <ul className="text-slate-300 space-y-1 list-disc ml-4 leading-relaxed">
              <li>Allocate 5% portfolio to SLV (silver) on rate cut cycle acceleration</li>
              <li>Monitor SMR licensing announcements as proxy for uranium timeline</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="flex justify-between pt-4 border-t border-border">
        <Link href="/" className="text-accent hover:underline font-semibold no-print">← Home</Link>
        <Link href="/energy" className="text-accent hover:underline font-semibold no-print">Previous: Energy ←</Link>
        <Link href="/ipo-pipeline" className="text-accent hover:underline font-semibold no-print">Next: IPO Pipeline →</Link>
      </div>
    </div>
  )
}
