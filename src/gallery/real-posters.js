// Published posters made from sourced data, in gallery order.
// npm run sync-real-posters copies each page, its data links, and its full-poster thumbnail from the rhp repository.
export const REAL_POSTERS = [
  {
    slug: "no-mans-sky",
    title: "No Man's Sky",
    description: "The launch year still accounts for 48% of its negative Steam reviews.",
    source: "examples/dataisbeautiful/no-mans-sky",
    page: "no-mans-sky.html",
    image: "no-mans-sky.png",
    files: ["data.json", "reviews-by-year.csv", "fetch-data.mjs", "assets/SPACE-GROTESK-OFL.txt", "assets/IBM-PLEX-SANS-OFL.txt"],
  },
  {
    slug: "destiny-players",
    title: "Destiny 2",
    description: "Steam player peaks around the farewell, final update, and revival news.",
    source: "examples/dataisbeautiful/destiny-players",
    page: "destiny-players.html",
    image: "destiny-players.png",
    files: ["data.json", "daily-peaks.csv", "analyze.mjs", "raw-steamcharts.json", "archive-2026-06-07.json", "archive-2026-08-06.json", "announcement.json", "assets/SPACE-GROTESK-OFL.txt", "assets/IBM-PLEX-SANS-OFL.txt"],
  },
];

export const realPosters = () => REAL_POSTERS.map((poster) => ({
  ...poster,
  url: `/gallery/real-posters/${poster.slug}/`,
}));
