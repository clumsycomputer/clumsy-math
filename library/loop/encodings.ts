import { RecursiveSpatialStructure } from "../general";
import { Circle, Point2 } from "../geometry";

export type LoopStructure = RecursiveSpatialStructure<
  { loopBase: Circle },
  { loopRotation: number },
  {
    relativeSubRadius: number;
    relativeSubDepth: number;
    subPhase: number;
    subOrientation: number;
  }
>;

export type LoopPoint = [
  x: Point2["0"],
  y: Point2["1"],
  origin: Point2,
  adjustedTerminalSubPoint: Point2,
  adjustedBaseCirclePoint: Point2
];
