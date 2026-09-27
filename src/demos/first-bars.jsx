import { Chart, Plot, Bar } from "@bezda/rhp";

export default function FirstChart() {
  return (
    <Chart scale={[0, 30]}>
      <Plot sold={[12, 18, 7, 22]}>
        {(d) => (
          <div>
            <Bar to={d.sold} />
          </div>
        )}
      </Plot>
    </Chart>
  );
}
