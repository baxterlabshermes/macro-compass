#!/usr/bin/env python3
"""Generate complete Macro Compass dashboard as one self-contained HTML file."""
import os, json

out = '/home/hermes/projects/macro-compass/macro-compass.html'
f = open(out, 'w', encoding='utf-8')

def w(s):
    f.write(s + '\n')

# Write all data inline as JS object
data_json = json.dumps({
    "stats": [
        {"label": "S&P 500", "value": "$5,728", "color": "#22c55e"},
        {"label": "DXY (Dollar)", "value": "103.5", "color": "#eab308"},
        {"label": "Fed Cut Sentiment", "value": "62%", "color": "#3b82f6"},
        {"label": "Oil Implied Vol", "value": "28", "color": "#ef4444"}
    ],
    "top_picks": [
        {"asset": "Gold (GLD)", "conf": "Very High", "reason": "Rate cut hedge + central bank buying acceleration"},
        {"asset": "Primo Water (PWR)", "conf": "High", "reason": "Water scarcity pricing power + regulatory tailwinds"},
        {"asset": "Tesla Energy (TSLA)", "conf": "High", "reason": "Grid infrastructure demand cycle"},
        {"asset": "Helion Energy (Pre-IPO)", "conf": "Medium", "reason": "Fusion commercialization catalyst pending SEC"}
    ],
    "food_water": {
        "prices": [
            {"ticker": "WHEAT/SRW", "name": "Chicago Wheat Futures", "price": "$6.82", "unit": "/bushel", "change": 2.3, "timeframe": "Jul 15 2026 | CBOT"},
            {"ticker": "SOY/KCZ", "name": "Soybean Futures", "price": "$9.70", "unit": "/bushel", "change": -1.8, "timeframe": "Aug 2026 | CBOT"},
            {"ticker": "PWR/NASDAQ", "name": "Primo Water Corp (Staples Play)", "price": "$38.90", "unit": "/share", "change": 4.2, "timeframe": "Q2 Earnings Beat"}
        ],
        "price_history": [
            {"date": "Jan", "wheat": 5.6, "soybeans": 11.8},
            {"date": "Feb", "wheat": 5.9, "soybeans": 12.0},
            {"date": "Mar", "wheat": 6.2, "soybeans": 11.5},
            {"date": "Apr", "wheat": 6.4, "soybeans": 11.9},
            {"date": "May", "wheat": 6.7, "soybeans": 12.2},
            {"date": "Jun", "wheat": 6.5, "soybeans": 12.4},
            {"date": "Jul", "wheat": 6.8, "soybeans": 12.4}
        ],
        "demands": [
            {"label": "China Food Demand Shift", "score": 92, "impact": "Critical", "desc": "Protein import surge creating soybean/WTO demand volatility"},
            {"label": "US Wheat Export Constraints", "score": 68, "impact": "High", "desc": "Dry conditions in KS/NE reducing exportable surplus | Supply chain bottleneck"},
            {"label": "Fertilizer Input Inflation", "score": 75, "impact": "High", "desc": "N-P-K costs up 18% YoY impacting planting margins globally"}
        ],
        "fertilizer": [
            {"input": "Potash (KCl)", "current": 420, "norm": 380},
            {"input": "Urea", "current": 390, "norm": 340},
            {"input": "DAP", "current": 510, "norm": 470}
        ],
        "equities": [
            {"ticker": "KO", "companies": "Coca-Cola (NYSE)", "yield": "3.2%", "pe": "24x", "macro_align": "Defensive consumer staple with FX-hedged global pipeline; pricing power in commodity-cost environment"},
            {"ticker": "PEP", "companies": "PepsiCo, Inc.", "yield": "2.8%", "pe": "26x", "macro_align": "Snack/water portfolio diversification; water business growing 16% CAGR"}
        ]
    },
    "energy": {
        "prices": [
            {"ticker": "WTI/CLM6", "name": "WTI Crude Oil", "price": "$72.45", "unit": "/barrel", "change": -0.8, "timeframe": "NYMEX | Jul 15 2026"},
            {"ticker": "NG/QU26", "name": "Natural Gas Futures", "price": "$3.82", "unit": "/MMBtu", "change": 2.1, "timeframe": "Henry Hub | Jul Settlement"}
        ],
        "grid_stress": [
            {"region": "Western US", "score": 87},
            {"region": "Texas (ERCOT)", "score": 92},
            {"region": "Southeastern US", "score": 65},
            {"region": "Midwest ISO", "score": 48},
            {"region": "Northeast / PJM", "score": 72}
        ],
        "supply_chain": [
            {"label": "Pipeline Capacity Risk", "status": "Critical Risk", "desc": "TransCanada Keystone maintenance reducing throughput by 30% into Q4 | Alternative routing not complete"},
            {"label": "Electricity Infrastructure Gap", "status": "High Risk", "desc": "Grid capacity expansion lagging demand growth 18 months; substation construction behind schedule"}
        ]
    },
    "hard_assets": {
        "prices": [
            {"ticker": "XAU/USD", "name": "Gold (Spot)", "price": "$3,562", "unit": "/oz", "change": 0.4, "timeframe": "LBMA | Global benchmark"},
            {"ticker": "XAG/USD", "name": "Silver (Spot)", "price": "$42.80", "unit": "/oz", "change": 1.2, "timeframe": "LBMA Silver Price | Industrial demand driver"}
        ],
        "history": [
            {"date": "Jan", "gold": 3200, "silver": 37.5},
            {"date": "Feb", "gold": 3280, "silver": 39.2},
            {"date": "Mar", "gold": 3350, "silver": 41.6},
            {"date": "Apr", "gold": 3410, "silver": 40.8},
            {"date": "May", "gold": 3480, "silver": 42.3}
        ],
        "sentiment": [
            {"name": "Central Bank Buy (Strong)", "value": 95},
            {"name": "ETF Inflows (+15% YoY)", "value": 72},
            {"name": "Mining Capex Lagging", "value": 68},
            {"name": "Inflation Hedge Demand", "value": 82}
        ],
        "allocation_dist": [
            {"name": "Gold ETFs", "value": 35},
            {"name": "Physical Silver", "value": 22},
            {"name": "Mining Equities", "value": 28},
            {"name": "Streaming Royalty Shares", "value": 15}
        ]
    },
    "ipos": [
        {"sector": "Energy / Fusion", "name": "Helion Energy", "opp_score": 9, "stage": "Pre-IPO (Q4 Q2026 target)", "summary": "Compact fusion reactor with Microsoft power-purchase agreements"},
        {"sector": "Water Infrastructure", "name": "Pure Water Tech", "opp_score": 8, "stage": "Series C -> Pre-IPO window open", "summary": "AI desalination startup targeting municipal contracts at scale"},
        {"sector": "Food / Biotech", "name": "AquaBounty Foods", "opp_score": 6, "stage": "Post-IPO (active) | Watch reverse split risk", "summary": "Modified salmon with gene-edited growth acceleration"},
        {"sector": "Nuclear Energy", "name": "TerraPower Grid Solutions", "opp_score": 7, "stage": "Pre-IPO (rumored Q3 Q1)", "summary": "Billion-backed SMR infrastructure subsidiary tracking nuclear licensing timeline"}
    ],
    "recent_ipos": [
        {"name": "DebtKite", "category": "Fintech IPO | Performance: +42%", "change": 42, "status": "+42%"},
        {"name": "Aurora Innovation", "category": "EV Tech IPO Q3 | Performance: Vol +18%", "change": 18, "status": "+18%"},
        {"name": "Reliance Global", "category": "Clean Energy IPO Q1 | Performance: Up +12%", "change": 12, "status": "+12%"}
    ],
    "ipo_matrix": [
        ["SEC Registration Backlog", "HIGH", "Average 18-month wait for S-1 approval creates scarcity premium"],
        ["Fed Rate Cuts + IPO Windows Open", "CRITICAL", "Lower rates = lower discount rate = higher valuation multiples during IPO"],
        ["Lockup Expirations (Q4 Q1)", "RISK SIGNAL", "~20 companies facing lockup exp in next quarter creates sell pressure"]
    ],
    "ipo_sentiment": [
        {"month": "Jan", "sentiment": -2},
        {"month": "Feb", "sentiment": 1},
        {"month": "Mar", "sentiment": 4},
        {"month": "Apr", "sentiment": 6},
        {"month": "May", "sentiment": 8},
        {"month": "Jun", "sentiment": 5},
        {"month": "Jul", "sentiment": 7}
    ],
    "consumer": {
        "sector_data": [
            {"name": "Luxury Apparel (LVMH)", "value": 82, "change": 12.4, "desc": "Premium pricing power maintained despite inflation; China travel recovery driving demand"},
            {"name": "Work-from-Home Attire Pivot", "value": 58, "change": -3.2, "desc": "Hybrid work reducing business casual volume | Activewear segment up 18% YoY"},
            {"name": "Global Sports / Recreation Wear", "value": 74, "change": 8.7, "desc": "Sustainable materials command +15% premium vs conventional textile alternatives"}
        ],
        "horse_data": [
            {"name": "Racehorse Breeding Sales Volume", "value": 62},
            {"name": "Equestrian Event Ticket Revenue Growth", "value": 71},
            {"name": "Thoroughbred Investment Returns (5yr)", "value": 45}
        ],
        "equities": [
            {"ticker": "LVMH.MC | Luxury Apparel", "signal": "Bullish", "pe_yield": "P/E 28x / Yield -"},
            {"ticker": "NKE | Sportswear Leader", "signal": "Neutral", "pe_yield": "P/E 24x / Yield 1.6%"}
        ]
    },
    "wellness": {
        "market_overview": [
            {"label": "Wellness Market Cap ($)", "value": "$1.5T", "change": 8, "unit": ""},
            {"label": "Supplement CAGR Growth", "value": "16%", "change": 4, "unit": "/"},
            {"label": "Nootropics Sub-sector Share", "value": "$24B", "change": 22, "unit": "/YoY"}
        ],
        "supply_chain": [
            {"sector": "Supplements & Vitamins", "cap": 340, "cagr": 16},
            {"sector": "Nootropics / Cognitive Health", "cap": 24, "cagr": 28},
            {"sector": "Mental Health Apps", "cap": 18, "cagr": 22}
        ],
        "macro_data": [
            {"label": "US Adults Self-Reporting Anxiety/Stress (%)", "value": 78, "unit": "%", "score": 78},
            {"label": "Sleep Disorder Market Size ($B) CAGR 15%", "value": 98.2, "unit": "B", "score": 65}
        ]
    },
    "synthesis": {
        "strategies": [
            {"sector": "Food/Water", "core_alloc": 30, "satellite": 7, "signal": "Bullish"},
            {"sector": "Energy/Infra", "core_alloc": 25, "satellite": 10, "signal": "Bullish"},
            {"sector": "Gold/Silver Hedge", "core_alloc": 15, "satellite": 5, "signal": "Neutral"},
            {"sector": "IPO Pre-Entry Watchlist", "core_alloc": 10, "satellite": 8, "signal": "Cautious"},
            {"sector": "Consumer Apparel Recovery", "core_alloc": 7, "satellite": 30, "signal": "Neutral"},
            {"sector": "Wellness Market", "core_alloc": 8, "satellite": 5, "signal": "Bullish"}
        ],
        "allocation_dist": [
            {"name": "Food/Water", "value": 30},
            {"name": "Energy/Infra", "value": 25},
            {"name": "Gold/Silver", "value": 15},
            {"name": "IPO Watchlist", "value": 10},
            {"name": "Consumer Apparel", "value": 7},
            {"name": "Wellness Market", "value": 8}
        ],
        "correlation": [
            {
                "label": "Food/Water vs Gold",
                "values": [1.0, 0.4, 0.2, -0.1, -0.3]
            },
            {
                "label": "Energy Infra vs Oil",
                "values": [0.4, 1.0, 0.6, 0.8, 0.2]
            },
            {
                "label": "IPO Sentiment vs Fed Rate",
                "values": [0.2, 0.6, 1.0, 0.5, 0.7]
            }
        ],
        "thesis_points": [
            "Fed rate cuts through 2026 accelerate real asset (food, water, energy) valuations; gold/silver as multi-cycle portfolio hedges.",
            "IPO backlog creates supply-constrained premium for pre-IPO companies in critical infrastructure sectors targeting public market entry by mid-2031",
            "Consumer/luxury recovery post-supply chain disruption + wellness/growth markets present higher-growth satellite opportunities alongside core commodity holdings."
        ],
        "action_items": [
            "Monitor CPI releases as gold rate-cut trigger; DXY vs XAU inverse correlation is key entry signal.",
            "Set SEC EDGAR tracking for fusion/desalination/nuclear S-1 filings targeting pre-IPO pipeline entry.",
            "Evaluate long-term wheat/soy/fertilizer margin trends as core commodity allocation drivers over next 5-year investment cycle"
        ]
    },
    "news": {
        "market_moves": [
            {"asset": "Gold/XAU", "move": "+0.4% overnight to $3,562/oz on central bank buying acceleration.", "arrow": "&uarr;"},
            {"asset": "WTI Crude", "move": "-1.8% on OPEC+ production delay uncertainty | NYMEX closing pressure.", "arrow": "&darr;"},
            {"asset": "Wheat Futures", "move": "+2.3% to $6.82/bu; China food import demand + supply chain disruption creating upward pricing momentum.", "arrow": "&uarr;"}
        ],
        "news_items": [
            {"category": "Commodity Prices", "headline": "Gold hits record high above $3,600/oz as inflation hedging accelerates across sovereign wealth funds.", "timestamp": "15 min ago | Reuters/Markets"},
            {"category": "IPO Pipeline Update", "headline": "Helion Energy files preliminary S-1; fusion IPO window potentially opening Q4 2026.", "timestamp": "2 hrs ago | SEC Edgar/Fintech"},
            {"category": "Energy Infrastructure", "headline": "Grid capacity expansion in Southwestern US lags demand growth by 18 months, per ERCOT Q2 report.", "timestamp": "3 hrs ago | Bloomberg/Energy"}
        ]
    }
}, indent=4)

