export type LoopStructure = Array<LoopLayer>;

export type LoopLayer = [
  relativeSubLoopRadius: RelativeSubLoopRadius,
  relativeSubLoopDepth: RelativeSubLoopDepth,
  subPhase: SubLoopPhase,
  subOrientation: SubLoopOrientation,
  loopRotation: LoopRotation
];

export type LoopPoint = [
  x: number,
  y: number,
  baseX: number,
  baseY: number,
  terminalX: number,
  terminalY: number,
  originX: number,
  originY: number
];

export type RelativeSubLoopRadius = number;

export type RelativeSubLoopDepth = number;

export type SubLoopPhase = number;

export type SubLoopOrientation = number;

export type LoopRotation = number;

export type LoopSine = number;

export type LoopCosine = number;

export type LoopPendulum = number;
