// src/plot.jsx
import { ssr as _$ssr2 } from "solid-js/web";
import { ssrStyle as _$ssrStyle } from "solid-js/web";
import { ssrAttribute as _$ssrAttribute2 } from "solid-js/web";
import { escape as _$escape2 } from "solid-js/web";
import { ssrHydrationKey as _$ssrHydrationKey2 } from "solid-js/web";
import { createComponent as _$createComponent } from "solid-js/web";

// src/rhp.css
var rhp_default = "@layer rhp.core{:where(.rhp-body,.rhp-axis,.rhp-gridline,.rhp-gridline>span,.rhp-plot,.rhp-plot>*,.rhp-bar,.rhp-dot,.rhp-tick,.rhp-label,.rhp-cell,.rhp-place,.rhp-area,.rhp-area path,.rhp-line,.rhp-line path){display:revert;box-sizing:border-box;margin:0;padding:0;border:0 solid transparent;border-radius:0;box-shadow:none;outline:revert;outline-offset:revert;background:none;overflow:visible;float:none;min-width:0;min-height:0;max-width:none;max-height:none;vertical-align:baseline;transition:none;animation:none;text-decoration:none;user-select:auto;touch-action:auto;font:inherit;font-synthesis:inherit;letter-spacing:inherit;word-spacing:inherit;text-transform:inherit;text-indent:inherit;text-align:inherit;text-shadow:inherit;color:inherit;white-space:inherit;text-rendering:inherit;-webkit-font-smoothing:inherit;-moz-osx-font-smoothing:inherit;-webkit-text-stroke:inherit;-webkit-tap-highlight-color:inherit;word-break:inherit;overflow-wrap:inherit;hyphens:inherit;line-break:inherit;print-color-adjust:inherit}:where(.rhp-body,.rhp-axis,.rhp-gridline,.rhp-gridline>span,.rhp-plot,.rhp-plot>:not(svg,img,canvas,video,iframe,embed,object),.rhp-bar,.rhp-dot,.rhp-tick,.rhp-label,.rhp-cell){width:auto;height:auto}:where(:root:active-view-transition .rhp-plot>*){view-transition-name:none}:where(.rhp-body,.rhp-axis,.rhp-gridline,.rhp-gridline>span,.rhp-plot,.rhp-plot>*,.rhp-bar,.rhp-dot,.rhp-tick,.rhp-label,.rhp-cell,.rhp-place,.rhp-area,.rhp-line)[hidden]{display:none}:where(.rhp-body,.rhp-axis,.rhp-plot,.rhp-plot>*):before,:where(.rhp-body,.rhp-axis,.rhp-plot,.rhp-plot>*):after{display:none}:is(.rhp-label,.rhp-gridline>span)::selection,:is(.rhp-label,.rhp-gridline>span,.rhp-bar,.rhp-dot,.rhp-tick,.rhp-cell) ::selection{color:HighlightText;background-color:Highlight;text-shadow:none}.rhp-chart{--rhp-min: 0;--rhp-max: 100;--rhp-inset: 18%;padding-top:var(--rhp-pad-top, 2px);padding-right:var(--rhp-pad-right, 2px);padding-bottom:var(--rhp-pad-bottom, 2px);padding-left:var(--rhp-pad-left, 2px)}.rhp-body{all:initial}.rhp-body{position:relative;display:grid;width:100%;direction:ltr;container-type:inline-size;visibility:inherit;pointer-events:inherit;-webkit-tap-highlight-color:inherit;font:400 12px/1.15 var(--rhp-font);color:var(--rhp-ink);print-color-adjust:exact}.rhp-chart[data-rhp-o=h]:not([data-rhp-aspect])>.rhp-body{height:auto}.rhp-chart[data-rhp-o=v]:not([data-rhp-aspect])>.rhp-body{height:var(--rhp-height, 240px)}.rhp-chart[data-rhp-o=h][data-rhp-sized]:not([data-rhp-aspect])>.rhp-body{height:var(--rhp-height)}.rhp-chart[data-rhp-aspect]{box-sizing:border-box;aspect-ratio:var(--rhp-aspect);min-height:0}.rhp-chart[data-rhp-aspect]>.rhp-body{height:100%}.rhp-body>*{grid-area:1 / 1;min-width:0;min-height:0}.rhp-axis{position:relative;pointer-events:none}.rhp-axis[data-rhp-o=h]{clip-path:inset(-100vh calc(-1 * var(--rhp-axis-ends, 28px)))}.rhp-axis[data-rhp-o=v]{clip-path:inset(calc(-1 * var(--rhp-axis-ends, 28px)) -100vw)}.rhp-gridline{position:absolute;--rhp-p: calc((var(--rhp-at) - var(--rhp-min)) / (var(--rhp-max) - var(--rhp-min)))}.rhp-gridline[data-rhp-o=h]{top:0;bottom:0;left:calc(var(--rhp-p) * 100%);border-left:1px solid var(--rhp-grid)}.rhp-gridline[data-rhp-o=v]{left:0;right:0;bottom:calc(var(--rhp-p) * 100%);border-bottom:1px solid var(--rhp-grid)}.rhp-gridline>span{position:absolute;font-size:11px;line-height:1;color:var(--rhp-muted);white-space:nowrap;font-variant-numeric:tabular-nums}.rhp-axis[data-rhp-grid=off]>.rhp-gridline{border-color:transparent}.rhp-gridline[data-rhp-o=h]>span{top:calc(100% + 5px);left:0;translate:-50% 0}.rhp-gridline[data-rhp-o=v]>span{right:calc(100% + 6px);bottom:0;translate:0 50%}.rhp-plot{position:relative;z-index:1}.rhp-plot[data-rhp-o=h],.rhp-bar[data-rhp-o=h]:not([data-rhp-back]){--rhp-toward-end: to right}.rhp-plot[data-rhp-o=v],.rhp-bar[data-rhp-o=v]:not([data-rhp-back]){--rhp-toward-end: to top}.rhp-bar[data-rhp-o=h][data-rhp-back]{--rhp-toward-end: to left}.rhp-bar[data-rhp-o=v][data-rhp-back]{--rhp-toward-end: to bottom}.rhp-body>.rhp-plot[data-rhp-o=h]:not([data-rhp-overlap]){height:calc(var(--rhp-n) * var(--rhp-pitch, 32px))}.rhp-chart[data-rhp-sized]>.rhp-body>.rhp-plot[data-rhp-o=h]:not([data-rhp-overlap]){height:calc(var(--rhp-n) * var(--rhp-pitch, 100% / var(--rhp-n)))}.rhp-body>.rhp-plot[data-rhp-o=v]:not([data-rhp-overlap]){width:calc(var(--rhp-n) * var(--rhp-pitch, 100% / var(--rhp-n)))}.rhp-body>.rhp-plot[data-rhp-overlap][data-rhp-o=h]{min-height:var(--rhp-pitch, 32px)}.rhp-plot>*>.rhp-plot,.rhp-plot>.rhp-plot{--rhp-pitch: initial}.rhp-plot>*>.rhp-plot{position:absolute}.rhp-plot[data-rhp-o=h]>*>.rhp-plot{top:calc((100% - var(--rhp-plot-thick, 100%)) / 2);right:0;bottom:calc((100% - var(--rhp-plot-thick, 100%)) / 2);left:0}.rhp-plot[data-rhp-o=v]>*>.rhp-plot{top:0;right:calc((100% - var(--rhp-plot-thick, 100%)) / 2);bottom:0;left:calc((100% - var(--rhp-plot-thick, 100%)) / 2)}.rhp-bar,.rhp-area,.rhp-line{--rhp-lo: clamp(0, (min(var(--rhp-from), var(--rhp-to)) - var(--rhp-min)) / (var(--rhp-max) - var(--rhp-min)), 1);--rhp-hi: clamp(0, (max(var(--rhp-from), var(--rhp-to)) - var(--rhp-min)) / (var(--rhp-max) - var(--rhp-min)), 1)}.rhp-dot,.rhp-tick,.rhp-label,.rhp-place{--rhp-p: calc((var(--rhp-at) - var(--rhp-min)) / (var(--rhp-max) - var(--rhp-min)))}.rhp-bar,.rhp-dot,.rhp-tick,.rhp-label,.rhp-cell,.rhp-place,.rhp-area,.rhp-line{position:absolute}.rhp-bar,.rhp-dot,.rhp-tick,.rhp-label,.rhp-cell{clip-path:var(--rhp-clip, none)}.rhp-area[data-rhp-o=h],.rhp-line[data-rhp-o=h]{left:calc(var(--rhp-lo) * 100%);width:calc((var(--rhp-hi) - var(--rhp-lo)) * 100%)}.rhp-area[data-rhp-o=v],.rhp-line[data-rhp-o=v]{bottom:calc(var(--rhp-lo) * 100%);height:calc((var(--rhp-hi) - var(--rhp-lo)) * 100%)}.rhp-bar[data-rhp-o=h]{left:calc(var(--rhp-lo) * 100%);width:calc((var(--rhp-hi) - var(--rhp-lo)) * 100% - var(--rhp-gap, 0%))}.rhp-bar[data-rhp-o=h]:not([data-rhp-back]){left:calc(var(--rhp-lo) * 100% + var(--rhp-gap, 0%))}.rhp-bar[data-rhp-o=v]{bottom:calc(var(--rhp-lo) * 100%);height:calc((var(--rhp-hi) - var(--rhp-lo)) * 100% - var(--rhp-gap, 0%))}.rhp-bar[data-rhp-o=v]:not([data-rhp-back]){bottom:calc(var(--rhp-lo) * 100% + var(--rhp-gap, 0%))}.rhp-bar{background:var(--rhp-color, var(--rhp-series-1))}.rhp-bar[data-rhp-o=h]:not([data-rhp-back]){border-top-left-radius:var(--rhp-start-radius, var(--rhp-radius, 2px));border-top-right-radius:var(--rhp-end-radius, var(--rhp-radius, 2px));border-bottom-right-radius:var(--rhp-end-radius, var(--rhp-radius, 2px));border-bottom-left-radius:var(--rhp-start-radius, var(--rhp-radius, 2px))}.rhp-bar[data-rhp-o=h][data-rhp-back]{border-top-left-radius:var(--rhp-end-radius, var(--rhp-radius, 2px));border-top-right-radius:var(--rhp-start-radius, var(--rhp-radius, 2px));border-bottom-right-radius:var(--rhp-start-radius, var(--rhp-radius, 2px));border-bottom-left-radius:var(--rhp-end-radius, var(--rhp-radius, 2px))}.rhp-bar[data-rhp-o=v]:not([data-rhp-back]){border-top-left-radius:var(--rhp-end-radius, var(--rhp-radius, 2px));border-top-right-radius:var(--rhp-end-radius, var(--rhp-radius, 2px));border-bottom-right-radius:var(--rhp-start-radius, var(--rhp-radius, 2px));border-bottom-left-radius:var(--rhp-start-radius, var(--rhp-radius, 2px))}.rhp-bar[data-rhp-o=v][data-rhp-back]{border-top-left-radius:var(--rhp-start-radius, var(--rhp-radius, 2px));border-top-right-radius:var(--rhp-start-radius, var(--rhp-radius, 2px));border-bottom-right-radius:var(--rhp-end-radius, var(--rhp-radius, 2px));border-bottom-left-radius:var(--rhp-end-radius, var(--rhp-radius, 2px))}.rhp-bar[data-rhp-o=h]{top:50%;height:var(--rhp-thick, calc(100% - 2 * var(--rhp-inset)));translate:0 -50%}.rhp-bar[data-rhp-o=v]{left:50%;width:var(--rhp-thick, calc(100% - 2 * var(--rhp-inset)));translate:-50% 0}.rhp-dot{width:var(--rhp-size, 10px);height:var(--rhp-size, 10px);border-radius:50%;background:var(--rhp-color, var(--rhp-series-1))}.rhp-dot[data-rhp-o=h]{left:calc(var(--rhp-p) * 100%);top:calc(var(--rhp-across, .5) * 100%);translate:-50% -50%}.rhp-dot[data-rhp-o=v]{bottom:calc(var(--rhp-p) * 100%);left:calc(var(--rhp-across, .5) * 100%);translate:-50% 50%}.rhp-place{width:0;height:0}.rhp-place[data-rhp-o=h]{left:calc(var(--rhp-p) * 100%);top:calc(var(--rhp-across, .5) * 100%)}.rhp-place[data-rhp-o=v]{bottom:calc(var(--rhp-p) * 100%);left:calc(var(--rhp-across, .5) * 100%)}.rhp-tick{background:var(--rhp-color, var(--rhp-ink))}.rhp-tick[data-rhp-o=h]{left:calc(var(--rhp-p) * 100%);top:50%;height:var(--rhp-thick, calc(100% - 2 * var(--rhp-inset)));width:var(--rhp-tick-width, 2px);translate:-50% -50%}.rhp-tick[data-rhp-o=v]{bottom:calc(var(--rhp-p) * 100%);left:50%;width:var(--rhp-thick, calc(100% - 2 * var(--rhp-inset)));height:var(--rhp-tick-width, 2px);translate:-50% 50%}.rhp-label{font-size:var(--rhp-label-size, 12px);line-height:1.15;white-space:nowrap;font-variant-numeric:tabular-nums}.rhp-label[data-rhp-at][data-rhp-o=h]{left:calc(min(var(--rhp-p),1)*100%);top:50%;translate:0 -50%;padding-left:var(--rhp-label-gap, 5px)}.rhp-label[data-rhp-at][data-rhp-o=h][data-rhp-side=before]{translate:-100% -50%;padding-top:0;padding-right:var(--rhp-label-gap, 5px);padding-bottom:0;padding-left:0}.rhp-label[data-rhp-at][data-rhp-o=v]{bottom:calc(max(var(--rhp-p),0)*100%);left:50%;translate:-50% 0;padding-bottom:var(--rhp-label-gap, 3px)}.rhp-label[data-rhp-at][data-rhp-o=v][data-rhp-side=before]{translate:-50% 100%;padding-top:var(--rhp-label-gap, 3px);padding-right:0;padding-bottom:0;padding-left:0}.rhp-label[data-rhp-edge][data-rhp-o=h]{top:50%;translate:0 -50%;overflow:hidden;text-overflow:ellipsis}.rhp-label[data-rhp-edge=start][data-rhp-o=h]{right:100%;width:var(--rhp-room-start, 104px);text-align:right;padding-right:var(--rhp-label-gap, 8px)}.rhp-label[data-rhp-edge=end][data-rhp-o=h]{left:100%;width:var(--rhp-room-end, 44px);padding-left:var(--rhp-label-gap, 6px)}.rhp-label[data-rhp-edge][data-rhp-o=v]{left:0;right:0;text-align:center;overflow:hidden;text-overflow:ellipsis}.rhp-label[data-rhp-edge=start][data-rhp-o=v]{top:100%;padding-top:var(--rhp-label-gap, 6px)}.rhp-label[data-rhp-edge=end][data-rhp-o=v]{bottom:100%;padding-bottom:var(--rhp-label-gap, 3px)}.rhp-cell{top:var(--rhp-cell-gap, 1px);right:var(--rhp-cell-gap, 1px);bottom:var(--rhp-cell-gap, 1px);left:var(--rhp-cell-gap, 1px);background:var(--rhp-color, color-mix(in oklab, var(--rhp-high) calc(clamp(0, (var(--rhp-value) - var(--rhp-min)) / (var(--rhp-max) - var(--rhp-min)), 1)*100%) , var(--rhp-low)));border-top-left-radius:var(--rhp-radius, 2px);border-top-right-radius:var(--rhp-radius, 2px);border-bottom-right-radius:var(--rhp-radius, 2px);border-bottom-left-radius:var(--rhp-radius, 2px)}.rhp-area{overflow:visible;fill:color-mix(in srgb,var(--rhp-color, var(--rhp-series-1)) 35%,transparent);stroke:var(--rhp-color, var(--rhp-series-1));stroke-width:1.5px;filter:none;pointer-events:inherit;stroke-dasharray:none;stroke-dashoffset:0;stroke-linejoin:miter;stroke-linecap:butt;stroke-miterlimit:4;stroke-opacity:1;fill-opacity:1;fill-rule:nonzero;paint-order:normal;shape-rendering:auto}.rhp-area path{fill:inherit;stroke:inherit;stroke-width:inherit;stroke-dasharray:inherit;stroke-dashoffset:inherit;stroke-linejoin:inherit;stroke-linecap:inherit;stroke-miterlimit:inherit;stroke-opacity:inherit;fill-opacity:inherit;fill-rule:inherit;paint-order:inherit;shape-rendering:inherit;vector-effect:non-scaling-stroke;filter:none;pointer-events:inherit;d:var(--rhp-d, none)}.rhp-area[data-rhp-o=h],.rhp-line[data-rhp-o=h]{top:calc(var(--rhp-inset) / 2);height:calc(100% - var(--rhp-inset))}.rhp-area[data-rhp-o=v],.rhp-line[data-rhp-o=v]{left:calc(var(--rhp-inset) / 2);width:calc(100% - var(--rhp-inset))}.rhp-line{overflow:visible;fill:none;stroke:var(--rhp-color, var(--rhp-series-1));stroke-width:2px;stroke-linejoin:round;stroke-linecap:round;stroke-dasharray:none;stroke-dashoffset:0;stroke-miterlimit:4;stroke-opacity:1;fill-opacity:1;paint-order:normal;shape-rendering:auto;filter:none;pointer-events:inherit;--rhp-d-under: none}.rhp-line path{stroke-width:inherit;stroke-linejoin:inherit;stroke-linecap:inherit;stroke-dasharray:inherit;stroke-dashoffset:inherit;stroke-miterlimit:inherit;stroke-opacity:inherit;fill-opacity:inherit;paint-order:inherit;shape-rendering:inherit;vector-effect:non-scaling-stroke;filter:none;pointer-events:inherit}.rhp-line .rhp-stroke{fill:none;stroke:inherit;d:var(--rhp-d, none)}.rhp-line .rhp-under{fill:color-mix(in srgb,var(--rhp-color, var(--rhp-series-1)) 22%,transparent);stroke:none;d:var(--rhp-d-under, none)}:is(.rhp-bar,.rhp-dot,.rhp-tick,.rhp-label[data-rhp-at],.rhp-place,.rhp-area,.rhp-line,.rhp-gridline){transition-property:left,width,bottom,height,background-color;transition-duration:var(--rhp-length-time, .15s);transition-timing-function:var(--rhp-length-ease, ease-out)}.rhp-cell{transition-property:background-color;transition-duration:var(--rhp-length-time, .15s);transition-timing-function:var(--rhp-length-ease, ease-out);transition-delay:0s;transition-behavior:normal}@media(prefers-reduced-motion:no-preference){.rhp-area:not([data-rhp-animate=js] *) path,.rhp-line:not([data-rhp-animate=js] *) path{transition-property:d;transition-duration:var(--rhp-length-time, .15s);transition-timing-function:var(--rhp-length-ease, ease-out);transition-delay:0s;transition-behavior:normal}}}@layer rhp.core{@media(forced-colors:active){.rhp-bar,.rhp-dot,.rhp-tick,.rhp-cell,.rhp-area,.rhp-line{forced-color-adjust:none}.rhp-bar,.rhp-dot,.rhp-tick,.rhp-cell{outline:1px solid CanvasText;outline-offset:-1px}}}@layer rhp.place{.rhp-plot>*{position:absolute;box-sizing:border-box}.rhp-plot[data-rhp-o=h]:not([data-rhp-overlap])>*{left:0;right:0;top:calc(var(--rhp-position) * var(--rhp-pitch, 100% / var(--rhp-n)));bottom:auto;height:var(--rhp-pitch, calc(100% / var(--rhp-n)));translate:none}.rhp-plot[data-rhp-o=v]:not([data-rhp-overlap])>*{top:0;bottom:0;left:calc(var(--rhp-position) * var(--rhp-pitch, 100% / var(--rhp-n)));right:auto;width:var(--rhp-pitch, calc(100% / var(--rhp-n)));translate:none}.rhp-plot[data-rhp-reorder=slide]:not([data-rhp-overlap])>*{transition-property:top,left;transition-duration:var(--rhp-slide-time, .3s),var(--rhp-slide-time, .3s);transition-timing-function:var(--rhp-slide-ease, ease-in-out),var(--rhp-slide-ease, ease-in-out);transition-delay:0s,0s;transition-behavior:normal,normal}.rhp-chart[data-rhp-turning] .rhp-plot[data-rhp-reorder]>*{transition:none}.rhp-chart[data-rhp-turning],.rhp-chart[data-rhp-turning] *,[data-rhp-animate=js] .rhp-bar,[data-rhp-animate=js] .rhp-dot,[data-rhp-animate=js] .rhp-tick,[data-rhp-animate=js] .rhp-label,[data-rhp-animate=js] .rhp-place,[data-rhp-animate=js] .rhp-area,[data-rhp-animate=js] .rhp-line,[data-rhp-animate=js] .rhp-gridline,[data-rhp-animate=js] .rhp-cell{transition:none}.rhp-plot>[hidden]{display:none}.rhp-plot[data-rhp-overlap]>:not(.rhp-bar,.rhp-dot,.rhp-tick,.rhp-label,.rhp-cell,.rhp-place,.rhp-area,.rhp-line){inset:0}@media(prefers-reduced-motion:reduce){.rhp-plot[data-rhp-reorder]:not([data-rhp-overlap])>*{transition:none}.rhp-chart .rhp-bar,.rhp-chart .rhp-dot,.rhp-chart .rhp-tick,.rhp-chart .rhp-label,.rhp-chart .rhp-place,.rhp-chart .rhp-area,.rhp-chart .rhp-line,.rhp-chart .rhp-gridline,.rhp-chart .rhp-cell{transition:none}}}";

