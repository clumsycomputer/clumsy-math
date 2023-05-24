import { throwInvalidPathError } from "../utilities/throwInvalidPathError";
import { Rhythm, RhythmSequence } from "./encodings";
import { phasedRhythm } from "./rhythmTransforms";

export function euclidRhythm(
  resolution: number,
  density: number,
  orientation: number,
  phase: number
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
  const coreRhythmSequence = coreEuclidSequence(resolution, density);
  const rhythmPoints: Array<number> = [];
  for (let slotIndex = 0; slotIndex < resolution; slotIndex++) {
    if (coreRhythmSequence[slotIndex % coreRhythmSequence.length]!) {
      rhythmPoints.push(slotIndex);
    }
  }
  return {
    resolution,
    points: rhythmPoints,
  };
}

export function coreEuclidRhythm(resolution: number, density: number): Rhythm {
  const coreRhythmSequence = coreEuclidSequence(resolution, density);
  const rhythmPoints: Array<number> = [];
  for (let slotIndex = 0; slotIndex < coreRhythmSequence.length; slotIndex++) {
    if (coreRhythmSequence[slotIndex]!) {
      rhythmPoints.push(slotIndex);
    }
  }
  return {
    resolution,
    points: rhythmPoints,
  };
}

export function coreEuclidSequence(
  resolution: number,
  density: number
): RhythmSequence {
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
