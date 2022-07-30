import {
  ExtractInitialStructure,
  ExtractInterposedStructure,
  ExtractTerminalStructure,
  RecursiveSpatialStructure,
} from "../general/models";

export type Rhythm = Array<boolean>;

export interface RhythmMap extends Pick<RhythmStructure, "rhythmResolution"> {
  rhythmPoints: RhythmPoints;
}

export type RhythmPoints = Array<number>;

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

export type GeneralRhythmStructure = Array<BasicRhythmStructure>;

export type BasicRhythmStructure = Pick<
  InitialPhasedRhythmStructure,
  "rhythmResolution"
> &
  Pick<
    InterposedPhaseRhythmStructure,
    "rhythmDensity" | "rhythmOrientation" | "rhythmPhase"
  >;

export type EuclideanRhythmStructure = Pick<
  BasicRhythmStructure,
  "rhythmResolution" | "rhythmDensity"
>;
