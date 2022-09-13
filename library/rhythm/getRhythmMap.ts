import { _getSimpleRhythm } from "./getSimpleRhythm";
import { _getStackRhythmStructure } from "./getStackRhythmStructure";
import {
  GeneralRhythmStructure,
  RhythmMap,
  RecursiveRhythmStructure,
} from "./encodings";

export function getRhythmMap<
  SomeRecursiveRhythmStructure extends RecursiveRhythmStructure
>(someRecursiveRhythmStructure: SomeRecursiveRhythmStructure) {
  return _getRhythmMap({
    someRecursiveRhythmStructure,
  });
}

export interface _GetRhythmMapApi<
  SomeRecursiveRhythmStructure extends RecursiveRhythmStructure
> {
  someRecursiveRhythmStructure: SomeRecursiveRhythmStructure;
}

export function _getRhythmMap<
  SomeRecursiveRhythmStructure extends RecursiveRhythmStructure
>(api: _GetRhythmMapApi<SomeRecursiveRhythmStructure>): RhythmMap {
  const { someRecursiveRhythmStructure } = api;
  return {
    rhythmResolution: someRecursiveRhythmStructure.rhythmResolution,
    rhythmPoints: _getStackRhythmStructure({
      someRecursiveRhythmStructure,
    }).reduce<Array<number>>(
      (baseRhythmPoints, someGeneralRhythmStructure) => {
        return getGeneralRhythmPoints({
          someGeneralRhythmStructure,
        })
          .map(
            (someVariableRhythmPoint) =>
              baseRhythmPoints[someVariableRhythmPoint]!
          )
          .sort((pointA, pointB) => pointA - pointB);
      },
      new Array(someRecursiveRhythmStructure.rhythmResolution)
        .fill(undefined)
        .map((_, someRhythmPoint) => someRhythmPoint)
    ),
  };
}
interface GetGeneralRhythmPointsApi {
  someGeneralRhythmStructure: GeneralRhythmStructure;
}

function getGeneralRhythmPoints(api: GetGeneralRhythmPointsApi): Array<number> {
  const { someGeneralRhythmStructure } = api;
  return _getSimpleRhythm({
    someSimpleRhythmStructure: someGeneralRhythmStructure,
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
        unadjustedPoints[someGeneralRhythmStructure.rhythmOrientation]!;
      const pointAdjustment =
        (-orientationPhase - someGeneralRhythmStructure.rhythmPhase) %
        someGeneralRhythmStructure.rhythmResolution;
      const adjustedPoint =
        (someUnadjustedPoint +
          pointAdjustment +
          someGeneralRhythmStructure.rhythmResolution) %
        someGeneralRhythmStructure.rhythmResolution;
      return adjustedPoint;
    });
}
