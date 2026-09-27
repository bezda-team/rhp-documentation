import { defineCollection, z } from 'astro:content';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

// A gallery page (src/content/docs/gallery/<slug>.mdx) also says which plot it shows. Its example lives in
// src/gallery/examples/<slug>/: poster/ (the gallery version) and simple/.
const gallery = z.object({
	poster: z.string(), // the gallery version's headline: "Gold rush"
	simple: z.string(), // what the simple version shows
	order: z.number(),
	orientation: z.enum(['horizontal', 'vertical']), // the one it looks best in: the tile's, and the page's first
	theme: z.enum(['site', 'v1']).default('site'), // v1: a replica of v1's demos, drawn with v1's colors and font
	features: z.array(z.string()).default([]), // the rhp features it shows
});

export const collections = {
	docs: defineCollection({ schema: (context) => docsSchema()(context).extend({ gallery: gallery.optional() }) }),
	i18n: defineCollection({ type: 'data', schema: i18nSchema() }),
};
