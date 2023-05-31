import { throwInvalidPathError } from "../utilities/throwInvalidPathError";
import {
  AlignedRhythmLayer,
  AlignedRhythmStructure,
  PhasedRhythmStructure,
  Rhythm,
  RhythmGroupMemberStructure,
  RhythmGroupStructure,
  RecursiveRhythmStructure,
} from "./encodings";
import { euclidRhythm } from "./euclidRhythm";

/**
 * computes RecursiveEuclidRhythm from RecursiveRhythmStructure
 *
 * @example
 * ```typescript
 * const rhythmA = rhythm([
 *   5, [3, 0], [2, 1]
 * ])
 * // rhythmA === {
 * //   resolution: 5,
 * //   points: [0, 3]
 * // }
 * ```
 *
 * @attributes
 * domain: rhythm | type: function | name: rhythm
 */
export function rhythm(
  someRhythmStructure: AlignedRhythmStructure | PhasedRhythmStructure
): Rhythm {
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

export function rhythmId<
  SomeRhythmStructure extends AlignedRhythmStructure | PhasedRhythmStructure
>(someRhythmStructure: SomeRhythmStructure): string {
  const rhythmType =
    someRhythmStructure[1].length === 2
      ? "aligned"
      : someRhythmStructure[1].length === 3
      ? "phased"
      : throwInvalidPathError("rhythmId");
  const [rhythmResolution, ...rhythmLayers]: [number, ...Array<Array<number>>] =
    someRhythmStructure;
  return rhythmLayers.reduce(
    (resultId, someRhythmLayer) => `${resultId}__${someRhythmLayer.join("_")}`,
    `${rhythmType}__${rhythmResolution}`
  );
}

export function rhythmComponents<
  SomeRhythmStructure extends RecursiveRhythmStructure<Array<number>>
>(someRhythmStructure: SomeRhythmStructure): Array<SomeRhythmStructure> {
  const [rhythmResolution, ...rhythmLayers] = someRhythmStructure;
  return rhythmLayers.map((_, layerIndex) => {
    const currentComponentResult = [
      rhythmResolution,
    ] as unknown as SomeRhythmStructure;
    for (
      let componentLayerIndex = 0;
      componentLayerIndex <= layerIndex;
      componentLayerIndex++
    ) {
      const currentLayer = rhythmLayers[componentLayerIndex]!;
      currentComponentResult.push([...currentLayer]);
    }
    return currentComponentResult;
  });
}

export function rhythmLineage(
  someAlignedRhythmStructure: AlignedRhythmStructure
): Array<RhythmGroupStructure> {
  const [rhythmResolution, ...alignedRhythmLayers] = someAlignedRhythmStructure;
  return alignedRhythmLayers.map<RhythmGroupStructure>((_, layerIndex) => {
    const baseLayers: Array<AlignedRhythmLayer> = [];
    for (
      let baseLayerIndex = 0;
      baseLayerIndex < layerIndex;
      baseLayerIndex++
    ) {
      baseLayers.push([...alignedRhythmLayers[baseLayerIndex]!]);
    }
    const memberLayers = [] as unknown as RhythmGroupMemberStructure;
    for (
      let memberLayerIndex = layerIndex;
      memberLayerIndex < alignedRhythmLayers.length;
      layerIndex++
    ) {
      memberLayers.push(alignedRhythmLayers[memberLayerIndex]![0]);
    }
    return [[rhythmResolution, ...baseLayers], memberLayers];
  });
}
