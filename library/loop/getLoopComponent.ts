import { LoopPoint } from "./encodings";
import { getNormalizedAngleBetweenPoints } from "./geometry";

export interface GetLoopCosineApi extends GetLoopComponentApiBase {}

export function getLoopCosine(api: GetLoopCosineApi) {
  const { someLoopPoint } = api;
  return someLoopPoint[0] - someLoopPoint[2][0];
}

export interface GetLoopSineApi extends GetLoopComponentApiBase {}

export function getLoopSine(api: GetLoopSineApi) {
  const { someLoopPoint } = api;
  return someLoopPoint[1] - someLoopPoint[2][1];
}

export interface GetLoopPendulumApi extends GetLoopComponentApiBase {}

export function getLoopPendulum(api: GetLoopPendulumApi) {
  const { someLoopPoint } = api;
  const originPoint = someLoopPoint[2];
  const baseCirclePoint = someLoopPoint[4];
  const outputBaseAngle = getNormalizedAngleBetweenPoints({
    originPoint: originPoint,
    subjectPoint: baseCirclePoint,
  });
  const outputLoopAngle = getNormalizedAngleBetweenPoints({
    originPoint: originPoint,
    subjectPoint: someLoopPoint,
  });
  const pointPendulum = outputLoopAngle - outputBaseAngle;
  return pointPendulum > Math.PI
    ? outputLoopAngle - (2 * Math.PI + outputBaseAngle)
    : pointPendulum < -Math.PI
    ? 2 * Math.PI + outputLoopAngle - outputBaseAngle
    : pointPendulum;
}

interface GetLoopComponentApiBase {
  someLoopPoint: LoopPoint;
}
