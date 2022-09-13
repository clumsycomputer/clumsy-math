import {
  AlignedRhythmStructure,
  InterposedRhythmGroupMemberStructure,
  RhythmGroupBaseStructure,
  RhythmGroupMemberStructure,
  RhythmLineage,
  StackRhythmStructure,
  TerminalRhythmGroupMemberStructure,
} from "./encodings";
import { _getStackRhythmStructure } from "./getStackRhythmStructure";

export function getRhythmLineage(
  someAlignedRhythmStructure: AlignedRhythmStructure
) {
  return _getRhythmLineage({
    someAlignedRhythmStructure,
  });
}

export interface _GetRhythmLineageApi {
  someAlignedRhythmStructure: AlignedRhythmStructure;
}

export function _getRhythmLineage(api: _GetRhythmLineageApi): RhythmLineage {
  const { someAlignedRhythmStructure } = api;
  return _getStackRhythmStructure({
    someRecursiveRhythmStructure: someAlignedRhythmStructure,
  }).map((_, sliceIndex, baseStackRhythmStructure) => ({
    baseStructure: getBaseStructure({
      baseRhythmStructures: baseStackRhythmStructure.slice(0, sliceIndex + 1),
    }),
    memberStructure: getMemberStructure({
      memberRhythmStructures: baseStackRhythmStructure.slice(sliceIndex),
    }),
  }));
}

interface GetBaseStructureApi {
  baseRhythmStructures: StackRhythmStructure;
}

function getBaseStructure(api: GetBaseStructureApi): RhythmGroupBaseStructure {
  const { baseRhythmStructures } = api;
  const baseRhythmStructuresReversed = baseRhythmStructures.reverse();
  const initialBaseStructure = baseRhythmStructuresReversed[0];
  if (initialBaseStructure === undefined)
    throw new Error("getBaseStructure: baseRhythmStructures empty");
  let baseStructureResult: RhythmGroupBaseStructure = {
    structureType: "initial",
    rhythmResolution: initialBaseStructure.rhythmResolution,
  };
  baseRhythmStructuresReversed.slice(1).forEach((someBasicStructure) => {
    baseStructureResult = {
      structureType: "initial",
      rhythmResolution: someBasicStructure.rhythmResolution,
      subStructure: {
        structureType: "interposed",
        rhythmDensity: someBasicStructure.rhythmDensity,
        rhythmOrientation: someBasicStructure.rhythmOrientation,
        subStructure: baseStructureResult.subStructure,
      },
    };
  });
  return baseStructureResult;
}

interface GetMemberStructureApi {
  memberRhythmStructures: StackRhythmStructure;
}

function getMemberStructure(
  api: GetMemberStructureApi
): RhythmGroupMemberStructure {
  const { memberRhythmStructures } = api;
  const initialMemberStructure = memberRhythmStructures[0];
  if (initialMemberStructure === undefined)
    throw new Error("getMemberStructure: memberRhythmStructures empty");
  let memberStructureTailRef: TerminalRhythmGroupMemberStructure = {
    structureType: "terminal",
    rhythmDensity: initialMemberStructure.rhythmDensity,
  };
  const memberStructureResult: RhythmGroupMemberStructure =
    memberStructureTailRef;
  memberRhythmStructures.slice(1).forEach((someBasicStructure) => {
    const nextTerminalStructure: TerminalRhythmGroupMemberStructure = {
      structureType: "terminal",
      rhythmDensity: someBasicStructure.rhythmDensity,
    };
    const nextInterposedStructure =
      memberStructureTailRef as unknown as InterposedRhythmGroupMemberStructure;
    nextInterposedStructure.structureType = "interposed";
    nextInterposedStructure.subStructure = nextTerminalStructure;
    memberStructureTailRef = nextTerminalStructure;
  });
  return memberStructureResult;
}
