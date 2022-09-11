import { RhythmMap } from "./encodings";

export function getPhasedRhythmMap(
  someRhythmMap: RhythmMap,
  rhythmPhase: number
) {
  return _getPhasedRhythmMap({
    someRhythmMap,
    rhythmPhase,
  });
}

export interface _GetPhasedRhythmMapApi {
  someRhythmMap: RhythmMap;
  rhythmPhase: number;
}

export function _getPhasedRhythmMap(api: _GetPhasedRhythmMapApi): RhythmMap {
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
