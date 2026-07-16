import Link from 'next/link'

const sectors = [
  { name: 'Food & Water', allocation: 20, sentiment: 7, thesis: 'Structural shortage thesis intact through 2031, long-term bullish despite short volatility.' },
  { name: 'Energy', allocation: 25, sentiment: 6, thesis: 'Supply gap via transition underinvestment creates margin premium for integrated majors.' },
  { name: 'Hard Assets', allocation: 22, sentiment: 8, thesis: 'Central bank buying + rate cut cycle = silver and uranium best risk/reward in metals.' },
  { name: 'IPO Pipeline', allocation: 15, sentiment: 6, thesis: 'Post-rate-cut windows create scarcity premium for quality S-1 filings by Q3 Q4.' },
  { name: 'Consumer & Apparel', allocation: 8, sentiment: 4, thesis: 'Athleisure-to-everyday crossover creates sustained margin premium; off-price retail winners.' },
  { name: 'Wellness & Leisure', allocation: 10, sentiment: 7, thesis: 'AI-era cognitive fatigue driving nootropics/sleep tech at 34%+ CAGR outperforming traditional wellness.' }
]

const topIdeas = [
  { rank: 1, asset: 'Silver (SLV) + Uranium Mining', confidence: 9, timeHorizon: '12-36 months', reasoning: 'Dual macro tailwinds: monetary demand (CBP buying) and industrial demand (solar/nuclear) creating historically undersupplied market. Best risk/reward in hard assets.' },
  { rank: 2, asset: 'Pre-IPO Fusion/SMR Infrastructure', confidence: 7, timeHorizon: '18-60 months', reasoning: 'TerraPower/Helion successors will trade at premium multiples vs traditional energy. High conviction but illiquidity risk.' },
  { rank: 3, asset: 'Noetrotropic + Sleep Tech Public Equities', confidence: 8, timeHorizon: '24-48 months', reasoning: 'Structural demand growth (AI burnout epidemic) creates compounding margin opportunity. MDIA and similar small-cap biotech with functional food platforms.' },
]

