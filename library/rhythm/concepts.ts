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
export type RHYTHM_SLOT_CONCEPT = never;

/**
 * a discrete sequence/cycle of binary values
 *
 * @example
 * ```ts
 * const rhythm = [true, true, false, true, false];
 * ```
 *
 * @attributes
 * domain: rhythm | type: concept | name: rhythm
 */
export type RHYTHM_CONCEPT = never;
