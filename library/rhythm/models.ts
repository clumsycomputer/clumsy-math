import { RecursiveSpatialStructure } from "../general/models";

export type Rhythm = Array<boolean>;

export type PhasedRhythmStructure = RhythmStructure<{ rhythmPhase: number }>;

export type AlignedRhythmStructure = RhythmStructure;

export type RhythmStructure<
  BaseRhythmStructureExtension extends Record<string, unknown> = {}
> = RecursiveSpatialStructure<
  { rhythmResolution: number },
  BaseRhythmStructureExtension,
  {
    rhythmDensity: number;
    rhythmOrientation: number;
  }
>;
