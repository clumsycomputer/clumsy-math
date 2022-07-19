import { getEuclideanRhythm } from "./getEuclideanRhythm";
import { BasicRhythmStructure, RhythmPoints, RhythmStructure } from "./models";

export interface GetRhythmStructuresDataApi {
  someRhythmStructure: RhythmStructure;
  rhythmStructuresDataResult?: Array<ReturnType<typeof getRhythmStructureData>>;
}

export function getRhythmStructuresData(
  api: GetRhythmStructuresDataApi
): Array<ReturnType<typeof getRhythmStructureData>> {
  const { someRhythmStructure, rhythmStructuresDataResult = [] } = api;
  const structureBasePoints = rhythmStructuresDataResult[0]
    ? rhythmStructuresDataResult[0].structurePoints
    : new Array(someRhythmStructure.rhythmResolution)
        .fill(undefined)
        .map((_, containerCellIndex) => containerCellIndex);
  const currentRhythmStructureData = getRhythmStructureData({
    structureBasePoints,
    isolatedStructure: {
      rhythmResolution: someRhythmStructure.rhythmResolution,
      rhythmPhase: someRhythmStructure.rhythmPhase,
      rhythmDensity: someRhythmStructure.subStructure.rhythmDensity,
      rhythmOrientation: someRhythmStructure.subStructure.rhythmOrientation,
    },
  });
  switch (someRhythmStructure.subStructure.structureType) {
    case "interposed":
      return getRhythmStructuresData({
        someRhythmStructure: {
          rhythmResolution: someRhythmStructure.subStructure.rhythmDensity,
          rhythmPhase: someRhythmStructure.subStructure.rhythmPhase,
          subStructure: someRhythmStructure.subStructure.subStructure,
          structureType: "initial",
        },
        rhythmStructuresDataResult: [
          currentRhythmStructureData,
          ...rhythmStructuresDataResult,
        ],
      });
    case "terminal":
      return [currentRhythmStructureData, ...rhythmStructuresDataResult];
  }
}

interface GetRhythmStructureDataApi {
  isolatedStructure: BasicRhythmStructure;
  structureBasePoints: RhythmPoints;
}

function getRhythmStructureData(api: GetRhythmStructureDataApi): {
  isolatedStructure: BasicRhythmStructure;
  isolatedPoints: RhythmPoints;
  structurePoints: RhythmPoints;
} {
  const { isolatedStructure, structureBasePoints } = api;
  const rhythmStructureDataResult = {
    isolatedStructure,
    isolatedPoints: new Array<number>(isolatedStructure.rhythmDensity),
    structurePoints: new Array<number>(isolatedStructure.rhythmDensity),
  };
  getEuclideanRhythm({
    lhsCount: isolatedStructure.rhythmDensity,
    rhsCount:
      isolatedStructure.rhythmResolution - isolatedStructure.rhythmDensity,
    lhsRhythm: [true],
    rhsRhythm: [false],
  })
    .reduce<RhythmPoints>(
      (isolatedPointsBaseResult, someRhythmSlot, rhythmSlotIndex) => {
        if (someRhythmSlot === true) {
          isolatedPointsBaseResult.push(rhythmSlotIndex);
        }
        return isolatedPointsBaseResult;
      },
      []
    )
    .forEach((someIsolatedPointBase, pointIndex, isolatedPointsBase) => {
      const isolatedOrientationPhase =
        isolatedPointsBase[isolatedStructure.rhythmOrientation]!;
      const isolatedOffset =
        (-isolatedOrientationPhase - isolatedStructure.rhythmPhase) %
        isolatedStructure.rhythmResolution;
      const isolatedPoint =
        (someIsolatedPointBase +
          isolatedOffset +
          isolatedStructure.rhythmResolution) %
        isolatedStructure.rhythmResolution;
      const structurePoint = structureBasePoints[isolatedPoint]!;
      rhythmStructureDataResult.isolatedPoints[pointIndex] = isolatedPoint;
      rhythmStructureDataResult.structurePoints[pointIndex] = structurePoint;
    });
  rhythmStructureDataResult.isolatedPoints.sort(
    (pointA, pointB) => pointA - pointB
  );
  rhythmStructureDataResult.structurePoints.sort(
    (pointA, pointB) => pointA - pointB
  );
  return rhythmStructureDataResult;
}