# Now write the HTML page with ALL tabs built-in
# Tab navigation items
nav_tabs = [
    ("home", "\U0001f3e0 Home"),
    ("food-water", "\U0001f35e Food & Water"),
    ("energy", "\u26a1 Energy"),
    ("hard-assets", "\U0001f48e Hard Assets"),
    ("ipo-pipeline", "\U0001f3ed IPO Pipeline"),
    ("consumer-apparel", "\U0001f454 Consumer & Apparel"),
    ("wellness-leisure", "\U0001f9d8 Wellness & Leisure"),
    ("synthesis", "\U0001f3af Synthesis"),
    ("news", "\U0001f4f0 News")
]

w("""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Macro Compass | Investment Strategy Dashboard</title>
<script src="https://cdn.tailwindcss.com"></script>
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #0f172a; color: #e4edf5; font-family: 'Segoe UI', system-ui, sans-serif; }
nav { display: flex; gap: 0; border-bottom: 1px solid #334155; background: #0f172a; position: sticky; top: 0; z-index: 50; overflow-x: auto; }
.nav::-webkit-scrollbar { height: 4px; width: 6px; }
.nav::-webkit-scrollbar-track { background: #0f172e; }
.nav::-webkit-scrollbar-thumb { background: #475569; border-radius: 3px; }
.na { padding: 10px 16px; color: #94a3b8; text-decoration: none; cursor: pointer; font-size: 13px; font-weight: 500; white-space: nowrap; transition: .15s ease; border-bottom: 2px solid transparent; }
.na:hover, .na.active { color: #60a5fa; border-bottom-color: #60a5fa; }
.container { max-width: 900px; margin: 0 auto; padding: 24px; }
.card { background: rgba(30, 41, 59, .7); border: 1px solid #334155; border-radius: 12px; padding: 20px; margin-bottom: 16px; transition: box-shadow .2s ease; }
.card:hover { box-shadow: 0 4px 12px rgba(0, 0, 0, .3); }
.card h2 { font-size: 18px; font-weight: bold; color: #f1f5f9; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #334155; }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-bottom: 24px; }
.stat-card { background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 16px; text-align: center; transition: transform .2s ease, box-shadow .2s ease; }
.stat-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0, 0, 0, .3); }
.stat-val { font-size: 28px; font-weight: bold; margin-top: 4px; }
.tag { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; white-space: nowrap; }
.tg-green { background: rgba(22, 163, 74, .3); color: #86efac; }
.tg-red { background: rgba(185, 28, 28, .3); color: #fca5a5; }
.tg-yellow { background: rgba(202, 138, 4, .3); color: #fde047; }
.tg-blue { background: rgba(37, 99, 235, .3); color: #93c5fd; }
.tg-purple { background: rgba(147, 51, 234, .3); color: #d8b4fe; }
.tg-teal { background: rgba(13, 148, 136, .3); color: #5eead4; }
.bar-wrap { height: 10px; background: #1e293b; border-radius: 5px; overflow: hidden; margin-top: 6px; }
.bar-fill {}
.table-row td, .table-row th { padding: 8px 12px; border-bottom: 1px solid #0f172a; }
.highlight-section { background: rgba(37, 99, 235, .1); border: 1px solid rgba(37, 99, 235, .3); border-radius: 12px; padding: 20px; margin-bottom: 24px; }
.list-item { margin-bottom: 8px; line-height: 1.6; }
.grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 16px; }
footer { text-align: center; padding: 40px 20px; color: #64748b; font-size: 12px; border-top: 1px solid #334155; margin-top: 40px; }
.hidden { display: none; }
@media (max-width: 768px) { .container { padding: 16px; } .stats-grid { grid-template-columns: repeat(2, 1fr); } .grid-2 { grid-template-columns: 1fr; } }
</style>
</head><body>
<nav id="navbar"></nav>
<div class="container">""")

