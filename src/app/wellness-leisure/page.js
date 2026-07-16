import Link from 'next/link'

const wellbeing = [
  { name: 'Nootropic Supplements Market', value: '+34% CAGR', status: 'accelerating', note: 'Lions Mane, Ashwagandha, adaptogen demand surge in AI-work anxiety demographic' },
  { name: 'Mental Health App Subscribers', value: '$8.1B market', status: 'accelerating', note: 'BetterHelp, Calm growth accelerating with remote work stress factor at record levels' },
  { name: 'Fitness Tracker Wearables', value: '+12% YoY', status: 'steady', note: 'Apple Watch + Garmin dominance creates margin pressure on tier-2 brands' },
  { name: 'Sleep Optimization Tech', value: '$5.4B market', status: 'accelerating', note: 'Whoop + Oura + Eight Sleep creating new premium category with recurring revenue models' }
]

const equities = [
  { ticker: 'MDLZ', name: 'Mondelez Intl', thesis: 'Wellness snacking shift from confection to functional. KODK spinoff opportunity tracking.' },
  { ticker: 'ELV', name: 'Elevance (CVS Health)', thesis: 'Healthcare services consolidation play + mental health platform expansion' },
  { ticker: 'HOOD', name: 'Robinhood Markets', thesis: 'Retail investor engagement proxy for wellness app monetization via gamified finance' },
  { ticker: 'LULU', name: 'Lululemon', thesis: 'Performance athleisure brand bridging fitness + lifestyle apparel with 72% gross margins' }
]

const drivers = [
  ['AI Burnout Epidemic', 'HIGH — cognitive fatigue driving nootropic supplement demand (+34% YoY)'],
  ['Preventive Healthcare Mandates', 'MEDIUM — corporate wellness tax incentives creating structural B2B demand'],
  ['Wearable Tech Integration', 'POSSIBLE — sleep tracking becoming third wave after step counting']
]

export default function WellnessLeisurePage() {
  
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <h1 className="text-3xl font-bold text-white mb-2">🐎 Wellness & Leisure Dashboard</h1>
      <p className="text-slate-400 mb-6">Mental health, fitness technology, and leisure spending trends for the post-pandemic economy.</p>

      <section className="bg-surface border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">1. Industry Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-force-print">
          {wellbeing.map((item, i) => (
            <div key={i} className={`border-l-4 pb-3 ${item.status==='accelerating'?'border-green-500':'border-blue-500'}`}>
              <p className="text-white font-semibold">{item.name}</p>
              <span className={`inline-block px-2 py-0.5 rounded text-xs mt-1 ${item.status==='accelerating'?'bg-green-900/40 text-green-300':'bg-slate-700 text-slate-300'}`}>{item.status}</span>
              <p className="text-lg font-bold text-gold mt-1">{item.value}</p>
              <p className="text-xs text-slate-400 mt-1">{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">2. Macro Drivers</h2>
        {drivers.map((d, i) => (
          <div key={i} className="flex gap-3 items-center border-b border-border pb-2 last:border-0 not-force-print">
            <span className={`px-2 py-1 rounded font-semibold min-w-max text-sm ${d.includes('HIGH')?'bg-red-900/30 text-red-400':d.includes('MEDIUM')?'bg-yellow-900/30 text-yellow-400':'bg-blue-900/20 text-blue-400'}`}>{d[0]}</span>
            <p className="text-slate-300">{d[1]}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4 border-b border-border pb-2">3. Equity Plays</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-force-print">
          {[
            ['ESNT', 'EssilorLuxottica (EQT)', 'Vision + eyewear monopoly with insurance distribution advantage'],
            ['MDIA', 'Mediaco Holdings', 'Digital health media play leveraging wellness content IP for pharma placements'],
            ['PFG-Classic Fitness ETF', 'Proxy for gym equipment, supplements, and wearable hardware exposure'],
            ['AMZN', "Amazon (Whole Foods)", 'Functional food + supplement e-commerce dominance with Prime delivery advantage']
          ].map((e, i) => (
            <div key={i} className="bg-surface border border-border rounded-lg p-4 hover:border-accent transition-colors cursor-pointer">
              <span className="text-gold font-bold">{e[0]}</span>
              <p className="text-slate-300 text-sm mt-1">{e[2]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-fuchsia-900/40 to-pink-900/40 border border-fuchsia-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">5. Strategic Takeaways for Portfolio Construction</h2>
        <div className="space-y-3 not-force-print">
          <p className="text-slate-300 leading-relaxed"><strong className="text-gold">Core thesis:</strong> The AI era creates unprecedented cognitive fatigue demand — nootropics, sleep tech, and mental health platforms are structurally expanding with 34%+ CAGR, outperforming traditional wellness ETFs.</p>
          <p className="text-slate-300 leading-relaxed"><strong className="text-gold">Opportunity:</strong> Wearable-to-AI-healthcare integration is the next moat — Whoop & Oura data moats are defensible. Pre-IPO target: Dreem (acoustic sleep tech) rumored for late 2027.</p>
        </div>
      </section>

      <div className="flex justify-between pt-4 border-t border-border">
        <Link href="/" className="text-accent hover:underline font-semibold no-print">← Home</Link>
        <a href="/consumer-apparel" className="text-accent hover:underline font-semibold no-print">Previous: Consumer & Apparel ←</a>
        <a href="/synthesis" className="text-accent hover:underline font-semibold no-print">Next: Synthesis & Strategy →</a>
      </div>
    </div>
  )
}
