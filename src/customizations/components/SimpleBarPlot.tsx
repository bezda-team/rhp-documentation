import { useObservable } from '@legendapp/state/react';
import { useContext, useMemo, useRef } from 'react';
import { PlotContext, SegmentPlot } from '@bezda/rhp-core';
import type { FullBarElementType, Vars } from '@bezda/rhp-core';
import { opaqueObject } from '@legendapp/state';
import type { Observable } from '@legendapp/state';

// custom bar template
const barTemplateWBlckLabels: FullBarElementType[] = [
  {
    type: "bar-content-container",
    elements: [{
      type: "bar-dec-container",
      elements: [
        {
          type: "bar",
          order: 0,
          CSS: "display: grid;place-items: center;box-sizing: border-box;border-radius: 0 10px 10px 0;overflow: hidden;height: auto; transition-property: flex, border;transition-duration: 1s;transition-timing-function: ease-in-out;& div {display:flex;align-items: center;opacity: 0.5;transition: opacity 0.3s ease-in-out;text-align: center;}& div > span {opacity: 0;color: var(--sl-color-bg);font-weight:500;transition: opacity 0.3s ease-in-out;}",
          markup: "<div style='background-color: {{color}};height:100%;width:100%;justify-content: center;'><span>block</span></div>",
        },
        {
          type: "decoration",
          order: 1,
          useData: true,
          CSS: "align-items: center;height: 100%;& > div {opacity: 0.5;transition: opacity 0.3s ease-in-out;transition: border 0.4s ease-in; border-style: none; border-width: 3px;}",
          markup: "<div style='border-radius: 10px;border-color: {{color}};color: {{color}};height: 100%;aspect-ratio: 1/1;display: grid;place-items: center;grid-template: 1fr / 1fr;'><div class='block-value' style='transition: opacity 0.2s ease-in-out;grid-column: 1 / 1; grid-row: 1 / 1;'>{{$dataValue}}</div><div class='block-text' style='transition: opacity 0.2s ease-in-out 0.2s;opacity: 0;grid-column: 1 / 1; grid-row: 1 / 1;'>block</div></div>",
        },
        {
          type: "decoration",
          order: 2,
          useData: true,
          CSS: "flex: 52px!important;justify-content:flex-end;margin-right:24px;display:flex;align-items: center;height: 100%;& > span {width: fit-content;text-wrap: nowrap;opacity: 0;transition: opacity 0.3s ease-in-out; color: var(--sl-color-accent-high)} .full-bar:hover & > span {opacity: 1;}",
          markup: "<span style='display: {{display}};'>core component</span>",
        },
      ],
      CSS: "padding-top: 12px;padding-bottom: 12px;gap: 24px;background: none;& .bar-decoration > div:hover {opacity: 1;border-style: solid;}& .bar > div:hover {opacity: 1;}& .bar > div:hover span {opacity: 1;}& .bar-decoration > div:hover .block-text {opacity: 1!important;}& .bar-decoration > div:hover .block-value {opacity: 0;}",
      decorationWidth: "52px",
      order: 1,
    },
    ],
    decorationWidth: "10%",
    order: 1,
    CSS: "overflow: visible!important;",
  },
  {
    type: "decoration",
    order: 0,
    CSS: "height: 100%;opacity: 0.5;transition: opacity 0.3s ease-in-out;&:hover {opacity: 1;} &:hover .block-text {opacity: 1!important;} &:hover .block-value {opacity: 0;}",
    markup: "<div style='width: 100%; height: 100%; border-right:  3px solid {{color}};padding-top: 12px;padding-bottom: 12px;'><div style='border-radius: 10px;border: 3px solid {{color}};height: 100%;aspect-ratio: 1/1;margin-right: 24px;margin-left: 24px;display: grid;place-items: center;grid-template: 1fr / 1fr;'><div class='block-value' style='transition: opacity 0.2s ease-in-out;grid-column: 1 / 1; grid-row: 1 / 1;'>{{bar-label}}</div><div class='block-text' style='transition: opacity 0.2s ease-in-out 0.2s;opacity: 0;grid-column: 1 / 1; grid-row: 1 / 1;'>block</div></div></div>",
  }
];

