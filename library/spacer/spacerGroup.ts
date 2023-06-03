import {
  AlignedEuclidSpacerLayer,
  AlignedRecursiveEuclidSpacerStructure,
  SpacerGroupBaseStructure,
  SpacerGroupStructure,
} from "./encodings";

/**
 * great for defining a set of related spacers at a desired altitude / scope
 *
 * @example
 * ```typescript
 * const groupA = spacerGroup([[5], [3]])
 * // groupA === [
 * //   [5, [3, 0]],
 * //   [5, [3, 1]],
 * //   [5, [3, 2]]
 * // ]
 * ```
 */
export function spacerGroup(
  someSpacerGroupStructure: SpacerGroupStructure
): Array<AlignedRecursiveEuclidSpacerStructure> {
  const [baseStructure, memberStructure] = someSpacerGroupStructure;
  const [groupResolution, ...groupBaseLayers] = baseStructure;
  const spacerGroupResult: Array<AlignedRecursiveEuclidSpacerStructure> = [];
  const iterationStack = memberStructure.map<
    [orientationIndex: number, layerDensity: number]
  >((currentLayerDensity) => [0, currentLayerDensity]);
  while (iterationStack.length > 0) {
    if (iterationStack.length === memberStructure.length) {
      const clonedBaseStructure: SpacerGroupBaseStructure = [
        groupResolution,
        ...groupBaseLayers.map<AlignedEuclidSpacerLayer>((currentBaseLayer) => [
          ...currentBaseLayer,
        ]),
      ];
      spacerGroupResult.push(
        iterationStack.reduce<AlignedRecursiveEuclidSpacerStructure>(
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
  return spacerGroupResult;
}

/**
 * great for logging and working with datasets of spacer groups
 *
 * @example
 * ```typescript
 * const groupIdA = spacerGroupId([[5, [3, 1]], [2]])
 * // groupIdA === "group___5__3_1___2"
 * ```
 */
export function spacerGroupId(
  someSpacerGroupStructure: SpacerGroupStructure
): string {
  const [baseStructure, memberStructure] = someSpacerGroupStructure;
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
