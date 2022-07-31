import { getEuclideanRhythm } from "./getEuclideanRhythm";
import { getGeneralRhythmStructure } from "./getGeneralRhythmStructure";
import { BasicRhythmStructure, RhythmMap, RhythmStructure } from "./models";

export interface GetRhythmMapApi {
  someRhythmStructure: RhythmStructure;
}

export function getRhythmMap(api: GetRhythmMapApi): RhythmMap {
  const { someRhythmStructure } = api;
  return {
    rhythmResolution: someRhythmStructure.rhythmResolution,
    rhythmPoints: getGeneralRhythmStructure({
      someRhythmStructure,
    }).reduce<Array<number>>(
      (baseRhythmPoints, someBasicRhythmStructure) => {
        return getBasicRhythmPoints({
          someBasicRhythmStructure,
        })
          .map((someBasicRhythmPoint) => baseRhythmPoints[someBasicRhythmPoint])
          .sort((pointA, pointB) => pointA - pointB);
      },
      new Array(someRhythmStructure.rhythmResolution)
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
