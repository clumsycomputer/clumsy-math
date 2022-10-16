import { GenericPoint2, Point2 } from "./encodings";

export interface GetRotatedPointApi<SomePoint2 extends GenericPoint2>
  extends Pick<
    GetUnitRotatedPointApi<SomePoint2>,
    "subjectPoint" | "rotationAngle"
  > {
  anchorPoint: SomePoint2;
}

export function getRotatedPoint<SomePoint2 extends GenericPoint2>(
  api: GetRotatedPointApi<SomePoint2>
): Point2 {
  const { subjectPoint, anchorPoint, rotationAngle } = api;
  const unitRotatedPoint = getUnitRotatedPoint({
    rotationAngle,
    subjectPoint: [
      subjectPoint[0] - anchorPoint[0],
      subjectPoint[1] - anchorPoint[1],
    ],
  });
  return [
    unitRotatedPoint[0] + anchorPoint[0],
    unitRotatedPoint[1] + anchorPoint[1],
  ];
}

export interface GetUnitRotatedPointApi<SomePoint2 extends GenericPoint2> {
  subjectPoint: SomePoint2;
  rotationAngle: number;
}

export function getUnitRotatedPoint<SomePoint2 extends GenericPoint2>(
  api: GetUnitRotatedPointApi<SomePoint2>
): Point2 {
  const { subjectPoint, rotationAngle } = api;
  return [
    subjectPoint[0] * Math.cos(rotationAngle) -
      subjectPoint[1] * Math.sin(rotationAngle),
    subjectPoint[0] * Math.sin(rotationAngle) +
      subjectPoint[1] * Math.cos(rotationAngle),
  ];
}