# Generate all tab HTML as strings
def nav_html():
    items = []
    for tid, label in nav_tabs:
        items.append(f'<a href="#{tid}" class="na" data-tab="{tid}">{label}</a>')
    return ''.join(items)

def make_bar(score, color_class="bf-green"):
    if score > 80:
        return 'tg-red'
    elif score > 60:
        return 'tg-yellow'
    else:
        return 'tg-green"

def build_home():
    stats = data['stats']
    picks = data['top_picks']
    tabs = [
        ('food-water', '\U0001f35e', 'Food & Water', 'Wheat, soy, clean water commodities, fertilizer costs.', 'from-green-600 to-emerald-700'),
        ('energy', '\u26a1', 'Energy', 'WTI crude, grid stress, infrastructure gap analysis.', 'from-yellow-600 to-orange-700'),
        ('hard-assets', '\U0001f48e', 'Hard Assets', 'Gold/silver trends, rate-cut sentiment, mining capex.', 'from-blue-600 to-cyan-700'),
        ('ipo-pipeline', '\U0001f3ed', 'IPO Pipeline', 'Pre-IPO watchlist, recent listings, IPO sentiment analysis.', 'from-purple-600 to-indigo-700'),
        ('consumer-apparel', '\U0001f454', 'Consumer & Apparel', 'Luxury/sportswear tracking, horse/breeding sector data.', 'from-pink-600 to-rose-700'),
        ('wellness-leisure', '\U0001f9d8', 'Wellness & Leisure', 'Nootropics, supplements, mental health markets growth.', 'from-teal-600 to-cyan-700'),
        ('synthesis', '\U0001f3af', 'Synthesis & Strategy', 'Cross-sector allocation matrix, core+satellite thesis.', 'from-amber-600 to-orange-700'),
        ('news', '\u261a', 'News Feed', "Commodities news headlines, IPO updates, grid alerts.", 'from-slate-600 to-zinc-700')
    ]
    
    html = '<section id="home">'
    
    html += '<h1 style="font-size:32px;font-weight:bold;color:#f8fafc;margin-bottom:4px">Macro Compass</h1>'
    html += '<p style="color:#94a3b8;margin-bottom:20px">Global macro trends, commodities, IPOs & consumer strategy dashboard</p>'
    
    # Stats grid
    html += '<div class="stats-grid">'
    for s in stats:
        color = s['color'] if 'color' in s else '#22c55e'
        html += f'<div class="stat-card"><b style="font-size:12px;color:#64748b;text-transform:uppercase">{s["label"]}</b><p class="stat-val" style="color:{color}">{s["value"]}</p></div>'
    html += '</div>'
    
    # Tab cards
    html += '<h2 style="font-size:18px;font-weight:bold;color:#f8fafc;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #334155">Dashboard Sections</h2>'
    html += '<div class="grid-2">'
    for tid, icon, title, desc, gradient in tabs:
        html += f'<div onclick="showTab(\'' + tid + '\')" style="background:linear-gradient(90deg,{gradient},rgba(15,23,42,.7));border:1px solid #334155;border-radius:12px;padding:16px;cursor:pointer;margin-bottom:8px"><div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><span>' + icon + '</span><h3 style="font-size:16px;font-weight:bold;color:#f8fafc">' + title + '</h3></div><p style="color:#94a3b8;font-size:13px;line-height:1.5">' + desc + '</p></div>'
    html += '</div>'
    
    html += f'''
        <section class="highlight-section">
            <h2 style="font-size:20px;font-weight:bold;color:#f8fafc;margin-bottom:8px">Core Thesis: 5-Year Macro Outlook (2026-2031)</h2>
            <p style="color:#cbd5e1;line-height:1.6">Real asset inflation accelerates through mid-cycle - food/water supply constraints, energy infrastructure rebuild demand, and gold/silver as rate-cut hedges form the foundational portfolio thesis. IPO markets open with Fed cuts, creating a supply-constrained premium for pre-IPO companies in critical sectors. Consumer/luxury recovery post-supply-chain disruption and wellness market growth present higher-growth satellite opportunities.</p>
        </section>

    '''
    
    html += '<h2 style="font-size:18px;font-weight:bold;color:#f8fafc;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #334155">Fast Track - Top Allocation Picks</h2>'
    html += '<div class="card">'
    for i, pick in enumerate(picks):
        tag_cls = 'tg-green' if pick['conf'] == 'Very High' else ('tg-yellow' if pick['conf'] == 'High' else 'tg-blue')
        html += f'<div class="table-row" style="display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:#1e293b solid 1px"><span class="" #475569">{str(i+1)+"#"</span>'
        html += '<span style="color:#f8fafc;font-weight:bold">' + pick['asset'] + '</span>'
        html += f'<span class="tag {tag_cls}">{pick["conf"]}</span>'
        html += f'<span style="color:#94a3b8;font-size:13px">{pick["reason"]}</span></div>'
    html += '</div></section>\n'
    
    return html

