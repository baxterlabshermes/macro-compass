import { NextResponse } from "next/server";

const TICKERS = [
  { key: "spy",    symbol: "^GSPC",       label: "S&P 500 Index",            dec: 2, fallback: 5900 },
  { key: "dxy",    symbol: "^DXY",         label: "US Dollar Index",           dec: 4, fallback: 104.5 },
  { key: "gold",   symbol: "GC=F",         label: "Gold (USD/oz)",             dec: 2, fallback: 3985 },
  { key: "silver", symbol: "SI=F",         label: "Silver (USD/lb)",           dec: 3, fallback: 51.0 },
  { key: "uranium",symbol: "DX-Y.NYB",     label: "Uranium Spot (USD/lb)",     dec: 2, fallback: 89.0 },
];

const YAHOO_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Referer": "https://finance.yahoo.com/",
};

async function fetchFromYahoo(url) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, { headers: YAHOO_HEADERS, cache: "no-store" });
      return { ok: res.ok, status: res.status, data: await res.json() };
    } catch (e) {}
  }
  return null;
}

export async function GET() {
  const prices = [];

  for (const t of TICKERS) {
    let priceData = {};
    
    try {
      // For indices, use chart API which has complete data
      const isIndex = ["^GSPC", "^DXY"].includes(t.symbol);
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(t.symbol)}?interval=1d&range=1d`;
      const result = await fetchFromYahoo(url);
      
      if (result?.ok && result.data?.chart?.result?.[0]) {
        const meta = result.data.chart.result[0].meta;
        let price = null;
        let changePct = null;
        
        if (isIndex && t.symbol === "^DXY") {
          // ^DXY special: chart doesn't return regularMarketPrice, use close price
          const timestamps = result.data.chart.result[0].timestamp || [];
          const closes = result.data.chart.result[0].indicators?.quote?.[0]?.close || [];
          
          if (closes.length > 0 && timestamps.length > 0) {
            const prevIdx = Math.max(0, closes.length - 2);
            price = closes[closes.length - 1];
            changePct = (((closes[closes.length - 1] - closes[prevIdx]) / closes[prevIdx]) * 100);
          }
        } else {
          // Try chart data first
          const timestamps = result.data.chart.result[0].timestamp || [];
          const closes = result.data.chart.result[0].indicators?.quote?.[0]?.close || [];

          if (closes.length > 0 && timestamps.length > 0) {
            price = closes[closes.length - 1];
            
            // Try to get previous close from meta or calculate from timestamp range
            const metaPrice = meta.regularMarketPrice;
            if (metaPrice && typeof metaPrice === "number") {
              changePct = ((price - metaPrice) / metaPrice * 100);
            } else if (closes.length >= 2) {
              changePct = (((price - closes[closes.length - 2]) / closes[closes.length - 2]) * 100);
            }
          }
        }

        if (price && typeof price === "number") {
          priceData = { current: Number(price.toFixed(t.dec)), changePercent: changePct ? Number(changePct.toFixed(2)) : null };
        }
      }
    } catch (e) {}

    // Fallback to hard-coded if fetch fails or no data
    if (!priceData.current || priceData.current <= 0) {
      priceData = { current: t.fallback, changePercent: null };
    }

    prices.push({
      key: t.key,
      label: t.label,
      price: "$" + priceData.current.toFixed(t.dec),
      changePercent: priceData.changePercent || 0,
    });
  }

  return NextResponse.json({ updated: new Date().toISOString(), prices });
}
