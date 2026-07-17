import { NextResponse } from "next/server";

const TICKERS = [
  { key: "spy",     symbol: "^GSPC",    label: "S&P 500 Index",            dec: 2, fallback: 6820 },
  { key: "dxy",     symbol: "^DXY",      label: "US Dollar Index",           dec: 4, fallback: 103.5 },
  { key: "gold",    symbol: "GC=F",       label: "Gold (USD/oz)",            dec: 2, fallback: 3985 },
  { key: "silver",  symbol: "SI=F",        label: "Silver (USD/lb)",           dec: 3, fallback: 51.0 },
];

const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  "Accept-Language": "en-US,en;q=0.9"
};

async function fetchYahoo(url, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url, { headers: HEADERS, cache: "no-store", signal: AbortSignal.timeout(10_000) });
      if (!res.ok) continue;
      return await res.json();
    } catch {}
  }
  return null;
}

async function getTicker(ticker) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker.symbol)}?interval=1d&range=1d`;
  const data = await fetchYahoo(url);

  if (data?.chart?.result?.[0]) {
    const meta = data.chart.result[0].meta;
    const closes = data.chart.result[0].indicators?.quote?.[0]?.close;

    let price = null;
    let changePct = null;

    // Extract current price from closes
    if (closes && closes.length > 0) {
      const current = closes[closes.length - 1];
      if (typeof current === "number" && current > 0) price = current;

      // Calculate change from previous close
      if (closes.length >= 2) {
        const prev = closes[closes.length - 2];
        if (typeof prev === "number" && prev !== 0) {
          changePct = ((current - prev) / prev) * 100;
        }
      }
    }

    // Fallback to meta regularMarketPrice
    if (!price && meta?.regularMarketPrice && typeof meta.regularMarketPrice === "number") {
      price = meta.regularMarketPrice;
    }

    // Try to compute change from meta
    if (!changePct && price && meta?.chartPreviousClose) {
      changePct = ((price - meta.chartPreviousClose) / meta.chartPreviousClose) * 100;
    }

    if (price && price > 0) {
      return { current: Number(price.toFixed(ticker.dec)), changePct };
    }
  }

  return null;
}

export async function GET() {
  const prices = [];

  for (const t of TICKERS) {
    try {
      await new Promise((r) => setTimeout(r, 50)); // rate limit spacing
      const result = await getTicker(t);

      if (result?.current > 0) {
        prices.push({
          key: t.key,
          label: t.label,
          price: result.current.toFixed(t.dec),
          changePercent: result.changePct != null ? Math.round(result.changePct * 100) / 100 : null,
          source: `Yahoo Finance (${t.symbol})`,
        });
      } else {
        // Fallback so UI never shows blank/N/A
        prices.push({
          key: t.key,
          label: t.label,
          price: "$" + t.fallback.toFixed(t.dec),
          changePercent: null,
          fallback: true,
        });
      }
    } catch {
      prices.push({
        key: t.key,
        label: t.label,
        price: "$" + t.fallback.toFixed(t.dec),
        changePercent: null,
        fallback: true,
      });
    }
  }

  return NextResponse.json({ updated: new Date().toISOString(), prices });
}
