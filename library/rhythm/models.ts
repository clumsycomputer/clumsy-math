import {
  ExtractInitialStructure,
  ExtractInterposedStructure,
  ExtractTerminalStructure,
  RecursiveSpatialStructure,
} from "../general/models";

export type Rhythm = Array<boolean>;

export interface RhythmMap extends Pick<RhythmStructure, "rhythmResolution"> {
  rhythmPoints: Array<number>;
}

export type PhasedRhythmStructure = RhythmStructure<{ rhythmPhase: number }>;

export type PhasedInitialRhythmStructure =
  ExtractInitialStructure<PhasedRhythmStructure>;

export type PhasedInterposedRhythmStructure =
  ExtractInterposedStructure<PhasedRhythmStructure>;

export type PhasedTerminalRhythmStructure =
  ExtractTerminalStructure<PhasedRhythmStructure>;

export type AlignedRhythmStructure = RhythmStructure;

export type AlignedInitialRhythmStructure =
  ExtractInitialStructure<AlignedRhythmStructure>;

export type AlignedInterposedRhythmStructure =
  ExtractInterposedStructure<AlignedRhythmStructure>;

export type AlignedTerminalRhythmStructure =
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

export type InitialRhythmStructure =
  ExtractInitialStructure<AlignedRhythmStructure>;

export type InterposedRhythmStructure =
  ExtractInterposedStructure<AlignedRhythmStructure>;

export type TerminalRhythmStructure =
  ExtractTerminalStructure<AlignedRhythmStructure>;

export type GeneralRhythmStructure = Array<BasicRhythmStructure>;

export type BasicRhythmStructure = Pick<
  PhasedInitialRhythmStructure,
  "rhythmResolution"
> &
  Pick<
    PhasedInterposedRhythmStructure,
    "rhythmDensity" | "rhythmOrientation" | "rhythmPhase"
  >;

export type EuclideanRhythmStructure = Pick<
  BasicRhythmStructure,
  "rhythmResolution" | "rhythmDensity"
>;

export interface AlignedRhythmGroupStructure {
  baseStructure: AlignedRhythmGroupBaseStructure;
  memberStructure: AlignedRhythmGroupMemberStructure;
}

export type AlignedRhythmGroupBaseStructure = Pick<
  AlignedRhythmStructure,
  "structureType" | "rhythmResolution"
> & {
  subStructure?: InterposedAlignedRhythmGroupBaseStructure;
};

export type InterposedAlignedRhythmGroupBaseStructure = Pick<
  AlignedInterposedRhythmStructure,
  "structureType" | "rhythmDensity" | "rhythmOrientation"
> & {
  subStructure?: InterposedAlignedRhythmGroupBaseStructure;
};

export type AlignedRhythmGroupMemberStructure =
  | InterposedAlignedRhythmGroupMemberStructure
  | TerminalAlignedRhythmGroupMemberStructure;

export type InterposedAlignedRhythmGroupMemberStructure = Pick<
  AlignedInterposedRhythmStructure,
  "structureType" | "rhythmDensity"
> & {
  subStructure:
    | InterposedAlignedRhythmGroupMemberStructure
    | TerminalAlignedRhythmGroupMemberStructure;
};

export type TerminalAlignedRhythmGroupMemberStructure = Pick<
  AlignedTerminalRhythmStructure,
  "structureType" | "rhythmDensity"
>;
