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
 * @attributes
 * domain: rhythm | type: concept | name: rhythm density
 */
export type _RHYTHM_DENSITY_CONCEPT = never;

/**
 * the offset of a rhythm, measured in slots, relative to a base rhythm
 *
 * @example
 * ```typescript
 * const rhythm = [true, true, false, true, false];
 * const rhythmPhase = -1;
 * const phasedRhythm = [false, true, true, false, true];
 * ```
 *
 * @attributes
 * domain: rhythm | type: concept | name: rhythm phase
 */
export type _RHYTHM_PHASE_CONCEPT = never;

/**
 * the offset of a rhythm, measured in slots, relative to a base rhythm
 *
 * @example
 * ```typescript
 * const orientationA = 0;
 * const rhythmA = [true, true, false, true, false];
 * const orientationB = 1;
 * const rhythmB = [true, false, true, false, true];
 * ```
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
 * const rhythm = [true, true, false, true, false];
 * ```
 *
 * @attributes
 * domain: rhythm | type: concept | name: rhythm
 */
export type _RHYTHM_CONCEPT = never;
