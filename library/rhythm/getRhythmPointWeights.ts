import { RhythmMap } from "./models";

export interface GetRhythmPointWeightsApi {
  someRhythmMap: RhythmMap;
  slotWeights: Array<number>;
}

export function getRhythmPointWeights(api: GetRhythmPointWeightsApi) {
  const { someRhythmMap, slotWeights } = api;
  return someRhythmMap.rhythmPoints.map(
    (someRhythmPoint) => slotWeights[someRhythmPoint]
  );
}
