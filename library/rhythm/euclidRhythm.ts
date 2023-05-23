import { Rhythm, RhythmSequence } from "./encodings";
import { orientatedRhythm, phasedRhythm } from "./rhythm";

export function euclidRhythm(
  resolution: number,
  density: number,
  orientation: number,
  phase: number
): Rhythm {
  return phasedRhythm(
    orientatedRhythm(simpleEuclidRhythm(resolution, density), orientation),
    phase
  );
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
