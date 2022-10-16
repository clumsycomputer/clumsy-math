import { GenericPoint2 } from "./encodings";

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