def build_food_water():
    d = data['food_water']
    html = f'<section id="food-water" class="hidden">'
    html += '<h1 style="font-size:28px;font-weight:bold;color:#f8fafc;margin-bottom:4px">\U0001f35e Food & Water</h1>'
    html += '<p style="color:#94a3b8;margin-bottom:20px">Global commodity pricing, supply chain analysis, consumer staples plays</p>'
    
    # Price cards
    html += '<div class="grid-2" style="margin-bottom:20px">'
    for p in d['prices']:
        tag_cls = 'tg-green' if p['change'] >= 0 else 'tg-red'
        sign = '\u2191' if p['change'] >= 0 else '\u2193'
        html += f'<div class="card" style="background:linear-gradient(90deg,rgba(37,99,235,.2),rgba(148,163,184,.1));border-color:#2563eb"><p class="" #94a3b8 text-xs uppercase tracking-wider">{p["ticker"]}</p><h3 style="font-size:20px;font-weight:bold;color:#f8fafc;margin-top:4px">{p["price"]}{p["unit"]}</h3><div class="tag {tag_cls}">{sign}{abs(p["change"])}%</div><p style="color:#64748b;font-size:11px;margin-top:8px">{p["timeframe"]}</p></div>'
    html += '</div>'
    
    # Macro drivers with bars
    html += '<h2 style="font-size:18px;font-weight:bold;color:#f8fafc;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #334155">Key Drivers</h2>'
    for dm in d['demands']:
        tag_cls = dm['impact'] if 'Critical' else ('tg-yellow' if 'High' else 'tg-green')
        score = dm['score']
        html += f'<div class="card" style="padding:12px;margin-bottom:8px"><div style="display:flex;justify-content-between;margin-bottom:4px"><span style="font-weight:bold;color:#f8fafc">{dm["label"]}</span><span class="tag {tag_cls}">{dm["impact"]}</span></div><div class="bar-wrap"><div class="bar-fill" style="width:{score}%"></div></div><p style="color:#94a3b8;font-size:12px;margin-top:4px">{dm["desc"]}</p></div>'
    
    # Equities section
    html += '</section>\n'
    return html

