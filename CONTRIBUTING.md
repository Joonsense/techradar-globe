# Contributing to TechRadar Globe

Thanks for your interest in contributing! This is a solo-built open-source project — all PRs welcome.

---

## ✦ Adding a New Data Source

All data collectors live in `app.js`. Follow this pattern:

```js
async function fetchMySource() {
  try {
    const res = await fetch('https://api.example.com/endpoint');
    const json = await res.json();

    return (json.items || []).map(item => {
      const url = item.url;
      if (!url || seenUrls.has(url)) return null;
      seenUrls.add(url);

      const text = item.title + ' ' + (item.description || '');
      const loc  = getLocForSignal({ title: text });

      return {
        id:           url,
        source:       'mysource',          // must match SOURCES key
        title:        item.title,
        desc:         (item.description || '').slice(0, 180),
        url,
        published_at: item.created_at || new Date().toISOString(),
        tags:         detectTags(text),
        lat:          loc.lat,
        lon:          loc.lon,
        country:      loc.country,
        score:        Math.floor(Math.random() * 40 + 50),
        meta:         {},
      };
    }).filter(Boolean);
  } catch (e) {
    console.warn('mysource:', e.message);
    return [];
  }
}
```

Then:

1. Add your source to the `SOURCES` config object at the top of `app.js`:
   ```js
   mysource: { label: 'MY SOURCE', color: '#aabbcc', icon: '◆' }
   ```

2. Add a button in `index.html` inside `#source-bar`:
   ```html
   <button class="src-btn" data-source="mysource">◆ MYSOURCE</button>
   ```

3. Call your function inside `loadAll()`:
   ```js
   fetchMySource(),
   ```

4. Test locally: `python3 -m http.server 3001`

---

## ✦ Reporting Issues

Please open a [GitHub Issue](https://github.com/Joonsense/techradar-globe/issues) with:

- **Bug**: What happened vs. what you expected. Browser + OS.
- **Data source issue**: Which source, what error in DevTools console.
- **Feature request**: Describe the use case, not just the feature.

Label your issue: `bug` / `data-source` / `enhancement` / `design`

---

## ✦ Pull Request Guide

1. **Fork** the repo and create a branch:
   ```bash
   git checkout -b feat/my-new-source
   ```

2. **Make your changes** — keep PRs focused. One feature per PR.

3. **Test locally** before submitting:
   ```bash
   python3 -m http.server 3001
   open http://localhost:3001
   ```
   Check DevTools console for errors.

4. **Commit with a clear message**:
   ```bash
   git commit -m "feat: add ProductHunt data source"
   ```

5. **Open a PR** against `main` with:
   - What the PR does
   - How to test it
   - Screenshot if it's a visual change

---

## ✦ Code Style

- Plain vanilla JS — no build tools, no frameworks
- `async/await` for all API calls
- `try/catch` with `console.warn` for every fetch
- All strings through `esc()` before inserting into HTML
- Keep functions under ~40 lines where possible

---

## ✦ Areas Most Needed

| Area | Difficulty | Impact |
|------|-----------|--------|
| ProductHunt API | Easy | High |
| Electricity Maps carbon layer | Medium | High |
| Better mobile touch support | Medium | High |
| More country intel data | Easy | Medium |
| WebSocket real-time feed | Hard | High |
| Geocoding accuracy | Medium | Medium |

---

Questions? Open a Discussion or reach out: [@kaikimlabs](https://x.com/kaikimlabs)
