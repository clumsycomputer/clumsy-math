import { RhythmMap } from "./encodings";

export function getRhythmIntervals(someRhythmMap: RhythmMap) {
  return _getRhythmIntervals({
    someRhythmMap,
  });
}

export interface _GetRhythmIntervalsApi {
  someRhythmMap: RhythmMap;
}

export function _getRhythmIntervals(
  api: _GetRhythmIntervalsApi
): Array<number> {
  const { someRhythmMap } = api;
  return someRhythmMap.rhythmPoints.map((someRhythmPoint, rhythmPointIndex) => {
    const nextRhythmPoint =
      someRhythmMap.rhythmPoints[
        (rhythmPointIndex + 1) % someRhythmMap.rhythmPoints.length
      ]!;
    return (
      (nextRhythmPoint - someRhythmPoint + someRhythmMap.rhythmResolution) %
      someRhythmMap.rhythmResolution
    );
  });
}
