import { throwInvalidPathError } from "../utilities/throwInvalidPathError";
import {
  Rhythm,
  RhythmDensity,
  RhythmOrientation,
  RhythmPhase,
  RhythmResolution,
  RhythmMap,
} from "./encodings";
import { phasedRhythm } from "./rhythmTransforms";

export function euclidRhythm(
  resolution: RhythmResolution,
  density: RhythmDensity,
  orientation: RhythmOrientation,
  phase: RhythmPhase
): Rhythm {
  const simpleRhythm = simpleEuclidRhythm(resolution, density);
  const orientationPhase =
    simpleRhythm.points[orientation] ??
    throwInvalidPathError("euclidRhythm/orientationPhase");
  return phasedRhythm(simpleRhythm, (orientationPhase + phase) % resolution);
}

export function simpleEuclidRhythm(
  resolution: number,
  density: number
): Rhythm {
  const coreRhythmMap = coreEuclidMap(resolution, density);
  const rhythmPoints: Array<number> = [];
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

export function coreEuclidRhythm(resolution: number, density: number): Rhythm {
  const coreRhythmMap = coreEuclidMap(resolution, density);
  const rhythmPoints: Array<number> = [];
  for (let slotIndex = 0; slotIndex < coreRhythmMap.length; slotIndex++) {
    if (coreRhythmMap[slotIndex]!) {
      rhythmPoints.push(slotIndex);
    }
  }
  return {
    resolution,
    points: rhythmPoints,
  };
}

export function coreEuclidMap(resolution: number, density: number): RhythmMap {
  let lhsCount = density;
  let rhsCount = resolution - density;
  let lhsRhythm: Array<boolean> = [true];
  let rhsRhythm: Array<boolean> = [false];
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
