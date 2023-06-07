import { throwInvalidPathError } from "../utilities/throwInvalidPathError";
import {
  BasicEuclidSpacer,
  CoreEuclidSpacer,
  EuclidSpacer,
  EuclidSpacerMap,
  SpacerDensity,
  SpacerOrientation,
  SpacerPhase,
  SpacerPoint,
  SpacerResolution,
  SpacerSlot,
} from "./encodings";
import { phasedSpacer } from "./spacerTransforms";

/**
 * great for working with unlayered euclid spacers
 *
 * @example
 * ```typescript
 * const spacerA = euclidSpacer(5, 3, 1, 0)
 * // spacerA === [5, [0, 2, 4]]
 * ```
 */
export function euclidSpacer(
  resolution: SpacerResolution,
  density: SpacerDensity,
  orientation: SpacerOrientation,
  phase: SpacerPhase
): EuclidSpacer {
  const basicSpacer = basicEuclidSpacer(resolution, density);
  const orientationPhase =
    basicSpacer[1][orientation] ??
    throwInvalidPathError("euclidSpacer/orientationPhase");
  return phasedSpacer(basicSpacer, (orientationPhase + phase) % resolution);
}

/**
 * great for working with euclid spacers where orientation and phase are not needed
 *
 * @example
 * ```typescript
 * const basicSpacerA = basicEuclidSpacer(5, 3)
 * // basicSpacerA === [5, [0, 1, 3]]
 * ```
 */
export function basicEuclidSpacer(
  resolution: SpacerResolution,
  density: SpacerDensity
): BasicEuclidSpacer {
  const coreSpacerMap = coreEuclidMap(resolution, density);
  const spacerPoints: Array<SpacerPoint> = [];
  for (let slotIndex = 0; slotIndex < resolution; slotIndex++) {
    if (coreSpacerMap[slotIndex % coreSpacerMap.length]!) {
      spacerPoints.push(slotIndex);
    }
  }
  return [resolution, spacerPoints];
}

/**
 * great for working with simplified euclid spacers
 *
 * @example
 * ```typescript
 * const coreSpacerA = coreEuclidSpacer(8, 4)
 * // coreSpacerA === [2, [0]]
 * ```
 */
export function coreEuclidSpacer(
  resolution: SpacerResolution,
  density: SpacerDensity
): CoreEuclidSpacer {
  const coreSpacerMap = coreEuclidMap(resolution, density);
  const spacerPoints: Array<SpacerPoint> = [];
  for (let slotIndex = 0; slotIndex < coreSpacerMap.length; slotIndex++) {
    if (coreSpacerMap[slotIndex]!) {
      spacerPoints.push(slotIndex);
    }
  }
  return [coreSpacerMap.length, spacerPoints];
}

/**
 * most important spacer function, but rarely invoked by itself
 *
 * @example
 * ```typescript
 * const coreSpacerMapA = coreEuclidMap(5, 3)
 * // coreSpacerMapA === [true, true, false, true, false]
 * ```
 */
export function coreEuclidMap(
  resolution: SpacerResolution,
  density: SpacerDensity
): EuclidSpacerMap {
  let lhsCount = density;
  let rhsCount = resolution - density;
  let lhsSpacer: Array<SpacerSlot> = [true];
  let rhsSpacer: Array<SpacerSlot> = [false];
  while (rhsCount > 0) {
    if (lhsCount > rhsCount) {
      lhsCount = lhsCount - rhsCount;
      rhsSpacer = [...lhsSpacer, ...rhsSpacer];
    } else {
      rhsCount = rhsCount - lhsCount;
      lhsSpacer = [...lhsSpacer, ...rhsSpacer];
    }
  }
  return lhsSpacer;
}