// src/manydots.css
var manydots_default = "@layer rhp.core{.rhp-manydots{position:relative!important;z-index:1}.rhp-manydot{position:absolute!important;box-sizing:border-box!important;padding:0!important;border:0 solid transparent!important;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;top:auto!important;right:auto!important;width:var(--rhp-manydot-size, 4px)!important;height:var(--rhp-manydot-size, 4px)!important;margin:0 0 -2px -2px!important;translate:none!important;border-radius:50%;background-color:var(--rhp-manydot-color, #2a78d6);clip-path:var(--rhp-manydot-clip, none)}:where(.rhp-manydots-points[data-rhp-offset])>.rhp-manydot{margin-left:var(--rhp-manydot-offset)!important;margin-bottom:var(--rhp-manydot-offset)!important}@media(forced-colors:active){.rhp-manydot{forced-color-adjust:none!important;outline:1px solid CanvasText!important;outline-offset:-1px!important}}}";

// src/gutters.css
var gutters_default = "@layer rhp.core{[data-rhp-gutters=h]>.rhp-body{grid-template-columns:[start-start] var(--rhp-gutter-start) [start-end track-start] minmax(0,1fr) [track-end end-start] var(--rhp-gutter-end) [end-end]}.rhp-chart[data-rhp-gutters=v]:not([data-rhp-aspect])>.rhp-body{height:auto;grid-template-rows:[end-start] var(--rhp-gutter-end) [end-end track-start] var(--rhp-height, 240px) [track-end start-start] var(--rhp-gutter-start) [start-end]}.rhp-chart[data-rhp-gutters=v][data-rhp-aspect]>.rhp-body{grid-template-rows:[end-start] var(--rhp-gutter-end) [end-end track-start] minmax(0,1fr) [track-end start-start] var(--rhp-gutter-start) [start-end]}[data-rhp-gutters=h]>.rhp-body>*{grid-area:1 / track}[data-rhp-gutters=v]>.rhp-body>*{grid-area:track / 1}[data-rhp-gutters]>.rhp-body>.rhp-plot>*>[data-rhp-edge]{inset:auto;translate:none;width:auto;min-width:0;min-height:0}[data-rhp-gutters=h]>.rhp-body>.rhp-plot>*>[data-rhp-edge]{align-self:center;max-width:var(--rhp-gutter-max, 40cqw)}[data-rhp-gutters=h]>.rhp-body>.rhp-plot>*>[data-rhp-edge=start]{justify-self:end}[data-rhp-gutters=h]>.rhp-body>.rhp-plot>*>[data-rhp-edge=end]{justify-self:start}[data-rhp-gutters=v]>.rhp-body>.rhp-plot>*>[data-rhp-edge]{justify-self:stretch}[data-rhp-gutters=v]>.rhp-body>.rhp-plot>*>[data-rhp-edge=start]{align-self:start}[data-rhp-gutters=v]>.rhp-body>.rhp-plot>*>[data-rhp-edge=end]{align-self:end}}@layer rhp.place{[data-rhp-gutters=h]>.rhp-body>.rhp-plot{grid-column:1 / -1;display:grid;grid-template-columns:subgrid;grid-template-rows:100%}[data-rhp-gutters=v]>.rhp-body>.rhp-plot{grid-row:1 / -1;display:grid;grid-template-rows:subgrid;grid-template-columns:100%}[data-rhp-gutters]>.rhp-body>.rhp-plot>:not(svg,img,canvas,video,iframe,embed,object,.rhp-bar,.rhp-dot,.rhp-tick,.rhp-label,.rhp-cell,.rhp-area,.rhp-line){position:relative;display:grid}[data-rhp-gutters=h]>.rhp-body>.rhp-plot>*{grid-area:1 / 1 / auto / -1;grid-template-columns:subgrid}[data-rhp-gutters=v]>.rhp-body>.rhp-plot>*{grid-area:1 / 1 / -1;grid-template-rows:subgrid}[data-rhp-gutters=h]>.rhp-body>.rhp-plot:not([data-rhp-overlap])>*{align-self:start}[data-rhp-gutters=v]>.rhp-body>.rhp-plot:not([data-rhp-overlap])>*{justify-self:start}[data-rhp-gutters=h]>.rhp-body>.rhp-plot>:is(svg,img,canvas,video,iframe,embed,object,.rhp-bar,.rhp-dot,.rhp-tick,.rhp-label,.rhp-cell,.rhp-area,.rhp-line){grid-area:1 / track}[data-rhp-gutters=v]>.rhp-body>.rhp-plot>:is(svg,img,canvas,video,iframe,embed,object,.rhp-bar,.rhp-dot,.rhp-tick,.rhp-label,.rhp-cell,.rhp-area,.rhp-line){grid-area:track / 1}[data-rhp-gutters=h] .rhp-plot .rhp-bar,[data-rhp-gutters=h] .rhp-plot .rhp-dot,[data-rhp-gutters=h] .rhp-plot .rhp-tick,[data-rhp-gutters=h] .rhp-plot .rhp-label,[data-rhp-gutters=h] .rhp-plot .rhp-cell,[data-rhp-gutters=h] .rhp-plot .rhp-area,[data-rhp-gutters=h] .rhp-plot .rhp-line,[data-rhp-gutters=h] .rhp-plot .rhp-plot{grid-column:track}[data-rhp-gutters=v] .rhp-plot .rhp-bar,[data-rhp-gutters=v] .rhp-plot .rhp-dot,[data-rhp-gutters=v] .rhp-plot .rhp-tick,[data-rhp-gutters=v] .rhp-plot .rhp-label,[data-rhp-gutters=v] .rhp-plot .rhp-cell,[data-rhp-gutters=v] .rhp-plot .rhp-area,[data-rhp-gutters=v] .rhp-plot .rhp-line,[data-rhp-gutters=v] .rhp-plot .rhp-plot{grid-row:track}[data-rhp-gutters]>.rhp-body>.rhp-plot>*>[data-rhp-edge]{position:relative}[data-rhp-gutters=h]>.rhp-body>.rhp-plot>*>[data-rhp-edge=start]{grid-area:1 / start}[data-rhp-gutters=h]>.rhp-body>.rhp-plot>*>[data-rhp-edge=end]{grid-area:1 / end}[data-rhp-gutters=v]>.rhp-body>.rhp-plot>*>[data-rhp-edge=start]{grid-area:start / 1}[data-rhp-gutters=v]>.rhp-body>.rhp-plot>*>[data-rhp-edge=end]{grid-area:end / 1}}";

// src/cross.css
var cross_default = "@layer rhp.core{.rhp-chart[data-rhp-cross]{--rhp-cross: initial}.rhp-chart[data-rhp-cross][data-rhp-o=h]:not([data-rhp-aspect])>.rhp-body{height:var(--rhp-height, 240px)}.rhp-chart[data-rhp-cross] :is(.rhp-dot,.rhp-label[data-rhp-at],.rhp-place){--rhp-q: calc((var(--rhp-cross) - var(--rhp-cross-min)) / (var(--rhp-cross-max) - var(--rhp-cross-min)))}.rhp-chart[data-rhp-cross] .rhp-dot[data-rhp-o=h]{top:auto;bottom:calc(var(--rhp-q, (1 - var(--rhp-across, .5))) * 100%);translate:-50% 50%}.rhp-chart[data-rhp-cross] .rhp-dot[data-rhp-o=v]{left:calc(var(--rhp-q, var(--rhp-across, .5)) * 100%)}.rhp-chart[data-rhp-cross] .rhp-place[data-rhp-o=h]{top:auto;bottom:calc(var(--rhp-q, (1 - var(--rhp-across, .5))) * 100%)}.rhp-chart[data-rhp-cross] .rhp-place[data-rhp-o=v]{left:calc(var(--rhp-q, var(--rhp-across, .5)) * 100%)}.rhp-chart[data-rhp-cross] .rhp-label[data-rhp-at][data-rhp-o=h]{top:auto;bottom:calc(max(var(--rhp-q, .5),0)*100%);translate:0 50%}.rhp-chart[data-rhp-cross] .rhp-label[data-rhp-at][data-rhp-o=h][data-rhp-side=before]{translate:-100% 50%}.rhp-chart[data-rhp-cross] .rhp-label[data-rhp-at][data-rhp-o=v]{left:calc(min(var(--rhp-q, .5),1)*100%)}.rhp-chart[data-rhp-cross] .rhp-line{--rhp-q0: calc((var(--rhp-cross-from) - var(--rhp-cross-min)) / (var(--rhp-cross-max) - var(--rhp-cross-min)));--rhp-q1: calc((var(--rhp-cross-to) - var(--rhp-cross-min)) / (var(--rhp-cross-max) - var(--rhp-cross-min)))}.rhp-chart[data-rhp-cross] .rhp-line[data-rhp-o=h]{top:auto;bottom:calc(var(--rhp-q0) * 100%);height:calc((var(--rhp-q1) - var(--rhp-q0)) * 100%)}.rhp-chart[data-rhp-cross] .rhp-line[data-rhp-o=v]{left:calc(var(--rhp-q0) * 100%);width:calc((var(--rhp-q1) - var(--rhp-q0)) * 100%)}.rhp-axis[data-rhp-cross]{--rhp-min: var(--rhp-cross-min);--rhp-max: var(--rhp-cross-max)}}";