const barTemplate: FullBarElementType[] = [
  {
    type: "bar-content-container",
    elements:
      [
        {
          type: "bar-dec-container",
          elements:
            [
              {
                type: "bar",
                order: 0,
                CSS: "box-sizing: border-box;border-radius: 0 10px 10px 0;overflow: hidden;height: auto; transition-property: flex;transition-duration: 0.4s;transition-timing-function: ease-in-out;",
                markup: "<div style='background-color: {{color}};height:100%;width:100%;'></div>",
              },
              {
                type: "decoration",
                order: 1,
                useData: true,
                CSS: "height: 100%;aspect-ratio: 1/2;display: flex; justify-content: center;align-items: center;opacity: 0; transition: opacity 0.4s ease-in-out;.full-bar:hover & {opacity: 1;}",
                markup: "<div style='color: {{color}};'>{{$dataValue}}</div>",
              },
            ],
          CSS: "padding-top: 12px;padding-bottom: 12px;background: none;",
          decorationWidth: "52px",
          order: 1,
        },
      ],
    decorationWidth: "10%",
    order: 1,
  },
  {
    type: "decoration",
    order: 0,
    CSS: "height: 100%;",
    markup: "<div style='width: 100%; height: 100%; border-right:  3px solid {{label-color}};padding-top: 12px;padding-bottom: 12px;'><div style='color: {{label-color}};height: 100%;aspect-ratio: 1/1;margin-right: 8px;margin-left: 8px;display: flex; justify-content: center;align-items: center;'><span>{{bar-label}}</span></div></div>",
  }
];

const templates = [barTemplate, barTemplateWBlckLabels];

export const SimpleBarPlot = ({ dataArray, labels, max = 10, className = "", style = {}, width = "600px", height = "600px", scale = 1, decorationWidth = "2.9rem", color = "black", labelColor, showCCLabel = true, template = 1 }: { dataArray?: number[][], labels?: string[], max?: number, className?: string, style?: React.CSSProperties, width?: string, height?: string, scale?: number, decorationWidth?: string, color?: string | string[], labelColor?: string[], showCCLabel?: boolean, template?: number }) => {
  // const renderCount = ++useRef(0).current;
  // console.log("Test APP: " + renderCount);

  const colors = Array.isArray(color) ? color : [color]

  const plotData = useObservable(dataArray ?? [[4], [4], [4], [4]]);
  const vars = useObservable({
    "z-index": ["10"],
    "color": colors,
    "display": showCCLabel ? ["unset"] : ["none"],
    "bar-label": labels ?? ["A"],
    "label-color": opaqueObject(labelColor ?? colors),
  } as Vars);
  const dataMax = useObservable(max ?? 10);

  const { theme, orientation } = useContext(PlotContext);

  return (
    <PlotContext.Provider value={{ plotData: plotData, dataMax: dataMax, orientation: orientation, theme: theme, vars: vars }}>
      <div id='plot' className={'plot ' + className} style={{ margin: "auto", display: "grid", justifyContent: "center", overflow: "hidden", transform: "scale(" + scale + ")", ...style }} >
        <SegmentPlot
          id='bar_plot'
          width={width}
          height={height}
          decorationWidth={decorationWidth}
          style={{ margin: "auto" }}
          segmentTemplate={templates[template]}
        />
      </div>
    </PlotContext.Provider>
  )
}

export const SimpleBarPlotDataDep = ({ plotData, labels, max = 10, className = "", style = {}, width = "600px", height = "600px", scale = 1, decorationWidth = "2.9rem", color = "black", labelColor, showCCLabel = true, template = 1 }: { plotData: Observable<number[][]>, labels?: string[], max?: number, className?: string, style?: React.CSSProperties, width?: string, height?: string, scale?: number, decorationWidth?: string, color?: string | string[], labelColor?: string[], showCCLabel?: boolean, template?: number }) => {
  // const renderCount = ++useRef(0).current;
  // console.log("Test APP: " + renderCount);

  const colors = Array.isArray(color) ? color : [color]

  const vars = useObservable({
    "z-index": ["10"],
    "color": colors,
    "display": showCCLabel ? ["unset"] : ["none"],
    "bar-label": labels ?? ["A"],
    "label-color": opaqueObject(labelColor ?? colors),
  } as Vars);
  const dataMax = useObservable(max ?? 10);

  const { theme, orientation } = useContext(PlotContext);

  return (
    <PlotContext.Provider value={{ plotData: plotData, dataMax: dataMax, orientation: orientation, theme: theme, vars: vars }}>
      <div id='plot' className={'plot ' + className} style={{ margin: "auto", display: "grid", justifyContent: "center", overflow: "hidden", transform: "scale(" + scale + ")", ...style }} >
        <SegmentPlot
          id='bar_plot'
          width={width}
          height={height}
          decorationWidth={decorationWidth}
          style={{ margin: "auto" }}
          segmentTemplate={templates[template]}
        />
      </div>
    </PlotContext.Provider>
  )
}  