import { getEuclideanRhythm } from "./getEuclideanRhythm";
import {
  BasicRhythmStructure,
  GeneralRhythmStructure,
  RhythmMap,
} from "./models";

export interface GetRhythmMapApi {
  someGeneralRhythmStructure: GeneralRhythmStructure;
}

export function getRhythmMap(api: GetRhythmMapApi): RhythmMap {
  const { someGeneralRhythmStructure } = api;
  const rhythmResolution = someGeneralRhythmStructure[0]
    ? someGeneralRhythmStructure[0].rhythmResolution
    : 0;
  return {
    rhythmResolution,
    rhythmPoints: someGeneralRhythmStructure.reduce<Array<number>>(
      (baseRhythmPoints, someBasicRhythmStructure) => {
        return getBasicRhythmPoints({
          someBasicRhythmStructure,
        })
          .map((someBasicRhythmPoint) => {
            return baseRhythmPoints[someBasicRhythmPoint];
          }, [])
          .sort((pointA, pointB) => pointA - pointB);
      },
      new Array(rhythmResolution)
        .fill(undefined)
        .map((_, someRhythmPoint) => someRhythmPoint)
    ),
  };
}
interface GetBasicRhythmPointsApi {
  someBasicRhythmStructure: BasicRhythmStructure;
}

function getBasicRhythmPoints(api: GetBasicRhythmPointsApi): Array<number> {
  const { someBasicRhythmStructure } = api;
  return getEuclideanRhythm({
    someEuclideanRhythmStructure: someBasicRhythmStructure,
  })
    .reduce<Array<number>>(
      (unadjustedPointsResult, someRhythmSlot, rhythmSlotIndex) => {
        if (someRhythmSlot === true) {
          unadjustedPointsResult.push(rhythmSlotIndex);
        }
        return unadjustedPointsResult;
      },
      []
    )
    .map((someUnadjustedPoint, pointSlotIndex, unadjustedPoints) => {
      const orientationPhase =
        unadjustedPoints[someBasicRhythmStructure.rhythmOrientation];
      const pointAdjustment =
        (-orientationPhase - someBasicRhythmStructure.rhythmPhase) %
        someBasicRhythmStructure.rhythmResolution;
      const adjustedPoint =
        (someUnadjustedPoint +
          pointAdjustment +
          someBasicRhythmStructure.rhythmResolution) %
        someBasicRhythmStructure.rhythmResolution;
      return adjustedPoint;
    });
}
