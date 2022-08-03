import { EuclideanRhythmStructure, Rhythm } from "./models";

export function getEuclideanRhythm(
  someEuclideanRhythmStructure: EuclideanRhythmStructure
) {
  return _getEuclideanRhythm({
    someEuclideanRhythmStructure,
  });
}

export interface _GetEuclideanRhythmApi {
  someEuclideanRhythmStructure: EuclideanRhythmStructure;
}

export function _getEuclideanRhythm(api: _GetEuclideanRhythmApi): Rhythm {
  const { someEuclideanRhythmStructure } = api;
  const euclideanRhythmBase = getEuclideanRhythmBase({
    lhsCount: someEuclideanRhythmStructure.rhythmDensity,
    rhsCount:
      someEuclideanRhythmStructure.rhythmResolution -
      someEuclideanRhythmStructure.rhythmResolution,
    lhsRhythm: [true],
    rhsRhythm: [false],
  });
  const rhythmFrequency =
    someEuclideanRhythmStructure.rhythmResolution / euclideanRhythmBase.length;
  return new Array(rhythmFrequency).fill(euclideanRhythmBase).flat();
}

export function getBaseEuclideanRhythm(
  someEuclideanRhythmStructure: EuclideanRhythmStructure
) {
  return _getBaseEuclideanRhythm({
    someEuclideanRhythmStructure,
  });
}

export interface _GetBaseEuclideanRhythmApi {
  someEuclideanRhythmStructure: EuclideanRhythmStructure;
}

export function _getBaseEuclideanRhythm(
  api: _GetBaseEuclideanRhythmApi
): Rhythm {
  const { someEuclideanRhythmStructure } = api;
  return getEuclideanRhythmBase({
    lhsCount: someEuclideanRhythmStructure.rhythmDensity,
    rhsCount:
      someEuclideanRhythmStructure.rhythmResolution -
      someEuclideanRhythmStructure.rhythmDensity,
    lhsRhythm: [true],
    rhsRhythm: [false],
  });
}

interface GetEuclideanRhythmBaseApi {
  lhsCount: number;
  lhsRhythm: Rhythm;
  rhsCount: number;
  rhsRhythm: Rhythm;
}

function getEuclideanRhythmBase(api: GetEuclideanRhythmBaseApi): Rhythm {
  const { rhsCount, lhsRhythm, lhsCount, rhsRhythm } = api;
  if (rhsCount === 0) {
    return lhsRhythm;
  }
  return lhsCount > rhsCount
    ? getEuclideanRhythmBase({
        lhsRhythm,
        rhsCount,
        lhsCount: lhsCount - rhsCount,
        rhsRhythm: [...lhsRhythm, ...rhsRhythm],
      })
    : getEuclideanRhythmBase({
        lhsCount,
        rhsRhythm,
        rhsCount: rhsCount - lhsCount,
        lhsRhythm: [...lhsRhythm, ...rhsRhythm],
      });
}
