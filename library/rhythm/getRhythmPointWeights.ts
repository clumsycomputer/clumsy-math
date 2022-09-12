import { RhythmMap, RhythmPointWeight, RhythmSlotWeight } from "./encodings";

export function getRhythmPointWeights(
  someRhythmMap: RhythmMap,
  slotWeights: Array<RhythmSlotWeight>
) {
  return _getRhythmPointWeights({
    someRhythmMap,
    slotWeights,
  });
}

export interface _GetRhythmPointWeightsApi {
  someRhythmMap: RhythmMap;
  slotWeights: Array<RhythmSlotWeight>;
}

export function _getRhythmPointWeights(
  api: _GetRhythmPointWeightsApi
): Array<RhythmPointWeight> {
  const { someRhythmMap, slotWeights } = api;
  return someRhythmMap.rhythmPoints.map(
    (someRhythmPoint) => slotWeights[someRhythmPoint]!
  );
}
