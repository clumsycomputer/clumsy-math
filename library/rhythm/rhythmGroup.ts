import {
  AlignedEuclidRhythmLayer,
  AlignedRecursiveEuclidRhythmStructure,
  RhythmGroupBaseStructure,
  RhythmGroupStructure,
} from "./encodings";

/**
 * great for defining a set of related rhythms at a desired altitude / scope
 *
 * @example
 * ```typescript
 * const groupA = rhythmGroup([[5], [3]])
 * // groupA === [
 * //   [5, [3, 0]],
 * //   [5, [3, 1]],
 * //   [5, [3, 2]]
 * // ]
 * ```
 */
export function rhythmGroup(
  someRhythmGroupStructure: RhythmGroupStructure
): Array<AlignedRecursiveEuclidRhythmStructure> {
  const [baseStructure, memberStructure] = someRhythmGroupStructure;
  const [groupResolution, ...groupBaseLayers] = baseStructure;
  const rhythmGroupResult: Array<AlignedRecursiveEuclidRhythmStructure> = [];
  const iterationStack = memberStructure.map<
    [orientationIndex: number, layerDensity: number]
  >((currentLayerDensity) => [0, currentLayerDensity]);
  while (iterationStack.length > 0) {
    if (iterationStack.length === memberStructure.length) {
      const clonedBaseStructure: RhythmGroupBaseStructure = [
        groupResolution,
        ...groupBaseLayers.map<AlignedEuclidRhythmLayer>((currentBaseLayer) => [
          ...currentBaseLayer,
        ]),
      ];
      rhythmGroupResult.push(
        iterationStack.reduce<AlignedRecursiveEuclidRhythmStructure>(
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

/**
 * great for logging and working with datasets of rhythm groups
 *
 * @example
 * ```typescript
 * const groupIdA = rhythmGroupId([[5, [3, 1]], [2]])
 * // groupIdA === "group___5__3_1___2"
 * ```
 */
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
