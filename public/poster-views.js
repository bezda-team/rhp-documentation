const counter = document.querySelector('[data-poster-views]');
if (counter) {
  const value = counter.querySelector('[data-view-count]');
  const full = new Intl.NumberFormat('en-US');
  const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 });
  try {
    const response = await fetch('/api/poster-views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ poster: counter.dataset.posterViews }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error('Count unavailable');
    const { views } = await response.json();
    if (!Number.isSafeInteger(views) || views < 0) throw new Error('Invalid count');
    value.textContent = views >= 10000 ? compact.format(views) : full.format(views);
    counter.title = `${full.format(views)} total ${views === 1 ? 'view' : 'views'}`;
    counter.setAttribute('aria-label', counter.title);
  } catch {
    value.textContent = '?';
    counter.title = 'View count is temporarily unavailable';
    counter.setAttribute('aria-label', counter.title);
  }
}
