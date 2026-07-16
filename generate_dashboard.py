#!/usr/bin/env python3
"""Generate the complete Macro Compass dashboard as a single self-contained HTML file."""
import json, os

OUTPUT = '/home/hermes/projects/macro-compass/macro-compass-final.html'

# All dashboard data
DATA = {
    "stats": [
        {"label": "S&P 500", "value": "$5,728", "color": "#22c55e"},
        {"label": "DXY (Dollar)", "value": "103.5", "color": "#eab308"},
        {"label": "Fed Cut Sentiment", "value": "62%", "color": "#3b82f6"},
        {"label": "Oil Implied Vol", "value": "28", "color": "#ef4444"}
    ],
    "top_picks": [
        {"asset": "Gold (GLD)", "conf": "Very High", "reason": "Rate cut hedge + central bank buying acceleration"},
        {asset": "Primo Water (PWR), conf": "High", reason": "Water scarcity pricing power + regulatory tailwinds"},
        {"asset": "Tesla Energy (TSLA)", "conf": "High", "reason": "Grid infrastructure demand cycle"},
        {"asset": "Helion Energy (Pre-Ipo)", "conf": "Medium", "reason": "Fusion commercialization catalyst pending SEC"}
    ],
    "food_water": {
        "prices": [
            {"ticker": "WHEAT/SRW", "name": "Chicago Wheat Futures", "price": "$6.82", "unit": "/bushel", "change": 2.3, "timeframe": "CBOT | Jul 15 2026"},
            {"ticker": "SOY/KCZ", "name": "Soybean Futures", "price": "$9.70", "unit": "/bushel", "change": -1.8, "timeframe": "CBOT | Aug 2026"},
            {ticker: "PWR/NASDAQ", name: "Primo Water Corp (Staples Play)", price: "$38.90", unit: "/share", change: 4.2, timeframe: "Q2 Earnings Beat"}
        ],
        "price_history": [
            {"date": "Jan", "wheat": 5.6, "soybeans": 11.8},
            {"date": "Feb", "wheat": 5.9, "soybeans": 12.0},
            {"date": "Mar", "wheat": 6.2, "soybeans": 11.5},
            {date: "Apr", wheat: 6.4, soybeans: 11.9}
        ],
        "demands": [
            {"label": "China Food Demand Shift", "score": 92, "impact": "Critical"},
            {"label": "US Wheat Export Constraints", "score": 68, "impact": "High"},
            {label: "Fertilizer Input Inflation", score: 75, impact
