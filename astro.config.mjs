import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from "@astrojs/react";

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
        }
      ]
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
      Header: './src/customizations/components/Header.astro'
    }
  }), react(), tailwind({
    // Disable the default base styles:
    applyBaseStyles: false,
  })]
});