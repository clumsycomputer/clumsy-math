import {
  RhythmGroupMemberStructure,
  RhythmGroupStructure,
  AlignedRhythmStructure,
  StackRhythmStructure,
  RhythmGroup,
} from "./encodings";

export function getRhythmGroupMembers(
  someRhythmGroupStructure: RhythmGroupStructure
) {
  return _getRhythmGroupMembers({
    someRhythmGroupStructure,
  });
}

export interface _GetRhythmGroupMembersApi {
  someRhythmGroupStructure: RhythmGroupStructure;
}

export function _getRhythmGroupMembers(
  api: _GetRhythmGroupMembersApi
): RhythmGroup {
  const { someRhythmGroupStructure } = api;
  return getMembers({
    someRhythmGroupStructure,
    someScopedMemberStructure: someRhythmGroupStructure.memberStructure,
    rhythmGroupMembersResult: [],
    memberStack: getMemberStackBase({
      someScopedBaseStructure: someRhythmGroupStructure.baseStructure,
      memberStackResult: [],
    }),
  });
}

interface GetMemberStackBaseApi {
  memberStackResult: StackRhythmStructure;
  someScopedBaseStructure:
    | RhythmGroupStructure["baseStructure"]
    | Exclude<RhythmGroupStructure["baseStructure"]["subStructure"], undefined>;
}

function getMemberStackBase(api: GetMemberStackBaseApi): StackRhythmStructure {
  const { someScopedBaseStructure, memberStackResult } = api;
  if (
    someScopedBaseStructure?.structureType === "initial" &&
    someScopedBaseStructure?.subStructure
  ) {
    return getMemberStackBase({
      someScopedBaseStructure: someScopedBaseStructure.subStructure,
      memberStackResult: [
        ...memberStackResult,
        {
          rhythmResolution: someScopedBaseStructure.rhythmResolution,
          rhythmDensity: someScopedBaseStructure.subStructure.rhythmDensity,
          rhythmOrientation:
            someScopedBaseStructure.subStructure.rhythmOrientation,
          rhythmPhase: 0,
        },
      ],
    });
  } else if (
    someScopedBaseStructure.structureType === "interposed" &&
    someScopedBaseStructure.subStructure
  ) {
    return getMemberStackBase({
      someScopedBaseStructure: someScopedBaseStructure.subStructure,
      memberStackResult: [
        ...memberStackResult,
        {
          rhythmResolution: someScopedBaseStructure.rhythmDensity,
          rhythmDensity: someScopedBaseStructure.subStructure.rhythmDensity,
          rhythmOrientation:
            someScopedBaseStructure.subStructure.rhythmOrientation,
          rhythmPhase: 0,
        },
      ],
    });
  } else {
    return memberStackResult;
  }
}

interface GetMembersApi {
  someRhythmGroupStructure: RhythmGroupStructure;
  rhythmGroupMembersResult: RhythmGroup;
  someScopedMemberStructure: RhythmGroupMemberStructure | null;
  memberStack: StackRhythmStructure;
}

function getMembers(api: GetMembersApi): RhythmGroup {
  const {
    memberStack,
    someRhythmGroupStructure,
    someScopedMemberStructure,
    rhythmGroupMembersResult,
  } = api;
  if (someScopedMemberStructure) {
    const nextScopedMemberStructure =
      someScopedMemberStructure.structureType === "interposed"
        ? someScopedMemberStructure.subStructure
        : null;
    const currentRhythmResolution =
      memberStack[memberStack.length - 1]?.rhythmResolution ||
      someRhythmGroupStructure.baseStructure.rhythmResolution;
    for (
      let rhythmOrientation = 0;
      rhythmOrientation < someScopedMemberStructure.rhythmDensity;
      rhythmOrientation++
    ) {
      getMembers({
        someRhythmGroupStructure,
        rhythmGroupMembersResult,
        someScopedMemberStructure: nextScopedMemberStructure,
        memberStack: [
          ...memberStack,
          {
            rhythmOrientation,
            rhythmDensity: someScopedMemberStructure.rhythmDensity,
            rhythmResolution: currentRhythmResolution,
            rhythmPhase: 0,
          },
        ],
      });
    }
  } else if (someScopedMemberStructure === null) {
    rhythmGroupMembersResult.push(
      getMemberStructure({
        memberStack,
      })
    );
  }
  return rhythmGroupMembersResult;
}

interface GetMemberStructureApi {
  memberStack: StackRhythmStructure;
}

function getMemberStructure(
  api: GetMemberStructureApi
): AlignedRhythmStructure {
  const { memberStack } = api;
  const memberStackReversed = memberStack.reverse();
  const initialBasicStructure = memberStackReversed[0];
  if (initialBasicStructure === undefined)
    throw new Error("getMemberStructure: memberStack empty");
  const initialStructureResult: AlignedRhythmStructure = {
    structureType: "initial",
    rhythmResolution: initialBasicStructure.rhythmResolution,
    subStructure: {
      structureType: "terminal",
      rhythmDensity: initialBasicStructure.rhythmDensity,
      rhythmOrientation: initialBasicStructure.rhythmOrientation,
    },
  };
  return memberStackReversed
    .slice(1)
    .reduce<AlignedRhythmStructure>(
      (previousStructureResult, someBasicStructure) => {
        const nextStructureResult: AlignedRhythmStructure = {
          structureType: "initial",
          rhythmResolution: someBasicStructure.rhythmResolution,
          subStructure: {
            structureType: "interposed",
            rhythmDensity: someBasicStructure.rhythmDensity,
            rhythmOrientation: someBasicStructure.rhythmOrientation,
            subStructure: previousStructureResult.subStructure,
          },
        };
        return nextStructureResult;
      },
      initialStructureResult
    );
}
