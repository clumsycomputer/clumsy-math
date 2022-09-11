import { SimpleRhythmStructure, Rhythm } from "./encodings";

export function getSimpleRhythm(
  someSimpleRhythmStructure: SimpleRhythmStructure
) {
  return _getSimpleRhythm({
    someSimpleRhythmStructure,
  });
}

export interface _GetSimpleRhythmApi {
  someSimpleRhythmStructure: SimpleRhythmStructure;
}

export function _getSimpleRhythm(api: _GetSimpleRhythmApi): Rhythm {
  const { someSimpleRhythmStructure } = api;
  const baseSimpleRhythm = _getBaseSimpleRhythm({
    someSimpleRhythmStructure,
  });
  const rhythmFrequency =
    someSimpleRhythmStructure.rhythmResolution / baseSimpleRhythm.length;
  return new Array(rhythmFrequency).fill(baseSimpleRhythm).flat();
}

export function getBaseSimpleRhythm(
  someSimpleRhythmStructure: SimpleRhythmStructure
) {
  return _getBaseSimpleRhythm({
    someSimpleRhythmStructure,
  });
}

export interface _GetBaseSimpleRhythmApi
  extends Pick<_GetSimpleRhythmApi, "someSimpleRhythmStructure"> {}

export function _getBaseSimpleRhythm(api: _GetBaseSimpleRhythmApi): Rhythm {
  const { someSimpleRhythmStructure } = api;
  return getBaseEuclideanRhythm({
    lhsCount: someSimpleRhythmStructure.rhythmDensity,
    rhsCount:
      someSimpleRhythmStructure.rhythmResolution -
      someSimpleRhythmStructure.rhythmDensity,
    lhsRhythm: [true],
    rhsRhythm: [false],
  });
}

interface GetBaseEuclideanRhythmApi {
  lhsCount: number;
  lhsRhythm: Rhythm;
  rhsCount: number;
  rhsRhythm: Rhythm;
}

function getBaseEuclideanRhythm(api: GetBaseEuclideanRhythmApi): Rhythm {
  const { rhsCount, lhsRhythm, lhsCount, rhsRhythm } = api;
  if (rhsCount === 0) {
    return lhsRhythm;
  }
  return lhsCount > rhsCount
    ? getBaseEuclideanRhythm({
        lhsRhythm,
        rhsCount,
        lhsCount: lhsCount - rhsCount,
        rhsRhythm: [...lhsRhythm, ...rhsRhythm],
      })
    : getBaseEuclideanRhythm({
        lhsCount,
        rhsRhythm,
        rhsCount: rhsCount - lhsCount,
        lhsRhythm: [...lhsRhythm, ...rhsRhythm],
      });
}
