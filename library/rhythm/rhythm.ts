import { throwInvalidPathError } from "../utilities/throwInvalidPathError";
import { Rhythm, RhythmStructure } from "./encodings";
import { euclidRhythm } from "./euclidRhythm";

export function rhythm(someRhythmStructure: RhythmStructure): Rhythm {
  const [rootLayer, ...subLayers] = someRhythmStructure;
  const resultRhythm = euclidRhythm(...rootLayer);
  for (const currentSubLayer of subLayers) {
    const layerRhythm = euclidRhythm(
      resultRhythm.points.length,
      ...currentSubLayer
    );
    resultRhythm.points = layerRhythm.points.map(
      (someLayerPoint) =>
        resultRhythm.points[someLayerPoint] ??
        throwInvalidPathError("rhythm/layerRhythm")
    );
  }
  return resultRhythm;
}
