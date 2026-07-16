'use client'

const cards = [
  { title: '🌾 Food & Water', icon: '#22c55e', page: '/food-water', desc: 'Wheat, corn, soybeans, fertilizers, water utilities', metric: 'Global crop prices +4.2% YoY' },
  { title: '⚡ Energy', icon: '#eab308', page: '/energy', desc: 'Oil, natural gas, grid, power, rare earths', metric: 'Energy costs driving inflation 1.8pts' },
  { title: '🥇 Hard Assets', icon: '#f59e0b', page: '/hard-assets', desc: 'Gold, silver, copper, uranium hedging plays', metric: 'Gold hits ATH on rate cut expectations' },
  { title: '🏭 IPO Pipeline', icon: '#6366f1', page: '/ipo-pipeline', desc: 'New S-1 filings, lockup expirations, underwriter quality', metric: '42 IPOs filed in last quarter' },
  { title: '👗 Consumer & Apparel', icon: '#ec4899', page: '\consumer', desc: 'WTO (wheat flour), apparel, lifestyle brands', metric: 'Apparel sector margin pressure easing' },
  { title: '🐎 Wellness & Leisure', icon: '#a78bfa', page: '/wellness', desc: 'Supplements, biotech, mental health tech', metric: 'Wellness sector +12% YoY growth' },
  { title: '📊 Synthesis', icon: '#3b82f6', page: '/synthesis', desc: 'Top strategies, correlations, risk flags', metric: 'See bottom-line summary' }
]

export default function Home() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">Macro Compass</h1>
        <p className="text-slate-400 text-lg">Global commodity, equity & IPO investment intelligence — updated daily.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 no-print">
        {[
          { label: 'S&P 500', value: '5,892.43', change: '+0.8%', up: true },
          { label: 'DXY (Dollar Index)', value: '104.72', change: '-0.4%', up: false },
          { label: 'Crude Oil WTI', value: '$68.34/bbl', change: '+1.2%', up: true },
          { label: 'Gold Spot', value: '$3,542/oz', change: '-0.3%', up: false }
        ].map(k => (
          <div key={k.label} className="bg-surface border border-border rounded-lg p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">{k.label}</p>
            <p className="text-xl font-bold text-white">{k.value}</p>
            <span className={`text-sm ${k.up ? 'text-success' : 'text-danger'} font-semibold`}>{k.change}</span>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-white mb-6">Investment Dashboard — Select a Sector</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map(c => (
          <a key={c.page} href={c.page}
             className="block group cursor-pointer transform hover:scale-[1.02] transition-transform duration-300"
             style={{ display: 'flex', alignItems: 'stretch' }}>
            <div className="bg-surface border border-border rounded-xl p-6 w-full hover:border-accent transition-colors relative overflow-hidden">
              <div className="w-14 h-14 rounded-lg mb-4 flex items-center justify-center text-3xl" style={{ backgroundColor: c.icon + '20', color: c.icon }}>{c.title.split(' ')[0]}</div>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-accent">{c.title.slice(2)}</h3>
              <p className="text-sm text-slate-400 mb-3">{c.desc}</p>
              <p className="text-xs text-gold font-semibold bg-yellow-900/20 inline-block px-2 py-1 rounded border border-yellow-700/30">▶ {c.metric}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-12 bg-surface border border-border rounded-xl p-8 max-w-4xl mx-auto no-print">
        <h3 className="text-lg font-semibold text-white mb-2">💡 How to Use This Dashboard</h3>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Each tab provides a consultant-style drilldown with live price data, macro trend analysis, 
          related equities, IPO overlap, and sentiment. Tap any card above to explore. 
          The <a href="/synthesis" className="text-accent hover:underline font-medium">Synthesis & Strategy</a> tab combines all sectors into actionable thesis statements for the 2026–2031 horizon.
        </p>
      </div>
    </div>
  )
}