// src/style.js
var LAYERS = "@layer rhp.place, rhp.slat, rhp.core;", DESCRIPTORS = /^@(-webkit-)?keyframes\b|^@(font-face|property|counter-style|font-palette-values|font-feature-values|view-transition|position-try)\b/i;
function important(css2) {
  css2 = uncomment(css2);
  let out = "", seg = "", depth = 0, quote2 = null, paren = 0, frames = -1, flush = (end) => {
    let t = seg.trim(), declaration = t && t[0] !== "@" && !t.startsWith("--") && frames < 0 && /^[a-z-]+\s*:/i.test(t) && !/!important\s*$/i.test(t);
    out += (declaration ? seg.replace(/\s*$/, " !important") : seg) + end, seg = "";
  };
  for (let i = 0; i < css2.length; i++) {
    let ch = css2[i];
    if (ch === "\\") {
      seg += ch + (css2[++i] ?? "");
      continue;
    }
    if (quote2) {
      seg += ch, (ch === quote2 || ch === `
`) && (quote2 = null);
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote2 = ch, seg += ch;
      continue;
    }
    if (ch === "(" ? paren++ : ch === ")" && paren--, paren > 0) {
      seg += ch;
      continue;
    }
    ch === "{" ? (frames < 0 && DESCRIPTORS.test(seg.trim()) && (frames = depth), out += seg + "{", seg = "", depth++) : ch === "}" ? (flush("}"), depth--, depth === frames && (frames = -1)) : ch === ";" ? flush(";") : seg += ch;
  }
  return out + seg;
}
function uncomment(css2) {
  let out = "", quote2 = null;
  for (let i = 0; i < css2.length; i++) {
    let ch = css2[i];
    if (ch === "\\") {
      out += ch + (css2[++i] ?? "");
      continue;
    }
    if (quote2) {
      out += ch, (ch === quote2 || ch === `
`) && (quote2 = null);
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote2 = ch, out += ch;
      continue;
    }
    if (ch === "/" && css2[i + 1] === "*") {
      let end = css2.indexOf("*/", i + 2);
      i = end < 0 ? css2.length : end + 1;
      continue;
    }
    out += ch;
  }
  return out;
}
function split(list) {
  let parts = [], cur = "", depth = 0, quote2 = null;
  for (let i = 0; i < list.length; i++) {
    let ch = list[i];
    if (ch === "\\") {
      cur += ch + (list[++i] ?? "");
      continue;
    }
    if (quote2) {
      cur += ch, (ch === quote2 || ch === `
`) && (quote2 = null);
      continue;
    }
    if (ch === '"' || ch === "'")
      quote2 = ch;
    else if (ch === "(" || ch === "[")
      depth++;
    else if (ch === ")" || ch === "]")
      depth--;
    else if (ch === "," && depth === 0) {
      parts.push(cur.trim()), cur = "";
      continue;
    }
    cur += ch;
  }
  return cur.trim() && parts.push(cur.trim()), parts;
}
function pseudoAt(sel) {
  let depth = 0, quote2 = null;
  for (let i = 0; i < sel.length; i++) {
    let ch = sel[i];
    if (ch === "\\") {
      i++;
      continue;
    }
    if (quote2) {
      (ch === quote2 || ch === `
`) && (quote2 = null);
      continue;
    }
    if (ch === '"' || ch === "'") quote2 = ch;
    else if (ch === "(" || ch === "[") depth++;
    else if (ch === ")" || ch === "]") depth--;
    else if (depth === 0 && ch === ":" && (sel[i + 1] === ":" || /^:(before|after|first-letter|first-line)(?![-\w])/i.test(sel.slice(i)))) return i;
  }
  return -1;
}
function scoped(css2, scope) {
  css2 = uncomment(css2);
  for (let [, name] of css2.matchAll(/@(?:-webkit-)?keyframes\s+([-\w]+)/g)) {
    let own = scope + "-" + name, word = "(?<![-\\w])" + name + "(?![-\\w])";
    css2 = css2.replace(new RegExp("(@(?:-webkit-)?keyframes\\s+)" + word, "g"), "$1" + own).replace(/(animation(?:-name)?\s*:)([^;{}]*)/g, (_, prop, value) => prop + value.replace(new RegExp(word, "g"), own));
  }
  let S = `[data-rhp-slat="${scope}"]`, other = `:not(:where(${S} [data-rhp-slat]:not(${S}), ${S} [data-rhp-slat]:not(${S}) *))`, one = (sel) => {
    let at2 = pseudoAt(sel), base = oriented((at2 < 0 ? sel : sel.slice(0, at2)).trim()), pe = at2 < 0 ? "" : sel.slice(at2), x = base ? /^[^\s>+~]*\.rhp-chart(?![-\w])/.test(base) ? `:is(${base})` : `:is(.rhp-chart ${base})` : "";
    return `${S}${x}${other}${pe}, ${S} ${x}${other}${pe}`;
  }, tail = (sel) => {
    let at2 = pseudoAt(sel);
    return at2 < 0 ? oriented(sel) + other : oriented(sel.slice(0, at2)) + other + sel.slice(at2);
  }, out = "", seg = "", quote2 = null, paren = 0, kinds = [];
  for (let i = 0; i < css2.length; i++) {
    let ch = css2[i];
    if (ch === "\\") {
      seg += ch + (css2[++i] ?? "");
      continue;
    }
    if (quote2) {
      seg += ch, (ch === quote2 || ch === `
`) && (quote2 = null);
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote2 = ch, seg += ch;
      continue;
    }
    if (ch === "(" ? paren++ : ch === ")" && paren--, paren > 0) {
      seg += ch;
      continue;
    }
    if (ch === "{") {
      let pre = seg.trim(), lead = seg.slice(0, seg.length - seg.trimStart().length), inRule = kinds.includes("rule"), asIs = kinds.includes("frames") || kinds.includes("scope");
      if (pre.startsWith("@")) {
        let sc = !inRule && !asIs && pre.match(/^@scope\s*\(([^]*?)\)([^]*)$/i);
        sc ? (kinds.push("scope"), out += `${lead}@scope (${split(sc[1]).map(one).join(", ")})${sc[2]} {`) : (kinds.push(/^@(-webkit-)?keyframes/i.test(pre) ? "frames" : inRule ? "nested" : "at"), out += seg + "{");
      } else asIs ? (kinds.push("nested"), out += seg + "{") : inRule ? (kinds.push("nested"), out += lead + split(pre).map(tail).join(", ") + " {") : (kinds.push("rule"), out += lead + split(pre).map(one).join(", ") + " {");
      seg = "";
    } else ch === "}" ? (out += seg + "}", seg = "", kinds.pop()) : ch === ";" && (kinds.length === 0 || kinds[kinds.length - 1] === "at") ? (out += seg + ";", seg = "") : seg += ch;
  }
  return out + seg;
}
function oriented(sel) {
  if (!/:(horizontal|vertical)/.test(sel)) return sel;
  let out = "", quote2 = null;
  for (let i = 0; i < sel.length; i++) {
    let ch = sel[i];
    if (ch === "\\") {
      out += ch + (sel[++i] ?? "");
      continue;
    }
    if (quote2) {
      out += ch, ch === quote2 && (quote2 = null);
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote2 = ch, out += ch;
      continue;
    }
    let m = ch === ":" && sel[i - 1] !== ":" && sel.slice(i).match(/^:(horizontal|vertical)(?![-\w(])/);
    if (m) {
      out += `[data-rhp-o="${m[1][0]}"]`, i += m[0].length - 1;
      continue;
    }
    out += ch;
  }
  return out;
}
var hash = (text) => {
  let h = 5381;
  for (let i = 0; i < text.length; i++)
    h = h * 33 ^ text.charCodeAt(i);
  return (h >>> 0).toString(36);
}, roots = /* @__PURE__ */ new Map(), entries = [];
function adoptInto(root, entry) {
  if (entry.core && linked && root === document) return;
  let doc = root.ownerDocument ?? root;
  if (!Array.isArray(root.adoptedStyleSheets)) {
    let el = doc.createElement("style");
    el.textContent = entry.css, (root.head ?? root).append(el), roots.get(root).set(entry, el);
    return;
  }
  let sheet = new (doc.defaultView ?? window).CSSStyleSheet();
  sheet.replaceSync(entry.css), roots.get(root).set(entry, sheet), root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet];
}
var MARK = "data-rhp-layers";
function declareLayers(root) {
  let doc = root.ownerDocument ?? root, parent = root.nodeType === 9 ? root.head : root;
  if (!parent) return;
  let el = doc.createElement("style");
  el.textContent = LAYERS, el.setAttribute(MARK, "");
  let nonce = doc.querySelector("style[nonce], link[nonce], script[nonce]")?.nonce;
  nonce && (el.nonce = nonce);
  let edited = /* @__PURE__ */ new WeakSet(), moves = 0, reset, keep = () => {
    let first = root.querySelector('style:not([data-rhp-server]), link[rel~="stylesheet"]');
    if (!first?.hasAttribute(MARK)) {
      if (++moves > 20) return;
      reset ?? (reset = setTimeout(() => {
        moves = 0, reset = void 0;
      }, 1e3)), first ? first.before(el) : parent.prepend(el);
    }
    if (!el.sheet)
      for (let sheet of root.styleSheets) {
        if (edited.has(sheet)) return;
        try {
          sheet.insertRule(LAYERS, 0), edited.add(sheet);
          return;
        } catch {
        }
      }
  };
  keep();
  let mo = new (doc.defaultView ?? window).MutationObserver(keep);
  mo.observe(parent, { childList: !0 }), root.nodeType === 9 && mo.observe(root.documentElement, { childList: !0 });
}
function addRoot(root) {
  if (!roots.has(root)) {
    roots.set(root, /* @__PURE__ */ new Map()), declareLayers(root);
    for (let entry of entries)
      adoptInto(root, entry);
  }
}
function add(css2, core2 = !1) {
  roots.size || addRoot(document);
  let entry = { css: css2, core: core2 };
  entries.push(entry);
  for (let root of roots.keys())
    adoptInto(root, entry);
  return entry;
}
function remove(entry) {
  entries.splice(entries.indexOf(entry), 1);
  for (let [root, own] of roots) {
    let sheet = own.get(entry);
    own.delete(entry), sheet && (sheet.replaceSync ? root.adoptedStyleSheets = root.adoptedStyleSheets.filter((s) => s !== sheet) : sheet.remove());
  }
}
function update(entry, css2) {
  entry.css = css2;
  for (let own of roots.values()) {
    let sheet = own.get(entry);
    sheet && (sheet.replaceSync ? sheet.replaceSync(css2) : sheet.textContent = css2);
  }
}
var coreText, guttersText, crossText, coreSheet = () => coreText ?? (coreText = LAYERS + `
` + important(rhp_default) + `
` + manydots_default), gutterSheet = () => guttersText ?? (guttersText = important(gutters_default)), crossSheet = () => crossText ?? (crossText = important(cross_default));
var linked = !1, checked = !1;
function linkedCss() {
  linked = !0;
}
function checkLinked(body) {
  if (!linked || checked || (checked = !0, getComputedStyle(body).display === "grid")) return;
  console.warn("rhp: linkedCss() was called, but this page doesn't link @bezda/rhp/rhp.css: rhp adds its core stylesheet itself"), linked = !1;
  let own = roots.get(document);
  if (own)
    for (let entry of entries)
      entry.core && !own.has(entry) && adoptInto(document, entry);
}
var written = /* @__PURE__ */ new WeakMap();
function serverSheets(slats, render, gutters, crossed) {
  let seen = render ? written.get(render) ?? written.set(render, /* @__PURE__ */ new Set()).get(render) : /* @__PURE__ */ new Set(), out = "";
  !linked && !seen.has("core") && (seen.add("core"), out += coreSheet()), !linked && gutters && !seen.has("gutters") && (seen.add("gutters"), out += `
` + gutterSheet()), !linked && crossed && !seen.has("cross") && (seen.add("cross"), out += `
` + crossSheet());
  for (let fn of slats)
    seen.has(fn.scope) || (seen.add(fn.scope), out += `
` + slatSheet(fn));
  return out.replace(/<\/(style)/gi, "<\\/$1");
}
var core = !1;
function useCore() {
  core || typeof document > "u" || (core = !0, add(coreSheet(), !0));
}
function useRoot(el) {
  let root = el.getRootNode();
  if (root === el || root.nodeType !== 9 && root.nodeType !== 11) return;
  if (!roots.has(root)) return addRoot(root);
  let own = [...roots.get(root).values()], list = root.adoptedStyleSheets;
  Array.isArray(list) && own.some((sheet) => !list.includes(sheet)) && (root.adoptedStyleSheets = [...list.filter((sheet) => !own.includes(sheet)), ...own]);
}
var ro;
function watchRoot(el) {
  if (typeof ResizeObserver > "u") return () => {
  };
  ro ?? (ro = new ResizeObserver((changes) => {
    for (let change of changes)
      useRoot(change.target);
  }));
  let body = el.querySelector(".rhp-body");
  return ro.observe(el, { box: "border-box" }), body && ro.observe(body), () => {
    ro.unobserve(el), body && ro.unobserve(body);
  };
}
var sheets = /* @__PURE__ */ new Map(), users = /* @__PURE__ */ new Map(), idle = /* @__PURE__ */ new Set(), release = (scope) => {
  if (idle.add(scope), idle.size <= 8) return;
  let [old] = idle;
  idle.delete(old);
  let entry = sheets.get(old);
  sheets.delete(old), entry && remove(entry);
};
function useSlatCss(fn) {
  if (!fn?.scope || typeof document > "u") return () => {
  };
  let scope = fn.scope;
  return users.set(scope, (users.get(scope) ?? 0) + 1), idle.delete(scope), sheets.has(scope) || (useCore(), sheets.set(scope, add(slatSheet(fn)))), () => {
    let n = users.get(scope) - 1;
    if (n > 0) return users.set(scope, n);
    users.delete(scope), release(scope);
  };
}
var manyRadii = (css2) => [...css2.matchAll(/--rhp-radius\s*:([^;{}]*)/g)].some(([, value]) => {
  let text = value, inner;
  for (; (inner = text.replace(/\([^()]*\)/g, "")) !== text; )
    text = inner;
  return text.trim().split(/\s+/).filter((x) => x && x !== "!important").length > 1;
}), checkRadii = (css2) => manyRadii(css2) && console.warn("rhp: --rhp-radius takes one length. For different corners, use --rhp-start-radius and --rhp-end-radius, or border-radius.");
function slatSheet(fn) {
  let S = `[data-rhp-slat="${fn.scope}"]`, own = /:(before|after)\b/i.test(fn.css) ? `:where(${S}, ${S} :where(.rhp-plot, .rhp-plot > *))::before, :where(${S}, ${S} :where(.rhp-plot, .rhp-plot > *))::after { content: none; display: inline; }
` : "";
  return `@layer rhp.slat {
${important(own + scoped(fn.css, fn.scope))}
}`;
}
function restyle(fn, css2) {
  if (!fn?.scope) throw new Error("rhp: restyle takes a slat type made by slat() with css");
  css2 = joinCss(css2), checkRadii(css2), fn.css = css2;
  let entry = sheets.get(fn.scope);
  entry && update(entry, slatSheet(fn));
}
var joinCss = (css2) => Array.isArray(css2) ? css2.filter((c) => c != null).join(`
`) : css2, made = /* @__PURE__ */ new Map();
function slat(def, row) {
  if (typeof def == "function") return def;
  let fn = (d) => row(d);
  if (fn.layout = def, fn.css = joinCss(def.css), fn.css != null) {
    checkRadii(fn.css);
    let h = hash(fn.css), n = (made.get(h) ?? 0) + 1;
    made.set(h, n), fn.scope = "rhp-s" + h + (n > 1 ? "-" + n : "");
  }
  return fn;
}

