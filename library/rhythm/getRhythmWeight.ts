import { RhythmMap, RhythmSlotWeight, RhythmWeight } from "./encodings";

export function getRhythmWeight(
  someRhythmMap: RhythmMap,
  slotWeights: Array<RhythmSlotWeight>
) {
  return _getRhythmWeight({
    someRhythmMap,
    slotWeights,
  });
}

export interface _GetRhythmWeightApi {
  someRhythmMap: RhythmMap;
  slotWeights: Array<RhythmSlotWeight>;
}

export function _getRhythmWeight(api: _GetRhythmWeightApi): RhythmWeight {
  const { someRhythmMap, slotWeights } = api;
  return someRhythmMap.rhythmPoints.reduce(
    (rhythmWeightResult, someRhythmPoint) => {
      const targetSlotWeight = slotWeights[someRhythmPoint];
      if (targetSlotWeight === undefined)
        throw new Error("getRhythmWeight: targetSlotWeight undefined");
      return rhythmWeightResult + targetSlotWeight;
    },
    0
  );
}
