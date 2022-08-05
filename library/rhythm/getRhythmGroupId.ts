import { RhythmGroupStructure } from "./models";

export function getRhythmGroupId(
  someRhythmGroupStructure: RhythmGroupStructure
) {
  return _getRhythmGroupId({
    someRhythmGroupStructure,
  });
}

export interface _GetRhythmGroupIdApi {
  someRhythmGroupStructure: RhythmGroupStructure;
}

export function _getRhythmGroupId(api: _GetRhythmGroupIdApi) {
  const { someRhythmGroupStructure } = api;
  let rhythmGroupId = "group";
  iterateBaseStructure({
    someScopedBaseStructure: someRhythmGroupStructure.baseStructure,
    forEach: (someScopedBaseStructure) => {
      if (someScopedBaseStructure.structureType === "initial") {
        rhythmGroupId = `${rhythmGroupId}___${someScopedBaseStructure.rhythmResolution}`;
      } else if (someScopedBaseStructure.structureType === "interposed") {
        rhythmGroupId = `${rhythmGroupId}__${someScopedBaseStructure.rhythmDensity}_${someScopedBaseStructure.rhythmOrientation}`;
      }
    },
  });
  rhythmGroupId = `${rhythmGroupId}_`;
  iterateMemberStructure({
    someScopedMemberStructure: someRhythmGroupStructure.memberStructure,
    forEach: (someScopedMemberStructure) => {
      rhythmGroupId = `${rhythmGroupId}__${someScopedMemberStructure.rhythmDensity}`;
    },
  });
  return rhythmGroupId;
}

interface IterateBaseStructureApi<
  SomeScopedBaseStructure =
    | RhythmGroupStructure["baseStructure"]
    | Exclude<RhythmGroupStructure["baseStructure"]["subStructure"], undefined>
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
  someScopedMemberStructure: RhythmGroupStructure["memberStructure"];
  forEach: (
    someScopedMemberStructure: RhythmGroupStructure["memberStructure"]
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