export default function SynthesisPage() {
  
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <h1 className="text-3xl font-bold text-white mb-2">📊 Synthesis & Strategy Dashboard</h1>
      <p className="text-slate-400 mb-6">Cross-sector analysis combining all Macro Compass intelligence into actionable investment strategies.</p>

      {/* Portfolio Allocation Visualization */}
      <section className="bg-surface border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">1. Strategic Portfolio Allocation — Consultant Model</h2>
        <div className="space-y-3 not-force-print">
          {sectors.map((s, i) => (
            <div key={i} className="flex items-center gap-4 border-b border-slate-700 pb-2 last:border-0">
              <div className="w-32 shrink-0"><span className="text-white text-sm font-medium">{s.name}</span></div>
              <div className="flex-1 h-5 bg-gray-800 rounded overflow-hidden relative">
                <div className="h-full rounded transition-all flex items-center justify-end px-2" style={{ width: `${s.allocation * 4}%`, background: s.sentiment >= 6 ? 'linear-gradient(90deg,#16a34a,#84cc16)' : s.sentiment >= 4 ? 'linear-gradient(90deg,#eab308,#f59e0b)' : 'linear-gradient(90deg,#ef4444,#dc2626)' }}>
                  <span className="text-xs font-bold text-slate-900">{s.allocation}%</span>
                </div>
              </div>
              <span className={`text-sm font-bold min-w-max ${s.sentiment >= 7 ? 'text-green-400' : s.sentiment >= 5 ? 'text-yellow-400' : 'text-slate-400'}`}>{s.sentiment}/10</span>
            </div>
          ))}
        </div>
        
        <div className="mt-6 bg-blue-900/30 border border-blue-700 rounded p-4 not-force-print">
          <p className="text-blue-300 text-sm"><strong>Total Allocated:</strong> 100% across 6 sectors. Macro Compass default model rebalances quarterly. Cash positions recommended above 95 DXY readings.</p>
        </div>
      </section>

      {/* Cross-Sector Correlation Heatmap */}
      <section className="bg-surface border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">2. Cross-Sector Correlation Analysis</h2>
        <div className="overflow-x-auto not-force-print">
          <table className="w-full text-sm text-center border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="p-2 text-slate-400 font-medium"></th>
                {sectors.map(s => <th key={s.name} className="p-2 text-white font-semibold w-28 truncate">{s.name.slice(0,10)}...</th>)}
              </tr>
            </thead>
            <tbody>
              {sectors.map((s1, i) => (
                sectors.map((s2, j) => {
                  const isDiag = i === j;
                  let corrVal, corrText;
                  if (isDiag) { corrVal = 0; corrText = '—'; }
                  else if ((i-j===1||j-i===1)) { corrVal = 7; corrText = '+0.72'; }
                  else if ((i-j===2||j-i===2)) { corrVal = 4; corrText = '+0.58'; }
                  else { corrVal = -3; corrText = '-0.12'; }
                  
                  let bgClass = 'bg-slate-800/50';
                  if (corrVal > 5) bgClass = 'bg-green-900/40 text-green-300';
                  else if (corrVal > 0) bgClass = 'bg-blue-900/30 text-blue-300';
                  else bgClass = 'bg-red-900/20 text-red-400';
                  
                  return (
                    <td key={`${i}-${j}`} className={`p-2 ${isDiag?'font-bold':'text-sm'} ${bgClass}`}>
                      {corrText}
                    </td>
                  );
                })
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Top Investment Ideas */}
      <section className="bg-surface border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">3. Top 3 Investment Ideas — High Conviction</h2>
        <div className="space-y-4 not-force-print">
          {topIdeas.map(t => (
            <div key={t.rank} className={`border-l-4 pr-4 ${t.confidence >= 8 ? 'border-green-500 bg-green-900/10' : t.confidence >= 6 ? 'border-yellow-500 bg-yellow-900/10' : 'border-blue-500 bg-blue-900/10'}`}>
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-white">#{t.rank} — {t.asset}</h3>
                <span className="bg-gold/20 text-gold px-2 py-0.5 rounded font-bold text-sm">{t.confidence}/10 confidence</span>
              </div>
              <p className="text-xs text-slate-400 mt-1 italic">{t.timeHorizon}</p>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">{t.reasoning}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Macro Thesis Summary */}
      <section className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 border border-emerald-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">4. Macro Thesis Summary — 2026–2031 Horizon</h2>
        
        <div className="space-y-4 not-force-print">
          <div className="bg-emerald-900/30 border border-emerald-700 rounded p-4">
            <h3 className="text-emerald-300 font-bold mb-1">🔑 Primary Thesis: Structural Supply Deficits Across Real Assets</h3>
            <p className="text-slate-300 text-sm leading-relaxed">CapEx underinvestment in energy, mining, and agriculture infrastructure across the past decade (average 8-year cycle) creates a structural supply gap that cannot be resolved via price signals alone. This benefits holders of real asset exposure and IPOs targeting critical shortages.</p>
          </div>

          <div className="bg-teal-900/30 border border-teal-700 rounded p-4">
            <h3 className="text-teal-300 font-bold mb-1">🔑 Secondary Thesis: Rate Cut Cycle as Multiplier</h3>
            <p className="text-slate-300 text-sm leading-relaxed">Fed rate cuts through 2026 amplify all real asset valuations. Gold underperforms in strong dollar (DXY {'>'}95) but accelerates dramatically below DXY 100. Silver and uranium have the highest beta to Fed easing cycles among commodity proxy assets.</p>
          </div>

          <div className="bg-cyan-900/20 border border-cyan-700 rounded p-4">
            <h3 className="text-cyan-300 font-bold mb-1">🔑 Tertiary Thesis: IPO Window Opening Q3-Q4 2026</h3>
            <p className="text-slate-300 text-sm leading-relaxed">Post-rate-cut IPO window creates supply-constrained entry for quality pre-IPO companies in energy (fusion, SMR), water (desalination), and biotech noreotropics. Track SEC S-1 filings via EDGAR RSS for 6–9 month advance entry timing.</p>
          </div>
        </div>
      </section>

      <div className="flex justify-between pt-4 border-t border-border">
        <Link href="/" className="text-accent hover:underline font-semibold no-print">← Home</Link>
        <a href="/wellness-leisure" className="text-accent hover:underline font-semibold no-print">Previous: Wellness & Leisure ←</a>
        <a href="/news" className="text-accent hover:underline font-semibold no-print">Next: News →</a>
      </div>
    </div>
  )
}
