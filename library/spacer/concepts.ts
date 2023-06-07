// spacer attributes
//
//

/**
 * the building block of spacer
 *
 * @example
 * ```typescript
 * const spacerMap = [true, true, false, true, false]
 * const spacerSlotZero = spacerMap[0] // true
 * const spacerSlotTwo = spacerMap[2] // false
 * ```
 */
export type _SPACER_SLOT_CONCEPT = never;

/**
 * the index of a slot whose value is true (1)
 *
 * @example
 * ```typescript
 * const spacerMap = [true, true, false, true, false]
 * const spacerPoints = [0, 1, 3]
 * ```
 */
export type _SPACER_POINT_CONCEPT = never;

/**
 * the number of slots constituting a spacer
 *
 * @example
 * ```typescript
 * const spacerMap = [true, true, false, true, false]
 * const spacerResolution = 5; // spacerMap.length
 * ```
 */
export type _SPACER_RESOLUTION_CONCEPT = never;

/**
 * the number of points in a spacer
 *
 * @example
 * ```typescript
 * const spacerMap = [true, true, false, true, false]
 * const spacerPoints = [0, 1, 3]
 * const spacerDensity = 3 // spacerPoints.length
 * ```
 */
export type _SPACER_DENSITY_CONCEPT = never;

/**
 * the offset of a spacer, measured in slots, relative to a base spacer
 *
 * @example
 * ```typescript
 * const baseSpacerMap = [true, true, false, true, false]
 * const spacerPhase = -1; // spacerMap.length
 * const phasedSpacerMap = [false, true, true, false, true]
 * ```
 */
export type _SPACER_PHASE_CONCEPT = never;

/**
 * the offset of an aligned spacer, measured in points, relative to a base spacer
 *
 * @example
 * ```typescript
 * const baseSpacerMap = [true, true, false, true, false]
 * const spacerOrientation = 2
 * const reorientedSpacerMap = [true, false, true, true, false]
 * ```
 */
export type _SPACER_ORIENTATION_CONCEPT = never;

/**
 * a point whose value is normalized within the range of [0, 1)
 *
 * @example
 * ```typescript
 * const spacerMap = [true, true, false, true, false]
 * const spacerPoints = [0, 1, 3]
 * const relativeSpacerPoints = [0.0, 0.2, 0.6]
 * ```
 */
export type _SPACER_RELATIVE_POINT_CONCEPT = never;

/**
 * starting at a base point, the distance upto the next point
 *
 * @example
 * ```typescript
 * const spacerMap = [true, true, false, true, false]
 * const spacerPoints = [0, 1, 3]
 * const spacerIntervals = [1, 2, 2]
 * ```
 */
export type _SPACER_INTERVAL_CONCEPT = never;

/**
 * the sum of points at a slot across a set of spacers with the same resolution
 *
 * @example
 * ```typescript
 * const spacerMapA = [true, true, false, true, false]; // 1, 1, 0, 1, 0
 * const spacerMapB = [true, false, true, false, true]; // 1, 0, 1, 0, 1
 * const spacerMapC = [true, false, true, true, false]; // 1, 0, 1, 1, 0
 * const groupSlotWeights = [3, 1, 2, 2, 1];
 * const slotWeightZero = 3; // groupSlotWeights[0]
 * ```
 */
export type _SPACER_SLOT_WEIGHT_CONCEPT = never;

/**
 * a point's corresponding slot weight
 *
 * @example
 * ```typescript
 * const spacerMapA = [true, true, false, true, false]; // 1, 1, 0, 1, 0
 * const spacerMapB = [true, false, true, false, true]; // 1, 0, 1, 0, 1
 * const spacerMapC = [true, false, true, true, false]; // 1, 0, 1, 1, 0
 * const groupSlotWeights = [3, 1, 2, 2, 1];
 * const spacerPointsA = [0, 1, 3]
 * const spacerPointWeightsA = [3, 1, 2]
 * ```
 */
export type _SPACER_POINT_WEIGHT_CONCEPT = never;

/**
 * the sum of a spacer's point weight
 *
 * @example
 * ```typescript
 * const spacerMapA = [true, true, false, true, false]; // 1, 1, 0, 1, 0
 * const spacerMapB = [true, false, true, false, true]; // 1, 0, 1, 0, 1
 * const spacerMapC = [true, false, true, true, false]; // 1, 0, 1, 1, 0
 * const groupSlotWeights = [3, 1, 2, 2, 1];
 * const spacerPointsA = [0, 1, 3]
 * const spacerPointWeightsA = [3, 1, 2]
 * const spacerWeightA = 6 // 3 + 1 + 2
 * ```
 */
