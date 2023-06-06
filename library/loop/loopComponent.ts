import { LoopPoint } from "./encodings";

export function loopCosine(someLoopPoint: LoopPoint) {
  return someLoopPoint[0] - someLoopPoint[6];
}

export function loopSine(someLoopPoint: LoopPoint) {
  return someLoopPoint[1] - someLoopPoint[7];
}

export function loopPendulum(someLoopPoint: LoopPoint) {
  const outputLoopAngle = Math.atan2(
    someLoopPoint[1] - someLoopPoint[7],
    someLoopPoint[0] - someLoopPoint[6]
  );
  const outputBaseAngle = Math.atan2(
    someLoopPoint[3] - someLoopPoint[7],
    someLoopPoint[2] - someLoopPoint[6]
  );
  const rawLoopPendulum = outputLoopAngle - outputBaseAngle;
  return rawLoopPendulum > Math.PI
    ? outputLoopAngle - (2 * Math.PI + outputBaseAngle)
    : rawLoopPendulum < -Math.PI
    ? 2 * Math.PI + outputLoopAngle - outputBaseAngle
    : rawLoopPendulum;
}
