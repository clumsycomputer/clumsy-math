import { AlignedRhythmGroupStructure } from "./models";

export function getRhythmGroupId(
  someAlignedRhythmGroupStructure: AlignedRhythmGroupStructure
) {
  return _getRhythmGroupId({
    someAlignedRhythmGroupStructure,
  });
}

export interface _GetRhythmGroupIdApi {
  someAlignedRhythmGroupStructure: AlignedRhythmGroupStructure;
}

export function _getRhythmGroupId(api: _GetRhythmGroupIdApi) {
  const { someAlignedRhythmGroupStructure } = api;
  let alignedRhythmGroupId = "alignedgroup";
  iterateBaseStructure({
    someScopedBaseStructure: someAlignedRhythmGroupStructure.baseStructure,
    forEach: (someScopedBaseStructure) => {
      if (someScopedBaseStructure.structureType === "initial") {
        alignedRhythmGroupId = `${alignedRhythmGroupId}___${someScopedBaseStructure.rhythmResolution}`;
      } else if (someScopedBaseStructure.structureType === "interposed") {
        alignedRhythmGroupId = `${alignedRhythmGroupId}__${someScopedBaseStructure.rhythmDensity}_${someScopedBaseStructure.rhythmOrientation}`;
      }
    },
  });
  alignedRhythmGroupId = `${alignedRhythmGroupId}_`;
  iterateMemberStructure({
    someScopedMemberStructure: someAlignedRhythmGroupStructure.memberStructure,
    forEach: (someScopedMemberStructure) => {
      alignedRhythmGroupId = `${alignedRhythmGroupId}__${someScopedMemberStructure.rhythmDensity}`;
    },
  });
  return alignedRhythmGroupId;
}

interface IterateBaseStructureApi<
  SomeScopedBaseStructure =
    | AlignedRhythmGroupStructure["baseStructure"]
    | Exclude<
        AlignedRhythmGroupStructure["baseStructure"]["subStructure"],
        undefined
      >
> {
  someScopedBaseStructure: SomeScopedBaseStructure;
  forEach: (someScopedBaseStructure: SomeScopedBaseStructure) => void;
}

function iterateBaseStructure(api: IterateBaseStructureApi) {
  const { someScopedBaseStructure, forEach } = api;
  forEach(someScopedBaseStructure);
  if (someScopedBaseStructure.subStructure) {
    iterateBaseStructure({
      forEach,
      someScopedBaseStructure: someScopedBaseStructure.subStructure,
    });
  }
}

interface IterateMemberStructureApi {
  someScopedMemberStructure: AlignedRhythmGroupStructure["memberStructure"];
  forEach: (
    someScopedMemberStructure: AlignedRhythmGroupStructure["memberStructure"]
  ) => void;
}

function iterateMemberStructure(api: IterateMemberStructureApi) {
  const { someScopedMemberStructure, forEach } = api;
  forEach(someScopedMemberStructure);
  if (someScopedMemberStructure.structureType === "interposed") {
    iterateMemberStructure({
      forEach,
      someScopedMemberStructure: someScopedMemberStructure.subStructure,
    });
  }
}
