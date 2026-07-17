<main className="min-h-screen bg-black text-white">
  <header className="px-6 py-8 border-b border-gray-100/5">
    <h1 className="text-xl font-medium text-gray-400 tracking-wide">MACRO COMPASS</h1>
  </header>

  {/* Primary thesis — always visible */}
  {prices.length > 0 && (() => {
    const hasDXY = prices.find(p => p.key === 'dxy');
    const dxfPrice = parseFloat(hasDXY?.price.replace('$', ''));
    
    let thesis;
    if (isnan(dxfPrice)) thesis = 'Strong dollar environment — consider commodities & metals';
    else if (dxfPrice > 100) thesis = 'Dollar below critical levels — potential for equity rally or commodity weakness';
    return null; // Keep dynamic in the real page
    })()}

  <section className="flex gap-2 px-6 my-8 flex-wrap">
    {prices.length === 0 ? (
      <p className="text-gray-500 mt-10">Loading market data...</p>
    ) : (
      prices.map((p) => (
        <div key={p.key} className="min-w-[64px] bg-white/90 rounded-xl p-3 text-center shrink-0 transition hover:bg-gray-50" style={{ flex: '1 1 calc(20% - 1rem)' }}>
          <p className="text-gray-900 text-sm font-medium truncate mb-1">{p.label}</p>
          {p.price && p.price !== '$NaN' ? (
            <span className="font-semibold text-lg">{p.price}</span>
          ) : (
            <span className="font-medium text-lg">—</span>
          )}
        </div>
      ))
    )}
  </section>

  {prices.length > 0 && (
    <section className="flex gap-4 flex-wrap px-6 pb-6"> 
      {prices.map((p) => (
        <div key={p.key} className="min-w-[180px] bg-white/90 rounded-2xl p-5 border border-gray-100 transition hover:border-gray-300 shadow-sm" style={{ flex: '1 1 calc(33.3% - 1rem)' }}>
          <div className="flex justify-between items-start mb-2">
            {p.changePercent != null && p.price?.includes('N/A') ? (
              <span className={`text-xs font-medium ${Number(p.change) >= 0 ? 'text-red' : ''}`}>
                {(Number(p.change).toFixed(1)}%
              </span>
            ) : ('')}
          </div>
          
          <p className="text-gray-900 text-sm mb-6">{p.label}</p>
        </div>
      ))}
    </section>
  )}

  {/* Reasoning layer */}
  {prices.length > 0 && (
    <section className="px-6 pb-6">
      <h2 className="text-white/85 mb-2 font-medium">Current Macro View</h2>
      <p className="mb-4">{dxfPrice > 10 && dxfPrice < 11 ? 
        'Strong dollar is capping commodities. Monitor Fed for signals.' :
        'Volatile dollar environment — macro uncertainty across sectors.'}</p>
    </section>
  )}

  <footer className="px-6 py-8 border-t border-white/5">
    <p className="">Data from Yahoo Finance • Updated {prices.length > 0 ? (() => { const d = new Date(); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0') + '.' + String(Math.floor(d.getSeconds() / 5) * 5).padStart(2, '0'); })() : ''}</p>
  </footer>
</main>
