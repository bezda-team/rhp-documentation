// The rooflines, written once each with rhp's shape(). The first coordinate of every point runs along the value axis
// (0 is the tower's base, 1 its roof, and "-30px" is 30px in from the roof); the second runs across the tower.
// rhp turns each of them for a vertical chart and for a bar that runs backward, so none of this is written twice.
import { shape } from "@bezda/rhp";

// Every roofline starts and ends at the two corners of the base, and what is given draws the top between them.
const roof = (...top) => shape(["M", 0, 0], ...top, ["L", 0, 1], ["Z"]);

export const ROOFS = {
  // Art deco: shoulders that step in, joined on the diagonal, to a narrow crown
  deco: roof(["L", "-46px", 0], ["L", "-32px", 0.1], ["L", "-32px", 0.2], ["L", "-14px", 0.33],
    ["L", 1, 0.42], ["L", 1, 0.58], ["L", "-14px", 0.67], ["L", "-32px", 0.8], ["L", "-32px", 0.9], ["L", "-46px", 1]),
  // A tiered spire, each tier steeper than the last
  tiered: roof(["L", "-58px", 0], ["L", "-43px", 0.12], ["L", "-32px", 0.22], ["L", "-22px", 0.32],
    ["L", "-11px", 0.42], ["L", 1, 0.5], ["L", "-11px", 0.58], ["L", "-22px", 0.68], ["L", "-32px", 0.78], ["L", "-43px", 0.88], ["L", "-58px", 1]),
  // A gothic pinnacle on a squat base
  gothic: roof(["L", "-44px", 0], ["L", "-27px", 0.2], ["L", "-27px", 0.34], ["L", "-8px", 0.46],
    ["L", 1, 0.5], ["L", "-8px", 0.54], ["L", "-27px", 0.66], ["L", "-27px", 0.8], ["L", "-44px", 1]),
  // A pitched roof
  gable: roof(["L", "-26px", 0], ["L", 1, 0.5], ["L", "-26px", 1]),
  // A dome, drawn as one curve across the whole width
  dome: roof(["L", "-34px", 0], ["C", 1, 0.14, 1, 0.86, "-34px", 1]),
  // Corners cut off the roof slab
  chamfer: roof(["L", "-20px", 0], ["L", 1, 0.14], ["L", 1, 0.86], ["L", "-20px", 1]),
  // Walls that lean in the whole way up
  lean: shape(["M", 0, 0], ["L", 1, 0.08], ["L", 1, 0.92], ["L", 0, 1], ["Z"]),
  // A crown that pulls in on a curve
  flare: roof(["L", "-42px", 0], ["Q", "-10px", 0.08, 1, 0.3], ["L", 1, 0.7], ["Q", "-10px", 0.92, "-42px", 1]),
};
