import { Circle, GenericPoint2, Point2 } from "./encodings";

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

export interface GetNormalizedAngleApi {
  someAngle: number;
}

export function getNormalizedAngle(api: GetNormalizedAngleApi) {
  const { someAngle } = api;
  const twoPi = 2 * Math.PI;
  return ((someAngle % twoPi) + twoPi) % twoPi;
}

export interface GetAngleBetweenPointsApi<
  OriginPoint extends GenericPoint2,
  SubjectPoint extends GenericPoint2
> {
  originPoint: OriginPoint;
  subjectPoint: SubjectPoint;
}

export function getAngleBetweenPoints<
  OriginPoint extends GenericPoint2,
  SubjectPoint extends GenericPoint2
>(api: GetAngleBetweenPointsApi<OriginPoint, SubjectPoint>): number {
  const { subjectPoint, originPoint } = api;
  return Math.atan2(
    subjectPoint[1] - originPoint[1],
    subjectPoint[0] - originPoint[0]
  );
}

export interface GetNormalizedAngleBetweenPointsApi<
  OriginPoint extends GenericPoint2,
  SubjectPoint extends GenericPoint2
> extends Pick<
    GetAngleBetweenPointsApi<OriginPoint, SubjectPoint>,
    "originPoint" | "subjectPoint"
  > {}

export function getNormalizedAngleBetweenPoints<
  OriginPoint extends GenericPoint2,
  SubjectPoint extends GenericPoint2
>(api: GetNormalizedAngleBetweenPointsApi<OriginPoint, SubjectPoint>): number {
  const { subjectPoint, originPoint } = api;
  return getNormalizedAngle({
    someAngle: getAngleBetweenPoints({
      subjectPoint,
      originPoint,
    }),
  });
}
