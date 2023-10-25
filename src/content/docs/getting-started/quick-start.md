---
title: Quick Start
description: Get up and running right away!
---

This will contain the instructions for installing **rhp**.

```bash
npm i react-html-plots@latest
```

After installation give a simple example of using rhp. This can also can double as a test that the package is installed correctly. The example can also serve to show how quick one can get a plot constructed.

```typescript
import BarPlot from 'react-html-plots'

const App = () => {
    return (
        <div id="plot-container">
            <Scale {...props}>
            <BarPlot {...props}>
        </div>
    )
}
```