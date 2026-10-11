# rhp website

The home of rhp (reactive html plots): the home page, the guides and reference, and the gallery of live charts.
Live at https://rhp.vercel.app.

Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).
The gallery and the live examples run rhp itself, drawn with SolidJS.

## Working on it

```sh
npm install
npm run dev            # http://localhost:4321
npm run build          # the site, in dist/
npm run sync-rhp       # copy rhp's build (../rhp, after npm run build there) into vendor/rhp
npm run sync-skill     # copy rhp's AI skill (../rhp/skills/rhp, or RHP_DIR=<rhp repo>) into public/ai/rhp, and write public/llms.txt and public/llms-full.txt
npm run thumbnails     # the gallery page's pictures, after a poster changes
npm run recipe-thumbnails # the AI recipe cards' pictures, after a recipe changes
npm run sync-articles  # copy the articles rhp's examples build (../rhp, or RHP_DIR=<rhp repo>) into public/gallery/articles
npm run article-thumbnails # the article cards' pictures, after an article changes
npm run check-styles   # with npm run dev running: edit every gallery example's CSS in its editor, and check the chart restyles
```

- `src/content/docs/`: the pages: the home page (`index.mdx`), `start/`, `guides/`, `reference/` and `gallery/`.
- `src/demos/`: the live examples on the pages, one file each; the page shows the same file as its code.
- `src/gallery/`: the gallery's examples and playground (see its README).
- `src/customizations/`: the site's own components (the hero, the showcase, the diagram) and styles.
- `public/ai/rhp/`, `public/llms.txt` and `public/llms-full.txt`: written by `npm run sync-skill` from rhp's `skills/rhp/`; edit the skill there, not here.
  The served recipes also get a gallery link from `scripts/recipe-navigation.mjs` during sync.
- `public/gallery/articles/`: written by `npm run sync-articles` from the articles' builds in the rhp repo (listed in `src/gallery/articles.js`), each with a link back to the gallery in place of its kicker and the site's theme; edit the article there, not here.

## Article statistics on Vercel

The article sync copies each registered statistics API into `api/` and adds its endpoint metadata to the hosted article.
The production postbuild packages the static Astro site and these APIs with Vercel's Build Output API, using `scripts/vercel-output.mjs`.
The original static pages and legacy redirects retain their paths.
The generated function uses the production Redis credentials from the project environment.

After building the site, run `node scripts/check-vercel-output.mjs` to check the page routes, redirects, and packaged Node API over HTTP.
The counter's Redis tests and storage configuration are documented in the vocabulary example in the rhp repository.
