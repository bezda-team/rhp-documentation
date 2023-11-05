import React from "react";
import {Card, Skeleton} from "@nextui-org/react";

export default function AltBgSkeleton({className}:{className?:string}) {
  return (
    <div className={className}>
      <Card className="w-[600px] justify-center space-y-0 p-4 bg-[color:var(--rhp-color-gray)]" radius="lg">
        <div className="w-full h-10 opacity-70 bg-[color:#00000022] dark:bg-[color:#ffffff22] flex flex-col justify-center">
          <Skeleton className="w-2/5 opacity-70 rounded-lg bg-[color:var(--sl-color-text)] dark:bg-[color:var(--sl-color-text)]">
            <div className="h-3 w-3/5 rounded-lg"></div>
          </Skeleton>
        </div>
        <div className="w-full h-11 opacity-70 flex flex-col justify-center">
          <Skeleton className="w-5/5 opacity-70 rounded-lg bg-[color:var(--sl-color-text)] dark:bg-[color:var(--sl-color-text)]">
            <div className="h-3 w-3/5 rounded-lg"></div>
          </Skeleton>
        </div>
        <div className="w-full h-10 opacity-70 bg-[color:#00000022] dark:bg-[color:#ffffff22] flex flex-col justify-center">
          <Skeleton className="w-1/5 opacity-70 rounded-lg bg-[color:var(--sl-color-text)] dark:bg-[color:var(--sl-color-text)]">
            <div className="h-3 w-3/5 rounded-lg"></div>
          </Skeleton>
        </div>
        <div className="w-full h-11 opacity-70 flex flex-col justify-center">
          <Skeleton className="w-3/5 opacity-70 rounded-lg bg-[color:var(--sl-color-text)] dark:bg-[color:var(--sl-color-text)]">
            <div className="h-3 w-3/5 rounded-lg"></div>
          </Skeleton>
        </div>
        <div className="w-full h-10 opacity-70 bg-[color:#00000022] dark:bg-[color:#ffffff22] flex flex-col justify-center">
          <Skeleton className="w-4/5 opacity-70 rounded-lg bg-[color:var(--sl-color-text)] dark:bg-[color:var(--sl-color-text)]">
            <div className="h-3 w-3/5 rounded-lg"></div>
          </Skeleton>
        </div>
      </Card>
    </div>
    
  );
}
