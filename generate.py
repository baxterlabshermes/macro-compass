#!/usr/bin/env python3
import json, os

# This is the complete Macro Compass dashboard generator
OUTPUT = '/home/hermes/projects/macro-compass/dashboard.html'

def generate():
    out = open(OUTPUT, 'w', encoding='utf-8')
    
    # Build dashboard JSON data first to ensure it's valid
    dashboard_data = {
        "tabs": [
            {"id": "home", "name": "Home", "icon": "[EMOJI_HOME]"},
            {"id": "food-water", "name": "Food & Water", "icon": "[BREAD_ICONS]},
            {"id": "energy", "name": "Energy", "icon": "[BOLT_ICON]"},
            {"id": "hard-assets", "name": "Hard Assets", "icon": "[EMOJI_DIAMOND]"},
            {"id": "ipo-pipeline", "name": "IPO Pipeline", "icon": "[FACTORY_EMOJI]"},
            {"id": "consumer-apparel", "name": "Consumer & Apparel", "icon": "[CLOTHING_ICON]"},
            {"id": "wellness-leisure", "name": "Wellness & Leisure", "icon": "[MEDITATE_EMOJI]"},
            {"id": "synthesis", "name": "Synthesis & Strategy", "icon": "[TARGET_ICON]"},
            {"id": "news", "name": "News", "icon": "[NEWSPAPER_EMOJI]"}
        ],
    }
