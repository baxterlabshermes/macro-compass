'use client';

import { useState, useEffect } from 'react';

// Trend arrow + color mapping
const TREND = {
  '▲': { color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },   // bullish
  '▼': { color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },    // bearish
  '▬': { color: '#94a3b8', bg: 'rgba(148,163,184,0.1)' },   // neutral
};

// Format number as price with commas
function fmtPrice(n) {
  return n != null ? typeof n === 'number' ? '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '' : '';
}

function ConvictionBadge({ level }) {
  const colors = { HIGH: '#eab308', MODERATE: '#3b82f6', LOW: '#64748b' };
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, color: colors[level] || colors.LOW,
      textTransform: 'uppercase', letterSpacing: '0.1em', opacity: level === 'MODERATE' ? 0.8 : 1
    }}>
      {level} CONFIDENCE
    </span>
  );
}

function AlignmentBadge({ alignment }) {
  const colors = { BULLISH: '#22c55e', BEARISH: '#ef4444', MIXED: '#f59e0b', NEUTRAL: '#64748b' };
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, color: colors[alignment] || colors.NEUTRAL,
      textTransform: 'uppercase', letterSpacing: '0.08em',
      borderLeft: `2px solid ${colors[alignment]}`,
      paddingLeft: 10,
    }}>
      {alignment}
    </span>
  );
}

function TrendRow({ label, trend }) {
  const t = TREND[trend?.direction || '▬'];
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
      <span style={{ fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 16, fontWeight: 700 }} aria-label="trend direction">
          {trend?.direction === 1 ? (
            <span title="Bullish trend" style={{ color: '#22c55e' }}>▲</span>
          ) : trend?.direction === -1 ? (
            <span title="Bearish trend" style={{ color: '#ef4444' }}>▼</span>
          ) : (
            <span title="Neutral trend" style={{ color: '#94a3b8' }}>▬</span>
          )}
        </span>
        <span style={{ fontSize: 13, fontWeight: 600, color: t.color }}>{trend?.pctStr || ''}</span>
      </div>
    </div>
  );
}

