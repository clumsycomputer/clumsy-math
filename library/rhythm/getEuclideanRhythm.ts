import { Rhythm } from "./models";

export interface GetEuclideanRhythmApi {
  rhythmResolution: number;
  rhythmDensity: number;
}

export function getEuclideanRhythm(api: GetEuclideanRhythmApi): Rhythm {
  const { rhythmDensity, rhythmResolution } = api;
  return _getEuclideanRhythm({
    lhsCount: rhythmDensity,
    rhsCount: rhythmResolution - rhythmDensity,
    lhsRhythm: [true],
    rhsRhythm: [false],
  });
}

interface _GetEuclideanRhythmApi extends _GetBaseEuclideanRhythmApi {}

function _getEuclideanRhythm(api: _GetEuclideanRhythmApi): Rhythm {
  const { lhsCount, rhsCount, lhsRhythm, rhsRhythm } = api;
  const euclideanRhythmBase = _getBaseEuclideanRhythm({
    lhsCount,
    rhsCount,
    lhsRhythm,
    rhsRhythm,
  });
  const rhythmLength = lhsCount + rhsCount;
  const rhythmFrequency = rhythmLength / euclideanRhythmBase.length;
  return new Array(rhythmFrequency).fill(euclideanRhythmBase).flat();
}

export interface GetBaseEuclideanRhythmApi {
  rhythmResolution: number;
  rhythmDensity: number;
}

export function getBaseEuclideanRhythm(api: GetBaseEuclideanRhythmApi): Rhythm {
  const { rhythmDensity, rhythmResolution } = api;
  return _getBaseEuclideanRhythm({
    lhsCount: rhythmDensity,
    rhsCount: rhythmResolution - rhythmDensity,
    lhsRhythm: [true],
    rhsRhythm: [false],
  });
}

interface _GetBaseEuclideanRhythmApi {
  lhsCount: number;
  lhsRhythm: Rhythm;
  rhsCount: number;
  rhsRhythm: Rhythm;
}

function _getBaseEuclideanRhythm(api: _GetBaseEuclideanRhythmApi): Rhythm {
  const { rhsCount, lhsRhythm, lhsCount, rhsRhythm } = api;
  if (rhsCount === 0) {
    return lhsRhythm;
  }
  return lhsCount > rhsCount
    ? _getBaseEuclideanRhythm({
        lhsRhythm,
        rhsCount,
        lhsCount: lhsCount - rhsCount,
        rhsRhythm: [...lhsRhythm, ...rhsRhythm],
      })
    : _getBaseEuclideanRhythm({
        lhsCount,
        rhsRhythm,
        rhsCount: rhsCount - lhsCount,
        lhsRhythm: [...lhsRhythm, ...rhsRhythm],
      });
}
