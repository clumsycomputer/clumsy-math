import { throwInvalidPathError } from "../utilities/throwInvalidPathError";
import {
  BasicEuclidRhythm,
  CoreEuclidRhythm,
  EuclidRhythm,
  EuclidRhythmMap,
  RhythmDensity,
  RhythmOrientation,
  RhythmPhase,
  RhythmPoint,
  RhythmResolution,
  RhythmSlot,
} from "./encodings";
import { phasedRhythm } from "./rhythmTransforms";

/**
 * great for working with unlayered euclid rhythms
 *
 * @example
 * ```typescript
 * const rhythmA = euclidRhythm(5, 3, 1, 0)
 * // rhythmA === {
 * //   resolution: 5,
 * //   points: [0, 2, 4]
 * // }
 * ```
 */
export function euclidRhythm(
  resolution: RhythmResolution,
  density: RhythmDensity,
  orientation: RhythmOrientation,
  phase: RhythmPhase
): EuclidRhythm {
  const basicRhythm = basicEuclidRhythm(resolution, density);
  const orientationPhase =
    basicRhythm.points[orientation] ??
    throwInvalidPathError("euclidRhythm/orientationPhase");
  return phasedRhythm(basicRhythm, (orientationPhase + phase) % resolution);
}

/**
 * great for working with euclid rhythms where orientation and phase are not needed
 *
 * @example
 * ```typescript
 * const rhythmA = basicEuclidRhythm(5, 3)
 * // rhythmA === {
 * //   resolution: 5,
 * //   points: [0, 1, 3]
 * // }
 * ```
 */
export function basicEuclidRhythm(
  resolution: RhythmResolution,
  density: RhythmDensity
): BasicEuclidRhythm {
  const coreRhythmMap = coreEuclidMap(resolution, density);
  const rhythmPoints: Array<RhythmPoint> = [];
  for (let slotIndex = 0; slotIndex < resolution; slotIndex++) {
    if (coreRhythmMap[slotIndex % coreRhythmMap.length]!) {
      rhythmPoints.push(slotIndex);
    }
  }
  return {
    resolution,
    points: rhythmPoints,
  };
}

/**
 * great for working with simplified euclid rhythms
 *
 * @example
 * ```typescript
 * const rhythmA = coreEuclidRhythm(8, 4)
 * // rhythmA === {
 * //   resolution: 2,
 * //   points: [0]
 * // }
 * ```
 */
export function coreEuclidRhythm(
  resolution: RhythmResolution,
  density: RhythmDensity
): CoreEuclidRhythm {
  const coreRhythmMap = coreEuclidMap(resolution, density);
  const rhythmPoints: Array<RhythmPoint> = [];
  for (let slotIndex = 0; slotIndex < coreRhythmMap.length; slotIndex++) {
    if (coreRhythmMap[slotIndex]!) {
      rhythmPoints.push(slotIndex);
    }
  }
  return {
    resolution: coreRhythmMap.length,
    points: rhythmPoints,
  };
}

/**
 * most important rhythm function, but rarely invoked by itself
 *
 * @example
 * ```typescript
 * const rhythmMapA = coreEuclidMap(5, 3)
 * // rhythmMapA === [true, true, false, true, false]
 * ```
 */
export function coreEuclidMap(
  resolution: RhythmResolution,
  density: RhythmDensity
): EuclidRhythmMap {
  let lhsCount = density;
  let rhsCount = resolution - density;
  let lhsRhythm: Array<RhythmSlot> = [true];
  let rhsRhythm: Array<RhythmSlot> = [false];
  while (rhsCount > 0) {
    if (lhsCount > rhsCount) {
      lhsCount = lhsCount - rhsCount;
      rhsRhythm = [...lhsRhythm, ...rhsRhythm];
    } else {
      rhsCount = rhsCount - lhsCount;
      lhsRhythm = [...lhsRhythm, ...rhsRhythm];
    }
  }
  return lhsRhythm;
}
