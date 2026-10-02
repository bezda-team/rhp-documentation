import { createMemo } from "solid-js";
import { Plot, Chart, Bar, Label, Poster, slat } from "@bezda/rhp";
import { random } from "@gallery/random.js";
import * as styles from "./styles.js";

const GENRES = ["Mystery", "Sci-fi", "History", "Poetry"];
const CLOTH = ["#1f3a5f", "#7a2e3b", "#2f5d50", "#b0772b"]; // one binding per genre
const PER_SPINE = 5;
const tall = (i) => 0.7 + ((i * 0.618034) % 1) * 0.24; // each spine's height, a fixed pseudo-random share of the shelf
const binding = (c, i) => { const t = [0, 10, -8, 5, -12, 8, -4][i % 7]; return `color-mix(in oklab, ${c}, ${t > 0 ? "white" : "black"} ${Math.abs(t)}%)`; };

// Five books: a spine standing on the shelf (horizontal) or lying on the pile (vertical). The last one is thinner.
// Hover a book and it slides half out. The Bar holds the book's place; the book is an element inside it, so it
// can move and cast its shadow on its own time.
export const SpineSlat = slat({ css: styles.spine }, (u) => <Bar from={u.from} to={u.to} thick={tall(u.index)} color={binding(u.cloth, u.index)} class="spine"><i class="book" /></Bar>);

export const ShelfSlat = slat({
  thickness: { horizontal: 66 },
  room: { horizontal: { start: 96, end: 52 }, vertical: { start: 30, end: 38 } },
  css: styles.shelf,
}, (d) => (
  <div class="shelf">
    <Label edge="start" class="genre">{d.genre}</Label>
    <Plot overlap slats={Math.ceil(d.books / PER_SPINE)} cloth={d.cloth}
      from={(u) => u.index * PER_SPINE} to={(u) => Math.min(d.books, (u.index + 1) * PER_SPINE)}>{SpineSlat}</Plot>
    <Label at={d.books} class="count">{Math.round(d.books)}<small>books</small></Label>
  </div>
));

export default function Units(p) {
  const books = createMemo(() => { const { rand } = random(p.seed()); return GENRES.map(() => Math.round(rand(6, 48))); });
  return (
    <Poster look="books" kicker="Book club · the year's reading" title="A year in books" dek="Each spine is five books; a thin one is what's left over.">
      <Chart orientation={p.o()} scale={[0, 50]} ticks={false} height={300} animate={p.js()} theme={styles.theme}>
        <Plot genre={GENRES} cloth={CLOTH} books={books()}>{ShelfSlat}</Plot>
      </Chart>
    </Poster>
  );
}
