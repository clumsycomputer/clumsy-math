import React from "react";
import { AnimationModule } from "clumsy-graphics";
import { Fragment } from "react";

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
  return (
    <svg viewBox={`0 0 100 100`}>
      <rect x={0} y={0} width={100} height={100} fill={"black"} />
    </svg>
  );
}
