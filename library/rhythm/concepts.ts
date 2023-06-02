/**
 * a discrete sequence / cycle of binary values
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
