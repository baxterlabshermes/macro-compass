import Link from 'next/link'

// Simulated data - in production this would fetch from free APIs (yfinance, FRED, SEC EDGAR)
const commodities = [
  { name: 'Wheat (CBOT)', price: '$6.24/bu', change: '+3.8%', trend: 'up', driver: 'Drought in Black Sea region pushing prices higher' },
  { name: 'Corn (CBOT)', price: '$4.51/bu', change: '-1.2%', trend: 'down', driver: 'Bumper harvest in South America easing supply constraints' },
  { name: 'Soybeans (CBOT)', price: '$11.89/bu', change: '+5.4%', trend: 'up', driver: 'China tariff shifts + El Niño impact on planting cycles' },
  { name: 'PRICED Water Index', price: '1,247 pts', change: '+0.3%', trend: 'up', driver: 'Stable long-term thesis amid global water scarcity concerns' }
]

const equities = [
  { ticker: 'CCEP', name: 'Coca-Cola Consolidated', thesis: 'Water usage efficiency + pricing power on staple beverage demand' },
  { ticker: 'KGI', name: 'Agrium (Nutrien)', thesis: 'Fertilizer plays directly on crop price margins and global food security' },
  { ticker: 'ECC', name: 'Easton Water Co.', thesis: 'Municipal water infrastructure investment + AI-driven leakage detection' },
  { ticker: 'TSN', name: 'Tyson Foods', thesis: 'Vertical meat integration benefits from supply chain resilience plays' }
]

const macroDrivers = [
  ['Drought / Climate Events', 'HIGH impact on grain prices, moderate on water assets'],
  ['Geopolitical Tensions (Russia/Ukraine)', 'HIGH direct threat to wheat/export flows'],
  ['Global Population Demand +40% by 2050', 'Foundational long-term thesis across all food'],
  ['Water Privatization Trends', 'MEDIUM opportunity for municipal water infrastructure IPOs']
]

const sentiment = {
  shortTerm: -2, // -10 to +10
  longTerm: 8,
  summary: 'Short term volatility on harvest forecasts, but structural shortage thesis intact through 2031'
}

export default function FoodWaterPage() {
  const sentimentColor = (s) => s > 0 ? 'text-green-400' : s < 0 ? 'text-red-400' : 'text-yellow-400'
  
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* Section 1: Price Overview */}
      <section>
        <h2 className="text-xl font-bold text-white mb-2 border-b border-border pb-2 no-print">1. Current Prices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-force-print">
          {commodities.map((c, i) => (
            <div key={i} className="bg-surface border border-border rounded-lg p-4 flex justify-between items-center not-force-print hover:border-accent transition-colors">
              <div>
                <p className="text-white font-semibold text-lg">{c.name}</p>
                <p className="text-sm text-slate-400 mt-1">{c.driver}</p>
              </div>
              <div className="text-right">
                <p className={`text-xl font-bold ${c.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{c.price}</p>
                <p className={`text-sm font-semibold ${c.trend === 'up' ? 'text-success' : 'text-danger'} mt-1`}>
                  {c.change} <span className="text-slate-400 ml-1">{c.trend === 'up' ? '▲' : '▼'}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Macro Drivers */}
      <section className="bg-surface border border-border rounded-lg p-6 not-force-print">
        <h2 className="text-xl font-bold text-white mb-4">2. Macro Trend Analysis</h2>
        <div className="space-y-3 not-force-print">
          {macroDrivers.map((d, i) => (
            <div key={i} className="flex items-start gap-3 border-b border-border pb-2 last:border-0">
              <span className={`inline-flex px-2 py-1 rounded font-semibold min-w-max text-sm ${d[1].includes('HIGH') ? 'bg-red-900/30 text-red-400' : 'bg-yellow-900/30 text-yellow-400'}`}>
                {d[0]}
              </span>
              <p className="text-slate-300">{d[1]}</p>
            </div>
          ))}
        </div>

        {/* Sentiment Bar */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">Sentiment (Consulting Grade: -10 to +10)</h3>
          <div className="relative h-8 flex items-center not-force-print">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-500 z-10"></div>
            {/* Negative bar */}
            {sentiment.shortTerm < 0 && <div className="bg-red-800 h-full" style={{ width: `${Math.abs(sentiment.shortTerm) / 20 * 100}%` }} />}
            {/* Positive bar */}
            {sentiment.longTerm > 0 && <div className="bg-green-700 h-full ml-auto" style={{ width: `${sentiment.longTerm / 20 * 100}%`, marginLeft: 'auto' }} />}
          </div>
          
          <div className="flex justify-between mt-2 text-xs not-force-print">
            <span className="text-red-400 font-semibold">{sentimentColor(sentiment.shortTerm)} Short-term: {sentiment.shortTerm}</span>
            <span className="text-green-400 font-semibold">Long-term: {sentiment.longTerm} {sentimentColor(sentiment.longTerm)}</span>
          </div>
          
          <p className="mt-3 text-sm text-slate-300 italic leading-relaxed">{sentiment.summary}</p>
        </div>
      </section>

      {/* Section 3: Related Equities Drilldown */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4 border-b border-border pb-2">3. Key Equity Plays — Consultant Drilldown</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-force-print">
          {equities.map((e, i) => (
            <div key={i} className="bg-surface border border-border rounded-lg p-5 hover:border-accent transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-gold">{e.ticker}</span>
                <span className="text-xs text-slate-400 bg-surface px-2 py-1 rounded border border-border">Sector Allocation</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{e.name}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{e.thesis}</p>
              
              <div className="mt-4 not-force-print">
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
        <div className="space-y-2 not-force-print">
          <div className="flex justify-between items-center bg-green-900/30 border border-green-700 rounded p-3 px-4">
            <div>
              <p className="text-white font-semibold">Pure Water Technologies (pre-IPO)</p>
              <p className="text-sm text-slate-400">AI-powered desalination — IPO target Q1'27, underwriter: Goldman</p>
            </div>
            <span className="bg-green-600 text-white px-3 py-1 rounded font-semibold text-sm">High Upside</span>
          </div>
        </div>
      </section>

      {/* Section 5: Investment Strategy */}
      <section className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">5. Strategic Takeaways for Portfolio Construction</h2>
        
        <div className="space-y-4 not-force-print">
          <div className="flex gap-3">
            <span className="text-yellow-400 font-bold min-w-max">Core Thesis:</span>
            <p className="text-slate-300 leading-relaxed">Global water stress is a supply-demand mismatch creating structural price appreciation for utilities and desalination IPOs. The "you can't eat without water" thesis outperforms direct crop commodity exposure where margins are volatile.</p>
          </div>
          
          <div className="flex gap-3">
            <span className="text-yellow-400 font-bold min-w-max">Opportunity:</span>
            <p className="text-slate-300 leading-relaxed">IPO window for AI-water startups opens in 6-9 months. Track S-1 filings from current venture-backed firms (AquaBounty Technologies, Xylem IPO successors).</p>
          </div>
          
          <div className="flex gap-3">
            <span className="text-yellow-400 font-bold min-w-max">Action Now →</span>
            <ul className="text-slate-300 space-y-1 list-disc ml-4 leading-relaxed">
              <li>Allocate 8% of portfolio to PRICED + ECC water exposure</li>
              <li>Monitor soybean short squeezes on China import shifts in coming Q1'27</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Navigation buttons */}
      <div className="flex justify-between pt-4 border-t border-border">
        <Link href="/" className="text-accent hover:underline font-semibold no-print">← Home</Link>
        <Link href="/energy" className="text-accent hover:underline font-semibold">Next: Energy →</Link>
      </div>
    </div>
  )
}
