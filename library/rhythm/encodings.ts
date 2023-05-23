export type AlignedRhythmStructure = RhythmStructure<
  [RhythmDensity, RhythmOrientation]
>;

export type PhasedRhythmStructure = RhythmStructure<
  [RhythmDensity, RhythmOrientation, RhythmPhase]
>;

type RhythmStructure<
  RhythmLayer extends [RhythmDensity, RhythmOrientation, ...Array<number>]
> = [RhythmResolution, RhythmLayer, ...Array<RhythmLayer>];

type RhythmResolution = number;
type RhythmDensity = number;
type RhythmOrientation = number;
type RhythmPhase = number;

export interface Rhythm {
  resolution: number;
  points: Array<number>;
}

export type RhythmSequence = Array<boolean>;
