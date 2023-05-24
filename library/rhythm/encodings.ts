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

export type RhythmStructure<RhythmLayer extends Array<number>> = [
  RhythmResolution,
  RhythmLayer,
  ...Array<RhythmLayer>
];

type RhythmResolution = number;

export type RhythmGroupStructure = [
  baseStructure: RhythmGroupBaseStructure,
  memberStructure: RhythmGroupMemberStructure
];

export type RhythmGroupBaseStructure = [
  RhythmResolution,
  ...Array<AlignedRhythmLayer>
];

export type RhythmGroupMemberStructure = [number, ...Array<number>];
