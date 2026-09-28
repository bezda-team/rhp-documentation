import { Chart, Plot, Dot, Label } from "@bezda/rhp";

// Six cafés: what a flat white costs, and how people rate the place. The
// price is on the scale and the rating on a second axis (cross). The labels
// start 9px past their value, clear of the dots.
export default function Cafes() {
  return (
    <Chart
      scale={[2, 5.5]}
      ticks={[2, 3, 4, 5]}
      format={(p) => "€" + p}
      cross={[3, 5]}
      crossTicks={[3, 4, 5]}
      crossFormat={(r) => r + "★"}
      height={220}
    >
      <Plot
        overlap
        cafe={[
          "Corner",
          "Roastery",
          "Kiosk",
          "Book & Bean",
          "Mill St",
          "Harbour",
        ]}
        price={[3.2, 4.5, 2.4, 3.8, 2.9, 4.1]}
        rating={[4.1, 4.8, 3.2, 4.4, 3.8, 3.5]}
      >
        {(d) => (
          <div>
            <Dot at={d.price} cross={d.rating} size="10px" />
            <Label
              at={d.price}
              cross={d.rating}
              style={{ "--rhp-label-gap": "9px" }}
            >
              {d.cafe}
            </Label>
          </div>
        )}
      </Plot>
    </Chart>
  );
}
