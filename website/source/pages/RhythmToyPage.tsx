import { euclidRhythm } from "clumsy-math";
import { Fragment } from "preact/jsx-runtime";

export function RhythmToyPage() {
  return (
    <div>
      <svg viewBox={"-1.25 -1.25 2.5 2.5"}>
        <rect x={-1.25} y={-1.25} width={2.5} height={2.5} fill={"lightgrey"} />
        {euclidRhythm(48, 11).map((rhythmSlot, slotIndex, baseRhythm) => {
          const slotAngle =
            ((2 * Math.PI) / baseRhythm.length) * slotIndex - Math.PI / 2;
          return (
            <Fragment>
              <circle
                r={0.04}
                cx={Math.cos(slotAngle)}
                cy={Math.sin(slotAngle)}
                fill={"transparent"}
                stroke={"black"}
                stroke-width={0.0075}
              />
              {rhythmSlot === true ? (
                <circle
                  r={0.03}
                  cx={Math.cos(slotAngle)}
                  cy={Math.sin(slotAngle)}
                  fill={"black"}
                />
              ) : null}
            </Fragment>
          );
        })}
      </svg>
    </div>
  );
}
