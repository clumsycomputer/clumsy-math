import { throwInvalidPathError } from "../utilities/throwInvalidPathError";
import {
  AlignedEuclidRhythmStructure,
  RecursiveEuclidRhythm,
  RecursiveEuclidRhythmStructure,
  RhythmDensity,
  RhythmGroupMemberStructure,
  RhythmGroupStructure,
  RhythmOrientation,
  RhythmPhase,
  RhythmResolution,
} from "./encodings";
import { euclidRhythm } from "./euclidRhythm";

/**
 * primary function for working with rhythm
 */
export function rhythm(
  someRhythmStructure: RecursiveEuclidRhythmStructure
): RecursiveEuclidRhythm {
  const [rhythmResolution, rootLayer, ...subLayers] = someRhythmStructure;
  const resultRhythm = euclidRhythm(
    rhythmResolution,
    rootLayer[0],
    rootLayer[1],
    rootLayer[2] ?? 0
  );
  for (const currentSubLayer of subLayers) {
    const layerRhythm = euclidRhythm(
      resultRhythm.points.length,
      currentSubLayer[0],
      currentSubLayer[1],
      currentSubLayer[2] ?? 0
    );
    resultRhythm.points = layerRhythm.points.map(
      (someLayerPoint) =>
        resultRhythm.points[someLayerPoint] ??
        throwInvalidPathError("rhythm/layerRhythm")
    );
  }
  return resultRhythm;
}

/**
 * great for logging and working with datasets of rhythm structures
 */
export function rhythmId(
  someRhythmStructure: RecursiveEuclidRhythmStructure
): string {
  const rhythmType =
    someRhythmStructure[1].length === 2
      ? "aligned"
      : someRhythmStructure[1].length === 3
      ? "phased"
      : throwInvalidPathError("rhythmId");
  const [rhythmResolution, ...rhythmLayers]: [
    RhythmResolution,
    ...Array<Array<RhythmDensity | RhythmOrientation | RhythmPhase>>
  ] = someRhythmStructure;
  return rhythmLayers.reduce(
    (resultId, someRhythmLayer) => `${resultId}__${someRhythmLayer.join("_")}`,
    `${rhythmType}__${rhythmResolution}`
  );
}

/**
 * great for destructuring a rhythm structure
 */
export function rhythmComponents<
  SomeRhythmStructure extends RecursiveEuclidRhythmStructure
>(someRhythmStructure: SomeRhythmStructure): Array<SomeRhythmStructure> {
  const [rhythmResolution, ...rhythmLayers] = someRhythmStructure;
  return rhythmLayers.map(
    (_, layerIndex) =>
      [
        rhythmResolution,
        ...rhythmLayers
          .slice(0, layerIndex + 1)
          .map((someRhythmLayer) => [...someRhythmLayer]),
      ] as SomeRhythmStructure
  );
}

/**
 * great for getting related rhythms at a given altitude / scope / lineageIndex
 */
export function rhythmLineage(
  someAlignedRhythmStructure: AlignedEuclidRhythmStructure
): Array<RhythmGroupStructure> {
  const [rhythmResolution, ...alignedRhythmLayers] = someAlignedRhythmStructure;
  return alignedRhythmLayers.map<RhythmGroupStructure>((_, layerIndex) => [
    [
      rhythmResolution,
      ...alignedRhythmLayers
        .slice(0, layerIndex)
        .map((someAlignedRhythmLayer) => someAlignedRhythmLayer),
    ],
    alignedRhythmLayers
      .slice(layerIndex)
      .map(
        (someAlignedRhythmLayer) => someAlignedRhythmLayer[0]
      ) as RhythmGroupMemberStructure,
  ]);
}
