import { NextResponse } from 'next/server'

// Instruments we track on the dashboard
const INSTRUMENTS = [
  { key: 'spy',  symbol: 'SPY',   label: 'S&P 500' },
  { key: 'dxy',  symbol: 'DXY',   label: 'US Dollar Index' },
  { key: 'uso',  symbol: 'USO',   label: 'Crude Oil' },
  { key: 'gld',  symbol: 'GLD',   label: 'Gold' },
  { key: 'slv',  symbol: 'SLV',   label: 'Silver' },
  { key: 'ura',  symbol: 'URA',   label: 'Uranium Miners ETF' },
  { key: 'dba',  symbol: 'DBA',   label: 'Agriculture ETF' },
  { key: 'ihi',  symbol: 'IHI',   label: 'Medical Devices ETF' },
]

// Revalidate every 15 minutes (API allows up to ~80 req/day free, we batch these)
export const revalidate = 900

/**
 * Fetches real-time-ish prices via yahoo-finance2 library.
 * Returns an array of { key, symbol, label, price, change, changePercent }
 */
async function fetchPrices() {
  // Dynamic import to avoid SSR issues
  const yf = await import('yahoo-finance2')
  
  const results = []
  
  for (const inst of INSTRUMENTS) {
    try {
      if (inst.symbol === 'DXY') {
        // DXY is a CURRENCYCOMPOSITE, need special handling
        const quote = await yf.quote('^GDXY') // Global Dollar Index
        results.push({
          key: inst.key,
          symbol: inst.symbol,
          label: inst.label,
          price: +quote.regularMarketPrice?.toFixed(3) || 0,
          change: +(quote.regularMarketChange || 0).toFixed(2),
          changePercent: +(quote.regularMarketChangePercent || 0).toFixed(2),
        })
        continue
      }
      
      const quote = await yf.quote(inst.symbol)
      
      results.push({
        key: inst.key,
        symbol: inst.symbol,
        label: inst.label,
        price: +quote.regularMarketPrice?.toFixed(2) || 0,
        change: +(quote.regularMarketChange || 0).toFixed(2),
        changePercent: +(quote.regularMarketChangePercent || 0).toFixed(2),
      })
    } catch (err) {
      // Fallback to cached last-known data or mark unavailable
      console.warn(`Failed to fetch ${inst.symbol}:`, err.message)
      results.push({
        ...inst,
        price: null,
        change: null,
        changePercent: null,
        error: true,
      })
    }
  }
  
  return results
}

export async function GET(req) {
  const prices = await fetchPrices()
  
  // Also check if there are any sector-specific requests
  const url = new URL(req.url)
  const includeSector = url.searchParams.get('sector') === 'true'
  
  return NextResponse.json({
    updated: new Date().toISOString(),
    source: 'yahoo-finance2',
    prices: prices,
  })
}

export async function POST(req) {
  // Force cache bust/revalidation endpoint
  const prices = await fetchPrices()
  return NextResponse.json({
    updated: new Date().toISOString(),
    source: 'yahoo-finance2 (forced refresh)',
    prices: prices,
  })
}
