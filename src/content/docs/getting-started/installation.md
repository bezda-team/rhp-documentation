---
title: Installation
description: Detailed information and instructions for installing rhp
---

To add **rhp** package to your project, run the following command:

```bash
npm i isomorphic-dompurify react-html-plots
```
This command installs two packages: [**isomorphic-dompurify**](https://www.npmjs.com/package/isomorphic-dompurify) and [**react-html-plots**](https://www.npmjs.com/package/react-html-plots).

## isomorphic-dompurify

**isomorphic-dompurify** is a dependency of **react-html-plots** and is used to sanitize the HTML code of the plots. There are three things we will highlight here about **isomorphic-dompurify**:
- It is an isomorphic/universal wrapper around [DOMPurify](https://www.npmjs.com/package/dompurify). 
- The library makes it possible to seamlessly use DOMPurify on *server* and client in the same way.
- It is a DOM-only, super-fast, uber-tolerant XSS sanitizer for HTML, MathML and SVG.

Currently, the most versatile and reliable setup is to have it installed globally rather than locally. Meaning, it is recommended to have **isomorphic-dompurify** in the dependencies of your project's `package.json` file. Testing has shown that this works best in [Next.js](https://nextjs.org/) and [Astro](https://astro.build/) projects. 

## react-html-plots

As for **rhp**, it is recommended to use version 0.0.18 or higher.

You can install the latest version of **rhp** with the following command:
```bash
npm i react-html-plots@latest
```
or a specific version like version `0.0.11` with:
```bash
npm i react-html-plots@0.0.11
```