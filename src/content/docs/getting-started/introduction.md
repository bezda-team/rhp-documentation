---
title: Introduction
description: Introduction to React Html Plots, a plotting library for build html plots using React
---

React Html Plots (**rhp**) is a library of React components for building html charts and infographics. This library contains a variety of components, from those that quickly produce plots from data with little configuration required, to those that provide greater configuration, customization, and control. You will also find all the components used to build the plot components in the library, allowing you to build your own custom plot components.

## Why rhp?

**rhp** prioritizes customization, interactivity, and integrability with html and CSS. These priorities are reflected in fundamental design decisions, such as the use of pure HTML and CSS to construct plots.

Most libraries that use the React framework to build plots, do so using libraries that construct and manipulate SVGs or Canvas.  The benefit to using just html and CSS include:
- potential for better browser support (past, present, and future)
- easier to style and manipulate plots with javascript/css and other web technologies
- greater content support/flexibility. For example, you can put almost anything you want inside like gifs, videos, and other html elements


### Why React?

The React framework also encourages building reusable pieces of code. This means that you can build a component once, and use it many times throughout your application. Why not use a component many times to build a plot! ***Note:*** *this paradigm goes hand in hand with the idea of using a "template" to construct a component (which you can then repeat/stack to build a plot or infographic).*

Core React component design patterns encourage grouping related visual elements together which makes it easier to build complex user interfaces. This is especially useful for building plots and infographics, which are often composed of different groups of related visual elements.

One particular React design pattern called the compound component pattern is especially useful when these groups of visual elements depend on the same pieces of data for state. Consider a simple plot with a scale. The content of the plot area changes when the data being visualized changes. At the same time, the scale must change if the data range changes. Both parts of the plot are impacted by changes in the same data. The same concepts may apply to other parts of the plot like the plot legend. The idea can be extended to include different plots of the same data (like in multi-plot visualizations) or visual/UI elements outside the plot like tables and inputs.

#### Performance
React uses a Virtual DOM to improve performance, which can be a bottleneck in web applications. The Virtual DOM is a lightweight representation of the actual DOM, and React uses it to compare the previous and current states of the application. This allows React to optimize webpage performance by making the minimum changes possible to the DOM as infrequently as possible so that updates can be rendered quickly. 

##### Legend-State: Fast and Efficient State Management
However, minimizing re-renders also depends on how each component is structured and how their state is managed. On this note, much has been done to ensure that the components in **rhp** re-render as little as possible. For example, one of the behind-the-scenes reasons for using "templates" (see [Templates guide](../../guides/templates/) for more on this..) is to generate structurally repetitive sections of charts/infographics using [Legend-State](https://github.com/LegendApp/legend-state) library's `For` component to take extra advantage of the library's fast and efficient state handling. In fact, we chose to use Legend-State to manage the state of all the components in **rhp** because it is reliably fast and efficient.

#### Most Popular Front-End Framework
React is the most popular front-end framework by a large margin. This comes with a lot of benefits such as a large developer community. **rhp** is an open-source library that will depend on the community for input, feedback, and contributions. The hope is that with a larger community, this library could be more rapidly developed, and receive better support in the future.

## Design Principles
- designed to be easy to use. The library is designed to be easy to use and understand. 
- designed to be flexible and extensible. The library is built using a number of small components that can be used to build larger components.
- designed to be easy to style, manipulate, and make interactive. Plots are designed to be easy to style and manipulate using css and javascript.
- core components are designed to use "templates" to construct repetitive component structures and configuration. This makes customizations and configurations easier to transfer to other components (new or old). 
<!-- These can also be used as a basis for creating other "templates" which means you dont always have to start from scratch when customizing and configuring components. -->

## Summary
- **rhp** uses HTML, CSS, and basic React components to construct plots.
- **rhp** uses "templates" to construct repetitive component structures and configuration.
- **rhp** offers components that require very little customization/configuration, components that offer greater customization/configuration, and all the components that were used as to build both.
- **rhp** components are React components designed to minimize re-renders and DOM changes.
- **rhp** uses [Legend-State](https://github.com/LegendApp/legend-state) to manage state efficiently.

