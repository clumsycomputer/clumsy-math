import {
  AlignedRhythmLayer,
  AlignedRhythmStructure,
  RhythmGroupBaseStructure,
  RhythmGroupStructure,
} from "./encodings";

export function rhythmGroup(
  someRhythmGroupStructure: RhythmGroupStructure
): Array<AlignedRhythmStructure> {
  const [baseStructure, memberStructure] = someRhythmGroupStructure;
  const [groupResolution, ...groupBaseLayers] = baseStructure;
  const rhythmGroupResult: Array<AlignedRhythmStructure> = [];
  const iterationStack = memberStructure.map<
    [orientationIndex: number, layerDensity: number]
  >((currentLayerDensity) => [0, currentLayerDensity]);
  while (iterationStack.length > 0) {
    if (iterationStack.length === memberStructure.length) {
      const clonedBaseStructure: RhythmGroupBaseStructure = [
        groupResolution,
        ...groupBaseLayers.map<AlignedRhythmLayer>((currentBaseLayer) => [
          ...currentBaseLayer,
        ]),
      ];
      rhythmGroupResult.push(
        iterationStack.reduce<AlignedRhythmStructure>(
          (resultMember, someIterationLayer) => {
            resultMember.push([someIterationLayer[1], someIterationLayer[0]]);
            return resultMember;
          },
          clonedBaseStructure as any
        )
      );
    }
    const currentIterationLayer = iterationStack[iterationStack.length - 1]!;
    currentIterationLayer[0] += 1;
    if (currentIterationLayer[0] === currentIterationLayer[1]) {
      iterationStack.pop();
    } else if (iterationStack.length < memberStructure.length) {
      const nextLayerDensity = memberStructure[iterationStack.length]!;
      iterationStack.push([0, nextLayerDensity]);
    }
  }
  return rhythmGroupResult;
}

export function rhythmGroupId(
  someRhythmGroupStructure: RhythmGroupStructure
): string {
  const [baseStructure, memberStructure] = someRhythmGroupStructure;
  const [groupResolution, ...groupBaseLayers] = baseStructure;
  const baseIdPart = groupBaseLayers.reduce<string>(
    (baseIdResult, currentBaseLayer) => {
      return `${baseIdResult}__${currentBaseLayer[0]}_${currentBaseLayer[1]}`;
    },
    `group___${groupResolution}`
  );
  return memberStructure.reduce(
    (resultId, someMemberDensity) => `${resultId}__${someMemberDensity}`,
    `${baseIdPart}_`
  );
}