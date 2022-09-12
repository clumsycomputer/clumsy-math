import { RelativeRhythmPoint, RhythmMap } from "./encodings";

export function getRelativeRhythmPoints(someRhythmMap: RhythmMap) {
  return _getRelativeRhythmPoints({
    someRhythmMap,
  });
}

export interface _GetRelativeRhythmPointsApi {
  someRhythmMap: RhythmMap;
}

export function _getRelativeRhythmPoints(
  api: _GetRelativeRhythmPointsApi
): Array<RelativeRhythmPoint> {
  const { someRhythmMap } = api;
  return someRhythmMap.rhythmPoints.map(
    (someRhythmPoint) => someRhythmPoint / someRhythmMap.rhythmResolution
  );
}
