import { Rhythm } from "./models";

export interface GetEuclideanRhythmApi extends GetBaseEuclideanRhythmApi {}

export function getEuclideanRhythm(api: GetEuclideanRhythmApi): Rhythm {
  const { lhsCount, rhsCount } = api;
  const euclideanRhythmBase = getBaseEuclideanRhythm(api);
  const rhythmLength = lhsCount + rhsCount;
  const rhythmFrequency = rhythmLength / euclideanRhythmBase.length;
  return new Array(rhythmFrequency).fill(euclideanRhythmBase).flat();
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
