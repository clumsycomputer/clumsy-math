import { RhythmMap, RhythmPhase } from "./encodings";

export function getPhasedRhythmMap(
  someRhythmMap: RhythmMap,
  rhythmPhase: RhythmPhase
) {
  return _getPhasedRhythmMap({
    someRhythmMap,
    rhythmPhase,
  });
}

export interface _GetPhasedRhythmMapApi {
  someRhythmMap: RhythmMap;
  rhythmPhase: RhythmPhase;
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
