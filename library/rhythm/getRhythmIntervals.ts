import { RhythmMap } from "./models";

export interface GetRhythmIntervalsApi {
  someRhythmMap: RhythmMap;
}

export function getRhythmIntervals(api: GetRhythmIntervalsApi): Array<number> {
  const { someRhythmMap } = api;
  return someRhythmMap.rhythmPoints.map((someRhythmPoint, rhythmPointIndex) => {
    const nextRhythmPoint =
      someRhythmMap.rhythmPoints[
        (rhythmPointIndex + 1) % someRhythmMap.rhythmPoints.length
      ];
    return (
      (nextRhythmPoint - someRhythmPoint + someRhythmMap.rhythmResolution) %
      someRhythmMap.rhythmResolution
    );
  });
}
