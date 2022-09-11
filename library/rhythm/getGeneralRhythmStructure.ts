import {
  _iterateRecursiveSpatialStructure,
  _IterateRecursiveSpatialStructureApi,
} from "../general/iterateRecursiveSpatialStructure";
import { ExtractTerminalStructure } from "../general/models";
import { GeneralRhythmStructure, RecursiveRhythmStructure } from "./encodings";

export function getGeneralRhythmStructure(
  someRecursiveRhythmStructure: RecursiveRhythmStructure
) {
  return _getGeneralRhythmStructure({
    someRecursiveRhythmStructure,
  });
}

export interface _GetGeneralRhythmStructureApi {
  someRecursiveRhythmStructure: RecursiveRhythmStructure;
}

export function _getGeneralRhythmStructure(
  api: _GetGeneralRhythmStructureApi
): GeneralRhythmStructure {
  const { someRecursiveRhythmStructure } = api;
  const generalRhythmStructureResult: GeneralRhythmStructure = [];
  _iterateRecursiveSpatialStructure({
    someSpatialStructure: someRecursiveRhythmStructure,
    forEach: (someScopedRhythmStructure) => {
      if (someScopedRhythmStructure.structureType === "initial") {
        generalRhythmStructureResult.push({
          rhythmResolution: someScopedRhythmStructure.rhythmResolution,
          rhythmDensity: someScopedRhythmStructure.subStructure.rhythmDensity,
          rhythmOrientation:
            someScopedRhythmStructure.subStructure.rhythmOrientation,
          rhythmPhase: getRhythmPhase({
            someScopedRhythmStructure,
          }),
        });
      } else if (someScopedRhythmStructure.structureType === "interposed") {
        generalRhythmStructureResult.push({
          rhythmResolution: someScopedRhythmStructure.rhythmDensity,
          rhythmDensity: someScopedRhythmStructure.subStructure.rhythmDensity,
          rhythmOrientation:
            someScopedRhythmStructure.subStructure.rhythmOrientation,
          rhythmPhase: getRhythmPhase({
            someScopedRhythmStructure,
          }),
        });
      } else if (someScopedRhythmStructure.structureType === "terminal") {
        // no-op
      } else {
        throw new Error("getGeneralRhythmStructure: invalid path");
      }
    },
  });
  return generalRhythmStructureResult;
}

interface GetRhythmPhaseApi {
  someScopedRhythmStructure: Exclude<
    Parameters<
      _IterateRecursiveSpatialStructureApi<RecursiveRhythmStructure>["forEach"]
    >[0],
    ExtractTerminalStructure<RecursiveRhythmStructure>
  >;
}

function getRhythmPhase(api: GetRhythmPhaseApi): number {
  const { someScopedRhythmStructure } = api;
  const rhythmPhase = (someScopedRhythmStructure as Record<string, unknown>)[
    "rhythmPhase"
  ];
  return typeof rhythmPhase === "number" ? rhythmPhase : 0;
}
