import { AlignedRhythmGroupStructure } from "./models";

export interface GetAlignedRhythmGroupIdApi {
  someAlignedRhythmGroup: AlignedRhythmGroupStructure;
}

export function getAlignedRhythmGroupId(api: GetAlignedRhythmGroupIdApi) {
  const { someAlignedRhythmGroup } = api;
  let alignedRhythmGroupId = "alignedgroup";
  iterateBaseStructure({
    someScopedBaseStructure: someAlignedRhythmGroup.baseStructure,
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
    someScopedMemberStructure: someAlignedRhythmGroup.memberStructure,
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