function AssetCard({ asset }) {
  const hasData = Object.keys(asset.trends).length > 0;
  
  return (
    <div style={{
      width: 'calc(33.3% - 1rem)',
      background: '#0f172a',
      border: '1px solid rgba(56,189,248,0.15)',
      borderRadius: 16,
      padding: 0,
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid rgba(56,189,248,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#e2e8f0' }}>{asset.label}</h3>
          {hasData && <AlignmentBadge alignment={asset.alignment} />}
        </div>
        
        {hasData && (
          <div style={{ marginTop: 4 }}>
            {/* Show current price as the last known estimate from most recent range */}
            {asset.trends.Daily != null && (
              <span style={{ fontSize: 24, fontWeight: 700, color: '#f8fafc', display: 'block' }}>
                {fmtPrice(asset.currentPrice)}
              </span>
            )}
          </div>
        )}
        
        {/* Verdict */}
        {hasData && (
          <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: '1.5', marginTop: 12, marginBottom: 0 }}>
            "{asset.verdict}"
          </p>
        )}
      </div>
      
      {/* Trend Rows */}
      <div style={{ padding: '16px 24px' }}>
        {hasData ? (
          <>
            {['Daily', 'Weekly', 'Monthly'].map(period => {
              const trend = asset.trends[period];
              if (!trend) return null;
              return <TrendRow key={period} label={period} trend={trend} />;
            })}
            
            {/* Conviction indicator */}
            <div style={{ borderTop: '1px solid rgba(56,189,248,0.08)', paddingTop: 10, marginTop: 10 }}>
              <ConvictionBadge level={asset.confidence || 'LOW'} />
            </div>
            
            {/* Alignment score */}
            <div style={{ borderTop: '1px solid rgba(56,189,248,0.08)', paddingTop: 10, marginTop: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 500, color: '#64748b' }}>Trend Alignment<br/></span>
              <span style={{ fontSize: 20, fontWeight: 700 }}>
                {(() => {
                  const score = asset.alignment === 'BULLISH' ? Object.keys(asset.trends).length : 0;
                  return Array.from({ length: Math.abs(score) }, (_, i) => (
                    <span key={i} style={{ color: asset.alignment === 'BULLISH' ? '#22c55e' : asset.alignment === 'BEARISH' ? '#ef4444' : '#94a3b8' }}>|</span>
                  ));
                })()}
              </span>
            </div>
          </>
        ) : (
          <div style={{ height: 12, width: '60%', background: '#1e293b', borderRadius: 6, margin: '8px auto' }}></div>
        )}
      </div>
      
      {/* Footer */}
      {hasData && (
        <div style={{ padding: '8px 24px 14px', borderTop: '1px solid rgba(56,189,248,0.06)', background: '#0b1324' }}>
          <span style={{ fontSize: 10, color: '#475569' }}>{asset.source}</span>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/market-data');
        if (res.ok) {
          const json = await res.json();
          setData(json);
          setLastUpdated(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
        }
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', background: '#080d14', padding: '40px 20px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
      }}>
        <div style={{ width: 48, height: 48, border: '3px solid rgba(56,189,248,0.1)', borderTopColor: '#38bdf8', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <p style={{ color: '#475569', fontSize: 13, marginTop: 20 }}>Loading market signals...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', background: '#080d14', padding: '40px 20px' }}>
      
      {/* Header */}
      <header style={{ maxWidth: 860, margin: '0 auto 30px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#e2e8f0', letterSpacing: '-0.02em', marginBottom: 8 }}>
          MACRO<span>COMPASS</span>
        </h1>
        <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>
          The dollar drives everything else. One look tells you which markets have real conviction<br/> and which are just noise.
        </p>
        {lastUpdated && (
          <span style={{ display: 'block', fontSize: 12, color: '#475569', marginTop: 12 }}>
            Updated {lastUpdated} ET — Auto-refresh every 5 minutes
          </span>
        )}
      </header>

      {/* Main content */}
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Market sentiment summary row */}
        {data?.marketSentiment != null && (
          <section style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ 
              background: data.marketSentiment === 3 ? '#064e1450' : data.marketSentiment === -3 ? '#450a0a50' : '#1e293b50',
              border: data.marketSentiment !== 0 ? `2px solid ${data.marketSentiment === 3 ? 'rgba(34,197,94,0.2)' : data.marketSentiment === -3 ? 'rgba(239,68,68,0.2)' : 'rgba(56,189,248,0.1)'}` : '2px solid rgba(56,189,248,0.1)',
              borderRadius: 16, padding: '20px 32px', display: 'flex', alignItems: 'center', gap: 20, width: 'fit-content'
            }}>
              <span style={{ fontSize: 32 }}>{data.marketSentiment === 0 ? '—' : data.marketSentiment <= -2 ? '📉' : data.marketSentiment >= 2 ? '📈' : '↔️'}</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: data.marketSentiment === 3 ? '#22c55e' : data.marketSentiment === -3 ? '#ef4444' : '#94a3b8', margin: '0 0 2px' }}>
                  MARKET OVERALL 
                </p>
                <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>
                  {data.marketSentiment >= 3 ? 'All major signals are bullish.' : 
                   data.marketSentiment <= -3 ? 'All major signals are bearish.' :
                   `${data.assets.length} of ${data.assets.filter(a => a.alignment === 'BULLISH').length} assets showing bullish pressure.`}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Asset cards - this is the main section */}
        <div className="max-w-3xl mx-auto space-y-8">
          {data && data.assets ? (
            data.assets.map(asset => (
              <AssetCard key={asset.key} asset={asset} />
            ))
          ) : (
            <p style={{ textAlign: 'center', color: '#64748b' }}>No market data available right now. Check connection.</p>
          )}
        </div>

        {/* Bottom section - What this actually means */}
        <section style={{ maxWidth: 860, margin: '50px auto 0', padding: '24px 32px', borderTop: '1px solid rgba(56,189,248,0.08)', background: '#0b1324' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0', marginBottom: 12 }}>HOW TO USE THIS</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#38bdf8', marginBottom: 6 }}>ALIGNMENT</p>
              <p style={{ fontSize: 12, color: '#94a3b8', lineHeight: '1.6' }}>When all timeframes agree = strong conviction. Only buy dips if daily/weekly/monthly trend in same direction.</p>
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#f59e0b', marginBottom: 6 }}>CONFLICT</p>
              <p style={{ fontSize: 12, color: '#94a3b8', lineHeight: '1.6' }}>Conflicting signals = noise. Wait for alignment before committing to new positions.</p>
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#22c55e', marginBottom: 6 }}>CONFIDENCE</p>
              <p style={{ fontSize: 12, color: '#94a3b8', lineHeight: '1.6' }}>HIGH = clear signal (all timeframes aligned). MODERATE/LOW = trade smaller or wait.</p>
            </div>
          </div>
        </section>

        <footer style={{ maxWidth: 860, margin: '40px auto 0', padding: '24px', textAlign: 'center' }}>
          <span style={{ fontSize: 11, color: '#334155' }}>Data from Yahoo Finance • Trends computed from historical price comparison across DXY, S&P 500, and Gold</span>
        </footer>
      </div>
    </div>
  );
}