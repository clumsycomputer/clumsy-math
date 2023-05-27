/**
 * the defacto encoding for working with rhythm
 */
export interface Rhythm {
  resolution: RhythmResolution;
  points: Array<RhythmPoint>;
}

/**
 * lossless encoding for rhythm
 */
export type RhythmMap = Array<RhythmSlot>;

export type RhythmString = string;

/**
 * a rhythm's building block
 */
export type RhythmSlot = boolean;

/**
 * the index of a slot whose value is true (1)
 *
 * @concept
 */
export type RhythmPoint = number;

/**
 * the number of slots in a rhythm
 */
export type RhythmResolution = number;

/**
 * the number of points in a rhythm
 */
export type RhythmDensity = number;

/**
 * the offset of a rhythm, measured in slots, relative to a base rhythm
 */
export type RhythmPhase = number;

/**
 * the offset of an aligned rhythm, measured in points, relative to a base rhythm
 */
export type RhythmOrientation = number;

/**
 * starting at a base point, the distance upto the next point
 */
export type RhythmInterval = number;

/**
 * a point whose value is normalized within the range of [0, 1)
 */
export type RelativeRhythmPoint = number;

export type RhythmSlotWeight = number;

export type RhythmPointWeight = number;

export type RhythmWeight = number;

export type AlignedRhythmStructure =
  RecursiveRhythmStructure<AlignedRhythmLayer>;

export type AlignedRhythmLayer = [
  density: RhythmDensity,
  orientation: RhythmOrientation
];

export type PhasedRhythmStructure = RecursiveRhythmStructure<PhasedRhythmLayer>;

export type PhasedRhythmLayer = [
  density: RhythmDensity,
  orientation: RhythmOrientation,
  phase: RhythmPhase
];

export type RecursiveRhythmStructure<RhythmLayer extends Array<number>> = [
  RhythmResolution,
  RhythmLayer,
  ...Array<RhythmLayer>
];

export type RhythmGroupStructure = [
  baseStructure: RhythmGroupBaseStructure,
  memberStructure: RhythmGroupMemberStructure
];

export type RhythmGroupBaseStructure = [
  RhythmResolution,
  ...Array<AlignedRhythmLayer>
];

export type RhythmGroupMemberStructure = [
  RhythmDensity,
  ...Array<RhythmDensity>
];
