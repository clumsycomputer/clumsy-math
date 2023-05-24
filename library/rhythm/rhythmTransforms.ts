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

export function relativeRhythmPoints(someRhythm: Rhythm): Array<number> {
  return someRhythm.points.map(
    (someRhythmPoint) => someRhythmPoint / someRhythm.resolution
  );
}

export function rhythmIntervals(someRhythm: Rhythm): Array<number> {
  return someRhythm.points.map((currentPoint, pointIndex) => {
    const nextPoint =
      someRhythm.points[(pointIndex + 1) % someRhythm.points.length]!;
    return (
      (nextPoint - currentPoint + someRhythm.resolution) % someRhythm.resolution
    );
  });
}

export function rhythmString(someRhythm: Rhythm): string {
  const rhythmDigitArray = new Array(someRhythm.resolution).fill(0);
  for (const currentPoint of someRhythm.points) {
    rhythmDigitArray[currentPoint] = 1;
  }
  return rhythmDigitArray.join("");
}
