import {
  ExtractInitialStructure,
  ExtractInterposedStructure,
  ExtractTerminalStructure,
  RecursiveSpatialStructure,
} from "../general/models";

export type Rhythm = Array<RhythmSlot>;

export type RhythmString = string;

export type RhythmSlot = boolean;

export type RhythmResolution = number;

export type RhythmDensity = number;

export type RhythmPoint = number;

export type RhythmPhase = number;

export type RhythmOrientation = number;

export type RhythmInterval = number;

export type RelativeRhythmPoint = number;

export type RhythmSlotWeight = number;

export type RhythmPointWeight = number;

export type RhythmWeight = number;

export type EuclideanRhythm = Rhythm;

export type RecursiveEuclideanRhythm = Rhythm;

export type AlignedRecursiveEuclideanRhythm = RecursiveEuclideanRhythm;

export type AlignedRecursiveEuclideanRhythmId = string;

export type PhasedRecursiveEuclideanRhythm = RecursiveEuclideanRhythm;

export type PhasedRecursiveEuclideanRhythmId = string;

export type RhythmGroup = Array<AlignedRhythmStructure>;

export type RhythmGroupId = string;

export type RhythmLineage = Array<RhythmGroupStructure>;

export interface RhythmMap
  extends Pick<RecursiveRhythmStructure, "rhythmResolution"> {
  rhythmPoints: Array<RhythmPoint>;
}

export type SimpleRhythmStructure = Pick<
  InitialPhasedRhythmStructure,
  "rhythmResolution"
> &
  Pick<InterposedPhasedRhythmStructure, "rhythmDensity">;

export type GeneralRhythmStructure = Pick<
  InitialPhasedRhythmStructure,
  "rhythmResolution"
> &
  Pick<
    InterposedPhasedRhythmStructure,
    "rhythmDensity" | "rhythmOrientation" | "rhythmPhase"
  >;

export type StackRhythmStructure = Array<GeneralRhythmStructure>;

export type PhasedRhythmStructure = RecursiveRhythmStructure<{
  rhythmPhase: RhythmPhase;
}>;

export type InitialPhasedRhythmStructure =
  ExtractInitialStructure<PhasedRhythmStructure>;

export type InterposedPhasedRhythmStructure =
  ExtractInterposedStructure<PhasedRhythmStructure>;

export type TerminalPhasedRhythmStructure =
  ExtractTerminalStructure<PhasedRhythmStructure>;

export type AlignedRhythmStructure = RecursiveRhythmStructure<{}>;

export type InitialAlignedRhythmStructure =
  ExtractInitialStructure<AlignedRhythmStructure>;

export type InterposedAlignedRhythmStructure =
  ExtractInterposedStructure<AlignedRhythmStructure>;

export type TerminalAlignedRhythmStructure =
  ExtractTerminalStructure<AlignedRhythmStructure>;

export type RecursiveRhythmStructure<
  BaseRhythmStructureExtension extends Record<string, unknown> = {}
> = RecursiveSpatialStructure<
  { rhythmResolution: RhythmResolution },
  BaseRhythmStructureExtension,
  {
    rhythmDensity: RhythmDensity;
    rhythmOrientation: RhythmOrientation;
  }
>;

export type PhasedRhythmComponent = RhythmComponent<PhasedRhythmStructure>;

export type AlignedRhythmComponent = RhythmComponent<AlignedRhythmStructure>;

export type RhythmComponent<
  SomeRecursiveRhythmStructure extends RecursiveRhythmStructure
> = SomeRecursiveRhythmStructure;

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
  ExtractInterposedStructure<AlignedRhythmStructure>,
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
