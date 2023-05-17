export type LoopStructure = Array<LoopLayer>;

export type LoopLayer = [
  relativeSubRadius: number,
  relativeSubDepth: number,
  subPhase: number,
  subOrientation: number,
  loopRotation: number
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
