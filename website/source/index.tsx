import { unitLoopPoint, LOOP_ONE } from "clumsy-math";

export default () => {
  const loopPoints = new Array(128);
  const inputAngleStep = (2 * Math.PI) / loopPoints.length;
  for (let i = 0; i < loopPoints.length; i++) {
    loopPoints[i] = unitLoopPoint(
      [
        [0.9, LOOP_ONE, Math.PI / 8, 0, 0],
        [0.85, LOOP_ONE, Math.PI / 4, 0, 0],
      ],
      i * inputAngleStep
    );
  }
  return (
    <div>
      <svg viewBox={"-1.25 -1.25 2.5 2.5"}>
        <polygon
          stroke={"black"}
          stroke-width={0.02}
          fill={"transparent"}
          points={loopPoints.reduce((result, someLoopPoint) => {
            return `${result}${someLoopPoint[0]},${someLoopPoint[1]} `;
          }, "")}
        />
      </svg>
    </div>
  );
};
