import React from 'react';
import { SegmentPlot } from '@bezda/rhp-core';
import type { FullBarElementType, Vars } from '@bezda/rhp-core';
import { PlotContext } from '@bezda/rhp-core';
import { useObservable } from '@legendapp/state/react';
import { DataInput } from './NextUIComponents';

// custom bar template
const barTemplate: FullBarElementType[] = [
  {
    type: "bar-content-container",
    elements: [{
                  type: "bar-dec-container",
                  elements: [
                              {
                                type: "bar",
                                order: 0,
                                CSS: "display: grid;place-items: center;box-sizing: border-box;border-radius: 0 10px 10px 0;overflow: hidden;height: auto; transition-property: flex, border;transition-duration: 0.5s;transition-timing-function: ease-in-out;& div {display:flex;align-items: center;opacity: 0.5;transition: opacity 0.3s ease-in-out;text-align: center;}& div > span {opacity: 0;color: var(--sl-color-bg);font-weight:500;transition: opacity 0.3s ease-in-out;}",
                                markup: "<div style='background-color: {{color}};height:100%;width:100%;justify-content: center;'><span>block</span></div>",
                              },
                              {
                                type: "decoration",
                                order: 1,
                                useData: true,
                                CSS: "align-items: center;height: 100%;& > div {opacity: 0.5;transition: opacity 0.3s ease-in-out;transition: border 0.4s ease-in; border-style: none; border-width: 3px;}",
                                markup: "<div style='border-radius: 10px;border-color: {{color}};color: {{color}};height: 100%;aspect-ratio: 1/1;display: grid;place-items: center;grid-template: 1fr / 1fr;'><div class='block-value' style='transition: opacity 0.2s ease-in-out;grid-column: 1 / 1; grid-row: 1 / 1;'>{{$dataValue}}</div><div class='block-text' style='transition: opacity 0.2s ease-in-out 0.2s;opacity: 0;grid-column: 1 / 1; grid-row: 1 / 1;'>block</div></div>",
                              },
                            ],
                  CSS: "padding-top: 12px;padding-bottom: 12px;gap: 24px;background: none;& .bar-decoration > div:hover {opacity: 1;border-style: solid;}& .bar > div:hover {opacity: 1;}& .bar > div:hover span {opacity: 1;}& .bar-decoration > div:hover .block-text {opacity: 1!important;}& .bar-decoration > div:hover .block-value {opacity: 0;}",
                  decorationWidth: "52px",
                  order: 1,
                }, 
              ],
    decorationWidth: "10%",
    order: 1,
    CSS:"overflow: visible!important;margin-right: 113px;",
  },
  {
    type: "decoration",
    order: 0,
    CSS: "height: 100%;opacity: 0.5;transition: opacity 0.3s ease-in-out;&:hover {opacity: 1;} &:hover .block-text {opacity: 1!important;} &:hover .block-value {opacity: 0;}",
    markup: "<div style='width: 100%; height: 100%; border-right:  3px solid {{color}};padding-top: 12px;padding-bottom: 12px;'><div style='border-radius: 10px;border: 3px solid {{color}};height: 100%;aspect-ratio: 1/1;margin-right: 24px;margin-left: 24px;display: grid;place-items: center;grid-template: 1fr / 1fr;'><div class='block-value' style='transition: opacity 0.2s ease-in-out;grid-column: 1 / 1; grid-row: 1 / 1;'>{{bar-label}}</div><div class='block-text' style='transition: opacity 0.2s ease-in-out 0.2s;opacity: 0;grid-column: 1 / 1; grid-row: 1 / 1;'>block</div></div></div>",
  }
];

 export const CoreComponent = ({dataArray, labels, className, plotClassName="", style={}, width="600px", height="600px", scale=1, decorationWidth="2.9rem", color="black"}:{dataArray?: number[][], labels?: string[], className?: string, plotClassName?: string, style?: React.CSSProperties, width?: string, height?: string, scale?: number, decorationWidth?: string, color?: string}) => {
    
    const data = useObservable(dataArray??[[4]]);
    const variables = useObservable({
                                "z-index": ["10"],
                                "color": [color],
                                "bar-label": labels??["A"],
                                } as Vars);
    const dataMaximum = useObservable(10);
    const theme = useObservable({});
    const orientation = useObservable(0);

    return (
      <div className={className}>
        <PlotContext.Provider value={{plotData: data, vars: variables, dataMax: dataMaximum, theme: theme, orientation: orientation}}>
          <DataInput /> 
          <div id='plot' className={'plot ' + plotClassName} style={{margin: "auto", display: "grid", justifyContent: "center", overflow: "hidden", transform: "scale("+ scale + ")", ...style}} > 
              <SegmentPlot
                  id='bar_plot'
                  width={width}
                  height={height}
                  decorationWidth={decorationWidth}
                  style={{ margin: "auto"}}
                  segmentTemplate={barTemplate}
              />
          </div> 
        </PlotContext.Provider>
      </div>
  )
}