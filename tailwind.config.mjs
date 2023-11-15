import starlightPlugin from '@astrojs/starlight-tailwind';
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			screens: {
				'3xs': '280px',
				'2xs': '360px',
				'xs': '412px',
				'xsm': '540px',
				'2col': '800px',
				'mdlg': '912px',
				'3col': '1152px',
			},
		},
	},
	plugins: [starlightPlugin(), nextui( {
		themes: {
			light: {
				colors: {
					background: "rgb(255, 255, 255)", // or DEFAULT
					primary: "#f2cc8f",
					input: "hsla(234, 37%, 27%, 0.041)"
					// ... rest of the colors
				},
			},
			dark: {
				colors: {
					background: "rgb(46, 47, 67)", // or DEFAULT
					primary: "#f2cc8f",
					input: "hsla(0, 0%, 0%, 0.23)"
				},
			// ... rest of the colors
			},
		},
	})],
}
