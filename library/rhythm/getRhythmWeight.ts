import { RhythmMap } from "./models";

export interface GetRhythmWeightApi {
  someRhythmMap: RhythmMap;
  slotWeights: Array<number>;
}

export function getRhythmWeight(api: GetRhythmWeightApi) {
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
