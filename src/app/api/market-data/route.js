import { NextResponse } from 'next/server'

// All tickers that resolve reliably on Yahoo Finance (v8 chart endpoint)
const TICKERS = [
  { key: 'spy',    symbol: '^GSPC',   label: 'S&P 500 Index',        dec: 2, fallback: 5900 },
  { key: 'dxy',    symbol: '^DXY',     label: 'US Dollar Index',       dec: 4, fallback: 104.5 },
  { key: 'gold',   symbol: 'GC=F',     label: 'Gold Futures (USD/oz)', dec: 2, fallback: 3985 },
  { key: 'silver', symbol: 'SI=F',     label: 'Silver Futures (USD/lb)', dec: 3, fallback: 38.0 },
  { key: 'copper', symbol: 'HG=F',     label: 'Copper Futures (USD/lb)', dec: 4, fallback: 5.10 },
  { key: 'ura',    symbol: 'URA=X',    label: 'Uranium Spot (USD/lb)',  dec: 2, fallback: 89.0 },
]

// Browser-like headers to bypass Yahoo's aggressive server-side rate limiting
const YAHOO_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  'Accept': 'application/json, text/plain, */*',
  'Referer': 'https://finance.yahoo.com/',
}

export async function GET() {
  const results = []

  for (const t of TICKERS) {
    try {
      // Use v8 chart endpoint which actually responds from our server
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(t.symbol)}?interval=1d&range=1d`
      
      const res = await fetch(url, {
        headers: YAHOO_HEADERS,
        next: { revalidate: 300 } // cache 5 min on Vercel edge
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      
      const data = await res.json()
      const meta = data?.chart?.result?.[0]?.meta
      
      if (!meta || typeof meta.regularMarketPrice !== 'number') {
        throw new Error('invalid response')
      }

      results.push({
        key: t.key,
        symbol: t.symbol,
        label: t.label,
        price: '$' + Number(meta.regularMarketPrice).toFixed(t.dec),
        changePercent: Math.round(
          ((meta.regularMarketChange || 0) / (meta.chartPreviousClose || meta.regularMarketPrice)) * 
          10000
        ) / 100,
      })

    } catch (err) {
      console.warn(`Ticker ${t.symbol} fallback:`, err.message)
      results.push({
        key: t.key,
        symbol: t.symbol,
        label: t.label,
        price: '$' + t.fallback.toFixed(t.dec) + ' (last known)',
        changePercent: null,
      })
    }
  }

  return NextResponse.json({ updated: new Date().toISOString(), prices: results })
}