// src/plot.jsx
import { createMemo as createMemo2, createComputed, createRenderEffect as createRenderEffect2, createEffect, createContext, useContext, getOwner, runWithOwner, onMount, onCleanup, createSignal as createSignal2, createRoot, createUniqueId, mergeProps, splitProps as splitProps2, untrack as untrack2, sharedConfig, Index, For, Show } from "solid-js";
import { delegateEvents } from "solid-js/web";
import { createStore } from "solid-js/store";

// src/animate.js
import { createSignal, untrack } from "solid-js";

// src/frame.js
var direct = 0;
function drawing(f) {
  direct++;
  try {
    return f();
  } finally {
    direct--;
  }
}

// src/animate.js
var bezier = (x1, y1, x2, y2) => {
  let cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx, cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by, curveX = (t) => ((ax * t + bx) * t + cx) * t, curveY = (t) => ((ay * t + by) * t + cy) * t;
  return (x) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let lo = 0, hi = 1, t = x;
    for (let i = 0; i < 24; i++)
      curveX(t) < x ? lo = t : hi = t, t = (lo + hi) / 2;
    return curveY(t);
  };
}, easeInOut = bezier(0.42, 0, 0.58, 1), easeOut = bezier(0, 0, 0.58, 1), NAMED = {
  linear: (x) => x,
  ease: bezier(0.25, 0.1, 0.25, 1),
  "ease-in": bezier(0.42, 0, 1, 1),
  "ease-out": easeOut,
  "ease-in-out": easeInOut
}, MOVE_MS = 150, curve = (c) => typeof c == "function" ? c : Array.isArray(c) ? bezier(...c) : (c != null && !NAMED[c] && console.warn(`rhp: unknown ease "${c}", using ease-out`), NAMED[c] ?? easeOut), cssCurve = (c) => Array.isArray(c) ? `cubic-bezier(${c.join(",")})` : typeof c == "string" ? c : void 0, cssEase = (s) => {
  let m = /^cubic-bezier\(([^)]*)\)$/.exec(s);
  return m ? bezier(...m[1].split(",").map(Number)) : NAMED[s] ?? NAMED.linear;
}, reduce = typeof matchMedia == "function" ? matchMedia("(prefers-reduced-motion: reduce)") : { matches: !1 }, [clock, setClock] = createSignal(0), frameAt = 0, endAt = 0, raf = 0, frameCount = 0, waiting = [];
function tick(t) {
  frameAt = t, frameCount++, drawing(() => setClock(t)), t < endAt ? raf = requestAnimationFrame(tick) : (raf = 0, waiting.splice(0).forEach((f) => f()));
}
var runUntil = (t) => {
  endAt = Math.max(endAt, t), raf || (raf = requestAnimationFrame(tick));
};
var plain = (v) => v !== null && typeof v == "object" && !Array.isArray(v) && Object.getPrototypeOf(v) === Object.prototype, movable = (v) => typeof v == "number" ? Number.isFinite(v) : Array.isArray(v) || plain(v);
function diff(b, a) {
  if (typeof b == "number")
    return typeof a == "number" && Number.isFinite(a) && Number.isFinite(b) ? b - a : void 0;
  if (Array.isArray(b))
    return Array.isArray(a) && a.length === b.length ? b.map((v, i) => diff(v, a[i])) : void 0;
  if (plain(b)) {
    if (!plain(a)) return;
    let out = {};
    for (let key in b)
      out[key] = diff(b[key], a[key]);
    return out;
  }
}
function less(v, d, k) {
  if (d === void 0) return v;
  if (typeof v == "number") return v - d * k;
  if (Array.isArray(v)) return v.map((x, i) => less(x, d[i], k));
  if (plain(v)) {
    let out = {};
    for (let key in v)
      out[key] = less(v[key], d[key], k);
    return out;
  }
  return v;
}
function same(a, b) {
  if (a === b) return !0;
  if (Array.isArray(b)) return Array.isArray(a) && a.length === b.length && b.every((v, i) => same(a[i], v));
  if (plain(b)) {
    let keys = Object.keys(b);
    return plain(a) && Object.keys(a).length === keys.length && keys.every((key) => same(a[key], b[key]));
  }
  return !1;
}
var snapshot = (v) => Array.isArray(v) ? v.map(snapshot) : plain(v) ? Object.fromEntries(Object.entries(v).map(([key, x]) => [key, snapshot(x)])) : v;
function animated(read, settings = () => ({})) {
  let to, moves = [], shown, seenAt = -1;
  return (ahead = 0) => {
    let v = read();
    if (!movable(v) || reduce.matches) return v;
    if (to === void 0 || !same(to, v)) {
      let target = snapshot(v), d = to === void 0 ? void 0 : diff(target, to);
      if (d === void 0)
        moves = [];
      else {
        let s = untrack(settings), start = performance.now(), dur = Math.max(1, s.duration ?? MOVE_MS);
        moves.push({ d, start, dur, ease: s.ease ?? easeOut }), runUntil(start + dur);
      }
      to = target;
    }
    if (!moves.length) return to;
    let end = moves.reduce((e, m) => Math.max(e, m.start + m.dur), 0);
    if (frameAt + ahead >= end)
      return ahead || (moves = []), to;
    let c = clock();
    if (!ahead && seenAt === c) return shown;
    let x = to;
    for (let m of moves) {
      let p = (c + ahead - m.start) / m.dur;
      p < 1 && (x = less(x, m.d, 1 - m.ease(Math.max(0, p))));
    }
    return ahead || (seenAt = c, shown = x, moves = moves.filter((m) => c < m.start + m.dur)), x;
  };
}
function transitioned(read, settings) {
  let to, run = null, at2 = (r, t) => {
    let p = (t - r.start) / r.dur;
    return p >= 1 ? r.to : less(r.to, r.d, 1 - r.ease(Math.max(0, p)));
  };
  return () => {
    let v = read();
    if (!movable(v) || reduce.matches) return v;
    if (to === void 0 || !same(to, v)) {
      let target = snapshot(v), now = performance.now(), running2 = run !== null && now < run.start + run.dur, from = running2 ? at2(run, now) : to, d = from === void 0 ? void 0 : diff(target, from), s = d === void 0 ? void 0 : untrack(settings), reversed = running2 && s !== void 0 && same(run.back, target), factor = reversed ? Math.min(1, Math.abs(run.ease(Math.max(0, (now - run.start) / run.dur)) * run.factor + 1 - run.factor)) : 1, dur = (s?.duration ?? 0) * factor;
      if (!(dur > 0))
        run = null;
      else {
        let delay = s.delay ?? 0;
        run = { to: target, d, back: reversed ? run.to : from, factor, start: now + (delay < 0 ? delay * factor : delay), dur, ease: s.ease ?? easeOut }, runUntil(run.start + dur);
      }
      to = target;
    }
    return run === null ? to : frameAt >= run.start + run.dur ? (run = null, to) : at2(run, clock());
  };
}

// src/data.js
var compare = (a, b) => a < b ? -1 : a > b ? 1 : 0, sortBy = (key, direction = "asc") => (rows, current) => {
  let keys = rows.map((d) => typeof key == "function" ? key(d) : d[key]), sign = direction === "desc" ? -1 : 1, onScreen = rows.map((_, i) => i).sort((a, b) => (current[a] ?? 1 / 0) - (current[b] ?? 1 / 0)), positions = Array(rows.length);
  return onScreen.sort((a, b) => sign * compare(keys[a], keys[b])).forEach((row, position) => positions[row] = position), positions;
}, cycle = (list) => (d) => list[d.index % list.length], extent = (values) => {
  let lo = 1 / 0, hi = -1 / 0;
  for (let v of values)
    v < lo && (lo = v), v > hi && (hi = v);
  return [lo, hi];
}, every = (step, { ends = !1 } = {}) => ([min, max]) => {
  if (!(step > 0)) throw new Error("rhp: every() takes a step above 0");
  let out = [], first = Math.ceil(min / step - 1e-9);
  for (let k = 0; k <= 1e4; k++) {
    let v = (first + k) * step;
    if (!(v <= max + 1e-9) || k > 0 && v === (first + k - 1) * step) break;
    out.push(+v.toFixed(10));
  }
  return ends && out[0] !== min && out.unshift(min), ends && out.at(-1) !== max && out.push(max), out;
};
function nice(lo, hi, count = 5) {
  hi > lo || (hi = lo + 1);
  let raw = (hi - lo) / Math.max(1, count), magnitude = 10 ** Math.floor(Math.log10(raw)), step = [1, 2, 2.5, 5, 10].map((m) => m * magnitude).find((s) => s >= raw), min = Math.floor(lo / step + 1e-9) * step, max = Math.ceil(hi / step - 1e-9) * step, ticks = [];
  for (let k = 0; k <= 1e3; k++) {
    let v = min + k * step;
    if (!(v <= max + step / 2) || k > 0 && v === min + (k - 1) * step) break;
    ticks.push(+v.toFixed(10));
  }
  return { min, max, step, ticks };
}
function stackUp(values) {
  let up = 0, down = 0, from = [], to = [];
  for (let v of values)
    v >= 0 ? (from.push(up), up += v, to.push(up)) : (from.push(down), down += v, to.push(down));
  return { from, to };
}
var shares = (values, total = 100) => {
  let sum = values.reduce((s, v) => s + Math.abs(v), 0) || 1;
  return values.map((v) => v / sum * total);
};
function running(changes) {
  let total = 0, from = [], to = [];
  for (let change of changes)
    from.push(total), total += change, to.push(total);
  return { from, to };
}
var quantile = (sorted, p) => {
  let h = (sorted.length - 1) * p, lo = Math.floor(h);
  return sorted[lo] + (sorted[Math.min(lo + 1, sorted.length - 1)] - sorted[lo]) * (h - lo);
};
function summary(samples) {
  let sorted = samples.slice().sort((a, b) => a - b), q1 = quantile(sorted, 0.25), median = quantile(sorted, 0.5), q3 = quantile(sorted, 0.75), iqr = q3 - q1, low = sorted.find((v) => v >= q1 - 1.5 * iqr), high = sorted.findLast((v) => v <= q3 + 1.5 * iqr);
  return {
    min: sorted[0],
    q1,
    median,
    q3,
    max: sorted[sorted.length - 1],
    low,
    high,
    mean: sorted.reduce((a, b) => a + b, 0) / sorted.length,
    outliers: sorted.filter((v) => v < low || v > high)
  };
}
function bins(samples, { domain = extent(samples), count = 10 } = {}) {
  let [lo, hi] = domain;
  (!Number.isFinite(lo) || !Number.isFinite(hi)) && ([lo, hi] = [0, 1]), lo === hi && ([lo, hi] = [lo - 0.5, hi + 0.5]);
  let width = (hi - lo) / count, x0 = [], x1 = [], tally = Array(count).fill(0);
  for (let k = 0; k < count; k++)
    x0.push(lo + k * width), x1.push(lo + (k + 1) * width);
  for (let v of samples)
    v < lo || v > hi || tally[Math.min(count - 1, Math.floor((v - lo) / width))]++;
  return { x0, x1, tally };
}
function density(samples, { domain = extent(samples), points: points2 = 40, bandwidth } = {}) {
  let n = samples.length, mean = samples.reduce((a, b) => a + b, 0) / n, sd = Math.sqrt(samples.reduce((a, v) => a + (v - mean) ** 2, 0) / Math.max(1, n - 1)) || 1, h = bandwidth ?? 1.06 * sd * n ** -0.2, [lo, hi] = domain, out = [];
  for (let k = 0; k < points2; k++) {
    let x = lo + (hi - lo) * k / (points2 - 1), y = 0;
    for (let v of samples)
      y += Math.exp(-0.5 * ((x - v) / h) ** 2);
    out.push([x, y / (n * h * Math.sqrt(2 * Math.PI))]);
  }
  return out;
}

