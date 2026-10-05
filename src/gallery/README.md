# The gallery

The gallery shows rhp plots live, at `/gallery/` and `/gallery/<slug>/`, in the site's look.
It is drawn with SolidJS, and every chart on it runs rhp in the page.

## Where things are

- `src/content/docs/gallery/index.mdx`: the gallery page, a splash page with a card per plot.
- `src/content/docs/gallery/<slug>.mdx`: a plot type's page (a splash page too), with its title and description, and under `gallery:` in the frontmatter its poster name, best orientation and features (the schema is in `src/content/config.ts`); the body says how it's built.
- `src/gallery/examples/<slug>/poster/`: the gallery version, the one the card shows.
- `src/gallery/examples/<slug>/simple/`: the simple version, the smallest code for the plot type.
- `src/gallery/ui/`: the playground (controls, live chart, code panel), the code editor, the poster panel and the site's chart themes.
- `src/customizations/components/gallery/`: the Astro pieces the pages use: the cards, an example with its header, and the pager.
- `src/customizations/styles/gallery.css`: the posters' looks, the v1 replicas' page boxes, the playground and the gallery's pages, in Starlight's colors.
- `src/assets/gallery/`: the cards' screenshots.
- `src/assets/recipes/`: the AI recipe cards' screenshots.
- `src/gallery/recipes.js`: the shared recipe list for the gallery and Build with AI table.
- `vendor/rhp/index.js`: the build of rhp 2 that `@bezda/rhp` points to until rhp 2 is published.

## An example's two files

Each version is two files, and the page shows both.
`chart.jsx` is the structure: data, slats and the chart.
`styles.js` is the look: each slat's CSS as a string, and the chart's theme.
The CSS strings are editable on the page, and the chart restyles as you type: the playground passes each edited string to rhp's `restyle()` for every slat type `chart.jsx` exports with that string.
So export every slat type from `chart.jsx`, and write each CSS string as `` export const name = `...` `` with no `${}` inside.
An example's component takes `p.o()`, `p.js()` and `p.seed()`: the orientation, the JS animation version, and a count that "New data" bumps.
The charts follow the site's theme menu (Starlight's `data-theme`), dark or light.

## Adding an example

1. Add `src/gallery/examples/<slug>/poster/` and `simple/`, each with `chart.jsx` and `styles.js`.
2. Add `src/content/docs/gallery/<slug>.mdx` like the others.
3. Build, then take the card's screenshot: `npm run build && npm run thumbnails <slug>`, and build again.

## AI recipes

The AI Recipes section links to every standalone recipe in `public/ai/rhp/recipes/`, in the skill's recipe order.
`npm run sync-skill` adds a gallery link to each served recipe while leaving the upstream recipe unchanged.
Run `npm run recipe-thumbnails` after syncing or changing a recipe, then `npm run build` to update the gallery.
Pass recipe names to capture only those pictures, for example `npm run recipe-thumbnails sparklines`.
The screenshot script uses the vendored chart library and the recipes' web fonts, and captures the poster without the surrounding page navigation.
Posters are rendered at 1280px so thumbnails keep the same layout and proportions as the desktop recipe pages.
The home page showcase mixes these recipes with the gallery examples and links each one with “Open recipe →”.
`RecipePoster.jsx` embeds the standalone interactive page, crops to its poster, and scales the desktop layout to the showcase column.

## Updating rhp

Build rhp 2 in its repository (`npm run build`), then run `npm run sync-rhp` here (the rhp repository is `../rhp` by default).
Once rhp 2 is on npm, install `@bezda/rhp`, remove the alias in `astro.config.mjs`, and delete `vendor/`.
