// The site links rhp's stylesheet once, on every page (astro.config.mjs, customCss), so its charts leave it out of their
// HTML and the browser uses the page's copy. Imported by every island that draws a chart, so it runs on the server and
// in the browser before any chart draws.
import { linkedCss } from "@bezda/rhp";
linkedCss();
