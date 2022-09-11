import { _getSimpleRhythm } from "./getSimpleRhythm";
import { _getGeneralRhythmStructure } from "./getGeneralRhythmStructure";
import {
  VariableRhythmStructure,
  RhythmMap,
  RecursiveRhythmStructure,
} from "./encodings";

export function getRhythmMap(
  someRecursiveRhythmStructure: RecursiveRhythmStructure
) {
  return _getRhythmMap({
    someRecursiveRhythmStructure,
  });
}

export interface _GetRhythmMapApi {
  someRecursiveRhythmStructure: RecursiveRhythmStructure;
}

export function _getRhythmMap(api: _GetRhythmMapApi): RhythmMap {
  const { someRecursiveRhythmStructure } = api;
  return {
    rhythmResolution: someRecursiveRhythmStructure.rhythmResolution,
    rhythmPoints: _getGeneralRhythmStructure({
      someRecursiveRhythmStructure,
    }).reduce<Array<number>>(
      (baseRhythmPoints, someVariableRhythmStructure) => {
        return getVariableRhythmPoints({
          someVariableRhythmStructure,
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
interface GetVariableRhythmPointsApi {
  someVariableRhythmStructure: VariableRhythmStructure;
}

function getVariableRhythmPoints(
  api: GetVariableRhythmPointsApi
): Array<number> {
  const { someVariableRhythmStructure } = api;
  return _getSimpleRhythm({
    someSimpleRhythmStructure: someVariableRhythmStructure,
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
        unadjustedPoints[someVariableRhythmStructure.rhythmOrientation]!;
      const pointAdjustment =
        (-orientationPhase - someVariableRhythmStructure.rhythmPhase) %
        someVariableRhythmStructure.rhythmResolution;
      const adjustedPoint =
        (someUnadjustedPoint +
          pointAdjustment +
          someVariableRhythmStructure.rhythmResolution) %
        someVariableRhythmStructure.rhythmResolution;
      return adjustedPoint;
    });
}
