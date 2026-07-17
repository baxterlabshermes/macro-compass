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
    thesis: 'Central bank buying + solar demand creating historic undersupply that supply curves cannot fix short-term.',
    reasoning: `WHY: Central banks bought 1,084 tonnes in 2023 alone — the highest net purchase on record. Solar panel production has tripled since 2020 but silver mining output stays flat. Industrial demand outgrows new supply by 15M oz annually.

WHEN TO ACT: Add below $27/oz or on any pullback >8%. Rate cuts accelerate the deficit thesis.

RISK: Dollar reversal above DXY 108 would pressure prices, but structural deficit provides a floor.`,
    confidence: 'HIGH',
    horizon: '12-36mo'
  },
  {
    rank: 2,
    signal: 'BUY',
    asset: 'Uranium Miners (CCJ)',
    thesis: 'SMR buildout acceleration creates multi-year supply deficit with virtually no hedging.',
    reasoning: `WHY: 73 new reactors under construction globally (highest in 40 years). Supply from Kazatomprom is structurally constrained. Mining majors have consistently undersupplied for 15+ years — capex discipline means nobody built new mines in the boom cycle.

WHEN TO ACT: Dollar-cost average into $CCJ positions on weakness. IPO window (TerraPower successors) offers higher beta but higher risk entries.

RISK: Reactor safety incidents or policy reversals could pressure sentiment, though long-term energy security thesis remains intact.`,
    confidence: 'MED-HIGH',
    horizon: '18-60mo'
  },
  {
    rank: 3,
    signal: 'HOLD',
    asset: 'Gold (GLD)',
    thesis: 'Trend remains strong but crowded positioning demands patience for any new entries.',
    reasoning: `WHY: Gold has already moved $800 in the current cycle. The monetary debasement thesis is widely priced in, which historically precedes shorter-term consolidation phases below $3,400.

WHEN TO ACT: Add on dips toward $3,200-3,300 support or if real yields turn negative. Current levels are fair value for existing positions.

RISK: Fed pivot delays pushing DXY back above 108 could trigger a $200-300 pullback that would close the entry window for this cycle.`,
    confidence: 'MED',
    horizon: '6-18mo'
  },
  {
    rank: 4,
    signal: 'WATCH',
    asset: 'IPO Window (Q3-Q4)',
    thesis: 'Post-rate-cut window creates scarcity premium but requires disciplined pick-and-shovel approach.',
    reasoning: `WHY: When rates fall, IPO volumes typically surge 3x as companies rush windows. The last two quarters saw zero mega-IPOs — this backlog must clear. Quality S-1 filings in energy/water/biotech trade at premiums during scarcity windows.

WHEN TO ACT: Monitor EDGAR RSS for F-1/S-1 filings from pre-market leaders (fusion, SMR infrastructure, desalination). Enter within 30 days of pricing.

RISK: Overpaying on hype. Use sector benchmarks, not narrative, as valuation anchors. Avoid any IPO with revenue < $5M or multiple > 20x forward earnings.`,
    confidence: 'MED',
    horizon: '6mo entry'
  },
]

