// Display the actual standalone recipe, cropped to its desktop poster and scaled to the showcase column.
import { createSignal, onCleanup, Show } from "solid-js";

const WIDTH = 1280;
const POSTER_SCALE = 1.15;

export default function RecipePoster(props) {
  const [ready, setReady] = createSignal(false);
  const [failed, setFailed] = createSignal(false);
  const [size, setSize] = createSignal({ height: 400, frameHeight: 1600, scale: 1, left: 0, top: 0 });
  let container, frame, observer, queued = 0, disposed = false;

  async function loaded() {
    try {
      const doc = frame.contentDocument;
      const style = doc.createElement("style");
      style.textContent = "html { overflow: hidden; background: transparent; } body { background: transparent; } .recipe-navigation { display: none; }";
      doc.head.append(style);
      await doc.fonts.ready;
      await new Promise(requestAnimationFrame);
      await new Promise(requestAnimationFrame);
      if (disposed) return;
      const poster = doc.querySelector(".poster");
      if (!poster) throw new Error(`No poster rendered in ${props.entry.url}`);
      // A narrower layout makes type and details larger when the poster fits the column.
      poster.style.width = `${poster.getBoundingClientRect().width / POSTER_SCALE}px`;
      const measure = () => {
        queued = 0;
        if (disposed) return;
        frame.contentWindow.scrollTo(0, 0);
        const bounds = poster.getBoundingClientRect();
        const scale = container.clientWidth / bounds.width;
        setSize({
          height: bounds.height * scale,
          frameHeight: Math.max(1600, Math.ceil(bounds.bottom + 48)),
          scale,
          left: -bounds.left * scale,
          top: -bounds.top * scale,
        });
      };
      observer = new ResizeObserver(() => {
        if (!queued) queued = requestAnimationFrame(measure);
      });
      observer.observe(container);
      observer.observe(poster);
      measure();
      setReady(true);
    } catch (error) {
      if (disposed) return;
      console.error("Recipe preview failed to load", error);
      setFailed(true);
    }
  }

  onCleanup(() => {
    disposed = true;
    observer?.disconnect();
    cancelAnimationFrame(queued);
  });

  return (
    <div class="showcase-recipe" classList={{ "showcase-loading": !ready() && !failed() }} ref={container}
      aria-busy={!ready() && !failed()} style={{ height: `${size().height}px` }}>
      <Show when={!failed()} fallback={<p>Open the recipe to explore this chart.</p>}>
        <iframe ref={frame} src={props.entry.url} title={`${props.entry.title}, interactive recipe`} onLoad={loaded}
          width={WIDTH} height={size().frameHeight}
          style={{ visibility: ready() ? "visible" : "hidden", transform: `scale(${size().scale})`, left: `${size().left}px`, top: `${size().top}px` }} />
      </Show>
    </div>
  );
}
