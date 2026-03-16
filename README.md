# 🌍 TechRadar Globe

> **Global Tech Intelligence Platform** — Track real-time IT trends,
> AI breakthroughs, and datacenter energy efficiency
> across the world on an interactive 3D globe.

![TechRadar Globe Demo](assets/demo.gif)

[![License: MIT](https://img.shields.io/badge/License-MIT-00ffcc.svg)](LICENSE)
[![No API Keys](https://img.shields.io/badge/API%20Keys-None%20Required-00ff88.svg)]()
[![Made with Globe.gl](https://img.shields.io/badge/Made%20with-Globe.gl-blue.svg)](https://globe.gl)
[![Stars](https://img.shields.io/github/stars/Joonsense/techradar-globe?style=social)]()

---

## ✦ What is TechRadar Globe?

TechRadar Globe is an open-source real-time intelligence platform
that visualizes the global pulse of technology — where breakthroughs
happen, where capital flows, and how efficiently the world's
AI infrastructure operates.

Inspired by military intelligence dashboards and
flight tracking systems like FlightRadar24,
but built for the tech world.

**No subscriptions. No API keys. Just open the browser.**

---

## ✦ Live Demo

🔗 **[techradar-globe.pages.dev](https://techradar-globe.pages.dev)**

---

## ✦ Screenshots

| Globe View | Country Intel Brief | Energy Layer |
|-----------|-------------------|--------------|
| ![globe](assets/screenshot-globe.png) | ![country](assets/screenshot-country.png) | ![energy](assets/screenshot-energy.png) |

---

## ✦ Features

### 🛰 Real-Time Signal Intelligence
- **AI Papers** — arXiv cs.AI / cs.LG / cs.CL / cs.CV latest research
- **GitHub Trending** — Most starred repositories globally
- **Hacker News** — Top stories with engagement scores
- **Dev.to** — Developer community articles
- **HuggingFace** — Trending AI models and downloads
- **Semantic Scholar** — Academic paper citations

### ⚡ Energy Intelligence Layer
- **30 major datacenters** mapped (AWS, Google, Microsoft, Meta, Oracle)
- **Real-time Green Score** calculated from:
  - Solar radiation (W/m²)
  - Wind speed (m/s)
  - Cooling efficiency (ambient temperature)
  - Estimated PUE (Power Usage Effectiveness)
- **Live/Night detection** — Solar score drops to 0 at night
- **30-second auto-refresh** via Open-Meteo API

### 🌐 Country Intelligence Brief
- Click any country → instant intel panel
- Tech Score, Key Hubs, Top Companies
- Trending technology vectors
- Live signal count per country

### 🖥 Military HUD Aesthetic
- JetBrains Mono throughout
- Cyan (`#00ffcc`) on deep space (`#020408`)
- Real-time UTC clock
- Event stream terminal log
- Timeline scrubber

---

## ✦ Data Sources (All Free, No Keys)

| Source | Data | Update Frequency |
|--------|------|-----------------|
| [arXiv](https://arxiv.org/help/api) | AI/ML research papers | Real-time |
| [GitHub](https://docs.github.com/en/rest) | Trending repositories | Hourly |
| [Hacker News](https://github.com/HackerNews/API) | Top stories | Real-time |
| [Dev.to](https://developers.forem.com/api) | Developer articles | Real-time |
| [HuggingFace](https://huggingface.co/docs/hub/api) | Trending AI models | Hourly |
| [Semantic Scholar](https://api.semanticscholar.org) | Paper citations | Daily |
| [Open-Meteo](https://open-meteo.com) | Weather & solar data | Hourly |

---

## ✦ Run Locally

```bash
git clone https://github.com/Joonsense/techradar-globe.git
cd techradar-globe
python3 -m http.server 3001
open http://localhost:3001
```

No build step. No npm install. Pure HTML/CSS/JS.

---

## ✦ Deploy (Cloudflare Pages)

1. Fork this repo
2. Go to [Cloudflare Pages](https://pages.cloudflare.com)
3. Connect your GitHub repo
4. Build command: *(leave empty)*
5. Output directory: `/`
6. Deploy ✓

---

## ✦ Architecture

```
techradar-globe/
├── index.html     # HUD layout, globe container, layer panels
├── style.css      # Military design system, all component styles
└── app.js         # Data collectors, globe render, DC energy layer
```

**Zero dependencies beyond CDN:**
- [Globe.gl v2](https://globe.gl) — WebGL 3D globe (Three.js)
- [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) — Font

---

## ✦ Green Score Formula

```js
solarScore   = current.shortwave_radiation / 800 * 100
windScore    = current.wind_speed_10m / 15 * 100
coolingScore = Math.max(0, (25 - current.temperature_2m) / 25 * 100)
greenScore   = Math.round((solarScore + windScore + coolingScore) / 3)
pueEstimate  = (1.2 + (current.temperature_2m / 100 * 0.3)).toFixed(2)
```

| Score | Rating | Color |
|-------|--------|-------|
| 90–100 | Excellent | 🟢 `#00ff88` |
| 70–89  | Good      | 🟡 `#aaff00` |
| 50–69  | Fair      | 🟠 `#ffaa00` |
| 0–49   | Poor      | 🔴 `#ff4444` |

---

## ✦ Contributing

PRs welcome. Particularly interested in:
- Additional signal sources (Product Hunt, LinkedIn, etc.)
- More datacenter locations
- WebSocket real-time updates

---

## ✦ License

MIT © [Joonsense](https://github.com/Joonsense)
