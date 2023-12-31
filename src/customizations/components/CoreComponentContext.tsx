import React from 'react';
import type { Vars } from '@bezda/rhp-core';
import { observable } from '@legendapp/state';
import type { Observable } from '@legendapp/state';

export type PlotContextType = {
    theme: Observable<object>,
    plotData: Observable<Array<number[]>>,
    dataMax: Observable<number>,
    vars: Observable<Vars>,
    orientation: Observable<number>,
}

export const CoreComponentContext = React.createContext<PlotContextType>(
    {
        theme: observable({}),
        plotData: observable([]),
        dataMax: observable(0),
        vars: observable({} as Vars),
        orientation: observable(0),
    }
);