import { throwInvalidPathError } from "../utilities/throwInvalidPathError";
import {
  AlignedRhythmStructure,
  PhasedRhythmStructure,
  Rhythm,
  RhythmSequence,
} from "./encodings";
import { phasedRhythm } from "./rhythmTransforms";

export function rhythm<
  SomeRhythmStructure extends AlignedRhythmStructure | PhasedRhythmStructure
>(someRhythmStructure: SomeRhythmStructure): Rhythm {
  const [rhythmResolution, rootLayer, ...subLayers] = someRhythmStructure;
  const resultRhythm = euclidRhythm(
    rhythmResolution,
    rootLayer[0],
    rootLayer[1],
    rootLayer[2] ?? 0
  );
  for (const currentSubLayer of subLayers) {
    const layerRhythm = euclidRhythm(
      resultRhythm.points.length,
      currentSubLayer[0],
      currentSubLayer[1],
      currentSubLayer[2] ?? 0
    );
    resultRhythm.points = layerRhythm.points.map(
      (someLayerPoint) =>
        resultRhythm.points[someLayerPoint] ??
        throwInvalidPathError("rhythm/layerRhythm")
    );
  }
  return resultRhythm;
}

export function rhythmId<
  SomeRhythmStructure extends AlignedRhythmStructure | PhasedRhythmStructure
>(someRhythmStructure: SomeRhythmStructure): string {
  const rhythmType =
    someRhythmStructure[1].length === 2
      ? "aligned"
      : someRhythmStructure[1].length === 3
      ? "phased"
      : throwInvalidPathError("rhythmId");
  const [rhythmResolution, ...rhythmLayers]: [number, ...Array<Array<number>>] =
    someRhythmStructure;
  return rhythmLayers.reduce(
    (resultId, someRhythmLayer) => `${resultId}__${someRhythmLayer.join("_")}`,
    `${rhythmType}__${rhythmResolution}`
  );
}

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
