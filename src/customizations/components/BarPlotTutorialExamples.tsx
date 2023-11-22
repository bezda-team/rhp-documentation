import { useContext } from 'react';
import { useObservable } from '@legendapp/state/react';
import { PlotContext, SegmentPlot } from '@bezda/rhp-core';
import type { Vars } from '@bezda/rhp-core';

export const SimpleBarPlot = () => {

  // Create plot state variables (observables) that the context provider requires.
  // The PlotContext.Provider will provide these variables to all child components.
  const plotData = useObservable([[10], [4], [6], [7]]);
  const vars = useObservable({
    "color": ["var(--sl-color-text)"],  
    "bar-val": ["A"],
  } as Vars);
  const dataMax = useObservable(10);

  // You can create/use global state variables if you desire
  const { theme, orientation } = useContext(PlotContext);

  // The SegmentPlot component requires only a width and height prop.
  return (
    <PlotContext.Provider value={{ plotData: plotData, dataMax: dataMax, orientation: orientation, theme: theme, vars: vars }}>
      <SegmentPlot
        width="565px"
        height="358px"
      />
    </PlotContext.Provider>
  )
}