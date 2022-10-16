export type Point2 = [x: number, y: number];

export type GenericPoint2 = [...Point2, ...Array<unknown>];

export interface Circle {
  radius: number;
  center: Point2;
}
