import { RecursiveSpatialStructure } from "../general";

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

export type Point2 = [x: number, y: number];

export type GenericPoint2 = [...Point2, ...Array<unknown>];

export interface Circle {
  radius: number;
  center: Point2;
}
