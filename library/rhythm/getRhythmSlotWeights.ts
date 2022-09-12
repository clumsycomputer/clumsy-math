import { RhythmMap, RhythmSlotWeight } from "./encodings";

export function getRhythmSlotWeights(someRhythmMaps: Array<RhythmMap>) {
  return _getRhythmSlotWeights({
    someRhythmMaps,
  });
}

export interface _GetRhythmSlotWeightsApi {
  someRhythmMaps: Array<RhythmMap>;
}

export function _getRhythmSlotWeights(
  api: _GetRhythmSlotWeightsApi
): Array<RhythmSlotWeight> {
  const { someRhythmMaps } = api;
  const firstRhythmMap = someRhythmMaps[0];
  if (firstRhythmMap === undefined)
    throw new Error("getRhythmSlotWeights: someRhythmMaps empty");
  return someRhythmMaps.reduce((rhythmSlotWeightsResult, someRhythmMap) => {
    someRhythmMap.rhythmPoints.forEach((someRhythmPoint) => {
      rhythmSlotWeightsResult[someRhythmPoint] += 1;
    });
    return rhythmSlotWeightsResult;
  }, new Array(firstRhythmMap.rhythmResolution).fill(0));
}
