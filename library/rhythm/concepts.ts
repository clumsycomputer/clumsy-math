// rhythm attributes

/**
 * the building block of rhythm
 */
export type _RHYTHM_SLOT_CONCEPT = never;

/**
 * the index of a slot whose value is true (1)
 */
export type _RHYTHM_POINT_CONCEPT = never;

/**
 * the number of slots constituting a rhythm
 */
export type _RHYTHM_RESOLUTION_CONCEPT = never;

/**
 * the number of points in a rhythm
 */
export type _RHYTHM_DENSITY_CONCEPT = never;

/**
 * the offset of a rhythm, measured in slots, relative to a base rhythm
 */
export type _RHYTHM_PHASE_CONCEPT = never;

/**
 * the offset of an aligned rhythm, measured in points, relative to a base rhythm
 */
export type _RHYTHM_ORIENTATION_CONCEPT = never;

/**
 * a point whose value is normalized within the range of [0, 1)
 */
export type _RHYTHM_RELATIVE_POINT_CONCEPT = never;

/**
 * starting at a base point, the distance upto the next point
 */
export type _RHYTHM_INTERVAL_CONCEPT = never;

/**
 * the sum of points at a slot across a set of rhythms with the same resolution
 */
export type _RHYTHM_SLOT_WEIGHT = never;

/**
 * a point's corresponding slot weight
 */
export type _RHYTHM_POINT_WEIGHT = never;

/**
 * the sum of a rhythm's point weight
 */
export type _RHYTHM_WEIGHT = never;

// rhythm types

/**
 * a discrete sequence / cycle of binary values (slots)
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

/**
 * a set of recursive euclidean rhythms that share a static base structure and a dynamic member structure where the density structure is the same but orientations are different
 */
export type _RHYTHM_GROUP_CONCEPT = never;

/**
 * all rhythm groups an aligned recursive euclidean rhythm belongs to
 */
export type _RHYTHM_LINEAGE_CONCEPT = never;
