import { RhythmMap } from "./models";

export interface GetPhasedRhythmMapApi {
  someRhythmMap: RhythmMap;
  rhythmPhase: number;
}

export function getPhasedRhythmMap(api: GetPhasedRhythmMapApi): RhythmMap {
  const { someRhythmMap, rhythmPhase } = api;
  return {
    ...someRhythmMap,
    rhythmPoints: someRhythmMap.rhythmPoints.map((someRhythmPoint) => {
      return (
        (someRhythmPoint -
          (rhythmPhase % someRhythmMap.rhythmResolution) +
          someRhythmMap.rhythmResolution) %
        someRhythmMap.rhythmResolution
      );
    }),
  };
}
