import { createSignal } from "solid-js";
import { Chart, Plot, Bar, Label, sortBy } from "@bezda/rhp";

export default function Votes() {
  const [votes, setVotes] = createSignal([34, 21, 45, 12, 28]);
  const [js, setJs] = createSignal(false);
  const [order, setOrder] = createSignal("desc");
  const vote = () =>
    setVotes(
      votes().map((v) =>
        Math.max(0, v + Math.round(Math.random() * 20 - 10)),
      ),
    );
  return (
    <>
      <div class="demo-controls">
        <button onClick={vote}>New votes</button>
        <button
          onClick={() => setOrder(order() === "desc" ? "asc" : "desc")}
        >
          Sort {order() === "desc" ? "up" : "down"}
        </button>
        <label>
          <input
            type="checkbox"
            checked={js()}
            onChange={(e) => setJs(e.target.checked)}
          />{" "}
          JS version
        </label>
      </div>
      <Chart scale={[0, 60]} animate={js()}>
        <Plot
          name={["Maya", "Leo", "Ivy", "Omar", "Zoe"]}
          votes={votes()}
          order={sortBy("votes", order())}
        >
          {(d) => (
            <div>
              <Label edge="start">{d.name}</Label>
              <Bar to={d.votes} />
              <Label at={d.votes}>{Math.round(d.votes)}</Label>
            </div>
          )}
        </Plot>
      </Chart>
    </>
  );
}
