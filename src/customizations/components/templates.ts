import type { FullBarElementType } from '@bezda/rhp-core';

// Todo: Change name to something more reflective
// of the important characteristics of the template
const templateA: FullBarElementType[] = [
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
                CSS: "box-sizing: border-box;border-radius: 0 10px 10px 0;overflow: hidden;",
                markup: "<div style='background-color: {{color}};height:100%;width:100%;'></div>",
                },
                {
                type: "decoration",
                order: 1,
                useData: true,
                CSS: "height: 100%;aspect-ratio: 1/2;display: flex; justify-content: center;align-items: center;",
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

export const templates = [templateA];