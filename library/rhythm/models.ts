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

export type InitialPhasedRhythmStructure =
  ExtractInitialStructure<PhasedRhythmStructure>;

export type InterposedPhasedRhythmStructure =
  ExtractInterposedStructure<PhasedRhythmStructure>;

export type TerminalPhasedRhythmStructure =
  ExtractTerminalStructure<PhasedRhythmStructure>;

export type AlignedRhythmStructure = RhythmStructure<{
  rhythmPhase?: undefined;
}>;

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

export type InitialRhythmStructure =
  ExtractInitialStructure<AlignedRhythmStructure>;

export type InterposedRhythmStructure =
  ExtractInterposedStructure<AlignedRhythmStructure>;

export type TerminalRhythmStructure =
  ExtractTerminalStructure<AlignedRhythmStructure>;

export type GeneralRhythmStructure = Array<BasicRhythmStructure>;

export type BasicRhythmStructure = Pick<
  InitialPhasedRhythmStructure,
  "rhythmResolution"
> &
  Pick<
    InterposedPhasedRhythmStructure,
    "rhythmDensity" | "rhythmOrientation" | "rhythmPhase"
  >;

export type EuclideanRhythmStructure = Pick<
  BasicRhythmStructure,
  "rhythmResolution" | "rhythmDensity"
>;

export interface RhythmGroupStructure {
  baseStructure: RhythmGroupBaseStructure;
  memberStructure: RhythmGroupMemberStructure;
}

export type RhythmGroupBaseStructure = Pick<
  AlignedRhythmStructure,
  "structureType" | "rhythmResolution"
> & {
  subStructure?: InterposedRhythmGroupBaseStructure;
};

export type InterposedRhythmGroupBaseStructure = Pick<
  InterposedRhythmStructure,
  "structureType" | "rhythmDensity" | "rhythmOrientation"
> & {
  subStructure?: InterposedRhythmGroupBaseStructure;
};

export type RhythmGroupMemberStructure =
  | InterposedRhythmGroupMemberStructure
  | TerminalRhythmGroupMemberStructure;

export type InterposedRhythmGroupMemberStructure = Pick<
  InterposedAlignedRhythmStructure,
  "structureType" | "rhythmDensity"
> & {
  subStructure:
    | InterposedRhythmGroupMemberStructure
    | TerminalRhythmGroupMemberStructure;
};

export type TerminalRhythmGroupMemberStructure = Pick<
  TerminalAlignedRhythmStructure,
  "structureType" | "rhythmDensity"
>;
