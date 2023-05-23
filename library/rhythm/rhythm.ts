import { throwInvalidPathError } from "../utilities/throwInvalidPathError";
import { Rhythm } from "./encodings";

export function phasedRhythm(someRhythm: Rhythm, rhythmPhase: number): Rhythm {
  let phaseWrapPointIndex: number | null = null;
  return {
    resolution: someRhythm.resolution,
    points: someRhythm.points.reduce<Array<number>>(
      (result, currentRhythmPoint, pointIndex) => {
        if (rhythmPhase > currentRhythmPoint) {
          const phasedRhythmPoint =
            currentRhythmPoint - rhythmPhase + someRhythm.resolution;
          result.push(phasedRhythmPoint);
        } else {
          phaseWrapPointIndex = phaseWrapPointIndex ?? pointIndex;
          const phasedRhythmPoint = currentRhythmPoint - rhythmPhase;
          result.splice(pointIndex - phaseWrapPointIndex, 0, phasedRhythmPoint);
        }
        return result;
      },
      []
    ),
  };
}

export function orientatedRhythm(
  someRhythm: Rhythm,
  rhythmOrientation: number
): Rhythm {
  return phasedRhythm(
    someRhythm,
    someRhythm.points[rhythmOrientation] ??
      throwInvalidPathError("orientatedRhythm")
  );
}
