import {
  InterposedSpatialStructureBase,
  RecursiveSpatialStructure,
  TerminalSpatialStructureBase,
} from "../general/models";

export type Rhythm = Array<boolean>;

export type RhythmPoints = Array<number>;

export interface RhythmMap extends Pick<RhythmStructure, "rhythmResolution"> {
  rhythmPoints: RhythmPoints;
}

export interface RhythmStructure
  extends RecursiveSpatialStructure<
      InterposedRhythmStructure,
      TerminalRhythmStructure
    >,
    BaseRhythmStructureBase {
  rhythmResolution: number;
}

export interface InterposedRhythmStructure
  extends InterposedSpatialStructureBase<
      InterposedRhythmStructure | TerminalRhythmStructure
    >,
    BaseRhythmStructureBase,
    SubRhythmStructureBase {}

export interface TerminalRhythmStructure
  extends TerminalSpatialStructureBase,
    SubRhythmStructureBase {}

interface BaseRhythmStructureBase {
  rhythmPhase: number;
}

interface SubRhythmStructureBase {
  rhythmDensity: number;
  rhythmOrientation: number;
}

export interface BasicRhythmStructure
  extends Pick<RhythmStructure, "rhythmResolution">,
    Pick<BaseRhythmStructureBase, "rhythmPhase">,
    SubRhythmStructureBase {}