// src/blocks.jsx
import { ssrAttribute as _$ssrAttribute } from "solid-js/web";
import { ssr as _$ssr } from "solid-js/web";
import { ssrHydrationKey as _$ssrHydrationKey } from "solid-js/web";
import { ssrElement as _$ssrElement } from "solid-js/web";
import { mergeProps as _$mergeProps } from "solid-js/web";
import { escape as _$escape } from "solid-js/web";
import { createMemo, createRenderEffect, splitProps } from "solid-js";
import { insert, style } from "solid-js/web";
var _tmpl$2 = ["<path", ' vector-effect="non-scaling-stroke"></path>'], _tmpl$3 = ['<path class="rhp-under"', "></path>"], _tmpl$4 = ['<path class="rhp-stroke"', ' vector-effect="non-scaling-stroke"></path>'], cls = (base, c) => c ? base + " " + c : base, extentOf = (list) => {
  let lo = 1 / 0, hi = -1 / 0;
  for (let v of list)
    v < lo && (lo = v), v > hi && (hi = v);
  return [lo, hi];
}, warnedColors = /* @__PURE__ */ new Set(), KEY = /^(series-\d+|positive|negative|ink|muted|grid|surface|low|high)$/, tok = (c) => typeof c != "string" ? c : KEY.test(c) ? "var(--rhp-" + c + ")" : (/var\(--(?!rhp-)/.test(c) && !warnedColors.has(c) && (warnedColors.add(c), console.warn("rhp: " + c + " reads a page variable; use a theme key")), c), length = (v) => typeof v == "number" ? v * 100 + "%" : v, fmt = ([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`, trace = (pts, smooth) => {
  if (!smooth || pts.length < 3) return pts.map(fmt).join("L");
  let d = fmt(pts[0]);
  for (let i = 0; i < pts.length - 1; i++) {
    let a = pts[i], b = pts[i + 1], before = pts[i - 1] ?? a, after = pts[i + 2] ?? b;
    d += "C" + fmt([a[0] + (b[0] - before[0]) / 6, a[1] + (b[1] - before[1]) / 6]) + " " + fmt([b[0] - (after[0] - a[0]) / 6, b[1] - (after[1] - a[1]) / 6]) + " " + fmt(b);
  }
  return d;
}, noCssD = !1;
function cssTransition(path) {
  if (!path || path.closest("[data-rhp-animate='js'], [data-rhp-turning]")) return {
    duration: 0
  };
  let c = getComputedStyle(path), i = c.transitionProperty.split(/\s*,\s*/).findIndex((name) => name === "d" || name === "all");
  if (i < 0) return {
    duration: 0
  };
  let nth = (list) => {
    let parts = list.split(/\s*,\s*(?![^(]*\))/);
    return parts[i % parts.length];
  }, ms = (time) => parseFloat(time) * (time.endsWith("ms") ? 1 : 1e3);
  return {
    duration: ms(nth(c.transitionDuration)),
    delay: ms(nth(c.transitionDelay)),
    ease: cssEase(nth(c.transitionTimingFunction))
  };
}
var drawn = (read, path) => noCssD ? transitioned(read, () => cssTransition(path())) : read;
var loose = (v) => {
  let quote2 = null, depth = 0;
  for (let i = 0; i < v.length; i++) {
    let ch = v[i];
    if (ch === "\\") {
      i++;
      continue;
    }
    if (quote2) {
      ch === quote2 && (quote2 = null);
      continue;
    }
    if (ch === '"' || ch === "'") quote2 = ch;
    else if (ch === "(" || ch === "[" || ch === "{") depth++;
    else if (ch === ")" || ch === "]" || ch === "}") {
      if (--depth < 0) return !0;
    } else if (depth === 0 && (ch === ";" || ch === "!")) return !0;
  }
  return quote2 !== null || depth !== 0;
}, safeCssValue = (v) => v != null && !(typeof v == "string" && /[;!{}]/.test(v) && loose(v));
function withVars(st, vars) {
  let css2 = typeof st == "string" ? st : "";
  if (st && typeof st == "object")
    for (let key in st)
      safeCssValue(st[key]) && (css2 += (css2 && !css2.endsWith(";") ? ";" : "") + key + ":" + st[key]);
  for (let key in vars)
    safeCssValue(vars[key]) && (css2 += (css2 && !css2.endsWith(";") ? ";" : "") + key + ":" + vars[key]);
  return css2 || void 0;
}
var others = (props, mine) => {
  for (let key in props)
    if (!mine.has(key)) return !0;
  return !1;
}, MINE = ["class", "style", "ref", "children"];
function serverBlock(props, mine, base, vars, attrs, back2) {
  let orientation = useOrientation(), v = vars(orientation() === "vertical"), css2 = withVars(props.style, v);
  return _$ssrElement("div", _$mergeProps(() => others(props, mine) ? splitProps(props, [...mine])[1] : {}, {
    get class() {
      return cls(base, props.class);
    },
    get "data-rhp-o"() {
      return short(orientation());
    }
  }, () => attrs ? attrs() : {}, {
    get "data-rhp-back"() {
      return back2?.(v) ? "" : void 0;
    }
  }, css2 ? {
    style: css2
  } : {}), () => _$escape(props.children), !0);
}
var blockElement = serverBlock;
function block(base, own, vars, back2) {
  let mine = /* @__PURE__ */ new Set([...MINE, ...own]);
  return (props) => blockElement(props, mine, base, (vertical) => vars(props, vertical), null, back2);
}
var Bar = block("rhp-bar", ["from", "to", "thick", "color", "shape"], (p, vertical) => ({
  "--rhp-from": p.from ?? 0,
  "--rhp-to": p.to ?? 0,
  "--rhp-thick": length(p.thick),
  "--rhp-color": tok(p.color),
  "--rhp-clip": p.shape?.clip(vertical, (p.to ?? 0) < (p.from ?? 0))
}), (v) => v["--rhp-to"] < v["--rhp-from"]), Dot = block("rhp-dot", ["at", "size", "across", "cross", "color", "shape"], (p, vertical) => ({
  "--rhp-at": p.at,
  "--rhp-size": length(p.size),
  "--rhp-across": p.across,
  "--rhp-cross": p.cross,
  "--rhp-color": tok(p.color),
  "--rhp-clip": p.shape?.clip(vertical, !1)
})), Place = block("rhp-place", ["at", "across", "cross"], (p) => ({
  "--rhp-at": p.at,
  "--rhp-across": p.across,
  "--rhp-cross": p.cross
})), Tick = block("rhp-tick", ["at", "thick", "color", "shape"], (p, vertical) => ({
  "--rhp-at": p.at,
  "--rhp-thick": length(p.thick),
  "--rhp-color": tok(p.color),
  "--rhp-clip": p.shape?.clip(vertical, !1)
})), Cell = block("rhp-cell", ["value", "color", "shape"], (p, vertical) => ({
  "--rhp-value": p.value,
  "--rhp-color": tok(p.color),
  "--rhp-clip": p.shape?.clip(vertical, !1)
})), LABEL = /* @__PURE__ */ new Set([...MINE, "at", "side", "edge", "cross", "shape"]), Label = (props) => blockElement(props, LABEL, "rhp-label", (vertical) => ({
  "--rhp-at": props.at,
  "--rhp-cross": props.cross,
  "--rhp-clip": props.shape?.clip(vertical, !1)
}), () => ({
  "data-rhp-edge": props.edge,
  "data-rhp-side": props.side,
  "data-rhp-at": props.edge == null ? "" : void 0
}));
function Area(props) {
  let orientation = useOrientation(), [p, rest] = splitProps(props, ["class", "style", "ref", "points", "peak", "mirror", "color", "smooth"]), span = createMemo(() => {
    let pts = p.points ?? [];
    return pts.length ? [pts[0][0], pts[pts.length - 1][0]] : [0, 0];
  }), points2 = () => {
    let pts = p.points ?? [];
    if (pts.length < 2) return null;
    let [x0, x1] = span(), w = x1 - x0 || 1, peak = p.peak ?? extentOf(pts.map((q) => q[1]))[1];
    return pts.map(([x, y]) => [(x - x0) / w * 1e3, Math.min(1, y / (peak || 1))]);
  }, pathEl, shown = drawn(points2, () => pathEl), path = createMemo(() => {
    let ut = shown();
    if (!ut) return "";
    let vertical = orientation() === "vertical", xy = (u, t) => vertical ? [1e3 - t, 1e3 - u] : [u, t];
    return p.mirror ? "M" + trace(ut.map(([u, y]) => xy(u, 500 - y * 500)), p.smooth) + "L" + trace(ut.slice().reverse().map(([u, y]) => xy(u, 500 + y * 500)), p.smooth) + "Z" : "M" + fmt(xy(ut[0][0], 1e3)) + "L" + trace(ut.map(([u, y]) => xy(u, 1e3 - y * 1e3)), p.smooth) + "L" + fmt(xy(ut[ut.length - 1][0], 1e3)) + "Z";
  }), vars = () => ({
    "--rhp-from": span()[0],
    "--rhp-to": span()[1],
    "--rhp-color": tok(p.color),
    "--rhp-d": path() ? `path("${path()}")` : void 0
  }), el, node = _$ssrElement("svg", _$mergeProps(rest, {
    get class() {
      return cls("rhp-area", p.class);
    },
    get "data-rhp-o"() {
      return short(orientation());
    },
    viewBox: "0 0 1000 1000",
    preserveAspectRatio: "none",
    get style() {
      return withVars(p.style, vars());
    }
  }), () => _$ssr(_tmpl$2, _$ssrAttribute("d", _$escape(path(), !0), !1)), !0);
  return node;
}
function Line(props) {
  let orientation = useOrientation(), crossed = useCrossed(), [p, rest] = splitProps(props, ["class", "style", "ref", "points", "peak", "fill", "base", "color", "smooth"]), box = createMemo(() => {
    let pts = p.points ?? [];
    if (!pts.length) return [0, 0, 0, 1];
    let xs = pts.map((q) => q[0]), ys = pts.map((q) => q[1]);
    p.fill && ys.push(p.base ?? 0);
    let [y0, y1] = extentOf(ys);
    return y0 === y1 && (y0 -= 0.5, y1 += 0.5), [...extentOf(xs), y0, y1];
  }), points2 = () => {
    let pts = p.points ?? [];
    if (pts.length < 2) return null;
    let [x0, x1, y0, y1] = box(), w = x1 - x0 || 1, peak = p.peak ?? extentOf(pts.map((q) => q[1]))[1], up = crossed() ? (y) => (y - y0) / (y1 - y0) : (y) => Math.min(1, y / (peak || 1));
    return {
      ut: pts.map(([x, y]) => [(x - x0) / w * 1e3, 1e3 - up(y) * 1e3]),
      floor: p.fill && crossed() ? 1e3 - up(p.base ?? 0) * 1e3 : 1e3
    };
  }, pathEl, shown = drawn(points2, () => pathEl), paths = createMemo(() => {
    let pts = shown();
    if (!pts) return ["", ""];
    let {
      ut,
      floor
    } = pts, vertical = orientation() === "vertical", xy = (u, t) => vertical ? [1e3 - t, 1e3 - u] : [u, t], line = "M" + trace(ut.map(([u, t]) => xy(u, t)), p.smooth);
    if (!p.fill) return [line, ""];
    let under = line + "L" + fmt(xy(ut[ut.length - 1][0], floor)) + "L" + fmt(xy(ut[0][0], floor)) + "Z";
    return [line, under];
  }), vars = () => ({
    "--rhp-from": box()[0],
    "--rhp-to": box()[1],
    "--rhp-cross-from": crossed() ? box()[2] : void 0,
    "--rhp-cross-to": crossed() ? box()[3] : void 0,
    "--rhp-color": tok(p.color),
    "--rhp-d": paths()[0] ? `path("${paths()[0]}")` : void 0,
    "--rhp-d-under": paths()[1] ? `path("${paths()[1]}")` : void 0
  }), el, node = _$ssrElement("svg", _$mergeProps(rest, {
    get class() {
      return cls("rhp-line", p.class);
    },
    get "data-rhp-o"() {
      return short(orientation());
    },
    viewBox: "0 0 1000 1000",
    preserveAspectRatio: "none",
    get style() {
      return withVars(p.style, vars());
    }
  }), () => [_$ssr(_tmpl$3, _$ssrAttribute("d", _$escape(paths()[1], !0), !1)), _$ssr(_tmpl$4, _$ssrAttribute("d", _$escape(paths()[0], !0), !1))], !0);
  return node;
}

// src/plot.jsx
var _tmpl$ = ["<div", ' style="', '">', "</div>"], _tmpl$22 = ["<div", ' style="', '"><div class="rhp-body"><!--$-->', "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--></div><!--$-->", "<!--/--></div>"], _tmpl$32 = ["<style", " data-rhp-server>", "</style>"], _tmpl$42 = ["<div", ' class="rhp-axis"', ' aria-hidden="true">', "</div>"], _tmpl$5 = ["<div", ' class="rhp-gridline"', ' style="', '"><span>', "</span></div>"], _tmpl$6 = ["<div", ' class="rhp-gridline"><span></span></div>'], isList = (g) => Array.isArray(g) || ArrayBuffer.isView(g) && !(g instanceof DataView), at = (group, i) => {
  if (!isList(group)) return group;
  let v = group[i];
  return v !== void 0 || !group.length ? v : group[i % group.length];
}, Around = createContext({
  orientation: () => "horizontal",
  motion: () => {
  },
  frame: null,
  nested: !1,
  still: !1
}), useOrientation = () => useContext(Around).orientation, useCrossed = () => {
  let frame = useContext(Around).frame;
  return () => frame?.crossed() ?? !1;
}, usePointFrame = () => {
  let around = useContext(Around), frame = around.frame;
  if (!frame) throw new Error("rhp: ManyDots must be inside a Chart with a cross scale.");
  return {
    orientation: around.orientation,
    scale: frame.shown,
    cross: frame.crossShown,
    theme: frame.theme,
    static: around.still
  };
}, short = (o) => o === "vertical" ? "v" : "h", SETTINGS = /* @__PURE__ */ new Set(["children", "order", "reorder", "orientation", "overlap", "slats", "key", "rows", "animate", "thick", "class", "style", "ref", "onLoop", "static", "keyboard"]), STEPS = {
  ArrowDown: 1,
  ArrowRight: 1,
  ArrowUp: -1,
  ArrowLeft: -1,
  Home: -1 / 0,
  End: 1 / 0
}, pick = (v, o) => v != null && typeof v == "object" && ("horizontal" in v || "vertical" in v) ? v[o] : v, px = (v) => typeof v == "number" ? v + "px" : v, share = (v) => typeof v == "number" ? v * 100 + "%" : v, same2 = (a, b) => a.length === b.length && a.every((v, k) => v === b[k]), sameSet = (a, b) => a.size === b.size && [...a].every((v) => b.has(v)), range = (n) => Array.from({
  length: n
}, (_, i) => i), byPosition = (positions) => range(positions.length).filter((i) => positions[i] != null).sort((a, b) => positions[a] - positions[b]), ROW = {
  get: (t, key) => typeof key == "string" ? t.P.read(t, key) : void 0,
  has: (t, key) => t.P.has(t, key),
  ownKeys: (t) => t.P.keys(t),
  getOwnPropertyDescriptor: (t, key) => t.P.has(t, key) ? {
    configurable: !0,
    enumerable: !0,
    get: () => t.P.read(t, key)
  } : void 0
}, BLOCK = /(^|\s)rhp-(bar|dot|tick|label|cell|place|area)(\s|$)/, warned = !1, warnBare = (el) => {
  if (warned) return;
  warned = !0;
  let name = el.getAttribute("class").match(BLOCK)[2], Name = name[0].toUpperCase() + name.slice(1);
  console.warn(`rhp: a ${Name} is a slat's root here, so the Plot places it as the row and it ignores part of its own placing. Put it in an element: (d) => <div><${Name} \u2026 /></div>. (Only a Plot with overlap takes a block as its slat.)`);
}, autoRoom = (r) => r === "auto" || r?.start === "auto" || r?.end === "auto", warnedAspect = !1, warnedHeight = !1, warnedThick = !1, warnAspect = (bad, height, thick) => {
  bad && !warnedAspect && (warnedAspect = !0, console.warn("rhp: aspect takes a number above 0, the chart's width over its height (aspect={16 / 9}), so this one is ignored.")), height && !warnedHeight && (warnedHeight = !0, console.warn("rhp: a Chart with an aspect takes its height from its width, so its height is ignored.")), thick && !warnedThick && (warnedThick = !0, console.warn("rhp: a flat Chart with an aspect has rows with a thickness here, and they keep it rather than share the chart's height. Leave their thickness out to let them fill it."));
}, warnedWrapped = !1, warnWrapped = (el) => {
  if (!warnedWrapped)
    for (let label of el.querySelectorAll(".rhp-label[data-rhp-edge]")) {
      let inner = label.closest(".rhp-plot");
      if (!(label.parentElement === el || inner && el.contains(inner))) {
        warnedWrapped = !0, console.warn(`rhp: an edge Label is inside another element here, so room "auto" doesn't measure it and it gets no room. Make it a child of the slat's root element: (d) => <div><Label edge="start">\u2026</Label> \u2026 </div>. (Room in px has no such limit.)`);
        return;
      }
    }
}, SPACE = /\s/;
function readTag(node) {
  for (; typeof node == "function"; )
    node = node();
  let t = node?.t, oneElement = () => new Error("rhp: a slat must return one element");
  if (typeof t != "string") throw oneElement();
  let i = 0;
  for (; SPACE.test(t[i] ?? ""); )
    i++;
  if (t[i] !== "<" || !/[a-zA-Z]/.test(t[i + 1] ?? "")) throw oneElement();
  let j = i + 1;
  for (; j < t.length && !SPACE.test(t[j]) && t[j] !== ">" && t[j] !== "/"; )
    j++;
  let tag = {
    head: t.slice(0, i),
    name: t.slice(i + 1, j),
    attrs: [],
    end: "",
    rest: ""
  };
  for (; ; ) {
    for (; SPACE.test(t[j] ?? ""); )
      j++;
    if (j >= t.length) throw oneElement();
    if (t[j] === ">" || t[j] === "/" && t[j + 1] === ">")
      return tag.end = t[j] === ">" ? ">" : "/>", tag.rest = t.slice(j + tag.end.length), tag;
    if (t[j] === "/") {
      j++;
      continue;
    }
    let k = j;
    for (; k < t.length && !SPACE.test(t[k]) && t[k] !== "=" && t[k] !== ">" && !(t[k] === "/" && t[k + 1] === ">"); )
      k++;
    let name = t.slice(j, k);
    for (j = k; SPACE.test(t[j] ?? ""); )
      j++;
    if (t[j] !== "=") {
      tag.attrs.push([name]);
      continue;
    }
    for (j++; SPACE.test(t[j] ?? ""); )
      j++;
    let q = t[j] === '"' || t[j] === "'" ? t[j] : "", e = q ? t.indexOf(q, j + 1) : j;
    if (e < 0) throw oneElement();
    if (!q)
      for (; e < t.length && !SPACE.test(t[e]) && t[e] !== ">"; )
        e++;
    tag.attrs.push([name, t.slice(q ? j + 1 : j, e), q]), j = q ? e + 1 : e;
  }
}
var quote = (v) => String(v).replace(/&/g, "&amp;").replace(/"/g, "&quot;"), writeTag = (tag) => {
  let attrs = tag.attrs.map(([key, value, q]) => value === void 0 ? " " + key : " " + key + "=" + (q ?? '"') + value + (q ?? '"'));
  return tag.head + "<" + tag.name + attrs.join("") + tag.end + tag.rest;
};
function onRoot(tag, attrs, vars) {
  tag.attrs || (tag = readTag(tag));
  let get = (key) => tag.attrs.find((a) => a[0] === key);
  for (let key in attrs) {
    let now = get(key), value = typeof attrs[key] == "function" ? attrs[key](now?.[1]) : attrs[key];
    value !== void 0 && (now && tag.attrs.splice(tag.attrs.indexOf(now), 1), value !== null && tag.attrs.push([key, value === !0 ? void 0 : quote(value), '"']));
  }
  let css2 = withVars(void 0, vars);
  if (css2) {
    let st = get("style");
    if (!st)
      tag.attrs.push(["style", quote(css2), '"']);
    else {
      let q = st[2] || '"', add2 = q === "'" ? css2.replace(/&/g, "&amp;").replace(/'/g, "&#39;") : quote(css2);
      st[1] = (st[1] ? st[1].replace(/;?\s*$/, ";") : "") + add2, st[2] = q;
    }
  }
  return {
    t: writeTag(tag)
  };
}
function Plot(props) {
  return makePlot(props, "Plot");
}
function makePlot(props, role) {
  if (typeof props.children != "function") throw new Error(`rhp: a ${role}'s child must be a slat function, (d) => <div>\u2026</div>`);
  onCleanup(useSlatCss(props.children));
  let layout = props.children.layout ?? {}, {
    nested,
    frame,
    orientation: inherited,
    motion: inheritedMotion,
    still: stillAround
  } = useContext(Around);
  frame?.sheet(props.children);
  let still = props.static ?? stillAround, orientation = () => {
    let o = props.orientation ?? inherited();
    return o !== "across" ? o : inherited() === "vertical" ? "horizontal" : "vertical";
  }, groups = Object.keys(props).filter((key) => !SETTINGS.has(key)), isGroup = new Set(groups), owner = getOwner(), later = (fn, options) => {
    let memo;
    return () => (memo ?? (memo = runWithOwner(owner, () => createMemo2(fn, void 0, options))))();
  }, group = {};
  for (let key of groups)
    group[key] = createMemo2(() => props[key]);
  let rowsList = "rows" in props ? createMemo2(() => props.rows) : () => {
  }, keyed = props.key != null, n = createMemo2(() => {
    if (props.slats != null) return props.slats;
    let count = isList(rowsList()) ? rowsList().length : 0;
    for (let key of groups) {
      let g = group[key]();
      isList(g) && (count = Math.max(count, g.length));
    }
    return count;
  }), raw = (key, i) => isGroup.has(key) ? at(group[key](), i) : at(rowsList(), i)?.[key], P = {
    read(t, key) {
      var _a;
      return key === "index" ? t.row() : key === "position" ? pos[t.row()] : typeof (isGroup.has(key) ? group[key]() : void 0) == "function" ? ((_a = t.memos ?? (t.memos = {}))[key] ?? (_a[key] = runWithOwner(t.owner, () => createMemo2(() => {
        let f = group[key]();
        return typeof f == "function" ? f(t.self) : void 0;
      }))))() : t.id && js() && isMoving(key) ? moving(key, t.id())(t.ahead) : raw(key, t.row());
    },
    has: (t, key) => key === "index" || key === "position" || isGroup.has(key) || rowsList() != null && key in (at(rowsList(), t.row()) ?? {}),
    keys: (t) => [.../* @__PURE__ */ new Set(["index", "position", ...groups, ...Object.keys(at(rowsList(), t.row()) ?? {})])]
  };
  function datum(row, id, ahead = 0) {
    let t = {
      P,
      row,
      id,
      ahead,
      owner: getOwner(),
      memos: null,
      self: null
    };
    return t.self = new Proxy(t, ROW);
  }
  let anim = createMemo2(() => {
    let a = props.animate ?? inheritedMotion();
    return a ? a === !0 ? {
      all: !0
    } : Array.isArray(a) ? {
      groups: a
    } : {
      ...a,
      all: a.groups == null
    } : null;
  }), listed = later(() => new Set(anim()?.groups ?? []), {
    equals: sameSet
  }), all = later(() => anim()?.all === !0), isMoving = (key) => all() || listed().has(key), js = () => anim() != null, easing = later(() => curve(anim()?.ease)), timing = () => ({
    duration: anim()?.duration ?? MOVE_MS,
    ease: easing()
  }), slideMs = () => anim()?.slide ?? (js() ? 175 : void 0), ids = keyed && createMemo2(() => {
    let key = props.key;
    return range(n()).map((i) => typeof key == "function" ? key(datum(() => i, null)) : raw(key, i));
  }, void 0, {
    equals: same2
  }), rowOf = keyed && later(() => new Map(ids().map((id, i) => [id, i]))), rowOfId = (id) => keyed ? rowOf().get(id) : id, idOf = (i) => keyed ? ids()[i] : i, readers = {}, pruning = !1, moving = (key, id) => {
    pruning || (pruning = !0, runWithOwner(owner, () => createComputed(() => {
      let live = new Set(keyed ? ids() : range(n()));
      for (let k in readers)
        if (!js() || !isMoving(k))
          delete readers[k];
        else
          for (let readerId of readers[k].keys())
            live.has(readerId) || readers[k].delete(readerId);
    })));
    let forGroup = readers[key] ?? (readers[key] = /* @__PURE__ */ new Map()), reader = forGroup.get(id);
    return reader || forGroup.set(id, reader = animated(() => raw(key, rowOfId(id)), timing)), reader;
  }, [pos, setPos] = createStore([]), lead = () => js() && (props.reorder ?? "slide") === "slide" ? (slideMs() ?? 0) / 2 : 0, views = later(() => {
    let ms = lead();
    return range(n()).map((i) => datum(() => i, () => idOf(i), ms));
  }), positions = createMemo2((prev) => {
    let order = props.order;
    return order == null ? range(n()) : typeof order == "function" ? order(views(), prev?.length === n() ? prev : range(n())) : range(n()).map((i) => (isList(order) ? order[i] : order) ?? null);
  }, void 0, {
    equals: same2
  });
  createComputed(() => setPos(positions().slice()));
  let shown = later(() => byPosition(positions()), {
    equals: same2
  }), extent2 = createMemo2(() => positions().reduce((m, p) => p == null ? m : Math.max(m, p + 1), 0)), scale = role === "Scale", asList = () => !nested && !scale && !props.overlap, uid = createUniqueId(), [rowIds, setRowIds] = createSignal2(null), ownIdAt = (r, id) => setRowIds((m) => {
    let next = new Map(m);
    return id ? next.set(r, id) : next.delete(r), next;
  }), reordered = () => props.order != null && (props.reorder ?? "slide") === "slide", owns = () => {
    if (scale || !reordered()) return;
    let list = shown(), own = rowIds();
    if (list.some((r, k) => r !== k))
      return list.map((r) => own?.get(r) ?? `rhp-${uid}-${r}`).join(" ");
  }, keyboard = !!props.keyboard, plotEl, [picked, setPicked] = keyboard ? createSignal2() : [], stop = keyboard && later(() => {
    let id = picked(), r = id === void 0 ? void 0 : rowOfId(id);
    if (r != null && r < n() && positions()[r] != null) return id;
    let first = shown()[0];
    return first === void 0 ? void 0 : idOf(first);
  }), isStop = keyboard && !still && !1, elementOf = (r) => {
    for (let child of plotEl.children)
      if (child.$row?.() === r) return child;
  };
  function onKey(e) {
    let step = STEPS[e.key];
    if (e.target.parentElement !== plotEl || step === void 0 || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    let list = shown(), k = list.indexOf(e.target.$row());
    elementOf(list[Math.min(Math.max(k + step, 0), list.length - 1)])?.focus();
  }
  function onFocusIn(e) {
    let el = e.target;
    if (el.parentElement !== plotEl) return;
    if (still)
      for (let child of plotEl.children) {
        let want = child === el ? 0 : -1;
        child.tabIndex !== want && (child.tabIndex = want);
      }
    let id = idOf(el.$row());
    setPicked(() => id);
  }
  let had = !1, note = () => had = plotEl != null && document.activeElement?.parentElement === plotEl, restore = () => {
    if (!had) return;
    had = !1;
    let el = elementOf(rowOfId(stop()));
    el && el !== document.activeElement && el.focus({
      preventScroll: !0
    });
  }, attach = (el) => {
    plotEl = el;
  };
  if (frame && (layout.room || !nested && role === "Plot")) {
    let defaults = () => nested || role !== "Plot" || props.overlap && frame.crossed() ? null : DEFAULT_ROOM[frame.orientation()], want = () => pick(layout.room, frame.orientation()) ?? defaults();
    frame.need(want), onCleanup(() => frame.drop(want));
  }
  let edgesUnchecked = !1, checkEdges = (el) => {
    edgesUnchecked = !1, autoRoom(pick(layout.room, orientation())) && warnWrapped(el);
  };
  if (frame && !nested && role === "Plot" && !props.overlap) {
    let fits = () => pick(layout.thickness, orientation()) == null;
    frame.fit(fits), onCleanup(() => frame.unfit(fits));
  }
  let ran = (list) => (props.onLoop?.(), list), slat2 = (row, id) => serverRow(props.children(datum(row, id)), row(), pos[row()]), serverRow = ((node, r, p) => {
    let tag = readTag(node), own = tag.attrs.find((a) => a[0] === "id")?.[1], id = own ?? (reordered() ? `rhp-${uid}-${r}` : void 0);
    return own && ownIdAt(r, own), onRoot(tag, {
      "data-rhp-slat": props.children.scope ?? void 0,
      "data-rhp-o": short(orientation()),
      hidden: p == null ? !0 : null,
      role: asList() ? (v) => v === void 0 ? "listitem" : void 0 : void 0,
      id: own ? void 0 : id,
      tabindex: keyboard ? idOf(r) === stop() ? "0" : "-1" : void 0
    }, {
      "--rhp-position": p
    });
  }), drawn2 = (i, p) => serverRow(props.children(datum(() => i, null)), i, p), action = () => props.reorder ?? "slide", Slats = () => still ? createMemo2(() => {
    for (let key of groups)
      group[key]();
    rowsList(), orientation();
    let p = positions();
    return untrack2(() => ran(range(n())).map((i) => drawn2(i, p[i])));
  }) : createMemo2(() => {
    let a = action();
    return untrack2(() => a === "move" ? _$createComponent(For, {
      get each() {
        return ran(shown().map(idOf));
      },
      children: (id) => {
        let row = createMemo2(() => rowOfId(id));
        return slat2(row, () => id);
      }
    }) : a === "refill" ? _$createComponent(Index, {
      get each() {
        return ran(shown());
      },
      children: (row) => slat2(row, () => idOf(row()))
    }) : keyed ? _$createComponent(For, {
      get each() {
        return ran(ids());
      },
      children: (id, i) => slat2(i, () => id)
    }) : _$createComponent(Index, {
      get each() {
        return ran(Array(n()));
      },
      children: (_, i) => slat2(() => i, () => i)
    }));
  });
  return _$createComponent(Around.Provider, {
    value: {
      orientation,
      motion: () => {
      },
      frame,
      nested: !0,
      still
    },
    get children() {
      return _$ssr2(_tmpl$, _$ssrHydrationKey2() + _$ssrAttribute2("class", props.class ? "rhp-plot " + _$escape2(props.class, !0) : "rhp-plot", !1) + _$ssrAttribute2("role", asList() ? "list" : _$escape2(void 0, !0), !1) + _$ssrAttribute2("aria-hidden", scale ? "true" : _$escape2(void 0, !0), !1) + _$ssrAttribute2("aria-owns", _$escape2(owns(), !0), !1) + _$ssrAttribute2("data-rhp-o", _$escape2(short(orientation()), !0), !1) + _$ssrAttribute2("data-rhp-reorder", _$escape2(action(), !0), !1) + _$ssrAttribute2("data-rhp-overlap", props.overlap ? "" : _$escape2(void 0, !0), !1) + _$ssrAttribute2("data-rhp-animate", js() ? "js" : _$escape2(void 0, !0), !1), _$ssrStyle({
        ...props.style,
        "--rhp-n": extent2(),
        "--rhp-pitch": nested ? void 0 : px(pick(layout.thickness, orientation())),
        "--rhp-inset": share(pick(layout.inset, orientation())),
        "--rhp-plot-thick": share(props.thick),
        "--rhp-slide-time": slideMs() == null ? void 0 : slideMs() + "ms",
        "--rhp-length-time": anim()?.duration == null ? void 0 : anim().duration + "ms",
        "--rhp-length-ease": cssCurve(anim()?.ease)
      }), _$escape2(_$createComponent(Slats, {})));
    }
  });
}
function Scale(props) {
  let frame = useContext(Around).frame;
  if (!frame) throw new Error("rhp: a Scale goes inside a Chart");
  frame.addScale(), onCleanup(frame.dropScale);
  let ticks = createMemo2(() => tickValues(props.ticks, frame.shown(), frame.domain()), void 0, {
    equals: same2
  }), [, rest] = splitProps2(props, ["ticks", "class"]);
  return makePlot(mergeProps(rest, {
    overlap: !0,
    animate: !1,
    key: (t) => {
      let [a, b] = frame.shown();
      return t.at === a ? "min" : t.at === b ? "max" : t.at;
    },
    get class() {
      return props.class ? "rhp-scale " + props.class : "rhp-scale";
    },
    get at() {
      return ticks();
    },
    next: (t) => ticks()[t.index + 1] ?? frame.shown()[1],
    first: (t) => t.index === 0,
    last: (t) => t.index === ticks().length - 1,
    toEnd: (t) => {
      let [a, b] = frame.shown(), length3 = frame.length();
      return length3 ? (b - t.at) / (b - a || 1) * length3 : 1 / 0;
    }
  }), "Scale");
}
function tickValues(t, [a, b], [a0, b0] = [a, b]) {
  if (t === !1) return [];
  let eps = (b - a) * 1e-9;
  if (isList(t)) return Array.from(t).filter((v) => v >= a - eps && v <= b + eps);
  if (typeof t == "function") return t([a, b]);
  let {
    step
  } = nice(a0, b0, t ?? 5), out = [], first = Math.ceil(a / step - 1e-9);
  for (let k = 0; k <= 1e3; k++) {
    let v = (first + k) * step;
    if (!(v <= b + 1e-9 * step) || k > 0 && v === (first + k - 1) * step) break;
    out.push(+v.toFixed(10));
  }
  return out;
}
var THEME = {
  series: ["#2a78d6", "#eb6834", "#1baf7a", "#c2419a", "#7b5cd6", "#d39a12"],
  positive: "#13894f",
  negative: "#c62828",
  ink: "#1d232b",
  muted: "#6b7280",
  grid: "rgba(128, 128, 128, .22)",
  surface: "#ffffff",
  low: "#e8eef8",
  high: "#1f4fa8",
  font: "system-ui, sans-serif"
}, ThemeContext = createContext(null);
function Theme(props) {
  let outer = useContext(ThemeContext);
  return _$createComponent(ThemeContext.Provider, {
    value: () => ({
      ...outer?.(),
      ...props.value
    }),
    get children() {
      return props.children;
    }
  });
}
function themeVars(theme) {
  let vars = {};
  theme.series.forEach((color2, i) => vars["--rhp-series-" + (i + 1)] = color2);
  for (let key in theme)
    key !== "series" && (vars["--rhp-" + key] = theme[key]);
  return vars;
}
var series = (n = THEME.series.length) => (d) => "series-" + (d.index % n + 1), DEFAULT_ROOM = {
  horizontal: {
    start: 104,
    end: 44
  },
  vertical: {
    start: 28,
    end: 20
  }
}, SIDES = {
  horizontal: {
    start: "left",
    end: "right",
    before: "top",
    after: "bottom"
  },
  vertical: {
    start: "bottom",
    end: "top",
    before: "left",
    after: "right"
  }
}, AXIS = {
  horizontal: ["bottom", 24],
  vertical: ["left", 42]
}, AXIS_END = {
  horizontal: ["right", 14],
  vertical: ["top", 8]
}, AXIS_START = {
  horizontal: ["left", 14],
  vertical: ["bottom", 8]
};
function Chart(props) {
  useCore();
  let orientation = () => props.orientation ?? "horizontal", aspect = () => typeof props.aspect == "number" && props.aspect > 0 && Number.isFinite(props.aspect) ? props.aspect : void 0, pageTheme = useContext(ThemeContext), theme = createMemo2(() => themeVars({
    ...THEME,
    ...pageTheme?.(),
    ...props.theme
  })), domain = createMemo2(() => props.scale ?? [0, 100], void 0, {
    equals: same2
  }), anim = () => props.animate === !0 ? {} : props.animate, timing = () => ({
    duration: anim()?.duration ?? MOVE_MS,
    ease: curve(anim()?.ease)
  }), lo = animated(() => domain()[0], timing), hi = animated(() => domain()[1], timing), min = () => anim() ? lo() : domain()[0], max = () => anim() ? hi() : domain()[1], shown = () => [min(), max()], ticks = createMemo2(() => tickValues(props.ticks, shown(), domain()), void 0, {
    equals: same2
  }), [wants, setWants] = createSignal2([]), [scales, setScales] = createSignal2(0), [fitters, setFitters] = createSignal2([]), hasTicks = createMemo2(() => tickValues(props.ticks, domain()).length > 0), axis = () => scales() === 0 && hasTicks(), [size, setSize] = createSignal2({
    w: 0,
    h: 0
  }, {
    equals: (a, b) => a.w === b.w && a.h === b.h
  }), length3 = () => orientation() === "vertical" ? size().h : size().w, slats = /* @__PURE__ */ new Set(), crossed = () => props.cross != null, crossMoves, crossShown = () => anim() ? (crossMoves ?? (crossMoves = [animated(() => props.cross[0], timing), animated(() => props.cross[1], timing)]), [crossMoves[0](), crossMoves[1]()]) : props.cross, crossAxis = () => crossed() && tickValues(props.crossTicks, props.cross).length > 0, frame = {
    orientation,
    domain,
    shown,
    crossShown: () => crossed() ? crossShown() : null,
    theme: () => ({
      ...theme(),
      ...props.style
    }),
    length: length3,
    crossed,
    sheet: (fn) => fn?.scope && slats.add(fn),
    need: (want) => setWants((list) => [...list, want]),
    drop: (want) => setWants((list) => list.filter((x) => x !== want)),
    addScale: () => setScales((count) => count + 1),
    fit: (f) => setFitters((list) => [...list, f]),
    unfit: (f) => setFitters((list) => list.filter((x) => x !== f)),
    dropScale: () => setScales((count) => count - 1)
  }, arrange = () => {
    let o = orientation(), side = SIDES[o], out = {
      top: 2,
      right: 2,
      bottom: 2,
      left: 2
    }, room = {
      start: 0,
      end: 0
    }, auto = {};
    for (let want of wants()) {
      let r = want() === "auto" ? {
        start: "auto",
        end: "auto"
      } : want();
      if (r)
        for (let k in side)
          r[k] === "auto" ? k in room && (auto[k] = !0) : r[k] != null && (out[side[k]] = Math.max(out[side[k]], r[k]), k in room && (room[k] = Math.max(room[k], r[k])));
    }
    if (axis())
      for (let [s, n] of [AXIS[o], AXIS_END[o], AXIS_START[o]])
        out[s] = Math.max(out[s], n);
    if (crossAxis()) {
      let other = o === "vertical" ? "horizontal" : "vertical";
      for (let [s, n] of [AXIS[other], AXIS_END[other], AXIS_START[other]])
        out[s] = Math.max(out[s], n);
    }
    let vars = {
      "--rhp-room-start": room.start + "px",
      "--rhp-room-end": room.end + "px"
    }, gutters = !!(auto.start || auto.end);
    if (crossed(), gutters)
      for (let k of ["start", "end"]) {
        let n = out[side[k]];
        out[side[k]] = 0, vars["--rhp-gutter-" + k] = auto[k] ? `minmax(${n}px, max-content)` : n + "px";
      }
    for (let s in out)
      vars["--rhp-pad-" + s] = out[s] + "px";
    return {
      vars,
      gutters,
      sized: (props.height != null || aspect() != null) && o === "horizontal" && fitters().some((f) => f())
    };
  }, sameArrangement = (a, b) => {
    if (a.gutters !== b.gutters || a.sized !== b.sized) return !1;
    let keys = Object.keys(a.vars);
    return keys.length === Object.keys(b.vars).length && keys.every((key) => a.vars[key] === b.vars[key]);
  }, arranged = arrange;
  createEffect(() => warnAspect(props.aspect != null && aspect() == null, aspect() != null && props.height != null, aspect() != null && orientation() === "horizontal" && fitters().some((f) => !f())));
  let [turning, setTurning] = createSignal2(!1);
  createComputed((was) => {
    let o = orientation();
    return was && was !== o && typeof requestAnimationFrame == "function" && (setTurning(!0), requestAnimationFrame(() => requestAnimationFrame(() => setTurning(!1)))), o;
  });
  let el;
  onMount(() => {
    for (let st of el.querySelectorAll(":scope > style[data-rhp-server]"))
      st.remove();
    useRoot(el), onCleanup(watchRoot(el));
    let body = el.querySelector(".rhp-body");
    if (body && checkLinked(body), !body || typeof ResizeObserver > "u") return;
    let ro2 = new ResizeObserver(([e]) => setSize({
      w: e.contentRect.width,
      h: e.contentRect.height
    }));
    ro2.observe(body), onCleanup(() => ro2.disconnect());
  });
  let name = () => props.label ?? props["aria-label"], figure = () => name() != null || props["aria-labelledby"] != null ? props.role ?? "figure" : props.role, moreAria = () => Object.keys(props).filter((key) => key.startsWith("aria-") && !OWN_ARIA.has(key)), node = _$createComponent(Around.Provider, {
    get value() {
      return {
        orientation,
        motion: () => props.animate,
        frame,
        nested: !1,
        still: props.static === !0
      };
    },
    get children() {
      return _$ssr2(_tmpl$22, _$ssrHydrationKey2() + _$ssrAttribute2("id", _$escape2(props.id, !0), !1) + _$ssrAttribute2("role", _$escape2(figure(), !0), !1) + _$ssrAttribute2("aria-label", _$escape2(name(), !0), !1) + _$ssrAttribute2("aria-labelledby", _$escape2(props["aria-labelledby"], !0), !1) + _$ssrAttribute2("aria-describedby", _$escape2(props["aria-describedby"], !0), !1) + _$ssrAttribute2("class", props.class ? "rhp-chart " + _$escape2(props.class, !0) : "rhp-chart", !1) + _$ssrAttribute2("data-rhp-o", _$escape2(short(orientation()), !0), !1) + _$ssrAttribute2("data-rhp-animate", anim() ? "js" : _$escape2(void 0, !0), !1) + _$ssrAttribute2("data-rhp-turning", turning() ? "" : _$escape2(void 0, !0), !1) + _$ssrAttribute2("data-rhp-sized", arranged().sized ? "" : _$escape2(void 0, !0), !1) + _$ssrAttribute2("data-rhp-aspect", aspect() != null ? "" : _$escape2(void 0, !0), !1) + _$ssrAttribute2("data-rhp-gutters", arranged().gutters ? _$escape2(short(orientation()), !0) : _$escape2(void 0, !0), !1) + _$ssrAttribute2("data-rhp-cross", crossed() ? "" : _$escape2(void 0, !0), !1), _$ssrStyle({
        ...KNOBS,
        ...theme(),
        ...arranged().vars,
        ...props.style,
        "--rhp-height": px(props.height ?? 240),
        "--rhp-aspect": aspect()
      }), _$escape2(props.children), _$escape2(_$createComponent(Show, {
        get when() {
          return axis();
        },
        get children() {
          return _$createComponent(Axis, {
            get ticks() {
              return ticks();
            },
            get format() {
              return props.format;
            },
            get grid() {
              return props.grid;
            }
          });
        }
      })), _$escape2(_$createComponent(Show, {
        get when() {
          return crossAxis();
        },
        get children() {
          return _$createComponent(Axis, {
            cross: !0,
            get ticks() {
              return tickValues(props.crossTicks, crossShown(), props.cross);
            },
            get format() {
              return props.crossFormat;
            },
            get grid() {
              return props.crossGrid;
            }
          });
        }
      })), _$ssr2(_tmpl$32, _$ssrHydrationKey2(), serverSheets(slats, sharedConfig.context?.assets, arranged().gutters, crossed())));
    }
  }), scaleVars = () => {
    if (!crossed()) return {
      "--rhp-min": min(),
      "--rhp-max": max()
    };
    let [a, b] = crossShown();
    return {
      "--rhp-min": min(),
      "--rhp-max": max(),
      "--rhp-cross-min": a,
      "--rhp-cross-max": b
    };
  };
  {
    let {
      vars,
      sized,
      gutters
    } = arranged();
    return onRoot(node, {
      ...Object.fromEntries(moreAria().map((key) => [key, props[key] ?? null])),
      style: withVars(void 0, {
        ...KNOBS,
        ...theme(),
        ...vars,
        ...props.style,
        "--rhp-height": px(props.height ?? 240),
        "--rhp-aspect": aspect(),
        ...scaleVars()
      }),
      "data-rhp-sized": sized ? !0 : null,
      "data-rhp-aspect": aspect() != null ? !0 : null,
      "data-rhp-gutters": gutters ? short(orientation()) : null
    });
  }
  return node;
}
var OWN_ARIA = /* @__PURE__ */ new Set(["aria-label", "aria-labelledby", "aria-describedby"]), KNOBS = {
  "--rhp-inset": "18%"
};
for (let name of ["color", "thick", "size", "across", "radius", "start-radius", "end-radius", "label-gap", "gap", "tick-width", "label-size", "cell-gap", "pitch", "plot-thick", "length-time", "length-ease", "slide-time", "slide-ease", "at", "from", "to", "value", "d", "position"])
  KNOBS["--rhp-" + name] = "initial";
function Axis(props) {
  let along = useOrientation(), orientation = () => props.cross ? along() === "vertical" ? "horizontal" : "vertical" : along();
  return _$ssr2(_tmpl$42, _$ssrHydrationKey2(), _$ssrAttribute2("data-rhp-o", _$escape2(short(orientation()), !0), !1) + _$ssrAttribute2("data-rhp-cross", props.cross ? "" : _$escape2(void 0, !0), !1) + _$ssrAttribute2("data-rhp-grid", props.grid === !1 ? "off" : _$escape2(void 0, !0), !1), _$escape2(_$createComponent(For, {
    get each() {
      return props.ticks;
    },
    children: (t) => _$ssr2(_tmpl$5, _$ssrHydrationKey2(), _$ssrAttribute2("data-rhp-o", _$escape2(short(orientation()), !0), !1), _$ssrStyle(withVars(void 0, {
      "--rhp-at": t
    })), props.format ? _$escape2(props.format(t)) : _$escape2(String(t)))
  })));
}

// src/shape.js
var PAIRS = { M: 1, L: 1, Q: 2, C: 3, Z: 0 }, pct = (v) => +(v * 100).toFixed(3) + "%", back = (v) => typeof v == "string" && v.trim().startsWith("-"), css = (v) => typeof v == "number" ? pct(v) : back(v) ? `calc(100% - ${v.trim().slice(1)})` : String(v), flip = (v) => typeof v == "number" ? pct(1 - v) : back(v) ? v.trim().slice(1) : `calc(100% - (${v}))`, place = (along, across, vertical, backward) => vertical ? [css(across), backward ? css(along) : flip(along)] : [backward ? flip(along) : css(along), css(across)], takesShape, supportsShape = () => takesShape ?? (takesShape = typeof CSS < "u" && CSS.supports?.("clip-path", "shape(from 0 0, line to 1px 1px, close)")), FLAT = 12;
var straighten = (from, cmd) => {
  let out = [], [x0, y0] = from;
  if (cmd[0] === "C") {
    let [, x1, y1, x2, y2, x3, y3] = cmd;
    for (let i = 1; i <= FLAT; i++) {
      let t = i / FLAT, u = 1 - t;
      out.push([
        u * u * u * x0 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x3,
        u * u * u * y0 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3
      ]);
    }
  } else {
    let [, x1, y1, x2, y2] = cmd;
    for (let i = 1; i <= FLAT; i++) {
      let t = i / FLAT, u = 1 - t;
      out.push([u * u * x0 + 2 * u * t * x1 + t * t * x2, u * u * y0 + 2 * u * t * y1 + t * t * y2]);
    }
  }
  return out;
}, points = (cmds) => {
  let paths = [], out, at2 = [0, 0];
  for (let c of cmds) {
    if (c[0] === "M")
      out = [], paths.push(out), at2 = [c[1], c[2]];
    else if (c[0] === "Z") at2 = out[0];
    else if (c[0] === "L") at2 = [c[1], c[2]];
    else {
      if (c.slice(1).every((v) => typeof v == "number") && at2.every((v) => typeof v == "number")) {
        for (let p of straighten(at2, c)) out.push(p);
        at2 = c.slice(-2);
        continue;
      }
      at2 = c.slice(-2);
    }
    out.push(at2);
  }
  if (paths.length === 1) return paths[0].at(-1) === paths[0][0] ? paths[0].slice(0, -1) : paths[0];
  let anchor = paths[0][0];
  return paths.flatMap((p) => [...p, p[0], anchor]);
}, polygon = (cmds, vertical, back2) => "polygon(" + points(cmds).map(([a, c]) => place(a, c, vertical, back2).join(" ")).join(", ") + ")", shapeFn = (cmds, vertical, back2) => {
  let parts = [];
  for (let c of cmds) {
    let pt = (i) => place(c[i], c[i + 1], vertical, back2).join(" ");
    c[0] === "M" ? parts.push((parts.length ? "move to " : "from ") + pt(1)) : c[0] === "L" ? parts.push("line to " + pt(1)) : c[0] === "Q" ? parts.push("curve to " + pt(3) + " with " + pt(1)) : c[0] === "C" ? parts.push("curve to " + pt(5) + " with " + pt(1) + " / " + pt(3)) : c[0] === "Z" && parts.push("close");
  }
  return "shape(" + parts.join(", ") + ")";
};
function shape(...cmds) {
  let list = (Array.isArray(cmds[0]) && Array.isArray(cmds[0][0]) ? cmds[0] : cmds).map((c) => typeof c == "string" ? [c] : c);
  if (list[0]?.[0] !== "M") throw new Error("rhp: a shape must start with M");
  for (let c of list) {
    let n = PAIRS[c[0]];
    if (n === void 0) throw new Error(`rhp: ${c[0]} is not a shape command (M, L, Q, C or Z)`);
    if (c.length !== n * 2 + 1) throw new Error(`rhp: ${c[0]} in a shape takes ${n * 2} numbers, not ${c.length - 1}`);
  }
  let curved = list.some((c) => c[0] === "Q" || c[0] === "C"), compound = list.filter((c) => c[0] === "M").length > 1, made2 = /* @__PURE__ */ new Map();
  return {
    curved,
    // The clip for a block drawn this way. Both forms are made once and kept, so a hundred slats of one type
    // compile one string between them.
    clip(vertical, back2) {
      let key = (vertical ? 2 : 0) + (back2 ? 1 : 0), out = made2.get(key);
      return out === void 0 && (out = (curved || compound) && supportsShape() ? shapeFn(list, vertical, back2) : polygon(list, vertical, back2), made2.set(key, out)), out;
    }
  };
}

// src/manydots.jsx
import { ssrElement as _$ssrElement2 } from "solid-js/web";
import { mergeProps as _$mergeProps2 } from "solid-js/web";
import { ssrStyle as _$ssrStyle2 } from "solid-js/web";
import { ssrAttribute as _$ssrAttribute3 } from "solid-js/web";
import { escape as _$escape3 } from "solid-js/web";
import { ssr as _$ssr3 } from "solid-js/web";
import { createRenderEffect as createRenderEffect3, splitProps as splitProps3 } from "solid-js";
import { ssrElement } from "solid-js/web";
var _tmpl$7 = ["<style data-rhp-manydots>", "</style>"], _tmpl$23 = ['<div class="rhp-manydots-points"', ' style="', '">', "</div>"], _tmpl$33 = "<style data-rhp-manydots></style>", _tmpl$43 = ['<div class="rhp-manydots-points"', ' style="', '"></div>'], OWN = ["rows", "at", "cross", "key", "size", "color", "shape", "pointClass", "pointStyle", "class", "classList", "style", "ref", "children", "innerHTML", "textContent"], THEME_KEY = /^(series-\d+|positive|negative|ink|muted|grid|surface|low|high)$/, GEOMETRY = /* @__PURE__ */ new Set(["left", "bottom", "width", "height", "margin-left", "margin-bottom", "translate"]), cssName = (name) => name.startsWith("--") ? name : name.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase()), readValue = (value, row, index) => typeof value == "function" ? value(row, index) : value, length2 = (value) => typeof value == "number" ? value + "px" : value, clip = (value, vertical) => value?.clip(vertical, !1), color = (value, theme) => typeof value == "string" && THEME_KEY.test(value) ? theme["--rhp-" + value] : value, DEFAULT_OFFSET = "-2px", dimension = (value) => {
  let text = String(value).trim(), simple = text.match(/^([+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)(%|[a-z]+)?$/i);
  if (simple) {
    let n = Number(simple[1]);
    return !Number.isFinite(n) || n < 0 || !simple[2] && n !== 0 ? null : simple[2] === "%" ? {
      percent: n / 2,
      margin: "0px"
    } : {
      margin: -n / 2 + (simple[2] ?? "px")
    };
  }
  return !/\bvar\s*\(/i.test(text) && /^(calc|min|max|clamp)\(/i.test(text) && text.endsWith(")") ? {
    calculation: text,
    margin: "0px"
  } : null;
}, center = (position, size) => size.percent != null ? position - size.percent + "%" : size.calculation ? `calc(${position}% - max(0px, ${size.calculation}) * .5)` : position + "%", coordinate = ([lo, hi]) => {
  let span = hi - lo;
  if (Number.isFinite(span)) return (value) => (value - lo) / span * 100;
  let start = lo / 2, width = hi / 2 - start;
  return (value) => (value / 2 - start) / width * 100;
};
function pointStyle(value, x, y, size, fill, shape2, sharedDimension, sharedOffset) {
  let out = {};
  if (value && typeof value == "object")
    for (let name in value) {
      let key = cssName(name);
      /^(--[-\w]+|-?[a-z][-a-z\d]*)$/i.test(key) && value[name] != null && (out[key] = String(value[name]));
    }
  size != null && (out.width = out.height = String(size)), fill != null && (delete out["background-color"], out["background-color"] = String(fill)), shape2 != null && (delete out["clip-path"], out["clip-path"] = String(shape2));
  let width = out.width == null ? sharedDimension : dimension(out.width), height = out.height == null ? sharedDimension : out.height === out.width ? width : dimension(out.height);
  if ("width" in out) {
    let value2 = out.width;
    delete out.width, out.width = value2;
  }
  if ("height" in out) {
    let value2 = out.height;
    delete out.height, out.height = value2;
  }
  return delete out.left, delete out.bottom, delete out["margin-left"], delete out["margin-bottom"], delete out.translate, width && height ? (out.left = center(x, width), out.bottom = center(y, height), width.margin !== sharedOffset && (out["margin-left"] = width.margin), height.margin !== sharedOffset && (out["margin-bottom"] = height.margin)) : (out.left = x + "%", out.bottom = y + "%", sharedOffset !== "0px" && (out["margin-left"] = out["margin-bottom"] = "0px"), out.translate = "-50% 50%"), out;
}
function pointCss(styles) {
  let text = "";
  for (let key in styles) {
    let value = styles[key];
    safeCssValue(value) && (text += key + ":" + value + (GEOMETRY.has(key) ? " !important;" : ";"));
  }
  return text;
}
function newPoint(document2, point) {
  let el = document2.createElement("div");
  el.className = point.class, el.setAttribute("data-rhp-index", point.index);
  for (let key in point.style) el.style.setProperty(key, point.style[key], GEOMETRY.has(key) ? "important" : "");
  return point.el = el, point;
}
function freshPoints(container, values) {
  let records = /* @__PURE__ */ new Map();
  if (!values.length) return records;
  let document2 = container.ownerDocument, fragment = document2.createDocumentFragment();
  for (let point of values)
    newPoint(document2, point), records.set(point.key, point), fragment.appendChild(point.el);
  return container.appendChild(fragment), records;
}
function claimedPoint(el) {
  let style2 = {}, priorities = {};
  for (let i = 0; i < el.style.length; i++) {
    let key = el.style.item(i);
    style2[key] = el.style.getPropertyValue(key), priorities[key] = el.style.getPropertyPriority(key);
  }
  return {
    el,
    class: el.className,
    index: Number(el.getAttribute("data-rhp-index")),
    style: style2,
    priorities
  };
}
function collectionCss(values) {
  let rules = {
    width: values["--rhp-manydot-size"],
    height: values["--rhp-manydot-size"],
    "margin-left": values["--rhp-manydot-offset"] ?? DEFAULT_OFFSET,
    "margin-bottom": values["--rhp-manydot-offset"] ?? DEFAULT_OFFSET,
    "background-color": values["--rhp-manydot-color"],
    "clip-path": values["--rhp-manydot-clip"]
  }, text = "@layer rhp.place, rhp.slat, rhp.core;@layer rhp.core { @scope { .rhp-manydot {";
  for (let key in rules)
    safeCssValue(rules[key]) && (text += `${key}:${rules[key]}${GEOMETRY.has(key) ? " !important" : ""};`);
  return (text + "} } }").replace(/<\/(style)/gi, "<\\/$1");
}
function updatePoint(record, next) {
  let el = record.el;
  record.class !== next.class && (el.className = next.class), record.index !== next.index && el.setAttribute("data-rhp-index", next.index);
  let before = Object.keys(record.style), after = Object.keys(next.style);
  if (before.length !== after.length || after.some((key, i) => key !== before[i] || next.style[key] !== record.style[key] || record.priorities && record.priorities[key] !== (GEOMETRY.has(key) ? "important" : ""))) {
    for (let key of before)
      key in next.style || el.style.removeProperty(key);
    for (let key of after)
      el.style.setProperty(key, next.style[key], GEOMETRY.has(key) ? "important" : "");
  }
  record.class = next.class, record.index = next.index, record.style = next.style, delete record.priorities;
}
function ManyDots(props) {
  let frame = usePointFrame();
  if (!frame) throw new Error("rhp: ManyDots must be inside a Chart with a cross scale");
  let [, attrs] = splitProps3(props, OWN), cls2 = () => {
    let text = props.class ? "rhp-plot rhp-manydots " + props.class : "rhp-plot rhp-manydots", list = props.classList;
    for (let name in list)
      list[name] && (text += " " + name);
    return text;
  }, sharedSize = () => typeof props.size == "function" ? "4px" : length2(props.size ?? "4px"), sharedOffset = () => dimension(sharedSize())?.margin ?? "0px", defaults = () => {
    let theme = frame.theme(), vertical = frame.orientation() === "vertical";
    return {
      "--rhp-manydot-size": sharedSize(),
      "--rhp-manydot-color": typeof props.color == "function" ? color("series-1", theme) : color(props.color ?? "series-1", theme),
      "--rhp-manydot-clip": typeof props.shape == "function" ? "none" : clip(props.shape, vertical) ?? "none",
      "--rhp-manydot-offset": sharedOffset() === DEFAULT_OFFSET ? void 0 : sharedOffset()
    };
  }, points2 = () => {
    if (props.rows == null || props.at === void 0 || props.cross === void 0)
      throw new Error("rhp: ManyDots requires rows, at and cross props");
    let scale = frame.scale(), cross = frame.cross();
    if (!cross) throw new Error("rhp: ManyDots requires a Chart with cross={[min, max]}");
    if (![...scale, ...cross].every(Number.isFinite) || scale[0] === scale[1] || cross[0] === cross[1])
      throw new Error("rhp: ManyDots requires finite scale and cross domains with distinct endpoints");
    let vertical = frame.orientation() === "vertical", theme = frame.theme(), alongPosition = coordinate(scale), crossPosition = coordinate(cross), rows = props.rows ?? [], at2 = props.at, crossValue = props.cross, size = props.size, fill = props.color, shape2 = props.shape, pointClass = props.pointClass, styles = props.pointStyle, defaultDimension = dimension(sharedSize()), defaultOffset = sharedOffset(), key = props.key, seen = key ? /* @__PURE__ */ new Set() : null, out = [];
    for (let i = 0; i < rows.length; i++) {
      let row = rows[i], a = readValue(at2, row, i), c = readValue(crossValue, row, i);
      if (!Number.isFinite(a) || !Number.isFinite(c)) continue;
      let along = alongPosition(a), across = crossPosition(c);
      if (!Number.isFinite(along) || !Number.isFinite(across)) continue;
      let id = key ? key(row, i) : i;
      if (seen?.has(id)) throw new Error("rhp: ManyDots key must return a unique value for each point");
      seen?.add(id);
      let extraClass = readValue(pointClass, row, i);
      out.push({
        key: id,
        index: i,
        class: extraClass ? "rhp-manydot " + extraClass : "rhp-manydot",
        style: pointStyle(readValue(styles, row, i), vertical ? across : along, vertical ? along : across, typeof size == "function" ? length2(size(row, i)) : void 0, typeof fill == "function" ? color(fill(row, i), theme) : void 0, typeof shape2 == "function" ? clip(shape2(row, i), vertical) : void 0, defaultDimension, defaultOffset)
      });
    }
    return out;
  };
  {
    let html = points2().map((point) => ssrElement("div", {
      class: point.class,
      "data-rhp-index": point.index,
      style: pointCss(point.style)
    }, void 0, !1).t).join("");
    return _$ssrElement2("div", _$mergeProps2({
      get class() {
        return cls2();
      }
    }, attrs, {
      "data-rhp-overlap": "",
      get "data-rhp-o"() {
        return short(frame.orientation());
      },
      get style() {
        return withVars(props.style, {});
      }
    }), () => [_$ssr3(_tmpl$7, collectionCss(defaults())), _$ssr3(_tmpl$23, _$ssrAttribute3("data-rhp-offset", sharedOffset() === DEFAULT_OFFSET ? _$escape3(void 0, !0) : "", !1), _$ssrStyle2(withVars(void 0, defaults())), html)], !0);
  }
  let container, stylesheet, el = _$ssrElement2("div", _$mergeProps2({
    get class() {
      return cls2();
    }
  }, attrs, {
    "data-rhp-overlap": "",
    get "data-rhp-o"() {
      return short(frame.orientation());
    },
    get style() {
      return props.style;
    }
  }), () => [_$ssr3(_tmpl$33), _$ssr3(_tmpl$43, _$ssrAttribute3("data-rhp-offset", sharedOffset() === DEFAULT_OFFSET ? _$escape3(void 0, !0) : "", !1), _$ssrStyle2(defaults()))], !0), records = /* @__PURE__ */ new Map(), first = !0;
  return createRenderEffect3(() => {
    let text = collectionCss(defaults());
    stylesheet.textContent !== text && (stylesheet.textContent = text);
  }), createRenderEffect3(() => {
    let values = points2(), initial = first ? [...container.children].filter((node) => node.classList.contains("rhp-manydot")) : [];
    if (!records.size && !container.hasChildNodes()) {
      records = freshPoints(container, values), first = !1;
      return;
    }
    let next = /* @__PURE__ */ new Map(), cursor = container.firstElementChild;
    for (let i = 0; i < values.length; i++) {
      let value = values[i], record = records.get(value.key);
      record ? updatePoint(record, value) : initial[i] ? (record = claimedPoint(initial[i]), updatePoint(record, value)) : record = newPoint(el.ownerDocument, value), next.set(value.key, record), record.el !== cursor && container.insertBefore(record.el, cursor), cursor = record.el.nextElementSibling;
    }
    for (let [key, record] of records)
      next.has(key) || record.el.remove();
    for (let i = values.length; i < initial.length; i++) initial[i].remove();
    records = next, first = !1;
  }), props.ref?.(el), el;
}

// src/poster.jsx
import { ssrElement as _$ssrElement3 } from "solid-js/web";
import { mergeProps as _$mergeProps3 } from "solid-js/web";
import { createComponent as _$createComponent2 } from "solid-js/web";
import { ssrHydrationKey as _$ssrHydrationKey3 } from "solid-js/web";
import { ssr as _$ssr4 } from "solid-js/web";
import { escape as _$escape4 } from "solid-js/web";
import { Show as Show2, splitProps as splitProps4 } from "solid-js";
var _tmpl$8 = ['<figcaption><span class="kicker">', '</span><span class="headline">', '</span><span class="dek">', "</span></figcaption>"], _tmpl$24 = ["<span", ' class="note">', "</span>"];
function Poster(p) {
  let [own, rest] = splitProps4(p, ["look", "kicker", "title", "dek", "note", "class", "children"]);
  return _$ssrElement3("figure", _$mergeProps3({
    get class() {
      return ["poster", own.look, own.class].filter(Boolean).join(" ");
    }
  }, rest), () => [_$ssr4(_tmpl$8, _$escape4(own.kicker), _$escape4(own.title), _$escape4(own.dek)), "<!--$-->", _$escape4(own.children), "<!--/-->", "<!--$-->", _$escape4(_$createComponent2(Show2, {
    get when() {
      return own.note;
    },
    get children() {
      return _$ssr4(_tmpl$24, _$ssrHydrationKey3(), _$escape4(own.note));
    }
  })), "<!--/-->"], !0);
}
export {
  Area,
  Axis,
  Bar,
  Cell,
  Chart,
  Dot,
  Label,
  Line,
  ManyDots,
  Place,
  Plot,
  Poster,
  Scale,
  THEME,
  Theme,
  Tick,
  animated,
  at,
  bins,
  curve,
  cycle,
  density,
  drawing,
  every,
  extent,
  linkedCss,
  nice,
  restyle,
  running,
  series,
  shape,
  shares,
  slat,
  sortBy,
  stackUp,
  summary,
  useOrientation
};