const sectorSignals = [
  { 
    name: 'Food & Water', 
    signal: 'HOLD', 
    sentiment: 5,
    summary: 'Prices stable but no catalyst yet.',
    reasoning: `Water infrastructure CapEx has been underinvested for a generation. Pricing power remains strong (agricultural pricing is inelastic) but near-term volatility from weather patterns creates entry windows on seasonal dips rather than momentum plays.` 
  },
  { 
    name: 'Energy', 
    signal: 'WATCH', 
    sentiment: 4,
    summary: 'Capitulation selling may be near at $63.',
    reasoning: `OPEC oversupply is temporary. US rig counts at a decade low means new supply cannot respond quickly enough to meet Q1/Q2 2027 demand growth. Dollar weakness below DXY 100 would act as secondary fuel for crude pricing.` 
  },
  { 
    name: 'Hard Assets', 
    signal: 'BUY', 
    sentiment: 8,
    summary: `Best risk/reward in metals. Silver leading the pack.`,
    reasoning: `The supply deficit is real (not thesis-driven) for 3 of 4 base industrial metals tracked. Central bank demand provides a bid floor that never disappears — they only sell when desperate. Rate cuts amplify the leverage effect on silver miners vs gold peers.` 
  },
  { 
    name: 'IPO Pipeline', 
    signal: 'WATCH', 
    sentiment: 4,
    summary: 'Window opens after rate cuts — timing uncertain.',
    reasoning: `The backlog of qualified IPO candidates is at a record high. When the window opens, expect both a volume spike (more offerings) AND a quality filter (investors will be selective). The last successful mega-IPO was 10+ months ago.` 
  },
  { 
    name: 'Consumer/Apparel', 
    signal: 'HOLD', 
    sentiment: 5,
    summary: 'Margins stabilizing but no clear winner yet.',
    reasoning: `Athleisure-to-everyday crossover is a durable trend but margin compression from tariff exposure offsets volume gains. Watch for off-price retailers (TJX, Ross) as the primary beneficiaries of consumer down-trading.` 
  },
  { 
    name: 'Wellness/Leisure', 
    signal: 'BUY', 
    sentiment: 7,
    summary: `AI fatigue driving demand. Nootropics growing fast.`,
    reasoning: `Cognitive fatigue from AI workplace integration is a real behavioral trend — nootropics market at 34%+ CAGR reflects genuine consumer demand, not speculation. This demographic shift (25-45yo professionals) has disposable income and is already spending.` 
  },
]

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: '#191c1f' }}>
      {/* Top Navigation */}
      <nav className="border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div>
            <span className="font-bold text-lg tracking-tight" style={{ fontWeight: 500 }}>Macro Compass</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="/" className={`text-sm no-underline`} style={{ color: '#fff', fontWeight: 500, letterSpacing: '0.1px' }}>Dashboard</a>
            <a href="/synthesis" className={`text-sm no-underline`} style={{ color: '#8d969e' }}>Synthesis</a>
            <div className="pill-lg pill-sm" style={{ background: '#2c3034', color: '#fff', fontWeight: 500, fontSize: '0.75rem', lineHeight: 1 }}>
              Live
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-10 pb-8">
        <h1 className="display-md text-5xl mb-3" style={{ fontWeight: 500 }}>Your macro edge.</h1>
        <p className="text-xl" style={{ color: '#8d969e' }}>Daily intelligence on where to position. Why it matters. What to watch.</p>
      </section>

      {/* KPI Strip */}
      <section className="max-w-6xl mx-auto px-6 pb-10">
        <div className="flex gap-3 overflow-x-auto no-scrollbar -ml-6 pr-6">
          {marketKPIs.map(kpi => (
            <div key={kpi.label} className="flex-shrink-0 card-surface p-4 min-w-[180px]">
              <p className="text-xs" style={{ color: '#8d969e', letterSpacing: '0.2px' }}>{kpi.label}</p>
              <p className="text-2xl font-semibold mt-1.5" style={{ fontWeight: 500 }}>{kpi.value}</p>
              <p className={`text-sm font-medium mt-1 ${kpi.direction === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>{kpi.change}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-3xl mx-auto px-6">
        
        {/* Signals Header */}
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="display-md text-3xl" style={{ fontWeight: 500, letterSpacing: '-0.48px' }}>Top Signals</h2>
          <span className="text-sm" style={{ color: '#8d969e' }}>Sorted by conviction</span>
        </div>

        {/* Signal Cards */}
        <div className="space-y-4">
          {topCalls.map((call, i) => (
            <CallCard key={call.rank + call.asset} call={call} index={i} />
          ))}
        </div>

        {/* Sector Section Header */}
        <div className="flex items-baseline justify-between mb-6 mt-14">
          <h2 className="display-md text-3xl" style={{ fontWeight: 500, letterSpacing: '-0.48px' }}>Sector Outlook</h2>
        </div>

        {/* Sector Cards */}
        <div className="space-y-3">
          {sectorSignals.map((s) => (
            <a href="/synthesis" key={s.name} className="block card-surface p-5 transition-colors hover:brightness(1.1)">
              <div className="flex items-center justify-between mb-3">
                <span className={`pill-sm font-medium ${
                  s.signal === 'BUY' ? 'text-emerald-400' : s.signal === 'SELL' ? 'text-red-400' : s.signal === 'HOLD' ? 'text-yellow-400' : 'text-slate-400'
                }`} style={{ color: s.signal === 'BUY' ? '#00a87e' : s.signal === 'SELL' ? '#e23b4a' : s.signal === 'HOLD' ? '#f59e0b' : '#8d969e' }}>
                  {s.signal}
                </span>
                <span className="text-sm font-semibold" style={{ fontWeight: 500 }}>{s.name}</span>
              </div>
              <p className="text-sm mb-3" style={{ color: '#8d969e' }}>{s.summary}</p>
              {/* Expandable reasoning */}
              <div className="overflow-hidden transition-[max-height] duration-300">
                <DetailsToggle content={s.reasoning} />
              </div>
            </a>
          ))}
        </div>

      </section>
    </div>
  )
}

// Individual call card component
function CallCard({ call, index }) {
  const signalColor = {
    BUY: '#00a87e',
    SELL: '#e23b4a',
    HOLD: '#f59e0b',
    WATCH: '#8d969e'
  }[call.signal] || '#8d969e';

  return (
    <div className="card-surface p-6">
      {/* Top row: rank + signal + asset */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold" style={{ color: 'rgba(255,255,255,0.15)' }} style={{ fontWeight: 500 }}>#{call.rank}</span>
          <span 
            className="pill-sm font-bold" 
            style={{ background: signalColor + '15', color: signalColor }}
          >
            {call.signal}
          </span>
          <span className="font-semibold text-lg" style={{ fontWeight: 500 }}>{call.asset}</span>
        </div>
        <div className="text-right">
          <p className="text-xs" style={{ color: '#8d969e', letterSpacing: '0.2px' }}>HORIZON</p>
          <p className="text-sm font-medium mt-0.5" style={{ fontWeight: 500 }}>{call.horizon}</p>
        </div>
      </div>

      {/* Thesis */}
      <p className="text-sm mb-4 leading-relaxed" style={{ color: '#c9c9cd' }}>{call.thesis}</p>
      
      {/* Reasoning - expandable */}
      <DetailsToggle content={call.reasoning} />
    </div>
  )
}

// Expandable/contractible details component
function DetailsToggle({ content }) {
  return (
    <details className="group">
      <summary 
        className="text-sm cursor-pointer flex items-center gap-1 select-none"
        style={{ color: '#8d969e' }}
      >
        Show reasoning
        <span 
          className="transition-transform duration-200 inline-block group-open:rotate-90"
          style={{ fontSize: '0.65rem' }}
        >
          ▸
        </span>
      </summary>
      <div className="mt-3 p-4 rounded-lg" style={{ background: '#2c3034', color: '#c9c9cd', lineHeight: 1.7, fontSize: '0.85rem' }}>
        {content.split('\n').map((line, i) => (
          <p key={i} className={`mb-2 last:mb-0 ${line.startsWith('WHY:') || line.startsWith('WHEN:') || line.startsWith('RISK:') ? 'font-semibold text-white mt-3' : ''}`}>
            {line.trim()}
          </p>
        ))}
      </div>
    </details>
  )
}
