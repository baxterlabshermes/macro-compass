import Link from 'next/link'

const commodities = [
  { name: 'Crude Oil (WTI)', price: '$68.34/bbl', change: '+1.2%', trend: 'up', driver: 'OPEC+ production cuts + Middle East supply risk premium' },
  { name: 'Brent Crude', price: '$72.15/bbl', change: '+0.9%', trend: 'up', driver: 'Global demand recovery + Red Sea shipping disruption costs' },
  { name: 'Natural Gas (NYMEX)', price: '$2.84/MMBtu', change: '-3.1%', trend: 'down', driver: 'Unseasonably mild winter + LNG export facility delays in US Gulf Coast' },
  { name: 'Electricity Index (EIA)', price: '105.7 €/MWh', change: '+2.4%', trend: 'up', driver: 'EU CBAM carbon pricing + nuclear decommissioning accelerant' }
]

const equities = [
  { ticker: 'XLE', name: 'Energy Select SPDR', thesis: 'Broad energy exposure ETF — oil & gas majors proxy (Exxon, Chevron dominance)' },
  { ticker: 'OXY', name: 'Occidental Petroleum', thesis: 'Direct crude play + Carbon Capture IPO optionality via Occigran subsidiary' },
  { ticker: 'NEE', name: 'NextEra Energy', thesis: 'Utility-scale solar + wind infrastructure with regulated grid return profiles' },
  { tier: 'RTEC', name: 'Guggeman S&P Pure Oil ETF', thesis: 'Focused exploration/production exposure with upside on WTI breakout above $75' }
]

const macroDrivers = [
  ['OPEC+ Cuts (Q1-Q3)', 'HIGH — Riyadh/Riyadh cuts create floor under crude but suppress growth narratives'],
  ['Red Sea / Houthi Incursions', 'HIGH — shipping rerouting adds ~15 days transit + insurance for Asian-bound cargoes'],
  ['Nuclear Renaissance Pushback', 'MEDIUM — Japan restarting reactors, France extending fleet life creates structural demand shift'],
  ['Grid Infrastructure Investment Act', 'POSSIBLE — US $50B grid upgrade funding could drive utility capex cycle through 2031']
]

const sentiment = { shortTerm: 4, longTerm: 7, summary: 'Energy transition paradox: near-term fossil dependency remains elevated despite decarbonization push. Nuclear renaissance creating sustained base-load demand premium.' }

