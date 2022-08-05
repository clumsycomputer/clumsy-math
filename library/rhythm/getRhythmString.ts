import { RhythmMap } from "./models";

export function getRhythmString(someRhythmMap: RhythmMap) {
  return _getRhythmString({
    someRhythmMap,
  });
}

export interface _GetRhythmStringApi {
  someRhythmMap: RhythmMap;
}

export function _getRhythmString(api: _GetRhythmStringApi): string {
  const { someRhythmMap } = api;
  return someRhythmMap.rhythmPoints
    .reduce((rhythmStringResult, someRhythmPoint) => {
      rhythmStringResult[someRhythmPoint] = 1;
      return rhythmStringResult;
    }, new Array(someRhythmMap.rhythmResolution).fill(0))
    .join("");
}
