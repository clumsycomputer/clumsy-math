import {
  PhasedRhythmStructure,
  euclidRhythm,
  Rhythm,
  rhythm,
} from "clumsy-math";
import { JSX } from "preact";

export function RhythmToyPage() {
  const [resolutionA, ...layersA]: PhasedRhythmStructure = [
    40,
    [19, 0, 0],
    [11, 0, 0],
    [7, 0, 0],
  ];
  const cellPadding = 0.005;
  const cellStepX = 1 / resolutionA;
  const cellStepY = 1 / layersA.length;
  const cellWidth = cellStepX - 2 * cellPadding;
  const cellHeight = cellStepY - 2 * cellPadding;
  const rhythmCellElements: Array<JSX.Element> = [];
  let baseRhythm: Rhythm | null = null;
  for (let layerIndex = 0; layerIndex < layersA.length; layerIndex++) {
    const rhythmLayer = layersA[layerIndex]!;
    if (layerIndex === 0) {
      const layerRhythm = euclidRhythm(resolutionA, ...rhythmLayer);
      baseRhythm = layerRhythm;
    } else {
      const layerRhythm = euclidRhythm(
        baseRhythm!.points.length,
        ...rhythmLayer
      );
      baseRhythm!.points = layerRhythm.points.map(
        (someLayerPoint) => baseRhythm!.points[someLayerPoint]!
      );
    }
    for (const layerPoint of baseRhythm!.points) {
      rhythmCellElements.push(
        <rect
          x={cellStepX * layerPoint + cellPadding}
          y={cellStepY * layerIndex + cellPadding}
          width={cellWidth}
          height={cellHeight}
        />
      );
    }
  }
  return (
    <div>
      <svg viewBox={"-0.05 -0.05 1.1 1.1"}>
        <rect x={-1.25} y={-1.25} width={2.5} height={2.5} fill={"lightgrey"} />
        {rhythmCellElements}
      </svg>
    </div>
  );
}
