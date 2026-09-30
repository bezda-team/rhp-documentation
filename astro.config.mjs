import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import starlight from '@astrojs/starlight';
import solid from "@astrojs/solid-js";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // The v1 docs' pages, sent to where their topics are now (old links, and the repo's website link).
  redirects: {
    '/getting-started/introduction': '/start/introduction/',
    '/getting-started/installation': '/start/install/',
    '/getting-started/quick-start': '/start/first-chart/',
    '/guides/components': '/guides/blocks/',
    '/guides/templates': '/reference/slat/',
    '/guides/state-management': '/guides/data/',
    '/tutorials/bar-chart': '/start/first-chart/',
    '/examples/bar-plots': '/gallery/bar-chart/',
    '/examples/box-and-whisker-plots': '/gallery/box-plot/',
    '/reference/example': '/reference/chart/',
  },
  integrations: [starlight({
    title: 'rhp',
    // rhp's logo, with no square behind it, stands for the title (npm run icons builds it and every icon from
    // src/assets/rhp-splash.svg)
    logo: { dark: './src/assets/rhp-logo.svg', light: './src/assets/rhp-logo-light.svg', replacesTitle: true },
    // Safari takes the legacy link first and reads an .ico for certain, so that one is the .ico; the SVG is declared
    // beside it the standard way, with a size of its own (Safari skips an SVG icon that has none). ?v=2 gives each one
    // a URL that no browser has filed against these pages before.
    favicon: '/favicon.ico',
    head: [
      { tag: 'link', attrs: { rel: 'icon', type: 'image/svg+xml', href: '/favicon-rhp.svg?v=2' } },
      { tag: 'link', attrs: { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-rhp-32.png?v=2' } },
      { tag: 'link', attrs: { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-rhp-16.png?v=2' } },
      { tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png?v=2' } },
      { tag: 'link', attrs: { rel: 'manifest', href: '/site.webmanifest' } },
    ],
    social: {
      github: 'https://github.com/bezda-team/rhp'
    },
    sidebar: [{
      label: 'Start here',
      items: [
        { label: 'What is rhp?', link: '/start/introduction/' },
        { label: 'Install', link: '/start/install/' },
        { label: 'Your first chart', link: '/start/first-chart/' },
      ],
    }, {
      label: 'Guides',
      items: [
        { label: 'Data', link: '/guides/data/' },
        { label: 'Blocks', link: '/guides/blocks/' },
        { label: 'Styling', link: '/guides/styling/' },
        { label: 'Colors and themes', link: '/guides/themes/' },
        { label: 'Scales and axes', link: '/guides/scales/' },
        { label: 'Sorting and motion', link: '/guides/motion/' },
        { label: 'Layout and orientation', link: '/guides/layout/' },
        { label: 'Charts inside slats', link: '/guides/nesting/' },
        { label: 'Interaction', link: '/guides/interaction/' },
        { label: 'Screen readers', link: '/guides/accessibility/' },
        { label: 'Server rendering', link: '/guides/server/' },
        { label: 'Other frameworks', link: '/guides/other-frameworks/' },
      ],
    }, {
      label: 'Reference',
      items: [
        { label: 'Chart', link: '/reference/chart/' },
        { label: 'Plot', link: '/reference/plot/' },
        { label: 'Scale', link: '/reference/scale/' },
        { label: 'Blocks', link: '/reference/blocks/' },
        { label: 'slat()', link: '/reference/slat/' },
        { label: 'Helpers', link: '/reference/helpers/' },
        { label: 'CSS', link: '/reference/css/' },
      ],
    }, {
      label: 'Examples',
      items: [
        { label: "Animated dots", link: '/examples/animated-dots/' },
        { label: "Bar chart", link: '/examples/bar-chart/' },
        { label: "Box and whisker", link: '/examples/box-plot/' },
        { label: "Values on hover", link: '/examples/hover-values/' },
        { label: "Grouped bars", link: '/examples/grouped-bars/' },
        { label: "Stacked bars", link: '/examples/stacked-bars/' },
        { label: "100% segmented bars", link: '/examples/segmented-bars/' },
        { label: "Unit bars", link: '/examples/unit-bars/' },
        { label: "Population pyramid", link: '/examples/population-pyramid/' },
        { label: "Diverging bars", link: '/examples/diverging-bars/' },
        { label: "Waterfall", link: '/examples/waterfall/' },
        { label: "Bullet chart", link: '/examples/bullet-chart/' },
        { label: "Histogram", link: '/examples/histogram/' },
        { label: "Violin plot", link: '/examples/violin-plot/' },
        { label: "Strip plot", link: '/examples/strip-plot/' },
        { label: "Stem plot", link: '/examples/stem-plot/' },
        { label: "Dumbbell", link: '/examples/dumbbell/' },
        { label: "Heatmap", link: '/examples/heatmap/' },
        { label: "Gantt timeline", link: '/examples/gantt/' },
        { label: "Candlestick", link: '/examples/candlestick/' },
        { label: "Skyline", link: '/examples/skyline/' },
      ],
    }],
    customCss: [
    // rhp's stylesheet, once for every chart on a page (src/gallery/ui/setup.js calls linkedCss)
    '@bezda/rhp/rhp.css',
    // Relative path to your custom CSS file
    './src/tailwind.css',
    './src/customizations/styles/custom1.css'],
    components: {
      Header: './src/customizations/components/Header.astro',
      Hero: './src/customizations/components/Hero.astro', // the default hero, except on the gallery page
      PageTitle: './src/customizations/components/PageTitle.astro', // the default title, with a link back above it on a gallery plot page
      Footer: './src/customizations/components/Footer.astro' // the default footer, with a site footer under it on the landing page and in the gallery
    }
  }),
  // Solid draws the gallery (src/gallery) and the live demos (src/demos), and compiles rhp's source (the package's
  // "solid" export), which it takes as an app does.
  solid({ include: ["**/gallery/**", "**/demos/**", "**/vendor/rhp/**", "**/@bezda/rhp/**"] }),
  tailwind({
    // Disable the default base styles:
    applyBaseStyles: false,
  })],
  vite: {
    resolve: {
      alias: {
        "@gallery": fileURLToPath(new URL("./src/gallery", import.meta.url)), // so the examples' code reads "@gallery/ui/Poster.jsx"
      },
    },
  },
});