import { throwInvalidPathError } from "../utilities/throwInvalidPathError";
import {
  AlignedRhythmStructure,
  PhasedRhythmStructure,
  Rhythm,
} from "./encodings";
import { euclidRhythm } from "./euclidRhythm";

export function rhythm<
  SomeRhythmStructure extends AlignedRhythmStructure | PhasedRhythmStructure
>(someRhythmStructure: SomeRhythmStructure): Rhythm {
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
