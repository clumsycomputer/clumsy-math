import { throwInvalidPathError } from "../utilities/throwInvalidPathError";
import {
  EuclidRhythm,
  EuclidRhythmMap,
  RhythmDensity,
  RhythmOrientation,
  RhythmPhase,
  RhythmPoint,
  RhythmResolution,
  RhythmSlot,
  SimpleEuclidRhythm,
} from "./encodings";
import { phasedRhythm } from "./rhythmTransforms";

/**
 * computes {@link EuclidRhythm} from {@link RhythmResolution}, {@link RhythmDensity}, {@link RhythmOrientation}, and {@link RhythmPhase}
 *
 * @example
 * ```typescript
 * const rhythmA = euclidRhythm(5, 3, 0, 0)
 * // rhythmA === {
 * //   resolution: 5,
 * //   points: [0, 1, 3]
 * // }
 * ```
 *
 * @relations concept
 * {@link _EUCLID_RHYTHM_CONCEPT}
 *
 * @attributes
 * domain: rhythm | category: function | name: euclidRhythm
 */
export function euclidRhythm(
  resolution: RhythmResolution,
  density: RhythmDensity,
  orientation: RhythmOrientation,
  phase: RhythmPhase
): EuclidRhythm {
  const simpleRhythm = simpleEuclidRhythm(resolution, density);
  const orientationPhase =
    simpleRhythm.points[orientation] ??
    throwInvalidPathError("euclidRhythm/orientationPhase");
  return phasedRhythm(simpleRhythm, (orientationPhase + phase) % resolution);
}

/**
 * computes {@link SimpleEuclidRhythm} from {@link RhythmResolution} and {@link RhythmDensity}
 *
 * @relations concept
 * {@link _SIMPLE_EUCLID_RHYTHM_CONCEPT}
 *
 * @attributes
 * domain: rhythm | category: function | name: simpleEuclidRhythm
 */
export function simpleEuclidRhythm(
  resolution: RhythmResolution,
  density: RhythmDensity
): SimpleEuclidRhythm {
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

export function coreEuclidRhythm(
  resolution: RhythmResolution,
  density: RhythmDensity
): EuclidRhythm {
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
