import { NextResponse } from "next/server";

const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
};

// Fetch chart data with a given range for trend analysis
async function fetchChart(symbol, range) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=${range}&interval=1d`;
  try {
    const res = await fetch(url, { headers: HEADERS, cache: "no-store", signal: AbortSignal.timeout(10_000) });
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

// Extract daily closing prices from chart response
function extractCloses(data) {
  if (!data?.chart?.result?.[0]) return null;
  const closes = data.chart.result[0].indicators?.quote?.[0]?.close;
  return Array.isArray(closes) ? closes.filter(v => typeof v === "number" && v > 0) : null;
}

// Compute trend direction for a given period
function computeTrend(closes, currentPrice) {
  if (!closes.length) return { direction: 0, pctChange: 0, fromPrice: null };
  
  const last = closes[closes.length - 1]; // most recent close we have from range
  const fromIdx = Math.min(60, closes.length - 3); // look back ~20-25 trading days max
  
  const pctChange = ((last - closes[fromIdx]) / closes[fromIdx]) * 100;
  const direction = pctChange > 0.3 ? 1 : pctChange < -0.3 ? -1 : 0; // threshold to call a "trend"
  
  return {
    direction,
    pctChange: Math.round(pctChange * 10) / 10,
    fromPrice: closes[fromIdx],
    currentEstimate: currentPrice || last
  };
}

async function analyzeAsset(key, symbol, label, rangeConfigs, fallbacks) {
  const result = { key, label, trends: {}, alignment: "NEUTRAL", verdict: "", source: `Yahoo Finance ${symbol}` };
  
  let dailyCloses = null;
  for (const cfg of rangeConfigs) {
    const data = await fetchChart(symbol, cfg.range);
    if (cfg.range === "5d") dailyCloses = extractCloses(data);
    
    const closes = extractCloses(data);
    if (!closes) continue;
    
    // Find meta price for current price fallback
    const meta = data.chart.result[0].meta;
    const currentPrice = (meta?.regularMarketPrice && meta.regularMarketPrice > 0) 
      ? meta.regularMarketPrice 
      : closes[closes.length - 1];
    
    const period = cfg.period || cfg.range;
    const trend = computeTrend(closes, currentPrice);
    
    result.trends[period] = {
      direction: trend.direction === 1 ? "▲" : trend.direction === -1 ? "▼" : "▬",
      pctChange: trend.pctChange,
      pctStr: (trend.pctChange >= 0 ? "+" : "") + trend.pctChange.toFixed(2) + "%",
      fromPrice: trend.fromPrice,
      currentEstimate: currentPrice,
    };
    
    // Use most recent range for the "current" price if we have meta data
    if (meta?.regularMarketPrice && meta.regularMarketPrice > 0) {
      result.currentPrice = meta.regularMarketPrice;
    }
  }
  
  // If no chart data at all, use fallbacks
  const allNull = Object.values(result.trends).every(t => t.direction === 0);
  if (allNull && fallbacks) {
    for (const [period, fb] of Object.entries(fallbacks)) {
      result.trends[period] = { direction: 0, pctChange: 0, pctStr: "—" + "%", fromPrice: null, currentEstimate: fb };
    }
    result.currentPrice = fallbacks.main;
  }
  
  // Compute alignment score (-3 to +3) and verdict
  const dirs = Object.values(result.trends).map(t => t.direction);
  const alignScore = dirs.reduce((a, d) => a + d, 0);
  
  if (alignScore >= 2) { result.alignment = "BULLISH"; }
  else if (alignScore <= -2) { result.alignment = "BEARISH"; }
  else if (dirs.every(d => d === 0)) { result.alignment = "NEUTRAL"; }
  else { result.alignment = "MIXED"; }
  
  // Verdict text based on alignment
  if (result.alignment === "BULLISH") {
    const timeframes = Object.keys(result.trends).join(", ");
    result.verdict = `Strong uptrend across ${timeframes}. Consider buying dips or holding positions.`;
  } else if (result.alignment === "BEARISH") {
    const timeframes = Object.keys(result.trends).join(", ");
    result.verdict = `Downtrend confirmed across ${timeframes}. Reduce exposure or hedge. Wait for stabilization.`;
  } else if (result.alignment === "MIXED") {
    result.verdict = `Conflicting signals — shorter-term differs from longer-term. Tread carefully, wait for clarity.`;
  }
  
  // Add conviction indicator (how strong is the trend signal?)
  const confidence = Math.abs(alignScore) / Object.keys(result.trends).length;
  result.confidence = confidence >= 0.8 ? "HIGH" : confidence >= 0.4 ? "MODERATE" : "LOW";
  
  return result;
}

// Define our analysis: which timeframes per asset, and fallback prices
const TREND_CONFIGS = {
  spx: { symbol: "^GSPC", label: "S&P 500", ranges: [{ range: "5d", period: "Daily" }, { range: "1mo", period: "Weekly" }, { range: "3mo", period: "Monthly" }], fallbacks: { Daily: 6820, Weekly: 6780, Monthly: 6400, main: 6820 } },
  dxy: { symbol: "^DXY", label: "US Dollar Index", ranges: [{ range: "5d", period: "Daily" }, { range: "1mo", period: "Weekly" }, { range: "3mo", period: "Monthly" }], fallbacks: { Daily: 103.5, Weekly: 102.8, Monthly: 98, main: 103.5 } },
  gold: { symbol: "GC=F", label: "Gold (USD/oz)", ranges: [{ range: "5d", period: "Daily" }, { range: "1mo", period: "Weekly" }, { range: "3mo", period: "Monthly" }], fallbacks: { Daily: 3985, Weekly: 3920, Monthly: 3600, main: 3985 } },
};

export async function GET() {
  const assets = [];
  
  for (const [key, config] of Object.entries(TREND_CONFIGS)) {
    try {
      const asset = await analyzeAsset(key, config.symbol, config.label, config.ranges, config.fallbacks);
      assets.push(asset);
      
      // Small rate-limit spacing
      await new Promise(r => setTimeout(r, 80));
    } catch (err) {
      console.error(`Error analyzing ${config.label}:`, err);
    }
  }

  return NextResponse.json({ 
    updated: new Date().toISOString(), 
    marketSentiment: assets.filter(a => a.alignment === "BULLISH").length,
    assets 
  });
}
