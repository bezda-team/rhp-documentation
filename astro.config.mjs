import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import starlight from '@astrojs/starlight';
import react from "@astrojs/react";
import solid from "@astrojs/solid-js";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
    title: 'rhp',
    social: {
      github: 'https://github.com/bezda-team/rhp'
    },
    sidebar: [{
      label: 'Getting Started',
      items: [{
        label: 'Introduction',
        link: '/getting-started/introduction/'
      }, {
        label: 'Quick Start',
        link: '/getting-started/quick-start/'
      }, {
        label: 'Installation',
        link: '/getting-started/installation/'
      }]
    }, {
      label: 'Guides',
      items: [
        // Each item here is one entry in the navigation menu.
        {
          label: 'Components',
          link: '/guides/components/'
        }, {
          label: 'Templates',
          link: '/guides/templates/'
        }, {
          label: 'State Management',
          link: '/guides/state-management/'
        }
      ]
    }, {
      label: 'Tutorials',
      items: [
        // Each item here is one entry in the navigation menu.
        {
          label: 'Bar Chart',
          link: '/tutorials/bar-chart/'
        }
      ]
    },{
      label: 'Examples',
      items: [
        {
          label: 'Box and Whisker Plots',
          link: '/examples/box-and-whisker-plots/'
        },
        {
          label: 'Bar Plots',
          link: '/examples/bar-plots/'
        }
      ]
    },{
      label: 'Gallery',
      link: '/gallery/'
    },{
      label: 'Reference',
      autogenerate: {
        directory: 'reference'
      }
    }],
    customCss: [
    // Relative path to your custom CSS file
    './src/tailwind.css',
    './src/customizations/styles/custom1.css'],
    components: {
      Header: './src/customizations/components/Header.astro',
      Hero: './src/customizations/components/Hero.astro', // the default hero, except on the gallery page
      PageTitle: './src/customizations/components/PageTitle.astro' // the default title, with a link back above it on a gallery plot page
    }
  }),
  // React draws the docs' v1 components (src/customizations); Solid draws the gallery (src/gallery), which runs rhp 2.
  react({ include: ["**/customizations/**"] }),
  solid({ include: ["**/gallery/**"] }),
  tailwind({
    // Disable the default base styles:
    applyBaseStyles: false,
  })],
  vite: {
    resolve: {
      // "@bezda/rhp" is the build of rhp 2 in vendor/rhp (npm run sync-rhp) until rhp 2 is published: then install it and drop this alias.
      alias: {
        "@bezda/rhp": fileURLToPath(new URL("./vendor/rhp/index.js", import.meta.url)),
        "@gallery": fileURLToPath(new URL("./src/gallery", import.meta.url)), // so the examples' code reads "@gallery/ui/Poster.jsx"
      },
    },
  },
});