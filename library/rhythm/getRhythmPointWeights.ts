import { RhythmMap } from "./encodings";

export function getRhythmPointWeights(
  someRhythmMap: RhythmMap,
  slotWeights: Array<number>
) {
  return _getRhythmPointWeights({
    someRhythmMap,
    slotWeights,
  });
}

export interface _GetRhythmPointWeightsApi {
  someRhythmMap: RhythmMap;
  slotWeights: Array<number>;
}

export function _getRhythmPointWeights(api: _GetRhythmPointWeightsApi) {
  const { someRhythmMap, slotWeights } = api;
  return someRhythmMap.rhythmPoints.map(
    (someRhythmPoint) => slotWeights[someRhythmPoint]
  );
}
