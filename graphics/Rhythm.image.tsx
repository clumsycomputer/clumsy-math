import React from "react";
import { AnimationModule } from "clumsy-graphics";
import { Fragment } from "react";
import { AlignedRhythmStructure } from "../library/rhythm/models";
import { getRhythmMap } from "../library/rhythm/getRhythmMap";
import { getGeneralRhythmStructure } from "../library/rhythm/getGeneralRhythmStructure";
import { getRhythmString } from "../library/rhythm/getRhythmString";
import { getAlignedRhythmId } from "../library/rhythm/getRhythmId";

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
  const rhythmStructure: AlignedRhythmStructure = {
    structureType: "initial",
    rhythmResolution: 12,
    subStructure: {
      structureType: "interposed",
      rhythmDensity: 7,
      rhythmOrientation: 1,
      subStructure: {
        structureType: "terminal",
        rhythmDensity: 3,
        rhythmOrientation: 1,
      },
    },
  };
  const rhythmMap = getRhythmMap({
    someGeneralRhythmStructure: getGeneralRhythmStructure({
      someRhythmStructure: rhythmStructure,
    }),
  });
  console.log(
    JSON.stringify(
      {
        rhythmId: getAlignedRhythmId({
          someAlignedRhythmStructure: rhythmStructure,
        }),
        rhythmStructure,
        rhythmMap: {
          ...rhythmMap,
          rhythmPoints: rhythmMap.rhythmPoints.join(","),
        },
        rhythmString: getRhythmString({
          someRhythmMap: rhythmMap,
        }),
      },
      null,
      2
    )
  );
  return (
    <svg viewBox={`0 0 100 100`}>
      <rect x={0} y={0} width={100} height={100} fill={"black"} />
    </svg>
  );
}
