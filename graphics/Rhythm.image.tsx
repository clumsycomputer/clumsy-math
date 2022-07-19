import React from "react";
import { AnimationModule } from "clumsy-graphics";
import { Fragment } from "react";
import { Rhythm, RhythmMap } from "../library/rhythm/models";
import { Rectangle } from "../library/general/models";
import { getRhythmMap } from "../library/rhythm/getRhythmMap";

const RhythmImageModule: AnimationModule = {
  moduleName: "rhythm",
  frameCount: 1,
  getFrameDescription: getRhythmFrameDescription,
  frameSize: {
    width: 1024,
    height: 1024,
  },
  animationSettings: {
    frameRate: 9,
    constantRateFactor: 1,
  },
};

export default RhythmImageModule;

interface GetRhythmFrameDescriptionApi {
  frameCount: number;
  frameIndex: number;
}

async function getRhythmFrameDescription(api: GetRhythmFrameDescriptionApi) {
  const rhythmResolution = 12;
  const rhythmDensity = 7;
  return (
    <svg viewBox={`0 0 100 100`}>
      <rect x={0} y={0} width={100} height={100} fill={"black"} />
      {new Array(rhythmDensity)
        .fill(undefined)
        .map((_, someRhythmOrientation) => {
          return (
            <RhythmMapView
              viewRectangle={{
                x: 0,
                y: 10 * someRhythmOrientation,
                width: 100,
                height: 10,
              }}
              someRhythmMap={getRhythmMap({
                someRhythmStructure: {
                  structureType: "initial",
                  rhythmResolution: rhythmResolution,
                  rhythmPhase: 37,
                  subStructure: {
                    structureType: "terminal",
                    rhythmDensity: rhythmDensity,
                    rhythmOrientation: someRhythmOrientation,
                  },
                },
              })}
              cellPaddingMultiplier={4}
              outerColor={"white"}
              getInnerColor={() => "red"}
            />
          );
        })}
    </svg>
  );
}

interface RhythmMapViewProps {
  someRhythmMap: RhythmMap;
  viewRectangle: Rectangle;
  outerColor: string;
  getInnerColor: (someCellIndex: number) => string;
  cellPaddingMultiplier: number;
}

function RhythmMapView(props: RhythmMapViewProps) {
  const {
    viewRectangle,
    someRhythmMap,
    cellPaddingMultiplier,
    outerColor,
    getInnerColor,
  } = props;
  const minimumViewLength = Math.min(viewRectangle.width, viewRectangle.height);
  const cellPadding =
    (minimumViewLength / someRhythmMap.rhythmResolution / 5) *
    cellPaddingMultiplier;
  const displayPadding = cellPadding;
  const displayWidth = viewRectangle.width - 2 * displayPadding;
  const displayHeight = viewRectangle.height - 2 * displayPadding;
  const cellWidth = displayWidth / someRhythmMap.rhythmResolution;
  const cellHeight = displayHeight;
  const outerCellWidth = cellWidth - 2 * cellPadding;
  const outerCellHeight = cellHeight - 2 * cellPadding;
  const innerCellWidth = outerCellWidth - 2 * cellPadding;
  const innerCellHeight = outerCellHeight - 2 * cellPadding;
  return (
    <Fragment>
      {new Array(someRhythmMap.rhythmResolution)
        .fill(undefined)
        .map((_, someSlotIndex) => {
          return (
            <rect
              fill={outerColor}
              width={outerCellWidth}
              height={outerCellHeight}
              x={
                someSlotIndex * cellWidth +
                displayPadding +
                cellPadding +
                viewRectangle.x
              }
              y={displayPadding + cellPadding + viewRectangle.y}
            />
          );
        })}
      {someRhythmMap.rhythmPoints.map((someRhythmPoint) => {
        return (
          <rect
            width={innerCellWidth}
            height={innerCellHeight}
            x={
              someRhythmPoint * cellWidth +
              displayPadding +
              cellPadding +
              cellPadding +
              viewRectangle.x
            }
            y={displayPadding + cellPadding + cellPadding + viewRectangle.y}
            fill={getInnerColor(someRhythmPoint)}
          />
        );
      })}
    </Fragment>
  );
}
