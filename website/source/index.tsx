import { unitLoopPoint, LOOP_ONE, LOOP_ZERO, LoopStructure } from "clumsy-math";
import { useMemo, useState } from "preact/hooks";

export default () => {
  const [toyState, setToyState] = useState<{ loopStructure: LoopStructure }>({
    loopStructure: [
      [0.8, 0.5, Math.PI / 4, 0, 0],
      [0.9, 0.75, Math.PI / 2, 0, 0],
    ],
  });
  const { loopPolygonPoints, loopCircles } = useMemo(() => {
    const loopPointCount = 128;
    let loopPolygonPoints: string = "";
    const inputAngleStep = (2 * Math.PI) / loopPointCount;
    for (let i = 0; i < loopPointCount; i++) {
      const pointInputAngle = i * inputAngleStep;
      const currentLoopPoint = unitLoopPoint(
        toyState.loopStructure,
        pointInputAngle
      );
      loopPolygonPoints = `${loopPolygonPoints}${currentLoopPoint[0]},${currentLoopPoint[1]} `;
    }
    return {
      loopPolygonPoints,
      loopCircles: getLoopCircles({
        someLoopStructure: toyState.loopStructure,
      }),
    };
  }, [toyState.loopStructure]);
  return (
    <div>
      <svg viewBox={"-1.25 -1.25 2.5 2.5"}>
        <rect x={-1.25} y={-1.25} width={2.5} height={2.5} fill={"lightgrey"} />
        <circle
          cx={loopCircles[0]!.centerX}
          cy={loopCircles[0]!.centerY}
          r={0.015}
          fill={"black"}
        />
        {loopCircles.map((someLayerCircle) => {
          return (
            <circle
              cx={someLayerCircle.centerX}
              cy={someLayerCircle.centerY}
              r={someLayerCircle.radius}
              fill={"transparent"}
              stroke={"black"}
              stroke-width={0.02}
            />
          );
        })}
        <polygon
          fill={"transparent"}
          stroke={"yellow"}
          stroke-width={0.02}
          points={loopPolygonPoints}
        />
      </svg>
      {/* <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>radius:</div>
          <div>
            <input type={"number"} />
          </div>
        </div>
      </div> */}
    </div>
  );
};

interface GetLoopCirclesApi {
  someLoopStructure: LoopStructure;
}

function getLoopCircles(api: GetLoopCirclesApi): Array<LoopCircle> {
  const { someLoopStructure } = api;
  return someLoopStructure.reduce<Array<LoopCircle>>(
    (circlesResult, currentLoopLayer) => {
      const subCircleDepth = currentLoopLayer[1] * (1 - currentLoopLayer[0]);
      const decontextualizedCircle: LoopCircle = {
        radius: currentLoopLayer[0],
        centerX: subCircleDepth * Math.cos(currentLoopLayer[2]),
        centerY: subCircleDepth * Math.sin(currentLoopLayer[2]),
      };
      const baseCircle = circlesResult[0]!;
      const contextualCircle: LoopCircle = {
        radius: baseCircle.radius * decontextualizedCircle.radius,
        centerX:
          baseCircle.radius * decontextualizedCircle.centerX +
          baseCircle.centerX,
        centerY:
          baseCircle.radius * decontextualizedCircle.centerY +
          baseCircle.centerY,
      };
      circlesResult.unshift(contextualCircle);
      return circlesResult;
    },
    [{ radius: 1, centerX: 0, centerY: 0 }]
  );
}

interface LoopCircle {
  radius: number;
  centerX: number;
  centerY: number;
}
