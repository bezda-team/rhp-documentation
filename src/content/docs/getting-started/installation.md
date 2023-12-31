---
title: Installation
description: Detailed information and instructions for installing rhp
---

The following installation provides the most flexible setup and is recommended for most projects. However, if you know you wont be using Legend-State for state management in your project (aside from passing in props to rhp components), or you know your components will always have access to the client's window object (client-side), you can install rhp with the dependencies built in. See [Other Installation Options](#other-installation-options) for more information.

```bash
npm i isomorphic-dompurify @legendapp/state@^1.11.1 @bezda/rhp-core
```
This command installs three packages: 
- [**isomorphic-dompurify**](https://www.npmjs.com/package/isomorphic-dompurify)
- [**@legendapp/state**](https://www.npmjs.com/package/@legendapp/state) (version 1.11.1)
- [**@bezda/rhp-core**](https://www.npmjs.com/package/@bezda/rhp-core)

## isomorphic-dompurify

**isomorphic-dompurify** is a dependency of **rhp** and is used to sanitize the HTML code of the plots. There are three things we will highlight here about **isomorphic-dompurify**:
- It is an isomorphic/universal wrapper around [DOMPurify](https://www.npmjs.com/package/dompurify). 
- The library makes it possible to seamlessly use DOMPurify on *server* and client in the same way.
- It is a DOM-only, super-fast, uber-tolerant XSS sanitizer for HTML, MathML and SVG.

Currently, the most versatile and reliable setup is to have it installed globally rather than locally. Meaning, it is recommended to have **isomorphic-dompurify** in the dependencies of your project's `package.json` file. Testing has shown that this works best in [Next.js](https://nextjs.org/) and [Astro](https://astro.build/) projects. 

## @legendapp/state

**Legend-State** is a fast and powerful state library that was chosen as the state management solution for **rhp** components for the following reasons:
- Easy to use
  - Easy to combine with React Context API
  - Change / Access state with simple `set` / `get` functions
  - Access state contents without causing re-renders using `peek` function (like using React's `useRef` hook).
- Can be used for global and local state needs
- Provides tools to help minimize re-renders
  - Provides special functions that observe quantities and pieces of state of your choosing and only trigger re-renders when changes in values are detected.
  - Provides special `<For>` component that is optimized for rendering arrays of children (React nodes/JSX) so that they are extracted into a separate tracking context and their re-renders don’t re-render the parent. It also has additional optimizations that improves performance and efficiency by re-using React nodes. 

To generalize, we landed on using **Legend-State** because of its simplicity, accessibility, compatibility, flexibility, and performance.

:::caution
We are in the process of updating **rhp** to use the latest version of **Legend-State**. Meanwhile, we recommend using version 1.11.1 of **@legendapp/state**.
:::

## rhp-core

As for **rhp-core**, it is recommended to use version 0.0.20 or higher.

You can install the latest version of **rhp-core** with the following command:
```bash
npm i @bezda/rhp-core@latest
```
or a specific version like version `0.0.20` with:
```bash
npm i @bezda/rhp-core@0.0.20
```

## Other Installation Options

To install **rhp** with the dependencies built-in (installed locally in rhp module), you can use the following command:
```bash
npm i @bezda/rhp
```

To install **rhp** with **Legend-State** built-in but isomorphic-dompurify installed globally, you can use the following command:
```bash
npm i isomorphic-dompurify @bezda/rhp-base
```

To summarize, **@bezda/rhp** includes both **isomorphic-dompurify** and **@legendapp/state** while **@bezda/rhp-base** includes just **@legendapp/state** and **@bezda/rhp-core** includes neither.