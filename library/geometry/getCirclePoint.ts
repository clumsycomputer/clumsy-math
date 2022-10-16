import { Circle, Point2 } from "./encodings";

export interface GetCirclePointApi {
  someCircle: Circle;
  pointAngle: number;
}

export function getCirclePoint(api: GetCirclePointApi): Point2 {
  const { someCircle, pointAngle } = api;
  return [
    someCircle.radius * Math.cos(pointAngle) + someCircle.center[0],
    someCircle.radius * Math.sin(pointAngle) + someCircle.center[1],
  ];
}
