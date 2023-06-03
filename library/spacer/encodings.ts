// spacer attributes
//
//

/**
 * a boolean that's either true or false
 */
export type SpacerSlot = boolean;

/**
 * an integer in the range of [1, ∞)
 */
export type SpacerResolution = number;

/**
 * an integer in the range of [0, spacerResolution)
 */
export type SpacerPoint = number;

/**
 * an integer in the range of [0, spacerResolution]
 */
export type SpacerDensity = number;

/**
 * an integer in the range of (-spacerResolution, spacerResolution)
 */
export type SpacerPhase = number;

/**
 * an integer in the range of [0, spacerDensity)
 */
export type SpacerOrientation = number;

/**
 * a real number in the range of [0, 1)
 */
export type RelativeSpacerPoint = number;

/**
 * an integer in the range of [1, spacerResolution]
 */
export type SpacerInterval = number;

/**
 * an integer in the range of [0, ∞)
 */
export type SpacerSlotWeight = number;

/**
 * an integer in the range of [0, ∞)
 */
export type SpacerPointWeight = number;

/**
 * an integer in the range of [0, ∞)
 */
export type SpacerWeight = number;

// spacer types
//
//

/**
 * defacto encoding for working with {@link _SPACER_CONCEPT}
 */
export type Spacer = [resolution: SpacerResolution, points: Array<SpacerPoint>];

/**
 * {@link _SPACER_CONCEPT|spacer} as a string of 1's and 0's
 */
export type SpacerString = string;

/**
 * {@link _SPACER_CONCEPT|spacer} as Array<boolean>
 */
export type SpacerMap = Array<SpacerSlot>;

/**
 * {@link _EUCLID_SPACER_CONCEPT|euclid spacer} as {@link Spacer}
 */
export type EuclidSpacer = Spacer;

/**
 * {@link _EUCLID_SPACER_CONCEPT|euclid spacer} as {@link SpacerMap}
 */
export type EuclidSpacerMap = SpacerMap;

/**
 * {@link _BASIC_EUCLID_SPACER_CONCEPT|basic euclid spacer} as {@link Spacer}
 */
export type BasicEuclidSpacer = EuclidSpacer;

/**
 * {@link _CORE_EUCLID_SPACER_CONCEPT|core euclid spacer} as {@link Spacer}
 */
export type CoreEuclidSpacer = BasicEuclidSpacer;

/**
 * {@link _RECURSIVE_EUCLID_SPACER_CONCEPT|recursive euclid spacer} as {@link Spacer}
 */
export type RecursiveEuclidSpacer = Spacer;

/**
 * {@link _ALIGNED_RECURSIVE_EUCLID_SPACER_CONCEPT|aligned recursive euclid spacer} as {@link Spacer}
 */
export type AlignedRecursiveEuclidSpacer = RecursiveEuclidSpacer;

/**
 * {@link _PHASED_RECURSIVE_EUCLID_SPACER_CONCEPT|phased recursive euclid spacer} as {@link Spacer}
 */
export type PhasedRecursiveEuclidSpacer = RecursiveEuclidSpacer;

/**
 * useful encoding for either {@link AlignedRecursiveEuclidSpacerStructure} or {@link PhasedRecursiveEuclidSpacerStructure}
 */
export type RecursiveEuclidSpacerStructure =
  | AlignedRecursiveEuclidSpacerStructure
  | PhasedRecursiveEuclidSpacerStructure;

/**
 * ergonomic encoding for defining {@link _ALIGNED_RECURSIVE_EUCLID_SPACER_CONCEPT|aligned recursive euclid spacer}
 */
export type AlignedRecursiveEuclidSpacerStructure =
  RecursiveEuclidSpacerStructureBase<AlignedEuclidSpacerLayer>;

/**
 * encoding for defining a {@link AlignedRecursiveEuclidSpacerStructure} layer's components
 */
export type AlignedEuclidSpacerLayer = [
  density: SpacerDensity,
  orientation: SpacerOrientation
];

/**
 * compressed alias for {@link AlignedRecursiveEuclidSpacerStructure}
 */
export type AlignedSpacerStructure = AlignedRecursiveEuclidSpacerStructure;

/**
 * ergonomic encoding for defining {@link _PHASED_RECURSIVE_EUCLID_SPACER_CONCEPT|phased recursive euclid spacer}
 */
export type PhasedRecursiveEuclidSpacerStructure =
  RecursiveEuclidSpacerStructureBase<PhasedEuclidSpacerLayer>;

/**
 * encoding for defining a {@link PhasedRecursiveEuclidSpacerStructure} layer's components
 */
export type PhasedEuclidSpacerLayer = [
  density: SpacerDensity,
  orientation: SpacerOrientation,
  phase: SpacerPhase
];

/**
 * compressed alias for {@link PhasedRecursiveEuclidSpacerStructure}
 */
export type PhasedSpacerStructure = PhasedRecursiveEuclidSpacerStructure;

/**
 * base type for members of {@link RecursiveEuclidSpacerStructure}
 */
type RecursiveEuclidSpacerStructureBase<
  EuclidSpacerLayer extends Array<number>
> = [SpacerResolution, EuclidSpacerLayer, ...Array<EuclidSpacerLayer>];

// spacer group
//
//

/**
 * ergonomic encoding for defining {@link _SPACER_GROUP_CONCEPT|spacer group}
 */
export type SpacerGroupStructure = [
  baseStructure: SpacerGroupBaseStructure,
  memberStructure: SpacerGroupMemberStructure
];

/**
 * encoding for defining the base structure of a {@link SpacerGroupStructure}
 */
export type SpacerGroupBaseStructure = [
  SpacerResolution,
  ...Array<AlignedEuclidSpacerLayer>
];

/**
 * encoding for defining the member structure of a {@link SpacerGroupStructure}
 */
export type SpacerGroupMemberStructure = [
  SpacerDensity,
  ...Array<SpacerDensity>
];
