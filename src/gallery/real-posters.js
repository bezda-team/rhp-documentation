// Published posters made from sourced data, in gallery order.
// npm run sync-real-posters copies each page, its data links, and its full-poster thumbnail from the rhp repository.
export const REAL_POSTERS = [
  {
    slug: "movie-bombs",
    initialViews: 11,
    title: "2026 movie loss forecasts",
    description: "The biggest comparable trade forecasts, with directors and stars.",
    source: "examples/real/movie-bombs",
    page: "movie-bombs.html",
    image: "movie-bombs.png",
    files: ["data.json", "forecasts.json", "selection-audit.json", "source-snapshot.json", "artwork-credits.json", "post.txt", "research.txt", "assets/ANTON-OFL.txt", "assets/IBM-PLEX-SANS-OFL.txt"],
  },
  {
    slug: "no-mans-sky",
    initialViews: 9,
    title: "No Man's Sky",
    description: "The launch year still accounts for 48% of its negative Steam reviews.",
    source: "examples/real/no-mans-sky",
    page: "no-mans-sky.html",
    image: "no-mans-sky.png",
    files: ["data.json", "reviews-by-year.csv", "fetch-data.mjs", "assets/SPACE-GROTESK-OFL.txt", "assets/IBM-PLEX-SANS-OFL.txt"],
  },
  {
    slug: "acid-rain",
    initialViews: 61,
    title: "The acid-rain cleanup",
    description: "EPA-covered U.S. power plants cut sulfur dioxide 94% while generating almost as much electricity.",
    source: "examples/real/acid-rain",
    page: "acid-rain-glass-animated.html",
    image: "acid-rain-glass-animated.png",
    files: ["data.json", "source-snapshot.json", "artwork-credits.json", "image-prompt.txt", "post.txt", "research.txt", "fetch-data.mjs", "assets/BARLOW-CONDENSED-OFL.txt", "assets/IBM-PLEX-SANS-OFL.txt"],
  },
  {
    slug: "destiny-players",
    initialViews: 8,
    title: "Destiny 2",
    description: "Steam player peaks around the farewell, final update, and revival news.",
    source: "examples/real/destiny-players",
    page: "destiny-players.html",
    image: "destiny-players.png",
    files: ["data.json", "daily-peaks.csv", "analyze.mjs", "artwork-credits.json", "raw-steamcharts.json", "archive-2026-06-07.json", "archive-2026-08-06.json", "announcement.json", "assets/SPACE-GROTESK-OFL.txt", "assets/IBM-PLEX-SANS-OFL.txt"],
  },
  {
    slug: "teen-tobacco",
    initialViews: 0,
    title: "Teen tobacco use",
    description: "U.S. high-school tobacco use fell 42% from 2022 to 2025, even as nicotine-pouch use rose.",
    source: "examples/real/teen-tobacco",
    page: "teen-tobacco.html",
    image: "teen-tobacco.png",
    files: ["data.json", "estimates.csv", "analyze.mjs", "source-snapshot.json", "artwork-credits.json", "assets/BARLOW-CONDENSED-OFL.txt", "assets/IBM-PLEX-SANS-OFL.txt"],
  },
];

export const realPosters = () => REAL_POSTERS.map((poster) => ({
  ...poster,
  url: `/gallery/real-posters/${poster.slug}/`,
}));
