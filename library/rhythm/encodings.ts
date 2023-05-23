export type RhythmStructure = [RootRhythmLayer, ...Array<SubRhythmLayer>];

export type RootRhythmLayer = [
  resolution: number,
  density: number,
  orientation: number,
  phase: number
];

export type SubRhythmLayer = [
  density: number,
  orientation: number,
  phase: number
];

export interface Rhythm {
  resolution: number;
  points: Array<number>;
}

export type RhythmSequence = Array<boolean>;
