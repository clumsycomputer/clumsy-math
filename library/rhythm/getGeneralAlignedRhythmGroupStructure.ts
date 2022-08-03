import {
  AlignedRhythmGroupStructure,
  GeneralAlignedRhythmGroupStructure,
} from "./models";

export interface _GetGeneralAlignedRhythmGroupStructureApi {
  someAlignedRhythmGroupStructure: AlignedRhythmGroupStructure;
}

export function _getGeneralAlignedRhythmGroupStructure(
  api: _GetGeneralAlignedRhythmGroupStructureApi
): GeneralAlignedRhythmGroupStructure {
  const { someAlignedRhythmGroupStructure } = api;
  const baseStructureResult: GeneralAlignedRhythmGroupStructure["baseStructure"] =
    [];
  iterateBaseStructure({
    someBaseStructure: someAlignedRhythmGroupStructure.baseStructure,
    forEach: (someScopedBaseStructure) => {
      if (someScopedBaseStructure.subStructure) {
        baseStructureResult.push({
          rhythmResolution:
            someScopedBaseStructure.structureType === "initial"
              ? someScopedBaseStructure.rhythmResolution
              : someScopedBaseStructure.rhythmDensity,
          rhythmDensity: someScopedBaseStructure.subStructure.rhythmDensity,
          rhythmOrientation:
            someScopedBaseStructure.subStructure.rhythmOrientation,
        });
      }
    },
  });
  const memberStructureResult: GeneralAlignedRhythmGroupStructure["memberStructure"] =
    [];
  iterateMemberStructure({
    someMemberStructure: someAlignedRhythmGroupStructure.memberStructure,
    forEach: (someScopedMemberStructure) => {
      const nextRhythmResolution =
        memberStructureResult[memberStructureResult.length - 1]
          ?.rhythmResolution ||
        baseStructureResult[baseStructureResult.length - 1]?.rhythmResolution;
      if (nextRhythmResolution === undefined)
        throw new Error(
          "getGeneralAlignedRhythmGroupStructure: nextRhythmResolution undefined"
        );
      memberStructureResult.push({
        rhythmResolution: nextRhythmResolution,
        rhythmDensity: someScopedMemberStructure.rhythmDensity,
      });
    },
  });
  return {
    baseStructure: baseStructureResult,
    memberStructure: memberStructureResult,
  };
}

interface IterateBaseStructureApi {
  someBaseStructure: AlignedRhythmGroupStructure["baseStructure"];
  forEach: (
    someScopedBaseStructure:
      | AlignedRhythmGroupStructure["baseStructure"]
      | Exclude<
          AlignedRhythmGroupStructure["baseStructure"]["subStructure"],
          undefined
        >
  ) => void;
}

function iterateBaseStructure(api: IterateBaseStructureApi) {
  const { someBaseStructure } = api;
}

interface IterateMemberStructureApi {
  someMemberStructure: AlignedRhythmGroupStructure["memberStructure"];
  forEach: (
    someScopedMemberStructure: AlignedRhythmGroupStructure["memberStructure"]
  ) => void;
}

function iterateMemberStructure(api: IterateMemberStructureApi) {
  const {} = api;
}
