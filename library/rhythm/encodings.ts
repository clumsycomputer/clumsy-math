// rhythm attributes
//
//

/**
 * a boolean that's either true or false
 */
export type RhythmSlot = boolean;

/**
 * an integer in the range of [1,∞)
 */
export type RhythmResolution = number;

/**
 * an integer in the range of [0,rhythmResolution)
 */
export type RhythmPoint = number;

/**
 * an integer in the range of [0,rhythmResolution]
 */
export type RhythmDensity = number;

/**
 * an integer in the range of (-rhythmResolution,rhythmResolution)
 */
export type RhythmPhase = number;

/**
 * an integer in the range of [0,rhythmDensity)
 */
export type RhythmOrientation = number;

/**
 * a real number in the range of [0,1)
 */
export type RelativeRhythmPoint = number;

/**
 * an integer in the range of [1,rhythmResolution]
 */
export type RhythmInterval = number;

/**
 * an integer in the range of [0,∞)
 */
export type RhythmSlotWeight = number;

/**
 * an integer in the range of [0,∞)
 */
export type RhythmPointWeight = number;

/**
 * an integer in the range of [0,∞)
 */
export type RhythmWeight = number;

// rhythm types
//
//

/**
 * defacto encoding for working with {@link _RHYTHM_CONCEPT}
 */
export interface Rhythm {
  resolution: RhythmResolution;
  points: Array<RhythmPoint>;
}

/**
 * {@link _RHYTHM_CONCEPT|rhythm} as a string of 1's and 0's
 */
export type RhythmString = string;

/**
 * {@link _RHYTHM_CONCEPT|rhythm} as Array<boolean>
 */
export type RhythmMap = Array<RhythmSlot>;

/**
 * {@link _EUCLID_RHYTHM_CONCEPT|euclid rhythm} as {@link Rhythm}
 */
export type EuclidRhythm = Rhythm;

/**
 * {@link _EUCLID_RHYTHM_CONCEPT|euclid rhythm} as {@link RhythmMap}
 */
export type EuclidRhythmMap = RhythmMap;

/**
 * {@link _BASIC_EUCLID_RHYTHM_CONCEPT|basic euclid rhythm} as {@link Rhythm}
 */
export type BasicEuclidRhythm = EuclidRhythm;

/**
 * {@link _CORE_EUCLID_RHYTHM_CONCEPT|core euclid rhythm} as {@link Rhythm}
 */
export type CoreEuclidRhythm = BasicEuclidRhythm;

/**
 * {@link _RECURSIVE_EUCLID_RHYTHM_CONCEPT|recursive euclid rhythm} as {@link Rhythm}
 */
export type RecursiveEuclidRhythm = Rhythm;

/**
 * {@link _ALIGNED_RECURSIVE_EUCLID_RHYTHM_CONCEPT|aligned recursive euclid rhythm} as {@link Rhythm}
 */
export type AlignedRecursiveEuclidRhythm = RecursiveEuclidRhythm;

/**
 * {@link _PHASED_RECURSIVE_EUCLID_RHYTHM_CONCEPT|phased recursive euclid rhythm} as {@link Rhythm}
 */
export type PhasedRecursiveEuclidRhythm = RecursiveEuclidRhythm;

/**
 * useful encoding for either {@link AlignedRecursiveEuclidRhythmStructure} or {@link PhasedRecursiveEuclidRhythmStructure}
 */
export type RecursiveEuclidRhythmStructure =
  | AlignedRecursiveEuclidRhythmStructure
  | PhasedRecursiveEuclidRhythmStructure;

/**
 * ergonomic encoding for defining {@link _ALIGNED_RECURSIVE_EUCLID_RHYTHM_CONCEPT|aligned recursive euclid rhythm}
 */
export type AlignedRecursiveEuclidRhythmStructure =
  RecursiveEuclidRhythmStructureBase<AlignedEuclidRhythmLayer>;

/**
 * encoding for defining a {@link AlignedRecursiveEuclidRhythmStructure} layer's components
 */
export type AlignedEuclidRhythmLayer = [
  density: RhythmDensity,
  orientation: RhythmOrientation
];

/**
 * compressed alias for {@link AlignedRecursiveEuclidRhythmStructure}
 */
export type AlignedRhythmStructure = AlignedRecursiveEuclidRhythmStructure;

/**
 * ergonomic encoding for defining {@link _PHASED_RECURSIVE_EUCLID_RHYTHM_CONCEPT|phased recursive euclid rhythm}
 */
export type PhasedRecursiveEuclidRhythmStructure =
  RecursiveEuclidRhythmStructureBase<PhasedEuclidRhythmLayer>;

/**
 * encoding for defining a {@link PhasedRecursiveEuclidRhythmStructure} layer's components
 */
export type PhasedEuclidRhythmLayer = [
  density: RhythmDensity,
  orientation: RhythmOrientation,
  phase: RhythmPhase
];

/**
 * compressed alias for {@link PhasedRecursiveEuclidRhythmStructure}
 */
export type PhasedRhythmStructure = PhasedRecursiveEuclidRhythmStructure;

/**
 * base type for members of {@link RecursiveEuclidRhythmStructure}
 */
type RecursiveEuclidRhythmStructureBase<
  EuclidRhythmLayer extends Array<number>
> = [RhythmResolution, EuclidRhythmLayer, ...Array<EuclidRhythmLayer>];

// rhythm group
//
//

/**
 * ergonomic encoding for defining {@link _RHYTHM_GROUP_CONCEPT|rhythm group}
 */
export type RhythmGroupStructure = [
  baseStructure: RhythmGroupBaseStructure,
  memberStructure: RhythmGroupMemberStructure
];

/**
 * encoding for defining the base structure of a {@link RhythmGroupStructure}
 */
export type RhythmGroupBaseStructure = [
  RhythmResolution,
  ...Array<AlignedEuclidRhythmLayer>
];

/**
 * encoding for defining the member structure of a {@link RhythmGroupStructure}
 */
export type RhythmGroupMemberStructure = [
  RhythmDensity,
  ...Array<RhythmDensity>
];
