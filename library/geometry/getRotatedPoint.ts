import { GenericPoint2, Point2 } from "./encodings";

export interface GetRotatedPointApi<SomePoint2 extends GenericPoint2>
  extends Pick<
    GetUnitRotatedPointApi<SomePoint2>,
    "subjectPoint" | "rotationAngle"
  > {
  anchorPoint: SomePoint2;
}

export function getRotatedPoint<SubjectPoint extends GenericPoint2>(
  api: GetRotatedPointApi<SubjectPoint>
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

export interface GetUnitRotatedPointApi<SubjectPoint extends GenericPoint2> {
  subjectPoint: SubjectPoint;
  rotationAngle: number;
}

export function getUnitRotatedPoint<SubjectPoint extends GenericPoint2>(
  api: GetUnitRotatedPointApi<SubjectPoint>
): Point2 {
  const { subjectPoint, rotationAngle } = api;
  return [
    subjectPoint[0] * Math.cos(rotationAngle) -
      subjectPoint[1] * Math.sin(rotationAngle),
    subjectPoint[0] * Math.sin(rotationAngle) +
      subjectPoint[1] * Math.cos(rotationAngle),
  ];
}
