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
npm run check-styles   # with npm run dev running: edit every gallery example's CSS in its editor, and check the chart restyles
```

- `src/content/docs/`: the pages: the home page (`index.mdx`), `start/`, `guides/`, `reference/` and `gallery/`.
- `src/demos/`: the live examples on the pages, one file each; the page shows the same file as its code.
- `src/gallery/`: the gallery's examples and playground (see its README).
- `src/customizations/`: the site's own components (the hero, the showcase, the diagram) and styles.
- `public/ai/rhp/`, `public/llms.txt` and `public/llms-full.txt`: written by `npm run sync-skill` from rhp's `skills/rhp/`; edit the skill there, not here.
  The served recipes also get a gallery link from `scripts/recipe-navigation.mjs` during sync.
