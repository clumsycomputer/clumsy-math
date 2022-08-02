import { RhythmMap } from "./models";

export interface GetRelativeRhythmPointsApi {
  someRhythmMap: RhythmMap;
}

export function getRelativeRhythmPoints(
  api: GetRelativeRhythmPointsApi
): Array<number> {
  const { someRhythmMap } = api;
  return someRhythmMap.rhythmPoints.map(
    (someRhythmPoint) => someRhythmPoint / someRhythmMap.rhythmResolution
  );
}