export type _SPACER_WEIGHT_CONCEPT = never;

// spacer types
//
//

/**
 * a discrete sequence / cycle of binary values (slots)
 *
 * @example
 * ```typescript
 * const spacerString = "1010"
 * const spacerMap = [true, false, true, false];
 * const spacer = {
 *   resolution: 4,
 *   points: [0, 2]
 * }
 * ```
 */
export type _SPACER_CONCEPT = never;

/**
 * a spacer whose points are as evenly distributed as possible throughout a discrete space
 *
 * @example
 * ```typescript
 * const euclidMapA = [true, true, false, true, false]
 * const euclidMapB = [true, false, true, false, true]
 * const euclidMapC = [true, false, true, true, false]
 * ```
 */
export type _EUCLID_SPACER_CONCEPT = never;

/**
 * a euclid spacer that has an orientation and phase of zero (default layout) (most left dense)
 *
 * @example
 * ```typescript
 * const euclidMapA = [true, true, false, true, false] // basic
 * const euclidMapB = [true, false, true, false, true] // not basic
 * const euclidMapC = [true, false, true, true, false] // not basic
 * ```
 */
export type _BASIC_EUCLID_SPACER_CONCEPT = never;

/**
 * a basic euclid spacer that is reduced to its simplest form
 *
 * @example
 * ```typescript
 * const fullEuclidMap = [true, false, true, false]
 * const coreEuclidMap = [true, false]
 * ```
 */
export type _CORE_EUCLID_SPACER_CONCEPT = never;

/**
 * a spacer where euclid spacers are stacked on top of one another such that the base spacer's density / points determines the next spacer's resolution / space
 *
 * @example
 * ```typescript
 * const baseEuclidMap = [true, true, false, true, false]
 * const terminalEuclidMap = [true, true, flase]
 * const resultEuclidMap = [true, true, false, false, false]
 * ```
 */
export type _RECURSIVE_EUCLID_SPACER_CONCEPT = never;

/**
 * a recursive euclid spacer where each layer has a point at the zero slot
 *
 * @example
 * ```typescript
 * const baseEuclidMap = [true, true, false, true, false]
 * const terminalEuclidMap = [true, false, true]
 * const resultEuclidMap = [true, false, false, true, false]
 * ```
 */
export type _ALIGNED_RECURSIVE_EUCLID_SPACER_CONCEPT = never;

/**
 * a recursive euclid spacer where all of the individual layers are phaseable
 *
 * @example
 * ```typescript
 * const baseEuclidMap = [true, true, false, true, false]
 * const terminalEuclidMap = [false, true, true]
 * const resultEuclidMap = [false, true, false, true, false]
 * ```
 */
export type _PHASED_RECURSIVE_EUCLID_SPACER_CONCEPT = never;

/**
 * a recursive euclidean spacer of a recursive euclidean spacer
 *
 * @example
 * ```typescript
 * const baseComponentMap = [true, true, false, true, false]
 * const interposedComponentMap = [true, false, false, true, false]
 * const terminalComponentMap = [true, false, false, false, false]
 * ```
 */
export type _COMPONENT_SPACER_CONCEPT = never;

// spacer group
//
//

/**
 * a set of aligned recursive euclidean spacers that share a static base structure and a dynamic member structure where the density structure is the same but orientations are different
 *
 * @example
 * ```typescript
 * const groupBase = [true, true, false, true, false]
 * const groupMapsA = [
 *   [true, true, false, true, false],
 *   [true, false, false, true, false],
 * ]
 * ```
 */
export type _SPACER_GROUP_CONCEPT = never;

/**
 * all spacer groups an aligned recursive euclidean spacer belongs to
 *
 * @example
 * ```typescript
 * const spacerMapA = [true, false, false, true, false]
 * const lineageMapsA = [
 *   [
 *     [true, true, false, false, false],
 *     [true, false, false, true, false],
 *     [true, false, true, false, false],
 *     [true, false, false, false, true],
 *     [true, false, true, false, false],
 *     [true, false, false, true, false],
 *   ],
 *   [
 *     [true, true, false, false, false],
 *     [true, false, false, true, false],
 *   ],
 * ];
 * ```
 */
export type _SPACER_LINEAGE_CONCEPT = never;
