import { Chart, Plot, Bar, Label } from "@bezda/rhp";

export default function FirstChart() {
  return (
    <Chart scale={[0, 30]}>
      <Plot
        fruit={["Apples", "Bananas", "Cherries", "Kiwis"]}
        sold={[12, 18, 7, 22]}
      >
        {(d) => (
          <div>
            <Label edge="start">{d.fruit}</Label>
            <Bar to={d.sold} />
            <Label at={d.sold}>{d.sold}</Label>
          </div>
        )}
      </Plot>
    </Chart>
  );
}
