import { getGeneralRhythmStructure } from "./getGeneralRhythmStructure";
import {
  AlignedRhythmStructure,
  AlignedRhythmGroupStructure,
  AlignedRhythmGroupMemberStructure,
  GeneralRhythmStructure,
  TerminalAlignedRhythmGroupMemberStructure,
  InterposedAlignedRhythmGroupMemberStructure,
  AlignedRhythmGroupBaseStructure,
} from "./models";

export interface GetAlignedRhythmLineageApi {
  someAlignedRhythmStructure: AlignedRhythmStructure;
}

export function getAlignedRhythmLineage(
  api: GetAlignedRhythmLineageApi
): Array<AlignedRhythmGroupStructure> {
  const { someAlignedRhythmStructure } = api;
  return getGeneralRhythmStructure({
    someRhythmStructure: someAlignedRhythmStructure,
  }).map((_, sliceIndex, lineageGeneralRhythmStructure) =>
    getGroupStructure({
      sliceIndex,
      lineageGeneralRhythmStructure,
    })
  );
}

interface GetGroupStructureApi {
  lineageGeneralRhythmStructure: GeneralRhythmStructure;
  sliceIndex: number;
}

function getGroupStructure(
  api: GetGroupStructureApi
): AlignedRhythmGroupStructure {
  const { lineageGeneralRhythmStructure, sliceIndex } = api;
  return {
    baseStructure: getBaseStructure({
      baseRhythmStructures: lineageGeneralRhythmStructure.slice(
        0,
        sliceIndex + 1
      ),
    }),
    memberStructure: getMemberStructure({
      memberRhythmStructures: lineageGeneralRhythmStructure.slice(sliceIndex),
    }),
  };
}

interface GetBaseStructureApi {
  baseRhythmStructures: GeneralRhythmStructure;
}

function getBaseStructure(
  api: GetBaseStructureApi
): AlignedRhythmGroupBaseStructure {
  const { baseRhythmStructures } = api;
  const baseRhythmStructuresReversed = baseRhythmStructures.reverse();
  const initialBaseStructure = baseRhythmStructuresReversed[0];
  if (initialBaseStructure === undefined)
    throw new Error("getBaseStructure: baseRhythmStructures empty");
  let baseStructureResult: AlignedRhythmGroupBaseStructure = {
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
  memberRhythmStructures: GeneralRhythmStructure;
}

function getMemberStructure(
  api: GetMemberStructureApi
): AlignedRhythmGroupMemberStructure {
  const { memberRhythmStructures } = api;
  const initialMemberStructure = memberRhythmStructures[0];
  if (initialMemberStructure === undefined)
    throw new Error("getMemberStructure: memberRhythmStructures empty");
  let memberStructureTailRef: TerminalAlignedRhythmGroupMemberStructure = {
    structureType: "terminal",
    rhythmDensity: initialMemberStructure.rhythmDensity,
  };
  const memberStructureResult: AlignedRhythmGroupMemberStructure =
    memberStructureTailRef;
  memberRhythmStructures.slice(1).forEach((someBasicStructure) => {
    const nextTerminalStructure: TerminalAlignedRhythmGroupMemberStructure = {
      structureType: "terminal",
      rhythmDensity: someBasicStructure.rhythmDensity,
    };
    const nextInterposedStructure =
      memberStructureTailRef as unknown as InterposedAlignedRhythmGroupMemberStructure;
    nextInterposedStructure.structureType = "interposed";
    nextInterposedStructure.subStructure = nextTerminalStructure;
    memberStructureTailRef = nextTerminalStructure;
  });
  return memberStructureResult;
}
