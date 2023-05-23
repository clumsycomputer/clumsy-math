import { RhythmStructure, euclidRhythm, Rhythm } from "clumsy-math";
import { JSX } from "preact";

export function RhythmToyPage() {
  const structureA: RhythmStructure = [
    [48, 29, 0, 0],
    [11, 0, 0],
  ];
  const rhythmCellElements: Array<JSX.Element> = [];
  let baseRhythm: Rhythm | null = null;
  const cellStep = 1 / structureA[0][0];
  const relativeCellPadding = 0.125;
  const cellPadding = cellStep * relativeCellPadding;
  const cellSize = cellStep - 2 * cellPadding;
  for (let layerIndex = 0; layerIndex < structureA.length; layerIndex++) {
    const rhythmLayer = structureA[layerIndex]!;
    if (rhythmLayer.length === 4) {
      const layerRhythm = euclidRhythm(...rhythmLayer);
      baseRhythm = layerRhythm;
    } else if (rhythmLayer.length === 3) {
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
          x={cellStep * layerPoint + cellPadding}
          y={cellStep * layerIndex + cellPadding}
          width={cellSize}
          height={cellSize}
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