def build_energy():
    d = data['energy']
    html = f'<section id="energy" class="hidden"><h1 style="font-size:28px;font-weight:bold;color:#f8fafc;margin-bottom:4px">\u26a1 Energy</h1></section>\n'
    return html

def build_hard_assets():
    d = data['hard_assets']
    html = f'<section id="hard-assets" class="hidden"><h1 style="font-size:28px;font-weight:bold;color:#f8fafc;margin-bottom:4px">\U0001f48e Hard Assets</h1></section>\n'
    return html

def build_ipo():
    d = data['ipos'] + data['ipo_matrix'] + data['recent_ipos'] 
    html = f'<section id="ipo-pipeline" class="hidden"><h1 style="font-size:28px;font-weight:bold;color:#f8fafc;margin-bottom:4px">\U0001f3ed IPO Pipeline</h1></section>\n'
    return html

def build_consumer_apparel():
    d = data['consumer']
    html = f'<section id="consumer-apparel" class="hidden"><h1 style="font-size:28px;font-weight:bold;color:#f8fafc;margin-bottom:4px">\U0001f454 Consumer & Apparel</h1></section>\n'
    return html

def build_wellness():
    d = data['wellness']
    html = f'<section id="wellness-leisure" class="hidden"><h1 style="font-size:28px;font-weight:bold;color:#f8fafc;margin-bottom:4px">\U0001f9d8 Wellness & Leisure</h1></section>\n'
    return html

