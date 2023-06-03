import { throwInvalidPathError } from "../utilities/throwInvalidPathError";
import {
  RelativeRhythmPoint,
  Rhythm,
  RhythmInterval,
  RhythmOrientation,
  RhythmPhase,
  RhythmPoint,
  RhythmString,
} from "./encodings";

/**
 * great for phasing a rhythm after it's been created
 *
 * @example
 * ```typescript
 * const  rhythmB = phasedRhythm(
 *   rhythm([5, [3, 1]]),
 *   1
 * )
 * // rhythmB === {
 * //   resolution: 5,
 * //   points: [1, 3, 4]
 * // }
 * ```
 */
export function phasedRhythm(
  someRhythm: Rhythm,
  rhythmPhase: RhythmPhase
): Rhythm {
  let phaseWrapPointIndex: number | null = null;
  return {
    resolution: someRhythm.resolution,
    points: someRhythm.points.reduce<Array<RhythmPoint>>(
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

/**
 * great for reorienting an aligned rhythm after it's been created
 *
 * @example
 * ```typescript
 * const rhythmB = orientatedRhythm(
 *   rhythm(5, [3, 1]),
 *   1
 * )
 * // rhythmB === {
 * //   resolution: 5,
 * //   points: [0, 2, 3]
 * // }
 * ```
 */
export function orientatedRhythm(
  someRhythm: Rhythm,
  rhythmOrientation: RhythmOrientation
): Rhythm {
  return phasedRhythm(
    someRhythm,
    someRhythm.points[rhythmOrientation] ??
      throwInvalidPathError("orientatedRhythm")
  );
}

/**
 * great for normalizing rhythms across different resolutions
 *
 * @example
 * ```typescript
 * const relativePointsA = relativeRhythmPoints(
 *   rhythm([5, [3, 1]])
 * )
 * // relativePointsA === [0, 0.4, 0.8]
 * ```
 */
export function relativeRhythmPoints(
  someRhythm: Rhythm
): Array<RelativeRhythmPoint> {
  return someRhythm.points.map(
    (someRhythmPoint) => someRhythmPoint / someRhythm.resolution
  );
}

/**
 * great for making calculations between rhythm points
 *
 * @example
 * ```typescript
 * const intervalsA = rhythmIntervals(
 *   rhythm([5, [3, 1]])
 * )
 * // intervalsA === [2, 2, 1]
 * ```
 */
export function rhythmIntervals(someRhythm: Rhythm): Array<RhythmInterval> {
  return someRhythm.points.map((currentPoint, pointIndex) => {
    const nextPoint =
      someRhythm.points[(pointIndex + 1) % someRhythm.points.length]!;
    return (
      (nextPoint - currentPoint + someRhythm.resolution) % someRhythm.resolution
    );
  });
}

/**
 * great for logging and visualizing short rhythms
 *
 * @example
 * ```typescript
 * const stringA = rhythmString(
 *   rhythm([5, [3, 1]])
 * )
 * // stringA === "10101"
 * ```
 */
export function rhythmString(someRhythm: Rhythm): RhythmString {
  const rhythmDigitArray = new Array(someRhythm.resolution).fill(0);
  for (const currentPoint of someRhythm.points) {
    rhythmDigitArray[currentPoint] = 1;
  }
  return rhythmDigitArray.join("");
}
