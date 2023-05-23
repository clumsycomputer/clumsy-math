export type RhythmSequence = Array<boolean>;

export interface Rhythm {
  resolution: number;
  points: Array<number>;
}

export type AlignedRhythmStructure = RhythmStructure<AlignedRhythmLayer>;

export type AlignedRhythmLayer = [density: number, orientation: number];

export type PhasedRhythmStructure = RhythmStructure<PhasedRhythmLayer>;

export type PhasedRhythmLayer = [
  density: number,
  orientation: number,
  phase: number
];

type RhythmStructure<
  RhythmLayer extends AlignedRhythmLayer | PhasedRhythmLayer
> = [RhythmResolution, RhythmLayer, ...Array<RhythmLayer>];

type RhythmResolution = number;
