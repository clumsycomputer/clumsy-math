import { getRhythmStructuresData } from "./getRhythmStructuresData";
import { RhythmMap, RhythmStructure } from "./models";

export interface GetRhythmMapApi {
  someRhythmStructure: RhythmStructure;
}

export function getRhythmMap(api: GetRhythmMapApi): RhythmMap {
  const { someRhythmStructure } = api;
  const rhythmStructuresData = getRhythmStructuresData({
    someRhythmStructure,
  });
  return {
    rhythmResolution: someRhythmStructure.rhythmResolution,
    rhythmPoints: rhythmStructuresData[0]!.structurePoints,
  };
}
