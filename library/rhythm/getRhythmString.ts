import { RhythmMap } from "./models";

export interface GetRhythmStringApi {
  someRhythmMap: RhythmMap;
}

export function getRhythmString(api: GetRhythmStringApi): string {
  const { someRhythmMap } = api;
  return someRhythmMap.rhythmPoints
    .reduce((rhythmStringResult, someRhythmPoint) => {
      rhythmStringResult[someRhythmPoint] = 1;
      return rhythmStringResult;
    }, new Array(someRhythmMap.rhythmResolution).fill(0))
    .join("");
}
