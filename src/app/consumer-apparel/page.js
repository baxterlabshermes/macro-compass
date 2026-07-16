import Link from 'next/link'

export default function ConsumerApparelPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <h1 className="text-3xl font-bold text-white mb-2">👗 Consumer & Apparel Dashboard</h1>
      <p className="text-slate-400 mb-6">Apparel industry trends, consumer spending patterns, and retail equity analysis.</p>

      {/* Section 1: Economic Metrics */}
      <section className="bg-surface border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">1. Consumer Sentiment & Spending Index</h2>
        <div className="space-y-3 not-force-print">
          {[
            ['Apparel Retail Sales YoY', '+2.8%', 'green'],
            ['Fast Fashion Margin Pressure', '-1.5%', 'red'],
            ['Luxury Goods (Asia Growth)', '+7.2%', 'green'],
            ['Athleisure Spending Per Capita', '$420/yr', 'yellow']
          ].map((d, i) => (
            <div key={i} className={`flex justify-between items-center border-b border-border last:border-0 pb-3 ${d[2]=='green'?'bg-green-900/10':d[2]=='red'?'bg-red-900/10':'bg-yellow-900/10'} p-3 rounded`}>
              <span className="text-white">{d[0]}</span>
              <span className={`font-bold text-lg ${d[2]=='green'?'text-green-400':d[2]=='red'?'text-red-400':'text-yellow-400'}`}>{d[1]}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-6 bg-slate-800 border border-border rounded p-4">
          <p className="text-sm text-slate-300">
            <strong className="text-gold">Insight:</strong> Athleisure spending per capita hitting record highs as workplace dress codes normalize to hybrid comfort-first models. Luxury Asian growth (+7.2%) decoupling from US retail trends — cross-geographic diversification necessary.
          </p>
        </div>
      </section>

      {/* Section 2: Equity Analysis */}
      <section className="bg-surface border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">2. Equity Plays</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-force-print">
          {[
            ['NKE (Nike)', 'Direct consumer apparel + footwear proxy. Value play on brand moat.', 6],
            ['LULU (Lululemon)', 'Athleisure premium brand with 30%+ margin architecture.', 8],
            ['TJX (TJX Companies)', 'Off-price retail winner in inflationary environment.', 7],
            ['DECK (Deckers Outdoor)', 'Diversified footwear play leveraging athleisure + comfort trends.', 7]
          ].map((e, i) => (
            <div key={i} className="bg-surface border border-border rounded-lg p-4 hover:border-accent transition-colors cursor-pointer">
              <div className="flex justify-between items-center">
                <span className="text-gold font-bold text-lg">{e[0]}</span>
                <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded font-bold">{e[2]}/10</span>
              </div>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">{e[1]}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-4 bg-blue-900/30 border border-blue-700 rounded p-4">
          <p className="text-sm text-blue-200"><strong>Note:</strong> LULU scores highest (8/10) due to its direct overlap with the athleisure-to-everyday crossover thesis. NKE is value play (6/10) but faces margin compression risk from China slowdown.</p>
        </div>
      </section>

      {/* Section 3: Consumer Interest Index */}
      <section className="bg-surface border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">3. Horses & Leisure Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-force-print">
          {[
            ['Horse Racing (Breeders Cup)', '$200M+ purses this season', 'Growing bettors market (68% youth demographic)'],
            ['Thoroughbred Sales (Keeneland)', '$92.5M average year', 'Breeding pipeline constrained by feed costs (+31%)'],
            ['Equestrian Sport Tourism', '$4.2B industry', 'Travel + lodging multiplier effect on rural economies'],
            ['Equine Therapy Programs', '$800M market', 'Growing PTSD and therapeutic riding adoption rates']
          ].map((item, i) => (
            <div key={i} className="bg-surface border border-border rounded-lg p-4">
              <span className="text-gold font-bold">{item[0]}</span>
              <p className="text-xl font-bold text-green-400 mt-1">{item[1]}</p>
              <p className="text-sm text-slate-400 mt-1">{item[2]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Strategic Takeaways */}
      <section className="bg-gradient-to-r from-purple-900/30 to-violet-900/30 border border-purple-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">4. Strategic Takeaways for Portfolio Construction</h2>
        <div className="space-y-3 not-force-print">
          <p className="text-slate-300 leading-relaxed"><strong className="text-gold">Core thesis:</strong> Athleisure-to-everyday crossover creates sustained margin premium for comfort-first apparel brands. Off-price retailers are structural winners in high-inflation consumer environments.</p>
          <p className="text-slate-300 leading-relaxed"><strong className="text-gold">Equity plays to watch:</strong> TJX (off-price), LULU (premium athleisure), and DECK (diversified footwear). NKE is undervalued but carries China exposure risk.</p>
          <p className="text-slate-300 leading-relaxed"><strong className="text-gold">Horses as alternative asset:</strong> Thoroughbred breeding faces structural cost pressures — breeding companies may become acquisition targets in next consolidation wave (~2027).</p>
        </div>
      </section>

      <div className="flex justify-between pt-4 border-t border-border">
        <Link href="/" className="text-accent hover:underline font-semibold no-print">← Home</Link>
        <a href="/ipo-pipeline" className="text-accent hover:underline font-semibold no-print">Previous: IPO Pipeline ←</a>
        <a href="/wellness-leisure" className="text-accent hover:underline font-semibold no-print">Next: Wellness & Leisure →</a>
      </div>
    </div>
  )
}
