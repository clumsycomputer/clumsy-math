import { LoopCosine, LoopPendulum, LoopPoint, LoopSine } from "./encodings";

/**
 * great for generating cosine waves of a loop
 */
export function loopCosine(someLoopPoint: LoopPoint): LoopCosine {
  return someLoopPoint[0] - someLoopPoint[6];
}

/**
 * great for generating sine waves of a loop
 */
export function loopSine(someLoopPoint: LoopPoint): LoopSine {
  return someLoopPoint[1] - someLoopPoint[7];
}

/**
 * great for generating pendulum waves of a loop
 */
export function loopPendulum(someLoopPoint: LoopPoint): LoopPendulum {
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
