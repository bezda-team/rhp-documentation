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
        { label: 'Charts inside rows', link: '/guides/nesting/' },
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
      label: 'Gallery',
      link: '/gallery/'
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
      PageTitle: './src/customizations/components/PageTitle.astro' // the default title, with a link back above it on a gallery plot page
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