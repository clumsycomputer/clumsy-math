import { euclidRhythm } from "clumsy-math";

export function RhythmToyPage() {
  const rhythmA = euclidRhythm(12, 7, 0, 0);
  const rhythmCircleElements: Array<preact.JSX.Element> = [];
  for (let slotIndex = 0; slotIndex < rhythmA.resolution; slotIndex++) {
    const slotAngle =
      ((2 * Math.PI) / rhythmA.resolution) * slotIndex - Math.PI / 2;
    rhythmCircleElements.push(
      <circle
        r={0.04}
        cx={Math.cos(slotAngle)}
        cy={Math.sin(slotAngle)}
        fill={"transparent"}
        stroke={"black"}
        stroke-width={0.0075}
      />
    );
  }
  for (const rhythmPoint of rhythmA.points) {
    const slotAngle =
      ((2 * Math.PI) / rhythmA.resolution) * rhythmPoint - Math.PI / 2;
    rhythmCircleElements.push(
      <circle
        r={0.02}
        cx={Math.cos(slotAngle)}
        cy={Math.sin(slotAngle)}
        fill={"transparent"}
        stroke={"black"}
        stroke-width={0.0075}
      />
    );
  }
  return (
    <div>
      <svg viewBox={"-1.25 -1.25 2.5 2.5"}>
        <rect x={-1.25} y={-1.25} width={2.5} height={2.5} fill={"lightgrey"} />
        {rhythmCircleElements}
      </svg>
    </div>
  );
}
