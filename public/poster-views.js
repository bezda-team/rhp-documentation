const visitorId = () => {
  try {
    const key = 'rhp:poster-visitor';
    const saved = localStorage.getItem(key);
    if (saved && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(saved)) return saved;
    const id = crypto.randomUUID();
    localStorage.setItem(key, id);
    return id;
  } catch { return null; }
};
const counter = document.querySelector('[data-poster-views]');
if (counter) {
  const value = counter.querySelector('[data-view-count]');
  const full = new Intl.NumberFormat('en-US');
  const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 });
  try {
    const visitor = visitorId(), poster = counter.dataset.posterViews;
    const endpoint = visitor ? '/api/poster-views' : `/api/poster-views?poster=${encodeURIComponent(poster)}`;
    const response = await fetch(endpoint, {
      method: visitor ? 'POST' : 'GET',
      headers: visitor ? { 'Content-Type': 'application/json' } : {},
      body: visitor ? JSON.stringify({ poster, visitor }) : undefined,
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error('Count unavailable');
    const { views } = await response.json();
    if (!Number.isSafeInteger(views) || views < 0) throw new Error('Invalid count');
    value.textContent = views >= 10000 ? compact.format(views) : full.format(views);
    const description = `${full.format(views)} ${views === 1 ? 'visitor' : 'visitors'}`;
    counter.title = `${description}, counted once per browser`;
    counter.setAttribute('aria-label', description);
  } catch {
    value.textContent = '?';
    counter.title = 'Visitor count is temporarily unavailable';
    counter.setAttribute('aria-label', counter.title);
  }
}
