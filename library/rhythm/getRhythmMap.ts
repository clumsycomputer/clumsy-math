import { _getEuclideanRhythm } from "./getEuclideanRhythm";
import { _getGeneralRhythmStructure } from "./getGeneralRhythmStructure";
import { BasicRhythmStructure, RhythmMap, RhythmStructure } from "./models";

export function getRhythmMap(someRhythmStructure: RhythmStructure) {
  return _getRhythmMap({
    someRhythmStructure,
  });
}

export interface _GetRhythmMapApi {
  someRhythmStructure: RhythmStructure;
}

export function _getRhythmMap(api: _GetRhythmMapApi): RhythmMap {
  const { someRhythmStructure } = api;
  return {
    rhythmResolution: someRhythmStructure.rhythmResolution,
    rhythmPoints: _getGeneralRhythmStructure({
      someRhythmStructure,
    }).reduce<Array<number>>(
      (baseRhythmPoints, someBasicRhythmStructure) => {
        return getBasicRhythmPoints({
          someBasicRhythmStructure,
        })
          .map(
            (someBasicRhythmPoint) => baseRhythmPoints[someBasicRhythmPoint]!
          )
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
  return _getEuclideanRhythm({
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
        unadjustedPoints[someBasicRhythmStructure.rhythmOrientation]!;
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
