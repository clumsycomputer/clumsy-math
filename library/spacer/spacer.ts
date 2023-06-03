import { throwInvalidPathError } from "../utilities/throwInvalidPathError";
import {
  AlignedRecursiveEuclidSpacerStructure,
  RecursiveEuclidSpacer,
  RecursiveEuclidSpacerStructure,
  SpacerDensity,
  SpacerGroupMemberStructure,
  SpacerGroupStructure,
  SpacerOrientation,
  SpacerPhase,
  SpacerResolution,
} from "./encodings";
import { euclidSpacer } from "./euclidSpacer";

/**
 * primary function for working with spacer
 *
 * @example
 * ```typescript
 * const spacerA = spacer([5, [3, 1, 0]])
 * // const spacerA === [5, [0, 2, 4]]
 * ```
 */
export function spacer(
  someSpacerStructure: RecursiveEuclidSpacerStructure
): RecursiveEuclidSpacer {
  const [spacerResolution, rootLayer, ...subLayers] = someSpacerStructure;
  const resultSpacer = euclidSpacer(
    spacerResolution,
    rootLayer[0],
    rootLayer[1],
    rootLayer[2] ?? 0
  );
  for (const currentSubLayer of subLayers) {
    const layerSpacer = euclidSpacer(
      resultSpacer[1].length,
      currentSubLayer[0],
      currentSubLayer[1],
      currentSubLayer[2] ?? 0
    );
    resultSpacer[1] = layerSpacer[1].map(
      (someLayerPoint) =>
        resultSpacer[1][someLayerPoint] ??
        throwInvalidPathError("spacer/layerSpacer")
    );
  }
  return resultSpacer;
}

/**
 * great for logging and working with datasets of spacer structures
 *
 * @example
 * ```typescript
 * const idA = spacerId([5, [3, 1, 0]])
 * // const idA === "phased__5__3_1_0"
 * ```
 */
export function spacerId(
  someSpacerStructure: RecursiveEuclidSpacerStructure
): string {
  const spacerType =
    someSpacerStructure[1].length === 2
      ? "aligned"
      : someSpacerStructure[1].length === 3
      ? "phased"
      : throwInvalidPathError("spacerId");
  const [spacerResolution, ...spacerLayers]: [
    SpacerResolution,
    ...Array<Array<SpacerDensity | SpacerOrientation | SpacerPhase>>
  ] = someSpacerStructure;
  return spacerLayers.reduce(
    (resultId, someSpacerLayer) => `${resultId}__${someSpacerLayer.join("_")}`,
    `${spacerType}__${spacerResolution}`
  );
}

/**
 * great for destructuring a spacer structure into its constituent spacers
 *
 * @example
 * ```typescript
 * const componentsA = spacerComponents([5, [3, 1, 0], [2, 0, 0]])
 * // const componentsA === [
 * //   [5, [3, 1, 0]], // baseSpacerStructure
 * //   [5, [3, 1, 0], [2, 0, 0]]
 * // ]
 * ```
 */
export function componentSpacers<
  SomeSpacerStructure extends RecursiveEuclidSpacerStructure
>(someSpacerStructure: SomeSpacerStructure): Array<SomeSpacerStructure> {
  const [spacerResolution, ...spacerLayers] = someSpacerStructure;
  return spacerLayers.map(
    (_, layerIndex) =>
      [
        spacerResolution,
        ...spacerLayers
          .slice(0, layerIndex + 1)
          .map((someSpacerLayer) => [...someSpacerLayer]),
      ] as SomeSpacerStructure
  );
}

/**
 * great for getting related spacers at a given altitude / scope / lineageIndex
 *
 * @example
 * ```typescript
 * const lineageA = spacerLineage([5, [3, 1], [2, 0]])
 * // lineageA === [
 * //   [[5], [3, 2]], // high-altitude or zoomed-out
 * //   [[5, [3, 1]], [2]] // low-altitude or zoomed-in
 * // ]
 * ```
 */
export function spacerLineage(
  someAlignedSpacerStructure: AlignedRecursiveEuclidSpacerStructure
): Array<SpacerGroupStructure> {
  const [spacerResolution, ...alignedSpacerLayers] = someAlignedSpacerStructure;
  return alignedSpacerLayers.map<SpacerGroupStructure>((_, layerIndex) => [
    [
      spacerResolution,
      ...alignedSpacerLayers
        .slice(0, layerIndex)
        .map((someAlignedSpacerLayer) => someAlignedSpacerLayer),
    ],
    alignedSpacerLayers
      .slice(layerIndex)
      .map(
        (someAlignedSpacerLayer) => someAlignedSpacerLayer[0]
      ) as SpacerGroupMemberStructure,
  ]);
}
