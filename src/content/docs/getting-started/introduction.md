---
title: Introduction
description: Introduction to React Html Plots, a plotting library for build html plots using React
---

React Html Plots (**rhp**) is a library of React components for building html charts and infographics. This library includes components that generate plots given just plot data and very little configuration as well as components that allow for greater configuration and control. **rhp** also provides all the components used as the building blocks, allowing anyone to build their own plot/infographic components.

Why might you want to create your own custom components? One reason might be you want to generate plots with a unique asthetic that ties to you or your organization's brand (and not the plotting libraries). Another reason might be you want to create a plot that is not included in the library or other libraries. 

Regardless, use whatever components you want to build your plots. Its really up to you!

## Behind the scenes
Most libraries that use the React framework to build plots, do so using libraries that construct and manipulate SVGs or Canvas. **rhp**, instead, constructs plots using HTML and CSS (and basic react components). This has a number of advantages, including:
- better browser support (past, present, and future)
- easier to style and manipulate plots with javascript/css and other web technologies
- greater flexibility. For example, you can put almost anything you want inside like gifs, videos, and other html elements


### Why React?

#### Performance
React uses a Virtual DOM to improve performance, which can be a bottleneck in web applications. The Virtual DOM is a lightweight representation of the actual DOM, and React uses it to compare the previous and current states of the application. This allows React to optimize webpage performance by making the minimum changes possible to the DOM as infrequently as possible so that updates can be rendered quickly. 

##### Legend-State: Fast and Efficient State Management
However, how well React is able to minimize changes and re-renders depends on how each component is structured and how their state is managed. On this note, much has been done to ensure that the components in **rhp** re-render as little as possible. For example, one of the behind-the-scenes reasons for using "templates" (see [Templates guide](../../guides/templates/) for more on this..) is to generate structurally repetitive sections of charts/infographics using [Legend-State](https://github.com/LegendApp/legend-state) library's `For` component to take extra advantage of the library's fast and efficient state handling. In fact, we chose to use Legend-State to manage the state of all the components in **rhp** because it is reliably fast and efficient.

#### Reusable components: 
React components are self-contained, reusable pieces of code that can be used to build complex user interfaces. This means that you can build a component once, and use it many times throughout your application. Why not use a component many times to build a plot! Note that this paradigm goes hand in hand with the idea of using a "template" to construct a component (which you can then repeat/stack to build a plot or infographic).


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

