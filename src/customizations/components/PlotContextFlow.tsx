import React, { useCallback, useState, useContext } from 'react';
import ReactFlow, {
    applyEdgeChanges,
    applyNodeChanges,
    Handle,
    Position,
    Controls,
    Background
} from 'reactflow';
import type {Edge, BackgroundVariant, EdgeChange, NodeChange, Node, NodeProps} from 'reactflow';
 
import type { FullBarElementType, Vars } from '@bezda/rhp-core';
import { observer, useObservable, useObserveEffect, useSelector } from '@legendapp/state/react';
import { observable, opaqueObject } from '@legendapp/state';
import {Input} from "@nextui-org/react";
import { SimpleBarPlot, SimpleBarPlotDataDep } from './SimpleBarPlot'

// import "../styles/text-updater-node.css";

import 'reactflow/dist/style.css';
  
const barTemplate: FullBarElementType[] = [
{
    type: "bar-content-container",
    elements: [{
                type: "bar-dec-container",
                elements: [
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
  
const templates = [barTemplate];

type NodeData = {label?: string, value?: number}

const initialNodes = [
    {
        id: "node-1",
        type: "inputNode",
        position: { x: 40, y: 225 },
        data: { value: 4 } as NodeData
    },
    {
        id: "node-2",
        type: "plotNode",
        targetPosition: "top" as Position,
        position: { x: 370, y: 200 },
        data: { label: "node 2", value: 0 } as NodeData
    },
    {
        id: "node-3",
        type: "contextDataNode",
        position: { x: 300, y: 0 },
        data: { label: "plotData", value: 0 } as NodeData
    }
] as Node[];

const initialEdges = [
    { id: "edge-1", source: "node-3", target: "node-2" },
    { id: "edge-2", source: "node-3", target: "node-1" }
] as Edge[];

const nodes = observable(initialNodes);
const edges = observable(initialEdges);

function InputNode({ data, isConnectable }: NodeProps<NodeData>) {

    const [currValue, setCurrValue] = useState(data.value);
    const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
        nodes[0].data.value.set(parseInt(evt.target.value));
        setCurrValue(parseInt(evt.target.value));
        console.log(nodes[0].data.value.peek());
      }, []);

    return (
        <div className="text-updater-node w-72 ml-4">
            <Handle
                type="target"
                position={Position.Top}
                isConnectable={isConnectable}
            />
            <div>
                <Input
                    type="number"
                    radius='sm'
                    classNames={{ inputWrapper: ["bg-[var(--rhp-color-gray)]", "dark:bg-[var(--rhp-color-gray-non-transparent)]", "border-1", "dark:border-0", "border-[var(--sl-color-gray-5)]", "hover:border-1", "dark:hover:border-1", "hover:border-[var(--sl-color-text)]", "data-[hover=true]:bg-[var(--rhp-color-gray)]", "dark:data-[hover=true]:bg-[var(--rhp-color-gray-non-transparent)]", "dark:group-data-[focus=true]:bg-[var(--sl-color-black)]", "group-data-[focus=true]:border-1", "group-data-[focus=true]:border-[var(--sl-color-text)]"]}}
                    value={currValue + ''}
                    onChange={onChange}
                    max={10}
                    min={0}
                    labelPlacement="outside"
                /> 
            </div>
        </div>
    );
}

function PlotNode({ data, isConnectable }: NodeProps<NodeData>) {

    const untrackedData = useObservable([[nodes[0].data.value.peek()]]);

    useObserveEffect(() => {
        const currValue = nodes[0].data.value.get();
        if (currValue !== untrackedData[0][0]) {
            untrackedData[0][0].set(currValue);
        }
    });

    return (
        <div className="text-updater-node">
            <Handle
                type="target"
                position={Position.Top}
                isConnectable={isConnectable}
            />
            <div>
                <SimpleBarPlotDataDep 
                    className="component-guide-s-plot" 
                    plotData={untrackedData} 
                    max={12.5} 
                    width="350px" 
                    labels={["A"]} 
                    color="var(--sl-color-text)" 
                    style={{marginTop: "1.5rem"}} 
                    height="90px" 
                    template={0}
                    showCCLabel={false}
                />
            </div>
        </div>
    );
}

function ContextDataNode({ data, isConnectable }: NodeProps<NodeData>) {

    const currValue = useSelector(nodes[0].data.value);
    // const [currValue, setCurrValue] = useState(data.value);
    // const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    //     nodes[0].data.value.set(parseInt(evt.target.value));
    //     setCurrValue(parseInt(evt.target.value));
    //     console.log(nodes[0].data.value.peek());
    //   }, []);

    return (
        <div className="text-updater-node">
            <div>
                {data.label + ": [[" + currValue + "]]"}
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                id="a"
                isConnectable={isConnectable}
            />
        </div>
    );
}

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { inputNode: InputNode, contextDataNode: ContextDataNode, plotNode: PlotNode };

export const PlotContextFlow = ({initialData, max, className="", width="100vw", height="100vw", color="black", labelColor, labels}:{initialData?: number, max?: number, className?: string, width?: string, height?: string, color?: string, labelColor?: string[], labels?: string[]}) =>{

    const currEdges = useSelector(edges);
    const currNodes = useSelector(nodes);

    return (
            <div className={"flow plot-context-flow " + className} style={{ width: width, height: height }}>
                <ReactFlow
                    nodes={nodes.get()}
                    edges={edges.get()}
                    onNodesChange={(changes: NodeChange[]) => {console.log(changes);nodes.set(applyNodeChanges(changes, nodes.get()));}}
                    onEdgesChange={(changes: EdgeChange[]) => edges.set(applyEdgeChanges(changes, edges.get()))}
                    nodeTypes={nodeTypes}
                    fitView
                >
                    <Controls />
                    <Background variant={"dots" as BackgroundVariant} gap={12} size={1} />
                </ReactFlow>
            </div>
    );
}