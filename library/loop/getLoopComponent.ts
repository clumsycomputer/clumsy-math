import { LoopPoint } from "./encodings";

export function loopCosine(someLoopPoint: LoopPoint) {
  return someLoopPoint[0] - someLoopPoint[6];
}

export function loopSine(someLoopPoint: LoopPoint) {
  return someLoopPoint[1] - someLoopPoint[7];
}

export function loopPendulum(someLoopPoint: LoopPoint) {
  return (
    Math.atan2(
      someLoopPoint[1] - someLoopPoint[7],
      someLoopPoint[0] - someLoopPoint[6]
    ) -
    Math.atan2(
      someLoopPoint[3] - someLoopPoint[7],
      someLoopPoint[2] - someLoopPoint[6]
    )
  );
}
