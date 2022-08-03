import {
  iterateRecursiveSpatialStructure,
  IterateRecursiveSpatialStructureApi,
} from "../general/iterateRecursiveSpatialStructure";
import { ExtractTerminalStructure } from "../general/models";
import { GeneralRhythmStructure, RhythmStructure } from "./models";

export function getGeneralRhythmStructure(
  someRhythmStructure: RhythmStructure
) {
  return _getGeneralRhythmStructure({
    someRhythmStructure,
  });
}

export interface _GetGeneralRhythmStructureApi {
  someRhythmStructure: RhythmStructure;
}

export function _getGeneralRhythmStructure(
  api: _GetGeneralRhythmStructureApi
): GeneralRhythmStructure {
  const { someRhythmStructure } = api;
  const generalRhythmStructureResult: GeneralRhythmStructure = [];
  iterateRecursiveSpatialStructure({
    someSpatialStructure: someRhythmStructure,
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
      IterateRecursiveSpatialStructureApi<RhythmStructure>["forEach"]
    >[0],
    ExtractTerminalStructure<RhythmStructure>
  >;
}

function getRhythmPhase(api: GetRhythmPhaseApi): number {
  const { someScopedRhythmStructure } = api;
  const rhythmPhase = (someScopedRhythmStructure as Record<string, unknown>)[
    "rhythmPhase"
  ];
  return typeof rhythmPhase === "number" ? rhythmPhase : 0;
}