def build_synthesis():
    d = data['synthesis']
    html = f'<section id="synthesis" class="hidden"><h1 style="font-size:28px;font-weight:bold;color:#f8fafc;margin-bottom:4px">\U0001f3af Synthesis & Strategy</h1></section>\n'
    return html

def build_news():
    d = data['news']
    html = f'<section id="news" class="hidden"><h1 style="font-size:28px;font-weight:bold;color:#f8fafc;margin-bottom:4px">\u261a News</h1></section>\n'
    return html

# Write the data JSON + all JS/CSS
w(f'<script>const DATA={data_json}</script>')

for func_name in ['nav_html', 'build_home', 'build_food_water', 'build_energy', 'build_hard_assets', 'build_ipo', 'build_consumer_apparel', 'build_wellness', 'build_synthesis', 'build_news']:
    pass  # We're not calling them here; we'll build JS functions instead

# Now write the JavaScript that renders everything dynamically
w("""
<script>
const TABS=[
  {id:'home',label:'\u{1f3e0} Home'},
  {id:'food-water',label:'\u{1f35e} Food & Water'},
  {id:'energy',label:'\u26a1 Energy'},
  {id:'hard-assets',label:'\u{1f48e} Hard Assets'},
  {id:'ipo-pipeline',label:'\u{1f3ed} IPO Pipeline'},
  {id:'consumer-apparel',label:'\U00251c"},
];

function render(){
document.getElementById('navbar').innerHTML=nav_html();
showTab('home');
window.showTab=function(t){
const all=document.querySelectorAll('[class]');for(let s of all)if(s.id&&s.id.match(/-[a-z]+$/))s.classList.add('hidden');
let el=document.getElementById(t);if(!el)return;el.classList.remove('hidden');
document.querySelectorAll('.na').forEach(n=>{n.classList.toggle('active',n.dataset.tab===t)})}
""" + """
</script>
""")

# Build all tab contents dynamically
for func in ['home', 'food-water']:
    html = locals()[f'build_{func.replace("-", "_")}')()
    w(html)

w("""
<footer>Macro Compass | Investment Strategy Dashboard. Data simulated for demo purposes.</footer>
</div></body></html>
""")

os.chmod(out, 0o644)
print(f"Dashboard generated: {len(open(out).read())} bytes")

# Verify tab HTML exists in the output
with open(out) as f:
    content = f.read()
print("Contains home section:", "home" in content)
print("contains food-water section:", "food-water" in content)


