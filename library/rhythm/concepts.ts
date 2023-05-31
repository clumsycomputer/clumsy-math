/**
 * a discrete sequence / cycle of binary values
 *
 * @example
 * ```typescript
 * const rhythmMap = [true, true, false, true, false];
 * const rhythm = { resolution: 5, points: [0, 1, 3] }
 * ```
 *
 * @relations (encoding)
 * RhythmSequence | Rhythm
 *
 * @attributes
 * domain: rhythm | category: concept | name: rhythm
 */
export type _RHYTHM_CONCEPT = never;

/**
 * a rhythm whose points are as evenly distributed as possible throughout a discrete space
 *
 * ```typescript
 * const rhythmMapA = [true, false, true, false];
 * const rhythmMapB = [true, true, false, true, false];
 * const rhythmMapC = [true, false, true, false, true];
 * ```
 *
 * @remarks
 * [og white paper](http://cgm.cs.mcgill.ca/~godfried/publications/banff.pdf)
 *
 * @relations (concept)
 * rhythm | rhythm point
 *
 * @relations (function)
 * euclidRhythm | simpleEuclidRhythm | coreEuclidRhythm | coreEuclidMap
 *
 * @attributes
 * domain: rhythm | category: concept | name: euclid rhythm
 */
export type _EUCLID_RHYTHM_CONCEPT = never;

/**
 * a rhythm where euclid rhythms are stacked on top of one another such that the base rhythm's density / points determines the next rhythm's resolution / space
 *
 * @example
 * ```typescript
 * const baseRhythm = [true, true, false, true, false];
 * const terminalRhythm = [true, false, true];
 * const resultRhythm = [true, false, false, true, false];
 * ```
 *
 * @attributes
 * domain: rhythm | category: concept | name: recursive euclid rhythm
 */
export type _RECURSIVE_EUCLID_RHYTHM_CONCEPT = never;

/**
 * a recursive euclid rhythm where each layer has a point at zero (slot)
 *
 * @attributes
 * domain: rhythm | category: concept | name: aligned recursive euclid rhythm
 */
export type _ALIGNED_RECURSIVE_EUCLID_RHYTHM_CONCEPT = never;

/**
 * a recursive euclid rhythm where all of the individual layers are phaseable
 *
 * @attributes
 * domain: rhythm | category: concept | name: phased recursive euclid rhythm
 */
export type _PHASED_RECURSIVE_EUCLID_RHYTHM_CONCEPT = never;
