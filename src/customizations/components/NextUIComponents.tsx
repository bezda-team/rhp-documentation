import { useContext} from 'react';
import { PlotContext } from '@bezda/rhp-core';
import {Input} from "@nextui-org/react";
import { enableReactUse } from '@legendapp/state/config/enableReactUse';
enableReactUse();

export const DataInput = ({initialValue=4, onChange}:{initialValue?: number, onChange?: (value:number)=>void}) => {
    const {plotData} = useContext(PlotContext);
    plotData.use();
    return (
      <Input
          type="number"
          label=" "
          placeholder="0"
          radius='sm'
          classNames={{inputWrapper: ["bg-[var(--rhp-color-gray)]", "border-1", "dark:border-0", "border-[var(--sl-color-gray-5)]", "hover:border-1", "dark:hover:border-1", "hover:border-[var(--sl-color-text)]", "data-[hover=true]:bg-[var(--rhp-color-gray)]", "dark:group-data-[focus=true]:bg-[var(--sl-color-black)]", "group-data-[focus=true]:border-1", "group-data-[focus=true]:border-[var(--sl-color-text)]"]}}
          value={(plotData[0][0].get()??initialValue) + ''}
          onValueChange={(e) => {plotData[0][0].set(parseInt(e));}}
          labelPlacement="outside"
      /> 
    )
}
