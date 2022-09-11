import {
  _iterateRecursiveSpatialStructure,
  _IterateRecursiveSpatialStructureApi,
} from "../general/iterateRecursiveSpatialStructure";
import { ExtractTerminalStructure } from "../general/models";
import { RecursiveRhythmStructure, StackRhythmStructure } from "./encodings";

export function getStackRhythmStructure(
  someRecursiveRhythmStructure: RecursiveRhythmStructure
) {
  return _getStackRhythmStructure({
    someRecursiveRhythmStructure,
  });
}

export interface _GetStackRhythmStructureApi {
  someRecursiveRhythmStructure: RecursiveRhythmStructure;
}

export function _getStackRhythmStructure(
  api: _GetStackRhythmStructureApi
): StackRhythmStructure {
  const { someRecursiveRhythmStructure } = api;
  const stackRhythmStructureResult: StackRhythmStructure = [];
  _iterateRecursiveSpatialStructure({
    someSpatialStructure: someRecursiveRhythmStructure,
    forEach: (someScopedRhythmStructure) => {
      if (someScopedRhythmStructure.structureType === "initial") {
        stackRhythmStructureResult.push({
          rhythmResolution: someScopedRhythmStructure.rhythmResolution,
          rhythmDensity: someScopedRhythmStructure.subStructure.rhythmDensity,
          rhythmOrientation:
            someScopedRhythmStructure.subStructure.rhythmOrientation,
          rhythmPhase: getRhythmPhase({
            someScopedRhythmStructure,
          }),
        });
      } else if (someScopedRhythmStructure.structureType === "interposed") {
        stackRhythmStructureResult.push({
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
  return stackRhythmStructureResult;
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