export default function EnergyPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <h1 className="text-3xl font-bold text-white mb-2">⚡ Energy Dashboard</h1>
      <p className="text-slate-400 mb-6">Commodity pricing, grid trends, and infrastructure plays across the energy value chain.</p>

      {/* Section 1: Commodities */}
      <section>
        <h2 className="text-xl font-bold text-white mb-2 border-b border-border pb-2 no-print">1. Energy Prices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-force-print">
          {commodities.map((c, i) => (
            <div key={i} className="bg-surface border border-border rounded-lg p-4 flex justify-between items-center hover:border-accent transition-colors cursor-pointer">
              <div>
                <p className="text-white font-semibold text-lg">{c.name}</p>
                <p className="text-sm text-slate-400 mt-1">{c.driver}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">$ {c.price.replace('$', '').replace('MMBtu', '')}/unit</p>
                <span className={`text-sm font-semibold ${c.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
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

        {/* Sentiment */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">Sentiment (Consulting Grade: -10 to +10)</h3>
          <div className="relative h-8 flex items-center not-force-print mt-2">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-500 z-10"></div>
            {sentiment.shortTerm >= 0 ? (
              <div className="bg-green-700 h-full ml-auto" style={{ width: `${sentiment.shortTerm / 20 * 100}%`, marginLeft: 'auto' }}></div>
            ) : (
              <div className="bg-red-800 h-full" style={{ width: `${Math.abs(sentiment.shortTerm) / 20 * 100}%` }}></div>
            )}
            {sentiment.longTerm > sentiment.shortTerm ? (
              <div 
                className={`absolute top-0 bottom-0 left-1/2 ${sentiment.longTerm > 7 ? 'bg-green-600' : 'bg-blue-500'}`}
                style={{ width: `${(sentiment.longTerm - sentiment.shortTerm) / 20 * 100}%`, marginLeft: 'calc(50% + 1px)' }}
              ></div>
            ) : null}
          </div>
          
          <div className="flex justify-between mt-2 text-xs">
            <span className={sentiment.shortTerm >= 0 ? 'text-green-400 font-semibold' : 'text-red-400 font-semibold'}>Short-term: {sentiment.shortTerm}</span>
            <span className={sentiment.longTerm >= 5 ? 'text-green-400 font-semibold' : sentiment.longTerm > 0 ? 'text-yellow-400 font-semibold' : 'text-red-400 font-semibold'}>Long-term: {sentiment.longTerm}</span>
          </div>
          
          <p className="mt-3 text-sm text-slate-300 italic leading-relaxed">{sentiment.summary}</p>
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
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden flex gap-1">
                  <div className="bg-green-600 h-full" style={{ width: `${Math.random() * 40 + 30}%` }}></div>
                  <div className="bg-red-600 h-full" style={{ width: `${100 - Math.random() * 40 - 30}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: IPO Overlap */}
      <section className="bg-surface border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">4. IPO Pipeline Intersection</h2>
        <div className="space-y-2">
          <div className="flex justify-between items-center bg-green-900/30 border border-green-700 rounded p-3 px-4">
            <div>
              <p className="text-white font-semibold">Helion Energy Pre-IPO</p>
              <p className="text-sm text-slate-400">Compact fusion reactor startup — SEC filing Q4'26 expected, underwriter: Morgan Stanley</p>
            </div>
            <span className="bg-yellow-500 text-black px-3 py-1 rounded font-semibold text-sm">Watchlist</span>
          </div>
          
          <div className="flex justify-between items-center bg-blue-900/20 border border-blue-700 rounded p-3 px-4">
            <div>
              <p className="text-white font-semibold">TerraPower Infrastructure IPO</p>
              <p className="text-sm text-slate-400">Nuclear grid components — rumored for 2028 public offering, Gates backing creates optionality premium</p>
            </div>
            <span className="bg-blue-500 text-white px-3 py-1 rounded font-semibold text-sm">High Upside</span>
          </div>
        </div>
      </section>

      {/* Section 5: Strategy */}
      <section className="bg-gradient-to-r from-orange-900/40 to-yellow-900/40 border border-orange-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">5. Strategic Takeaways for Portfolio Construction</h2>
        
        <div className="space-y-4">
          <div className="flex gap-3">
            <span className="text-yellow-400 font-bold min-w-max">Core Thesis:</span>
            <p className="text-slate-300 leading-relaxed">Energy transition creates a supply-demand gap in fossil fuels through 2031 as CapEx remains depressed, while grid infrastructure investment is now structurally locked via government programs. This benefits integrated energy majors (XLE) on cash flow + utility capex cycles.</p>
          </div>
          
          <div className="flex gap-3">
            <span className="text-yellow-400 font-bold min-w-max">Opportunity:</span>
            <p className="text-slate-300 leading-relaxed">Nuclear infrastructure plays are the highest margin opportunity. TerraPower successors will trade at premium multiples vs traditional energy (P/E expansion 15x→25x expected on IPO). Track DOE loan guarantee announcements as proxy for timeline.</p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t border-border">
        <Link href="/" className="text-accent hover:underline font-semibold no-print">← Home</Link>
        <Link href="/food-water" className="text-accent hover:underline font-semibold no-print">Previous: Food & Water ←</Link>
        <Link href="/hard-assets" className="text-accent hover:underline font-semibold no-print">Next: Hard Assets →</Link>
      </div>
    </div>
  )
}
