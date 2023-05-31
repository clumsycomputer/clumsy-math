/**
 * a rhythm's building block
 *
 * @example
 * ```ts
 * const rhythm = [true, true, false, true, false];
 * const rhythmSlotZero = true; // rhythm[0]
 * const rhythmSlotTwo = false; // rhythm[2]
 * ```
 *
 * @relations (concept)
 * rhythm
 *
 * @relations (encoding)
 * RhythmSlot
 *
 * @attributes
 * domain: rhythm | type: concept | name: rhythm slot
 */
export type _RHYTHM_SLOT_CONCEPT = never;

/**
 * the number of slots in a rhythm
 *
 * @example
 * ```typescript
 * const rhythm = [true, true, false, true, false];
 * const rhythmResolution = 5; // rhythm.length
 * ```
 *
 * @relations (concept)
 * rhythm slot
 *
 * @relations (encoding)
 * RhythmResolution
 *
 * @attributes
 * domain: rhythm | type: concept | name: rhythm resolution
 */
export type _RHYTHM_RESOLUTION_CONCEPT = never;

/**
 * the index of a slot whose value is true (1)
 *
 * @example
 * ```typescript
 * const rhythm = [true, true, false, true, false];
 * const rhythmPoints = [0, 1, 3];
 * ```
 *
 * @relations (concept)
 * rhythm slot
 *
 * @relations (encoding)
 * RhythmPoint
 *
 * @attributes
 * domain: rhythm | type: concept | name: rhythm point
 */
export type _RHYTHM_POINT_CONCEPT = never;

/**
 * the number of points in a rhythm
 *
 * @example
 * ```typescript
 * const rhythm = [true, true, false, true, false];
 * const rhythmPoints = [0, 1, 3];
 * const rhythmDensity = 3; // rhythmPoints.length
 * ```
 *
 * @relations (concept)
 * rhythm point
 *
 * @relations (endcoding)
 * RhythmDensity
 *
 * @attributes
 * domain: rhythm | type: concept | name: rhythm density
 */
export type _RHYTHM_DENSITY_CONCEPT = never;

/**
 * the offset of a rhythm, measured in slots, relative to a base rhythm
 *
 * @example
 * ```typescript
 * const rhythmMap = [true, true, false, true, false];
 * const rhythmPhase = -1;
 * const phasedRhythmMap = [false, true, true, false, true];
 * ```
 *
 * @relations (concept)
 * rhythm point | rhythm slot
 *
 * @relations (encoding)
 * RhythmPhase
 *
 * @attributes
 * domain: rhythm | type: concept | name: rhythm phase
 */
export type _RHYTHM_PHASE_CONCEPT = never;

/**
 * the offset of an aligned rhythm, measured in points, relative to a base rhythm
 *
 * @example
 * ```typescript
 * const orientationA = 0;
 * const rhythmMapA = [true, true, false, true, false];
 * const orientationB = 1;
 * const rhythmMapB = [true, false, true, false, true];
 * ```
 *
 * @relations (concept)
 * rhythm point | rhythm phase
 *
 * @relations (encoding)
 * RhythmOrientation
 *
 * @attributes
 * domain: rhythm | type: concept | name: rhythm orientation
 */
export type _RHYTHM_ORIENTATION_CONCEPT = never;

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
 * domain: rhythm | type: concept | name: rhythm
 */
export type _RHYTHM_CONCEPT = never;

/**
 * a rhythm who's points are as evenly distributed as possible throughout a discrete space
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
 * domain: rhythm | type: concept | name: euclid rhythm
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
 * domain: rhythm | type: concept | name: recursive euclid rhythm
 */
export type _RECURSIVE_EUCLID_RHYTHM_CONCEPT = never;
