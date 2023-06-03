// rhythm attributes
//
//

/**
 * the building block of rhythm
 *
 * @example
 * ```typescript
 * const rhythmMap = [true, true, false, true, false]
 * const rhythmSlotZero = rhythmMap[0] // true
 * const rhythmSlotTwo = rhythmMap[2] // false
 * ```
 */
export type _RHYTHM_SLOT_CONCEPT = never;

/**
 * the index of a slot whose value is true (1)
 *
 * @example
 * ```typescript
 * const rhythmMap = [true, true, false, true, false]
 * const rhythmPoints = [0, 1, 3]
 * ```
 */
export type _RHYTHM_POINT_CONCEPT = never;

/**
 * the number of slots constituting a rhythm
 *
 * @example
 * ```typescript
 * const rhythmMap = [true, true, false, true, false]
 * const rhythmResolution = 5; // rhythmMap.length
 * ```
 */
export type _RHYTHM_RESOLUTION_CONCEPT = never;

/**
 * the number of points in a rhythm
 *
 * @example
 * ```typescript
 * const rhythmMap = [true, true, false, true, false]
 * const rhythmPoints = [0, 1, 3]
 * const rhythmDensity = 3 // rhythmPoints.length
 * ```
 */
export type _RHYTHM_DENSITY_CONCEPT = never;

/**
 * the offset of a rhythm, measured in slots, relative to a base rhythm
 *
 * @example
 * ```typescript
 * const baseRhythmMap = [true, true, false, true, false]
 * const rhythmPhase = -1; // rhythmMap.length
 * const phasedRhythmMap = [false, true, true, false, true]
 * ```
 */
export type _RHYTHM_PHASE_CONCEPT = never;

/**
 * the offset of an aligned rhythm, measured in points, relative to a base rhythm
 *
 * @example
 * ```typescript
 * const baseRhythmMap = [true, true, false, true, false]
 * const rhythmOrientation = 2
 * const reorientedRhythmMap = [true, false, true, true, false]
 * ```
 */
export type _RHYTHM_ORIENTATION_CONCEPT = never;

/**
 * a point whose value is normalized within the range of [0, 1)
 *
 * @example
 * ```typescript
 * const rhythmMap = [true, true, false, true, false]
 * const rhythmPoints = [0, 1, 3]
 * const relativeRhythmPoints = [0.0, 0.2, 0.6]
 * ```
 */
export type _RHYTHM_RELATIVE_POINT_CONCEPT = never;

/**
 * starting at a base point, the distance upto the next point
 *
 * @example
 * ```typescript
 * const rhythmMap = [true, true, false, true, false]
 * const rhythmPoints = [0, 1, 3]
 * const rhythmIntervals = [1, 2, 2]
 * ```
 */
export type _RHYTHM_INTERVAL_CONCEPT = never;

/**
 * the sum of points at a slot across a set of rhythms with the same resolution
 *
 * @example
 * ```typescript
 * const rhythmMapA = [true, true, false, true, false]; // 1, 1, 0, 1, 0
 * const rhythmMapB = [true, false, true, false, true]; // 1, 0, 1, 0, 1
 * const rhythmMapC = [true, false, true, true, false]; // 1, 0, 1, 1, 0
 * const groupSlotWeights = [3, 1, 2, 2, 1];
 * const slotWeightZero = 3; // groupSlotWeights[0]
 * ```
 */
export type _RHYTHM_SLOT_WEIGHT = never;

/**
 * a point's corresponding slot weight
 *
 * @example
 * ```typescript
 * const rhythmMapA = [true, true, false, true, false]; // 1, 1, 0, 1, 0
 * const rhythmMapB = [true, false, true, false, true]; // 1, 0, 1, 0, 1
 * const rhythmMapC = [true, false, true, true, false]; // 1, 0, 1, 1, 0
 * const groupSlotWeights = [3, 1, 2, 2, 1];
 * const rhythmPointsA = [0, 1, 3]
 * const rhythmPointWeightsA = [3, 1, 2]
 * ```
 */
export type _RHYTHM_POINT_WEIGHT = never;

/**
 * the sum of a rhythm's point weight
 *
 * @example
 * ```typescript
 * const rhythmMapA = [true, true, false, true, false]; // 1, 1, 0, 1, 0
 * const rhythmMapB = [true, false, true, false, true]; // 1, 0, 1, 0, 1
 * const rhythmMapC = [true, false, true, true, false]; // 1, 0, 1, 1, 0
 * const groupSlotWeights = [3, 1, 2, 2, 1];
 * const rhythmPointsA = [0, 1, 3]
 * const rhythmPointWeightsA = [3, 1, 2]
 * const rhythmWeightA = 6 // 3 + 1 + 2
 * ```
 */
export type _RHYTHM_WEIGHT = never;

// rhythm types
//
//

/**
 * a discrete sequence / cycle of binary values (slots)
 *
 * @example
 * ```typescript
 * const rhythmString = "1010"
 * const rhythmMap = [true, false, true, false];
 * const rhythm = {
 *   resolution: 4,
 *   points: [0, 2]
 * }
 * ```
 */
export type _RHYTHM_CONCEPT = never;

/**
 * a rhythm whose points are as evenly distributed as possible throughout a discrete space
 */
export type _EUCLID_RHYTHM_CONCEPT = never;

/**
 * a euclid rhythm that has an orientation and phase of zero (default layout) (most left dense)
 */
export type _BASIC_EUCLID_RHYTHM_CONCEPT = never;

/**
 * a basic euclid rhythm that is reduced to its simplest form
 */
export type _CORE_EUCLID_RHYTHM_CONCEPT = never;

/**
 * a rhythm where euclid rhythms are stacked on top of one another such that the base rhythm's density / points determines the next rhythm's resolution / space
 */
export type _RECURSIVE_EUCLID_RHYTHM_CONCEPT = never;

/**
 * a recursive euclid rhythm where each layer has a point at the zero slot
 */
export type _ALIGNED_RECURSIVE_EUCLID_RHYTHM_CONCEPT = never;

/**
 * a recursive euclid rhythm where all of the individual layers are phaseable
 */
export type _PHASED_RECURSIVE_EUCLID_RHYTHM_CONCEPT = never;

/**
 * a recursive euclidean rhythm of a recursive euclidean rhythm
 */
export type _COMPONENT_RHYTHM_CONCEPT = never;

// rhythm group
//
//

/**
 * a set of recursive euclidean rhythms that share a static base structure and a dynamic member structure where the density structure is the same but orientations are different
 */
export type _RHYTHM_GROUP_CONCEPT = never;

/**
 * all rhythm groups an aligned recursive euclidean rhythm belongs to
 */
export type _RHYTHM_LINEAGE_CONCEPT = never;
