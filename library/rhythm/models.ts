import {
  ExtractInitialStructure,
  ExtractInterposedStructure,
  ExtractTerminalStructure,
  RecursiveSpatialStructure,
} from "../general/models";

export type Rhythm = Array<boolean>;

export type PhasedRhythmStructure = RhythmStructure<{ rhythmPhase: number }>;

export type InitialPhasedRhythmStructure =
  ExtractInitialStructure<PhasedRhythmStructure>;

export type InterposedPhaseRhythmStructure =
  ExtractInterposedStructure<PhasedRhythmStructure>;

export type TerminalPhaseRhythmStructure =
  ExtractTerminalStructure<PhasedRhythmStructure>;

export type AlignedRhythmStructure = RhythmStructure;

export type InitialAlignedRhythmStructure =
  ExtractInitialStructure<AlignedRhythmStructure>;

export type InterposedAlignedRhythmStructure =
  ExtractInterposedStructure<AlignedRhythmStructure>;

export type TerminalAlignedRhythmStructure =
  ExtractTerminalStructure<AlignedRhythmStructure>;

type RhythmStructure<
  BaseRhythmStructureExtension extends Record<string, unknown> = {}
> = RecursiveSpatialStructure<
  { rhythmResolution: number },
  BaseRhythmStructureExtension,
  {
    rhythmDensity: number;
    rhythmOrientation: number;
  }
>;
