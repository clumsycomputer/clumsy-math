/**
 * defacto encoding for working with rhythm
 */
export interface Rhythm {
  resolution: RhythmResolution;
  points: Array<RhythmPoint>;
}

export type EuclidRhythm = Rhythm;

export type BasicEuclidRhythm = EuclidRhythm;

export type CoreEuclidRhythm = BasicEuclidRhythm;

export type RecursiveEuclidRhythm = Rhythm;

export type AlignedRecursiveEuclidRhythm = RecursiveEuclidRhythm;

export type PhasedRecursiveEuclidRhythm = RecursiveEuclidRhythm;

export type RecursiveEuclidRhythmStructure =
  | AlignedRecursiveEuclidRhythmStructure
  | PhasedRecursiveEuclidRhythmStructure;

export type AlignedRhythmStructure = AlignedRecursiveEuclidRhythmStructure;

export type AlignedRecursiveEuclidRhythmStructure =
  RecursiveEuclidRhythmStructureBase<AlignedEuclidRhythmLayer>;

export type AlignedEuclidRhythmLayer = [
  density: RhythmDensity,
  orientation: RhythmOrientation
];

export type PhaseRhythmStructure = PhasedRecursiveEuclidRhythmStructure;

export type PhasedRecursiveEuclidRhythmStructure =
  RecursiveEuclidRhythmStructureBase<PhasedEuclidRhythmLayer>;

export type PhasedEuclidRhythmLayer = [
  density: RhythmDensity,
  orientation: RhythmOrientation,
  phase: RhythmPhase
];

type RecursiveEuclidRhythmStructureBase<
  EuclidRhythmLayer extends Array<number>
> = [RhythmResolution, EuclidRhythmLayer, ...Array<EuclidRhythmLayer>];

export type RhythmMap = Array<RhythmSlot>;

export type EuclidRhythmMap = RhythmMap;

export type RhythmString = string;

export type RhythmSlot = boolean;

export type RhythmPoint = number;

export type RhythmResolution = number;

export type RhythmDensity = number;

export type RhythmPhase = number;

export type RhythmOrientation = number;

export type RhythmInterval = number;

export type RelativeRhythmPoint = number;

export type RhythmSlotWeight = number;

export type RhythmPointWeight = number;

export type RhythmWeight = number;

export type RhythmGroupStructure = [
  baseStructure: RhythmGroupBaseStructure,
  memberStructure: RhythmGroupMemberStructure
];

export type RhythmGroupBaseStructure = [
  RhythmResolution,
  ...Array<AlignedEuclidRhythmLayer>
];

export type RhythmGroupMemberStructure = [
  RhythmDensity,
  ...Array<RhythmDensity>
];
